import { createHash, randomInt } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { uid } from "@/lib/utils";
import { sendEmail, otpEmailHtml } from "./email";
import { isWorkspacePreview } from "@/lib/env.server";

type Purpose = "verify" | "reset";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashCode(email: string, code: string) {
  return createHash("sha256").update(`${normalizeEmail(email)}:${code}`).digest("hex");
}

async function issueOtp(email: string, purpose: Purpose) {
  const sql = await getSql();
  const addr = normalizeEmail(email);
  if (!addr.includes("@") || addr.length > 180) {
    return { ok: false as const, error: "Enter a valid email address." };
  }
  const recent = await sql<{ n: number }>`
    select count(*)::int as n from email_otps
    where email = ${addr} and purpose = ${purpose}
      and created_at > now() - interval '15 minutes'
  `;
  if ((recent[0]?.n ?? 0) >= 5) {
    return { ok: false as const, error: "Too many codes requested. Wait a few minutes and try again." };
  }
  const code = String(randomInt(100000, 1000000));
  await sql`
    insert into email_otps (id, email, purpose, code_hash, expires_at)
    values (${uid("otp")}, ${addr}, ${purpose}, ${hashCode(addr, code)}, now() + interval '10 minutes')
  `;
  const mailed = await sendEmail({
    to: addr,
    subject: purpose === "reset" ? "HiredFrex password reset code" : "Your HiredFrex verification code",
    html: otpEmailHtml(code, purpose),
    text: `Your HiredFrex code is ${code}. It expires in 10 minutes.`,
  });
  if (!mailed.ok) {
    if (isWorkspacePreview()) {
      return {
        ok: true as const,
        previewCode: code,
        notice: "Resend is not connected in this preview. On hiredfrex.com the same code is emailed from your verified domain.",
      };
    }
    return mailed;
  }
  return { ok: true as const };
}

async function consumeOtp(email: string, purpose: Purpose, code: string) {
  const sql = await getSql();
  const addr = normalizeEmail(email);
  const trimmed = code.replace(/\s/g, "");
  if (!/^\d{6}$/.test(trimmed)) return { ok: false as const, error: "Enter the 6-digit code from the email." };
  const rows = await sql<Record<string, unknown>>`
    select id from email_otps
    where email = ${addr} and purpose = ${purpose}
      and code_hash = ${hashCode(addr, trimmed)}
      and consumed_at is null
      and expires_at > now()
    order by created_at desc
    limit 1
  `;
  const row = rows[0];
  if (!row) return { ok: false as const, error: "That code is invalid or has expired." };
  await sql`update email_otps set consumed_at = now() where id = ${String(row.id)}`;
  return { ok: true as const, email: addr };
}

export const sendVerificationOtp = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input?: { email?: string }) => input ?? {})
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ email: string | null }>`select email from profiles where user_id = ${context.userId}`;
    let email = rows[0]?.email;
    const incoming = data.email?.trim().toLowerCase();
    if (!email && incoming && incoming.includes("@")) {
      email = incoming;
      await sql`
        insert into profiles (user_id, role, email, email_verified)
        values (${context.userId}, ${"seeker"}, ${email}, ${false})
        on conflict (user_id) do update set email = excluded.email
      `;
    }
    if (!email) return { ok: false as const, error: "Your account does not have an email on file." };
    return issueOtp(email, "verify");
  });

export const confirmVerificationOtp = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { code: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ email: string | null }>`select email from profiles where user_id = ${context.userId}`;
    const email = rows[0]?.email;
    if (!email) return { ok: false as const, error: "Your account does not have an email on file." };
    const result = await consumeOtp(email, "verify", data.code);
    if (!result.ok) return result;
    await sql`update profiles set email_verified = true, updated_at = now() where user_id = ${context.userId}`;
    return { ok: true as const };
  });

export const sendResetOtp = createServerFn({ method: "POST" })
  .validator((input: { email: string }) => input)
  .handler(async ({ data }) => {
    const issued = await issueOtp(data.email, "reset");
    if (!issued.ok) return issued;
    return { ok: true as const };
  });

export const confirmResetOtp = createServerFn({ method: "POST" })
  .validator((input: { email: string; code: string }) => input)
  .handler(async ({ data }) => consumeOtp(data.email, "reset", data.code));

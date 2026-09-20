import { randomUUID } from "node:crypto";
import { sql, json, parseBody, hashOtp, sixDigit, sendResend, otpHtml } from "./lib.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  const { email } = parseBody(event);
  const addr = String(email || "").trim().toLowerCase();
  if (!addr.includes("@")) return json(400, { error: "Enter a valid email." });
  const db = sql();
  const recent = await db`select count(*)::int as n from email_otps
    where email = ${addr} and purpose = ${"verify"} and created_at > now() - interval '15 minutes'`;
  if ((recent[0]?.n || 0) >= 5) return json(429, { error: "Too many codes. Wait a few minutes." });
  const code = sixDigit();
  await db`insert into email_otps (id, email, purpose, code_hash, expires_at)
    values (${randomUUID()}, ${addr}, ${"verify"}, ${hashOtp(addr, code)}, now() + interval '10 minutes')`;
  const mailed = await sendResend({
    to: addr,
    subject: "Your HiredFrex verification code",
    html: otpHtml(code),
  });
  if (!mailed.ok) return json(502, { error: mailed.error });
  return json(200, { ok: true });
}

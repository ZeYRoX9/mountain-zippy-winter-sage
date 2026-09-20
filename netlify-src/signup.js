import { randomUUID } from "node:crypto";
import { sql, json, parseBody, hashPassword, hashOtp, sixDigit, sendResend, otpHtml } from "./lib.mjs";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  const { name, email, password, role } = parseBody(event);
  const addr = String(email || "").trim().toLowerCase();
  if (!addr.includes("@") || String(password || "").length < 8) {
    return json(400, { error: "Use a real email and a password of 8+ characters." });
  }
  const db = sql();
  const existing = await db`select id from users where email = ${addr} limit 1`;
  if (existing.length) return json(409, { error: "An account with that email already exists." });
  const id = randomUUID();
  const hash = await hashPassword(password);
  const r = role === "employer" ? "employer" : "seeker";
  await db`insert into users (id, name, email, password_hash, role, email_verified)
    values (${id}::uuid, ${String(name || "HiredFrex user")}, ${addr}, ${hash}, ${r}, false)`;
  const code = sixDigit();
  await db`insert into email_otps (id, email, purpose, code_hash, expires_at)
    values (${randomUUID()}, ${addr}, ${"verify"}, ${hashOtp(addr, code)}, now() + interval '10 minutes')`;
  const mailed = await sendResend({
    to: addr,
    subject: "Your HiredFrex verification code",
    html: otpHtml(code),
  });
  if (!mailed.ok) return json(502, { error: mailed.error });
  return json(200, { ok: true, needsVerification: true });
}

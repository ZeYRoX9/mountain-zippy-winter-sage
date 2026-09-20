import { sql, json, parseBody, hashOtp, signToken, sessionCookie } from "./lib.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  const { email, code } = parseBody(event);
  const addr = String(email || "").trim().toLowerCase();
  const trimmed = String(code || "").replace(/\s/g, "");
  if (!/^\d{6}$/.test(trimmed)) return json(400, { error: "Enter the 6-digit code from the email." });
  const db = sql();
  const rows = await db`select id from email_otps
    where email = ${addr} and purpose = ${"verify"} and code_hash = ${hashOtp(addr, trimmed)}
      and consumed_at is null and expires_at > now()
    order by created_at desc limit 1`;
  if (!rows.length) return json(400, { error: "That code is invalid or has expired." });
  await db`update email_otps set consumed_at = now() where id = ${rows[0].id}`;
  await db`update users set email_verified = true where email = ${addr}`;
  const user = (await db`select id, name, email, role from users where email = ${addr} limit 1`)[0];
  if (!user) return json(404, { error: "Account not found." });
  const token = signToken({ uid: user.id, email: user.email, role: user.role });
  return json(200, { ok: true, user }, { "Set-Cookie": sessionCookie(token) });
}

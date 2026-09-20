import { sql, json, parseBody, verifyPassword, signToken, sessionCookie } from "./lib.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  const { email, password } = parseBody(event);
  const addr = String(email || "").trim().toLowerCase();
  const db = sql();
  const rows = await db`select id, name, email, role, password_hash, email_verified from users where email = ${addr} limit 1`;
  const user = rows[0];
  if (!user || !(await verifyPassword(String(password || ""), user.password_hash))) {
    return json(401, { error: "Email or password is not right." });
  }
  if (user.email_verified === false) {
    return json(403, { error: "Verify your email first.", needsVerification: true });
  }
  const token = signToken({ uid: user.id, email: user.email, role: user.role });
  return json(200, { ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { "Set-Cookie": sessionCookie(token) });
}

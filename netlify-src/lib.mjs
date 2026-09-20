import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual, createHash, randomInt } from "node:crypto";
import { promisify } from "node:util";
import { neon } from "@neondatabase/serverless";

const scrypt = promisify(scryptCb);

export function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

export function json(statusCode, body, extra = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://hiredfrex.com",
      ...extra,
    },
    body: JSON.stringify(body),
  };
}

export function parseBody(event) {
  try {
    return JSON.parse(event.body || "{}");
  } catch {
    return {};
  }
}

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const buf = await scrypt(password, salt, 32);
  return `scrypt:${salt.toString("hex")}:${buf.toString("hex")}`;
}

export async function verifyPassword(password, stored) {
  if (!stored || !stored.startsWith("scrypt:")) return false;
  const [, saltHex, hashHex] = stored.split(":");
  const buf = await scrypt(password, Buffer.from(saltHex, "hex"), 32);
  const a = Buffer.from(hashHex, "hex");
  if (a.length !== buf.length) return false;
  return timingSafeEqual(a, buf);
}

export function signToken(payload) {
  const secret = process.env.JWT_SECRET || process.env.ADMIN_TOKEN;
  if (!secret) throw new Error("JWT_SECRET is not set");
  const data = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 30 * 864e5 })).toString("base64url");
  const sig = createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function readToken(event) {
  const cookie = event.headers.cookie || event.headers.Cookie || "";
  const m = cookie.match(/(?:^|;\s*)hf_session=([^;]+)/);
  const raw = m ? decodeURIComponent(m[1]) : (event.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!raw || !raw.includes(".")) return null;
  const secret = process.env.JWT_SECRET || process.env.ADMIN_TOKEN;
  const [data, sig] = raw.split(".");
  const expect = createHmac("sha256", secret).update(data).digest("base64url");
  if (expect.length !== sig.length || !timingSafeEqual(Buffer.from(expect), Buffer.from(sig))) return null;
  const payload = JSON.parse(Buffer.from(data, "base64url").toString());
  if (payload.exp && payload.exp < Date.now()) return null;
  return payload;
}

export function sessionCookie(token) {
  return `hf_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 86400}`;
}

export function hashOtp(email, code) {
  return createHash("sha256").update(`${email.trim().toLowerCase()}:${code}`).digest("hex");
}

export function sixDigit() {
  return String(randomInt(100000, 1000000));
}

export async function sendResend({ to, subject, html }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY is not set on Netlify." };
  const from = process.env.EMAIL_FROM || "HiredFrex <support@hiredfrex.com>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });
  if (!res.ok) {
    const t = await res.text();
    return { ok: false, error: `Resend ${res.status}: ${t.slice(0, 180)}` };
  }
  return { ok: true };
}

export function otpHtml(code) {
  return `<!doctype html><html><body style="font-family:Georgia,serif;background:#f7f3ea;padding:24px;color:#1b1915">
  <div style="max-width:520px;margin:0 auto;background:#fffdf8;border:1px solid #e4dccb;border-radius:18px;padding:28px">
    <p style="letter-spacing:.16em;font-size:11px;font-weight:700;color:#8a5f18;text-transform:uppercase">HiredFrex</p>
    <h1 style="font-size:26px;color:#10243f">Confirm your email</h1>
    <p>Enter this 6-digit code. It expires in 10 minutes. HiredFrex will never charge you for this code, a visa, or a job.</p>
    <p style="font-size:32px;letter-spacing:.28em;font-weight:700;color:#10243f">${code}</p>
  </div></body></html>`;
}

export { randomInt };

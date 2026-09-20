import { randomUUID } from "node:crypto";
import { sql, json, parseBody, sendResend } from "./lib.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  const d = parseBody(event);
  const name = String(d.name || "").trim();
  const email = String(d.email || "").trim();
  const message = String(d.message || "").trim();
  if (!name || !email.includes("@") || message.length < 10) return json(400, { error: "Complete the form." });
  const db = sql();
  await db`insert into messages (id, name, email, topic, message)
    values (${randomUUID()}::uuid, ${name}, ${email}, ${String(d.topic || "general")}, ${message})`;
  const owner = process.env.OWNER_EMAIL || "support@hiredfrex.com";
  await sendResend({
    to: owner,
    subject: `HiredFrex contact: ${d.topic || "general"}`,
    html: `<p>${name} <${email}></p><p>${message.replace(/</g, "<")}</p>`,
  });
  return json(200, { ok: true });
}

import { randomUUID } from "node:crypto";
import { sql, json, parseBody } from "./lib.mjs";

export async function handler(event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  const d = parseBody(event);
  const name = String(d.name || "").trim();
  const email = String(d.email || "").trim().toLowerCase();
  const jobId = String(d.jobId || d.job_id || "");
  if (!name || !email.includes("@") || !jobId) return json(400, { error: "Name, email, and job are required." });
  const db = sql();
  const jobs = await db`select id from jobs where id = ${jobId}::uuid and status = ${"active"} limit 1`;
  if (!jobs.length) return json(404, { error: "That job is not open." });
  await db`insert into applications (id, job_id, name, email, phone, cover_note, cv_text, cv_filename, cv_data)
    values (${randomUUID()}::uuid, ${jobId}::uuid, ${name}, ${email}, ${String(d.phone || "")}, ${String(d.coverNote || d.cover_note || "")},
      ${String(d.cvText || d.cv_text || "")}, ${d.cvFilename || null}, ${d.cvData || null})`;
  return json(200, { ok: true });
}

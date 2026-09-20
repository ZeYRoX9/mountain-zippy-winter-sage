import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { ensureSeed } from "@/lib/data/seed";
import { uid } from "@/lib/utils";

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: { name: string; email: string; topic: string; message: string }) => input)
  .handler(async ({ data }) => {
    if (!data.name.trim() || !data.email.includes("@") || data.message.trim().length < 12) {
      return { ok: false as const, error: "Please complete name, a valid email, and a message." };
    }
    await ensureSeed();
    const sql = await getSql();
    await sql`
      insert into messages (id, name, email, topic, message)
      values (${uid("msg")}, ${data.name.trim()}, ${data.email.trim()}, ${data.topic}, ${data.message.trim()})
    `;
    const { sendEmail } = await import("./email");
    const { SUPPORT_EMAIL } = await import("@/lib/site");
    await sendEmail({
      to: process.env.OWNER_EMAIL || SUPPORT_EMAIL,
      subject: `HiredFrex contact: ${data.topic}`,
      html: `<p><b>${data.name}</b> <${data.email}></p><p>${data.topic}</p><p>${data.message.replace(/</g, "<")}</p>`,
    });
    return { ok: true as const };
  });

export const submitJobReport = createServerFn({ method: "POST" })
  .validator((input: { jobId?: string; reason: string; details: string; email?: string }) => input)
  .handler(async ({ data }) => {
    if (!data.reason.trim() || data.details.trim().length < 12) {
      return { ok: false as const, error: "Tell us what is wrong, with enough detail to investigate." };
    }
    await ensureSeed();
    const sql = await getSql();
    await sql`
      insert into job_reports (id, job_id, reason, details)
      values (${uid("rep")}, ${data.jobId || null}, ${data.reason}, ${data.details})
    `;
    return { ok: true as const };
  });

export const generateCvAssist = createServerFn({ method: "POST" })
  .validator((input: {
    name: string;
    headline: string;
    experience: string;
    education: string;
    skills: string;
    targetRole: string;
  }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: false as const,
        error: "The writing assistant is not available in this environment. You can still edit and download your CV.",
      };
    }
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content:
              "You write concise professional CV summaries. Use only facts the user supplied. Never invent employers, dates, titles, qualifications, or numbers. If something is missing, omit it. Return plain text only: a 3-5 sentence professional summary, then 4-8 bullet achievements derived from the experience text.",
          },
          {
            role: "user",
            content: JSON.stringify(data),
          },
        ],
      }),
    });
    if (!res.ok) return { ok: false as const, error: "The writing assistant could not complete. Edit the CV yourself." };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { ok: true as const, text: body.choices?.[0]?.message?.content ?? "" };
  });

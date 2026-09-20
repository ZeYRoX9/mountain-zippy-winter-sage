import { env } from "@/lib/env.server";
import { SUPPORT_EMAIL } from "@/lib/site";

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export function emailFromAddress() {
  return env("EMAIL_FROM") || `HiredFrex <${SUPPORT_EMAIL}>`;
}

export async function sendEmail(payload: EmailPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const key = env("RESEND_API_KEY");
  if (!key) {
    return {
      ok: false,
      error: "Email delivery is not configured yet. Add the Resend API key in the app’s secrets, then try again.",
    };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: emailFromAddress(),
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text || payload.html.replace(/<[^>]+>/g, " "),
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error("Resend error", res.status, body.slice(0, 400));
    return {
      ok: false,
      error: "We could not send the email. Confirm the HiredFrex domain is verified in Resend.",
    };
  }
  return { ok: true };
}

export function otpEmailHtml(code: string, purpose: "verify" | "reset") {
  const heading = purpose === "reset" ? "Reset your HiredFrex password" : "Confirm your HiredFrex email";
  const line =
    purpose === "reset"
      ? "Use this code to prove you own the inbox. It expires in 10 minutes."
      : "Enter this 6-digit code to finish email verification. It expires in 10 minutes.";
  return `<!doctype html>
<html><body style="font-family:Georgia,serif;background:#f7f3ea;padding:24px;color:#1b1915">
  <div style="max-width:520px;margin:0 auto;background:#fffdf8;border:1px solid #e4dccb;border-radius:18px;padding:28px">
    <p style="letter-spacing:.16em;font-size:11px;font-weight:700;color:#8a5f18;text-transform:uppercase">HiredFrex</p>
    <h1 style="font-size:28px;margin:8px 0 12px;color:#10243f">${heading}</h1>
    <p style="line-height:1.5">${line}</p>
    <p style="font-size:32px;letter-spacing:.28em;font-weight:700;color:#10243f;margin:24px 0">${code}</p>
    <p style="font-size:13px;color:#5c564c">HiredFrex will never ask you to pay for a job, a visa, or this code. If you did not request it, ignore this email.</p>
  </div>
</body></html>`;
}

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/site";
import { submitContact } from "@/lib/server/public-actions";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact",
      description: "Contact HiredFrex for support, corrections, employer help, or to report a problem.",
      path: "/contact",
    }),
  component: function Contact() {
    const [msg, setMsg] = useState<string | null>(null);
    return (
      <Page>
        <Eyebrow>Support</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Contact HiredFrex</h1>
        <p className="mt-3 max-w-xl text-muted">
          Use this form for support, partnership questions, content corrections, or employer help.
          For a suspicious listing, the <a href="/report" className="font-semibold text-navy underline">report form</a> is faster.
        </p>
        <p className="mt-2 text-sm">
          Email: <a className="font-semibold" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
        <form
          className="mt-8 grid max-w-lg gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const res = await submitContact({
              data: {
                name: String(fd.get("name") || ""),
                email: String(fd.get("email") || ""),
                topic: String(fd.get("topic") || "general"),
                message: String(fd.get("message") || ""),
              },
            });
            setMsg(res.ok ? "Message received. We aim to reply within one business day." : res.error);
          }}
        >
          <input name="name" required placeholder="Name" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <input name="email" type="email" required placeholder="Email" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <select name="topic" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm">
            <option value="general">General support</option>
            <option value="correction">Content correction</option>
            <option value="employer">Employer support</option>
            <option value="privacy">Privacy / data request</option>
            <option value="report">Suspicious job (also use Report)</option>
          </select>
          <textarea name="message" required rows={6} placeholder="How can we help?" className="rounded-xl border border-line bg-surface px-3 py-2 text-sm" />
          <button className="h-11 rounded-xl bg-navy text-sm font-bold text-white">Send</button>
        </form>
        {msg ? <p className="mt-3 text-sm font-semibold text-ok">{msg}</p> : null}
      </Page>
    );
  },
});

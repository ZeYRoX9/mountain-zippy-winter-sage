import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { submitJobReport } from "@/lib/server/public-actions";

export const Route = createFileRoute("/report")({
  validateSearch: (s: Record<string, unknown>) => ({
    job: typeof s.job === "string" ? s.job : undefined,
  }),
  head: () =>
    pageHead({
      title: "Report a listing",
      description: "Report a suspicious or incorrect HiredFrex job listing.",
      path: "/report",
      index: true,
    }),
  component: function Report() {
    const { job } = Route.useSearch();
    const [msg, setMsg] = useState<string | null>(null);
    return (
      <Page>
        <Eyebrow>Safety</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Report a listing or an error</h1>
        <p className="mt-3 max-w-xl text-muted">
          Tell us about application fees, impersonation, wrong employer names, or facts that do not
          match the page. We can unpublish a listing; we cannot recover money you already sent to a
          scammer.
        </p>
        <form
          className="mt-8 grid max-w-lg gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const res = await submitJobReport({
              data: {
                jobId: undefined,
                reason: String(fd.get("reason") || ""),
                details: `${job ? `Listing slug: ${job}\n` : ""}${String(fd.get("details") || "")}`,
              },
            });
            setMsg(res.ok ? "Report received. Thank you." : res.error);
          }}
        >
          <input defaultValue={job} placeholder="Job URL or slug (if known)" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <select name="reason" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm">
            <option>Asks for money / fees</option>
            <option>Impersonates a known company</option>
            <option>Wrong employer or location</option>
            <option>Remote label on physical work</option>
            <option>Incorrect salary or category</option>
            <option>Other incorrect information</option>
          </select>
          <textarea name="details" required rows={6} placeholder="What happened? Include chats or email domains if you have them — not your passport." className="rounded-xl border border-line bg-surface px-3 py-2 text-sm" />
          <button className="h-11 rounded-xl bg-navy text-sm font-bold text-white">Submit report</button>
        </form>
        {msg ? <p className="mt-3 text-sm font-semibold text-ok">{msg}</p> : null}
      </Page>
    );
  },
});

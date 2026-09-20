import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { applyToJob, toggleSavedJob } from "@/lib/server/account";
import type { PublicJob } from "@/lib/data/types";

export function ApplyPanel({ job }: { job: PublicJob }) {
  const { user, isPending } = useCurrentUserState();
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await applyToJob({
      data: {
        jobId: job.id,
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        phone: String(fd.get("phone") || ""),
        coverNote: String(fd.get("cover") || ""),
        cvText: String(fd.get("cv") || ""),
      },
    });
    setStatus(res.ok ? "Application submitted. Track it from your dashboard." : res.error);
  }

  return (
    <aside className="h-fit rounded-[22px] border border-line bg-surface p-5 lg:sticky lg:top-24">
      <h2 className="font-display text-2xl">Apply on HiredFrex</h2>
      <p className="mt-1 text-sm text-muted">Never pay to apply. Applications stay on this site.</p>
      {isPending ? (
        <div className="mt-4 h-24 animate-pulse rounded-xl bg-paper" />
      ) : !user ? (
        <div className="mt-4">
          <p className="text-sm text-muted">Sign in to apply and to save this role.</p>
          <Link
            to="/login"
            search={{ next: `/jobs/${job.slug}`, mode: "signin" }}
            className="mt-3 inline-flex h-11 items-center rounded-xl bg-navy px-4 text-sm font-bold text-white"
          >
            Sign in to apply
          </Link>
        </div>
      ) : (
        <form className="mt-4 grid gap-3" onSubmit={onApply}>
          <input name="name" required defaultValue={user.displayName ?? ""} placeholder="Full name" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm" />
          <input name="email" type="email" required defaultValue={user.primaryEmail ?? ""} placeholder="Email" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm" />
          <input name="phone" placeholder="Phone (optional)" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm" />
          <textarea name="cover" rows={4} placeholder="Short note — no fees, no passport scans here" className="rounded-xl border border-line bg-paper px-3 py-2 text-sm" />
          <textarea name="cv" rows={6} placeholder="Paste a plain-text CV (optional)" className="rounded-xl border border-line bg-paper px-3 py-2 text-sm" />
          <button className="h-11 rounded-xl bg-navy text-sm font-bold text-white">Submit application</button>
        </form>
      )}
      {status ? <p className="mt-3 text-sm font-semibold text-ok">{status}</p> : null}
      {user ? (
        <button
          className="mt-3 w-full rounded-xl border border-line py-2.5 text-sm font-semibold"
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            const r = await toggleSavedJob({ data: { jobId: job.id } });
            setStatus(r.saved ? "Saved to your dashboard." : "Removed from saved jobs.");
            setSaving(false);
          }}
        >
          Save this job
        </button>
      ) : null}
      <p className="mt-4 text-xs text-faint">
        Last reviewed {job.lastVerifiedOn ?? "—"}. Status: {job.verificationStatus.replaceAll("_", " ")}.
      </p>
    </aside>
  );
}

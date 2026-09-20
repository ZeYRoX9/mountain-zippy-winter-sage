import { Link } from "@tanstack/react-router";
import { MapPin, Banknote, Briefcase } from "lucide-react";
import type { JobListItem } from "@/lib/data/types";
import { VERIFICATION_LABELS } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function VerificationChip({ status }: { status: string }) {
  const meta = VERIFICATION_LABELS[status] ?? { label: status, tone: "neutral" as const };
  const cls =
    meta.tone === "ok"
      ? "bg-ok-soft text-ok"
      : meta.tone === "warn"
        ? "bg-warn-soft text-warn"
        : "bg-gold-soft text-navy";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${cls}`}>
      {meta.label}
    </span>
  );
}

export function JobCard({ job }: { job: JobListItem }) {
  return (
    <Link
      to="/jobs/$slug"
      params={{ slug: job.slug }}
      className="block rounded-[22px] border border-line bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-navy">{job.title}</h3>
          <p className="mt-1 text-sm font-semibold text-muted">{job.companyName}</p>
        </div>
        <VerificationChip status={job.verificationStatus} />
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> {job.locationDisplay}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5" /> {job.employmentType} · {job.workplaceType}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Banknote className="h-3.5 w-3.5" /> {job.salaryDisplay ?? "Salary not provided"}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-paper px-2.5 py-1 text-navy">{job.category}</span>
        {job.postedOn ? <span className="text-faint">Listed {formatDate(job.postedOn)}</span> : null}
      </div>
    </Link>
  );
}

import { Link } from "@tanstack/react-router";
import type { JobListItem } from "@/lib/data/types";
import { VerificationChip } from "@/components/jobs/job-card";

export function JobsRail({ jobs }: { jobs: JobListItem[] }) {
  return (
    <aside className="lg:sticky lg:top-24" aria-labelledby="jobs-rail-title">
      <div className="rounded-[24px] border border-line bg-surface p-5 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-deep">Jobs</p>
        <h2 id="jobs-rail-title" className="mt-1 font-display text-2xl leading-tight">
          Open roles now
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Read the review label on each listing before you apply. Candidates never pay HiredFrex for a
          job.
        </p>
        <ul className="mt-4 space-y-3">
          {jobs.slice(0, 6).map((job) => (
            <li key={job.id} className="border-t border-line pt-3">
              <Link to="/jobs/$slug" params={{ slug: job.slug }} className="block min-h-11">
                <div className="font-semibold text-navy">{job.title}</div>
                <div className="text-sm text-muted">{job.companyName}</div>
                <div className="mt-1 text-xs text-faint">
                  {job.locationDisplay} · {job.employmentType}
                </div>
                <div className="mt-2">
                  <VerificationChip status={job.verificationStatus} />
                </div>
              </Link>
            </li>
          ))}
          {!jobs.length ? (
            <li className="text-sm text-muted">No public listings in this sample right now.</li>
          ) : null}
        </ul>
        <Link
          to="/jobs"
          className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-gold-deep underline underline-offset-4"
        >
          All open jobs
        </Link>
        <div className="mt-5 rounded-2xl border border-line bg-gold-soft/60 p-4">
          <p className="text-sm font-semibold text-navy">Hiring?</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Post a complete vacancy. We review it before it is public. No candidate fees.
          </p>
          <Link
            to="/employers"
            className="mt-3 inline-flex h-11 items-center rounded-xl bg-navy px-3 text-sm font-bold text-paper"
          >
            Employer posting
          </Link>
        </div>
      </div>
    </aside>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { JobCard, VerificationChip } from "@/components/jobs/job-card";
import { getPublicJob, relatedJobs } from "@/lib/server/jobs";
import { pageHead, jsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { ApplyPanel } from "@/components/jobs/apply-panel";

export const Route = createFileRoute("/jobs/$slug")({
  loader: async ({ params }) => {
    const job = await getPublicJob({ data: { slug: params.slug } });
    if (!job) throw notFound();
    const related = await relatedJobs({ data: { slug: job.slug, categorySlug: job.categorySlug } });
    return { job, related };
  },
  head: ({ loaderData }) => {
    const job = loaderData?.job;
    if (!job) {
      return pageHead({
        title: "Job not found",
        description: "This listing is not on HiredFrex.",
        path: "/jobs",
        index: false,
      });
    }
    return pageHead({
      title: `${job.title} at ${job.companyName}`,
      description: job.overview.slice(0, 160),
      path: `/jobs/${job.slug}`,
    });
  },
  component: JobPage,
});

function JobPage() {
  const { job, related } = Route.useLoaderData();
  if (!job) {
    return (
      <Page>
        <h1 className="font-display text-4xl">Listing not available</h1>
        <p className="mt-3 text-muted">
          This job is not public. It may have failed verification or been closed. We do not redirect
          removed jobs to the homepage.
        </p>
        <Link to="/jobs" className="mt-4 inline-block font-bold text-gold-deep">
          Browse jobs
        </Link>
      </Page>
    );
  }

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.overview,
    datePosted: job.postedOn,
    employmentType:
      job.employmentType === "Full-time"
        ? "FULL_TIME"
        : job.employmentType === "Part-time"
          ? "PART_TIME"
          : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: job.companyName,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.locationCity,
        addressCountry: job.locationCountry,
      },
    },
  };
  if (job.closingOn) schema.validThrough = job.closingOn;
  if (job.salaryMin != null && job.salaryCurrency) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      currency: job.salaryCurrency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin,
        maxValue: job.salaryMax ?? job.salaryMin,
        unitText: job.salaryPeriod === "month" ? "MONTH" : "YEAR",
      },
    };
  }

  const guide =
    job.categorySlug === "security"
      ? { slug: "uae-security-jobs", label: "UAE security jobs guide" }
      : job.categorySlug === "hospitality"
        ? { slug: "uae-hospitality-jobs", label: "UAE hospitality jobs guide" }
        : { slug: "uae-job-search", label: "UAE job search guide" };

  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <nav className="text-sm text-faint">
        <Link to="/" className="hover:text-navy">Home</Link> /{" "}
        <Link to="/jobs" className="hover:text-navy">Jobs</Link> /{" "}
        <span className="text-navy">{job.title}</span>
      </nav>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <Eyebrow>{job.category}</Eyebrow>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{job.title}</h1>
          <p className="mt-2 text-lg font-semibold text-muted">{job.companyName}</p>
        </div>
        <VerificationChip status={job.verificationStatus} />
      </div>

      <dl className="mt-6 grid gap-3 rounded-[22px] border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4">
        <Fact k="Location" v={job.locationDisplay} />
        <Fact k="Employment type" v={job.employmentType} />
        <Fact k="Workplace" v={job.workplaceType} />
        <Fact k="Salary" v={job.salaryDisplay ?? "Not provided by the employer"} />
        <Fact k="Experience" v={job.experienceLevel ?? "Not specified"} />
        <Fact k="Posted" v={formatDate(job.postedOn)} />
        <Fact k="Closing date" v={job.closingOn ? formatDate(job.closingOn) : "Not provided"} />
        <Fact k="Last reviewed" v={formatDate(job.lastVerifiedOn)} />
      </dl>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <article>
          <Callout title="Employer-provided information">
            Fields below are taken from the listing as submitted, then cleaned for spelling and
            category. HiredFrex has not added benefits, visa promises, or a salary that was not in
            the original copy.
          </Callout>
          <h2 className="mt-6 font-display text-2xl">Job overview</h2>
          <p className="mt-2 text-muted leading-relaxed">{job.overview}</p>

          <h2 className="mt-8 font-display text-2xl">About the employer</h2>
          <p className="mt-2 text-muted leading-relaxed">{job.aboutEmployer}</p>

          <ListBlock title="Responsibilities" items={job.responsibilities} empty="The employer did not provide a responsibilities list." />
          <ListBlock title="Essential requirements" items={job.essentialRequirements} empty="The employer did not provide essential requirements." />
          <ListBlock title="Preferred requirements" items={job.preferredRequirements} empty="None stated." />
          <ListBlock title="Skills named on this listing" items={job.skills} empty="None stated." />

          <h2 className="mt-8 font-display text-2xl">Working schedule</h2>
          <p className="mt-2 text-muted">{job.schedule ?? "Not provided by the employer."}</p>
          <ListBlock title="Benefits (only if confirmed)" items={job.benefits} empty="No benefits were confirmed on this listing. HiredFrex does not invent them." />

          <h2 className="mt-8 font-display text-2xl">Visa / work authorisation</h2>
          <p className="mt-2 text-muted">
            {job.visaInfo ??
              "Not provided. HiredFrex does not infer sponsorship. For UAE processes see official pages at mohre.gov.ae and u.ae."}
          </p>

          <h2 className="mt-8 font-display text-2xl">Hiring process</h2>
          <p className="mt-2 text-muted">{job.hiringProcess ?? "Not described by the employer."}</p>

          <h2 className="mt-8 font-display text-2xl">How to apply</h2>
          <p className="mt-2 text-muted">{job.howToApply}</p>

          <h2 className="mt-8 font-display text-2xl">Original vacancy / source</h2>
          <p className="mt-2 text-muted">
            {job.sourceUrl ? (
              <a className="underline" href={job.sourceUrl} rel="nofollow noopener">
                {job.sourceName ?? job.sourceUrl}
              </a>
            ) : (
              job.sourceName ?? "Employer-submitted on HiredFrex. No independent public source URL."
            )}
          </p>

          <Callout title="HiredFrex editorial information">
            <p>{job.verificationSummary}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {job.checks.map((c) => (
                <li key={c.id}>
                  <span className="font-bold text-navy">
                    {c.label}: {c.result.replace("_", " ")}
                  </span>
                  <span className="text-muted"> — {c.detail}</span>
                </li>
              ))}
            </ul>
            {job.qualityFlags.length ? (
              <p className="mt-3 text-sm text-warn">Flags: {job.qualityFlags.join(", ")}</p>
            ) : null}
          </Callout>

          <p className="mt-6 text-sm">
            Preparing to apply? Read the{" "}
            <Link to="/guides/$slug" params={{ slug: guide.slug }} className="font-semibold text-navy underline">
              {guide.label}
            </Link>
            , the{" "}
            <Link to="/guides/$slug" params={{ slug: "uae-cv" }} className="font-semibold text-navy underline">
              UAE CV guide
            </Link>
            , and{" "}
            <Link to="/guides/$slug" params={{ slug: "verify-a-job-offer" }} className="font-semibold text-navy underline">
              how to verify an offer
            </Link>
            .
          </p>
          <p className="mt-2 text-sm">
            <Link to="/report" search={{ job: job.slug } as { job: string }} className="font-bold text-danger">
              Report this job
            </Link>
          </p>
        </article>
        <ApplyPanel job={job} />
      </div>

      {related.length ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl">More in {job.category}</h2>
          <div className="mt-4 grid gap-3">
            {related.map((r) => (
              <JobCard key={r.id} job={r} />
            ))}
          </div>
        </section>
      ) : null}
    </Page>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-wider text-faint">{k}</dt>
      <dd className="mt-1 text-sm font-semibold text-navy">{v}</dd>
    </div>
  );
}

function ListBlock({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-2xl">{title}</h2>
      {items.length ? (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
          {items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-muted">{empty}</p>
      )}
    </section>
  );
}

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-[18px] border border-gold/40 bg-gold-soft/60 p-4">
      <div className="text-[11px] font-bold uppercase tracking-wider text-gold-deep">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-navy">{children}</div>
    </aside>
  );
}

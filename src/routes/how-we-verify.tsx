import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/how-we-verify")({
  head: () =>
    pageHead({
      title: "How HiredFrex verifies jobs",
      description:
        "The checks HiredFrex actually runs on job listings — completeness, red flags, source, and what we do not claim.",
      path: "/how-we-verify",
    }),
  component: function VerifyPage() {
    return (
      <Page>
        <Eyebrow>Trust</Eyebrow>
        <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-5xl">How HiredFrex verifies jobs</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          “Reviewed” on this site has a specific meaning. This page is the policy. If a badge on a
          job contradicts this page, this page wins.
        </p>
        <div className="prose-hf mt-8">
          <h2>What we claim — and what we do not</h2>
          <p>
            Most public listings are <strong>completeness reviewed</strong>. That means an editor or
            an automated checklist ran on the fields the employer submitted. It does{" "}
            <strong>not</strong> mean HiredFrex confirmed the company’s trade licence, called HR, or
            saw the vacancy on the company’s own careers page.
          </p>
          <p>
            We only use <strong>source confirmed</strong> when a public vacancy URL was checked, and{" "}
            <strong>employer confirmed</strong> when employer identity was actually confirmed. Those
            statuses are rare in the current sample. We would rather show a weaker badge than a fake
            one.
          </p>
          <h2>The checklist</h2>
          <ol>
            <li><strong>Employer identity review</strong> — currently not independently completed for most listings. The job page says so.</li>
            <li><strong>Vacancy / source review</strong> — we store a source URL when we have one. If we do not, the listing stays employer-submitted.</li>
            <li><strong>Contact information review</strong> — applications go through HiredFrex. We do not publish a personal WhatsApp number as “HR.”</li>
            <li><strong>Salary plausibility review</strong> — missing, currency-less, or internally inconsistent pay is flagged or the listing is refused. We do not invent a number.</li>
            <li><strong>Duplicate listing review</strong> — same title + employer + city is not republished as a new page.</li>
            <li><strong>Application destination review</strong> — we do not send you to an unknown off-site form from a public job page.</li>
            <li><strong>Scam / red-flag screening</strong> — application fees, crypto, “test job” copy, and remote labels on physical work are blocking.</li>
            <li><strong>Editorial completeness review</strong> — category, workplace type, and contradictions. Manual when a human opened the listing; automated when an employer posts through the dashboard.</li>
            <li><strong>Candidate reporting</strong> — anyone can <a href="/report">report a listing</a>. Reports can unpublish a page.</li>
            <li><strong>Removal</strong> — unverifiable major-brand vacancies are removed, not redirected to the homepage.</li>
          </ol>
          <h2>Labels you will see</h2>
          <ul>
            <li>Completeness reviewed</li>
            <li>Source confirmed</li>
            <li>Employer confirmed</li>
            <li>Pending review (not public)</li>
            <li>Closed / not published</li>
          </ul>
          <h2>Last reviewed date</h2>
          <p>
            Job pages show the date the current version was reviewed. If information is missing, we
            write “not provided by the employer” rather than filling the gap with typical-job boilerplate
            presented as fact.
          </p>
          <p>
            Read <Link to="/editorial-standards">editorial standards</Link> and the{" "}
            <Link to="/disclaimer">disclaimer</Link>.
          </p>
        </div>
      </Page>
    );
  },
});

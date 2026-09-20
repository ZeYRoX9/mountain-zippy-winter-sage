import { createFileRoute } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms & Conditions",
      description: "Terms for using HiredFrex as a job seeker or employer.",
      path: "/terms",
    }),
  component: function Terms() {
    return (
      <Page>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Terms & Conditions</h1>
        <p className="mt-2 text-sm text-muted">Updated 19 September 2026</p>
        <div className="prose-hf mt-8">
          <h2>1. Agreement</h2>
          <p>By using HiredFrex.com you agree to these terms. You must be 18 or older to create an account.</p>
          <h2>2. What HiredFrex is</h2>
          <p>
            HiredFrex is a platform where employers post roles and candidates apply. We are not the
            employer, a recruitment agency of record, or a party to any employment contract formed
            through the service.
          </p>
          <h2>3. Accounts</h2>
          <p>
            Provide accurate information. You are responsible for activity on your account. We may
            suspend accounts that post fraud, charge applicants, or abuse the service.
          </p>
          <h2>4. Job listings and review</h2>
          <p>
            Listings are reviewed against the quality rules described in How HiredFrex verifies jobs.
            Review is not a guarantee of accuracy or of the employer’s conduct. We may refuse or
            remove listings, including those that impersonate brands, request fees, or contradict
            themselves.
          </p>
          <h2>5. Acceptable use</h2>
          <p>
            Do not post unlawful or discriminatory content, request money from applicants, scrape the
            service, or impersonate HiredFrex staff.
          </p>
          <h2>6. Your content</h2>
          <p>
            You keep ownership of CVs and listings you upload. You grant us a licence to host and
            display them to operate the service.
          </p>
          <h2>7. Fees</h2>
          <p>The service is currently free for candidates and for employer postings. Candidates will not be charged to apply.</p>
          <h2>8. Disclaimers</h2>
          <p>The service is provided as is. Hiring outcomes are between you and the other party.</p>
        </div>
      </Page>
    );
  },
});

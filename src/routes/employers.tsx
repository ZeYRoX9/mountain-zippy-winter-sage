import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/employers")({
  head: () =>
    pageHead({
      title: "For employers",
      description: "Post a complete, honest vacancy on HiredFrex. Automated quality checks run before a listing can go live.",
      path: "/employers",
    }),
  component: function Employers() {
    return (
      <Page>
        <Eyebrow>Hiring</Eyebrow>
        <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-5xl">Post a real job. We will label it honestly.</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Create an employer account, describe the vacancy completely, and take applications in one
          dashboard. We block fees, placeholder copy, and remote labels on physical work. We will not
          mark you “verified” until that check actually happens.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/login" search={{ mode: "signup", next: "/account" }} className="rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white">
            Create employer account
          </Link>
          <Link to="/guides/$slug" params={{ slug: "responsible-hiring" }} className="rounded-xl border border-line px-4 py-2.5 text-sm font-bold">
            Responsible hiring guide
          </Link>
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["1. Account", "Sign in, choose Hiring, add the legal company name."],
            ["2. Complete listing", "Title, city, workplace type, overview, responsibilities, requirements."],
            ["3. Review & applications", "Automated checks run. Candidates apply on HiredFrex. Close the role when filled."],
          ].map(([t, b]) => (
            <li key={t} className="rounded-[22px] border border-line bg-surface p-5">
              <h2 className="font-display text-2xl">{t}</h2>
              <p className="mt-2 text-sm text-muted">{b}</p>
            </li>
          ))}
        </ol>
      </Page>
    );
  },
});

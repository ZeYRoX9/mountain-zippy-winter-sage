import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { JobCard } from "@/components/jobs/job-card";
import { listPublicJobs, jobFacets } from "@/lib/server/jobs";
import { pageHead } from "@/lib/seo";
import { CATEGORIES, EMPLOYMENT_TYPES, WORKPLACE_TYPES } from "@/lib/site";

type Search = {
  q?: string;
  category?: string;
  city?: string;
  type?: string;
  workplace?: string;
};

export const Route = createFileRoute("/jobs/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    city: typeof s.city === "string" ? s.city : undefined,
    type: typeof s.type === "string" ? s.type : undefined,
    workplace: typeof s.workplace === "string" ? s.workplace : undefined,
  }),
  head: () =>
    pageHead({
      title: "Browse jobs",
      description:
        "Public HiredFrex listings with verification labels, advertised salaries where provided, and no invented employer brands.",
      path: "/jobs",
      index: true,
    }),
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => {
    const [jobs, facets] = await Promise.all([listPublicJobs({ data: deps }), jobFacets()]);
    return { jobs, facets };
  },
  component: JobsPage,
});

function JobsPage() {
  const { jobs, facets } = Route.useLoaderData();
  const search = Route.useSearch();

  return (
    <Page>
      <Eyebrow>Directory</Eyebrow>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Browse jobs</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {facets.total} public listings after quality review. Every card shows the verification
        status we actually assigned — usually <strong>completeness reviewed</strong>, not “verified
        employer.” Thin filter combinations are not given unique SEO pages.
      </p>

      <form method="get" className="mt-6 grid gap-3 rounded-[22px] border border-line bg-surface p-4 md:grid-cols-5">
        <input
          name="q"
          defaultValue={search.q}
          placeholder="Keyword"
          className="h-11 rounded-xl border border-line bg-paper px-3 text-sm"
        />
        <select name="category" defaultValue={search.category ?? ""} className="h-11 rounded-xl border border-line bg-paper px-3 text-sm">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select name="city" defaultValue={search.city ?? ""} className="h-11 rounded-xl border border-line bg-paper px-3 text-sm">
          <option value="">All cities</option>
          {facets.cities.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name} ({c.n})
            </option>
          ))}
        </select>
        <select name="type" defaultValue={search.type ?? ""} className="h-11 rounded-xl border border-line bg-paper px-3 text-sm">
          <option value="">Any type</option>
          {EMPLOYMENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button className="h-11 rounded-xl bg-navy text-sm font-bold text-white">Apply filters</button>
      </form>
      <p className="mt-2 text-xs text-faint">
        Workplace types in this sample: {WORKPLACE_TYPES.join(", ")}. Filtered views use query
        parameters and keep <code>/jobs</code> as the canonical URL.
      </p>

      <div className="mt-8 grid gap-3">
        {jobs.length ? jobs.map((job) => <JobCard key={job.id} job={job} />) : (
          <div className="rounded-[22px] border border-line bg-surface p-8 text-muted">
            No public listings match those filters. Try clearing a filter or read the{" "}
            <Link to="/guides" className="font-semibold text-navy underline">
              career guides
            </Link>
            .
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-[22px] border border-line bg-surface p-5">
          <h2 className="font-display text-2xl">Categories with live listings</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {facets.categories.map((c) => (
              <li key={c.name}>
                <Link to="/categories/$slug" params={{ slug: c.name }} className="font-semibold text-navy">
                  {c.name.replace(/-/g, " ")}
                </Link>{" "}
                <span className="text-faint">({c.n})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[22px] border border-line bg-surface p-5">
          <h2 className="font-display text-2xl">Cities in this sample</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {facets.cities.map((c) => (
              <li key={c.name}>
                <Link
                  to="/locations/$slug"
                  params={{ slug: c.name.toLowerCase().replace(/\s+/g, "-") }}
                  className="font-semibold text-navy"
                >
                  {c.name}
                </Link>{" "}
                <span className="text-faint">({c.n})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { JobCard } from "@/components/jobs/job-card";
import { listPublicJobs } from "@/lib/server/jobs";
import { pageHead } from "@/lib/seo";
import { CATEGORIES } from "@/lib/site";

export const Route = createFileRoute("/categories/$slug")({
  loader: async ({ params }) => {
    const meta = CATEGORIES.find((c) => c.slug === params.slug);
    const jobs = await listPublicJobs({ data: { category: params.slug } });
    return { meta, jobs, slug: params.slug };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.meta?.name ?? loaderData?.slug;
    return pageHead({
      title: `${name} jobs`,
      description: `Public HiredFrex listings in ${name}. Filter pages are not indexed.`,
      path: `/categories/${loaderData?.slug}`,
      index: false,
    });
  },
  component: function CategoryPage() {
    const { meta, jobs, slug } = Route.useLoaderData();
    const name = meta?.name ?? slug;
    const intro: Record<string, string> = {
      security:
        "Security listings on HiredFrex are on-site roles. Read the verification panel: several current pages have missing or inferred salary, and employer identity is not independently confirmed.",
      hospitality:
        "Hospitality here means service-floor work. Brand-name hotel vacancies without a source were unpublished. Remaining listings are labelled honestly.",
      logistics: "Warehouse and factory-adjacent work is on-site. Shift notes appear only when the employer wrote them.",
      administrative: "Office secretary and assistant roles. Category was corrected from generic “Other” or HR where the title did not match.",
      sales: "Retail and sales-executive listings. Generic trading names stay unverified.",
    };
    return (
      <Page>
        <Eyebrow>Category</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">{name} jobs</h1>
        <p className="mt-3 max-w-2xl text-muted">
          {intro[slug] ??
            `Public completeness-reviewed listings tagged ${name}. Empty categories are noindexed.`}
        </p>
        <div className="mt-8 grid gap-3">
          {jobs.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
        {!jobs.length ? (
          <p className="text-muted">
            No live listings in this category. See <Link to="/jobs">all jobs</Link> or{" "}
            <Link to="/guides">guides</Link>.
          </p>
        ) : null}
      </Page>
    );
  },
});

import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { JobCard } from "@/components/jobs/job-card";
import { listPublicJobs } from "@/lib/server/jobs";
import { pageHead } from "@/lib/seo";

function cityFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(" ");
}

export const Route = createFileRoute("/locations/$slug")({
  loader: async ({ params }) => {
    const city = cityFromSlug(params.slug);
    const jobs = await listPublicJobs({ data: { city } });
    return { city, jobs, slug: params.slug };
  },
  head: ({ loaderData }) =>
    pageHead({
      title: `Jobs in ${loaderData?.city ?? "this city"}`,
      description: `HiredFrex listings in ${loaderData?.city}.`,
      path: `/locations/${loaderData?.slug}`,
      index: false,

    }),
  component: function LocationPage() {
    const { city, jobs } = Route.useLoaderData();
    return (
      <Page>
        <Eyebrow>Location</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Jobs in {city}</h1>
        <p className="mt-3 max-w-2xl text-muted">
          These are public listings whose city field matches {city}. This is not a government job
          bank. For UAE labour processes use mohre.gov.ae and u.ae.
        </p>
        <div className="mt-8 grid gap-3">
          {jobs.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
        {!jobs.length ? (
          <p className="text-muted">
            No live listings. <Link to="/jobs">Browse all jobs</Link>.
          </p>
        ) : null}
      </Page>
    );
  },
});

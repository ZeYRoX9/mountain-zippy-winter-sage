import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { JobsRail } from "@/components/jobs/jobs-rail";
import { listPosts } from "@/lib/server/blog";
import { listPublicJobs } from "@/lib/server/jobs";
import { pageHead } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { PUBLISHING_PLAN } from "@/lib/authors";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      title: "Career insights",
      description:
        "Original HiredFrex editorial on Gulf job search, official UAE channels, scam checks, CVs, and how we label listings. Named authors, dated pieces.",
      path: "/blog",
    }),
  loader: async () => {
    const [posts, jobs] = await Promise.all([listPosts(), listPublicJobs({ data: {} })]);
    return { posts, jobs };
  },
  component: function BlogIndex() {
    const { posts, jobs } = Route.useLoaderData();
    const cats = [...new Set(posts.map((p) => p.category))];
    return (
      <Page>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <Eyebrow>Insights</Eyebrow>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">Career insights</h1>
            <p className="mt-3 max-w-2xl font-serif text-lg text-muted">
              Dated articles with named authors and sources. Publish one substantial piece a day —
              not ten thin pages in an afternoon.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cats.map((c) => (
                <span key={c} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-navy">
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-4">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="rounded-[22px] border border-line bg-surface p-6"
                >
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gold-deep">{p.category}</div>
                  <h2 className="mt-2 font-display text-2xl">{p.title}</h2>
                  <p className="mt-2 font-serif text-muted">{p.excerpt}</p>
                  <p className="mt-3 text-xs text-faint">
                    {p.author} · {formatDate(p.publishedOn)} · {p.readMinutes} min read
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-10 rounded-[22px] border border-line bg-gold-soft/40 p-5">
              <h2 className="font-display text-xl">12-day calendar</h2>
              <ol className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
                {PUBLISHING_PLAN.map((d) => (
                  <li key={d.day}>
                    <span className="text-faint">{d.date.slice(5)} · </span>
                    {d.title}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <JobsRail jobs={jobs} />
        </div>
      </Page>
    );
  },
});

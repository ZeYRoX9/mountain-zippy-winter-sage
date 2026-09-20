import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { listPosts } from "@/lib/server/blog";
import { listPublicJobs } from "@/lib/server/jobs";
import { GUIDES } from "@/lib/content/guides";

export const Route = createFileRoute("/sitemap")({
  head: () =>
    pageHead({
      title: "Sitemap",
      description: "Every public HiredFrex page: insights, guides, jobs, and legal documents.",
      path: "/sitemap",
    }),
  loader: async () => {
    const [posts, jobs] = await Promise.all([listPosts(), listPublicJobs({ data: {} })]);
    return { posts, jobs };
  },
  component: function HumanSitemap() {
    const { posts, jobs } = Route.useLoaderData();
    return (
      <Page>
        <Eyebrow>Find a page</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Sitemap</h1>
        <p className="mt-3 max-w-2xl font-serif text-lg text-muted">
          Clear routes for readers and for crawlers. The machine-readable file is{" "}
          <a className="font-semibold text-navy underline" href="/sitemap.xml">
            /sitemap.xml
          </a>
          .
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="font-display text-2xl">Insights</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/blog" className="font-semibold text-navy underline">
                  All insights
                </Link>
              </li>
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link to="/blog/$slug" params={{ slug: p.slug }}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl">Guides</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/guides" className="font-semibold text-navy underline">
                  All guides
                </Link>
              </li>
              {GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link to="/guides/$slug" params={{ slug: g.slug }}>
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl">Jobs</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="font-semibold text-navy underline">
                  All open jobs
                </Link>
              </li>
              <li>
                <Link to="/employers" className="font-semibold text-navy underline">
                  Employer posting
                </Link>
              </li>
              {jobs.map((j) => (
                <li key={j.slug}>
                  <Link to="/jobs/$slug" params={{ slug: j.slug }}>
                    {j.title} — {j.companyName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl">About this site</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["/about", "About"],
                ["/authors", "Writers"],
                ["/contact", "Contact"],
                ["/faq", "FAQ"],
                ["/how-we-verify", "How we review listings"],
                ["/editorial-standards", "Editorial standards"],
                ["/privacy", "Privacy"],
                ["/cookies", "Cookies"],
                ["/terms", "Terms"],
                ["/disclaimer", "Disclaimer"],
                ["/report", "Report a listing"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Page>
    );
  },
});

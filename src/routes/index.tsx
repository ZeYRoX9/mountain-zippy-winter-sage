import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { JobsRail } from "@/components/jobs/jobs-rail";
import { listPublicJobs } from "@/lib/server/jobs";
import { listPosts } from "@/lib/server/blog";
import { pageHead, jsonLd } from "@/lib/seo";
import { GUIDES } from "@/lib/content/guides";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { STAFF_AUTHORS } from "@/lib/authors";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "HiredFrex — Career guides and honest job listings",
      description:
        "Original Gulf and international career guides, scam checks tied to official sources, and a small job board with honest review labels. Free to read. Candidates never pay to apply.",
      path: "/",
    }),
  loader: async () => {
    const [jobs, posts] = await Promise.all([listPublicJobs({ data: {} }), listPosts()]);
    return { jobs, posts };
  },
  component: Home,
});

function Home() {
  const { jobs, posts } = Route.useLoaderData();
  const featured = posts[0];
  const rest = posts.slice(1, 8);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "HiredFrex",
        url: SITE_URL,
        email: "support@hiredfrex.com",
        description:
          "Career information site and small reviewed job board for Gulf and international applicants.",
      },
      {
        "@type": "WebSite",
        name: "HiredFrex",
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/jobs?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <Page className="!max-w-none !px-0 !py-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <section className="border-b border-line bg-paper px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-deep">
            Career desk · Gulf & international
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] md:text-[52px]">
            Advice you can check. Jobs you can read twice.
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-muted">
            HiredFrex is a reading site first: dated articles, named authors, and official sources. A
            jobs rail sits on the side with current openings and a door for employers to post.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/blog" className="inline-flex h-12 items-center rounded-xl bg-navy px-5 text-sm font-bold text-paper">
              Read insights
            </Link>
            <Link to="/jobs" className="inline-flex h-12 items-center rounded-xl border border-line bg-surface px-5 text-sm font-bold text-navy">
              Open jobs
            </Link>
            <Link to="/employers" className="inline-flex h-12 items-center rounded-xl px-5 text-sm font-bold text-gold-deep underline underline-offset-4">
              Employer posting
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <Eyebrow>Today’s desk</Eyebrow>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">What to read before you apply</h2>
          {featured ? (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="mt-6 block rounded-[28px] border border-line bg-surface p-6 md:p-8"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-gold-deep">{featured.category}</div>
              <h3 className="mt-2 font-display text-3xl leading-tight md:text-4xl">{featured.title}</h3>
              <p className="mt-3 font-serif text-lg text-muted">{featured.excerpt}</p>
              <p className="mt-4 text-xs text-faint">
                {featured.author} · {formatDate(featured.publishedOn)} · {featured.readMinutes} min
              </p>
            </Link>
          ) : null}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {rest.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="rounded-[22px] border border-line bg-surface p-5"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-gold-deep">{p.category}</div>
                <h3 className="mt-2 font-display text-2xl leading-tight">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{p.excerpt}</p>
                <p className="mt-3 text-xs text-faint">
                  {p.author} · {formatDate(p.publishedOn)}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 rounded-[24px] border border-line bg-gold-soft/40 p-6">
            <h2 className="font-display text-2xl">Who writes this desk</h2>
            <p className="mt-2 text-sm text-muted">
              Dated articles carry a named editor, a photo, and a date. Process pages explain what
              “reviewed” means before you treat a listing as a confirmed hire.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {STAFF_AUTHORS.map((a) => (
                <Link key={a.id} to="/authors/$id" params={{ id: a.id }} className="flex items-start gap-3 rounded-2xl bg-surface p-3">
                  <img src={a.photo} alt="" width={48} height={48} className="h-12 w-12 rounded-full" />
                  <span>
                    <span className="block font-semibold text-navy">{a.name}</span>
                    <span className="block text-xs text-faint">{a.title} · {a.based.split(",")[0]}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <Eyebrow>Guides</Eyebrow>
            <h2 className="mt-2 font-display text-3xl">Evergreen how-tos</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {GUIDES.slice(0, 6).map((g) => (
                <Link key={g.slug} to="/guides/$slug" params={{ slug: g.slug }} className="rounded-[22px] border border-line bg-surface p-5">
                  <h3 className="font-display text-xl">{g.title}</h3>
                  <p className="mt-2 text-sm text-muted">{g.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <JobsRail jobs={jobs} />
      </section>
    </Page>
  );
}

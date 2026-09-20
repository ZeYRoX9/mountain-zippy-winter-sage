import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page } from "@/components/layout/site-shell";
import { ArticleLayout } from "@/components/layout/article-layout";
import { AuthorByline } from "@/components/blog/author-byline";
import { ReadingProgress } from "@/components/layout/reading-progress";
import { getPost, listPosts } from "@/lib/server/blog";
import { listPublicJobs } from "@/lib/server/jobs";
import { pageHead, jsonLd } from "@/lib/seo";
import { renderMarkdown } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const [post, jobs, posts] = await Promise.all([
      getPost({ data: { slug: params.slug } }),
      listPublicJobs({ data: {} }),
      listPosts(),
    ]);
    if (!post) throw notFound();
    const related = posts.filter((p) => p.slug !== post.slug).slice(0, 4);
    return { post, jobs, related };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return pageHead({ title: "Article not found", description: "", path: "/blog", index: false });
    return pageHead({
      title: p.title,
      description: p.excerpt,
      path: `/blog/${p.slug}`,
    });
  },
  component: function PostPage() {
    const { post: p, jobs, related } = Route.useLoaderData();
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.title,
      datePublished: p.publishedOn,
      dateModified: p.updatedOn,
      description: p.excerpt,
      author: { "@type": "Person", name: p.author },
      publisher: {
        "@type": "Organization",
        name: "HiredFrex",
        url: SITE_URL,
        logo: `${SITE_URL}/logo-mark.png`,
      },
      image: p.coverUrl || `${SITE_URL}/og.jpg`,
      mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
    };
    return (
      <Page>
        <ReadingProgress />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        <ArticleLayout jobs={jobs}>
          <nav className="text-sm text-faint">
            <Link to="/">Home</Link> / <Link to="/blog">Insights</Link> / {p.category}
          </nav>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-gold-deep">{p.category}</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-5xl">{p.title}</h1>
          <AuthorByline
            author={p.author}
            photo={p.authorPhoto}
            publishedOn={p.publishedOn}
            updatedOn={p.updatedOn}
            minutes={p.readMinutes}
          />
          {p.coverUrl ? (
            <img src={p.coverUrl} alt="" className="mt-6 w-full rounded-[22px] object-cover" />
          ) : null}
          <div className="prose-hf mt-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body) }} />
          {related.length ? (
            <div className="mt-12">
              <h2 className="font-display text-2xl">Read next</h2>
              <ul className="mt-3 space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to="/blog/$slug" params={{ slug: r.slug }} className="font-semibold text-navy underline">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="mt-10 text-sm text-muted">
            Corrections: <Link to="/editorial-standards" className="font-semibold text-navy">editorial standards</Link> or{" "}
            <Link to="/contact" className="font-semibold text-navy">contact</Link>.
          </p>
        </ArticleLayout>
      </Page>
    );
  },
});

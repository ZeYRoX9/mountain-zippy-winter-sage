import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead, jsonLd } from "@/lib/seo";
import { authorById } from "@/lib/authors";
import { listPosts } from "@/lib/server/blog";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/authors/$id")({
  loader: async ({ params }) => {
    const author = authorById(params.id);
    if (!author) throw notFound();
    const posts = (await listPosts()).filter((p) => p.author === author.name);
    return { author, posts };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.author;
    if (!a) return pageHead({ title: "Writer", description: "", path: "/authors", index: false });
    return pageHead({
      title: a.name,
      description: a.bio,
      path: `/authors/${a.id}`,
    });
  },
  component: function AuthorPage() {
    const { author, posts } = Route.useLoaderData();
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: author.name,
      jobTitle: author.title,
      description: author.bio,
      url: `${SITE_URL}/authors/${author.id}`,
      image: `${SITE_URL}${author.photo}`,
      worksFor: { "@type": "Organization", name: "HiredFrex", url: SITE_URL },
    };
    return (
      <Page>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        <nav className="text-sm text-faint">
          <Link to="/">Home</Link> / <Link to="/authors">Writers</Link> / {author.name}
        </nav>
        <div className="mt-6 flex flex-wrap items-start gap-5">
          <img src={author.photo} alt="" width={96} height={96} className="h-24 w-24 rounded-full" />
          <div>
            <Eyebrow>{author.title}</Eyebrow>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">{author.name}</h1>
            <p className="mt-2 text-sm text-faint">{author.based}</p>
            <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-muted">{author.bio}</p>
          </div>
        </div>
        <h2 className="mt-12 font-display text-3xl">Articles</h2>
        <div className="mt-5 grid gap-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="rounded-[22px] border border-line bg-surface p-5"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-gold-deep">{p.category}</div>
              <h3 className="mt-2 font-display text-2xl leading-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
              <p className="mt-3 text-xs text-faint">
                {formatDate(p.publishedOn)} · {p.readMinutes} min
              </p>
            </Link>
          ))}
          {!posts.length ? <p className="text-muted">No live articles under this byline yet.</p> : null}
        </div>
      </Page>
    );
  },
});

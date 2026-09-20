import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page } from "@/components/layout/site-shell";
import { getGuide } from "@/lib/content/guides";
import { pageHead } from "@/lib/seo";
import { renderMarkdown } from "@/lib/markdown";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const g = getGuide(params.slug);
    if (!g) throw notFound();
    return g;
  },
  head: ({ loaderData }) => {
    const g = loaderData;
    if (!g) return pageHead({ title: "Guide not found", description: "", path: "/guides", index: false });
    return pageHead({ title: g.title, description: g.excerpt, path: `/guides/${g.slug}` });
  },
  component: function GuidePage() {
    const g = Route.useLoaderData();
    if (!g) {
      return (
        <Page>
          <h1 className="font-display text-4xl">Guide not found</h1>
          <Link to="/guides" className="mt-4 inline-block font-bold text-gold-deep">All guides</Link>
        </Page>
      );
    }
    return (
      <Page>
        <nav className="text-sm text-faint">
          <Link to="/guides">Guides</Link> / {g.title}
        </nav>
        <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-5xl">{g.title}</h1>
        <p className="mt-3 text-sm text-muted">HiredFrex Editorial · Updated {g.updated} · {g.minutes} min read</p>
        <div className="prose-hf mt-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(g.body) }} />
      </Page>
    );
  },
});

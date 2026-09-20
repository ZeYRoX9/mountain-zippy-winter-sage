import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { GUIDES } from "@/lib/content/guides";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/")({
  head: () =>
    pageHead({
      title: "Career guides",
      description: "Practical HiredFrex guides for UAE job search, CVs, visas, scams, and verification.",
      path: "/guides",
    }),
  component: function GuidesIndex() {
    return (
      <Page>
        <Eyebrow>Resources</Eyebrow>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Career guides</h1>
        <p className="mt-3 max-w-2xl text-muted">
          These pages are original HiredFrex explainers. They cite official sources where a fact is
          legal or statistical, and they refuse to invent salary tables.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {GUIDES.map((g) => (
            <Link key={g.slug} to="/guides/$slug" params={{ slug: g.slug }} className="rounded-[22px] border border-line bg-surface p-5">
              <h2 className="font-display text-2xl">{g.title}</h2>
              <p className="mt-2 text-sm text-muted">{g.excerpt}</p>
              <p className="mt-3 text-xs text-faint">Updated {g.updated} · {g.minutes} min</p>
            </Link>
          ))}
        </div>
      </Page>
    );
  },
});

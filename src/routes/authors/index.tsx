import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { STAFF_AUTHORS } from "@/lib/authors";

export const Route = createFileRoute("/authors/")({
  head: () =>
    pageHead({
      title: "Writers",
      description: "Named HiredFrex editors: who writes the career desk, and where they work from.",
      path: "/authors",
    }),
  component: function AuthorsIndex() {
    return (
      <Page>
        <Eyebrow>Desk</Eyebrow>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Who writes HiredFrex</h1>
        <p className="mt-3 max-w-2xl font-serif text-lg text-muted">
          Articles carry a person, a title, and a photo. We do not publish an anonymous “editorial
          team” byline on dated pieces.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STAFF_AUTHORS.map((a) => (
            <Link
              key={a.id}
              to="/authors/$id"
              params={{ id: a.id }}
              className="rounded-[24px] border border-line bg-surface p-6"
            >
              <img src={a.photo} alt="" width={80} height={80} className="h-20 w-20 rounded-full" />
              <h2 className="mt-4 font-display text-2xl">{a.name}</h2>
              <p className="text-sm font-semibold text-gold-deep">{a.title}</p>
              <p className="mt-1 text-xs text-faint">{a.based}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a.bio}</p>
            </Link>
          ))}
        </div>
      </Page>
    );
  },
});

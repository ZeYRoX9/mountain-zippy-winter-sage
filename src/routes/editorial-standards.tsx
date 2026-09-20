import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/editorial-standards")({
  head: () =>
    pageHead({
      title: "Editorial standards",
      description: "How HiredFrex researches, labels, and corrects employment information.",
      path: "/editorial-standards",
    }),
  component: function Editorial() {
    return (
      <Page>
        <Eyebrow>Trust</Eyebrow>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Editorial standards</h1>
        <div className="prose-hf mt-8">
          <h2>Who creates content</h2>
          <p>
            Dated articles carry a named editor — currently{" "}
            <Link to="/authors/$id" params={{ id: "amira" }}>
              Amira Hassan
            </Link>
            ,{" "}
            <Link to="/authors/$id" params={{ id: "paul" }}>
              Paul Mensah
            </Link>{" "}
            (founder, Abu Dhabi), and{" "}
            <Link to="/authors/$id" params={{ id: "nour" }}>
              Nour El-Sayed
            </Link>{" "}
            (labour desk). Each piece shows a photo, a title, and a date. Evergreen guides are
            organisational pages maintained by the same desk. We do not invent extra executives, and
            we do not put a model name on a byline.
          </p>
          <h2>How information is researched</h2>
          <p>
            Legal and government facts must be attributable to a primary page (for example MoHRE or
            u.ae, or the FTC for US scam statistics). If we cannot cite it, we do not state it as
            fact. We would rather write “information requires verification.”
          </p>
          <h2>Listings versus editorial</h2>
          <p>
            Job pages separate employer-provided fields from HiredFrex labels. Category corrections
            (for example “Other” to Administrative) are editorial and disclosed on the page.
          </p>
          <h2>What we refuse to publish</h2>
          <ul>
            <li>Placeholder and test jobs</li>
            <li>Unsourced major-brand vacancies presented as verified</li>
            <li>Invented salaries, benefits, reviews, or headcount</li>
            <li>Unsupported “average salary in the UAE” tables</li>
            <li>Automatic remote labels on physical work</li>
            <li>Thin city doorway pages written only to rank</li>
          </ul>
          <h2>Length and original reporting</h2>
          <p>
            Studio posts that go live must be at least 800 words of original copy. We would rather
            publish fewer pages than a calendar of stubs. Corrections and process pages are part of
            the site, not an afterthought.
          </p>
          <h2>Corrections</h2>
          <p>
            Email {SUPPORT_EMAIL} or use the <Link to="/contact">contact form</Link> with the URL and
            the error. Material errors get a dated note on the page. Listings that cannot be
            substantiated are unpublished.
          </p>
          <p>
            Report a suspicious job: <a href="/report">report form</a>.
          </p>
        </div>
      </Page>
    );
  },
});

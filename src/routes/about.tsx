import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead, jsonLd } from "@/lib/seo";
import { SITE_URL, SUPPORT_EMAIL } from "@/lib/site";
import { STAFF_AUTHORS } from "@/lib/authors";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About HiredFrex",
      description:
        "HiredFrex is a career-information site and small job board run by Paul Mensah from Abu Dhabi, with named editors in the UAE.",
      path: "/about",
    }),
  component: function About() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "HiredFrex",
      url: SITE_URL,
      email: SUPPORT_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abu Dhabi",
        addressCountry: "AE",
      },
      founder: { "@type": "Person", name: "Paul Mensah" },
    };
    return (
      <Page>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        <Eyebrow>About</Eyebrow>
        <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-5xl">
          A career desk first. A job board second.
        </h1>
        <div className="prose-hf mt-8">
          <p>
            HiredFrex.com is a practical information site for people applying to Gulf and
            entry-level international jobs — especially those who keep meeting cloned brand names,
            blank salaries, and pages written only to attract ads.
          </p>
          <p>
            The public site leads with original guides and dated articles. Named editors cite
            official sources (MoHRE, u.ae, and the US FTC for scam statistics). Listings exist, but
            they are a small, labelled sample. Candidates never pay to apply.
          </p>
          <h2>Who operates it</h2>
          <p>
            HiredFrex is run by <strong>Paul Mensah</strong> from Abu Dhabi, United Arab Emirates.
            It is a small independent site, not a government portal and not a licensed recruitment
            agency of record. Contact: {SUPPORT_EMAIL}.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STAFF_AUTHORS.map((a) => (
            <Link
              key={a.id}
              to="/authors/$id"
              params={{ id: a.id }}
              className="rounded-[22px] border border-line bg-surface p-5"
            >
              <img src={a.photo} alt="" width={72} height={72} className="h-18 w-18 rounded-full" />
              <h2 className="mt-3 font-display text-2xl">{a.name}</h2>
              <p className="text-sm font-semibold text-gold-deep">{a.title}</p>
              <p className="mt-1 text-xs text-faint">{a.based}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a.bio}</p>
            </Link>
          ))}
        </div>
        <div className="prose-hf mt-10">
          <h2>What we will not do</h2>
          <ul>
            <li>Invent employers, vacancies, salaries, or “verified” badges</li>
            <li>Charge candidates to apply</li>
            <li>Sell a visa or a guaranteed interview</li>
            <li>Publish thin location pages just to rank for city names</li>
            <li>Redirect removed jobs to the homepage as if they had moved</li>
          </ul>
          <h2>How listings are handled</h2>
          <p>
            Employers can post. Automated checks flag fees, placeholder text, and remote labels on
            physical work. An editor may further review. Details:{" "}
            <Link to="/how-we-verify">how we review jobs</Link> and{" "}
            <Link to="/blog/$slug" params={{ slug: "what-reviewed-means-on-hiredfrex" }}>
              what “reviewed” means
            </Link>
            .
          </p>
          <p>
            <Link to="/contact">Contact</Link> · <Link to="/editorial-standards">Editorial standards</Link> ·{" "}
            <Link to="/privacy">Privacy</Link> · <Link to="/authors">Writers</Link> ·{" "}
            <Link to="/studio">Editorial studio</Link>
          </p>
        </div>
      </Page>
    );
  },
});

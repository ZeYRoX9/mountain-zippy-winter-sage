import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead, jsonLd } from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/site";

const FAQS = [
  {
    q: "Is HiredFrex free for candidates?",
    a: "Yes. Browsing, applying, and the CV builder are free. We never charge job seekers to apply. Anyone asking you to pay “HiredFrex” for a visa or an interview is not us.",
  },
  {
    q: "Are jobs on HiredFrex verified?",
    a: "They are reviewed. Most public listings are completeness reviewed: we checked fields, contradictions, and common scam flags. That is not the same as confirming the employer’s identity. Read How HiredFrex verifies jobs.",
  },
  {
    q: "Why don’t I see Oracle, Hilton, or other famous brands?",
    a: "Those names appeared on older catalogue pages without a vacancy source. We unpublished them rather than display an unverifiable brand opening. We do not redirect those URLs to the homepage.",
  },
  {
    q: "Do I need an account to apply?",
    a: "Yes for tracked applications and saved jobs. Sign-in uses email and password (with a Resend email code) or Google / X.",
  },
  {
    q: "Does it cost employers to post?",
    a: "Posting is currently free. Complete listings can go live after automated checks. Identity remains unverified until we actually confirm it.",
  },
  {
    q: "Is my CV public?",
    a: "No. Applications and CV text are visible to the employer for that job and to you. Dashboards are noindexed. You can ask us to wipe stored CVs; published jobs and articles stay.",
  },
  {
    q: "Who writes the articles?",
    a: "Named editors: Amira Hassan, Paul Mensah (founder, Abu Dhabi), and Nour El-Sayed. Each dated piece has a photo and a byline. Open the Writers page.",
  },
  {
    q: "Do you invent salaries when an employer leaves pay blank?",
    a: "No. Blank pay stays blank. Market-report figures only summarise advertised numbers already in this database, with sample size shown.",
  },
  {
    q: "How do I report a cloned employer name?",
    a: "Use the report form with the job URL and the chat. We can unpublish a page. We cannot recover money. See the cloned-name article on the insights desk.",
  },
  {
    q: "Is HiredFrex a government site?",
    a: "No. Official UAE labour and job pages live on mohre.gov.ae and u.ae. We link to them. We do not sell work permits.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      title: "FAQ",
      description: "Questions about HiredFrex listings, accounts, verification, and fees.",
      path: "/faq",
    }),
  component: function Faq() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    return (
      <Page>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        <Eyebrow>Help</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Questions, answered</h1>
        <div className="mt-8 grid gap-4">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-[22px] border border-line bg-surface p-5">
              <h2 className="font-display text-2xl">{f.q}</h2>
              <p className="mt-2 text-muted">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm">
          Still stuck? <Link to="/contact" className="font-semibold">Contact form</Link> or {SUPPORT_EMAIL}.
        </p>
      </Page>
    );
  },
});

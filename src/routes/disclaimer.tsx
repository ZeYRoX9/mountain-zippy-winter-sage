import { createFileRoute } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/disclaimer")({
  head: () =>
    pageHead({
      title: "Disclaimer",
      description: "HiredFrex listings and guides are information, not a guarantee of employment or legal advice.",
      path: "/disclaimer",
    }),
  component: function Disclaimer() {
    return (
      <Page>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Disclaimer</h1>
        <p className="mt-2 text-sm text-muted">Updated 19 September 2026</p>
        <div className="prose-hf mt-8">
          <h2>Job listings</h2>
          <p>
            Listings are submitted by employers and reviewed as described on How HiredFrex verifies
            jobs. Review does not guarantee accuracy, legality, or that the vacancy is still open.
            Never pay a fee to apply.
          </p>
          <h2>Guides and market data</h2>
          <p>
            Editorial pages are general information. The market report is computed from this site’s
            public sample only. It is not official wage data and not legal advice.
          </p>
          <h2>CV tools</h2>
          <p>
            Optional writing assistance is a draft. You must not submit invented experience. We do
            not guarantee interviews.
          </p>
          <h2>External links</h2>
          <p>Government and FTC links are provided for your own reading. We are not those organisations.</p>
          <p>Questions: {SUPPORT_EMAIL}</p>
        </div>
      </Page>
    );
  },
});

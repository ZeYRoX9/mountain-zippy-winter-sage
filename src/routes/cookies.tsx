import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { ADSENSE_PUB, SUPPORT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/cookies")({
  head: () =>
    pageHead({
      title: "Cookie Policy",
      description: "Cookies and local storage used by HiredFrex, including Google AdSense advertising cookies.",
      path: "/cookies",
    }),
  component: function Cookies() {
    return (
      <Page>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Cookie Policy</h1>
        <p className="mt-2 text-sm text-muted">Updated 19 September 2026</p>
        <div className="prose-hf mt-8">
          <h2>Essential cookies</h2>
          <p>
            When you sign in we set a session cookie so you stay authenticated. It is required to
            operate the account, apply for jobs, or post a listing. It is not an advertising tracker.
          </p>
          <h2>Preference storage</h2>
          <p>
            We store a cookie-notice acknowledgement in local storage on your device so the banner is
            not shown on every page load.
          </p>
          <h2>Advertising cookies (Google AdSense)</h2>
          <p>
            HiredFrex maintains an ads.txt record for Google AdSense (publisher id {ADSENSE_PUB}).
            Third party vendors, including Google, use cookies to serve ads based on a user's
            prior visits to your website or other websites.
          </p>
          <p>
            Google's use of advertising cookies enables it and its partners to serve ads to your
            users based on their visit to your sites and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting{" "}
            <a href="https://adssettings.google.com" rel="noreferrer" target="_blank">
              Google Ads Settings
            </a>
            . Alternatively, you can direct users to opt out of a third-party vendor's use of
            cookies for personalized advertising by visiting{" "}
            <a href="https://www.aboutads.info/choices/" rel="noreferrer" target="_blank">
              www.aboutads.info/choices
            </a>
            .
          </p>
          <p>
            You can also read{" "}
            <a href="https://policies.google.com/technologies/partner-sites" rel="noreferrer" target="_blank">
              How Google uses information from sites or apps that use our services
            </a>
            .
          </p>
          <p>
            Full privacy detail is in the <Link to="/privacy">Privacy Policy</Link>. Questions:{" "}
            {SUPPORT_EMAIL}.
          </p>
        </div>
      </Page>
    );
  },
});

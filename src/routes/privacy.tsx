import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { ADSENSE_PUB, SUPPORT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy",
      description: "How HiredFrex collects, uses, and retains account, application, and usage data, including Google AdSense cookies.",
      path: "/privacy",
    }),
  component: function Privacy() {
    return (
      <Page>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Updated 19 September 2026</p>
        <div className="prose-hf mt-8">
          <h2>1. Who we are</h2>
          <p>
            HiredFrex.com (“HiredFrex”, “we”) is a career-information site and small job board. This
            policy covers job seekers, employers, and visitors. Contact: {SUPPORT_EMAIL}.
          </p>
          <h2>2. Data we collect</h2>
          <ul>
            <li>Account data: name, email, hashed password, optional phone, role.</li>
            <li>Job-seeker data: CV content you upload or generate, applications, saved jobs, cover notes.</li>
            <li>Employer data: company name, listings, applications received.</li>
            <li>Messages you send via contact or report forms.</li>
            <li>Usage data needed to operate and secure the service (including essential cookies).</li>
          </ul>
          <p>We do not knowingly collect data from anyone under 18. You must be 18 or over to hold an account.</p>
          <h2>3. How we use it</h2>
          <p>
            To run accounts, publish listings you post, deliver applications to the employer you
            applied to, send email one-time codes for verification, provide optional CV-writing
            assistance when you click generate, and respond to reports. We do not sell personal data.
          </p>
          <h2>4. Who we share it with</h2>
          <p>
            Employers see applications for their jobs. Infrastructure providers process data on our
            instructions (database hosting, application hosting, email delivery via Resend, and, only
            when you use the CV assistant, an AI provider). We may disclose data where required by law.
          </p>
          <h2>5. Email verification</h2>
          <p>
            When you create an account we send a 6-digit one-time code with Resend from our domain
            (support@hiredfrex.com). Codes expire in 10 minutes. We do not charge for verification.
          </p>
          <h2>6. Advertising cookies (Google AdSense)</h2>
          <p>
            HiredFrex has applied to Google AdSense (publisher id {ADSENSE_PUB}). Third party vendors,
            including Google, use cookies to serve ads based on a user's prior visits to your
            website or other websites.
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
            . Alternatively, you can opt out of a third-party vendor's use of cookies for
            personalized advertising by visiting{" "}
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
            We do not use advertising to change a job-review label. See the{" "}
            <Link to="/cookies">Cookie Policy</Link> for essential versus advertising cookies.
          </p>
          <h2>7. International transfers</h2>
          <p>
            Users and processors may be in different countries. We rely on the provider’s contractual
            safeguards where applicable.
          </p>
          <h2>8. Your rights</h2>
          <p>
            Depending on your location you may access, correct, export, or delete your data, including
            stored CVs. Email {SUPPORT_EMAIL}. We aim to respond within 30 days.
          </p>
          <h2>9. Retention</h2>
          <p>
            Account data is kept while the account is open. Closed accounts are deleted or anonymised
            except where we must retain records to handle disputes or legal duties. CV files can be
            wiped independently of published articles and jobs.
          </p>
          <h2>10. Contact</h2>
          <p>
            {SUPPORT_EMAIL} · <Link to="/contact">Contact form</Link>
          </p>
        </div>
      </Page>
    );
  },
});

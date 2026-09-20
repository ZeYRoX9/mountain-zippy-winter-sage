import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-we-verify-DeGhJtTb.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function VerifyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Trust" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 max-w-3xl font-display text-4xl md:text-5xl",
			children: "How HiredFrex verifies jobs"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-2xl text-lg text-muted",
			children: "“Reviewed” on this site has a specific meaning. This page is the policy. If a badge on a job contradicts this page, this page wins."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "prose-hf mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What we claim — and what we do not" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Most public listings are ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "completeness reviewed" }),
					". That means an editor or an automated checklist ran on the fields the employer submitted. It does",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "not" }),
					" mean HiredFrex confirmed the company’s trade licence, called HR, or saw the vacancy on the company’s own careers page."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"We only use ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "source confirmed" }),
					" when a public vacancy URL was checked, and",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "employer confirmed" }),
					" when employer identity was actually confirmed. Those statuses are rare in the current sample. We would rather show a weaker badge than a fake one."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "The checklist" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Employer identity review" }), " — currently not independently completed for most listings. The job page says so."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Vacancy / source review" }), " — we store a source URL when we have one. If we do not, the listing stays employer-submitted."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Contact information review" }), " — applications go through HiredFrex. We do not publish a personal WhatsApp number as “HR.”"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Salary plausibility review" }), " — missing, currency-less, or internally inconsistent pay is flagged or the listing is refused. We do not invent a number."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Duplicate listing review" }), " — same title + employer + city is not republished as a new page."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Application destination review" }), " — we do not send you to an unknown off-site form from a public job page."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Scam / red-flag screening" }), " — application fees, crypto, “test job” copy, and remote labels on physical work are blocking."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Editorial completeness review" }), " — category, workplace type, and contradictions. Manual when a human opened the listing; automated when an employer posts through the dashboard."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Candidate reporting" }),
						" — anyone can ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/report",
							children: "report a listing"
						}),
						". Reports can unpublish a page."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Removal" }), " — unverifiable major-brand vacancies are removed, not redirected to the homepage."] })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Labels you will see" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Completeness reviewed" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Source confirmed" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Employer confirmed" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pending review (not public)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Closed / not published" })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Last reviewed date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Job pages show the date the current version was reviewed. If information is missing, we write “not provided by the employer” rather than filling the gap with typical-job boilerplate presented as fact." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Read ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/editorial-standards",
						children: "editorial standards"
					}),
					" and the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/disclaimer",
						children: "disclaimer"
					}),
					"."
				] })
			]
		})
	] });
};
//#endregion
export { SplitComponent as component };

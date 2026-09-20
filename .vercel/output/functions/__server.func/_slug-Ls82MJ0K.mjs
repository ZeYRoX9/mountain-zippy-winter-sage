import { v as Link, x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as Route$6 } from "./_ssr/router-BBMsO9gN.mjs";
import { n as Page, t as Eyebrow } from "./_ssr/site-shell-BqnhJ0K_.mjs";
import { t as JobCard } from "./_ssr/job-card-B9sZe-bA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Ls82MJ0K.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function CategoryPage() {
	const { meta, jobs, slug } = Route$6.useLoaderData();
	const name = meta?.name ?? slug;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Category" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "mt-2 font-display text-4xl",
			children: [name, " jobs"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-muted",
			children: {
				security: "Security listings on HiredFrex are on-site roles. Read the verification panel: several current pages have missing or inferred salary, and employer identity is not independently confirmed.",
				hospitality: "Hospitality here means service-floor work. Brand-name hotel vacancies without a source were unpublished. Remaining listings are labelled honestly.",
				logistics: "Warehouse and factory-adjacent work is on-site. Shift notes appear only when the employer wrote them.",
				administrative: "Office secretary and assistant roles. Category was corrected from generic “Other” or HR where the title did not match.",
				sales: "Retail and sales-executive listings. Generic trading names stay unverified."
			}[slug] ?? `Public completeness-reviewed listings tagged ${name}. Empty categories are noindexed.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-3",
			children: jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobCard, { job: j }, j.id))
		}),
		!jobs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-muted",
			children: [
				"No live listings in this category. See ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/jobs",
					children: "all jobs"
				}),
				" or",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/guides",
					children: "guides"
				}),
				"."
			]
		}) : null
	] });
};
//#endregion
export { SplitComponent as component };

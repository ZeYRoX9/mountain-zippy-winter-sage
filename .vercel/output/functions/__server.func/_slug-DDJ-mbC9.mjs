import { v as Link, x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route$1 } from "./_ssr/router-BBMsO9gN.mjs";
import { n as Page, t as Eyebrow } from "./_ssr/site-shell-BqnhJ0K_.mjs";
import { t as JobCard } from "./_ssr/job-card-B9sZe-bA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DDJ-mbC9.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function LocationPage() {
	const { city, jobs } = Route$1.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Location" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "mt-2 font-display text-4xl",
			children: ["Jobs in ", city]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 max-w-2xl text-muted",
			children: [
				"These are public listings whose city field matches ",
				city,
				". This is not a government job bank. For UAE labour processes use mohre.gov.ae and u.ae."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-3",
			children: jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobCard, { job: j }, j.id))
		}),
		!jobs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-muted",
			children: [
				"No live listings. ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/jobs",
					children: "Browse all jobs"
				}),
				"."
			]
		}) : null
	] });
};
//#endregion
export { SplitComponent as component };

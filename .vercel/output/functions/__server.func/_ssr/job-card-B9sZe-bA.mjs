import { t as formatDate } from "./utils-CxUWuhEe.mjs";
import { c as VERIFICATION_LABELS } from "./site-D_EzqXMW.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Banknote, n as MapPin, r as Briefcase } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/job-card-B9sZe-bA.js
var import_jsx_runtime = require_jsx_runtime();
function VerificationChip({ status }) {
	const meta = VERIFICATION_LABELS[status] ?? {
		label: status,
		tone: "neutral"
	};
	const cls = meta.tone === "ok" ? "bg-ok-soft text-ok" : meta.tone === "warn" ? "bg-warn-soft text-warn" : "bg-gold-soft text-navy";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${cls}`,
		children: meta.label
	});
}
function JobCard({ job }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/jobs/$slug",
		params: { slug: job.slug },
		className: "block rounded-[22px] border border-line bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl text-navy",
					children: job.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm font-semibold text-muted",
					children: job.companyName
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationChip, { status: job.verificationStatus })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
							" ",
							job.locationDisplay
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-3.5 w-3.5" }),
							" ",
							job.employmentType,
							" · ",
							job.workplaceType
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "h-3.5 w-3.5" }),
							" ",
							job.salaryDisplay ?? "Salary not provided"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-paper px-2.5 py-1 text-navy",
					children: job.category
				}), job.postedOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-faint",
					children: ["Listed ", formatDate(job.postedOn)]
				}) : null]
			})
		]
	});
}
//#endregion
export { VerificationChip as n, JobCard as t };

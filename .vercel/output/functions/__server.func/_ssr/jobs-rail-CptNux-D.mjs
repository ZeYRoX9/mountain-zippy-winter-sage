import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as VerificationChip } from "./job-card-B9sZe-bA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jobs-rail-CptNux-D.js
var import_jsx_runtime = require_jsx_runtime();
function JobsRail({ jobs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "lg:sticky lg:top-24",
		"aria-labelledby": "jobs-rail-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[24px] border border-line bg-surface p-5 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold uppercase tracking-[0.16em] text-gold-deep",
					children: "Jobs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "jobs-rail-title",
					className: "mt-1 font-display text-2xl leading-tight",
					children: "Open roles now"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "Read the review label on each listing before you apply. Candidates never pay HiredFrex for a job."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3",
					children: [jobs.slice(0, 6).map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-t border-line pt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/jobs/$slug",
							params: { slug: job.slug },
							className: "block min-h-11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-navy",
									children: job.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted",
									children: job.companyName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-xs text-faint",
									children: [
										job.locationDisplay,
										" · ",
										job.employmentType
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationChip, { status: job.verificationStatus })
								})
							]
						})
					}, job.id)), !jobs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted",
						children: "No public listings in this sample right now."
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/jobs",
					className: "mt-4 inline-flex min-h-11 items-center text-sm font-bold text-gold-deep underline underline-offset-4",
					children: "All open jobs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-2xl border border-line bg-gold-soft/60 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-navy",
							children: "Hiring?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted",
							children: "Post a complete vacancy. We review it before it is public. No candidate fees."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/employers",
							className: "mt-3 inline-flex h-11 items-center rounded-xl bg-navy px-3 text-sm font-bold text-paper",
							children: "Employer posting"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { JobsRail as t };

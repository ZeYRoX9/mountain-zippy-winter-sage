import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Route$19 } from "./router-BBMsO9gN.mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-report-BW9cgI7u.js
var import_jsx_runtime = require_jsx_runtime();
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[18px] border border-line bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-bold uppercase tracking-wider text-faint",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-display text-3xl tabular-nums text-navy",
			children: v
		})]
	});
}
function Table({ title, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[22px] border border-line bg-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			className: "mt-3 w-full text-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-2",
					children: row.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-2 text-right tabular-nums font-semibold",
					children: row.count
				})]
			}, row.name)) })
		})]
	});
}
var SplitComponent = function Market() {
	const r = Route$19.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Original data" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl md:text-5xl",
			children: "HiredFrex job market report — September 2026"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 max-w-2xl text-muted",
			children: [
				"Every figure on this page is counted from public rows in the HiredFrex database on",
				" ",
				r.generatedOn,
				". This is not a national labour-force survey."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Public listings",
					v: r.sampleSize
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Listings with any salary",
					v: r.withSalary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "AED monthly sample",
					v: r.aedMonthlySample
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "AED monthly median",
					v: r.aedMonthlyMedian != null ? `AED ${Math.round(r.aedMonthlyMedian)}` : "n/a"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "prose-hf mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Methodology" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Source: public jobs with status published and indexable = true." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pay stats use only rows with currency AED and period month, taking the midpoint of min/max when both exist." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Skills are the tags stored on each listing, not a scraped universe of all UAE jobs." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Unpublished major-brand vacancies are excluded on purpose." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Limitations" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"The sample is small (",
					r.sampleSize,
					" listings). Most employers are not independently confirmed. Advertised pay is not received pay. Do not use these numbers in a visa file or as “the UAE average.”"
				] }),
				r.aedMonthlyMin != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Advertised AED monthly range in this sample: AED ",
					r.aedMonthlyMin,
					" – AED ",
					r.aedMonthlyMax,
					". Mean of midpoints: ",
					r.aedMonthlyMean != null ? `AED ${r.aedMonthlyMean}` : "n/a",
					"."
				] }) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-4 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					title: "Categories",
					rows: r.categories
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					title: "Cities",
					rows: r.cities
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					title: "Workplace type",
					rows: r.workplaceTypes
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					title: "Experience as labelled",
					rows: r.experience
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					title: "Verification status",
					rows: r.verification
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					title: "Skills tagged",
					rows: r.skills
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm text-muted",
			children: "Browse the underlying [jobs](/jobs) or read [how we verify](/how-we-verify)."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/jobs",
				className: "font-bold text-gold-deep",
				children: "Open the job directory"
			})
		})
	] });
};
//#endregion
export { SplitComponent as component };

import { l as WORKPLACE_TYPES, n as CATEGORIES, r as EMPLOYMENT_TYPES } from "./site-D_EzqXMW.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$3 } from "./router-BBMsO9gN.mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
import { t as JobCard } from "./job-card-B9sZe-bA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jobs-lcIGl8cV.js
var import_jsx_runtime = require_jsx_runtime();
function JobsPage() {
	const { jobs, facets } = Route$3.useLoaderData();
	const search = Route$3.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Directory" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl md:text-5xl",
			children: "Browse jobs"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 max-w-2xl text-muted",
			children: [
				facets.total,
				" public listings after quality review. Every card shows the verification status we actually assigned — usually ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "completeness reviewed" }),
				", not “verified employer.” Thin filter combinations are not given unique SEO pages."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			method: "get",
			className: "mt-6 grid gap-3 rounded-[22px] border border-line bg-surface p-4 md:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "q",
					defaultValue: search.q,
					placeholder: "Keyword",
					className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					name: "category",
					defaultValue: search.category ?? "",
					className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All categories"
					}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.slug,
						children: c.name
					}, c.slug))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					name: "city",
					defaultValue: search.city ?? "",
					className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All cities"
					}), facets.cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: c.name,
						children: [
							c.name,
							" (",
							c.n,
							")"
						]
					}, c.name))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					name: "type",
					defaultValue: search.type ?? "",
					className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Any type"
					}), EMPLOYMENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: t,
						children: t
					}, t))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-xl bg-navy text-sm font-bold text-white",
					children: "Apply filters"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-xs text-faint",
			children: [
				"Workplace types in this sample: ",
				WORKPLACE_TYPES.join(", "),
				". Filtered views use query parameters and keep ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "/jobs" }),
				" as the canonical URL."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-3",
			children: jobs.length ? jobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobCard, { job }, job.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[22px] border border-line bg-surface p-8 text-muted",
				children: [
					"No public listings match those filters. Try clearing a filter or read the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/guides",
						className: "font-semibold text-navy underline",
						children: "career guides"
					}),
					"."
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[22px] border border-line bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Categories with live listings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1 text-sm",
					children: facets.categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categories/$slug",
							params: { slug: c.name },
							className: "font-semibold text-navy",
							children: c.name.replace(/-/g, " ")
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-faint",
							children: [
								"(",
								c.n,
								")"
							]
						})
					] }, c.name))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[22px] border border-line bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Cities in this sample"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1 text-sm",
					children: facets.cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/locations/$slug",
							params: { slug: c.name.toLowerCase().replace(/\s+/g, "-") },
							className: "font-semibold text-navy",
							children: c.name
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-faint",
							children: [
								"(",
								c.n,
								")"
							]
						})
					] }, c.name))
				})]
			})]
		})
	] });
}
//#endregion
export { JobsPage as component };

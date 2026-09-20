import { t as formatDate } from "./utils-CxUWuhEe.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PUBLISHING_PLAN } from "./authors-DJCyIZjS.mjs";
import { c as Route$8 } from "./router-BBMsO9gN.mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
import { t as JobsRail } from "./jobs-rail-CptNux-D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-B8LJ-0vs.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function BlogIndex() {
	const { posts, jobs } = Route$8.useLoaderData();
	const cats = [...new Set(posts.map((p) => p.category))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Insights" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl md:text-5xl",
				children: "Career insights"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl font-serif text-lg text-muted",
				children: "Dated articles with named authors and sources. Publish one substantial piece a day — not ten thin pages in an afternoon."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-navy",
					children: c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4",
				children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/blog/$slug",
					params: { slug: p.slug },
					className: "rounded-[22px] border border-line bg-surface p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] font-bold uppercase tracking-wider text-gold-deep",
							children: p.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-serif text-muted",
							children: p.excerpt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-faint",
							children: [
								p.author,
								" · ",
								formatDate(p.publishedOn),
								" · ",
								p.readMinutes,
								" min read"
							]
						})
					]
				}, p.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 rounded-[22px] border border-line bg-gold-soft/40 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "12-day calendar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 grid gap-1 text-sm sm:grid-cols-2",
					children: PUBLISHING_PLAN.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-faint",
						children: [d.date.slice(5), " · "]
					}), d.title] }, d.day))
				})]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobsRail, { jobs })]
	}) });
};
//#endregion
export { SplitComponent as component };

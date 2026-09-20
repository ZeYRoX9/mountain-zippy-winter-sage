import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as GUIDES } from "./router-BBMsO9gN.mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides-Dc45UcmC.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function GuidesIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Resources" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl md:text-5xl",
			children: "Career guides"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-muted",
			children: "These pages are original HiredFrex explainers. They cite official sources where a fact is legal or statistical, and they refuse to invent salary tables."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-4 md:grid-cols-2",
			children: GUIDES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/guides/$slug",
				params: { slug: g.slug },
				className: "rounded-[22px] border border-line bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: g.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: g.excerpt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-faint",
						children: [
							"Updated ",
							g.updated,
							" · ",
							g.minutes,
							" min"
						]
					})
				]
			}, g.slug))
		})
	] });
};
//#endregion
export { SplitComponent as component };

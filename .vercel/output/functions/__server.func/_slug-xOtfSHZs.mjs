import { v as Link, x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Route$4 } from "./_ssr/router-BBMsO9gN.mjs";
import { n as Page } from "./_ssr/site-shell-BqnhJ0K_.mjs";
import { t as renderMarkdown } from "./_ssr/markdown-SqtmRIeS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-xOtfSHZs.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function GuidePage() {
	const g = Route$4.useLoaderData();
	if (!g) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-4xl",
		children: "Guide not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/guides",
		className: "mt-4 inline-block font-bold text-gold-deep",
		children: "All guides"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "text-sm text-faint",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/guides",
					children: "Guides"
				}),
				" / ",
				g.title
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 max-w-3xl font-display text-4xl md:text-5xl",
			children: g.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-sm text-muted",
			children: [
				"HiredFrex Editorial · Updated ",
				g.updated,
				" · ",
				g.minutes,
				" min read"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "prose-hf mt-8",
			dangerouslySetInnerHTML: { __html: renderMarkdown(g.body) }
		})
	] });
};
//#endregion
export { SplitComponent as component };

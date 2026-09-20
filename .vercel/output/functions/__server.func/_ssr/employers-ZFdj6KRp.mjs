import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employers-ZFdj6KRp.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function Employers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Hiring" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 max-w-3xl font-display text-4xl md:text-5xl",
			children: "Post a real job. We will label it honestly."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-2xl text-muted",
			children: "Create an employer account, describe the vacancy completely, and take applications in one dashboard. We block fees, placeholder copy, and remote labels on physical work. We will not mark you “verified” until that check actually happens."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-wrap gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				search: {
					mode: "signup",
					next: "/account"
				},
				className: "rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white",
				children: "Create employer account"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/guides/$slug",
				params: { slug: "responsible-hiring" },
				className: "rounded-xl border border-line px-4 py-2.5 text-sm font-bold",
				children: "Responsible hiring guide"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-10 grid gap-4 md:grid-cols-3",
			children: [
				["1. Account", "Sign in, choose Hiring, add the legal company name."],
				["2. Complete listing", "Title, city, workplace type, overview, responsibilities, requirements."],
				["3. Review & applications", "Automated checks run. Candidates apply on HiredFrex. Close the role when filled."]
			].map(([t, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-[22px] border border-line bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: b
				})]
			}, t))
		})
	] });
};
//#endregion
export { SplitComponent as component };

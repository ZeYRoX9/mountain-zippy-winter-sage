import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as STAFF_AUTHORS } from "./authors-DJCyIZjS.mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/authors-CTvOp_j1.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function AuthorsIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Desk" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl md:text-5xl",
			children: "Who writes HiredFrex"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl font-serif text-lg text-muted",
			children: "Articles carry a person, a title, and a photo. We do not publish an anonymous “editorial team” byline on dated pieces."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-5 md:grid-cols-3",
			children: STAFF_AUTHORS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/authors/$id",
				params: { id: a.id },
				className: "rounded-[24px] border border-line bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: a.photo,
						alt: "",
						width: 80,
						height: 80,
						className: "h-20 w-20 rounded-full"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-2xl",
						children: a.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-gold-deep",
						children: a.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-faint",
						children: a.based
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: a.bio
					})
				]
			}, a.id))
		})
	] });
};
//#endregion
export { SplitComponent as component };

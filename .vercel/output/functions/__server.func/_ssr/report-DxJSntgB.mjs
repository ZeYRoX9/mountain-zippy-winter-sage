import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Route$17 } from "./router-BBMsO9gN.mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
import { r as submitJobReport } from "./public-actions-DCjq0BVI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-DxJSntgB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function Report() {
	const { job } = Route$17.useSearch();
	const [msg, setMsg] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Safety" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl",
			children: "Report a listing or an error"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-muted",
			children: "Tell us about application fees, impersonation, wrong employer names, or facts that do not match the page. We can unpublish a listing; we cannot recover money you already sent to a scammer."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 grid max-w-lg gap-3",
			onSubmit: async (e) => {
				e.preventDefault();
				const fd = new FormData(e.currentTarget);
				const res = await submitJobReport({ data: {
					jobId: void 0,
					reason: String(fd.get("reason") || ""),
					details: `${job ? `Listing slug: ${job}\n` : ""}${String(fd.get("details") || "")}`
				} });
				setMsg(res.ok ? "Report received. Thank you." : res.error);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					defaultValue: job,
					placeholder: "Job URL or slug (if known)",
					className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					name: "reason",
					className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Asks for money / fees" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Impersonates a known company" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Wrong employer or location" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Remote label on physical work" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Incorrect salary or category" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other incorrect information" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					name: "details",
					required: true,
					rows: 6,
					placeholder: "What happened? Include chats or email domains if you have them — not your passport.",
					className: "rounded-xl border border-line bg-surface px-3 py-2 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-xl bg-navy text-sm font-bold text-white",
					children: "Submit report"
				})
			]
		}),
		msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm font-semibold text-ok",
			children: msg
		}) : null
	] });
};
//#endregion
export { SplitComponent as component };

import { o as __toESM } from "../_runtime.mjs";
import { s as SUPPORT_EMAIL } from "./site-D_EzqXMW.mjs";
import { H as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
import { n as submitContact } from "./public-actions-DCjq0BVI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-COL9CxpJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function Contact() {
	const [msg, setMsg] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Support" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl",
			children: "Contact HiredFrex"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 max-w-xl text-muted",
			children: [
				"Use this form for support, partnership questions, content corrections, or employer help. For a suspicious listing, the ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/report",
					className: "font-semibold text-navy underline",
					children: "report form"
				}),
				" is faster."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm",
			children: ["Email: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "font-semibold",
				href: `mailto:${SUPPORT_EMAIL}`,
				children: SUPPORT_EMAIL
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 grid max-w-lg gap-3",
			onSubmit: async (e) => {
				e.preventDefault();
				const fd = new FormData(e.currentTarget);
				const res = await submitContact({ data: {
					name: String(fd.get("name") || ""),
					email: String(fd.get("email") || ""),
					topic: String(fd.get("topic") || "general"),
					message: String(fd.get("message") || "")
				} });
				setMsg(res.ok ? "Message received. We aim to reply within one business day." : res.error);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "name",
					required: true,
					placeholder: "Name",
					className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "email",
					type: "email",
					required: true,
					placeholder: "Email",
					className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					name: "topic",
					className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "general",
							children: "General support"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "correction",
							children: "Content correction"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "employer",
							children: "Employer support"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "privacy",
							children: "Privacy / data request"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "report",
							children: "Suspicious job (also use Report)"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					name: "message",
					required: true,
					rows: 6,
					placeholder: "How can we help?",
					className: "rounded-xl border border-line bg-surface px-3 py-2 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-xl bg-navy text-sm font-bold text-white",
					children: "Send"
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

import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCurrentUserState, n as Page, r as RedirectToSignIn, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
import { n as sendVerificationOtp, t as confirmVerificationOtp } from "./otp-8w7fz_nt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-email-BingdYHG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VerifyEmail() {
	const { user, isPending } = useCurrentUserState();
	const [code, setCode] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)(null);
	const [ok, setOk] = (0, import_react.useState)(false);
	const [pending, setPending] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-2xl bg-line" }) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Account" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "Check your email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "We send a 6-digit code with Resend. HiredFrex will never ask you to pay for this code, a visa, or a job. Codes expire in 10 minutes."
			}),
			ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm",
				children: ["Email confirmed. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account",
					className: "font-bold text-navy",
					children: "Go to your dashboard"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 grid gap-3",
				onSubmit: async (e) => {
					e.preventDefault();
					setPending(true);
					setNote(null);
					const res = await confirmVerificationOtp({ data: { code } });
					setPending(false);
					if (res.ok) setOk(true);
					else setNote(res.error);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "numeric",
						autoComplete: "one-time-code",
						maxLength: 6,
						value: code,
						onChange: (e) => setCode(e.target.value),
						placeholder: "6-digit code",
						className: "h-11 rounded-xl border border-line bg-surface px-3 tracking-[0.4em] text-sm",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: pending,
						className: "h-11 rounded-xl bg-navy text-sm font-bold text-white",
						children: pending ? "Checking…" : "Confirm email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm font-semibold text-navy",
						onClick: async () => {
							const res = await sendVerificationOtp({ data: {} });
							if (res.ok && "previewCode" in res && res.previewCode) setNote(`Preview code: ${res.previewCode}. ${res.notice ?? ""}`);
							else setNote(res.ok ? "A new code is on the way via Resend." : res.error);
						},
						children: "Send a new code"
					}),
					note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: note
					}) : null
				]
			})
		]
	});
}
//#endregion
export { VerifyEmail as component };

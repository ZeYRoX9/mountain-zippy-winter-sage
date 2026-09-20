import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-Cr7Gh9dN.mjs";
import { p as Route$20 } from "./router-BBMsO9gN.mjs";
import { r as signIn, t as authClient } from "./client-CVqXY6bk.mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
import { n as sendVerificationOtp } from "./otp-8w7fz_nt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Dpb9c38A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { next, mode } = Route$20.useSearch();
	const [err, setErr] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	const signup = mode === "signup";
	const callbackURL = next || "/account";
	async function onSubmit(e) {
		e.preventDefault();
		setErr(null);
		setPending(true);
		const fd = new FormData(e.currentTarget);
		const email = String(fd.get("email") || "");
		const password = String(fd.get("password") || "");
		const name = String(fd.get("name") || "HiredFrex user");
		try {
			if (signup) {
				const res = await authClient.signUp.email({
					email,
					password,
					name,
					callbackURL: "/verify-email"
				});
				if (res.error) setErr(res.error.message || "Could not create the account.");
				else {
					const mailed = await sendVerificationOtp({ data: { email } });
					if (!mailed.ok) setErr(mailed.error);
					window.location.assign("/verify-email");
				}
			} else {
				const res = await authClient.signIn.email({
					email,
					password,
					callbackURL
				});
				if (res.error) setErr(res.error.message || "Could not sign in.");
				else window.location.assign(callbackURL);
			}
		} catch (error) {
			setErr(error instanceof Error ? error.message : "Sign-in failed.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Account" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: signup ? "Create an account" : "Sign in"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Same account for reading, applying, or posting a job. Email sign-up sends a 6-digit confirmation code via Resend — never a fee."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 grid gap-3",
				onSubmit,
				children: [
					signup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "name",
						required: true,
						placeholder: "Full name",
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "email",
						type: "email",
						required: true,
						placeholder: "Email",
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "password",
						type: "password",
						required: true,
						minLength: 8,
						placeholder: "Password (8+ characters)",
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: err
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: pending,
						className: "h-11 rounded-xl bg-navy text-sm font-bold text-white",
						children: pending ? "Please wait…" : signup ? "Create account" : "Sign in"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: signup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					search: {
						next,
						mode: "signin"
					},
					className: "font-semibold text-navy",
					children: "Already have an account? Sign in"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					search: {
						next,
						mode: "signup"
					},
					className: "font-semibold text-navy",
					children: "Create an account"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 border-t border-line pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-wider text-faint",
					children: "Or continue with"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => signIn(p.providerId, { callbackURL }),
						className: "h-11 rounded-xl border border-line bg-surface text-sm font-semibold",
						children: ["Continue with ", p.label]
					}, p.providerId))
				})]
			})
		]
	});
}
//#endregion
export { Login as component };

import { o as __toESM } from "../_runtime.mjs";
import { s as SUPPORT_EMAIL } from "./site-D_EzqXMW.mjs";
import { H as require_react, d as useRouterState, v as Link, x as require_jsx_runtime, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as hasGateSessionMarker } from "./server-Cr7Gh9dN.mjs";
import { i as signOut, t as authClient } from "./client-CVqXY6bk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-BqnhJ0K_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/** Render children only when a user is present (real session, or the disabled-auth dev user). */
function SignedIn({ children }) {
	const { user } = useCurrentUserState();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
}
/**
* Render children only once we KNOW the visitor is signed out (`isPending` has
* cleared and there is no user). Hidden while the session is still loading.
*/
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var KEY = "hf-cookie-ok-v2";
function CookieBanner() {
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			setOpen(localStorage.getItem(KEY) !== "1");
		} catch {
			setOpen(true);
		}
	}, []);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 p-4 shadow-lg backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex-1 text-sm leading-relaxed text-muted",
				children: [
					"HiredFrex uses an essential session cookie if you sign in. If Google AdSense is approved, Google and partners may use cookies to serve ads based on prior visits.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cookies",
						className: "font-semibold text-navy underline",
						children: "Cookie policy"
					}),
					" ",
					"·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "font-semibold text-navy underline",
						children: "Privacy"
					}),
					". You can opt out of personalised ads at",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "font-semibold text-navy underline",
						href: "https://adssettings.google.com",
						rel: "noreferrer",
						target: "_blank",
						children: "Google Ads Settings"
					}),
					"."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "h-11 shrink-0 rounded-xl bg-navy px-4 text-sm font-semibold text-paper",
				onClick: () => {
					try {
						localStorage.setItem(KEY, "1");
					} catch {}
					setOpen(false);
				},
				children: "Understood"
			})]
		})
	});
}
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/blog",
		label: "Insights"
	},
	{
		to: "/jobs",
		label: "Jobs"
	},
	{
		to: "/employers",
		label: "Hire"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function LogoMark({ light = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex min-w-0 items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/logo-mark.png",
			alt: "",
			width: 40,
			height: 40,
			className: "h-10 w-10 rounded-full bg-surface object-contain"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `block font-display text-[22px] font-semibold leading-none tracking-tight ${light ? "text-paper" : "text-navy"}`,
				children: ["Hired", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gold-deep",
					children: "Frex"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] ${light ? "text-gold" : "text-faint"}`,
				children: "Read first. Then apply."
			})]
		})]
	});
}
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user, isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "skip-link",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.5rem]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Primary",
						className: "ml-2 hidden items-center gap-0.5 lg:flex",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(item.to + "/");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: item.to,
								className: `rounded-lg px-3 py-2 text-[15px] font-semibold ${active ? "bg-gold-soft text-navy" : "text-muted hover:text-navy"}`,
								children: item.label
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-auto flex items-center gap-2",
						children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-20 animate-pulse rounded-lg bg-line" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/account",
							className: "hidden rounded-lg px-3 py-2 text-sm font-semibold text-muted hover:text-navy sm:inline",
							children: "Account"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: {
								next: "/account",
								mode: "signin"
							},
							className: "rounded-lg bg-navy px-3 py-2 text-sm font-semibold text-paper",
							children: "Sign in"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Mobile",
				className: "flex items-center gap-2 overflow-x-auto border-t border-line px-3 py-2 lg:hidden",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: item.to,
					className: "min-h-11 shrink-0 rounded-full border border-line bg-surface px-3 py-2 text-sm font-semibold text-navy",
					children: item.label
				}, item.to))
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-16 border-t border-line bg-navy text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { light: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-white/70",
					children: "Original career guides for people applying to Gulf and international jobs. A small, honestly labelled job board sits on the side. Free to read. Candidates never pay to apply."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Read",
					links: [
						["/blog", "Career insights"],
						["/guides", "Guides"],
						["/authors", "Writers"],
						["/sitemap", "Sitemap"],
						["/editorial-standards", "Editorial standards"],
						["/how-we-verify", "How we review listings"]
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Work",
					links: [
						["/jobs", "Open jobs"],
						["/employers", "Employer posting"],
						["/cv-builder", "CV builder"],
						["/report", "Report a listing"],
						["/faq", "FAQ"]
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Trust",
					links: [
						["/about", "About"],
						["/contact", "Contact"],
						["/privacy", "Privacy"],
						["/terms", "Terms"],
						["/disclaimer", "Disclaimer"],
						["/cookies", "Cookies"],
						[`mailto:${SUPPORT_EMAIL}`, SUPPORT_EMAIL]
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10 px-4 py-4 text-center text-xs leading-relaxed text-white/50",
			children: "© 2026 HiredFrex · build 2026.09.19 · Editorial pages are original. Job listings are employer-submitted unless a higher review status is shown. Advertising, if approved, does not write our labels."
		})]
	});
}
function FooterCol({ title, links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs font-bold uppercase tracking-[0.14em] text-gold",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-3 space-y-2 text-sm text-white/75",
		children: links.map(([href, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href,
			className: "hover:text-white",
			children: label
		}) }, href))
	})] });
}
function Page({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Signed out"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Signed in"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				className: `mx-auto w-full max-w-6xl flex-1 px-4 py-10 ${className}`,
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookieBanner, {})
		]
	});
}
function Eyebrow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-[11px] font-bold uppercase tracking-[0.16em] text-gold-deep",
		children
	});
}
//#endregion
export { useCurrentUserState as i, Page as n, RedirectToSignIn as r, Eyebrow as t };

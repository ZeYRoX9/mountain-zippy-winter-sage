import { o as SITE_URL, s as SUPPORT_EMAIL } from "./site-D_EzqXMW.mjs";
import { t as jsonLd } from "./seo-BYC44w_4.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as STAFF_AUTHORS } from "./authors-DJCyIZjS.mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BbElf6Mh.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: jsonLd({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "HiredFrex",
				url: SITE_URL,
				email: SUPPORT_EMAIL,
				address: {
					"@type": "PostalAddress",
					addressLocality: "Abu Dhabi",
					addressCountry: "AE"
				},
				founder: {
					"@type": "Person",
					name: "Paul Mensah"
				}
			}) }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "About" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 max-w-3xl font-display text-4xl md:text-5xl",
			children: "A career desk first. A job board second."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "prose-hf mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "HiredFrex.com is a practical information site for people applying to Gulf and entry-level international jobs — especially those who keep meeting cloned brand names, blank salaries, and pages written only to attract ads." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The public site leads with original guides and dated articles. Named editors cite official sources (MoHRE, u.ae, and the US FTC for scam statistics). Listings exist, but they are a small, labelled sample. Candidates never pay to apply." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Who operates it" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"HiredFrex is run by ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Paul Mensah" }),
					" from Abu Dhabi, United Arab Emirates. It is a small independent site, not a government portal and not a licensed recruitment agency of record. Contact: ",
					SUPPORT_EMAIL,
					"."
				] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 md:grid-cols-3",
			children: STAFF_AUTHORS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/authors/$id",
				params: { id: a.id },
				className: "rounded-[22px] border border-line bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: a.photo,
						alt: "",
						width: 72,
						height: 72,
						className: "h-18 w-18 rounded-full"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl",
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
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "prose-hf mt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What we will not do" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Invent employers, vacancies, salaries, or “verified” badges" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Charge candidates to apply" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sell a visa or a guaranteed interview" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Publish thin location pages just to rank for city names" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Redirect removed jobs to the homepage as if they had moved" })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "How listings are handled" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Employers can post. Automated checks flag fees, placeholder text, and remote labels on physical work. An editor may further review. Details:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/how-we-verify",
						children: "how we review jobs"
					}),
					" and",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/blog/$slug",
						params: { slug: "what-reviewed-means-on-hiredfrex" },
						children: "what “reviewed” means"
					}),
					"."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						children: "Contact"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/editorial-standards",
						children: "Editorial standards"
					}),
					" ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						children: "Privacy"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/authors",
						children: "Writers"
					}),
					" ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						children: "Editorial studio"
					})
				] })
			]
		})
	] });
};
//#endregion
export { SplitComponent as component };

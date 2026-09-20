import { t as formatDate } from "./utils-CxUWuhEe.mjs";
import { o as SITE_URL } from "./site-D_EzqXMW.mjs";
import { t as jsonLd } from "./seo-BYC44w_4.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as STAFF_AUTHORS } from "./authors-DJCyIZjS.mjs";
import { h as GUIDES, m as Route$31 } from "./router-BBMsO9gN.mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
import { t as JobsRail } from "./jobs-rail-CptNux-D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-bzYYv85E.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { jobs, posts } = Route$31.useLoaderData();
	const featured = posts[0];
	const rest = posts.slice(1, 8);
	const schema = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Organization",
			name: "HiredFrex",
			url: SITE_URL,
			email: "support@hiredfrex.com",
			description: "Career information site and small reviewed job board for Gulf and international applicants."
		}, {
			"@type": "WebSite",
			name: "HiredFrex",
			url: SITE_URL,
			potentialAction: {
				"@type": "SearchAction",
				target: `${SITE_URL}/jobs?q={search_term_string}`,
				"query-input": "required name=search_term_string"
			}
		}]
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "!max-w-none !px-0 !py-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: jsonLd(schema) }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-line bg-paper px-4 py-12 md:py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase tracking-[0.18em] text-gold-deep",
							children: "Career desk · Gulf & international"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 max-w-3xl font-display text-4xl leading-[1.08] md:text-[52px]",
							children: "Advice you can check. Jobs you can read twice."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-2xl font-serif text-xl leading-relaxed text-muted",
							children: "HiredFrex is a reading site first: dated articles, named authors, and official sources. A jobs rail sits on the side with current openings and a door for employers to post."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/blog",
									className: "inline-flex h-12 items-center rounded-xl bg-navy px-5 text-sm font-bold text-paper",
									children: "Read insights"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/jobs",
									className: "inline-flex h-12 items-center rounded-xl border border-line bg-surface px-5 text-sm font-bold text-navy",
									children: "Open jobs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/employers",
									className: "inline-flex h-12 items-center rounded-xl px-5 text-sm font-bold text-gold-deep underline underline-offset-4",
									children: "Employer posting"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl items-start gap-10 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_300px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Today’s desk" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl md:text-4xl",
						children: "What to read before you apply"
					}),
					featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/blog/$slug",
						params: { slug: featured.slug },
						className: "mt-6 block rounded-[28px] border border-line bg-surface p-6 md:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-bold uppercase tracking-wider text-gold-deep",
								children: featured.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-3xl leading-tight md:text-4xl",
								children: featured.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-serif text-lg text-muted",
								children: featured.excerpt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-xs text-faint",
								children: [
									featured.author,
									" · ",
									formatDate(featured.publishedOn),
									" · ",
									featured.readMinutes,
									" min"
								]
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 md:grid-cols-2",
						children: rest.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/blog/$slug",
							params: { slug: p.slug },
							className: "rounded-[22px] border border-line bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] font-bold uppercase tracking-wider text-gold-deep",
									children: p.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 font-display text-2xl leading-tight",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 line-clamp-3 text-sm text-muted",
									children: p.excerpt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-xs text-faint",
									children: [
										p.author,
										" · ",
										formatDate(p.publishedOn)
									]
								})
							]
						}, p.slug))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 rounded-[24px] border border-line bg-gold-soft/40 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: "Who writes this desk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Dated articles carry a named editor, a photo, and a date. Process pages explain what “reviewed” means before you treat a listing as a confirmed hire."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 grid gap-3 sm:grid-cols-3",
								children: STAFF_AUTHORS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/authors/$id",
									params: { id: a.id },
									className: "flex items-start gap-3 rounded-2xl bg-surface p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: a.photo,
										alt: "",
										width: 48,
										height: 48,
										className: "h-12 w-12 rounded-full"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-semibold text-navy",
										children: a.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-xs text-faint",
										children: [
											a.title,
											" · ",
											a.based.split(",")[0]
										]
									})] })]
								}, a.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Guides" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-display text-3xl",
								children: "Evergreen how-tos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 grid gap-3 md:grid-cols-2",
								children: GUIDES.slice(0, 6).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/guides/$slug",
									params: { slug: g.slug },
									className: "rounded-[22px] border border-line bg-surface p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl",
										children: g.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: g.excerpt
									})]
								}, g.slug))
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobsRail, { jobs })]
			})
		]
	});
}
//#endregion
export { Home as component };

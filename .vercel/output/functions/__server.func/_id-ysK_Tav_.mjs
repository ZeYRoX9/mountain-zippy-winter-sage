import { t as formatDate } from "./_ssr/utils-CxUWuhEe.mjs";
import { o as SITE_URL } from "./_ssr/site-D_EzqXMW.mjs";
import { t as jsonLd } from "./_ssr/seo-BYC44w_4.mjs";
import { v as Link, x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { l as Route$9 } from "./_ssr/router-BBMsO9gN.mjs";
import { n as Page, t as Eyebrow } from "./_ssr/site-shell-BqnhJ0K_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-ysK_Tav_.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function AuthorPage() {
	const { author, posts } = Route$9.useLoaderData();
	const schema = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: author.name,
		jobTitle: author.title,
		description: author.bio,
		url: `${SITE_URL}/authors/${author.id}`,
		image: `${SITE_URL}${author.photo}`,
		worksFor: {
			"@type": "Organization",
			name: "HiredFrex",
			url: SITE_URL
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: jsonLd(schema) }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "text-sm text-faint",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Home"
				}),
				" / ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/authors",
					children: "Writers"
				}),
				" / ",
				author.name
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap items-start gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: author.photo,
				alt: "",
				width: 96,
				height: 96,
				className: "h-24 w-24 rounded-full"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: author.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl md:text-5xl",
					children: author.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-faint",
					children: author.based
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl font-serif text-lg leading-relaxed text-muted",
					children: author.bio
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-12 font-display text-3xl",
			children: "Articles"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-4",
			children: [posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
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
						className: "mt-2 text-sm text-muted",
						children: p.excerpt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-faint",
						children: [
							formatDate(p.publishedOn),
							" · ",
							p.readMinutes,
							" min"
						]
					})
				]
			}, p.slug)), !posts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "No live articles under this byline yet."
			}) : null]
		})
	] });
};
//#endregion
export { SplitComponent as component };

import { o as __toESM } from "./_runtime.mjs";
import { t as formatDate } from "./_ssr/utils-CxUWuhEe.mjs";
import { o as SITE_URL } from "./_ssr/site-D_EzqXMW.mjs";
import { t as jsonLd } from "./_ssr/seo-BYC44w_4.mjs";
import { H as require_react, v as Link, x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as authorByName } from "./_ssr/authors-DJCyIZjS.mjs";
import { s as Route$7 } from "./_ssr/router-BBMsO9gN.mjs";
import { n as Page } from "./_ssr/site-shell-BqnhJ0K_.mjs";
import { t as JobsRail } from "./_ssr/jobs-rail-CptNux-D.mjs";
import { t as renderMarkdown } from "./_ssr/markdown-SqtmRIeS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Cm5ZzLnj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArticleLayout({ children, jobs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
			className: "min-w-0",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobsRail, { jobs })]
	});
}
function AuthorByline({ author, photo, publishedOn, updatedOn, minutes }) {
	const staff = authorByName(author);
	const src = photo || staff?.photo || "/logo-mark.png";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 flex items-start gap-3 border-y border-line py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "",
			width: 56,
			height: 56,
			className: "h-14 w-14 rounded-full object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			staff ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/authors/$id",
				params: { id: staff.id },
				className: "text-sm font-bold text-navy underline-offset-2 hover:underline",
				children: author
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-bold text-navy",
				children: author
			}),
			staff?.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-muted",
				children: staff.title
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 text-xs text-faint",
				children: [
					formatDate(publishedOn),
					updatedOn && updatedOn !== publishedOn ? ` · Updated ${formatDate(updatedOn)}` : "",
					minutes ? ` · ${minutes} min read` : ""
				]
			}),
			staff?.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm leading-relaxed text-muted",
				children: staff.bio
			}) : null
		] })]
	});
}
function ReadingProgress() {
	const [w, setW] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const height = (document.getElementById("main")?.scrollHeight ?? document.documentElement.scrollHeight) - window.innerHeight;
			setW(height <= 0 ? 0 : Math.min(100, Math.max(0, window.scrollY / height * 100)));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "read-progress",
		style: { width: `${w}%` },
		"aria-hidden": true
	});
}
var SplitComponent = function PostPage() {
	const { post: p, jobs, related } = Route$7.useLoaderData();
	const schema = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: p.title,
		datePublished: p.publishedOn,
		dateModified: p.updatedOn,
		description: p.excerpt,
		author: {
			"@type": "Person",
			name: p.author
		},
		publisher: {
			"@type": "Organization",
			name: "HiredFrex",
			url: SITE_URL,
			logo: `${SITE_URL}/logo-mark.png`
		},
		image: p.coverUrl || `https://hiredfrex.com/og.jpg`,
		mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadingProgress, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: jsonLd(schema) }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ArticleLayout, {
			jobs,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "text-sm text-faint",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Home"
						}),
						" / ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog",
							children: "Insights"
						}),
						" / ",
						p.category
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[11px] font-bold uppercase tracking-wider text-gold-deep",
					children: p.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 max-w-3xl font-display text-4xl md:text-5xl",
					children: p.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorByline, {
					author: p.author,
					photo: p.authorPhoto,
					publishedOn: p.publishedOn,
					updatedOn: p.updatedOn,
					minutes: p.readMinutes
				}),
				p.coverUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.coverUrl,
					alt: "",
					className: "mt-6 w-full rounded-[22px] object-cover"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "prose-hf mt-8",
					dangerouslySetInnerHTML: { __html: renderMarkdown(p.body) }
				}),
				related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Read next"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog/$slug",
							params: { slug: r.slug },
							className: "font-semibold text-navy underline",
							children: r.title
						}) }, r.slug))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-10 text-sm text-muted",
					children: [
						"Corrections: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/editorial-standards",
							className: "font-semibold text-navy",
							children: "editorial standards"
						}),
						" or",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "font-semibold text-navy",
							children: "contact"
						}),
						"."
					]
				})
			]
		})
	] });
};
//#endregion
export { SplitComponent as component };

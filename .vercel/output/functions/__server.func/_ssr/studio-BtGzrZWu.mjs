import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { n as STAFF_AUTHORS, t as PUBLISHING_PLAN } from "./authors-DJCyIZjS.mjs";
import { g as createSsrRpc } from "./router-BBMsO9gN.mjs";
import { i as useCurrentUserState, n as Page, r as RedirectToSignIn, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
import { t as authMiddleware } from "./middleware-4Vp6Rdy2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-BtGzrZWu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getStudioAccess = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("cb9af1be815b5f9528eaa1993315b7d19fbc1fc378d201f1070174046570334c"));
var claimEditor = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("b308a0c8f6337205af44321e3f67b8fbc378145583e4994a98e844549df34f26"));
var listStudioPosts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e1f6ad03de98144d5a7e1d9133288c288e4051d949aa61173d222f8aed90284b"));
var saveStudioPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("e181fb7e1db15f017592229d937d28b02142e90c5e4c6cfc94a12fc24eeb6e92"));
var emptyForm = {
	id: "",
	title: "",
	excerpt: "",
	body: "",
	category: "Career advice",
	author: STAFF_AUTHORS[0].name,
	authorPhoto: STAFF_AUTHORS[0].photo,
	coverUrl: "",
	published: false
};
function readImage(file, max = 900) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			const scale = Math.min(1, max / Math.max(img.width, img.height));
			const c = document.createElement("canvas");
			c.width = Math.round(img.width * scale);
			c.height = Math.round(img.height * scale);
			c.getContext("2d")?.drawImage(img, 0, 0, c.width, c.height);
			resolve(c.toDataURL("image/jpeg", .82));
		};
		img.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that image."));
		img.src = URL.createObjectURL(file);
	});
}
function StudioPage() {
	const { user, isPending } = useCurrentUserState();
	const [access, setAccess] = (0, import_react.useState)(null);
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [note, setNote] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const words = form.body.trim() ? form.body.trim().split(/\s+/).length : 0;
	async function refresh() {
		const a = await getStudioAccess();
		setAccess(a);
		if (a.isEditor) setPosts(await listStudioPosts());
	}
	(0, import_react.useEffect)(() => {
		if (user) refresh();
	}, [user]);
	if (isPending || !access) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-2xl bg-line" }) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const liveSlugs = new Set(posts.filter((p) => p.published).map((p) => p.slug));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Private · noindex" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl",
			children: "Editorial studio"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl font-serif text-muted",
			children: "One substantial article a day, with a named author and a photo. Do not invent salaries or employers. Google does not publish a post-count rule; thin daily stubs will not help."
		}),
		!access.isEditor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-[22px] border border-line bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "This desk is limited to the site editor."
				}),
				access.canClaim ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "mt-4 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-paper",
					onClick: async () => {
						const res = await claimEditor();
						setNote(res.ok ? "You are now the editor." : res.error);
						await refresh();
					},
					children: "Claim editor access (first account only)"
				}) : null,
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm",
					children: note
				}) : null
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 lg:grid-cols-[1fr_280px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3",
				onSubmit: async (e) => {
					e.preventDefault();
					const res = await saveStudioPost({ data: {
						id: form.id || void 0,
						title: form.title,
						excerpt: form.excerpt,
						body: form.body,
						category: form.category,
						author: form.author,
						authorPhoto: form.authorPhoto,
						coverUrl: form.coverUrl,
						published: form.published
					} });
					setNote(res.ok ? `Saved. Public URL: /blog/${res.slug}` : res.error);
					if (res.ok) {
						setForm(emptyForm);
						await refresh();
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm",
						placeholder: "Headline",
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm",
						placeholder: "Standfirst (at least two sentences)",
						value: form.excerpt,
						onChange: (e) => setForm({
							...form,
							excerpt: e.target.value
						}),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm",
							placeholder: "Category",
							value: form.category,
							onChange: (e) => setForm({
								...form,
								category: e.target.value
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm",
							value: STAFF_AUTHORS.some((a) => a.name === form.author) ? form.author : "__custom",
							onChange: (e) => {
								if (e.target.value === "__custom") {
									setForm({
										...form,
										author: "",
										authorPhoto: form.authorPhoto
									});
									return;
								}
								const a = STAFF_AUTHORS.find((s) => s.name === e.target.value);
								setForm({
									...form,
									author: e.target.value,
									authorPhoto: a?.photo || form.authorPhoto
								});
							},
							children: [STAFF_AUTHORS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: a.name,
								children: [
									a.name,
									" — ",
									a.title
								]
							}, a.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "__custom",
								children: "Custom author name…"
							})]
						})]
					}),
					!STAFF_AUTHORS.some((a) => a.name === form.author) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm",
						placeholder: "Author name",
						value: form.author,
						onChange: (e) => setForm({
							...form,
							author: e.target.value
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-semibold",
						children: "Author photo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						onChange: async (e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							setForm({
								...form,
								authorPhoto: await readImage(file, 320)
							});
						}
					}),
					form.authorPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: form.authorPhoto,
						alt: "",
						className: "h-16 w-16 rounded-full object-cover"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-semibold",
						children: "Article photo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						onChange: async (e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							setForm({
								...form,
								coverUrl: await readImage(file, 1400)
							});
						}
					}),
					form.coverUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: form.coverUrl,
						alt: "",
						className: "max-h-40 rounded-xl object-cover"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "min-h-[360px] rounded-xl border border-line bg-surface p-3 font-mono text-sm",
						placeholder: "Markdown body. Cite official sources. Aim for 800+ words.",
						value: form.body,
						onChange: (e) => setForm({
							...form,
							body: e.target.value
						}),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `text-xs ${words < 800 ? "text-warn" : "text-ok"}`,
						children: [
							words,
							" words ",
							words < 800 ? "(need 800 to publish a piece Google can evaluate)" : "— length looks solid"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: form.published,
							onChange: (e) => setForm({
								...form,
								published: e.target.checked
							})
						}), "Publish (and index) this article"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "h-11 rounded-xl bg-navy text-sm font-bold text-paper",
						children: "Save article"
					}),
					note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: note
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "12-day desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Substantial pieces only. 800 words is the floor."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-2 text-sm",
						children: PUBLISHING_PLAN.map((d) => {
							const done = d.slug ? liveSlugs.has(d.slug) : false;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: done ? "text-ok" : "text-faint",
									children: done ? "Live" : `Day ${d.day}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.title })]
							}, d.slug);
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Existing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-left font-semibold text-navy",
						onClick: () => setForm({
							id: p.id,
							title: p.title,
							excerpt: p.excerpt,
							body: p.body,
							category: p.category,
							author: p.author,
							authorPhoto: p.authorPhoto,
							coverUrl: p.coverUrl,
							published: p.published
						}),
						children: p.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-faint",
						children: [
							p.published ? "Live" : "Draft",
							" · ",
							p.author,
							" ·",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blog/$slug",
								params: { slug: p.slug },
								children: "view"
							})
						]
					})] }, p.id))
				})] })]
			})]
		})
	] });
}
//#endregion
export { StudioPage as component };

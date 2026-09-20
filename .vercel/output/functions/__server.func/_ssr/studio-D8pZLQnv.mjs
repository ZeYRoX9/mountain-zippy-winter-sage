import { i as uid, r as slugify } from "./utils-CxUWuhEe.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-CED-7ZIa.mjs";
import { t as authMiddleware } from "./middleware-4Vp6Rdy2.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as ensureSeed } from "./seed-FMl3N7gH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-D8pZLQnv.js
async function isEditor(userId) {
	const role = (await (await getSql())`select role from profiles where user_id = ${userId}`)[0]?.role;
	return role === "editor" || role === "admin";
}
var getStudioAccess_createServerFn_handler = createServerRpc({
	id: "cb9af1be815b5f9528eaa1993315b7d19fbc1fc378d201f1070174046570334c",
	name: "getStudioAccess",
	filename: "src/lib/server/studio.ts"
}, (opts) => getStudioAccess.__executeServer(opts));
var getStudioAccess = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getStudioAccess_createServerFn_handler, async ({ context }) => {
	await ensureSeed();
	const sql = await getSql();
	const editors = await sql`
      select count(*)::int as n from profiles where role = ${"editor"} or role = ${"admin"}
    `;
	const mine = await sql`
      select role, display_name from profiles where user_id = ${context.userId}
    `;
	return {
		isEditor: mine[0]?.role === "editor" || mine[0]?.role === "admin",
		canClaim: (editors[0]?.n ?? 0) === 0,
		role: mine[0]?.role ?? "seeker",
		name: mine[0]?.display_name ?? null
	};
});
var claimEditor_createServerFn_handler = createServerRpc({
	id: "b308a0c8f6337205af44321e3f67b8fbc378145583e4994a98e844549df34f26",
	name: "claimEditor",
	filename: "src/lib/server/studio.ts"
}, (opts) => claimEditor.__executeServer(opts));
var claimEditor = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(claimEditor_createServerFn_handler, async ({ context }) => {
	await ensureSeed();
	const sql = await getSql();
	if (((await sql`
      select count(*)::int as n from profiles where role = ${"editor"} or role = ${"admin"}
    `)[0]?.n ?? 0) > 0) return {
		ok: false,
		error: "An editor already exists on this site."
	};
	await sql`update profiles set role = ${"editor"}, updated_at = now() where user_id = ${context.userId}`;
	return { ok: true };
});
var listStudioPosts_createServerFn_handler = createServerRpc({
	id: "e1f6ad03de98144d5a7e1d9133288c288e4051d949aa61173d222f8aed90284b",
	name: "listStudioPosts",
	filename: "src/lib/server/studio.ts"
}, (opts) => listStudioPosts.__executeServer(opts));
var listStudioPosts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listStudioPosts_createServerFn_handler, async ({ context }) => {
	if (!await isEditor(context.userId)) return [];
	return (await (await getSql())`
      select id, slug, title, excerpt, body, category, author, author_photo, cover_url, published, published_on, updated_on
      from blog_posts
      order by updated_on desc
    `).map((r) => ({
		id: String(r.id),
		slug: String(r.slug),
		title: String(r.title),
		excerpt: String(r.excerpt),
		body: String(r.body),
		category: String(r.category),
		author: String(r.author || "HiredFrex Editorial"),
		authorPhoto: String(r.author_photo || ""),
		coverUrl: String(r.cover_url || ""),
		published: Boolean(r.published),
		publishedOn: String(r.published_on),
		updatedOn: String(r.updated_on)
	}));
});
var saveStudioPost_createServerFn_handler = createServerRpc({
	id: "e181fb7e1db15f017592229d937d28b02142e90c5e4c6cfc94a12fc24eeb6e92",
	name: "saveStudioPost",
	filename: "src/lib/server/studio.ts"
}, (opts) => saveStudioPost.__executeServer(opts));
var saveStudioPost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveStudioPost_createServerFn_handler, async ({ context, data }) => {
	if (!await isEditor(context.userId)) return {
		ok: false,
		error: "Only the editorial desk can publish."
	};
	const title = data.title.trim();
	const excerpt = data.excerpt.trim();
	const body = data.body.trim();
	const author = data.author.trim() || "HiredFrex Editorial";
	if (title.length < 8 || excerpt.length < 40 || body.split(/\s+/).length < 800) return {
		ok: false,
		error: "Publish only when the piece is ready: a real title, a standfirst, and at least 800 words. Thin daily stubs are what get AdSense rejected."
	};
	const sql = await getSql();
	const slug = slugify(title);
	const minutes = Math.max(4, Math.round(body.split(/\s+/).length / 200));
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const photo = data.authorPhoto.trim();
	const cover = data.coverUrl.trim();
	if (data.id) {
		await sql`
        update blog_posts set
          title = ${title},
          excerpt = ${excerpt},
          body = ${body},
          category = ${data.category.trim() || "Career advice"},
          author = ${author},
          author_photo = ${photo},
          cover_url = ${cover},
          published = ${data.published},
          indexable = ${data.published},
          updated_on = ${today},
          read_minutes = ${minutes}
        where id = ${data.id}
      `;
		return {
			ok: true,
			slug
		};
	}
	const finalSlug = (await sql`select slug from blog_posts where slug = ${slug}`).length ? `${slug}-${uid("p").slice(-6)}` : slug;
	await sql`
      insert into blog_posts (
        id, slug, title, excerpt, body, category, author, author_photo, cover_url, published, indexable,
        published_on, updated_on, read_minutes, created_by_user_id
      ) values (
        ${uid("post")}, ${finalSlug}, ${title}, ${excerpt}, ${body},
        ${data.category.trim() || "Career advice"}, ${author}, ${photo}, ${cover},
        ${data.published}, ${data.published}, ${today}, ${today}, ${minutes}, ${context.userId}
      )
    `;
	return {
		ok: true,
		slug: finalSlug
	};
});
//#endregion
export { claimEditor_createServerFn_handler, getStudioAccess_createServerFn_handler, listStudioPosts_createServerFn_handler, saveStudioPost_createServerFn_handler };

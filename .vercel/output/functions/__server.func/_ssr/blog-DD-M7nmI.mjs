import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-CED-7ZIa.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as ensureSeed } from "./seed-FMl3N7gH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-DD-M7nmI.js
function mapPost(r, withBody = false) {
	const base = {
		slug: String(r.slug),
		title: String(r.title),
		excerpt: String(r.excerpt),
		category: String(r.category),
		author: String(r.author),
		authorPhoto: r.author_photo ? String(r.author_photo) : null,
		coverUrl: r.cover_url ? String(r.cover_url) : null,
		publishedOn: String(r.published_on),
		updatedOn: String(r.updated_on),
		readMinutes: Number(r.read_minutes ?? 8)
	};
	if (withBody) return {
		...base,
		body: String(r.body)
	};
	return base;
}
var listPosts_createServerFn_handler = createServerRpc({
	id: "7a45fa43fa6f6d0c5d01eda75f3f6b5e7d3a35bba8e382c915ede75a06b750a8",
	name: "listPosts",
	filename: "src/lib/server/blog.ts"
}, (opts) => listPosts.__executeServer(opts));
var listPosts = createServerFn({ method: "GET" }).handler(listPosts_createServerFn_handler, async () => {
	await ensureSeed();
	return (await (await getSql())`
    select slug, title, excerpt, category, author, author_photo, cover_url, published_on, updated_on, read_minutes
    from blog_posts
    where published = true and indexable = true
    order by published_on desc
  `).map((r) => mapPost(r));
});
var getPost_createServerFn_handler = createServerRpc({
	id: "277118b47559f5bc7c588a591aec2e834d1aaa79d69bd63975e63852e395a9ef",
	name: "getPost",
	filename: "src/lib/server/blog.ts"
}, (opts) => getPost.__executeServer(opts));
var getPost = createServerFn({ method: "GET" }).validator((input) => input).handler(getPost_createServerFn_handler, async ({ data }) => {
	await ensureSeed();
	const r = (await (await getSql())`
      select slug, title, excerpt, body, category, author, author_photo, cover_url, published_on, updated_on, read_minutes
      from blog_posts
      where slug = ${data.slug} and published = true
      limit 1
    `)[0];
	if (!r) return null;
	return mapPost(r, true);
});
//#endregion
export { getPost_createServerFn_handler, listPosts_createServerFn_handler };

import { randomUUID } from "node:crypto";
import { sql, json, parseBody, readToken } from "./lib.mjs";

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function handler(event) {
  const db = sql();
  if (event.httpMethod === "GET") {
    const slug = event.queryStringParameters?.slug;
    if (slug) {
      const rows = await db`select * from blog_posts where slug = ${slug} and published = true limit 1`;
      return json(200, { post: rows[0] || null });
    }
    const rows = await db`select slug, title, excerpt, category, author, author_photo, published, created_at, updated_at
      from blog_posts where published = true order by updated_at desc`;
    return json(200, { posts: rows });
  }
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  const session = readToken(event);
  const admin = event.headers["x-admin-token"] || event.headers["X-Admin-Token"];
  const okAdmin = admin && admin === process.env.ADMIN_TOKEN;
  const okEditor = session && (session.role === "admin" || session.role === "editor");
  if (!okAdmin && !okEditor) return json(401, { error: "Editor only." });
  const data = parseBody(event);
  const title = String(data.title || "").trim();
  const excerpt = String(data.excerpt || "").trim();
  const body = String(data.body || "").trim();
  const author = String(data.author || "HiredFrex Editorial").trim();
  const authorPhoto = String(data.authorPhoto || data.author_photo || "");
  const cover = String(data.coverUrl || data.cover_url || data.image_data || "");
  if (title.length < 8 || excerpt.length < 40 || body.split(/\s+/).length < 800) {
    return json(400, { error: "Need a real title, standfirst, and at least 800 words." });
  }
  const slug = data.slug || slugify(title);
  const id = data.id || randomUUID();
  await db`insert into blog_posts (id, slug, title, excerpt, body, category, author, author_photo, cover_url, image_data, published, updated_at)
    values (${id}::uuid, ${slug}, ${title}, ${excerpt}, ${body}, ${String(data.category || "Career advice")},
      ${author}, ${authorPhoto}, ${cover}, ${cover}, ${Boolean(data.published)}, now())
    on conflict (slug) do update set
      title = excluded.title, excerpt = excluded.excerpt, body = excluded.body, category = excluded.category,
      author = excluded.author, author_photo = excluded.author_photo, cover_url = excluded.cover_url,
      image_data = excluded.image_data, published = excluded.published, updated_at = now()`;
  return json(200, { ok: true, slug });
}

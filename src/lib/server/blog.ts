import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { ensureSeed } from "@/lib/data/seed";

export type PostListItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorPhoto: string | null;
  coverUrl: string | null;
  publishedOn: string;
  updatedOn: string;
  readMinutes: number;
};

export type PostDetail = PostListItem & { body: string };

function mapPost(r: Record<string, unknown>, withBody = false): PostDetail | PostListItem {
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
    readMinutes: Number(r.read_minutes ?? 8),
  };
  if (withBody) return { ...base, body: String(r.body) };
  return base;
}

export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeed();
  const sql = await getSql();
  const rows = await sql<Record<string, unknown>>`
    select slug, title, excerpt, category, author, author_photo, cover_url, published_on, updated_on, read_minutes
    from blog_posts
    where published = true and indexable = true
    order by published_on desc
  `;
  return rows.map((r) => mapPost(r)) as PostListItem[];
});

export const getPost = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    await ensureSeed();
    const sql = await getSql();
    const rows = await sql<Record<string, unknown>>`
      select slug, title, excerpt, body, category, author, author_photo, cover_url, published_on, updated_on, read_minutes
      from blog_posts
      where slug = ${data.slug} and published = true
      limit 1
    `;
    const r = rows[0];
    if (!r) return null;
    return mapPost(r, true) as PostDetail;
  });

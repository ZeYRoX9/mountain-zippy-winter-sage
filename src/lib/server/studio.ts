import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ensureSeed } from "@/lib/data/seed";
import { uid, slugify } from "@/lib/utils";

type StudioPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  authorPhoto: string;
  coverUrl: string;
  published: boolean;
  publishedOn: string;
  updatedOn: string;
};

export type StudioJob = {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  locationDisplay: string;
  locationCity: string;
  locationCountry: string;
  employmentType: string;
  category: string;
  overview: string;
  salaryDisplay: string;
  status: string;
  indexable: boolean;
  featured: boolean;
};

async function isEditor(userId: string) {
  const sql = await getSql();
  const rows = await sql<{ role: string }>`select role from profiles where user_id = ${userId}`;
  const role = rows[0]?.role;
  return role === "editor" || role === "admin";
}

export const getStudioAccess = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureSeed();
    const sql = await getSql();
    const editors = await sql<{ n: number }>`
      select count(*)::int as n from profiles where role = ${"editor"} or role = ${"admin"}
    `;

    const mine = await sql<{ role: string; display_name: string | null }>`
      select role, display_name from profiles where user_id = ${context.userId}
    `;
    return {
      isEditor: mine[0]?.role === "editor" || mine[0]?.role === "admin",
      canClaim: (editors[0]?.n ?? 0) === 0,
      role: mine[0]?.role ?? "seeker",
      name: mine[0]?.display_name ?? null,
    };
  });

export const claimEditor = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureSeed();
    const sql = await getSql();
    const editors = await sql<{ n: number }>`
      select count(*)::int as n from profiles where role = ${"editor"} or role = ${"admin"}
    `;

    if ((editors[0]?.n ?? 0) > 0) {
      return { ok: false as const, error: "An editor already exists on this site." };
    }
    await sql`update profiles set role = ${"editor"}, updated_at = now() where user_id = ${context.userId}`;
    return { ok: true as const };
  });

export const listStudioPosts = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    if (!(await isEditor(context.userId))) return [] as StudioPost[];
    const sql = await getSql();
    const rows = await sql<Record<string, unknown>>`
      select id, slug, title, excerpt, body, category, author, author_photo, cover_url, published, published_on, updated_on
      from blog_posts
      order by updated_on desc
    `;
    return rows.map((r) => ({
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
      updatedOn: String(r.updated_on),
    })) satisfies StudioPost[];
  });

export const saveStudioPost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: {
    id?: string;
    title: string;
    excerpt: string;
    body: string;
    category: string;
    author: string;
    authorPhoto: string;
    coverUrl: string;
    published: boolean;
  }) => input)
  .handler(async ({ context, data }) => {
    if (!(await isEditor(context.userId))) {
      return { ok: false as const, error: "Only the editorial desk can publish." };
    }
    const title = data.title.trim();
    const excerpt = data.excerpt.trim();
    const body = data.body.trim();
    const author = data.author.trim() || "HiredFrex Editorial";
    if (title.length < 8 || excerpt.length < 40 || body.split(/\s+/).length < 800) {
      return {
        ok: false as const,
        error: "Publish only when the piece is ready: a real title, a standfirst, and at least 800 words. Thin daily stubs are what get AdSense rejected.",
      };
    }
    const sql = await getSql();
    const slug = slugify(title);
    const minutes = Math.max(4, Math.round(body.split(/\s+/).length / 200));
    const today = new Date().toISOString().slice(0, 10);
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
      return { ok: true as const, slug };
    }
    const clash = await sql<{ slug: string }>`select slug from blog_posts where slug = ${slug}`;
    const finalSlug = clash.length ? `${slug}-${uid("p").slice(-6)}` : slug;
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
    return { ok: true as const, slug: finalSlug };
  });

export const listStudioJobs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    if (!(await isEditor(context.userId))) return [] as StudioJob[];
    const sql = await getSql();
    const rows = await sql<Record<string, unknown>>`
      select id, slug, title, company_name, location_display, location_city, location_country,
        employment_type, category, overview, salary_display, status, indexable, featured
      from jobs
      order by created_at desc
      limit 200
    `;
    return rows.map((r) => ({
      id: String(r.id),
      slug: String(r.slug || ""),
      title: String(r.title || ""),
      companyName: String(r.company_name || ""),
      locationDisplay: String(r.location_display || ""),
      locationCity: String(r.location_city || ""),
      locationCountry: String(r.location_country || ""),
      employmentType: String(r.employment_type || "Full-time"),
      category: String(r.category || "Other"),
      overview: String(r.overview || ""),
      salaryDisplay: String(r.salary_display || ""),
      status: String(r.status || "pending"),
      indexable: Boolean(r.indexable),
      featured: Boolean(r.featured),
    })) satisfies StudioJob[];
  });

export const saveStudioJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: {
    id?: string;
    title: string;
    companyName: string;
    locationCity: string;
    locationCountry: string;
    employmentType: string;
    category: string;
    overview: string;
    salaryDisplay?: string;
    status: string;
    indexable: boolean;
  }) => input)
  .handler(async ({ context, data }) => {
    if (!(await isEditor(context.userId))) {
      return { ok: false as const, error: "Only the editorial desk can edit jobs." };
    }
    const title = data.title.trim();
    const companyName = data.companyName.trim();
    const locationCity = data.locationCity.trim();
    const locationCountry = data.locationCountry.trim() || "United Arab Emirates";
    const overview = data.overview.trim();
    if (title.length < 4 || !companyName || !locationCity || overview.length < 40) {
      return { ok: false as const, error: "Need a title, company, city, and a real description." };
    }
    const sql = await getSql();
    const locationDisplay = `${locationCity}, ${locationCountry}`;
    const category = data.category.trim() || "Other";
    const status = data.status || "pending";
    const today = new Date().toISOString().slice(0, 10);
    if (data.id) {
      await sql`
        update jobs set
          title = ${title},
          company_name = ${companyName},
          location_city = ${locationCity},
          location_country = ${locationCountry},
          location_display = ${locationDisplay},
          employment_type = ${data.employmentType || "Full-time"},
          category = ${category},
          category_slug = ${slugify(category)},
          overview = ${overview},
          salary_display = ${data.salaryDisplay?.trim() || null},
          status = ${status},
          indexable = ${data.indexable},
          updated_at = now()
        where id = ${data.id}
      `;
      const row = await sql<{ slug: string }>`select slug from jobs where id = ${data.id}`;
      return { ok: true as const, slug: row[0]?.slug || "" };
    }
    const id = uid("job");
    const slug = `${slugify(title)}-${slugify(companyName)}-${slugify(locationCity)}-${id.slice(-6)}`;
    await sql`
      insert into jobs (
        id, slug, employer_id, title, company_name, location_city, location_country,
        location_display, employment_type, workplace_type, category, category_slug, posted_on,
        overview, about_employer, how_to_apply, verification_status, verification_summary,
        indexable, featured, status, posted_by_user_id
      ) values (
        ${id}, ${slug}, ${"studio"}, ${title}, ${companyName}, ${locationCity}, ${locationCountry},
        ${locationDisplay}, ${data.employmentType || "Full-time"}, ${"On-site"}, ${category},
        ${slugify(category)}, ${today}, ${overview},
        ${`${companyName} listed from the HiredFrex studio. Identity is not independently confirmed.`},
        ${"Apply on HiredFrex. Do not pay anyone to apply."}, ${"completeness_reviewed"},
        ${"Edited from the studio desk."}, ${data.indexable}, ${false}, ${status}, ${context.userId}
      )
    `;
    return { ok: true as const, slug };
  });

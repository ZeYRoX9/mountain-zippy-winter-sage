import { sql, json, parseBody, readToken } from "./lib.mjs";
import { randomUUID } from "node:crypto";

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function isAdmin(event) {
  const admin = event.headers["x-admin-token"] || event.headers["X-Admin-Token"] || "";
  return Boolean(process.env.ADMIN_TOKEN && admin && admin === process.env.ADMIN_TOKEN);
}

async function insertLegacy(db, { id, title, company, location, type, salary, category, description, status, flag }) {
  await db`insert into jobs (id, title, company, location, type, salary, category, description, status, flag_reasons)
    values (${id}::uuid, ${title}, ${company}, ${location}, ${type}, ${salary}, ${category}, ${description}, ${status}, ${flag || ""})`;
}

async function insertFull(db, row) {
  const city = row.location.split(",")[0].trim();
  await db`insert into jobs (
      id, title, company, location, type, salary, category, description, status, flag_reasons,
      company_name, location_display, location_city, overview, employment_type, category_slug, slug, indexable, posted_on
    ) values (
      ${row.id}::uuid, ${row.title}, ${row.company}, ${row.location}, ${row.type}, ${row.salary},
      ${row.category}, ${row.description}, ${row.status}, ${row.flag || ""},
      ${row.company}, ${row.location}, ${city}, ${row.description}, ${row.type},
      ${slugify(row.category)}, ${row.slug}, ${row.indexable}, now()::date
    )`;
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  const db = sql();
  const admin = isAdmin(event);

  if (event.httpMethod === "GET") {
    if (admin) {
      try {
        const rows = await db`select id, title, company, location, type, salary, category, description, status, created_at,
          slug, company_name, location_city, overview, indexable
          from jobs order by created_at desc nulls last limit 200`;
        return json(200, { jobs: rows });
      } catch {
        const rows = await db`select id, title, company, location, type, salary, category, description, status, created_at
          from jobs order by created_at desc limit 200`;
        return json(200, { jobs: rows });
      }
    }
    try {
      const rows = await db`select id, title, company, location, type, salary, category, status, created_at, slug
        from jobs where status = ${"active"} order by created_at desc limit 80`;
      return json(200, { jobs: rows });
    } catch {
      const rows = await db`select id, title, company, location, type, salary, category, status, created_at
        from jobs where status = ${"active"} order by created_at desc limit 80`;
      return json(200, { jobs: rows });
    }
  }

  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  const d = parseBody(event);

  if (admin) {
    const action = String(d.action || "save");
    const id = String(d.id || "").trim();
    if ((action === "close" || action === "publish") && id) {
      const status = action === "close" ? "closed" : "active";
      const indexable = action !== "close";
      try {
        await db`update jobs set status = ${status}, indexable = ${indexable} where id::text = ${id}`;
      } catch {
        await db`update jobs set status = ${status} where id::text = ${id}`;
      }
      return json(200, { ok: true, id, status });
    }
    const title = String(d.title || "").trim();
    const company = String(d.company || "").trim();
    const location = String(d.location || "").trim();
    const description = String(d.description || d.overview || "").trim();
    if (title.length < 4 || !company || !location || description.length < 40) {
      return json(400, { error: "Complete title, company, location, and a real description." });
    }
    const type = String(d.type || "Full-time");
    const salary = String(d.salary || "");
    const category = String(d.category || "Other");
    const status = String(d.status || "active");
    const slug = String(d.slug || slugify(`${title} ${company} ${location}`));
    const city = location.split(",")[0].trim();
    const indexable = status === "active";
    if (id) {
      try {
        await db`update jobs set
          title = ${title}, company = ${company}, location = ${location}, type = ${type},
          salary = ${salary}, category = ${category}, description = ${description}, status = ${status},
          company_name = ${company}, location_display = ${location}, location_city = ${city},
          overview = ${description}, employment_type = ${type}, category_slug = ${slugify(category)},
          slug = ${slug}, indexable = ${indexable}
          where id::text = ${id}`;
      } catch {
        await db`update jobs set
          title = ${title}, company = ${company}, location = ${location}, type = ${type},
          salary = ${salary}, category = ${category}, description = ${description}, status = ${status}
          where id::text = ${id}`;
      }
      return json(200, { ok: true, id, slug, status });
    }
    const newId = randomUUID();
    try {
      await insertFull(db, {
        id: newId, title, company, location, type, salary, category, description, status,
        flag: "", slug, indexable,
      });
    } catch {
      await insertLegacy(db, { id: newId, title, company, location, type, salary, category, description, status, flag: "" });
    }
    return json(200, { ok: true, id: newId, slug, status });
  }

  const session = readToken(event);
  if (!session) return json(401, { error: "Sign in as an employer first." });
  const title = String(d.title || "").trim();
  const company = String(d.company || "").trim();
  const location = String(d.location || "").trim();
  const description = String(d.description || "").trim();
  if (title.length < 4 || !company || !location || description.length < 40) {
    return json(400, { error: "Complete title, company, location, and a real description." });
  }
  const blob = `${title} ${company} ${description}`.toLowerCase();
  let status = "pending";
  let flag = "";
  if (/\b(visa fee|processing fee|registration fee|pay to apply)\b/.test(blob)) {
    status = "needs_verification";
    flag = "Fee language in the listing.";
  }
  const id = randomUUID();
  const type = String(d.type || "Full-time");
  const salary = String(d.salary || "");
  const category = String(d.category || "Other");
  const slug = slugify(`${title} ${company} ${location}`);
  try {
    await insertFull(db, {
      id, title, company, location, type, salary, category, description, status, flag, slug, indexable: false,
    });
  } catch {
    await insertLegacy(db, { id, title, company, location, type, salary, category, description, status, flag });
  }
  return json(200, { ok: true, id, status });
}

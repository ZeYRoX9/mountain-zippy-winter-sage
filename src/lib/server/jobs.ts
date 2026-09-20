import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { ensureSeed } from "@/lib/data/seed";
import type { JobListItem, PublicJob, VerificationCheck } from "@/lib/data/types";
import { parseJsonArray } from "@/lib/utils";

type JobRow = Record<string, unknown>;

function asString(v: unknown, fallback = "") {
  return v == null ? fallback : String(v);
}
function asNum(v: unknown): number | null {
  if (v == null || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}
function asBool(v: unknown) {
  return v === true || v === "t" || v === "true" || v === 1;
}

function parseChecks(raw: unknown): VerificationCheck[] {
  try {
    const parsed = JSON.parse(asString(raw, "[]")) as VerificationCheck[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toListItem(row: JobRow): JobListItem {
  return {
    id: asString(row.id),
    slug: asString(row.slug),
    title: asString(row.title),
    companyName: asString(row.company_name),
    locationDisplay: asString(row.location_display),
    locationCity: asString(row.location_city),
    employmentType: asString(row.employment_type),
    workplaceType: asString(row.workplace_type),
    salaryDisplay: row.salary_display ? asString(row.salary_display) : null,
    category: asString(row.category),
    categorySlug: asString(row.category_slug),
    postedOn: row.posted_on ? asString(row.posted_on) : null,
    verificationStatus: asString(row.verification_status),
    featured: asBool(row.featured),
    experienceLevel: row.experience_level ? asString(row.experience_level) : null,
  };
}

function toPublicJob(row: JobRow): PublicJob {
  return {
    ...toListItem(row),
    locationCountry: asString(row.location_country),
    salaryMin: asNum(row.salary_min),
    salaryMax: asNum(row.salary_max),
    salaryCurrency: row.salary_currency ? asString(row.salary_currency) : null,
    salaryPeriod: row.salary_period ? asString(row.salary_period) : null,
    closingOn: row.closing_on ? asString(row.closing_on) : null,
    overview: asString(row.overview),
    aboutEmployer: asString(row.about_employer),
    responsibilities: parseJsonArray(asString(row.responsibilities_json, "[]")),
    essentialRequirements: parseJsonArray(asString(row.essential_requirements_json, "[]")),
    preferredRequirements: parseJsonArray(asString(row.preferred_requirements_json, "[]")),
    skills: parseJsonArray(asString(row.skills_json, "[]")),
    schedule: row.schedule ? asString(row.schedule) : null,
    benefits: parseJsonArray(asString(row.benefits_json, "[]")),
    visaInfo: row.visa_info ? asString(row.visa_info) : null,
    hiringProcess: row.hiring_process ? asString(row.hiring_process) : null,
    howToApply: asString(row.how_to_apply),
    sourceName: row.source_name ? asString(row.source_name) : null,
    sourceUrl: row.source_url ? asString(row.source_url) : null,
    lastVerifiedOn: row.last_verified_on ? asString(row.last_verified_on) : null,
    verificationSummary: asString(row.verification_summary),
    checks: parseChecks(row.checks_json),
    qualityFlags: parseJsonArray(asString(row.quality_flags_json, "[]")),
    views: asNum(row.views) ?? 0,
    employerWebsite: row.website ? asString(row.website) : null,
  };
}

const PUBLIC_WHERE = `status = 'published' and indexable = true and verification_status in ('completeness_reviewed','source_confirmed','employer_confirmed')`;

export const listPublicJobs = createServerFn({ method: "GET" })
  .validator((input: {
    q?: string;
    category?: string;
    city?: string;
    type?: string;
    workplace?: string;
    verification?: string;
    experience?: string;
  } | undefined) => input ?? {})
  .handler(async ({ data }) => {
    await ensureSeed();
    const sql = await getSql();
    const rows = await sql<JobRow>`
      select * from jobs
      where status = 'published' and indexable = true
        and verification_status in ('completeness_reviewed','source_confirmed','employer_confirmed')
      order by featured desc, posted_on desc nulls last, created_at desc
    `;
    let jobs = rows.map(toListItem);
    const q = data.q?.trim().toLowerCase();
    if (q) {
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.companyName.toLowerCase().includes(q) ||
          j.locationDisplay.toLowerCase().includes(q) ||
          j.category.toLowerCase().includes(q),
      );
    }
    if (data.category) jobs = jobs.filter((j) => j.categorySlug === data.category);
    if (data.city) {
      const city = data.city.toLowerCase();
      jobs = jobs.filter((j) => j.locationCity.toLowerCase() === city);
    }
    if (data.type) jobs = jobs.filter((j) => j.employmentType === data.type);
    if (data.workplace) jobs = jobs.filter((j) => j.workplaceType === data.workplace);
    if (data.verification) jobs = jobs.filter((j) => j.verificationStatus === data.verification);
    if (data.experience) jobs = jobs.filter((j) => j.experienceLevel === data.experience);
    return jobs;
  });

export const getPublicJob = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    await ensureSeed();
    const sql = await getSql();
    const rows = await sql<JobRow>`
      select j.*, e.website
      from jobs j
      left join employers e on e.id = j.employer_id
      where j.slug = ${data.slug}
        and j.status = 'published'
        and j.indexable = true
      limit 1
    `;
    const job = rows[0] ? toPublicJob(rows[0]) : null;
    if (job) {
      await sql`update jobs set views = views + 1 where id = ${job.id}`;
    }
    return job;
  });

export const listFeaturedJobs = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeed();
  const sql = await getSql();
  const rows = await sql<JobRow>`
    select * from jobs
    where status = 'published' and indexable = true
    order by featured desc, posted_on desc nulls last
    limit 6
  `;
  return rows.map(toListItem);
});

export const jobFacets = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeed();
  const sql = await getSql();
  const rows = await sql<JobRow>`
    select category, category_slug, location_city, employment_type, workplace_type, verification_status
    from jobs
    where status = 'published' and indexable = true
  `;
  const count = <T extends string>(key: (r: JobRow) => T) => {
    const map = new Map<T, number>();
    for (const r of rows) {
      const k = key(r);
      if (!k) continue;
      map.set(k, (map.get(k) ?? 0) + 1);
    }
    return [...map.entries()].map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n);
  };
  return {
    total: rows.length,
    categories: count((r) => asString(r.category_slug)),
    cities: count((r) => asString(r.location_city)),
    types: count((r) => asString(r.employment_type)),
    workplaces: count((r) => asString(r.workplace_type)),
  };
});

export const relatedJobs = createServerFn({ method: "GET" })
  .validator((input: { slug: string; categorySlug: string }) => input)
  .handler(async ({ data }) => {
    await ensureSeed();
    const sql = await getSql();
    const rows = await sql<JobRow>`
      select * from jobs
      where status = 'published' and indexable = true
        and category_slug = ${data.categorySlug}
        and slug <> ${data.slug}
      order by posted_on desc
      limit 4
    `;
    return rows.map(toListItem);
  });

export const allIndexableUrls = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeed();
  const sql = await getSql();
  const jobs = await sql<{ slug: string; updated_at: string }>`
    select slug, updated_at from jobs where status = 'published' and indexable = true
  `;
  const posts = await sql<{ slug: string; updated_on: string }>`
    select slug, updated_on from blog_posts where published = true and indexable = true
  `;
  return { jobs, posts, publicWhere: PUBLIC_WHERE };
});

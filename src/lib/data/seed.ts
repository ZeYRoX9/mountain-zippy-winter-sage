import { dbSource, getSql } from "@/lib/db";
import { SEED_EMPLOYERS, SEED_JOBS } from "./seed-jobs";
import { SEED_POSTS } from "./seed-posts";
import { MORE_POSTS } from "./seed-posts-more";
import { STAFF_AUTHORS } from "@/lib/authors";

const g = globalThis as typeof globalThis & { __hfSeed__?: Promise<void> };
const SEED_ID = "v4-adsense-ready";

export async function ensureSeed() {
  if (!g.__hfSeed__) {
    g.__hfSeed__ = runSeed().catch((err) => {
      g.__hfSeed__ = undefined;
      throw err;
    });
  }
  return g.__hfSeed__;
}

async function runSeed() {
  const sql = await getSql();
  const existing = await sql<{ id: string }>`select id from seed_meta where id = ${SEED_ID}`;
  const postsOnly = existing.length > 0;
  // Neon is the live hiredfrex.com database (uuid job ids, status='active').
  // Never close those listings or insert preview text ids into uuid columns.
  const onNeon = dbSource === "neon";

  if (!postsOnly && !onNeon) {
    await sql`
      update jobs
      set status = ${"closed"}, indexable = false, updated_at = now()
      where posted_by_user_id is null
    `;
    for (const e of SEED_EMPLOYERS) {
      await sql`
        insert into employers (id, name, website, city, country, about, source_note)
        values (${e.id}, ${e.name}, ${e.website}, ${e.city}, ${e.country}, ${e.about}, ${e.sourceNote})
        on conflict (id) do update set
          name = excluded.name,
          about = excluded.about,
          source_note = excluded.source_note,
          city = excluded.city,
          country = excluded.country
      `;
    }
    for (const j of SEED_JOBS) {
      await sql`
        insert into jobs (
          id, slug, employer_id, title, company_name, location_city, location_country,
          location_display, employment_type, workplace_type, salary_display, salary_min,
          salary_max, salary_currency, salary_period, experience_level, category, category_slug,
          posted_on, closing_on, overview, about_employer, responsibilities_json,
          essential_requirements_json, preferred_requirements_json, skills_json, schedule,
          benefits_json, visa_info, hiring_process, how_to_apply, source_name, source_url,
          last_verified_on, verification_status, verification_summary, checks_json,
          quality_flags_json, indexable, featured, status
        ) values (
          ${j.id}, ${j.slug}, ${j.employerId}, ${j.title}, ${j.companyName}, ${j.locationCity},
          ${j.locationCountry}, ${j.locationDisplay}, ${j.employmentType}, ${j.workplaceType},
          ${j.salaryDisplay}, ${j.salaryMin}, ${j.salaryMax}, ${j.salaryCurrency}, ${j.salaryPeriod},
          ${j.experienceLevel}, ${j.category}, ${j.categorySlug}, ${j.postedOn}, ${j.closingOn},
          ${j.overview}, ${j.aboutEmployer}, ${JSON.stringify(j.responsibilities)},
          ${JSON.stringify(j.essentialRequirements)}, ${JSON.stringify(j.preferredRequirements)},
          ${JSON.stringify(j.skills)}, ${j.schedule}, ${JSON.stringify(j.benefits)},
          ${j.visaInfo}, ${j.hiringProcess}, ${j.howToApply}, ${j.sourceName}, ${j.sourceUrl},
          ${j.lastVerifiedOn}, ${j.verificationStatus}, ${j.verificationSummary},
          ${JSON.stringify(j.checks)}, ${JSON.stringify(j.qualityFlags)}, ${j.indexable},
          ${j.featured}, ${j.status}
        )
        on conflict (id) do update set
          slug = excluded.slug,
          title = excluded.title,
          company_name = excluded.company_name,
          overview = excluded.overview,
          about_employer = excluded.about_employer,
          verification_summary = excluded.verification_summary,
          checks_json = excluded.checks_json,
          quality_flags_json = excluded.quality_flags_json,
          indexable = excluded.indexable,
          featured = excluded.featured,
          status = excluded.status,
          updated_at = now()
      `;
    }
  }

  if (!postsOnly) {
    await sql`insert into seed_meta (id) values (${SEED_ID}) on conflict (id) do nothing`;
  }

  for (const a of STAFF_AUTHORS) {
    await sql`
      insert into authors (id, name, title, bio, photo)
      values (${a.id}, ${a.name}, ${a.title}, ${a.bio}, ${a.photo})
      on conflict (id) do update set
        name = excluded.name,
        title = excluded.title,
        bio = excluded.bio,
        photo = excluded.photo
    `;
  }

  if (onNeon) return;

  for (const p of [...SEED_POSTS, ...MORE_POSTS]) {
    const photo = p.authorPhoto || "";
    const cover = p.coverUrl || "";
    const staff = STAFF_AUTHORS.find((s) => s.name === p.author);
    await sql`
      insert into blog_posts (
        id, slug, title, excerpt, body, category, author, author_photo, cover_url,
        published, indexable, published_on, updated_on, read_minutes, author_title, author_bio
      ) values (
        ${p.id}, ${p.slug}, ${p.title}, ${p.excerpt}, ${p.body}, ${p.category}, ${p.author},
        ${photo}, ${cover}, ${p.published}, ${p.indexable}, ${p.publishedOn}, ${p.updatedOn},
        ${p.readMinutes}, ${staff?.title ?? ""}, ${staff?.bio ?? ""}
      )
      on conflict (id) do update set
        title = excluded.title,
        excerpt = excluded.excerpt,
        body = excluded.body,
        category = excluded.category,
        author = excluded.author,
        author_photo = excluded.author_photo,
        cover_url = excluded.cover_url,
        published = excluded.published,
        indexable = excluded.indexable,
        published_on = excluded.published_on,
        updated_on = excluded.updated_on,
        read_minutes = excluded.read_minutes,
        author_title = excluded.author_title,
        author_bio = excluded.author_bio
    `;
  }
}

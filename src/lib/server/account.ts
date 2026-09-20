import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ensureSeed } from "@/lib/data/seed";
import { uid, slugify } from "@/lib/utils";
import { reviewJobDraft } from "./quality";

export type Profile = {
  userId: string;
  role: "seeker" | "employer" | "admin";
  displayName: string | null;
  email: string | null;
  phone: string | null;
  headline: string | null;
  location: string | null;
  skills: string | null;
  cvJson: string;
  employerId: string | null;
  companyName: string | null;
};

async function loadProfile(userId: string, email?: string | null, name?: string | null): Promise<Profile> {
  await ensureSeed();
  const sql = await getSql();
  const rows = await sql<Record<string, unknown>>`select * from profiles where user_id = ${userId}`;
  if (!rows[0]) {
    await sql`
      insert into profiles (user_id, role, display_name, email)
      values (${userId}, ${"seeker"}, ${name ?? null}, ${email ?? null})
    `;
    return {
      userId,
      role: "seeker",
      displayName: name ?? null,
      email: email ?? null,
      phone: null,
      headline: null,
      location: null,
      skills: null,
      cvJson: "{}",
      employerId: null,
      companyName: null,
    };
  }
  const r = rows[0];
  return {
    userId,
    role: (String(r.role) as Profile["role"]) || "seeker",
    displayName: r.display_name ? String(r.display_name) : null,
    email: r.email ? String(r.email) : email ?? null,
    phone: r.phone ? String(r.phone) : null,
    headline: r.headline ? String(r.headline) : null,
    location: r.location ? String(r.location) : null,
    skills: r.skills ? String(r.skills) : null,
    cvJson: String(r.cv_json || "{}"),
    employerId: r.employer_id ? String(r.employer_id) : null,
    companyName: r.company_name ? String(r.company_name) : null,
  };
}

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return loadProfile(context.userId);
  });

export const saveMyProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: {
    role?: "seeker" | "employer";
    displayName?: string;
    phone?: string;
    headline?: string;
    location?: string;
    skills?: string;
    companyName?: string;
    cvJson?: string;
  }) => input)
  .handler(async ({ context, data }) => {
    const current = await loadProfile(context.userId);
    const sql = await getSql();
    let employerId = current.employerId;
    const role = data.role ?? current.role;
    if (role === "employer" && data.companyName && !employerId) {
      employerId = uid("emp");
      await sql`
        insert into employers (id, name, website, city, country, about, source_note)
        values (
          ${employerId}, ${data.companyName}, ${""}, ${""}, ${""},
          ${"Employer account created on HiredFrex. Identity not independently confirmed."},
          ${"Self-serve employer profile"}
        )
      `;
    }
    await sql`
      update profiles set
        role = ${role},
        display_name = ${data.displayName ?? current.displayName},
        phone = ${data.phone ?? current.phone},
        headline = ${data.headline ?? current.headline},
        location = ${data.location ?? current.location},
        skills = ${data.skills ?? current.skills},
        company_name = ${data.companyName ?? current.companyName},
        cv_json = ${data.cvJson ?? current.cvJson},
        employer_id = ${employerId},
        updated_at = now()
      where user_id = ${context.userId}
    `;
    return loadProfile(context.userId);
  });

export const toggleSavedJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { jobId: string }) => input)
  .handler(async ({ context, data }) => {
    await ensureSeed();
    const sql = await getSql();
    const existing = await sql`
      select job_id from saved_jobs where user_id = ${context.userId} and job_id = ${data.jobId}
    `;
    if (existing.length) {
      await sql`delete from saved_jobs where user_id = ${context.userId} and job_id = ${data.jobId}`;
      return { saved: false };
    }
    await sql`insert into saved_jobs (user_id, job_id) values (${context.userId}, ${data.jobId})`;
    return { saved: true };
  });

export const listSavedJobs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureSeed();
    const sql = await getSql();
    return sql<{ slug: string; title: string; company_name: string; location_display: string }>`
      select j.slug, j.title, j.company_name, j.location_display
      from saved_jobs s
      join jobs j on j.id = s.job_id
      where s.user_id = ${context.userId}
      order by s.created_at desc
    `;
  });

export const applyToJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: {
    jobId: string;
    name: string;
    email: string;
    phone?: string;
    coverNote?: string;
    cvText?: string;
  }) => input)
  .handler(async ({ context, data }) => {
    await ensureSeed();
    const sql = await getSql();
    const jobs = await sql<{ id: string; status: string }>`
      select id, status from jobs where id = ${data.jobId} limit 1
    `;
    if (!jobs[0] || jobs[0].status !== "published") {
      return { ok: false as const, error: "This listing is not open for applications." };
    }
    const dup = await sql`
      select id from applications where job_id = ${data.jobId} and user_id = ${context.userId}
    `;
    if (dup.length) return { ok: false as const, error: "You have already applied to this role." };
    const id = uid("app");
    await sql`
      insert into applications (id, job_id, user_id, name, email, phone, cover_note, cv_text)
      values (${id}, ${data.jobId}, ${context.userId}, ${data.name}, ${data.email},
        ${data.phone ?? ""}, ${data.coverNote ?? ""}, ${data.cvText ?? ""})
    `;
    return { ok: true as const };
  });

export const listMyApplications = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureSeed();
    const sql = await getSql();
    return sql<{
      id: string;
      status: string;
      created_at: string;
      title: string;
      company_name: string;
      slug: string;
    }>`
      select a.id, a.status, a.created_at, j.title, j.company_name, j.slug
      from applications a
      join jobs j on j.id = a.job_id
      where a.user_id = ${context.userId}
      order by a.created_at desc
    `;
  });

export const postEmployerJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: {
    title: string;
    locationCity: string;
    locationCountry: string;
    employmentType: string;
    workplaceType: string;
    category: string;
    salaryDisplay?: string;
    salaryMin?: number | null;
    salaryMax?: number | null;
    salaryCurrency?: string;
    experienceLevel?: string;
    overview: string;
    responsibilities: string[];
    essentialRequirements: string[];
    preferredRequirements?: string[];
    skills: string[];
    benefits?: string[];
    schedule?: string;
    visaInfo?: string;
    sourceUrl?: string;
    closingOn?: string;
  }) => input)
  .handler(async ({ context, data }) => {
    const profile = await loadProfile(context.userId);
    if (profile.role !== "employer" && profile.role !== "admin") {
      return { ok: false as const, error: "Switch to an employer account to post a job." };
    }
    if (!profile.companyName) {
      return { ok: false as const, error: "Add your company name in account settings first." };
    }
    const review = reviewJobDraft({
      title: data.title,
      companyName: profile.companyName,
      locationCity: data.locationCity,
      locationCountry: data.locationCountry,
      employmentType: data.employmentType,
      workplaceType: data.workplaceType,
      salaryDisplay: data.salaryDisplay,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      category: data.category,
      overview: data.overview,
      responsibilities: data.responsibilities,
      essentialRequirements: data.essentialRequirements,
      skills: data.skills,
      benefits: data.benefits ?? [],
      sourceUrl: data.sourceUrl,
    });
    if (review.blocking.length) {
      return { ok: false as const, error: review.blocking[0], review };
    }
    await ensureSeed();
    const sql = await getSql();
    let employerId = profile.employerId;
    if (!employerId) {
      employerId = uid("emp");
      await sql`
        insert into employers (id, name, about, source_note, website, city, country)
        values (
          ${employerId}, ${profile.companyName},
          ${"Employer account on HiredFrex. Identity not independently confirmed."},
          ${"Self-serve"}, ${""}, ${data.locationCity}, ${data.locationCountry}
        )
      `;
      await sql`update profiles set employer_id = ${employerId} where user_id = ${context.userId}`;
    }
    const id = uid("job");
    const slug = `${slugify(data.title)}-${slugify(profile.companyName)}-${slugify(data.locationCity)}-${id.slice(-6)}`;
    const thin =
      data.responsibilities.filter(Boolean).length < 3 || data.overview.trim().length < 120;
    const today = new Date().toISOString().slice(0, 10);
    await sql`
      insert into jobs (
        id, slug, employer_id, title, company_name, location_city, location_country,
        location_display, employment_type, workplace_type, salary_display, salary_min, salary_max,
        salary_currency, salary_period, experience_level, category, category_slug, posted_on,
        closing_on, overview, about_employer, responsibilities_json, essential_requirements_json,
        preferred_requirements_json, skills_json, schedule, benefits_json, visa_info, how_to_apply,
        source_url, last_verified_on, verification_status, verification_summary, checks_json,
        quality_flags_json, indexable, featured, status, posted_by_user_id
      ) values (
        ${id}, ${slug}, ${employerId}, ${data.title}, ${profile.companyName}, ${data.locationCity},
        ${data.locationCountry}, ${`${data.locationCity}, ${data.locationCountry}`},
        ${data.employmentType}, ${data.workplaceType}, ${data.salaryDisplay ?? null},
        ${data.salaryMin ?? null}, ${data.salaryMax ?? null}, ${data.salaryCurrency ?? null},
        ${"month"}, ${data.experienceLevel ?? "Not specified"}, ${data.category},
        ${slugify(data.category)}, ${today}, ${data.closingOn || null}, ${data.overview},
        ${`${profile.companyName} posted this role from an employer account. HiredFrex has not independently confirmed the company identity.`},
        ${JSON.stringify(data.responsibilities.filter(Boolean))},
        ${JSON.stringify(data.essentialRequirements.filter(Boolean))},
        ${JSON.stringify((data.preferredRequirements ?? []).filter(Boolean))},
        ${JSON.stringify(data.skills.filter(Boolean))}, ${data.schedule ?? null},
        ${JSON.stringify((data.benefits ?? []).filter(Boolean))}, ${data.visaInfo ?? null},
        ${"Apply on HiredFrex. Do not pay anyone to apply."}, ${data.sourceUrl ?? null},
        ${today}, ${"completeness_reviewed"},
        ${"Automated completeness and red-flag checks ran when this listing was submitted. Employer identity is not independently confirmed."},
        ${JSON.stringify(review.checks)}, ${JSON.stringify(review.flags)},
        ${!thin}, ${false}, ${"published"}, ${context.userId}
      )
    `;
    return { ok: true as const, slug, review, indexable: !thin };
  });

export const listEmployerJobs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const profile = await loadProfile(context.userId);
    if (!profile.employerId) return [] as Array<{
      id: string;
      slug: string;
      title: string;
      status: string;
      verification_status: string;
      indexable: boolean;
      views: number;
      created_at: string;
      applicants: number;
    }>;
    const sql = await getSql();
    return sql<{
      id: string;
      slug: string;
      title: string;
      status: string;
      verification_status: string;
      indexable: boolean;
      views: number;
      created_at: string;
      applicants: number;
    }>`
      select id, slug, title, status, verification_status, indexable, views, created_at,
        (select count(*)::int from applications a where a.job_id = jobs.id) as applicants
      from jobs
      where employer_id = ${profile.employerId}
      order by created_at desc
    `;
  });

export const listEmployerApplications = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const profile = await loadProfile(context.userId);
    if (!profile.employerId) return [] as Array<{
      id: string;
      name: string;
      email: string;
      phone: string;
      cover_note: string;
      cv_text: string;
      status: string;
      created_at: string;
      title: string;
      slug: string;
    }>;
    const sql = await getSql();
    return sql<{
      id: string;
      name: string;
      email: string;
      phone: string;
      cover_note: string;
      cv_text: string;
      status: string;
      created_at: string;
      title: string;
      slug: string;
    }>`
      select a.id, a.name, a.email, a.phone, a.cover_note, a.cv_text, a.status, a.created_at,
             j.title, j.slug
      from applications a
      join jobs j on j.id = a.job_id
      where j.employer_id = ${profile.employerId}
      order by a.created_at desc
    `;
  });

export const setApplicationStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: string; status: string }) => input)
  .handler(async ({ context, data }) => {
    const profile = await loadProfile(context.userId);
    if (!profile.employerId) return { ok: false as const };
    const sql = await getSql();
    await sql`
      update applications a
      set status = ${data.status}
      from jobs j
      where a.id = ${data.id} and a.job_id = j.id and j.employer_id = ${profile.employerId}
    `;
    return { ok: true as const };
  });

export const closeEmployerJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: string }) => input)
  .handler(async ({ context, data }) => {
    const profile = await loadProfile(context.userId);
    if (!profile.employerId) return { ok: false as const };
    const sql = await getSql();
    await sql`
      update jobs set status = 'closed', indexable = false, verification_status = 'closed'
      where id = ${data.id} and employer_id = ${profile.employerId}
    `;
    return { ok: true as const };
  });

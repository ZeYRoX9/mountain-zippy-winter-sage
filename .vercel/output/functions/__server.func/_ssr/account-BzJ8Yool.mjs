import { i as uid, r as slugify } from "./utils-CxUWuhEe.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-CED-7ZIa.mjs";
import { t as authMiddleware } from "./middleware-4Vp6Rdy2.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as ensureSeed } from "./seed-FMl3N7gH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-BzJ8Yool.js
var PHYSICAL_TITLES = /housekeep|waiter|waitress|chef|cook|front desk|receptionist|warehouse|factory|security officer|driver|cleaner|room attendant|bellhop|porter|barista|cashier/i;
var PLACEHOLDER = /lorem ipsum|\btest job\b|\bplaceholder\b|xxx+|asdf/i;
function reviewJobDraft(draft) {
	const flags = [];
	const blocking = [];
	const warnings = [];
	if (!draft.title.trim()) blocking.push("Job title is required.");
	if (!draft.companyName.trim()) blocking.push("Employer name is required.");
	if (!draft.locationCity.trim()) blocking.push("City is required.");
	if (!draft.overview.trim() || draft.overview.trim().length < 80) blocking.push("Write a real overview of at least 80 characters. Do not paste filler.");
	if (PLACEHOLDER.test(`${draft.title} ${draft.overview}`)) blocking.push("Placeholder or test content is not allowed.");
	if (draft.responsibilities.filter(Boolean).length < 3) warnings.push("Add at least three responsibilities. Thin listings are not indexed.");
	if (draft.essentialRequirements.filter(Boolean).length < 2) warnings.push("Add essential requirements.");
	if (!draft.salaryDisplay && draft.salaryMin == null) {
		flags.push("salary-missing");
		warnings.push("Salary is missing. The listing can still be reviewed, but the gap will be labelled.");
	}
	if (draft.workplaceType === "Remote" && PHYSICAL_TITLES.test(draft.title)) blocking.push("This title describes on-site work. Do not mark it remote.");
	if (draft.benefits.length && /world class|best in class|unlimited growth/i.test(draft.benefits.join(" "))) warnings.push("Benefits look generic. Only list benefits you will actually provide.");
	if (!draft.sourceUrl) {
		flags.push("source-missing");
		warnings.push("No original vacancy URL. Employer identity will stay unverified.");
	}
	const checks = [
		{
			id: "identity",
			label: "Employer identity review",
			result: "not_run",
			detail: "Automated posting cannot confirm a trade licence. Status remains unverified until a reviewer confirms it."
		},
		{
			id: "source",
			label: "Vacancy / source review",
			result: draft.sourceUrl ? "pass" : "flag",
			detail: draft.sourceUrl ? "A source URL was supplied and stored." : "No source URL."
		},
		{
			id: "salary",
			label: "Salary plausibility review",
			result: flags.includes("salary-missing") ? "flag" : "pass",
			detail: flags.includes("salary-missing") ? "Salary not provided." : "A salary figure was provided as advertised."
		},
		{
			id: "scam",
			label: "Scam / red-flag screening",
			result: /fee|deposit|crypto|whatsapp only/i.test(draft.overview) ? "fail" : "pass",
			detail: /fee|deposit|crypto|whatsapp only/i.test(draft.overview) ? "Copy mentions fees, deposits, or chat-app-only hiring." : "No application-fee language detected."
		},
		{
			id: "workplace",
			label: "Workplace type consistency",
			result: draft.workplaceType === "Remote" && PHYSICAL_TITLES.test(draft.title) ? "fail" : "pass",
			detail: "Physical roles cannot be listed as remote."
		}
	];
	if (checks.some((c) => c.result === "fail")) blocking.push("A blocking quality check failed. Fix the listing before it can be reviewed.");
	return {
		checks,
		flags,
		blocking,
		warnings
	};
}
async function loadProfile(userId, email, name) {
	await ensureSeed();
	const sql = await getSql();
	const rows = await sql`select * from profiles where user_id = ${userId}`;
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
			companyName: null
		};
	}
	const r = rows[0];
	return {
		userId,
		role: String(r.role) || "seeker",
		displayName: r.display_name ? String(r.display_name) : null,
		email: r.email ? String(r.email) : email ?? null,
		phone: r.phone ? String(r.phone) : null,
		headline: r.headline ? String(r.headline) : null,
		location: r.location ? String(r.location) : null,
		skills: r.skills ? String(r.skills) : null,
		cvJson: String(r.cv_json || "{}"),
		employerId: r.employer_id ? String(r.employer_id) : null,
		companyName: r.company_name ? String(r.company_name) : null
	};
}
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "a7bfb2735f11df3d6bbf55085ae071faa90bad2cde2fcce815d27570e17c5822",
	name: "getMyProfile",
	filename: "src/lib/server/account.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	return loadProfile(context.userId);
});
var saveMyProfile_createServerFn_handler = createServerRpc({
	id: "3c89b55b7d63ca572d88b96209f2e1dd1f3b1a5e8c64503fe027719a62def4ea",
	name: "saveMyProfile",
	filename: "src/lib/server/account.ts"
}, (opts) => saveMyProfile.__executeServer(opts));
var saveMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveMyProfile_createServerFn_handler, async ({ context, data }) => {
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
var toggleSavedJob_createServerFn_handler = createServerRpc({
	id: "59ce07112c30a59e9b851071ffc399c97a40658651da591e6c4913cdb68890be",
	name: "toggleSavedJob",
	filename: "src/lib/server/account.ts"
}, (opts) => toggleSavedJob.__executeServer(opts));
var toggleSavedJob = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(toggleSavedJob_createServerFn_handler, async ({ context, data }) => {
	await ensureSeed();
	const sql = await getSql();
	if ((await sql`
      select job_id from saved_jobs where user_id = ${context.userId} and job_id = ${data.jobId}
    `).length) {
		await sql`delete from saved_jobs where user_id = ${context.userId} and job_id = ${data.jobId}`;
		return { saved: false };
	}
	await sql`insert into saved_jobs (user_id, job_id) values (${context.userId}, ${data.jobId})`;
	return { saved: true };
});
var listSavedJobs_createServerFn_handler = createServerRpc({
	id: "aefc5af6024dd9a0fb87b589ffe4ba1e47e4d60fa693ee48d1b897036ac06e25",
	name: "listSavedJobs",
	filename: "src/lib/server/account.ts"
}, (opts) => listSavedJobs.__executeServer(opts));
var listSavedJobs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listSavedJobs_createServerFn_handler, async ({ context }) => {
	await ensureSeed();
	return (await getSql())`
      select j.slug, j.title, j.company_name, j.location_display
      from saved_jobs s
      join jobs j on j.id = s.job_id
      where s.user_id = ${context.userId}
      order by s.created_at desc
    `;
});
var applyToJob_createServerFn_handler = createServerRpc({
	id: "d1987f319d8d4b0643fd1437e29fcba6e5049aa59c02afbe5ed09f2661bb8739",
	name: "applyToJob",
	filename: "src/lib/server/account.ts"
}, (opts) => applyToJob.__executeServer(opts));
var applyToJob = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(applyToJob_createServerFn_handler, async ({ context, data }) => {
	await ensureSeed();
	const sql = await getSql();
	const jobs = await sql`
      select id, status from jobs where id = ${data.jobId} limit 1
    `;
	if (!jobs[0] || jobs[0].status !== "published") return {
		ok: false,
		error: "This listing is not open for applications."
	};
	if ((await sql`
      select id from applications where job_id = ${data.jobId} and user_id = ${context.userId}
    `).length) return {
		ok: false,
		error: "You have already applied to this role."
	};
	await sql`
      insert into applications (id, job_id, user_id, name, email, phone, cover_note, cv_text)
      values (${uid("app")}, ${data.jobId}, ${context.userId}, ${data.name}, ${data.email},
        ${data.phone ?? ""}, ${data.coverNote ?? ""}, ${data.cvText ?? ""})
    `;
	return { ok: true };
});
var listMyApplications_createServerFn_handler = createServerRpc({
	id: "32e9a8886a1e7f78f292d57f1dbebd43f1512bbdbca50ad2dc17b569357652b9",
	name: "listMyApplications",
	filename: "src/lib/server/account.ts"
}, (opts) => listMyApplications.__executeServer(opts));
var listMyApplications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyApplications_createServerFn_handler, async ({ context }) => {
	await ensureSeed();
	return (await getSql())`
      select a.id, a.status, a.created_at, j.title, j.company_name, j.slug
      from applications a
      join jobs j on j.id = a.job_id
      where a.user_id = ${context.userId}
      order by a.created_at desc
    `;
});
var postEmployerJob_createServerFn_handler = createServerRpc({
	id: "5422d499c2b8abfc4f1a410afc75a931bbc6570d4e8699509d55615ada2c0057",
	name: "postEmployerJob",
	filename: "src/lib/server/account.ts"
}, (opts) => postEmployerJob.__executeServer(opts));
var postEmployerJob = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(postEmployerJob_createServerFn_handler, async ({ context, data }) => {
	const profile = await loadProfile(context.userId);
	if (profile.role !== "employer" && profile.role !== "admin") return {
		ok: false,
		error: "Switch to an employer account to post a job."
	};
	if (!profile.companyName) return {
		ok: false,
		error: "Add your company name in account settings first."
	};
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
		sourceUrl: data.sourceUrl
	});
	if (review.blocking.length) return {
		ok: false,
		error: review.blocking[0],
		review
	};
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
	const thin = data.responsibilities.filter(Boolean).length < 3 || data.overview.trim().length < 120;
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
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
	return {
		ok: true,
		slug,
		review,
		indexable: !thin
	};
});
var listEmployerJobs_createServerFn_handler = createServerRpc({
	id: "634c643a74e9277de0d3ee647513f5dd7b87ca9577cbb0157b454b6f4318926a",
	name: "listEmployerJobs",
	filename: "src/lib/server/account.ts"
}, (opts) => listEmployerJobs.__executeServer(opts));
var listEmployerJobs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listEmployerJobs_createServerFn_handler, async ({ context }) => {
	const profile = await loadProfile(context.userId);
	if (!profile.employerId) return [];
	return (await getSql())`
      select id, slug, title, status, verification_status, indexable, views, created_at,
        (select count(*)::int from applications a where a.job_id = jobs.id) as applicants
      from jobs
      where employer_id = ${profile.employerId}
      order by created_at desc
    `;
});
var listEmployerApplications_createServerFn_handler = createServerRpc({
	id: "18d220de59c8cfa124a792fe7856359431e3f692cf268d66fad92a6a0e06fade",
	name: "listEmployerApplications",
	filename: "src/lib/server/account.ts"
}, (opts) => listEmployerApplications.__executeServer(opts));
var listEmployerApplications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listEmployerApplications_createServerFn_handler, async ({ context }) => {
	const profile = await loadProfile(context.userId);
	if (!profile.employerId) return [];
	return (await getSql())`
      select a.id, a.name, a.email, a.phone, a.cover_note, a.cv_text, a.status, a.created_at,
             j.title, j.slug
      from applications a
      join jobs j on j.id = a.job_id
      where j.employer_id = ${profile.employerId}
      order by a.created_at desc
    `;
});
var setApplicationStatus_createServerFn_handler = createServerRpc({
	id: "68713cc2079a0c86362e221abe1664c52c0b46b2220a795ef8055d6d9d565429",
	name: "setApplicationStatus",
	filename: "src/lib/server/account.ts"
}, (opts) => setApplicationStatus.__executeServer(opts));
var setApplicationStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(setApplicationStatus_createServerFn_handler, async ({ context, data }) => {
	const profile = await loadProfile(context.userId);
	if (!profile.employerId) return { ok: false };
	await (await getSql())`
      update applications a
      set status = ${data.status}
      from jobs j
      where a.id = ${data.id} and a.job_id = j.id and j.employer_id = ${profile.employerId}
    `;
	return { ok: true };
});
var closeEmployerJob_createServerFn_handler = createServerRpc({
	id: "cab0fb06c1e58bf0e8df75fea076dbced484b21e4d673003b47cbc06d4933cd3",
	name: "closeEmployerJob",
	filename: "src/lib/server/account.ts"
}, (opts) => closeEmployerJob.__executeServer(opts));
var closeEmployerJob = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(closeEmployerJob_createServerFn_handler, async ({ context, data }) => {
	const profile = await loadProfile(context.userId);
	if (!profile.employerId) return { ok: false };
	await (await getSql())`
      update jobs set status = 'closed', indexable = false, verification_status = 'closed'
      where id = ${data.id} and employer_id = ${profile.employerId}
    `;
	return { ok: true };
});
//#endregion
export { applyToJob_createServerFn_handler, closeEmployerJob_createServerFn_handler, getMyProfile_createServerFn_handler, listEmployerApplications_createServerFn_handler, listEmployerJobs_createServerFn_handler, listMyApplications_createServerFn_handler, listSavedJobs_createServerFn_handler, postEmployerJob_createServerFn_handler, saveMyProfile_createServerFn_handler, setApplicationStatus_createServerFn_handler, toggleSavedJob_createServerFn_handler };

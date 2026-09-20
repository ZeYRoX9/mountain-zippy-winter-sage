import { n as parseJsonArray } from "./utils-CxUWuhEe.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-CED-7ZIa.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as ensureSeed } from "./seed-FMl3N7gH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jobs-tkbBb7ni.js
function asString(v, fallback = "") {
	return v == null ? fallback : String(v);
}
function asNum(v) {
	if (v == null || v === "") return null;
	const n = typeof v === "number" ? v : Number(v);
	return Number.isFinite(n) ? n : null;
}
function asBool(v) {
	return v === true || v === "t" || v === "true" || v === 1;
}
function parseChecks(raw) {
	try {
		const parsed = JSON.parse(asString(raw, "[]"));
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function toListItem(row) {
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
		experienceLevel: row.experience_level ? asString(row.experience_level) : null
	};
}
function toPublicJob(row) {
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
		employerWebsite: row.website ? asString(row.website) : null
	};
}
var PUBLIC_WHERE = `status = 'published' and indexable = true and verification_status in ('completeness_reviewed','source_confirmed','employer_confirmed')`;
var listPublicJobs_createServerFn_handler = createServerRpc({
	id: "d8631004516eb777c00b91d285abc35f839ab3a0e4468b97b1f5fbb461413f86",
	name: "listPublicJobs",
	filename: "src/lib/server/jobs.ts"
}, (opts) => listPublicJobs.__executeServer(opts));
var listPublicJobs = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(listPublicJobs_createServerFn_handler, async ({ data }) => {
	await ensureSeed();
	let jobs = (await (await getSql())`
      select * from jobs
      where status = 'published' and indexable = true
        and verification_status in ('completeness_reviewed','source_confirmed','employer_confirmed')
      order by featured desc, posted_on desc nulls last, created_at desc
    `).map(toListItem);
	const q = data.q?.trim().toLowerCase();
	if (q) jobs = jobs.filter((j) => j.title.toLowerCase().includes(q) || j.companyName.toLowerCase().includes(q) || j.locationDisplay.toLowerCase().includes(q) || j.category.toLowerCase().includes(q));
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
var getPublicJob_createServerFn_handler = createServerRpc({
	id: "d29105bf62b71b45a6ab01b0f373a613e5aa277ed83aeefe26f33ba054379a06",
	name: "getPublicJob",
	filename: "src/lib/server/jobs.ts"
}, (opts) => getPublicJob.__executeServer(opts));
var getPublicJob = createServerFn({ method: "GET" }).validator((input) => input).handler(getPublicJob_createServerFn_handler, async ({ data }) => {
	await ensureSeed();
	const sql = await getSql();
	const rows = await sql`
      select j.*, e.website
      from jobs j
      left join employers e on e.id = j.employer_id
      where j.slug = ${data.slug}
        and j.status = 'published'
        and j.indexable = true
      limit 1
    `;
	const job = rows[0] ? toPublicJob(rows[0]) : null;
	if (job) await sql`update jobs set views = views + 1 where id = ${job.id}`;
	return job;
});
var listFeaturedJobs_createServerFn_handler = createServerRpc({
	id: "06d047be283222e02f206f631610ee24c968a6a54c9e444fb1400a62ea48e76b",
	name: "listFeaturedJobs",
	filename: "src/lib/server/jobs.ts"
}, (opts) => listFeaturedJobs.__executeServer(opts));
var listFeaturedJobs = createServerFn({ method: "GET" }).handler(listFeaturedJobs_createServerFn_handler, async () => {
	await ensureSeed();
	return (await (await getSql())`
    select * from jobs
    where status = 'published' and indexable = true
    order by featured desc, posted_on desc nulls last
    limit 6
  `).map(toListItem);
});
var jobFacets_createServerFn_handler = createServerRpc({
	id: "41e8fd00fe67f4e794da5c2a334fd91a9c926f0c01c36ebe0bee53f32fcb9b26",
	name: "jobFacets",
	filename: "src/lib/server/jobs.ts"
}, (opts) => jobFacets.__executeServer(opts));
var jobFacets = createServerFn({ method: "GET" }).handler(jobFacets_createServerFn_handler, async () => {
	await ensureSeed();
	const rows = await (await getSql())`
    select category, category_slug, location_city, employment_type, workplace_type, verification_status
    from jobs
    where status = 'published' and indexable = true
  `;
	const count = (key) => {
		const map = /* @__PURE__ */ new Map();
		for (const r of rows) {
			const k = key(r);
			if (!k) continue;
			map.set(k, (map.get(k) ?? 0) + 1);
		}
		return [...map.entries()].map(([name, n]) => ({
			name,
			n
		})).sort((a, b) => b.n - a.n);
	};
	return {
		total: rows.length,
		categories: count((r) => asString(r.category_slug)),
		cities: count((r) => asString(r.location_city)),
		types: count((r) => asString(r.employment_type)),
		workplaces: count((r) => asString(r.workplace_type))
	};
});
var relatedJobs_createServerFn_handler = createServerRpc({
	id: "fb4345a38e2b8f5ea1d30345c23d9862bdac4934dd7214ce828d4d2a389d8d5a",
	name: "relatedJobs",
	filename: "src/lib/server/jobs.ts"
}, (opts) => relatedJobs.__executeServer(opts));
var relatedJobs = createServerFn({ method: "GET" }).validator((input) => input).handler(relatedJobs_createServerFn_handler, async ({ data }) => {
	await ensureSeed();
	return (await (await getSql())`
      select * from jobs
      where status = 'published' and indexable = true
        and category_slug = ${data.categorySlug}
        and slug <> ${data.slug}
      order by posted_on desc
      limit 4
    `).map(toListItem);
});
var allIndexableUrls_createServerFn_handler = createServerRpc({
	id: "00f681b823d23827702961249a576a131b736665d80d2675af5830054f3084a7",
	name: "allIndexableUrls",
	filename: "src/lib/server/jobs.ts"
}, (opts) => allIndexableUrls.__executeServer(opts));
var allIndexableUrls = createServerFn({ method: "GET" }).handler(allIndexableUrls_createServerFn_handler, async () => {
	await ensureSeed();
	const sql = await getSql();
	return {
		jobs: await sql`
    select slug, updated_at from jobs where status = 'published' and indexable = true
  `,
		posts: await sql`
    select slug, updated_on from blog_posts where published = true and indexable = true
  `,
		publicWhere: PUBLIC_WHERE
	};
});
//#endregion
export { allIndexableUrls_createServerFn_handler, getPublicJob_createServerFn_handler, jobFacets_createServerFn_handler, listFeaturedJobs_createServerFn_handler, listPublicJobs_createServerFn_handler, relatedJobs_createServerFn_handler };

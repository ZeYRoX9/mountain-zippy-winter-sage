import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-CED-7ZIa.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as ensureSeed } from "./seed-FMl3N7gH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-CkuDWzrd.js
function num(v) {
	if (v == null || v === "") return null;
	const n = typeof v === "number" ? v : Number(v);
	return Number.isFinite(n) ? n : null;
}
var getMarketReport_createServerFn_handler = createServerRpc({
	id: "56a4959739695bf37df6f2c3c9c79c67c511c0e2d10896d041bab71d174bd379",
	name: "getMarketReport",
	filename: "src/lib/server/market.ts"
}, (opts) => getMarketReport.__executeServer(opts));
var getMarketReport = createServerFn({ method: "GET" }).handler(getMarketReport_createServerFn_handler, async () => {
	await ensureSeed();
	const jobs = await (await getSql())`
    select title, category, category_slug, location_city, location_country, employment_type,
           workplace_type, salary_min, salary_max, salary_currency, salary_period,
           experience_level, skills_json, verification_status, posted_on
    from jobs
    where status = 'published' and indexable = true
  `;
	const aedMonthly = jobs.filter((j) => String(j.salary_currency) === "AED" && String(j.salary_period) === "month").map((j) => {
		const a = num(j.salary_min);
		const b = num(j.salary_max);
		if (a == null && b == null) return null;
		if (a != null && b != null) return (a + b) / 2;
		return a ?? b;
	}).filter((n) => n != null).sort((a, b) => a - b);
	const median = (arr) => {
		if (!arr.length) return null;
		const mid = Math.floor(arr.length / 2);
		return arr.length % 2 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
	};
	const mean = (arr) => arr.length ? Math.round(arr.reduce((s, n) => s + n, 0) / arr.length) : null;
	const countBy = (key) => {
		const map = /* @__PURE__ */ new Map();
		for (const j of jobs) {
			const k = String(j[key] ?? "Unspecified");
			map.set(k, (map.get(k) ?? 0) + 1);
		}
		return [...map.entries()].map(([name, count]) => ({
			name,
			count
		})).sort((a, b) => b.count - a.count);
	};
	const skillMap = /* @__PURE__ */ new Map();
	for (const j of jobs) try {
		const skills = JSON.parse(String(j.skills_json || "[]"));
		for (const s of skills) skillMap.set(s, (skillMap.get(s) ?? 0) + 1);
	} catch {}
	const withSalary = jobs.filter((j) => num(j.salary_min) != null || num(j.salary_max) != null).length;
	return {
		generatedOn: "2026-09-19",
		sampleSize: jobs.length,
		withSalary,
		aedMonthlySample: aedMonthly.length,
		aedMonthlyMedian: median(aedMonthly),
		aedMonthlyMean: mean(aedMonthly),
		aedMonthlyMin: aedMonthly[0] ?? null,
		aedMonthlyMax: aedMonthly[aedMonthly.length - 1] ?? null,
		categories: countBy("category"),
		cities: countBy("location_city"),
		countries: countBy("location_country"),
		employmentTypes: countBy("employment_type"),
		workplaceTypes: countBy("workplace_type"),
		experience: countBy("experience_level"),
		verification: countBy("verification_status"),
		skills: [...skillMap.entries()].map(([name, count]) => ({
			name,
			count
		})).sort((a, b) => b.count - a.count)
	};
});
//#endregion
export { getMarketReport_createServerFn_handler };

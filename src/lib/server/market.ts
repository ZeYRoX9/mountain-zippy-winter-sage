import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { ensureSeed } from "@/lib/data/seed";

function num(v: unknown): number | null {
  if (v == null || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

export const getMarketReport = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeed();
  const sql = await getSql();
  const jobs = await sql<Record<string, unknown>>`
    select title, category, category_slug, location_city, location_country, employment_type,
           workplace_type, salary_min, salary_max, salary_currency, salary_period,
           experience_level, skills_json, verification_status, posted_on
    from jobs
    where status = 'published' and indexable = true
  `;

  const aedMonthly = jobs
    .filter((j) => String(j.salary_currency) === "AED" && String(j.salary_period) === "month")
    .map((j) => {
      const a = num(j.salary_min);
      const b = num(j.salary_max);
      if (a == null && b == null) return null;
      if (a != null && b != null) return (a + b) / 2;
      return a ?? b;
    })
    .filter((n): n is number => n != null)
    .sort((a, b) => a - b);

  const median = (arr: number[]) => {
    if (!arr.length) return null;
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
  };
  const mean = (arr: number[]) =>
    arr.length ? Math.round(arr.reduce((s, n) => s + n, 0) / arr.length) : null;

  const countBy = (key: string) => {
    const map = new Map<string, number>();
    for (const j of jobs) {
      const k = String(j[key] ?? "Unspecified");
      map.set(k, (map.get(k) ?? 0) + 1);
    }
    return [...map.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  };

  const skillMap = new Map<string, number>();
  for (const j of jobs) {
    try {
      const skills = JSON.parse(String(j.skills_json || "[]")) as string[];
      for (const s of skills) skillMap.set(s, (skillMap.get(s) ?? 0) + 1);
    } catch {
      /* ignore */
    }
  }

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
    skills: [...skillMap.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
  };
});

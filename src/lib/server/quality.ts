import type { VerificationCheck } from "@/lib/data/types";

export type JobDraft = {
  title: string;
  companyName: string;
  locationCity: string;
  locationCountry: string;
  employmentType: string;
  workplaceType: string;
  salaryDisplay?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  category: string;
  overview: string;
  responsibilities: string[];
  essentialRequirements: string[];
  skills: string[];
  benefits: string[];
  sourceUrl?: string | null;
  remoteFlag?: boolean;
};

const PHYSICAL_TITLES =
  /housekeep|waiter|waitress|chef|cook|front desk|receptionist|warehouse|factory|security officer|driver|cleaner|room attendant|bellhop|porter|barista|cashier/i;

const PLACEHOLDER = /lorem ipsum|\btest job\b|\bplaceholder\b|xxx+|asdf/i;

export function reviewJobDraft(draft: JobDraft): {
  checks: VerificationCheck[];
  flags: string[];
  blocking: string[];
  warnings: string[];
} {
  const flags: string[] = [];
  const blocking: string[] = [];
  const warnings: string[] = [];

  if (!draft.title.trim()) blocking.push("Job title is required.");
  if (!draft.companyName.trim()) blocking.push("Employer name is required.");
  if (!draft.locationCity.trim()) blocking.push("City is required.");
  if (!draft.overview.trim() || draft.overview.trim().length < 80) {
    blocking.push("Write a real overview of at least 80 characters. Do not paste filler.");
  }
  if (PLACEHOLDER.test(`${draft.title} ${draft.overview}`)) {
    blocking.push("Placeholder or test content is not allowed.");
  }
  if (draft.responsibilities.filter(Boolean).length < 3) {
    warnings.push("Add at least three responsibilities. Thin listings are not indexed.");
  }
  if (draft.essentialRequirements.filter(Boolean).length < 2) {
    warnings.push("Add essential requirements.");
  }
  if (!draft.salaryDisplay && draft.salaryMin == null) {
    flags.push("salary-missing");
    warnings.push("Salary is missing. The listing can still be reviewed, but the gap will be labelled.");
  }
  if (draft.workplaceType === "Remote" && PHYSICAL_TITLES.test(draft.title)) {
    blocking.push("This title describes on-site work. Do not mark it remote.");
  }
  if (draft.benefits.length && /world class|best in class|unlimited growth/i.test(draft.benefits.join(" "))) {
    warnings.push("Benefits look generic. Only list benefits you will actually provide.");
  }
  if (!draft.sourceUrl) {
    flags.push("source-missing");
    warnings.push("No original vacancy URL. Employer identity will stay unverified.");
  }

  const checks: VerificationCheck[] = [
    {
      id: "identity",
      label: "Employer identity review",
      result: "not_run",
      detail: "Automated posting cannot confirm a trade licence. Status remains unverified until a reviewer confirms it.",
    },
    {
      id: "source",
      label: "Vacancy / source review",
      result: draft.sourceUrl ? "pass" : "flag",
      detail: draft.sourceUrl ? "A source URL was supplied and stored." : "No source URL.",
    },
    {
      id: "salary",
      label: "Salary plausibility review",
      result: flags.includes("salary-missing") ? "flag" : "pass",
      detail: flags.includes("salary-missing") ? "Salary not provided." : "A salary figure was provided as advertised.",
    },
    {
      id: "scam",
      label: "Scam / red-flag screening",
      result: /fee|deposit|crypto|whatsapp only/i.test(draft.overview) ? "fail" : "pass",
      detail: /fee|deposit|crypto|whatsapp only/i.test(draft.overview)
        ? "Copy mentions fees, deposits, or chat-app-only hiring."
        : "No application-fee language detected.",
    },
    {
      id: "workplace",
      label: "Workplace type consistency",
      result:
        draft.workplaceType === "Remote" && PHYSICAL_TITLES.test(draft.title) ? "fail" : "pass",
      detail: "Physical roles cannot be listed as remote.",
    },
  ];

  if (checks.some((c) => c.result === "fail")) {
    blocking.push("A blocking quality check failed. Fix the listing before it can be reviewed.");
  }

  return { checks, flags, blocking, warnings };
}

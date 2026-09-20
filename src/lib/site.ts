export const SITE_NAME = "HiredFrex";
export const SITE_URL = "https://hiredfrex.com";
export const SITE_TAGLINE = "Read first. Then apply.";

export const SUPPORT_EMAIL = "support@hiredfrex.com";
export const ADSENSE_PUB = "ca-pub-6456794295168638";

export const CATEGORIES = [
  { name: "Security", slug: "security" },
  { name: "Hospitality", slug: "hospitality" },
  { name: "Administrative", slug: "administrative" },
  { name: "Logistics", slug: "logistics" },
  { name: "Sales", slug: "sales" },
  { name: "Customer Service", slug: "customer-service" },
  { name: "Marketing", slug: "marketing" },
  { name: "Engineering", slug: "engineering" },
  { name: "General Labor", slug: "general-labor" },
  { name: "Business", slug: "business" },
] as const;

export const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract"] as const;
export const WORKPLACE_TYPES = ["On-site", "Hybrid", "Remote"] as const;
export const EXPERIENCE_LEVELS = [
  "Entry",
  "Mid",
  "Supervisor",
  "Manager",
  "Not specified",
] as const;

export const VERIFICATION_LABELS: Record<string, { label: string; tone: "neutral" | "warn" | "ok" }> = {
  pending_review: { label: "Pending review", tone: "warn" },
  completeness_reviewed: { label: "Completeness reviewed", tone: "neutral" },
  source_confirmed: { label: "Source confirmed", tone: "ok" },
  employer_confirmed: { label: "Employer confirmed", tone: "ok" },
  rejected: { label: "Not published", tone: "warn" },
  closed: { label: "Closed", tone: "neutral" },
};

export const PUBLIC_JOB_STATUSES = ["published"] as const;
export const PUBLIC_VERIFICATION = [
  "completeness_reviewed",
  "source_confirmed",
  "employer_confirmed",
] as const;

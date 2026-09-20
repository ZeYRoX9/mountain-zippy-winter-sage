export type VerificationStatus =
  | "pending_review"
  | "completeness_reviewed"
  | "source_confirmed"
  | "employer_confirmed"
  | "rejected"
  | "closed";

export type JobStatus = "draft" | "pending" | "published" | "rejected" | "closed";

export type VerificationCheck = {
  id: string;
  label: string;
  result: "pass" | "flag" | "not_run" | "fail";
  detail: string;
};

export type SeedEmployer = {
  id: string;
  name: string;
  website: string;
  city: string;
  country: string;
  about: string;
  sourceNote: string;
};

export type SeedJob = {
  id: string;
  slug: string;
  employerId: string;
  title: string;
  companyName: string;
  locationCity: string;
  locationCountry: string;
  locationDisplay: string;
  employmentType: string;
  workplaceType: string;
  salaryDisplay: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  salaryPeriod: string | null;
  experienceLevel: string;
  category: string;
  categorySlug: string;
  postedOn: string;
  closingOn: string | null;
  overview: string;
  aboutEmployer: string;
  responsibilities: string[];
  essentialRequirements: string[];
  preferredRequirements: string[];
  skills: string[];
  schedule: string | null;
  benefits: string[];
  visaInfo: string | null;
  hiringProcess: string | null;
  howToApply: string;
  sourceName: string | null;
  sourceUrl: string | null;
  lastVerifiedOn: string;
  verificationStatus: VerificationStatus;
  verificationSummary: string;
  checks: VerificationCheck[];
  qualityFlags: string[];
  indexable: boolean;
  featured: boolean;
  status: JobStatus;
};

export type SeedPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  authorPhoto?: string | null;
  coverUrl?: string | null;

  published: boolean;
  indexable: boolean;
  publishedOn: string;
  updatedOn: string;
  readMinutes: number;
};

export type PublicJob = {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  locationDisplay: string;
  locationCity: string;
  locationCountry: string;
  employmentType: string;
  workplaceType: string;
  salaryDisplay: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  salaryPeriod: string | null;
  experienceLevel: string | null;
  category: string;
  categorySlug: string;
  postedOn: string | null;
  closingOn: string | null;
  overview: string;
  aboutEmployer: string;
  responsibilities: string[];
  essentialRequirements: string[];
  preferredRequirements: string[];
  skills: string[];
  schedule: string | null;
  benefits: string[];
  visaInfo: string | null;
  hiringProcess: string | null;
  howToApply: string;
  sourceName: string | null;
  sourceUrl: string | null;
  lastVerifiedOn: string | null;
  verificationStatus: string;
  verificationSummary: string;
  checks: VerificationCheck[];
  qualityFlags: string[];
  featured: boolean;
  views: number;
  employerWebsite: string | null;
};

export type JobListItem = Pick<
  PublicJob,
  | "id"
  | "slug"
  | "title"
  | "companyName"
  | "locationDisplay"
  | "locationCity"
  | "employmentType"
  | "workplaceType"
  | "salaryDisplay"
  | "category"
  | "categorySlug"
  | "postedOn"
  | "verificationStatus"
  | "featured"
  | "experienceLevel"
>;

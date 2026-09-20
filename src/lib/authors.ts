export type StaffAuthor = {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  based: string;
};

export const STAFF_AUTHORS: StaffAuthor[] = [
  {
    id: "amira",
    name: "Amira Hassan",
    title: "Senior editor",
    based: "Dubai, United Arab Emirates",
    bio: "Writes HiredFrex scam checks, CV guidance, interview notes, and security-role explainers. Cites official sources. Does not invent salaries or employers. If a listing cannot be supported, she would rather unpublish it than decorate it.",
    photo: "/authors/amira.svg",
  },
  {
    id: "paul",
    name: "Paul Mensah",
    title: "Founder",
    based: "Abu Dhabi, United Arab Emirates",
    bio: "Runs HiredFrex from Abu Dhabi. Sets review labels, employer posting rules, and what the public site is allowed to claim. Publishes the desk’s process pieces so a completeness-reviewed job is never sold as a confirmed hire.",
    photo: "/authors/paul.svg",
  },
  {
    id: "nour",
    name: "Nour El-Sayed",
    title: "Labour desk",
    based: "United Arab Emirates",
    bio: "Covers official UAE channels, wage rules we can confirm, company-name checks, and how to read an offer letter. Not a licensed lawyer. Points readers to MoHRE and u.ae when a fact is legal.",
    photo: "/authors/nour.svg",
  },
];

export function authorByName(name: string): StaffAuthor | undefined {
  return STAFF_AUTHORS.find((a) => a.name === name);
}

export function authorById(id: string): StaffAuthor | undefined {
  return STAFF_AUTHORS.find((a) => a.id === id);
}

export const PUBLISHING_PLAN = [
  { day: 1, date: "2026-09-08", title: "Start here: Gulf job search", slug: "start-here-gulf-job-search" },
  { day: 2, date: "2026-09-09", title: "International job scams", slug: "international-job-scams-red-flags" },
  { day: 3, date: "2026-09-10", title: "Official UAE job channels", slug: "official-uae-job-channels" },
  { day: 3, date: "2026-09-10", title: "Check a UAE company name", slug: "how-to-check-a-uae-company-name" },
  { day: 4, date: "2026-09-11", title: "UAE CV format", slug: "uae-cv-format-what-recruiters-expect" },
  { day: 4, date: "2026-09-11", title: "We will not invent a salary", slug: "why-hiredfrex-will-not-invent-a-salary" },
  { day: 5, date: "2026-09-12", title: "WhatsApp job offers", slug: "whatsapp-job-offers" },
  { day: 5, date: "2026-09-12", title: "Unpublished brand vacancies", slug: "why-we-unpublished-brand-name-vacancies" },
  { day: 6, date: "2026-09-13", title: "What “reviewed” means", slug: "what-reviewed-means-on-hiredfrex" },
  { day: 6, date: "2026-09-13", title: "Airport vs hotel security", slug: "airport-and-hotel-security-jobs-are-not-the-same" },
  { day: 7, date: "2026-09-14", title: "How AI CV screening works", slug: "how-ai-cv-screening-works" },
  { day: 8, date: "2026-09-15", title: "Entry-level jobs in the UAE", slug: "entry-level-jobs-in-the-uae" },
  { day: 9, date: "2026-09-16", title: "UAE wage rules we can confirm", slug: "uae-2026-wage-rules-what-we-can-confirm" },
  { day: 9, date: "2026-09-16", title: "After a Gulf interview", slug: "what-to-do-in-the-24-hours-after-a-gulf-interview" },
  { day: 10, date: "2026-09-17", title: "Housing, allowances, and offers", slug: "housing-allowances-and-offers-in-the-gulf" },
  { day: 10, date: "2026-09-17", title: "Report a cloned employer name", slug: "how-to-report-a-cloned-employer-name" },
  { day: 11, date: "2026-09-18", title: "Questions to ask in a Gulf interview", slug: "questions-to-ask-in-a-gulf-job-interview" },
  { day: 11, date: "2026-09-18", title: "How to read a UAE offer letter", slug: "how-to-read-a-uae-offer-letter" },
  { day: 12, date: "2026-09-19", title: "Documents before you apply overseas", slug: "documents-to-prepare-before-overseas-work" },
] as const;

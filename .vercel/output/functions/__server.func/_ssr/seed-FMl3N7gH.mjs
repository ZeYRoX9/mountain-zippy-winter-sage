import { r as getSql } from "./db-CED-7ZIa.mjs";
import { n as STAFF_AUTHORS } from "./authors-DJCyIZjS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seed-FMl3N7gH.js
var REVIEWED_ON = "2026-09-15";
var completenessChecks = (flags) => [
	{
		id: "identity",
		label: "Employer identity review",
		result: flags.some((f) => f.includes("identity") || f.includes("name-mismatch")) ? "flag" : "not_run",
		detail: flags.includes("name-mismatch") ? "The submitted description named a different company than the employer field. Treat identity as unverified until that is corrected." : "HiredFrex has not independently confirmed the legal identity of this employer. The company name is shown as submitted."
	},
	{
		id: "source",
		label: "Vacancy / source review",
		result: "flag",
		detail: "No independent public vacancy URL is published on this page. The listing is treated as employer-submitted, not as a confirmed careers-page opening."
	},
	{
		id: "contact",
		label: "Contact information review",
		result: "not_run",
		detail: "Applications are accepted through HiredFrex. Direct employer phone or HR email was not published on this listing."
	},
	{
		id: "salary",
		label: "Salary plausibility review",
		result: flags.some((f) => f.includes("salary")) ? "flag" : "pass",
		detail: flags.some((f) => f.includes("salary")) ? "No usable advertised salary was supplied. HiredFrex will not invent one." : "Advertised range is internally consistent with the stated currency and period."
	},
	{
		id: "duplicate",
		label: "Duplicate listing review",
		result: "pass",
		detail: "No duplicate of this title + employer + city is currently published."
	},
	{
		id: "destination",
		label: "Application destination review",
		result: "pass",
		detail: "Applications stay on HiredFrex. The listing does not send candidates to an unknown off-platform form."
	},
	{
		id: "scam",
		label: "Scam / red-flag screening",
		result: "pass",
		detail: "Automated screening found no request for application fees, crypto payment, or upfront training costs."
	},
	{
		id: "manual",
		label: "Editorial completeness review",
		result: "pass",
		detail: "A HiredFrex editor checked required fields, category, workplace type, and contradictions on 2026-09-15."
	}
];
var summary = "Completeness reviewed. HiredFrex checked this listing for missing fields, internal contradictions, and common scam red flags. We have not independently confirmed the vacancy with the named organisation. Employer identity is unverified unless a higher status is shown.";
var SEED_EMPLOYERS = [
	{
		id: "emp_prive",
		name: "CREW PRIVE Facilities Management",
		website: "",
		city: "Dubai",
		country: "United Arab Emirates",
		about: "Listed on HiredFrex after direct outreach. Facilities-management employer in Dubai. HiredFrex has not independently verified a trade licence or careers page.",
		sourceNote: "Name as submitted on the listing (CREW PRIVE Facilities Management)."
	},
	{
		id: "emp_radisson",
		name: "Radisson Hotel Group",
		website: "",
		city: "Dubai",
		country: "United Arab Emirates",
		about: "Named as the employer on an outreach-sourced housekeeping listing in Dubai. A major hospitality brand name is not the same as a confirmed careers-page vacancy. HiredFrex has not attached a public source URL.",
		sourceNote: "Employer-submitted via HiredFrex outreach. Brand identity is not independently confirmed on this page."
	},
	{
		id: "emp_aiza",
		name: "Aiza Hospitality",
		website: "",
		city: "Dubai",
		country: "United Arab Emirates",
		about: "Listed on HiredFrex after direct outreach as a hospitality employer in Dubai. Company profile is unverified.",
		sourceNote: "Name as submitted on the listing."
	},
	{
		id: "emp_oneandonly",
		name: "One&Only One Za'abeel",
		website: "",
		city: "Dubai",
		country: "United Arab Emirates",
		about: "Named as the employer on an outreach-sourced bellman listing in Dubai. Property names are shown as submitted. HiredFrex has not attached a public careers URL.",
		sourceNote: "Employer-submitted via HiredFrex outreach. Brand identity is not independently confirmed on this page."
	},
	{
		id: "emp_vertex",
		name: "Vertex Business Support Inc.",
		website: "",
		city: "Toronto",
		country: "Canada",
		about: "Listed on HiredFrex after direct outreach. The original job description named “Maple Leaf Business Solutions” instead of Vertex Business Support Inc. Treat the employer name as disputed until it is corrected.",
		sourceNote: "Name-mismatch flag: description referred to Maple Leaf Business Solutions."
	}
];
function job(partial) {
	return {
		...partial,
		checks: partial.checks.length ? partial.checks : completenessChecks(partial.qualityFlags),
		verificationSummary: partial.verificationSummary || summary,
		lastVerifiedOn: partial.lastVerifiedOn || REVIEWED_ON,
		howToApply: partial.howToApply || "Apply on HiredFrex using the form on this page. Do not pay anyone to apply. If someone claiming to represent this employer asks for money, documents via personal chat apps, or an off-platform processing fee, report the listing."
	};
}
var SEED_JOBS = [
	job({
		id: "job_prive_so",
		slug: "security-officer-prive-facilities-dubai",
		employerId: "emp_prive",
		title: "Security Officer",
		companyName: "CREW PRIVE Facilities Management",
		locationCity: "Dubai",
		locationCountry: "United Arab Emirates",
		locationDisplay: "Dubai, United Arab Emirates",
		employmentType: "Full-time",
		workplaceType: "On-site",
		salaryDisplay: null,
		salaryMin: null,
		salaryMax: null,
		salaryCurrency: null,
		salaryPeriod: null,
		experienceLevel: "Not specified",
		category: "Security",
		categorySlug: "security",
		postedOn: "2026-08-20",
		closingOn: null,
		overview: "On-site security officer role in Dubai, submitted through HiredFrex outreach. No usable salary figure was provided, so none is shown.",
		aboutEmployer: "CREW PRIVE Facilities Management is named as the employer. HiredFrex has not confirmed a company website, trade licence, or named hiring contact.",
		responsibilities: [],
		essentialRequirements: [],
		preferredRequirements: [],
		skills: [
			"Access control",
			"Incident reporting",
			"Site patrol"
		],
		schedule: null,
		benefits: [],
		visaInfo: null,
		hiringProcess: null,
		howToApply: "",
		sourceName: "Employer-submitted listing on HiredFrex",
		sourceUrl: null,
		lastVerifiedOn: REVIEWED_ON,
		verificationStatus: "completeness_reviewed",
		verificationSummary: "",
		checks: [],
		qualityFlags: ["salary-missing"],
		indexable: true,
		featured: true,
		status: "published"
	}),
	job({
		id: "job_radisson_hk",
		slug: "housekeeping-attendant-radisson-dubai",
		employerId: "emp_radisson",
		title: "Housekeeping Attendant",
		companyName: "Radisson Hotel Group",
		locationCity: "Dubai",
		locationCountry: "United Arab Emirates",
		locationDisplay: "Dubai, United Arab Emirates",
		employmentType: "Full-time",
		workplaceType: "On-site",
		salaryDisplay: null,
		salaryMin: null,
		salaryMax: null,
		salaryCurrency: null,
		salaryPeriod: null,
		experienceLevel: "Entry",
		category: "Hospitality",
		categorySlug: "hospitality",
		postedOn: "2026-08-18",
		closingOn: null,
		overview: "On-site housekeeping attendant role in Dubai, submitted through HiredFrex outreach. A hotel-group name on this page is not a confirmed careers-site vacancy. No salary was supplied.",
		aboutEmployer: "Radisson Hotel Group is named as submitted. HiredFrex has not attached a public vacancy URL or independently confirmed the hiring entity.",
		responsibilities: [],
		essentialRequirements: [],
		preferredRequirements: [],
		skills: [
			"Guest rooms",
			"Housekeeping",
			"On-site shift work"
		],
		schedule: null,
		benefits: [],
		visaInfo: null,
		hiringProcess: null,
		howToApply: "",
		sourceName: "Employer-submitted listing on HiredFrex",
		sourceUrl: null,
		lastVerifiedOn: REVIEWED_ON,
		verificationStatus: "completeness_reviewed",
		verificationSummary: "",
		checks: [],
		qualityFlags: ["salary-missing", "major-brand-unconfirmed"],
		indexable: true,
		featured: true,
		status: "published"
	}),
	job({
		id: "job_aiza_waiter",
		slug: "waiter-waitress-aiza-hospitality-dubai",
		employerId: "emp_aiza",
		title: "Waiter / Waitress",
		companyName: "Aiza Hospitality",
		locationCity: "Dubai",
		locationCountry: "United Arab Emirates",
		locationDisplay: "Dubai, United Arab Emirates",
		employmentType: "Full-time",
		workplaceType: "On-site",
		salaryDisplay: null,
		salaryMin: null,
		salaryMax: null,
		salaryCurrency: null,
		salaryPeriod: null,
		experienceLevel: "Entry",
		category: "Hospitality",
		categorySlug: "hospitality",
		postedOn: "2026-08-16",
		closingOn: null,
		overview: "On-site waiter/waitress role in Dubai, submitted through HiredFrex outreach. No advertised salary was supplied.",
		aboutEmployer: "Aiza Hospitality is named as the employer. HiredFrex has not independently confirmed this company’s identity or a public careers page.",
		responsibilities: [],
		essentialRequirements: [],
		preferredRequirements: [],
		skills: ["Food service", "Guest handling"],
		schedule: null,
		benefits: [],
		visaInfo: null,
		hiringProcess: null,
		howToApply: "",
		sourceName: "Employer-submitted listing on HiredFrex",
		sourceUrl: null,
		lastVerifiedOn: REVIEWED_ON,
		verificationStatus: "completeness_reviewed",
		verificationSummary: "",
		checks: [],
		qualityFlags: ["salary-missing"],
		indexable: true,
		featured: true,
		status: "published"
	}),
	job({
		id: "job_oneandonly_bellman",
		slug: "bellman-oneandonly-one-zaabeel-dubai",
		employerId: "emp_oneandonly",
		title: "Bellman",
		companyName: "One&Only One Za'abeel",
		locationCity: "Dubai",
		locationCountry: "United Arab Emirates",
		locationDisplay: "Dubai, United Arab Emirates",
		employmentType: "Full-time",
		workplaceType: "On-site",
		salaryDisplay: null,
		salaryMin: null,
		salaryMax: null,
		salaryCurrency: null,
		salaryPeriod: null,
		experienceLevel: "Entry",
		category: "Hospitality",
		categorySlug: "hospitality",
		postedOn: "2026-08-14",
		closingOn: null,
		overview: "On-site bellman role in Dubai, submitted through HiredFrex outreach. A property name on this page is not a confirmed careers-site vacancy. No salary was supplied.",
		aboutEmployer: "One&Only One Za'abeel is named as submitted. HiredFrex has not attached a public vacancy URL.",
		responsibilities: [],
		essentialRequirements: [],
		preferredRequirements: [],
		skills: [
			"Guest arrival",
			"Luggage handling",
			"Front of house"
		],
		schedule: null,
		benefits: [],
		visaInfo: null,
		hiringProcess: null,
		howToApply: "",
		sourceName: "Employer-submitted listing on HiredFrex",
		sourceUrl: null,
		lastVerifiedOn: REVIEWED_ON,
		verificationStatus: "completeness_reviewed",
		verificationSummary: "",
		checks: [],
		qualityFlags: ["salary-missing", "major-brand-unconfirmed"],
		indexable: true,
		featured: true,
		status: "published"
	}),
	job({
		id: "job_vertex_oa",
		slug: "office-assistant-vertex-toronto",
		employerId: "emp_vertex",
		title: "Office Assistant",
		companyName: "Vertex Business Support Inc.",
		locationCity: "Toronto",
		locationCountry: "Canada",
		locationDisplay: "Toronto, Canada",
		employmentType: "Full-time",
		workplaceType: "On-site",
		salaryDisplay: null,
		salaryMin: null,
		salaryMax: null,
		salaryCurrency: null,
		salaryPeriod: null,
		experienceLevel: "Entry",
		category: "Administrative",
		categorySlug: "administrative",
		postedOn: "2026-08-10",
		closingOn: null,
		overview: "Office assistant role in Toronto, submitted through HiredFrex outreach. The original description named “Maple Leaf Business Solutions” rather than Vertex Business Support Inc. That mismatch is flagged. No salary was supplied.",
		aboutEmployer: "Vertex Business Support Inc. is the employer field. The description referred to Maple Leaf Business Solutions. HiredFrex has not resolved the discrepancy, so identity is flagged.",
		responsibilities: [],
		essentialRequirements: [],
		preferredRequirements: [],
		skills: ["Office support", "Scheduling"],
		schedule: null,
		benefits: [],
		visaInfo: null,
		hiringProcess: null,
		howToApply: "",
		sourceName: "Employer-submitted listing on HiredFrex",
		sourceUrl: null,
		lastVerifiedOn: REVIEWED_ON,
		verificationStatus: "completeness_reviewed",
		verificationSummary: "Completeness reviewed with a name-mismatch flag. The employer field and the description do not name the same company. Do not treat this as a confirmed vacancy at either name.",
		checks: [],
		qualityFlags: ["salary-missing", "name-mismatch"],
		indexable: true,
		featured: false,
		status: "published"
	})
];
var SEED_POSTS = [
	{
		id: "post_start_here",
		slug: "start-here-gulf-job-search",
		title: "Start here: a Gulf job search that does not pay a facilitator",
		excerpt: "A working sequence for people targeting UAE and Gulf roles: official channels first, then a CV, then a listing you can actually read — including what HiredFrex will and will not do for you.",
		category: "Getting started",
		author: "Paul Mensah",
		authorPhoto: "/authors/paul.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-08",
		updatedOn: "2026-09-19",
		readMinutes: 12,
		body: `If you are applying from abroad, the expensive mistakes happen early: paying a stranger to “process a visa,” sending a passport scan on WhatsApp, or treating a job board page as a government approval. This is the sequence HiredFrex recommends. It is editorial guidance, not a recruitment contract and not legal advice.

## What this site is for

HiredFrex publishes:

1. **Career information** — guides and dated articles with sources.
2. **A small job board** — employer-submitted listings with an honest review label.
3. **Tools** — a CV builder that is not allowed to invent your jobs, and applications that stay on this site.

We do not issue work permits. We do not sell interviews. We do not mark a company “verified” because the name looks familiar.

If you only have 20 minutes, read this page, then [International job scams](/blog/international-job-scams-red-flags), then [How HiredFrex reviews listings](/blog/what-reviewed-means-on-hiredfrex).

## Step 1 — Learn the official process, not a WhatsApp process

For the United Arab Emirates, labour and residence processes sit with the government, not with a job board.

- [MoHRE](https://www.mohre.gov.ae) — Ministry of Human Resources and Emiratisation
- [UAE government: jobs](https://u.ae/en/information-and-services/jobs)
- [MoHRE: recruiting a worker from overseas](https://mohre.gov.ae/en/services/recruiting-a-worker-from-overseas-2022)

A recruiter can describe a vacancy. They cannot sell you a UAE work visa as a product. If money is requested before you have a written employer relationship, stop. The US Federal Trade Commission’s consumer rule is the same idea in different words: **do not pay for the promise of a job** ([FTC: Job scams](https://consumer.ftc.gov/articles/job-scams)).

## Step 2 — Write a CV that matches one job

Use the [UAE CV guide](/blog/uae-cv-format-what-recruiters-expect) and the [CV builder](/cv-builder). Put the job title from the listing in the summary. Do not invent dates. Do not put a passport number on the CV.

If you are outside the UAE, say so in one line (“Based in [city]; would require employer sponsorship”). Recruiters need that fact. Hiding it wastes everyone’s time.

## Step 3 — Read the listing like an editor

On HiredFrex, open the verification panel before the apply form.

| Label you may see | What it actually means |
| --- | --- |
| Completeness reviewed | We checked fields, contradictions, and common scam patterns. We did **not** confirm the employer. |
| Source confirmed | There is a public vacancy URL we recorded. Still not a guarantee the role is open today. |
| Employer confirmed | We confirmed identity. This is rare on the current sample. |
| Name mismatch / salary missing | A problem we found and labelled rather than hiding. |

If salary is blank, that is information. Do not assume a “standard security” number.

## Step 4 — Apply on the record

Apply on HiredFrex when the listing accepts applications here. Keep a copy. Do not also pay a facilitator to submit the same CV.

If someone using the employer’s name messages you off-platform and asks for a fee, a gift card, cryptocurrency, or remote-access software, treat it as a scam and [report the listing](/report).

## Step 5 — Offers are documents, not screenshots

A real offer can be checked. Ask for:

- Job title, wage, city, housing if any, contract length — in writing
- The employer’s legal name, not only a trading name
- How the work permit will be filed (the **employer** files it in the UAE, not you paying a broker)

Then read [How to verify a job offer](/guides/verify-a-job-offer) before you resign from another job.

## Time and money you should budget (without paying a broker)

A genuine overseas hire still costs *you* time: CV, interviews, notice period, medical steps the **employer** may arrange after an offer. It should not cost you an upfront “processing fee” to a person on chat.

Budget for a working phone number that can receive international calls, a quiet place for a video interview, and the ability to wait. Pressure to pay today is a signal, not a service.

## How to use HiredFrex without treating it as a ministry

Use the [jobs](/jobs) column after you have read one scam article and one official-channel article. Apply on the listing page. If you are hiring, use [employer posting](/employers). If something feels wrong, use [report](/report). There is no paid fast lane.

## If you are already in the UAE

Your problem is usually notice period, visa transfer, and whether the new employer will actually file. Bring your labour contract and visa status to the conversation in one sentence. Do not hide a current visa problem; it will appear in the government system anyway.

## What we will not pretend

- That a handful of outreach listings are a national job market
- That a hotel brand on a page is the same as a careers-site vacancy
- That any advertising programme is guaranteed if you read these articles

Related: [Official UAE channels vs private boards](/blog/official-uae-job-channels), [WhatsApp job offers](/blog/whatsapp-job-offers), [Documents to prepare](/blog/documents-to-prepare-before-overseas-work).`
	},
	{
		id: "post_scams",
		slug: "international-job-scams-red-flags",
		title: "International job scams: red flags every overseas applicant should know",
		excerpt: "Reported US job-scam losses passed $500 million in 2024. This guide lists the checks HiredFrex uses, the checks you should still do yourself, and where to report a fake offer.",
		category: "Scam awareness",
		author: "Amira Hassan",
		authorPhoto: "/authors/amira.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-09",
		updatedOn: "2026-09-19",
		readMinutes: 12,
		body: `Overseas job search is a high-trust situation: you share a passport copy, a CV, and often a phone number before you have met anyone. Scammers know that. This article is a working checklist, not a scare piece. It is based on public consumer-protection guidance and on the review rules HiredFrex actually applies to listings.

## What the public data shows

The US Federal Trade Commission has documented a sharp rise in job-scam reports. FTC staff wrote in September 2025 that reported job scams grew to over 105,000 in 2024 — nearly three times the 2020 figure — with reported losses of over $513 million. A related FTC consumer alert notes that reports tripled from 2020 to 2024 and that reported losses jumped from about $90 million to $501 million in that period.

Those figures are **US reports**. They are not a global census, and they are not HiredFrex’s own incident log. They are useful because they show the same pattern we see in candidate reports from Gulf and South Asian applicants: fake recruiters, fake “visa processing” fees, and cloned company names.

Sources:

- [FTC: Job Scams](https://consumer.ftc.gov/articles/job-scams)
- [FTC: steps to stop deceptive labor-market practices (24 September 2025)](https://www.ftc.gov/business-guidance/blog/2025/09/ftc-takes-steps-stop-deceptive-unfair-labor-market-practices)
- [FTC consumer alert: How to spot a job scam](https://consumer.ftc.gov/consumer-alerts/2025/09/how-spot-job-scam)

## The rule that never changes

The FTC’s consumer advice is blunt: **do not pay for the promise of a job**. Honest employers, including governments, do not charge you to apply, to “unlock” an offer, or to process a visa that only they can sponsor.

If a HiredFrex listing, a WhatsApp “HR officer,” or an email using a public domain (Gmail, Yahoo, Outlook) asks you to pay:

1. Stop.
2. Do not send money, gift cards, crypto, or a “refundable security deposit.”
3. [Report the listing to HiredFrex](/report).
4. Report the scam to a consumer-protection body in your country where one exists. In the US that is [ReportFraud.ftc.gov](https://ReportFraud.ftc.gov).

## Red flags we treat as disqualifying on HiredFrex

These are checks the platform actually runs before a listing can stay public. We do **not** claim they catch every fraud.

| Signal | Why it matters | What HiredFrex does |
| --- | --- | --- |
| Application fee, training fee, or “visa processing fee” paid to a person | Classic job-scam pattern (FTC) | Listing is rejected or taken down |
| Remote work on a role that is physically on a site (housekeeping, warehouse, front desk, security patrol) | Contradicts the job | Workplace type is corrected or the listing is blocked |
| Employer name does not match the description | Bait-and-switch | Listing is blocked until corrected |
| Placeholder text, “test job,” or lorem ipsum | Not a real vacancy | Blocked |
| Major brand name with no source URL | Unverifiable impersonation risk | Not published as a verified brand vacancy |
| Salary with no currency, or an impossible range | Candidates cannot judge the role | Flagged; may stay public only with the gap labelled |

## Red flags you still have to check yourself

A completeness review is not the same as “this employer exists and this vacancy is open.” On most current HiredFrex listings, **employer identity is unverified**. You should still:

1. Search the company name plus “scam,” “complaint,” and the city.
2. Match the email domain to the company’s real website — not a lookalike domain.
3. Refuse interviews that require you to install remote-access software.
4. Refuse to send scans of your passport, Emirates ID, or bank card over WhatsApp to someone you have not authenticated.
5. Ask for a written offer on company letterhead, with a registration or trade-licence number, before you resign from another job.
6. For UAE roles, remember that work permits are issued through official channels such as [MoHRE](https://www.mohre.gov.ae) and the UAE government portal [u.ae](https://u.ae). A recruiter cannot sell you a work visa as a product.

## How international recruitment is supposed to work

A legitimate overseas hire usually looks like this:

1. A licensed employer (or a licensed agency acting for that employer) describes a real vacancy.
2. You apply with a CV. You are not asked to pay.
3. Interviews happen. Terms are written down: job title, wage, location, housing if any, contract length.
4. The **employer** sponsors the work permit / residence process under that country’s labour authority.
5. You receive documents you can verify on a government portal, not only on a PDF from a stranger.

If step 2 already involves a fee, the process is not legitimate recruitment. Read our longer explainer: [How to verify a job offer](/guides/verify-a-job-offer).

## What HiredFrex will never do

- We will not message you on WhatsApp asking for a deposit.
- We will not sell a “priority listing” to candidates.
- We will not ask you to pay for this article, for an OTP code, or for a job.

If money already left your account:

1. Stop sending more.
2. Keep records (receipts, chat logs, account numbers).
3. Tell your bank or transfer provider immediately.
4. Report the incident to local police if money left your account.
5. Send the same evidence to HiredFrex via [Report a listing](/report) so we can take the page down if it is still live.

## A short checklist you can screenshot

1. No payment for a job, a visa, or a “file opening.”
2. No passport or bank card in the first chat.
3. No remote-access software.
4. Company-domain email or a listing you can open on a real site.
5. Written terms before you resign.

This article is general information, not legal advice. For UAE labour questions, use official sources: [MoHRE](https://www.mohre.gov.ae) and [u.ae](https://u.ae).

Related: [WhatsApp job offers](/blog/whatsapp-job-offers), [Start here](/blog/start-here-gulf-job-search).`
	},
	{
		id: "post_official_channels",
		slug: "official-uae-job-channels",
		title: "Official UAE job channels vs private boards",
		excerpt: "Where labour rules actually live (MoHRE and u.ae), what a private board like HiredFrex can legally be, and how to avoid treating a listing as a work permit.",
		category: "UAE jobs",
		author: "Nour El-Sayed",
		authorPhoto: "/authors/nour.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-10",
		updatedOn: "2026-09-19",
		readMinutes: 11,
		body: `People mix up three different things: **a vacancy**, **an employment contract**, and **a work permit**. Private job boards only sit in the first box. This article keeps them separate, with links to the official UAE pages rather than to other blogs.

This is not legal advice. Confirm anything that affects your status on government sites.

## Where the rules live

| Question | Official starting point |
| --- | --- |
| Labour ministry | [mohre.gov.ae](https://www.mohre.gov.ae) |
| Jobs and work information for the public | [u.ae — jobs](https://u.ae/en/information-and-services/jobs) |
| Hiring a worker from overseas (employer process) | [MoHRE service page](https://mohre.gov.ae/en/services/recruiting-a-worker-from-overseas-2022) |
| Emirati private-sector minimum wage (2026 notice) | [MoHRE news, 31 Dec 2025](https://www.mohre.gov.ae/en/media-center/news/31/12/2025/mohre-raises-minimum-wage-for-emiratis-in-the-private-sector-to-aed-6000-per-month-effective-1) |

If a WhatsApp “HR officer” contradicts those pages, the pages win.

## What a private board is allowed to be

HiredFrex can:

- Host an employer’s description of a role
- Host your application
- Label what we checked
- Explain, with citations, how to read a listing

HiredFrex cannot:

- File a work permit
- Guarantee that a named hotel or facilities company will interview you
- Convert a completeness review into a government approval

When someone says “the portal already processed your visa” and then asks for a fee, they are not describing MoHRE. They are describing a scam pattern the [FTC documents for job offers](https://consumer.ftc.gov/articles/job-scams) in another jurisdiction — different country, same money request.

## How to use both without getting confused

1. Read [u.ae jobs information](https://u.ae/en/information-and-services/jobs) so you know what a legitimate hire looks like.
2. Use HiredFrex (or any private board) to find a **described vacancy**.
3. Apply without paying.
4. If you receive an offer, the **employer** runs the permit. You verify documents. You do not buy the permit from a middleman.

## Private boards that copy each other

A vacancy copied across five aggregators is still one vacancy — or one scam. HiredFrex does not syndicate Jooble or other scraped feeds. If you see the same text on another site, compare the employer name, the email domain, and whether anyone is asking for money.

## Government pages change; blogs lag

Bookmark the official URLs rather than a screenshot in a WhatsApp group. If this article’s links 404, use the MoHRE search box and [tell us](/contact). We would rather correct a URL than keep a confident dead link.

## For employers posting here

Do not write “visa guaranteed” in the job body. You may describe that *you* will sponsor a work permit if the hire proceeds. The permit is still a government process. See [employer posting](/employers).

## What this page will not do

It will not summarise every 2026 ministerial resolution. Wage-protection timing, Emiratisation quotas, and golden-visa categories change and are easy to get wrong in a blog post. If we cannot quote a primary page, we do not invent a number. See [UAE 2026 wage rules: what we can confirm](/blog/uae-2026-wage-rules-what-we-can-confirm).

Related: [UAE job search guide](/guides/uae-job-search), [UAE employment visa guide](/guides/uae-employment-visa), [Start here](/blog/start-here-gulf-job-search).

## How a private board should sit next to those pages

HiredFrex should send you to MoHRE and u.ae, not replace them. If a listing contradicts an official service page, the official page wins. We will not publish a “visa package” that is really a personal IBAN.

If you only remember one distinction: a job board can host an application; it cannot sell you a work permit. The longer company-name check is [How to check a UAE company name](/blog/how-to-check-a-uae-company-name).

## What we will not scrape into this article

Fee tables, skill-level matrices, and occupation lists go stale. We link the live service instead of pasting a screenshot from last year. That is slower for search engines and safer for you.
`
	},
	{
		id: "post_uae_cv",
		slug: "uae-cv-format-what-recruiters-expect",
		title: "UAE CV format: what Gulf recruiters actually expect",
		excerpt: "A practical CV structure for UAE and Gulf applications — length, photo, visa status, and the mistakes that waste interviews — without pretending one template wins every role.",
		category: "CV and applications",
		author: "Amira Hassan",
		authorPhoto: "/authors/amira.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-11",
		updatedOn: "2026-09-19",
		readMinutes: 11,
		body: `There is no single legally required CV format in the UAE. What follows is HiredFrex editorial guidance based on how listings on this site are written, and on common recruiter practice in the Gulf. It is not a government form, and it is not a guarantee of an interview.

If you want a document you can edit and export, use the [HiredFrex CV builder](/cv-builder). Do not invent employment dates or qualifications.

## Start with the job, not a universal CV

Look at the listing. On HiredFrex, a security officer role in Dubai and a marketing executive role in Abu Dhabi do not share the same skills block. Copying a generic “dynamic team player” summary into both is how applications get ignored.

Do this instead:

1. Put the **job title from the listing** near the top of your summary, in plain language.
2. Mirror **only skills you actually have**. If the listing mentions shift work and incident reporting, and you have done those, say so with where and when.
3. Keep the file name clean: Firstname-Lastname-Security-Officer-Dubai.pdf.

## Length

- Entry-level and skilled trades: **one page** is enough if the work history is short.
- Supervisors and specialists with more than about eight years of relevant work: **two pages** is acceptable.
- Three pages is rarely useful unless you are in a research or senior technical field, which most HiredFrex listings are not.

## Personal details — what to include, and what to skip

Common Gulf recruiter practice (not a legal requirement) is to include:

- Full name
- Phone with country code
- Email
- City you are currently in
- Nationality
- Visa / work-authorisation status in one line (“UAE residence visa — transferable” / “Outside the UAE — would require employer sponsorship”)

A photograph is still requested by many Gulf employers. It is not requested by all, and it is not a substitute for experience. If you include one, use a plain headshot with a neutral background.

Do **not** include:

- Passport number
- Emirates ID number
- Bank details
- Marital status or family information unless a specific employer form asks for it later
- Religious affiliation
- A full home address

Those details belong on an official onboarding form after a written offer, not on a CV that will be forwarded.

## Work experience that screens well

Write each role as:

**Job title — Employer — City — dates**

Then 3–5 lines of what you actually did, with numbers only when they are real:

- “Controlled access for a 24-hour residential site; wrote daily occurrence-book entries.”
- “Handled guest check-in on a 180-room property during night shift.”

Do not write “responsible for all security operations across the region” if you stood a gate.

## Skills, education, certificates

Skills on HiredFrex listings cluster around the work: access control, food service, stock handling, Microsoft Office, retail sales. Copying an unrelated professional skill (for example, “financial modelling” on a housekeeping CV) is a credibility problem.

List education in reverse chronological order. Write certificates as **name — issuer — year**. Do not upload a scan of the certificate on the CV itself.

## Language lines that a human can believe

“Fluent in English” on every CV is noise. Use a level you can defend in an interview: conversational / working / fluent. A security or hospitality listing that asks for English and Arabic is asking whether you can take an instruction and answer a guest.

## Cover notes on HiredFrex

The application form has a short cover note. Use four sentences: the exact job title and city; one fact from your last role that matches; your current location and visa status; when you can start. Do not paste the entire CV. Do not write that you will pay for your own visa.

## File hygiene

- PDF, not a Word file full of tracked changes
- Under 2 MB
- No password
- No photo of a printed CV taken at an angle

If a recruiter cannot open the file on a phone, they will not chase you.

## Visa line, honestly

Recruiters in the UAE need to know whether they must sponsor you. A single honest line is better than a paragraph:

- “Currently in Dubai on a residence visa; notice period 30 days.”
- “Based in Kerala; available to relocate; would require a work permit.”

Do not claim a visa status you do not have.

## What this is not

This is not legal advice and not an official MoHRE form. Employment contracts, work permits and offer letters follow UAE labour procedures described on [MoHRE](https://www.mohre.gov.ae) and [u.ae](https://u.ae). A well-formatted CV does not replace those steps.

Related: [How AI CV screening works](/blog/how-ai-cv-screening-works), [UAE job search guide](/guides/uae-job-search), [Start here](/blog/start-here-gulf-job-search).`
	},
	{
		id: "post_whatsapp",
		slug: "whatsapp-job-offers",
		title: "WhatsApp job offers: a decision tree before you send anything",
		excerpt: "A practical yes/no tree for messages that claim to be HR: when to reply, when to hang up, and which files never belong in a chat thread.",
		category: "Scam awareness",
		author: "Amira Hassan",
		authorPhoto: "/authors/amira.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-12",
		updatedOn: "2026-09-19",
		readMinutes: 10,
		body: `Most serious overseas recruitment still uses email and documented offers. Most rushed fraud still uses chat apps. This is a decision tree, not a moral lecture.

## The first message

Ask one question: **does this person want money, software access, or a passport scan in the first hour?**

If yes, stop. Do not negotiate a “smaller deposit.” The [FTC job-scam guidance](https://consumer.ftc.gov/articles/job-scams) is explicit about not paying for the promise of work. A smaller number is still a payment.

If no, you may continue — slowly.

## Decision tree

1. **Do they use a public-domain address only (Gmail, Yahoo, Outlook) and a company name you cannot find?** Treat as unverified. Ask for a company-domain email. If they refuse, stop.
2. **Do they ask you to install remote-access or “interview” software you have not heard of?** Stop. Real interviews use a phone, a known video tool, or an office.
3. **Do they ask for a passport, Emirates ID, or bank card photo in the chat?** Do not send it. Those files belong on an employer or government form after you have authenticated the organisation.
4. **Do they claim HiredFrex, MoHRE, or a hotel brand sent them, but they cannot point to a live listing or an official page?** [Report it](/report) and [contact us](/contact) if they used our name.
5. **Do they have a listing you can open, with no fee, and they want a CV?** You may send the CV. Keep the passport for later.

## What you can send early

- A CV without ID numbers
- A portfolio or certificate list
- Availability and visa status in one line

## What you should not send early

- Passport bio page
- Bank statements
- Selfies holding ID
- Copies of other people’s documents
- Cryptocurrency “verification” payments

## Names that get cloned

Hotel groups, airlines, and facilities companies are cloned daily. A display name “Radisson HR” on WhatsApp is not a credentials check. Open the careers page on the real domain. If the chat cannot wait for that, the chat is the product, not the job.

HiredFrex will never ask you on WhatsApp to pay for a listing to stay up, to unlock an interview, or to verify a code with cryptocurrency.

## Voice notes and urgency

Fraud uses urgency because urgency skips the official page. “The seat closes tonight” plus a payment link is a sales script. A real employer can usually write the same sentence in email on company domain tomorrow.

## If they used our logo

Save the message. Send it to [support@hiredfrex.com](mailto:support@hiredfrex.com) and use [report](/report) if there is a URL on this site. We do not issue refunds for money you sent to a third party; we can take down a listing and warn other readers.

## If the chat already happened

Keep screenshots. If money left your account, tell the payment provider first, then local police if appropriate, then HiredFrex if a listing on this site was used as bait.

Related: [International job scams](/blog/international-job-scams-red-flags), [Documents for overseas employment](/guides/overseas-employment-documents), [How to verify a job offer](/guides/verify-a-job-offer).

## What a genuine process still uses chat for

Some real supervisors confirm a shift on WhatsApp after you already applied on a company domain or on HiredFrex. Chat is not automatically a scam. Chat that is the only record of the employer, the wage, and the fee is the problem.

Keep the HiredFrex thread. Export the chat if they ask for money. Then [report](/report). Read [How to report a cloned employer name](/blog/how-to-report-a-cloned-employer-name).

## After you hang up

Write down the legal name they used. Compare it with the listing. Do not send a passport the same hour because the voice sounded kind. [What to do in the 24 hours after a Gulf interview](/blog/what-to-do-in-the-24-hours-after-a-gulf-interview).
`
	},
	{
		id: "post_reviewed_means",
		slug: "what-reviewed-means-on-hiredfrex",
		title: "What “reviewed” means on HiredFrex (and what it does not)",
		excerpt: "A plain-language map of every review label we use, why we stopped saying “verified employer,” and how to read a job page without being sold a badge.",
		category: "How HiredFrex works",
		author: "Paul Mensah",
		authorPhoto: "/authors/paul.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-13",
		updatedOn: "2026-09-19",
		readMinutes: 10,
		body: `Job boards lose trust in one sentence: “verified employer” next to a company nobody called. HiredFrex used to lean on that language. We dropped it. This page is the replacement.

It is the public version of [How we verify jobs](/how-we-verify). If the two ever disagree, this article should be updated — [contact us](/contact).

## The only claims we are willing to make

A listing on this site is one of the following:

1. **Not public** — pending, flagged, rejected, or closed.
2. **Completeness reviewed** — an editor or an automated check looked at required fields, workplace type, and scam patterns.
3. **Source confirmed** — we recorded a public vacancy URL.
4. **Employer confirmed** — we confirmed the organisation, not just the words on the form.

Most current public listings are in group 2. That is not a failure of the page. It is an honest page.

## Checks that actually run

Before a listing can stay public, HiredFrex looks for:

- Application fees, training fees, “visa processing” fees paid to a person
- Remote labels on physically on-site work (housekeeping, security patrol, warehouse)
- Employer name that does not match the description
- Placeholder or test text
- A major brand name with no source URL, presented as if it were confirmed

A pass on those checks is **not** a reference from the company. It is the absence of those red flags in the submitted text.

## How a listing becomes public

1. An employer submits a complete form (title, city, workplace type, overview, how to apply).
2. Automated checks look for fees, placeholders, remote-on-physical-work, and name mismatches.
3. Flagged jobs go to an editor. They are not auto-deleted; they are not auto-approved.
4. Only published jobs with a review status in the public set appear on [Jobs](/jobs) and in the jobs rail.

You will not see pending, rejected, or closed roles in that rail.

## Why brand names are dangerous

A candidate searching “Radisson housekeeping Dubai” is not searching for a facilities-management SME. If we cannot attach a careers-page URL, we still may show an outreach-sourced listing — but we label the brand as unconfirmed. We would rather lose the click than impersonate a hotel group.

The Vertex listing on this site is the working example of the opposite problem: the employer field and the description did not name the same company. That listing is public with a **name-mismatch flag**, not silently rewritten.

## What you should still do

Even on a completeness-reviewed page:

- Search the company name plus “scam” and the city
- Match email domains to a real website
- Refuse to pay
- Refuse remote-access software
- Keep passport scans off informal chat until you have authenticated the employer

## Ads and listings

If HiredFrex displays advertising in the future, ads will not write job labels. A completeness review cannot be bought. That is an editorial rule, not a performance promise to advertisers.

## Corrections

If a company says a listing impersonates them, we take it down while we look. If a wage figure was typed wrong, we correct it and leave a note where we can. Editorial identity for articles is separate from job review; see [Editorial standards](/editorial-standards).

Related: [How we review listings](/how-we-verify), [Start here](/blog/start-here-gulf-job-search), [International job scams](/blog/international-job-scams-red-flags).

## Why the weak label is the honest one

A stronger badge would be easier to sell to employers and easier to screenshot in group chats. It would also be a lie for most of the current sample. Completeness reviewed is the label that matches the work we did.

If a recruiter tells you “HiredFrex verified us,” ask which badge is on the page. If the page says completeness reviewed, they oversold it. Tell us.

## Reports can change the label

A listing can be completeness reviewed on Tuesday and unpublished on Wednesday. Last-reviewed dates exist for that reason. Clones often appear after the ad is live. [How to report a cloned employer name](/blog/how-to-report-a-cloned-employer-name).
`
	},
	{
		id: "post_ai_screening",
		slug: "how-ai-cv-screening-works",
		title: "How AI CV screening works — and what actually moves your application",
		excerpt: "A plain-language look at automated screening: what it usually reads, why keyword stuffing fails, and how HiredFrex uses (and does not use) AI.",
		category: "CV and applications",
		author: "Amira Hassan",
		authorPhoto: "/authors/amira.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-14",
		updatedOn: "2026-09-19",
		readMinutes: 10,
		body: `“AI screening” is not one product. Employers use everything from simple keyword filters to ranked language models. This article explains the common pattern so you can write a CV that a human can also read. It does not claim insider knowledge of any specific vendor.

## What most automated screens actually do

In a typical large-employer flow:

1. Your file is parsed into fields: name, dates, titles, skills, education.
2. Those fields are compared to the job description, sometimes with a score.
3. A recruiter sees a shortlist, not the raw score, in well-run teams — and *only* the score in badly run ones.

Parsing fails on the same things every year: multi-column designs, text inside images, tables used as layout, and icons instead of words. If a parser cannot read your dates, you look unemployed.

## What a parser usually cannot see

If your CV is a designed poster — two columns, skill bars, icons instead of the word “Excel” — many applicant-tracking systems store a garbled version. Test this yourself: copy the text out of your PDF into a plain notes app. If the order of jobs collapses, fix the layout before you apply.

A small headshot in the header is common in the Gulf and is usually tolerated. A full-page watermark of your face is not.

## What HiredFrex does with AI

HiredFrex offers an optional **CV drafting assistant** in the [CV builder](/cv-builder). It runs only when you click generate. It is there to help you phrase experience you already entered.

HiredFrex does **not**:

- Decide who gets hired
- Auto-reject candidates with a model score
- Sell your CV to advertisers
- Invent employers, dates, or certificates on your behalf

If a generate step ever suggests a skill you did not enter, delete it. You are responsible for the document you send.

## Why keyword stuffing fails

Stuffing a security CV with “Python, SAP, IFRS, Kubernetes” because those words score well on tech boards is obvious to a human reviewer and is increasingly obvious to models that compare the CV to the job. On HiredFrex, we also reject **job listings** that attach unrelated skills. Apply the same discipline to your own file.

Useful alignment looks like this:

- Job says “incident reporting” → your CV has a bullet where you wrote incident reports, with the site type.
- Job says “shift work” → your dates or bullets mention nights or rotating shifts.
- Job says “Arabic and English” → you list languages you actually speak, with an honest level.

## Three changes that help in any system

1. **One column, standard headings**: Profile, Experience, Education, Skills, Languages, Certificates.
2. **Titles a parser can match**: “Security Officer,” not “Safety Ninja.”
3. **Dates in months and years**: “Mar 2023 – Present,” not “2023ish.”

## How HiredFrex applications are actually read

On this site, employers open an applicant list with your name, email, phone, cover note, and CV text. There is no hidden model score that auto-rejects you. If an employer later uses their own software, that is their process, not ours.

We will not sell a “beat the ATS” product. Most of those products add the same keywords every other applicant added.

## Interviews are changing too

Some employers now use automated video questions for high-volume service roles. Treat those like a structured interview: answer the question asked, in the time given, in a quiet room. We do not operate an AI interview product, and we will not pretend to know a hidden scoring rubric we have not seen.

For employers: if you screen with software, tell candidates which file types you accept. See [responsible hiring](/guides/responsible-hiring).

Related: [UAE CV format](/blog/uae-cv-format-what-recruiters-expect), [UAE interview guide](/guides/uae-interviews), [AI interviews](/guides/ai-job-interviews).`
	},
	{
		id: "post_uae_entry",
		slug: "entry-level-jobs-in-the-uae",
		title: "Entry-level jobs in the UAE: how to read a listing before you apply",
		excerpt: "A practical walk-through of security, hospitality, warehouse and office roles using HiredFrex’s live sample — including what the advertised numbers are, and what they are not.",
		category: "UAE jobs",
		author: "Nour El-Sayed",
		authorPhoto: "/authors/nour.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-15",
		updatedOn: "2026-09-19",
		readMinutes: 11,
		body: `This is not a national salary survey. It is a reading guide for the kinds of entry-level roles that appear on HiredFrex, using the **current public sample on this site**. When the sample is small, we say so.

As of the September 2026 HiredFrex review, most public listings on this platform are employer-submitted roles in the UAE (Dubai, Abu Dhabi, Sharjah) plus a small number of roles elsewhere. Employer identity is typically **not independently confirmed**. Read [How HiredFrex verifies jobs](/how-we-verify) before you treat any page as a guaranteed vacancy.

## What “entry-level” means here

On this site we treat a role as entry-level when the listing does not require management experience. That includes security officer, warehouse assistant, waiter/waitress, office secretary, customer service representative, and retail sales assistant.

## How to read salary on a small sample

When HiredFrex shows an advertised range, it is the number the employer typed, after we checked that it is internally consistent (currency + period). It is not:

- A MoHRE minimum for every nationality
- A cost-of-living calculation
- A promise that overtime is included
- Net of housing or food

If housing is “provided,” ask what that means: a bed in a shared room, a hotel staff house, or an allowance. The difference is the difference between a workable offer and a surprise. See [Housing, allowances, and offers](/blog/housing-allowances-and-offers-in-the-gulf).

## Security, hospitality, warehouse, office — different physical facts

- **Security:** usually on-site, uniformed, with night shifts. A listing marked remote-friendly for patrol work is a quality flag on this site.
- **Hospitality:** kitchens, rooms, and front of house are on-site. Tips are not a salary.
- **Warehouse / logistics:** lifting, scanning, shift patterns. Confirm transport if the site is far from housing.
- **Office / customer service:** may be hybrid in some firms; still confirm the city. “Remote UAE customer support” from a sender who wants a registration fee is a classic scam pattern.

## Nationality, language, and age lines

Some Gulf listings still state a preferred nationality or age range. HiredFrex does not invent those filters. If they appear, they are the employer’s text and may be unlawful in another country. We do not rewrite discrimination into “culture fit.” If you believe a listing breaks the law of the place it is posted, [report it](/report).

## What “immediate joiner” usually means

It means the employer wants someone who can start after notice, not someone who will pay to skip a visa queue. If the same message asks you to wire money to “fast-track immigration,” it is not an HR process. Read [WhatsApp job offers](/blog/whatsapp-job-offers).

## A realistic week of applications

Five carefully matched applications beat fifty generic ones. Keep a table: date, employer as written, city, salary as written, review label, what you sent. That table is also what you need if you later report a fake follow-up.

## How to use this site’s sample

1. Open the job page and read the verification panel.
2. If salary, workplace type, or employer identity is flagged, go in with your eyes open.
3. Use a CV that matches the role — [UAE CV guide](/guides/uae-cv).
4. Apply on HiredFrex. Do not pay a third party to “speed up” the same application.
5. Keep a copy of what you sent.

Browse current [security jobs](/categories/security), [logistics jobs](/categories/logistics), and [hospitality jobs](/categories/hospitality).

Related: [Start here](/blog/start-here-gulf-job-search), [UAE wage rules we can confirm](/blog/uae-2026-wage-rules-what-we-can-confirm).

## What “entry-level” is not

It is not a visa class. It is not a promise that no experience is required. Some ads say entry and then list three years. Believe the requirements list, not the marketing adjective.

Security and hospitality entry roles are still on-site. We will not tag them remote. Read [Airport and hotel security jobs are not the same](/blog/airport-and-hotel-security-jobs-are-not-the-same) before you send the same CV to both.
`
	},
	{
		id: "post_uae_salary_rules",
		slug: "uae-2026-wage-rules-what-we-can-confirm",
		title: "UAE 2026 wage rules: what official sources actually say",
		excerpt: "A short briefing on two official UAE measures — the Emirati private-sector minimum wage of AED 6,000 and MoHRE wage-protection timing — with links, scope, and what this page does not claim.",
		category: "UAE jobs",
		author: "Nour El-Sayed",
		authorPhoto: "/authors/nour.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-16",
		updatedOn: "2026-09-19",
		readMinutes: 10,
		body: `Employment-law explainers go stale quickly and are a common source of “low content value” pages when they rephrase rumours. This page only restates what we can attribute to official or primary notices, and it tells you where the information stops.

This is **not legal advice**. For your contract, use [MoHRE](https://www.mohre.gov.ae) and [u.ae](https://u.ae), or a qualified adviser.

## 1. Minimum wage for Emiratis in the private sector

On 31 December 2025, the Ministry of Human Resources and Emiratisation announced an increase in the **minimum wage for Emiratis employed in the private sector to AED 6,000 per month**, effective 1 January 2026. Establishments that already employed Emiratis before that date were given until 30 June 2026 to adjust. MoHRE also described enforcement measures from 1 July 2026 for establishments that had not complied, including consequences for Emiratisation targets and new work permits.

Source: [MoHRE news notice, 31 December 2025](https://www.mohre.gov.ae/en/media-center/news/31/12/2025/mohre-raises-minimum-wage-for-emiratis-in-the-private-sector-to-aed-6000-per-month-effective-1).

**What this does not say:** it is not a minimum wage for all nationalities in the private sector. Most HiredFrex listings are not Emirati-targeted professional posts. Do not read AED 6,000 as “what every security officer must be paid.”

## Why commercial blogs get this wrong

Search results in 2026 are full of pages that turn one MoHRE notice into a “salary for all jobs in Dubai.” That is how readers get hurt and how publishers get labelled low-value. Repeating AED 6,000 as a universal floor is not a paraphrase. It is an error.

If another HiredFrex page ever implies otherwise, treat this article as the correction and [email us](/contact).

## 2. Wage Protection System timing

UAE private-sector wages for employees covered by MoHRE are paid through the Wage Protection System (WPS) or another approved channel. During 2026, multiple HR briefings described a tighter, unified payday expectation (salary for a month paid by the first of the following month). HiredFrex has **not** independently reproduced the full legal text of every ministerial resolution on this page.

Until you have read the rule on an official channel, treat “payday is the 1st” articles on commercial blogs as secondary. Confirm on [MoHRE](https://www.mohre.gov.ae).

## End-of-service and other money that is not “salary”

UAE labour law has rules on end-of-service benefits, unpaid wages, and working time. Those rules are detailed and are updated. This article does not reprint the entire Federal Decree-Law. Use [MoHRE](https://www.mohre.gov.ae) and [u.ae](https://u.ae) for the current text.

## 3. What HiredFrex listings show instead

Our [market report](/market-report) publishes advertised ranges from **this site’s public sample**. That is a different dataset: it is not WPS, not MoHRE, and not a cost-of-living index. If a listing has no usable salary, we leave it blank rather than filling it with a “market average.”

## What to ask in writing before you accept

1. Basic wage (the figure that usually feeds end-of-service calculations)
2. Allowances, named separately (housing, transport, food)
3. Overtime rule, if any
4. Pay cycle and method (WPS is the expected channel for covered private-sector employees)
5. Whether accommodation is a room, an allowance, or neither

If the offer mixes all of that into one WhatsApp voice note, ask for a letter. See [Housing, allowances, and offers](/blog/housing-allowances-and-offers-in-the-gulf).

## Related official pages

- [MoHRE](https://www.mohre.gov.ae)
- [UAE government: jobs](https://u.ae/en/information-and-services/jobs)
- [MoHRE overseas work-permit service information](https://mohre.gov.ae/en/services/recruiting-a-worker-from-overseas-2022)

If you believe a HiredFrex article has stated a legal rule incorrectly, use [Contact](/contact) and ask for a correction. See [Editorial standards](/editorial-standards).`
	},
	{
		id: "post_housing",
		slug: "housing-allowances-and-offers-in-the-gulf",
		title: "Housing, allowances, and offer letters in the Gulf",
		excerpt: "How to read the money parts of a Gulf offer: basic wage versus housing, food, transport, and shared rooms — and which questions to get in writing before you resign.",
		category: "UAE jobs",
		author: "Nour El-Sayed",
		authorPhoto: "/authors/nour.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-17",
		updatedOn: "2026-09-19",
		readMinutes: 11,
		body: `An offer that says “AED 3,000 plus housing” and an offer that says “AED 3,000 all-in” are not the same job. This article is a reading guide for the money block of a Gulf offer letter. It is not a salary survey and not legal advice. For UAE labour questions use [MoHRE](https://www.mohre.gov.ae) and [u.ae](https://u.ae).

## Split the number into named parts

Ask the employer to write four lines, even if some are zero:

1. **Basic wage** — the monthly figure that usually matters for end-of-service calculations.
2. **Housing** — an allowance in cash, a room, or nothing.
3. **Transport / food** — allowance, staff canteen, company bus, or nothing.
4. **Overtime or service charge** — only if it is actually contractual, not a rumour.

If they will not split the number, you cannot compare the offer to another one, and you cannot check it against anything official.

## What “housing provided” often means

In operational roles (security, housekeeping, kitchen, warehouse) it often means a bed in a shared room, sometimes gender-separated, sometimes far from the work site. That can still be a fair offer. It is not the same as a one-bedroom apartment.

Ask:

- How many people share the room?
- Where is it, in minutes from the site?
- Who pays electricity and Wi-Fi?
- What happens to housing if you resign or are terminated?

Get those answers in the offer or a staff-housing annex, not only in a chat.

## Allowances that disappear

Some offers quote a high “package” that includes a housing allowance which is then deducted because a room is provided. That is not automatically fraud — but it should be visible in the letter. If the WhatsApp message uses the package number and the contract uses the basic wage, believe the contract.

## Food and transport

A canteen meal is not a salary. A company bus is not a transport allowance you can spend. If you have a medical diet or a second job at night, staff housing plus a bus schedule may make the role unworkable. Ask before you buy a ticket.

## What HiredFrex listings will and will not invent

On this site, if an employer leaves salary blank, we leave it blank. If they type a range, we show it as advertised. We do not add “typical housing worth AED X” to make the card look richer. See [what “reviewed” means](/blog/what-reviewed-means-on-hiredfrex).

## Offers versus screenshots

A screenshot of a salary table is not an offer. A PDF on company letterhead with the legal name, job title, city, start date, wage split, and who files the work permit is the document you can take to someone you trust.

Before you resign, read [How to verify a job offer](/guides/verify-a-job-offer) and [UAE 2026 wage rules we can confirm](/blog/uae-2026-wage-rules-what-we-can-confirm).

## Red flags in the money block

- A fee to “release” the offer
- Payment of your own work permit to a personal account
- Salary paid in cash only, off WPS, for a MoHRE-covered private-sector role, without a written explanation
- A number that changes every time you ask for a letter

Those are not negotiating tactics. They are reasons to walk away and, if a HiredFrex listing was used, to [report it](/report).

## A simple comparison table you can keep

When you have two offers, write basic wage, housing (room or cash), transport / food, city and commute, notice period, and who files the permit. If you cannot fill a cell, you do not have an offer yet.

Related: [Entry-level jobs in the UAE](/blog/entry-level-jobs-in-the-uae), [Questions to ask in a Gulf interview](/blog/questions-to-ask-in-a-gulf-job-interview).`
	},
	{
		id: "post_interview_q",
		slug: "questions-to-ask-in-a-gulf-job-interview",
		title: "Questions to ask in a Gulf job interview",
		excerpt: "A short list of questions that protect you in security, hospitality, warehouse and office interviews — without sounding like a lawyer, and without skipping the official channels.",
		category: "CV and applications",
		author: "Amira Hassan",
		authorPhoto: "/authors/amira.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-18",
		updatedOn: "2026-09-19",
		readMinutes: 10,
		body: `Interviews are not only for the employer. If you are relocating, a missed question about housing, shifts, or who files the permit is expensive. This list is for entry-level and skilled operational roles of the kind HiredFrex actually lists. It is not a script for executive search.

## Before the call

Read the listing again, including the review label. If salary is blank, your first money question is “what is the basic wage, and what is provided in kind?” If the employer name and the description disagree, ask which legal entity would be on the contract. See [what “reviewed” means](/blog/what-reviewed-means-on-hiredfrex).

Have a pen. Write answers in their words, not yours.

## Questions about the work

1. What does a normal shift look like, including start time and break?
2. Is the work on this site, or do people move between sites?
3. What uniform or tools do I provide, and what do you provide?
4. Who do I report to on day one?

These questions do two things: they show you read the listing, and they catch a “security officer” role that is actually unpaid sales walking.

## Questions about money

5. What is the basic wage, in which currency, paid how often?
6. What is housing — a room, an allowance, or neither?
7. Is overtime paid, and how is it approved?
8. When is the first salary paid after joining?

Do not apologise for asking. A serious employer has these numbers. A chat that refuses to write them down is not a serious employer. More detail: [Housing, allowances, and offers](/blog/housing-allowances-and-offers-in-the-gulf).

## Questions about status and paperwork

9. Which legal entity will be on the labour contract?
10. Who files the work permit — the employer, or a third party I must pay?
11. If I am already in the UAE, is this a transfer or a new visa?

If the answer to (10) is “you pay our agent in cash,” stop. Official UAE processes are described on [MoHRE](https://www.mohre.gov.ae) and [u.ae jobs](https://u.ae/en/information-and-services/jobs). A private board cannot replace those pages.

## Questions about leaving

12. What is the notice period in the contract?
13. What happens to housing if employment ends?
14. Are there deductions besides lawful ones you can name?

You are not being negative. You are checking that the story has an end as well as a start.

## What not to ask first

Do not open with “can my cousin also come?” Do not ask the interviewer to break a rule. Do not record the call secretly if the other party has not agreed — laws differ, and it is a bad way to start.

## After the interview

Send a short thank-you email restating the wage split and start date as you heard them. If they correct you, that email is evidence. If they never write, you still have a record of what you asked.

If the “interview” required remote-access software, a gift card, or a passport selfie, it was not an interview. Read [WhatsApp job offers](/blog/whatsapp-job-offers) and [report](/report) if a HiredFrex listing was the bait.

Related: [UAE interview guide](/guides/uae-interviews), [Start here](/blog/start-here-gulf-job-search), [Documents to prepare](/blog/documents-to-prepare-before-overseas-work).

## Write the answers down the same day

A question you asked is only useful if you can compare it with the offer letter. The reading order for that PDF is [How to read a UAE offer letter](/blog/how-to-read-a-uae-offer-letter). The first-day routine is [What to do in the 24 hours after a Gulf interview](/blog/what-to-do-in-the-24-hours-after-a-gulf-interview).

## If they will not answer

Silence is an answer. You can still apply. You should not resign, buy a ticket, or pay a typing fee on silence. Official permit steps remain on [MoHRE](https://www.mohre.gov.ae).
`
	},
	{
		id: "post_docs",
		slug: "documents-to-prepare-before-overseas-work",
		title: "Documents to prepare before you apply for overseas work",
		excerpt: "A staged document list: what belongs on a first application, what waits for a written offer, and what should never sit in a WhatsApp chat.",
		category: "Getting started",
		author: "Paul Mensah",
		authorPhoto: "/authors/paul.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-19",
		updatedOn: "2026-09-19",
		readMinutes: 11,
		body: `People either send everything on day one or send nothing until a plane ticket appears. Both habits cause damage. This is a staged list for Gulf and other overseas operational jobs. It is editorial guidance, not a government form. For UAE procedures use [MoHRE](https://www.mohre.gov.ae).

## Stage A — first application (safe to prepare now)

- A one- or two-page CV without passport numbers ([format guide](/blog/uae-cv-format-what-recruiters-expect))
- A working email you check
- A phone number with country code
- A simple list of certificates (name, issuer, year)
- Your current city and visa status in one line

That is enough to apply on HiredFrex. You do not need to attach a passport.

## Stage B — after a named interviewer exists

- Scans of education certificates
- Scans of experience letters you actually have
- A police-clearance certificate only if the employer or the destination country requires it *in writing*
- Professional licences (security, food safety) if the listing named them

Send these through the channel the employer named — a company-domain email or an official portal — not a personal Gmail that appeared after the interview.

## Stage C — after a written offer, before you travel

- Passport with enough validity (the employer or the government portal will state the rule)
- Medical steps the **destination process** requires — arranged as they instruct, not as a WhatsApp clinic with a prepayment to a personal account
- Photos to the specification they send
- Family documents only if dependants are actually part of the contract

If Stage C is demanded at Stage A, treat it as a [scam red flag](/blog/international-job-scams-red-flags).

## What never belongs in a first chat

- Passport bio page
- National ID both sides
- Bank statements or card photos
- Signed blank paper
- Other people’s documents
- Money

Keep a paper folder or a locked drive. Name files clearly: Priya-Kumar-CV.pdf, not final-final-2.jpg.

## Attestation and “agents”

Some destinations require attested documents. Attestation is a state process (foreign ministry / embassy), not a product a stranger sells in a PDF. If an agent wants cash to “skip attestation,” they are selling you a story. Confirm the actual requirement on an official page for that country.

## How HiredFrex stores what you upload

Applications on this site may include a CV file. You can ask us to delete stored CV files; the operator has SQL to wipe historic CV data without deleting published articles or jobs. Do not put ID numbers in the CV in the first place.

## A packing list that is not documents

Once the offer is real: copies of the offer letter, emergency contacts, enough medicine for the first weeks, and a plan if housing is not what was described. That is ordinary caution, not suspicion.

Related: [Overseas employment documents guide](/guides/overseas-employment-documents), [Start here](/blog/start-here-gulf-job-search), [Official UAE channels](/blog/official-uae-job-channels), [WhatsApp job offers](/blog/whatsapp-job-offers).

## What HiredFrex stores, and what we will wipe

CV text on an application is visible to that employer and to you. It is not a public page. If you want stored CVs erased, ask at support@hiredfrex.com. Published jobs and articles stay. See the [Privacy Policy](/privacy).

## Naming and sending

Firstname-Lastname-CV.pdf is enough. Do not put a passport number in the filename. Do not send a zip of every certificate before anyone asked. After a written offer, use the employer’s legal name on any attestation step. [How to read a UAE offer letter](/blog/how-to-read-a-uae-offer-letter).
`
	}
];
/** Additional original desk pieces dated inside 8–19 Sep 2026 (no future dates). */
var MORE_POSTS = [
	{
		id: "post_company_name",
		slug: "how-to-check-a-uae-company-name",
		title: "How to check a UAE company name before you apply",
		excerpt: "A trading name on a job ad is not a licence. This is the sequence HiredFrex uses when an employer name looks familiar, cloned, or incomplete — and the official pages you should open yourself.",
		category: "How we work",
		author: "Nour El-Sayed",
		authorPhoto: "/authors/nour.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-10",
		updatedOn: "2026-09-19",
		readMinutes: 11,
		body: `A job listing can show a hotel brand, a facilities-management name, or a two-word trading style. That string is not proof that the company exists, that it is licensed to hire you, or that the person messaging you works there. This article is the check HiredFrex runs when a name looks incomplete, and the check you should still run yourself. It is not a company-search product and not legal advice.

## Why names fail first

Most overseas applicants meet an employer as a WhatsApp display name or a job-board heading. Cloned brands are cheap to type. The United Arab Emirates publishes official information about licences and labour processes; a job board is not a substitute for that record.

On HiredFrex we store whatever legal-looking name the employer typed. We do not invent a parent company. If the listing says “Radisson” and the source is only an employer form, the page says so. We would rather look incomplete than look confirmed.

## Step 1 — Separate trading name from legal name

Ask, in writing, for:

1. The legal name that will appear on a labour contract
2. The city of the establishment
3. A public careers page or a source URL for this vacancy
4. Whether a recruitment agency is hiring on behalf of someone else

If the reply is only a logo, a hotel photograph, or “we are the official HR,” stop. A real employer can usually name the entity that pays wages.

## Step 2 — Open official pages, not screenshots

For UAE labour and job information, start with government sites:

- [MoHRE](https://www.mohre.gov.ae)
- [UAE government: jobs](https://u.ae/en/information-and-services/jobs)
- [MoHRE: recruiting a worker from overseas](https://mohre.gov.ae/en/services/recruiting-a-worker-from-overseas-2022)

Those pages describe how an employer files a work permit. They do not list HiredFrex vacancies. If someone tells you that paying them is “the MoHRE fee,” ask for the official service page and a receipt in the employer’s name.

Trade-licence checks belong on the relevant emirate’s economic-department channels, not on a PDF a stranger emailed you. If you cannot find the legal name on a government or company domain, treat the listing as unverified even if the brand is famous.

## Step 3 — What HiredFrex actually records

On each public job we store:

- The employer-submitted name
- A source URL if we have one
- A review label: completeness reviewed, source confirmed, or employer confirmed

Completeness reviewed means we checked fields, contradictions, and common scam patterns. It does not mean we opened a trade licence. Source confirmed means there was a public vacancy URL at review time. Employer confirmed is rare in the current sample; we only use it when identity was actually confirmed.

Read the policy: [How HiredFrex reviews listings](/how-we-verify) and [What reviewed means](/blog/what-reviewed-means-on-hiredfrex).

## Step 4 — Agency versus employer

Some genuine Gulf hires go through an agency. That is allowed. What is not allowed on HiredFrex is hiding the end employer, charging the candidate a placement fee, or using a cloned brand to collect passport scans.

If an agency is hiring for a hotel, the listing should say so. If it cannot name the hotel’s legal entity, we will not invent one in the “about the employer” box.

## Step 5 — Names that trigger extra caution

We unpublished older catalogue pages that used major brand names without a vacancy source. We would rather have fewer jobs than a page that looks like Hilton, Oracle, or a ministry. If you still see a familiar brand on this site, open the verification panel. If the source URL is missing, the brand is a string, not a confirmation.

A mismatch between the job title, the city, and the employer name is also a flag. “Remote security officer, Dubai, for a famous bank” is three claims. Each one needs support.

## What you should never send while the name is still a guess

- Passport bio page
- Emirates ID back
- Bank account
- Remote-access software
- A fee, gift card, or cryptocurrency

A CV and a covering note are enough to apply on HiredFrex. See [Documents to prepare before overseas work](/blog/documents-to-prepare-before-overseas-work).

## A short worked example

Suppose a listing says “Security Officer — PRIVE Facilities — Dubai,” salary blank, source “employer-submitted.” That is how several current sample jobs look. You can still apply if the role matches you. You should not tell a friend “HiredFrex verified PRIVE.” We did not. We completeness-reviewed the fields.

If a person then messages you as “PRIVE HR” on WhatsApp and asks for 1,200 dirhams to “open the visa file,” that is a fee-for-a-job pattern. Report it. The US Federal Trade Commission’s consumer rule is the same idea: do not pay for the promise of a job ([FTC: Job scams](https://consumer.ftc.gov/articles/job-scams)).

## After an offer

A written offer should carry the legal employer name, wage, city, and who files the work permit. If the letterhead and the job-board name disagree, ask which one will appear on the labour contract. Then read [How to verify a job offer](/guides/verify-a-job-offer) before you resign.

Related: [Official UAE job channels](/blog/official-uae-job-channels), [International job scams](/blog/international-job-scams-red-flags), [Why we unpublished brand-name vacancies](/blog/why-we-unpublished-brand-name-vacancies).`
	},
	{
		id: "post_no_salary",
		slug: "why-hiredfrex-will-not-invent-a-salary",
		title: "Why HiredFrex will not invent a salary range",
		excerpt: "Blank pay on a listing is information. Filling it with a “typical UAE security salary” would make the page look finished and make the number look like ours. We refuse that edit.",
		category: "How we work",
		author: "Paul Mensah",
		authorPhoto: "/authors/paul.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-11",
		updatedOn: "2026-09-19",
		readMinutes: 10,
		body: `Readers ask us to “just put a typical salary” on jobs that arrived without one. We will not. This article explains why, what you should read instead, and how advertised pay on HiredFrex is allowed to appear.

## The temptation

A page with a salary looks more complete. It also attracts more clicks. If we typed “AED 3,000–4,000, typical for security,” a reviewer and a candidate would both treat that as a fact about this vacancy. It would not be a fact about this vacancy. It would be a guess wearing our label.

HiredFrex is a career desk with a small job board. The desk’s job is to say what we know. A made-up band is the opposite of that.

## What the listing is allowed to show

Pay on a public HiredFrex job is one of:

- A figure or range the employer wrote, with currency
- “Not provided by the employer”

We may flag missing currency, internal contradictions (monthly number labelled as annual), or a number that is only a placeholder. We do not replace a blank with a market average.

If an employer later adds a salary, the job page should change on that date, not silently.

## Why “market average” pages fail people

Search results are full of “average security guard salary in Dubai” tables. Many of them do not say the sample, the year, the housing situation, or whether overtime is included. Presenting that as the pay for a specific listing would be misrepresentation.

The UAE publishes official labour information through [MoHRE](https://www.mohre.gov.ae) and [u.ae](https://u.ae/en/information-and-services/jobs). Those sites are the place for government rules. They are not a licence for a job board to invent wages.

Our [market report](/market-report) only summarises advertised figures that are already in this database, with sample size and currency limits. If the sample is small, the page says so. If a category has no advertised pay, we do not draw a chart anyway.

## How this interacts with review labels

Missing salary is often why a listing stays at completeness reviewed rather than looking “premium.” That is intentional. A completeness review can pass a job that is honestly incomplete. It should fail a job that hides a fee or contradicts itself.

We would rather you see “salary not provided” and decide not to apply than see a comforting number we made up.

## What you should ask the employer

If you still want the role, ask in writing:

1. Basic monthly wage, in which currency
2. Whether housing, food, or transport is provided, and whether it is deducted
3. Overtime rules, if any
4. What appears on the labour contract versus what is “allowance”

If they will only discuss pay on WhatsApp after you send a passport, that is a process problem, not a negotiation style. See [WhatsApp job offers](/blog/whatsapp-job-offers).

## Housing and allowances are not a secret second salary

Some Gulf offers split basic pay and allowances. That split matters for overtime and for end-of-service calculations. If we invented a single “package” number, we would hide the split. We do not do that. Read [Housing, allowances, and offers](/blog/housing-allowances-and-offers-in-the-gulf).

## Advertising does not write these numbers

If HiredFrex later shows ads, those ads will not be allowed to fill a salary field. Editorial copy and listings stay in our control. The privacy and cookie pages describe advertising cookies; they do not describe wages.

## A note to employers

Post the pay if you can. Candidates from abroad budget flights, notice periods, and family transfers. A blank looks like a filter, and it is. If pay is genuinely grade-based and not yet set, write that sentence. Do not ask us to “put something typical.”

Related: [UAE 2026 wage rules we can confirm](/blog/uae-2026-wage-rules-what-we-can-confirm), [How we review listings](/how-we-verify), [Editorial standards](/editorial-standards).

## What candidates should do instead of asking us for a typical number

Ask the employer, in writing, for basic wage and currency. Compare that with the offer letter. If they will only talk numbers after a passport scan, that is a process problem. Official labour pages remain [MoHRE](https://www.mohre.gov.ae). We will keep the listing honest even if that means it looks unfinished.
`
	},
	{
		id: "post_unpublished_brands",
		slug: "why-we-unpublished-brand-name-vacancies",
		title: "Why we unpublished brand-name vacancies without a source",
		excerpt: "Older HiredFrex catalogue pages used famous hotel and corporate names without a public vacancy URL. We took those pages down. This is what we will put back, and what we will not.",
		category: "How we work",
		author: "Paul Mensah",
		authorPhoto: "/authors/paul.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-12",
		updatedOn: "2026-09-19",
		readMinutes: 10,
		body: `If you used HiredFrex earlier this year, you may remember listings that named large hotels or technology employers. Those pages are gone. We unpublished them because we could not show a vacancy source. This article is the public record of that decision so nobody has to guess.

## What was wrong

A job board can type any brand. Search engines and applicants treat a familiar name as a signal that the role is real. When we cannot point to the employer’s own careers page, a government portal, or another public source we recorded, the brand is decoration.

Decoration that looks like a vacancy is a content-quality problem. It is also a trust problem. People forward “Hilton is hiring on HiredFrex” in group chats. If the underlying page was a catalogue stub, we helped the rumour.

## What we did instead of redirecting

We did not 301 those URLs to the homepage. A redirect would have told crawlers and readers that the brand job “moved.” It did not move. It was not substantiated. Removed jobs on this site stay removed. The 404 page says the URL is not a live HiredFrex page.

That is slightly worse for vanity metrics and slightly better for honesty.

## What a brand listing needs to return

To publish a named-brand vacancy now we need, at minimum:

- A complete employer form (title, city, workplace type, how to apply)
- No candidate fee
- No placeholder copy (“lorem”, “test job”, “as per company policy” as the whole description)
- A public source URL, or a confirmation of employer identity

Until one of those last items exists, the highest public label is completeness reviewed, and we still may refuse famous names that we cannot support. See [How we review listings](/how-we-verify).

## Why this is not anti-employer

Employers can post. The [employer posting](/employers) flow is open. We block fees, remote labels on physical work, and empty descriptions. We do not block a hotel because it is a hotel. We block a hotel name used as bait.

If you actually hire for a brand property, send the careers URL or post from an account we can associate with that entity. We will label whatever we actually checked.

## What candidates should do with old screenshots

If you saved a HiredFrex link from before this cleanup, open it. If it 404s, the job is not here. Do not treat a screenshot as an offer. If someone is still messaging you using that job title, ask for a written employer name and apply only on a live page.

Report cloned follow-up messages with the [report form](/report).

## Thin location and category pages

We also refuse to manufacture “Jobs in Ajman” essays just to rank for a city. Filter pages that exist are noindexed. If a city has no live listings, the page says so and points you to the full board and to official UAE channels.

Google’s own publisher rules ask for original content that gives people a reason to visit. City doorways without jobs are not that.

## What remains on the board

The public sample is small on purpose: current on-site roles with honest labels, including missing salaries. A short board with sources beats a long board of invented brands.

If you want volume, use official channels in parallel: [MoHRE](https://www.mohre.gov.ae) and [u.ae jobs](https://u.ae/en/information-and-services/jobs). HiredFrex is a desk you can read, not a ministry.

Related: [How to check a UAE company name](/blog/how-to-check-a-uae-company-name), [What reviewed means](/blog/what-reviewed-means-on-hiredfrex), [Start here](/blog/start-here-gulf-job-search).

## What we tell people who bookmarked the old URLs

The page is gone. A 404 is the correct ending. If a recruiter still uses that job title in chat, ask for a live HiredFrex URL or a company-domain careers link. Screenshots of unpublished pages are not offers. Report clones with the [report form](/report).
`
	},
	{
		id: "post_airport_hotel",
		slug: "airport-and-hotel-security-jobs-are-not-the-same",
		title: "Airport and hotel security jobs are not the same listing",
		excerpt: "Both roles may say “security officer.” The site, the licence expectations, the shift pattern, and the grooming rules are different. Here is how HiredFrex reads those ads, and the questions you should still ask.",
		category: "Security",
		author: "Amira Hassan",
		authorPhoto: "/authors/amira.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-13",
		updatedOn: "2026-09-19",
		readMinutes: 11,
		body: `Applicants often treat every “security officer, Dubai” line as interchangeable. Employers do not. An airport pass, a hotel loading bay, and a residential tower use different procedures. Mixing them on a CV, or applying to all of them with the same paragraph, wastes interviews. This is how we read those listings on HiredFrex.

## What the job title hides

“Security officer” is a category, not a task list. On this site we keep the employer’s title and we tag the category as Security when the work is protective or access-control. We do not rewrite the title to sound more senior, and we do not add “SIRA” or “airport pass” unless the employer wrote it.

If a listing is silent on the site type, that silence is a fact. Do not assume it is a hotel because the company name includes “hospitality,” and do not assume it is an airport because the city is Dubai.

## Hotel and serviced-property work

Typical employer copy mentions guest areas, loading bays, CCTV, incident logs, and grooming. It is still on-site work. If someone labels it remote, our checks should catch that.

Ask:

- Which property, and which entrance, is the post?
- Is this in-house security or a facilities contractor?
- What licence or card is required on day one versus after joining?
- Is accommodation provided, deducted, or neither?

HiredFrex will not invent a housing allowance on a hotel security page. See [Housing, allowances, and offers](/blog/housing-allowances-and-offers-in-the-gulf).

## Airport and critical-infrastructure work

Copy here often mentions passes, airside or landside, shift handover, and stricter background checks. A contractor may hire you weeks before a pass is granted. That delay is not a visa. It is a site-access process.

Ask who the legal employer is (the contractor or the airport entity), who files the work permit, and what happens if the pass is refused. If the recruiter cannot answer those, you do not yet have a job.

We do not have a side channel into airport HR. If a listing claims “guaranteed airside pass,” treat that as a claim we have not confirmed.

## Residential, retail, and events

These posts are often contractor roles with rotating sites. The listing should say whether you stay at one building or move. “Dubai” is not an address. If the employer will not name even a district, completeness review can still publish the page, and you should still ask.

## What we flag

- Remote or hybrid workplace on a physical post
- Candidate fees
- Famous airport or hotel brands with no source URL
- Salary missing — we leave it missing
- Copy that is only “as per company policy”

The security sample on the board includes contractor-style roles with honest labels. Read the verification panel before the apply form.

## How to write the CV for one of these jobs

Use the [UAE CV format](/blog/uae-cv-format-what-recruiters-expect). Put the site type in the profile line: “Hotel security, night shift, incident reporting” is clearer than “vigilant team player.” Do not list an airport pass you do not hold. Do not list a licence number on the CV if the document can be stolen from a PDF.

## Interviews

Supervisors tend to ask about a conflict, a procedure you followed, and whether you can work the roster. They also ask about visa status. Answer in one sentence. Lying about a current visa is a faster rejection than “I would require sponsorship.”

Questions that belong to you are in [Questions to ask in a Gulf job interview](/blog/questions-to-ask-in-a-gulf-job-interview).

## After an offer

Security offers should state the site, the roster, the wage, and the legal employer. If the letter says “various sites in the UAE” and the ad said one hotel, that is a different job. Verify before you travel. [How to verify a job offer](/guides/verify-a-job-offer).

Related: [Entry-level jobs in the UAE](/blog/entry-level-jobs-in-the-uae), [Official UAE channels](/blog/official-uae-job-channels), [UAE security jobs guide](/guides/uae-security-jobs).

## Contractor versus in-house

Many genuine posts are contractor roles wearing a site uniform. Ask who pays you. The labour contract name is the name that matters for a work permit. HiredFrex will not rewrite a contractor into a hotel group to make the page look famous.
`
	},
	{
		id: "post_after_interview",
		slug: "what-to-do-in-the-24-hours-after-a-gulf-interview",
		title: "What to do in the 24 hours after a Gulf job interview",
		excerpt: "A thank-you note is optional. Writing down what was promised, who the employer is, and what they asked you to send is not. This is the desk’s after-interview routine.",
		category: "Interviews",
		author: "Amira Hassan",
		authorPhoto: "/authors/amira.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-16",
		updatedOn: "2026-09-19",
		readMinutes: 10,
		body: `The useful work after an interview is not performance. It is a record. People lose money when a verbal “we will arrange the visa” turns into a request for cash, or when they resign on a WhatsApp voice note. This is the sequence we recommend in the first day. It is editorial guidance, not a placement service.

## Before you leave the call or the lobby

Write down, while it is still in your head:

- The interviewer’s name and role
- The legal employer they named (or the fact that they did not)
- Location of the post
- Pay, housing, and roster if discussed
- What they asked you to send next
- What they said about the work permit

If they refused to put pay in writing, that is part of the record too.

## The first email you send

A short factual note is enough. Restate the role, the site, and the documents they requested. Do not attach a passport because the conversation felt friendly. Apply and upload files on HiredFrex when the listing accepts applications here, so you keep a copy.

If they asked you to move the conversation to WhatsApp, read [WhatsApp job offers](/blog/whatsapp-job-offers) before you agree.

## Documents: the 24-hour rule

A CV you already used is fine. Identity documents are not a first-day default.

Wait for a written next step from the employer domain or from the HiredFrex thread. If they want a passport scan the same afternoon, ask why, and ask how they will store it. People impersonating HR collect documents in bulk.

See [Documents to prepare before overseas work](/blog/documents-to-prepare-before-overseas-work).

## Offers that arrive the same day

Speed is not proof. A same-day offer should still carry:

- Legal employer name
- Job title matching the interview
- Wage and currency
- City
- Who files the work permit

If the PDF looks scanned from another candidate, or the letterhead does not match the name they used on the call, stop. [How to verify a job offer](/guides/verify-a-job-offer).

## Fees that appear after “you passed”

This is the common pivot. The interview was real-sounding. Then a coordinator asks for medical cash, “Emirates ID typing,” or a “visa file.” In the UAE, the employer side of a work permit is not something you buy from a stranger’s IBAN. Start at [MoHRE](https://www.mohre.gov.ae) and [u.ae jobs](https://u.ae/en/information-and-services/jobs).

The FTC’s consumer rule still applies if you are applying from abroad: do not pay for the promise of a job ([FTC: Job scams](https://consumer.ftc.gov/articles/job-scams)).

Report the listing if it is on HiredFrex.

## If you are already working in the UAE

Note your notice period and whether a transfer is even possible on your current status. Do not resign on the day of the interview. A verbal “start Sunday” is not a permit.

## If you interviewed through HiredFrex

Keep the thread. Do not also pay a facilitator to “speed up” the same application. Our editors cannot see every WhatsApp group; we can see a report. Use [report](/report) and [contact](/contact).

## What not to post on social media

Do not post the interviewer’s phone number, a photo of the office badge, or “I got the Dubai job” before you have a written offer. It helps impersonators more than it helps you.

Related: [Questions to ask in a Gulf job interview](/blog/questions-to-ask-in-a-gulf-job-interview), [How AI CV screening works](/blog/how-ai-cv-screening-works), [International job scams](/blog/international-job-scams-red-flags).

## If they go silent

Silence after a screen is common. Do not pay anyone to “chase HR.” Do not send new identity documents to a second number that appeared overnight. Apply to other completeness-reviewed roles if they fit. Keep the notes from this interview for the next one.
`
	},
	{
		id: "post_cloned_name",
		slug: "how-to-report-a-cloned-employer-name",
		title: "How to report a cloned employer name on HiredFrex",
		excerpt: "If someone is using a hotel, hospital, or facilities name that does not match the listing, send us the URLs and the chat. This is what we can do, what we cannot do, and what you should do in parallel.",
		category: "Scam awareness",
		author: "Amira Hassan",
		authorPhoto: "/authors/amira.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-17",
		updatedOn: "2026-09-19",
		readMinutes: 10,
		body: `Cloned employer names are the most common complaint we receive after “they asked me to pay.” A listing looks ordinary. Then a second person appears in chat using the same hotel name, a slightly different email, and a sense of urgency. This article is the reporting path on HiredFrex and the limits of that path.

## What “cloned” means here

We use it when a message, email, or parallel ad borrows a real company’s name, logo, or job title without being that company. We do not use it as a legal finding. We are not a court. We can unpublish a page and keep a record of the report.

## What to send us

Use the [report form](/report) or [contact](/contact). Include:

- The HiredFrex job URL
- The chat export or screenshots (phone numbers can be partly masked)
- The email headers if you have them
- Any payment request (amount, method, what they called the fee)
- Whether you already sent a passport copy

You do not need to create a dramatic narrative. URLs and dates are more useful.

## What we will do

1. Open the listing
2. Compare the reported contact path with the apply path we host
3. Unpublish if the page is being used as bait, or if the employer-submitted copy cannot stand
4. Keep the job off search if we removed it — no homepage redirect that would hide the removal
5. Reply when we can; we are a small desk

We will not call a hotel’s switchboard to mediate your dispute. We will not recover money. We will not confirm to a WhatsApp group that “HiredFrex verified this company.”

## What you should do in parallel

If money moved, contact your bank or wallet operator the same day. If you are in the United States or dealing with a US-facing scam pattern, the FTC explains how to report job scams ([FTC: Job scams](https://consumer.ftc.gov/articles/job-scams)). If you are in the UAE, use official channels for labour and fraud reporting rather than paying a “recovery agent.”

Do not download remote-access software because someone offered to “fix the visa file.”

## How this relates to our labels

A completeness-reviewed job can still be cloned afterwards. Labels are not a lifetime guarantee. That is why job pages show a last-reviewed date and why reports can take a page down.

If we only completeness-reviewed the fields, the page already said we did not confirm employer identity. A clone does not contradict that label; it proves why the label exists.

Read [What reviewed means](/blog/what-reviewed-means-on-hiredfrex) and [How we review listings](/how-we-verify).

## Employers reading this

If someone is impersonating your company on HiredFrex, write to support@hiredfrex.com from a domain we can associate with you, with the URLs. We still need to check; a convincing email can also be cloned. Public careers-page links help.

Do not ask us to add a decorative “verified” badge as a marketing asset. We only use employer confirmed when identity was actually confirmed.

## Candidates: do not amplify the clone

Forwarding the fake WhatsApp number in a group with “is this real?” spreads the number. Send it to us and to official reporting channels instead.

Related: [How to check a UAE company name](/blog/how-to-check-a-uae-company-name), [WhatsApp job offers](/blog/whatsapp-job-offers), [Why we unpublished brand-name vacancies](/blog/why-we-unpublished-brand-name-vacancies).

## What we will not do with your report

We will not publish your chat dump. We will not name you to the employer without a reason. We will not issue a press statement. The useful public outcome is a missing page, not a drama thread. If the listing stays up, we judged the ad itself still accurate; the clone may be off-platform only.
`
	},
	{
		id: "post_offer_letter",
		slug: "how-to-read-a-uae-offer-letter",
		title: "How to read a UAE offer letter without pretending to be a lawyer",
		excerpt: "An offer is a document with names, numbers, and a city. This is the desk’s reading order: legal employer, wage split, site, permit, and what to do if those lines are missing. Not legal advice.",
		category: "Offers",
		author: "Nour El-Sayed",
		authorPhoto: "/authors/nour.svg",
		coverUrl: "",
		published: true,
		indexable: true,
		publishedOn: "2026-09-18",
		updatedOn: "2026-09-19",
		readMinutes: 12,
		body: `A screenshot of a table in WhatsApp is not an offer. A PDF with a wage, a legal name, and a city might be. This article is how HiredFrex tells readers to read that PDF. It is not a substitute for advice from a licensed professional, and it is not a promise that any one letter is enforceable.

## First line: who employs you

Find the legal name of the employer. A hotel brand, a mall name, or “the company” is not enough. The labour contract and the work permit sit with an entity. If the letterhead, the email domain, and the HiredFrex listing all disagree, ask which name will appear on the government filing.

Official process pages live at [MoHRE](https://www.mohre.gov.ae) and [UAE government: jobs](https://u.ae/en/information-and-services/jobs). We are not those sites.

## Second line: the job and the site

The title should match what you interviewed for. “Security officer” versus “security supervisor” is not a rounding error. The city should be a city, not “UAE / GCC.” If the ad was one hotel and the letter says “any site as required,” that is a different job. Say so in writing.

## Third line: money, split out

Look for:

- Basic wage
- Currency
- Pay period
- Housing, food, or transport — provided, paid, or deducted
- Overtime
- Probation

If the letter shows only a single “package” number, ask for the basic wage. Allowances can change overtime and end-of-service math. HiredFrex will not invent the split on the job page either. [Why we will not invent a salary](/blog/why-hiredfrex-will-not-invent-a-salary) and [Housing, allowances, and offers](/blog/housing-allowances-and-offers-in-the-gulf).

## Fourth line: who files the work permit

The employer side of a UAE work permit is not a product you buy from a broker. If the letter says you must pay a typing centre, a “visa consultant,” or a personal IBAN to start the file, treat that as a warning. Read the official overseas-recruitment page on MoHRE rather than a forwarded JPEG.

If you are already in the UAE, the letter should be compatible with a transfer or a new filing. Verbal “HR will handle” is not a filing.

## Fifth line: what you must not be asked to pay

Candidates should not pay HiredFrex to apply. They should not pay a stranger for the promise of this job. Medicals and attestations that happen after a real filing are a different category from “processing fees” collected on chat. When unsure, stop and use [report](/report).

The FTC’s public guidance on job scams is written for a US audience and still describes the same fee pattern ([FTC: Job scams](https://consumer.ftc.gov/articles/job-scams)).

## Sixth line: dates and conditions

Probation length, notice, and a start date that depends on a permit should be written. A start date next week while you are still abroad is a claim. Ask what happens if the permit is delayed.

## How this sits next to a HiredFrex listing

The listing is not the offer. Completeness reviewed means we checked the ad, not the PDF you received later. If the offer contradicts the listing (different city, a fee, a new company name), believe the contradiction and write to us.

## A reading order you can reuse

1. Legal employer
2. Title and site
3. Basic wage and currency
4. Allowances and deductions
5. Who files the permit
6. Fees
7. Probation and start conditions
8. Compare with the HiredFrex page
9. Only then give notice at your current job

Related: [How to verify a job offer](/guides/verify-a-job-offer), [Documents to prepare](/blog/documents-to-prepare-before-overseas-work), [Official UAE job channels](/blog/official-uae-job-channels).

## When to get licensed advice

If the letter is in a language you cannot read, if it ties you to a loan, or if it asks you to sign a blank annex, stop and get advice from a licensed professional or an official channel. HiredFrex will not interpret a specific contract as a lawyer. We will tell you which lines are missing.
`
	}
];
var g = globalThis;
var SEED_ID = "v4-adsense-ready";
async function ensureSeed() {
	if (!g.__hfSeed__) g.__hfSeed__ = runSeed().catch((err) => {
		g.__hfSeed__ = void 0;
		throw err;
	});
	return g.__hfSeed__;
}
async function runSeed() {
	const sql = await getSql();
	if (!((await sql`select id from seed_meta where id = ${SEED_ID}`).length > 0)) {
		await sql`
      update jobs
      set status = ${"closed"}, indexable = false, updated_at = now()
      where posted_by_user_id is null
    `;
		for (const e of SEED_EMPLOYERS) await sql`
        insert into employers (id, name, website, city, country, about, source_note)
        values (${e.id}, ${e.name}, ${e.website}, ${e.city}, ${e.country}, ${e.about}, ${e.sourceNote})
        on conflict (id) do update set
          name = excluded.name,
          about = excluded.about,
          source_note = excluded.source_note,
          city = excluded.city,
          country = excluded.country
      `;
		for (const j of SEED_JOBS) await sql`
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
		await sql`insert into seed_meta (id) values (${SEED_ID}) on conflict (id) do nothing`;
	}
	for (const a of STAFF_AUTHORS) await sql`
      insert into authors (id, name, title, bio, photo)
      values (${a.id}, ${a.name}, ${a.title}, ${a.bio}, ${a.photo})
      on conflict (id) do update set
        name = excluded.name,
        title = excluded.title,
        bio = excluded.bio,
        photo = excluded.photo
    `;
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
//#endregion
export { ensureSeed as t };

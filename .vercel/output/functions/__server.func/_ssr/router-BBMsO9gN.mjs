import { o as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as CATEGORIES, o as SITE_URL, t as ADSENSE_PUB } from "./site-D_EzqXMW.mjs";
import { n as pageHead } from "./seo-BYC44w_4.mjs";
import { H as require_react, V as notFound, _ as createRootRoute, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { n as auth } from "./server-Cr7Gh9dN.mjs";
import { n as STAFF_AUTHORS, r as authorById } from "./authors-DJCyIZjS.mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-B2Izd0c7.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/jobs-DtEE3Nmy.js
var listPublicJobs = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(createSsrRpc("d8631004516eb777c00b91d285abc35f839ab3a0e4468b97b1f5fbb461413f86"));
var getPublicJob = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("d29105bf62b71b45a6ab01b0f373a613e5aa277ed83aeefe26f33ba054379a06"));
createServerFn({ method: "GET" }).handler(createSsrRpc("06d047be283222e02f206f631610ee24c968a6a54c9e444fb1400a62ea48e76b"));
var jobFacets = createServerFn({ method: "GET" }).handler(createSsrRpc("41e8fd00fe67f4e794da5c2a334fd91a9c926f0c01c36ebe0bee53f32fcb9b26"));
var relatedJobs = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("fb4345a38e2b8f5ea1d30345c23d9862bdac4934dd7214ce828d4d2a389d8d5a"));
var allIndexableUrls = createServerFn({ method: "GET" }).handler(createSsrRpc("00f681b823d23827702961249a576a131b736665d80d2675af5830054f3084a7"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/blog-eiytMZPL.js
var listPosts = createServerFn({ method: "GET" }).handler(createSsrRpc("7a45fa43fa6f6d0c5d01eda75f3f6b5e7d3a35bba8e382c915ede75a06b750a8"));
var getPost = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("277118b47559f5bc7c588a591aec2e834d1aaa79d69bd63975e63852e395a9ef"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/guides-BPDmlssc.js
var GUIDES = [
	{
		slug: "uae-job-search",
		title: "UAE job search guide",
		excerpt: "A working sequence for UAE applications: official channels, a CV matched to one job, an honest listing, and an offer you can read. HiredFrex is not a ministry.",
		updated: "2026-09-19",
		minutes: 14,
		body: `This guide is for people targeting work in the United Arab Emirates using HiredFrex and official government channels. It is editorial information, not a recruitment contract and not legal advice. If a sentence here disagrees with MoHRE or u.ae, the government page wins.

## What HiredFrex can and cannot do

HiredFrex can show employer-submitted listings, label what we checked, host your application, and publish original articles. We cannot issue a work permit, sell a visa, or confirm that a named company will hire you.

Work permits and residence visas are government processes. Start with:

- [MoHRE](https://www.mohre.gov.ae)
- [UAE government: jobs](https://u.ae/en/information-and-services/jobs)
- [MoHRE: recruiting a worker from overseas](https://mohre.gov.ae/en/services/recruiting-a-worker-from-overseas-2022)

A longer version of this sequence, with HiredFrex labels in a table, is in [Start here: a Gulf job search](/blog/start-here-gulf-job-search).

## Pick a city you can actually live in

Dubai, Abu Dhabi, Sharjah, Ajman, and the other emirates are not interchangeable for housing or commuting. Search [jobs](/jobs) by title and city, not by “any Gulf job.” Filter pages for empty cities are noindexed on purpose. We will not write doorway essays titled “Jobs in [city]” just to rank.

If you are still abroad, write that fact on the CV in one line. Hiding it wastes interviews.

## Read the listing like an editor

Open the verification panel before the apply form.

| Label | Meaning on this site |
| --- | --- |
| Completeness reviewed | Fields, contradictions, and common scam patterns were checked. Employer identity was not independently confirmed. |
| Source confirmed | We recorded a public vacancy URL. Still not a guarantee the role is open today. |
| Employer confirmed | Identity was actually confirmed. Rare in the current sample. |

If salary is blank, that is information. We will not invent a “typical security” number. See [Why HiredFrex will not invent a salary](/blog/why-hiredfrex-will-not-invent-a-salary).

## Match one CV to one job

Use the [UAE CV guide](/guides/uae-cv) and the [CV builder](/cv-builder). Put the job title from the listing in the summary. Do not invent dates. Do not put a passport number on the CV.

## Apply on the record

Apply on HiredFrex when the listing accepts applications here. Keep a copy. Do not also pay a facilitator to submit the same file. If someone using the employer’s name messages you off-platform and asks for a fee, treat it as a scam and [report the listing](/report).

## How to read advertised pay

Advertised monthly ranges on this site are not offers. They are not MoHRE WPS data. They omit overtime, housing, and deductions unless the employer wrote those in.

The [market report](/market-report) shows advertised figures from this database only, with sample size and currency limits. Small samples stay small; we do not pad them.

## Documents people usually need later

A CV is enough to apply here. After a real offer, employers commonly request a passport bio page, a photograph, and other onboarding files. Send those only through a channel you have authenticated. See [Documents for overseas employment](/guides/overseas-employment-documents).

## Mistakes that cost people money

- Paying a “visa agent” who is not the employer
- Accepting a WhatsApp offer that never appears on a company domain
- Resigning at home before the work permit exists
- Treating a completeness-reviewed HiredFrex page as “the company confirmed this”

Related: [International job scams](/blog/international-job-scams-red-flags), [Official UAE job channels](/blog/official-uae-job-channels), [How to check a UAE company name](/blog/how-to-check-a-uae-company-name).`
	},
	{
		slug: "uae-cv",
		title: "UAE CV guide",
		excerpt: "A one- and two-page structure for Gulf applications: visa line, truthful dates, and what not to attach. Use with the CV builder; do not invent jobs.",
		updated: "2026-09-19",
		minutes: 12,
		related: ["/blog/uae-cv-format-what-recruiters-expect"],
		body: `Use this with the [CV builder](/cv-builder). The longer article, with examples of what not to include, is [UAE CV format: what recruiters expect](/blog/uae-cv-format-what-recruiters-expect). This page is the working template.

## Non-negotiables

- Truthful dates and titles
- A visa or status line in plain language
- Skills that belong on the job you are applying to
- No passport numbers on the CV itself
- No invented employers, even if a writing tool suggests them

HiredFrex’s optional writing assistant is not allowed to fabricate your history. If it drafts a sentence you did not live, delete it.

## Suggested order

1. Name, phone with country code, email, city, nationality, visa line
2. Three-line profile aimed at this job title
3. Experience, newest first, with city and month-year dates
4. Education and licences you can produce
5. Skills and languages
6. Certificates that you can show if asked

Print or export as PDF. Then apply from the listing, not from a bulk email.

## The visa line, written plainly

Examples that are honest:

- “Based in Accra; would require employer sponsorship.”
- “UAE residence visa, transferable, notice 30 days.”
- “Visit visa in Dubai until [month]; not a work permit.”

Do not write “UAE visa in process” if the process is a WhatsApp broker. That sentence has misled employers and burned applicants.

## Length

One page is enough for most entry and mid operations roles. Two pages if you have supervisory history that actually maps to the vacancy. A five-page autobiography is not a Gulf operations CV.

## What not to attach to the PDF

Photographs are optional and cultural; they are not a substitute for experience. Do not embed your passport, Emirates ID, or bank IBAN in the CV. Those belong later, after a written next step. See [Documents for overseas employment](/guides/overseas-employment-documents).

## Matching the listing

If the job is hotel housekeeping, lead with housekeeping. If it is airport security, do not lead with retail cashier work unless that is all you have — then say so in one honest line. Automated screens and tired humans both bounce generic profiles.

Read [How AI CV screening works](/blog/how-ai-cv-screening-works) if you are applying into a large employer’s portal as well as HiredFrex.

## File naming

Use a name an employer can find: Firstname-Lastname-Security-Officer.pdf. Do not call it “final-final-CV-NEW.pdf”.

## After you export

Read the PDF on a phone. If the columns collapse or the dates wrap into nonsense, simplify. One column, black text, no text boxes.

Related: [Entry-level jobs in the UAE](/blog/entry-level-jobs-in-the-uae), [Start here](/blog/start-here-gulf-job-search).`
	},
	{
		slug: "uae-interviews",
		title: "UAE interview guide",
		excerpt: "How to prepare for on-site, video, and high-volume screens for service and operations roles — and the questions that protect you after the meeting.",
		updated: "2026-09-19",
		minutes: 12,
		body: `This is practical preparation, not a script that “beats” an employer’s process. A longer after-interview routine is in [What to do in the 24 hours after a Gulf interview](/blog/what-to-do-in-the-24-hours-after-a-gulf-interview).

## Before the interview

- Re-read the listing, including flags (missing salary, unverified employer).
- Know your notice period and whether you need sponsorship.
- Prepare one example each of: a difficult customer or incident, a time you followed a procedure, a time you asked for help.
- Confirm the legal employer name you think you are meeting.

If the listing is completeness reviewed only, you are still allowed to interview. You are not required to pretend the company was confirmed.

## Common formats in the Gulf

Operations and service roles often start with a short HR screen (availability, visa, expected pay) then a supervisor interview. Security and hospital sites may add a briefing on shift patterns and grooming standards. Marketing and office roles may ask for a work sample.

We do not have visibility into any one employer’s scorecard. If they use an automated video interview, see [AI job interviews](/guides/ai-job-interviews).

## Questions that protect you

Ask them, in writing if you can:

1. Who is the legal employer on the contract?
2. What is the basic salary, and what is housing or transport if any?
3. Is the role on-site, and at which address?
4. Who pays for the work permit?
5. What is the probation period?

If the interviewer cannot name the employer, treat the process as unverified. More questions, with why they matter: [Questions to ask in a Gulf job interview](/blog/questions-to-ask-in-a-gulf-job-interview).

## Pay conversations

If the HiredFrex page shows no salary, you may still ask. Write down the number they say. Compare it later with the offer letter. Do not let a verbal band become “HiredFrex said.” We did not.

## Afterward

A real process produces a written offer. Verify it before you travel or resign. [How to verify a job offer](/guides/verify-a-job-offer) and [How to read a UAE offer letter](/blog/how-to-read-a-uae-offer-letter).

Do not send a passport the same afternoon because the call felt warm. Do not pay a coordinator to “open the file.”

## If the interview was off-platform

HiredFrex cannot see every WhatsApp group. If the conversation started from a listing here and then turned into a fee, [report it](/report) with the job URL.

Related: [WhatsApp job offers](/blog/whatsapp-job-offers), [Airport and hotel security jobs](/blog/airport-and-hotel-security-jobs-are-not-the-same).`
	},
	{
		slug: "uae-employment-visa",
		title: "UAE employment visa guide",
		excerpt: "Where official work-permit information lives, what a job board is not allowed to sell you, and how to spot a fake “MoHRE fee.”",
		updated: "2026-09-19",
		minutes: 13,
		body: `HiredFrex does not issue visas. Anyone using our name to sell a “guaranteed UAE visa” is not us. This page exists so that sentence is public, dated, and linked from job pages.

## Official starting points

- [MoHRE](https://www.mohre.gov.ae) — private-sector labour and work permits
- [UAE government portal: jobs](https://u.ae/en/information-and-services/jobs)
- [Recruiting a worker from overseas](https://mohre.gov.ae/en/services/recruiting-a-worker-from-overseas-2022)

Those pages, not a job-board article, are the authority on fees, skill levels, and documents. We will not restate fee tables here because they go stale and are easy to get wrong.

## What a typical employer-sponsored hire involves

1. A real job offer from a UAE establishment
2. A work permit and employment-contract process through official channels
3. Residence status linked to that employment

Details (skill levels, certificate requirements, establishment category) change and depend on the occupation. MoHRE publishes occupation and skill-level material on its own site. If we cannot cite a live official page, we do not invent a number.

## What you should never pay a stranger for

- “Visa quota”
- “Medical skipping”
- “Guaranteed approval”
- A work visa with no named employer
- Gift cards, cryptocurrency, or remote-access software “to process the file”

If a HiredFrex listing’s recruiter asks for those payments, [report it](/report).

The US Federal Trade Commission describes the same fee-for-a-job pattern for a different audience ([FTC: Job scams](https://consumer.ftc.gov/articles/job-scams)).

## How this relates to a HiredFrex label

Completeness reviewed does not mean the visa will be filed. Source confirmed does not mean MoHRE has opened a file. Employer confirmed means we confirmed identity, not that a permit exists.

Read [How HiredFrex reviews listings](/how-we-verify).

## Visit visas and “just fly in”

A visit visa is not a work permit. Working on the wrong status is a government matter, not a job-board feature. We will not coach you to “start unpaid until the visa comes.” If an employer suggests that, get it in writing and take advice from official pages or a licensed professional.

## After an offer

The offer should say who files the permit. Compare that sentence with [How to read a UAE offer letter](/blog/how-to-read-a-uae-offer-letter). If the letter asks you to pay a typing centre before the employer exists on paper, stop.

Related: [UAE 2026 wage rules we can confirm](/blog/uae-2026-wage-rules-what-we-can-confirm), [Documents for overseas employment](/guides/overseas-employment-documents), [Official UAE job channels](/blog/official-uae-job-channels).`
	},
	{
		slug: "uae-security-jobs",
		title: "UAE security jobs guide",
		excerpt: "How to read security officer listings on HiredFrex: on-site work, missing salaries, site type, and documents employers often ask for later.",
		updated: "2026-09-19",
		minutes: 12,
		body: `Security work in the UAE is on-site work: gates, patrols, hospitals, residential compounds, airports, hotels. HiredFrex will not label these roles remote. A longer comparison of airport and hotel posts is in [Airport and hotel security jobs are not the same](/blog/airport-and-hotel-security-jobs-are-not-the-same).

## What is in the current sample

Public security listings at the September 2026 review include contractor-style officer roles. Some have no usable salary. Employer identity is not independently confirmed unless the page says employer confirmed. Open the live cards under [security jobs](/categories/security) and on the [jobs](/jobs) board.

## What to check on the page

- Workplace type is on-site
- Salary is a number with a currency, or explicitly “not provided”
- No application fee
- The employer name is not a cloned luxury-hotel or airport brand without a source URL
- The site type (hotel, hospital, tower, airport, events) is stated — or honestly missing

## Typical later requirements (not claimed on our listings)

Sites often later ask for a police-clearance style document and a fitness or appearance standard. If our job page does not list them, we did not invent them. Confirm with the employer after they contact you through HiredFrex.

## Licences and passes

Do not type a licence number you do not hold. Do not claim an airside pass. If the employer will arrange a card after joining, that belongs in the offer, not in your CV headline.

## Pay

Security ads are over-represented in “typical salary” spam articles. We will not paste those tables onto a listing. Ask for basic wage in writing. [Why we will not invent a salary](/blog/why-hiredfrex-will-not-invent-a-salary).

## How to apply

Prepare with the [UAE CV guide](/guides/uae-cv) and [interview guide](/guides/uae-interviews). Apply on the listing. If a parallel WhatsApp appears asking for a “visa file fee,” [report it](/report).

Related: [Entry-level jobs in the UAE](/blog/entry-level-jobs-in-the-uae), [How to check a UAE company name](/blog/how-to-check-a-uae-company-name).

## Roster honesty

Night work, split shifts, and standby should be written by the employer. If they are not on the page, we did not invent them. Ask in the interview. Write the answer down. Compare it with the offer.
`
	},
	{
		slug: "uae-hospitality-jobs",
		title: "UAE hospitality jobs guide",
		excerpt: "Service-floor roles: why unsourced brand-name hotel listings were taken down, and how to read a remaining hospitality vacancy.",
		updated: "2026-09-19",
		minutes: 11,
		body: `Housekeeping, front desk, waiter or waitress, and bell work is on-site. A listing that calls these remote fails HiredFrex review.

## Why you may not see Hilton, IHG, Hyatt, or similar names

The previous catalogue included major hotel-group names without a vacancy source. That is an impersonation risk. Those URLs were not republished. We do not redirect them to the homepage. The public explanation is [Why we unpublished brand-name vacancies](/blog/why-we-unpublished-brand-name-vacancies).

A remaining hospitality example can still be a waiter or housekeeping role at a smaller or contractor name, sometimes with salary listed as negotiable (therefore blank on our page). See [hospitality jobs](/categories/hospitality).

## How to read a hospitality listing

- Property or site named, or honestly missing
- Roster or shift notes only if the employer wrote them
- Grooming or language requirements only if written
- Housing only if written — we do not assume “hotel staff housing”

## How to apply

Use a one-page CV that shows shift work and guest-facing duties you actually did. Do not paste accounting or IT skills to look “versatile.” Apply on the listing. If someone then asks you to pay for a “hotel placement,” it is a scam — [red flags](/blog/international-job-scams-red-flags).

## Brand uniforms and contractor employers

Many genuine hotel posts are filled by a contractor. The uniform may show a brand; the labour contract may show another legal name. Ask which name pays you. [How to check a UAE company name](/blog/how-to-check-a-uae-company-name).

## Tips and service charge

Do not treat social-media stories about “service charge in Dubai” as the wage for this vacancy. If it is not on the listing or the offer, it is not a HiredFrex fact.

Related: [Housing, allowances, and offers](/blog/housing-allowances-and-offers-in-the-gulf), [Questions to ask in a Gulf job interview](/blog/questions-to-ask-in-a-gulf-job-interview).

## Tipping stories are not wages

Social posts about service charge in one hotel are not the pay for this vacancy. If it is not on the listing or the offer, it is not a HiredFrex fact. Ask for basic wage in writing.
`
	},
	{
		slug: "verify-a-job-offer",
		title: "How to verify a job offer",
		excerpt: "A step-by-step check you should run even when the listing appeared on HiredFrex. Completeness review is not an offer letter.",
		updated: "2026-09-19",
		minutes: 13,
		body: `A HiredFrex completeness review is not an offer letter. When someone sends you an offer, run this list. A document-level reading order is also in [How to read a UAE offer letter](/blog/how-to-read-a-uae-offer-letter).

## 1. Name the legal employer

The company on the offer, the company on the listing, and the company on the email domain should match. Lookalike domains are a common trick.

## 2. Refuse payment

If the offer requires a fee, deposit, equipment purchase, or crypto transfer, it is not a legitimate hire. FTC consumer advice is explicit: do not pay for the promise of a job. [FTC Job Scams](https://consumer.ftc.gov/articles/job-scams).

## 3. Confirm the workplace

On-site jobs have an address or at least a city and site type. “Work from home packing for a hotel brand” is a contradiction.

## 4. Confirm the wage in writing

Basic salary, currency, pay period, and what is not included. Compare to what was advertised. A sudden jump or drop without explanation is a warning. If HiredFrex showed a blank, a verbal number is still not our number.

## 5. Confirm the visa path on a government site

For the UAE, the employer runs work-permit steps through [MoHRE](https://www.mohre.gov.ae), not through a personal bank account.

## 6. Talk to a human you trust

Read the offer aloud to someone else before you resign or buy a ticket.

## 7. Report failures

Use [Report a listing](/report) and, where relevant, [ReportFraud.ftc.gov](https://reportfraud.ftc.gov).

## 8. Compare with the HiredFrex page

If the city, title, or employer changed, believe the contradiction. Labels are not a lifetime guarantee. A clone can appear after we reviewed the ad. [How to report a cloned employer name](/blog/how-to-report-a-cloned-employer-name).

## What “fast offer” usually means

Same-day PDFs are not automatically fake. They are also not automatically real. Speed is not a substitute for the seven checks above.

Related: [How HiredFrex verifies jobs](/how-we-verify), [What reviewed means](/blog/what-reviewed-means-on-hiredfrex), [Documents for overseas employment](/guides/overseas-employment-documents).

## Do not resign on a PDF alone

A PDF can be edited. Compare the legal name with a government or company domain. If you are already in the UAE, confirm the transfer path before you hand in notice. Official pages: [MoHRE](https://www.mohre.gov.ae).
`
	},
	{
		slug: "overseas-employment-documents",
		title: "Documents needed for overseas employment",
		excerpt: "What to prepare, what to withhold until the employer is real, and what HiredFrex will never ask for in a public form.",
		updated: "2026-09-19",
		minutes: 12,
		body: `Requirements differ by country and occupation. This page is a packing list for you, not a government checklist. A narrative version is [Documents to prepare before overseas work](/blog/documents-to-prepare-before-overseas-work).

## Safe to prepare early

- A truthful CV (PDF)
- A professional photograph, if you choose to use one
- A list of previous employers with cities and dates
- Certificates you can actually produce
- A working phone number that can receive international calls

## Do not attach to a first application on a job board

- Passport bio page, unless the employer has been authenticated and asked through a secure channel
- National ID / Emirates ID numbers
- Bank account details
- Police clearance (usually later, for specific sites)
- Medical reports
- Remote-access software “so HR can help you upload”

HiredFrex application forms do not ask for those scans. If an email that looks like us does, it is impersonation — [contact us](/contact).

## UAE-specific official processes

Document lists for work permits live on [MoHRE](https://www.mohre.gov.ae) and [u.ae](https://u.ae). They can include passport validity rules and education evidence by skill level. Read the official service page for the permit type you are on. We will not paste a fee table that we cannot guarantee is current.

## After you have a written offer

Use a copy of the offer and the employer’s legal name when you deal with any attestation or travel step. Keep originals. Do not hand your passport to a facilitator who is not the employer or a licensed service centre.

## Naming files

Firstname-Lastname-CV.pdf is enough. Do not put your passport number in the filename. That filename gets forwarded.

## What we store

Applications and CV text on HiredFrex are visible to you and to the employer for that job. Dashboards are noindexed. You can ask us to wipe stored CVs; jobs and articles stay. Privacy detail: [Privacy Policy](/privacy).

Related: [How to read a UAE offer letter](/blog/how-to-read-a-uae-offer-letter), [WhatsApp job offers](/blog/whatsapp-job-offers).

## Photograph and CV only at first

A photograph is optional. A CV is enough to apply here. Identity documents belong after a written next step from an authenticated channel. If an email that looks like HiredFrex asks for your passport, it is impersonation.
`
	},
	{
		slug: "ai-cv-screening",
		title: "AI CV screening explained",
		excerpt: "What automated screening usually does, how to write a CV that a human can still defend, and how HiredFrex does and does not use models.",
		updated: "2026-09-19",
		minutes: 11,
		related: ["/blog/how-ai-cv-screening-works"],
		body: `The full desk piece is [How AI CV screening works](/blog/how-ai-cv-screening-works). This guide is the short operating manual: what to assume, what not to buy, and what HiredFrex’s own tools are allowed to do.

## What these systems usually see

Large employers parse a PDF into fields: dates, titles, schools, keywords. Columns, text boxes, and graphics often vanish. A beautiful two-column CV can arrive empty. Use one column.

They are not mind readers. They do not know you “led a team” unless a title or bullet says so truthfully.

## What to do

- One column, standard headings
- Real job titles
- Dates in month-year
- Skills you can defend in an interview
- File name with your name and the role

## What not to do

- Keyword stuffing (“security security security”)
- White text
- Buying a “beat the ATS” package from a stranger who also offers a visa
- Letting a writing assistant invent a promotion

## How HiredFrex uses models

The optional CV assistant drafts wording from the facts you type. It is not a hiring decision. It is not allowed to add employers. Editors writing articles are humans with bylines; they are not an anonymous model byline.

Applications you send through this site go to the employer for that job. We do not run a secret score that “ranks” you against other applicants as an ad product.

## If the employer’s portal is separate

Some genuine processes ask you to apply again on their careers site. That can be real. Compare the legal name. If the second site asks for a fee, stop.

Related: [UAE CV guide](/guides/uae-cv), [AI job interviews](/guides/ai-job-interviews).

## Humans still read some of these files

Operations supervisors often open the PDF. Write for them too. A clean one-column CV with real dates beats a designed infographic. Do not buy a package that promises to “beat every ATS in Dubai.”
`
	},
	{
		slug: "ai-job-interviews",
		title: "AI job interviews explained",
		excerpt: "How to sit a structured video screen without buying a coaching package, and when a “proctor” is actually a scam.",
		updated: "2026-09-19",
		minutes: 10,
		body: `Some employers use recorded questions for high-volume hiring. HiredFrex does not operate that product and does not have their scoring models. This page is setup, not a hack.

## Practical setup

- Quiet room, stable connection, phone on silent
- Camera at eye level
- Answer the question asked, then stop
- Keep examples under 90 seconds: situation, what you did, result
- Have the listing open so you do not invent a different job title

## What not to do

- Do not pay a third party who claims they can “beat the AI”
- Do not read a script so closely that you ignore the prompt
- Do not install remote-access software because a “proctor” asked you to
- Do not record someone else’s answers and play them back

## When the “AI interview” is a clone

A message that says “complete this assessment in 20 minutes and pay for the unlock code” is not a normal screen. If it followed a HiredFrex listing, [report it](/report). Read [How to report a cloned employer name](/blog/how-to-report-a-cloned-employer-name).

## After the recording

Write down what you were asked and what you said about pay and visa. That note is more useful than a thank-you template. [What to do in the 24 hours after a Gulf interview](/blog/what-to-do-in-the-24-hours-after-a-gulf-interview).

## Humans still hire

A recorded screen is a filter. A supervisor interview still happens for most operations roles we see. Prepare for both. Do not spend money on a coaching funnel that promises a Dubai job.

Related: [UAE interview guide](/guides/uae-interviews), [International job scams](/blog/international-job-scams-red-flags).

## Time zones and links

If the recording link arrives from a free email address that does not match the listing, pause. A genuine high-volume screen still comes from a process you can name. If the link asks you to pay to unlock results, stop and report.
`
	},
	{
		slug: "responsible-hiring",
		title: "Employer responsible hiring guide",
		excerpt: "What HiredFrex expects from employers who post here, including copy we will reject, and how review labels actually work.",
		updated: "2026-09-19",
		minutes: 11,
		body: `If you hire through HiredFrex you agree to post a real vacancy. Candidates never pay us to apply. You may not charge them either.

## Required

- Legal employer name you are prepared to stand behind
- City and workplace type that match the work
- An overview written for this role
- Responsibilities and essential requirements
- No application fees
- A public source URL if you want a source-confirmed label

## We will reject or unpublish

- Test jobs and placeholder copy
- Remote labels on housekeeping, warehouse, security patrol, or front-desk work
- Major-brand names you do not represent
- Invented benefits and fake “limited-time” headcount
- Duplicate descriptions across unrelated roles
- Requests for gift cards, crypto, or “visa processing” paid to a personal account

## After you post

Automated completeness and red-flag checks run. Employer identity stays unverified until a reviewer confirms it. Applications arrive in your dashboard. Close the role when it is filled so candidates are not writing into a void.

See [For employers](/employers), [How we review listings](/how-we-verify), and [Editorial standards](/editorial-standards).

## Why we will not add a decorative verified badge

Marketing teams ask. We only use employer confirmed when identity was actually confirmed. A badge sold as a package would recreate the problem we are trying to stop.

## If someone is impersonating you

Write to support@hiredfrex.com from a domain we can associate with you, with the URLs. We still check; email can be cloned too.

Related: [Why we unpublished brand-name vacancies](/blog/why-we-unpublished-brand-name-vacancies), [Why we will not invent a salary](/blog/why-hiredfrex-will-not-invent-a-salary).

## Close the role

When the vacancy is filled, close it on HiredFrex. Leaving it open trains candidates to write into a void and trains scammers to clone a “live” title. We would rather have fewer public jobs than a graveyard of filled posts.
`
	}
];
function getGuide(slug) {
	return GUIDES.find((g) => g.slug === slug) ?? null;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BBMsO9gN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-Cx-DBf0m.css";
var APP_NAME = "HiredFrex";
var Route$32 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#10243f"
			},
			{
				name: "google-adsense-account",
				content: ADSENSE_PUB
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,600;7..72,700&family=Newsreader:opsz,wght@6..72,500;6..72,600;6..72,700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap"
			}
		]
	}),
	errorComponent: AppErrorComponent,
	notFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase tracking-[0.16em] text-gold-deep",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-navy",
				children: "Page not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "This URL is not a live HiredFrex page. It may have been removed, or the link is out of date."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "mt-6 inline-block rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-paper",
				children: "Back to home"
			})
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$28 = () => import("./routes-bzYYv85E.mjs");
var Route$31 = createFileRoute("/")({
	head: () => pageHead({
		title: "HiredFrex — Career guides and honest job listings",
		description: "Original Gulf and international career guides, scam checks tied to official sources, and a small job board with honest review labels. Free to read. Candidates never pay to apply.",
		path: "/"
	}),
	loader: async () => {
		const [jobs, posts] = await Promise.all([listPublicJobs({ data: {} }), listPosts()]);
		return {
			jobs,
			posts
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./about-BbElf6Mh.mjs");
var Route$30 = createFileRoute("/about")({
	head: () => pageHead({
		title: "About HiredFrex",
		description: "HiredFrex is a career-information site and small job board run by Paul Mensah from Abu Dhabi, with named editors in the UAE.",
		path: "/about"
	}),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./account-B1YUMdsQ.mjs");
var Route$29 = createFileRoute("/account")({
	head: () => pageHead({
		title: "Dashboard",
		description: "Your HiredFrex applications, saved jobs, and employer tools.",
		path: "/account",
		index: false
	}),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./contact-COL9CxpJ.mjs");
var Route$28 = createFileRoute("/contact")({
	head: () => pageHead({
		title: "Contact",
		description: "Contact HiredFrex for support, corrections, employer help, or to report a problem.",
		path: "/contact"
	}),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./cookies-T8C92g-k.mjs");
var Route$27 = createFileRoute("/cookies")({
	head: () => pageHead({
		title: "Cookie Policy",
		description: "Cookies and local storage used by HiredFrex, including Google AdSense advertising cookies.",
		path: "/cookies"
	}),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./cv-builder-miXjFhwA.mjs");
var Route$26 = createFileRoute("/cv-builder")({
	head: () => pageHead({
		title: "CV builder",
		description: "ATS-plain HiredFrex CV builder. Optional writing help that cannot invent jobs you did not do.",
		path: "/cv-builder"
	}),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./disclaimer-CJTp6wVY.mjs");
var Route$25 = createFileRoute("/disclaimer")({
	head: () => pageHead({
		title: "Disclaimer",
		description: "HiredFrex listings and guides are information, not a guarantee of employment or legal advice.",
		path: "/disclaimer"
	}),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./editorial-standards-io0h1tyS.mjs");
var Route$24 = createFileRoute("/editorial-standards")({
	head: () => pageHead({
		title: "Editorial standards",
		description: "How HiredFrex researches, labels, and corrects employment information.",
		path: "/editorial-standards"
	}),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./employers-ZFdj6KRp.mjs");
var Route$23 = createFileRoute("/employers")({
	head: () => pageHead({
		title: "For employers",
		description: "Post a complete, honest vacancy on HiredFrex. Automated quality checks run before a listing can go live.",
		path: "/employers"
	}),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./faq-CV7WQsq0.mjs");
var Route$22 = createFileRoute("/faq")({
	head: () => pageHead({
		title: "FAQ",
		description: "Questions about HiredFrex listings, accounts, verification, and fees.",
		path: "/faq"
	}),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./how-we-verify-DeGhJtTb.mjs");
var Route$21 = createFileRoute("/how-we-verify")({
	head: () => pageHead({
		title: "How HiredFrex verifies jobs",
		description: "The checks HiredFrex actually runs on job listings — completeness, red flags, source, and what we do not claim.",
		path: "/how-we-verify"
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./login-Dpb9c38A.mjs");
var Route$20 = createFileRoute("/login")({
	validateSearch: (s) => ({
		next: typeof s.next === "string" ? s.next : "/",
		mode: s.mode === "signup" ? "signup" : "signin"
	}),
	head: () => pageHead({
		title: "Sign in",
		description: "Sign in to HiredFrex to save guides, apply, or write as an editor.",
		path: "/login",
		index: false
	}),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var getMarketReport = createServerFn({ method: "GET" }).handler(createSsrRpc("56a4959739695bf37df6f2c3c9c79c67c511c0e2d10896d041bab71d174bd379"));
var $$splitComponentImporter$16 = () => import("./market-report-BW9cgI7u.mjs");
var Route$19 = createFileRoute("/market-report")({
	head: () => pageHead({
		title: "HiredFrex job market report — September 2026",
		description: "Metrics computed from public HiredFrex listings: sample size, advertised AED monthly pay, categories, and workplace type.",
		path: "/market-report"
	}),
	loader: () => getMarketReport(),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./privacy-B4PIvvU_.mjs");
var Route$18 = createFileRoute("/privacy")({
	head: () => pageHead({
		title: "Privacy Policy",
		description: "How HiredFrex collects, uses, and retains account, application, and usage data, including Google AdSense cookies.",
		path: "/privacy"
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./report-DxJSntgB.mjs");
var Route$17 = createFileRoute("/report")({
	validateSearch: (s) => ({ job: typeof s.job === "string" ? s.job : void 0 }),
	head: () => pageHead({
		title: "Report a listing",
		description: "Report a suspicious or incorrect HiredFrex job listing.",
		path: "/report",
		index: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var BODY = `User-agent: *
Allow: /
Disallow: /account
Disallow: /login
Disallow: /studio
Disallow: /verify-email
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;
var Route$16 = createFileRoute("/robots.txt")({ server: { handlers: { GET: () => new Response(BODY, { headers: { "Content-Type": "text/plain; charset=utf-8" } }) } } });
var $$splitComponentImporter$13 = () => import("./sitemap-CnjHrqbv.mjs");
var Route$15 = createFileRoute("/sitemap")({
	head: () => pageHead({
		title: "Sitemap",
		description: "Every public HiredFrex page: insights, guides, jobs, and legal documents.",
		path: "/sitemap"
	}),
	loader: async () => {
		const [posts, jobs] = await Promise.all([listPosts(), listPublicJobs({ data: {} })]);
		return {
			posts,
			jobs
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var Route$14 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const { jobs, posts } = await allIndexableUrls();
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
		...[
			"/",
			"/jobs",
			"/blog",
			"/guides",
			"/sitemap",
			"/how-we-verify",
			"/editorial-standards",
			"/market-report",
			"/about",
			"/contact",
			"/faq",
			"/privacy",
			"/terms",
			"/disclaimer",
			"/cookies",
			"/cv-builder",
			"/employers",
			"/report",
			"/authors"
		].map((p) => `${SITE_URL}${p}`),
		...GUIDES.map((g) => `${SITE_URL}/guides/${g.slug}`),
		...STAFF_AUTHORS.map((a) => `${SITE_URL}/authors/${a.id}`),
		...jobs.map((j) => `${SITE_URL}/jobs/${j.slug}`),
		...posts.map((p) => `${SITE_URL}/blog/${p.slug}`)
	].map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;
	return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
} } } });
var $$splitComponentImporter$12 = () => import("./studio-BtGzrZWu.mjs");
var Route$13 = createFileRoute("/studio")({
	head: () => pageHead({
		title: "Editorial studio",
		description: "Private writing desk for HiredFrex articles.",
		path: "/studio",
		index: false
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./terms-EuOkxw3J.mjs");
var Route$12 = createFileRoute("/terms")({
	head: () => pageHead({
		title: "Terms & Conditions",
		description: "Terms for using HiredFrex as a job seeker or employer.",
		path: "/terms"
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./verify-email-BingdYHG.mjs");
var Route$11 = createFileRoute("/verify-email")({
	head: () => pageHead({
		title: "Verify email",
		description: "Confirm the email on your HiredFrex account.",
		path: "/verify-email",
		index: false
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./authors-CTvOp_j1.mjs");
var Route$10 = createFileRoute("/authors/")({
	head: () => pageHead({
		title: "Writers",
		description: "Named HiredFrex editors: who writes the career desk, and where they work from.",
		path: "/authors"
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_id-ysK_Tav_.mjs");
var Route$9 = createFileRoute("/authors/$id")({
	loader: async ({ params }) => {
		const author = authorById(params.id);
		if (!author) throw notFound();
		return {
			author,
			posts: (await listPosts()).filter((p) => p.author === author.name)
		};
	},
	head: ({ loaderData }) => {
		const a = loaderData?.author;
		if (!a) return pageHead({
			title: "Writer",
			description: "",
			path: "/authors",
			index: false
		});
		return pageHead({
			title: a.name,
			description: a.bio,
			path: `/authors/${a.id}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./blog-B8LJ-0vs.mjs");
var Route$8 = createFileRoute("/blog/")({
	head: () => pageHead({
		title: "Career insights",
		description: "Original HiredFrex editorial on Gulf job search, official UAE channels, scam checks, CVs, and how we label listings. Named authors, dated pieces.",
		path: "/blog"
	}),
	loader: async () => {
		const [posts, jobs] = await Promise.all([listPosts(), listPublicJobs({ data: {} })]);
		return {
			posts,
			jobs
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_slug-Cm5ZzLnj.mjs");
var Route$7 = createFileRoute("/blog/$slug")({
	loader: async ({ params }) => {
		const [post, jobs, posts] = await Promise.all([
			getPost({ data: { slug: params.slug } }),
			listPublicJobs({ data: {} }),
			listPosts()
		]);
		if (!post) throw notFound();
		return {
			post,
			jobs,
			related: posts.filter((p) => p.slug !== post.slug).slice(0, 4)
		};
	},
	head: ({ loaderData }) => {
		const p = loaderData?.post;
		if (!p) return pageHead({
			title: "Article not found",
			description: "",
			path: "/blog",
			index: false
		});
		return pageHead({
			title: p.title,
			description: p.excerpt,
			path: `/blog/${p.slug}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_slug-Ls82MJ0K.mjs");
var Route$6 = createFileRoute("/categories/$slug")({
	loader: async ({ params }) => {
		return {
			meta: CATEGORIES.find((c) => c.slug === params.slug),
			jobs: await listPublicJobs({ data: { category: params.slug } }),
			slug: params.slug
		};
	},
	head: ({ loaderData }) => {
		const name = loaderData?.meta?.name ?? loaderData?.slug;
		return pageHead({
			title: `${name} jobs`,
			description: `Public HiredFrex listings in ${name}. Filter pages are not indexed.`,
			path: `/categories/${loaderData?.slug}`,
			index: false
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./guides-Dc45UcmC.mjs");
var Route$5 = createFileRoute("/guides/")({
	head: () => pageHead({
		title: "Career guides",
		description: "Practical HiredFrex guides for UAE job search, CVs, visas, scams, and verification.",
		path: "/guides"
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_slug-xOtfSHZs.mjs");
var Route$4 = createFileRoute("/guides/$slug")({
	loader: ({ params }) => {
		const g = getGuide(params.slug);
		if (!g) throw notFound();
		return g;
	},
	head: ({ loaderData }) => {
		const g = loaderData;
		if (!g) return pageHead({
			title: "Guide not found",
			description: "",
			path: "/guides",
			index: false
		});
		return pageHead({
			title: g.title,
			description: g.excerpt,
			path: `/guides/${g.slug}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./jobs-lcIGl8cV.mjs");
var Route$3 = createFileRoute("/jobs/")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : void 0,
		category: typeof s.category === "string" ? s.category : void 0,
		city: typeof s.city === "string" ? s.city : void 0,
		type: typeof s.type === "string" ? s.type : void 0,
		workplace: typeof s.workplace === "string" ? s.workplace : void 0
	}),
	head: () => pageHead({
		title: "Browse jobs",
		description: "Public HiredFrex listings with verification labels, advertised salaries where provided, and no invented employer brands.",
		path: "/jobs",
		index: true
	}),
	loaderDeps: ({ search }) => search,
	loader: async ({ deps }) => {
		const [jobs, facets] = await Promise.all([listPublicJobs({ data: deps }), jobFacets()]);
		return {
			jobs,
			facets
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_slug-7GlLgxp9.mjs");
var Route$2 = createFileRoute("/jobs/$slug")({
	loader: async ({ params }) => {
		const job = await getPublicJob({ data: { slug: params.slug } });
		if (!job) throw notFound();
		return {
			job,
			related: await relatedJobs({ data: {
				slug: job.slug,
				categorySlug: job.categorySlug
			} })
		};
	},
	head: ({ loaderData }) => {
		const job = loaderData?.job;
		if (!job) return pageHead({
			title: "Job not found",
			description: "This listing is not on HiredFrex.",
			path: "/jobs",
			index: false
		});
		return pageHead({
			title: `${job.title} at ${job.companyName}`,
			description: job.overview.slice(0, 160),
			path: `/jobs/${job.slug}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_slug-DDJ-mbC9.mjs");
function cityFromSlug(slug) {
	return slug.split("-").map((w) => w.slice(0, 1).toUpperCase() + w.slice(1)).join(" ");
}
var Route$1 = createFileRoute("/locations/$slug")({
	loader: async ({ params }) => {
		const city = cityFromSlug(params.slug);
		return {
			city,
			jobs: await listPublicJobs({ data: { city } }),
			slug: params.slug
		};
	},
	head: ({ loaderData }) => pageHead({
		title: `Jobs in ${loaderData?.city ?? "this city"}`,
		description: `HiredFrex listings in ${loaderData?.city}.`,
		path: `/locations/${loaderData?.slug}`,
		index: false
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$31.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$32
});
var AboutRoute = Route$30.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$32
});
var AccountRoute = Route$29.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$32
});
var ContactRoute = Route$28.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$32
});
var CookiesRoute = Route$27.update({
	id: "/cookies",
	path: "/cookies",
	getParentRoute: () => Route$32
});
var CvBuilderRoute = Route$26.update({
	id: "/cv-builder",
	path: "/cv-builder",
	getParentRoute: () => Route$32
});
var DisclaimerRoute = Route$25.update({
	id: "/disclaimer",
	path: "/disclaimer",
	getParentRoute: () => Route$32
});
var EditorialStandardsRoute = Route$24.update({
	id: "/editorial-standards",
	path: "/editorial-standards",
	getParentRoute: () => Route$32
});
var EmployersRoute = Route$23.update({
	id: "/employers",
	path: "/employers",
	getParentRoute: () => Route$32
});
var FaqRoute = Route$22.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$32
});
var HowWeVerifyRoute = Route$21.update({
	id: "/how-we-verify",
	path: "/how-we-verify",
	getParentRoute: () => Route$32
});
var LoginRoute = Route$20.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$32
});
var MarketReportRoute = Route$19.update({
	id: "/market-report",
	path: "/market-report",
	getParentRoute: () => Route$32
});
var PrivacyRoute = Route$18.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$32
});
var ReportRoute = Route$17.update({
	id: "/report",
	path: "/report",
	getParentRoute: () => Route$32
});
var RobotsDottxtRoute = Route$16.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$32
});
var SitemapRoute = Route$15.update({
	id: "/sitemap",
	path: "/sitemap",
	getParentRoute: () => Route$32
});
var SitemapDotxmlRoute = Route$14.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$32
});
var StudioRoute = Route$13.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$32
});
var TermsRoute = Route$12.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$32
});
var VerifyEmailRoute = Route$11.update({
	id: "/verify-email",
	path: "/verify-email",
	getParentRoute: () => Route$32
});
var AuthorsIndexRoute = Route$10.update({
	id: "/authors/",
	path: "/authors/",
	getParentRoute: () => Route$32
});
var AuthorsIdRoute = Route$9.update({
	id: "/authors/$id",
	path: "/authors/$id",
	getParentRoute: () => Route$32
});
var BlogIndexRoute = Route$8.update({
	id: "/blog/",
	path: "/blog/",
	getParentRoute: () => Route$32
});
var BlogSlugRoute = Route$7.update({
	id: "/blog/$slug",
	path: "/blog/$slug",
	getParentRoute: () => Route$32
});
var CategoriesSlugRoute = Route$6.update({
	id: "/categories/$slug",
	path: "/categories/$slug",
	getParentRoute: () => Route$32
});
var GuidesIndexRoute = Route$5.update({
	id: "/guides/",
	path: "/guides/",
	getParentRoute: () => Route$32
});
var GuidesSlugRoute = Route$4.update({
	id: "/guides/$slug",
	path: "/guides/$slug",
	getParentRoute: () => Route$32
});
var JobsIndexRoute = Route$3.update({
	id: "/jobs/",
	path: "/jobs/",
	getParentRoute: () => Route$32
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AccountRoute,
	ContactRoute,
	CookiesRoute,
	CvBuilderRoute,
	DisclaimerRoute,
	EditorialStandardsRoute,
	EmployersRoute,
	FaqRoute,
	HowWeVerifyRoute,
	LoginRoute,
	MarketReportRoute,
	PrivacyRoute,
	ReportRoute,
	RobotsDottxtRoute,
	SitemapRoute,
	SitemapDotxmlRoute,
	StudioRoute,
	TermsRoute,
	VerifyEmailRoute,
	AuthorsIdRoute,
	BlogSlugRoute,
	CategoriesSlugRoute,
	GuidesSlugRoute,
	JobsSlugRoute: Route$2.update({
		id: "/jobs/$slug",
		path: "/jobs/$slug",
		getParentRoute: () => Route$32
	}),
	LocationsSlugRoute: Route$1.update({
		id: "/locations/$slug",
		path: "/locations/$slug",
		getParentRoute: () => Route$32
	}),
	AuthorsIndexRoute,
	BlogIndexRoute,
	GuidesIndexRoute,
	JobsIndexRoute,
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$32
	})
};
var routeTree = Route$32._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$4 as a, Route$8 as c, Route$17 as d, Route$19 as f, createSsrRpc as g, GUIDES as h, Route$3 as i, Route$9 as l, Route$31 as m, Route$1 as n, Route$6 as o, Route$20 as p, Route$2 as r, Route$7 as s, router_exports as t, Route$15 as u };

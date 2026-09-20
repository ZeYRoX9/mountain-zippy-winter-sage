export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  updated: string;
  minutes: number;
  body: string;
  related?: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "uae-job-search",
    title: "UAE job search guide",
    excerpt:
      "A working sequence for UAE applications: official channels, a CV matched to one job, an honest listing, and an offer you can read. HiredFrex is not a ministry.",
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

Related: [International job scams](/blog/international-job-scams-red-flags), [Official UAE job channels](/blog/official-uae-job-channels), [How to check a UAE company name](/blog/how-to-check-a-uae-company-name).`,
  },
  {
    slug: "uae-cv",
    title: "UAE CV guide",
    excerpt:
      "A one- and two-page structure for Gulf applications: visa line, truthful dates, and what not to attach. Use with the CV builder; do not invent jobs.",
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

Related: [Entry-level jobs in the UAE](/blog/entry-level-jobs-in-the-uae), [Start here](/blog/start-here-gulf-job-search).`,
  },
  {
    slug: "uae-interviews",
    title: "UAE interview guide",
    excerpt:
      "How to prepare for on-site, video, and high-volume screens for service and operations roles — and the questions that protect you after the meeting.",
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

Related: [WhatsApp job offers](/blog/whatsapp-job-offers), [Airport and hotel security jobs](/blog/airport-and-hotel-security-jobs-are-not-the-same).`,
  },
  {
    slug: "uae-employment-visa",
    title: "UAE employment visa guide",
    excerpt:
      "Where official work-permit information lives, what a job board is not allowed to sell you, and how to spot a fake “MoHRE fee.”",
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

Related: [UAE 2026 wage rules we can confirm](/blog/uae-2026-wage-rules-what-we-can-confirm), [Documents for overseas employment](/guides/overseas-employment-documents), [Official UAE job channels](/blog/official-uae-job-channels).`,
  },
  {
    slug: "uae-security-jobs",
    title: "UAE security jobs guide",
    excerpt:
      "How to read security officer listings on HiredFrex: on-site work, missing salaries, site type, and documents employers often ask for later.",
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
`,
  },
  {
    slug: "uae-hospitality-jobs",
    title: "UAE hospitality jobs guide",
    excerpt:
      "Service-floor roles: why unsourced brand-name hotel listings were taken down, and how to read a remaining hospitality vacancy.",
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
`,
  },
  {
    slug: "verify-a-job-offer",
    title: "How to verify a job offer",
    excerpt:
      "A step-by-step check you should run even when the listing appeared on HiredFrex. Completeness review is not an offer letter.",
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
`,
  },
  {
    slug: "overseas-employment-documents",
    title: "Documents needed for overseas employment",
    excerpt:
      "What to prepare, what to withhold until the employer is real, and what HiredFrex will never ask for in a public form.",
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
`,
  },
  {
    slug: "ai-cv-screening",
    title: "AI CV screening explained",
    excerpt:
      "What automated screening usually does, how to write a CV that a human can still defend, and how HiredFrex does and does not use models.",
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
`,
  },
  {
    slug: "ai-job-interviews",
    title: "AI job interviews explained",
    excerpt:
      "How to sit a structured video screen without buying a coaching package, and when a “proctor” is actually a scam.",
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
`,
  },
  {
    slug: "responsible-hiring",
    title: "Employer responsible hiring guide",
    excerpt:
      "What HiredFrex expects from employers who post here, including copy we will reject, and how review labels actually work.",
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
`,
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}

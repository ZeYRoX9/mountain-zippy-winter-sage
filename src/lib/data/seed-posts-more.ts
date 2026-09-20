import type { SeedPost } from "./types";

/** Additional original desk pieces dated inside 8–19 Sep 2026 (no future dates). */
export const MORE_POSTS: SeedPost[] = [
  {
    id: "post_company_name",
    slug: "how-to-check-a-uae-company-name",
    title: "How to check a UAE company name before you apply",
    excerpt:
      "A trading name on a job ad is not a licence. This is the sequence HiredFrex uses when an employer name looks familiar, cloned, or incomplete — and the official pages you should open yourself.",
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

Related: [Official UAE job channels](/blog/official-uae-job-channels), [International job scams](/blog/international-job-scams-red-flags), [Why we unpublished brand-name vacancies](/blog/why-we-unpublished-brand-name-vacancies).`,
  },
  {
    id: "post_no_salary",
    slug: "why-hiredfrex-will-not-invent-a-salary",
    title: "Why HiredFrex will not invent a salary range",
    excerpt:
      "Blank pay on a listing is information. Filling it with a “typical UAE security salary” would make the page look finished and make the number look like ours. We refuse that edit.",
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
`,
  },
  {
    id: "post_unpublished_brands",
    slug: "why-we-unpublished-brand-name-vacancies",
    title: "Why we unpublished brand-name vacancies without a source",
    excerpt:
      "Older HiredFrex catalogue pages used famous hotel and corporate names without a public vacancy URL. We took those pages down. This is what we will put back, and what we will not.",
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
`,
  },
  {
    id: "post_airport_hotel",
    slug: "airport-and-hotel-security-jobs-are-not-the-same",
    title: "Airport and hotel security jobs are not the same listing",
    excerpt:
      "Both roles may say “security officer.” The site, the licence expectations, the shift pattern, and the grooming rules are different. Here is how HiredFrex reads those ads, and the questions you should still ask.",
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
`,
  },
  {
    id: "post_after_interview",
    slug: "what-to-do-in-the-24-hours-after-a-gulf-interview",
    title: "What to do in the 24 hours after a Gulf job interview",
    excerpt:
      "A thank-you note is optional. Writing down what was promised, who the employer is, and what they asked you to send is not. This is the desk’s after-interview routine.",
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
`,
  },
  {
    id: "post_cloned_name",
    slug: "how-to-report-a-cloned-employer-name",
    title: "How to report a cloned employer name on HiredFrex",
    excerpt:
      "If someone is using a hotel, hospital, or facilities name that does not match the listing, send us the URLs and the chat. This is what we can do, what we cannot do, and what you should do in parallel.",
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
`,
  },
  {
    id: "post_offer_letter",
    slug: "how-to-read-a-uae-offer-letter",
    title: "How to read a UAE offer letter without pretending to be a lawyer",
    excerpt:
      "An offer is a document with names, numbers, and a city. This is the desk’s reading order: legal employer, wage split, site, permit, and what to do if those lines are missing. Not legal advice.",
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
`,
  },
];

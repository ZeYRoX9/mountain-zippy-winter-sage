#!/usr/bin/env python3
from pathlib import Path

def art(**kwargs):
    body = kwargs.pop("body").strip("\n")
    photo = kwargs.get("authorPhoto") or ""
    cover = kwargs.get("coverUrl") or ""
    return f"""  {{
    id: {kwargs['id']!r},
    slug: {kwargs['slug']!r},
    title: {kwargs['title']!r},
    excerpt:
      {kwargs['excerpt']!r},
    category: {kwargs['category']!r},
    author: {kwargs['author']!r},
    authorPhoto: {photo!r},
    coverUrl: {cover!r},
    published: true,
    indexable: true,
    publishedOn: {kwargs['publishedOn']!r},
    updatedOn: {kwargs['updatedOn']!r},
    readMinutes: {kwargs['readMinutes']},
    body: `{body}`,
  }}"""

posts = []

posts.append(art(
    id="post_official_channels",
    slug="official-uae-job-channels",
    title="Official UAE job channels vs private boards",
    excerpt="Where labour rules actually live (MoHRE and u.ae), what a private board like HiredFrex can legally be, and how to avoid treating a listing as a work permit.",
    category="UAE jobs",
    author="Nour El-Sayed",
    authorPhoto="/authors/nour.svg",
    publishedOn="2026-09-10",
    updatedOn="2026-09-19",
    readMinutes=11,
    body=r'''People mix up three different things: **a vacancy**, **an employment contract**, and **a work permit**. Private job boards only sit in the first box. This article keeps them separate, with links to the official UAE pages rather than to other blogs.

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

Related: [UAE job search guide](/guides/uae-job-search), [UAE employment visa guide](/guides/uae-employment-visa), [Start here](/blog/start-here-gulf-job-search).'''
))

posts.append(art(
    id="post_uae_cv",
    slug="uae-cv-format-what-recruiters-expect",
    title="UAE CV format: what Gulf recruiters actually expect",
    excerpt="A practical CV structure for UAE and Gulf applications — length, photo, visa status, and the mistakes that waste interviews — without pretending one template wins every role.",
    category="CV and applications",
    author="Amira Hassan",
    authorPhoto="/authors/amira.svg",
    publishedOn="2026-09-11",
    updatedOn="2026-09-19",
    readMinutes=11,
    body=r'''There is no single legally required CV format in the UAE. What follows is HiredFrex editorial guidance based on how listings on this site are written, and on common recruiter practice in the Gulf. It is not a government form, and it is not a guarantee of an interview.

If you want a document you can edit and export, use the [HiredFrex CV builder](/cv-builder). Do not invent employment dates or qualifications.

## Start with the job, not a universal CV

Look at the listing. On HiredFrex, a security officer role in Dubai and a marketing executive role in Abu Dhabi do not share the same skills block. Copying a generic “dynamic team player” summary into both is how applications get ignored.

Do this instead:

1. Put the **job title from the listing** near the top of your summary, in plain language.
2. Mirror **only skills you actually have**. If the listing mentions shift work and incident reporting, and you have done those, say so with where and when.
3. Keep the file name clean: `Firstname-Lastname-Security-Officer-Dubai.pdf`.

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

Related: [How AI CV screening works](/blog/how-ai-cv-screening-works), [UAE job search guide](/guides/uae-job-search), [Start here](/blog/start-here-gulf-job-search).'''
))

posts.append(art(
    id="post_whatsapp",
    slug="whatsapp-job-offers",
    title="WhatsApp job offers: a decision tree before you send anything",
    excerpt="A practical yes/no tree for messages that claim to be HR: when to reply, when to hang up, and which files never belong in a chat thread.",
    category="Scam awareness",
    author="Amira Hassan",
    authorPhoto="/authors/amira.svg",
    publishedOn="2026-09-12",
    updatedOn="2026-09-19",
    readMinutes=10,
    body=r'''Most serious overseas recruitment still uses email and documented offers. Most rushed fraud still uses chat apps. This is a decision tree, not a moral lecture.

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

Related: [International job scams](/blog/international-job-scams-red-flags), [Documents for overseas employment](/guides/overseas-employment-documents), [How to verify a job offer](/guides/verify-a-job-offer).'''
))

posts.append(art(
    id="post_reviewed_means",
    slug="what-reviewed-means-on-hiredfrex",
    title="What “reviewed” means on HiredFrex (and what it does not)",
    excerpt="A plain-language map of every review label we use, why we stopped saying “verified employer,” and how to read a job page without being sold a badge.",
    category="How HiredFrex works",
    author="Paul Mensah",
    authorPhoto="/authors/paul.svg",
    publishedOn="2026-09-13",
    updatedOn="2026-09-19",
    readMinutes=10,
    body=r'''Job boards lose trust in one sentence: “verified employer” next to a company nobody called. HiredFrex used to lean on that language. We dropped it. This page is the replacement.

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

Related: [How we review listings](/how-we-verify), [Start here](/blog/start-here-gulf-job-search), [International job scams](/blog/international-job-scams-red-flags).'''
))

posts.append(art(
    id="post_ai_screening",
    slug="how-ai-cv-screening-works",
    title="How AI CV screening works — and what actually moves your application",
    excerpt="A plain-language look at automated screening: what it usually reads, why keyword stuffing fails, and how HiredFrex uses (and does not use) AI.",
    category="CV and applications",
    author="Amira Hassan",
    authorPhoto="/authors/amira.svg",
    publishedOn="2026-09-14",
    updatedOn="2026-09-19",
    readMinutes=10,
    body=r'''“AI screening” is not one product. Employers use everything from simple keyword filters to ranked language models. This article explains the common pattern so you can write a CV that a human can also read. It does not claim insider knowledge of any specific vendor.

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

Related: [UAE CV format](/blog/uae-cv-format-what-recruiters-expect), [UAE interview guide](/guides/uae-interviews), [AI interviews](/guides/ai-job-interviews).'''
))

posts.append(art(
    id="post_uae_entry",
    slug="entry-level-jobs-in-the-uae",
    title="Entry-level jobs in the UAE: how to read a listing before you apply",
    excerpt="A practical walk-through of security, hospitality, warehouse and office roles using HiredFrex’s live sample — including what the advertised numbers are, and what they are not.",
    category="UAE jobs",
    author="Nour El-Sayed",
    authorPhoto="/authors/nour.svg",
    publishedOn="2026-09-15",
    updatedOn="2026-09-19",
    readMinutes=11,
    body=r'''This is not a national salary survey. It is a reading guide for the kinds of entry-level roles that appear on HiredFrex, using the **current public sample on this site**. When the sample is small, we say so.

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

Related: [Start here](/blog/start-here-gulf-job-search), [UAE wage rules we can confirm](/blog/uae-2026-wage-rules-what-we-can-confirm).'''
))

posts.append(art(
    id="post_uae_salary_rules",
    slug="uae-2026-wage-rules-what-we-can-confirm",
    title="UAE 2026 wage rules: what official sources actually say",
    excerpt="A short briefing on two official UAE measures — the Emirati private-sector minimum wage of AED 6,000 and MoHRE wage-protection timing — with links, scope, and what this page does not claim.",
    category="UAE jobs",
    author="Nour El-Sayed",
    authorPhoto="/authors/nour.svg",
    publishedOn="2026-09-16",
    updatedOn="2026-09-19",
    readMinutes=10,
    body=r'''Employment-law explainers go stale quickly and are a common source of “low content value” pages when they rephrase rumours. This page only restates what we can attribute to official or primary notices, and it tells you where the information stops.

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

If you believe a HiredFrex article has stated a legal rule incorrectly, use [Contact](/contact) and ask for a correction. See [Editorial standards](/editorial-standards).'''
))

posts.append(art(
    id="post_housing",
    slug="housing-allowances-and-offers-in-the-gulf",
    title="Housing, allowances, and offer letters in the Gulf",
    excerpt="How to read the money parts of a Gulf offer: basic wage versus housing, food, transport, and shared rooms — and which questions to get in writing before you resign.",
    category="UAE jobs",
    author="Nour El-Sayed",
    authorPhoto="/authors/nour.svg",
    publishedOn="2026-09-17",
    updatedOn="2026-09-19",
    readMinutes=11,
    body=r'''An offer that says “AED 3,000 plus housing” and an offer that says “AED 3,000 all-in” are not the same job. This article is a reading guide for the money block of a Gulf offer letter. It is not a salary survey and not legal advice. For UAE labour questions use [MoHRE](https://www.mohre.gov.ae) and [u.ae](https://u.ae).

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

Related: [Entry-level jobs in the UAE](/blog/entry-level-jobs-in-the-uae), [Questions to ask in a Gulf interview](/blog/questions-to-ask-in-a-gulf-job-interview).'''
))

posts.append(art(
    id="post_interview_q",
    slug="questions-to-ask-in-a-gulf-job-interview",
    title="Questions to ask in a Gulf job interview",
    excerpt="A short list of questions that protect you in security, hospitality, warehouse and office interviews — without sounding like a lawyer, and without skipping the official channels.",
    category="CV and applications",
    author="Amira Hassan",
    authorPhoto="/authors/amira.svg",
    publishedOn="2026-09-18",
    updatedOn="2026-09-19",
    readMinutes=10,
    body=r'''Interviews are not only for the employer. If you are relocating, a missed question about housing, shifts, or who files the permit is expensive. This list is for entry-level and skilled operational roles of the kind HiredFrex actually lists. It is not a script for executive search.

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

Related: [UAE interview guide](/guides/uae-interviews), [Start here](/blog/start-here-gulf-job-search), [Documents to prepare](/blog/documents-to-prepare-before-overseas-work).'''
))

posts.append(art(
    id="post_docs",
    slug="documents-to-prepare-before-overseas-work",
    title="Documents to prepare before you apply for overseas work",
    excerpt="A staged document list: what belongs on a first application, what waits for a written offer, and what should never sit in a WhatsApp chat.",
    category="Getting started",
    author="Paul Mensah",
    authorPhoto="/authors/paul.svg",
    publishedOn="2026-09-19",
    updatedOn="2026-09-19",
    readMinutes=11,
    body=r'''People either send everything on day one or send nothing until a plane ticket appears. Both habits cause damage. This is a staged list for Gulf and other overseas operational jobs. It is editorial guidance, not a government form. For UAE procedures use [MoHRE](https://www.mohre.gov.ae).

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

Keep a paper folder or a locked drive. Name files clearly: `Priya-Kumar-CV.pdf`, not `final-final-2.jpg`.

## Attestation and “agents”

Some destinations require attested documents. Attestation is a state process (foreign ministry / embassy), not a product a stranger sells in a PDF. If an agent wants cash to “skip attestation,” they are selling you a story. Confirm the actual requirement on an official page for that country.

## How HiredFrex stores what you upload

Applications on this site may include a CV file. You can ask us to delete stored CV files; the operator has SQL to wipe historic CV data without deleting published articles or jobs. Do not put ID numbers in the CV in the first place.

## A packing list that is not documents

Once the offer is real: copies of the offer letter, emergency contacts, enough medicine for the first weeks, and a plan if housing is not what was described. That is ordinary caution, not suspicion.

Related: [Overseas employment documents guide](/guides/overseas-employment-documents), [Start here](/blog/start-here-gulf-job-search), [Official UAE channels](/blog/official-uae-job-channels), [WhatsApp job offers](/blog/whatsapp-job-offers).'''
))

path = Path("/workspace/src/lib/data/seed-posts.ts")
existing = path.read_text()
if not existing.rstrip().endswith(","):
    existing = existing.rstrip() + ",\n"
path.write_text(existing + ",\n".join(posts) + "\n];\n")

import re
t = path.read_text()
bodies = re.findall(r"slug: '([^']+)'[\s\S]*?body: `([\s\S]*?)`", t)
if not bodies:
    bodies = re.findall(r'slug: "([^"]+)"[\s\S]*?body: `([\s\S]*?)`', t)
print("count", len(bodies))
for slug, body in bodies:
    print(f"{slug:50} {len(body.split()):4}")

#!/usr/bin/env python3
"""Expand HiredFrex seed posts to AdSense-ready length and add 3 new dated articles."""
from pathlib import Path
import re

src = Path("/workspace/src/lib/data/seed-posts.ts").read_text()

META = {
    "international-job-scams-red-flags": dict(
        author="Amira Hassan",
        photo="/authors/amira.svg",
        publishedOn="2026-09-09",
        updatedOn="2026-09-19",
        readMinutes=12,
    ),
    "uae-cv-format-what-recruiters-expect": dict(
        author="Amira Hassan",
        photo="/authors/amira.svg",
        publishedOn="2026-09-11",
        updatedOn="2026-09-19",
        readMinutes=11,
    ),
    "how-ai-cv-screening-works": dict(
        author="Amira Hassan",
        photo="/authors/amira.svg",
        publishedOn="2026-09-14",
        updatedOn="2026-09-19",
        readMinutes=10,
    ),
    "entry-level-jobs-in-the-uae": dict(
        author="Nour El-Sayed",
        photo="/authors/nour.svg",
        publishedOn="2026-09-15",
        updatedOn="2026-09-19",
        readMinutes=11,
    ),
    "uae-2026-wage-rules-what-we-can-confirm": dict(
        author="Nour El-Sayed",
        photo="/authors/nour.svg",
        publishedOn="2026-09-16",
        updatedOn="2026-09-19",
        readMinutes=10,
    ),
    "start-here-gulf-job-search": dict(
        author="Paul Mensah",
        photo="/authors/paul.svg",
        publishedOn="2026-09-08",
        updatedOn="2026-09-19",
        readMinutes=12,
    ),
    "what-reviewed-means-on-hiredfrex": dict(
        author="Paul Mensah",
        photo="/authors/paul.svg",
        publishedOn="2026-09-13",
        updatedOn="2026-09-19",
        readMinutes=10,
    ),
    "official-uae-job-channels": dict(
        author="Nour El-Sayed",
        photo="/authors/nour.svg",
        publishedOn="2026-09-10",
        updatedOn="2026-09-19",
        readMinutes=11,
    ),
    "whatsapp-job-offers": dict(
        author="Amira Hassan",
        photo="/authors/amira.svg",
        publishedOn="2026-09-12",
        updatedOn="2026-09-19",
        readMinutes=10,
    ),
}

EXTRA = {
    "uae-cv-format-what-recruiters-expect": r'''

## Education and certificates

List education in reverse chronological order. For Gulf operational roles, a secondary-school certificate plus the licence the job actually requires (for example a security guard licence, food-safety card, or first-aid certificate) is more useful than a long list of unrelated short courses.

Write certificates as **name — issuer — year**. Do not upload a scan of the certificate on the CV itself. Keep scans for the employer’s onboarding portal after a written offer.

If you trained with a government or licensed institute, name it. If you completed a two-day online course, say so in one line rather than dressing it as a degree.

## Language lines that a human can believe

“Fluent in English” on every CV is noise. Use a level you can defend in an interview:

- Spoken English: conversational / working / fluent
- Arabic: none / basic / working / fluent
- Other languages you will actually use on shift

A security or hospitality listing that asks for English and Arabic is not asking for a literary essay. It is asking whether you can take an instruction and answer a guest. Be honest. Interviewers test this in the first minute.

## Cover notes on HiredFrex

The application form on this site has a short cover note. Use four sentences:

1. The exact job title and city.
2. One fact from your last role that matches the listing.
3. Your current location and visa status.
4. When you can start.

Do not paste the entire CV. Do not write that you will pay for your own visa. Do not beg.

## File hygiene

- PDF, not a Word file full of tracked changes
- Under 2 MB
- No password
- No photo of a printed CV taken at an angle
- No other people’s phone numbers in the header

If a recruiter cannot open the file on a phone, they will not chase you.

## A worked example (composite, not a real person)

**Priya K., housekeeping attendant, currently in Kochi**

Summary: Housekeeping attendant targeting Dubai hotel and residential sites. Three years of room cleaning and linen counts in a 90-room property. Ready to relocate; would require employer sponsorship.

Experience: Housekeeping attendant — South Bay Inn — Kochi — 2023–2026. Cleaned 14 rooms per shift; restocked linen; reported maintenance issues in a daily log.

That is enough for an entry-level listing. Padding it with “synergistic hospitality leadership” does not help.

Related: [How AI CV screening works](/blog/how-ai-cv-screening-works), [Start here](/blog/start-here-gulf-job-search).''',
    "how-ai-cv-screening-works": r'''

## What a parser usually cannot see

If your CV is a designed poster — two columns, skill bars, icons instead of the word “Excel” — many applicant-tracking systems store a garbled version. The recruiter then sees missing dates. You look unemployed.

Test this yourself: copy the text out of your PDF into a plain notes app. If the order of jobs collapses, fix the layout before you apply.

Photos can also confuse a parser. A small headshot in the header is common in the Gulf and is usually tolerated. A full-page watermark of your face is not.

## How HiredFrex applications are actually read

On this site, employers open an applicant list with your name, email, phone, cover note, and CV text. There is no hidden model score that auto-rejects you. If an employer later uses their own software, that is their process, not ours.

We will not sell a “beat the ATS” product. Most of those products add the same keywords every other applicant added.

## A note on generated CVs

If you use the [HiredFrex CV builder](/cv-builder), read every line before you send it. Language models complete patterns. They are good at making a bullet sound finished and bad at knowing whether you actually ran a 200-person site. A false seniority claim is worse than a short honest CV.

Delete anything you cannot discuss in an interview.

## For employers reading this

If you screen with software, tell candidates which file types you accept. Do not require a photo if your tool strips images. Do not reject a one-page operational CV because it lacks a “professional summary” paragraph. See [responsible hiring](/guides/responsible-hiring).

Related: [UAE CV format](/blog/uae-cv-format-what-recruiters-expect), [AI interviews guide](/guides/ai-job-interviews).''',
    "entry-level-jobs-in-the-uae": r'''

## How to read salary on a small sample

When HiredFrex shows an advertised range, it is the number the employer typed, after we checked that it is internally consistent (currency + period). It is not:

- A MoHRE minimum for every nationality
- A cost-of-living calculation
- A promise that overtime is included
- Net of housing or food

If housing is “provided,” ask what that means: a bed in a shared room, a hotel staff house, or an allowance. The difference is the difference between a workable offer and a surprise.

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

Related: [Start here](/blog/start-here-gulf-job-search), [UAE wage rules we can confirm](/blog/uae-2026-wage-rules-what-we-can-confirm).''',
    "uae-2026-wage-rules-what-we-can-confirm": r'''

## Why commercial blogs get this wrong

Search results in 2026 are full of pages that turn one MoHRE notice into a “salary for all jobs in Dubai.” That is how readers get hurt and how publishers get labelled low-value. The AED 6,000 figure in the 31 December 2025 notice is scoped to **Emiratis in the private sector**. Repeating it as a universal floor is not a paraphrase. It is an error.

If another HiredFrex page ever implies otherwise, treat this article as the correction and [email us](/contact).

## End-of-service and other money that is not “salary”

UAE labour law has rules on end-of-service benefits, unpaid wages, and working time. Those rules are detailed and are updated. This article does not reprint the entire Federal Decree-Law. Use [MoHRE](https://www.mohre.gov.ae) and [u.ae](https://u.ae) for the current text. A job board page that “summarises everything” without a date and a source is the page you should not trust.

## What to ask in writing before you accept

1. Basic wage (the figure that usually feeds end-of-service calculations)
2. Allowances, named separately (housing, transport, food)
3. Overtime rule, if any
4. Pay cycle and method (WPS is the expected channel for covered private-sector employees)
5. Whether accommodation is a room, an allowance, or neither

If the offer mixes all of that into one WhatsApp voice note, ask for a letter. See [Housing, allowances, and offers](/blog/housing-allowances-and-offers-in-the-gulf).

## HiredFrex’s own listing rule

We do not invent a salary when the employer left it blank. Blank is an honest field. A made-up “market average” would make this site look complete and be false.

Related: [Official UAE job channels](/blog/official-uae-job-channels), [Market report](/market-report).''',
    "start-here-gulf-job-search": r'''

## Time and money you should budget for (without paying a broker)

A genuine overseas hire still costs *you* time: CV, interviews, notice period, medical steps the **employer** may arrange after an offer. It should not cost you an upfront “processing fee” to a person on chat.

Budget for:

- A working phone number that can receive international calls
- A quiet place for a video interview
- Certified copies of certificates *when the employer or a government portal asks*, not when a stranger asks on day one
- The ability to wait. Pressure to pay today is a signal, not a service.

## How to use HiredFrex without treating it as a ministry

Use the [jobs](/jobs) column on this site after you have read one scam article and one official-channel article. Apply on the listing page. If you are hiring, use [employer posting](/employers). If something feels wrong, use [report](/report).

That is the whole product. There is no paid fast lane.

## If you are already in the UAE

Your problem is usually notice period, visa transfer, and whether the new employer will actually file. Bring your labour contract and visa status to the conversation in one sentence. Do not hide a current visa problem; it will appear in the government system anyway.

Related: [Documents to prepare](/blog/documents-to-prepare-before-overseas-work), [Official UAE channels](/blog/official-uae-job-channels).''',
    "what-reviewed-means-on-hiredfrex": r'''

## How a listing becomes public

1. An employer submits a complete form (title, city, workplace type, overview, how to apply).
2. Automated checks look for fees, placeholders, remote-on-physical-work, and name mismatches.
3. Flagged jobs go to an editor. They are not auto-deleted; they are not auto-approved.
4. Only `published` jobs with a review status in the public set appear on [Jobs](/jobs) and in the jobs rail.

You will not see pending, rejected, or closed roles in that rail.

## What we record when we can

When an employer gives a public careers URL, we store it as `source_url` and may raise the label to source-confirmed. When we cannot, we do not fake a URL. A missing source is visible on the job page.

## Corrections

If a company says a listing impersonates them, we take it down while we look. If a wage figure was typed wrong, we correct it and leave a note where we can. Editorial identity for articles is separate from job review; see [Editorial standards](/editorial-standards).

Related: [How we review listings](/how-we-verify), [International job scams](/blog/international-job-scams-red-flags).''',
    "official-uae-job-channels": r'''

## Private boards that copy each other

A vacancy copied across five aggregators is still one vacancy — or one scam. HiredFrex does not syndicate Jooble or other scraped feeds. If you see the same text on another site, compare the employer name, the email domain, and whether anyone is asking for money.

## Government pages change; blogs lag

Bookmark the official URLs rather than a screenshot in a WhatsApp group. If this article’s links 404, use the MoHRE search box and [tell us](/contact). We would rather correct a URL than keep a confident dead link.

## For employers posting here

Do not write “visa guaranteed” in the job body. You may describe that *you* will sponsor a work permit if the hire proceeds. The permit is still a government process. See [employer posting](/employers).

Related: [UAE employment visa guide](/guides/uae-employment-visa), [Start here](/blog/start-here-gulf-job-search).''',
    "whatsapp-job-offers": r'''

## Names that get cloned

Hotel groups, airlines, and facilities companies are cloned daily. A display name “Radisson HR” on WhatsApp is not a credentials check. Open the careers page on the real domain. If the chat cannot wait for that, the chat is the product, not the job.

HiredFrex will never ask you on WhatsApp to pay for a listing to stay up, to unlock an interview, or to verify a code with cryptocurrency.

## Voice notes and urgency

Fraud uses urgency because urgency skips the official page. “The seat closes tonight” plus a payment link is a sales script. A real employer can usually write the same sentence in email on company domain tomorrow.

## If they used our logo

Save the message. Send it to [support@hiredfrex.com](mailto:support@hiredfrex.com) and use [report](/report) if there is a URL on this site. We do not issue refunds for money you sent to a third party; we can take down a listing and warn other readers.

Related: [International job scams](/blog/international-job-scams-red-flags), [How to verify a job offer](/guides/verify-a-job-offer).''',
    "international-job-scams-red-flags": r'''

## A short checklist you can screenshot

1. No payment for a job, a visa, or a “file opening.”
2. No passport or bank card in the first chat.
3. No remote-access software.
4. Company-domain email or a listing you can open on a real site.
5. Written terms before you resign.

Tape that next to the [FTC job-scam page](https://consumer.ftc.gov/articles/job-scams). Different country, same sequence.

Related: [WhatsApp job offers](/blog/whatsapp-job-offers), [Start here](/blog/start-here-gulf-job-search).''',
}

NEW_POSTS = r'''
  {
    id: "post_housing",
    slug: "housing-allowances-and-offers-in-the-gulf",
    title: "Housing, allowances, and offer letters in the Gulf",
    excerpt:
      "How to read the money parts of a Gulf offer: basic wage versus housing, food, transport, and shared rooms — and which questions to get in writing before you resign.",
    category: "UAE jobs",
    author: "Nour El-Sayed",
    authorPhoto: "/authors/nour.svg",
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

A canteen meal is not a salary. A company bus is not a transport allowance you can spend. If you have a medical diet or a second job at night, staff housing plus a bus schedule may make the role unworkable. That is a practical issue, not a moral one. Ask before you buy a ticket.

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

When you have two offers, write:

| Item | Offer A | Offer B |
| --- | --- | --- |
| Basic wage | | |
| Housing (room or cash) | | |
| Transport / food | | |
| City and commute | | |
| Notice period | | |
| Who files the permit | | |

If you cannot fill a cell, you do not have an offer yet.

Related: [Entry-level jobs in the UAE](/blog/entry-level-jobs-in-the-uae), [Questions to ask in a Gulf interview](/blog/questions-to-ask-in-a-gulf-job-interview).`,
  },
  {
    id: "post_interview_q",
    slug: "questions-to-ask-in-a-gulf-job-interview",
    title: "Questions to ask in a Gulf job interview",
    excerpt:
      "A short list of questions that protect you in security, hospitality, warehouse and office interviews — without sounding like a lawyer, and without skipping the official channels.",
    category: "CV and applications",
    author: "Amira Hassan",
    authorPhoto: "/authors/amira.svg",
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

Related: [UAE interview guide](/guides/uae-interviews), [Start here](/blog/start-here-gulf-job-search).`,
  },
  {
    id: "post_docs",
    slug: "documents-to-prepare-before-overseas-work",
    title: "Documents to prepare before you apply for overseas work",
    excerpt:
      "A staged document list: what belongs on a first application, what waits for a written offer, and what should never sit in a WhatsApp chat.",
    category: "Getting started",
    author: "Paul Mensah",
    authorPhoto: "/authors/paul.svg",
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

Keep a paper folder or a locked drive. Name files clearly: \`Priya-Kumar-CV.pdf\`, not \`final-final-2.jpg\`.

## Attestation and “agents”

Some destinations require attested documents. Attestation is a state process (foreign ministry / embassy), not a product a stranger sells in a PDF. If an agent wants cash to “skip attestation,” they are selling you a story. Confirm the actual requirement on an official page for that country.

## How HiredFrex stores what you upload

Applications on this site may include a CV file. You can ask us to delete stored CV files; we keep a SQL script for the operator to wipe historic CV data without deleting published articles or jobs. Do not put ID numbers in the CV in the first place.

## A packing list that is not documents

Once the offer is real: copies of the offer letter, emergency contacts, enough medicine for the first weeks, and a plan if housing is not what was described. That is ordinary caution, not suspicion.

Related: [Overseas employment documents guide](/guides/overseas-employment-documents), [Start here](/blog/start-here-gulf-job-search), [Official UAE channels](/blog/official-uae-job-channels).`,
  },
'''

# Patch metadata fields in existing objects
for slug, m in META.items():
    # author line after that slug
    src = re.sub(
        rf'(slug: "{slug}",[\s\S]*?author: ")[^"]+(")',
        rf'\1{m["author"]}\2',
        src,
        count=1,
    )
    src = re.sub(
        rf'(slug: "{slug}",[\s\S]*?publishedOn: ")[^"]+(")',
        rf'\1{m["publishedOn"]}\2',
        src,
        count=1,
    )
    src = re.sub(
        rf'(slug: "{slug}",[\s\S]*?updatedOn: ")[^"]+(")',
        rf'\1{m["updatedOn"]}\2',
        src,
        count=1,
    )
    src = re.sub(
        rf'(slug: "{slug}",[\s\S]*?readMinutes: )\d+',
        rf'\g<1>{m["readMinutes"]}',
        src,
        count=1,
    )
    # insert authorPhoto after author if missing
    src = re.sub(
        rf'(slug: "{slug}",[\s\S]*?author: "{m["author"]}",\n)',
        rf'\1    authorPhoto: "{m["photo"]}",\n',
        src,
        count=1,
    )

# Append extras before closing backtick of each body
for slug, extra in EXTRA.items():
    pat = rf'(slug: "{slug}",[\s\S]*?body: `[\s\S]*?)(`\s*,\n  \}})'
    m = re.search(pat, src)
    if not m:
        print("WARN no body for", slug)
        continue
    src = src[:m.start(1)] + m.group(1) + extra + src[m.end(1):]

# Insert new posts before final ];
src = src.rstrip()
if src.endswith("];"):
    src = src[:-2].rstrip()
    if src.endswith(","):
        pass
    else:
        src += ","
    src += "\n" + NEW_POSTS.strip() + "\n];\n"
else:
    raise SystemExit("unexpected file ending")

Path("/workspace/src/lib/data/seed-posts.ts").write_text(src)
print("wrote seed-posts.ts", len(src))
# recount
bodies = re.findall(r'slug: "([^"]+)"[\s\S]*?body: `([\s\S]*?)`', src)
for slug, body in bodies:
    print(f"{slug:50} {len(body.split()):4} words")

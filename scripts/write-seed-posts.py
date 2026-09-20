#!/usr/bin/env python3
from pathlib import Path
from textwrap import dedent

def art(**kwargs):
    body = kwargs.pop("body").strip("\n")
    kwargs.setdefault("authorPhoto", "")
    kwargs.setdefault("coverUrl", "")
    kwargs.setdefault("published", True)
    kwargs.setdefault("indexable", True)
    # escape backticks in body? none expected
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
    published: {str(kwargs['published']).lower()},
    indexable: {str(kwargs['indexable']).lower()},
    publishedOn: {kwargs['publishedOn']!r},
    updatedOn: {kwargs['updatedOn']!r},
    readMinutes: {kwargs['readMinutes']},
    body: `{body}`,
  }}"""

posts = []

posts.append(art(
    id="post_start_here",
    slug="start-here-gulf-job-search",
    title="Start here: a Gulf job search that does not pay a facilitator",
    excerpt="A working sequence for people targeting UAE and Gulf roles: official channels first, then a CV, then a listing you can actually read — including what HiredFrex will and will not do for you.",
    category="Getting started",
    author="Paul Mensah",
    authorPhoto="/authors/paul.svg",
    publishedOn="2026-09-08",
    updatedOn="2026-09-19",
    readMinutes=12,
    body=r'''If you are applying from abroad, the expensive mistakes happen early: paying a stranger to “process a visa,” sending a passport scan on WhatsApp, or treating a job board page as a government approval. This is the sequence HiredFrex recommends. It is editorial guidance, not a recruitment contract and not legal advice.

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

Related: [Official UAE channels vs private boards](/blog/official-uae-job-channels), [WhatsApp job offers](/blog/whatsapp-job-offers), [Documents to prepare](/blog/documents-to-prepare-before-overseas-work).'''
))

posts.append(art(
    id="post_scams",
    slug="international-job-scams-red-flags",
    title="International job scams: red flags every overseas applicant should know",
    excerpt="Reported US job-scam losses passed $500 million in 2024. This guide lists the checks HiredFrex uses, the checks you should still do yourself, and where to report a fake offer.",
    category="Scam awareness",
    author="Amira Hassan",
    authorPhoto="/authors/amira.svg",
    publishedOn="2026-09-09",
    updatedOn="2026-09-19",
    readMinutes=12,
    body=r'''Overseas job search is a high-trust situation: you share a passport copy, a CV, and often a phone number before you have met anyone. Scammers know that. This article is a working checklist, not a scare piece. It is based on public consumer-protection guidance and on the review rules HiredFrex actually applies to listings.

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

Related: [WhatsApp job offers](/blog/whatsapp-job-offers), [Start here](/blog/start-here-gulf-job-search).'''
))

# Write remaining posts in a second chunk via this same file - continue appending
out_head = '''import type { SeedPost } from "./types";

export const SEED_POSTS: SeedPost[] = [
'''

Path("/tmp/posts-part1.txt").write_text(",\n".join(posts))
print("part1 posts", len(posts), "words", sum(p.count(" ")/1 for p in posts))
Path("/tmp/part1_count.txt").write_text("ok")
# save posts list pickle-less: write TS partial
Path("/workspace/src/lib/data/seed-posts.ts").write_text(out_head + ",\n".join(posts) + ",\n")
print("wrote partial", Path("/workspace/src/lib/data/seed-posts.ts").stat().st_size)

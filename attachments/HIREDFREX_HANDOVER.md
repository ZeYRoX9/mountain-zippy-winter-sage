# HiredFrex.com — Complete Project Handover
**Date:** September 2026  
**Prepared for:** Incoming colleague  
**Current build:** `hiredfrex-2026.08.09.zip`  
**Footer stamp to verify live build:** "build 2026.08.09"

---

## 1. What HiredFrex Is

An international job board targeting **Gulf/entry-level roles** — security officer, housekeeping, waitress, porter, general assistant — plus general categories. Free for job seekers to apply, free for employers to post (for now). Every listing goes through admin review before going live.

**Live site:** https://hiredfrex.com  
**Admin panel:** https://hiredfrex.com/admin.html  
**Owner:** Paul (Abu Dhabi, UAE), solo founder

---

## 2. Full Tech Stack

| Layer | Service | Plan | Notes |
|---|---|---|---|
| Frontend hosting | Netlify | Free | Drag-and-drop zip deploy, no CLI/GitHub |
| Backend | Netlify Functions (serverless) | Free | 23 functions, esbuild-bundled |
| Database | Neon (serverless Postgres) | Free tier | All data lives here |
| Domain registrar | Hostinger | Paid | DNS managed here |
| Business email | Zoho Mail | Free tier | support@hiredfrex.com |
| Transactional email | SendGrid | Trial (expires Sept 4, 2026) | Domain authenticated via DNS |
| AI (CV builder) | Anthropic Claude Haiku 4.5 | Pay-per-use | `claude-haiku-4-5-20251001` |
| Ad monetization | Google AdSense + Ezoic Incubator | Pending | AdSense rejected once; Ezoic Step 1 done |
| Analytics | GA4 | Free | Snippet injection in Netlify — NOT YET CONFIRMED SET UP |

**Deploy method:** Zip the deploy folder → drag into Netlify → Deploys. No CLI, no GitHub, no build step.

---

## 3. Architecture

**Single self-contained `index.html`** — vanilla JS SPA assembled from three source files:
- `base2.html` — HTML shell, CSS, header, footer
- `views.html` — all 14 SPA view panels
- `app.js` — all JavaScript logic

**SSR pages** (separately crawlable, real URLs for SEO/AdSense):
- `/jobs` — job listings
- `/job/:id` — individual job detail with JobPosting schema (Google for Jobs)
- `/blog` — article list
- `/blog/:slug` — individual article
- `/about`, `/faq`, `/contact`, `/privacy`, `/terms`, `/disclaimer`, `/cookies`
- `/sitemap` — human-readable sitemap
- `/sitemap.xml` — XML sitemap for search engines

All SSR pages are served via a single `pages.js` Netlify Function with `netlify.toml` redirects routing each path.

---

## 4. Environment Variables (Netlify → Site configuration → Environment variables)

All must be set on the new/current Netlify site. **These are never stored in code.**

| Variable | What it is | Where to get it |
|---|---|---|
| `DATABASE_URL` | Neon connection string (pooled) | Neon dashboard → Connect → copy pooled string |
| `JWT_SECRET` | Signs user sessions | Arbitrary long random string (regenerate if lost) |
| `ADMIN_TOKEN` | Password for /admin.html | Arbitrary string (regenerate if lost) |
| `SENDGRID_API_KEY` | Transactional email | SendGrid → Settings → API Keys |
| `EMAIL_FROM` | `support@hiredfrex.com` | Literal value |
| `OWNER_EMAIL` | Where notifications land | `support@hiredfrex.com` or Paul's personal email |
| `APP_URL` | `https://hiredfrex.com` | Literal value |
| `ANTHROPIC_API_KEY` | CV builder AI | console.anthropic.com → API Keys |
| `JOOBLE_API_KEY` | External job feed (currently disabled/removed) | Not needed — Jooble was removed |

**After changing any variable: redeploy the zip for it to take effect.**

---

## 5. Database Schema (Neon)

Run `schema.sql` to create/migrate all tables. Safe to re-run (all use `IF NOT EXISTS` / `ALTER TABLE ... IF NOT EXISTS`).

**Key tables:**
- `users` — all accounts (seekers + employers), with avatar, email verification, OTP codes
- `employers` — company records linked to employer users, with logo storage
- `jobs` — all listings with status (`pending` / `active` / `closed` / `needs_verification`), requirements, benefits, flag_reasons
- `applications` — all job applications with status (`submitted` / `shortlisted` / `denied`), phone, CV data
- `blog_posts` — blog articles with body, featured image, published flag
- `messages` — contact form submissions
- `api_keys` — partner API keys (hashed, revocable)
- `saved_jobs` — seeker saved/bookmarked jobs

---

## 6. All Features Built

### Authentication
- Dual-role signup (seeker / employer toggle) with company name + optional company email
- Email 2FA via 6-digit OTP (SendGrid)
- Forgot password via OTP
- Auto-account-creation when applying without an account
- JWT session cookies (30-day expiry)
- Time-based greeting on dashboard ("Good morning/afternoon/evening")
- Session check (`/api/me`) is migration-proof — missing columns never log users out

### Job Seeker
- Browse and filter jobs by category, keyword, location
- Job cards are real `<a href="/job/:id">` anchors (SEO + right-click/Ctrl-click works)
- Apply with name, email, phone (required, with country-code dropdown), LinkedIn, cover note, CV upload (drag & drop, 3MB limit)
- Profile picture upload (client-resized to 256px, stored in Neon)
- Free AI CV builder (structured: repeatable Experience/Education rows, Skills, Languages, Certifications) powered by Haiku 4.5
- Seeker dashboard: My Applications (with real status: Submitted/Shortlisted/Not selected), Saved Jobs, My Details (name, phone, email), Settings (avatar, password change)
- Application status badge animates with gold pulse when shortlisted

### Employer
- Self-serve signup (instant, no admin gate) — employer accounts approved immediately
- Job posting form (Indeed-inspired 3 sections: Job basics / Location & pay / Role details) with Requirements and Benefits fields
- Jobs default to `pending` status until admin approves
- Employer dashboard: Post a Job, My Jobs (with status badges), Applicants per job (with Shortlist / Not a fit action buttons)
- Shortlist/Deny sends automatic applicant notification emails
- Account tab: My Details (name, phone), Company logo upload (stored in Neon, shown on job cards + detail pages + JobPosting schema)
- Nav switches to "My Jobs / Post a Job" when employer is logged in
- Hero section transforms to employer-focused content when employer is logged in

### Admin (`/admin.html`)
- Password: `ADMIN_TOKEN` environment variable
- Stats overview
- Employer list
- Jobs tab: full listing details expandable, flagged jobs sorted to top with orange border and specific flag reason shown, Approve / Close / Reopen / Delete buttons
- Auto-generated LinkedIn caption copied to clipboard + emailed on approval
- Applicants tab: all applications with CV download, phone visible
- Users tab
- Messages tab (contact form submissions)
- Blog CMS: create/edit/delete posts with featured image upload
- API Keys tab: generate/revoke partner keys

### Integrity / Trust System
- New jobs run through 2 automated heuristic checks at submission:
  1. **Employer-name mismatch** — if the job description mentions a different company name than the listed employer (e.g. the Vertex/Maple Leaf incident), it's flagged
  2. **Remote/on-site contradiction** — Security, Hospitality, and General Labor roles marked "remote-friendly" are flagged
- Flagged jobs get `status='needs_verification'` — never auto-deleted or auto-rejected
- Admin sees the specific flag reason and decides to approve or delete manually
- All public queries filter strictly to `status='active'` — flagged and pending jobs are invisible to visitors

### Blog / Content
- SSR blog list with featured article (large card), remaining in a grid
- Reading time calculated per article
- Featured image upload (client-resized to 1200px, stored in Neon)
- Reading progress bar on article pages
- "Read next" card grid at the bottom of articles
- Dark mode synced to SPA preference
- Mobile hamburger nav on SSR pages

### Partner API
- `GET /api/public-jobs` — returns active job listings as JSON
- Requires `Authorization: Bearer hf_live_...` header
- Keys are hashed (SHA-256) — never stored in plaintext; shown once on creation
- Admin can revoke any key instantly
- Rate-limited to read-only; no write access

### Other
- Contact form: full-card success swap, stores to DB, emails `OWNER_EMAIL`
- Cookie consent banner
- Dark/light mode toggle (defaults to light)
- Scroll-reveal animations on homepage sections
- Print-friendly CV output (CSS @media print)
- `ads.txt` — now redirects to Ezoic's managed file (Step 1 complete)
- AdSense publisher ID `ca-pub-6456794295168638` — in both SPA and all SSR pages
- `robots.txt` — correct (allows all, disallows /admin.html)
- `og:image`, favicon (96px), apple-touch-icon, PWA manifest

---

## 7. SEO / AdSense Status

### What was fixed for AdSense
- **Routing architecture** — About, FAQ, Contact, Privacy, Terms, Disclaimer, Cookies are now real separately-crawlable pages at their own URLs (previously trapped inside the SPA with no individual URL)
- **Job card URLs** — job cards are now real `<a href="/job/:id">` links, not `<div onclick>` — Google can crawl every listing directly
- **No syndicated content** — Jooble aggregation was deliberately removed (AdSense low-value/syndicated-content risk)
- **No fabricated claims** — all "verified employers" copy replaced with accurate "reviewed listings" language
- **All legal pages substantive** — no "starter template" banners anywhere
- **Google cookie disclosure** — Privacy Policy and Cookie Policy both contain the required verbatim AdSense cookie disclosure language with opt-out links
- **Ezoic Step 1** — ads.txt now redirects to Ezoic's managed file

### AdSense current status
- First application: **rejected** — reason: "low content value" (caused by the routing architecture issue, now fixed)
- Reapplication: **not yet submitted** — do this after the 08.09 build is deployed and Google has recrawled

### AdSense next steps
1. Deploy `hiredfrex-2026.08.09.zip`
2. Submit sitemap in Google Search Console → request indexing on all new pages
3. Wait 2-4 weeks for recrawl
4. Reapply to AdSense

### Ezoic Incubator status
- Step 1 (ads.txt): ✅ Complete — redirect in netlify.toml
- Step 2 (Site Integration / JavaScript): ⏳ Not yet — needs the script snippet from Ezoic's instructions page
- **SendGrid trial expires September 4, 2026** — must upgrade or migrate to Zoho SMTP before then or all email (2FA, notifications) breaks

---

## 8. DNS Records (Hostinger)

| Type | Name | Value |
|---|---|---|
| A | @ | 75.2.60.5 (Netlify) |
| CNAME | www | scintillating-narwhal-37c961.netlify.app |
| MX | @ (priority 10) | mx.zoho.com |
| MX | @ (priority 20) | mx2.zoho.com |
| MX | @ (priority 50) | mx3.zoho.com |
| TXT | @ | v=spf1 include:zohomail.com include:sendgrid.net -all |
| TXT | @ | zoho-verification=zb27212270.zmverify.zoho.com |
| TXT | zmail._domainkey | (DKIM key for Zoho) |
| CNAME | s1._domainkey | s1.domainkey.uXXXXXX.wlXXX.sendgrid.net |
| CNAME | s2._domainkey | s2.domainkey.uXXXXXX.wlXXX.sendgrid.net |
| CNAME | em6051 | uXXXXXX.wlXXX.sendgrid.net |
| TXT | _dmarc | v=DMARC1; p=none; |

---

## 9. Live Employer Listings (as of handover)

All reached via direct outreach, all approved:
1. **CREW PRIVE Facilities Management** — Security Officer, Dubai
2. **Radisson Hotel Group** — Housekeeping Attendant, Dubai
3. **Aiza Hospitality** — Waiter/Waitress, Dubai
4. **One&Only One Za'abeel** — Bellman, Dubai
5. **Vertex Business Support Inc.** — Office Assistant, Toronto, Canada *(Note: their job description mistakenly named "Maple Leaf Business Solutions" — flag for correction)*

---

## 10. Blog Posts Published

1. UAE's New 2026 Salary Rules — `/blog/uae-2026-salary-law-changes`
2. International Job Scams in 2026 — `/blog/international-job-scams-2026-red-flags`
3. Entry-Level Jobs in the UAE (2026) — `/blog/entry-level-jobs-uae-2026-salaries-guide`
4. AI Job Interviews in 2026 — `/blog/ai-job-interviews-2026-entry-level-guide`
5. Four original articles (written earlier, exact slugs visible in admin)

Blog banners (PNG, 1200×630) are available in the outputs folder.

---

## 11. What Is NOT Built Yet

| Gap | Priority | Notes |
|---|---|---|
| **Stripe payments** | High — #1 revenue gap | Employers post free currently; no monetization at all |
| **Ezoic Step 2** (JavaScript integration) | High — needed for Ezoic to work | Awaiting script snippet from Ezoic dashboard |
| **GA4 analytics** | Medium | Property created? Snippet may not be installed — verify with Realtime report |
| **SendGrid upgrade** | Urgent — Sept 4 deadline | Trial ends; upgrade or migrate to Zoho SMTP |
| **Job alert emails** | Medium | "Notify me of new Security Officer roles" — not built |
| **"Similar roles" section** | Low | On job detail pages |
| **"Report this job" button** | Low | For visitors to flag suspicious listings |
| **Authenticator-app 2FA** | Low | Currently email-only |
| **Employer public pages** | Low | e.g. company.hiredfrex.com |

---

## 12. Deploy Instructions

1. Download `hiredfrex-2026.08.09.zip` from outputs
2. Netlify → your site → **Deploys** tab
3. Drag the zip file into the deploy drop zone
4. Wait ~60 seconds
5. Hard-refresh the site (`Ctrl+Shift+R`)
6. Confirm footer reads **"build 2026.08.09"**

**Never drag an unzipped folder** — always the zip itself.

---

## 13. Key Files in the Deploy Zip

```
index.html              — The entire SPA frontend
admin.html              — Admin dashboard
ads.txt                 — (now redirected to Ezoic via netlify.toml)
robots.txt              — Search engine instructions
netlify.toml            — Routing, function config, redirects
netlify/functions/      — 23 serverless backend functions
  pages.js              — All SSR page rendering
  jobs.js               — Job listing CRUD + integrity checks
  apply.js              — Job applications
  applications.js       — Employer applicant management
  signup.js             — User registration
  signin.js             — Login
  me.js                 — Session check
  seeker.js             — Seeker dashboard data
  admin-data.js         — Admin panel data + actions
  blog.js               — Blog CMS
  blog-image.js         — Serves blog featured images
  profile.js            — Profile + avatar + company logo
  company-logo.js       — Serves company logos
  public-jobs.js        — Partner API (key-gated)
  contact.js            — Contact form
  cv-generate.js        — AI CV builder (Haiku 4.5)
  sitemap.js            — XML sitemap
  ...and others
schema.sql              — Full database schema (safe to re-run)
```

---

## 14. Important Notes for Your Colleague

- **Never commit `DATABASE_URL`, `JWT_SECRET`, `ADMIN_TOKEN`, or any API keys to any file** — they live only in Netlify's environment variables panel
- **Test jobs:** check the admin Jobs tab and delete any listings with "test" in the name before the AdSense reapplication
- **Vertex Business listing:** the job description names "Maple Leaf Business Solutions" instead of "Vertex Business Support Inc." — edit the live listing to correct this
- **SendGrid trial expires September 4, 2026** — this is the most urgent operational task; if it lapses, email 2FA stops working and no one can sign up or log in via the normal flow
- **The "needs_verification" admin state** is intentional and designed — do NOT auto-approve flagged jobs; always read the specific flag reason before approving
- **Version stamp in the footer** tells you which build is live — if the footer doesn't match the zip filename, the wrong build is deployed

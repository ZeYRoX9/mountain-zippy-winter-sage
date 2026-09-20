#!/usr/bin/env node
/** Preview server: HiredFrex publication + SPA job portal on 0.0.0.0:8080 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../hiredfrex");
const PORT = Number(process.env.PORT || 8080);
const HOST = "0.0.0.0";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
};

const SPA_PATHS = new Set(["/jobs", "/cv", "/cv-builder"]);

function send(res, code, body, type = "text/html; charset=utf-8") {
  res.writeHead(code, {
    "Content-Type": type,
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function tryFile(rel) {
  const fp = path.join(ROOT, rel);
  if (!fp.startsWith(ROOT)) return null;
  if (fs.existsSync(fp) && fs.statSync(fp).isFile()) return fp;
  return null;
}

function hubHtml(title, h1, body) {
  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="google-adsense-account" content="ca-pub-6456794295168638"/>
<title>${title}</title>
<link rel="icon" href="/favicon.png"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--navy:#0c1a3a;--gold:#c6a04e;--gold2:#d6b463;--gold-deep:#a8842f;--paper:#f8f7f3;--ink:#0c1a3a;--ink2:#515a6e;--line:#ebe8e0;--fd:Fraunces,Georgia,serif;--fs:'Plus Jakarta Sans',system-ui,sans-serif}
*{box-sizing:border-box}body{margin:0;font-family:var(--fs);background:var(--paper);color:var(--ink);line-height:1.65}
header{background:var(--navy);padding:14px 20px;display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.brand{font-family:var(--fd);font-weight:700;font-size:20px;text-decoration:none;color:#fff}
.brand b{color:var(--gold2)}
nav a{margin-right:10px;font-weight:700;font-size:13.5px;color:#b0bcda;text-decoration:none}
.jobs{background:#fff;color:var(--navy)!important;padding:7px 12px;border-radius:8px;text-transform:uppercase;letter-spacing:.05em;font-size:12px!important}
main{max-width:760px;margin:0 auto;padding:40px 20px 80px}
h1{font-family:var(--fd);font-size:clamp(28px,5vw,40px);line-height:1.1}
h2{font-family:var(--fd);margin-top:28px}
p,li{color:var(--ink2)}
.lead{font-size:18px;font-weight:500}
.btn{display:inline-block;background:var(--navy);color:#fff;padding:12px 18px;border-radius:12px;font-weight:700;text-decoration:none;margin:8px 8px 8px 0}
ul{padding-left:20px}
footer{background:var(--navy);padding:24px 20px;color:#8c93a3;font-size:14px;text-align:center}
footer a{color:var(--gold2);margin:0 10px;text-decoration:none}
</style></head><body>
<header>
  <a class="brand" href="/">Hired<b>Frex</b></a>
  <nav>
    <a class="jobs" href="/jobs">Jobs</a>
    <a href="/career">Career</a>
    <a href="/uae-jobs">UAE Jobs</a>
    <a href="/salaries">Salaries</a>
    <a href="/interviews">Interviews</a>
    <a href="/blog">Latest</a>
  </nav>
</header>
<main><h1>${h1}</h1>${body}</main>
<footer>
  <a href="/jobs">Jobs</a><a href="/editorial-standards">Editorial standards</a><a href="/privacy">Privacy</a><a href="/contact">Contact</a>
  <div style="margin-top:10px">© 2026 HiredFrex.com · publication + job portal</div>
</footer></body></html>`;
}

const HUB_BODY = {
  career: ["Career desk — HiredFrex", "Career desk", `<p class="lead">This desk is for reading. When you want to search or apply, open the job portal.</p><p><a class="btn" href="/jobs">Open Jobs</a></p><p>Articles on job search, interviews, CVs and UAE paperwork are written from the admin Blog tab. We do not republish other boards’ vacancies as journalism, and we do not invent salaries or job counts.</p><p><a href="/blog">Latest articles</a> · <a href="/uae-jobs">UAE jobs</a> · <a href="/salaries">Salaries</a> · <a href="/guides">Guides</a></p>`],
  "uae-jobs": ["UAE jobs desk — HiredFrex", "UAE jobs desk", `<p class="lead">Orientation for UAE applicants. Live vacancies live in the job portal after admin review.</p><p><a class="btn" href="/jobs">Browse jobs</a></p><p>Search the portal for Abu Dhabi, Dubai or Sharjah as written on the listing. We do not create empty city pages, and we do not scrape other boards.</p><p>HiredFrex never charges candidates a fee to apply.</p>`],
  salaries: ["Salary desk — HiredFrex", "Salary desk", `<p class="lead">We do not invent a salary. Pay appears only when an employer listed it or a named source is cited.</p><p><a class="btn" href="/jobs">See live jobs</a></p><p>We will not average “the market” from other boards. A missing salary on a card means the employer did not list one.</p>`],
  interviews: ["Interview desk — HiredFrex", "Interview desk", `<p class="lead">Editorial notes — not a paid interview service. HiredFrex never charges candidates a fee to apply.</p><p><a class="btn" href="/blog">Articles</a> <a class="btn" href="/jobs">Jobs</a></p><p>If someone asks for money to “fast-track” a HiredFrex application, <a href="/contact">contact us</a>.</p>`],
  guides: ["Career guides — HiredFrex", "Career guides", `<p class="lead">CV, interview, documents and job-search guides from the desk. New guides are published from admin, not auto-generated.</p><p><a class="btn" href="/blog">All articles</a> <a class="btn" href="/jobs">Jobs</a> <a class="btn" href="/cv">CV Builder</a></p>`],
  research: ["HiredFrex research — method", "Research method", `<p class="lead">The only dataset we summarise as research is active jobs on this site after review. Counts are not a national labour survey.</p><p>If the homepage table says 3 Security jobs, that means three active Security listings on HiredFrex at load time.</p><p><a class="btn" href="/">See live counts on the homepage</a></p>`],
  "editorial-standards": ["Editorial standards — HiredFrex", "Editorial standards", `<p class="lead">Jobs go public only after admin approval. Articles are written in the Blog tab with a named author or HiredFrex Editorial Team. We do not invent authors, salaries or statistics.</p><p>The publication is for reading. The job portal at <a href="/jobs">/jobs</a> is for search and apply.</p><p>Corrections: support@hiredfrex.com</p><p><a class="btn" href="/jobs">Jobs</a> <a class="btn" href="/contact">Contact</a></p>`],
  about: ["About HiredFrex", "About", `<p class="lead">HiredFrex is a career publication with a reviewed job portal. Candidates do not pay to apply.</p><p>Listings are submitted by employers and reviewed before they are public. Articles are original desk pieces, not scraped vacancies.</p><p><a class="btn" href="/jobs">Jobs</a> <a class="btn" href="/editorial-standards">Editorial standards</a></p>`],
  blog: ["Career insights — HiredFrex", "Career insights", `<p class="lead">Articles are published from the admin Blog tab. On the live site this page lists every published piece from the database.</p><p><a class="btn" href="/">Read the homepage desk</a> <a class="btn" href="/jobs">Jobs</a></p>`],
  faq: ["FAQ — HiredFrex", "Questions? Answered.", `<p class="lead">HiredFrex is free for candidates. Every listing is reviewed before it is public. The CV builder is in the job portal.</p><p><a class="btn" href="/jobs">Browse jobs</a> <a class="btn" href="/contact">Contact</a></p>`],
  contact: ["Contact — HiredFrex", "Contact us", `<p class="lead">Questions, partnerships, or a problem with a listing — email support@hiredfrex.com. We usually reply within one business day.</p><p>On the live site this page includes a form that writes to the admin Messages tab.</p>`],
  privacy: ["Privacy Policy — HiredFrex", "Privacy Policy", `<p class="lead">We collect account data to run applications and listings. We do not sell personal data. See the full policy on the live site.</p><p>Advertising partners, including Google, may use cookies if AdSense is approved. Opt out at adssettings.google.com.</p>`],
  terms: ["Terms — HiredFrex", "Terms & Conditions", `<p class="lead">HiredFrex is a platform: we are not the employer. Candidates are never charged to apply. Employers must not request fees from applicants.</p>`],
  disclaimer: ["Disclaimer — HiredFrex", "Disclaimer", `<p class="lead">Review does not guarantee a listing’s accuracy. Do your own checks. Never pay a fee to apply.</p>`],
  cookies: ["Cookie Policy — HiredFrex", "Cookie Policy", `<p class="lead">We set an essential session cookie if you sign in. Preference storage stays in your browser. Advertising cookies may be used if AdSense is approved.</p>`],
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  let p = decodeURIComponent(url.pathname);
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);

  if (p.startsWith("/api/")) {
    if (p === "/api/blog" || p.startsWith("/api/blog?")) {
      send(
        res,
        200,
        JSON.stringify({
          posts: [
            { slug: "international-job-scams-2026-red-flags", title: "International Job Scams in 2026: Every Red Flag You Need to Know", excerpt: "How to spot fake listings before they cost you — written for applicants, not as a scare headline.", category: "Worker rights", author: "HiredFrex Team", created_at: "2026-07-15", has_image: false, accent: "#15264f" },
            { slug: "uae-2026-salary-law-changes", title: "UAE's New 2026 Salary Rules: What Every Worker and Employer Must Know", excerpt: "What we can confirm in plain language. Where we cannot confirm a figure, we say so.", category: "UAE jobs", author: "HiredFrex Team", created_at: "2026-07-07", has_image: false },
            { slug: "entry-level-jobs-uae-2026-salaries-guide", title: "Entry-Level Jobs in the UAE (2026): Salaries, Requirements, and How to Apply", excerpt: "Honest ranges only where a source exists — not averages invented to fill a table.", category: "Salary guides", author: "HiredFrex Team", created_at: "2026-07-22", has_image: false },
            { slug: "ai-job-interviews-2026-entry-level-guide", title: "AI Job Interviews in 2026: What to Expect for Entry-Level and Service Roles", excerpt: "What automated screening can look like for hospitality, security and retail — and what it cannot replace.", category: "Interview tips", author: "HiredFrex Team", created_at: "2026-07-27", has_image: false },
            { slug: "uae-cv-format", title: "UAE CV Format: What Gulf Recruiters Actually Expect", excerpt: "What to put on a UAE-oriented CV, and what to leave off.", category: "CV tips", author: "HiredFrex Team", created_at: "2026-07-10", has_image: false },
            { slug: "fair-hiring-checklist-ai", title: "A Fair Hiring Checklist for Employers Using AI", excerpt: "Practical checks before you automate screening.", category: "Employer guides", author: "HiredFrex Team", created_at: "2026-07-12", has_image: false },
            { slug: "global-salary-guide-2026-tech", title: "2026 Global Salary Guide: What Tech Roles Really Pay", excerpt: "Only figures we can source — not invented averages.", category: "Salary guides", author: "HiredFrex Team", created_at: "2026-07-18", has_image: false },
          ],
        }),
        "application/json",
      );
      return;
    }
    if (p === "/api/jobs" || p.startsWith("/api/jobs?")) {
      send(
        res,
        200,
        JSON.stringify({
          jobs: [
            { id: "00000000-0000-0000-0000-000000000001", title: "Housekeeping Attendant", company: "Radisson", location: "Dubai", type: "Full-time", category: "Hospitality", tags: [], salary: "" },
            { id: "00000000-0000-0000-0000-000000000002", title: "Security Officer", company: "CREW PRIVE", location: "Dubai", type: "Full-time", category: "Security", tags: [], salary: "" },
            { id: "00000000-0000-0000-0000-000000000003", title: "Waiter/Waitress", company: "Aiza Hospitality", location: "Dubai", type: "Full-time", category: "Hospitality", tags: [], salary: "" },
          ],
        }),
        "application/json",
      );
      return;
    }
    if (p === "/api/me") {
      send(res, 200, JSON.stringify({ user: null }), "application/json");
      return;
    }
    send(res, 200, JSON.stringify({ ok: true }), "application/json");
    return;
  }

  if (SPA_PATHS.has(p) || p.startsWith("/job/")) {
    const fp = tryFile("index.html");
    send(res, 200, fs.readFileSync(fp));
    return;
  }

  const key = p.slice(1);
  if (HUB_BODY[key]) {
    const [title, h1, body] = HUB_BODY[key];
    send(res, 200, hubHtml(title, h1, body));
    return;
  }

  let rel = p === "/" ? "index.html" : p.slice(1);
  let fp = tryFile(rel) || tryFile(path.join(rel, "index.html"));
  if (!fp) {
    send(res, 404, hubHtml("Not found — HiredFrex", "Not found", `<p><a class="btn" href="/">Home</a> <a class="btn" href="/jobs">Jobs</a></p>`));
    return;
  }
  const ext = path.extname(fp).toLowerCase();
  send(res, 200, fs.readFileSync(fp), TYPES[ext] || "application/octet-stream");
});

server.listen(PORT, HOST, () => {
  console.log(`HiredFrex preview on http://${HOST}:${PORT}`);
});

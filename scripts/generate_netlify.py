#!/usr/bin/env python3
"""Build a Netlify drag-and-drop zip of HiredFrex (static pages + functions)."""
from __future__ import annotations
import re, json, shutil, html
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "dist-netlify"
PUB = ROOT / "public"
ADSENSE = "ca-pub-6456794295168638"

NAV = [
    ("/", "Home"),
    ("/blog/", "Insights"),
    ("/jobs/", "Jobs"),
    ("/employers/", "Hire"),
    ("/about/", "About"),
    ("/contact/", "Contact"),
]

JOBS = [
    ("security-officer-prive-facilities-dubai", "Security Officer", "CREW PRIVE Facilities Management", "Dubai"),
    ("housekeeping-attendant-radisson-dubai", "Housekeeping Attendant", "Radisson Hotel Group", "Dubai"),
    ("waiter-waitress-aiza-hospitality-dubai", "Waiter/Waitress", "Aiza Hospitality", "Dubai"),
    ("bellman-oneandonly-one-zaabeel-dubai", "Bellman", "One&Only One Za'abeel", "Dubai"),
    ("office-assistant-vertex-toronto", "Office Assistant", "Vertex Business Support Inc.", "Toronto"),
]


def parse_posts(text: str):
    posts = []
    chunks = re.split(r"\n  \{\n", text)[1:]
    for ch in chunks:
        def f(key):
            m = re.search(rf"{key}: '([^']*)'", ch)
            if m:
                return m.group(1)
            m = re.search(rf'{key}: "([^"]*)"', ch)
            return m.group(1) if m else ""
        bm = re.search(r"body: `([\s\S]*?)`\s*,\n  \}", ch)
        if not bm:
            bm = re.search(r"body: `([\s\S]*?)`\s*\n  \}", ch)
        body = bm.group(1) if bm else ""
        slug = f("slug")
        if not slug:
            continue
        posts.append({
            "slug": slug,
            "title": f("title"),
            "excerpt": f("excerpt") or (re.search(r"excerpt:\s*\n\s*'([^']*)'", ch) or [None, ""])[-1] if False else "",
            "category": f("category"),
            "author": f("author"),
            "authorPhoto": f("authorPhoto"),
            "publishedOn": f("publishedOn"),
            "readMinutes": f("readMinutes") or "8",
            "body": body,
        })
        # excerpt may be multiline
        em = re.search(r"excerpt:\s*\n\s*['\"]([^'\"]*)['\"]", ch)
        if em:
            posts[-1]["excerpt"] = em.group(1)
    return posts


def inline_md(s: str) -> str:
    s = html.escape(s)
    s = re.sub(r"\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)", r'<a href="\2">\1</a>', s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    return s


def render_md(md: str) -> str:
    lines = md.replace("\r\n", "\n").split("\n")
    out, i = [], 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if line.startswith("|") and i + 1 < len(lines) and re.match(r"^\|?\s*-", lines[i + 1] or ""):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                rows.append(lines[i]); i += 1
            body = [r for r in rows if not re.match(r"^\|?\s*-", r.replace(" ", ""))]
            html_rows = []
            for idx, r in enumerate(body):
                cells = [c.strip() for c in r.split("|")[1:-1]]
                tag = "th" if idx == 0 else "td"
                html_rows.append("<tr>" + "".join(f"<{tag}>{inline_md(c)}</{tag}>" for c in cells) + "</tr>")
            out.append('<div class="table-wrap"><table>' + "".join(html_rows) + "</table></div>")
            continue
        if line.startswith("## "):
            out.append(f"<h2>{inline_md(line[3:])}</h2>"); i += 1; continue
        if line.startswith("### "):
            out.append(f"<h3>{inline_md(line[4:])}</h3>"); i += 1; continue
        if re.match(r"^[-*] ", line):
            items = []
            while i < len(lines) and re.match(r"^[-*] ", lines[i]):
                items.append("<li>" + inline_md(re.sub(r"^[-*] ", "", lines[i])) + "</li>")
                i += 1
            out.append("<ul>" + "".join(items) + "</ul>")
            continue
        if re.match(r"^\d+\. ", line):
            items = []
            while i < len(lines) and re.match(r"^\d+\. ", lines[i]):
                items.append("<li>" + inline_md(re.sub(r"^\d+\. ", "", lines[i])) + "</li>")
                i += 1
            out.append("<ol>" + "".join(items) + "</ol>"); continue
        para = []
        while i < len(lines) and lines[i].strip() and not lines[i].startswith("#") and not lines[i].startswith("|") and not re.match(r"^[-*] ", lines[i]) and not re.match(r"^\d+\. ", lines[i]):
            para.append(lines[i]); i += 1
        out.append(f"<p>{inline_md(' '.join(para))}</p>")
    return "\n".join(out)


def chrome(title, desc, path, inner, extra_head=""):
    nav = "".join(
        f'<a href="{href}" class="nav-a{" on" if path.rstrip("/") == href.rstrip("/") or (href != "/" and path.startswith(href)) else ""}">{lab}</a>'
        for href, lab in NAV
    )
    jobs = "".join(
        f'<li><a href="/jobs/{s}/"><strong>{t}</strong><span>{c} · {loc}</span></a></li>'
        for s, t, c, loc in JOBS
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>{html.escape(title)} — HiredFrex</title>
<meta name="description" content="{html.escape(desc)}"/>
<meta name="google-adsense-account" content="{ADSENSE}"/>
<link rel="canonical" href="https://hiredfrex.com{path}"/>
<meta name="theme-color" content="#10243f"/>
<link rel="icon" href="/favicon.png"/>
<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,600;7..72,700&family=Newsreader:opsz,wght@6..72,500;6..72,600;6..72,700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="/site.css"/>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE}" crossorigin="anonymous"></script>
{extra_head}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <div class="wrap bar">
    <a class="brand" href="/"><img src="/logo-mark.png" alt="" width="40" height="40"/><span><b>Hired<span>Frex</span></b><small>Read first. Then apply.</small></span></a>
    <nav class="desk">{nav}</nav>
    <a class="signin" href="/account/">Sign in</a>
  </div>
  <nav class="mob">{nav}</nav>
</header>
<main id="main" class="wrap grid">
  <article>{inner}</article>
  <aside class="rail">
    <p class="kicker">Jobs</p>
    <h2>Open roles now</h2>
    <p class="muted">Read the review label on each listing. Candidates never pay HiredFrex for a job.</p>
    <ul class="joblist">{jobs}</ul>
    <a class="more" href="/jobs/">All open jobs</a>
    <div class="hire">
      <p><strong>Hiring?</strong></p>
      <p class="muted">Post a complete vacancy. We review it before it is public.</p>
      <a class="btn" href="/employers/">Employer posting</a>
    </div>
  </aside>
</main>
<footer>
  <div class="wrap foot">
    <div><p class="brand-foot">HiredFrex</p><p class="muted">Original career guides for Gulf and international applicants. Free to read.</p></div>
    <div><p class="kicker">Read</p><a href="/blog/">Insights</a><a href="/sitemap/">Sitemap</a><a href="/how-we-verify/">How we review</a></div>
    <div><p class="kicker">Work</p><a href="/jobs/">Open jobs</a><a href="/employers/">Employer posting</a><a href="/faq/">FAQ</a></div>
    <div><p class="kicker">Trust</p><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a><a href="/cookies/">Cookies</a><a href="/terms/">Terms</a><a href="mailto:support@hiredfrex.com">support@hiredfrex.com</a></div>
  </div>
  <p class="copy">© 2026 HiredFrex · build 2026.09.19 · Advertising, if approved, does not write our labels.</p>
</footer>
<div id="cookie" class="cookie" hidden>
  <p>Essential session cookies if you sign in. If AdSense is approved, Google may use cookies for ads. <a href="/cookies/">Cookie policy</a>. Opt out of personalised ads at <a href="https://adssettings.google.com" rel="noreferrer" target="_blank">Google Ads Settings</a>.</p>
  <button type="button" id="cookie-ok">Understood</button>
</div>
<script>
(function(){{
  try {{ if (!localStorage.getItem('hf-cookie-ok-v2')) document.getElementById('cookie').hidden = false; }} catch(e) {{}}
  document.getElementById('cookie-ok').onclick = function(){{ try {{ localStorage.setItem('hf-cookie-ok-v2','1'); }} catch(e) {{}} document.getElementById('cookie').hidden = true; }};
}})();
</script>
</body></html>"""


CSS = r"""
:root { --navy:#10243f; --gold:#8a5f18; --paper:#f7f3ea; --surface:#fffdf8; --ink:#1b1915; --muted:#5c564c; --line:#e4dccb; }
*{box-sizing:border-box} html{background:var(--paper);color:var(--ink)}
body{margin:0;font-family:"Source Sans 3",sans-serif;font-size:18px;line-height:1.65;background:var(--paper);color:var(--ink)}
a{color:inherit} .skip{position:absolute;left:12px;top:-40px;background:var(--navy);color:#fff;padding:8px 12px;border-radius:8px}
.skip:focus{top:12px;z-index:80}
.top{position:sticky;top:0;z-index:40;background:rgba(247,243,234,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(8px)}
.wrap{max-width:1100px;margin:0 auto;padding:0 16px}
.bar{display:flex;align-items:center;gap:12px;height:72px}
.brand{display:flex;gap:10px;align-items:center;text-decoration:none}
.brand img{width:40px;height:40px;border-radius:50%;background:#fff}
.brand b{display:block;font-family:Newsreader,Georgia,serif;font-size:22px;color:var(--navy)}
.brand b span{color:var(--gold)} .brand small{display:block;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#7a7368}
.desk{display:none;gap:4px;margin-left:8px}
.nav-a{padding:8px 12px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;color:#5c564c}
.nav-a.on,.nav-a:hover{background:#f3ead4;color:var(--navy)}
.signin{margin-left:auto;background:var(--navy);color:#fffdf8;text-decoration:none;border-radius:10px;padding:8px 12px;font-weight:700;font-size:14px}
.mob{display:flex;gap:8px;overflow:auto;padding:8px 16px;border-top:1px solid var(--line)}
.mob .nav-a{border:1px solid var(--line);background:#fffdf8;white-space:nowrap}
@media(min-width:960px){.desk{display:flex}.mob{display:none}}
.grid{display:grid;gap:40px;padding:40px 16px 64px;align-items:start}
@media(min-width:960px){.grid{grid-template-columns:minmax(0,1fr) 300px}}
h1,h2,h3{font-family:Newsreader,Georgia,serif;color:var(--navy);line-height:1.18;letter-spacing:-.02em}
.kicker{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin:0}
.muted{color:var(--muted)}
.prose{font-family:Literata,Georgia,serif;font-size:1.175rem;line-height:1.85;max-width:66ch}
.prose h2{font-size:1.6rem;margin:2.1rem 0 .8rem}
.prose p{margin:0 0 1.15rem}
.prose a{color:#1a3658;text-underline-offset:3px}
.prose table{width:100%;border-collapse:collapse;font-family:"Source Sans 3",sans-serif;font-size:.95rem}
.prose th,.prose td{border:1px solid var(--line);padding:.65rem .75rem;text-align:left}
.prose th{background:#efe8d8}
.rail{border:1px solid var(--line);background:var(--surface);border-radius:24px;padding:20px;position:sticky;top:88px}
.joblist{list-style:none;padding:0;margin:12px 0}
.joblist li{border-top:1px solid var(--line);padding:10px 0}
.joblist a{text-decoration:none;display:block}
.joblist span{display:block;color:var(--muted);font-size:14px}
.more{color:var(--gold);font-weight:700}
.hire{margin-top:16px;padding:14px;background:#f3ead4;border-radius:16px;border:1px solid var(--line)}
.btn{display:inline-flex;align-items:center;height:44px;background:var(--navy);color:#fffdf8;text-decoration:none;border-radius:12px;padding:0 14px;font-weight:700;font-size:14px;border:0;cursor:pointer}
footer{background:var(--navy);color:#fffdf8;padding:48px 0 16px}
.foot{display:grid;gap:24px}
@media(min-width:800px){.foot{grid-template-columns:1.2fr 1fr 1fr 1fr}}
.foot a{display:block;color:#d8d0c4;text-decoration:none;margin:6px 0;font-size:14px}
.copy{text-align:center;color:#9aa3;font-size:12px;padding:16px}
.cookie{position:fixed;bottom:0;left:0;right:0;background:#fffdf8;border-top:1px solid var(--line);padding:16px;display:flex;gap:12px;align-items:center;z-index:50}
.cookie[hidden]{display:none}
.cards{display:grid;gap:14px} @media(min-width:700px){.cards.two{grid-template-columns:1fr 1fr}}
.card{display:block;border:1px solid var(--line);background:var(--surface);border-radius:22px;padding:20px;text-decoration:none}
.form{display:grid;gap:10px;max-width:460px}
.form input,.form textarea,.form select{height:44px;border:1px solid var(--line);border-radius:12px;padding:0 12px;font:inherit;background:#fff}
.form textarea{height:auto;padding:10px 12px}
"""

LEGAL = {
    "about": ("About HiredFrex", "HiredFrex is a career-information site and small job board run by Paul Mensah from Abu Dhabi.",
              "<h1>A career desk first. A job board second.</h1><div class='prose'><p>HiredFrex.com is run by <strong>Paul Mensah</strong> from Abu Dhabi, United Arab Emirates. It is a practical information site for people applying to Gulf and entry-level international jobs.</p><p>Named editors write dated articles: Amira Hassan (senior editor, Dubai), Paul Mensah (founder), and Nour El-Sayed (labour desk). We cite MoHRE, u.ae, and the US FTC for scam statistics. Candidates never pay to apply. We do not sell visas or invent salaries.</p><p>Writers: <a href='/authors/'>meet the desk</a>. Contact: support@hiredfrex.com.</p></div>"),
    "privacy": ("Privacy Policy", "How HiredFrex handles account, application, and AdSense cookie data.",
                """<h1>Privacy Policy</h1><p class='muted'>Updated 19 September 2026</p><div class='prose'>
<h2>Who we are</h2><p>HiredFrex.com operates a career-information site and small job board. Contact support@hiredfrex.com. You must be 18 or over to hold an account.</p>
<h2>Data we collect</h2><p>Account data, applications and CVs you upload, employer listings, contact messages, and essential session cookies.</p>
<h2>Email verification</h2><p>We send a 6-digit one-time code with Resend from support@hiredfrex.com. Codes expire in 10 minutes. We never charge for verification.</p>
<h2>Advertising cookies (Google AdSense)</h2>
<p>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</p>
<p>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</p>
<p>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com">Google Ads Settings</a>. Alternatively, visit <a href="https://www.aboutads.info/choices/">www.aboutads.info/choices</a>.</p><p>You can also read <a href="https://policies.google.com/technologies/partner-sites">How Google uses information from sites or apps that use our services</a>.</p>
</div>"""),
    "cookies": ("Cookie Policy", "Essential cookies and Google AdSense advertising cookies.",
                """<h1>Cookie Policy</h1><div class='prose'>
<p>Essential session cookies keep you signed in. Preference storage remembers the cookie banner.</p>
<p>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. Opt out at <a href="https://adssettings.google.com">adssettings.google.com</a> or <a href="https://www.aboutads.info/choices/">aboutads.info</a>.</p>
</div>"""),
    "terms": ("Terms of use", "Terms for using HiredFrex.",
              "<h1>Terms of use</h1><div class='prose'><p>HiredFrex is an information site and job board. Listings are employer-submitted unless a higher review status is shown. We do not guarantee interviews, visas, or wages. Do not post fees for candidates. Contact support@hiredfrex.com.</p></div>"),
    "disclaimer": ("Disclaimer", "HiredFrex is not a government portal.",
                   "<h1>Disclaimer</h1><div class='prose'><p>Articles are general information, not legal advice. Official UAE labour rules live on mohre.gov.ae and u.ae. Completeness review is not employer verification.</p></div>"),
    "contact": ("Contact", "Contact HiredFrex.",
                """<h1>Contact HiredFrex</h1><p class='muted'>support@hiredfrex.com</p>
<form class="form" id="cform"><input name="name" required placeholder="Name"/><input name="email" type="email" required placeholder="Email"/>
<select name="topic"><option>general</option><option>correction</option><option>employer</option><option>privacy</option></select>
<textarea name="message" rows="6" required placeholder="How can we help?"></textarea><button class="btn">Send</button><p id="cmsg"></p></form>
<script>document.getElementById('cform').onsubmit=async function(e){e.preventDefault();const fd=new FormData(e.target);const body=Object.fromEntries(fd.entries());const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const j=await r.json();document.getElementById('cmsg').textContent=j.ok?'Message received.':(j.error||'Could not send');};</script>"""),
    "faq": ("FAQ", "Common questions about HiredFrex.",
            "<h1>FAQ</h1><div class='prose'><h2>Do I pay to apply?</h2><p>No. Candidates never pay HiredFrex for a job.</p><h2>Is every employer verified?</h2><p>No. Most listings are completeness-reviewed. Read the label on the job page.</p><h2>How do I post a job?</h2><p>Create an employer account and use <a href='/employers/'>employer posting</a>.</p></div>"),
    "employers": ("For employers", "Post a complete vacancy on HiredFrex.",
                  "<h1>Post a real job. We will label it honestly.</h1><div class='prose'><p>Create an employer account, describe the vacancy completely, and take applications here. We block fees and placeholder copy. We will not mark you verified until that check actually happens.</p><p><a class='btn' href='/account/'>Create employer account</a></p></div>"),
    "how-we-verify": ("How we review listings", "The checks HiredFrex actually runs.",
                      "<h1>How we review listings</h1><div class='prose'><p>Automated checks look for fees, remote labels on physical work, name mismatches, and placeholder text. Flagged jobs go to an editor. Public pages only show published listings. Completeness reviewed is not employer confirmed.</p></div>"),
    "editorial-standards": ("Editorial standards", "How HiredFrex writes articles.",
                            "<h1>Editorial standards</h1><div class='prose'><p>Dated articles carry a named editor: Amira Hassan, Paul Mensah (founder, Abu Dhabi), and Nour El-Sayed. We cite official sources. We do not invent salaries. Studio posts must be at least 800 words. Corrections: support@hiredfrex.com.</p></div>"),
}


def write(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    write(OUT / "site.css", CSS)
    write(OUT / "ads.txt", "google.com, pub-6456794295168638, DIRECT, f08c47fec0942fa0\n")
    write(OUT / "robots.txt", "User-agent: *\nAllow: /\nDisallow: /admin.html\nDisallow: /account/\nSitemap: https://hiredfrex.com/sitemap.xml\n")
    for name in ["logo-mark.png", "logo.png", "favicon.png", "apple-touch-icon.png", "og.jpg", "icon-192.png", "icon-512.png"]:
        src = PUB / name
        if src.exists():
            shutil.copy2(src, OUT / name)
    authors = PUB / "authors"
    if authors.exists():
        shutil.copytree(authors, OUT / "authors")

    posts = parse_posts((ROOT / "src/lib/data/seed-posts.ts").read_text())
    more = ROOT / "src/lib/data/seed-posts-more.ts"
    if more.exists():
        posts += parse_posts(more.read_text())
    # home
    cards = []
    if posts:
        feat = posts[0]
        cards.append(f"<a class='card' href='/blog/{feat['slug']}/'><p class='kicker'>{html.escape(feat['category'])}</p><h2>{html.escape(feat['title'])}</h2><p class='muted'>{html.escape(feat['excerpt'])}</p></a>")
    cards.append("<div class='cards two'>" + "".join(
        f"<a class='card' href='/blog/{p['slug']}/'><p class='kicker'>{html.escape(p['category'])}</p><h3>{html.escape(p['title'])}</h3><p class='muted'>{html.escape(p['excerpt'])}</p></a>"
        for p in posts[1:7]
    ) + "</div>")
    home_inner = f"<p class='kicker'>Career desk · Gulf & international</p><h1>Advice you can check. Jobs you can read twice.</h1><p class='muted' style='font-family:Literata,Georgia,serif;font-size:1.25rem'>Dated articles, named authors, official sources. A jobs rail sits on the side with current openings and a door for employers to post.</p><p><a class='btn' href='/blog/'>Read insights</a> &nbsp; <a href='/jobs/'>Open jobs</a></p>" + "".join(cards)
    write(OUT / "index.html", chrome("Career guides and honest job listings", "Original Gulf career guides and a small reviewed job board.", "/", home_inner))

    blog_list = "".join(
        f"<a class='card' href='/blog/{p['slug']}/'><p class='kicker'>{html.escape(p['category'])}</p><h2>{html.escape(p['title'])}</h2><p class='muted'>{html.escape(p['excerpt'])}</p><p class='muted'>{html.escape(p['author'])} · {html.escape(p['publishedOn'])}</p></a>"
        for p in posts
    )
    write(OUT / "blog/index.html", chrome("Career insights", "Original HiredFrex editorial.", "/blog/", f"<p class='kicker'>Insights</p><h1>Career insights</h1><div class='cards'>{blog_list}</div>"))

    for p in posts:
        photo = p.get("authorPhoto") or "/logo-mark.png"
        inner = f"""<nav class='muted'><a href='/'>Home</a> / <a href='/blog/'>Insights</a> / {html.escape(p['category'])}</nav>
<p class='kicker'>{html.escape(p['category'])}</p>
<h1>{html.escape(p['title'])}</h1>
<div style="display:flex;gap:12px;align-items:center;margin:18px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:12px 0">
<img src="{html.escape(photo)}" alt="" width="56" height="56" style="border-radius:50%;object-fit:cover"/>
<div><strong>{html.escape(p['author'])}</strong><div class='muted'>{html.escape(p['publishedOn'])} · {html.escape(str(p['readMinutes']))} min read</div></div>
</div>
<div class="prose">{render_md(p['body'])}</div>"""
        write(OUT / f"blog/{p['slug']}/index.html", chrome(p["title"], p["excerpt"] or p["title"], f"/blog/{p['slug']}/", inner))

    jobs_cards = "".join(
        f"<a class='card' href='/jobs/{s}/'><h2>{html.escape(t)}</h2><p class='muted'>{html.escape(c)} · {html.escape(loc)}</p></a>"
        for s, t, c, loc in JOBS
    )
    write(OUT / "jobs/index.html", chrome("Browse jobs", "Public HiredFrex listings.", "/jobs/", f"<p class='kicker'>Directory</p><h1>Browse jobs</h1><div class='cards'>{jobs_cards}</div>"))
    for s, t, c, loc in JOBS:
        write(OUT / f"jobs/{s}/index.html", chrome(t, f"{t} at {c} in {loc}", f"/jobs/{s}/", f"<h1>{html.escape(t)}</h1><p class='muted'>{html.escape(c)} · {html.escape(loc)}</p><p>Read the review label. Apply on this page after you sign in. Candidates never pay.</p><a class='btn' href='/account/'>Sign in to apply</a>"))

    for slug, (title, desc, inner) in LEGAL.items():
        write(OUT / f"{slug}/index.html", chrome(title, desc, f"/{slug}/", inner))

    # Guides (parse from guides.ts)
    gtext = (ROOT / "src/lib/content/guides.ts").read_text()
    guides = []
    for ch in re.split(r"\n  \{\n", gtext)[1:]:
        smg = re.search(r"slug:\s*\"([^\"]+)\"", ch)
        tmg = re.search(r"title:\s*\"([^\"]+)\"", ch)
        emg = re.search(r"excerpt:\s*\n\s*\"([^\"]+)\"", ch) or re.search(r"excerpt:\s*\"([^\"]+)\"", ch)
        bmg = re.search(r"body:\s*`([\s\S]*?)`", ch)
        if smg and tmg and bmg:
            guides.append({"slug": smg.group(1), "title": tmg.group(1), "excerpt": emg.group(1) if emg else tmg.group(1), "body": bmg.group(1)})
    glist = "".join(f"<a class='card' href='/guides/{g['slug']}/'><h2>{html.escape(g['title'])}</h2><p class='muted'>{html.escape(g['excerpt'])}</p></a>" for g in guides)
    write(OUT / "guides/index.html", chrome("Career guides", "Original HiredFrex how-tos.", "/guides/", f"<p class='kicker'>Guides</p><h1>Career guides</h1><div class='cards'>{glist}</div>"))
    for g in guides:
        write(OUT / f"guides/{g['slug']}/index.html", chrome(g["title"], g["excerpt"], f"/guides/{g['slug']}/", f"<p class='kicker'>Guide</p><h1>{html.escape(g['title'])}</h1><div class='prose'>{render_md(g['body'])}</div>"))

    authors = [
        ("amira", "Amira Hassan", "Senior editor", "Dubai, United Arab Emirates"),
        ("paul", "Paul Mensah", "Founder", "Abu Dhabi, United Arab Emirates"),
        ("nour", "Nour El-Sayed", "Labour desk", "United Arab Emirates"),
    ]
    acards = "".join(f"<a class='card' href='/authors/{i}/'><img src='/authors/{i}.svg' width='72' height='72' alt='' style='border-radius:50%'/><h2>{html.escape(n)}</h2><p class='muted'>{html.escape(title)} · {html.escape(b)}</p></a>" for i,n,title,b in authors)
    write(OUT / "authors/index.html", chrome("Writers", "Named HiredFrex editors.", "/authors/", f"<p class='kicker'>Desk</p><h1>Who writes HiredFrex</h1><div class='cards two'>{acards}</div>"))
    for i,n,title,b in authors:
        own = [p for p in posts if p.get("author")==n]
        alist = "".join(f"<li><a href='/blog/{p['slug']}/'>{html.escape(p['title'])}</a></li>" for p in own)
        write(OUT / f"authors/{i}/index.html", chrome(n, f"{n}, {title} at HiredFrex.", f"/authors/{i}/", f"<img src='/authors/{i}.svg' width='80' height='80' alt='' style='border-radius:50%'/><p class='kicker'>{html.escape(title)}</p><h1>{html.escape(n)}</h1><p class='muted'>{html.escape(b)}</p><h2>Articles</h2><ul>{alist}</ul>"))

    sm = "".join(f"<li><a href='/blog/{p['slug']}/'>{html.escape(p['title'])}</a></li>" for p in posts)
    sm += "".join(f"<li><a href='/guides/{g['slug']}/'>{html.escape(g['title'])}</a></li>" for g in guides)
    sm += "<li><a href='/authors/'>Writers</a></li>"
    write(OUT / "sitemap/index.html", chrome("Sitemap", "Every public HiredFrex page.", "/sitemap/", f"<h1>Sitemap</h1><ul>{sm}</ul><p><a href='/sitemap.xml'>XML sitemap</a></p>"))

    urls = ["https://hiredfrex.com/", "https://hiredfrex.com/blog/", "https://hiredfrex.com/jobs/", "https://hiredfrex.com/guides/", "https://hiredfrex.com/authors/", "https://hiredfrex.com/sitemap/"]
    urls += [f"https://hiredfrex.com/blog/{p['slug']}/" for p in posts]
    urls += [f"https://hiredfrex.com/guides/{g['slug']}/" for g in guides]
    urls += [f"https://hiredfrex.com/authors/{i}/" for i,_,_,_ in authors]
    urls += [f"https://hiredfrex.com/{s}/" for s in LEGAL]
    xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "".join(f"<url><loc>{u}</loc></url>" for u in urls) + "</urlset>"
    write(OUT / "sitemap.xml", xml)

    write(OUT / "netlify.toml", """[build]
  publish = "."

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
""")

    # account + admin
    write(OUT / "account/index.html", chrome("Sign in", "HiredFrex account.", "/account/", """
<h1>Sign in</h1>
<p class='muted'>Email sign-up sends a 6-digit Resend code. Never a fee.</p>
<form class='form' id='su'>
<input name='name' placeholder='Full name'/>
<input name='email' type='email' required placeholder='Email'/>
<input name='password' type='password' required minlength='8' placeholder='Password (8+)'/>
<button class='btn' name='act' value='signup'>Create account</button>
<button class='btn' name='act' value='signin' style='background:#fffdf8;color:#10243f;border:1px solid #e4dccb'>Sign in</button>
<p id='msg'></p>
</form>
<form class='form' id='vf' hidden>
<input name='code' inputmode='numeric' maxlength='6' placeholder='6-digit code' required/>
<button class='btn'>Confirm email</button>
<button type='button' id='again'>Send a new code</button>
<p id='vmsg'></p>
</form>
<script>
let email='';
const msg=document.getElementById('msg');
document.getElementById('su').onsubmit=async (e)=>{
  e.preventDefault();
  const act=e.submitter.value;
  const fd=new FormData(e.target);
  email=fd.get('email');
  const url=act==='signup'?'/api/signup':'/api/signin';
  const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(fd))});
  const j=await r.json();
  if(j.needsVerification||act==='signup'){document.getElementById('su').hidden=true;document.getElementById('vf').hidden=false;msg.textContent='';}
  else msg.textContent=j.error|| (j.ok?'Signed in.':'');
};
document.getElementById('vf').onsubmit=async (e)=>{
  e.preventDefault();
  const code=new FormData(e.target).get('code');
  const r=await fetch('/api/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,code})});
  const j=await r.json();
  document.getElementById('vmsg').textContent=j.ok?'Email confirmed. You can close this page.':(j.error||'');
};
document.getElementById('again').onclick=async ()=>{
  const r=await fetch('/api/resend-code',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});
  const j=await r.json();
  document.getElementById('vmsg').textContent=j.ok?'A new code is on the way via Resend.':(j.error||'');
};
</script>
"""))

    write(OUT / "admin.html", """<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="robots" content="noindex"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>HiredFrex studio</title><link rel="stylesheet" href="/site.css"/></head>
<body class="wrap" style="padding:32px 16px">
<h1>Editorial studio</h1>
<p class="muted">Private. Named author + photo required. 800+ words. Token is ADMIN_TOKEN.</p>
<label>Admin token</label><input id="tok" type="password" style="height:44px;width:100%;max-width:420px;border:1px solid #e4dccb;border-radius:12px;padding:0 12px"/>
<form id="f" class="form" style="margin-top:16px;max-width:720px">
<input name="title" required placeholder="Headline"/>
<input name="excerpt" required placeholder="Standfirst"/>
<input name="category" placeholder="Category" value="Career advice"/>
<select name="author" required>
<option>Amira Hassan</option><option>Paul Mensah</option><option>Nour El-Sayed</option>
</select>
<input name="authorCustom" placeholder="Or custom author name"/>
<label>Author photo</label><input name="aphoto" type="file" accept="image/*"/>
<img id="aprev" alt="" style="width:64px;height:64px;border-radius:50%;object-fit:cover;display:none"/>
<label>Article photo</label><input name="cphoto" type="file" accept="image/*"/>
<textarea name="body" rows="18" required placeholder="Markdown, 800+ words"></textarea>
<p id="wc">0 words</p>
<label><input type="checkbox" name="published"/> Publish and index</label>
<button class="btn">Save article</button>
<p id="out"></p>
</form>
<script>
function read(file,max){return new Promise((res,rej)=>{const img=new Image();img.onload=()=>{const s=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=img.width*s;c.height=img.height*s;c.getContext('2d').drawImage(img,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.82));};img.onerror=rej;img.src=URL.createObjectURL(file);});}
const f=document.getElementById('f');
f.body.oninput=()=>{const n=f.body.value.trim()?f.body.value.trim().split(/\\s+/).length:0;document.getElementById('wc').textContent=n+' words';};
let authorPhoto='', coverUrl='';
f.aphoto.onchange=async e=>{if(e.target.files[0]){authorPhoto=await read(e.target.files[0],320);const i=document.getElementById('aprev');i.src=authorPhoto;i.style.display='block';}};
f.cphoto.onchange=async e=>{if(e.target.files[0]) coverUrl=await read(e.target.files[0],1400);};
f.onsubmit=async e=>{
  e.preventDefault();
  const body={title:f.title.value,excerpt:f.excerpt.value,category:f.category.value,author:(f.authorCustom && f.authorCustom.value.trim()) || f.author.value,authorPhoto,coverUrl,body:f.body.value,published:f.published.checked};
  const r=await fetch('/api/blog',{method:'POST',headers:{'Content-Type':'application/json','x-admin-token':document.getElementById('tok').value},body:JSON.stringify(body)});
  const j=await r.json();
  document.getElementById('out').textContent=j.ok?('Saved /blog/'+j.slug+'/'): (j.error||'Failed');
};
</script>
</body></html>
""")

    write(OUT / "README-DEPLOY.txt", """HiredFrex — Netlify (build 2026.09.19-c)

DO NOT set Build command to "npm run build". That is the preview app. It tries
to migrate the live database and fails with: column "indexable" does not exist.

Use one of these:

A) Drag-and-drop (simplest)
   Zip THIS folder. Netlify → Deploys → drag the zip.
   Leave Build command empty.

B) Git-connected site
   Build command:   python3 scripts/generate_netlify.py
   Publish directory: dist-netlify
   (or delete custom build settings so netlify.toml is used)

Then set environment variables:
   DATABASE_URL     Neon pooled connection string
   JWT_SECRET       long random string
   ADMIN_TOKEN      password for /admin.html
   RESEND_API_KEY   from resend.com
   EMAIL_FROM       HiredFrex <support@hiredfrex.com>
   OWNER_EMAIL      support@hiredfrex.com

In the Neon SQL Editor, paste and run neon-compat.sql (in this folder).
That ADDS indexable and related columns. It does not delete jobs or articles.

To erase stored CVs only, run wipe-cvs.sql.

Submit https://hiredfrex.com/sitemap.xml in Search Console after deploy.
""")

    shutil.copy2(ROOT / "sql/wipe-cvs.sql", OUT / "wipe-cvs.sql")
    shutil.copy2(ROOT / "sql/schema-production.sql", OUT / "schema-production.sql")
    shutil.copy2(ROOT / "sql/neon-compat.sql", OUT / "neon-compat.sql")
    fn_dir = OUT / "netlify" / "functions"
    fn_dir.mkdir(parents=True, exist_ok=True)
    src = ROOT / "netlify-src"
    for name in ["signup", "verify", "resend-code", "signin", "me", "blog", "jobs", "apply", "contact"]:
        subprocess.check_call([
            "npx", "esbuild", str(src / f"{name}.js"),
            "--bundle", "--platform=node", "--format=esm",
            f"--outfile={fn_dir / (name + '.js')}",
            "--packages=bundle",
        ])
    print("pages", len(posts), "guides", len(guides), "out", OUT)
    for p in posts:
        print(" ", p["slug"], "excerpt", bool(p["excerpt"]), "words", len(p["body"].split()))


if __name__ == "__main__":
    main()

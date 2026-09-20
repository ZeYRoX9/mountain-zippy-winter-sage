#!/usr/bin/env python3
from pathlib import Path
import re

p = Path("/workspace/hiredfrex/index.html")
t = p.read_text(encoding="utf-8")

if "--gold2" not in t:
    t = t.replace("--gold:#c6a04e;", "--gold:#c6a04e; --gold2:#d6b463;")

CSS = r"""
  /* ---- sample blog homepage ---- */
  header.pub-navy{background:var(--navy);padding:0;border-bottom:none}
  header.pub-navy .pub-top{height:56px}
  header.pub-navy .brand .wm{color:#fff}
  header.pub-navy .brand .wm small{color:rgba(255,255,255,.45)}
  header.pub-navy .pub-links{display:flex;align-items:center;margin-left:18px;gap:2px}
  header.pub-navy .pub-links a{color:#b0bcda;font-size:13.5px;font-weight:600;padding:8px 12px;border-radius:8px}
  header.pub-navy .pub-links a:hover,header.pub-navy .pub-links a.active{color:var(--gold2)}
  header.pub-navy .pub-links a.active::after{display:none}
  header.pub-navy .nav-cta .btn-ghost{background:transparent;color:#dfe6f6;border-color:rgba(255,255,255,.18)}
  header.pub-navy .nav-cta .btn-primary{background:var(--gold);color:var(--navy)}
  header.pub-navy .hamburger{border-color:rgba(255,255,255,.2);background:transparent}
  header.pub-navy .hamburger span,header.pub-navy .hamburger span::before,header.pub-navy .hamburger span::after{background:#fff}
  header.pub-navy .theme-toggle{color:#dfe6f6}
  .ad-banner{background:#fff;border:1px dashed #c0bbb0;border-radius:8px;min-height:90px;display:flex;align-items:center;justify-content:center;color:var(--ink-3);font-size:11.5px;font-weight:700;margin:18px 0;letter-spacing:.06em}
  .hero-blog{background:var(--navy);padding:44px 32px 40px;border-radius:16px;margin:8px 0 0;display:flex;gap:40px;align-items:center;text-decoration:none;color:inherit}
  .hero-blog .left{flex:1.2}
  .hero-badge{background:var(--gold);color:var(--navy);font-size:11.5px;font-weight:700;padding:5px 13px;border-radius:999px;display:inline-block;margin-bottom:14px;letter-spacing:.04em}
  .hero-blog h1{font-family:var(--font-display);color:#fff;font-size:clamp(24px,3.8vw,36px);line-height:1.12;font-weight:600;margin-bottom:12px}
  .hero-blog h1 span{color:var(--gold2)}
  .hero-excerpt{color:#9aaac8;font-size:15px;line-height:1.65;margin-bottom:20px}
  .hero-meta{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
  .hero-avatar{width:32px;height:32px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--navy);object-fit:cover}
  .hero-meta .by{color:#6d80a4;font-size:13px}.hero-meta .by b{color:#9aaac8}
  .hero-meta .rt{background:rgba(255,255,255,.08);color:#6d80a4;font-size:12px;padding:4px 10px;border-radius:999px}
  .read-btn{display:inline-block;background:var(--gold);color:var(--navy);font-weight:700;font-size:14px;padding:10px 22px;border-radius:10px;text-decoration:none;margin-top:18px}
  .hero-blog .right{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;overflow:hidden;min-height:200px}
  .hero-img{height:200px;background:linear-gradient(135deg,#1a3060,#0c1a3a) center/cover no-repeat}
  .hero-cat{padding:14px 16px;border-top:1px solid rgba(255,255,255,.08)}
  .hero-cat .chip{background:rgba(198,160,78,.15);color:var(--gold2);font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;margin-right:6px;border:0}
  .main-grid{display:grid;grid-template-columns:1fr 300px;gap:28px;margin-top:8px}
  .section-label{font-size:11.5px;font-weight:700;color:var(--gold-deep);letter-spacing:.12em;text-transform:uppercase;margin:22px 0 14px}
  .article-card{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;margin-bottom:16px;display:flex;text-decoration:none;color:inherit}
  .article-card .img{width:140px;flex-shrink:0;background:linear-gradient(135deg,var(--navy),var(--navy-2)) center/cover no-repeat}
  .article-body{padding:16px 18px;min-width:0}
  .article-body .cat{font-size:11px;font-weight:700;color:var(--gold-deep);letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px}
  .article-body h3{font-family:var(--font-display);font-size:16.5px;font-weight:600;line-height:1.3;color:var(--heading);margin-bottom:7px}
  .article-body p{color:var(--ink-2);font-size:13.5px;line-height:1.6;margin-bottom:10px}
  .article-meta{display:flex;align-items:center;gap:10px;font-size:12px;color:var(--ink-3);font-weight:600;flex-wrap:wrap}
  .article-meta .dot{opacity:.4}
  .sidebar-section{background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px;margin-bottom:18px}
  .sidebar-section h4{font-family:var(--font-display);font-size:16px;font-weight:600;color:var(--heading);margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--line)}
  .ad-rect{background:#fff;border:1px dashed #c0bbb0;border-radius:8px;min-height:250px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--ink-3);font-size:11px;font-weight:700;letter-spacing:.05em;gap:6px;margin-bottom:18px;text-align:center;padding:16px}
  .job-teaser{display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--line);text-decoration:none;color:inherit}
  .job-teaser:last-of-type{border-bottom:none}
  .jt-logo{width:36px;height:36px;border-radius:10px;background:var(--navy);display:flex;align-items:center;justify-content:center;color:var(--gold2);font-size:11px;font-weight:700;flex-shrink:0;overflow:hidden}
  .jt-logo img{width:100%;height:100%;object-fit:cover}
  .jt-body .title{font-size:13.5px;font-weight:600;color:var(--navy);line-height:1.3}
  .jt-body .co{font-size:12px;color:var(--ink-3);font-weight:500;margin-top:2px}
  .jt-chip{display:inline-block;background:var(--gold-soft);color:var(--gold-deep);font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:999px;margin-top:5px}
  .cats-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px}
  .cat-pill{background:#fff;border:1px solid var(--line);border-radius:999px;padding:8px 15px;font-size:13px;font-weight:600;color:var(--ink-2);cursor:pointer;min-height:40px}
  .cat-pill.on{background:var(--navy);color:#fff;border-color:var(--navy)}
  .mini-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:8px}
  .mini-card{background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;text-decoration:none;color:inherit;display:block}
  .mini-img{height:80px;background:linear-gradient(135deg,var(--navy-2),#1e3d7a) center/cover no-repeat}
  .mini-body{padding:12px}
  .mini-body .cat{font-size:10.5px;font-weight:700;color:var(--gold-deep);letter-spacing:.06em;text-transform:uppercase;margin-bottom:4px}
  .mini-body h4{font-family:var(--font-display);font-size:13.5px;font-weight:600;line-height:1.35;color:var(--navy)}
  .mini-body .rt{font-size:11px;color:var(--ink-3);font-weight:600;margin-top:6px}
  .side-all{display:block;text-align:center;margin-top:14px;font-size:13px;font-weight:700;color:var(--gold-deep)}
  @media(max-width:900px){
    .main-grid{grid-template-columns:1fr}
    .hero-blog{flex-direction:column;padding:28px 20px;gap:20px}
    .hero-blog .right{width:100%}
    .mini-grid{grid-template-columns:1fr}
    .article-card{flex-direction:column}
    .article-card .img{width:100%;height:140px}
  }
  @media(max-width:700px){
    header.pub-navy .pub-links{display:none}
  }
"""

if ".hero-blog{" not in t:
    t = t.replace("  @media print{", CSS + "\n  @media print{")

m = re.search(r'<header class="pub">.*?</header>', t, re.S)
if not m:
    raise SystemExit("header not found")
old_h = m.group(0)
im = re.search(r'<img src="(.*?)" alt="HiredFrex"/>', old_h, re.S)
logo = im.group(1) if im else "/favicon.png"
header = (
    '<header class="pub pub-navy">\n'
    '  <div class="wrap pub-top">\n'
    '    <div class="brand" onclick="go(\'home\')" style="cursor:pointer">\n'
    f'      <img src="{logo}" alt="HiredFrex"/>\n'
    '      <span class="wm">Hired<b>Frex</b></span>\n'
    "    </div>\n"
    '    <nav class="pub-links" id="navLinks">\n'
    '      <a onclick="go(\'home\')" data-nav="home" class="active">Insights</a>\n'
    '      <a href="/jobs">Jobs</a>\n'
    '      <a onclick="go(\'cv\')" data-nav="cv">CV Builder</a>\n'
    '      <a href="/about">About</a>\n'
    "    </nav>\n"
    '    <div class="nav-cta">\n'
    '      <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle dark mode" title="Toggle dark mode">\n'
    '        <svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2M12 20.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1.5 12h2M20.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>\n'
    '        <svg class="moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5z"/></svg>\n'
    "      </button>\n"
    '      <span id="authSlot" style="display:flex;align-items:center;gap:10px">\n'
    '        <button class="btn btn-ghost" onclick="go(\'auth\')">Sign in</button>\n'
    '        <a class="btn btn-primary" onclick="goEmployerSignup()" style="cursor:pointer">Post a job →</a>\n'
    "      </span>\n"
    "    </div>\n"
    '    <button class="hamburger" onclick="toggleMenu()" aria-label="Open menu"><span></span></button>\n'
    "  </div>\n"
    '  <div class="mobile-menu" id="mobileMenu">\n'
    '    <a onclick="go(\'home\')">Insights</a>\n'
    '    <a href="/jobs">Jobs</a>\n'
    '    <a onclick="go(\'cv\')">CV Builder</a>\n'
    '    <a href="/about">About</a>\n'
    '    <a href="/contact">Contact</a>\n'
    '    <a onclick="goEmployerSignup()">Post a job</a>\n'
    '    <a id="mAuthLink" onclick="go(\'auth\')">Sign in</a>\n'
    "  </div>\n"
    "</header>"
)
t = t[: m.start()] + header + t[m.end() :]

HOME = """<!-- ============ HOME ============ -->
<main id="home" class="view active">
  <div class="wrap site-home">
    <div class="ad-banner" aria-hidden="true">ADVERTISEMENT</div>
    <div id="homeFeat"></div>
    <div style="margin-top:28px">
      <div class="section-label">Browse by topic</div>
      <div class="cats-row" id="topicCats"></div>
    </div>
    <div class="main-grid">
      <div>
        <div class="section-label">Latest articles</div>
        <div id="homeArticles"></div>
        <div class="ad-banner" aria-hidden="true" style="height:100px;margin:4px 0 16px">ADVERTISEMENT</div>
        <div class="section-label" style="margin-top:28px">More articles</div>
        <div class="mini-grid" id="homeMini"></div>
      </div>
      <aside>
        <div class="ad-rect" aria-hidden="true">ADVERTISEMENT</div>
        <div class="sidebar-section">
          <h4>Open roles</h4>
          <div id="homeJobsSide"></div>
          <a class="side-all" href="/jobs">Browse all jobs →</a>
        </div>
        <div class="ad-rect" aria-hidden="true" style="min-height:280px">ADVERTISEMENT</div>
      </aside>
    </div>
  </div>
</main>
"""

a = t.find("<!-- ============ HOME ============ -->")
b = t.find("<!-- ============ JOBS ============ -->")
if a < 0 or b < 0:
    raise SystemExit("home/jobs markers missing")
t = t[:a] + HOME + "\n" + t[b:]

js_path = Path("/workspace/scripts/blog_home.js")
JS = js_path.read_text(encoding="utf-8")

start = t.find("function headerSearch(e){")
end = t.find("// ===== RENDER: JOBS =====")
if start < 0 or end < 0:
    raise SystemExit("js bounds %s %s" % (start, end))
t = t[:start] + JS + "\n" + t[end:]

lb = t.find("async function loadBlogPosts(){")
cv = t.find("// ===== CV BUILDER =====")
if lb < 0 or cv < 0:
    raise SystemExit("loadBlog %s %s" % (lb, cv))
NEW_LOAD = "async function loadBlogPosts(){\n  try{\n    const r=await fetch(`${API}/blog`); const d=r.ok?await r.json():{};\n    LIVE_POSTS=(d.posts&&d.posts.length)?d.posts:null;\n  }catch(e){LIVE_POSTS=null;}\n  paintTopics();\n  paintArticles();\n}\n\n"
t = t[:lb] + NEW_LOAD + t[cv:]

first = t.find("let LIVE_POSTS=null;")
second = t.find("let LIVE_POSTS=null;", first+1) if first>=0 else -1
if second>=0:
    t = t[:second] + t[second+len("let LIVE_POSTS=null;"):]

p.write_text(t, encoding="utf-8")
print("ok", p.stat().st_size)
print("hero", ".hero-blog{" in t)
print("homeJobsSide", "homeJobsSide" in t)
print("emptyJobs", "function emptyJobs()" in t)
print("loadBlogPosts", t.count("async function loadBlogPosts"))
print("renderHome", t.count("function renderHome"))
print("LIVE_POSTS lets", t.count("let LIVE_POSTS"))
print("renderJobs", "function renderJobs()" in t)

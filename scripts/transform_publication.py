#!/usr/bin/env python3
"""Transform HiredFrex public site into a career publication. Admin/jobs APIs untouched except extra blog columns."""
from pathlib import Path
import re

ROOT = Path("/workspace/hiredfrex")
INDEX = ROOT / "index.html"
ADMIN = ROOT / "admin.html"
PAGES = ROOT / "netlify/functions/pages.js"
BLOG = ROOT / "netlify/functions/blog.js"
TOML = ROOT / "netlify.toml"
SCHEMA = ROOT / "schema.sql"
SITEMAP = ROOT / "netlify/functions/sitemap.js"

NAV_LINKS = '''      <a class="nav-jobs" href="/jobs">Jobs</a>
      <a href="/career">Career</a>
      <a href="/uae-jobs">UAE Jobs</a>
      <a href="/salaries">Salaries</a>
      <a href="/interviews">Interviews</a>
      <a onclick="go('cv')" data-nav="cv">CV & Resume</a>
      <a href="/guides">Guides</a>
      <a href="/research">Research</a>
      <a href="/blog">Latest</a>'''

HOME_CSS = r"""
  /* ---- publication chrome (homepage) ---- */
  .skip{position:absolute;left:12px;top:-48px;z-index:80;background:var(--navy);color:#fff;padding:8px 14px;border-radius:10px;font-weight:700;font-size:14px}
  .skip:focus{top:12px}
  header.pub{background:rgba(248,247,243,.92)}
  .pub-top{display:flex;align-items:center;gap:14px;height:62px}
  .pub-search{margin-left:auto;display:flex;align-items:center;gap:8px;max-width:280px;flex:1}
  .pub-search input{width:100%;height:40px;border:1px solid var(--line-2);border-radius:10px;padding:0 12px;background:var(--surface);font-size:14px}
  .pub-search button{height:40px;padding:0 14px;border-radius:10px;background:var(--navy);color:#fff;font-weight:700;font-size:13px}
  .nav-jobs{background:var(--navy)!important;color:#fff!important;padding:8px 14px!important;border-radius:9px!important}
  .nav-jobs:hover{background:var(--navy-2)!important;color:#fff!important}
  .nav-jobs.active::after{display:none!important}
  .pub-cats{display:flex;align-items:center;gap:2px;overflow-x:auto;padding:0 0 10px;border-bottom:1px solid var(--line);-webkit-overflow-scrolling:touch}
  .pub-cats a{flex-shrink:0;padding:8px 12px;font-size:13.5px;font-weight:700;color:var(--ink-2);border-radius:8px;white-space:nowrap}
  .pub-cats a:hover{color:var(--heading);background:rgba(12,26,58,.04)}
  .pub-cats .nav-jobs{margin-right:6px}
  .mast{padding:28px 0 8px}
  .mast h1{font-size:clamp(28px,4.6vw,42px);letter-spacing:-.03em;max-width:18ch}
  .mast p{color:var(--ink-2);font-size:17px;max-width:46ch;margin-top:10px;line-height:1.6;font-weight:500}
  .desk{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(280px,.8fr);gap:28px;padding:18px 0 10px}
  .feat{display:block;background:var(--surface);border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:var(--shadow-sm)}
  .feat .ban{height:240px;background:var(--navy-2) center/cover no-repeat}
  .feat .pc{padding:22px 24px 26px}
  .feat .ph{font-size:clamp(22px,3.2vw,32px);line-height:1.15;margin:8px 0 10px}
  .side-list{display:flex;flex-direction:column;gap:0;background:var(--surface);border:1px solid var(--line);border-radius:18px;overflow:hidden}
  .side-list a{display:block;padding:14px 16px;border-top:1px solid var(--line);text-decoration:none}
  .side-list a:first-child{border-top:none}
  .side-list a:hover{background:var(--gold-soft)}
  .side-list .ph{font-size:15.5px;line-height:1.3;margin:0 0 4px}
  .strip{margin:8px 0 28px;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:18px 20px 8px;box-shadow:var(--shadow-sm)}
  .strip-h{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:8px}
  .strip-h h2{font-size:22px;margin:0}
  .jrow{display:flex;justify-content:space-between;gap:12px;align-items:baseline;padding:12px 0;border-top:1px solid var(--line);text-decoration:none}
  .jrow .t{font-weight:700;color:var(--heading)}
  .jrow .m{font-size:13px;color:var(--ink-2);font-weight:500}
  .feed{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .cats7{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
  .cat7{display:block;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:14px 12px;text-align:left;font-weight:700;color:var(--heading);min-height:64px}
  .cat7 small{display:block;font-weight:600;color:var(--ink-3);font-size:12px;margin-top:4px}
  .hubs{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
  .hub{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:18px 20px}
  .hub h3{font-size:18px;margin-bottom:6px}
  .hub p{font-size:14.5px;color:var(--ink-2);margin:0 0 10px;line-height:1.55}
  .hub a{font-weight:700;color:var(--gold-deep);font-size:14px}
  .res-table{width:100%;border-collapse:collapse;font-size:14.5px}
  .res-table th,.res-table td{text-align:left;padding:10px 8px;border-bottom:1px solid var(--line)}
  .res-table th{color:var(--ink-3);font-size:12px;letter-spacing:.04em;text-transform:uppercase}
  .note-real{font-size:13px;color:var(--ink-3);font-weight:600;margin-top:8px}
  @media(max-width:960px){
    .desk,.feed,.hubs{grid-template-columns:1fr}
    .cats7{grid-template-columns:repeat(2,1fr)}
    .pub-search{display:none}
    .feat .ban{height:180px}
  }
"""

HOME_HTML = r'''<!-- ============ HOME ============ -->
<main id="home" class="view active">
  <a class="skip" href="#mainfeat">Skip to content</a>
  <div class="wrap mast">
    <span class="eyebrow">Daily career desk</span>
    <h1>Jobs and career information, written to be checked.</h1>
    <p>HiredFrex is a career publication with a job portal on the side. Read first. When you are ready to apply, open Jobs.</p>
  </div>

  <div class="wrap desk">
    <article>
      <div id="homeFeat"></div>
    </article>
    <aside class="side-list" id="homeSide" aria-label="Latest articles"></aside>
  </div>

  <div class="wrap">
    <section class="strip" aria-labelledby="latest-jobs-h">
      <div class="strip-h">
        <div>
          <span class="eyebrow">Job portal</span>
          <h2 id="latest-jobs-h">Latest reviewed jobs</h2>
        </div>
        <a class="more" href="/jobs">View all jobs →</a>
      </div>
      <div id="homeJobs"></div>
    </section>

    <section class="block" style="padding-top:8px">
      <div class="sec-head">
        <div class="ht"><span class="eyebrow">Career desk</span><h2>Latest articles</h2></div>
        <a class="more" href="/blog">All articles →</a>
      </div>
      <div class="feed" id="homeFeed"></div>
    </section>

    <section class="block" style="padding-top:0">
      <div class="sec-head">
        <div class="ht"><span class="eyebrow">Browse</span><h2>Job categories</h2></div>
        <a class="more" href="/jobs">Open the job portal →</a>
      </div>
      <div class="cats7" id="homeCats"></div>
    </section>

    <section class="block" style="padding-top:0">
      <div class="sec-head"><div class="ht"><span class="eyebrow">Sections</span><h2>UAE jobs, pay, interviews, CV</h2></div></div>
      <div class="hubs">
        <div class="hub">
          <h3>UAE jobs</h3>
          <p>Guides for Abu Dhabi, Dubai and Sharjah applicants — documents, offer letters, and how we label reviewed listings. Not a dump of copied vacancies.</p>
          <a href="/uae-jobs">UAE jobs desk →</a>
        </div>
        <div class="hub">
          <h3>Salaries</h3>
          <p>What we can and cannot say about pay. We only publish ranges that appear on a listing or in a named public source.</p>
          <a href="/salaries">Salary desk →</a>
        </div>
        <div class="hub">
          <h3>Interviews</h3>
          <p>Preparation notes for Gulf interviews, including questions to ask and what to do in the first 24 hours after.</p>
          <a href="/interviews">Interview desk →</a>
        </div>
        <div class="hub">
          <h3>CV & resume</h3>
          <p>UAE-oriented CV notes, plus the free on-site builder if you want a draft to edit.</p>
          <a href="/guides">Guides →</a>
          <span style="color:var(--ink-3)"> · </span>
          <a onclick="go('cv')" style="cursor:pointer">Open CV builder</a>
        </div>
      </div>
    </section>

    <section class="block" style="padding-top:0">
      <div class="sec-head">
        <div class="ht"><span class="eyebrow">HiredFrex research</span><h2>What is on the board right now</h2></div>
        <a class="more" href="/research">Research method →</a>
      </div>
      <div class="hub">
        <p>Counts below are computed from jobs currently marked active on HiredFrex. If a table is empty, there are no live listings to count. We do not invent weekly “market” numbers.</p>
        <div id="homeResearch"></div>
        <p class="note-real">Source: HiredFrex active jobs at page load. Not a national labour-market survey.</p>
      </div>
    </section>
  </div>
</main>
'''

HEADER = r'''<header class="pub">
  <div class="wrap pub-top">
    <div class="brand" onclick="go('home')" style="cursor:pointer">
      <img src="LOGO_SRC_PLACEHOLDER" alt="HiredFrex"/>
      <span class="wm">Hired<b>Frex</b><small>.com</small></span>
    </div>
    <form class="pub-search" onsubmit="headerSearch(event)">
      <input id="hdrSearch" type="search" placeholder="Search jobs…" aria-label="Search jobs"/>
      <button type="submit">Search</button>
    </form>
    <div class="nav-cta">
      <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle dark mode" title="Toggle dark mode">
        <svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2M12 20.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1.5 12h2M20.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
        <svg class="moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5z"/></svg>
      </button>
      <span id="authSlot" style="display:flex;align-items:center;gap:10px">
        <button class="btn btn-ghost" onclick="go('auth')">Sign in</button>
        <a class="btn btn-primary" href="/jobs">Jobs</a>
      </span>
    </div>
    <button class="hamburger" onclick="toggleMenu()" aria-label="Open menu"><span></span></button>
  </div>
  <div class="wrap pub-cats" id="navLinks">
''' + NAV_LINKS + r'''
  </div>
  <div class="mobile-menu" id="mobileMenu">
    <a class="nav-jobs" href="/jobs" style="display:inline-block;margin:8px 14px;color:#fff">Jobs</a>
    <a href="/career">Career</a>
    <a href="/uae-jobs">UAE Jobs</a>
    <a href="/salaries">Salaries</a>
    <a href="/interviews">Interviews</a>
    <a onclick="go('cv')">CV & Resume</a>
    <a href="/guides">Guides</a>
    <a href="/research">Research</a>
    <a href="/blog">Latest articles</a>
    <a onclick="goEmployerSignup()">Hiring — post a job</a>
    <a id="mAuthLink" onclick="go('auth')">Sign in</a>
    <a onclick="toggleTheme()">Toggle dark mode</a>
  </div>
</header>
'''

JS_HOME = r'''
function headerSearch(e){
  if(e)e.preventDefault();
  const q=(document.getElementById('hdrSearch').value||'').trim();
  go('jobs');
  const el=document.getElementById('jobSearch');
  if(el){el.value=q;renderJobs();}
}
function featuredHTML(p){
  const bg=p.has_image?`url('/api/blog-image?id=${p.id}') center/cover no-repeat`:(p.accent||'#15264f');
  return `<a class="feat" id="mainfeat" href="/blog/${p.slug}">
    <div class="ban" style="background:${bg}"></div>
    <div class="pc">
      <div class="ptags"><span class="pcat">${esc(p.category||'Career desk')}</span><span class="pmeta">${p.created_at?new Date(p.created_at).toISOString().slice(0,10):''}${p.author?' · '+esc(p.author):''}</span></div>
      <div class="ph">${esc(p.title)}</div>
      <div class="pex">${esc(p.excerpt||'')}</div>
      <div class="pmore">Read article →</div>
    </div></a>`;
}
function sideItemHTML(p){
  return `<a href="/blog/${p.slug}">
    <div class="ptags"><span class="pcat">${esc(p.category||'Career')}</span><span class="pmeta">${p.created_at?new Date(p.created_at).toISOString().slice(0,10):''}</span></div>
    <div class="ph">${esc(p.title)}</div>
  </a>`;
}
function railJobHTML(j){
  const href=j.id?`/job/${j.id}`:'#';
  return `<a class="jrow" href="${href}" onclick="return handleJobClick(event,${j.cid})">
    <div><div class="t">${esc(j.t)}</div><div class="m">${esc(j.co)} · ${esc(j.loc)}</div></div>
    <div class="m">${esc(j.ty||'')}</div>
  </a>`;
}
function renderHome(){
  const jobsEl=document.getElementById('homeJobs');
  if(jobsEl){
    const show=JOBS.slice(0,8);
    jobsEl.innerHTML=show.length?show.map(railJobHTML).join('')
      :`<p class="note-real">No active listings to show yet. When employers post and we approve a role, it appears here and in the <a href="/jobs">job portal</a>.</p>`;
  }
  const cats=document.getElementById('homeCats');
  if(cats){
    const counts={};JOBS.forEach(j=>{counts[j.cat]=(counts[j.cat]||0)+1});
    const list=["Security","Hospitality","General Labor","Customer Service","Business","Human Resources","Technology","Engineering","Sales","Finance"];
    cats.innerHTML=list.map(n=>{
      const c=counts[n]||0;
      const q=encodeURIComponent(n);
      return `<a class="cat7" href="/jobs" onclick="event.preventDefault();quickSearch('${n}')">${n}<small>${c?c+' live on the board':'Open in job portal'}</small></a>`;
    }).join('');
  }
  renderResearch();
}
function renderResearch(){
  const el=document.getElementById('homeResearch'); if(!el)return;
  if(!JOBS.length){
    el.innerHTML='<p class="note-real">No active jobs on HiredFrex at the moment, so there is nothing to count.</p>';
    return;
  }
  const byCat={}; const byLoc={};
  JOBS.forEach(j=>{
    byCat[j.cat||'Uncategorised']=(byCat[j.cat||'Uncategorised']||0)+1;
    const loc=(j.loc||'Not specified').split(',')[0].trim()||'Not specified';
    byLoc[loc]=(byLoc[loc]||0)+1;
  });
  const rows=(obj)=>Object.entries(obj).sort((a,b)=>b[1]-a[1]).slice(0,8)
    .map(([k,v])=>`<tr><td>${esc(k)}</td><td>${v}</td></tr>`).join('');
  el.innerHTML=`<div class="hubs">
    <div><table class="res-table"><thead><tr><th>Category</th><th>Active jobs</th></tr></thead><tbody>${rows(byCat)}</tbody></table></div>
    <div><table class="res-table"><thead><tr><th>Location (as listed)</th><th>Active jobs</th></tr></thead><tbody>${rows(byLoc)}</tbody></table></div>
  </div>
  <p class="note-real">${JOBS.length} active listing${JOBS.length===1?'':'s'} counted. Pay is shown only on individual job pages when the employer provided it.</p>`;
}

'''


def patch_index():
    t = INDEX.read_text(encoding="utf-8")
    # adsense account meta
    if "google-adsense-account" not in t:
        t = t.replace(
            '<meta name="twitter:card" content="summary_large_image"/>',
            '<meta name="twitter:card" content="summary_large_image"/>\n<meta name="google-adsense-account" content="ca-pub-6456794295168638"/>',
        )
    # CSS
    if ".desk{" not in t:
        t = t.replace("  @media(max-width:900px){", HOME_CSS + "\n  @media(max-width:900px){")
    # extract logo src from existing header
    m = re.search(r'<div class="brand"[^>]*>\s*<img src="(.*?)" alt="HiredFrex"/>', t, re.S)
    logo = m.group(1) if m else "/favicon.png"
    header = HEADER.replace("LOGO_SRC_PLACEHOLDER", logo)
    t = re.sub(r"<header>.*?</header>", header, t, count=1, flags=re.S)
    t = re.sub(
        r"<!-- ============ HOME ============ -->.*?(?=<!-- ============ JOBS ============ -->)",
        HOME_HTML + "\n",
        t,
        count=1,
        flags=re.S,
    )
    # replace renderHome through emptyJobs keep emptyJobs; replace loadBlogPosts
    t = re.sub(
        r"function renderHome\(\)\{.*?\nfunction emptyJobs\(\)\{",
        JS_HOME + "\nfunction emptyJobs(){",
        t,
        count=1,
        flags=re.S,
    )
    t = re.sub(
        r"async function loadBlogPosts\(\)\{.*?\n\}\n\n// ===== CV BUILDER =====",
        "async function loadBlogPosts(){\n  const feat=document.getElementById('homeFeat');\n  const side=document.getElementById('homeSide');\n  const feed=document.getElementById('homeFeed');\n  try{\n    const r=await fetch(`${API}/blog`); const d=r.ok?await r.json():{};\n    LIVE_POSTS=(d.posts&&d.posts.length)?d.posts:null;\n  }catch(e){LIVE_POSTS=null;}\n  const posts=LIVE_POSTS||[];\n  if(feat){\n    feat.innerHTML=posts[0]?featuredHTML(posts[0])\n      :`<a class=\"feat\" id=\"mainfeat\" href=\"/blog\"><div class=\"pc\"><span class=\"pcat\">Career desk</span><div class=\"ph\">Career insights from HiredFrex</div><div class=\"pex\">Original guides for applicants and employers.</div><div class=\"pmore\">Visit the blog →</div></div></a>`;\n  }\n  if(side){\n    const rest=posts.slice(1,5);\n    side.innerHTML=rest.length?rest.map(sideItemHTML).join('')\n      :`<a href=\"/blog\"><div class=\"ph\">All articles</div></a>`;\n  }\n  if(feed){\n    const use=posts.slice(1,10);\n    feed.innerHTML=use.length?use.map(blogCardHTML).join('')\n      :`<a class=\"post\" href=\"/blog\"><div class=\"pc\"><div class=\"ph\">Open the article list</div></div></a>`;\n  }\n}\n\n// ===== CV BUILDER =====",
        t,
        count=1,
        flags=re.S,
    )
    # footer extras
    if "/editorial-standards" not in t:
        t = t.replace(
            '<a href="/cookies">Cookie Policy</a>',
            '<a href="/cookies">Cookie Policy</a>\n      <a href="/editorial-standards">Editorial standards</a>\n      <a href="/research">Research</a>\n      <a href="/guides">Career guides</a>',
        )
    t = t.replace("build 2026.09.19", "build 2026.09.19-desk")
    # cookie bar: add opt-out (AdSense)
    old_cookie = "We use essential cookies to run HiredFrex, and (once ads are enabled) advertising cookies from Google. See our"
    new_cookie = "We use an essential session cookie if you sign in. Google AdSense (when approved) and partners may use cookies to serve ads based on prior visits. Opt out of personalised ads at adssettings.google.com. See our"
    t = t.replace(old_cookie, new_cookie)
    INDEX.write_text(t, encoding="utf-8")
    print("index.html patched", INDEX.stat().st_size)


def patch_admin():
    t = ADMIN.read_text(encoding="utf-8")
    extra = '''
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">
        <div style="flex:1;min-width:180px"><label>Author role</label><input id="bRole" placeholder="e.g. Editor" value="Editorial"/></div>
        <div style="flex:1;min-width:180px"><label>Reviewer</label><input id="bReviewer" placeholder="Name or HiredFrex Editorial Team"/></div>
        <div style="flex:1;min-width:180px"><label>Review date</label><input id="bReviewDate" type="date"/></div>
      </div>
      <label style="margin-top:10px">Author bio <span style="font-weight:400;color:var(--ink3)">(one or two sentences, optional)</span></label>
      <input id="bBio" placeholder="Shown on the article byline. Leave blank if none."/>
      <label style="margin-top:10px">Sources <span style="font-weight:400;color:var(--ink3)">(optional · one per line · URLs or named documents)</span></label>
      <textarea id="bSources" style="width:100%;min-height:70px;padding:11px;border:1px solid var(--line2);border-radius:10px;font-size:13.5px" placeholder="Only list sources you actually used."></textarea>
      <label style="margin-top:10px">Methodology <span style="font-weight:400;color:var(--ink3)">(optional · how this piece was reported)</span></label>
      <textarea id="bMethod" style="width:100%;min-height:70px;padding:11px;border:1px solid var(--line2);border-radius:10px;font-size:13.5px" placeholder="e.g. Checked against the live HiredFrex jobs table on 19 Sep 2026."></textarea>
'''
    if "bReviewer" not in t:
        t = t.replace(
            '<label style="margin-top:10px">Excerpt (meta description, 1–2 sentences)</label>',
            extra + '\n      <label style="margin-top:10px">Excerpt (meta description, 1–2 sentences)</label>',
        )
    t = t.replace(
        "const body={title:val2('bTitle'),slug:val2('bSlug'),category:val2('bCat'),author:val2('bAuthor')||'HiredFrex Team',excerpt:val2('bExcerpt'),body:val2('bBody'),published};",
        "const body={title:val2('bTitle'),slug:val2('bSlug'),category:val2('bCat'),author:val2('bAuthor')||'HiredFrex Editorial Team',authorRole:val2('bRole'),authorBio:val2('bBio'),reviewer:val2('bReviewer'),reviewDate:val2('bReviewDate'),sources:val2('bSources'),methodology:val2('bMethod'),excerpt:val2('bExcerpt'),body:val2('bBody'),published};",
    )
    if "bRole" in t and "document.getElementById('bRole')" not in t:
        t = t.replace(
            "document.getElementById('bExcerpt').value=p.excerpt;document.getElementById('bBody').value=p.body;",
            "document.getElementById('bExcerpt').value=p.excerpt;document.getElementById('bBody').value=p.body;\n    const setv=(id,v)=>{const e=document.getElementById(id);if(e)e.value=v||'';};\n    setv('bRole',p.author_role);setv('bBio',p.author_bio);setv('bReviewer',p.reviewer);setv('bReviewDate',p.review_date);setv('bSources',p.sources);setv('bMethod',p.methodology);",
        )
    # jobs: show last_checked if present
    t = t.replace(
        "<div class=\"sub\">${esc(j.employer_email||'no employer')} · ${date(j.created_at)}</div>",
        "<div class=\"sub\">${esc(j.employer_email||'no employer')} · posted ${date(j.created_at)}${j.last_checked?' · last checked '+date(j.last_checked):''} · status: ${esc(j.status)}</div>",
    )
    ADMIN.write_text(t, encoding="utf-8")
    print("admin.html patched", ADMIN.stat().st_size)


def patch_blog_fn():
    t = BLOG.read_text(encoding="utf-8")
    old_ens = '''async function ensureImageColumns() {
  await require_common().sql`alter table blog_posts add column if not exists image_data text`;
  await require_common().sql`alter table blog_posts add column if not exists image_mime text`;
  await require_common().sql`alter table blog_posts add column if not exists author_photo_data text`;
  await require_common().sql`alter table blog_posts add column if not exists author_photo_mime text`;
}'''
    new_ens = '''async function ensureImageColumns() {
  await require_common().sql`alter table blog_posts add column if not exists image_data text`;
  await require_common().sql`alter table blog_posts add column if not exists image_mime text`;
  await require_common().sql`alter table blog_posts add column if not exists author_photo_data text`;
  await require_common().sql`alter table blog_posts add column if not exists author_photo_mime text`;
  await require_common().sql`alter table blog_posts add column if not exists author_role text`;
  await require_common().sql`alter table blog_posts add column if not exists author_bio text`;
  await require_common().sql`alter table blog_posts add column if not exists reviewer text`;
  await require_common().sql`alter table blog_posts add column if not exists review_date text`;
  await require_common().sql`alter table blog_posts add column if not exists sources text`;
  await require_common().sql`alter table blog_posts add column if not exists methodology text`;
}'''
    if "author_role text" not in t:
        if old_ens in t:
            t = t.replace(old_ens, new_ens)
        else:
            t = t.replace(
                "await require_common().sql`alter table blog_posts add column if not exists author_photo_mime text`;",
                "await require_common().sql`alter table blog_posts add column if not exists author_photo_mime text`;\n  await require_common().sql`alter table blog_posts add column if not exists author_role text`;\n  await require_common().sql`alter table blog_posts add column if not exists author_bio text`;\n  await require_common().sql`alter table blog_posts add column if not exists reviewer text`;\n  await require_common().sql`alter table blog_posts add column if not exists review_date text`;\n  await require_common().sql`alter table blog_posts add column if not exists sources text`;\n  await require_common().sql`alter table blog_posts add column if not exists methodology text`;",
            )
    # POST insert — append extra fields via extra update after insert is safer
    if "authorRole" not in t and "b.authorRole" not in t:
        t = t.replace(
            "return C.ok({ ok: true, post: rows[0] });",
            """try {
        await ensureImageColumns();
        await C.sql`update blog_posts set
          author_role=coalesce(${b.authorRole || b.author_role || null},author_role),
          author_bio=coalesce(${b.authorBio || b.author_bio || null},author_bio),
          reviewer=coalesce(${b.reviewer || null},reviewer),
          review_date=coalesce(${b.reviewDate || b.review_date || null},review_date),
          sources=coalesce(${b.sources || null},sources),
          methodology=coalesce(${b.methodology || null},methodology)
          where id=${rows[0].id}`;
      } catch (e2) { console.error(e2); }
      return C.ok({ ok: true, post: rows[0] });""",
            1,
        )
        # also on PATCH — first occurrence was POST; do PATCH by adding before updated_at
        t = t.replace(
            "author=coalesce(${b.author},author), published=coalesce(${b.published},published),",
            "author=coalesce(${b.author},author), published=coalesce(${b.published},published),\n        author_role=coalesce(${b.authorRole || b.author_role || null},author_role), author_bio=coalesce(${b.authorBio || b.author_bio || null},author_bio),\n        reviewer=coalesce(${b.reviewer || null},reviewer), review_date=coalesce(${b.reviewDate || b.review_date || null},review_date),\n        sources=coalesce(${b.sources || null},sources), methodology=coalesce(${b.methodology || null},methodology),",
        )
    BLOG.write_text(t, encoding="utf-8")
    print("blog.js patched")


def patch_pages_shell():
    t = PAGES.read_text(encoding="utf-8")
    t = t.replace(
        "<nav><a href=\"/\">Home</a><a href=\"/jobs\">Jobs</a><a href=\"/blog\">Insights</a></nav>",
        "<nav><a href=\"/jobs\" style=\"background:var(--navy);color:#fff;padding:6px 10px;border-radius:8px\">Jobs</a><a href=\"/career\">Career</a><a href=\"/uae-jobs\">UAE</a><a href=\"/salaries\">Salaries</a><a href=\"/blog\">Latest</a></nav>",
    )
    t = t.replace(
        "<a href=\"/\">Home</a><a href=\"/jobs\">Jobs</a><a href=\"/blog\">Insights</a> · support@hiredfrex.com</footer>",
        "<a href=\"/\">Home</a><a href=\"/jobs\">Jobs</a><a href=\"/blog\">Latest</a><a href=\"/editorial-standards\">Editorial standards</a><a href=\"/privacy\">Privacy</a> · support@hiredfrex.com</footer>",
    )
    if "google-adsense-account" not in t:
        t = t.replace(
            '<meta name="twitter:card" content="summary_large_image"/>',
            '<meta name="twitter:card" content="summary_large_image"/>\n<meta name="google-adsense-account" content="ca-pub-6456794295168638"/>',
        )
    # article extras
    old_by = '<p class="meta rt" style="display:flex;align-items:center;gap:10px">${p.author_photo_data?`<img src="/api/blog-image?id=${p.id}&kind=author" alt="" width="36" height="36" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1px solid var(--line,#e5e2da)"/>`:\'\'}<span>${P.esc(p.author)} \\xB7 ${new Date(p.created_at).toISOString().slice(0, 10)} \\xB7 ${rtime(p.body)} min read</span></p>'
    new_by = old_by + '\n    ${p.author_role||p.reviewer?`<p class="meta">${p.author_role?P.esc(p.author_role):""}${p.reviewer?" · Reviewed by "+P.esc(p.reviewer):""}${p.review_date?" · "+P.esc(String(p.review_date).slice(0,10)):""}</p>`:""}'
    if old_by in t:
        t = t.replace(old_by, new_by)
    art_end = '<div class="card" style="margin-top:28px"><strong>Put this into practice:</strong>'
    extra_art = '''${p.sources ? `<h2>Sources</h2><div class="art">${P.md(p.sources)}</div>` : ""}
    ${p.methodology ? `<h2>How we reported this</h2><div class="art">${P.md(p.methodology)}</div>` : ""}
    ''' + art_end
    if "How we reported this" not in t:
        t = t.replace(art_end, extra_art)

    # routing for hubs — staticPage map won't have them; add path handlers that call new impls
    route_snip = '''    if (path === "/career" || path === "/career/") return hubPage("career");
    if (path === "/uae-jobs" || path === "/uae-jobs/") return hubPage("uae-jobs");
    if (path === "/salaries" || path === "/salaries/") return hubPage("salaries");
    if (path === "/interviews" || path === "/interviews/") return hubPage("interviews");
    if (path === "/guides" || path === "/guides/") return hubPage("guides");
    if (path === "/research" || path === "/research/") return hubPage("research");
    if (path === "/editorial-standards" || path === "/editorial-standards/") return hubPage("editorial-standards");
'''
    if 'path === "/career"' not in t:
        t = t.replace(
            '    if (path === "/about" || path === "/about/") return staticPage("about");',
            route_snip + '    if (path === "/about" || path === "/about/") return staticPage("about");',
        )

    hub_fn = r'''
const HUBS = {
  "career": {
    title: "Career desk — HiredFrex",
    description: "Original career information for people applying to Gulf and international jobs. Guides, not copied vacancy dumps.",
    h1: "Career desk",
    body: `<p class="lead">This desk is for reading: how offers work, how to check a company name, and how HiredFrex labels a listing. When you want to apply, use the job portal.</p>
    <p><a class="btn" href="/jobs">Open Jobs</a></p>
    <h2>What you will find here</h2>
    <p>Articles on job search, interviews, CVs and UAE-specific paperwork. Each piece is written by the HiredFrex desk. We do not republish other boards' listings as our own journalism.</p>
    <h2>Go deeper</h2>
    <p><a href="/blog">Latest articles</a> · <a href="/uae-jobs">UAE jobs desk</a> · <a href="/salaries">Salaries</a> · <a href="/interviews">Interviews</a> · <a href="/guides">Guides</a></p>
    <p><a href="/editorial-standards">How we work</a></p>`
  },
  "uae-jobs": {
    title: "UAE jobs desk — HiredFrex",
    description: "Guidance for people looking at jobs in Abu Dhabi, Dubai and the wider UAE, plus a door into reviewed listings on HiredFrex.",
    h1: "UAE jobs desk",
    body: `<p class="lead">Use this desk for orientation. Use <a href="/jobs">Jobs</a> to search live listings. We do not scrape other websites and republish their vacancies as articles.</p>
    <h2>Where to look on HiredFrex</h2>
    <p>Open the job portal and filter by keyword (for example Security, Housekeeping, Dubai). Only jobs with status <b>active</b> after admin review are public.</p>
    <p><a class="btn" href="/jobs">Browse UAE-related jobs on HiredFrex</a></p>
    <h2>Read first</h2>
    <p><a href="/blog">Career insights</a> include offer-letter notes, company-name checks and documents to prepare. If a guide cites a number, it names the source or it is counted from our own board.</p>
    <h2>Cities</h2>
    <p>Search the portal for Abu Dhabi, Dubai or Sharjah as written on the listing. We do not create empty city pages that repeat the same thin text.</p>`
  },
  "salaries": {
    title: "Salary desk — HiredFrex",
    description: "How HiredFrex treats pay information. We publish a salary only when an employer listed it or a named public source states it.",
    h1: "Salary desk",
    body: `<p class="lead">HiredFrex will not invent a salary. If a job card has no pay range, we do not fill one in.</p>
    <h2>What we publish</h2>
    <ul>
      <li>Pay ranges typed by the employer on a HiredFrex listing.</li>
      <li>Figures in an article only when a named source is given (for example a government page or the listing itself).</li>
    </ul>
    <h2>What we will not do</h2>
    <p>We will not average “the market” from other job boards, or present a guess as a UAE-wide rate. That would be fabricated statistics.</p>
    <p><a class="btn" href="/jobs">See which live jobs include pay</a></p>
    <p><a href="/blog">Articles that discuss pay</a> · <a href="/research">Research method</a></p>`
  },
  "interviews": {
    title: "Interview desk — HiredFrex",
    description: "Preparation notes for Gulf and international interviews, written by the HiredFrex desk.",
    h1: "Interview desk",
    body: `<p class="lead">Read these notes before you apply. They are editorial, not a guarantee of an interview.</p>
    <h2>Start here</h2>
    <p>Open <a href="/blog">Latest articles</a> and look for interview pieces. Typical topics: questions to ask, what to do in the 24 hours after a Gulf interview, and how automated screening may work.</p>
    <p><a class="btn" href="/jobs">When you are ready, search jobs</a></p>
    <h2>We do not sell interviews</h2>
    <p>HiredFrex does not charge candidates for interview slots. If someone messages you asking for a fee to “fast-track” a HiredFrex application, treat it as a warning sign and <a href="/contact">contact us</a>.</p>`
  },
  "guides": {
    title: "Career guides — HiredFrex",
    description: "CV, interview, documents and job-search guides from the HiredFrex editorial desk.",
    h1: "Career guides",
    body: `<p class="lead">Longer reads that stay useful after a single vacancy closes. New guides are added from the admin desk, not auto-generated.</p>
    <h2>Guide families</h2>
    <ul>
      <li>CV and resume — including a <a href="/">free on-site CV builder</a> on the main site.</li>
      <li>Interviews — <a href="/interviews">interview desk</a>.</li>
      <li>UAE process — documents, offer letters, company-name checks. <a href="/uae-jobs">UAE jobs desk</a>.</li>
      <li>Safety — cloned employer names and WhatsApp offers. See the blog.</li>
    </ul>
    <p><a class="btn" href="/blog">All articles</a> &nbsp; <a class="btn" href="/jobs" style="background:transparent;color:var(--navy);box-shadow:none;border:1px solid var(--line2)">Jobs portal</a></p>`
  },
  "research": {
    title: "HiredFrex research — method",
    description: "How HiredFrex counts jobs on its own board. We do not publish fabricated labour-market statistics.",
    h1: "Research method",
    body: `<p class="lead">The only dataset we will summarise as “HiredFrex research” is the set of jobs on this site with status active after review.</p>
    <h2>What a count means</h2>
    <p>If the homepage table says 3 Security jobs, that means three active Security listings on HiredFrex at load time. It is not “demand in the UAE”.</p>
    <h2>What we will not publish</h2>
    <ul>
      <li>National salary averages we did not measure.</li>
      <li>Scraped totals from other boards.</li>
      <li>Percentages with no denominator.</li>
    </ul>
    <h2>Corrections</h2>
    <p>If a count or a listing is wrong, email support@hiredfrex.com. Closed jobs are unpublished from the public portal; we do not keep selling them as current vacancies.</p>
    <p><a href="/editorial-standards">Editorial standards</a> · <a href="/jobs">Job portal</a></p>`
  },
  "editorial-standards": {
    title: "Editorial standards — HiredFrex",
    description: "How HiredFrex writes career articles, reviews jobs, handles corrections, and uses AI tools.",
    h1: "Editorial standards",
    body: `<p class="lead">HiredFrex is a small desk in Abu Dhabi. These are the rules we actually use — not a generic policy copied from a template.</p>
    <h2>Two products</h2>
    <p>The <b>publication</b> (this site’s articles and desks) is for reading. The <b>job portal</b> at <a href="/jobs">/jobs</a> is for search and apply. Listings are not automatically turned into articles.</p>
    <h2>How a job reaches the public</h2>
    <p>An employer posts from their dashboard. The job sits in <b>pending</b> or <b>needs verification</b> until an admin approves it. Public pages only show <b>active</b> jobs. Closed jobs are not presented as open vacancies.</p>
    <h2>Automated flags we already run</h2>
    <p>New jobs are checked for an employer-name mismatch in the description, and for remote/on-site contradictions on security, hospitality and general labour roles. Flagged jobs are not auto-deleted; an admin decides.</p>
    <h2>How articles are made</h2>
    <p>Articles are written in the admin Blog tab, with a named author (or “HiredFrex Editorial Team”), optional photo, optional sources and methodology. We do not auto-publish unverified feeds. We do not invent authors or qualifications.</p>
    <h2>Sources</h2>
    <p>If an article uses a figure, it should name the source on the page. If we cannot source it, we do not publish the figure.</p>
    <h2>AI tools</h2>
    <p>The optional CV builder uses an AI model when you click generate. Articles are not bulk-written by an unattended bot and posted as news.</p>
    <h2>Corrections and outdated jobs</h2>
    <p>Email support@hiredfrex.com. We unpublish or correct. We do not leave expired jobs labelled as current.</p>
    <h2>Advertising</h2>
    <p>If Google AdSense is approved, ads are secondary to content. Ads must not look like Apply buttons. The site is meant to be useful with ads off.</p>
    <p>Questions: <a href="/contact">Contact</a> · <a href="/privacy">Privacy</a></p>`
  }
};
function hubPage(key) {
  const h = HUBS[key];
  if (!h) return P.html(P.shell({ title: "Not found — HiredFrex", description: "Not found", canonical: P.APP, noindex: true, content: "<h1>Not found</h1>" }), 404);
  return P.html(P.shell({
    title: h.title,
    description: h.description,
    canonical: P.APP + "/" + key,
    content: "<h1>" + h.h1 + "</h1>" + h.body
  }));
}
'''
    if "function hubPage" not in t:
        t = t.replace("async function aboutPage_impl()", hub_fn + "\nasync function aboutPage_impl()")
    PAGES.write_text(t, encoding="utf-8")
    print("pages.js patched")


def patch_toml_schema_sitemap():
    toml = TOML.read_text(encoding="utf-8")
    extra = '''
[[redirects]]
  from = "/career"
  to = "/.netlify/functions/pages/career"
  status = 200
[[redirects]]
  from = "/uae-jobs"
  to = "/.netlify/functions/pages/uae-jobs"
  status = 200
[[redirects]]
  from = "/salaries"
  to = "/.netlify/functions/pages/salaries"
  status = 200
[[redirects]]
  from = "/interviews"
  to = "/.netlify/functions/pages/interviews"
  status = 200
[[redirects]]
  from = "/guides"
  to = "/.netlify/functions/pages/guides"
  status = 200
[[redirects]]
  from = "/research"
  to = "/.netlify/functions/pages/research"
  status = 200
[[redirects]]
  from = "/editorial-standards"
  to = "/.netlify/functions/pages/editorial-standards"
  status = 200
'''
    if "/editorial-standards" not in toml:
        TOML.write_text(toml.rstrip() + "\n" + extra, encoding="utf-8")
    sch = SCHEMA.read_text(encoding="utf-8")
    add = '''
alter table blog_posts add column if not exists author_role text;
alter table blog_posts add column if not exists author_bio text;
alter table blog_posts add column if not exists reviewer text;
alter table blog_posts add column if not exists review_date text;
alter table blog_posts add column if not exists sources text;
alter table blog_posts add column if not exists methodology text;
alter table jobs add column if not exists last_checked timestamptz;
'''
    if "author_role" not in sch:
        SCHEMA.write_text(sch + add, encoding="utf-8")
    sm = SITEMAP.read_text(encoding="utf-8")
    old = "${url(APP + \"/cookies\")}"
    new = old + "${url(APP + \"/career\")}${url(APP + \"/uae-jobs\")}${url(APP + \"/salaries\")}${url(APP + \"/interviews\")}${url(APP + \"/guides\")}${url(APP + \"/research\")}${url(APP + \"/editorial-standards\")}"
    if "/editorial-standards" not in sm:
        sm = sm.replace(old, new)
        SITEMAP.write_text(sm, encoding="utf-8")
    print("toml/schema/sitemap patched")


def write_readme():
    (ROOT / "README-DEPLOY.txt").write_text(
        """HiredFrex — publication + job portal
Build: 2026.09.19-desk

WHAT THIS IS
- Main site = daily career publication (articles, desks, research from OUR jobs only)
- /jobs = existing job portal (search, apply, CV, employer dashboard)
- /admin.html = ORIGINAL admin (jobs, blogs, users, messages, API keys)
  Blog tab now also has author role, bio, reviewer, review date, sources, methodology.

DEPLOY
Netlify → Deploys → drag this zip (the zip file, not a folder).
Publish directory stays "."
Keep env vars: DATABASE_URL, JWT_SECRET, ADMIN_TOKEN, SENDGRID_API_KEY,
EMAIL_FROM, OWNER_EMAIL, APP_URL, ANTHROPIC_API_KEY.

Footer stamp: build 2026.09.19-desk
JOBS in the top category bar goes to /jobs.

Do not run a Netlify build command. No Git required.
""",
        encoding="utf-8",
    )


if __name__ == "__main__":
    patch_index()
    patch_admin()
    patch_blog_fn()
    patch_pages_shell()
    patch_toml_schema_sitemap()
    write_readme()
    print("done")

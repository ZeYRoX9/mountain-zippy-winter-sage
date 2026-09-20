let LIVE_POSTS=null;
let TOPIC='All';
function rtime2(p){
  const b=(p&&p.body)||(p&&p.excerpt)||'';
  const n=String(b).trim()?String(b).trim().split(/\s+/).length:400;
  return Math.max(3, Math.round(n/200));
}
function splitTitle(title){
  const s=String(title||'');
  const i=s.indexOf(':');
  if(i>12 && i<s.length-8) return esc(s.slice(0,i+1))+' <span>'+esc(s.slice(i+1).trim())+'</span>';
  return esc(s);
}
function featuredHTML(p){
  const bg=p.has_image?`url('/api/blog-image?id=${p.id}') center/cover no-repeat`:'linear-gradient(135deg,#1a3060,#0c1a3a)';
  const initials=(p.author||'HF').split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const av=p.id&&p.has_author_photo?`<img class="hero-avatar" src="/api/blog-image?id=${p.id}&kind=author" alt=""/>`:`<div class="hero-avatar">${esc(initials)}</div>`;
  return `<a class="hero-blog" id="mainfeat" href="/blog/${p.slug}">
    <div class="left">
      <div class="hero-badge">Featured article</div>
      <h1>${splitTitle(p.title)}</h1>
      <p class="hero-excerpt">${esc(p.excerpt||'')}</p>
      <div class="hero-meta">
        ${av}
        <div class="by">By <b>${esc(p.author||'HiredFrex Editorial Team')}</b></div>
        <div class="rt">${rtime2(p)} min read</div>
      </div>
      <span class="read-btn">Read the article →</span>
    </div>
    <div class="right">
      <div class="hero-img" style="background:${bg}"></div>
      <div class="hero-cat"><span class="chip">${esc(p.category||'Career')}</span></div>
    </div>
  </a>`;
}
function articleCardHTML(p){
  const bg=p.has_image?`url('/api/blog-image?id=${p.id}') center/cover no-repeat`:'linear-gradient(135deg,var(--navy),var(--navy-2))';
  const d=p.created_at?new Date(p.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):'';
  return `<a class="article-card" href="/blog/${p.slug}">
    <div class="img" style="background:${bg}"></div>
    <div class="article-body">
      <div class="cat">${esc(p.category||'Career')}</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.excerpt||'')}</p>
      <div class="article-meta">
        <span>${esc(p.author||'HiredFrex Editorial Team')}</span><span class="dot">·</span>
        <span>${rtime2(p)} min read</span>${d?`<span class="dot">·</span><span>${d}</span>`:''}
      </div>
    </div>
  </a>`;
}
function miniCardHTML(p){
  const bg=p.has_image?`url('/api/blog-image?id=${p.id}') center/cover no-repeat`:'linear-gradient(135deg,var(--navy-2),#1e3d7a)';
  return `<a class="mini-card" href="/blog/${p.slug}">
    <div class="mini-img" style="background:${bg}"></div>
    <div class="mini-body">
      <div class="cat">${esc(p.category||'Career')}</div>
      <h4>${esc(p.title)}</h4>
      <div class="rt">${rtime2(p)} min read</div>
    </div>
  </a>`;
}
function jobTeaserHTML(j){
  const href=j.id?`/job/${j.id}`:'/jobs';
  const img=j.eid?`<img src="/api/company-logo?id=${j.eid}" alt="" onerror="this.remove()"/>`:'';
  return `<a class="job-teaser" href="${href}" onclick="return handleJobClick(event,${j.cid})">
    <div class="jt-logo">${img}<span>${esc(j.in||'HF')}</span></div>
    <div class="jt-body">
      <div class="title">${esc(j.t)}</div>
      <div class="co">${esc(j.co)} · ${esc(j.loc)}</div>
      <div class="jt-chip">${esc(j.ty||'Open')}</div>
    </div>
  </a>`;
}
function filteredPosts(){
  const posts=LIVE_POSTS||[];
  if(TOPIC==='All') return posts;
  return posts.filter(p=>String(p.category||'').toLowerCase().includes(TOPIC.toLowerCase()));
}
function setTopic(c){
  TOPIC=c;
  document.querySelectorAll('.cat-pill').forEach(el=>el.classList.toggle('on', el.dataset.t===c));
  paintArticles();
}
function paintTopics(){
  const el=document.getElementById('topicCats'); if(!el)return;
  const cats=['All'];
  (LIVE_POSTS||[]).forEach(p=>{
    const c=(p.category||'').trim();
    if(c && !cats.includes(c)) cats.push(c);
  });
  el.innerHTML=cats.map(c=>`<button type="button" class="cat-pill ${c===TOPIC?'on':''}" data-t="${esc(c)}" onclick="setTopic(this.dataset.t)">${esc(c)}</button>`).join('');
}
function paintArticles(){
  const posts=filteredPosts();
  const feat=document.getElementById('homeFeat');
  const list=document.getElementById('homeArticles');
  const mini=document.getElementById('homeMini');
  const all=LIVE_POSTS||[];
  if(feat){
    feat.innerHTML=all[0]?featuredHTML(all[0])
      :`<a class="hero-blog" id="mainfeat" href="/blog"><div class="left"><div class="hero-badge">Career insights</div><h1>Original guides for people applying to Gulf and international jobs</h1><p class="hero-excerpt">Articles are published from the HiredFrex desk. When you are ready to apply, open Jobs.</p><span class="read-btn">Visit the blog →</span></div><div class="right"><div class="hero-img"></div></div></a>`;
  }
  const rest = (posts[0] && all[0] && posts[0].slug===all[0].slug) ? posts.slice(1) : posts.filter(p=>!all[0]||p.slug!==all[0].slug);
  if(list){
    const mid=rest.slice(0,3);
    list.innerHTML=mid.length?mid.map(articleCardHTML).join('')
      :`<a class="article-card" href="/blog"><div class="article-body"><h3>Open the article list</h3><p>New pieces appear here when they are published from admin.</p></div></a>`;
  }
  if(mini){
    const more=rest.slice(3,9);
    mini.innerHTML=more.length?more.map(miniCardHTML).join('')
      :`<a class="mini-card" href="/blog"><div class="mini-body"><div class="cat">Blog</div><h4>All career insights</h4></div></a>`;
  }
}
function renderHome(){
  const side=document.getElementById('homeJobsSide');
  if(side){
    const show=JOBS.slice(0,5);
    side.innerHTML=show.length?show.map(jobTeaserHTML).join('')
      :`<p style="font-size:13.5px;color:var(--ink-2);line-height:1.55">No active listings yet. Approved jobs appear here and in the <a href="/jobs" style="color:var(--gold-deep);font-weight:700">job portal</a>.</p>`;
  }
  paintTopics();
  paintArticles();
}



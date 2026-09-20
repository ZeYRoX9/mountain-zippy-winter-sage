-- Named authors for the editorial desk (AdSense E-E-A-T).

create table if not exists authors (
  id text primary key,
  name text not null unique,
  title text not null default '',
  bio text not null default '',
  photo text not null default '',
  created_at timestamptz not null default now()
);

alter table blog_posts add column if not exists author_title text not null default '';
alter table blog_posts add column if not exists author_bio text not null default '';

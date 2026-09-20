-- HiredFrex database schema (PostgreSQL / Neon)
-- Run this once in the Neon SQL Editor.

create extension if not exists pgcrypto;

create table if not exists employers (
  id            uuid primary key default gen_random_uuid(),
  company       text not null,
  contact_email text not null,
  website       text default '',
  status        text not null default 'pending',   -- pending | approved | rejected
  created_at    timestamptz not null default now()
);

create table if not exists users (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null unique,
  password_hash text not null,
  role          text not null default 'seeker',     -- seeker | employer | admin
  employer_id   uuid references employers(id) on delete set null,
  email_verified boolean not null default false,
  verification_code text,
  code_expires  timestamptz,
  created_at    timestamptz not null default now()
);

create table if not exists jobs (
  id            uuid primary key default gen_random_uuid(),
  employer_id   uuid references employers(id) on delete cascade,
  title         text not null,
  company       text not null,
  location      text not null,
  type          text default 'Full-time',           -- Full-time | Part-time | Contract
  level         text default 'Mid',
  remote        boolean default false,
  salary        text default '',
  category      text default 'Other',
  description   text default '',
  tags          text[] default '{}',
  featured      boolean default false,
  status        text not null default 'active',      -- active | closed | pending
  source        text not null default 'native',      -- native | jooble
  source_url    text,                                -- outbound apply link for aggregated jobs
  last_seen_at  timestamptz default now()
  created_at    timestamptz not null default now()
);

create table if not exists applications (
  id          uuid primary key default gen_random_uuid(),
  job_id      uuid not null references jobs(id) on delete cascade,
  name        text not null,
  email       text not null,
  linkedin    text default '',
  cover_note  text default '',
  cv_text     text default '',
  phone       text default '',
  cv_filename text,
  cv_data     text,
  ai_score    int,
  ai_summary  text,
  created_at  timestamptz not null default now()
);

-- Migration (safe to re-run):
alter table applications add column if not exists cv_filename text;
alter table applications add column if not exists cv_data text;
alter table users add column if not exists email_verified boolean not null default false;
alter table users add column if not exists verification_code text;
alter table users add column if not exists code_expires timestamptz;
alter table applications add column if not exists phone text default '';
alter table jobs add column if not exists source text not null default 'native';
alter table jobs add column if not exists source_url text;
alter table jobs add column if not exists last_seen_at timestamptz default now();
create unique index if not exists idx_jobs_source_url on jobs(source, source_url) where source_url is not null;
alter table users add column if not exists avatar_data text;
alter table users add column if not exists avatar_mime text;
alter table blog_posts add column if not exists image_data text;
alter table blog_posts add column if not exists image_mime text;
alter table jobs add column if not exists requirements text default '';
alter table jobs add column if not exists benefits text default '';

create index if not exists idx_jobs_status  on jobs(status, featured desc, created_at desc);
create index if not exists idx_apps_job     on applications(job_id);
create index if not exists idx_users_email  on users(email);

-- OPTIONAL: create your admin login.
-- 1) pick a password, hash it (see SETUP.md step 5), then:
-- insert into users (name, email, password_hash, role)
-- values ('Admin', 'admin@hiredfrex.com', '<bcrypt-hash-here>', 'admin');

-- NOTE: no demo jobs are inserted. Real jobs come only from employers via the dashboard.
-- To remove any old demo jobs from an earlier setup, run:
--   delete from jobs where employer_id is null;

-- ===== v3 additions: blog CMS, saved jobs, messages, reset, linking (safe to re-run) =====
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text default 'Career advice',
  excerpt text default '',
  body text not null,                -- markdown-ish: ## headings + paragraphs
  author text default 'HiredFrex Team',
  accent text default '#15264f',
  icon text default '✦',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists saved_jobs (
  user_id uuid not null references users(id) on delete cascade,
  job_id uuid not null references jobs(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, job_id)
);
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, topic text default '',
  message text not null, created_at timestamptz not null default now()
);
alter table applications add column if not exists user_id uuid references users(id) on delete set null;
alter table users add column if not exists phone text;
alter table users add column if not exists reset_code text;
alter table users add column if not exists reset_expires timestamptz;
alter table jobs add column if not exists views int not null default 0;
create index if not exists idx_blog_slug on blog_posts(slug) where published;
alter table employers add column if not exists logo_data text;
alter table employers add column if not exists logo_mime text;
create table if not exists api_keys (
  id uuid primary key default gen_random_uuid(),
  key_hash text not null unique,
  label text not null,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  revoked boolean not null default false
);
alter table applications add column if not exists status text not null default 'submitted';
alter table jobs add column if not exists flag_reasons text;

alter table blog_posts add column if not exists author_photo_data text;
alter table blog_posts add column if not exists author_photo_mime text;

alter table blog_posts add column if not exists author_role text;
alter table blog_posts add column if not exists author_bio text;
alter table blog_posts add column if not exists reviewer text;
alter table blog_posts add column if not exists review_date text;
alter table blog_posts add column if not exists sources text;
alter table blog_posts add column if not exists methodology text;
alter table jobs add column if not exists last_checked timestamptz;

-- HiredFrex production extras (safe to re-run on Neon)
-- Adds columns the editorial desk and this app need on top of the original
-- hiredfrex.com schema. Does not delete jobs or articles.

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text default 'Career advice',
  excerpt text default '',
  body text not null,
  author text default 'HiredFrex Editorial',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table blog_posts add column if not exists author text default 'HiredFrex Editorial';
alter table blog_posts add column if not exists author_photo text default '';
alter table blog_posts add column if not exists cover_url text default '';
alter table blog_posts add column if not exists image_data text;
alter table blog_posts add column if not exists image_mime text;
alter table blog_posts add column if not exists published boolean not null default true;
alter table blog_posts add column if not exists indexable boolean not null default true;
alter table blog_posts add column if not exists published_on date;
alter table blog_posts add column if not exists updated_on date;
alter table blog_posts add column if not exists read_minutes int default 8;
alter table blog_posts add column if not exists author_title text default '';
alter table blog_posts add column if not exists author_bio text default '';

alter table jobs add column if not exists slug text;
alter table jobs add column if not exists company_name text;
alter table jobs add column if not exists location_city text;
alter table jobs add column if not exists location_country text;
alter table jobs add column if not exists location_display text;
alter table jobs add column if not exists employment_type text;
alter table jobs add column if not exists workplace_type text;
alter table jobs add column if not exists salary_display text;
alter table jobs add column if not exists category_slug text;
alter table jobs add column if not exists posted_on date;
alter table jobs add column if not exists overview text default '';
alter table jobs add column if not exists indexable boolean not null default true;
alter table jobs add column if not exists verification_status text default 'pending_review';
alter table jobs add column if not exists verification_summary text default '';
alter table jobs add column if not exists checks_json text default '[]';
alter table jobs add column if not exists quality_flags_json text default '[]';

create table if not exists email_otps (
  id text primary key,
  email text not null,
  purpose text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_email_otps_lookup on email_otps (email, purpose, created_at desc);

create index if not exists idx_jobs_public on jobs (status, indexable, posted_on desc);

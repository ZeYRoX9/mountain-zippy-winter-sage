-- HiredFrex application schema. user_id is TEXT (Better Auth / preview ids).
-- CREATE TABLE IF NOT EXISTS is a no-op when hiredfrex.com already has these
-- tables (uuid ids, company/location/description). Needed columns are added
-- afterwards with ADD COLUMN IF NOT EXISTS.
-- Never CREATE INDEX on indexable/posted_on/category_slug in this file:
-- those columns do not exist on the original Neon jobs table until ALTER runs,
-- and a later statement in the same file used to fail the whole migration.

create table if not exists employers (
  id text primary key,
  name text not null,
  website text not null default '',
  city text not null default '',
  country text not null default '',
  about text not null default '',
  source_note text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists jobs (
  id text primary key,
  slug text not null unique,
  employer_id text not null,
  title text not null,
  company_name text not null,
  location_city text not null,
  location_country text not null,
  location_display text not null,
  employment_type text not null,
  workplace_type text not null,
  salary_display text,
  salary_min numeric,
  salary_max numeric,
  salary_currency text,
  salary_period text,
  experience_level text,
  category text not null,
  category_slug text not null,
  posted_on date,
  closing_on date,
  overview text not null default '',
  about_employer text not null default '',
  responsibilities_json text not null default '[]',
  essential_requirements_json text not null default '[]',
  preferred_requirements_json text not null default '[]',
  skills_json text not null default '[]',
  schedule text,
  benefits_json text not null default '[]',
  visa_info text,
  hiring_process text,
  how_to_apply text not null default '',
  source_name text,
  source_url text,
  last_verified_on date,
  verification_status text not null default 'pending_review',
  verification_summary text not null default '',
  checks_json text not null default '[]',
  quality_flags_json text not null default '[]',
  indexable boolean not null default false,
  featured boolean not null default false,
  status text not null default 'pending',
  views int not null default 0,
  posted_by_user_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists profiles (
  user_id text primary key,
  role text not null default 'seeker',
  display_name text,
  email text,
  phone text,
  headline text,
  location text,
  skills text,
  cv_json text not null default '{}',
  employer_id text,
  company_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists applications (
  id text primary key,
  job_id text not null,
  user_id text not null,
  name text not null,
  email text not null,
  phone text default '',
  cover_note text default '',
  cv_text text default '',
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);

create table if not exists saved_jobs (
  user_id text not null,
  job_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, job_id)
);

create table if not exists job_alerts (
  id text primary key,
  user_id text not null,
  query text default '',
  category text default '',
  location text default '',
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id text primary key,
  name text not null,
  email text not null,
  topic text not null default 'general',
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists job_reports (
  id text primary key,
  job_id text,
  user_id text,
  reason text not null,
  details text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id text primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null,
  category text not null,
  author text not null default 'HiredFrex Editorial',
  published boolean not null default true,
  indexable boolean not null default true,
  published_on date not null,
  updated_on date not null,
  read_minutes int not null default 8
);

create table if not exists seed_meta (
  id text primary key,
  applied_at timestamptz not null default now()
);

create table if not exists verification_events (
  id text primary key,
  job_id text not null,
  actor_user_id text,
  action text not null,
  notes text not null default '',
  created_at timestamptz not null default now()
);

-- Existing hiredfrex.com Neon: jobs/blog_posts already exist without these columns.
alter table jobs add column if not exists slug text;
alter table jobs add column if not exists company_name text;
alter table jobs add column if not exists location_city text;
alter table jobs add column if not exists location_country text;
alter table jobs add column if not exists location_display text;
alter table jobs add column if not exists employment_type text;
alter table jobs add column if not exists workplace_type text;
alter table jobs add column if not exists salary_display text;
alter table jobs add column if not exists salary_min numeric;
alter table jobs add column if not exists salary_max numeric;
alter table jobs add column if not exists salary_currency text;
alter table jobs add column if not exists salary_period text;
alter table jobs add column if not exists experience_level text;
alter table jobs add column if not exists category_slug text;
alter table jobs add column if not exists posted_on date;
alter table jobs add column if not exists closing_on date;
alter table jobs add column if not exists overview text default '';
alter table jobs add column if not exists about_employer text default '';
alter table jobs add column if not exists responsibilities_json text default '[]';
alter table jobs add column if not exists essential_requirements_json text default '[]';
alter table jobs add column if not exists preferred_requirements_json text default '[]';
alter table jobs add column if not exists skills_json text default '[]';
alter table jobs add column if not exists schedule text;
alter table jobs add column if not exists benefits_json text default '[]';
alter table jobs add column if not exists visa_info text;
alter table jobs add column if not exists hiring_process text;
alter table jobs add column if not exists how_to_apply text default '';
alter table jobs add column if not exists source_name text;
alter table jobs add column if not exists last_verified_on date;
alter table jobs add column if not exists verification_status text default 'pending_review';
alter table jobs add column if not exists verification_summary text default '';
alter table jobs add column if not exists checks_json text default '[]';
alter table jobs add column if not exists quality_flags_json text default '[]';
alter table jobs add column if not exists indexable boolean default true;
alter table jobs add column if not exists featured boolean default false;
alter table jobs add column if not exists views int default 0;
alter table jobs add column if not exists posted_by_user_id text;
alter table jobs add column if not exists updated_at timestamptz default now();
alter table jobs add column if not exists status text default 'pending';

alter table blog_posts add column if not exists indexable boolean default true;
alter table blog_posts add column if not exists published_on date;
alter table blog_posts add column if not exists updated_on date;
alter table blog_posts add column if not exists read_minutes int default 8;
alter table blog_posts add column if not exists excerpt text default '';
alter table blog_posts add column if not exists author text default 'HiredFrex Editorial';

alter table employers add column if not exists name text;
alter table employers add column if not exists website text default '';
alter table employers add column if not exists city text default '';
alter table employers add column if not exists country text default '';
alter table employers add column if not exists about text default '';
alter table employers add column if not exists source_note text default '';

alter table applications add column if not exists user_id text;
alter table applications add column if not exists phone text default '';
alter table applications add column if not exists status text default 'submitted';
alter table applications add column if not exists cv_text text default '';
alter table applications add column if not exists cover_note text default '';

-- HiredFrex — safe to paste in the Neon SQL Editor.
-- Adds columns the new site needs WITHOUT deleting jobs or articles.
-- Fixes: "column indexable does not exist"
-- Run this ONCE (safe to re-run).

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

alter table blog_posts add column if not exists indexable boolean default true;
alter table blog_posts add column if not exists published_on date;
alter table blog_posts add column if not exists updated_on date;
alter table blog_posts add column if not exists read_minutes int default 8;
alter table blog_posts add column if not exists author_photo text default '';
alter table blog_posts add column if not exists cover_url text default '';
alter table blog_posts add column if not exists author_title text default '';
alter table blog_posts add column if not exists author_bio text default '';
alter table blog_posts add column if not exists created_by_user_id text;

alter table profiles add column if not exists email_verified boolean default false;

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

create table if not exists authors (
  id text primary key,
  name text not null unique,
  title text not null default '',
  bio text not null default '',
  photo text not null default '',
  created_at timestamptz not null default now()
);

-- Copy old column names into the new ones when present
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'company'
  ) THEN
    EXECUTE $q$UPDATE jobs SET company_name = company WHERE coalesce(company_name, '') = '' AND company IS NOT NULL$q$;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'location'
  ) THEN
    EXECUTE $q$UPDATE jobs SET location_display = location WHERE coalesce(location_display, '') = '' AND location IS NOT NULL$q$;
    EXECUTE $q$UPDATE jobs SET location_city = split_part(location, ',', 1) WHERE coalesce(location_city, '') = '' AND location IS NOT NULL$q$;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'type'
  ) THEN
    EXECUTE $q$UPDATE jobs SET employment_type = type WHERE employment_type IS NULL AND type IS NOT NULL$q$;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'description'
  ) THEN
    EXECUTE $q$UPDATE jobs SET overview = description WHERE coalesce(overview, '') = '' AND description IS NOT NULL$q$;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'created_at'
  ) THEN
    EXECUTE $q$UPDATE jobs SET posted_on = created_at::date WHERE posted_on IS NULL$q$;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'title'
  ) THEN
    EXECUTE $q$UPDATE jobs SET slug = trim(both '-' from lower(regexp_replace(coalesce(title, 'job'), '[^a-zA-Z0-9]+', '-', 'g'))) || '-' || substr(id::text, 1, 8) WHERE coalesce(slug, '') = ''$q$;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'category'
  ) THEN
    EXECUTE $q$UPDATE jobs SET category_slug = lower(regexp_replace(coalesce(category, 'other'), '[^a-zA-Z0-9]+', '-', 'g')) WHERE coalesce(category_slug, '') = ''$q$;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'status'
  ) THEN
    EXECUTE $q$UPDATE jobs SET indexable = true WHERE indexable IS NULL AND status IN ('active', 'published')$q$;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'created_at'
  ) THEN
    EXECUTE $q$UPDATE blog_posts SET published_on = created_at::date WHERE published_on IS NULL$q$;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'indexable'
  ) THEN
    EXECUTE 'create index if not exists idx_jobs_public on jobs (status, indexable, posted_on desc)';
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'category_slug'
  ) THEN
    EXECUTE 'create index if not exists idx_jobs_category on jobs (category_slug)';
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'jobs' AND column_name = 'location_city'
  ) THEN
    EXECUTE 'create index if not exists idx_jobs_city on jobs (location_city)';
  END IF;
END $$;

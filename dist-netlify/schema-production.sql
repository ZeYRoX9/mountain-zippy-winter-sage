-- HiredFrex production extras (safe to re-run on Neon)
-- Adds author photo / article photo fields used by the editorial studio.

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

-- Editorial desk, email verification codes, and AdSense-safe index flags.

alter table profiles add column if not exists email_verified boolean not null default false;

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

alter table blog_posts add column if not exists created_by_user_id text;
alter table blog_posts add column if not exists sources text not null default '';

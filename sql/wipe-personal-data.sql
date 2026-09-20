-- Run this in the Neon SQL Editor on hiredfrex.com when you want to erase
-- stored CVs and other personal application files.
-- This does NOT delete published jobs or blog articles.

-- CVs uploaded with applications
update applications
set cv_text = '',
    cv_data = null,
    cv_filename = null
where cv_text is distinct from ''
   or cv_data is not null
   or cv_filename is not null;

-- Seeker profile CVs / avatars (production users table)
update users
set avatar_data = null,
    avatar_mime = null
where avatar_data is not null;

-- TanStack / Grok preview profiles (safe if the table exists)
do $$
begin
  if exists (select 1 from information_schema.tables where table_name = 'profiles') then
    update profiles set cv_json = '{}';
  end if;
end $$;

-- One-time OTP codes
do $$
begin
  if exists (select 1 from information_schema.tables where table_name = 'email_otps') then
    delete from email_otps;
  end if;
end $$;

-- HiredFrex — wipe stored CVs and related personal files
-- Run in the Neon SQL Editor on hiredfrex.com.
-- This does NOT delete published jobs, blog articles, or employer listings.

BEGIN;

-- CVs uploaded with job applications (production + preview schemas)
UPDATE applications
SET cv_text = '',
    cv_filename = NULL
WHERE cv_text IS DISTINCT FROM ''
   OR cv_filename IS NOT NULL;

-- Binary / base64 CV payloads if the production column exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'cv_data'
  ) THEN
    EXECUTE 'UPDATE applications SET cv_data = NULL WHERE cv_data IS NOT NULL';
  END IF;
END $$;

-- Seeker profile CVs in the TanStack / Grok schema
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'cv_json'
  ) THEN
    UPDATE profiles SET cv_json = '{}';
  END IF;
END $$;

-- Avatars (optional personal images)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'avatar_data'
  ) THEN
    UPDATE users SET avatar_data = NULL, avatar_mime = NULL WHERE avatar_data IS NOT NULL;
  END IF;
END $$;

-- One-time email codes
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'email_otps') THEN
    DELETE FROM email_otps;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'verification_code'
  ) THEN
    UPDATE users
    SET verification_code = NULL,
        code_expires = NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'reset_code'
  ) THEN
    UPDATE users
    SET reset_code = NULL,
        reset_expires = NULL;
  END IF;
END $$;

COMMIT;

-- Optional full application reset (uncomment if you also want empty applicant lists):
-- DELETE FROM applications;

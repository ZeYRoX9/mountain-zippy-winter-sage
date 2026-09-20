HiredFrex — Netlify drag-and-drop (build 2026.09.19-b)

1. Zip THIS folder (or use the zip we gave you). Drag the zip into Netlify → Deploys.
2. Site configuration → Environment variables:
   DATABASE_URL     Neon pooled connection string
   JWT_SECRET       long random string
   ADMIN_TOKEN      password for /admin.html
   RESEND_API_KEY   from resend.com (your Hostinger DNS is already on the domain)
   EMAIL_FROM       HiredFrex <support@hiredfrex.com>
   OWNER_EMAIL      support@hiredfrex.com
3. In Neon, run schema.sql from the original site if tables are missing, then sql/schema-production.sql
   (adds author_photo, cover_url, email_otps).
4. To erase stored CVs only, run sql/wipe-cvs.sql in Neon. It does not delete jobs or articles.
5. Confirm footer says build 2026.09.19
6. Submit https://hiredfrex.com/sitemap.xml in Search Console, then reapply to AdSense.

Resend: from address must be on the domain you verified in Resend (support@hiredfrex.com).

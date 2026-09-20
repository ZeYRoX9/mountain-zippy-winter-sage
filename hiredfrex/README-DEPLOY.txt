HiredFrex — daily career publication + job portal
Build: 2026.09.20

TWO EXPERIENCES
1) Publication  https://hiredfrex.com
   Daily career / salary / interview / CV information.
   Desks: /career /uae-jobs /salaries /interviews /guides /research
   Articles from the admin Blog tab.

2) Job portal   https://hiredfrex.com/jobs
   Search, filters, job details, apply, saved jobs,
   candidate accounts, employer accounts, CV Builder.
   Unchanged from the original portal.

NAV
JOBS is the first control after the logo (white pill on navy).
Career, UAE Jobs, Salaries, Interviews, Guides, Latest follow.
Right: Sign in · Post a job.
Homepage right rail: Seeking a job | Hiring.

ADMIN
Unchanged: https://hiredfrex.com/admin.html
Overview, Employers, Jobs, Applications, Users, Blog,
Messages, API Keys. Blog still has author, photo, role, bio,
reviewer, sources, methodology.

HOMEPAGE
- Featured article from /api/blog
- Open-on-HiredFrex jobs strip from /api/jobs (reviewed only)
- Topic pills, article feed, labeled ad slots
- Research table counted only from live active jobs
- No invented salaries or national statistics

DEPLOY
Netlify → Deploys → drag this zip (the file, not a folder).
Publish directory stays "."
Keep existing env vars (DATABASE_URL, ADMIN_TOKEN, JWT_SECRET, …).

Footer stamp: build 2026.09.20
We do not promise AdSense approval.

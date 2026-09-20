import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import {
  getMyProfile,
  saveMyProfile,
  listMyApplications,
  listSavedJobs,
  listEmployerJobs,
  listEmployerApplications,
  postEmployerJob,
  setApplicationStatus,
  closeEmployerJob,
} from "@/lib/server/account";
import { CATEGORIES, EMPLOYMENT_TYPES, WORKPLACE_TYPES, EXPERIENCE_LEVELS } from "@/lib/site";

export const Route = createFileRoute("/account")({
  head: () =>
    pageHead({
      title: "Dashboard",
      description: "Your HiredFrex applications, saved jobs, and employer tools.",
      path: "/account",
      index: false,
    }),
  component: AccountPage,
});

function AccountPage() {
  const { user, isPending } = useCurrentUserState();
  const [tab, setTab] = useState<"seeker" | "employer" | "settings">("seeker");
  const [profile, setProfile] = useState<Awaited<ReturnType<typeof getMyProfile>> | null>(null);
  const [apps, setApps] = useState<Awaited<ReturnType<typeof listMyApplications>>>([]);
  const [saved, setSaved] = useState<Awaited<ReturnType<typeof listSavedJobs>>>([]);
  const [ejobs, setEjobs] = useState<Awaited<ReturnType<typeof listEmployerJobs>>>([]);
  const [eapps, setEapps] = useState<Awaited<ReturnType<typeof listEmployerApplications>>>([]);
  const [note, setNote] = useState<string | null>(null);

  async function refresh() {
    const p = await getMyProfile();
    setProfile(p);
    const [a, s] = await Promise.all([listMyApplications(), listSavedJobs()]);
    setApps(a);
    setSaved(s);
    if (p.role === "employer" || p.role === "admin") {
      setEjobs(await listEmployerJobs());
      setEapps(await listEmployerApplications());
    }
  }

  if (isPending) {
    return (
      <Page>
        <div className="h-32 animate-pulse rounded-2xl bg-line" />
      </Page>
    );
  }
  if (!user) return <RedirectToSignIn />;

  if (!profile) {
    void refresh();
    return (
      <Page>
        <div className="h-32 animate-pulse rounded-2xl bg-line" />
      </Page>
    );
  }

  return (
    <Page>
      <Eyebrow>Private · noindex</Eyebrow>
      <h1 className="mt-2 font-display text-4xl">Hello {profile.displayName || user.displayName || ""}</h1>
      <p className="mt-2 text-sm text-muted">
        Role: {profile.role}. Dashboards are not indexed.{" "}
        <Link to="/studio" className="font-semibold text-navy">
          Editorial studio
        </Link>
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["seeker", "employer", "settings"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === t ? "bg-navy text-white" : "border border-line bg-surface"}`}
          >
            {t === "seeker" ? "Applications" : t === "employer" ? "Employer" : "Account"}
          </button>
        ))}
      </div>

      {tab === "seeker" ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-[22px] border border-line bg-surface p-5">
            <h2 className="font-display text-2xl">Applications</h2>
            <ul className="mt-3 space-y-3 text-sm">
              {apps.length ? apps.map((a) => (
                <li key={a.id} className="border-t border-line pt-3">
                  <Link to="/jobs/$slug" params={{ slug: a.slug }} className="font-semibold text-navy">
                    {a.title}
                  </Link>
                  <div className="text-muted">{a.company_name} · {a.status}</div>
                </li>
              )) : <li className="text-muted">No applications yet.</li>}
            </ul>
          </section>
          <section className="rounded-[22px] border border-line bg-surface p-5">
            <h2 className="font-display text-2xl">Saved jobs</h2>
            <ul className="mt-3 space-y-3 text-sm">
              {saved.length ? saved.map((s) => (
                <li key={s.slug}>
                  <Link to="/jobs/$slug" params={{ slug: s.slug }} className="font-semibold text-navy">
                    {s.title}
                  </Link>
                  <div className="text-muted">{s.company_name}</div>
                </li>
              )) : <li className="text-muted">None saved.</li>}
            </ul>
            <Link to="/cv-builder" className="mt-4 inline-block text-sm font-bold text-gold-deep">
              Open CV builder
            </Link>
          </section>
        </div>
      ) : null}

      {tab === "employer" ? (
        <EmployerPanel
          profile={profile}
          jobs={ejobs}
          apps={eapps}
          onPosted={async () => {
            await refresh();
            setNote("Listing submitted. Completeness checks ran automatically.");
          }}
          onRefresh={refresh}
        />
      ) : null}

      {tab === "settings" ? (
        <form
          className="mt-8 grid max-w-lg gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            await saveMyProfile({
              data: {
                role: String(fd.get("role")) === "employer" ? "employer" : "seeker",
                displayName: String(fd.get("displayName") || ""),
                phone: String(fd.get("phone") || ""),
                headline: String(fd.get("headline") || ""),
                location: String(fd.get("location") || ""),
                skills: String(fd.get("skills") || ""),
                companyName: String(fd.get("companyName") || ""),
              },
            });
            setNote("Saved.");
            await refresh();
          }}
        >
          <label className="text-sm font-semibold">I am
            <select name="role" defaultValue={profile.role} className="mt-1 h-11 w-full rounded-xl border border-line bg-surface px-3">
              <option value="seeker">A job seeker</option>
              <option value="employer">Hiring</option>
            </select>
          </label>
          <input name="displayName" defaultValue={profile.displayName ?? ""} placeholder="Name" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <input name="phone" defaultValue={profile.phone ?? ""} placeholder="Phone" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <input name="headline" defaultValue={profile.headline ?? ""} placeholder="Headline" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <input name="location" defaultValue={profile.location ?? ""} placeholder="City" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <input name="skills" defaultValue={profile.skills ?? ""} placeholder="Skills" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <input name="companyName" defaultValue={profile.companyName ?? ""} placeholder="Company name (employers)" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <button className="h-11 rounded-xl bg-navy text-sm font-bold text-white">Save</button>
        </form>
      ) : null}
      {note ? <p className="mt-4 text-sm font-semibold text-ok">{note}</p> : null}
    </Page>
  );
}

function EmployerPanel({
  profile,
  jobs,
  apps,
  onPosted,
  onRefresh,
}: {
  profile: NonNullable<Awaited<ReturnType<typeof getMyProfile>>>;
  jobs: Awaited<ReturnType<typeof listEmployerJobs>>;
  apps: Awaited<ReturnType<typeof listEmployerApplications>>;
  onPosted: () => void;
  onRefresh: () => void;
}) {
  const [err, setErr] = useState<string | null>(null);
  if (!profile.companyName) {
    return (
      <p className="mt-8 text-muted">
        Add a company name under Account before posting. Identity will still be labelled unverified.
      </p>
    );
  }
  return (
    <div className="mt-8 grid gap-8">
      <section className="rounded-[22px] border border-line bg-surface p-5">
        <h2 className="font-display text-2xl">Post a listing</h2>
        <p className="mt-1 text-sm text-muted">
          Blocking checks: placeholder copy, missing overview, remote + physical titles, application-fee language.
        </p>
        <form
          className="mt-4 grid gap-3 md:grid-cols-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const split = (k: string) =>
              String(fd.get(k) || "")
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean);
            const res = await postEmployerJob({
              data: {
                title: String(fd.get("title") || ""),
                locationCity: String(fd.get("city") || ""),
                locationCountry: String(fd.get("country") || "United Arab Emirates"),
                employmentType: String(fd.get("type") || "Full-time"),
                workplaceType: String(fd.get("workplace") || "On-site"),
                category: String(fd.get("category") || "Administrative"),
                salaryDisplay: String(fd.get("salary") || "") || undefined,
                overview: String(fd.get("overview") || ""),
                responsibilities: split("responsibilities"),
                essentialRequirements: split("requirements"),
                skills: split("skills"),
                benefits: split("benefits"),
                sourceUrl: String(fd.get("source") || "") || undefined,
              },
            });
            if (!res.ok) setErr(res.error);
            else {
              setErr(null);
              (e.target as HTMLFormElement).reset();
              onPosted();
            }
          }}
        >
          <input name="title" required placeholder="Job title" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm" />
          <input name="city" required placeholder="City" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm" />
          <input name="country" placeholder="Country" defaultValue="United Arab Emirates" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm" />
          <select name="category" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm">
            {CATEGORIES.map((c) => (
              <option key={c.slug}>{c.name}</option>
            ))}
          </select>
          <select name="type" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm">
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select name="workplace" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm">
            {WORKPLACE_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <input name="salary" placeholder="Salary as advertised (or leave blank)" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm md:col-span-2" />
          <textarea name="overview" required rows={4} placeholder="Overview (min ~80 characters, no filler)" className="rounded-xl border border-line bg-paper px-3 py-2 text-sm md:col-span-2" />
          <textarea name="responsibilities" rows={4} placeholder="Responsibilities, one per line (3+ to be indexed)" className="rounded-xl border border-line bg-paper px-3 py-2 text-sm" />
          <textarea name="requirements" rows={4} placeholder="Essential requirements, one per line" className="rounded-xl border border-line bg-paper px-3 py-2 text-sm" />
          <textarea name="skills" rows={3} placeholder="Skills, one per line" className="rounded-xl border border-line bg-paper px-3 py-2 text-sm" />
          <textarea name="benefits" rows={3} placeholder="Benefits only if true, one per line" className="rounded-xl border border-line bg-paper px-3 py-2 text-sm" />
          <input name="source" placeholder="Public vacancy URL (optional)" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm md:col-span-2" />
          <button className="h-11 rounded-xl bg-navy text-sm font-bold text-white md:col-span-2">Submit for review</button>
          {err ? <p className="text-sm text-danger md:col-span-2">{err}</p> : null}
        </form>
      </section>
      <section className="rounded-[22px] border border-line bg-surface p-5">
        <h2 className="font-display text-2xl">Your listings</h2>
        <ul className="mt-3 space-y-3 text-sm">
          {jobs.map((j) => (
            <li key={j.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
              <div>
                <div className="font-semibold">{j.title}</div>
                <div className="text-muted">
                  {j.status} · {j.verification_status} · {j.applicants ?? 0} applicants · {j.views} views
                  {j.indexable ? "" : " · noindex (thin)"}
                </div>
              </div>
              <button
                className="rounded-lg border border-line px-3 py-1.5 text-xs font-bold"
                onClick={async () => {
                  await closeEmployerJob({ data: { id: j.id } });
                  onRefresh();
                }}
              >
                Close
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-[22px] border border-line bg-surface p-5">
        <h2 className="font-display text-2xl">Applicants</h2>
        <ul className="mt-3 space-y-4 text-sm">
          {apps.map((a) => (
            <li key={a.id} className="border-t border-line pt-3">
              <div className="font-semibold">{a.name} → {a.title}</div>
              <div className="text-muted">{a.email} · {a.status}</div>
              {a.cover_note ? <p className="mt-1">{a.cover_note}</p> : null}
              <div className="mt-2 flex gap-2">
                {["reviewed", "shortlisted", "rejected"].map((st) => (
                  <button
                    key={st}
                    className="rounded-lg border border-line px-2 py-1 text-xs font-bold"
                    onClick={async () => {
                      await setApplicationStatus({ data: { id: a.id, status: st } });
                      onRefresh();
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <p className="text-xs text-faint">Experience levels we accept: {EXPERIENCE_LEVELS.join(", ")}.</p>
    </div>
  );
}

import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { generateCvAssist } from "@/lib/server/public-actions";

type Exp = { title: string; employer: string; city: string; dates: string; bullets: string };
type Edu = { school: string; credential: string; year: string };

export const Route = createFileRoute("/cv-builder")({
  head: () =>
    pageHead({
      title: "CV builder",
      description: "ATS-plain HiredFrex CV builder. Optional writing help that cannot invent jobs you did not do.",
      path: "/cv-builder",
    }),
  component: CvBuilder,
});

function CvBuilder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [nationality, setNationality] = useState("");
  const [visa, setVisa] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [languages, setLanguages] = useState("");
  const [certs, setCerts] = useState("");
  const [target, setTarget] = useState("");
  const [exps, setExps] = useState<Exp[]>([{ title: "", employer: "", city: "", dates: "", bullets: "" }]);
  const [edus, setEdus] = useState<Edu[]>([{ school: "", credential: "", year: "" }]);
  const [assist, setAssist] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const text = useMemo(() => {
    const lines = [
      name,
      [email, phone, city].filter(Boolean).join(" · "),
      [nationality, visa].filter(Boolean).join(" · "),
      "",
      headline,
      summary,
      "",
      "Experience",
      ...exps.flatMap((e) => [
        `${e.title} — ${e.employer} — ${e.city} — ${e.dates}`,
        ...e.bullets.split("\n").filter(Boolean).map((b) => `• ${b}`),
        "",
      ]),
      "Education",
      ...edus.map((e) => `${e.credential} — ${e.school} — ${e.year}`),
      "",
      skills && `Skills: ${skills}`,
      languages && `Languages: ${languages}`,
      certs && `Certificates: ${certs}`,
    ];
    return lines.filter((l) => l !== undefined).join("\n");
  }, [name, email, phone, city, nationality, visa, headline, summary, exps, edus, skills, languages, certs]);

  return (
    <Page>
      <Eyebrow>Tools</Eyebrow>
      <h1 className="mt-2 font-display text-4xl">CV builder</h1>
      <p className="mt-3 max-w-2xl text-muted">
        One-column, ATS-plain layout. Fill only facts you can defend. The optional assistant restates
        what you typed — it is instructed not to invent employers or dates.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
          <input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target job title (for the assistant)" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          </div>
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Current city" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <input value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="Nationality (optional)" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <input value={visa} onChange={(e) => setVisa(e.target.value)} placeholder="Visa / work authorisation in one line" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Headline" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" />
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} placeholder="Professional summary" className="rounded-xl border border-line bg-surface px-3 py-2 text-sm" />
          {exps.map((exp, i) => (
            <div key={i} className="grid gap-2 rounded-2xl border border-line p-3">
              <div className="text-xs font-bold uppercase tracking-wider text-faint">Experience {i + 1}</div>
              <input value={exp.title} onChange={(e) => setExps(patch(exps, i, { title: e.target.value }))} placeholder="Job title" className="h-10 rounded-lg border border-line bg-paper px-3 text-sm" />
              <input value={exp.employer} onChange={(e) => setExps(patch(exps, i, { employer: e.target.value }))} placeholder="Employer" className="h-10 rounded-lg border border-line bg-paper px-3 text-sm" />
              <input value={exp.dates} onChange={(e) => setExps(patch(exps, i, { dates: e.target.value }))} placeholder="Dates, e.g. Mar 2023 – Present" className="h-10 rounded-lg border border-line bg-paper px-3 text-sm" />
              <textarea value={exp.bullets} onChange={(e) => setExps(patch(exps, i, { bullets: e.target.value }))} rows={3} placeholder="What you did, one line per bullet" className="rounded-lg border border-line bg-paper px-3 py-2 text-sm" />
            </div>
          ))}
          <button type="button" className="text-sm font-bold text-navy" onClick={() => setExps([...exps, { title: "", employer: "", city: "", dates: "", bullets: "" }])}>
            Add experience
          </button>
          {edus.map((edu, i) => (
            <div key={i} className="grid gap-2 rounded-2xl border border-line p-3">
              <div className="text-xs font-bold uppercase tracking-wider text-faint">Education {i + 1}</div>
              <input value={edu.school} onChange={(e) => setEdus(patch(edus, i, { school: e.target.value }))} placeholder="School" className="h-10 rounded-lg border border-line bg-paper px-3 text-sm" />
              <input value={edu.credential} onChange={(e) => setEdus(patch(edus, i, { credential: e.target.value }))} placeholder="Credential" className="h-10 rounded-lg border border-line bg-paper px-3 text-sm" />
              <input value={edu.year} onChange={(e) => setEdus(patch(edus, i, { year: e.target.value }))} placeholder="Year" className="h-10 rounded-lg border border-line bg-paper px-3 text-sm" />
            </div>
          ))}
          <textarea value={skills} onChange={(e) => setSkills(e.target.value)} rows={2} placeholder="Skills (comma separated)" className="rounded-xl border border-line bg-surface px-3 py-2 text-sm" />
          <textarea value={languages} onChange={(e) => setLanguages(e.target.value)} rows={2} placeholder="Languages" className="rounded-xl border border-line bg-surface px-3 py-2 text-sm" />
          <textarea value={certs} onChange={(e) => setCerts(e.target.value)} rows={2} placeholder="Certificates" className="rounded-xl border border-line bg-surface px-3 py-2 text-sm" />
          <button
            type="button"
            disabled={busy}
            className="h-11 rounded-xl border border-line text-sm font-bold"
            onClick={async () => {
              setBusy(true);
              const res = await generateCvAssist({
                data: {
                  name,
                  headline,
                  experience: exps.map((e) => `${e.title} ${e.employer} ${e.dates} ${e.bullets}`).join("\n"),
                  education: edus.map((e) => `${e.credential} ${e.school}`).join("\n"),
                  skills,
                  targetRole: target,
                },
              });
              setAssist(res.ok ? res.text : res.error);
              if (res.ok) setSummary(res.text);
              setBusy(false);
            }}
          >
            {busy ? "Drafting…" : "Optional: rewrite summary from my facts"}
          </button>
          {assist && !assist.startsWith("The writing") ? null : assist ? (
            <p className="text-sm text-warn">{assist}</p>
          ) : null}
        </form>
        <div>
          <div id="cv-preview" className="rounded-[22px] border border-line bg-white p-8 shadow-sm">
            <h2 className="font-display text-3xl">{name || "Your name"}</h2>
            <p className="mt-1 text-sm text-muted">{[email, phone, city].filter(Boolean).join(" · ")}</p>
            <p className="text-sm text-muted">{[nationality, visa].filter(Boolean).join(" · ")}</p>
            {headline ? <p className="mt-4 font-semibold">{headline}</p> : null}
            {summary ? <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{summary}</p> : null}
            <h3 className="mt-6 text-xs font-bold uppercase tracking-wider text-gold-deep">Experience</h3>
            {exps.map((e, i) => (
              <div key={i} className="mt-3">
                <div className="font-semibold">{e.title} — {e.employer}</div>
                <div className="text-xs text-faint">{e.dates} {e.city}</div>
                <ul className="mt-1 list-disc pl-4 text-sm">
                  {e.bullets.split("\n").filter(Boolean).map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
            <h3 className="mt-6 text-xs font-bold uppercase tracking-wider text-gold-deep">Education</h3>
            {edus.map((e, i) => (
              <p key={i} className="mt-1 text-sm">{e.credential} — {e.school} ({e.year})</p>
            ))}
            {skills ? <p className="mt-4 text-sm"><strong>Skills:</strong> {skills}</p> : null}
            {languages ? <p className="text-sm"><strong>Languages:</strong> {languages}</p> : null}
            {certs ? <p className="text-sm"><strong>Certificates:</strong> {certs}</p> : null}
          </div>
          <div className="mt-3 flex gap-2">
            <button className="h-11 rounded-xl bg-navy px-4 text-sm font-bold text-white" onClick={() => window.print()}>
              Print / save PDF
            </button>
            <button
              className="h-11 rounded-xl border border-line px-4 text-sm font-bold"
              onClick={() => navigator.clipboard.writeText(text)}
            >
              Copy text
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}

function patch<T>(arr: T[], i: number, part: Partial<T>): T[] {
  return arr.map((row, idx) => (idx === i ? { ...row, ...part } : row));
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { getMarketReport } from "@/lib/server/market";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/market-report")({
  head: () =>
    pageHead({
      title: "HiredFrex job market report — September 2026",
      description:
        "Metrics computed from public HiredFrex listings: sample size, advertised AED monthly pay, categories, and workplace type.",
      path: "/market-report",
    }),
  loader: () => getMarketReport(),
  component: function Market() {
    const r = Route.useLoaderData();
    return (
      <Page>
        <Eyebrow>Original data</Eyebrow>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">HiredFrex job market report — September 2026</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Every figure on this page is counted from public rows in the HiredFrex database on{" "}
          {r.generatedOn}. This is not a national labour-force survey.
        </p>
        <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat k="Public listings" v={r.sampleSize} />
          <Stat k="Listings with any salary" v={r.withSalary} />
          <Stat k="AED monthly sample" v={r.aedMonthlySample} />
          <Stat k="AED monthly median" v={r.aedMonthlyMedian != null ? `AED ${Math.round(r.aedMonthlyMedian)}` : "n/a"} />
        </dl>
        <div className="prose-hf mt-8">
          <h2>Methodology</h2>
          <ul>
            <li>Source: public jobs with status published and indexable = true.</li>
            <li>Pay stats use only rows with currency AED and period month, taking the midpoint of min/max when both exist.</li>
            <li>Skills are the tags stored on each listing, not a scraped universe of all UAE jobs.</li>
            <li>Unpublished major-brand vacancies are excluded on purpose.</li>
          </ul>
          <h2>Limitations</h2>
          <p>
            The sample is small ({r.sampleSize} listings). Most employers are not independently
            confirmed. Advertised pay is not received pay. Do not use these numbers in a visa file
            or as “the UAE average.”
          </p>
          {r.aedMonthlyMin != null ? (
            <p>
              Advertised AED monthly range in this sample: AED {r.aedMonthlyMin} – AED {r.aedMonthlyMax}.
              Mean of midpoints: {r.aedMonthlyMean != null ? `AED ${r.aedMonthlyMean}` : "n/a"}.
            </p>
          ) : null}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Table title="Categories" rows={r.categories} />
          <Table title="Cities" rows={r.cities} />
          <Table title="Workplace type" rows={r.workplaceTypes} />
          <Table title="Experience as labelled" rows={r.experience} />
          <Table title="Verification status" rows={r.verification} />
          <Table title="Skills tagged" rows={r.skills} />
        </div>
        <p className="mt-8 text-sm text-muted">
          Browse the underlying [jobs](/jobs) or read [how we verify](/how-we-verify).
        </p>
        <p className="mt-2">
          <Link to="/jobs" className="font-bold text-gold-deep">Open the job directory</Link>
        </p>
      </Page>
    );
  },
});

function Stat({ k, v }: { k: string; v: string | number }) {
  return (
    <div className="rounded-[18px] border border-line bg-surface p-4">
      <div className="text-[11px] font-bold uppercase tracking-wider text-faint">{k}</div>
      <div className="mt-1 font-display text-3xl tabular-nums text-navy">{v}</div>
    </div>
  );
}
function Table({ title, rows }: { title: string; rows: { name: string; count: number }[] }) {
  return (
    <div className="rounded-[22px] border border-line bg-surface p-5">
      <h2 className="font-display text-2xl">{title}</h2>
      <table className="mt-3 w-full text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-line">
              <td className="py-2">{row.name}</td>
              <td className="py-2 text-right tabular-nums font-semibold">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

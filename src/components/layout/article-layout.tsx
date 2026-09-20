import type { JobListItem } from "@/lib/data/types";
import { JobsRail } from "@/components/jobs/jobs-rail";

export function ArticleLayout({
  children,
  jobs,
}: {
  children: React.ReactNode;
  jobs: JobListItem[];
}) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
      <article className="min-w-0">{children}</article>
      <JobsRail jobs={jobs} />
    </div>
  );
}

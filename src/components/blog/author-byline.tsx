import { formatDate } from "@/lib/utils";
import { authorByName } from "@/lib/authors";
import { Link } from "@tanstack/react-router";

export function AuthorByline({
  author,
  photo,
  publishedOn,
  updatedOn,
  minutes,
}: {
  author: string;
  photo?: string | null;
  publishedOn: string;
  updatedOn?: string;
  minutes?: number;
}) {
  const staff = authorByName(author);
  const src = photo || staff?.photo || "/logo-mark.png";
  return (
    <div className="mt-6 flex items-start gap-3 border-y border-line py-4">
      <img src={src} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
      <div>
        {staff ? (
          <Link to="/authors/$id" params={{ id: staff.id }} className="text-sm font-bold text-navy underline-offset-2 hover:underline">
            {author}
          </Link>
        ) : (
          <div className="text-sm font-bold text-navy">{author}</div>
        )}
        {staff?.title ? <div className="text-sm text-muted">{staff.title}</div> : null}
        <div className="mt-1 text-xs text-faint">
          {formatDate(publishedOn)}
          {updatedOn && updatedOn !== publishedOn ? ` · Updated ${formatDate(updatedOn)}` : ""}
          {minutes ? ` · ${minutes} min read` : ""}
        </div>
        {staff?.bio ? <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{staff.bio}</p> : null}
      </div>
    </div>
  );
}

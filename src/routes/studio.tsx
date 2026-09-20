import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/layout/site-shell";
import { pageHead } from "@/lib/seo";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { claimEditor, getStudioAccess, listStudioPosts, saveStudioPost } from "@/lib/server/studio";
import { PUBLISHING_PLAN, STAFF_AUTHORS } from "@/lib/authors";

export const Route = createFileRoute("/studio")({
  head: () =>
    pageHead({
      title: "Editorial studio",
      description: "Private writing desk for HiredFrex articles.",
      path: "/studio",
      index: false,
    }),
  component: StudioPage,
});

const emptyForm = {
  id: "",
  title: "",
  excerpt: "",
  body: "",
  category: "Career advice",
  author: STAFF_AUTHORS[0].name,
  authorPhoto: STAFF_AUTHORS[0].photo,
  coverUrl: "",
  published: false,
};

function readImage(file: File, max = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")?.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => reject(new Error("Could not read that image."));
    img.src = URL.createObjectURL(file);
  });
}

function StudioPage() {
  const { user, isPending } = useCurrentUserState();
  const [access, setAccess] = useState<Awaited<ReturnType<typeof getStudioAccess>> | null>(null);
  const [posts, setPosts] = useState<Awaited<ReturnType<typeof listStudioPosts>>>([]);
  const [note, setNote] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const words = form.body.trim() ? form.body.trim().split(/\s+/).length : 0;

  async function refresh() {
    const a = await getStudioAccess();
    setAccess(a);
    if (a.isEditor) setPosts(await listStudioPosts());
  }

  useEffect(() => {
    if (user) void refresh();
  }, [user]);

  if (isPending || !access) {
    return (
      <Page>
        <div className="h-32 animate-pulse rounded-2xl bg-line" />
      </Page>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const liveSlugs = new Set(posts.filter((p) => p.published).map((p) => p.slug));

  return (
    <Page>
      <Eyebrow>Private · noindex</Eyebrow>
      <h1 className="mt-2 font-display text-4xl">Editorial studio</h1>
      <p className="mt-2 max-w-2xl font-serif text-muted">
        One substantial article a day, with a named author and a photo. Do not invent salaries or
        employers. Google does not publish a post-count rule; thin daily stubs will not help.
      </p>

      {!access.isEditor ? (
        <div className="mt-8 rounded-[22px] border border-line bg-surface p-6">
          <p className="text-sm text-muted">This desk is limited to the site editor.</p>
          {access.canClaim ? (
            <button
              className="mt-4 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-paper"
              onClick={async () => {
                const res = await claimEditor();
                setNote(res.ok ? "You are now the editor." : res.error);
                await refresh();
              }}
            >
              Claim editor access (first account only)
            </button>
          ) : null}
          {note ? <p className="mt-3 text-sm">{note}</p> : null}
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
          <form
            className="grid gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await saveStudioPost({
                data: {
                  id: form.id || undefined,
                  title: form.title,
                  excerpt: form.excerpt,
                  body: form.body,
                  category: form.category,
                  author: form.author,
                  authorPhoto: form.authorPhoto,
                  coverUrl: form.coverUrl,
                  published: form.published,
                },
              });
              setNote(res.ok ? `Saved. Public URL: /blog/${res.slug}` : res.error);
              if (res.ok) {
                setForm(emptyForm);
                await refresh();
              }
            }}
          >
            <input
              className="h-11 rounded-xl border border-line bg-surface px-3 text-sm"
              placeholder="Headline"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              className="h-11 rounded-xl border border-line bg-surface px-3 text-sm"
              placeholder="Standfirst (at least two sentences)"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="h-11 rounded-xl border border-line bg-surface px-3 text-sm"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <select
                className="h-11 rounded-xl border border-line bg-surface px-3 text-sm"
                value={STAFF_AUTHORS.some((a) => a.name === form.author) ? form.author : "__custom"}
                onChange={(e) => {
                  if (e.target.value === "__custom") {
                    setForm({ ...form, author: "", authorPhoto: form.authorPhoto });
                    return;
                  }
                  const a = STAFF_AUTHORS.find((s) => s.name === e.target.value);
                  setForm({
                    ...form,
                    author: e.target.value,
                    authorPhoto: a?.photo || form.authorPhoto,
                  });
                }}
              >
                {STAFF_AUTHORS.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name} — {a.title}
                  </option>
                ))}
                <option value="__custom">Custom author name…</option>
              </select>
            </div>
            {!STAFF_AUTHORS.some((a) => a.name === form.author) ? (
              <input
                className="h-11 rounded-xl border border-line bg-surface px-3 text-sm"
                placeholder="Author name"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            ) : null}
            <label className="text-sm font-semibold">Author photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setForm({ ...form, authorPhoto: await readImage(file, 320) });
              }}
            />
            {form.authorPhoto ? (
              <img src={form.authorPhoto} alt="" className="h-16 w-16 rounded-full object-cover" />
            ) : null}
            <label className="text-sm font-semibold">Article photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setForm({ ...form, coverUrl: await readImage(file, 1400) });
              }}
            />
            {form.coverUrl ? <img src={form.coverUrl} alt="" className="max-h-40 rounded-xl object-cover" /> : null}
            <textarea
              className="min-h-[360px] rounded-xl border border-line bg-surface p-3 font-mono text-sm"
              placeholder="Markdown body. Cite official sources. Aim for 800+ words."
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              required
            />
            <p className={`text-xs ${words < 800 ? "text-warn" : "text-ok"}`}>
              {words} words {words < 800 ? "(need 800 to publish a piece Google can evaluate)" : "— length looks solid"}
            </p>
            <label className="flex min-h-11 items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Publish (and index) this article
            </label>
            <button className="h-11 rounded-xl bg-navy text-sm font-bold text-paper">Save article</button>
            {note ? <p className="text-sm text-muted">{note}</p> : null}
          </form>
          <aside className="space-y-6">
            <div>
              <h2 className="font-display text-xl">12-day desk</h2>
              <p className="mt-1 text-xs text-muted">
                Substantial pieces only. 800 words is the floor.
              </p>
              <ol className="mt-3 space-y-2 text-sm">
                {PUBLISHING_PLAN.map((d) => {
                  const done = d.slug ? liveSlugs.has(d.slug) : false;
                  return (
                    <li key={d.slug} className="flex gap-2">
                      <span className={done ? "text-ok" : "text-faint"}>{done ? "Live" : `Day ${d.day}`}</span>
                      <span>{d.title}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div>
              <h2 className="font-display text-xl">Existing</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {posts.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className="text-left font-semibold text-navy"
                      onClick={() =>
                        setForm({
                          id: p.id,
                          title: p.title,
                          excerpt: p.excerpt,
                          body: p.body,
                          category: p.category,
                          author: p.author,
                          authorPhoto: p.authorPhoto,
                          coverUrl: p.coverUrl,
                          published: p.published,
                        })
                      }
                    >
                      {p.title}
                    </button>
                    <div className="text-xs text-faint">
                      {p.published ? "Live" : "Draft"} · {p.author} ·{" "}
                      <Link to="/blog/$slug" params={{ slug: p.slug }}>
                        view
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </Page>
  );
}

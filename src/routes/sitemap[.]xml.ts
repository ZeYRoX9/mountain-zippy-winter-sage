import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { allIndexableUrls } from "@/lib/server/jobs";
import { GUIDES } from "@/lib/content/guides";
import { STAFF_AUTHORS } from "@/lib/authors";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { jobs, posts } = await allIndexableUrls();
        const staticPaths = [
          "/",
          "/jobs",
          "/blog",
          "/guides",
          "/sitemap",
          "/how-we-verify",
          "/editorial-standards",
          "/market-report",
          "/about",
          "/contact",
          "/faq",
          "/privacy",
          "/terms",
          "/disclaimer",
          "/cookies",
          "/cv-builder",
          "/employers",
          "/report",
          "/authors",
        ];
        const urls = [
          ...staticPaths.map((p) => `${SITE_URL}${p}`),
          ...GUIDES.map((g) => `${SITE_URL}/guides/${g.slug}`),
          ...STAFF_AUTHORS.map((a) => `${SITE_URL}/authors/${a.id}`),
          ...jobs.map((j) => `${SITE_URL}/jobs/${j.slug}`),
          ...posts.map((p) => `${SITE_URL}/blog/${p.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url><loc>${u}</loc></url>`,
  )
  .join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});

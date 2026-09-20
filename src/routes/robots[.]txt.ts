import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";

const BODY = `User-agent: *
Allow: /
Disallow: /account
Disallow: /login
Disallow: /studio
Disallow: /verify-email
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(BODY, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});

import { ADSENSE_PUB, SITE_NAME, SITE_URL } from "./site";

export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  type?: string;
}) {
  const title = opts.title.includes(SITE_NAME) ? opts.title : `${opts.title} — ${SITE_NAME}`;
  const url = `${SITE_URL}${opts.path}`;
  const robots = opts.index === false ? "noindex,follow" : "index,follow";
  return {
    meta: [
      { title },
      { name: "description", content: opts.description },
      { name: "robots", content: robots },
      { name: "theme-color", content: "#10243f" },
      { name: "google-adsense-account", content: ADSENSE_PUB },
      { name: "author", content: SITE_NAME },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data);
}

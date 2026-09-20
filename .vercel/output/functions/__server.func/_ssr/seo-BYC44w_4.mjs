import { a as SITE_NAME, o as SITE_URL, t as ADSENSE_PUB } from "./site-D_EzqXMW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo-BYC44w_4.js
function pageHead(opts) {
	const title = opts.title.includes("HiredFrex") ? opts.title : `${opts.title} — ${SITE_NAME}`;
	const url = `${SITE_URL}${opts.path}`;
	const robots = opts.index === false ? "noindex,follow" : "index,follow";
	return {
		meta: [
			{ title },
			{
				name: "description",
				content: opts.description
			},
			{
				name: "robots",
				content: robots
			},
			{
				name: "theme-color",
				content: "#10243f"
			},
			{
				name: "google-adsense-account",
				content: ADSENSE_PUB
			},
			{
				name: "author",
				content: SITE_NAME
			}
		],
		links: [{
			rel: "canonical",
			href: url
		}]
	};
}
function jsonLd(data) {
	return JSON.stringify(data);
}
//#endregion
export { pageHead as n, jsonLd as t };

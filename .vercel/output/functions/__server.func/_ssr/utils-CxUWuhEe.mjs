//#region node_modules/.nitro/vite/services/ssr/assets/utils-CxUWuhEe.js
function uid(prefix = "id") {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return `${prefix}_${crypto.randomUUID()}`;
	return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}
function formatDate(iso) {
	if (!iso) return "Not provided";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function parseJsonArray(value) {
	if (!value) return [];
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [];
	} catch {
		return [];
	}
}
function slugify(input) {
	return input.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}
//#endregion
export { uid as i, parseJsonArray as n, slugify as r, formatDate as t };

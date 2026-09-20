import { i as uid } from "./utils-CxUWuhEe.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-CED-7ZIa.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as ensureSeed } from "./seed-FMl3N7gH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-actions-uTVJV3sl.js
var submitContact_createServerFn_handler = createServerRpc({
	id: "58b88a92a667a409679f572e5fc9099aa232c0b716ac67849eaf754d9077517b",
	name: "submitContact",
	filename: "src/lib/server/public-actions.ts"
}, (opts) => submitContact.__executeServer(opts));
var submitContact = createServerFn({ method: "POST" }).validator((input) => input).handler(submitContact_createServerFn_handler, async ({ data }) => {
	if (!data.name.trim() || !data.email.includes("@") || data.message.trim().length < 12) return {
		ok: false,
		error: "Please complete name, a valid email, and a message."
	};
	await ensureSeed();
	await (await getSql())`
      insert into messages (id, name, email, topic, message)
      values (${uid("msg")}, ${data.name.trim()}, ${data.email.trim()}, ${data.topic}, ${data.message.trim()})
    `;
	const { sendEmail } = await import("./email-C1aFeNgz.mjs");
	const { SUPPORT_EMAIL } = await import("./site-D_EzqXMW.mjs").then((n) => n.u).then((n) => n.u);
	await sendEmail({
		to: process.env.OWNER_EMAIL || SUPPORT_EMAIL,
		subject: `HiredFrex contact: ${data.topic}`,
		html: `<p><b>${data.name}</b> <${data.email}></p><p>${data.topic}</p><p>${data.message.replace(/</g, "<")}</p>`
	});
	return { ok: true };
});
var submitJobReport_createServerFn_handler = createServerRpc({
	id: "83ae4dc933f27891607f5f42254152bf40771d56d8b64e2c80f57f63620faa8b",
	name: "submitJobReport",
	filename: "src/lib/server/public-actions.ts"
}, (opts) => submitJobReport.__executeServer(opts));
var submitJobReport = createServerFn({ method: "POST" }).validator((input) => input).handler(submitJobReport_createServerFn_handler, async ({ data }) => {
	if (!data.reason.trim() || data.details.trim().length < 12) return {
		ok: false,
		error: "Tell us what is wrong, with enough detail to investigate."
	};
	await ensureSeed();
	await (await getSql())`
      insert into job_reports (id, job_id, reason, details)
      values (${uid("rep")}, ${data.jobId || null}, ${data.reason}, ${data.details})
    `;
	return { ok: true };
});
var generateCvAssist_createServerFn_handler = createServerRpc({
	id: "a7c4ceef64717a39fcfb3a442c8841e996e0f7774645f0b063cae5b1052dba2c",
	name: "generateCvAssist",
	filename: "src/lib/server/public-actions.ts"
}, (opts) => generateCvAssist.__executeServer(opts));
var generateCvAssist = createServerFn({ method: "POST" }).validator((input) => input).handler(generateCvAssist_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "The writing assistant is not available in this environment. You can still edit and download your CV."
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 700,
			messages: [{
				role: "system",
				content: "You write concise professional CV summaries. Use only facts the user supplied. Never invent employers, dates, titles, qualifications, or numbers. If something is missing, omit it. Return plain text only: a 3-5 sentence professional summary, then 4-8 bullet achievements derived from the experience text."
			}, {
				role: "user",
				content: JSON.stringify(data)
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: "The writing assistant could not complete. Edit the CV yourself."
	};
	return {
		ok: true,
		text: (await res.json()).choices?.[0]?.message?.content ?? ""
	};
});
//#endregion
export { generateCvAssist_createServerFn_handler, submitContact_createServerFn_handler, submitJobReport_createServerFn_handler };

import { i as uid } from "./utils-CxUWuhEe.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { n as isWorkspacePreview } from "./env.server-wS9zOhV6.mjs";
import { r as getSql } from "./db-CED-7ZIa.mjs";
import { t as authMiddleware } from "./middleware-4Vp6Rdy2.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { otpEmailHtml, sendEmail } from "./email-C1aFeNgz.mjs";
import { createHash, randomInt } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/otp-PlNs9bR2.js
function normalizeEmail(email) {
	return email.trim().toLowerCase();
}
function hashCode(email, code) {
	return createHash("sha256").update(`${normalizeEmail(email)}:${code}`).digest("hex");
}
async function issueOtp(email, purpose) {
	const sql = await getSql();
	const addr = normalizeEmail(email);
	if (!addr.includes("@") || addr.length > 180) return {
		ok: false,
		error: "Enter a valid email address."
	};
	if (((await sql`
    select count(*)::int as n from email_otps
    where email = ${addr} and purpose = ${purpose}
      and created_at > now() - interval '15 minutes'
  `)[0]?.n ?? 0) >= 5) return {
		ok: false,
		error: "Too many codes requested. Wait a few minutes and try again."
	};
	const code = String(randomInt(1e5, 1e6));
	await sql`
    insert into email_otps (id, email, purpose, code_hash, expires_at)
    values (${uid("otp")}, ${addr}, ${purpose}, ${hashCode(addr, code)}, now() + interval '10 minutes')
  `;
	const mailed = await sendEmail({
		to: addr,
		subject: purpose === "reset" ? "HiredFrex password reset code" : "Your HiredFrex verification code",
		html: otpEmailHtml(code, purpose),
		text: `Your HiredFrex code is ${code}. It expires in 10 minutes.`
	});
	if (!mailed.ok) {
		if (isWorkspacePreview()) return {
			ok: true,
			previewCode: code,
			notice: "Resend is not connected in this preview. On hiredfrex.com the same code is emailed from your verified domain."
		};
		return mailed;
	}
	return { ok: true };
}
async function consumeOtp(email, purpose, code) {
	const sql = await getSql();
	const addr = normalizeEmail(email);
	const trimmed = code.replace(/\s/g, "");
	if (!/^\d{6}$/.test(trimmed)) return {
		ok: false,
		error: "Enter the 6-digit code from the email."
	};
	const row = (await sql`
    select id from email_otps
    where email = ${addr} and purpose = ${purpose}
      and code_hash = ${hashCode(addr, trimmed)}
      and consumed_at is null
      and expires_at > now()
    order by created_at desc
    limit 1
  `)[0];
	if (!row) return {
		ok: false,
		error: "That code is invalid or has expired."
	};
	await sql`update email_otps set consumed_at = now() where id = ${String(row.id)}`;
	return {
		ok: true,
		email: addr
	};
}
var sendVerificationOtp_createServerFn_handler = createServerRpc({
	id: "f88c3f0e4c21defad0c385da00410672a51e8d48623307be5418087825f9a75a",
	name: "sendVerificationOtp",
	filename: "src/lib/server/otp.ts"
}, (opts) => sendVerificationOtp.__executeServer(opts));
var sendVerificationOtp = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input ?? {}).handler(sendVerificationOtp_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	let email = (await sql`select email from profiles where user_id = ${context.userId}`)[0]?.email;
	const incoming = data.email?.trim().toLowerCase();
	if (!email && incoming && incoming.includes("@")) {
		email = incoming;
		await sql`
        insert into profiles (user_id, role, email, email_verified)
        values (${context.userId}, ${"seeker"}, ${email}, ${false})
        on conflict (user_id) do update set email = excluded.email
      `;
	}
	if (!email) return {
		ok: false,
		error: "Your account does not have an email on file."
	};
	return issueOtp(email, "verify");
});
var confirmVerificationOtp_createServerFn_handler = createServerRpc({
	id: "1013f7e8b2d0ff209bd437f411687aa035c63ab2f17e0b9a911c7d6a35365dd4",
	name: "confirmVerificationOtp",
	filename: "src/lib/server/otp.ts"
}, (opts) => confirmVerificationOtp.__executeServer(opts));
var confirmVerificationOtp = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(confirmVerificationOtp_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const email = (await sql`select email from profiles where user_id = ${context.userId}`)[0]?.email;
	if (!email) return {
		ok: false,
		error: "Your account does not have an email on file."
	};
	const result = await consumeOtp(email, "verify", data.code);
	if (!result.ok) return result;
	await sql`update profiles set email_verified = true, updated_at = now() where user_id = ${context.userId}`;
	return { ok: true };
});
var sendResetOtp_createServerFn_handler = createServerRpc({
	id: "d69c886a58b75fc63739cfcdd08042c2847a52c0355d3c4f726211d2bd8a99e7",
	name: "sendResetOtp",
	filename: "src/lib/server/otp.ts"
}, (opts) => sendResetOtp.__executeServer(opts));
var sendResetOtp = createServerFn({ method: "POST" }).validator((input) => input).handler(sendResetOtp_createServerFn_handler, async ({ data }) => {
	const issued = await issueOtp(data.email, "reset");
	if (!issued.ok) return issued;
	return { ok: true };
});
var confirmResetOtp_createServerFn_handler = createServerRpc({
	id: "725387ca5a0c1c35a16a21391ada43b4005032fead455b713c586412a9c90ea5",
	name: "confirmResetOtp",
	filename: "src/lib/server/otp.ts"
}, (opts) => confirmResetOtp.__executeServer(opts));
var confirmResetOtp = createServerFn({ method: "POST" }).validator((input) => input).handler(confirmResetOtp_createServerFn_handler, async ({ data }) => consumeOtp(data.email, "reset", data.code));
//#endregion
export { confirmResetOtp_createServerFn_handler, confirmVerificationOtp_createServerFn_handler, sendResetOtp_createServerFn_handler, sendVerificationOtp_createServerFn_handler };

import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Page, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
import { t as generateCvAssist } from "./public-actions-DCjq0BVI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cv-builder-miXjFhwA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CvBuilder() {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [nationality, setNationality] = (0, import_react.useState)("");
	const [visa, setVisa] = (0, import_react.useState)("");
	const [headline, setHeadline] = (0, import_react.useState)("");
	const [summary, setSummary] = (0, import_react.useState)("");
	const [skills, setSkills] = (0, import_react.useState)("");
	const [languages, setLanguages] = (0, import_react.useState)("");
	const [certs, setCerts] = (0, import_react.useState)("");
	const [target, setTarget] = (0, import_react.useState)("");
	const [exps, setExps] = (0, import_react.useState)([{
		title: "",
		employer: "",
		city: "",
		dates: "",
		bullets: ""
	}]);
	const [edus, setEdus] = (0, import_react.useState)([{
		school: "",
		credential: "",
		year: ""
	}]);
	const [assist, setAssist] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const text = (0, import_react.useMemo)(() => {
		return [
			name,
			[
				email,
				phone,
				city
			].filter(Boolean).join(" · "),
			[nationality, visa].filter(Boolean).join(" · "),
			"",
			headline,
			summary,
			"",
			"Experience",
			...exps.flatMap((e) => [
				`${e.title} — ${e.employer} — ${e.city} — ${e.dates}`,
				...e.bullets.split("\n").filter(Boolean).map((b) => `• ${b}`),
				""
			]),
			"Education",
			...edus.map((e) => `${e.credential} — ${e.school} — ${e.year}`),
			"",
			skills && `Skills: ${skills}`,
			languages && `Languages: ${languages}`,
			certs && `Certificates: ${certs}`
		].filter((l) => l !== void 0).join("\n");
	}, [
		name,
		email,
		phone,
		city,
		nationality,
		visa,
		headline,
		summary,
		exps,
		edus,
		skills,
		languages,
		certs
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Tools" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl",
			children: "CV builder"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-muted",
			children: "One-column, ATS-plain layout. Fill only facts you can defend. The optional assistant restates what you typed — it is instructed not to invent employers or dates."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3",
				onSubmit: (e) => e.preventDefault(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: target,
						onChange: (e) => setTarget(e.target.value),
						placeholder: "Target job title (for the assistant)",
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Full name",
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "Email",
							className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: phone,
							onChange: (e) => setPhone(e.target.value),
							placeholder: "Phone",
							className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: city,
						onChange: (e) => setCity(e.target.value),
						placeholder: "Current city",
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: nationality,
						onChange: (e) => setNationality(e.target.value),
						placeholder: "Nationality (optional)",
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: visa,
						onChange: (e) => setVisa(e.target.value),
						placeholder: "Visa / work authorisation in one line",
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: headline,
						onChange: (e) => setHeadline(e.target.value),
						placeholder: "Headline",
						className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: summary,
						onChange: (e) => setSummary(e.target.value),
						rows: 4,
						placeholder: "Professional summary",
						className: "rounded-xl border border-line bg-surface px-3 py-2 text-sm"
					}),
					exps.map((exp, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 rounded-2xl border border-line p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs font-bold uppercase tracking-wider text-faint",
								children: ["Experience ", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: exp.title,
								onChange: (e) => setExps(patch(exps, i, { title: e.target.value })),
								placeholder: "Job title",
								className: "h-10 rounded-lg border border-line bg-paper px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: exp.employer,
								onChange: (e) => setExps(patch(exps, i, { employer: e.target.value })),
								placeholder: "Employer",
								className: "h-10 rounded-lg border border-line bg-paper px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: exp.dates,
								onChange: (e) => setExps(patch(exps, i, { dates: e.target.value })),
								placeholder: "Dates, e.g. Mar 2023 – Present",
								className: "h-10 rounded-lg border border-line bg-paper px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: exp.bullets,
								onChange: (e) => setExps(patch(exps, i, { bullets: e.target.value })),
								rows: 3,
								placeholder: "What you did, one line per bullet",
								className: "rounded-lg border border-line bg-paper px-3 py-2 text-sm"
							})
						]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm font-bold text-navy",
						onClick: () => setExps([...exps, {
							title: "",
							employer: "",
							city: "",
							dates: "",
							bullets: ""
						}]),
						children: "Add experience"
					}),
					edus.map((edu, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 rounded-2xl border border-line p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs font-bold uppercase tracking-wider text-faint",
								children: ["Education ", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: edu.school,
								onChange: (e) => setEdus(patch(edus, i, { school: e.target.value })),
								placeholder: "School",
								className: "h-10 rounded-lg border border-line bg-paper px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: edu.credential,
								onChange: (e) => setEdus(patch(edus, i, { credential: e.target.value })),
								placeholder: "Credential",
								className: "h-10 rounded-lg border border-line bg-paper px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: edu.year,
								onChange: (e) => setEdus(patch(edus, i, { year: e.target.value })),
								placeholder: "Year",
								className: "h-10 rounded-lg border border-line bg-paper px-3 text-sm"
							})
						]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: skills,
						onChange: (e) => setSkills(e.target.value),
						rows: 2,
						placeholder: "Skills (comma separated)",
						className: "rounded-xl border border-line bg-surface px-3 py-2 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: languages,
						onChange: (e) => setLanguages(e.target.value),
						rows: 2,
						placeholder: "Languages",
						className: "rounded-xl border border-line bg-surface px-3 py-2 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: certs,
						onChange: (e) => setCerts(e.target.value),
						rows: 2,
						placeholder: "Certificates",
						className: "rounded-xl border border-line bg-surface px-3 py-2 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						className: "h-11 rounded-xl border border-line text-sm font-bold",
						onClick: async () => {
							setBusy(true);
							const res = await generateCvAssist({ data: {
								name,
								headline,
								experience: exps.map((e) => `${e.title} ${e.employer} ${e.dates} ${e.bullets}`).join("\n"),
								education: edus.map((e) => `${e.credential} ${e.school}`).join("\n"),
								skills,
								targetRole: target
							} });
							setAssist(res.ok ? res.text : res.error);
							if (res.ok) setSummary(res.text);
							setBusy(false);
						},
						children: busy ? "Drafting…" : "Optional: rewrite summary from my facts"
					}),
					assist && !assist.startsWith("The writing") ? null : assist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-warn",
						children: assist
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "cv-preview",
				className: "rounded-[22px] border border-line bg-white p-8 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: name || "Your name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							email,
							phone,
							city
						].filter(Boolean).join(" · ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: [nationality, visa].filter(Boolean).join(" · ")
					}),
					headline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-semibold",
						children: headline
					}) : null,
					summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-wrap text-sm leading-relaxed",
						children: summary
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-6 text-xs font-bold uppercase tracking-wider text-gold-deep",
						children: "Experience"
					}),
					exps.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold",
								children: [
									e.title,
									" — ",
									e.employer
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-faint",
								children: [
									e.dates,
									" ",
									e.city
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1 list-disc pl-4 text-sm",
								children: e.bullets.split("\n").filter(Boolean).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: b }, b))
							})
						]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-6 text-xs font-bold uppercase tracking-wider text-gold-deep",
						children: "Education"
					}),
					edus.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: [
							e.credential,
							" — ",
							e.school,
							" (",
							e.year,
							")"
						]
					}, i)),
					skills ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Skills:" }),
							" ",
							skills
						]
					}) : null,
					languages ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Languages:" }),
							" ",
							languages
						]
					}) : null,
					certs ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Certificates:" }),
							" ",
							certs
						]
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-xl bg-navy px-4 text-sm font-bold text-white",
					onClick: () => window.print(),
					children: "Print / save PDF"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-xl border border-line px-4 text-sm font-bold",
					onClick: () => navigator.clipboard.writeText(text),
					children: "Copy text"
				})]
			})] })]
		})
	] });
}
function patch(arr, i, part) {
	return arr.map((row, idx) => idx === i ? {
		...row,
		...part
	} : row);
}
//#endregion
export { CvBuilder as component };

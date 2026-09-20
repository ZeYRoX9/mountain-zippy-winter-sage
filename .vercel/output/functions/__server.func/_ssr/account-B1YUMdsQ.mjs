import { o as __toESM } from "../_runtime.mjs";
import { i as EXPERIENCE_LEVELS, l as WORKPLACE_TYPES, n as CATEGORIES, r as EMPLOYMENT_TYPES } from "./site-D_EzqXMW.mjs";
import { H as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCurrentUserState, n as Page, r as RedirectToSignIn, t as Eyebrow } from "./site-shell-BqnhJ0K_.mjs";
import { a as listEmployerJobs, c as postEmployerJob, i as listEmployerApplications, l as saveMyProfile, n as closeEmployerJob, o as listMyApplications, r as getMyProfile, s as listSavedJobs, u as setApplicationStatus } from "./account-DsnfqBP1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-B1YUMdsQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const { user, isPending } = useCurrentUserState();
	const [tab, setTab] = (0, import_react.useState)("seeker");
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [apps, setApps] = (0, import_react.useState)([]);
	const [saved, setSaved] = (0, import_react.useState)([]);
	const [ejobs, setEjobs] = (0, import_react.useState)([]);
	const [eapps, setEapps] = (0, import_react.useState)([]);
	const [note, setNote] = (0, import_react.useState)(null);
	async function refresh() {
		const p = await getMyProfile();
		setProfile(p);
		const [a, s] = await Promise.all([listMyApplications(), listSavedJobs()]);
		setApps(a);
		setSaved(s);
		if (p.role === "employer" || p.role === "admin") {
			setEjobs(await listEmployerJobs());
			setEapps(await listEmployerApplications());
		}
	}
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-2xl bg-line" }) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!profile) {
		refresh();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-2xl bg-line" }) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Private · noindex" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "mt-2 font-display text-4xl",
			children: ["Hello ", profile.displayName || user.displayName || ""]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: [
				"Role: ",
				profile.role,
				". Dashboards are not indexed.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/studio",
					className: "font-semibold text-navy",
					children: "Editorial studio"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex flex-wrap gap-2",
			children: [
				"seeker",
				"employer",
				"settings"
			].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setTab(t),
				className: `rounded-full px-4 py-2 text-sm font-semibold ${tab === t ? "bg-navy text-white" : "border border-line bg-surface"}`,
				children: t === "seeker" ? "Applications" : t === "employer" ? "Employer" : "Account"
			}, t))
		}),
		tab === "seeker" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[22px] border border-line bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Applications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3 text-sm",
					children: apps.length ? apps.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-line pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/jobs/$slug",
							params: { slug: a.slug },
							className: "font-semibold text-navy",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted",
							children: [
								a.company_name,
								" · ",
								a.status
							]
						})]
					}, a.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-muted",
						children: "No applications yet."
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[22px] border border-line bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Saved jobs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-3 text-sm",
						children: saved.length ? saved.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/jobs/$slug",
							params: { slug: s.slug },
							className: "font-semibold text-navy",
							children: s.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted",
							children: s.company_name
						})] }, s.slug)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-muted",
							children: "None saved."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cv-builder",
						className: "mt-4 inline-block text-sm font-bold text-gold-deep",
						children: "Open CV builder"
					})
				]
			})]
		}) : null,
		tab === "employer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployerPanel, {
			profile,
			jobs: ejobs,
			apps: eapps,
			onPosted: async () => {
				await refresh();
				setNote("Listing submitted. Completeness checks ran automatically.");
			},
			onRefresh: refresh
		}) : null,
		tab === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 grid max-w-lg gap-3",
			onSubmit: async (e) => {
				e.preventDefault();
				const fd = new FormData(e.currentTarget);
				await saveMyProfile({ data: {
					role: String(fd.get("role")) === "employer" ? "employer" : "seeker",
					displayName: String(fd.get("displayName") || ""),
					phone: String(fd.get("phone") || ""),
					headline: String(fd.get("headline") || ""),
					location: String(fd.get("location") || ""),
					skills: String(fd.get("skills") || ""),
					companyName: String(fd.get("companyName") || "")
				} });
				setNote("Saved.");
				await refresh();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: ["I am", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "role",
						defaultValue: profile.role,
						className: "mt-1 h-11 w-full rounded-xl border border-line bg-surface px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "seeker",
							children: "A job seeker"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "employer",
							children: "Hiring"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "displayName",
					defaultValue: profile.displayName ?? "",
					placeholder: "Name",
					className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "phone",
					defaultValue: profile.phone ?? "",
					placeholder: "Phone",
					className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "headline",
					defaultValue: profile.headline ?? "",
					placeholder: "Headline",
					className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "location",
					defaultValue: profile.location ?? "",
					placeholder: "City",
					className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "skills",
					defaultValue: profile.skills ?? "",
					placeholder: "Skills",
					className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "companyName",
					defaultValue: profile.companyName ?? "",
					placeholder: "Company name (employers)",
					className: "h-11 rounded-xl border border-line bg-surface px-3 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-11 rounded-xl bg-navy text-sm font-bold text-white",
					children: "Save"
				})
			]
		}) : null,
		note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm font-semibold text-ok",
			children: note
		}) : null
	] });
}
function EmployerPanel({ profile, jobs, apps, onPosted, onRefresh }) {
	const [err, setErr] = (0, import_react.useState)(null);
	if (!profile.companyName) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-8 text-muted",
		children: "Add a company name under Account before posting. Identity will still be labelled unverified."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 grid gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[22px] border border-line bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Post a listing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Blocking checks: placeholder copy, missing overview, remote + physical titles, application-fee language."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 grid gap-3 md:grid-cols-2",
						onSubmit: async (e) => {
							e.preventDefault();
							const fd = new FormData(e.currentTarget);
							const split = (k) => String(fd.get(k) || "").split("\n").map((s) => s.trim()).filter(Boolean);
							const res = await postEmployerJob({ data: {
								title: String(fd.get("title") || ""),
								locationCity: String(fd.get("city") || ""),
								locationCountry: String(fd.get("country") || "United Arab Emirates"),
								employmentType: String(fd.get("type") || "Full-time"),
								workplaceType: String(fd.get("workplace") || "On-site"),
								category: String(fd.get("category") || "Administrative"),
								salaryDisplay: String(fd.get("salary") || "") || void 0,
								overview: String(fd.get("overview") || ""),
								responsibilities: split("responsibilities"),
								essentialRequirements: split("requirements"),
								skills: split("skills"),
								benefits: split("benefits"),
								sourceUrl: String(fd.get("source") || "") || void 0
							} });
							if (!res.ok) setErr(res.error);
							else {
								setErr(null);
								e.target.reset();
								onPosted();
							}
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "title",
								required: true,
								placeholder: "Job title",
								className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "city",
								required: true,
								placeholder: "City",
								className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "country",
								placeholder: "Country",
								defaultValue: "United Arab Emirates",
								className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "category",
								className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm",
								children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c.name }, c.slug))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "type",
								className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm",
								children: EMPLOYMENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "workplace",
								className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm",
								children: WORKPLACE_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "salary",
								placeholder: "Salary as advertised (or leave blank)",
								className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm md:col-span-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "overview",
								required: true,
								rows: 4,
								placeholder: "Overview (min ~80 characters, no filler)",
								className: "rounded-xl border border-line bg-paper px-3 py-2 text-sm md:col-span-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "responsibilities",
								rows: 4,
								placeholder: "Responsibilities, one per line (3+ to be indexed)",
								className: "rounded-xl border border-line bg-paper px-3 py-2 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "requirements",
								rows: 4,
								placeholder: "Essential requirements, one per line",
								className: "rounded-xl border border-line bg-paper px-3 py-2 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "skills",
								rows: 3,
								placeholder: "Skills, one per line",
								className: "rounded-xl border border-line bg-paper px-3 py-2 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "benefits",
								rows: 3,
								placeholder: "Benefits only if true, one per line",
								className: "rounded-xl border border-line bg-paper px-3 py-2 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "source",
								placeholder: "Public vacancy URL (optional)",
								className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm md:col-span-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "h-11 rounded-xl bg-navy text-sm font-bold text-white md:col-span-2",
								children: "Submit for review"
							}),
							err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-danger md:col-span-2",
								children: err
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[22px] border border-line bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Your listings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3 text-sm",
					children: jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold",
							children: j.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted",
							children: [
								j.status,
								" · ",
								j.verification_status,
								" · ",
								j.applicants ?? 0,
								" applicants · ",
								j.views,
								" views",
								j.indexable ? "" : " · noindex (thin)"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-lg border border-line px-3 py-1.5 text-xs font-bold",
							onClick: async () => {
								await closeEmployerJob({ data: { id: j.id } });
								onRefresh();
							},
							children: "Close"
						})]
					}, j.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[22px] border border-line bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Applicants"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-4 text-sm",
					children: apps.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-line pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold",
								children: [
									a.name,
									" → ",
									a.title
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-muted",
								children: [
									a.email,
									" · ",
									a.status
								]
							}),
							a.cover_note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: a.cover_note
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex gap-2",
								children: [
									"reviewed",
									"shortlisted",
									"rejected"
								].map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-lg border border-line px-2 py-1 text-xs font-bold",
									onClick: async () => {
										await setApplicationStatus({ data: {
											id: a.id,
											status: st
										} });
										onRefresh();
									},
									children: st
								}, st))
							})
						]
					}, a.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-faint",
				children: [
					"Experience levels we accept: ",
					EXPERIENCE_LEVELS.join(", "),
					"."
				]
			})
		]
	});
}
//#endregion
export { AccountPage as component };

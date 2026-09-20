import { o as __toESM } from "./_runtime.mjs";
import { t as formatDate } from "./_ssr/utils-CxUWuhEe.mjs";
import { t as jsonLd } from "./_ssr/seo-BYC44w_4.mjs";
import { H as require_react, v as Link, x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { r as Route$2 } from "./_ssr/router-BBMsO9gN.mjs";
import { i as useCurrentUserState, n as Page, t as Eyebrow } from "./_ssr/site-shell-BqnhJ0K_.mjs";
import { d as toggleSavedJob, t as applyToJob } from "./_ssr/account-DsnfqBP1.mjs";
import { n as VerificationChip, t as JobCard } from "./_ssr/job-card-B9sZe-bA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-7GlLgxp9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ApplyPanel({ job }) {
	const { user, isPending } = useCurrentUserState();
	const [status, setStatus] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function onApply(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const res = await applyToJob({ data: {
			jobId: job.id,
			name: String(fd.get("name") || ""),
			email: String(fd.get("email") || ""),
			phone: String(fd.get("phone") || ""),
			coverNote: String(fd.get("cover") || ""),
			cvText: String(fd.get("cv") || "")
		} });
		setStatus(res.ok ? "Application submitted. Track it from your dashboard." : res.error);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "h-fit rounded-[22px] border border-line bg-surface p-5 lg:sticky lg:top-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Apply on HiredFrex"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Never pay to apply. Applications stay on this site."
			}),
			isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-24 animate-pulse rounded-xl bg-paper" }) : !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Sign in to apply and to save this role."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					search: {
						next: `/jobs/${job.slug}`,
						mode: "signin"
					},
					className: "mt-3 inline-flex h-11 items-center rounded-xl bg-navy px-4 text-sm font-bold text-white",
					children: "Sign in to apply"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 grid gap-3",
				onSubmit: onApply,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "name",
						required: true,
						defaultValue: user.displayName ?? "",
						placeholder: "Full name",
						className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "email",
						type: "email",
						required: true,
						defaultValue: user.primaryEmail ?? "",
						placeholder: "Email",
						className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "phone",
						placeholder: "Phone (optional)",
						className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						name: "cover",
						rows: 4,
						placeholder: "Short note — no fees, no passport scans here",
						className: "rounded-xl border border-line bg-paper px-3 py-2 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						name: "cv",
						rows: 6,
						placeholder: "Paste a plain-text CV (optional)",
						className: "rounded-xl border border-line bg-paper px-3 py-2 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "h-11 rounded-xl bg-navy text-sm font-bold text-white",
						children: "Submit application"
					})
				]
			}),
			status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm font-semibold text-ok",
				children: status
			}) : null,
			user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "mt-3 w-full rounded-xl border border-line py-2.5 text-sm font-semibold",
				disabled: saving,
				onClick: async () => {
					setSaving(true);
					const r = await toggleSavedJob({ data: { jobId: job.id } });
					setStatus(r.saved ? "Saved to your dashboard." : "Removed from saved jobs.");
					setSaving(false);
				},
				children: "Save this job"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-faint",
				children: [
					"Last reviewed ",
					job.lastVerifiedOn ?? "—",
					". Status: ",
					job.verificationStatus.replaceAll("_", " "),
					"."
				]
			})
		]
	});
}
function JobPage() {
	const { job, related } = Route$2.useLoaderData();
	if (!job) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: "Listing not available"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted",
			children: "This job is not public. It may have failed verification or been closed. We do not redirect removed jobs to the homepage."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/jobs",
			className: "mt-4 inline-block font-bold text-gold-deep",
			children: "Browse jobs"
		})
	] });
	const schema = {
		"@context": "https://schema.org",
		"@type": "JobPosting",
		title: job.title,
		description: job.overview,
		datePosted: job.postedOn,
		employmentType: job.employmentType === "Full-time" ? "FULL_TIME" : job.employmentType === "Part-time" ? "PART_TIME" : "CONTRACTOR",
		hiringOrganization: {
			"@type": "Organization",
			name: job.companyName
		},
		jobLocation: {
			"@type": "Place",
			address: {
				"@type": "PostalAddress",
				addressLocality: job.locationCity,
				addressCountry: job.locationCountry
			}
		}
	};
	if (job.closingOn) schema.validThrough = job.closingOn;
	if (job.salaryMin != null && job.salaryCurrency) schema.baseSalary = {
		"@type": "MonetaryAmount",
		currency: job.salaryCurrency,
		value: {
			"@type": "QuantitativeValue",
			minValue: job.salaryMin,
			maxValue: job.salaryMax ?? job.salaryMin,
			unitText: job.salaryPeriod === "month" ? "MONTH" : "YEAR"
		}
	};
	const guide = job.categorySlug === "security" ? {
		slug: "uae-security-jobs",
		label: "UAE security jobs guide"
	} : job.categorySlug === "hospitality" ? {
		slug: "uae-hospitality-jobs",
		label: "UAE hospitality jobs guide"
	} : {
		slug: "uae-job-search",
		label: "UAE job search guide"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: jsonLd(schema) }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "text-sm text-faint",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "hover:text-navy",
					children: "Home"
				}),
				" /",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/jobs",
					className: "hover:text-navy",
					children: "Jobs"
				}),
				" /",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-navy",
					children: job.title
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: job.category }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl md:text-5xl",
					children: job.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-lg font-semibold text-muted",
					children: job.companyName
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationChip, { status: job.verificationStatus })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-6 grid gap-3 rounded-[22px] border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					k: "Location",
					v: job.locationDisplay
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					k: "Employment type",
					v: job.employmentType
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					k: "Workplace",
					v: job.workplaceType
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					k: "Salary",
					v: job.salaryDisplay ?? "Not provided by the employer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					k: "Experience",
					v: job.experienceLevel ?? "Not specified"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					k: "Posted",
					v: formatDate(job.postedOn)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					k: "Closing date",
					v: job.closingOn ? formatDate(job.closingOn) : "Not provided"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					k: "Last reviewed",
					v: formatDate(job.lastVerifiedOn)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 lg:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
					title: "Employer-provided information",
					children: "Fields below are taken from the listing as submitted, then cleaned for spelling and category. HiredFrex has not added benefits, visa promises, or a salary that was not in the original copy."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 font-display text-2xl",
					children: "Job overview"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted leading-relaxed",
					children: job.overview
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "About the employer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted leading-relaxed",
					children: job.aboutEmployer
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBlock, {
					title: "Responsibilities",
					items: job.responsibilities,
					empty: "The employer did not provide a responsibilities list."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBlock, {
					title: "Essential requirements",
					items: job.essentialRequirements,
					empty: "The employer did not provide essential requirements."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBlock, {
					title: "Preferred requirements",
					items: job.preferredRequirements,
					empty: "None stated."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBlock, {
					title: "Skills named on this listing",
					items: job.skills,
					empty: "None stated."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "Working schedule"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: job.schedule ?? "Not provided by the employer."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBlock, {
					title: "Benefits (only if confirmed)",
					items: job.benefits,
					empty: "No benefits were confirmed on this listing. HiredFrex does not invent them."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "Visa / work authorisation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: job.visaInfo ?? "Not provided. HiredFrex does not infer sponsorship. For UAE processes see official pages at mohre.gov.ae and u.ae."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "Hiring process"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: job.hiringProcess ?? "Not described by the employer."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "How to apply"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: job.howToApply
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-2xl",
					children: "Original vacancy / source"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: job.sourceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "underline",
						href: job.sourceUrl,
						rel: "nofollow noopener",
						children: job.sourceName ?? job.sourceUrl
					}) : job.sourceName ?? "Employer-submitted on HiredFrex. No independent public source URL."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Callout, {
					title: "HiredFrex editorial information",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: job.verificationSummary }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: job.checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-navy",
								children: [
									c.label,
									": ",
									c.result.replace("_", " ")
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" — ", c.detail]
							})] }, c.id))
						}),
						job.qualityFlags.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-warn",
							children: ["Flags: ", job.qualityFlags.join(", ")]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm",
					children: [
						"Preparing to apply? Read the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/guides/$slug",
							params: { slug: guide.slug },
							className: "font-semibold text-navy underline",
							children: guide.label
						}),
						", the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/guides/$slug",
							params: { slug: "uae-cv" },
							className: "font-semibold text-navy underline",
							children: "UAE CV guide"
						}),
						", and",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/guides/$slug",
							params: { slug: "verify-a-job-offer" },
							className: "font-semibold text-navy underline",
							children: "how to verify an offer"
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/report",
						search: { job: job.slug },
						className: "font-bold text-danger",
						children: "Report this job"
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplyPanel, { job })]
		}),
		related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-2xl",
				children: ["More in ", job.category]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3",
				children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobCard, { job: r }, r.id))
			})]
		}) : null
	] });
}
function Fact({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-[11px] font-bold uppercase tracking-wider text-faint",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 text-sm font-semibold text-navy",
		children: v
	})] });
}
function ListBlock({ title, items, empty }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: title
		}), items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 list-disc space-y-1 pl-5 text-muted",
			children: items.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: empty
		})]
	});
}
function Callout({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "rounded-[18px] border border-gold/40 bg-gold-soft/60 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-bold uppercase tracking-wider text-gold-deep",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-sm leading-relaxed text-navy",
			children
		})]
	});
}
//#endregion
export { JobPage as component };

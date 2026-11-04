import { i as formatDay, o as relativeDay, s as todayISO } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useCatalog, y as TRACK_LABEL } from "./router-DAhf9lC1.mjs";
import { c as StatusPill, d as deriveStatus, f as eventsFor, g as publishedNotice, m as isUrgent, n as EvidenceStamp, r as ExternalLink, s as SectionLabel, t as Announced } from "./marks-B5AX3jYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CHbg6WwR.js
var import_jsx_runtime = require_jsx_runtime();
var watchItems = [{
	id: "hsc-retake-2026",
	title: "HSC retake may shift these dates",
	body: "On 4 Nov 2026 The Daily Star reported that universities and the medical admission bodies may revise 2026–27 schedules so students who failed one or two HSC subjects can sit proposed supplementary exams. Boards were described as needing December to hold those exams and publish results, with 31 Dec 2026 named as the hoped-for result day. No revised circular is stored here. Every date in this archive is the pre-retake timeline.",
	sourceLabel: "The Daily Star, 4 Nov 2026",
	sourceUrl: "https://www.thedailystar.net/news/bangladesh/education/news/admission-schedule-medical-colleges-univs-mull-relief-hsc-retakers-4315036",
	published: "2026-11-04"
}];
function Overview() {
	const { universities, circulars, byId } = useCatalog();
	const now = /* @__PURE__ */ new Date();
	const today = todayISO(now);
	const unis = universities.filter((item) => item.kind === "university");
	const published = circulars.filter(publishedNotice);
	const openCount = circulars.filter((item) => deriveStatus(item, now) === "open").length;
	const deadlines = circulars.filter((item) => item.applicationCloses && item.applicationCloses >= today);
	const exams = new Set(circulars.flatMap((item) => eventsFor(item).filter((event) => event.kind === "exam" && event.day >= today).map((event) => event.id)));
	const recentCut = new Date(now);
	recentCut.setDate(recentCut.getDate() - 14);
	const recentCutISO = todayISO(recentCut);
	const recent = circulars.filter((item) => item.updatedOn >= recentCutISO);
	const latest = [...circulars].sort((a, b) => b.updatedOn.localeCompare(a.updatedOn)).slice(0, 6);
	const radar = circulars.flatMap((item) => eventsFor(item)).filter((event) => event.day >= today && (event.kind === "opens" || event.kind === "closes" || event.kind === "exam")).sort((a, b) => a.day.localeCompare(b.day) || a.label.localeCompare(b.label)).slice(0, 8);
	const stats = [
		{
			k: "01",
			label: "Universities tracked",
			value: unis.length,
			hint: `${universities.length - unis.length} admission systems`
		},
		{
			k: "02",
			label: "Published circulars",
			value: published.length,
			hint: "Notice cited · PDF only if linked"
		},
		{
			k: "03",
			label: "Upcoming deadlines",
			value: deadlines.length,
			hint: "Close date still ahead"
		},
		{
			k: "04",
			label: "Open applications",
			value: openCount,
			hint: openCount ? "Window is live" : "None live today"
		},
		{
			k: "05",
			label: "Upcoming examinations",
			value: exams.size,
			hint: "Unit papers still ahead"
		},
		{
			k: "06",
			label: "Recent intelligence",
			value: recent.length,
			hint: "Updated in 14 days"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-ink pb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs tracking-widest text-mute",
						children: ["VOL. 01 · DHAKA DESK · ", formatDay(today)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-accent",
						children: "HSC 2026–27"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-3 font-display text-6xl font-bold uppercase leading-none tracking-tight text-balance sm:text-7xl md:text-8xl",
					children: [
						"Admission",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-accent",
							children: "//"
						}),
						"26"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-3xl font-display text-2xl uppercase leading-tight tracking-wide md:text-3xl",
					children: "The Bangladesh university admission archive."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-base text-pretty",
					children: "A working desk for the whole season. Directory, circulars, deadlines and your own shortlist — with every unknown left blank instead of invented."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-2 border border-ink md:grid-cols-3 xl:grid-cols-6",
			children: stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "border-ink border-r border-b p-4 xl:border-b-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-mute",
						children: stat.k
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-5xl font-bold leading-none tabular-nums",
						children: String(stat.value).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-lg font-semibold uppercase leading-none",
						children: stat.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-xs text-mute",
						children: stat.hint
					})
				]
			}, stat.k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between gap-3 border-b border-ink pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					index: "07",
					children: "Deadline radar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/radar",
					className: "font-mono text-xs tracking-widest underline underline-offset-4",
					children: "FULL RADAR"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: radar.map((event, index) => {
				const uni = byId.get(event.universityId);
				const hot = isUrgent(event, now);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border-b border-ink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/circulars/$id",
						params: { id: event.circularId },
						className: "grid grid-cols-[auto_1fr] gap-4 py-3 hover:bg-panel md:grid-cols-[4.5rem_7.5rem_1fr_auto]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-mute",
								children: String(index + 1).padStart(2, "0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `font-mono text-xs ${hot ? "text-accent" : "text-ink"}`,
								children: [formatDay(event.day), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block",
									children: relativeDay(event.day, now)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl font-bold uppercase leading-none",
								children: uni?.shortName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm",
								children: event.label
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-mono text-xs ${hot ? "text-accent" : "text-mute"}`,
								children: hot ? "URGENT" : "ON FILE"
							})
						]
					})
				}, event.id);
			}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between gap-3 border-b border-ink pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					index: "08",
					children: "Recent intelligence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/circulars",
					className: "font-mono text-xs tracking-widest underline underline-offset-4",
					children: "ARCHIVE"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "divide-y divide-ink border-b border-ink",
				children: latest.map((item) => {
					const uni = byId.get(item.universityId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/circulars/$id",
						params: { id: item.id },
						className: "block py-3 hover:bg-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-2xl font-bold uppercase leading-none",
										children: uni?.shortName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: deriveStatus(item, now) }),
									item.updatedOn >= recentCutISO ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-accent",
										children: "NEW"
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-xs text-mute",
								children: ["CITED ", formatDay(item.updatedOn)]
							})
						]
					}) }, item.id);
				})
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 border border-ink border-l-4 border-l-accent p-4 md:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-widest text-accent",
				children: "WATCH ITEM · NOT A CONFIRMED CIRCULAR"
			}), watchItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl font-bold uppercase leading-none",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-4xl text-sm text-pretty",
						children: item.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-mono text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							href: item.sourceUrl,
							children: item.sourceLabel
						})
					})
				]
			}, item.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				index: "09",
				children: "Systems on the desk"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-px bg-ink md:grid-cols-3",
				children: universities.filter((item) => item.kind === "system").map((item) => {
					const circular = circulars.find((entry) => entry.universityId === item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/universities/$id",
						params: { id: item.id },
						className: "bg-paper p-4 hover:bg-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-mute",
								children: TRACK_LABEL[item.track]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-4xl font-bold uppercase leading-none",
								children: item.shortName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: item.name
							}),
							circular ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceStamp, { circular }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, { day: circular.examDate })]
							}) : null
						]
					}, item.id);
				})
			})]
		})
	] });
}
//#endregion
export { Overview as component };

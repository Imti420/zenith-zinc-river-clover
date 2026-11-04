import { i as __toESM } from "../_runtime.mjs";
import { i as formatDay } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useCatalog, v as SYSTEM_LABEL } from "./router-DAhf9lC1.mjs";
import { c as StatusPill, d as deriveStatus, g as publishedNotice, n as EvidenceStamp, o as PageHead, u as controlClass } from "./marks-B5AX3jYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/circulars-pzDtz78U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CircularArchive() {
	const { circulars, byId, universities } = useCatalog();
	const [view, setView] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const [system, setSystem] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [universityId, setUniversityId] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("latest");
	const [hasExam, setHasExam] = (0, import_react.useState)(false);
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		const now = /* @__PURE__ */ new Date();
		return circulars.filter((item) => {
			const app = deriveStatus(item, now);
			if (view === "upcoming" && app !== "upcoming" && app !== "open") return false;
			if (view === "published" && !publishedNotice(item)) return false;
			if (system !== "all" && item.system !== system) return false;
			if (status !== "all" && app !== status) return false;
			if (universityId !== "all" && item.universityId !== universityId) return false;
			if (hasExam && !item.examDate && !item.units.some((unit) => unit.examDate)) return false;
			if (!query) return true;
			const uni = byId.get(item.universityId);
			return [
				item.title,
				item.summary,
				uni?.name,
				uni?.shortName
			].join(" ").toLowerCase().includes(query);
		}).sort((a, b) => {
			if (sort === "deadline") return (a.applicationCloses ?? "9999").localeCompare(b.applicationCloses ?? "9999");
			if (sort === "exam") return (a.examDate ?? "9999").localeCompare(b.examDate ?? "9999");
			if (sort === "name") {
				const an = byId.get(a.universityId)?.name ?? "";
				const bn = byId.get(b.universityId)?.name ?? "";
				return an.localeCompare(bn);
			}
			return b.updatedOn.localeCompare(a.updatedOn);
		});
	}, [
		circulars,
		byId,
		view,
		q,
		system,
		status,
		universityId,
		sort,
		hasExam
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Archive",
			title: "Circular archive",
			lede: "Only records with a cited report or a note you logged yourself. Universities without a notice stay in the directory — they are not turned into fake circulars."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				{
					id: "all",
					label: "All circulars"
				},
				{
					id: "upcoming",
					label: "Upcoming"
				},
				{
					id: "published",
					label: "Published"
				}
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setView(item.id),
				className: `h-11 border px-3 font-display text-sm font-semibold uppercase tracking-widest ${view === item.id ? "border-ink bg-ink text-paper" : "border-ink bg-paper"}`,
				children: item.label
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 border border-ink p-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "md:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tracking-widest text-mute",
						children: "SEARCH"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: controlClass,
						value: q,
						onChange: (e) => setQ(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: "UNIVERSITY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: controlClass,
					value: universityId,
					onChange: (e) => setUniversityId(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "ALL"
					}), universities.filter((uni) => circulars.some((item) => item.universityId === uni.id) || uni.kind === "system").map((uni) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: uni.id,
						children: [
							uni.shortName,
							" — ",
							uni.name
						]
					}, uni.id))]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: "CLUSTER / SYSTEM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: controlClass,
					value: system,
					onChange: (e) => setSystem(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "ALL SYSTEMS"
					}), Object.keys(SYSTEM_LABEL).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item,
						children: SYSTEM_LABEL[item].toUpperCase()
					}, item))]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: "APPLICATION STATUS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: controlClass,
					value: status,
					onChange: (e) => setStatus(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "ALL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "open",
							children: "OPEN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "upcoming",
							children: "UPCOMING"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "closed",
							children: "CLOSED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "not_announced",
							children: "NOT ANNOUNCED"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: "SORT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: controlClass,
					value: sort,
					onChange: (e) => setSort(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "latest",
							children: "LATEST ANNOUNCEMENT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "deadline",
							children: "NEAREST DEADLINE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "exam",
							children: "EXAMINATION DATE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "name",
							children: "UNIVERSITY NAME"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2 border border-ink px-3 font-mono text-xs tracking-widest",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: hasExam,
						onChange: (e) => setHasExam(e.target.checked)
					}), "HAS AN EXAM DATE"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center font-mono text-xs text-mute",
					children: [String(rows.length).padStart(2, "0"), " CIRCULARS"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-4 divide-y divide-ink border-y border-ink",
			children: rows.map((item) => {
				const uni = byId.get(item.universityId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/circulars/$id",
					params: { id: item.id },
					className: "grid gap-2 py-4 hover:bg-panel md:grid-cols-[7rem_1fr_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-4xl font-bold uppercase leading-none",
							children: uni?.shortName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block font-mono text-xs text-mute",
							children: [
								"CLOSES ",
								formatDay(item.applicationCloses),
								" · EXAM ",
								formatDay(item.examDate),
								" · CITED ",
								formatDay(item.updatedOn)
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex flex-wrap items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: deriveStatus(item) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceStamp, { circular: item })]
						})
					]
				}) }, item.id);
			})
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 font-mono text-xs text-mute",
			children: "NO CIRCULAR MATCHES THESE FILTERS."
		}) : null
	] });
}
//#endregion
export { CircularArchive as component };

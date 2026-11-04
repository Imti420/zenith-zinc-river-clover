import { i as __toESM } from "../_runtime.mjs";
import { i as formatDay } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useCatalog, y as TRACK_LABEL } from "./router-DAhf9lC1.mjs";
import { c as StatusPill, d as deriveStatus, h as nextRelevantDay, o as PageHead, u as controlClass } from "./marks-B5AX3jYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/universities-CRRpVjxC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TRACKS = ["all", ...Object.keys(TRACK_LABEL)];
function UniversitiesPage() {
	const { universities, circulars } = useCatalog();
	const [q, setQ] = (0, import_react.useState)("");
	const [track, setTrack] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("name");
	const [engineeringOnly, setEngineeringOnly] = (0, import_react.useState)(false);
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		const mapped = universities.map((uni) => {
			const primary = [...circulars.filter((item) => item.universityId === uni.id)].sort((a, b) => b.updatedOn.localeCompare(a.updatedOn))[0] ?? null;
			return {
				uni,
				primary,
				appStatus: primary ? deriveStatus(primary) : "not_announced",
				next: primary ? nextRelevantDay(primary) : null
			};
		}).filter(({ uni, appStatus }) => {
			if (track !== "all" && uni.track !== track) return false;
			if (engineeringOnly && uni.track !== "engineering" && !uni.tags.includes("engineering")) return false;
			if (status !== "all" && appStatus !== status) return false;
			if (!query) return true;
			return [
				uni.name,
				uni.shortName,
				uni.nameBn,
				uni.city,
				uni.id
			].join(" ").toLowerCase().includes(query);
		});
		mapped.sort((a, b) => {
			if (sort === "deadline") return (a.next ?? "9999").localeCompare(b.next ?? "9999");
			if (sort === "city") return a.uni.city.localeCompare(b.uni.city) || a.uni.name.localeCompare(b.uni.name);
			if (sort === "short") return a.uni.shortName.localeCompare(b.uni.shortName);
			return a.uni.name.localeCompare(b.uni.name);
		});
		return mapped;
	}, [
		universities,
		circulars,
		q,
		track,
		status,
		sort,
		engineeringOnly
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Directory",
			title: "All universities",
			lede: "Every public university on the UGC list is here, plus the three national admission systems and a set of private universities. A missing circular is a blank, not a rumour."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 border border-ink p-3 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tracking-widest text-mute",
						children: "SEARCH"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: controlClass,
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Name, short name, city"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: "CATEGORY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: controlClass,
					value: track,
					onChange: (e) => setTrack(e.target.value),
					children: TRACKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item,
						children: item === "all" ? "ALL CATEGORIES" : TRACK_LABEL[item].toUpperCase()
					}, item))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: "STATUS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: controlClass,
					value: status,
					onChange: (e) => setStatus(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "ALL STATUSES"
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
							value: "name",
							children: "UNIVERSITY NAME"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "short",
							children: "SHORT NAME"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "deadline",
							children: "NEAREST DATE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "city",
							children: "CITY"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2 border border-ink px-3 font-mono text-xs tracking-widest",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: engineeringOnly,
						onChange: (e) => setEngineeringOnly(e.target.checked)
					}), "ENGINEERING INCL. PRIVATE"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center font-mono text-xs text-mute md:col-span-2",
					children: [String(rows.length).padStart(2, "0"), " RECORDS"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 hidden md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-y border-ink font-mono text-xs tracking-widest text-mute",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "ID"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "UNIVERSITY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "CATEGORY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "STATUS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "NEXT DATE"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map(({ uni, appStatus, next }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-ink hover:bg-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3 font-display text-2xl font-bold uppercase leading-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/universities/$id",
								params: { id: uni.id },
								children: uni.shortName
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-3 pr-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/universities/$id",
								params: { id: uni.id },
								className: "text-sm",
								children: uni.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block font-mono text-xs text-mute",
								children: uni.city
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3 font-mono text-xs",
							children: TRACK_LABEL[uni.track].toUpperCase()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: appStatus })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 font-mono text-xs",
							children: next ? formatDay(next) : "NOT ANNOUNCED"
						})
					]
				}, uni.id)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-4 divide-y divide-ink border-y border-ink md:hidden",
			children: rows.map(({ uni, appStatus, next }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/universities/$id",
				params: { id: uni.id },
				className: "block py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-4xl font-bold uppercase leading-none",
							children: uni.shortName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: appStatus })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: uni.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-xs text-mute",
						children: [
							TRACK_LABEL[uni.track].toUpperCase(),
							" · ",
							uni.city,
							" · ",
							next ? formatDay(next) : "NOT ANNOUNCED"
						]
					})
				]
			}) }, uni.id))
		})
	] });
}
//#endregion
export { UniversitiesPage as component };

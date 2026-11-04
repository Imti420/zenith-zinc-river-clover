import { i as __toESM } from "../_runtime.mjs";
import { i as formatDay, o as relativeDay, r as daysUntil, s as todayISO } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useCatalog, m as usePersonal } from "./router-DAhf9lC1.mjs";
import { f as eventsFor, m as isUrgent, o as PageHead } from "./marks-B5AX3jYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/radar-BO1leLc6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RadarPage() {
	const { circulars, byId } = useCatalog();
	const pinned = usePersonal((s) => s.pinnedIds);
	const togglePin = usePersonal((s) => s.togglePin);
	const hydrated = usePersonal((s) => s.hydrated);
	const [onlyPinned, setOnlyPinned] = (0, import_react.useState)(false);
	const [kind, setKind] = (0, import_react.useState)("all");
	const today = todayISO();
	const events = (0, import_react.useMemo)(() => {
		return circulars.flatMap((item) => eventsFor(item)).filter((event) => onlyPinned ? pinned.includes(event.circularId) : true).filter((event) => kind === "all" ? true : event.kind === kind).sort((a, b) => a.day.localeCompare(b.day) || a.label.localeCompare(b.label));
	}, [
		circulars,
		onlyPinned,
		pinned,
		kind
	]);
	const ahead = events.filter((event) => event.day >= today);
	const elapsed = events.filter((event) => event.day < today).reverse();
	const clashes = (0, import_react.useMemo)(() => clashDays(circulars.flatMap((item) => eventsFor(item)), byId), [circulars, byId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Calendar",
			title: "Deadline radar",
			lede: "Nearest windows first. Red means a close date inside 14 days, or an opening or an exam inside 7 days. A clash is two institutions on the same test day."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [[
				["all", "All marks"],
				["opens", "Opens"],
				["closes", "Closes"],
				["exam", "Exams"],
				["admit", "Admit cards"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setKind(id),
				className: `h-11 border px-3 font-display text-sm uppercase tracking-widest ${kind === id ? "border-ink bg-ink text-paper" : "border-ink"}`,
				children: label
			}, id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setOnlyPinned((value) => !value),
				className: `h-11 border px-3 font-display text-sm uppercase tracking-widest ${onlyPinned ? "border-accent bg-accent text-paper" : "border-ink"}`,
				children: "Pinned only"
			})]
		}),
		clashes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 border border-ink p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-bold uppercase",
				children: "Clash register"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-ink",
				children: clashes.map((clash) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs",
						children: formatDay(clash.day)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: clash.labels.join(" · ")
					})]
				}, clash.day))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventList, {
			title: "Ahead",
			events: ahead,
			byId,
			pinned,
			togglePin,
			hydrated
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventList, {
			title: "Elapsed",
			events: elapsed,
			byId,
			pinned,
			togglePin,
			hydrated
		})
	] });
}
function EventList({ title, events, byId, pinned, togglePin, hydrated }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "border-b border-ink pb-2 font-display text-4xl font-bold uppercase",
				children: title
			}),
			events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-4 font-mono text-xs text-mute",
				children: "NOTHING IN THIS COLUMN."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: events.map((event) => {
				const uni = byId.get(event.universityId);
				const hot = isUrgent(event);
				const delta = daysUntil(event.day);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-1 gap-2 border-b border-ink py-3 md:grid-cols-[9rem_6rem_1fr_auto] md:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/circulars/$id",
							params: { id: event.circularId },
							className: hot ? "text-accent" : "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-mono text-sm",
								children: formatDay(event.day)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs",
								children: relativeDay(event.day)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-3xl font-bold uppercase leading-none",
							children: uni?.shortName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/circulars/$id",
							params: { id: event.circularId },
							className: "text-sm hover:text-accent",
							children: [
								event.label,
								event.time ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs text-mute",
									children: [" · ", event.time]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block font-mono text-xs text-mute",
									children: uni?.name
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hydrated,
							onClick: () => togglePin(event.circularId),
							className: "h-11 border border-ink px-3 font-mono text-xs tracking-widest disabled:opacity-40",
							children: pinned.includes(event.circularId) ? "PINNED" : delta >= 0 ? "PIN" : "PIN"
						})
					]
				}, event.id);
			}) })
		]
	});
}
function clashDays(events, byId) {
	const exams = events.filter((event) => event.kind === "exam");
	const groups = /* @__PURE__ */ new Map();
	for (const event of exams) {
		const list = groups.get(event.day) ?? [];
		list.push(event);
		groups.set(event.day, list);
	}
	return [...groups.entries()].map(([day, list]) => {
		const unis = [...new Set(list.map((event) => event.universityId))];
		return {
			day,
			labels: unis.map((id) => {
				const bits = list.filter((event) => event.universityId === id).map((event) => event.label);
				return `${byId.get(id)?.shortName ?? id.toUpperCase()} ${bits.join(", ")}`;
			}),
			count: unis.length
		};
	}).filter((clash) => clash.count > 1).sort((a, b) => a.day.localeCompare(b.day));
}
//#endregion
export { RadarPage as component };

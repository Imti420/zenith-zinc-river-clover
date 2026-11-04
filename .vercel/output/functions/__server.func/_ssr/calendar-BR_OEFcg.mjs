import { i as __toESM } from "../_runtime.mjs";
import { i as formatDay, n as cn, s as todayISO } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useCatalog, m as usePersonal } from "./router-DAhf9lC1.mjs";
import { f as eventsFor, l as TextButton, o as PageHead, p as evidenceLabel, u as controlClass } from "./marks-B5AX3jYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-BR_OEFcg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function iso(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function monthMatrix(year, month) {
	const first = new Date(year, month, 1);
	const start = new Date(first);
	start.setDate(1 - first.getDay());
	const days = [];
	for (let i = 0; i < 42; i += 1) {
		const day = new Date(start);
		day.setDate(start.getDate() + i);
		days.push(iso(day));
	}
	return days;
}
function weekDays(anchor) {
	const [y, m, d] = anchor.split("-").map(Number);
	const date = new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1);
	date.setDate(date.getDate() - date.getDay());
	return Array.from({ length: 7 }, (_, index) => {
		const day = new Date(date);
		day.setDate(date.getDate() + index);
		return iso(day);
	});
}
function shiftMonth(year, month, delta) {
	const date = new Date(year, month + delta, 1);
	return {
		year: date.getFullYear(),
		month: date.getMonth()
	};
}
function icsEscape(value) {
	return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}
function fold(line) {
	const parts = [];
	let rest = line;
	parts.push(rest.slice(0, 73));
	rest = rest.slice(73);
	while (rest.length) {
		parts.push(` ${rest.slice(0, 72)}`);
		rest = rest.slice(72);
	}
	return parts.join("\r\n");
}
function dateStamp(day, time) {
	const compact = day.replace(/-/g, "");
	if (time && /^\d{2}:\d{2}$/.test(time)) {
		const hhmm = time.replace(":", "");
		return {
			start: `DTSTART:${compact}T${hhmm}00`,
			end: `DTEND:${compact}T${hhmm}00`
		};
	}
	const [y, m, d] = day.split("-").map(Number);
	const next = new Date(y ?? 2026, (m ?? 1) - 1, (d ?? 1) + 1);
	return {
		start: `DTSTART;VALUE=DATE:${compact}`,
		end: `DTEND;VALUE=DATE:${iso(next).replace(/-/g, "")}`
	};
}
function toIcs(events) {
	const lines = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//IMTI//ADMISSION26//EN",
		"CALSCALE:GREGORIAN",
		"METHOD:PUBLISH",
		"X-WR-CALNAME:ADMISSION//26"
	];
	for (const event of events) {
		const when = dateStamp(event.day, event.time);
		const description = [
			event.confidenceLabel,
			event.personal ? "Personal desk event." : "From the ADMISSION//26 archive. Confirm against the cited source.",
			event.notes
		].filter(Boolean).join("\\n");
		lines.push("BEGIN:VEVENT");
		lines.push(fold(`UID:${icsEscape(event.id)}@admission26.imti`));
		lines.push(fold(`SUMMARY:${icsEscape(event.title)}`));
		lines.push(when.start);
		lines.push(when.end);
		lines.push(fold(`DESCRIPTION:${description}`));
		lines.push("END:VEVENT");
	}
	lines.push("END:VCALENDAR");
	return lines.join("\r\n");
}
function toneFor(kind) {
	if (kind === "closes") return "accent";
	if (kind === "exam") return "ink";
	if (kind === "opens") return "mute";
	return "signal";
}
function archiveEvents(circulars, shortNames) {
	return circulars.flatMap((circular) => eventsFor(circular).map((event) => ({
		id: event.id,
		day: event.day,
		time: event.time,
		title: `${shortNames.get(circular.universityId) ?? "RECORD"} · ${event.label}`,
		kind: event.kind,
		confidence: circular.confidence,
		confidenceLabel: evidenceLabel(circular.confidence, circular.publication),
		universityId: circular.universityId,
		circularId: circular.id,
		personal: false,
		completed: false,
		notes: "",
		remindDays: null
	})));
}
var WEEKDAYS = [
	"SUN",
	"MON",
	"TUE",
	"WED",
	"THU",
	"FRI",
	"SAT"
];
var KINDS = [
	{
		id: "closes",
		label: "Deadline"
	},
	{
		id: "exam",
		label: "Examination"
	},
	{
		id: "opens",
		label: "Application opens"
	},
	{
		id: "admit",
		label: "Admit card"
	},
	{
		id: "other",
		label: "Other"
	}
];
function CalendarPage() {
	const { circulars, byId } = useCatalog();
	const personal = usePersonal((s) => s.personalEvents);
	const shortlist = usePersonal((s) => s.shortlist);
	const hydrated = usePersonal((s) => s.hydrated);
	const addPersonalEvent = usePersonal((s) => s.addPersonalEvent);
	const updatePersonalEvent = usePersonal((s) => s.updatePersonalEvent);
	const deletePersonalEvent = usePersonal((s) => s.deletePersonalEvent);
	const today = todayISO();
	const [view, setView] = (0, import_react.useState)("month");
	const [cursor, setCursor] = (0, import_react.useState)(today);
	const [selected, setSelected] = (0, import_react.useState)(today);
	const [scope, setScope] = (0, import_react.useState)("all");
	const [hideDone, setHideDone] = (0, import_react.useState)(false);
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const names = (0, import_react.useMemo)(() => new Map([...byId.values()].map((uni) => [uni.id, uni.shortName])), [byId]);
	const events = (0, import_react.useMemo)(() => {
		const archive = archiveEvents(circulars, names).filter((event) => scope === "all" || event.universityId && shortlist.includes(event.universityId));
		const mine = personal.filter((event) => scope === "all" || !event.universityId || shortlist.includes(event.universityId)).filter((event) => hideDone ? !event.completed : true).map((event) => toCalendar(event, event.universityId ? names.get(event.universityId) ?? null : null));
		return [...archive, ...mine].sort((a, b) => a.day.localeCompare(b.day) || a.title.localeCompare(b.title));
	}, [
		circulars,
		names,
		personal,
		scope,
		shortlist,
		hideDone
	]);
	const year = Number(cursor.slice(0, 4));
	const month = Number(cursor.slice(5, 7)) - 1;
	const monthDays = monthMatrix(year, month);
	const week = weekDays(cursor);
	const monthKey = cursor.slice(0, 7);
	const visible = view === "month" ? events.filter((event) => event.day.startsWith(monthKey)) : view === "week" ? events.filter((event) => week.includes(event.day)) : events;
	const selectedEvents = events.filter((event) => event.day === selected);
	const active = events.find((event) => event.id === activeId) ?? null;
	const shift = (delta) => {
		if (view === "week") {
			const [y, m, d] = cursor.split("-").map(Number);
			const date = new Date(y ?? 2026, (m ?? 1) - 1, (d ?? 1) + delta * 7);
			setCursor(todayISO(date));
			return;
		}
		const next = shiftMonth(year, month, delta);
		setCursor(todayISO(new Date(next.year, next.month, 1)));
	};
	const download = () => {
		const blob = new Blob([toIcs(events)], { type: "text/calendar" });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = "admission26.ics";
		anchor.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Planning instrument",
			title: "Calendar",
			lede: "Deadlines, examinations, openings and admit-card dates from the archive, plus events you add on this desk. A date with a thin confidence stamp has not been treated as final.",
			aside: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
					tone: "paper",
					onClick: download,
					children: "Export .ics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
					tone: "ghost",
					onClick: () => {
						setCursor(today);
						setSelected(today);
					},
					children: "Today"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				[
					"month",
					"week",
					"agenda"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("h-11 border px-3 font-display text-sm font-semibold uppercase tracking-widest", view === item ? "border-ink bg-ink text-paper" : "border-ink"),
					onClick: () => setView(item),
					children: item
				}, item)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 border border-ink px-3 font-mono text-xs",
					onClick: () => shift(-1),
					children: "PREV"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 border border-ink px-3 font-mono text-xs",
					onClick: () => shift(1),
					children: "NEXT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl font-bold uppercase",
					children: view === "week" ? `${formatDay(week[0] ?? cursor)} – ${formatDay(week[6] ?? cursor)}` : formatDay(`${monthKey}-01`).slice(3)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: `${controlClass} h-11 w-auto`,
					value: scope,
					onChange: (event) => setScope(event.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All archive dates"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "shortlist",
						children: "Shortlist only"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2 border border-ink px-3 font-mono text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: hideDone,
						onChange: (event) => setHideDone(event.target.checked)
					}), "HIDE COMPLETED"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-4 flex flex-wrap gap-3 font-mono text-xs tracking-widest",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "inline-block h-3 w-3 bg-accent" }), " DEADLINE"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "inline-block h-3 w-3 bg-ink" }), " EXAMINATION"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "inline-block h-3 w-3 border border-ink bg-mute" }), " OPENS"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "inline-block h-3 w-3 bg-signal" }), " ADMIT / OTHER"]
				})
			]
		}),
		view === "month" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 border border-ink border-b-0",
				children: WEEKDAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border-b border-ink px-1 py-2 text-center font-mono text-xs text-mute",
					children: day
				}, day))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 border border-ink border-t-0",
				children: monthDays.map((day) => {
					const inMonth = day.startsWith(monthKey);
					const items = events.filter((event) => event.day === day);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setSelected(day);
							setActiveId(items[0]?.id ?? null);
						},
						className: cn("min-h-16 border-t border-r border-ink p-1 text-left md:min-h-28", !inMonth && "bg-panel", selected === day && "outline outline-2 outline-accent"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("inline-flex h-7 min-w-7 items-center justify-center font-mono text-xs", day === today && "bg-accent text-paper"),
								children: day.slice(8)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 hidden md:block",
								children: items.slice(0, 3).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventChip, { event }, event.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 flex gap-1 md:hidden",
								children: items.slice(0, 4).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: cn("h-2 w-2", dotClass(event)) }, event.id))
							})
						]
					}, day);
				})
			})]
		}) : null,
		view === "week" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-px bg-ink md:grid-cols-7",
			children: week.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: cn("bg-paper p-2", day === today && "outline outline-2 outline-accent"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "font-mono text-xs",
					onClick: () => setSelected(day),
					children: [
						WEEKDAYS[new Date(Number(day.slice(0, 4)), Number(day.slice(5, 7)) - 1, Number(day.slice(8))).getDay()],
						" ",
						day.slice(8)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid gap-1",
					children: events.filter((event) => event.day === day).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-left",
						onClick: () => {
							setSelected(day);
							setActiveId(event.id);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventChip, { event })
					}, event.id))
				})]
			}, day))
		}) : null,
		view === "agenda" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
			className: "mt-4 divide-y divide-ink border-y border-ink",
			children: [visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "py-4 text-sm",
				children: "Nothing dated in this range."
			}) : null, visible.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "grid w-full gap-2 py-3 text-left md:grid-cols-[9rem_1fr_auto]",
				onClick: () => {
					setSelected(event.day);
					setActiveId(event.id);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs",
						children: [formatDay(event.day), event.day === today ? " · TODAY" : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("font-display text-2xl font-bold uppercase leading-none", event.completed && "line-through"),
						children: event.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-mute",
						children: event.confidenceLabel
					})
				]
			}) }, event.id))]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border border-ink p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs tracking-widest text-mute",
						children: [formatDay(selected), selected === today ? " · TODAY" : ""]
					}),
					selectedEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm",
						children: "No events on this day."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 divide-y divide-ink border-y border-ink",
						children: selectedEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "w-full py-3 text-left",
							onClick: () => setActiveId(event.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventChip, { event }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block font-mono text-xs text-mute",
								children: event.confidenceLabel
							})]
						}) }, event.id))
					}),
					active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventDetail, { event: active }) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventForm, {
				hydrated,
				universities: [...byId.values()],
				editing: active?.personal ? personal.find((event) => event.id === active.id) ?? null : null,
				defaultDay: selected,
				onCreate: addPersonalEvent,
				onUpdate: updatePersonalEvent,
				onDelete: deletePersonalEvent
			})]
		})
	] });
}
function EventDetail({ event }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 border-t border-ink pt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl font-bold uppercase leading-none",
				children: event.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-xs tracking-widest",
				children: event.confidenceLabel
			}),
			event.time ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-xs",
				children: [event.time, " · BANGLADESH LOCAL"]
			}) : null,
			event.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: event.notes
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-3",
				children: [event.circularId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/circulars/$id",
					params: { id: event.circularId },
					className: "font-mono text-xs underline",
					children: "OPEN CIRCULAR"
				}) : null, event.universityId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/universities/$id",
					params: { id: event.universityId },
					className: "font-mono text-xs underline",
					children: "OPEN UNIVERSITY"
				}) : null]
			})
		]
	});
}
function EventForm({ hydrated, universities, editing, defaultDay, onCreate, onUpdate, onDelete }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [day, setDay] = (0, import_react.useState)(defaultDay);
	const [time, setTime] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("other");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [remind, setRemind] = (0, import_react.useState)("");
	const [universityId, setUniversityId] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (window.location.hash.replace("#", "") === "new-event") document.getElementById("new-event")?.scrollIntoView();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!editing) {
			setDay(defaultDay);
			return;
		}
		setTitle(editing.title);
		setDay(editing.day);
		setTime(editing.time ?? "");
		setKind(editing.kind);
		setNotes(editing.notes);
		setRemind(editing.remindDays == null ? "" : String(editing.remindDays));
		setUniversityId(editing.universityId ?? "");
	}, [editing, defaultDay]);
	const clear = () => {
		setTitle("");
		setTime("");
		setNotes("");
		setRemind("");
		setUniversityId("");
		setKind("other");
		setError("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		id: "new-event",
		className: "border border-ink p-4",
		onSubmit: (event) => {
			event.preventDefault();
			if (!title.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(day)) {
				setError("A personal event needs a title and a real date.");
				return;
			}
			const payload = {
				title: title.trim(),
				day,
				time: /^\d{2}:\d{2}$/.test(time) ? time : null,
				kind,
				notes: notes.trim(),
				remindDays: remind === "" ? null : Number(remind),
				universityId: universityId || null,
				circularId: null
			};
			if (editing) onUpdate(editing.id, payload);
			else onCreate({
				...payload,
				id: `pe-${Date.now().toString(36)}`,
				completed: false
			});
			if (!editing) clear();
			setError("");
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-bold uppercase",
				children: editing ? "Edit personal event" : "New personal event"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: "Archive dates are edited on the circular, not here. This form only writes events you own."
			}),
			!hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-mono text-xs text-mute",
				children: "RESTORING THIS DESK…"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: controlClass,
						placeholder: "Title",
						value: title,
						onChange: (event) => setTitle(event.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: controlClass,
						type: "date",
						value: day,
						onChange: (event) => setDay(event.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: controlClass,
						type: "time",
						value: time,
						onChange: (event) => setTime(event.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: controlClass,
						value: kind,
						onChange: (event) => setKind(event.target.value),
						children: KINDS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.label
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: controlClass,
						value: universityId,
						onChange: (event) => setUniversityId(event.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "No university link"
						}), universities.map((uni) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: uni.id,
							children: [
								uni.shortName,
								" — ",
								uni.name
							]
						}, uni.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: controlClass,
						value: remind,
						onChange: (event) => setRemind(event.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "No reminder"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "0",
								children: "On the day"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "1",
								children: "1 day before"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "3",
								children: "3 days before"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "7",
								children: "7 days before"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${controlClass} h-24 py-2`,
						placeholder: "Notes",
						value: notes,
						onChange: (event) => setNotes(event.target.value)
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-accent",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
								type: "submit",
								disabled: !hydrated,
								children: editing ? "Save event" : "Add event"
							}),
							editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
								tone: "paper",
								onClick: () => onUpdate(editing.id, { completed: !editing.completed }),
								children: editing.completed ? "Mark open" : "Mark completed"
							}) : null,
							editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
								tone: "ghost",
								onClick: () => {
									if (confirm("Delete this personal event?")) onDelete(editing.id);
								},
								children: "Delete"
							}) : null
						]
					})
				]
			})
		]
	});
}
function toCalendar(event, shortName) {
	return {
		id: event.id,
		day: event.day,
		time: event.time,
		title: shortName ? `${shortName} · ${event.title}` : event.title,
		kind: event.kind,
		confidence: "personal",
		confidenceLabel: "PERSONAL DESK",
		universityId: event.universityId,
		circularId: event.circularId,
		personal: true,
		completed: event.completed,
		notes: event.notes,
		remindDays: event.remindDays
	};
}
function dotClass(event) {
	const tone = toneFor(event.kind);
	if (tone === "accent") return "bg-accent";
	if (tone === "ink") return "bg-ink";
	if (tone === "mute") return "bg-mute";
	return "bg-signal";
}
function EventChip({ event }) {
	const tone = toneFor(event.kind);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("mt-1 block truncate border-l-4 px-1 font-mono text-xs leading-5", event.completed && "line-through", tone === "accent" && "border-accent", tone === "ink" && "border-ink", tone === "mute" && "border-mute text-mute", tone === "signal" && "border-signal text-signal"),
		children: event.title
	});
}
//#endregion
export { CalendarPage as component };

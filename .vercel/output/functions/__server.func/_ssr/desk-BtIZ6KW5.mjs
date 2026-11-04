import { i as __toESM } from "../_runtime.mjs";
import { i as formatDay, s as todayISO } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as PROGRESS_LABEL, b as usePublishedReport, g as NOTE_KIND_LABEL, h as DESK_SECTION_LABEL, l as useCatalog, m as usePersonal } from "./router-DAhf9lC1.mjs";
import { c as StatusPill, d as deriveStatus, f as eventsFor, l as TextButton, o as PageHead, u as controlClass } from "./marks-B5AX3jYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-BtIZ6KW5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STAGES = [
	{
		label: "Not started",
		test: (progress) => !progress
	},
	{
		label: "Researching",
		test: (progress) => progress === "planning" || progress === "researching"
	},
	{
		label: "Ready to apply",
		test: (progress) => progress === "ready"
	},
	{
		label: "Applied",
		test: (progress) => progress === "applied"
	},
	{
		label: "Admit card collected",
		test: (progress) => progress === "admit"
	},
	{
		label: "Examination completed",
		test: (progress) => progress === "appeared" || progress === "result"
	}
];
function DeskPage() {
	const personal = usePersonal();
	const review = usePublishedReport((s) => s.report?.summary.reviewRequired ?? 0);
	const layout = personal.deskLayout;
	const [showAllDeadlines, setShowAllDeadlines] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Personal",
			title: "My admission desk",
			lede: "Your command center for this season. Shortlist, deadlines, progress and notes stay in this browser. The archive underneath is unchanged until you edit it."
		}),
		!personal.hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 font-mono text-xs text-mute",
			children: "RESTORING THIS DESK…"
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-8",
			children: layout.map((section, index) => section.hidden ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: section.id === "notes" ? "desk-notes" : void 0,
				className: "border border-ink p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl font-bold uppercase",
						children: DESK_SECTION_LABEL[section.id]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 border border-ink px-3 font-mono text-xs",
								onClick: () => move(layout, index, -1, personal.setDeskLayout),
								disabled: index === 0,
								children: "UP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 border border-ink px-3 font-mono text-xs",
								onClick: () => move(layout, index, 1, personal.setDeskLayout),
								disabled: index === layout.length - 1,
								children: "DOWN"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 border border-ink px-3 font-mono text-xs",
								onClick: () => personal.setDeskLayout(layout.map((item) => item.id === section.id ? {
									...item,
									hidden: true
								} : item)),
								children: "HIDE"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBody, {
					id: section.id,
					showAllDeadlines,
					onToggleDeadlines: () => setShowAllDeadlines((value) => !value),
					review
				})]
			}, section.id))
		}),
		layout.some((section) => section.hidden) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 border border-ink p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-widest text-mute",
				children: "HIDDEN SECTIONS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: layout.filter((section) => section.hidden).map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TextButton, {
					tone: "paper",
					onClick: () => personal.setDeskLayout(layout.map((item) => item.id === section.id ? {
						...item,
						hidden: false
					} : item)),
					children: ["Show ", DESK_SECTION_LABEL[section.id]]
				}, section.id))
			})]
		}) : null
	] });
}
function SectionBody({ id, showAllDeadlines, onToggleDeadlines, review }) {
	const catalog = useCatalog();
	const shortlist = usePersonal((s) => s.shortlist);
	const progress = usePersonal((s) => s.progress);
	const today = todayISO();
	if (id === "actions") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActions, {
		review,
		universities: catalog.universities
	});
	if (id === "deadlines") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Deadlines, {
		showAll: showAllDeadlines,
		onToggle: onToggleDeadlines,
		today,
		catalog,
		shortlist
	});
	if (id === "shortlist") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortlistBlock, {
		catalog,
		shortlist,
		today
	});
	if (id === "progress") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBlock, {
		catalog,
		shortlist,
		progress
	});
	if (id === "dates") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatesBlock, { catalog });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesBlock, {});
}
function move(layout, index, delta, setDeskLayout) {
	const next = index + delta;
	if (next < 0 || next >= layout.length) return;
	const copy = [...layout];
	const [item] = copy.splice(index, 1);
	if (!item) return;
	copy.splice(next, 0, item);
	setDeskLayout(copy);
}
function QuickActions({ review, universities }) {
	const shortlist = usePersonal((s) => s.shortlist);
	const toggleShortlist = usePersonal((s) => s.toggleShortlist);
	const [pick, setPick] = (0, import_react.useState)(universities.find((uni) => !shortlist.includes(uni.id))?.id ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/calendar",
					hash: "new-event",
					className: "inline-flex h-11 items-center border border-ink bg-ink px-3 font-display text-sm font-semibold uppercase tracking-widest text-paper",
					children: "Add a personal event"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#desk-notes",
					className: "inline-flex h-11 items-center border border-ink px-3 font-display text-sm font-semibold uppercase tracking-widest",
					children: "Add a note"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/circulars",
					className: "inline-flex h-11 items-center border border-ink px-3 font-display text-sm font-semibold uppercase tracking-widest",
					children: "Circular archive"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/monitor",
					className: "inline-flex h-11 items-center border border-accent px-3 font-display text-sm font-semibold uppercase tracking-widest text-accent",
					children: ["New findings ", review > 0 ? `(${review})` : ""]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-col gap-2 sm:flex-row",
			onSubmit: (event) => {
				event.preventDefault();
				if (pick) toggleShortlist(pick);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: controlClass,
				value: pick,
				onChange: (event) => setPick(event.target.value),
				children: universities.map((uni) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: uni.id,
					children: [
						shortlist.includes(uni.id) ? "ON LIST · " : "",
						uni.shortName,
						" — ",
						uni.name
					]
				}, uni.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
				type: "submit",
				children: shortlist.includes(pick) ? "Remove from shortlist" : "Add to shortlist"
			})]
		})]
	});
}
function Deadlines({ showAll, onToggle, today, catalog, shortlist }) {
	const rows = catalog.circulars.flatMap((circular) => eventsFor(circular).filter((event) => event.kind === "closes" || event.kind === "exam").map((event) => ({
		event,
		circular
	}))).filter((row) => row.event.day >= today).sort((a, b) => a.event.day.localeCompare(b.event.day));
	const preferred = rows.filter((row) => shortlist.includes(row.circular.universityId));
	const shown = showAll ? rows : preferred.length ? preferred : rows.slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "font-mono text-xs underline",
		onClick: onToggle,
		children: showAll ? "SHOW SHORTLIST FIRST" : "SHOW ALL DEADLINES"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
		className: "mt-3 divide-y divide-ink border-y border-ink",
		children: [shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "py-3 text-sm",
			children: "No upcoming deadlines are stored."
		}) : null, shown.map(({ event, circular }) => {
			const uni = catalog.byId.get(circular.universityId);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-2 py-3 md:grid-cols-[8rem_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs",
					children: formatDay(event.day)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/circulars/$id",
					params: { id: circular.id },
					className: "hover:text-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl font-bold uppercase leading-none",
						children: uni?.shortName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm",
						children: event.label
					})]
				})]
			}, event.id);
		})]
	})] });
}
function ShortlistBlock({ catalog, shortlist, today }) {
	const rows = catalog.universities.filter((uni) => shortlist.includes(uni.id));
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm",
		children: [
			"The shortlist is empty. Add one above, or open the ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/universities",
				className: "underline",
				children: "directory"
			}),
			"."
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "divide-y divide-ink border-y border-ink",
		children: rows.map((uni) => {
			const circular = catalog.circulars.find((item) => item.universityId === uni.id);
			const next = circular ? eventsFor(circular).filter((event) => event.day >= today).sort((a, b) => a.day.localeCompare(b.day))[0] : null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-2 py-3 md:grid-cols-[8rem_1fr_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/universities/$id",
						params: { id: uni.id },
						className: "font-display text-3xl font-bold uppercase leading-none",
						children: uni.shortName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: uni.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-xs text-mute",
						children: next ? `${next.label.toUpperCase()} ${formatDay(next.day)}` : "NO DATED EVENT ON FILE"
					})] }),
					circular ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: deriveStatus(circular) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-mute",
						children: "NO CIRCULAR"
					})
				]
			}, uni.id);
		})
	});
}
function ProgressBlock({ catalog, shortlist, progress }) {
	const rows = (0, import_react.useMemo)(() => {
		const ids = /* @__PURE__ */ new Set([...Object.keys(progress), ...shortlist.flatMap((id) => catalog.circulars.filter((item) => item.universityId === id).map((item) => item.id))]);
		return catalog.circulars.filter((item) => ids.has(item.id));
	}, [
		catalog.circulars,
		progress,
		shortlist
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 border border-ink md:grid-cols-3",
			children: STAGES.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-ink border-r border-b p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl font-bold tabular-nums",
					children: String(rows.filter((row) => stage.test(progress[row.id])).length).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-xs tracking-widest text-mute",
					children: stage.label.toUpperCase()
				})]
			}, stage.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-4 divide-y divide-ink border-y border-ink",
			children: [rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "py-3 text-sm",
				children: "Shortlist a university or set a progress mark to fill this board."
			}) : null, rows.map((row) => {
				const uni = catalog.byId.get(row.universityId);
				const mark = progress[row.id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-baseline justify-between gap-2 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/circulars/$id",
						params: { id: row.id },
						className: "font-display text-2xl font-bold uppercase",
						children: uni?.shortName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tracking-widest",
						children: mark ? PROGRESS_LABEL[mark].toUpperCase() : "NOT STARTED"
					})]
				}, row.id);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 font-mono text-xs text-mute",
			children: [
				"Admitted and not-selected marks stay on the ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/tracker",
					className: "underline",
					children: "application tracker"
				}),
				"."
			]
		})
	] });
}
function DatesBlock({ catalog }) {
	const events = usePersonal((s) => s.personalEvents);
	const pinned = usePersonal((s) => s.pinnedIds);
	const pinnedEvents = catalog.circulars.filter((circular) => pinned.includes(circular.id)).flatMap((circular) => eventsFor(circular).map((event) => ({
		id: event.id,
		day: event.day,
		title: event.label,
		circularId: circular.id,
		universityId: circular.universityId
	})));
	const mine = [...events].sort((a, b) => a.day.localeCompare(b.day));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-widest text-mute",
				children: "PERSONAL"
			}),
			mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: "No personal dates yet."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 divide-y divide-ink border-y border-ink",
				children: mine.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/calendar",
						className: "font-display text-2xl font-bold uppercase",
						children: event.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-mute",
						children: [formatDay(event.day), event.completed ? " · DONE" : ""]
					})]
				}, event.id))
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-widest text-mute",
				children: "PINNED CIRCULARS"
			}),
			pinnedEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: "Pin a deadline from a circular to park it here."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 divide-y divide-ink border-y border-ink",
				children: pinnedEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/circulars/$id",
						params: { id: event.circularId },
						className: "text-sm",
						children: [
							catalog.byId.get(event.universityId)?.shortName,
							" · ",
							event.title
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-mute",
						children: formatDay(event.day)
					})]
				}, event.id))
			})
		] })]
	});
}
function NotesBlock() {
	const notes = usePersonal((s) => s.deskNotes);
	const addDeskNote = usePersonal((s) => s.addDeskNote);
	const updateDeskNote = usePersonal((s) => s.updateDeskNote);
	const deleteDeskNote = usePersonal((s) => s.deleteDeskNote);
	const universities = useCatalog().universities;
	const [kind, setKind] = (0, import_react.useState)("comparison");
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [universityId, setUniversityId] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-3",
		onSubmit: (event) => {
			event.preventDefault();
			if (!title.trim() || !body.trim()) return;
			const note = {
				id: `note-${Date.now().toString(36)}`,
				kind,
				title: title.trim(),
				body: body.trim(),
				universityId: universityId || null,
				updatedAt: todayISO()
			};
			addDeskNote(note);
			setTitle("");
			setBody("");
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: controlClass,
					value: kind,
					onChange: (event) => setKind(event.target.value),
					children: Object.keys(NOTE_KIND_LABEL).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: key,
						children: NOTE_KIND_LABEL[key]
					}, key))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: controlClass,
					value: universityId,
					onChange: (event) => setUniversityId(event.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "No university"
					}), universities.map((uni) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: uni.id,
						children: uni.shortName
					}, uni.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: controlClass,
				placeholder: "Title",
				value: title,
				onChange: (event) => setTitle(event.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: `${controlClass} h-28 py-2`,
				placeholder: "Comparison, eligibility, reminder, strategy",
				value: body,
				onChange: (event) => setBody(event.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
				type: "submit",
				children: "Add note"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "mt-4 divide-y divide-ink border-y border-ink",
		children: [notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "py-3 text-sm",
			children: "No desk notes yet."
		}) : null, notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs tracking-widest text-mute",
					children: [
						NOTE_KIND_LABEL[note.kind].toUpperCase(),
						" · ",
						formatDay(note.updatedAt)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: `${controlClass} mt-2`,
					value: note.title,
					onChange: (event) => updateDeskNote(note.id, {
						title: event.target.value,
						updatedAt: todayISO()
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${controlClass} mt-2 h-24 py-2`,
					value: note.body,
					onChange: (event) => updateDeskNote(note.id, {
						body: event.target.value,
						updatedAt: todayISO()
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-2 font-mono text-xs underline",
					onClick: () => deleteDeskNote(note.id),
					children: "DELETE NOTE"
				})
			]
		}, note.id))]
	})] });
}
//#endregion
export { DeskPage as component };

import { i as formatDay } from "./_ssr/cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, b as Link, x as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { b as usePublishedReport, l as useCatalog, m as usePersonal, r as Route$2 } from "./_ssr/router-DAhf9lC1.mjs";
import { c as StatusPill, d as deriveStatus, f as eventsFor, i as Fact, n as EvidenceStamp, r as ExternalLink, s as SectionLabel, t as Announced } from "./_ssr/marks-B5AX3jYA.mjs";
import { t as AmendCircular } from "./_ssr/amend-81lLGICN.mjs";
import { n as ProgressSelect, r as RecordActions, t as NoteBox } from "./_ssr/actions-C1naoFjL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-BQfE6afw.js
var import_jsx_runtime = require_jsx_runtime();
function CircularPage() {
	const { id } = Route$2.useParams();
	const navigate = useNavigate();
	const { circulars, byId } = useCatalog();
	const hideCircular = usePersonal((s) => s.hideCircular);
	const verifiedOn = usePersonal((s) => s.verifiedOn);
	const decisions = usePersonal((s) => s.proposalDecisions);
	const applied = (usePublishedReport((s) => s.report?.applied) ?? []).filter((item) => item.circularId === id && item.reliable && decisions[item.id] !== "rejected");
	const amended = usePersonal((s) => Boolean(s.circularPatches[id]) || s.customCirculars.some((item) => item.id === id));
	const circular = circulars.find((item) => item.id === id);
	if (!circular) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-5xl font-bold uppercase",
		children: "Circular not on file"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/circulars",
		className: "mt-4 inline-block font-mono text-sm underline",
		children: "Back to the archive"
	})] });
	const uni = byId.get(circular.universityId);
	const timeline = eventsFor(circular);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-xs tracking-widest text-mute",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/circulars",
				className: "underline underline-offset-4",
				children: "CIRCULAR ARCHIVE"
			}), uni ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" / ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/universities/$id",
				params: { id: uni.id },
				className: "underline underline-offset-4",
				children: uni.shortName
			})] }) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mt-4 border-b border-ink pb-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: deriveStatus(circular) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceStamp, { circular }),
						amended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tracking-widest text-accent",
							children: "DESK COPY"
						}) : null,
						applied.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tracking-widest text-signal",
							children: "STRUCTURED OVERLAY"
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-display text-5xl font-bold uppercase leading-none md:text-7xl",
					children: uni?.shortName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 max-w-4xl font-display text-3xl font-semibold uppercase leading-tight md:text-5xl",
					children: circular.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-3xl text-sm text-pretty",
					children: circular.summary
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
				universityId: uni?.id,
				circularId: circular.id
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Timeline" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-4 border-t border-ink",
					children: [timeline.map((event, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[2.5rem_1fr] gap-3 border-b border-ink py-3 md:grid-cols-[2.5rem_14rem_1fr]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-mute",
								children: String(index + 1).padStart(2, "0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, {
								day: event.day,
								time: event.time
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: event.label
							})
						]
					}, event.id)), !circular.admitCardOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[2.5rem_1fr] border-b border-ink py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-mute",
							children: "—"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-mute",
							children: "NOT ANNOUNCED"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm",
							children: "Admit card"
						})] })]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Eligibility" }), circular.eligibility.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 list-disc space-y-2 pl-5 text-sm",
						children: circular.eligibility.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-mono text-sm text-mute",
						children: "NOT ANNOUNCED"
					})]
				}),
				circular.units.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Units" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 divide-y divide-ink border-y border-ink",
						children: circular.units.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-1 py-3 md:grid-cols-[6rem_1fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl font-bold uppercase",
								children: unit.code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm",
								children: unit.detail || "NOT ANNOUNCED"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block font-mono text-xs text-mute",
								children: [
									formatDay(unit.examDate),
									unit.examTime ? ` · ${unit.examTime}` : "",
									" · ",
									unit.centre || "CENTRE NOT STATED"
								]
							})] })]
						}, unit.code))
					})]
				}) : null,
				circular.notes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Desk notes from the source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 list-disc space-y-2 pl-5 text-sm",
						children: circular.notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: note }, note))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Sources" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: circular.confidenceNote
						}),
						circular.sources.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-mono text-sm text-mute",
							children: "NO SOURCE URL LOGGED"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 divide-y divide-ink border-y border-ink",
							children: circular.sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
									href: source.url,
									children: source.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-mono text-xs text-mute",
									children: ["PUBLISHED ", formatDay(source.published)]
								})]
							}, source.url))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-mono text-xs text-mute",
							children: [
								"LAST CITED ",
								formatDay(circular.updatedOn),
								verifiedOn[circular.id] ? ` · MARKED VERIFIED ON THIS DESK ${formatDay(verifiedOn[circular.id])}` : " · NOT VERIFIED ON THIS DESK"
							]
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-fit border border-ink p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold uppercase",
						children: "Docket"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Session",
						children: circular.session
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Opens",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, {
							day: circular.applicationOpens,
							time: circular.opensAt
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Closes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, {
							day: circular.applicationCloses,
							time: circular.closesAt
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Admit card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, { day: circular.admitCardOn })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Result",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, { day: circular.resultOn })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Classes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, { day: circular.classesBegin })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Fee",
						children: circular.feeBdt == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-mute",
							children: "NOT ANNOUNCED"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-sm",
							children: [
								"BDT ",
								circular.feeBdt.toLocaleString("en-BD"),
								" ",
								circular.feeNote
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Seats",
						children: circular.seats == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-mute",
							children: "NOT ANNOUNCED"
						}) : circular.seats
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Official PDF",
						children: circular.pdfUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							href: circular.pdfUrl,
							children: "Open PDF"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-mute",
							children: "NOT ON FILE"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Application portal",
						children: uni?.admissionUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							href: uni.admissionUrl,
							children: "Open portal"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-mute",
							children: "NOT ANNOUNCED"
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid max-w-xl gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs tracking-widest text-mute",
				children: "YOUR PROGRESS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressSelect, { id: circular.id })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteBox, {
				id: circular.id,
				label: "Personal note"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmendCircular, { circular })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-4 h-11 border border-ink px-3 font-mono text-xs tracking-widest text-accent",
			onClick: () => {
				if (confirm("Remove this circular from the desk?")) {
					hideCircular(circular.id);
					navigate({ to: "/circulars" });
				}
			},
			children: "REMOVE FROM ARCHIVE"
		})
	] });
}
//#endregion
export { CircularPage as component };

import { C as require_jsx_runtime, b as Link, x as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as blankCircular, l as useCatalog, m as usePersonal, n as Route, y as TRACK_LABEL } from "./_ssr/router-DAhf9lC1.mjs";
import { a as Monogram, c as StatusPill, d as deriveStatus, f as eventsFor, i as Fact, n as EvidenceStamp, r as ExternalLink, s as SectionLabel, t as Announced } from "./_ssr/marks-B5AX3jYA.mjs";
import { n as AmendUniversity } from "./_ssr/amend-81lLGICN.mjs";
import { n as ProgressSelect, r as RecordActions, t as NoteBox } from "./_ssr/actions-C1naoFjL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-BEfLHSH-.js
var import_jsx_runtime = require_jsx_runtime();
function UniversityPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const { universities, circulars } = useCatalog();
	const addCircular = usePersonal((s) => s.addCircular);
	const hideUniversity = usePersonal((s) => s.hideUniversity);
	const uni = universities.find((item) => item.id === id);
	if (!uni) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-5xl font-bold uppercase",
		children: "Not in the directory"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/universities",
		className: "mt-4 inline-block font-mono text-sm underline",
		children: "Back to all universities"
	})] });
	const primary = circulars.filter((item) => item.universityId === uni.id)[0] ?? null;
	const timeline = primary ? eventsFor(primary) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-xs tracking-widest text-mute",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/universities",
					className: "underline underline-offset-4",
					children: "ALL UNIVERSITIES"
				}),
				" / ",
				uni.id.toUpperCase()
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-col gap-4 border-b border-ink pb-6 md:flex-row md:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, { text: uni.shortName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-6xl font-bold uppercase leading-none md:text-8xl",
						children: uni.shortName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-lg",
						children: uni.name
					}),
					uni.nameBn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mute",
						children: uni.nameBn
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-xs tracking-widest text-mute",
						children: [
							TRACK_LABEL[uni.track].toUpperCase(),
							" · ",
							uni.city.toUpperCase() || "CITY NOT LOGGED",
							" ·",
							" ",
							uni.kind === "system" ? "SYSTEM" : "INSTITUTION"
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
				universityId: uni.id,
				circularId: primary?.id
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 border border-ink px-3 font-display text-sm font-semibold uppercase tracking-widest hover:bg-ink hover:text-paper",
				onClick: () => {
					const circular = blankCircular(uni.id, `${uni.shortName} admission 2026–27`);
					addCircular(circular);
					navigate({
						to: "/circulars/$id",
						params: { id: circular.id }
					});
				},
				children: "Log a circular"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Admission timeline" }),
				timeline.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 border border-ink p-4 text-sm",
					children: [
						"No notice is on file for this record. Application dates, the admit card, the test and the fee are",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: "NOT ANNOUNCED"
						}),
						"."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 border-t border-ink",
					children: timeline.map((event, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[2rem_1fr] gap-3 border-b border-ink py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-mute",
							children: String(index + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-mono text-sm",
							children: event.day ? event.label : event.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, {
							day: event.day,
							time: event.time
						})] })]
					}, event.id))
				}),
				primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: deriveStatus(primary) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceStamp, { circular: primary })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl font-bold uppercase leading-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/circulars/$id",
								params: { id: primary.id },
								className: "hover:text-accent",
								children: primary.title
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-3xl text-sm text-pretty",
							children: primary.summary
						})
					]
				}) : null,
				primary && primary.units.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Unit-wise requirements" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[36rem] border-collapse text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-y border-ink font-mono text-xs tracking-widest text-mute",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 font-medium",
										children: "UNIT"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 font-medium",
										children: "WHAT IS KNOWN"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-3 font-medium",
										children: "EXAM"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "CENTRE"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: primary.units.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-ink align-top",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-3 font-display text-2xl font-bold uppercase",
										children: unit.code
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-3",
										children: unit.detail || "NOT ANNOUNCED"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, {
											day: unit.examDate,
											time: unit.examTime
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3",
										children: unit.centre || "NOT ANNOUNCED"
									})
								]
							}, unit.code)) })]
						})
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Eligibility" }), primary && primary.eligibility.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 list-disc space-y-2 pl-5 text-sm",
						children: primary.eligibility.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-mono text-sm text-mute",
						children: "NOT ANNOUNCED"
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "border border-ink p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold uppercase",
						children: "Record"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Application status",
						children: primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: deriveStatus(primary) }) : "NOT ANNOUNCED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Opens",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, {
							day: primary?.applicationOpens ?? null,
							time: primary?.opensAt
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Closes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, {
							day: primary?.applicationCloses ?? null,
							time: primary?.closesAt
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Admit card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Announced, { day: primary?.admitCardOn ?? null })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Fee",
						children: primary?.feeBdt == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-mute",
							children: "NOT ANNOUNCED"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-sm",
							children: ["BDT ", primary.feeBdt.toLocaleString("en-BD")]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Seats",
						children: primary?.seats == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-mute",
							children: "NOT ANNOUNCED"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm",
							children: primary.seats.toLocaleString("en-BD")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Official website",
						children: uni.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							href: uni.website,
							children: uni.website.replace(/^https?:\/\//, "")
						}) : "NOT LISTED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Application portal",
						children: uni.admissionUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							href: uni.admissionUrl,
							children: uni.admissionUrl.replace(/^https?:\/\//, "")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-mute",
							children: "NOT ANNOUNCED"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Official PDF",
						children: primary?.pdfUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							href: primary.pdfUrl,
							children: "Open PDF"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-mute",
							children: "NOT ON FILE"
						})
					}),
					uni.directoryNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-pretty",
						children: uni.directoryNote
					}) : null
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteBox, {
					id: uni.id,
					label: "Personal note — stays on this computer"
				}),
				primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tracking-widest text-mute",
						children: "APPLICATION PROGRESS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressSelect, { id: primary.id })]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmendUniversity, { university: uni }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 w-fit border border-ink px-3 font-mono text-xs tracking-widest text-accent",
					onClick: () => {
						if (confirm(`Hide ${uni.shortName} from this desk?`)) {
							hideUniversity(uni.id);
							navigate({ to: "/universities" });
						}
					},
					children: "HIDE FROM DIRECTORY"
				})
			]
		})
	] });
}
//#endregion
export { UniversityPage as component };

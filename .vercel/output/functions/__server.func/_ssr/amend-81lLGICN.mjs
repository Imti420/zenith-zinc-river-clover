import { i as __toESM } from "../_runtime.mjs";
import { s as todayISO } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as isCustomUniversity, m as usePersonal, s as isCustomCircular, v as SYSTEM_LABEL, y as TRACK_LABEL } from "./router-DAhf9lC1.mjs";
import { l as TextButton, u as controlClass } from "./marks-B5AX3jYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/amend-81lLGICN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TRACKS = Object.keys(TRACK_LABEL);
var SYSTEMS = Object.keys(SYSTEM_LABEL);
var CONFIDENCE = [
	"notice",
	"reported",
	"preliminary",
	"not-announced"
];
var PUBLICATION = [
	"none",
	"decision",
	"notice",
	"circular"
];
function clean(value) {
	const next = value.trim();
	return next ? next : null;
}
function lines(value) {
	return value.split("\n").map((line) => line.trim()).filter(Boolean);
}
function AmendUniversity({ university }) {
	const saveUniversity = usePersonal((s) => s.saveUniversity);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(university);
	const [error, setError] = (0, import_react.useState)("");
	const save = () => {
		if (!form.name.trim() || !form.shortName.trim()) {
			setError("Name and short name are required.");
			return;
		}
		for (const url of [form.website, form.admissionUrl]) if (url && !/^https?:\/\//i.test(url)) {
			setError("Links must start with http:// or https://");
			return;
		}
		saveUniversity(university.id, {
			name: form.name.trim(),
			shortName: form.shortName.trim(),
			nameBn: form.nameBn.trim(),
			track: form.track,
			city: form.city.trim(),
			website: clean(form.website ?? ""),
			admissionUrl: clean(form.admissionUrl ?? ""),
			directoryNote: form.directoryNote.trim(),
			tags: form.tags
		}, isCustomUniversity(university.id));
		setError("");
		setOpen(false);
	};
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
		tone: "paper",
		onClick: () => setOpen(true),
		children: "Amend record"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-4 border border-ink p-4",
		onSubmit: (event) => {
			event.preventDefault();
			save();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-widest text-mute",
				children: "DESK AMENDMENT · DOES NOT INVENT A SOURCE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Short name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							value: form.shortName,
							onChange: (e) => setForm({
								...form,
								shortName: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Bangla name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							value: form.nameBn,
							onChange: (e) => setForm({
								...form,
								nameBn: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Category",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: controlClass,
							value: form.track,
							onChange: (e) => setForm({
								...form,
								track: e.target.value
							}),
							children: TRACKS.map((track) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: track,
								children: TRACK_LABEL[track]
							}, track))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "City",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							value: form.city,
							onChange: (e) => setForm({
								...form,
								city: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Official website",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							value: form.website ?? "",
							onChange: (e) => setForm({
								...form,
								website: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Application portal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							value: form.admissionUrl ?? "",
							onChange: (e) => setForm({
								...form,
								admissionUrl: e.target.value
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Directory note",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${controlClass} h-28 py-2`,
					value: form.directoryNote,
					onChange: (e) => setForm({
						...form,
						directoryNote: e.target.value
					})
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-accent",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
					type: "submit",
					children: "Save amendment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
					tone: "ghost",
					onClick: () => setOpen(false),
					children: "Cancel"
				})]
			})
		]
	});
}
function AmendCircular({ circular }) {
	const saveCircular = usePersonal((s) => s.saveCircular);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [unitsText, setUnitsText] = (0, import_react.useState)(unitsToText(circular.units));
	const [form, setForm] = (0, import_react.useState)({
		title: circular.title,
		summary: circular.summary,
		session: circular.session,
		system: circular.system,
		publication: circular.publication,
		confidence: circular.confidence,
		confidenceNote: circular.confidenceNote,
		applicationOpens: circular.applicationOpens ?? "",
		opensAt: circular.opensAt ?? "",
		applicationCloses: circular.applicationCloses ?? "",
		closesAt: circular.closesAt ?? "",
		admitCardOn: circular.admitCardOn ?? "",
		examDate: circular.examDate ?? "",
		resultOn: circular.resultOn ?? "",
		classesBegin: circular.classesBegin ?? "",
		fee: circular.feeBdt == null ? "" : String(circular.feeBdt),
		feeNote: circular.feeNote,
		seats: circular.seats == null ? "" : String(circular.seats),
		pdfUrl: circular.pdfUrl ?? "",
		sourceUrl: circular.sources[0]?.url ?? "",
		sourceLabel: circular.sources[0]?.label ?? "",
		eligibility: circular.eligibility.join("\n"),
		notes: circular.notes.join("\n")
	});
	const save = () => {
		for (const url of [form.pdfUrl, form.sourceUrl]) if (url.trim() && !/^https?:\/\//i.test(url.trim())) {
			setError("Links must start with http:// or https://");
			return;
		}
		const fee = form.fee.trim() ? Number(form.fee) : null;
		const seats = form.seats.trim() ? Number(form.seats) : null;
		if (form.fee.trim() && !Number.isFinite(fee) || form.seats.trim() && !Number.isFinite(seats)) {
			setError("Fee and seats must be numbers, or left blank.");
			return;
		}
		const sources = [...circular.sources];
		if (form.sourceUrl.trim()) {
			const next = {
				label: form.sourceLabel.trim() || "Source logged on this desk",
				url: form.sourceUrl.trim(),
				published: todayISO()
			};
			if (sources[0]?.url === circular.sources[0]?.url && form.sourceUrl.trim() !== circular.sources[0]?.url) sources.unshift(next);
			else if (!sources.length) sources.push(next);
			else sources[0] = {
				...sources[0],
				label: next.label,
				url: next.url
			};
		}
		saveCircular(circular.id, {
			title: form.title.trim(),
			summary: form.summary.trim(),
			session: form.session.trim() || "2026-27",
			system: form.system,
			publication: form.publication,
			confidence: form.confidence,
			confidenceNote: form.confidenceNote.trim(),
			applicationOpens: clean(form.applicationOpens),
			opensAt: clean(form.opensAt),
			applicationCloses: clean(form.applicationCloses),
			closesAt: clean(form.closesAt),
			admitCardOn: clean(form.admitCardOn),
			examDate: clean(form.examDate),
			resultOn: clean(form.resultOn),
			classesBegin: clean(form.classesBegin),
			feeBdt: fee,
			feeNote: form.feeNote.trim(),
			seats,
			pdfUrl: clean(form.pdfUrl),
			eligibility: lines(form.eligibility),
			notes: lines(form.notes),
			units: textToUnits(unitsText),
			sources,
			updatedOn: todayISO()
		}, isCustomCircular(circular.id));
		setError("");
		setOpen(false);
	};
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
		tone: "paper",
		onClick: () => setOpen(true),
		children: "Amend dates & eligibility"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-4 border border-ink p-4",
		onSubmit: (event) => {
			event.preventDefault();
			save();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-widest text-mute",
				children: "DESK AMENDMENT · BLANK DATES STAY NOT ANNOUNCED · DO NOT GUESS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: controlClass,
					value: form.title,
					onChange: (e) => setForm({
						...form,
						title: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Summary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${controlClass} h-24 py-2`,
					value: form.summary,
					onChange: (e) => setForm({
						...form,
						summary: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Session",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							value: form.session,
							onChange: (e) => setForm({
								...form,
								session: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "System",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: controlClass,
							value: form.system,
							onChange: (e) => setForm({
								...form,
								system: e.target.value
							}),
							children: SYSTEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: SYSTEM_LABEL[item]
							}, item))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Publication",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: controlClass,
							value: form.publication,
							onChange: (e) => setForm({
								...form,
								publication: e.target.value
							}),
							children: PUBLICATION.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Evidence",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: controlClass,
							value: form.confidence,
							onChange: (e) => setForm({
								...form,
								confidence: e.target.value
							}),
							children: CONFIDENCE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Opens",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							className: controlClass,
							value: form.applicationOpens,
							onChange: (e) => setForm({
								...form,
								applicationOpens: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Opens at",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							placeholder: "12:00",
							value: form.opensAt,
							onChange: (e) => setForm({
								...form,
								opensAt: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Closes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							className: controlClass,
							value: form.applicationCloses,
							onChange: (e) => setForm({
								...form,
								applicationCloses: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Closes at",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							placeholder: "23:59",
							value: form.closesAt,
							onChange: (e) => setForm({
								...form,
								closesAt: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Admit card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							className: controlClass,
							value: form.admitCardOn,
							onChange: (e) => setForm({
								...form,
								admitCardOn: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "First exam",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							className: controlClass,
							value: form.examDate,
							onChange: (e) => setForm({
								...form,
								examDate: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Result",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							className: controlClass,
							value: form.resultOn,
							onChange: (e) => setForm({
								...form,
								resultOn: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Classes begin",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							className: controlClass,
							value: form.classesBegin,
							onChange: (e) => setForm({
								...form,
								classesBegin: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Fee (BDT)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							inputMode: "numeric",
							value: form.fee,
							onChange: (e) => setForm({
								...form,
								fee: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Seats",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							inputMode: "numeric",
							value: form.seats,
							onChange: (e) => setForm({
								...form,
								seats: e.target.value
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Fee note",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: controlClass,
					value: form.feeNote,
					onChange: (e) => setForm({
						...form,
						feeNote: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Official PDF",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: controlClass,
					value: form.pdfUrl,
					onChange: (e) => setForm({
						...form,
						pdfUrl: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Source label",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: controlClass,
						value: form.sourceLabel,
						onChange: (e) => setForm({
							...form,
							sourceLabel: e.target.value
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Source URL",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: controlClass,
						value: form.sourceUrl,
						onChange: (e) => setForm({
							...form,
							sourceUrl: e.target.value
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Why this grade",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${controlClass} h-20 py-2`,
					value: form.confidenceNote,
					onChange: (e) => setForm({
						...form,
						confidenceNote: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Eligibility, one fact per line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${controlClass} h-28 py-2`,
					value: form.eligibility,
					onChange: (e) => setForm({
						...form,
						eligibility: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Units — code | detail | YYYY-MM-DD | time | centre",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${controlClass} h-32 py-2 font-mono text-xs`,
					value: unitsText,
					onChange: (e) => setUnitsText(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notes, one per line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${controlClass} h-24 py-2`,
					value: form.notes,
					onChange: (e) => setForm({
						...form,
						notes: e.target.value
					})
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-accent",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
					type: "submit",
					children: "Save amendment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
					tone: "ghost",
					onClick: () => setOpen(false),
					children: "Cancel"
				})]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-xs uppercase tracking-widest text-mute",
			children: label
		}), children]
	});
}
function unitsToText(units) {
	return units.map((unit) => [
		unit.code,
		unit.detail,
		unit.examDate ?? "",
		unit.examTime ?? "",
		unit.centre
	].join(" | ")).join("\n");
}
function textToUnits(text) {
	return text.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
		const [code = "", detail = "", examDate = "", examTime = "", centre = ""] = line.split("|").map((part) => part.trim());
		return {
			code: code || "UNIT",
			detail,
			examDate: examDate || null,
			examTime: examTime || null,
			centre
		};
	});
}
//#endregion
export { AmendUniversity as n, AmendCircular as t };

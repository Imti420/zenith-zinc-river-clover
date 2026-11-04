import { i as __toESM } from "../_runtime.mjs";
import { s as todayISO } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as blankUniversity, d as Signature, f as parseBackup, i as blankCircular, l as useCatalog, m as usePersonal, o as buildCatalog, p as personalSnapshot, u as EVIDENCE_COPY, v as SYSTEM_LABEL, y as TRACK_LABEL } from "./router-DAhf9lC1.mjs";
import { l as TextButton, o as PageHead, u as controlClass } from "./marks-B5AX3jYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-B8fEeDtp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const personal = usePersonal();
	const catalog = useCatalog();
	const navigate = useNavigate();
	const [message, setMessage] = (0, import_react.useState)("");
	const [uniName, setUniName] = (0, import_react.useState)("");
	const [uniShort, setUniShort] = (0, import_react.useState)("");
	const [uniTrack, setUniTrack] = (0, import_react.useState)("general");
	const [uniCity, setUniCity] = (0, import_react.useState)("");
	const [uniSite, setUniSite] = (0, import_react.useState)("");
	const [circUni, setCircUni] = (0, import_react.useState)(catalog.universities[0]?.id ?? "du");
	const [circTitle, setCircTitle] = (0, import_react.useState)("");
	const download = (filename, payload) => {
		const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = filename;
		anchor.click();
		URL.revokeObjectURL(url);
	};
	const exportDesk = () => {
		download(`admission26-desk-${todayISO()}.json`, {
			archive: "ADMISSION//26",
			version: 2,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			personal: personalSnapshot(personal)
		});
		setMessage("Desk backup downloaded.");
	};
	const exportMerged = () => {
		download(`admission26-catalog-${todayISO()}.json`, {
			archive: "ADMISSION//26",
			kind: "snapshot",
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			universities: catalog.universities,
			circulars: catalog.circulars
		});
		setMessage("Merged catalog snapshot downloaded. This file is for reading, not for import.");
	};
	const onImport = async (file) => {
		if (!file) return;
		try {
			const parsed = parseBackup(JSON.parse(await file.text()));
			if (!parsed) {
				setMessage("That file is not an ADMISSION//26 desk backup. Snapshots cannot be imported.");
				return;
			}
			personal.replacePersonal(parsed);
			setMessage("Desk backup restored on this browser.");
		} catch {
			setMessage("Could not read that JSON file.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Desk",
			title: "Settings",
			lede: "Add a university, log a circular, and keep a JSON backup. Edits live in this browser. The seeded directory stays in the app; your amendments sit on top of it."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "border border-ink p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold uppercase",
					children: "How to read a record"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: EVIDENCE_COPY.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-ink py-2",
						children: line
					}, line))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm",
					children: "The directory was logged on 4 Nov 2026 from the UGC public-university list and three Daily Star reports. It does not scrape the web. If a portal is down, the field stays blank."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 border border-ink p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold uppercase",
					children: "Backup"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
							onClick: exportDesk,
							children: "Export desk backup"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
							tone: "paper",
							onClick: exportMerged,
							children: "Export merged catalog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
							tone: "ghost",
							onClick: () => {
								if (confirm("Erase bookmarks, notes, tracker marks and desk amendments on this browser?")) {
									personal.resetPersonal();
									setMessage("Local desk cleared. The seeded directory is unchanged.");
								}
							},
							children: "Reset this desk"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tracking-widest text-mute",
						children: "IMPORT DESK BACKUP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "application/json",
						className: controlClass,
						onChange: (event) => void onImport(event.target.files?.[0])
					})]
				}),
				message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-mono text-xs",
					children: message
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 grid gap-8 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "border border-ink p-4",
				onSubmit: (event) => {
					event.preventDefault();
					if (!uniName.trim()) {
						setMessage("A university needs a name.");
						return;
					}
					if (uniSite.trim() && !/^https?:\/\//i.test(uniSite.trim())) {
						setMessage("Website must start with http:// or https://");
						return;
					}
					const uni = blankUniversity(uniName);
					uni.shortName = uniShort.trim() || uni.shortName;
					uni.track = uniTrack;
					uni.city = uniCity.trim();
					uni.website = uniSite.trim() || null;
					personal.addUniversity(uni);
					setUniName("");
					setUniShort("");
					setUniCity("");
					setUniSite("");
					navigate({
						to: "/universities/$id",
						params: { id: uni.id }
					});
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold uppercase",
					children: "Add a university"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							placeholder: "University name",
							value: uniName,
							onChange: (e) => setUniName(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							placeholder: "Short name",
							value: uniShort,
							onChange: (e) => setUniShort(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: controlClass,
							value: uniTrack,
							onChange: (e) => setUniTrack(e.target.value),
							children: Object.keys(TRACK_LABEL).map((track) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: track,
								children: TRACK_LABEL[track]
							}, track))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							placeholder: "City",
							value: uniCity,
							onChange: (e) => setUniCity(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							placeholder: "https:// official website",
							value: uniSite,
							onChange: (e) => setUniSite(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
							type: "submit",
							children: "Add university"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "border border-ink p-4",
				onSubmit: (event) => {
					event.preventDefault();
					const circular = blankCircular(circUni, circTitle);
					const uni = catalog.byId.get(circUni);
					if (uni?.track === "engineering") circular.system = "engineering";
					if (uni?.track === "private") circular.system = "private";
					if (uni?.track === "medical") circular.system = "medical";
					if (uni?.track === "agricultural") circular.system = "agricultural";
					if (uni?.id === "gst") circular.system = "gst";
					personal.addCircular(circular);
					setCircTitle("");
					navigate({
						to: "/circulars/$id",
						params: { id: circular.id }
					});
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold uppercase",
					children: "Add a circular"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: controlClass,
							value: circUni,
							onChange: (e) => setCircUni(e.target.value),
							children: catalog.universities.map((uni) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: uni.id,
								children: [
									uni.shortName,
									" — ",
									uni.name
								]
							}, uni.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: controlClass,
							placeholder: "Title",
							value: circTitle,
							onChange: (e) => setCircTitle(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-mute",
							children: [
								"Systems on file: ",
								Object.values(SYSTEM_LABEL).join(" · "),
								". You will set dates on the next screen. Leave unknown fields blank."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
							type: "submit",
							children: "Add circular"
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signature, { variant: "about" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeedCount, {})
	] });
}
function SeedCount() {
	const personal = usePersonal();
	const count = buildCatalog(personal).universities.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-8 font-mono text-xs text-mute",
		children: [String(count).padStart(2, "0"), " RECORDS VISIBLE AFTER YOUR AMENDMENTS AND HIDES."]
	});
}
//#endregion
export { SettingsPage as component };

import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as PROGRESS_LABEL, m as usePersonal } from "./router-DAhf9lC1.mjs";
import { l as TextButton, u as controlClass } from "./marks-B5AX3jYA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-C1naoFjL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RecordActions({ universityId, circularId }) {
	const hydrated = usePersonal((s) => s.hydrated);
	const bookmarks = usePersonal((s) => s.bookmarks);
	const shortlist = usePersonal((s) => s.shortlist);
	const readIds = usePersonal((s) => s.readIds);
	const pinnedIds = usePersonal((s) => s.pinnedIds);
	const verifiedOn = usePersonal((s) => s.verifiedOn);
	const toggleBookmark = usePersonal((s) => s.toggleBookmark);
	const toggleShortlist = usePersonal((s) => s.toggleShortlist);
	const toggleRead = usePersonal((s) => s.toggleRead);
	const togglePin = usePersonal((s) => s.togglePin);
	const toggleVerified = usePersonal((s) => s.toggleVerified);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2",
		children: [
			universityId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
				tone: "paper",
				disabled: !hydrated,
				onClick: () => toggleBookmark(universityId),
				children: bookmarks.includes(universityId) ? "Saved" : "Save"
			}) : null,
			universityId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
				tone: "ghost",
				disabled: !hydrated,
				onClick: () => toggleShortlist(universityId),
				children: shortlist.includes(universityId) ? "On shortlist" : "Shortlist"
			}) : null,
			circularId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
				tone: "paper",
				disabled: !hydrated,
				onClick: () => togglePin(circularId),
				children: pinnedIds.includes(circularId) ? "Deadline pinned" : "Pin deadline"
			}) : null,
			circularId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
				tone: "ghost",
				disabled: !hydrated,
				onClick: () => toggleRead(circularId),
				children: readIds.includes(circularId) ? "Read" : "Mark read"
			}) : null,
			circularId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
				tone: "ghost",
				disabled: !hydrated,
				onClick: () => toggleVerified(circularId),
				children: verifiedOn[circularId] ? `Verified ${verifiedOn[circularId]}` : "Mark verified"
			}) : null
		]
	});
}
function NoteBox({ id, label }) {
	const hydrated = usePersonal((s) => s.hydrated);
	const stored = usePersonal((s) => s.notes[id] ?? "");
	const setNote = usePersonal((s) => s.setNote);
	const [value, setValue] = (0, import_react.useState)(null);
	const shown = value ?? stored;
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-xs text-mute",
		children: "RESTORING LOCAL NOTES…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-xs uppercase tracking-widest text-mute",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			className: `${controlClass} h-28 py-2`,
			value: shown,
			onChange: (event) => setValue(event.target.value),
			onBlur: () => {
				setNote(id, shown);
				setValue(null);
			}
		})]
	});
}
function ProgressSelect({ id }) {
	const hydrated = usePersonal((s) => s.hydrated);
	const progress = usePersonal((s) => s.progress[id] ?? "");
	const setProgress = usePersonal((s) => s.setProgress);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
		className: controlClass,
		disabled: !hydrated,
		value: progress,
		onChange: (event) => setProgress(id, event.target.value || null),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "",
			children: "NOT TRACKING"
		}), Object.keys(PROGRESS_LABEL).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: key,
			children: PROGRESS_LABEL[key].toUpperCase()
		}, key))]
	});
}
//#endregion
export { ProgressSelect as n, RecordActions as r, NoteBox as t };

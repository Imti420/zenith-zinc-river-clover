import { i as formatDay } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as PROGRESS_LABEL, l as useCatalog, m as usePersonal } from "./router-DAhf9lC1.mjs";
import { o as PageHead } from "./marks-B5AX3jYA.mjs";
import { n as ProgressSelect, t as NoteBox } from "./actions-C1naoFjL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tracker-BQzBNZ2Q.js
var import_jsx_runtime = require_jsx_runtime();
function TrackerPage() {
	const { circulars, byId, universities } = useCatalog();
	const progress = usePersonal((s) => s.progress);
	const shortlist = usePersonal((s) => s.shortlist);
	const hydrated = usePersonal((s) => s.hydrated);
	const setProgress = usePersonal((s) => s.setProgress);
	const trackedIds = /* @__PURE__ */ new Set([...Object.keys(progress), ...shortlist.flatMap((id) => circulars.filter((item) => item.universityId === id).map((item) => item.id))]);
	const rows = circulars.filter((item) => trackedIds.has(item.id));
	const loose = shortlist.filter((id) => !circulars.some((item) => item.universityId === id));
	const counts = Object.keys(PROGRESS_LABEL).map((key) => ({
		key,
		n: Object.values(progress).filter((value) => value === key).length
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Personal",
			title: "Application tracker",
			lede: "Mark what you have actually submitted. Shortlisted universities with a circular appear here automatically. Nothing is sent to a server."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 border border-ink md:grid-cols-3 xl:grid-cols-5",
			children: counts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-ink border-r border-b p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl font-bold tabular-nums",
					children: String(item.n).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-xs tracking-widest text-mute",
					children: PROGRESS_LABEL[item.key].toUpperCase()
				})]
			}, item.key))
		}),
		!hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 font-mono text-xs text-mute",
			children: "RESTORING THIS DESK…"
		}) : null,
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 border border-ink p-4 text-sm",
			children: "Nothing is being tracked. Shortlist a university or open a circular and set a progress mark."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-6 divide-y divide-ink border-y border-ink",
			children: rows.map((item) => {
				const uni = byId.get(item.universityId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-3 py-4 lg:grid-cols-[8rem_1fr_16rem]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/universities/$id",
							params: { id: item.universityId },
							className: "font-display text-4xl font-bold uppercase leading-none",
							children: uni?.shortName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/circulars/$id",
								params: { id: item.id },
								className: "text-sm hover:text-accent",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-xs text-mute",
								children: [
									"CLOSES ",
									formatDay(item.applicationCloses),
									" · EXAM ",
									formatDay(item.examDate)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 max-w-xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteBox, {
									id: item.id,
									label: "Application note"
								})
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressSelect, { id: item.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 border border-ink font-mono text-xs tracking-widest",
								onClick: () => setProgress(item.id, null),
								children: "CLEAR PROGRESS"
							})]
						})
					]
				}, item.id);
			})
		}),
		loose.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-bold uppercase",
				children: "Shortlisted, no circular yet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-ink border-y border-ink",
				children: loose.map((id) => {
					const uni = universities.find((item) => item.id === id);
					if (!uni) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/universities/$id",
								params: { id },
								className: "font-display text-2xl font-bold uppercase",
								children: uni.shortName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-3 text-sm",
								children: uni.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-mute",
								children: "LOG A CIRCULAR BEFORE YOU CAN MARK IT APPLIED."
							})
						]
					}, id);
				})
			})]
		}) : null
	] });
}
//#endregion
export { TrackerPage as component };

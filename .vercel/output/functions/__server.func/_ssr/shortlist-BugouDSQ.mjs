import { i as formatDay } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useCatalog, m as usePersonal } from "./router-DAhf9lC1.mjs";
import { c as StatusPill, d as deriveStatus, h as nextRelevantDay, o as PageHead } from "./marks-B5AX3jYA.mjs";
import { t as NoteBox } from "./actions-C1naoFjL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shortlist-BugouDSQ.js
var import_jsx_runtime = require_jsx_runtime();
function ShortlistPage() {
	const { universities, circulars } = useCatalog();
	const shortlist = usePersonal((s) => s.shortlist);
	const bookmarks = usePersonal((s) => s.bookmarks);
	const toggleShortlist = usePersonal((s) => s.toggleShortlist);
	const hydrated = usePersonal((s) => s.hydrated);
	const chosen = universities.filter((uni) => shortlist.includes(uni.id));
	const saved = universities.filter((uni) => bookmarks.includes(uni.id) && !shortlist.includes(uni.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Personal",
			title: "My shortlist",
			lede: "Preferred universities for this season. Saved bookmarks that are not on the shortlist sit underneath. Both stay in this browser."
		}),
		!hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs text-mute",
			children: "RESTORING THIS DESK…"
		}) : null,
		chosen.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "border border-ink p-4 text-sm",
			children: [
				"The shortlist is empty. Open a university and press Shortlist. The directory is at",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/universities",
					className: "underline",
					children: "All universities"
				}),
				"."
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "divide-y divide-ink border-y border-ink",
			children: chosen.map((uni, index) => {
				const circular = circulars.find((item) => item.universityId === uni.id) ?? null;
				const next = circular ? nextRelevantDay(circular) : null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-3 py-4 md:grid-cols-[3rem_8rem_1fr_auto] md:items-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-mute",
							children: String(index + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/universities/$id",
							params: { id: uni.id },
							className: "font-display text-4xl font-bold uppercase leading-none",
							children: uni.shortName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/universities/$id",
								params: { id: uni.id },
								className: "text-sm",
								children: uni.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap items-center gap-2",
								children: [circular ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: deriveStatus(circular) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-mute",
									children: "NOT ANNOUNCED"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: next ? formatDay(next) : "NO DATE ON FILE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 max-w-xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteBox, {
									id: uni.id,
									label: "Note"
								})
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hydrated,
							onClick: () => toggleShortlist(uni.id),
							className: "h-11 border border-ink px-3 font-mono text-xs tracking-widest",
							children: "REMOVE"
						})
					]
				}, uni.id);
			})
		}),
		saved.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-bold uppercase",
				children: "Saved, not shortlisted"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-ink border-y border-ink",
				children: saved.map((uni) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex items-center justify-between gap-3 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/universities/$id",
						params: { id: uni.id },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl font-bold uppercase",
							children: uni.shortName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-3 text-sm",
							children: uni.name
						})]
					})
				}, uni.id))
			})]
		}) : null
	] });
}
//#endregion
export { ShortlistPage as component };

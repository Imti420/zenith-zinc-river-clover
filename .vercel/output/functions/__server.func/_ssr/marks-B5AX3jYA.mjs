import { a as formatDayTime, n as cn, r as daysUntil, t as atInstant } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marks-B5AX3jYA.js
var import_jsx_runtime = require_jsx_runtime();
function deriveStatus(c, now = /* @__PURE__ */ new Date()) {
	const open = atInstant(c.applicationOpens, c.opensAt, "start");
	const close = atInstant(c.applicationCloses, c.closesAt, "end");
	if (open && close) {
		if (now < open) return "upcoming";
		if (now <= close) return "open";
		return "closed";
	}
	if (open && !close) return now >= open ? "open" : "upcoming";
	if (close && now > close) return "closed";
	if (close || c.examDate || c.units.some((u) => u.examDate)) return "upcoming";
	return "not_announced";
}
function statusLabel(status) {
	switch (status) {
		case "open": return "OPEN";
		case "upcoming": return "UPCOMING";
		case "closed": return "CLOSED";
		default: return "NOT ANNOUNCED";
	}
}
function evidenceLabel(confidence, publication) {
	if (confidence === "not-announced") return "NOT ANNOUNCED";
	if (confidence === "preliminary") return "REPORTED · NOT FINAL";
	if (confidence === "reported") return "REPORTED";
	if (publication === "circular") return "CIRCULAR CITED";
	if (publication === "notice") return "OFFICIAL NOTICE CITED";
	return "DECISION CITED";
}
function eventsFor(c) {
	const out = [];
	if (c.applicationOpens) out.push({
		id: `${c.id}-opens`,
		circularId: c.id,
		universityId: c.universityId,
		kind: "opens",
		day: c.applicationOpens,
		time: c.opensAt,
		label: "Application opens"
	});
	if (c.applicationCloses) out.push({
		id: `${c.id}-closes`,
		circularId: c.id,
		universityId: c.universityId,
		kind: "closes",
		day: c.applicationCloses,
		time: c.closesAt,
		label: "Application closes"
	});
	if (c.admitCardOn) out.push({
		id: `${c.id}-admit`,
		circularId: c.id,
		universityId: c.universityId,
		kind: "admit",
		day: c.admitCardOn,
		time: null,
		label: "Admit card"
	});
	const unitExams = c.units.filter((u) => u.examDate);
	if (unitExams.length) for (const u of unitExams) out.push({
		id: `${c.id}-exam-${u.code}`,
		circularId: c.id,
		universityId: c.universityId,
		kind: "exam",
		day: u.examDate,
		time: u.examTime,
		label: `Exam · ${u.code}`
	});
	else if (c.examDate) out.push({
		id: `${c.id}-exam`,
		circularId: c.id,
		universityId: c.universityId,
		kind: "exam",
		day: c.examDate,
		time: c.examTime,
		label: "Admission test"
	});
	if (c.resultOn) out.push({
		id: `${c.id}-result`,
		circularId: c.id,
		universityId: c.universityId,
		kind: "result",
		day: c.resultOn,
		time: null,
		label: "Result"
	});
	if (c.classesBegin) out.push({
		id: `${c.id}-classes`,
		circularId: c.id,
		universityId: c.universityId,
		kind: "classes",
		day: c.classesBegin,
		time: null,
		label: "Classes begin"
	});
	return out;
}
function isUrgent(event, now = /* @__PURE__ */ new Date()) {
	const d = daysUntil(event.day, now);
	if (d < 0) return false;
	if (event.kind === "closes" && d <= 14) return true;
	if ((event.kind === "opens" || event.kind === "exam") && d <= 7) return true;
	return false;
}
function nextRelevantDay(c, now = /* @__PURE__ */ new Date()) {
	return eventsFor(c).filter((e) => daysUntil(e.day, now) >= 0).sort((a, b) => a.day.localeCompare(b.day) || a.label.localeCompare(b.label))[0]?.day ?? eventsFor(c).sort((a, b) => b.day.localeCompare(a.day))[0]?.day ?? null;
}
function publishedNotice(c) {
	return c.publication === "notice" || c.publication === "circular";
}
var controlClass = "h-11 w-full border border-ink bg-paper px-3 font-sans text-sm text-ink outline-none transition-colors duration-150 focus:bg-panel";
function PageHead({ kicker, title, lede, aside }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-8 flex flex-col gap-4 border-b border-ink pb-5 md:flex-row md:items-end md:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-mute",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-5xl font-bold uppercase leading-none text-balance md:text-7xl",
				children: title
			}),
			lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-3xl text-base text-pretty text-ink",
				children: lede
			}) : null
		] }), aside]
	});
}
function SectionLabel({ index, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
		className: "font-display text-3xl font-bold uppercase leading-none tracking-tight md:text-4xl",
		children: [index ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mr-3 font-mono text-sm font-medium text-mute",
			children: index
		}) : null, children]
	});
}
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-7 items-center border px-2 font-mono text-xs tracking-widest", status === "open" ? "border-accent bg-accent text-paper" : "border-ink text-ink", status === "not_announced" && "border-mute text-mute", status === "closed" && "text-mute"),
		children: statusLabel(status)
	});
}
function EvidenceStamp({ circular }) {
	const label = evidenceLabel(circular.confidence, circular.publication);
	const hot = circular.confidence === "preliminary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-7 items-center border px-2 font-mono text-xs tracking-widest", hot ? "border-accent text-accent" : "border-ink text-ink", circular.confidence === "not-announced" && "border-mute text-mute"),
		children: label
	});
}
function Monogram({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "flex h-16 w-16 shrink-0 items-center justify-center border border-ink bg-paper font-display text-xl font-bold uppercase leading-none",
		children: text.slice(0, 5)
	});
}
function Fact({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-ink py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-xs uppercase tracking-widest text-mute",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-sm",
			children
		})]
	});
}
function Announced({ day, time }) {
	if (!day) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-mono text-sm text-mute",
		children: "NOT ANNOUNCED"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-mono text-sm",
		children: formatDayTime(day, time ?? null)
	});
}
function ExternalLink({ href, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		className: "underline decoration-1 underline-offset-4 hover:text-accent",
		children
	});
}
function TextButton({ children, onClick, tone = "ink", type = "button", disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		onClick,
		disabled,
		className: cn("inline-flex h-11 items-center justify-center border px-3 font-display text-sm font-semibold uppercase tracking-widest transition-colors duration-150 disabled:opacity-40", tone === "ink" && "border-ink bg-ink text-paper hover:bg-accent hover:border-accent", tone === "paper" && "border-ink bg-paper text-ink hover:bg-panel", tone === "accent" && "border-accent bg-accent text-paper", tone === "ghost" && "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper"),
		children
	});
}
//#endregion
export { Monogram as a, StatusPill as c, deriveStatus as d, eventsFor as f, publishedNotice as g, nextRelevantDay as h, Fact as i, TextButton as l, isUrgent as m, EvidenceStamp as n, PageHead as o, evidenceLabel as p, ExternalLink as r, SectionLabel as s, Announced as t, controlClass as u };

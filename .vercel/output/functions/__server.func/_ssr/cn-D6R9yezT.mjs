import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cn-D6R9yezT.js
var MONTHS = [
	"JAN",
	"FEB",
	"MAR",
	"APR",
	"MAY",
	"JUN",
	"JUL",
	"AUG",
	"SEP",
	"OCT",
	"NOV",
	"DEC"
];
function parseDay(iso) {
	const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function formatDay(iso) {
	if (!iso) return "NOT ANNOUNCED";
	const dt = parseDay(iso);
	return `${String(dt.getDate()).padStart(2, "0")} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;
}
function formatDayTime(day, time) {
	const base = formatDay(day);
	if (!day) return base;
	return time ? `${base} · ${time}` : base;
}
function todayISO(now = /* @__PURE__ */ new Date()) {
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function daysUntil(day, now = /* @__PURE__ */ new Date()) {
	const target = parseDay(day).getTime();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
	return Math.round((target - today) / 864e5);
}
function relativeDay(day, now = /* @__PURE__ */ new Date()) {
	const n = daysUntil(day, now);
	if (n === 0) return "TODAY";
	if (n === 1) return "TOMORROW";
	if (n === -1) return "YESTERDAY";
	if (n > 1) return `IN ${n} DAYS`;
	return `${Math.abs(n)} DAYS AGO`;
}
function atInstant(day, time, bound) {
	if (!day) return null;
	const dt = parseDay(day);
	if (time && /^\d{2}:\d{2}$/.test(time)) {
		const [h, min] = time.split(":").map(Number);
		dt.setHours(h ?? 0, min ?? 0, 0, 0);
		return dt;
	}
	if (bound === "end") dt.setHours(23, 59, 59, 999);
	else dt.setHours(0, 0, 0, 0);
	return dt;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { formatDayTime as a, formatDay as i, cn as n, relativeDay as o, daysUntil as r, todayISO as s, atInstant as t };

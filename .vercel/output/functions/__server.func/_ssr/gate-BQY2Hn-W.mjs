//#region node_modules/.nitro/vite/services/ssr/assets/gate-BQY2Hn-W.js
function systemStatus(live, now) {
	if (!live || live.status === "never" || live.generatedAt == null) return "never";
	if (live.status === "running") {
		const started = Date.parse(live.startedAt ?? "");
		if (!Number.isFinite(started) || now.getTime() - started > 18e5) return "failed";
		return "active";
	}
	if (live.status === "failed" && live.counts.reached === 0 && live.counts.checked === 0) return "failed";
	const done = Date.parse(live.completedAt ?? live.generatedAt ?? "");
	if (!Number.isFinite(done) || now.getTime() - done > 54e5) return "stale";
	if (live.counts.checked > 0 && live.counts.reached === 0 && live.counts.failed > 0) return "failed";
	if (live.counts.failed > 0) return "degraded";
	return "idle";
}
function isLiveFile(value) {
	if (!value || typeof value !== "object") return false;
	const record = value;
	return record.version === 1 && typeof record.status === "string" && Array.isArray(record.events) && Array.isArray(record.sources);
}
//#endregion
export { systemStatus as n, isLiveFile as t };

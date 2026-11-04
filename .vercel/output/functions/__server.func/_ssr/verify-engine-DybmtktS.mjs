//#region node_modules/.nitro/vite/services/ssr/assets/verify-engine-DybmtktS.js
var DATE_FIELDS = [
	"applicationOpens",
	"applicationCloses",
	"examDate",
	"admitCardOn",
	"resultOn",
	"classesBegin"
];
var FACT_FIELDS = [
	...DATE_FIELDS,
	"feeBdt",
	"eligibility"
];
var MONTH = {
	jan: "01",
	january: "01",
	feb: "02",
	february: "02",
	mar: "03",
	march: "03",
	apr: "04",
	april: "04",
	may: "05",
	jun: "06",
	june: "06",
	jul: "07",
	july: "07",
	aug: "08",
	august: "08",
	sep: "09",
	sept: "09",
	september: "09",
	oct: "10",
	october: "10",
	nov: "11",
	november: "11",
	dec: "12",
	december: "12"
};
var FIELD_WINDOW = [
	{
		field: "applicationCloses",
		pattern: /deadline|last date|closing date|applications? close|close on|closes on/i
	},
	{
		field: "applicationOpens",
		pattern: /applications? open|opens on|opening date|apply from/i
	},
	{
		field: "admitCardOn",
		pattern: /admit card/i
	},
	{
		field: "examDate",
		pattern: /admission test|exam(?:ination)? date|test on|test date/i
	},
	{
		field: "resultOn",
		pattern: /result (?:on|date)|results published/i
	},
	{
		field: "classesBegin",
		pattern: /classes begin|class starts/i
	}
];
function isISODate(value) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
	const [y, m, d] = value.split("-").map(Number);
	if (!y || !m || !d) return false;
	const dt = new Date(Date.UTC(y, m - 1, d));
	return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}
function inSeason(iso) {
	return isISODate(iso) && iso >= "2026-01-01" && iso <= "2027-12-31";
}
async function sha256Text(text) {
	const data = new TextEncoder().encode(text);
	const buf = await crypto.subtle.digest("SHA-256", data);
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function visibleText(raw) {
	return raw.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/&/gi, "&").replace(/&#39;|'/gi, "'").replace(/"/gi, "\"").replace(/\s+/g, " ").trim();
}
function emptySummary() {
	return {
		monitoredUniversities: 0,
		monitoredSources: 0,
		reached: 0,
		unchanged: 0,
		fingerprinted: 0,
		changed: 0,
		structuredApplied: 0,
		reviewRequired: 0,
		failed: 0,
		notChecked: 0
	};
}
function summarize(sources, proposals) {
	const universities = /* @__PURE__ */ new Set();
	const summary = emptySummary();
	summary.monitoredSources = sources.length;
	for (const source of sources) {
		for (const id of source.universityIds) universities.add(id);
		if (source.status === "check_failed") summary.failed += 1;
		else if (source.status === "not_checked") summary.notChecked += 1;
		else if (source.status === "unchanged") {
			summary.reached += 1;
			summary.unchanged += 1;
		} else if (source.status === "fingerprinted") {
			summary.reached += 1;
			summary.fingerprinted += 1;
		} else if (source.status === "changed") {
			summary.reached += 1;
			summary.changed += 1;
		} else if (source.status === "structured_applied") {
			summary.reached += 1;
			summary.structuredApplied += 1;
		}
	}
	summary.monitoredUniversities = universities.size;
	summary.reviewRequired = proposals.filter((item) => item.status === "review_required").length;
	return summary;
}
function isMonitorStale(generatedAt, now = /* @__PURE__ */ new Date(), scheduleHours = 12) {
	if (!generatedAt) return true;
	const then = Date.parse(generatedAt);
	if (Number.isNaN(then)) return true;
	const graceMs = (scheduleHours + 6) * 60 * 60 * 1e3;
	return now.getTime() - then > graceMs;
}
function isReport(value) {
	if (!value || typeof value !== "object") return false;
	const record = value;
	return record.version === 1 && Array.isArray(record.sources) && Array.isArray(record.proposals) && Array.isArray(record.applied);
}
function hostOf(url) {
	if (!url) return null;
	try {
		return new URL(url).host.toLowerCase();
	} catch {
		return null;
	}
}
function factValue(fact, field) {
	if (field === "eligibility") return "NOT ANNOUNCED";
	const value = fact[field];
	if (value == null || value === "") return "NOT ANNOUNCED";
	return String(value);
}
function datesOn(fact) {
	const set = /* @__PURE__ */ new Set();
	for (const field of DATE_FIELDS) {
		const value = fact[field];
		if (value) set.add(value);
	}
	return set;
}
function findDates(text) {
	const found = [];
	for (const match of text.matchAll(/\b(20\d{2}-\d{2}-\d{2})\b/g)) {
		const iso = match[1] ?? "";
		if (inSeason(iso)) found.push({
			iso,
			index: match.index ?? 0
		});
	}
	for (const match of text.matchAll(/\b(\d{1,2})(?:st|nd|rd|th)?\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(20\d{2})\b/gi)) {
		const month = MONTH[(match[2] ?? "").toLowerCase()];
		const iso = `${match[3]}-${month}-${String(match[1]).padStart(2, "0")}`;
		if (inSeason(iso)) found.push({
			iso,
			index: match.index ?? 0
		});
	}
	for (const match of text.matchAll(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(20\d{2})\b/gi)) {
		const month = MONTH[(match[1] ?? "").toLowerCase()];
		const iso = `${match[3]}-${month}-${String(match[2]).padStart(2, "0")}`;
		if (inSeason(iso)) found.push({
			iso,
			index: match.index ?? 0
		});
	}
	return found;
}
function near(text, index, needle) {
	const pad = 140;
	return text.slice(Math.max(0, index - pad), Math.min(text.length, index + pad)).toLowerCase().includes(needle.toLowerCase());
}
function extractStructured(html) {
	const out = [];
	for (const match of html.matchAll(/<script[^>]*data-admission26=["']notice["'][^>]*>([\s\S]*?)<\/script>/gi)) try {
		const parsed = JSON.parse(match[1] ?? "");
		const list = Array.isArray(parsed) ? parsed : [parsed];
		for (const item of list) {
			if (!item || typeof item !== "object") continue;
			const record = item;
			if (record.schema !== "admission26.notice.v1") continue;
			if (typeof record.circularId !== "string" || typeof record.field !== "string") continue;
			if (!FACT_FIELDS.includes(record.field)) continue;
			const field = record.field;
			if (field === "feeBdt") {
				const fee = typeof record.value === "number" ? record.value : Number(record.value);
				if (!Number.isInteger(fee) || fee < 0 || fee > 2e4) continue;
				out.push({
					circularId: record.circularId,
					field,
					value: String(fee)
				});
				continue;
			}
			if (field === "eligibility") {
				if (!Array.isArray(record.value) || record.value.some((line) => typeof line !== "string" || !line.trim())) continue;
				out.push({
					circularId: record.circularId,
					field,
					value: record.value.join("\n")
				});
				continue;
			}
			if (typeof record.value !== "string" || !isISODate(record.value)) continue;
			out.push({
				circularId: record.circularId,
				field,
				value: record.value
			});
		}
	} catch {
		continue;
	}
	return out;
}
function proposalId(sourceId, circularId, field, detected) {
	return `${sourceId}:${circularId ?? "none"}:${field}:${detected}`;
}
function classifySource(input) {
	const { source, hit, previous, facts, now } = input;
	const linked = facts.filter((fact) => source.circularIds.includes(fact.circularId) || source.circularIds.length === 0 && source.universityIds.includes(fact.universityId));
	const base = {
		sourceId: source.id,
		url: source.url,
		kind: source.kind,
		label: source.label,
		universityIds: source.universityIds,
		circularIds: source.circularIds,
		primaryUniversityId: source.primaryUniversityId,
		primaryName: source.primaryName,
		shortName: source.shortName,
		status: "check_failed",
		httpStatus: hit.httpStatus,
		lastModified: hit.lastModified,
		etag: hit.etag,
		contentHash: hit.contentHash,
		previousHash: previous?.contentHash ?? null,
		checkedAt: now,
		error: hit.error,
		note: ""
	};
	const fail = (note, error = hit.error) => {
		base.status = "check_failed";
		base.note = note;
		base.error = error;
		base.contentHash = null;
		return {
			check: base,
			proposals: [],
			applied: [],
			changelog: [],
			snapshot: null
		};
	};
	if (hit.error || hit.httpStatus == null) return fail("The source could not be reached. This is not evidence that nothing changed.");
	if (hit.httpStatus === 304) {
		if (!previous?.contentHash) return fail("The server returned 304 but this archive has no stored fingerprint to confirm.", "304 without a stored fingerprint");
		base.status = "unchanged";
		base.contentHash = previous.contentHash;
		base.note = "The server reported the representation unchanged (304). Admission dates were not re-read from a body.";
		return {
			check: base,
			proposals: [],
			applied: [],
			changelog: [],
			snapshot: {
				...previous,
				checkedAt: now,
				httpStatus: 304,
				etag: hit.etag ?? previous.etag,
				lastModified: hit.lastModified ?? previous.lastModified
			}
		};
	}
	if (hit.httpStatus !== 200) return fail(`HTTP ${hit.httpStatus}. A response that is not a readable document is not a successful verification.`);
	if (!hit.contentHash || hit.bodyText == null) return fail("HTTP 200 with an empty or unreadable body. Not treated as unchanged.");
	const official = source.kind !== "cited-report" && source.kind !== "pdf" && source.officialHosts.includes((hostOf(hit.finalUrl || source.url) ?? "").toLowerCase());
	const proposals = [];
	const applied = [];
	const changelog = [];
	const addProposal = (proposal, auto) => {
		if (auto) {
			proposal.status = "auto_applied";
			proposal.reliable = true;
			applied.push(proposal);
		} else {
			proposal.status = "review_required";
			proposal.reliable = false;
			proposals.push(proposal);
		}
		changelog.push({
			id: proposal.id,
			universityId: proposal.universityId,
			universityName: proposal.universityName,
			field: proposal.field,
			previousValue: proposal.previousValue,
			detectedValue: proposal.detectedValue,
			sourceUrl: proposal.sourceUrl,
			detectedAt: proposal.detectedAt,
			verificationStatus: proposal.status,
			note: proposal.note
		});
	};
	if (source.kind !== "pdf" && hit.bodyText) {
		for (const notice of extractStructured(hit.bodyText)) {
			const fact = linked.find((item) => item.circularId === notice.circularId);
			if (!fact) continue;
			const previousValue = factValue(fact, notice.field);
			if (previousValue === notice.value) continue;
			addProposal({
				id: proposalId(source.id, fact.circularId, notice.field, notice.value),
				sourceId: source.id,
				universityId: fact.universityId,
				universityName: fact.universityName,
				circularId: fact.circularId,
				field: notice.field,
				previousValue,
				detectedValue: notice.value,
				sourceUrl: hit.finalUrl || source.url,
				detectedAt: now,
				status: "review_required",
				reliable: false,
				note: official ? "Structured admission26.notice.v1 block on the official host. Safe to apply without replacing the seed by hand." : "A structured block was present, but this URL is not the official host. Held for review."
			}, official);
		}
		const text = visibleText(hit.bodyText);
		const dates = findDates(text);
		let emitted = 0;
		for (const spot of dates) {
			if (emitted >= 4) break;
			const windowText = text.slice(Math.max(0, spot.index - 80), Math.min(text.length, spot.index + 80));
			const matched = FIELD_WINDOW.find((item) => item.pattern.test(windowText));
			if (!matched) continue;
			const targets = linked.filter((fact) => {
				if (linked.length === 1) return true;
				return near(text, spot.index, fact.shortName) || near(text, spot.index, fact.universityName);
			});
			for (const fact of targets) {
				if (datesOn(fact).has(spot.iso)) continue;
				const previousValue = factValue(fact, matched.field);
				if (previousValue === spot.iso) continue;
				const id = proposalId(source.id, fact.circularId, matched.field, spot.iso);
				if (proposals.some((item) => item.id === id) || applied.some((item) => item.id === id)) continue;
				addProposal({
					id,
					sourceId: source.id,
					universityId: fact.universityId,
					universityName: fact.universityName,
					circularId: fact.circularId,
					field: matched.field,
					previousValue,
					detectedValue: spot.iso,
					sourceUrl: hit.finalUrl || source.url,
					detectedAt: now,
					status: "review_required",
					reliable: false,
					note: "A date near an admission phrase differed from the stored record. Unconfirmed. Not applied."
				}, false);
				emitted += 1;
			}
		}
	}
	const same = previous?.contentHash === hit.contentHash;
	if (!previous) {
		base.status = applied.length ? "structured_applied" : "fingerprinted";
		base.note = applied.length ? "First fingerprint. A structured official value differed from the archive and was staged as an overlay. Other dates were not guessed." : "First fingerprint recorded. Reaching the page does not confirm the admission dates stored in the archive.";
	} else if (same) {
		base.status = applied.length ? "structured_applied" : "unchanged";
		base.note = "Content fingerprint matches the previous check. HTTP 200 alone was not treated as proof.";
	} else {
		base.status = applied.length ? "structured_applied" : "changed";
		base.note = applied.length ? "Fingerprint changed and a structured official value was staged." : "Fingerprint changed. No structured official field was established, so stored dates were left untouched.";
		if (!applied.length) {
			const entry = {
				id: proposalId(source.id, source.circularIds[0] ?? null, "page", hit.contentHash.slice(0, 12)),
				universityId: source.primaryUniversityId,
				universityName: source.primaryName,
				field: "page",
				previousValue: previous.contentHash.slice(0, 12),
				detectedValue: hit.contentHash.slice(0, 12),
				sourceUrl: hit.finalUrl || source.url,
				detectedAt: now,
				verificationStatus: "review_required",
				note: "Page fingerprint changed. This is not a new admission date."
			};
			changelog.push(entry);
			proposals.push({
				id: entry.id,
				sourceId: source.id,
				universityId: source.primaryUniversityId,
				universityName: source.primaryName,
				circularId: source.circularIds.length === 1 ? source.circularIds[0] ?? null : null,
				field: "page",
				previousValue: entry.previousValue,
				detectedValue: entry.detectedValue,
				sourceUrl: entry.sourceUrl,
				detectedAt: now,
				status: "review_required",
				reliable: false,
				note: entry.note
			});
		}
	}
	return {
		check: base,
		proposals,
		applied,
		changelog,
		snapshot: {
			contentHash: hit.contentHash,
			etag: hit.etag,
			lastModified: hit.lastModified,
			checkedAt: now,
			httpStatus: hit.httpStatus,
			finalUrl: hit.finalUrl || source.url
		}
	};
}
function assembleReport(input) {
	const sources = [...input.untouched ?? [], ...input.classified.map((item) => item.check)];
	const proposals = input.classified.flatMap((item) => item.proposals);
	const applied = input.classified.flatMap((item) => item.applied);
	const fresh = input.classified.flatMap((item) => item.changelog);
	const seen = /* @__PURE__ */ new Set();
	const changelog = [];
	for (const entry of [...fresh].reverse().concat(input.previousChangelog)) {
		if (seen.has(entry.id)) continue;
		seen.add(entry.id);
		changelog.push(entry);
	}
	changelog.sort((a, b) => b.detectedAt.localeCompare(a.detectedAt));
	return {
		version: 1,
		generatedAt: input.now,
		runner: input.runner,
		scheduleHours: 12,
		note: input.note,
		summary: summarize(sources, proposals),
		sources,
		proposals,
		applied,
		changelog: changelog.slice(0, 200)
	};
}
function notCheckedSource(source) {
	return {
		sourceId: source.id,
		url: source.url,
		kind: source.kind,
		label: source.label,
		universityIds: source.universityIds,
		circularIds: source.circularIds,
		primaryUniversityId: source.primaryUniversityId,
		primaryName: source.primaryName,
		shortName: source.shortName,
		status: "not_checked",
		httpStatus: null,
		lastModified: null,
		etag: null,
		contentHash: null,
		previousHash: null,
		checkedAt: null,
		error: null,
		note: "No check has been published for this source."
	};
}
async function readHit(response, maxBytes = 7e5) {
	const etag = response.headers.get("etag");
	const lastModified = response.headers.get("last-modified");
	const contentType = response.headers.get("content-type");
	if (response.status === 304) return {
		httpStatus: 304,
		finalUrl: response.url,
		etag,
		lastModified,
		contentType,
		bodyText: null,
		contentHash: null,
		error: null
	};
	if (Number(response.headers.get("content-length") ?? "0") > maxBytes) return {
		httpStatus: response.status,
		finalUrl: response.url,
		etag,
		lastModified,
		contentType,
		bodyText: null,
		contentHash: null,
		error: "body too large to fingerprint"
	};
	const buf = await response.arrayBuffer();
	if (buf.byteLength > maxBytes) return {
		httpStatus: response.status,
		finalUrl: response.url,
		etag,
		lastModified,
		contentType,
		bodyText: null,
		contentHash: null,
		error: "body too large to fingerprint"
	};
	if (buf.byteLength === 0) return {
		httpStatus: response.status,
		finalUrl: response.url,
		etag,
		lastModified,
		contentType,
		bodyText: "",
		contentHash: null,
		error: "empty body"
	};
	const hash = await sha256Text(new TextDecoder("utf-8", { fatal: false }).decode(buf));
	const bodyText = (contentType ?? "").includes("pdf") || response.url.toLowerCase().endsWith(".pdf") ? "" : new TextDecoder("utf-8", { fatal: false }).decode(buf);
	return {
		httpStatus: response.status,
		finalUrl: response.url,
		etag,
		lastModified,
		contentType,
		bodyText,
		contentHash: hash,
		error: null
	};
}
function applyOverlays(circulars, applied, rejected) {
	if (!applied.length) return circulars;
	return circulars.map((circular) => {
		let next = circular;
		for (const item of applied) {
			if (item.circularId !== circular.id || !item.reliable || item.status !== "auto_applied") continue;
			if (rejected.has(item.id)) continue;
			if (DATE_FIELDS.includes(item.field)) {
				if (!isISODate(item.detectedValue)) continue;
				next = {
					...next,
					[item.field]: item.detectedValue
				};
			} else if (item.field === "feeBdt") {
				const fee = Number(item.detectedValue);
				if (!Number.isInteger(fee)) continue;
				next = {
					...next,
					feeBdt: fee
				};
			} else if (item.field === "eligibility") {
				const lines = item.detectedValue.split("\n").map((line) => line.trim()).filter(Boolean);
				if (!lines.length) continue;
				next = {
					...next,
					eligibility: lines
				};
			}
		}
		return next;
	});
}
//#endregion
export { isISODate as a, notCheckedSource as c, classifySource as i, readHit as l, applyOverlays as n, isMonitorStale as o, assembleReport as r, isReport as s, DATE_FIELDS as t };

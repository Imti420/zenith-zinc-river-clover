import { i as classifySource, l as readHit } from "./verify-engine-DybmtktS.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as sourceManifest } from "./source-manifest-BUD7WjLr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/check-now-BeY5kD_L.js
function failedHit(url, error) {
	return {
		httpStatus: null,
		finalUrl: url,
		etag: null,
		lastModified: null,
		contentType: null,
		bodyText: null,
		contentHash: null,
		error
	};
}
var checkSourceBatch_createServerFn_handler = createServerRpc({
	id: "8d72658f41bcc364d237663b853983bfc118fbb77abb6d8df8045da58f5ba699",
	name: "checkSourceBatch",
	filename: "src/lib/check-now.ts"
}, (opts) => checkSourceBatch.__executeServer(opts));
var checkSourceBatch = createServerFn({ method: "POST" }).validator((data) => {
	const ids = Array.isArray(data?.ids) ? data.ids.filter((id) => typeof id === "string") : [];
	if (ids.length < 1 || ids.length > 5) throw new Error("Send 1 to 5 source ids from the archive manifest.");
	return { ids };
}).handler(checkSourceBatch_createServerFn_handler, async ({ data }) => {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const results = [];
	for (const id of data.ids) {
		const source = sourceManifest.sources.find((item) => item.id === id);
		if (!source) {
			results.push({
				missing: true,
				id
			});
			continue;
		}
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 8e3);
		try {
			const response = await fetch(source.url, {
				signal: controller.signal,
				redirect: "follow",
				headers: {
					"user-agent": "ADMISSION26-desk/2.0",
					accept: "text/html,application/pdf,application/json;q=0.9,*/*;q=0.8"
				}
			});
			const hit = await readHit(response);
			results.push({
				missing: false,
				classified: classifySource({
					source,
					hit,
					previous: null,
					facts: sourceManifest.facts,
					now
				})
			});
		} catch (error) {
			const message = error instanceof Error ? error.name === "AbortError" ? "timeout" : error.message : "request failed";
			results.push({
				missing: false,
				classified: classifySource({
					source,
					hit: failedHit(source.url, message),
					previous: null,
					facts: sourceManifest.facts,
					now
				})
			});
		} finally {
			clearTimeout(timer);
		}
	}
	return {
		checkedAt: now,
		results
	};
});
//#endregion
export { checkSourceBatch_createServerFn_handler };

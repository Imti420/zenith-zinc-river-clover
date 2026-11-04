import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as isLiveFile } from "./gate-BQY2Hn-W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/published-Dh6jU0lY.js
var PUBLISHED_LOG = "https://raw.githubusercontent.com/Imti420/turbo-timber-tundra-zephyr/main/public/ops/live.json";
var fetchPublishedLog_createServerFn_handler = createServerRpc({
	id: "c6c30c7dc7da09d7bac0bd582ab434215cd57c2b593c968e34f1e90ad57a9303",
	name: "fetchPublishedLog",
	filename: "src/lib/crawl/published.ts"
}, (opts) => fetchPublishedLog.__executeServer(opts));
var fetchPublishedLog = createServerFn({ method: "POST" }).handler(fetchPublishedLog_createServerFn_handler, async () => {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 8e3);
	try {
		const response = await fetch(PUBLISHED_LOG, {
			signal: controller.signal,
			headers: {
				accept: "application/json",
				"user-agent": "ADMISSION26-discovery/1.0"
			}
		});
		if (!response.ok) return null;
		const json = await response.json();
		return isLiveFile(json) ? json : null;
	} catch {
		return null;
	} finally {
		clearTimeout(timer);
	}
});
//#endregion
export { fetchPublishedLog_createServerFn_handler };

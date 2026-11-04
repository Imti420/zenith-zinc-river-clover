import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { runDiscovery } from "../src/lib/crawl/cycle.ts";
import { shouldStartCycle } from "../src/lib/crawl/gate.ts";
import { NO_DATE_NOTE, type CrawlState, type DiscoveryRecord, type LiveFile, type SourceRecord } from "../src/lib/crawl/types.ts";
import { seedSystems, seedUniversities } from "../src/data/universities.ts";

const root = resolve(import.meta.dirname, "..");
const force = process.argv.includes("--force");
const runner = process.env.GITHUB_ACTIONS === "true" ? "github-actions" : "manual-script";

function readJson<T>(path: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(path: string, value: unknown) {
  mkdirSync(dirname(path), { recursive: true });
  const temporary = `${path}.tmp`;
  writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(temporary, path);
}

const statePath = resolve(root, "data/ops/state.json");
const registryPath = resolve(root, "data/ops/registry.json");
const discoveriesPath = resolve(root, "data/ops/discoveries.json");
const eventsPath = resolve(root, "data/ops/events.json");
const livePath = resolve(root, "public/ops/live.json");

const previous = readJson<CrawlState>(statePath, {
  version: 1,
  intervalMinutes: 45,
  lastStartedAt: null,
  lastCompletedAt: null,
  lastStatus: "never",
  cycleId: null,
  cursor: 0,
  note: "No discovery cycle has run.",
});

const now = new Date();
if (!force && !shouldStartCycle(previous.lastCompletedAt, now, previous.intervalMinutes || 45, previous.lastStatus)) {
  console.log(
    JSON.stringify({
      skipped: true,
      reason: "Last completed discovery cycle is still inside the 45-minute window. No websites were opened.",
      lastCompletedAt: previous.lastCompletedAt,
    }),
  );
  process.exit(0);
}

const institutions = [...seedUniversities, ...seedSystems].map((institution) => ({
  id: institution.id,
  kind: institution.kind,
  name: institution.name,
  shortName: institution.shortName,
  website: institution.website,
}));

const previousSources = readJson<SourceRecord[]>(registryPath, []);
const previousDiscoveries = readJson<DiscoveryRecord[]>(discoveriesPath, []);
const previousLive = readJson<Partial<LiveFile> | null>(livePath, null);

const running: LiveFile = {
  version: 1,
  generatedAt: now.toISOString(),
  status: "running",
  runner,
  intervalMinutes: 45,
  cycleId: null,
  startedAt: now.toISOString(),
  completedAt: null,
  durationMs: null,
  note: "A discovery cycle is in progress. Rows below are from the last finished pass until this cycle replaces them. No admission date is published.",
  counts: {
    universities: institutions.filter((item) => item.kind === "university").length,
    systems: institutions.filter((item) => item.kind === "system").length,
    sources: previousSources.length,
    checked: 0,
    reached: 0,
    unchanged: 0,
    failed: 0,
    skipped: 0,
    notChecked: previousSources.length,
    newDocuments: 0,
    newPages: 0,
  },
  events: [
    {
      at: now.toISOString(),
      level: "info",
      type: "cycle_start",
      universityId: null,
      sourceId: null,
      url: null,
      message: "Starting discovery cycle. No date will be published.",
    },
  ],
  sources: previousSources,
  discoveries: previousDiscoveries.slice(-200),
};

writeJson(statePath, {
  ...previous,
  lastStatus: "running",
  lastStartedAt: now.toISOString(),
  note: "Discovery cycle is in progress. A crash here is not a successful scan.",
});
writeJson(livePath, running);

try {
  const result = await runDiscovery({
    institutions,
    previousRegistry: previousSources,
    previousDiscoveries,
    previousState: previous,
    now,
    force: true,
    runner,
    fetchImpl: fetch,
    onProgress: (snapshot) => {
      writeJson(livePath, {
        version: 1,
        generatedAt: new Date().toISOString(),
        status: "running",
        runner,
        intervalMinutes: 45,
        cycleId: snapshot.cycleId,
        startedAt: snapshot.startedAt,
        completedAt: null,
        durationMs: null,
        note: "Discovery cycle is in progress. These events have already happened. No admission date is published.",
        counts: snapshot.counts,
        events: snapshot.events,
        sources: snapshot.sources,
        discoveries: snapshot.discoveries,
      });
    },
  });

  if (!result.bundle) {
    writeJson(statePath, previous);
    if (previousLive) writeJson(livePath, previousLive);
    console.log(JSON.stringify({ skipped: true, reason: result.reason }));
    process.exit(0);
  }

  writeJson(statePath, result.bundle.state);
  writeJson(registryPath, result.bundle.registry);
  writeJson(discoveriesPath, result.bundle.discoveries);
  writeJson(eventsPath, result.bundle.events);
  writeJson(livePath, result.bundle.live);
  console.log(
    JSON.stringify({
      skipped: false,
      runner,
      status: result.bundle.live.status,
      checked: result.bundle.live.counts.checked,
      reached: result.bundle.live.counts.reached,
      failed: result.bundle.live.counts.failed,
      newDocuments: result.bundle.live.counts.newDocuments,
      newPages: result.bundle.live.counts.newPages,
      note: NO_DATE_NOTE,
    }),
  );
} catch (error) {
  const failedAt = new Date().toISOString();
  const message = error instanceof Error ? error.message : "discovery cycle crashed";
  writeJson(statePath, {
    ...previous,
    lastStartedAt: now.toISOString(),
    lastCompletedAt: failedAt,
    lastStatus: "failed",
    note: "The cycle crashed before it finished. This is not a successful scan and it is not an unchanged result.",
  });
  writeJson(livePath, {
    ...running,
    generatedAt: failedAt,
    status: "failed",
    completedAt: failedAt,
    note: `The cycle crashed before it finished: ${message}. Source rows are from the last finished pass. This is not a successful scan.`,
    events: [
      ...running.events,
      {
        at: failedAt,
        level: "error",
        type: "fail",
        universityId: null,
        sourceId: null,
        url: null,
        message: `Discovery cycle crashed: ${message}. Not recorded as unchanged.`,
      },
    ],
  });
  console.error(message);
  process.exit(1);
}

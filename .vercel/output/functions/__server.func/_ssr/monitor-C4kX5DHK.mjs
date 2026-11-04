import { i as __toESM } from "../_runtime.mjs";
import { a as isISODate, c as notCheckedSource, o as isMonitorStale, r as assembleReport, t as DATE_FIELDS } from "./verify-engine-DybmtktS.mjs";
import { i as formatDay } from "./cn-D6R9yezT.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as usePublishedReport, m as usePersonal, s as isCustomCircular } from "./router-DAhf9lC1.mjs";
import { l as TextButton, o as PageHead, r as ExternalLink } from "./marks-B5AX3jYA.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as sourceManifest } from "./source-manifest-BUD7WjLr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monitor-C4kX5DHK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var checkSourceBatch = createServerFn({ method: "POST" }).validator((data) => {
	const ids = Array.isArray(data?.ids) ? data.ids.filter((id) => typeof id === "string") : [];
	if (ids.length < 1 || ids.length > 5) throw new Error("Send 1 to 5 source ids from the archive manifest.");
	return { ids };
}).handler(createSsrRpc("8d72658f41bcc364d237663b853983bfc118fbb77abb6d8df8045da58f5ba699"));
function MonitorPage() {
	const published = usePublishedReport((s) => s.report);
	const phase = usePublishedReport((s) => s.phase);
	const reload = usePublishedReport((s) => s.load);
	const decisions = usePersonal((s) => s.proposalDecisions);
	const decideProposal = usePersonal((s) => s.decideProposal);
	const saveCircular = usePersonal((s) => s.saveCircular);
	const [desk, setDesk] = (0, import_react.useState)(null);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)("");
	const [includeCited, setIncludeCited] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const listed = (0, import_react.useMemo)(() => sourceManifest.sources.map(notCheckedSource), []);
	const report = phase === "ready" ? published : null;
	const stale = phase !== "loading" && (phase !== "ready" || isMonitorStale(report?.generatedAt ?? null));
	const checkNow = async () => {
		const targets = sourceManifest.sources.filter((source) => includeCited || source.kind !== "cited-report");
		setRunning(true);
		setMessage("");
		setDesk(null);
		const classified = [];
		try {
			for (let index = 0; index < targets.length; index += 5) {
				const batch = targets.slice(index, index + 5);
				setProgress(`CHECKING ${Math.min(index + batch.length, targets.length)} / ${targets.length}. A failed batch is not recorded as clear.`);
				try {
					const response = await checkSourceBatch({ data: { ids: batch.map((source) => source.id) } });
					for (const item of response.results) {
						if (item.missing) continue;
						classified.push(reconcile(item.classified, report));
					}
				} catch (error) {
					const note = error instanceof Error ? error.message : "Desk check failed";
					for (const source of batch) {
						const blank = notCheckedSource(source);
						classified.push({
							check: {
								...blank,
								status: "check_failed",
								checkedAt: (/* @__PURE__ */ new Date()).toISOString(),
								error: note,
								note: "This batch failed. It was not marked successful."
							},
							proposals: [],
							applied: [],
							changelog: [],
							snapshot: null
						});
					}
				}
			}
			const next = assembleReport({
				classified,
				previousChangelog: [],
				now: (/* @__PURE__ */ new Date()).toISOString(),
				runner: "desk",
				note: "Desk check from this browser session. It does not replace the published report, and it does not prove a date that was not structured."
			});
			setDesk(next);
			for (const item of next.applied) {
				writeProposal(item, saveCircular);
				decideProposal(item.id, "approved");
			}
			if (next.applied.length) setMessage(`${next.applied.length} structured official value${next.applied.length === 1 ? "" : "s"} applied on this desk. Unconfirmed findings were not written.`);
		} finally {
			setRunning(false);
			setProgress("");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Intelligence",
			title: "Information monitor",
			lede: "Compares official pages and cited sources with the archive. A page that answers is fingerprinted. That is not the same thing as a confirmed admission date.",
			aside: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
					onClick: () => void checkNow(),
					disabled: running,
					children: running ? "Checking" : "Check now"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 font-mono text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: includeCited,
						onChange: (event) => setIncludeCited(event.target.checked)
					}), "INCLUDE CITED REPORTS"]
				})]
			})
		}),
		stale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "border border-accent p-4 font-mono text-xs tracking-widest text-accent",
			children: phase === "ready" ? `LAST PUBLISHED CHECK ${report?.generatedAt ?? "UNKNOWN"}. THE 12-HOUR JOB LOOKS STOPPED OR LATE.` : "NO PUBLISHED VERIFICATION REPORT. NOTHING BELOW IS A SUCCESSFUL CHECK."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "border border-ink p-4 font-mono text-xs tracking-widest",
			children: [
				"PUBLISHED ",
				report?.generatedAt,
				" · RUNNER ",
				report?.runner?.toUpperCase(),
				" · SCHEDULE EVERY ",
				report?.scheduleHours,
				"H"
			]
		}),
		progress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 font-mono text-xs",
			children: progress
		}) : null,
		message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm",
			children: message
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {
			report,
			listed: listed.length,
			universities: new Set(sourceManifest.sources.flatMap((source) => source.universityIds)).size
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-bold uppercase",
					children: "Review required"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-3xl text-sm",
					children: "Approving a date writes it on this desk only. Rejecting leaves the stored record alone. Page fingerprints cannot be approved into a date."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProposalTable, {
					rows: (report?.proposals ?? []).filter((item) => decisions[item.id] !== "rejected"),
					decisions,
					onApprove: (item) => {
						if (!writeProposal(item, saveCircular) && item.field !== "page") {
							setMessage("That value is not a date or fee this archive can store. Nothing was written.");
							return;
						}
						decideProposal(item.id, "approved");
						setMessage(item.field === "page" ? "Page change acknowledged. No admission field was changed." : "Approved on this desk.");
					},
					onReject: (item) => {
						decideProposal(item.id, "rejected");
						setMessage("Rejected. The stored record was not replaced.");
					}
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl font-bold uppercase",
				children: "Change log"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-x-auto border border-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[44rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-ink font-mono text-xs tracking-widest text-mute",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2 font-medium",
								children: "UNIVERSITY"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2 font-medium",
								children: "FIELD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2 font-medium",
								children: "PREVIOUS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2 font-medium",
								children: "DETECTED"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2 font-medium",
								children: "STATUS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-2 font-medium",
								children: "WHEN"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (report?.changelog ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-3 text-mute",
						colSpan: 6,
						children: "No changes have been published."
					}) }) : report?.changelog.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-ink align-top",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2",
								children: entry.universityName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2 font-mono text-xs",
								children: entry.field
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2",
								children: entry.previousValue
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2",
								children: entry.detectedValue
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2 font-mono text-xs",
								children: entry.verificationStatus === "auto_applied" ? "AUTO APPLIED" : "REVIEW REQUIRED"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "p-2 font-mono text-xs",
								children: [entry.detectedAt.slice(0, 16).replace("T", " "), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
										href: entry.sourceUrl,
										children: "SOURCE"
									})
								})]
							})
						]
					}, entry.id)) })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UniversityTable, {
			sources: report?.sources ?? listed,
			checked: phase === "ready"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-bold uppercase",
					children: "This browser"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "font-mono text-xs underline",
					onClick: () => void reload(),
					children: "RELOAD PUBLISHED REPORT"
				})]
			}), !desk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: "Check now has not been run in this session. The figures above are only the published file."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskResult, { report: desk })]
		})
	] });
}
function Stats({ report, listed, universities }) {
	const cards = report ? [
		[
			"Universities monitored",
			String(report.summary.monitoredUniversities).padStart(2, "0"),
			"Distinct institutions in the source list"
		],
		[
			"Sources reached",
			String(report.summary.reached).padStart(2, "0"),
			"Fetched and fingerprinted. Not date-confirmed."
		],
		[
			"Review required",
			String(report.summary.reviewRequired).padStart(2, "0"),
			"Possible changes held for a person"
		],
		[
			"Failed attempts",
			String(report.summary.failed).padStart(2, "0"),
			"Unreachable, refused, or unreadable"
		],
		[
			"Unchanged fingerprint",
			String(report.summary.unchanged).padStart(2, "0"),
			"Same bytes as the previous check"
		],
		[
			"Structured updates",
			String(report.summary.structuredApplied).padStart(2, "0"),
			"Official machine-readable values only"
		]
	] : [
		[
			"Universities on the list",
			String(universities).padStart(2, "0"),
			"Not checked"
		],
		[
			"Sources on the list",
			String(listed).padStart(2, "0"),
			"Not checked"
		],
		[
			"Sources reached",
			"—",
			"No published report"
		],
		[
			"Review required",
			"—",
			"No published report"
		],
		[
			"Failed attempts",
			"—",
			"Absence of a report is not a pass"
		],
		[
			"Structured updates",
			"—",
			"None published"
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-6 grid border border-ink md:grid-cols-3 xl:grid-cols-6",
		children: cards.map(([label, value, hint]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "border-ink border-r border-b p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-5xl font-bold leading-none tabular-nums",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-lg font-semibold uppercase leading-none",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-xs text-mute",
					children: hint
				})
			]
		}, label))
	});
}
function ProposalTable({ rows, decisions, onApprove, onReject }) {
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-3 border border-ink p-4 text-sm",
		children: "No open review items in the published report."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mt-3 divide-y divide-ink border-y border-ink",
		children: rows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "grid gap-3 py-4 lg:grid-cols-[1fr_16rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs tracking-widest text-signal",
					children: [
						item.reliable ? "STRUCTURED" : "UNCONFIRMED",
						" · ",
						decisions[item.id] === "approved" ? "APPROVED ON THIS DESK" : "REVIEW REQUIRED"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-3xl font-bold uppercase leading-none",
					children: item.universityName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm",
					children: [
						item.field,
						": ",
						item.previousValue,
						" → ",
						item.detectedValue
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-mute",
					children: item.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
						href: item.sourceUrl,
						children: "SOURCE"
					}), item.circularId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/circulars/$id",
						params: { id: item.circularId },
						className: "underline",
						children: "CIRCULAR"
					})] }) : null]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 lg:justify-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
					onClick: () => onApprove(item),
					disabled: decisions[item.id] === "approved",
					children: "Approve"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextButton, {
					tone: "ghost",
					onClick: () => onReject(item),
					children: "Reject"
				})]
			})]
		}, item.id))
	});
}
function UniversityTable({ sources, checked }) {
	const rows = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const source of sources) (source.universityIds.length ? source.universityIds : [source.primaryUniversityId]).forEach((id, index) => {
			const current = map.get(id) ?? {
				name: index === 0 ? source.primaryName : id.toUpperCase(),
				shortName: index === 0 ? source.shortName : id.toUpperCase(),
				sources: []
			};
			if (id === source.primaryUniversityId) {
				current.name = source.primaryName;
				current.shortName = source.shortName;
			}
			current.sources.push(source);
			map.set(id, current);
		});
		return [...map.entries()].sort((a, b) => a[1].shortName.localeCompare(b[1].shortName));
	}, [sources]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-4xl font-bold uppercase",
			children: "Last checked"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 overflow-x-auto border border-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[40rem] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-ink font-mono text-xs tracking-widest text-mute",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-2 font-medium",
							children: "UNIVERSITY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-2 font-medium",
							children: "LAST CHECK"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-2 font-medium",
							children: "RESULT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-2 font-medium",
							children: "SOURCES"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map(([id, row]) => {
					const last = row.sources.map((source) => source.checkedAt).filter((value) => Boolean(value)).sort().at(-1) ?? null;
					const failed = row.sources.filter((source) => source.status === "check_failed").length;
					const reached = row.sources.filter((source) => source.status !== "check_failed" && source.status !== "not_checked").length;
					let result = "NOT CHECKED";
					if (checked && failed === row.sources.length) result = "CHECK FAILED";
					else if (checked && failed > 0 && reached > 0) result = "PARTIAL";
					else if (checked && reached === row.sources.length && reached > 0) result = "REACHED";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/universities/$id",
									params: { id },
									className: "font-display text-2xl font-bold uppercase",
									children: row.shortName
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2 font-mono text-xs",
								children: last ? formatDay(last.slice(0, 10)) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-2 font-mono text-xs",
								children: result
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "p-2 font-mono text-xs text-mute",
								children: [
									reached,
									" REACHED · ",
									failed,
									" FAILED · ",
									row.sources.length,
									" LISTED"
								]
							})
						]
					}, id);
				}) })]
			})
		})]
	});
}
function DeskResult({ report }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 border border-ink p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs tracking-widest text-mute",
				children: [
					"DESK RUN ",
					report.generatedAt,
					" · NOT THE SCHEDULED JOB"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: report.note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-mono text-xs",
				children: [
					"REACHED ",
					report.summary.reached,
					" · FAILED ",
					report.summary.failed,
					" · REVIEW ",
					report.summary.reviewRequired,
					" · STRUCTURED ",
					report.summary.structuredApplied
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 divide-y divide-ink border-y border-ink",
				children: [report.proposals.slice(0, 8).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-signal",
							children: "UNVERIFIED"
						}),
						" ",
						item.universityName,
						" · ",
						item.field,
						" · ",
						item.previousValue,
						" → ",
						item.detectedValue
					]
				}, item.id)), report.proposals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-2 text-sm",
					children: "No unconfirmed discoveries in this desk run."
				}) : null]
			})
		]
	});
}
function reconcile(classified, published) {
	const previous = published?.sources.find((source) => source.sourceId === classified.check.sourceId);
	if (!previous?.contentHash || !classified.check.contentHash) return classified;
	if (previous.contentHash === classified.check.contentHash && classified.check.status === "fingerprinted") return {
		...classified,
		check: {
			...classified.check,
			status: "unchanged",
			previousHash: previous.contentHash,
			note: "Fingerprint matches the published report. Matching bytes are not a fresh confirmation of each admission date."
		}
	};
	if (previous.contentHash !== classified.check.contentHash) return {
		...classified,
		check: {
			...classified.check,
			status: classified.applied.length ? "structured_applied" : "changed",
			previousHash: previous.contentHash
		}
	};
	return classified;
}
function writeProposal(item, saveCircular) {
	if (!item.circularId || item.field === "page") return item.field === "page";
	if (DATE_FIELDS.includes(item.field)) {
		if (!isISODate(item.detectedValue)) return false;
		saveCircular(item.circularId, { [item.field]: item.detectedValue }, isCustomCircular(item.circularId));
		return true;
	}
	if (item.field === "feeBdt") {
		const fee = Number(item.detectedValue);
		if (!Number.isInteger(fee)) return false;
		saveCircular(item.circularId, { feeBdt: fee }, isCustomCircular(item.circularId));
		return true;
	}
	if (item.field === "eligibility") {
		const lines = item.detectedValue.split("\n").map((line) => line.trim()).filter(Boolean);
		if (!lines.length) return false;
		saveCircular(item.circularId, { eligibility: lines }, isCustomCircular(item.circularId));
		return true;
	}
	return false;
}
//#endregion
export { MonitorPage as component };

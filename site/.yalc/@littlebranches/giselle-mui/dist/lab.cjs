'use client';
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lab-index.ts
var lab_index_exports = {};
__export(lab_index_exports, {
  COMPACT_MILESTONE_DOT_SIZE: () => COMPACT_MILESTONE_DOT_SIZE,
  COMPACT_MIN_MILESTONE_DOT_SIZE: () => COMPACT_MIN_MILESTONE_DOT_SIZE,
  COMPACT_MIN_PHASE_DOT_SIZE: () => COMPACT_MIN_PHASE_DOT_SIZE,
  COMPACT_PHASE_DOT_SIZE: () => COMPACT_PHASE_DOT_SIZE,
  COMPACT_PHASE_ICON_SIZE: () => COMPACT_PHASE_ICON_SIZE,
  MilestoneBadge: () => MilestoneBadge,
  PhaseCard: () => PhaseCard,
  TaskDetailsRenderer: () => TaskDetailsRenderer,
  TaskList: () => TaskList,
  TimelineCompact: () => TimelineCompact,
  TimelineDot: () => TimelineDot,
  TimelineTwoColumn: () => TimelineTwoColumn,
  assignMilestoneSidesByDone: () => assignMilestoneSidesByDone,
  resolveCompactColor: () => resolveCompactColor
});
module.exports = __toCommonJS(lab_index_exports);

// src/components/lab/timeline/two-column/phase-card/phase-card.tsx
var import_react4 = require("react");

// src/components/lab/timeline/two-column/phase-warning-popover/phase-warning-popover.tsx
var import_react = require("react");
var import_Box2 = __toESM(require("@mui/material/Box"), 1);
var import_Paper = __toESM(require("@mui/material/Paper"), 1);
var import_Popper = __toESM(require("@mui/material/Popper"), 1);
var import_Slider = __toESM(require("@mui/material/Slider"), 1);
var import_Typography = __toESM(require("@mui/material/Typography"), 1);
var import_IconButton = __toESM(require("@mui/material/IconButton"), 1);
var import_Divider = __toESM(require("@mui/material/Divider"), 1);
var import_Button = __toESM(require("@mui/material/Button"), 1);
var import_ClickAwayListener = __toESM(require("@mui/material/ClickAwayListener"), 1);

// src/components/lab/timeline/two-column/two-column.utils.ts
function getLastYear(date) {
  const re = /\b(20\d{2}|19\d{2})\b/g;
  let last = null;
  let m;
  while ((m = re.exec(date)) !== null) last = m;
  return last ? Number.parseInt(last[1], 10) : null;
}
var MONTH_INDEX = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
};
var MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function parseLastDate(dateStr) {
  const re = /\b(\d\d?)?\s*([a-z]+)\s*(\d{4})\b/gi;
  let lastMatch = null;
  let m;
  while ((m = re.exec(dateStr)) !== null) {
    const year2 = Number.parseInt(m[3], 10);
    if (!(m[2].slice(0, 3).toLowerCase() in MONTH_INDEX) || year2 < 1900 || year2 > 2099) continue;
    lastMatch = m;
  }
  if (!lastMatch) return null;
  const hasDay = Boolean(lastMatch[1]);
  const month = MONTH_INDEX[lastMatch[2].slice(0, 3).toLowerCase()];
  const year = Number.parseInt(lastMatch[3], 10);
  if (!hasDay) {
    return new Date(year, month + 1, 0);
  }
  return new Date(year, month, Number.parseInt(lastMatch[1], 10));
}
function parseSortableDate(dateStr) {
  const precise = parseLastDate(dateStr);
  if (precise !== null) return precise.getTime();
  const year = getLastYear(dateStr);
  if (year !== null) return new Date(year, 0, 1).getTime();
  return null;
}
function sortPhasesByDate(phases, sortOrder = "desc") {
  if (sortOrder === "key") return [...phases].sort((a, b) => a.key - b.key);
  const dir = sortOrder === "asc" ? 1 : -1;
  return [...phases].sort((a, b) => {
    if (sortOrder === "desc") {
      if (a.active && b.active) return b.key - a.key;
      if (a.active) return -1;
      if (b.active) return 1;
    }
    const da = parseSortableDate(a.date);
    const db = parseSortableDate(b.date);
    if (da === null && db === null) return dir * (a.key - b.key);
    if (da === null) return 1;
    if (db === null) return -1;
    if (db !== da) return dir * (da - db);
    return dir * (a.key - b.key);
  });
}
function sortMilestonesAsc(milestones) {
  return [...milestones].sort((a, b) => {
    const da = a.date ? parseSortableDate(a.date) : null;
    const db = b.date ? parseSortableDate(b.date) : null;
    if (da === null && db === null) return 0;
    if (da === null) return 1;
    if (db === null) return -1;
    return da - db;
  });
}
function sortMilestonesDesc(milestones) {
  return [...milestones].sort((a, b) => {
    const da = a.date ? parseSortableDate(a.date) : null;
    const db = b.date ? parseSortableDate(b.date) : null;
    if (da === null && db === null) return 0;
    if (da === null) return 1;
    if (db === null) return -1;
    return db - da;
  });
}
function parseFirstDate(dateStr) {
  const normalized = dateStr.trim().toLowerCase();
  const re = /\b(\d\d?)?\s*([a-z]+)\s*(\d{4})\b/i;
  const m = re.exec(normalized);
  if (m) {
    const year = Number.parseInt(m[3], 10);
    const monthKey = m[2].slice(0, 3).toLowerCase();
    const month = MONTH_INDEX[monthKey];
    if (month !== void 0 && year >= 1900 && year <= 2099) {
      const day = m[1] ? Number.parseInt(m[1], 10) : 1;
      return new Date(year, month, day).getTime();
    }
  }
  const yearRe = /\b(20\d{2}|19\d{2})\b/;
  const ym = yearRe.exec(normalized);
  if (ym) return new Date(Number.parseInt(ym[1], 10), 0, 1).getTime();
  return null;
}
function detectPhaseOverlaps(phases) {
  const overlapping = /* @__PURE__ */ new Map();
  const ranges = phases.map((p) => ({
    key: p.key,
    label: `${p.title ?? String(p.key)} (${p.date})`,
    start: parseFirstDate(p.date),
    end: parseSortableDate(p.date)
  })).filter(
    (r) => r.start !== null && r.end !== null
  );
  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const a = ranges[i];
      const b = ranges[j];
      if (a.start <= b.end && b.start <= a.end) {
        if (!overlapping.has(a.key)) overlapping.set(a.key, []);
        if (!overlapping.has(b.key)) overlapping.set(b.key, []);
        overlapping.get(a.key).push(b.label);
        overlapping.get(b.key).push(a.label);
      }
    }
  }
  const result = /* @__PURE__ */ new Map();
  overlapping.forEach((others, key) => {
    result.set(key, `Date overlap with: ${others.join("; ")}`);
  });
  return result;
}
function dateToMonthIndex(dateStr) {
  const re = /\b([a-z]+)\s*(\d{4})\b/i;
  const m = re.exec(dateStr.trim());
  if (!m) return null;
  const monthKey = m[1].slice(0, 3).toLowerCase();
  const month = MONTH_INDEX[monthKey];
  const year = Number.parseInt(m[2], 10);
  if (month === void 0 || year < 1900 || year > 2099) return null;
  return year * 12 + month;
}
function monthIndexToDate(index) {
  const year = Math.floor(index / 12);
  const month = index % 12;
  return `${MONTH_NAMES[month]} ${year}`;
}
function resolveOverlaps(phases) {
  const parseable = [];
  const unparseable = [];
  for (const phase of phases) {
    const startMs = parseFirstDate(phase.date);
    const endMs = parseSortableDate(phase.date);
    if (startMs === null || endMs === null) {
      unparseable.push(phase);
      continue;
    }
    const startDate = new Date(startMs);
    const endDate = new Date(endMs);
    const startIdx = startDate.getFullYear() * 12 + startDate.getMonth();
    const endIdx = endDate.getFullYear() * 12 + endDate.getMonth();
    parseable.push({ phase, startIdx, endIdx, duration: endIdx - startIdx });
  }
  parseable.sort((a, b) => a.startIdx - b.startIdx || a.phase.key - b.phase.key);
  for (let i = 1; i < parseable.length; i++) {
    const prev = parseable[i - 1];
    const curr = parseable[i];
    if (curr.startIdx <= prev.endIdx) {
      curr.startIdx = prev.endIdx + 1;
      curr.endIdx = curr.startIdx + curr.duration;
    }
  }
  const resolved = parseable.map(({ phase, startIdx, endIdx, duration }) => {
    const newDate = duration === 0 ? monthIndexToDate(startIdx) : `${monthIndexToDate(startIdx)} \u2013 ${monthIndexToDate(endIdx)}`;
    return { ...phase, date: newDate };
  });
  return [...resolved, ...unparseable];
}
function resolvePhaseOverdue(phase, checklist, isDone, today) {
  if (!checklist || isDone) return false;
  const parsedDate = parseLastDate(phase.date);
  const isAutoOverdue = parsedDate !== null && parsedDate < today;
  return (phase.overdue ?? false) || isAutoOverdue;
}
function resolvePhaseState(phase, index, sorted, lastKey, checklist, localPhaseDone, today) {
  const isDone = checklist ? localPhaseDone[String(phase.key)] ?? false : phase.done ?? false;
  const isOverdue = resolvePhaseOverdue(phase, checklist, isDone, today);
  const colorFromData = phase.color && phase.color !== "inherit" && phase.color !== "grey" ? phase.color : null;
  const baseDotColor = colorFromData ?? (phase.side === "left" ? "secondary" : "primary");
  const dotColor = isOverdue ? "error" : baseDotColor;
  const nextPhase = sorted[index + 1];
  const thisYear = getLastYear(phase.date);
  const nextYear = nextPhase ? getLastYear(nextPhase.date) : null;
  const yearLabelValue = nextYear !== null && thisYear !== null && nextYear < thisYear ? String(nextYear) : null;
  return {
    isDone,
    isOverdue,
    dotColor,
    yearLabelValue,
    phaseMilestones: phase.milestones ?? [],
    isLastPhase: phase.key === lastKey
  };
}
function resolvePhaseDotHandlers(phase, isDone, checklist, handleTogglePhase, onPhaseSelect) {
  const dotActionLabel = isDone ? "Unmark" : "Mark";
  let dotAriaLabel;
  if (checklist) {
    dotAriaLabel = `${dotActionLabel} "${phase.title}" as done`;
  } else if (onPhaseSelect) {
    dotAriaLabel = `Select "${phase.title}"`;
  }
  let dotClickAction;
  if (checklist) {
    dotClickAction = () => handleTogglePhase(phase.key);
  } else if (onPhaseSelect) {
    dotClickAction = () => onPhaseSelect(phase.key);
  }
  const dotKeyDownHandler = dotClickAction ? (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      dotClickAction();
    }
  } : void 0;
  return { dotClickAction, dotKeyDownHandler, dotAriaLabel };
}
function buildPhaseCardTsxProps(checklist, isDone, isOverdue, dateConflict, dateConflictLabel, anyExpanded, isThisPhaseExpanded, expandableIcon) {
  return {
    done: isDone,
    overdue: checklist ? isOverdue : void 0,
    dateConflict: dateConflict || void 0,
    dateConflictLabel,
    suppressElevation: anyExpanded && !isThisPhaseExpanded,
    expandableIcon
  };
}
function dotStatusLabel(color, done, date) {
  let status;
  if (done) {
    status = "Done";
  } else if (color === "error") {
    status = "Blocking";
  } else if (color === "warning") {
    status = "In progress";
  } else if (color === "success") {
    status = "Planned";
  } else {
    status = "Upcoming";
  }
  return date ? `${status} \xB7 ${date}` : status;
}
function truncateDescription(s, maxLen = 72) {
  const parts = s.split(/[.!?](?=\s|$)/);
  const firstSentence = (parts[0] ?? "").trim();
  const text = firstSentence.length > 0 ? firstSentence : s;
  return text.length <= maxLen ? text : `${text.slice(0, maxLen).trimEnd()}\u2026`;
}
function resolvePhaseTooltip(checklist, color, done, phase) {
  if (phase.dotTooltip != null) return phase.dotTooltip;
  if (checklist) return dotStatusLabel(color, done, phase.date);
  if (phase.description) return truncateDescription(phase.description);
  const label = phase.shortTitle ?? phase.title;
  return phase.date ? `${label} \xB7 ${phase.date}` : label;
}
function resolveMilestoneTooltip(checklist, color, done, ms) {
  if (ms.dotTooltip != null) return ms.dotTooltip;
  if (checklist) return dotStatusLabel(color, done, ms.date);
  if (ms.description) return truncateDescription(ms.description);
  const label = ms.shortTitle ?? ms.title;
  return ms.date ? `${label} \xB7 ${ms.date}` : label;
}
function buildPhaseDotTsxProps(phase, checklist, isDone, dotAriaLabel, phaseToggleCounts, selectedPhaseKey) {
  let role;
  if (checklist) {
    role = "checkbox";
  } else if (dotAriaLabel) {
    role = "button";
  }
  return {
    active: (phase.active ?? false) || !checklist && phase.key === selectedPhaseKey,
    animationKey: phaseToggleCounts[String(phase.key)] ?? 0,
    done: isDone,
    role,
    "aria-checked": checklist ? isDone : void 0,
    "aria-label": dotAriaLabel,
    tabIndex: checklist || dotAriaLabel ? 0 : void 0
  };
}
function resolveMilestoneState(ms, mi, phaseKey, dotColor, checklist, localMilestoneDone) {
  const msDoneKey = `${phaseKey}-${mi}`;
  const msDone = checklist ? localMilestoneDone[msDoneKey] ?? ms.done ?? false : ms.done ?? false;
  const msIsOverdue = checklist && (ms.overdue ?? false) && !msDone;
  const msColorFromData = ms.color && ms.color !== "inherit" && ms.color !== "grey" ? ms.color : dotColor;
  let msColor;
  if (msDone) {
    msColor = "success";
  } else if (msIsOverdue) {
    msColor = "error";
  } else {
    msColor = msColorFromData;
  }
  return { msDone, msColor };
}
function resolveMilestoneDotHandlers(ms, mi, phaseKey, msDone, checklist, handleToggleMilestone) {
  const msDotActionLabel = msDone ? "Unmark" : "Mark";
  const msDotAriaLabel = checklist ? `${msDotActionLabel} "${ms.title}" as done` : void 0;
  const msDotClickAction = checklist ? () => handleToggleMilestone(phaseKey, mi) : void 0;
  const msDotKeyDown = msDotClickAction ? (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      msDotClickAction();
    }
  } : void 0;
  return { msDotClickAction, msDotKeyDown, msDotAriaLabel };
}
function computeSlotHeights(phases, heightMap) {
  const result = {};
  phases.forEach((phase) => {
    const n = phase.milestones?.length ?? 0;
    if (n === 0) return;
    let maxH = 0;
    for (let i = 0; i < n; i++) {
      const h = heightMap[`${String(phase.key)}-${i}`] ?? 0;
      if (h > maxH) maxH = h;
    }
    if (maxH > 0) {
      result[String(phase.key)] = maxH + 16;
    }
  });
  return result;
}
function isTaskDetails(details) {
  return Boolean(details) && !Array.isArray(details);
}
function resolveTaskChildren(item) {
  if (item.children && item.children.length > 0) return item.children;
  if (item.milestones && item.milestones.length > 0) return item.milestones;
  if (isTaskDetails(item.details) && item.details.tasks && item.details.tasks.length > 0) {
    return item.details.tasks;
  }
  if (Array.isArray(item.details) && item.details.length > 0) {
    return item.details.map((title, index) => ({ key: `detail-${index}`, title }));
  }
  return [];
}

// src/components/lab/timeline/two-column/phase-warning-popover/phase-warning-popover.styles.ts
var popoverPaperSx = {
  width: 340,
  p: 2,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  gap: 1.5
};
var sliderRowHeaderSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 0.25
};
var actionsRowSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 1
};
var overlapPopperSx = (theme) => ({
  zIndex: theme.zIndex.tooltip + 1
});
var warningHeaderRowSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};
var warningTitleSx = {
  display: "flex",
  alignItems: "center",
  gap: 0.5
};
var closeButtonSx = {
  ml: "auto"
};
var overlapSummarySx = {
  fontWeight: 500
};
var overlapHintSx = {
  mt: 0.5,
  display: "block"
};
var slidersColumnSx = {
  display: "flex",
  flexDirection: "column",
  gap: 1.5
};
var sliderPhaseLabelSx = {
  fontWeight: 600
};
var applyCancelRowSx = {
  display: "flex",
  gap: 1
};

// src/components/lab/timeline/two-column/phase-warning-popover/mini-gantt-ruler/mini-gantt-ruler.tsx
var import_Box = __toESM(require("@mui/material/Box"), 1);

// src/components/lab/timeline/two-column/phase-warning-popover/mini-gantt-ruler/mini-gantt-ruler.styles.ts
var ganttTrackSx = {
  position: "relative",
  height: 20,
  borderRadius: 1,
  bgcolor: "action.hover"
};
var ganttBarSx = (leftPct, widthPct, isOverlapping, sliderColor) => (theme) => ({
  position: "absolute",
  top: 4,
  height: 12,
  left: `${leftPct}%`,
  width: `${widthPct}%`,
  borderRadius: 0.5,
  opacity: isOverlapping ? 0.7 : 1,
  bgcolor: isOverlapping ? "transparent" : theme.vars.palette[sliderColor]?.main,
  ...isOverlapping && {
    background: `repeating-linear-gradient(
                  45deg,
                  ${theme.vars.palette[sliderColor]?.main} 0px,
                  ${theme.vars.palette[sliderColor]?.main} 4px,
                  transparent 4px,
                  transparent 8px
                )`
  }
});

// src/components/lab/timeline/two-column/phase-warning-popover/phase-warning-popover.utils.ts
function parsePhaseRange(phase) {
  const parts = phase.date.split(/\s*[–-]\s*/u);
  const startIdx = dateToMonthIndex(parts[0] ?? "");
  const endIdx = dateToMonthIndex(parts[parts.length - 1] ?? "");
  if (startIdx === null) return null;
  return { startIdx, endIdx: endIdx ?? startIdx };
}
function getConnectedOverlapGroup(phases, startKey) {
  const ranges = phases.map((p) => {
    const r = parsePhaseRange(p);
    return r ? { key: p.key, ...r } : null;
  }).filter((r) => r !== null);
  const adjacency = /* @__PURE__ */ new Map();
  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const a = ranges[i];
      const b = ranges[j];
      if (a.startIdx <= b.endIdx && b.startIdx <= a.endIdx) {
        if (!adjacency.has(a.key)) adjacency.set(a.key, /* @__PURE__ */ new Set());
        if (!adjacency.has(b.key)) adjacency.set(b.key, /* @__PURE__ */ new Set());
        adjacency.get(a.key).add(b.key);
        adjacency.get(b.key).add(a.key);
      }
    }
  }
  const visited = /* @__PURE__ */ new Set();
  const queue = [startKey];
  while (queue.length > 0) {
    const key = queue.shift();
    if (visited.has(key)) continue;
    visited.add(key);
    adjacency.get(key)?.forEach((neighbor) => {
      if (!visited.has(neighbor)) queue.push(neighbor);
    });
  }
  return phases.filter((p) => visited.has(p.key));
}
function computeAxis(overrides) {
  let min = Infinity;
  let max = -Infinity;
  overrides.forEach(({ startIdx, endIdx }) => {
    if (startIdx < min) min = startIdx;
    if (endIdx > max) max = endIdx;
  });
  return {
    min: Number.isFinite(min) ? min - 2 : 0,
    max: Number.isFinite(max) ? max + 2 : 24
  };
}
function hasRemainingOverlaps(overrides) {
  const ranges = Array.from(overrides.values());
  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const a = ranges[i];
      const b = ranges[j];
      if (a.startIdx <= b.endIdx && b.startIdx <= a.endIdx) return true;
    }
  }
  return false;
}
function applyOverrides(conflictingPhases, overrides) {
  return conflictingPhases.map((p) => {
    const override = overrides.get(p.key);
    if (!override) return p;
    const { startIdx, endIdx } = override;
    const newDate = startIdx === endIdx ? monthIndexToDate(startIdx) : `${monthIndexToDate(startIdx)} \u2013 ${monthIndexToDate(endIdx)}`;
    return { ...p, date: newDate };
  });
}
function mergeIntoAll(allPhases, updated) {
  const byKey = new Map(updated.map((p) => [p.key, p]));
  return allPhases.map((p) => byKey.get(p.key) ?? p);
}
function resolveSliderColor(color) {
  if (!color || color === "inherit" || color === "grey") return "primary";
  return color;
}

// src/components/lab/timeline/two-column/phase-warning-popover/mini-gantt-ruler/mini-gantt-ruler.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function MiniGanttRuler({ axis, conflictingPhases, overrides }) {
  const span = axis.max - axis.min;
  if (span <= 0) return null;
  const rangeList = Array.from(overrides.entries());
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Box.default, { "aria-hidden": true, sx: ganttTrackSx, children: conflictingPhases.map((phase) => {
    const override = overrides.get(phase.key);
    if (!override) return null;
    const leftPct = (override.startIdx - axis.min) / span * 100;
    const widthPct = Math.max(1, (override.endIdx - override.startIdx) / span * 100);
    const sliderColor = resolveSliderColor(phase.color);
    const isOverlapping = rangeList.some(
      ([otherKey, other]) => otherKey !== phase.key && override.startIdx <= other.endIdx && other.startIdx <= override.endIdx
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Box.default, { sx: ganttBarSx(leftPct, widthPct, isOverlapping, sliderColor) }, phase.key);
  }) });
}

// src/components/lab/timeline/two-column/phase-warning-popover/phase-warning-popover.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function PhaseWarningPopover({
  open,
  anchorEl,
  onClose,
  allPhases,
  currentPhase,
  onPhasesChange
}) {
  const conflictingPhases = (0, import_react.useMemo)(
    () => getConnectedOverlapGroup(allPhases, currentPhase.key),
    [allPhases, currentPhase.key]
  );
  const [overrides, setOverrides] = (0, import_react.useState)(() => /* @__PURE__ */ new Map());
  const [pendingApply, setPendingApply] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const initial = /* @__PURE__ */ new Map();
    for (const p of conflictingPhases) {
      const range = parsePhaseRange(p);
      if (range) initial.set(p.key, range);
    }
    setOverrides(initial);
    setPendingApply(false);
  }, [open, conflictingPhases]);
  const axis = (0, import_react.useMemo)(() => computeAxis(overrides), [overrides]);
  const stillOverlapping = (0, import_react.useMemo)(() => hasRemainingOverlaps(overrides), [overrides]);
  const handleSliderChange = (0, import_react.useCallback)((phaseKey, value) => {
    if (!Array.isArray(value)) return;
    const [start, end] = value;
    setOverrides((prev) => {
      const next = new Map(prev);
      next.set(phaseKey, { startIdx: start, endIdx: end });
      return next;
    });
    setPendingApply(false);
  }, []);
  const handleMakeSequential = (0, import_react.useCallback)(() => {
    const withOverrides = applyOverrides(conflictingPhases, overrides);
    const resolved = resolveOverlaps(withOverrides);
    const next = /* @__PURE__ */ new Map();
    for (const p of resolved) {
      const range = parsePhaseRange(p);
      if (range) next.set(p.key, range);
    }
    setOverrides(next);
    setPendingApply(true);
  }, [conflictingPhases, overrides]);
  const handleApply = (0, import_react.useCallback)(() => {
    const withOverrides = applyOverrides(conflictingPhases, overrides);
    const merged = mergeIntoAll(allPhases, withOverrides);
    onPhasesChange(merged);
    onClose();
  }, [conflictingPhases, overrides, allPhases, onPhasesChange, onClose]);
  const handleCancel = (0, import_react.useCallback)(() => {
    const initial = /* @__PURE__ */ new Map();
    for (const p of conflictingPhases) {
      const range = parsePhaseRange(p);
      if (range) initial.set(p.key, range);
    }
    setOverrides(initial);
    setPendingApply(false);
  }, [conflictingPhases]);
  const warningCount = conflictingPhases.length;
  if (!open || !anchorEl) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_Popper.default,
    {
      open,
      anchorEl,
      placement: "bottom-start",
      modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
      sx: overlapPopperSx,
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ClickAwayListener.default, { onClickAway: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_Paper.default, { elevation: 8, sx: popoverPaperSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_Box2.default, { sx: warningHeaderRowSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_Typography.default, { variant: "subtitle2", sx: warningTitleSx, children: [
            "\u26A0 ",
            warningCount,
            " date overlap",
            warningCount !== 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_IconButton.default,
            {
              size: "small",
              onClick: onClose,
              "aria-label": "Close warning panel",
              sx: closeButtonSx,
              children: "\xD7"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_Divider.default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_Box2.default, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_Typography.default, { variant: "body2", color: "warning.main", sx: overlapSummarySx, children: `Overlap: ${conflictingPhases.map((p) => p.shortTitle ?? p.title).join(" \u2194 ")}` }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_Typography.default, { variant: "caption", color: "text.secondary", sx: overlapHintSx, children: [
            currentPhase.shortTitle ?? currentPhase.title,
            " \u2014 adjust sliders or use Make sequential."
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_Divider.default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_Box2.default, { sx: slidersColumnSx, children: conflictingPhases.map((phase) => {
          const override = overrides.get(phase.key);
          if (!override) return null;
          const sliderColor = resolveSliderColor(phase.color);
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_Box2.default, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_Box2.default, { sx: sliderRowHeaderSx, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_Typography.default, { variant: "caption", sx: sliderPhaseLabelSx, children: phase.shortTitle ?? phase.title }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_Typography.default, { variant: "caption", color: "text.secondary", children: [
                monthIndexToDate(override.startIdx),
                " \u2013 ",
                monthIndexToDate(override.endIdx)
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              import_Slider.default,
              {
                value: [override.startIdx, override.endIdx],
                min: axis.min,
                max: axis.max,
                step: 1,
                color: sliderColor,
                disableSwap: true,
                size: "small",
                onChange: (_e, v) => handleSliderChange(phase.key, v),
                "aria-label": `Date range for ${phase.shortTitle ?? phase.title}`
              }
            )
          ] }, phase.key);
        }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MiniGanttRuler, { axis, conflictingPhases, overrides }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_Divider.default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_Box2.default, { sx: actionsRowSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_Button.default,
            {
              size: "small",
              variant: "outlined",
              color: "warning",
              disabled: !stillOverlapping,
              onClick: handleMakeSequential,
              children: "Make sequential"
            }
          ),
          pendingApply && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_Box2.default, { sx: applyCancelRowSx, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              import_Button.default,
              {
                size: "small",
                variant: "contained",
                color: "success",
                onClick: handleApply,
                "aria-label": "Apply date changes",
                children: "Apply"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              import_Button.default,
              {
                size: "small",
                variant: "outlined",
                onClick: handleCancel,
                "aria-label": "Cancel date changes",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ] }) })
    }
  );
}

// src/components/lab/timeline/two-column/phase-card/phase-card.tsx
var import_Box10 = __toESM(require("@mui/material/Box"), 1);
var import_Paper2 = __toESM(require("@mui/material/Paper"), 1);
var import_Tooltip4 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography6 = __toESM(require("@mui/material/Typography"), 1);

// src/components/lab/timeline/two-column/icons.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var DEFAULT_EXPANDABLE_ICON = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M8.308 5.148a3.15 3.15 0 0 1-3.154 3.148A3.15 3.15 0 0 1 2 5.148A3.15 3.15 0 0 1 5.154 2a3.15 3.15 0 0 1 3.154 3.148M5.154 6.296a1.15 1.15 0 0 0 1.154-1.148A1.15 1.15 0 0 0 5.154 4A1.15 1.15 0 0 0 4 5.148a1.15 1.15 0 0 0 1.154 1.148M21 18.924a3.15 3.15 0 0 1-3.154 3.147a3.15 3.15 0 0 1-3.154-3.148a3.15 3.15 0 0 1 3.154-3.147c1.732 0 3.154 1.4 3.154 3.148m-3.154 1.147A1.15 1.15 0 0 0 19 18.923c0-.633-.517-1.147-1.154-1.147a1.15 1.15 0 0 0-1.154 1.148a1.15 1.15 0 0 0 1.154 1.147M21 11.462a3.15 3.15 0 0 1-3.154 3.148a3.15 3.15 0 0 1-3.154-3.148a3.15 3.15 0 0 1 3.154-3.148A3.15 3.15 0 0 1 21 11.462m-3.154 1.148A1.15 1.15 0 0 0 19 11.462c0-.634-.517-1.148-1.154-1.148a1.15 1.15 0 0 0-1.154 1.148a1.15 1.15 0 0 0 1.154 1.148" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M5.154 7.018a1 1 0 0 1 1 1v6.784a3.154 3.154 0 0 0 3.13 3.154l5.724.044a1 1 0 0 1-.016 2l-5.724-.044a5.154 5.154 0 0 1-5.114-5.154V8.018a1 1 0 0 1 1-1" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M9.172 12.462a5.02 5.02 0 0 1-5.018-5.018h2a3.02 3.02 0 0 0 3.018 3.018H15a1 1 0 1 1 0 2z" })
    ] }) })
  }
);

// src/components/lab/timeline/two-column/phase-card/phase-card.utils.ts
function resolveCornerBadgeAlign(columnSide) {
  if (columnSide === "left") {
    return { left: 0, transform: "translate(-50%, -50%)", tooltipPlacement: "top-start" };
  }
  return { right: 0, transform: "translate(50%, -50%)", tooltipPlacement: "top-end" };
}
function resolvePhotoSources(phase) {
  return phase.photos ?? (phase.photo ? [phase.photo] : null);
}
function isHighlightedVariant(variant) {
  return variant === "scenario" || variant === "life-event";
}
function resolveTaskChildren2(phase) {
  if (phase.children?.length) return phase.children;
  if (phase.details?.length) {
    return phase.details.map((title, index) => ({ key: `detail-${index}`, title }));
  }
  return [];
}
function buildCardClickHandler(hasDetails, toggle) {
  return () => {
    if (hasDetails) toggle();
  };
}
function buildCardKeyDownHandler(hasDetails, toggle) {
  return (e) => {
    if (hasDetails && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggle();
    }
  };
}
function resolveCardExpansion(onRequestExpand, isExpanded, internalExpanded, setInternalExpanded) {
  if (onRequestExpand === void 0) {
    return { expanded: internalExpanded, toggle: () => setInternalExpanded((v) => !v) };
  }
  return { expanded: isExpanded ?? false, toggle: onRequestExpand };
}
function derivePlatformEntry(p) {
  const isString = typeof p === "string";
  const label = isString ? p : p.label;
  const icon = isString ? null : p.icon;
  return { label, icon, hasTextFallback: isString };
}

// src/components/lab/timeline/two-column/phase-card/platform-strip/platform-strip.tsx
var import_Box3 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip = __toESM(require("@mui/material/Tooltip"), 1);

// src/components/lab/timeline/two-column/phase-card/platform-strip/platform-strip.styles.ts
var platformStripItemSlotSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
var platformStripItemLabelSx = {
  fontSize: 11,
  px: 0.5
};

// src/components/lab/timeline/two-column/phase-card/platform-strip/platform-strip.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function buildPlatformStripItems(platforms) {
  return platforms.map((p, i) => {
    const { label, icon } = derivePlatformEntry(p);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_Tooltip.default, { title: label, arrow: true, placement: "top", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_Box3.default, { sx: platformStripItemSlotSx, children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_Box3.default, { component: "span", sx: platformStripItemLabelSx, children: label }) }) }, `platform-${i}`);
  });
}

// src/components/lab/timeline/two-column/animations.ts
var import_react2 = require("@emotion/react");
var pulseRing = import_react2.keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.6); opacity: 0; }
`;
var pulseDot = import_react2.keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;
var checkPop = import_react2.keyframes`
  0%   { transform: scale(0.3); opacity: 0; }
  55%  { transform: scale(1.25); opacity: 1; }
  75%  { transform: scale(0.92); }
  100% { transform: scale(1); opacity: 1; }
`;

// src/components/lab/timeline/two-column/phase-card/phase-card.const.ts
var PHASE_PILL_ICON_SIZE = 16;
var PHASE_PILL_TEXT_FONT_SIZE = "0.75rem";

// src/components/lab/timeline/two-column/phase-card/phase-card.styles.ts
var phaseCardRootSx = {
  position: "relative"
};
var phaseContentRowSx = {
  display: "flex",
  alignItems: "flex-start",
  gap: 1
};
var phaseContentColumnSx = {
  flex: 1
};
var phaseTitleSx = ({
  isHighlighted,
  hideDecoration,
  hasDetails
}) => ({
  pr: !isHighlighted && !hideDecoration ? 6 : 0,
  mb: hasDetails ? 0.5 : 1
});
var detailCountPillSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  mb: 1,
  px: 0.75,
  py: 0.25,
  borderRadius: 1,
  bgcolor: "action.hover",
  color: "text.secondary"
};
var phasePillTextSx = {
  fontWeight: 600,
  lineHeight: 1,
  fontSize: PHASE_PILL_TEXT_FONT_SIZE
};
var phaseDescriptionSx = {
  color: "text.secondary",
  mt: 0.5
};
var phaseFooterSlotSx = {
  mt: 1
};
var logoStripSx = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 2.5
};
var clientLogoSx = {
  height: 40,
  width: "auto",
  maxWidth: 140,
  objectFit: "contain",
  opacity: 0.7,
  filter: "grayscale(1)",
  transition: "opacity 0.2s, filter 0.2s",
  "&:hover": { opacity: 1, filter: "none" }
};
var platformStripSx = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 1
};
var projectLogoSx = {
  height: 28,
  width: "auto",
  maxWidth: 100,
  objectFit: "contain",
  opacity: 0.85,
  transition: "opacity 0.2s",
  "&:hover": { opacity: 1 }
};
var photoImgSx = (isFirst) => ({
  mt: isFirst ? 2 : 1,
  width: "100%",
  maxWidth: 200,
  aspectRatio: "4/3",
  objectFit: "cover",
  borderRadius: 1.5,
  border: "2px solid",
  borderColor: "divider",
  display: "block"
});
function buildPaperSx(p) {
  return (theme) => ({
    p: 2.5,
    position: "relative",
    overflow: "hidden",
    textAlign: p.textAlign ?? "left",
    bgcolor: `rgba(${theme.vars.palette.grey["500Channel"]} / 0.08)`,
    transition: p.hasDetails ? "box-shadow 0.2s, opacity 0.3s, filter 0.3s" : "opacity 0.3s, filter 0.3s",
    ...p.hasDetails && {
      cursor: "pointer",
      "&:hover": {
        boxShadow: `0 16px 40px rgba(${theme.vars.palette[p.color ?? "primary"]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.22)`
      },
      "&:focus-visible": {
        outline: "2px solid",
        outlineColor: theme.vars.palette[p.color ?? "primary"]?.main ?? theme.vars.palette.primary.main,
        outlineOffset: 3
      }
    },
    ...p.isDone && {
      opacity: 0.45,
      filter: "grayscale(1)",
      "&:hover": {
        opacity: 1,
        filter: "none",
        ...p.hasDetails && {
          boxShadow: `0 16px 40px rgba(${theme.vars.palette[p.color ?? "primary"]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.22)`
        }
      }
    },
    ...p.phaseSide === "left" && !p.isHighlighted && {
      bgcolor: "background.paper",
      borderTop: "3px solid",
      borderColor: `${p.color ?? "primary"}.main`,
      boxShadow: `0 8px 24px rgba(${theme.vars.palette[p.color ?? "primary"]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.12)`
    },
    ...p.isHighlighted && {
      borderLeft: "4px solid",
      borderColor: `${p.color}.main`,
      bgcolor: `rgba(${theme.vars.palette[p.color]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / ${p.isScenario ? 0.1 : 0.08})`
    },
    ...p.isOverdue && !p.isDone && {
      border: "2px solid",
      borderColor: "error.main",
      boxShadow: `0 0 0 2px rgba(${theme.vars.palette.error.mainChannel} / 0.2), 0 8px 32px rgba(${theme.vars.palette.error.mainChannel} / 0.18)`
    },
    ...p.suppressElevation && { boxShadow: "none" }
  });
}
function buildDateTypographySx({
  isScenario,
  isHighlighted,
  hideDecoration,
  color
}) {
  return {
    display: "block",
    mb: 1.5,
    pr: !isHighlighted && !hideDecoration ? 6 : 0,
    fontSize: isScenario ? "0.875rem" : "0.8rem",
    fontWeight: isScenario ? 800 : void 0,
    letterSpacing: isScenario ? 0 : void 0,
    color: isScenario ? `${color ?? "primary"}.main` : "text.disabled"
  };
}
var pillIconBoxSx = (iconSize) => ({
  display: "inline-flex",
  flexShrink: 0,
  "& svg": { width: iconSize, height: iconSize }
});

// src/components/lab/timeline/two-column/phase-card/labeled-icon-strip/labeled-icon-strip.tsx
var import_Box4 = __toESM(require("@mui/material/Box"), 1);
var import_Typography2 = __toESM(require("@mui/material/Typography"), 1);

// src/components/lab/timeline/two-column/phase-card/labeled-icon-strip/labeled-icon-strip.styles.ts
var labeledIconStripLabelSx = {
  display: "block",
  mb: 1,
  fontSize: "0.75rem",
  color: "text.disabled"
};
var labeledIconStripWrapperSx = {
  mt: 2.5
};

// src/components/lab/timeline/two-column/phase-card/labeled-icon-strip/labeled-icon-strip.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function LabeledIconStrip({ label, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_Box4.default, { sx: labeledIconStripWrapperSx, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_Typography2.default, { variant: "overline", sx: labeledIconStripLabelSx, children: label }),
    children
  ] });
}

// src/components/lab/timeline/two-column/phase-card/card-detail-bullets/card-detail-bullets.tsx
var import_Box6 = __toESM(require("@mui/material/Box"), 1);
var import_Collapse = __toESM(require("@mui/material/Collapse"), 1);
var import_Typography3 = __toESM(require("@mui/material/Typography"), 1);

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
var import_react3 = require("@iconify/react");
var import_Box5 = __toESM(require("@mui/material/Box"), 1);

// src/components/material/data-display/icon/giselle/giselle-icon.styles.ts
var giselleIconRootSx = (width, height) => ({
  lineHeight: 0,
  display: "inline-flex",
  flexShrink: 0,
  width,
  height
});

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function GiselleIcon({
  icon,
  width = 20,
  height,
  sx,
  className,
  style,
  flip,
  rotate,
  ...other
}) {
  const h = height ?? width;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    import_Box5.default,
    {
      component: "span",
      sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        import_react3.Icon,
        {
          icon,
          width: "100%",
          height: "100%",
          flip,
          rotate,
          className,
          style
        }
      )
    }
  );
}

// src/components/lab/timeline/two-column/phase-card/card-detail-bullets/card-detail-bullets.styles.ts
var detailBulletsContainerSx = {
  mt: 1.5,
  pt: 1.5,
  borderTop: "1px solid",
  borderColor: "divider",
  display: "flex",
  flexDirection: "column",
  gap: 0.75
};
var taskRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  py: 0.25
};
var taskToggleButtonSx = {
  all: "unset",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  transition: "color 0.2s",
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: "primary.main",
    borderRadius: "50%"
  }
};
var taskIconStaticSx = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  transition: "color 0.2s"
};
var taskTitleSx = (isDone) => ({
  color: isDone ? "text.disabled" : "text.secondary",
  lineHeight: 1.6,
  textDecoration: isDone ? "line-through" : "none",
  transition: "color 0.2s, text-decoration 0.2s"
});
var taskToggleColorSx = (isDone) => ({
  color: isDone ? "success.main" : "text.disabled",
  "&:hover": { color: isDone ? "success.dark" : "text.secondary" }
});
var taskIconColorSx = (isDone) => ({
  color: isDone ? "success.main" : "text.disabled"
});

// src/components/lab/timeline/two-column/phase-card/card-detail-bullets/card-detail-bullets.const.ts
var PHASE_TASK_ICON_SIZE = 16;

// src/components/lab/timeline/two-column/phase-card/card-detail-bullets/card-detail-bullets.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function CardDetailBullets({
  id,
  details,
  in: expanded,
  taskDoneStates,
  onToggleTask
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_Collapse.default, { in: expanded, timeout: 50, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_Box6.default, { id, sx: detailBulletsContainerSx, children: details.map((task, i) => {
    const taskKey = String(task.key);
    const isDoneTask = taskDoneStates ? taskDoneStates[taskKey] ?? taskDoneStates[`idx-${i}`] ?? false : task.done ?? false;
    const toggleLabel = isDoneTask ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`;
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_Box6.default, { sx: taskRowSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        import_Box6.default,
        {
          component: onToggleTask ? "button" : "span",
          type: onToggleTask ? "button" : void 0,
          "aria-label": onToggleTask ? toggleLabel : void 0,
          "aria-pressed": onToggleTask ? isDoneTask : void 0,
          onClick: onToggleTask ? (e) => {
            e.stopPropagation();
            onToggleTask(i, !isDoneTask);
          } : void 0,
          sx: onToggleTask ? [taskToggleButtonSx, taskToggleColorSx(isDoneTask)] : [taskIconStaticSx, taskIconColorSx(isDoneTask)],
          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            GiselleIcon,
            {
              icon: isDoneTask ? "solar:check-circle-bold" : "solar:record-minimalistic-outline",
              width: PHASE_TASK_ICON_SIZE
            }
          )
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_Typography3.default, { variant: "body2", sx: taskTitleSx(isDoneTask), children: task.title })
    ] }, i);
  }) }) });
}

// src/components/lab/timeline/two-column/phase-card/card-corner-alert-badge/card-corner-alert-badge.tsx
var import_Box7 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip2 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography4 = __toESM(require("@mui/material/Typography"), 1);

// src/components/lab/timeline/two-column/phase-card/card-corner-alert-badge/card-corner-alert-badge.styles.ts
var tooltipAlertListSx = {
  display: "flex",
  flexDirection: "column",
  gap: 1.25,
  py: 0.5,
  px: 0.25
};
var tooltipAlertRowSx = {
  display: "flex",
  alignItems: "flex-start",
  gap: 1
};
var tooltipAlertMessageSx = {
  lineHeight: 1.55,
  fontSize: "0.8rem",
  fontWeight: 500
};
var cornerBadgeCircleSx = (opts) => (theme) => ({
  position: "absolute",
  top: 0,
  ...opts.positionOverride,
  zIndex: 10,
  transform: opts.transform,
  width: opts.badgeSize ?? 26,
  height: opts.badgeSize ?? 26,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: opts.hasError ? "error.main" : "warning.dark",
  color: "common.white",
  boxShadow: `0 2px 6px rgba(${theme.vars.palette.grey["900Channel"]} / 0.3)`,
  cursor: opts.hasClickHandler ? "pointer" : "help",
  pointerEvents: "auto",
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: opts.hasError ? "error.main" : "warning.dark",
    outlineOffset: 2
  }
});
var cornerAlertTooltipSx = {
  maxWidth: 320,
  px: 1.75,
  py: 1.25,
  bgcolor: "grey.900",
  "& .MuiTooltip-arrow": { color: "grey.900" }
};

// src/components/lab/timeline/two-column/phase-card/card-corner-alert-badge/card-corner-alert-badge.const.ts
var CORNER_ALERT_BADGE_SIZE = 26;
var CORNER_ALERT_ICON_SIZE = 16;
var CORNER_ALERT_LIST_ICON_SIZE = 16;

// src/components/lab/timeline/two-column/phase-card/card-corner-alert-badge/card-corner-alert-badge.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function CardCornerAlertBadge({
  alerts,
  columnSide = "right",
  onClick,
  innerRef
}) {
  if (alerts.length === 0) return null;
  const hasError = alerts.some((a) => a.severity === "error");
  const { left, right, transform, tooltipPlacement } = resolveCornerBadgeAlign(columnSide);
  const tooltipContent = /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_Box7.default, { sx: tooltipAlertListSx, children: alerts.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_Box7.default, { sx: tooltipAlertRowSx, children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      GiselleIcon,
      {
        icon: "solar:danger-triangle-bold",
        width: CORNER_ALERT_LIST_ICON_SIZE,
        "aria-hidden": true,
        style: { flexShrink: 0, marginTop: 2 }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_Typography4.default, { variant: "body2", sx: tooltipAlertMessageSx, children: a.message })
  ] }, i)) });
  const badgeCircle = /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    import_Box7.default,
    {
      ref: innerRef,
      role: onClick ? "button" : void 0,
      "aria-label": `${alerts.length} issue${alerts.length === 1 ? "" : "s"}`,
      tabIndex: 0,
      onClick,
      onKeyDown: onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : void 0,
      sx: cornerBadgeCircleSx({
        positionOverride: left === void 0 ? { right } : { left },
        transform,
        hasError,
        hasClickHandler: !!onClick,
        badgeSize: CORNER_ALERT_BADGE_SIZE
      }),
      children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(GiselleIcon, { icon: "solar:danger-triangle-bold", width: CORNER_ALERT_ICON_SIZE, "aria-hidden": true })
    }
  );
  if (onClick) return badgeCircle;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    import_Tooltip2.default,
    {
      title: tooltipContent,
      placement: tooltipPlacement,
      arrow: true,
      slotProps: { tooltip: { sx: cornerAlertTooltipSx } },
      children: badgeCircle
    }
  );
}

// src/components/lab/timeline/two-column/phase-card/card-status-badge/scenario-badge/scenario-badge.tsx
var import_Typography5 = __toESM(require("@mui/material/Typography"), 1);

// src/components/lab/timeline/two-column/phase-card/card-status-badge/scenario-badge/scenario-badge.styles.ts
var scenarioBadgeSx = (color) => ({
  display: "inline-block",
  mb: 1,
  px: 1,
  py: 0.25,
  borderRadius: 0.75,
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: 0.8,
  color: `${color}.dark`,
  bgcolor: `rgba(var(--mui-palette-${color}-mainChannel) / 0.12)`
});

// src/components/lab/timeline/two-column/phase-card/card-status-badge/scenario-badge/scenario-badge.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function ScenarioBadge({ color, scenarioLabel }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_Typography5.default, { variant: "overline", sx: scenarioBadgeSx(color), children: scenarioLabel });
}

// src/components/lab/timeline/two-column/phase-card/card-status-badge/card-status-badge.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function CardStatusBadge({ color, isScenario, scenarioLabel }) {
  if (!isScenario || !scenarioLabel) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ScenarioBadge, { color, scenarioLabel });
}

// src/components/lab/timeline/two-column/phase-card/card-decoration/card-decoration.tsx
var import_Box8 = __toESM(require("@mui/material/Box"), 1);

// src/components/lab/timeline/two-column/phase-card/card-decoration/card-decoration.styles.ts
var buildCardDecorationGradientSx = (color, isOverduePending) => (theme) => ({
  top: -40,
  right: -56,
  width: 140,
  height: 140,
  borderRadius: 4,
  position: "absolute",
  transform: "rotate(40deg)",
  pointerEvents: "none",
  background: `linear-gradient(to right, ${theme.vars.palette[isOverduePending ? "error" : color]?.main ?? theme.vars.palette.primary.main}, transparent)`,
  opacity: isOverduePending ? 0.18 : 0.08
});
var phaseCardIconBoxSx = (color, isOverduePending) => (theme) => ({
  top: 16,
  right: 16,
  width: 36,
  height: 36,
  position: "absolute",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // Force the icon SVG to 32 × 32 via CSS instead of cloneElement,
  // so the icon element can remain an RSC-created React element.
  "& svg": { width: 32, height: 32 },
  color: isOverduePending ? theme.vars.palette.error.main : theme.vars.palette[color]?.main ?? theme.vars.palette.primary.main,
  opacity: isOverduePending ? 0.55 : 0.35
});

// src/components/lab/timeline/two-column/phase-card/card-decoration/card-decoration.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
function CardDecoration({ color, isOverduePending, icon }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Box8.default, { "aria-hidden": true, sx: buildCardDecorationGradientSx(color, isOverduePending) }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Box8.default, { "aria-hidden": "true", sx: phaseCardIconBoxSx(color, isOverduePending), children: icon })
  ] });
}

// src/components/lab/timeline/two-column/phase-card/eye-button/eye-button.tsx
var import_Box9 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip3 = __toESM(require("@mui/material/Tooltip"), 1);

// src/components/lab/timeline/two-column/phase-card/eye-button/eye-button.styles.ts
var eyeButtonSx = (opts) => ({
  position: "absolute",
  bottom: 0,
  ...opts.columnSide === "left" ? { left: 0 } : { right: 0 },
  transform: "translate(0, calc(100% + 8px))",
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: opts.minSize ?? 28,
  minHeight: opts.minSize ?? 28,
  background: "none",
  border: "none",
  cursor: "pointer",
  p: 0,
  color: opts.isViewed ? "success.main" : "text.secondary",
  transition: "color 0.15s",
  "&:hover": { color: opts.isViewed ? "success.dark" : "text.primary" },
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: opts.isViewed ? "success.main" : "primary.main",
    outlineOffset: 2,
    borderRadius: 0.5
  }
});

// src/components/lab/timeline/two-column/phase-card/eye-button/eye-button.const.ts
var PHASE_EYE_ICON_SIZE = 20;
var EYE_BUTTON_MIN_SIZE = 28;

// src/components/lab/timeline/two-column/phase-card/eye-button/eye-button.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function EyeButton({ isViewed, onMarkViewed, columnSide }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    import_Tooltip3.default,
    {
      title: isViewed ? "Mark as not viewed" : "Mark as viewed",
      placement: columnSide === "left" ? "right" : "left",
      arrow: true,
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        import_Box9.default,
        {
          component: "button",
          type: "button",
          onClick: (e) => {
            e.stopPropagation();
            onMarkViewed();
          },
          "aria-label": isViewed ? "Mark as not viewed" : "Mark as viewed",
          "aria-pressed": isViewed,
          sx: eyeButtonSx({ columnSide, isViewed, minSize: EYE_BUTTON_MIN_SIZE }),
          children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            GiselleIcon,
            {
              icon: isViewed ? "solar:eye-bold" : "solar:eye-outline",
              width: PHASE_EYE_ICON_SIZE,
              "aria-hidden": true
            }
          )
        }
      )
    }
  );
}

// src/components/lab/timeline/two-column/phase-card/phase-card.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function PhaseCard({
  phase,
  done,
  overdue,
  dateConflict = false,
  dateConflictLabel,
  isExpanded,
  onRequestExpand,
  suppressElevation = false,
  expandableIcon,
  isViewed = false,
  onMarkViewed,
  columnSide = "right",
  onPhasesChange,
  allPhases,
  taskDoneStates,
  onToggleTask,
  sx,
  ...other
}) {
  const badgeRef = (0, import_react4.useRef)(null);
  const [popoverOpen, setPopoverOpen] = (0, import_react4.useState)(false);
  const handleOpenPopover = (0, import_react4.useCallback)(() => setPopoverOpen(true), []);
  const handleClosePopover = (0, import_react4.useCallback)(() => setPopoverOpen(false), []);
  const popoverMode = Boolean(onPhasesChange && allPhases);
  const isDone = done ?? phase.done ?? false;
  const isOverdue = overdue ?? phase.overdue ?? false;
  const [internalExpanded, setInternalExpanded] = (0, import_react4.useState)(false);
  const [isHovered, setIsHovered] = (0, import_react4.useState)(false);
  const handleMouseEnter = (0, import_react4.useCallback)(() => setIsHovered(true), []);
  const handleMouseLeave = (0, import_react4.useCallback)(() => setIsHovered(false), []);
  const taskChildren = resolveTaskChildren2(phase);
  const hasDetails = taskChildren.length > 0;
  const isScenario = phase.variant === "scenario";
  const isHighlighted = isHighlightedVariant(phase.variant);
  const detailsId = `timeline-details-${String(phase.key).replace(".", "-")}`;
  const { expanded, toggle } = resolveCardExpansion(
    onRequestExpand,
    isExpanded,
    internalExpanded,
    setInternalExpanded
  );
  const displayTitle = expanded || isHovered ? phase.title : phase.shortTitle ?? phase.title;
  const handleClick = buildCardClickHandler(hasDetails, toggle);
  const handleKeyDown = buildCardKeyDownHandler(hasDetails, toggle);
  const cornerAlerts = [];
  if (isOverdue && !isDone) {
    cornerAlerts.push({ message: "Overdue \u2014 past due date", severity: "error" });
  }
  if (dateConflict) {
    cornerAlerts.push({
      message: dateConflictLabel ?? "Date overlap with another phase",
      severity: "warning"
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_Box10.default, { sx: [phaseCardRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      CardCornerAlertBadge,
      {
        alerts: cornerAlerts,
        columnSide,
        onClick: popoverMode ? handleOpenPopover : void 0,
        innerRef: popoverMode ? badgeRef : void 0
      }
    ),
    popoverMode && onPhasesChange && allPhases && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      PhaseWarningPopover,
      {
        open: popoverOpen,
        anchorEl: badgeRef.current,
        onClose: handleClosePopover,
        currentPhase: phase,
        allPhases,
        onPhasesChange
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
      import_Paper2.default,
      {
        role: hasDetails ? "button" : void 0,
        tabIndex: hasDetails ? 0 : void 0,
        "aria-expanded": hasDetails ? expanded : void 0,
        "aria-controls": hasDetails ? detailsId : void 0,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        sx: [
          buildPaperSx({
            hasDetails,
            isDone,
            color: phase.color ?? "primary",
            phaseSide: phase.side,
            isHighlighted,
            isScenario,
            isOverdue,
            suppressElevation,
            textAlign: phase.textAlign
          })
        ],
        children: [
          !isHighlighted && !phase.hideDecoration && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            CardDecoration,
            {
              color: phase.color ?? "primary",
              isOverduePending: isOverdue && !isDone,
              icon: phase.icon
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            CardStatusBadge,
            {
              color: phase.color ?? "primary",
              isScenario,
              scenarioLabel: phase.scenarioLabel
            }
          ),
          !phase.hideDate && phase.date && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            import_Typography6.default,
            {
              variant: "subtitle2",
              sx: buildDateTypographySx({
                isScenario,
                isHighlighted,
                hideDecoration: phase.hideDecoration,
                color: phase.color
              }),
              children: phase.date
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box10.default, { sx: phaseContentRowSx, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_Box10.default, { sx: phaseContentColumnSx, children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              import_Typography6.default,
              {
                variant: isScenario ? "h6" : "subtitle1",
                sx: phaseTitleSx({
                  isHighlighted,
                  hideDecoration: phase.hideDecoration,
                  hasDetails
                }),
                children: displayTitle
              }
            ),
            hasDetails && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              import_Box10.default,
              {
                sx: detailCountPillSx,
                "aria-label": `${taskChildren.length} expandable detail${taskChildren.length === 1 ? "" : "s"}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box10.default, { component: "span", sx: pillIconBoxSx(PHASE_PILL_ICON_SIZE), children: expandableIcon ?? DEFAULT_EXPANDABLE_ICON }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Typography6.default, { component: "span", variant: "caption", sx: phasePillTextSx, children: taskChildren.length })
                ]
              }
            ),
            expanded && phase.description && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Typography6.default, { variant: "body2", sx: phaseDescriptionSx, children: phase.description }),
            expanded && resolvePhotoSources(phase)?.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box10.default, { component: "img", src: p.src, alt: p.alt, sx: photoImgSx(i === 0) }, i)),
            expanded && phase.clients && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(LabeledIconStrip, { label: phase.clientsLabel, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box10.default, { sx: logoStripSx, children: phase.clients.map(({ name, logo }) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Tooltip4.default, { title: name, arrow: true, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box10.default, { component: "img", src: logo, alt: name, sx: clientLogoSx }) }, name)) }) }),
            expanded && phase.platforms && phase.platforms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(LabeledIconStrip, { label: phase.platformsLabel ?? "Tech Stack", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box10.default, { sx: platformStripSx, children: buildPlatformStripItems(phase.platforms) }) }),
            expanded && phase.projects && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(LabeledIconStrip, { label: phase.projectsLabel, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box10.default, { sx: logoStripSx, children: phase.projects.map(({ name, logo }) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box10.default, { component: "img", src: logo, alt: name, sx: projectLogoSx }, name)) }) }),
            expanded && phase.footer != null && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box10.default, { sx: phaseFooterSlotSx, onClick: (e) => e.stopPropagation(), children: phase.footer })
          ] }) }),
          hasDetails && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            CardDetailBullets,
            {
              id: detailsId,
              details: taskChildren,
              in: expanded,
              taskDoneStates,
              onToggleTask
            }
          )
        ]
      }
    ),
    onMarkViewed && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(EyeButton, { isViewed, onMarkViewed, columnSide })
  ] });
}

// src/components/lab/timeline/two-column/milestone-badge/milestone-badge.tsx
var import_react5 = require("react");
var import_Box11 = __toESM(require("@mui/material/Box"), 1);
var import_Paper3 = __toESM(require("@mui/material/Paper"), 1);
var import_Collapse2 = __toESM(require("@mui/material/Collapse"), 1);
var import_Tooltip5 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography7 = __toESM(require("@mui/material/Typography"), 1);

// src/components/lab/timeline/two-column/milestone-badge/milestone-badge.const.ts
var MILESTONE_DATE_FONT_SIZE = "0.875rem";
var MILESTONE_PILL_ICON_SIZE = 16;
var MILESTONE_PILL_TEXT_FONT_SIZE = "0.75rem";
var MILESTONE_EYE_ICON_SIZE = 20;
var MILESTONE_EYE_BUTTON_MIN_SIZE = 28;
var MILESTONE_TASK_ICON_SIZE = 16;

// src/components/lab/timeline/two-column/milestone-badge/milestone-badge.styles.ts
var pillIconBoxSx2 = (iconSize) => ({
  display: "inline-flex",
  flexShrink: 0,
  "& svg": { width: iconSize, height: iconSize }
});
var milestoneNewBadgeRowSx = (rightAlign) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  mb: 0.5,
  justifyContent: rightAlign ? "flex-end" : void 0
});
var milestoneNewDotSx = {
  width: 12,
  height: 12,
  borderRadius: "50%",
  bgcolor: "success.main",
  flexShrink: 0
};
var milestoneNewLabelSx = {
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "success.main",
  lineHeight: 1
};
var milestoneDateSx = (fontSize = "0.875rem") => ({
  color: "text.secondary",
  fontSize,
  display: "block",
  mb: 0.5
});
var milestoneTitleRowSx = (rightAlign) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  justifyContent: rightAlign ? "flex-end" : "flex-start"
});
var milestoneTitleSx = {
  fontWeight: 700,
  lineHeight: 1.3
};
var milestoneEyeButtonSx = (opts) => ({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: opts.minSize ?? 28,
  minHeight: opts.minSize ?? 28,
  background: "none",
  border: "none",
  cursor: "pointer",
  p: 0,
  color: opts.isViewed ? "success.main" : "text.secondary",
  transition: "color 0.15s",
  "&:hover": { color: opts.isViewed ? "success.dark" : "text.primary" },
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: opts.isViewed ? "success.main" : "primary.main",
    outlineOffset: 2,
    borderRadius: 0.5
  }
});
var milestoneDescriptionSx = {
  color: "text.secondary",
  mt: 0.5
};
var milestoneDetailPillSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  mt: 0.5,
  mb: 0.25,
  px: 0.625,
  py: 0.2,
  borderRadius: 0.75,
  bgcolor: "action.hover",
  color: "text.secondary"
};
var milestonePillTextSx = {
  fontWeight: 600,
  lineHeight: 1,
  fontSize: MILESTONE_PILL_TEXT_FONT_SIZE
};
var milestoneDetailListSx = {
  mt: 1.5,
  pt: 1.5,
  borderTop: "1px solid",
  borderColor: "divider",
  display: "flex",
  flexDirection: "column",
  gap: 0.75
};
var taskRowSx2 = {
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  py: 0.25
};
var taskToggleButtonSx2 = {
  all: "unset",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  transition: "color 0.2s",
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: "primary.main",
    borderRadius: "50%"
  }
};
var taskIconStaticSx2 = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  transition: "color 0.2s"
};
var taskTitleSx2 = (isDone) => ({
  color: isDone ? "text.disabled" : "text.secondary",
  lineHeight: 1.6,
  textDecoration: isDone ? "line-through" : "none",
  transition: "color 0.2s, text-decoration 0.2s"
});
var taskToggleColorSx2 = (isDone) => ({
  color: isDone ? "success.main" : "text.disabled",
  "&:hover": { color: isDone ? "success.dark" : "text.secondary" }
});
var taskIconColorSx2 = (isDone) => ({
  color: isDone ? "success.main" : "text.disabled"
});
var milestonePaperSx = (opts) => (theme) => ({
  p: 2,
  overflow: "hidden",
  borderTop: "3px solid",
  borderTopColor: opts.isExpanded ? theme.vars.palette[opts.colorKey]?.main ?? theme.vars.palette.primary.main : "transparent",
  bgcolor: opts.isExpanded ? "background.paper" : "transparent",
  boxShadow: opts.isExpanded ? `0 4px 16px rgba(${theme.vars.palette[opts.colorKey]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.1)` : "none",
  transition: "box-shadow 0.22s, opacity 0.3s, filter 0.3s, background-color 0.22s, border-color 0.22s",
  ...opts.rightAlign && { textAlign: "right" },
  ...opts.done && {
    opacity: 0.45,
    filter: "grayscale(1)",
    pointerEvents: "auto"
  },
  ...!opts.isExpanded && {
    "&:hover": {
      bgcolor: "background.paper",
      borderTopColor: theme.vars.palette[opts.colorKey]?.main ?? theme.vars.palette.primary.main,
      boxShadow: `0 16px 40px rgba(${theme.vars.palette[opts.colorKey]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.22)`,
      ...opts.hasDetails && { cursor: "pointer" },
      ...opts.done && { opacity: 1, filter: "none" }
    }
  },
  ...opts.hasDetails && !opts.isExpanded && {
    "&:focus-visible": {
      bgcolor: "background.paper",
      borderTopColor: theme.vars.palette[opts.colorKey]?.main ?? theme.vars.palette.primary.main,
      outline: "2px solid",
      outlineColor: theme.vars.palette[opts.colorKey]?.main ?? theme.vars.palette.primary.main,
      outlineOffset: 3
    }
  },
  ...opts.suppressElevation && { boxShadow: "none" }
});

// src/components/lab/timeline/two-column/milestone-badge/milestone-badge.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
function MilestoneBadge({
  milestone: m,
  done = false,
  isExpanded,
  onRequestExpand,
  suppressElevation = false,
  expandableIcon,
  stableId,
  isViewed = false,
  onMarkViewed,
  columnSide = "right",
  taskDoneStates,
  onToggleTask,
  sx,
  ...other
}) {
  const rightAlign = columnSide === "left" && !isExpanded;
  const taskChildren = m.children?.length ? m.children : m.details?.map((title, index) => ({
    key: `detail-${index}`,
    title
  })) ?? [];
  const hasDetails = taskChildren.length > 0;
  const colorKey = m.color ?? "primary";
  const titleSlug = String(m.title).replace(/[^a-z0-9]/gi, "-").toLowerCase();
  const detailsId = stableId ? `ms-details-${stableId}` : `ms-details-${titleSlug}`;
  const [isHovered, setIsHovered] = (0, import_react5.useState)(false);
  const handleMouseEnter = (0, import_react5.useCallback)(() => setIsHovered(true), []);
  const handleMouseLeave = (0, import_react5.useCallback)(() => setIsHovered(false), []);
  const displayTitle = isExpanded || isHovered ? m.title : m.shortTitle ?? m.title;
  const handleClick = (0, import_react5.useCallback)(() => {
    if (hasDetails) onRequestExpand();
  }, [hasDetails, onRequestExpand]);
  const handleKeyDown = (0, import_react5.useCallback)(
    (e) => {
      if (hasDetails && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onRequestExpand();
      }
    },
    [hasDetails, onRequestExpand]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    import_Paper3.default,
    {
      ...other,
      role: hasDetails ? "button" : void 0,
      tabIndex: hasDetails ? 0 : void 0,
      "aria-expanded": hasDetails ? isExpanded : void 0,
      "aria-controls": hasDetails ? detailsId : void 0,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      sx: [
        milestonePaperSx({ isExpanded, colorKey, rightAlign, done, hasDetails, suppressElevation }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      children: [
        m.new && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_Box11.default, { sx: milestoneNewBadgeRowSx(rightAlign), children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Box11.default, { sx: milestoneNewDotSx }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Typography7.default, { variant: "caption", sx: milestoneNewLabelSx, children: "New" })
        ] }),
        m.date && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Typography7.default, { variant: "caption", sx: milestoneDateSx(MILESTONE_DATE_FONT_SIZE), children: m.date }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_Box11.default, { sx: milestoneTitleRowSx(rightAlign), children: [
          onMarkViewed && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            import_Tooltip5.default,
            {
              title: isViewed ? "Mark as not viewed" : "Mark as viewed",
              placement: rightAlign ? "right" : "left",
              arrow: true,
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                import_Box11.default,
                {
                  component: "button",
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    onMarkViewed();
                  },
                  "aria-label": isViewed ? "Mark as not viewed" : "Mark as viewed",
                  "aria-pressed": isViewed,
                  sx: milestoneEyeButtonSx({
                    isViewed: !!isViewed,
                    minSize: MILESTONE_EYE_BUTTON_MIN_SIZE
                  }),
                  children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    GiselleIcon,
                    {
                      icon: isViewed ? "solar:eye-bold" : "solar:eye-outline",
                      width: MILESTONE_EYE_ICON_SIZE,
                      "aria-hidden": true
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Typography7.default, { variant: "subtitle2", sx: milestoneTitleSx, children: displayTitle })
        ] }),
        (isExpanded || isHovered) && m.description && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Typography7.default, { variant: "body2", sx: milestoneDescriptionSx, children: m.description }),
        hasDetails && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
          import_Box11.default,
          {
            sx: milestoneDetailPillSx,
            "aria-label": `${taskChildren.length} expandable detail${taskChildren.length === 1 ? "" : "s"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Box11.default, { component: "span", sx: pillIconBoxSx2(MILESTONE_PILL_ICON_SIZE), children: expandableIcon ?? DEFAULT_EXPANDABLE_ICON }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Typography7.default, { component: "span", variant: "caption", sx: milestonePillTextSx, children: taskChildren.length })
            ]
          }
        ),
        hasDetails && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Collapse2.default, { in: isExpanded, timeout: 50, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Box11.default, { id: detailsId, sx: milestoneDetailListSx, children: taskChildren.map((task, i) => {
          const taskKey = String(task.key);
          const isDoneTask = taskDoneStates ? taskDoneStates[taskKey] ?? taskDoneStates[`idx-${i}`] ?? false : task.done ?? false;
          const toggleLabel = isDoneTask ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`;
          return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_Box11.default, { sx: taskRowSx2, children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              import_Box11.default,
              {
                component: onToggleTask ? "button" : "span",
                type: onToggleTask ? "button" : void 0,
                "aria-label": onToggleTask ? toggleLabel : void 0,
                "aria-pressed": onToggleTask ? isDoneTask : void 0,
                onClick: onToggleTask ? (e) => {
                  e.stopPropagation();
                  onToggleTask(i, !isDoneTask);
                } : void 0,
                sx: onToggleTask ? [taskToggleButtonSx2, taskToggleColorSx2(isDoneTask)] : [taskIconStaticSx2, taskIconColorSx2(isDoneTask)],
                children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  GiselleIcon,
                  {
                    icon: isDoneTask ? "solar:check-circle-bold" : "solar:record-minimalistic-outline",
                    width: MILESTONE_TASK_ICON_SIZE
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Typography7.default, { variant: "body2", sx: taskTitleSx2(isDoneTask), children: task.title })
          ] }, i);
        }) }) })
      ]
    }
  );
}

// src/components/lab/timeline/two-column/timeline-dot/timeline-dot.tsx
var import_Box13 = __toESM(require("@mui/material/Box"), 1);

// src/components/lab/timeline/two-column/timeline-dot/timeline-dot.styles.ts
var timelineDotInnerSx = (done, dotBg, effectiveColor, isMilestone, hasClickHandler) => (theme) => ({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // All done dots: solid success-green fill with white icon (effectiveColor is already 'success').
  bgcolor: !done && dotBg ? dotBg : theme.vars.palette[effectiveColor]?.main ?? theme.vars.palette.primary.main,
  color: theme.vars.palette.common.white,
  // Milestone: white separator border + colored drop shadow.
  // boxSizing ensures padding + border are included in the 100%/100% dimensions
  // so the circle never exceeds the outer 34px container regardless of box model reset.
  ...isMilestone && {
    boxSizing: "border-box",
    padding: "2px",
    border: "2px solid",
    borderColor: "background.paper",
    boxShadow: `0 2px 8px rgba(${theme.vars.palette[effectiveColor]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.5)`
  },
  ...hasClickHandler && isMilestone && {
    "&:hover": {
      boxShadow: `0 6px 20px rgba(${theme.vars.palette[effectiveColor]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.6)`
    }
  }
});
var pulseRingAfterSx = (effectiveColor) => ({
  "&::after": {
    content: '""',
    position: "absolute",
    inset: "-5px",
    borderRadius: "50%",
    border: "2px solid",
    borderColor: `${effectiveColor}.main`,
    animation: `${pulseRing} 1.5s ease-in-out infinite`
  }
});

// src/components/lab/timeline/two-column/timeline-dot/timeline-dot.utils.ts
function resolveEffectiveColor(color, done) {
  return done ? "success" : color;
}
function getDotSize(isMilestone) {
  return isMilestone ? 34 : 42;
}
function getIconSize(isMilestone) {
  return isMilestone ? 17 : 23;
}
function normaliseSx(sx) {
  if (!sx) return [];
  return Array.isArray(sx) ? sx : [sx];
}

// src/components/lab/timeline/two-column/timeline-dot/dot-inner/dot-inner.tsx
var import_Box12 = __toESM(require("@mui/material/Box"), 1);

// src/components/lab/timeline/two-column/timeline-dot/dot-inner/dot-inner.styles.ts
var doneCheckmarkSx = (iconSize) => ({
  width: iconSize,
  height: iconSize,
  flexShrink: 0,
  animation: `${checkPop} 0.36s cubic-bezier(0.34, 1.56, 0.64, 1)`
});
var dotInnerIconSlotSx = {
  display: "flex"
};

// src/components/lab/timeline/two-column/timeline-dot/dot-inner/dot-inner.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function DotInner({ done, icon, animationKey, iconSize }) {
  if (done) {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      import_Box12.default,
      {
        component: "svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        sx: doneCheckmarkSx(iconSize),
        children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("polyline", { points: "20 6 9 17 4 12" })
      },
      animationKey
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_Box12.default,
    {
      sx: [
        dotInnerIconSlotSx,
        animationKey > 0 ? {
          animation: `${checkPop} 0.36s cubic-bezier(0.34, 1.56, 0.64, 1)`
        } : false
      ],
      children: icon
    },
    animationKey
  );
}

// src/components/lab/timeline/two-column/timeline-dot/timeline-dot.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
function TimelineDot({
  icon,
  color = "primary",
  size = "phase",
  active = false,
  done = false,
  animationKey = 0,
  dotBg,
  onClick,
  onKeyDown,
  role,
  "aria-checked": ariaChecked,
  "aria-label": ariaLabel,
  tabIndex,
  className,
  sx,
  ...other
}) {
  const isMilestone = size === "milestone";
  const dotSize = getDotSize(isMilestone);
  const iconSize = getIconSize(isMilestone);
  const effectiveColor = resolveEffectiveColor(color, done);
  return (
    // Outer Box: controls size, position context, pulsing ::after ring, interaction.
    // overflow: visible is mandatory — the ring extends 5 px outside via inset: -5
    // and would be clipped by overflow: hidden.
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      import_Box13.default,
      {
        className,
        role,
        "aria-checked": ariaChecked,
        "aria-label": ariaLabel,
        tabIndex,
        onClick,
        onKeyDown,
        "data-active": active && !isMilestone ? "true" : void 0,
        ...other,
        sx: [
          (theme) => ({
            position: "relative",
            width: dotSize,
            height: dotSize,
            flexShrink: 0,
            overflow: "visible",
            ...onClick && {
              cursor: "pointer",
              transition: "opacity 0.2s",
              "&:hover": { opacity: 0.75 }
            },
            ...tabIndex !== void 0 && {
              "&:focus-visible": {
                outline: "none",
                boxShadow: `0 0 0 3px ${theme.vars.palette[effectiveColor]?.main ?? theme.vars.palette.primary.main}`
              }
            }
          }),
          // Pulsing halo — phase dots only, active state, not done.
          ...active && !isMilestone && !done ? [pulseRingAfterSx(effectiveColor)] : [],
          ...normaliseSx(sx)
        ],
        children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_Box13.default, { sx: timelineDotInnerSx(done, dotBg, effectiveColor, isMilestone, !!onClick), children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DotInner, { done, icon, animationKey, iconSize }) })
      }
    )
  );
}

// src/components/lab/timeline/two-column/two-column.tsx
var import_react12 = require("react");
var import_Box25 = __toESM(require("@mui/material/Box"), 1);
var import_Timeline = __toESM(require("@mui/lab/Timeline"), 1);

// src/components/lab/timeline/use-timeline-done-state.ts
var import_react6 = require("react");
function buildPhaseDoneRecord(phases) {
  return Object.fromEntries(phases.map((p) => [String(p.key), p.done ?? false]));
}
function buildMilestoneDoneRecord(phases, sortFn) {
  const m = {};
  phases.forEach((p) => {
    const sorted = p.milestones ? sortFn([...p.milestones]) : [];
    sorted.forEach((ms, i) => {
      m[`${p.key}-${i}`] = ms.done ?? false;
    });
  });
  return m;
}
function buildTaskDoneRecord(phases, sortFn) {
  const t = {};
  phases.forEach((p) => {
    const sortedMilestones = p.milestones ? sortFn([...p.milestones]) : [];
    const childTasks = p.children && p.children.length > 0 ? p.children : sortedMilestones;
    childTasks.forEach((task, childIndex) => {
      resolveTaskChildren(task).forEach((nestedTask, taskIndex) => {
        t[`${p.key}-c${childIndex}-t${taskIndex}`] = nestedTask.done ?? false;
      });
    });
  });
  return t;
}
function useTimelineDoneState(phases, sortOrder) {
  const sortFn = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
  const [localPhaseDone, setLocalPhaseDone] = (0, import_react6.useState)(
    () => buildPhaseDoneRecord(phases)
  );
  const [localMilestoneDone, setLocalMilestoneDone] = (0, import_react6.useState)(
    () => buildMilestoneDoneRecord(phases, sortFn)
  );
  const [localTaskDoneMap, setLocalTaskDoneMap] = (0, import_react6.useState)(
    () => buildTaskDoneRecord(phases, sortFn)
  );
  (0, import_react6.useEffect)(() => {
    const fn = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
    setLocalPhaseDone(buildPhaseDoneRecord(phases));
    setLocalMilestoneDone(buildMilestoneDoneRecord(phases, fn));
    setLocalTaskDoneMap(buildTaskDoneRecord(phases, fn));
  }, [phases, sortOrder]);
  return {
    localPhaseDone,
    setLocalPhaseDone,
    localMilestoneDone,
    setLocalMilestoneDone,
    localTaskDoneMap,
    setLocalTaskDoneMap
  };
}

// src/components/lab/timeline/compact/compact.tsx
var import_react11 = require("react");
var import_Box18 = __toESM(require("@mui/material/Box"), 1);

// src/components/lab/timeline/compact/compact.styles.ts
var import_styles = require("@mui/material/styles");
var accordionRootSx = (done, active = false, expanded = false, color = "primary") => (theme) => {
  const neutralColor = typeof theme.palette.grey?.[500] === "string" ? theme.palette.grey[500] : "#919eab";
  const activeColor = theme.palette[color].main;
  const neutralBg = (0, import_styles.alpha)(neutralColor, 0.08);
  const activeBg = (0, import_styles.alpha)(activeColor, 0.12);
  const activeBorder = (0, import_styles.alpha)(activeColor, 0.24);
  const isActiveExpanded = active && expanded;
  const transitionDuration = theme.transitions?.duration?.shorter ?? 250;
  const colorTransition = theme.transitions?.create ? theme.transitions.create(["background-color", "border-color"], {
    duration: transitionDuration
  }) : "background-color 250ms, border-color 250ms";
  return {
    py: 1,
    px: 2.5,
    border: isActiveExpanded ? `1px solid ${activeBorder}` : "none",
    borderRadius: 2,
    boxShadow: "none",
    backgroundColor: isActiveExpanded ? activeBg : "transparent",
    "&:before": { display: "none" },
    "&.Mui-expanded": {
      margin: 0,
      bgcolor: isActiveExpanded ? activeBg : neutralBg,
      border: isActiveExpanded ? `1px solid ${activeBorder}` : "none"
    },
    "&:hover": {
      bgcolor: neutralBg
    },
    opacity: done ? 0.65 : 1,
    transition: `${colorTransition}, opacity 300ms`
  };
};

// src/components/lab/timeline/compact/phase-accordion-row/phase-accordion-row.tsx
var import_react10 = require("react");
var import_Box17 = __toESM(require("@mui/material/Box"), 1);
var import_SvgIcon2 = __toESM(require("@mui/material/SvgIcon"), 1);
var import_Typography12 = __toESM(require("@mui/material/Typography"), 1);

// src/components/material/surfaces/card/accordion/accordion.tsx
var import_react8 = require("react");
var import_Box14 = __toESM(require("@mui/material/Box"), 1);
var import_Checkbox = __toESM(require("@mui/material/Checkbox"), 1);
var import_Accordion = __toESM(require("@mui/material/Accordion"), 1);
var import_AccordionDetails = __toESM(require("@mui/material/AccordionDetails"), 1);
var import_AccordionSummary = __toESM(require("@mui/material/AccordionSummary"), 1);
var import_Typography8 = __toESM(require("@mui/material/Typography"), 1);

// src/components/material/input/toggle-icon-button/icon.tsx
var import_react7 = require("react");
var import_IconButton2 = __toESM(require("@mui/material/IconButton"), 1);

// src/components/material/input/toggle-icon-button/icon.defaults.tsx
var import_SvgIcon = __toESM(require("@mui/material/SvgIcon"), 1);

// src/components/material/input/toggle-icon-button/icon.const.ts
var TOGGLE_ICON_SIZE = 20;
var TOGGLE_MIN_TOUCH_TARGET = 28;

// src/components/material/input/toggle-icon-button/icon.styles.ts
var rootSx = {
  padding: 0,
  flexShrink: 0,
  alignSelf: "center",
  minWidth: TOGGLE_MIN_TOUCH_TARGET,
  minHeight: TOGGLE_MIN_TOUCH_TARGET,
  // idle (not pressed)
  "& .ti-idle": { display: "flex", alignItems: "center" },
  "& .ti-pressed": { display: "none" },
  "& .ti-hover": { display: "none" },
  // pressed
  '&[aria-pressed="true"] .ti-idle': { display: "none" },
  '&[aria-pressed="true"] .ti-pressed': { display: "flex", alignItems: "center" },
  // hover (any pressed state)
  "&:hover .ti-idle": { display: "none" },
  "&:hover .ti-pressed": { display: "none" },
  "&:hover .ti-hover": { display: "flex", alignItems: "center" },
  // keyboard focus-visible
  "&:focus-visible .ti-idle": { display: "none" },
  "&:focus-visible .ti-pressed": { display: "none" },
  "&:focus-visible .ti-hover": { display: "flex", alignItems: "center" }
};
var defaultIconSvgSx = {
  color: "success.main",
  fontSize: TOGGLE_ICON_SIZE
};

// src/components/material/input/toggle-icon-button/icon.defaults.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
var DEFAULT_PRESSED_ICON = /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_SvgIcon.default, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
var DEFAULT_HOVER_ICON = /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_SvgIcon.default, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });

// src/components/material/input/toggle-icon-button/icon.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function ToggleIconButton({
  pressed,
  idleIcon,
  pressedIcon = DEFAULT_PRESSED_ICON,
  hoverIcon = DEFAULT_HOVER_ICON,
  onPressedChange,
  sx,
  ...other
}) {
  const handleClick = (0, import_react7.useCallback)(
    (e) => {
      e.stopPropagation();
      onPressedChange?.(!pressed);
    },
    [pressed, onPressedChange]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    import_IconButton2.default,
    {
      onClick: handleClick,
      "aria-pressed": pressed,
      size: "small",
      sx: [rootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ti-idle", children: idleIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ti-pressed", children: pressedIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ti-hover", children: hoverIcon })
      ]
    }
  );
}

// src/components/material/surfaces/card/accordion/accordion.styles.ts
var accordionRootSx2 = {};
var summaryRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5
};
var checkboxSx = {
  flexShrink: 0,
  alignSelf: "center"
};
var leadingIconSx = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  px: 1
};
var summarySx = {
  flex: 1,
  minWidth: 0
};

// src/components/material/surfaces/card/accordion/accordion.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function Accordion({
  title,
  children,
  checklist = false,
  done = false,
  indeterminate = false,
  onDoneButtonClick,
  leadingIcon,
  leadingAction,
  trailingContent,
  expandIcon,
  checkIcon,
  checkDoneIcon,
  checkHoverIcon,
  sx,
  ...other
}) {
  const id = (0, import_react8.useId)();
  const summaryId = `accordion-summary-${id}`;
  const detailsId = `accordion-details-${id}`;
  const handleCheckboxChange = (_e, checked) => {
    onDoneButtonClick?.(checked);
  };
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };
  const hasLeadingElement = checklist || leadingIcon !== void 0 || leadingAction !== void 0;
  let leadingElement = null;
  if (checklist) {
    leadingElement = checkIcon === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      import_Checkbox.default,
      {
        checked: done,
        indeterminate,
        onChange: handleCheckboxChange,
        onClick: handleCheckboxClick,
        slotProps: {
          input: {
            "aria-label": done ? "Mark as not done" : "Mark as done"
          }
        },
        size: "small",
        sx: checkboxSx
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      ToggleIconButton,
      {
        pressed: done,
        idleIcon: checkIcon,
        pressedIcon: checkDoneIcon,
        hoverIcon: checkHoverIcon,
        onPressedChange: onDoneButtonClick,
        "aria-label": done ? "Mark as not done" : "Mark as done"
      }
    );
  } else if (leadingAction === void 0) {
    leadingElement = /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_Box14.default, { "aria-hidden": "true", sx: leadingIconSx, children: leadingIcon });
  } else {
    leadingElement = leadingAction;
  }
  const summaryContent = typeof title === "string" ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_Typography8.default, { component: "span", variant: "subtitle1", children: title }) : title;
  const accordionSummary = /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
    import_AccordionSummary.default,
    {
      expandIcon,
      id: summaryId,
      "aria-controls": detailsId,
      sx: hasLeadingElement ? summarySx : void 0,
      children: [
        summaryContent,
        trailingContent
      ]
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_Accordion.default, { sx: [accordionRootSx2, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    hasLeadingElement ? /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_Box14.default, { sx: summaryRowSx, children: [
      leadingElement,
      accordionSummary
    ] }) : accordionSummary,
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_AccordionDetails.default, { id: detailsId, children })
  ] });
}

// src/utils/hooks/use-nested-checklist/use-nested-checklist.ts
var import_react9 = require("react");
function useNestedChecklist(initialParentDone, initialChildrenDone) {
  const [parentDone, setParentDone] = (0, import_react9.useState)(initialParentDone);
  const [childrenDone, setChildrenDone] = (0, import_react9.useState)(initialChildrenDone);
  const indeterminate = (0, import_react9.useMemo)(
    () => childrenDone.some(Boolean) && !childrenDone.every(Boolean),
    [childrenDone]
  );
  const toggleParent = (0, import_react9.useCallback)(() => {
    const next = !parentDone;
    setParentDone(next);
    setChildrenDone((prev) => prev.map(() => next));
  }, [parentDone]);
  const toggleChild = (0, import_react9.useCallback)((index) => {
    setChildrenDone((prev) => {
      const next = prev.map((v, i) => i === index ? !v : v);
      setParentDone(next.every(Boolean));
      return next;
    });
  }, []);
  return { parentDone, indeterminate, childrenDone, toggleParent, toggleChild };
}

// src/components/lab/timeline/compact/chevron-down-icon/chevron-down-icon.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
function ChevronDownIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      focusable: "false",
      children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" })
    }
  );
}

// src/components/lab/timeline/compact/task-details-modal/task-details-modal.tsx
var import_Dialog = __toESM(require("@mui/material/Dialog"), 1);
var import_DialogContent = __toESM(require("@mui/material/DialogContent"), 1);
var import_DialogTitle = __toESM(require("@mui/material/DialogTitle"), 1);
var import_Divider2 = __toESM(require("@mui/material/Divider"), 1);
var import_IconButton3 = __toESM(require("@mui/material/IconButton"), 1);
var import_Typography11 = __toESM(require("@mui/material/Typography"), 1);
var import_useMediaQuery = __toESM(require("@mui/material/useMediaQuery"), 1);

// src/components/lab/timeline/compact/task-details-modal/task-details-modal.styles.ts
var dialogTitleSx = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1,
  pr: 1
};
var dialogDateSx = {
  display: "block",
  color: "text.secondary",
  mt: 0.25
};
var dialogCloseButtonSx = {
  mt: 0.5,
  flexShrink: 0
};
var dialogContentSx = {
  pt: 2
};

// src/components/lab/timeline/compact/task-details-renderer/task-details-renderer.tsx
var import_Box16 = __toESM(require("@mui/material/Box"), 1);
var import_Typography10 = __toESM(require("@mui/material/Typography"), 1);

// src/components/lab/timeline/task-list/task-list.tsx
var import_Checkbox2 = __toESM(require("@mui/material/Checkbox"), 1);
var import_Box15 = __toESM(require("@mui/material/Box"), 1);
var import_Typography9 = __toESM(require("@mui/material/Typography"), 1);

// src/components/lab/timeline/task-list/task-list.styles.ts
var taskListBaseSx = {
  mt: 0,
  mb: 1.5,
  pl: 2,
  color: "text.secondary",
  listStyle: "none"
};
var taskListMilestoneSx = {
  mt: 0,
  mb: 1.5,
  pl: 3,
  color: "text.secondary",
  listStyle: "none"
};
var taskItemSx = {
  display: "flex",
  alignItems: "center",
  mb: 0.25
};
var taskCheckboxSx = {
  p: 0.5,
  mr: 0.5
};
var taskCaptionSx = (isDone) => () => ({
  color: "text.secondary",
  textDecoration: isDone ? "line-through" : "none"
});

// src/components/lab/timeline/task-list/task-list.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
function TaskList({
  tasks,
  checklist = false,
  taskDoneState,
  onTaskToggle,
  indent = "phase",
  sx,
  ...other
}) {
  const listSx = indent === "milestone" ? taskListMilestoneSx : taskListBaseSx;
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_Box15.default, { component: "ul", sx: [listSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: tasks.map((task, i) => {
    const isDone = taskDoneState?.[i] ?? task.done ?? false;
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_Box15.default, { component: "li", sx: taskItemSx, children: [
      checklist && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
        import_Checkbox2.default,
        {
          size: "small",
          checked: isDone,
          onChange: () => onTaskToggle?.(i),
          sx: taskCheckboxSx,
          slotProps: { input: { "aria-label": task.title } }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_Typography9.default, { variant: "caption", sx: taskCaptionSx(isDone), children: task.title })
    ] }, i);
  }) });
}

// src/components/lab/timeline/compact/task-details-renderer/task-details-renderer.styles.ts
var taskDetailsSummarySx = {
  color: "text.secondary",
  mb: 2
};
var taskDetailsContentSx = {
  display: "grid",
  gap: 2
};
var taskDetailsEmptyStateSx = {
  color: "text.disabled"
};

// src/components/lab/timeline/compact/compact.utils.ts
function resolveCompactColor(color, done) {
  if (done) return "success";
  if (!color || color === "inherit" || color === "grey") return "primary";
  return color;
}

// src/components/lab/timeline/compact/task-details-renderer/task-details-renderer.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
function renderDetailsNode(node) {
  if (!node) return null;
  if (typeof node === "string") {
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_Typography10.default, { variant: "body2", sx: taskDetailsSummarySx, children: node });
  }
  return node;
}
function TaskDetailsRenderer({
  task,
  checklist = false,
  taskDoneState,
  onTaskToggle,
  emptyState = "No additional details.",
  sx,
  ...other
}) {
  const nestedTasks = resolveTaskChildren(task);
  const hasInlineDescription = Boolean(task.description);
  const hasSummary = Boolean(task.details?.summary);
  const hasContent = Boolean(task.details?.content);
  const hasTasks = nestedTasks.length > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_Box16.default, { sx: [taskDetailsContentSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    hasInlineDescription && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_Typography10.default, { variant: "body2", sx: taskDetailsSummarySx, children: task.description }),
    !hasInlineDescription && renderDetailsNode(task.details?.summary),
    hasContent && renderDetailsNode(task.details?.content),
    hasTasks && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      TaskList,
      {
        tasks: nestedTasks,
        checklist,
        taskDoneState,
        onTaskToggle,
        indent: "milestone"
      }
    ),
    !hasInlineDescription && !hasSummary && !hasContent && !hasTasks && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_Typography10.default, { variant: "body2", sx: taskDetailsEmptyStateSx, children: emptyState })
  ] });
}

// src/components/lab/timeline/compact/task-details-modal/task-details-modal.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
function TaskDetailsModal({
  task,
  open,
  onClose,
  checklist = false,
  taskDoneState,
  onTaskToggle
}) {
  const fullScreen = (0, import_useMediaQuery.default)("(max-width:599.95px)");
  if (!task) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
    import_Dialog.default,
    {
      open,
      onClose,
      fullWidth: true,
      maxWidth: "sm",
      fullScreen,
      scroll: "paper",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_DialogTitle.default, { sx: dialogTitleSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_Typography11.default, { variant: "h6", component: "span", children: task.title }),
            task.date && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_Typography11.default, { variant: "caption", sx: dialogDateSx, children: task.date })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_IconButton3.default, { "aria-label": "Close details", onClick: onClose, sx: dialogCloseButtonSx, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_Divider2.default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_DialogContent.default, { sx: dialogContentSx, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          TaskDetailsRenderer,
          {
            task,
            checklist,
            taskDoneState,
            onTaskToggle
          }
        ) })
      ]
    }
  );
}

// src/utils/theme/theme-utils/theme-utils.ts
function channelAlpha(channel, alpha2) {
  return `rgba(${channel} / ${alpha2})`;
}

// src/components/lab/timeline/compact/compact.const.ts
var COMPACT_PHASE_DOT_SIZE = 32;
var COMPACT_MILESTONE_DOT_SIZE = 24;
var COMPACT_PHASE_ICON_SIZE = 18;
var COMPACT_MILESTONE_ICON_SIZE = 14;
var COMPACT_MIN_PHASE_DOT_SIZE = 18;
var COMPACT_MIN_MILESTONE_DOT_SIZE = 18;

// src/components/lab/timeline/compact/phase-accordion-row/phase-accordion-row.styles.ts
var accordionDetailsSx = {
  pt: 0,
  pb: 2,
  px: 2
};
var phaseTitleSx2 = {
  flexGrow: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};
var dateSx = {
  color: "text.secondary",
  flexShrink: 0,
  ml: 0.5
};
var descriptionSx = {
  color: "text.secondary",
  mb: 1.5
};
var milestonesListSx = {
  m: 0,
  p: 0,
  mt: 1,
  listStyle: "none"
};
var milestoneItemSx = (interactive, done) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: 1.5,
  cursor: interactive ? "pointer" : "default",
  borderRadius: 1,
  opacity: done ? 0.72 : 1,
  ...interactive ? {
    "&:hover": {
      bgcolor: channelAlpha("var(--mui-palette-grey-500Channel)", 0.06)
    }
  } : null,
  transition: "background-color 150ms, opacity 150ms",
  py: 1,
  px: 0.5
});
var milestoneDotColumnSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexShrink: 0,
  width: COMPACT_MILESTONE_DOT_SIZE
};
var milestoneContentSx = {
  flexGrow: 1,
  overflow: "hidden",
  pb: 0.5
};
var milestoneTitleSx2 = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};
var milestoneDescriptionPreviewSx = {
  color: "text.secondary",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  mt: 0.25
};
var milestoneDateSx2 = {
  color: "text.secondary",
  flexShrink: 0,
  mt: 0.25
};
var phaseDotSx = (color) => (theme) => ({
  width: COMPACT_PHASE_DOT_SIZE,
  height: COMPACT_PHASE_DOT_SIZE,
  borderRadius: "50%",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  bgcolor: theme.vars?.palette[color].main ?? theme.palette[color].main,
  color: "common.white"
});
var milestoneDotSx = (color) => (theme) => ({
  width: COMPACT_MILESTONE_DOT_SIZE,
  height: COMPACT_MILESTONE_DOT_SIZE,
  borderRadius: "50%",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  bgcolor: theme.vars?.palette[color].main ?? theme.palette[color].main,
  color: "common.white"
});
var milestoneConnectorLineSx = {
  width: 2,
  flexGrow: 1,
  minHeight: 16,
  bgcolor: "divider",
  mt: 0.5
};
var accordionSummaryOverrideSx = {
  "& .MuiAccordionSummary-root": { minHeight: 56 },
  "& .MuiAccordionSummary-root.Mui-expanded": { minHeight: 56 },
  "& .MuiAccordionSummary-content": { display: "flex", alignItems: "center", gap: 1.5 },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "text.secondary",
    display: "flex",
    alignItems: "center",
    alignSelf: "center"
  }
};
var checkHoverIconSx = (size) => ({
  color: "success.main",
  fontSize: size
});

// src/components/lab/timeline/compact/phase-accordion-row/phase-accordion-row.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
var CHECK_DONE_DOT = /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Box17.default, { sx: phaseDotSx("success"), "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  "svg",
  {
    width: COMPACT_PHASE_ICON_SIZE,
    height: COMPACT_PHASE_ICON_SIZE,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" })
  }
) });
var CHECK_HOVER_DOT = /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_SvgIcon2.default, { sx: checkHoverIconSx(COMPACT_PHASE_DOT_SIZE), viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });
var MS_CHECK_DONE_DOT = /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  import_Box17.default,
  {
    sx: phaseDotSx("success"),
    style: { width: COMPACT_MILESTONE_DOT_SIZE, height: COMPACT_MILESTONE_DOT_SIZE, flexShrink: 0 },
    "aria-hidden": "true",
    children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      "svg",
      {
        width: COMPACT_MILESTONE_ICON_SIZE,
        height: COMPACT_MILESTONE_ICON_SIZE,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
        children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" })
      }
    )
  }
);
var MS_CHECK_HOVER_DOT = /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_SvgIcon2.default, { sx: checkHoverIconSx(COMPACT_MILESTONE_DOT_SIZE), viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });
function PhaseAccordionRow({
  phase,
  sortedMilestones,
  checklist,
  taskDoneMap,
  onTaskToggle,
  onMarkViewed,
  onTogglePhaseDone,
  onToggleMilestoneDone,
  expandedPhaseKey,
  onToggleExpanded
}) {
  const { parentDone, indeterminate, childrenDone, toggleParent, toggleChild } = useNestedChecklist(
    phase.done ?? false,
    sortedMilestones.map((ms) => ms.done ?? false)
  );
  const [modalTask, setModalTask] = (0, import_react10.useState)(null);
  const effectiveColor = resolveCompactColor(phase.color, parentDone);
  const childTasks = phase.children && phase.children.length > 0 ? phase.children : sortedMilestones;
  const usesMilestoneChildren = !(phase.children && phase.children.length > 0);
  const hasDetails = Boolean(phase.description) || childTasks.length > 0;
  const handleToggleParent = (0, import_react10.useCallback)(() => {
    toggleParent();
    onTogglePhaseDone?.(phase.key, !parentDone);
  }, [toggleParent, onTogglePhaseDone, phase.key, parentDone]);
  const handleAccordionChange = (0, import_react10.useCallback)(
    (_e, expanded) => {
      onToggleExpanded(phase.key);
      if (expanded) onMarkViewed?.(`phase-${phase.key}`);
    },
    [onMarkViewed, onToggleExpanded, phase.key]
  );
  const phaseDot = /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Box17.default, { sx: phaseDotSx(effectiveColor), "aria-hidden": "true", children: phase.icon });
  const leadingAction = checklist ? void 0 : phaseDot;
  const checkIcon = checklist ? phaseDot : void 0;
  const checkDoneIcon = checklist ? CHECK_DONE_DOT : void 0;
  const checkHoverIcon = checklist ? CHECK_HOVER_DOT : void 0;
  const titleContent = /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Typography12.default, { variant: "subtitle2", sx: phaseTitleSx2, children: phase.shortTitle ?? phase.title });
  const dateLabel = phase.date ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Typography12.default, { variant: "caption", sx: dateSx, children: phase.date }) : null;
  const isExpanded = expandedPhaseKey === phase.key;
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      Accordion,
      {
        disableGutters: true,
        elevation: 0,
        checklist,
        checkIcon,
        checkDoneIcon,
        checkHoverIcon,
        leadingAction,
        done: parentDone,
        indeterminate,
        onDoneButtonClick: handleToggleParent,
        trailingContent: dateLabel,
        expandIcon: hasDetails ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(ChevronDownIcon, {}) : null,
        title: titleContent,
        expanded: isExpanded,
        onChange: handleAccordionChange,
        sx: [
          accordionRootSx(parentDone, Boolean(phase.active), isExpanded, effectiveColor),
          accordionSummaryOverrideSx
        ],
        children: hasDetails && /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_Box17.default, { sx: accordionDetailsSx, children: [
          phase.description && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Typography12.default, { variant: "body2", sx: descriptionSx, children: phase.description }),
          childTasks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Box17.default, { component: "ul", sx: milestonesListSx, children: childTasks.map((task, idx) => {
            const isDone = usesMilestoneChildren ? childrenDone[idx] ?? false : task.done ?? false;
            const idleDotColor = resolveCompactColor(task.color ?? phase.color, isDone);
            const isLast = idx === childTasks.length - 1;
            const nestedTasks = resolveTaskChildren(task);
            const canOpen = Boolean(task.description) || Boolean(task.details?.summary) || Boolean(task.details?.content) || nestedTasks.length > 0;
            const dotNode = /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Box17.default, { sx: milestoneDotSx(idleDotColor), "aria-hidden": "true", children: task.icon });
            const rowButtonProps = canOpen ? {
              onClick: () => setModalTask({ task, idx }),
              role: "button",
              tabIndex: 0,
              "aria-label": `View details: ${task.title}`,
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setModalTask({ task, idx });
                }
              }
            } : {};
            return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
              import_Box17.default,
              {
                component: "li",
                sx: milestoneItemSx(canOpen, isDone),
                ...rowButtonProps,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_Box17.default, { sx: milestoneDotColumnSx, children: [
                    checklist && usesMilestoneChildren ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                      ToggleIconButton,
                      {
                        pressed: isDone,
                        idleIcon: dotNode,
                        pressedIcon: MS_CHECK_DONE_DOT,
                        hoverIcon: MS_CHECK_HOVER_DOT,
                        onPressedChange: (newDone) => {
                          toggleChild(idx);
                          onToggleMilestoneDone?.(phase.key, idx, newDone);
                        },
                        "aria-label": isDone ? "Mark as not done" : "Mark as done"
                      }
                    ) : dotNode,
                    !isLast && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Box17.default, { "aria-hidden": "true", sx: milestoneConnectorLineSx })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_Box17.default, { sx: milestoneContentSx, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Typography12.default, { variant: "subtitle2", sx: milestoneTitleSx2, children: task.shortTitle ?? task.title }),
                    task.description && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Typography12.default, { variant: "body2", sx: milestoneDescriptionPreviewSx, children: task.description })
                  ] }),
                  task.date && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Typography12.default, { variant: "caption", sx: milestoneDateSx2, children: task.date })
                ]
              },
              `${phase.key}-child-${task.key}`
            );
          }) })
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      TaskDetailsModal,
      {
        task: modalTask?.task ?? null,
        open: modalTask !== null,
        onClose: () => setModalTask(null),
        checklist,
        taskDoneState: modalTask ? resolveTaskChildren(modalTask.task).map(
          (task, i) => taskDoneMap[`${phase.key}-c${modalTask.idx}-t${i}`] ?? task.done ?? false
        ) : void 0,
        onTaskToggle: modalTask ? (i) => onTaskToggle(phase.key, modalTask.idx, i) : void 0
      }
    )
  ] });
}

// src/components/lab/timeline/compact/compact.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
function TimelineCompact({
  phases,
  checklist = false,
  sortOrder = "desc",
  viewedKeys: _viewedKeys,
  onMarkViewed,
  onTogglePhaseDone,
  onToggleMilestoneDone,
  onToggleTaskDone,
  sx,
  ...other
}) {
  const sortMilestones = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
  const sorted = (0, import_react11.useMemo)(() => sortPhasesByDate(phases, sortOrder), [phases, sortOrder]);
  const { localTaskDoneMap, setLocalTaskDoneMap } = useTimelineDoneState(phases, sortOrder);
  const handleTaskToggle = (0, import_react11.useCallback)(
    (phaseKey, childIdx, taskIdx) => {
      const k = childIdx === null ? `${phaseKey}-t${taskIdx}` : `${phaseKey}-c${childIdx}-t${taskIdx}`;
      const next = !(localTaskDoneMap[k] ?? false);
      setLocalTaskDoneMap((prev) => ({ ...prev, [k]: next }));
      onToggleTaskDone?.(phaseKey, childIdx, taskIdx, next);
    },
    [localTaskDoneMap, onToggleTaskDone, setLocalTaskDoneMap]
  );
  const [expandedPhaseKey, setExpandedPhaseKey] = (0, import_react11.useState)(null);
  const handleToggleExpanded = (0, import_react11.useCallback)((key) => {
    setExpandedPhaseKey((prev) => prev === key ? null : key);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_Box18.default, { sx: [accordionRootSx(false), ...Array.isArray(sx) ? sx : [sx]], ...other, children: sorted.map((phase) => {
    const sortedMilestones = phase.milestones ? sortMilestones([...phase.milestones]) : [];
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      PhaseAccordionRow,
      {
        phase,
        sortedMilestones,
        checklist,
        taskDoneMap: localTaskDoneMap,
        onTaskToggle: handleTaskToggle,
        onMarkViewed,
        onTogglePhaseDone,
        onToggleMilestoneDone,
        expandedPhaseKey,
        onToggleExpanded: handleToggleExpanded
      },
      phase.key
    );
  }) });
}

// src/components/lab/timeline/two-column/milestone-row/milestone-row.tsx
var import_Box19 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip6 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography13 = __toESM(require("@mui/material/Typography"), 1);

// src/components/lab/timeline/two-column/two-column.styles.ts
var timelineViewSlotSx = (view) => ({
  display: view === "compact" ? { xs: "block", md: "none" } : { xs: "none", md: "block" },
  ...view === "full" && { position: "relative" }
});
var floatingDatePillSx = {
  position: "absolute",
  bottom: "calc(100% + 4px)",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "0.875rem",
  fontWeight: 800,
  color: "common.white",
  bgcolor: "grey.700",
  px: 0.75,
  py: 0.125,
  borderRadius: 0.75,
  whiteSpace: "nowrap",
  pointerEvents: "none",
  zIndex: 2,
  display: "none"
};
var phaseLiSx = (opts) => ({
  position: "relative",
  overflow: "visible",
  display: "flex",
  flexDirection: "column",
  zIndex: opts.zIndex,
  // CSS :has() raises this <li> when any milestone card within it is hovered,
  // preventing the next <li>'s phase card from painting over the hovered card.
  // Supported: Chrome 121+, Firefox 121+, Safari 17+ (within browser support matrix).
  "&:has([data-ms-card]:hover)": { zIndex: 3 },
  ...opts.computedMinHeight !== void 0 && { minHeight: opts.computedMinHeight }
});
var centerColumnSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexShrink: 0
};
var timelineRootSx = {
  p: 0,
  m: 0,
  "& .MuiTimelineItem-root:before": { flex: 0, padding: 0 }
};

// src/components/lab/timeline/two-column/milestone-row/milestone-row.styles.ts
var msRowSx = (topPercent) => ({
  position: "absolute",
  top: `${topPercent}%`,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start"
});
var msColumnBoxSx = (columnSide, _visible) => ({
  flex: 1,
  minWidth: 0,
  position: "relative",
  overflow: "visible",
  display: {
    xs: columnSide === "right" ? "block" : "none",
    md: "block"
  }
});
var msDotWrapperSx = (blurred) => ({
  position: "relative",
  display: "inline-flex",
  transition: "filter 0.2s ease, opacity 0.2s ease, transform 0.2s ease",
  ...blurred && {
    filter: "blur(1.5px)",
    opacity: 0.38,
    transform: "scale(0.97)",
    pointerEvents: "none"
  }
});
var msCardWrapperSx = (isExpanded, suppressElevation, side) => (theme) => ({
  position: "absolute",
  zIndex: isExpanded ? 1e3 : 1,
  transition: "filter 0.2s ease, opacity 0.2s ease, transform 0.2s ease",
  // Raise hovered card above adjacent phase cards so it is never overlapped.
  "&:hover": { zIndex: 999 },
  // translateY(-50%) centres the card vertically on its dot.
  transform: "translateY(-50%)",
  ...suppressElevation && {
    filter: "blur(1.5px)",
    opacity: 0.38,
    transform: "scale(0.97) translateY(-50%)",
    pointerEvents: "none"
  },
  top: "15px",
  left: side === "right" ? theme.spacing(2) : 0,
  right: side === "left" ? theme.spacing(2) : 0
});

// src/components/lab/timeline/two-column/milestone-row/milestone-row.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
function MilestoneRow({ ms, mi, totalMilestones, ctx }) {
  const { msDone, msColor } = resolveMilestoneState(
    ms,
    mi,
    ctx.phaseKey,
    ctx.dotColor,
    ctx.checklist,
    ctx.localMilestoneDone
  );
  const { msDotClickAction, msDotKeyDown, msDotAriaLabel } = resolveMilestoneDotHandlers(
    ms,
    mi,
    ctx.phaseKey,
    msDone,
    ctx.checklist,
    ctx.handleToggleMilestone
  );
  const effectiveMsSide = ms.side ?? ctx.phaseSide;
  const isThisMsExpanded = ctx.expandedMiIdx === mi;
  const PHASE_CARD_RESERVE_SLOTS = 2;
  const topPercent = (PHASE_CARD_RESERVE_SLOTS + mi + 1) / (PHASE_CARD_RESERVE_SLOTS + totalMilestones + 1) * 100;
  const stopProp = (e) => e.stopPropagation();
  const suppressElevation = ctx.anyExpanded && !isThisMsExpanded;
  const dotChecklistProps = ctx.checklist ? {
    role: "checkbox",
    "aria-checked": msDone,
    "aria-label": msDotAriaLabel,
    tabIndex: 0
  } : {};
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_Box19.default, { sx: msRowSx(topPercent), children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Box19.default, { "data-col": "left", sx: msColumnBoxSx("left", effectiveMsSide === "left"), children: effectiveMsSide === "left" && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      import_Box19.default,
      {
        "data-ms-card": "true",
        ref: (el) => ctx.onMeasure(mi, el),
        onClick: stopProp,
        sx: msCardWrapperSx(isThisMsExpanded, suppressElevation, "left"),
        children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          MilestoneBadge,
          {
            milestone: ms,
            done: msDone,
            isExpanded: isThisMsExpanded,
            suppressElevation,
            stableId: `${ctx.phaseKey}-${mi}`,
            expandableIcon: ctx.expandableIcon,
            columnSide: "left",
            isViewed: ctx.viewedKeys.has(`ms-${ctx.phaseKey}-${mi}`),
            onMarkViewed: ctx.onMarkViewed ? () => ctx.onMarkViewed(`ms-${ctx.phaseKey}-${mi}`) : void 0,
            taskDoneStates: resolveTaskChildren(ms).reduce(
              (acc, task, ti) => {
                const done = ctx.localTaskDoneMap[`${ctx.phaseKey}-c${mi}-t${ti}`] ?? task.done ?? false;
                acc[String(task.key)] = done;
                acc[`idx-${ti}`] = done;
                return acc;
              },
              {}
            ),
            onToggleTask: (taskIdx, _done) => ctx.handleToggleTask(ctx.phaseKey, mi, taskIdx),
            onRequestExpand: () => ctx.handleExpandMilestone(ctx.phaseKey, mi)
          }
        )
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Box19.default, { "data-col": "center", sx: centerColumnSx, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_Box19.default, { sx: msDotWrapperSx(suppressElevation), children: [
      ms.date && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Typography13.default, { variant: "caption", "aria-hidden": true, sx: floatingDatePillSx, children: ms.date }),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
        import_Tooltip6.default,
        {
          title: resolveMilestoneTooltip(ctx.checklist, msColor, msDone, ms),
          placement: "top",
          arrow: true,
          children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
            TimelineDot,
            {
              icon: ms.icon,
              color: msColor,
              dotBg: ms.dotBg,
              size: "milestone",
              done: msDone,
              onClick: msDotClickAction,
              onKeyDown: msDotKeyDown,
              ...dotChecklistProps
            }
          ) })
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Box19.default, { "data-col": "right", sx: msColumnBoxSx("right", effectiveMsSide === "right"), children: effectiveMsSide === "right" && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      import_Box19.default,
      {
        "data-ms-card": "true",
        ref: (el) => ctx.onMeasure(mi, el),
        onClick: stopProp,
        sx: msCardWrapperSx(isThisMsExpanded, suppressElevation, "right"),
        children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          MilestoneBadge,
          {
            milestone: ms,
            done: msDone,
            isExpanded: isThisMsExpanded,
            suppressElevation,
            stableId: `${ctx.phaseKey}-${mi}`,
            expandableIcon: ctx.expandableIcon,
            isViewed: ctx.viewedKeys.has(`ms-${ctx.phaseKey}-${mi}`),
            onMarkViewed: ctx.onMarkViewed ? () => ctx.onMarkViewed(`ms-${ctx.phaseKey}-${mi}`) : void 0,
            taskDoneStates: resolveTaskChildren(ms).reduce(
              (acc, task, ti) => {
                const done = ctx.localTaskDoneMap[`${ctx.phaseKey}-c${mi}-t${ti}`] ?? task.done ?? false;
                acc[String(task.key)] = done;
                acc[`idx-${ti}`] = done;
                return acc;
              },
              {}
            ),
            onToggleTask: (taskIdx, _done) => ctx.handleToggleTask(ctx.phaseKey, mi, taskIdx),
            onRequestExpand: () => ctx.handleExpandMilestone(ctx.phaseKey, mi)
          }
        )
      }
    ) })
  ] });
}

// src/components/lab/timeline/two-column/marker-row/marker-row.tsx
var import_Box22 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip7 = __toESM(require("@mui/material/Tooltip"), 1);

// src/components/lab/timeline/two-column/marker-row/marker-label/marker-label.tsx
var import_Box20 = __toESM(require("@mui/material/Box"), 1);
var import_Typography14 = __toESM(require("@mui/material/Typography"), 1);

// src/components/lab/timeline/two-column/marker-row/marker-label/marker-label.styles.ts
var markerCaptionSx = {
  color: "text.secondary",
  fontWeight: 600,
  whiteSpace: "nowrap"
};
var markerDateSpanSx = {
  ml: 0.75,
  fontWeight: 400,
  opacity: 0.7
};

// src/components/lab/timeline/two-column/marker-row/marker-label/marker-label.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
function MarkerLabel({ title, date }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_Typography14.default, { variant: "caption", sx: markerCaptionSx, children: [
    title,
    date && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_Box20.default, { component: "span", sx: markerDateSpanSx, children: [
      "\xB7 ",
      date
    ] })
  ] });
}

// src/components/lab/timeline/two-column/spine-connector/spine-connector.tsx
var import_Box21 = __toESM(require("@mui/material/Box"), 1);
var import_Typography15 = __toESM(require("@mui/material/Typography"), 1);

// src/components/lab/timeline/two-column/spine-connector/spine-connector.styles.ts
var yearLabelSx = (marginBottom) => ({
  position: "absolute",
  bottom: `${marginBottom}px`,
  left: "50%",
  transform: "translateX(-50%)",
  whiteSpace: "nowrap",
  px: 1,
  py: 0.25,
  lineHeight: 1.6,
  borderRadius: 1,
  fontSize: "0.75rem",
  fontWeight: 800,
  letterSpacing: 0.5,
  bgcolor: "background.paper",
  color: "text.primary",
  border: "1px solid",
  borderColor: "divider",
  boxShadow: 1,
  zIndex: 1
});

// src/components/lab/timeline/two-column/spine-connector/spine-connector.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
function SpineConnector({
  dotColor,
  yearMilestone,
  yearLabelMarginBottom = 50,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    import_Box21.default,
    {
      ...other,
      sx: [
        (theme) => ({
          display: "flex",
          flexGrow: 1,
          minHeight: 24,
          width: 2,
          position: "relative",
          bgcolor: `rgba(${theme.vars.palette[dotColor]?.mainChannel ?? theme.vars.palette.grey["500Channel"]} / 0.3)`
        }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      children: yearMilestone && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Typography15.default, { variant: "caption", sx: yearLabelSx(yearLabelMarginBottom), children: yearMilestone })
    }
  );
}

// src/components/lab/timeline/two-column/marker-row/marker-row.styles.ts
var markerPhaseLiSx = {
  position: "relative",
  overflow: "visible",
  display: "flex",
  flexDirection: "column",
  zIndex: 1,
  minHeight: 40
};
var markerLabelSlotSx = (side) => ({
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  // xs: left slot hidden — label shifts to the right slot on mobile.
  // Right slot is always visible.
  display: side === "left" ? { xs: "none", md: "flex" } : "flex",
  justifyContent: side === "left" ? "flex-end" : "flex-start",
  alignItems: "center",
  pr: side === "left" ? 1.5 : 0,
  pl: side === "right" ? 1.5 : 0
});
var markerCenterSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexShrink: 0,
  position: "relative"
};
var markerRowInnerSx = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
};

// src/components/lab/timeline/two-column/marker-row/marker-row.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
function MarkerRow({
  phase,
  isLastPhase,
  dotColor,
  isDone,
  checklist,
  yearLabelValue,
  isMobile,
  ...other
}) {
  const markerTooltip = resolvePhaseTooltip(checklist, dotColor, isDone, phase);
  const shouldShowRightLabel = phase.side !== "left" || isMobile;
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Box22.default, { component: "li", "data-testid": "tl-item", sx: markerPhaseLiSx, ...other, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_Box22.default, { sx: markerRowInnerSx, children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Box22.default, { sx: markerLabelSlotSx("left"), children: phase.side === "left" && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(MarkerLabel, { title: phase.shortTitle ?? phase.title, date: phase.date }) }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_Box22.default, { "data-col": "center", sx: markerCenterSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Tooltip7.default, { title: markerTooltip, placement: "top", arrow: true, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(TimelineDot, { icon: phase.icon, color: dotColor, size: "milestone", done: isDone }) }) }),
      !isLastPhase && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(SpineConnector, { dotColor, yearMilestone: yearLabelValue })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Box22.default, { sx: markerLabelSlotSx("right"), children: shouldShowRightLabel && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(MarkerLabel, { title: phase.shortTitle ?? phase.title, date: phase.date }) })
  ] }) });
}

// src/components/lab/timeline/two-column/phase-row/phase-row.tsx
var import_Box24 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip8 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography16 = __toESM(require("@mui/material/Typography"), 1);

// src/components/lab/timeline/two-column/phase-row/timeline-column/timeline-column.tsx
var import_Box23 = __toESM(require("@mui/material/Box"), 1);

// src/components/lab/timeline/two-column/phase-row/timeline-column/timeline-column.styles.ts
var timelineColumnSx = (columnSide, _hasContent, bottomPadding) => ({
  flex: 1,
  minWidth: 0,
  textAlign: columnSide === "left" ? "right" : "left",
  pr: columnSide === "left" ? 2 : 0,
  pl: columnSide === "right" ? 2 : 0,
  pt: 0.75,
  paddingBottom: `${bottomPadding}px`,
  // xs: left column hidden (all cards move to right slot on mobile).
  // md: BOTH columns always in layout — keeps the centre spine centred.
  display: {
    xs: columnSide === "left" ? "none" : "block",
    md: "block"
  }
});

// src/components/lab/timeline/two-column/phase-row/timeline-column/timeline-column.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
function TimelineColumn({
  columnSide,
  hasContent,
  children,
  bottomPadding
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_Box23.default, { "data-col": columnSide, sx: timelineColumnSx(columnSide, hasContent, bottomPadding), children });
}

// src/components/lab/timeline/two-column/phase-row/phase-row.styles.ts
var phaseRowSx = (blurred) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  minWidth: 0,
  transition: "filter 0.2s ease, opacity 0.2s ease, transform 0.2s ease",
  ...blurred && {
    filter: "blur(1.5px)",
    opacity: 0.38,
    transform: "scale(0.97)",
    pointerEvents: "none"
  },
  flex: 1
});
var phaseDotWrapperSx = {
  position: "relative",
  display: "inline-flex"
};

// src/components/lab/timeline/two-column/phase-row/phase-row.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
function PhaseRow({
  phase,
  isSuppressed,
  phaseCardGap,
  phaseCardNode,
  dotColor,
  isDone,
  isLastPhase,
  yearLabelValue,
  yearLabelMarginBottom,
  checklist,
  dotClickAction,
  dotKeyDownHandler,
  dotAriaLabel,
  phaseToggleCounts,
  selectedPhaseKey,
  isMobile
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_Box24.default, { sx: phaseRowSx(isSuppressed), children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      TimelineColumn,
      {
        columnSide: "left",
        hasContent: phase.side === "left",
        bottomPadding: phaseCardGap,
        children: !isMobile && phase.side === "left" && phaseCardNode
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_Box24.default, { "data-col": "center", sx: centerColumnSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_Box24.default, { sx: phaseDotWrapperSx, children: [
        !phase.hideDate && phase.date && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_Typography16.default, { variant: "caption", "aria-hidden": true, sx: floatingDatePillSx, children: phase.date }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          import_Tooltip8.default,
          {
            title: resolvePhaseTooltip(checklist, dotColor, isDone, phase),
            placement: "top",
            arrow: true,
            children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              TimelineDot,
              {
                icon: phase.icon,
                color: dotColor,
                size: "phase",
                ...buildPhaseDotTsxProps(
                  phase,
                  checklist,
                  isDone,
                  dotAriaLabel,
                  phaseToggleCounts,
                  selectedPhaseKey
                ),
                onClick: dotClickAction,
                onKeyDown: dotKeyDownHandler
              }
            ) })
          }
        )
      ] }),
      !isLastPhase && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        SpineConnector,
        {
          dotColor,
          yearMilestone: yearLabelValue,
          yearLabelMarginBottom
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      TimelineColumn,
      {
        columnSide: "right",
        hasContent: phase.side === "right",
        bottomPadding: phaseCardGap,
        children: (phase.side === "right" || isMobile) && phaseCardNode
      }
    )
  ] });
}

// src/components/lab/timeline/two-column/two-column.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
var useIsomorphicLayoutEffect = globalThis.window === void 0 ? import_react12.useEffect : import_react12.useLayoutEffect;
var EMPTY_VIEWED_KEYS = /* @__PURE__ */ new Set();
function makeTaskStateKey(phaseKey, childIdx, taskIdx) {
  return childIdx === null ? `${phaseKey}-t${taskIdx}` : `${phaseKey}-c${childIdx}-t${taskIdx}`;
}
function TimelineTwoColumn({
  phases,
  checklist = false,
  onTogglePhaseDone,
  onToggleMilestoneDone,
  onToggleTaskDone,
  selectedPhaseKey,
  onPhaseSelect,
  expandableIcon,
  viewedKeys,
  onMarkViewed,
  onPhasesChange,
  sortOrder = "desc",
  milestoneSlotHeight = 60,
  phaseCardGap = 90,
  yearLabelMarginBottom = 50,
  sx,
  ...other
}) {
  const {
    localPhaseDone,
    setLocalPhaseDone,
    localMilestoneDone,
    setLocalMilestoneDone,
    localTaskDoneMap,
    setLocalTaskDoneMap
  } = useTimelineDoneState(phases, sortOrder);
  const [phaseToggleCounts, setPhaseToggleCounts] = (0, import_react12.useState)({});
  const [expandedMilestoneMap, setExpandedMilestoneMap] = (0, import_react12.useState)(
    {}
  );
  const [expandedPhaseKey, setExpandedPhaseKey] = (0, import_react12.useState)(null);
  const sortMilestones = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
  const handleExpandMilestone = (0, import_react12.useCallback)((phaseKey, milestoneIndex) => {
    const k = String(phaseKey);
    setExpandedPhaseKey(null);
    setExpandedMilestoneMap((prev) => ({
      ...prev,
      [k]: prev[k] === milestoneIndex ? null : milestoneIndex
    }));
  }, []);
  const handleExpandPhaseCard = (0, import_react12.useCallback)((phaseKey) => {
    setExpandedMilestoneMap({});
    setExpandedPhaseKey((prev) => prev === phaseKey ? null : phaseKey);
  }, []);
  const stopCardPropagation = (0, import_react12.useCallback)((e) => e.stopPropagation(), []);
  const handleTogglePhase = (0, import_react12.useCallback)(
    (key) => {
      setPhaseToggleCounts((prev) => ({ ...prev, [String(key)]: (prev[String(key)] ?? 0) + 1 }));
      const next = !localPhaseDone[String(key)];
      setLocalPhaseDone((prev) => ({ ...prev, [String(key)]: next }));
      onTogglePhaseDone?.(key, next);
    },
    [localPhaseDone, onTogglePhaseDone, setLocalPhaseDone, setPhaseToggleCounts]
  );
  const handleToggleMilestone = (0, import_react12.useCallback)(
    (phaseKey, milestoneIndex) => {
      const k = `${phaseKey}-${milestoneIndex}`;
      const next = !localMilestoneDone[k];
      const updated = { ...localMilestoneDone, [k]: next };
      setLocalMilestoneDone(updated);
      onToggleMilestoneDone?.(phaseKey, milestoneIndex, next);
      const phase = phases.find((p) => p.key === phaseKey);
      const sortedMilestones = phase?.milestones ? sortMilestones([...phase.milestones]) : [];
      if (sortedMilestones.length > 0) {
        const allDone = sortedMilestones.every((_, i) => updated[`${phaseKey}-${i}`] ?? false);
        const currentPhaseDone = localPhaseDone[String(phaseKey)] ?? false;
        if (allDone !== currentPhaseDone) {
          setPhaseToggleCounts((prev) => ({
            ...prev,
            [String(phaseKey)]: (prev[String(phaseKey)] ?? 0) + 1
          }));
          setLocalPhaseDone((prev) => ({ ...prev, [String(phaseKey)]: allDone }));
          onTogglePhaseDone?.(phaseKey, allDone);
        }
      }
    },
    [
      localMilestoneDone,
      phases,
      sortMilestones,
      localPhaseDone,
      onToggleMilestoneDone,
      onTogglePhaseDone,
      setLocalMilestoneDone,
      setLocalPhaseDone,
      setPhaseToggleCounts
    ]
  );
  const handleToggleTask = (0, import_react12.useCallback)(
    (phaseKey, childIdx, taskIdx) => {
      const k = makeTaskStateKey(phaseKey, childIdx, taskIdx);
      const next = !(localTaskDoneMap[k] ?? false);
      const updated = { ...localTaskDoneMap, [k]: next };
      setLocalTaskDoneMap(updated);
      onToggleTaskDone?.(phaseKey, childIdx, taskIdx, next);
      if (childIdx !== null && checklist) {
        const phase = phases.find((p) => p.key === phaseKey);
        const sortedMilestones = phase?.milestones ? sortMilestones([...phase.milestones]) : [];
        const milestone = sortedMilestones[childIdx];
        const milestoneTasks = milestone ? resolveTaskChildren(milestone) : [];
        if (milestoneTasks.length > 0) {
          const allTasksDone = milestoneTasks.every(
            (_, ti) => updated[makeTaskStateKey(phaseKey, childIdx, ti)] ?? false
          );
          const currentMsDone = localMilestoneDone[`${phaseKey}-${childIdx}`] ?? false;
          if (allTasksDone !== currentMsDone) {
            const msUpdated = {
              ...localMilestoneDone,
              [`${phaseKey}-${childIdx}`]: allTasksDone
            };
            setLocalMilestoneDone(msUpdated);
            onToggleMilestoneDone?.(phaseKey, childIdx, allTasksDone);
            if (sortedMilestones.length > 0) {
              const allMsDone = sortedMilestones.every(
                (_, i) => msUpdated[`${phaseKey}-${i}`] ?? false
              );
              const currentPhaseDone = localPhaseDone[String(phaseKey)] ?? false;
              if (allMsDone !== currentPhaseDone) {
                setPhaseToggleCounts((prev) => ({
                  ...prev,
                  [String(phaseKey)]: (prev[String(phaseKey)] ?? 0) + 1
                }));
                setLocalPhaseDone((prev) => ({ ...prev, [String(phaseKey)]: allMsDone }));
                onTogglePhaseDone?.(phaseKey, allMsDone);
              }
            }
          }
        }
      }
    },
    [
      localTaskDoneMap,
      setLocalTaskDoneMap,
      onToggleTaskDone,
      checklist,
      phases,
      sortMilestones,
      localMilestoneDone,
      setLocalMilestoneDone,
      onToggleMilestoneDone,
      localPhaseDone,
      setLocalPhaseDone,
      onTogglePhaseDone
    ]
  );
  const today = (0, import_react12.useMemo)(() => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const sorted = (0, import_react12.useMemo)(
    () => sortPhasesByDate(phases, sortOrder).map((phase) => ({
      ...phase,
      milestones: phase.milestones ? sortMilestones(phase.milestones) : phase.milestones
    })),
    [phases, sortOrder, sortMilestones]
  );
  const overlappingKeys = (0, import_react12.useMemo)(() => detectPhaseOverlaps(phases), [phases]);
  const lastKey = sorted.at(-1)?.key;
  const anyExpanded = (0, import_react12.useMemo)(
    () => expandedPhaseKey !== null || Object.values(expandedMilestoneMap).some((v) => v !== null),
    [expandedPhaseKey, expandedMilestoneMap]
  );
  (0, import_react12.useEffect)(() => {
    if (!anyExpanded) return void 0;
    const handler = () => {
      setExpandedMilestoneMap({});
      setExpandedPhaseKey(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [anyExpanded]);
  const msHeightMapRef = (0, import_react12.useRef)({});
  const [msSlotHeights, setMsSlotHeights] = (0, import_react12.useState)({});
  useIsomorphicLayoutEffect(() => {
    const result = computeSlotHeights(sorted, msHeightMapRef.current);
    setMsSlotHeights((prev) => {
      const prevKeys = Object.keys(prev);
      const resultKeys = Object.keys(result);
      const changed = prevKeys.length !== resultKeys.length || resultKeys.some((k) => result[k] !== prev[k]);
      return changed ? result : prev;
    });
  }, [sorted]);
  const effectiveViewedKeys = viewedKeys ?? EMPTY_VIEWED_KEYS;
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_jsx_runtime32.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_Box25.default, { sx: timelineViewSlotSx("compact"), children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
      TimelineCompact,
      {
        phases,
        sx,
        checklist,
        sortOrder,
        viewedKeys,
        onMarkViewed,
        onTogglePhaseDone,
        onToggleMilestoneDone,
        onToggleTaskDone,
        ...other
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_Box25.default, { sx: [timelineViewSlotSx("full"), ...Array.isArray(sx) ? sx : [sx]], ...other, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_Timeline.default, { sx: timelineRootSx, children: sorted.map((phase, i) => {
      const { isDone, isOverdue, dotColor, yearLabelValue, phaseMilestones, isLastPhase } = resolvePhaseState(phase, i, sorted, lastKey, checklist, localPhaseDone, today);
      if (phase.variant === "marker") {
        return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          MarkerRow,
          {
            phase,
            isLastPhase,
            dotColor,
            isDone,
            checklist,
            yearLabelValue,
            isMobile: false
          },
          phase.key
        );
      }
      const { dotClickAction, dotKeyDownHandler, dotAriaLabel } = resolvePhaseDotHandlers(
        phase,
        isDone,
        checklist,
        handleTogglePhase,
        onPhaseSelect
      );
      const expandedMiIdx = expandedMilestoneMap[String(phase.key)] ?? null;
      const isThisPhaseExpanded = expandedPhaseKey === phase.key;
      const phaseViewKey = `phase-${phase.key}`;
      const phaseCardNode = /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { onClick: stopCardPropagation, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
        PhaseCard,
        {
          phase,
          columnSide: phase.side,
          ...buildPhaseCardTsxProps(
            checklist,
            isDone,
            isOverdue,
            overlappingKeys.has(phase.key),
            overlappingKeys.get(phase.key),
            anyExpanded,
            isThisPhaseExpanded,
            expandableIcon
          ),
          isViewed: effectiveViewedKeys.has(phaseViewKey),
          onMarkViewed: onMarkViewed ? () => onMarkViewed(phaseViewKey) : void 0,
          onPhasesChange,
          allPhases: onPhasesChange ? phases : void 0,
          isExpanded: isThisPhaseExpanded,
          onRequestExpand: () => handleExpandPhaseCard(phase.key),
          taskDoneStates: resolveTaskChildren(phase).reduce(
            (acc, task, ti) => {
              const done = localTaskDoneMap[makeTaskStateKey(phase.key, null, ti)] ?? task.done ?? false;
              acc[String(task.key)] = done;
              acc[`idx-${ti}`] = done;
              return acc;
            },
            {}
          ),
          onToggleTask: (taskIdx, _done) => handleToggleTask(phase.key, null, taskIdx)
        }
      ) });
      const milestoneCtx = {
        phaseKey: phase.key,
        phaseSide: phase.side,
        checklist,
        localMilestoneDone,
        localTaskDoneMap,
        expandedMiIdx,
        anyExpanded,
        dotColor,
        expandableIcon,
        viewedKeys: effectiveViewedKeys,
        onMarkViewed,
        handleToggleMilestone,
        handleToggleTask,
        handleExpandMilestone,
        onMeasure: (mi, el) => {
          if (el) {
            const h = el.offsetHeight;
            if (h > 0) {
              msHeightMapRef.current[`${String(phase.key)}-${mi}`] = h;
            }
          }
        }
      };
      const rows = [];
      const PHASE_CARD_RESERVE_SLOTS = 2;
      const phaseMinHeight = phaseMilestones.length > 0 ? (PHASE_CARD_RESERVE_SLOTS + phaseMilestones.length + 1) * (yearLabelValue !== null ? Math.max(
        msSlotHeights[String(phase.key)] ?? milestoneSlotHeight,
        yearLabelMarginBottom + 80
      ) : Math.max(milestoneSlotHeight, msSlotHeights[String(phase.key)] ?? 0)) : void 0;
      rows.push(
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          PhaseRow,
          {
            phase,
            isSuppressed: anyExpanded && expandedPhaseKey !== phase.key,
            phaseCardGap,
            phaseCardNode,
            dotColor,
            isDone,
            isLastPhase,
            yearLabelValue,
            yearLabelMarginBottom,
            checklist,
            dotClickAction,
            dotKeyDownHandler,
            dotAriaLabel,
            phaseToggleCounts,
            selectedPhaseKey,
            isMobile: false
          },
          "phase-row"
        )
      );
      phaseMilestones.forEach((ms, mi) => {
        rows.push(
          /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
            MilestoneRow,
            {
              ms,
              mi,
              totalMilestones: phaseMilestones.length,
              ctx: milestoneCtx,
              isMobile: false
            },
            `ms-row-${mi}`
          )
        );
      });
      return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
        import_Box25.default,
        {
          component: "li",
          "data-testid": "tl-item",
          sx: phaseLiSx({
            zIndex: expandedMiIdx === null ? 1 : 2,
            computedMinHeight: phaseMinHeight
          }),
          children: rows
        },
        phase.key
      );
    }) }) })
  ] });
}

// src/utils/timeline/timeline-utils.ts
function assignMilestoneSidesByDone(phases) {
  return phases.map((phase) => ({
    ...phase,
    milestones: phase.milestones?.map((ms) => ({
      ...ms,
      side: ms.side ?? (ms.done ? "left" : "right")
    }))
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  COMPACT_MILESTONE_DOT_SIZE,
  COMPACT_MIN_MILESTONE_DOT_SIZE,
  COMPACT_MIN_PHASE_DOT_SIZE,
  COMPACT_PHASE_DOT_SIZE,
  COMPACT_PHASE_ICON_SIZE,
  MilestoneBadge,
  PhaseCard,
  TaskDetailsRenderer,
  TaskList,
  TimelineCompact,
  TimelineDot,
  TimelineTwoColumn,
  assignMilestoneSidesByDone,
  resolveCompactColor
});
//# sourceMappingURL=lab.cjs.map
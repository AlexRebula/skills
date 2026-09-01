'use client';

// src/components/lab/timeline/two-column/phase-card/phase-card.tsx
import { useState as useState2, useRef, useCallback as useCallback2 } from "react";

// src/components/lab/timeline/two-column/phase-warning-popover/phase-warning-popover.tsx
import { useState, useCallback, useMemo, useEffect } from "react";
import Box2 from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";

// src/components/lab/timeline/two-column/utils.ts
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
var ganttTrackSx = {
  position: "relative",
  height: 20,
  borderRadius: 1,
  bgcolor: "action.hover"
};
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

// src/components/lab/timeline/two-column/phase-warning-popover/mini-gantt-ruler.tsx
import Box from "@mui/material/Box";

// src/components/lab/timeline/two-column/phase-warning-popover/utils.ts
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

// src/components/lab/timeline/two-column/phase-warning-popover/mini-gantt-ruler.tsx
import { jsx } from "react/jsx-runtime";
function MiniGanttRuler({ axis, conflictingPhases, overrides }) {
  const span = axis.max - axis.min;
  if (span <= 0) return null;
  const rangeList = Array.from(overrides.entries());
  return /* @__PURE__ */ jsx(Box, { "aria-hidden": true, sx: ganttTrackSx, children: conflictingPhases.map((phase) => {
    const override = overrides.get(phase.key);
    if (!override) return null;
    const leftPct = (override.startIdx - axis.min) / span * 100;
    const widthPct = Math.max(1, (override.endIdx - override.startIdx) / span * 100);
    const sliderColor = resolveSliderColor(phase.color);
    const isOverlapping = rangeList.some(
      ([otherKey, other]) => otherKey !== phase.key && override.startIdx <= other.endIdx && other.startIdx <= override.endIdx
    );
    return /* @__PURE__ */ jsx(Box, { sx: ganttBarSx(leftPct, widthPct, isOverlapping, sliderColor) }, phase.key);
  }) });
}

// src/components/lab/timeline/two-column/phase-warning-popover/phase-warning-popover.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function PhaseWarningPopover({
  open,
  anchorEl,
  onClose,
  allPhases,
  currentPhase,
  onPhasesChange
}) {
  const conflictingPhases = useMemo(
    () => getConnectedOverlapGroup(allPhases, currentPhase.key),
    [allPhases, currentPhase.key]
  );
  const [overrides, setOverrides] = useState(() => /* @__PURE__ */ new Map());
  const [pendingApply, setPendingApply] = useState(false);
  useEffect(() => {
    if (!open) return;
    const initial = /* @__PURE__ */ new Map();
    for (const p of conflictingPhases) {
      const range = parsePhaseRange(p);
      if (range) initial.set(p.key, range);
    }
    setOverrides(initial);
    setPendingApply(false);
  }, [open, conflictingPhases]);
  const axis = useMemo(() => computeAxis(overrides), [overrides]);
  const stillOverlapping = useMemo(() => hasRemainingOverlaps(overrides), [overrides]);
  const handleSliderChange = useCallback((phaseKey, value) => {
    if (!Array.isArray(value)) return;
    const [start, end] = value;
    setOverrides((prev) => {
      const next = new Map(prev);
      next.set(phaseKey, { startIdx: start, endIdx: end });
      return next;
    });
    setPendingApply(false);
  }, []);
  const handleMakeSequential = useCallback(() => {
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
  const handleApply = useCallback(() => {
    const withOverrides = applyOverrides(conflictingPhases, overrides);
    const merged = mergeIntoAll(allPhases, withOverrides);
    onPhasesChange(merged);
    onClose();
  }, [conflictingPhases, overrides, allPhases, onPhasesChange, onClose]);
  const handleCancel = useCallback(() => {
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
  return /* @__PURE__ */ jsx2(
    Popper,
    {
      open,
      anchorEl,
      placement: "bottom-start",
      modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
      sx: (theme) => ({
        zIndex: theme.zIndex.tooltip + 1
      }),
      children: /* @__PURE__ */ jsx2(ClickAwayListener, { onClickAway: onClose, children: /* @__PURE__ */ jsxs(Paper, { elevation: 8, sx: popoverPaperSx, children: [
        /* @__PURE__ */ jsxs(Box2, { sx: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxs(
            Typography,
            {
              variant: "subtitle2",
              sx: { display: "flex", alignItems: "center", gap: 0.5 },
              children: [
                "\u26A0 ",
                warningCount,
                " date overlap",
                warningCount !== 1 ? "s" : ""
              ]
            }
          ),
          /* @__PURE__ */ jsx2(
            IconButton,
            {
              size: "small",
              onClick: onClose,
              "aria-label": "Close warning panel",
              sx: { ml: "auto" },
              children: "\xD7"
            }
          )
        ] }),
        /* @__PURE__ */ jsx2(Divider, {}),
        /* @__PURE__ */ jsxs(Box2, { children: [
          /* @__PURE__ */ jsx2(Typography, { variant: "body2", color: "warning.main", sx: { fontWeight: 500 }, children: `Overlap: ${conflictingPhases.map((p) => p.shortTitle ?? p.title).join(" \u2194 ")}` }),
          /* @__PURE__ */ jsxs(Typography, { variant: "caption", color: "text.secondary", sx: { mt: 0.5, display: "block" }, children: [
            currentPhase.shortTitle ?? currentPhase.title,
            " \u2014 adjust sliders or use Make sequential."
          ] })
        ] }),
        /* @__PURE__ */ jsx2(Divider, {}),
        /* @__PURE__ */ jsx2(Box2, { sx: { display: "flex", flexDirection: "column", gap: 1.5 }, children: conflictingPhases.map((phase) => {
          const override = overrides.get(phase.key);
          if (!override) return null;
          const sliderColor = resolveSliderColor(phase.color);
          return /* @__PURE__ */ jsxs(Box2, { children: [
            /* @__PURE__ */ jsxs(Box2, { sx: sliderRowHeaderSx, children: [
              /* @__PURE__ */ jsx2(Typography, { variant: "caption", sx: { fontWeight: 600 }, children: phase.shortTitle ?? phase.title }),
              /* @__PURE__ */ jsxs(Typography, { variant: "caption", color: "text.secondary", children: [
                monthIndexToDate(override.startIdx),
                " \u2013 ",
                monthIndexToDate(override.endIdx)
              ] })
            ] }),
            /* @__PURE__ */ jsx2(
              Slider,
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
        /* @__PURE__ */ jsx2(MiniGanttRuler, { axis, conflictingPhases, overrides }),
        /* @__PURE__ */ jsx2(Divider, {}),
        /* @__PURE__ */ jsxs(Box2, { sx: actionsRowSx, children: [
          /* @__PURE__ */ jsx2(
            Button,
            {
              size: "small",
              variant: "outlined",
              color: "warning",
              disabled: !stillOverlapping,
              onClick: handleMakeSequential,
              children: "Make sequential"
            }
          ),
          pendingApply && /* @__PURE__ */ jsxs(Box2, { sx: { display: "flex", gap: 1 }, children: [
            /* @__PURE__ */ jsx2(
              Button,
              {
                size: "small",
                variant: "contained",
                color: "success",
                onClick: handleApply,
                "aria-label": "Apply date changes",
                children: "Apply"
              }
            ),
            /* @__PURE__ */ jsx2(
              Button,
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
import Box9 from "@mui/material/Box";
import Paper2 from "@mui/material/Paper";
import Tooltip3 from "@mui/material/Tooltip";
import Typography6 from "@mui/material/Typography";

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
import { Icon } from "@iconify/react";
import Box3 from "@mui/material/Box";

// src/components/material/data-display/icon/giselle/giselle-icon.styles.ts
var giselleIconRootSx = (width, height) => ({
  lineHeight: 0,
  display: "inline-flex",
  flexShrink: 0,
  width,
  height
});

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx3(
    Box3,
    {
      component: "span",
      sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ jsx3(
        Icon,
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

// src/components/lab/timeline/two-column/icons.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var DEFAULT_EXPANDABLE_ICON = /* @__PURE__ */ jsx4(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    children: /* @__PURE__ */ jsx4("g", { children: /* @__PURE__ */ jsxs2("g", { fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd", children: [
      /* @__PURE__ */ jsx4("path", { d: "M8.308 5.148a3.15 3.15 0 0 1-3.154 3.148A3.15 3.15 0 0 1 2 5.148A3.15 3.15 0 0 1 5.154 2a3.15 3.15 0 0 1 3.154 3.148M5.154 6.296a1.15 1.15 0 0 0 1.154-1.148A1.15 1.15 0 0 0 5.154 4A1.15 1.15 0 0 0 4 5.148a1.15 1.15 0 0 0 1.154 1.148M21 18.924a3.15 3.15 0 0 1-3.154 3.147a3.15 3.15 0 0 1-3.154-3.148a3.15 3.15 0 0 1 3.154-3.147c1.732 0 3.154 1.4 3.154 3.148m-3.154 1.147A1.15 1.15 0 0 0 19 18.923c0-.633-.517-1.147-1.154-1.147a1.15 1.15 0 0 0-1.154 1.148a1.15 1.15 0 0 0 1.154 1.147M21 11.462a3.15 3.15 0 0 1-3.154 3.148a3.15 3.15 0 0 1-3.154-3.148a3.15 3.15 0 0 1 3.154-3.148A3.15 3.15 0 0 1 21 11.462m-3.154 1.148A1.15 1.15 0 0 0 19 11.462c0-.634-.517-1.148-1.154-1.148a1.15 1.15 0 0 0-1.154 1.148a1.15 1.15 0 0 0 1.154 1.148" }),
      /* @__PURE__ */ jsx4("path", { d: "M5.154 7.018a1 1 0 0 1 1 1v6.784a3.154 3.154 0 0 0 3.13 3.154l5.724.044a1 1 0 0 1-.016 2l-5.724-.044a5.154 5.154 0 0 1-5.114-5.154V8.018a1 1 0 0 1 1-1" }),
      /* @__PURE__ */ jsx4("path", { d: "M9.172 12.462a5.02 5.02 0 0 1-5.018-5.018h2a3.02 3.02 0 0 0 3.018 3.018H15a1 1 0 1 1 0 2z" })
    ] }) })
  }
);

// src/components/lab/timeline/two-column/phase-card/utils.ts
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

// src/components/lab/timeline/two-column/phase-card/platform-strip.tsx
import Box4 from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { jsx as jsx5 } from "react/jsx-runtime";
function buildPlatformStripItems(platforms) {
  return platforms.map((p, i) => {
    const { label, icon } = derivePlatformEntry(p);
    return /* @__PURE__ */ jsx5(Tooltip, { title: label, arrow: true, placement: "top", children: /* @__PURE__ */ jsx5(Box4, { sx: { display: "flex", alignItems: "center", justifyContent: "center" }, children: icon ?? /* @__PURE__ */ jsx5(Box4, { component: "span", sx: { fontSize: 11, px: 0.5 }, children: label }) }) }, `platform-${i}`);
  });
}

// src/components/lab/timeline/two-column/animations.ts
import { keyframes } from "@emotion/react";
var pulseRing = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.6); opacity: 0; }
`;
var pulseDot = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;
var checkPop = keyframes`
  0%   { transform: scale(0.3); opacity: 0; }
  55%  { transform: scale(1.25); opacity: 1; }
  75%  { transform: scale(0.92); }
  100% { transform: scale(1); opacity: 1; }
`;

// src/components/lab/timeline/two-column/phase-card/phase-card.styles.ts
var labeledIconStripLabelSx = {
  display: "block",
  mb: 1,
  fontSize: "0.75rem",
  color: "text.disabled"
};
var detailBulletsContainerSx = {
  mt: 1.5,
  pt: 1.5,
  borderTop: "1px solid",
  borderColor: "divider",
  display: "flex",
  flexDirection: "column",
  gap: 0.75
};
var tooltipAlertListSx = {
  display: "flex",
  flexDirection: "column",
  gap: 1.25,
  py: 0.5,
  px: 0.25
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
var cornerAlertTooltipSx = {
  maxWidth: 320,
  px: 1.75,
  py: 1.25,
  bgcolor: "grey.900",
  "& .MuiTooltip-arrow": { color: "grey.900" }
};
var pillIconBoxSx = (iconSize) => ({
  display: "inline-flex",
  flexShrink: 0,
  "& svg": { width: iconSize, height: iconSize }
});

// src/components/lab/timeline/two-column/phase-card/phase-card.const.ts
var CORNER_ALERT_BADGE_SIZE = 26;
var CORNER_ALERT_ICON_SIZE = 16;
var CORNER_ALERT_LIST_ICON_SIZE = 16;
var PHASE_EYE_ICON_SIZE = 20;
var EYE_BUTTON_MIN_SIZE = 28;
var PHASE_PILL_ICON_SIZE = 16;
var PHASE_PILL_TEXT_FONT_SIZE = "0.75rem";
var PHASE_TASK_ICON_SIZE = 16;

// src/components/lab/timeline/two-column/phase-card/labeled-icon-strip.tsx
import Box5 from "@mui/material/Box";
import Typography2 from "@mui/material/Typography";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function LabeledIconStrip({ label, children }) {
  return /* @__PURE__ */ jsxs3(Box5, { sx: { mt: 2.5 }, children: [
    label && /* @__PURE__ */ jsx6(Typography2, { variant: "overline", sx: labeledIconStripLabelSx, children: label }),
    children
  ] });
}

// src/components/lab/timeline/two-column/phase-card/card-detail-bullets.tsx
import Box6 from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography3 from "@mui/material/Typography";
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function CardDetailBullets({
  id,
  details,
  in: expanded,
  taskDoneStates,
  onToggleTask
}) {
  return /* @__PURE__ */ jsx7(Collapse, { in: expanded, timeout: 50, children: /* @__PURE__ */ jsx7(Box6, { id, sx: detailBulletsContainerSx, children: details.map((task, i) => {
    const taskKey = String(task.key);
    const isDoneTask = taskDoneStates ? taskDoneStates[taskKey] ?? taskDoneStates[`idx-${i}`] ?? false : task.done ?? false;
    const toggleLabel = isDoneTask ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`;
    return /* @__PURE__ */ jsxs4(Box6, { sx: taskRowSx, children: [
      /* @__PURE__ */ jsx7(
        Box6,
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
          children: /* @__PURE__ */ jsx7(
            GiselleIcon,
            {
              icon: isDoneTask ? "solar:check-circle-bold" : "solar:record-minimalistic-outline",
              width: PHASE_TASK_ICON_SIZE
            }
          )
        }
      ),
      /* @__PURE__ */ jsx7(Typography3, { variant: "body2", sx: taskTitleSx(isDoneTask), children: task.title })
    ] }, i);
  }) }) });
}

// src/components/lab/timeline/two-column/phase-card/card-corner-alert-badge.tsx
import Box7 from "@mui/material/Box";
import Tooltip2 from "@mui/material/Tooltip";
import Typography4 from "@mui/material/Typography";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
function CardCornerAlertBadge({
  alerts,
  columnSide = "right",
  onClick,
  innerRef
}) {
  if (alerts.length === 0) return null;
  const hasError = alerts.some((a) => a.severity === "error");
  const { left, right, transform, tooltipPlacement } = resolveCornerBadgeAlign(columnSide);
  const tooltipContent = /* @__PURE__ */ jsx8(Box7, { sx: tooltipAlertListSx, children: alerts.map((a, i) => /* @__PURE__ */ jsxs5(Box7, { sx: { display: "flex", alignItems: "flex-start", gap: 1 }, children: [
    /* @__PURE__ */ jsx8(
      GiselleIcon,
      {
        icon: "solar:danger-triangle-bold",
        width: CORNER_ALERT_LIST_ICON_SIZE,
        "aria-hidden": true,
        style: { flexShrink: 0, marginTop: 2 }
      }
    ),
    /* @__PURE__ */ jsx8(
      Typography4,
      {
        variant: "body2",
        sx: { lineHeight: 1.55, fontSize: "0.8rem", fontWeight: 500 },
        children: a.message
      }
    )
  ] }, i)) });
  const badgeCircle = /* @__PURE__ */ jsx8(
    Box7,
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
      children: /* @__PURE__ */ jsx8(GiselleIcon, { icon: "solar:danger-triangle-bold", width: CORNER_ALERT_ICON_SIZE, "aria-hidden": true })
    }
  );
  if (onClick) return badgeCircle;
  return /* @__PURE__ */ jsx8(
    Tooltip2,
    {
      title: tooltipContent,
      placement: tooltipPlacement,
      arrow: true,
      slotProps: { tooltip: { sx: cornerAlertTooltipSx } },
      children: badgeCircle
    }
  );
}

// src/components/lab/timeline/two-column/phase-card/scenario-badge.tsx
import Typography5 from "@mui/material/Typography";
import { jsx as jsx9 } from "react/jsx-runtime";
function ScenarioBadge({ color, scenarioLabel }) {
  return /* @__PURE__ */ jsx9(Typography5, { variant: "overline", sx: scenarioBadgeSx(color), children: scenarioLabel });
}

// src/components/lab/timeline/two-column/phase-card/card-status-badge.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
function CardStatusBadge({ color, isScenario, scenarioLabel }) {
  if (!isScenario || !scenarioLabel) return null;
  return /* @__PURE__ */ jsx10(ScenarioBadge, { color, scenarioLabel });
}

// src/components/lab/timeline/two-column/phase-card/card-decoration.tsx
import Box8 from "@mui/material/Box";
import { Fragment, jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
function CardDecoration({ color, isOverduePending, icon }) {
  return /* @__PURE__ */ jsxs6(Fragment, { children: [
    /* @__PURE__ */ jsx11(Box8, { "aria-hidden": true, sx: buildCardDecorationGradientSx(color, isOverduePending) }),
    /* @__PURE__ */ jsx11(Box8, { "aria-hidden": "true", sx: phaseCardIconBoxSx(color, isOverduePending), children: icon })
  ] });
}

// src/components/lab/timeline/two-column/phase-card/phase-card.tsx
import { jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
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
  const badgeRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState2(false);
  const handleOpenPopover = useCallback2(() => setPopoverOpen(true), []);
  const handleClosePopover = useCallback2(() => setPopoverOpen(false), []);
  const popoverMode = Boolean(onPhasesChange && allPhases);
  const isDone = done ?? phase.done ?? false;
  const isOverdue = overdue ?? phase.overdue ?? false;
  const [internalExpanded, setInternalExpanded] = useState2(false);
  const [isHovered, setIsHovered] = useState2(false);
  const handleMouseEnter = useCallback2(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback2(() => setIsHovered(false), []);
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
  return /* @__PURE__ */ jsxs7(Box9, { sx: [{ position: "relative" }, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ jsx12(
      CardCornerAlertBadge,
      {
        alerts: cornerAlerts,
        columnSide,
        onClick: popoverMode ? handleOpenPopover : void 0,
        innerRef: popoverMode ? badgeRef : void 0
      }
    ),
    popoverMode && onPhasesChange && allPhases && /* @__PURE__ */ jsx12(
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
    /* @__PURE__ */ jsxs7(
      Paper2,
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
          !isHighlighted && !phase.hideDecoration && /* @__PURE__ */ jsx12(
            CardDecoration,
            {
              color: phase.color ?? "primary",
              isOverduePending: isOverdue && !isDone,
              icon: phase.icon
            }
          ),
          /* @__PURE__ */ jsx12(
            CardStatusBadge,
            {
              color: phase.color ?? "primary",
              isScenario,
              scenarioLabel: phase.scenarioLabel
            }
          ),
          !phase.hideDate && phase.date && /* @__PURE__ */ jsx12(
            Typography6,
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
          /* @__PURE__ */ jsx12(Box9, { sx: { display: "flex", alignItems: "flex-start", gap: 1 }, children: /* @__PURE__ */ jsxs7(Box9, { sx: { flex: 1 }, children: [
            /* @__PURE__ */ jsx12(
              Typography6,
              {
                variant: isScenario ? "h6" : "subtitle1",
                sx: [
                  {
                    pr: !isHighlighted && !phase.hideDecoration ? 6 : 0
                  },
                  hasDetails ? {
                    mb: 0.5
                  } : {
                    mb: 1
                  }
                ],
                children: displayTitle
              }
            ),
            hasDetails && /* @__PURE__ */ jsxs7(
              Box9,
              {
                sx: detailCountPillSx,
                "aria-label": `${taskChildren.length} expandable detail${taskChildren.length === 1 ? "" : "s"}`,
                children: [
                  /* @__PURE__ */ jsx12(Box9, { component: "span", sx: pillIconBoxSx(PHASE_PILL_ICON_SIZE), children: expandableIcon ?? DEFAULT_EXPANDABLE_ICON }),
                  /* @__PURE__ */ jsx12(
                    Typography6,
                    {
                      component: "span",
                      variant: "caption",
                      sx: { fontWeight: 600, lineHeight: 1, fontSize: PHASE_PILL_TEXT_FONT_SIZE },
                      children: taskChildren.length
                    }
                  )
                ]
              }
            ),
            expanded && phase.description && /* @__PURE__ */ jsx12(Typography6, { variant: "body2", sx: { color: "text.secondary", mt: 0.5 }, children: phase.description }),
            expanded && resolvePhotoSources(phase)?.map((p, i) => /* @__PURE__ */ jsx12(Box9, { component: "img", src: p.src, alt: p.alt, sx: photoImgSx(i === 0) }, i)),
            expanded && phase.clients && /* @__PURE__ */ jsx12(LabeledIconStrip, { label: phase.clientsLabel, children: /* @__PURE__ */ jsx12(Box9, { sx: logoStripSx, children: phase.clients.map(({ name, logo }) => /* @__PURE__ */ jsx12(Tooltip3, { title: name, arrow: true, children: /* @__PURE__ */ jsx12(Box9, { component: "img", src: logo, alt: name, sx: clientLogoSx }) }, name)) }) }),
            expanded && phase.platforms && phase.platforms.length > 0 && /* @__PURE__ */ jsx12(LabeledIconStrip, { label: phase.platformsLabel ?? "Tech Stack", children: /* @__PURE__ */ jsx12(Box9, { sx: platformStripSx, children: buildPlatformStripItems(phase.platforms) }) }),
            expanded && phase.projects && /* @__PURE__ */ jsx12(LabeledIconStrip, { label: phase.projectsLabel, children: /* @__PURE__ */ jsx12(Box9, { sx: logoStripSx, children: phase.projects.map(({ name, logo }) => /* @__PURE__ */ jsx12(Box9, { component: "img", src: logo, alt: name, sx: projectLogoSx }, name)) }) }),
            expanded && phase.footer != null && /* @__PURE__ */ jsx12(Box9, { sx: { mt: 1 }, onClick: (e) => e.stopPropagation(), children: phase.footer })
          ] }) }),
          hasDetails && /* @__PURE__ */ jsx12(
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
    onMarkViewed && /* @__PURE__ */ jsx12(
      Tooltip3,
      {
        title: isViewed ? "Mark as not viewed" : "Mark as viewed",
        placement: columnSide === "left" ? "right" : "left",
        arrow: true,
        children: /* @__PURE__ */ jsx12(
          Box9,
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
            children: /* @__PURE__ */ jsx12(
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
    )
  ] });
}

// src/components/lab/timeline/two-column/milestone-badge/milestone-badge.tsx
import { useCallback as useCallback3, useState as useState3 } from "react";
import Box10 from "@mui/material/Box";
import Paper3 from "@mui/material/Paper";
import Collapse2 from "@mui/material/Collapse";
import Tooltip4 from "@mui/material/Tooltip";
import Typography7 from "@mui/material/Typography";

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

// src/components/lab/timeline/two-column/milestone-badge/milestone-badge.const.ts
var MILESTONE_DATE_FONT_SIZE = "0.875rem";
var MILESTONE_PILL_ICON_SIZE = 16;
var MILESTONE_PILL_TEXT_FONT_SIZE = "0.75rem";
var MILESTONE_EYE_ICON_SIZE = 20;
var MILESTONE_EYE_BUTTON_MIN_SIZE = 28;
var MILESTONE_TASK_ICON_SIZE = 16;

// src/components/lab/timeline/two-column/milestone-badge/milestone-badge.tsx
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
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
  const [isHovered, setIsHovered] = useState3(false);
  const handleMouseEnter = useCallback3(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback3(() => setIsHovered(false), []);
  const displayTitle = isExpanded || isHovered ? m.title : m.shortTitle ?? m.title;
  const handleClick = useCallback3(() => {
    if (hasDetails) onRequestExpand();
  }, [hasDetails, onRequestExpand]);
  const handleKeyDown = useCallback3(
    (e) => {
      if (hasDetails && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onRequestExpand();
      }
    },
    [hasDetails, onRequestExpand]
  );
  return /* @__PURE__ */ jsxs8(
    Paper3,
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
        m.new && /* @__PURE__ */ jsxs8(Box10, { sx: milestoneNewBadgeRowSx(rightAlign), children: [
          /* @__PURE__ */ jsx13(Box10, { sx: milestoneNewDotSx }),
          /* @__PURE__ */ jsx13(Typography7, { variant: "caption", sx: milestoneNewLabelSx, children: "New" })
        ] }),
        m.date && /* @__PURE__ */ jsx13(Typography7, { variant: "caption", sx: milestoneDateSx(MILESTONE_DATE_FONT_SIZE), children: m.date }),
        /* @__PURE__ */ jsxs8(Box10, { sx: milestoneTitleRowSx(rightAlign), children: [
          onMarkViewed && /* @__PURE__ */ jsx13(
            Tooltip4,
            {
              title: isViewed ? "Mark as not viewed" : "Mark as viewed",
              placement: rightAlign ? "right" : "left",
              arrow: true,
              children: /* @__PURE__ */ jsx13(
                Box10,
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
                  children: /* @__PURE__ */ jsx13(
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
          /* @__PURE__ */ jsx13(Typography7, { variant: "subtitle2", sx: { fontWeight: 700, lineHeight: 1.3 }, children: displayTitle })
        ] }),
        (isExpanded || isHovered) && m.description && /* @__PURE__ */ jsx13(Typography7, { variant: "body2", sx: { color: "text.secondary", mt: 0.5 }, children: m.description }),
        hasDetails && /* @__PURE__ */ jsxs8(
          Box10,
          {
            sx: milestoneDetailPillSx,
            "aria-label": `${taskChildren.length} expandable detail${taskChildren.length === 1 ? "" : "s"}`,
            children: [
              /* @__PURE__ */ jsx13(Box10, { component: "span", sx: pillIconBoxSx2(MILESTONE_PILL_ICON_SIZE), children: expandableIcon ?? DEFAULT_EXPANDABLE_ICON }),
              /* @__PURE__ */ jsx13(
                Typography7,
                {
                  component: "span",
                  variant: "caption",
                  sx: { fontWeight: 600, lineHeight: 1, fontSize: MILESTONE_PILL_TEXT_FONT_SIZE },
                  children: taskChildren.length
                }
              )
            ]
          }
        ),
        hasDetails && /* @__PURE__ */ jsx13(Collapse2, { in: isExpanded, timeout: 50, children: /* @__PURE__ */ jsx13(Box10, { id: detailsId, sx: milestoneDetailListSx, children: taskChildren.map((task, i) => {
          const taskKey = String(task.key);
          const isDoneTask = taskDoneStates ? taskDoneStates[taskKey] ?? taskDoneStates[`idx-${i}`] ?? false : task.done ?? false;
          const toggleLabel = isDoneTask ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`;
          return /* @__PURE__ */ jsxs8(Box10, { sx: taskRowSx2, children: [
            /* @__PURE__ */ jsx13(
              Box10,
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
                children: /* @__PURE__ */ jsx13(
                  GiselleIcon,
                  {
                    icon: isDoneTask ? "solar:check-circle-bold" : "solar:record-minimalistic-outline",
                    width: MILESTONE_TASK_ICON_SIZE
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx13(Typography7, { variant: "body2", sx: taskTitleSx2(isDoneTask), children: task.title })
          ] }, i);
        }) }) })
      ]
    }
  );
}

// src/components/lab/timeline/two-column/timeline-dot/timeline-dot.tsx
import Box12 from "@mui/material/Box";

// src/components/lab/timeline/two-column/timeline-dot/timeline-dot.styles.ts
var doneCheckmarkSx = (iconSize) => ({
  width: iconSize,
  height: iconSize,
  flexShrink: 0,
  animation: `${checkPop} 0.36s cubic-bezier(0.34, 1.56, 0.64, 1)`
});
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

// src/components/lab/timeline/two-column/timeline-dot/utils.ts
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

// src/components/lab/timeline/two-column/timeline-dot/dot-inner.tsx
import Box11 from "@mui/material/Box";
import { jsx as jsx14 } from "react/jsx-runtime";
function DotInner({ done, icon, animationKey, iconSize }) {
  if (done) {
    return /* @__PURE__ */ jsx14(
      Box11,
      {
        component: "svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        sx: doneCheckmarkSx(iconSize),
        children: /* @__PURE__ */ jsx14("polyline", { points: "20 6 9 17 4 12" })
      },
      animationKey
    );
  }
  return /* @__PURE__ */ jsx14(
    Box11,
    {
      sx: [
        {
          display: "flex"
        },
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
import { jsx as jsx15 } from "react/jsx-runtime";
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
    /* @__PURE__ */ jsx15(
      Box12,
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
        children: /* @__PURE__ */ jsx15(Box12, { sx: timelineDotInnerSx(done, dotBg, effectiveColor, isMilestone, !!onClick), children: /* @__PURE__ */ jsx15(DotInner, { done, icon, animationKey, iconSize }) })
      }
    )
  );
}

// src/components/lab/timeline/two-column/two-column.tsx
import {
  useMemo as useMemo4,
  useState as useState8,
  useEffect as useEffect3,
  useCallback as useCallback8,
  useRef as useRef2,
  useLayoutEffect
} from "react";
import Box24 from "@mui/material/Box";
import Timeline from "@mui/lab/Timeline";

// src/components/lab/timeline/use-timeline-done-state.ts
import { useEffect as useEffect2, useState as useState4 } from "react";
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
  const [localPhaseDone, setLocalPhaseDone] = useState4(
    () => buildPhaseDoneRecord(phases)
  );
  const [localMilestoneDone, setLocalMilestoneDone] = useState4(
    () => buildMilestoneDoneRecord(phases, sortFn)
  );
  const [localTaskDoneMap, setLocalTaskDoneMap] = useState4(
    () => buildTaskDoneRecord(phases, sortFn)
  );
  useEffect2(() => {
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
import { useCallback as useCallback7, useMemo as useMemo3, useState as useState7 } from "react";
import Box17 from "@mui/material/Box";

// src/components/lab/timeline/compact/compact.styles.ts
import { alpha } from "@mui/material/styles";

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

// src/components/lab/timeline/compact/compact.styles.ts
var accordionDetailsSx = {
  pt: 0,
  pb: 2,
  px: 2
};
var phaseTitleSx = {
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
var milestoneTitleSx = {
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
var accordionRootSx = (done, active = false, expanded = false, color = "primary") => (theme) => {
  const neutralColor = typeof theme.palette.grey?.[500] === "string" ? theme.palette.grey[500] : "#919eab";
  const activeColor = theme.palette[color].main;
  const neutralBg = alpha(neutralColor, 0.08);
  const activeBg = alpha(activeColor, 0.12);
  const activeBorder = alpha(activeColor, 0.24);
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

// src/components/lab/timeline/compact/phase-accordion-row.tsx
import { useCallback as useCallback6, useState as useState6 } from "react";
import Box16 from "@mui/material/Box";
import SvgIcon2 from "@mui/material/SvgIcon";
import Typography12 from "@mui/material/Typography";

// src/components/material/surfaces/card/accordion/accordion.tsx
import { useId } from "react";
import Box13 from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography8 from "@mui/material/Typography";

// src/components/material/input/toggle-icon-button/icon.tsx
import { useCallback as useCallback4 } from "react";
import IconButton2 from "@mui/material/IconButton";

// src/components/material/input/toggle-icon-button/icon.defaults.tsx
import SvgIcon from "@mui/material/SvgIcon";

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
import { jsx as jsx16 } from "react/jsx-runtime";
var DEFAULT_PRESSED_ICON = /* @__PURE__ */ jsx16(SvgIcon, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx16("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
var DEFAULT_HOVER_ICON = /* @__PURE__ */ jsx16(SvgIcon, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx16("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });

// src/components/material/input/toggle-icon-button/icon.tsx
import { jsx as jsx17, jsxs as jsxs9 } from "react/jsx-runtime";
function ToggleIconButton({
  pressed,
  idleIcon,
  pressedIcon = DEFAULT_PRESSED_ICON,
  hoverIcon = DEFAULT_HOVER_ICON,
  onPressedChange,
  sx,
  ...other
}) {
  const handleClick = useCallback4(
    (e) => {
      e.stopPropagation();
      onPressedChange?.(!pressed);
    },
    [pressed, onPressedChange]
  );
  return /* @__PURE__ */ jsxs9(
    IconButton2,
    {
      onClick: handleClick,
      "aria-pressed": pressed,
      size: "small",
      sx: [rootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        /* @__PURE__ */ jsx17("span", { className: "ti-idle", children: idleIcon }),
        /* @__PURE__ */ jsx17("span", { className: "ti-pressed", children: pressedIcon }),
        /* @__PURE__ */ jsx17("span", { className: "ti-hover", children: hoverIcon })
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
import { jsx as jsx18, jsxs as jsxs10 } from "react/jsx-runtime";
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
  const id = useId();
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
    leadingElement = checkIcon === void 0 ? /* @__PURE__ */ jsx18(
      Checkbox,
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
    ) : /* @__PURE__ */ jsx18(
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
    leadingElement = /* @__PURE__ */ jsx18(Box13, { "aria-hidden": "true", sx: leadingIconSx, children: leadingIcon });
  } else {
    leadingElement = leadingAction;
  }
  const summaryContent = typeof title === "string" ? /* @__PURE__ */ jsx18(Typography8, { component: "span", variant: "subtitle1", children: title }) : title;
  const accordionSummary = /* @__PURE__ */ jsxs10(
    AccordionSummary,
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
  return /* @__PURE__ */ jsxs10(MuiAccordion, { sx: [accordionRootSx2, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    hasLeadingElement ? /* @__PURE__ */ jsxs10(Box13, { sx: summaryRowSx, children: [
      leadingElement,
      accordionSummary
    ] }) : accordionSummary,
    /* @__PURE__ */ jsx18(AccordionDetails, { id: detailsId, children })
  ] });
}

// src/utils/hooks/use-nested-checklist/use-nested-checklist.ts
import { useCallback as useCallback5, useMemo as useMemo2, useState as useState5 } from "react";
function useNestedChecklist(initialParentDone, initialChildrenDone) {
  const [parentDone, setParentDone] = useState5(initialParentDone);
  const [childrenDone, setChildrenDone] = useState5(initialChildrenDone);
  const indeterminate = useMemo2(
    () => childrenDone.some(Boolean) && !childrenDone.every(Boolean),
    [childrenDone]
  );
  const toggleParent = useCallback5(() => {
    const next = !parentDone;
    setParentDone(next);
    setChildrenDone((prev) => prev.map(() => next));
  }, [parentDone]);
  const toggleChild = useCallback5((index) => {
    setChildrenDone((prev) => {
      const next = prev.map((v, i) => i === index ? !v : v);
      setParentDone(next.every(Boolean));
      return next;
    });
  }, []);
  return { parentDone, indeterminate, childrenDone, toggleParent, toggleChild };
}

// src/components/lab/timeline/compact/chevron-down-icon.tsx
import { jsx as jsx19 } from "react/jsx-runtime";
function ChevronDownIcon() {
  return /* @__PURE__ */ jsx19(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      focusable: "false",
      children: /* @__PURE__ */ jsx19("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" })
    }
  );
}

// src/components/lab/timeline/compact/milestone-modal.tsx
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider2 from "@mui/material/Divider";
import IconButton3 from "@mui/material/IconButton";
import Typography11 from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// src/components/lab/timeline/compact/milestone-modal.styles.ts
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

// src/components/lab/timeline/compact/task-details-renderer.tsx
import Box15 from "@mui/material/Box";
import Typography10 from "@mui/material/Typography";

// src/components/lab/timeline/task-list/task-list.tsx
import Checkbox2 from "@mui/material/Checkbox";
import Box14 from "@mui/material/Box";
import Typography9 from "@mui/material/Typography";

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
import { jsx as jsx20, jsxs as jsxs11 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx20(Box14, { component: "ul", sx: [listSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: tasks.map((task, i) => {
    const isDone = taskDoneState?.[i] ?? task.done ?? false;
    return /* @__PURE__ */ jsxs11(Box14, { component: "li", sx: taskItemSx, children: [
      checklist && /* @__PURE__ */ jsx20(
        Checkbox2,
        {
          size: "small",
          checked: isDone,
          onChange: () => onTaskToggle?.(i),
          sx: taskCheckboxSx,
          slotProps: { input: { "aria-label": task.title } }
        }
      ),
      /* @__PURE__ */ jsx20(Typography9, { variant: "caption", sx: taskCaptionSx(isDone), children: task.title })
    ] }, i);
  }) });
}

// src/components/lab/timeline/compact/task-details-renderer.styles.ts
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

// src/components/lab/timeline/compact/utils.ts
function resolveCompactColor(color, done) {
  if (done) return "success";
  if (!color || color === "inherit" || color === "grey") return "primary";
  return color;
}

// src/components/lab/timeline/compact/task-details-renderer.tsx
import { jsx as jsx21, jsxs as jsxs12 } from "react/jsx-runtime";
function renderDetailsNode(node) {
  if (!node) return null;
  if (typeof node === "string") {
    return /* @__PURE__ */ jsx21(Typography10, { variant: "body2", sx: taskDetailsSummarySx, children: node });
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
  return /* @__PURE__ */ jsxs12(Box15, { sx: [taskDetailsContentSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    hasInlineDescription && /* @__PURE__ */ jsx21(Typography10, { variant: "body2", sx: taskDetailsSummarySx, children: task.description }),
    !hasInlineDescription && renderDetailsNode(task.details?.summary),
    hasContent && renderDetailsNode(task.details?.content),
    hasTasks && /* @__PURE__ */ jsx21(
      TaskList,
      {
        tasks: nestedTasks,
        checklist,
        taskDoneState,
        onTaskToggle,
        indent: "milestone"
      }
    ),
    !hasInlineDescription && !hasSummary && !hasContent && !hasTasks && /* @__PURE__ */ jsx21(Typography10, { variant: "body2", sx: taskDetailsEmptyStateSx, children: emptyState })
  ] });
}

// src/components/lab/timeline/compact/milestone-modal.tsx
import { jsx as jsx22, jsxs as jsxs13 } from "react/jsx-runtime";
function TaskDetailsModal({
  task,
  open,
  onClose,
  checklist = false,
  taskDoneState,
  onTaskToggle
}) {
  const fullScreen = useMediaQuery("(max-width:599.95px)");
  if (!task) return null;
  return /* @__PURE__ */ jsxs13(
    Dialog,
    {
      open,
      onClose,
      fullWidth: true,
      maxWidth: "sm",
      fullScreen,
      scroll: "paper",
      children: [
        /* @__PURE__ */ jsxs13(DialogTitle, { sx: dialogTitleSx, children: [
          /* @__PURE__ */ jsxs13("div", { children: [
            /* @__PURE__ */ jsx22(Typography11, { variant: "h6", component: "span", children: task.title }),
            task.date && /* @__PURE__ */ jsx22(Typography11, { variant: "caption", sx: dialogDateSx, children: task.date })
          ] }),
          /* @__PURE__ */ jsx22(IconButton3, { "aria-label": "Close details", onClick: onClose, sx: { mt: 0.5, flexShrink: 0 }, children: /* @__PURE__ */ jsx22("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx22("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) }) })
        ] }),
        /* @__PURE__ */ jsx22(Divider2, {}),
        /* @__PURE__ */ jsx22(DialogContent, { sx: { pt: 2 }, children: /* @__PURE__ */ jsx22(
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

// src/components/lab/timeline/compact/phase-accordion-row.tsx
import { Fragment as Fragment2, jsx as jsx23, jsxs as jsxs14 } from "react/jsx-runtime";
var CHECK_DONE_DOT = /* @__PURE__ */ jsx23(Box16, { sx: phaseDotSx("success"), "aria-hidden": "true", children: /* @__PURE__ */ jsx23(
  "svg",
  {
    width: COMPACT_PHASE_ICON_SIZE,
    height: COMPACT_PHASE_ICON_SIZE,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx23("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" })
  }
) });
var CHECK_HOVER_DOT = /* @__PURE__ */ jsx23(SvgIcon2, { sx: { color: "success.main", fontSize: COMPACT_PHASE_DOT_SIZE }, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx23("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });
var MS_CHECK_DONE_DOT = /* @__PURE__ */ jsx23(
  Box16,
  {
    sx: phaseDotSx("success"),
    style: { width: COMPACT_MILESTONE_DOT_SIZE, height: COMPACT_MILESTONE_DOT_SIZE, flexShrink: 0 },
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx23(
      "svg",
      {
        width: COMPACT_MILESTONE_ICON_SIZE,
        height: COMPACT_MILESTONE_ICON_SIZE,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsx23("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" })
      }
    )
  }
);
var MS_CHECK_HOVER_DOT = /* @__PURE__ */ jsx23(SvgIcon2, { sx: { color: "success.main", fontSize: COMPACT_MILESTONE_DOT_SIZE }, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx23("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });
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
  const [modalTask, setModalTask] = useState6(null);
  const effectiveColor = resolveCompactColor(phase.color, parentDone);
  const childTasks = phase.children && phase.children.length > 0 ? phase.children : sortedMilestones;
  const usesMilestoneChildren = !(phase.children && phase.children.length > 0);
  const hasDetails = Boolean(phase.description) || childTasks.length > 0;
  const handleToggleParent = useCallback6(() => {
    toggleParent();
    onTogglePhaseDone?.(phase.key, !parentDone);
  }, [toggleParent, onTogglePhaseDone, phase.key, parentDone]);
  const handleAccordionChange = useCallback6(
    (_e, expanded) => {
      onToggleExpanded(phase.key);
      if (expanded) onMarkViewed?.(`phase-${phase.key}`);
    },
    [onMarkViewed, onToggleExpanded, phase.key]
  );
  const phaseDot = /* @__PURE__ */ jsx23(Box16, { sx: phaseDotSx(effectiveColor), "aria-hidden": "true", children: phase.icon });
  const leadingAction = checklist ? void 0 : phaseDot;
  const checkIcon = checklist ? phaseDot : void 0;
  const checkDoneIcon = checklist ? CHECK_DONE_DOT : void 0;
  const checkHoverIcon = checklist ? CHECK_HOVER_DOT : void 0;
  const titleContent = /* @__PURE__ */ jsx23(Typography12, { variant: "subtitle2", sx: phaseTitleSx, children: phase.shortTitle ?? phase.title });
  const dateLabel = phase.date ? /* @__PURE__ */ jsx23(Typography12, { variant: "caption", sx: dateSx, children: phase.date }) : null;
  const isExpanded = expandedPhaseKey === phase.key;
  return /* @__PURE__ */ jsxs14(Fragment2, { children: [
    /* @__PURE__ */ jsx23(
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
        expandIcon: hasDetails ? /* @__PURE__ */ jsx23(ChevronDownIcon, {}) : null,
        title: titleContent,
        expanded: isExpanded,
        onChange: handleAccordionChange,
        sx: [
          accordionRootSx(parentDone, Boolean(phase.active), isExpanded, effectiveColor),
          accordionSummaryOverrideSx
        ],
        children: hasDetails && /* @__PURE__ */ jsxs14(Box16, { sx: accordionDetailsSx, children: [
          phase.description && /* @__PURE__ */ jsx23(Typography12, { variant: "body2", sx: descriptionSx, children: phase.description }),
          childTasks.length > 0 && /* @__PURE__ */ jsx23(Box16, { component: "ul", sx: milestonesListSx, children: childTasks.map((task, idx) => {
            const isDone = usesMilestoneChildren ? childrenDone[idx] ?? false : task.done ?? false;
            const idleDotColor = resolveCompactColor(task.color ?? phase.color, isDone);
            const isLast = idx === childTasks.length - 1;
            const nestedTasks = resolveTaskChildren(task);
            const canOpen = Boolean(task.description) || Boolean(task.details?.summary) || Boolean(task.details?.content) || nestedTasks.length > 0;
            const dotNode = /* @__PURE__ */ jsx23(Box16, { sx: milestoneDotSx(idleDotColor), "aria-hidden": "true", children: task.icon });
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
            return /* @__PURE__ */ jsxs14(
              Box16,
              {
                component: "li",
                sx: milestoneItemSx(canOpen, isDone),
                ...rowButtonProps,
                children: [
                  /* @__PURE__ */ jsxs14(Box16, { sx: milestoneDotColumnSx, children: [
                    checklist && usesMilestoneChildren ? /* @__PURE__ */ jsx23(
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
                    !isLast && /* @__PURE__ */ jsx23(Box16, { "aria-hidden": "true", sx: milestoneConnectorLineSx })
                  ] }),
                  /* @__PURE__ */ jsxs14(Box16, { sx: milestoneContentSx, children: [
                    /* @__PURE__ */ jsx23(Typography12, { variant: "subtitle2", sx: milestoneTitleSx, children: task.shortTitle ?? task.title }),
                    task.description && /* @__PURE__ */ jsx23(Typography12, { variant: "body2", sx: milestoneDescriptionPreviewSx, children: task.description })
                  ] }),
                  task.date && /* @__PURE__ */ jsx23(Typography12, { variant: "caption", sx: milestoneDateSx2, children: task.date })
                ]
              },
              `${phase.key}-child-${task.key}`
            );
          }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx23(
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
import { jsx as jsx24 } from "react/jsx-runtime";
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
  const sorted = useMemo3(() => sortPhasesByDate(phases, sortOrder), [phases, sortOrder]);
  const { localTaskDoneMap, setLocalTaskDoneMap } = useTimelineDoneState(phases, sortOrder);
  const handleTaskToggle = useCallback7(
    (phaseKey, childIdx, taskIdx) => {
      const k = childIdx === null ? `${phaseKey}-t${taskIdx}` : `${phaseKey}-c${childIdx}-t${taskIdx}`;
      const next = !(localTaskDoneMap[k] ?? false);
      setLocalTaskDoneMap((prev) => ({ ...prev, [k]: next }));
      onToggleTaskDone?.(phaseKey, childIdx, taskIdx, next);
    },
    [localTaskDoneMap, onToggleTaskDone, setLocalTaskDoneMap]
  );
  const [expandedPhaseKey, setExpandedPhaseKey] = useState7(null);
  const handleToggleExpanded = useCallback7((key) => {
    setExpandedPhaseKey((prev) => prev === key ? null : key);
  }, []);
  return /* @__PURE__ */ jsx24(Box17, { sx: [accordionRootSx(false), ...Array.isArray(sx) ? sx : [sx]], ...other, children: sorted.map((phase) => {
    const sortedMilestones = phase.milestones ? sortMilestones([...phase.milestones]) : [];
    return /* @__PURE__ */ jsx24(
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

// src/components/lab/timeline/two-column/milestone-row.tsx
import Box18 from "@mui/material/Box";
import Tooltip5 from "@mui/material/Tooltip";
import Typography13 from "@mui/material/Typography";

// src/components/lab/timeline/two-column/two-column.styles.ts
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
var phaseDotWrapperSx = {
  position: "relative",
  display: "inline-flex"
};

// src/components/lab/timeline/two-column/milestone-row.tsx
import { jsx as jsx25, jsxs as jsxs15 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs15(Box18, { sx: msRowSx(topPercent), children: [
    /* @__PURE__ */ jsx25(Box18, { "data-col": "left", sx: msColumnBoxSx("left", effectiveMsSide === "left"), children: effectiveMsSide === "left" && /* @__PURE__ */ jsx25(
      Box18,
      {
        "data-ms-card": "true",
        ref: (el) => ctx.onMeasure(mi, el),
        onClick: stopProp,
        sx: msCardWrapperSx(isThisMsExpanded, suppressElevation, "left"),
        children: /* @__PURE__ */ jsx25(
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
    /* @__PURE__ */ jsx25(Box18, { "data-col": "center", sx: centerColumnSx, children: /* @__PURE__ */ jsxs15(Box18, { sx: msDotWrapperSx(suppressElevation), children: [
      ms.date && /* @__PURE__ */ jsx25(Typography13, { variant: "caption", "aria-hidden": true, sx: floatingDatePillSx, children: ms.date }),
      /* @__PURE__ */ jsx25(
        Tooltip5,
        {
          title: resolveMilestoneTooltip(ctx.checklist, msColor, msDone, ms),
          placement: "top",
          arrow: true,
          children: /* @__PURE__ */ jsx25("span", { children: /* @__PURE__ */ jsx25(
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
    /* @__PURE__ */ jsx25(Box18, { "data-col": "right", sx: msColumnBoxSx("right", effectiveMsSide === "right"), children: effectiveMsSide === "right" && /* @__PURE__ */ jsx25(
      Box18,
      {
        "data-ms-card": "true",
        ref: (el) => ctx.onMeasure(mi, el),
        onClick: stopProp,
        sx: msCardWrapperSx(isThisMsExpanded, suppressElevation, "right"),
        children: /* @__PURE__ */ jsx25(
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

// src/components/lab/timeline/two-column/marker-row.tsx
import Box21 from "@mui/material/Box";
import Tooltip6 from "@mui/material/Tooltip";

// src/components/lab/timeline/two-column/marker-label.tsx
import Box19 from "@mui/material/Box";
import Typography14 from "@mui/material/Typography";
import { jsxs as jsxs16 } from "react/jsx-runtime";
function MarkerLabel({ title, date }) {
  return /* @__PURE__ */ jsxs16(Typography14, { variant: "caption", sx: markerCaptionSx, children: [
    title,
    date && /* @__PURE__ */ jsxs16(Box19, { component: "span", sx: markerDateSpanSx, children: [
      "\xB7 ",
      date
    ] })
  ] });
}

// src/components/lab/timeline/two-column/spine-connector/spine-connector.tsx
import Box20 from "@mui/material/Box";
import Typography15 from "@mui/material/Typography";

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
import { jsx as jsx26 } from "react/jsx-runtime";
function SpineConnector({
  dotColor,
  yearMilestone,
  yearLabelMarginBottom = 50,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx26(
    Box20,
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
      children: yearMilestone && /* @__PURE__ */ jsx26(Typography15, { variant: "caption", sx: yearLabelSx(yearLabelMarginBottom), children: yearMilestone })
    }
  );
}

// src/components/lab/timeline/two-column/marker-row.tsx
import { jsx as jsx27, jsxs as jsxs17 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx27(Box21, { component: "li", "data-testid": "tl-item", sx: markerPhaseLiSx, ...other, children: /* @__PURE__ */ jsxs17(Box21, { sx: markerRowInnerSx, children: [
    /* @__PURE__ */ jsx27(Box21, { sx: markerLabelSlotSx("left"), children: phase.side === "left" && /* @__PURE__ */ jsx27(MarkerLabel, { title: phase.shortTitle ?? phase.title, date: phase.date }) }),
    /* @__PURE__ */ jsxs17(Box21, { "data-col": "center", sx: markerCenterSx, children: [
      /* @__PURE__ */ jsx27(Tooltip6, { title: markerTooltip, placement: "top", arrow: true, children: /* @__PURE__ */ jsx27("span", { children: /* @__PURE__ */ jsx27(TimelineDot, { icon: phase.icon, color: dotColor, size: "milestone", done: isDone }) }) }),
      !isLastPhase && /* @__PURE__ */ jsx27(SpineConnector, { dotColor, yearMilestone: yearLabelValue })
    ] }),
    /* @__PURE__ */ jsx27(Box21, { sx: markerLabelSlotSx("right"), children: shouldShowRightLabel && /* @__PURE__ */ jsx27(MarkerLabel, { title: phase.shortTitle ?? phase.title, date: phase.date }) })
  ] }) });
}

// src/components/lab/timeline/two-column/phase-row.tsx
import Box23 from "@mui/material/Box";
import Tooltip7 from "@mui/material/Tooltip";
import Typography16 from "@mui/material/Typography";

// src/components/lab/timeline/two-column/timeline-column.tsx
import Box22 from "@mui/material/Box";
import { jsx as jsx28 } from "react/jsx-runtime";
function TimelineColumn({
  columnSide,
  hasContent,
  children,
  bottomPadding
}) {
  return /* @__PURE__ */ jsx28(Box22, { "data-col": columnSide, sx: timelineColumnSx(columnSide, hasContent, bottomPadding), children });
}

// src/components/lab/timeline/two-column/phase-row.tsx
import { jsx as jsx29, jsxs as jsxs18 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs18(Box23, { sx: phaseRowSx(isSuppressed), children: [
    /* @__PURE__ */ jsx29(
      TimelineColumn,
      {
        columnSide: "left",
        hasContent: phase.side === "left",
        bottomPadding: phaseCardGap,
        children: !isMobile && phase.side === "left" && phaseCardNode
      }
    ),
    /* @__PURE__ */ jsxs18(Box23, { "data-col": "center", sx: centerColumnSx, children: [
      /* @__PURE__ */ jsxs18(Box23, { sx: phaseDotWrapperSx, children: [
        !phase.hideDate && phase.date && /* @__PURE__ */ jsx29(Typography16, { variant: "caption", "aria-hidden": true, sx: floatingDatePillSx, children: phase.date }),
        /* @__PURE__ */ jsx29(
          Tooltip7,
          {
            title: resolvePhaseTooltip(checklist, dotColor, isDone, phase),
            placement: "top",
            arrow: true,
            children: /* @__PURE__ */ jsx29("span", { children: /* @__PURE__ */ jsx29(
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
      !isLastPhase && /* @__PURE__ */ jsx29(
        SpineConnector,
        {
          dotColor,
          yearMilestone: yearLabelValue,
          yearLabelMarginBottom
        }
      )
    ] }),
    /* @__PURE__ */ jsx29(
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
import { Fragment as Fragment3, jsx as jsx30, jsxs as jsxs19 } from "react/jsx-runtime";
var useIsomorphicLayoutEffect = globalThis.window === void 0 ? useEffect3 : useLayoutEffect;
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
  const [phaseToggleCounts, setPhaseToggleCounts] = useState8({});
  const [expandedMilestoneMap, setExpandedMilestoneMap] = useState8(
    {}
  );
  const [expandedPhaseKey, setExpandedPhaseKey] = useState8(null);
  const sortMilestones = sortOrder === "asc" ? sortMilestonesAsc : sortMilestonesDesc;
  const handleExpandMilestone = useCallback8((phaseKey, milestoneIndex) => {
    const k = String(phaseKey);
    setExpandedPhaseKey(null);
    setExpandedMilestoneMap((prev) => ({
      ...prev,
      [k]: prev[k] === milestoneIndex ? null : milestoneIndex
    }));
  }, []);
  const handleExpandPhaseCard = useCallback8((phaseKey) => {
    setExpandedMilestoneMap({});
    setExpandedPhaseKey((prev) => prev === phaseKey ? null : phaseKey);
  }, []);
  const stopCardPropagation = useCallback8((e) => e.stopPropagation(), []);
  const handleTogglePhase = useCallback8(
    (key) => {
      setPhaseToggleCounts((prev) => ({ ...prev, [String(key)]: (prev[String(key)] ?? 0) + 1 }));
      const next = !localPhaseDone[String(key)];
      setLocalPhaseDone((prev) => ({ ...prev, [String(key)]: next }));
      onTogglePhaseDone?.(key, next);
    },
    [localPhaseDone, onTogglePhaseDone, setLocalPhaseDone, setPhaseToggleCounts]
  );
  const handleToggleMilestone = useCallback8(
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
  const handleToggleTask = useCallback8(
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
  const today = useMemo4(() => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const sorted = useMemo4(
    () => sortPhasesByDate(phases, sortOrder).map((phase) => ({
      ...phase,
      milestones: phase.milestones ? sortMilestones(phase.milestones) : phase.milestones
    })),
    [phases, sortOrder, sortMilestones]
  );
  const overlappingKeys = useMemo4(() => detectPhaseOverlaps(phases), [phases]);
  const lastKey = sorted.at(-1)?.key;
  const anyExpanded = useMemo4(
    () => expandedPhaseKey !== null || Object.values(expandedMilestoneMap).some((v) => v !== null),
    [expandedPhaseKey, expandedMilestoneMap]
  );
  useEffect3(() => {
    if (!anyExpanded) return void 0;
    const handler = () => {
      setExpandedMilestoneMap({});
      setExpandedPhaseKey(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [anyExpanded]);
  const msHeightMapRef = useRef2({});
  const [msSlotHeights, setMsSlotHeights] = useState8({});
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
  return /* @__PURE__ */ jsxs19(Fragment3, { children: [
    /* @__PURE__ */ jsx30(Box24, { sx: { display: { xs: "block", md: "none" } }, children: /* @__PURE__ */ jsx30(
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
    /* @__PURE__ */ jsx30(
      Box24,
      {
        sx: [
          { display: { xs: "none", md: "block" }, position: "relative" },
          ...Array.isArray(sx) ? sx : [sx]
        ],
        ...other,
        children: /* @__PURE__ */ jsx30(Timeline, { sx: timelineRootSx, children: sorted.map((phase, i) => {
          const { isDone, isOverdue, dotColor, yearLabelValue, phaseMilestones, isLastPhase } = resolvePhaseState(phase, i, sorted, lastKey, checklist, localPhaseDone, today);
          if (phase.variant === "marker") {
            return /* @__PURE__ */ jsx30(
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
          const phaseCardNode = /* @__PURE__ */ jsx30("div", { onClick: stopCardPropagation, children: /* @__PURE__ */ jsx30(
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
            /* @__PURE__ */ jsx30(
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
              /* @__PURE__ */ jsx30(
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
          return /* @__PURE__ */ jsx30(
            Box24,
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
        }) })
      }
    )
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
export {
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
};
//# sourceMappingURL=lab.js.map
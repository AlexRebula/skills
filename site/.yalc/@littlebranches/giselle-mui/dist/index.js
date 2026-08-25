'use client';

// src/utils/icon/create-icon-registrar/create-icon-registrar.ts
import { addCollection } from "@iconify/react";
function createIconRegistrar(icons) {
  const collectionMap = /* @__PURE__ */ new Map();
  for (const [key, data] of Object.entries(icons)) {
    const colonAt = key.indexOf(":");
    if (colonAt === -1) continue;
    const prefix = key.slice(0, colonAt);
    const name = key.slice(colonAt + 1);
    if (!collectionMap.has(prefix)) {
      collectionMap.set(prefix, { prefix, width: 24, height: 24, icons: {} });
    }
    collectionMap.get(prefix).icons[name] = data;
  }
  const collections = Array.from(collectionMap.values());
  let registered = false;
  return function registerIcons() {
    if (registered) return;
    collections.forEach((collection) => addCollection(collection));
    registered = true;
  };
}

// src/utils/theme/theme-utils/theme-utils.ts
function channelAlpha(channel, alpha) {
  return `rgba(${channel} / ${alpha})`;
}
function hexToChannel(hex) {
  const clean = hex.startsWith("#") ? hex.slice(1) : hex;
  if (clean.length !== 6) {
    throw new Error(`hexToChannel: expected a 6-digit hex value, got "${hex}"`);
  }
  const r = Number.parseInt(clean.slice(0, 2), 16);
  const g = Number.parseInt(clean.slice(2, 4), 16);
  const b = Number.parseInt(clean.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    throw new Error(`hexToChannel: invalid hex value "${hex}"`);
  }
  return `${r} ${g} ${b}`;
}
function pxToRem(px) {
  return `${px / 16}rem`;
}
function remToPx(rem) {
  return rem * 16;
}

// src/utils/is-deep-equal/is-deep-equal.ts
function isDeepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isDeepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (typeof a === "object") {
    if (Array.isArray(b)) return false;
    const objA = a;
    const objB = b;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
      if (!isDeepEqual(objA[key], objB[key])) return false;
    }
    return true;
  }
  return false;
}

// src/utils/cookie/cookie.ts
function getCookieValue(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${encodeURIComponent(name)}=`));
  if (!match) return null;
  const raw = match.split("=").slice(1).join("=");
  try {
    return decodeURIComponent(raw);
  } catch {
    return null;
  }
}
function setCookieValue(name, value, options = {}) {
  if (typeof document === "undefined") return;
  const { maxAge, path = "/", sameSite = "Lax" } = options;
  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `path=${path}`,
    `SameSite=${sameSite}`
  ];
  if (maxAge !== void 0) parts.push(`max-age=${maxAge}`);
  if (sameSite === "None") parts.push("Secure");
  document.cookie = parts.join("; ");
}

// src/utils/hooks/use-local-storage/use-local-storage.ts
import { useState, useEffect, useCallback } from "react";
function readFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeToStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}
function removeFromStorage(key) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
  }
}
function useLocalStorage(key, initialValue) {
  const [state, setStateInternal] = useState(initialValue);
  useEffect(() => {
    const stored = readFromStorage(key, initialValue);
    setStateInternal(stored);
  }, [key]);
  const setState = useCallback(
    (partial) => {
      setStateInternal((prev) => {
        const next = { ...prev, ...partial };
        writeToStorage(key, next);
        return next;
      });
    },
    [key]
  );
  const setField = useCallback(
    (field, value) => {
      setStateInternal((prev) => {
        const next = { ...prev, [field]: value };
        writeToStorage(key, next);
        return next;
      });
    },
    [key]
  );
  const resetState = useCallback(
    (defaults) => {
      removeFromStorage(key);
      setStateInternal(defaults);
    },
    [key]
  );
  return { state, setState, setField, resetState };
}

// src/utils/theme/preset/theme-preset.ts
import { extendTheme } from "@mui/material/styles";
var GISELLE_PRIMARY_MAIN = "#2E7D32";
var GISELLE_PRIMARY_DARK_MAIN = "#76C442";
var GISELLE_SECONDARY_MAIN = "#F5A623";
var giselleThemeOptions = {
  colorSchemes: {
    light: {
      palette: {
        primary: { main: GISELLE_PRIMARY_MAIN },
        secondary: { main: GISELLE_SECONDARY_MAIN },
        info: { main: "#0288D1" },
        success: { main: "#388E3C" },
        warning: { main: "#ED6C02" },
        error: { main: "#D32F2F" }
      }
    },
    dark: {
      palette: {
        primary: { main: GISELLE_PRIMARY_DARK_MAIN },
        secondary: { main: GISELLE_SECONDARY_MAIN },
        info: { main: "#29B6F6" },
        success: { main: "#66BB6A" },
        warning: { main: "#FFA726" },
        error: { main: "#F44336" }
      }
    }
  }
};
var giselleTheme = extendTheme(giselleThemeOptions);

// src/components/theming/theme-provider/giselle/giselle.tsx
import { useMemo } from "react";
import { ThemeProvider, extendTheme as extendTheme2 } from "@mui/material/styles";

// src/utils/deep-merge/deep-merge.ts
var DANGEROUS_KEYS = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
function deepMerge(base, override) {
  const result = { ...base };
  const src = override;
  for (const key of Object.keys(src)) {
    if (DANGEROUS_KEYS.has(key)) continue;
    const baseVal = result[key];
    const overrideVal = src[key];
    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = deepMerge(
        baseVal,
        overrideVal
      );
    } else if (overrideVal !== void 0) {
      result[key] = overrideVal;
    }
  }
  return result;
}
function isPlainObject(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val) && Object.getPrototypeOf(val) === Object.prototype;
}

// src/components/theming/theme-provider/giselle/giselle.tsx
import { jsx } from "react/jsx-runtime";
function GiselleThemeProvider({
  children,
  themeOverrides,
  theme,
  defaultMode = "system"
}) {
  const resolvedTheme = useMemo(
    () => theme ?? (themeOverrides ? extendTheme2(deepMerge(giselleThemeOptions, themeOverrides)) : giselleTheme),
    [theme, themeOverrides]
  );
  return /* @__PURE__ */ jsx(ThemeProvider, { theme: resolvedTheme, defaultMode, children });
}

// src/components/theming/settings-provider/settings-provider.tsx
import { useCallback as useCallback2, useEffect as useEffect2, useMemo as useMemo2, useRef, useState as useState2 } from "react";

// src/components/theming/settings-provider/settings-context.ts
import { createContext, useContext } from "react";
var GiselleSettingsContext = createContext(null);
function useGiselleSettings() {
  const ctx = useContext(GiselleSettingsContext);
  if (ctx === null) {
    throw new Error("useGiselleSettings must be called within a <GiselleSettingsProvider>.");
  }
  return ctx;
}

// src/components/theming/settings-provider/settings-provider.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var DEFAULT_STORAGE_KEY = "giselle-settings";
function buildLocalStorageAdapter(storageKey) {
  return {
    get: () => {
      if (typeof window === "undefined") return null;
      try {
        const raw = window.localStorage.getItem(storageKey);
        return raw !== null ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    },
    set: (value) => {
      if (typeof window === "undefined") return;
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(value));
      } catch {
      }
    },
    clear: () => {
      if (typeof window === "undefined") return;
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
      }
    }
  };
}
function buildCookieAdapter(storageKey) {
  return {
    get: () => {
      const raw = getCookieValue(storageKey);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    },
    set: (value) => {
      setCookieValue(storageKey, JSON.stringify(value), { path: "/", sameSite: "Lax" });
    },
    clear: () => {
      setCookieValue(storageKey, "", { maxAge: 0, path: "/" });
    }
  };
}
function resolveAdapter(storage, storageKey) {
  if (storage === "localStorage") return buildLocalStorageAdapter(storageKey);
  if (storage === "cookie") return buildCookieAdapter(storageKey);
  return storage;
}
function GiselleSettingsProvider({
  children,
  defaultSettings,
  initialState,
  storageKey = DEFAULT_STORAGE_KEY,
  storage = "localStorage"
}) {
  const adapterRef = useRef(resolveAdapter(storage, storageKey));
  adapterRef.current = resolveAdapter(storage, storageKey);
  const [state, setStateRaw] = useState2(initialState ?? defaultSettings);
  useEffect2(() => {
    if (initialState !== void 0) return;
    const stored = adapterRef.current.get();
    if (stored === null) return;
    if (stored.version !== defaultSettings.version) {
      adapterRef.current.clear();
      return;
    }
    setStateRaw(stored);
  }, []);
  const [openDrawer, setOpenDrawer] = useState2(false);
  const setState = useCallback2((partial) => {
    setStateRaw((prev) => {
      const next = { ...prev, ...partial };
      adapterRef.current.set(next);
      return next;
    });
  }, []);
  const setField = useCallback2((key, value2) => {
    setStateRaw((prev) => {
      const next = { ...prev, [key]: value2 };
      adapterRef.current.set(next);
      return next;
    });
  }, []);
  const onReset = useCallback2(() => {
    adapterRef.current.clear();
    setStateRaw(defaultSettings);
  }, [defaultSettings]);
  const onCloseDrawer = useCallback2(() => setOpenDrawer(false), []);
  const onToggleDrawer = useCallback2(() => setOpenDrawer((prev) => !prev), []);
  const canReset = useMemo2(() => !isDeepEqual(state, defaultSettings), [state, defaultSettings]);
  const value = useMemo2(
    () => ({
      state,
      setState,
      setField,
      canReset,
      onReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer
    }),
    [state, setState, setField, canReset, onReset, openDrawer, onCloseDrawer, onToggleDrawer]
  );
  return /* @__PURE__ */ jsx2(
    GiselleSettingsContext.Provider,
    {
      value,
      children
    }
  );
}

// src/components/theming/settings-provider/theme-and-settings-provider.tsx
import { Fragment } from "react";

// src/components/theming/settings-provider/settings-theme-bridge.tsx
import { useEffect as useEffect3 } from "react";
import { useColorScheme } from "@mui/material/styles";
function SettingsThemeBridge({
  getMode
}) {
  const { state } = useGiselleSettings();
  const { setMode } = useColorScheme();
  const mode = getMode?.(state);
  useEffect3(() => {
    if (mode !== void 0) {
      setMode(mode);
    }
  }, [mode, setMode]);
  return null;
}

// src/components/theming/settings-provider/theme-and-settings-provider.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function GiselleThemeAndSettingsProvider({
  children,
  defaultSettings,
  initialState,
  storageKey,
  storage,
  themeOverrides,
  theme,
  defaultMode,
  getMode
}) {
  return /* @__PURE__ */ jsx3(GiselleThemeProvider, { themeOverrides, theme, defaultMode, children: /* @__PURE__ */ jsx3(
    GiselleSettingsProvider,
    {
      defaultSettings,
      initialState,
      storageKey,
      storage,
      children: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx3(SettingsThemeBridge, { getMode }),
        children
      ] })
    }
  ) });
}

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";

// src/components/material/data-display/icon/giselle/giselle-icon.styles.ts
var giselleIconRootSx = (width, height) => ({
  lineHeight: 0,
  display: "inline-flex",
  flexShrink: 0,
  width,
  height
});

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx4(
    Box,
    {
      component: "span",
      sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ jsx4(
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

// src/components/material/data-display/status-label/status-label.tsx
import React from "react";
import Chip from "@mui/material/Chip";

// src/components/material/data-display/status-label/status-label.const.ts
var STATUS_LABEL_HEIGHT = 24;
var STATUS_LABEL_FONT_SIZE = "0.75rem";
var STATUS_CONFIG = {
  active: { color: "success", label: "Active" },
  inactive: { color: "default", label: "Inactive" },
  pending: { color: "warning", label: "Pending" },
  review: { color: "info", label: "Review" },
  done: { color: "success", label: "Done" },
  cancelled: { color: "error", label: "Cancelled" },
  overdue: { color: "error", label: "Overdue" }
};

// src/components/material/data-display/status-label/status-label.styles.ts
var BASE_SX = {
  height: STATUS_LABEL_HEIGHT,
  fontSize: STATUS_LABEL_FONT_SIZE,
  fontWeight: 700,
  borderRadius: 0.75,
  "& .MuiChip-label": { px: 1 }
};
function statusChipSx(color) {
  if (color === "default") {
    return {
      ...BASE_SX,
      backgroundColor: channelAlpha("var(--mui-palette-grey-500Channel)", 0.16),
      color: "text.secondary"
    };
  }
  return (theme) => ({
    ...BASE_SX,
    backgroundColor: channelAlpha(theme.vars.palette[color].mainChannel, 0.16),
    color: `${color}.dark`
  });
}

// src/components/material/data-display/status-label/status-label.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var StatusLabel = React.forwardRef(function StatusLabel2({ status, label, size = "small", sx, ...other }, ref) {
  const { color, label: defaultLabel } = STATUS_CONFIG[status];
  return /* @__PURE__ */ jsx5(
    Chip,
    {
      ref,
      size,
      label: label ?? defaultLabel,
      sx: [statusChipSx(color), ...Array.isArray(sx) ? sx : [sx]],
      ...other
    }
  );
});
StatusLabel.displayName = "StatusLabel";

// src/components/material/surfaces/card/accordion/accordion.tsx
import { useId } from "react";
import Box2 from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

// src/components/material/input/toggle-icon-button/icon.tsx
import { useCallback as useCallback3 } from "react";
import IconButton from "@mui/material/IconButton";

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
import { jsx as jsx6 } from "react/jsx-runtime";
var DEFAULT_PRESSED_ICON = /* @__PURE__ */ jsx6(SvgIcon, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx6("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
var DEFAULT_HOVER_ICON = /* @__PURE__ */ jsx6(SvgIcon, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx6("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });

// src/components/material/input/toggle-icon-button/icon.tsx
import { jsx as jsx7, jsxs as jsxs2 } from "react/jsx-runtime";
function ToggleIconButton({
  pressed,
  idleIcon,
  pressedIcon = DEFAULT_PRESSED_ICON,
  hoverIcon = DEFAULT_HOVER_ICON,
  onPressedChange,
  sx,
  ...other
}) {
  const handleClick = useCallback3(
    (e) => {
      e.stopPropagation();
      onPressedChange?.(!pressed);
    },
    [pressed, onPressedChange]
  );
  return /* @__PURE__ */ jsxs2(
    IconButton,
    {
      onClick: handleClick,
      "aria-pressed": pressed,
      size: "small",
      sx: [rootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        /* @__PURE__ */ jsx7("span", { className: "ti-idle", children: idleIcon }),
        /* @__PURE__ */ jsx7("span", { className: "ti-pressed", children: pressedIcon }),
        /* @__PURE__ */ jsx7("span", { className: "ti-hover", children: hoverIcon })
      ]
    }
  );
}

// src/components/material/surfaces/card/accordion/accordion.styles.ts
var accordionRootSx = {};
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
import { jsx as jsx8, jsxs as jsxs3 } from "react/jsx-runtime";
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
    leadingElement = checkIcon === void 0 ? /* @__PURE__ */ jsx8(
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
    ) : /* @__PURE__ */ jsx8(
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
    leadingElement = /* @__PURE__ */ jsx8(Box2, { "aria-hidden": "true", sx: leadingIconSx, children: leadingIcon });
  } else {
    leadingElement = leadingAction;
  }
  const summaryContent = typeof title === "string" ? /* @__PURE__ */ jsx8(Typography, { component: "span", variant: "subtitle1", children: title }) : title;
  const accordionSummary = /* @__PURE__ */ jsxs3(
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
  return /* @__PURE__ */ jsxs3(MuiAccordion, { sx: [accordionRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    hasLeadingElement ? /* @__PURE__ */ jsxs3(Box2, { sx: summaryRowSx, children: [
      leadingElement,
      accordionSummary
    ] }) : accordionSummary,
    /* @__PURE__ */ jsx8(AccordionDetails, { id: detailsId, children })
  ] });
}

// src/components/material/surfaces/card/accordion/accordion.const.ts
var ACCORDION_DONE_MIN_TOUCH_TARGET = 24;

// src/components/material/surfaces/card/metric/metric-card.tsx
import Box4 from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography2 from "@mui/material/Typography";

// src/components/material/surfaces/card/metric/metric-card.const.ts
var METRIC_CARD_ICON_BOX_SIZE = 36;
var METRIC_CARD_DECORATION_SIZE = 140;

// src/components/material/surfaces/card/metric/metric-card.styles.ts
var metricCardPaperSx = {
  py: 3,
  pl: 3,
  pr: 2.5,
  position: "relative",
  overflow: "hidden"
};
var decorationOverlaySx = {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  pointerEvents: "none"
};
var metricCardContentSx = {
  position: "relative",
  zIndex: 1,
  flexGrow: 1
};
var metricCardIconBoxSx = (color) => (theme) => ({
  top: 24,
  right: 20,
  width: METRIC_CARD_ICON_BOX_SIZE,
  height: METRIC_CARD_ICON_BOX_SIZE,
  position: "absolute",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.vars.palette[color]?.main
});
var metricCardDecorationSx = (color) => (theme) => ({
  top: -40,
  right: -56,
  width: METRIC_CARD_DECORATION_SIZE,
  height: METRIC_CARD_DECORATION_SIZE,
  opacity: 0.1,
  borderRadius: 4,
  position: "absolute",
  transform: "rotate(40deg)",
  background: `linear-gradient(to right, ${theme.vars.palette[color]?.main}, transparent)`
});

// src/components/material/surfaces/card/metric/metric-card-decoration.tsx
import Box3 from "@mui/material/Box";
import { jsx as jsx9 } from "react/jsx-runtime";
function MetricCardDecoration({
  color = "primary",
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx9(Box3, { sx: [metricCardDecorationSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other });
}

// src/components/material/surfaces/card/metric/metric-card.tsx
import { jsx as jsx10, jsxs as jsxs4 } from "react/jsx-runtime";
function MetricCard({
  value,
  label,
  sublabel,
  icon,
  color = "primary",
  decoration,
  elevation = 0,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsxs4(
    Paper,
    {
      elevation,
      sx: [metricCardPaperSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        decoration && /* @__PURE__ */ jsx10(Box4, { "aria-hidden": "true", sx: decorationOverlaySx, children: decoration }),
        /* @__PURE__ */ jsxs4(Box4, { sx: metricCardContentSx, children: [
          /* @__PURE__ */ jsx10(Box4, { sx: { typography: "h3" }, children: value }),
          /* @__PURE__ */ jsx10(Typography2, { noWrap: true, variant: "subtitle2", component: "div", sx: { color: "text.secondary" }, children: label }),
          sublabel && /* @__PURE__ */ jsx10(
            Typography2,
            {
              noWrap: true,
              variant: "caption",
              component: "div",
              sx: { color: "text.disabled", mt: 0.25 },
              children: sublabel
            }
          )
        ] }),
        icon && /* @__PURE__ */ jsx10(Box4, { "aria-hidden": "true", sx: metricCardIconBoxSx(color), children: icon })
      ]
    }
  );
}

// src/components/material/surfaces/card/selectable/selectable-card.tsx
import ButtonBase from "@mui/material/ButtonBase";

// src/components/material/surfaces/card/selectable/selectable-card.styles.ts
var selectableCardSx = (selected) => (theme) => ({
  // --- Layout reset (ButtonBase is inline-flex by default) ---
  display: "block",
  width: "100%",
  textAlign: "left",
  // --- Paper-like surface ---
  p: 2.5,
  borderRadius: 1.5,
  position: "relative",
  overflow: "hidden",
  // Contains the MUI ripple within the border-radius
  border: `1px solid ${theme.vars.palette.divider}`,
  bgcolor: theme.vars.palette.background.paper,
  // --- Hover: subtle fill, cursor affordance ---
  cursor: "pointer",
  transition: theme.transitions.create(["background-color", "box-shadow"], {
    duration: theme.transitions.duration.shorter
  }),
  "&:hover": {
    bgcolor: theme.vars.palette.action.hover
  },
  // --- Keyboard focus ring ---
  // .Mui-focusVisible is applied by ButtonBase on keyboard navigation only,
  // so mouse users never see this ring (good UX + meets WCAG 2.4.11).
  "&.Mui-focusVisible": {
    outline: `3px solid ${theme.vars.palette.primary.main}`,
    outlineOffset: 2
  },
  // --- Selected ring (2px outline using box-shadow, doesn't affect layout) ---
  ...selected && {
    boxShadow: `0 0 0 2px ${theme.vars.palette.text.primary}`
  },
  // --- Disabled: muted + no pointer (ButtonBase also sets aria-disabled) ---
  "&.Mui-disabled": {
    opacity: 0.48,
    cursor: "default",
    pointerEvents: "none"
  }
});

// src/components/material/surfaces/card/selectable/selectable-card.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
function SelectableCard({
  selected = false,
  disabled = false,
  children,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx11(
    ButtonBase,
    {
      disabled,
      "aria-pressed": selected,
      focusRipple: true,
      sx: [selectableCardSx(selected), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children
    }
  );
}

// src/components/material/surfaces/card/quote/quote-card.tsx
import Box5 from "@mui/material/Box";
import Paper2 from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography3 from "@mui/material/Typography";

// src/components/material/surfaces/card/quote/quote-card.styles.ts
var quoteMarkSx = (color) => ({
  lineHeight: 1,
  fontSize: "4rem",
  color: `${color}.main`,
  opacity: 0.4,
  fontFamily: "Georgia, serif",
  userSelect: "none",
  flexShrink: 0,
  mt: -0.5
});
var quoteTextSx = {
  fontStyle: "italic",
  fontWeight: "fontWeightLight",
  color: "text.secondary",
  lineHeight: 1.85
};
var quoteCardPaperSx = (color) => (theme) => ({
  p: 3,
  borderRadius: 2,
  bgcolor: `rgba(${theme.vars.palette[color]?.mainChannel} / 0.06)`,
  border: `1px solid rgba(${theme.vars.palette[color]?.mainChannel} / 0.12)`
});

// src/components/material/surfaces/card/quote/quote-card.tsx
import { jsx as jsx12, jsxs as jsxs5 } from "react/jsx-runtime";
function QuoteCard({
  quote,
  author,
  source,
  color = "primary",
  elevation = 0,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx12(
    Paper2,
    {
      elevation,
      sx: [quoteCardPaperSx(color), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ jsxs5(Box5, { sx: { display: "flex", gap: 2 }, children: [
        /* @__PURE__ */ jsx12(Typography3, { "aria-hidden": true, sx: quoteMarkSx(color), children: "\u201C" }),
        /* @__PURE__ */ jsxs5(Box5, { sx: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx12(Typography3, { variant: "body1", sx: quoteTextSx, children: quote }),
          (author || source) && /* @__PURE__ */ jsxs5(
            Stack,
            {
              direction: "row",
              spacing: 0.75,
              sx: { mt: 2, color: "text.disabled", alignItems: "center" },
              children: [
                author && /* @__PURE__ */ jsx12(Typography3, { variant: "caption", sx: { fontWeight: "fontWeightMedium" }, children: author }),
                author && source && /* @__PURE__ */ jsx12(Typography3, { variant: "caption", "aria-hidden": true, sx: { opacity: 0.6 }, children: "\xB7" }),
                source && /* @__PURE__ */ jsx12(Typography3, { variant: "caption", sx: { opacity: 0.72 }, children: source })
              ]
            }
          )
        ] })
      ] })
    }
  );
}

// src/components/material/surfaces/card/stat/stat-card.tsx
import Box6 from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography4 from "@mui/material/Typography";

// src/components/material/surfaces/card/stat/stat-card.const.ts
var STAT_CARD_ICON_BOX_SIZE = 48;
var STAT_CARD_LABELS_MIN_WIDTH = 112;

// src/components/material/surfaces/card/stat/stat-card.styles.ts
var statCardRootSx = (color) => (theme) => ({
  p: 3,
  boxShadow: "none",
  position: "relative",
  overflow: "hidden",
  color: `${color}.dark`,
  backgroundImage: `linear-gradient(135deg, ${channelAlpha(theme.vars.palette[color].lightChannel, 0.1)}, ${channelAlpha(theme.vars.palette[color].lightChannel, 0.22)})`
});
var trendBoxSx = {
  top: 16,
  right: 16,
  gap: 0.5,
  display: "flex",
  position: "absolute",
  alignItems: "center"
};
var iconBoxSx = {
  mb: 3,
  width: STAT_CARD_ICON_BOX_SIZE,
  height: STAT_CARD_ICON_BOX_SIZE,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start"
};
var contentRowSx = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-end",
  justifyContent: "flex-end"
};
var labelsBoxSx = {
  flexGrow: 1,
  minWidth: STAT_CARD_LABELS_MIN_WIDTH
};
var decorationSx = {
  position: "absolute",
  bottom: -20,
  right: -20,
  pointerEvents: "none",
  lineHeight: 0
};
var STAT_CARD_SPARKLINE_OPTIONS = {
  chart: {
    sparkline: { enabled: true },
    animations: { enabled: false }
  },
  stroke: { width: 2, curve: "smooth" },
  tooltip: { enabled: false },
  markers: { strokeWidth: 0 }
};

// src/components/material/surfaces/card/stat/stat-card-shape.tsx
import { jsx as jsx13, jsxs as jsxs6 } from "react/jsx-runtime";
function StatCardShape() {
  return /* @__PURE__ */ jsxs6(
    "svg",
    {
      width: "120",
      height: "120",
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx13(
          "rect",
          {
            x: "14",
            y: "14",
            width: "80",
            height: "80",
            rx: "16",
            transform: "rotate(15 54 54)",
            fill: "currentColor",
            fillOpacity: "0.16"
          }
        ),
        /* @__PURE__ */ jsx13(
          "rect",
          {
            x: "32",
            y: "32",
            width: "56",
            height: "56",
            rx: "12",
            transform: "rotate(-8 60 60)",
            fill: "currentColor",
            fillOpacity: "0.1"
          }
        )
      ]
    }
  );
}

// src/components/material/surfaces/card/stat/stat-card.tsx
import { jsx as jsx14, jsxs as jsxs7 } from "react/jsx-runtime";
function StatCard({
  label,
  value,
  trend,
  trendLabel,
  icon,
  color = "primary",
  chart,
  sx,
  ...other
}) {
  const isUp = (trend ?? 0) >= 0;
  return /* @__PURE__ */ jsxs7(Card, { sx: [statCardRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ jsx14(Box6, { "aria-hidden": "true", sx: decorationSx, children: /* @__PURE__ */ jsx14(StatCardShape, {}) }),
    /* @__PURE__ */ jsx14(Box6, { sx: iconBoxSx, children: icon }),
    trend !== void 0 && /* @__PURE__ */ jsxs7(Box6, { sx: trendBoxSx, children: [
      /* @__PURE__ */ jsx14(GiselleIcon, { width: 20, icon: isUp ? "eva:trending-up-fill" : "eva:trending-down-fill" }),
      /* @__PURE__ */ jsxs7(Typography4, { component: "span", variant: "subtitle2", children: [
        isUp && "+",
        trend,
        "%"
      ] }),
      trendLabel && /* @__PURE__ */ jsx14(
        Typography4,
        {
          component: "span",
          variant: "caption",
          sx: { opacity: 0.72, ml: 0.5, fontWeight: 400 },
          children: trendLabel
        }
      )
    ] }),
    /* @__PURE__ */ jsxs7(Box6, { sx: contentRowSx, children: [
      /* @__PURE__ */ jsxs7(Box6, { sx: labelsBoxSx, children: [
        /* @__PURE__ */ jsx14(Typography4, { variant: "subtitle2", sx: { mb: 0.5 }, children: label }),
        /* @__PURE__ */ jsx14(Typography4, { variant: "h4", children: value })
      ] }),
      chart
    ] })
  ] });
}

// src/components/material/surfaces/card/stat-row/stat-card-row.tsx
import Grid from "@mui/material/Grid";
import { jsx as jsx15 } from "react/jsx-runtime";
function StatCardRow({ items, renderChart, sx, ...other }) {
  return /* @__PURE__ */ jsx15(Grid, { container: true, spacing: 3, sx: [...Array.isArray(sx) ? sx : [sx]], ...other, children: items.map((item) => /* @__PURE__ */ jsx15(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ jsx15(
    StatCard,
    {
      label: item.label,
      value: item.value,
      trend: item.trend,
      trendLabel: item.trendLabel,
      color: item.color,
      icon: /* @__PURE__ */ jsx15(GiselleIcon, { icon: item.iconId, width: 28 }),
      chart: renderChart?.(item)
    }
  ) }, item.label)) });
}

// src/components/material/surfaces/card/profile-summary/profile-summary-card.tsx
import Paper3 from "@mui/material/Paper";
import Box7 from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography5 from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// src/components/material/surfaces/card/profile-summary/profile-summary-card.styles.ts
var avatarSx = {
  width: 64,
  height: 64,
  mx: "auto",
  mb: 2
};

// src/components/material/surfaces/card/profile-summary/profile-summary-card.tsx
import { jsx as jsx16, jsxs as jsxs8 } from "react/jsx-runtime";
function ProfileSummaryCard({
  name,
  role,
  avatarSrc,
  stats,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsxs8(Paper3, { sx: [{ p: 3, textAlign: "center" }, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ jsx16(Avatar, { src: avatarSrc, alt: name, sx: avatarSx, children: name[0] }),
    /* @__PURE__ */ jsx16(Typography5, { variant: "h6", children: name }),
    role && /* @__PURE__ */ jsx16(Typography5, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: role }),
    /* @__PURE__ */ jsx16(Box7, { sx: { display: "flex", justifyContent: "center" }, children: stats.map((stat, index) => /* @__PURE__ */ jsxs8(Box7, { children: [
      index > 0 && /* @__PURE__ */ jsx16(Divider, { orientation: "vertical", flexItem: true }),
      /* @__PURE__ */ jsxs8(Box7, { sx: { px: 2 }, children: [
        /* @__PURE__ */ jsx16(Typography5, { variant: "subtitle1", children: stat.value }),
        /* @__PURE__ */ jsx16(Typography5, { variant: "caption", color: "text.secondary", children: stat.label })
      ] })
    ] }, stat.label)) })
  ] });
}

// src/utils/hooks/use-nested-checklist/use-nested-checklist.ts
import { useCallback as useCallback4, useMemo as useMemo3, useState as useState3 } from "react";
function useNestedChecklist(initialParentDone, initialChildrenDone) {
  const [parentDone, setParentDone] = useState3(initialParentDone);
  const [childrenDone, setChildrenDone] = useState3(initialChildrenDone);
  const indeterminate = useMemo3(
    () => childrenDone.some(Boolean) && !childrenDone.every(Boolean),
    [childrenDone]
  );
  const toggleParent = useCallback4(() => {
    const next = !parentDone;
    setParentDone(next);
    setChildrenDone((prev) => prev.map(() => next));
  }, [parentDone]);
  const toggleChild = useCallback4((index) => {
    setChildrenDone((prev) => {
      const next = prev.map((v, i) => i === index ? !v : v);
      setParentDone(next.every(Boolean));
      return next;
    });
  }, []);
  return { parentDone, indeterminate, childrenDone, toggleParent, toggleChild };
}

// src/components/material/data-display/icon/action-bar/icon-action-bar.tsx
import Box8 from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton2 from "@mui/material/IconButton";

// src/components/material/data-display/icon/action-bar/icon-action-bar.styles.ts
var iconActionBarRootSx = {
  gap: 1,
  width: 1,
  flexGrow: 1,
  display: "flex"
};

// src/components/material/data-display/icon/action-bar/icon-action-bar.defaults.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var DEFAULT_ICON_ACTIONS = [
  { tooltip: "Edit", icon: /* @__PURE__ */ jsx17(GiselleIcon, { icon: "solar:pen-bold" }) },
  { tooltip: "View", icon: /* @__PURE__ */ jsx17(GiselleIcon, { icon: "solar:eye-bold" }) },
  {
    tooltip: "Print",
    icon: /* @__PURE__ */ jsx17(GiselleIcon, { icon: "solar:printer-minimalistic-bold" })
  },
  { tooltip: "Send", icon: /* @__PURE__ */ jsx17(GiselleIcon, { icon: "mdi:email" }) },
  { tooltip: "Share", icon: /* @__PURE__ */ jsx17(GiselleIcon, { icon: "solar:share-bold" }) }
];

// src/components/material/data-display/icon/action-bar/icon-action-bar.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
function IconActionBar({
  actions = DEFAULT_ICON_ACTIONS,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx18(Box8, { sx: [iconActionBarRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: actions.map((item, index) => {
    const label = item["aria-label"] ?? item.tooltip;
    const buttonProps = {
      onClick: item.onClick,
      disabled: item.disabled,
      "aria-label": label,
      ...item.component !== void 0 && { component: item.component },
      ...item.href !== void 0 && { href: item.href }
    };
    return /* @__PURE__ */ jsx18(
      Tooltip,
      {
        title: item.tooltip,
        placement: item.tooltipPlacement ?? "bottom",
        children: /* @__PURE__ */ jsx18("span", { children: /* @__PURE__ */ jsx18(IconButton2, { ...buttonProps, children: item.icon }) })
      },
      `${item.tooltip}-${index}`
    );
  }) });
}

// src/components/material/layout/showcase-row/two-column-showcase-row.tsx
import Box9 from "@mui/material/Box";
import Grid2 from "@mui/material/Grid";
import Stack2 from "@mui/material/Stack";
import Typography6 from "@mui/material/Typography";
import { jsx as jsx19, jsxs as jsxs9 } from "react/jsx-runtime";
function TwoColumnShowcaseRow({
  text,
  controls,
  orientation = "row",
  controlsAlign = "flex-start",
  textSx,
  controlsSx,
  sx,
  ...other
}) {
  const isVertical = orientation === "column" || orientation === "column-reverse";
  const itemSize = isVertical ? { xs: 12 } : { xs: 12, md: 6 };
  return /* @__PURE__ */ jsxs9(
    Grid2,
    {
      container: true,
      columnSpacing: isVertical ? 0 : { xs: 0, md: 6 },
      rowSpacing: { xs: 4, md: isVertical ? 4 : 0 },
      sx: [
        { flexDirection: { xs: "column", md: orientation } },
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: [
        text && /* @__PURE__ */ jsx19(Grid2, { size: itemSize, children: /* @__PURE__ */ jsxs9(
          Stack2,
          {
            spacing: 2,
            sx: [{ maxWidth: 520 }, ...Array.isArray(textSx) ? textSx : [textSx]],
            children: [
              text.overline && /* @__PURE__ */ jsx19(Typography6, { variant: "overline", sx: { color: "text.secondary" }, children: text.overline }),
              text.heading && /* @__PURE__ */ jsx19(Typography6, { variant: "h4", children: text.heading }),
              text.description && /* @__PURE__ */ jsx19(Typography6, { variant: "body1", color: "text.secondary", children: text.description })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx19(Grid2, { size: itemSize, sx: { minWidth: 0 }, children: /* @__PURE__ */ jsx19(
          Stack2,
          {
            spacing: 2,
            sx: [
              { alignItems: controlsAlign, width: 1, minWidth: 0 },
              ...Array.isArray(controlsSx) ? controlsSx : [controlsSx]
            ],
            children: /* @__PURE__ */ jsx19(Box9, { sx: { width: 1, minWidth: 0 }, children: controls })
          }
        ) })
      ]
    }
  );
}

// src/components/material/layout/section-title/section-title.tsx
import Box11 from "@mui/material/Box";
import Typography7 from "@mui/material/Typography";

// src/components/material/layout/section-title/section-title.styles.ts
var txtGradientSpanSx = (theme) => ({
  opacity: 0.4,
  display: "inline-block",
  background: `linear-gradient(to right, ${theme.vars.palette.text.primary}, ${channelAlpha(theme.vars.palette.text.primaryChannel, 0.2)})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent"
});

// src/components/material/layout/section-title/section-caption.tsx
import Box10 from "@mui/material/Box";
import { jsx as jsx20 } from "react/jsx-runtime";
function SectionCaption({ title, sx, ...other }) {
  return /* @__PURE__ */ jsx20(
    Box10,
    {
      component: "span",
      sx: [
        {
          typography: "overline",
          color: "text.disabled"
        },
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: title
    }
  );
}

// src/components/material/layout/section-title/section-title.tsx
import { jsx as jsx21, jsxs as jsxs10 } from "react/jsx-runtime";
function SectionTitle({
  sx,
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  ...other
}) {
  return /* @__PURE__ */ jsxs10(
    Box11,
    {
      sx: [
        {
          gap: 3,
          display: "flex",
          flexDirection: "column"
        },
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: [
        caption && /* @__PURE__ */ jsx21(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
        /* @__PURE__ */ jsxs10(Typography7, { component: "h2", variant: "h2", sx: slotProps?.title?.sx, children: [
          title,
          " ",
          txtGradient && /* @__PURE__ */ jsx21(Box11, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
        ] }),
        description && /* @__PURE__ */ jsx21(
          Box11,
          {
            sx: [
              { color: "text.secondary", typography: "body1" },
              ...Array.isArray(slotProps?.description?.sx) ? slotProps.description.sx : [slotProps?.description?.sx]
            ],
            children: description
          }
        )
      ]
    }
  );
}

// src/components/material/layout/section-container/section-container.tsx
import Container from "@mui/material/Container";
import { jsx as jsx22 } from "react/jsx-runtime";
function SectionContainer({
  children,
  maxWidth = "lg",
  py = { xs: 8, md: 12 },
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx22(Container, { maxWidth, sx: [{ py }, ...Array.isArray(sx) ? sx : [sx]], ...other, children });
}

// src/components/section/hero/section/hero-section.tsx
import Box12 from "@mui/material/Box";
import Container2 from "@mui/material/Container";

// src/components/section/hero/section/hero-section.styles.ts
var heroRootSx = (color) => (theme) => ({
  width: "100%",
  backgroundColor: channelAlpha(theme.vars.palette[color].mainChannel, 0.08)
});
var heroInnerSx = {
  py: { xs: 10, md: 14 },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 3
};
var heroActionsRowSx = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 2,
  mt: 1
};
var heroIconsSlotSx = {
  width: "100%"
};

// src/components/section/hero/section/hero-section.tsx
import { jsx as jsx23, jsxs as jsxs11 } from "react/jsx-runtime";
function HeroSection({
  heading,
  text,
  actions,
  icons,
  color = "primary",
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx23(Box12, { sx: [heroRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: /* @__PURE__ */ jsxs11(Container2, { maxWidth: "lg", sx: heroInnerSx, children: [
    heading,
    text,
    actions && /* @__PURE__ */ jsx23(Box12, { sx: heroActionsRowSx, children: actions }),
    icons && /* @__PURE__ */ jsx23(Box12, { sx: heroIconsSlotSx, children: icons })
  ] }) });
}

// src/utils/maturity/maturity-utils.ts
function resolveMaturityColor(percent) {
  const clamped = Math.max(0, Math.min(100, percent));
  if (clamped >= 80) return "success";
  if (clamped >= 60) return "primary";
  if (clamped >= 40) return "info";
  if (clamped >= 20) return "warning";
  return "error";
}
function resolveMaturityLabel(percent) {
  const clamped = Math.max(0, Math.min(100, percent));
  if (clamped >= 80) return "Stable";
  if (clamped >= 60) return "Nearly ready";
  if (clamped >= 40) return "In progress";
  if (clamped >= 20) return "Early stage";
  return "Not started";
}

// src/components/material/data-display/animated-gradient/animated-gradient-text.tsx
import Box13 from "@mui/material/Box";

// src/components/material/data-display/animated-gradient/animated-gradient-text.const.ts
var ANIMATED_GRADIENT_DEFAULT_COLOR1 = "primary";
var ANIMATED_GRADIENT_DEFAULT_COLOR2 = "secondary";
var ANIMATED_GRADIENT_DEFAULT_DURATION = 3;

// src/components/material/data-display/animated-gradient/animated-gradient-text.styles.ts
var gradientTextSx = (color1, color2, duration) => ({
  background: `linear-gradient(135deg, var(--mui-palette-${color1}-main), var(--mui-palette-${color2}-main), var(--mui-palette-${color1}-main))`,
  backgroundSize: "200% 200%",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
  animation: `animatedGradientText ${duration}s ease infinite`,
  "@keyframes animatedGradientText": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" }
  }
});

// src/components/material/data-display/animated-gradient/animated-gradient-text.tsx
import { jsx as jsx24 } from "react/jsx-runtime";
function AnimatedGradientText({
  children,
  color1 = ANIMATED_GRADIENT_DEFAULT_COLOR1,
  color2 = ANIMATED_GRADIENT_DEFAULT_COLOR2,
  duration = ANIMATED_GRADIENT_DEFAULT_DURATION,
  component = "span",
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx24(
    Box13,
    {
      component,
      sx: [gradientTextSx(color1, color2, duration), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children
    }
  );
}

// src/components/material/data-display/icon/tech-strip/tech-icon-strip.tsx
import Box14 from "@mui/material/Box";
import Typography8 from "@mui/material/Typography";

// src/components/material/data-display/icon/tech-strip/tech-icon-strip.const.ts
var TECH_ICON_STRIP_ICON_SIZE = 32;
var TECH_ICON_STRIP_LABEL_FONT_SIZE = "0.75rem";

// src/components/material/data-display/icon/tech-strip/tech-icon-strip.styles.ts
var stripRootSx = {
  display: "flex",
  flexDirection: "column"
};
var titleSx = {
  display: "block",
  mb: 2,
  color: "text.secondary",
  letterSpacing: "0.08em",
  textTransform: "uppercase"
};
var stripWrapperSx = (centered) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 3,
  justifyContent: centered ? "center" : "flex-start",
  alignItems: "flex-start"
});
var itemSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0.5,
  minWidth: 56
};
var iconSlotSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg, & img": {
    width: TECH_ICON_STRIP_ICON_SIZE,
    height: TECH_ICON_STRIP_ICON_SIZE
  }
};

// src/components/material/data-display/icon/tech-strip/tech-icon-strip.tsx
import { jsx as jsx25, jsxs as jsxs12 } from "react/jsx-runtime";
function TechIconStrip({
  items,
  heading,
  centeredWrap = false,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsxs12(Box14, { sx: [stripRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    heading && /* @__PURE__ */ jsx25(Typography8, { component: "span", sx: titleSx, variant: "overline", children: heading }),
    /* @__PURE__ */ jsx25(Box14, { sx: stripWrapperSx(centeredWrap), children: items.map((item) => /* @__PURE__ */ jsxs12(Box14, { sx: itemSx, children: [
      /* @__PURE__ */ jsx25(Box14, { "aria-hidden": true, sx: iconSlotSx, children: item.icon }),
      /* @__PURE__ */ jsx25(Typography8, { sx: { fontSize: TECH_ICON_STRIP_LABEL_FONT_SIZE }, variant: "caption", children: item.label })
    ] }, item.label)) })
  ] });
}
export {
  TOGGLE_ICON_SIZE as ACCORDION_CHECK_ICON_SIZE,
  ACCORDION_DONE_MIN_TOUCH_TARGET,
  TOGGLE_MIN_TOUCH_TARGET as ACCORDION_ICON_BUTTON_MIN_SIZE,
  Accordion,
  AnimatedGradientText,
  DEFAULT_ICON_ACTIONS,
  GISELLE_PRIMARY_DARK_MAIN,
  GISELLE_PRIMARY_MAIN,
  GISELLE_SECONDARY_MAIN,
  GiselleIcon,
  GiselleSettingsProvider,
  GiselleThemeAndSettingsProvider,
  GiselleThemeProvider,
  HeroSection,
  IconActionBar,
  MetricCard,
  MetricCardDecoration,
  ProfileSummaryCard,
  QuoteCard,
  STAT_CARD_SPARKLINE_OPTIONS,
  SectionCaption,
  SectionContainer,
  SectionTitle,
  SelectableCard,
  StatCard,
  StatCardRow,
  StatusLabel,
  TOGGLE_ICON_SIZE,
  TOGGLE_MIN_TOUCH_TARGET,
  TechIconStrip,
  ToggleIconButton,
  TwoColumnShowcaseRow,
  channelAlpha,
  createIconRegistrar,
  getCookieValue,
  giselleTheme,
  giselleThemeOptions,
  hexToChannel,
  isDeepEqual,
  pxToRem,
  remToPx,
  resolveMaturityColor,
  resolveMaturityLabel,
  setCookieValue,
  useGiselleSettings,
  useLocalStorage,
  useNestedChecklist
};
//# sourceMappingURL=index.js.map
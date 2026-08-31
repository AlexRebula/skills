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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ACCORDION_CHECK_ICON_SIZE: () => TOGGLE_ICON_SIZE,
  ACCORDION_DONE_MIN_TOUCH_TARGET: () => ACCORDION_DONE_MIN_TOUCH_TARGET,
  ACCORDION_ICON_BUTTON_MIN_SIZE: () => TOGGLE_MIN_TOUCH_TARGET,
  Accordion: () => Accordion,
  AnimatedGradientText: () => AnimatedGradientText,
  BasicSection: () => BasicSection,
  DEFAULT_ICON_ACTIONS: () => DEFAULT_ICON_ACTIONS,
  FeatureFlowSection: () => FeatureFlowSection,
  GISELLE_PRIMARY_DARK_MAIN: () => GISELLE_PRIMARY_DARK_MAIN,
  GISELLE_PRIMARY_MAIN: () => GISELLE_PRIMARY_MAIN,
  GISELLE_SECONDARY_MAIN: () => GISELLE_SECONDARY_MAIN,
  GiselleIcon: () => GiselleIcon,
  GiselleSettingsProvider: () => GiselleSettingsProvider,
  GiselleThemeAndSettingsProvider: () => GiselleThemeAndSettingsProvider,
  GiselleThemeProvider: () => GiselleThemeProvider,
  HeroSection: () => HeroSection,
  IconActionBar: () => IconActionBar,
  MetricCard: () => MetricCard,
  MetricCardDecoration: () => MetricCardDecoration,
  ProfileSummaryCard: () => ProfileSummaryCard,
  QuoteCard: () => QuoteCard,
  STAT_CARD_SPARKLINE_OPTIONS: () => STAT_CARD_SPARKLINE_OPTIONS,
  SectionCaption: () => SectionCaption,
  SectionContainer: () => SectionContainer,
  SectionTitle: () => SectionTitle,
  SelectableCard: () => SelectableCard,
  SelectableLabel: () => SelectableLabel,
  StatCard: () => StatCard,
  StatCardRow: () => StatCardRow,
  StatusLabel: () => StatusLabel,
  TOGGLE_ICON_SIZE: () => TOGGLE_ICON_SIZE,
  TOGGLE_MIN_TOUCH_TARGET: () => TOGGLE_MIN_TOUCH_TARGET,
  TechIconStrip: () => TechIconStrip,
  ToggleIconButton: () => ToggleIconButton,
  TwoColumnShowcaseRow: () => TwoColumnShowcaseRow,
  channelAlpha: () => channelAlpha,
  createIconRegistrar: () => createIconRegistrar,
  getCookieValue: () => getCookieValue,
  giselleTheme: () => giselleTheme,
  giselleThemeOptions: () => giselleThemeOptions,
  hexToChannel: () => hexToChannel,
  isDeepEqual: () => isDeepEqual,
  pxToRem: () => pxToRem,
  remToPx: () => remToPx,
  resolveMaturityColor: () => resolveMaturityColor,
  resolveMaturityLabel: () => resolveMaturityLabel,
  setCookieValue: () => setCookieValue,
  useGiselleSettings: () => useGiselleSettings,
  useLocalStorage: () => useLocalStorage,
  useNestedChecklist: () => useNestedChecklist
});
module.exports = __toCommonJS(src_exports);

// src/utils/icon/create-icon-registrar/create-icon-registrar.ts
var import_react = require("@iconify/react");
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
    collections.forEach((collection) => (0, import_react.addCollection)(collection));
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
var import_react2 = require("react");
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
  const [state, setStateInternal] = (0, import_react2.useState)(initialValue);
  (0, import_react2.useEffect)(() => {
    const stored = readFromStorage(key, initialValue);
    setStateInternal(stored);
  }, [key]);
  const setState = (0, import_react2.useCallback)(
    (partial) => {
      setStateInternal((prev) => {
        const next = { ...prev, ...partial };
        writeToStorage(key, next);
        return next;
      });
    },
    [key]
  );
  const setField = (0, import_react2.useCallback)(
    (field, value) => {
      setStateInternal((prev) => {
        const next = { ...prev, [field]: value };
        writeToStorage(key, next);
        return next;
      });
    },
    [key]
  );
  const resetState = (0, import_react2.useCallback)(
    (defaults) => {
      removeFromStorage(key);
      setStateInternal(defaults);
    },
    [key]
  );
  return { state, setState, setField, resetState };
}

// src/utils/theme/preset/theme-preset.ts
var import_styles = require("@mui/material/styles");
var import_colors = require("@mui/material/colors");
var GISELLE_PRIMARY_MAIN = "#2E7D32";
var GISELLE_PRIMARY_DARK_MAIN = "#76C442";
var GISELLE_SECONDARY_MAIN = "#F5A623";
var GREY_500_CHANNEL = hexToChannel(import_colors.grey[500]);
var COMMON_BLACK_CHANNEL = hexToChannel("#000000");
var COMMON_WHITE_CHANNEL = hexToChannel("#ffffff");
var giselleThemeOptions = {
  // `extendTheme()` defaults an unset `colorSchemeSelector` to `'media'`, under
  // which MUI's `useColorScheme().setMode` — what `GiselleThemeProvider`'s
  // `defaultMode` prop drives — has no effect (MUI logs this explicitly: "The
  // `setMode` function has no effect if `colorSchemeSelector` is `media`").
  // A data attribute lets an explicit `defaultMode` override the OS
  // preference; see docs/theming/nextjs.md's troubleshooting section, which
  // already documents this exact attribute name (see issue #190).
  colorSchemeSelector: "data-mui-color-scheme",
  colorSchemes: {
    light: {
      palette: {
        primary: { main: GISELLE_PRIMARY_MAIN },
        secondary: { main: GISELLE_SECONDARY_MAIN },
        info: { main: "#0288D1" },
        success: { main: "#388E3C" },
        warning: { main: "#ED6C02" },
        error: { main: "#D32F2F" },
        // `grey` is shared between the light and dark schemes (MUI's default
        // scale isn't overridden here), so the same channel value applies to
        // both — see `GREY_500_CHANNEL` above for why this is needed at all.
        // MUI's `ColorPartial` type only lists the numbered/A-prefixed grey
        // shades, not custom channel tokens — cast, same as every existing
        // *read* of `theme.vars.palette.grey['500Channel']` elsewhere in this
        // codebase (e.g. `floating-sub-nav.styles.ts`).
        grey: { "500Channel": GREY_500_CHANNEL },
        // `common.black`/`white` are mode-independent (same value in both
        // schemes) — see `COMMON_BLACK_CHANNEL`/`COMMON_WHITE_CHANNEL` above.
        common: {
          blackChannel: COMMON_BLACK_CHANNEL,
          whiteChannel: COMMON_WHITE_CHANNEL
        }
      }
    },
    dark: {
      palette: {
        primary: { main: GISELLE_PRIMARY_DARK_MAIN },
        secondary: { main: GISELLE_SECONDARY_MAIN },
        info: { main: "#29B6F6" },
        success: { main: "#66BB6A" },
        warning: { main: "#FFA726" },
        error: { main: "#F44336" },
        grey: { "500Channel": GREY_500_CHANNEL },
        common: {
          blackChannel: COMMON_BLACK_CHANNEL,
          whiteChannel: COMMON_WHITE_CHANNEL
        }
      }
    }
  }
};
var giselleTheme = (0, import_styles.extendTheme)(giselleThemeOptions);

// src/components/theming/theme-provider/giselle/giselle.tsx
var import_react3 = require("react");
var import_styles2 = require("@mui/material/styles");

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
var import_jsx_runtime = require("react/jsx-runtime");
function GiselleThemeProvider({
  children,
  themeOverrides,
  theme,
  defaultMode = "system"
}) {
  const resolvedTheme = (0, import_react3.useMemo)(
    () => theme ?? (themeOverrides ? (0, import_styles2.extendTheme)(deepMerge(giselleThemeOptions, themeOverrides)) : giselleTheme),
    [theme, themeOverrides]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles2.ThemeProvider, { theme: resolvedTheme, defaultMode, children });
}

// src/components/theming/settings-provider/settings-provider.tsx
var import_react5 = require("react");

// src/components/theming/settings-provider/settings-context.ts
var import_react4 = require("react");
var GiselleSettingsContext = (0, import_react4.createContext)(null);
function useGiselleSettings() {
  const ctx = (0, import_react4.useContext)(GiselleSettingsContext);
  if (ctx === null) {
    throw new Error("useGiselleSettings must be called within a <GiselleSettingsProvider>.");
  }
  return ctx;
}

// src/components/theming/settings-provider/settings-provider.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  const adapterRef = (0, import_react5.useRef)(resolveAdapter(storage, storageKey));
  adapterRef.current = resolveAdapter(storage, storageKey);
  const [state, setStateRaw] = (0, import_react5.useState)(initialState ?? defaultSettings);
  (0, import_react5.useEffect)(() => {
    if (initialState !== void 0) return;
    const stored = adapterRef.current.get();
    if (stored === null) return;
    if (stored.version !== defaultSettings.version) {
      adapterRef.current.clear();
      return;
    }
    setStateRaw(stored);
  }, []);
  const [openDrawer, setOpenDrawer] = (0, import_react5.useState)(false);
  const setState = (0, import_react5.useCallback)((partial) => {
    setStateRaw((prev) => {
      const next = { ...prev, ...partial };
      adapterRef.current.set(next);
      return next;
    });
  }, []);
  const setField = (0, import_react5.useCallback)((key, value2) => {
    setStateRaw((prev) => {
      const next = { ...prev, [key]: value2 };
      adapterRef.current.set(next);
      return next;
    });
  }, []);
  const onReset = (0, import_react5.useCallback)(() => {
    adapterRef.current.clear();
    setStateRaw(defaultSettings);
  }, [defaultSettings]);
  const onCloseDrawer = (0, import_react5.useCallback)(() => setOpenDrawer(false), []);
  const onToggleDrawer = (0, import_react5.useCallback)(() => setOpenDrawer((prev) => !prev), []);
  const canReset = (0, import_react5.useMemo)(() => !isDeepEqual(state, defaultSettings), [state, defaultSettings]);
  const value = (0, import_react5.useMemo)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    GiselleSettingsContext.Provider,
    {
      value,
      children
    }
  );
}

// src/components/theming/settings-provider/theme-and-settings-provider.tsx
var import_react7 = require("react");

// src/components/theming/settings-provider/settings-theme-bridge.tsx
var import_react6 = require("react");
var import_styles3 = require("@mui/material/styles");
function SettingsThemeBridge({
  getMode
}) {
  const { state } = useGiselleSettings();
  const { setMode } = (0, import_styles3.useColorScheme)();
  const mode = getMode?.(state);
  (0, import_react6.useEffect)(() => {
    if (mode !== void 0) {
      setMode(mode);
    }
  }, [mode, setMode]);
  return null;
}

// src/components/theming/settings-provider/theme-and-settings-provider.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(GiselleThemeProvider, { themeOverrides, theme, defaultMode, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    GiselleSettingsProvider,
    {
      defaultSettings,
      initialState,
      storageKey,
      storage,
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react7.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SettingsThemeBridge, { getMode }),
        children
      ] })
    }
  ) });
}

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
var import_react8 = require("@iconify/react");
var import_Box = __toESM(require("@mui/material/Box"), 1);

// src/components/material/data-display/icon/giselle/giselle-icon.styles.ts
var giselleIconRootSx = (width, height) => ({
  lineHeight: 0,
  display: "inline-flex",
  flexShrink: 0,
  width,
  height
});

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_Box.default,
    {
      component: "span",
      sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_react8.Icon,
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
var import_react9 = __toESM(require("react"), 1);
var import_Chip = __toESM(require("@mui/material/Chip"), 1);

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
var import_jsx_runtime5 = require("react/jsx-runtime");
var StatusLabel = import_react9.default.forwardRef(function StatusLabel2({ status, label, size = "small", sx, ...other }, ref) {
  const { color, label: defaultLabel } = STATUS_CONFIG[status];
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    import_Chip.default,
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

// src/components/material/data-display/selectable-label/selectable-label.tsx
var import_react10 = require("react");
var import_Chip2 = __toESM(require("@mui/material/Chip"), 1);
var import_SvgIcon = __toESM(require("@mui/material/SvgIcon"), 1);

// src/components/material/data-display/selectable-label/selectable-label.styles.ts
var selectableLabelSx = (selected) => (theme) => {
  const vars = theme.vars;
  return {
    cursor: "pointer",
    // Set explicitly rather than left to inherit — Chip's own base styles
    // set `color: inherit`, which makes the label's visible color depend
    // on whatever ambient text color the chip happens to be mounted
    // under. StatusLabel (a working precedent) never relies on this
    // either; every color this component shows should be self-contained.
    color: vars.palette.text.primary,
    transition: theme.transitions.create(["background-color", "box-shadow"], {
      duration: theme.transitions.duration.shorter
    }),
    // --- Keyboard focus ring ---
    // .Mui-focusVisible is applied on keyboard navigation only, so mouse
    // users never see this ring — same convention as SelectableCard.
    "&.Mui-focusVisible": {
      outline: `3px solid ${vars.palette.primary.main}`,
      outlineOffset: 2
    },
    // --- Selected ring (box-shadow, doesn't affect layout) ---
    ...selected && {
      boxShadow: `0 0 0 1.5px ${vars.palette.text.primary}`,
      bgcolor: vars.palette.action.selected
    },
    // --- Disabled: muted + no pointer (Chip also sets aria-disabled) ---
    "&.Mui-disabled": {
      opacity: 0.48,
      cursor: "default",
      pointerEvents: "none"
    }
  };
};
var selectableLabelIconSx = {
  fontSize: "1rem",
  color: "text.primary"
};

// src/components/material/data-display/selectable-label/selectable-label.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var CHECK_ICON = /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_SvgIcon.default, { sx: selectableLabelIconSx, viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.4-1.4z" }) });
var SelectableLabel = (0, import_react10.forwardRef)(
  function SelectableLabel2({ selected, onSelectedChange, disabled, sx, ...other }, ref) {
    const handleClick = (0, import_react10.useCallback)(
      (e) => {
        if (disabled) return;
        e.stopPropagation();
        onSelectedChange?.(!selected);
      },
      [selected, disabled, onSelectedChange]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      import_Chip2.default,
      {
        ref,
        onClick: handleClick,
        disabled,
        "aria-pressed": selected,
        icon: selected ? CHECK_ICON : void 0,
        sx: [selectableLabelSx(selected), ...Array.isArray(sx) ? sx : [sx]],
        ...other
      }
    );
  }
);
SelectableLabel.displayName = "SelectableLabel";

// src/components/material/surfaces/card/accordion/accordion.tsx
var import_react12 = require("react");
var import_Box2 = __toESM(require("@mui/material/Box"), 1);
var import_Checkbox = __toESM(require("@mui/material/Checkbox"), 1);
var import_Accordion = __toESM(require("@mui/material/Accordion"), 1);
var import_AccordionDetails = __toESM(require("@mui/material/AccordionDetails"), 1);
var import_AccordionSummary = __toESM(require("@mui/material/AccordionSummary"), 1);
var import_Typography = __toESM(require("@mui/material/Typography"), 1);

// src/components/material/input/toggle-icon-button/icon.tsx
var import_react11 = require("react");
var import_IconButton = __toESM(require("@mui/material/IconButton"), 1);

// src/components/material/input/toggle-icon-button/icon.defaults.tsx
var import_SvgIcon2 = __toESM(require("@mui/material/SvgIcon"), 1);

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
var import_jsx_runtime7 = require("react/jsx-runtime");
var DEFAULT_PRESSED_ICON = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_SvgIcon2.default, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
var DEFAULT_HOVER_ICON = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_SvgIcon2.default, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });

// src/components/material/input/toggle-icon-button/icon.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function ToggleIconButton({
  pressed,
  idleIcon,
  pressedIcon = DEFAULT_PRESSED_ICON,
  hoverIcon = DEFAULT_HOVER_ICON,
  onPressedChange,
  sx,
  ...other
}) {
  const handleClick = (0, import_react11.useCallback)(
    (e) => {
      e.stopPropagation();
      onPressedChange?.(!pressed);
    },
    [pressed, onPressedChange]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    import_IconButton.default,
    {
      onClick: handleClick,
      "aria-pressed": pressed,
      size: "small",
      sx: [rootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "ti-idle", children: idleIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "ti-pressed", children: pressedIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "ti-hover", children: hoverIcon })
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
var import_jsx_runtime9 = require("react/jsx-runtime");
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
  const id = (0, import_react12.useId)();
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
    leadingElement = checkIcon === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
    ) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
    leadingElement = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_Box2.default, { "aria-hidden": "true", sx: leadingIconSx, children: leadingIcon });
  } else {
    leadingElement = leadingAction;
  }
  const summaryContent = typeof title === "string" ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_Typography.default, { component: "span", variant: "subtitle1", children: title }) : title;
  const accordionSummary = /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_Accordion.default, { sx: [accordionRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    hasLeadingElement ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_Box2.default, { sx: summaryRowSx, children: [
      leadingElement,
      accordionSummary
    ] }) : accordionSummary,
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_AccordionDetails.default, { id: detailsId, children })
  ] });
}

// src/components/material/surfaces/card/accordion/accordion.const.ts
var ACCORDION_DONE_MIN_TOUCH_TARGET = 24;

// src/components/material/surfaces/card/metric/metric-card.tsx
var import_Box4 = __toESM(require("@mui/material/Box"), 1);
var import_Paper = __toESM(require("@mui/material/Paper"), 1);
var import_Typography2 = __toESM(require("@mui/material/Typography"), 1);

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
var import_Box3 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime10 = require("react/jsx-runtime");
function MetricCardDecoration({
  color = "primary",
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_Box3.default, { sx: [metricCardDecorationSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other });
}

// src/components/material/surfaces/card/metric/metric-card.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    import_Paper.default,
    {
      elevation,
      sx: [metricCardPaperSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        decoration && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Box4.default, { "aria-hidden": "true", sx: decorationOverlaySx, children: decoration }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Box4.default, { sx: metricCardContentSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Box4.default, { sx: { typography: "h3" }, children: value }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Typography2.default, { noWrap: true, variant: "subtitle2", component: "div", sx: { color: "text.secondary" }, children: label }),
          sublabel && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            import_Typography2.default,
            {
              noWrap: true,
              variant: "caption",
              component: "div",
              sx: { color: "text.disabled", mt: 0.25 },
              children: sublabel
            }
          )
        ] }),
        icon && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Box4.default, { "aria-hidden": "true", sx: metricCardIconBoxSx(color), children: icon })
      ]
    }
  );
}

// src/components/material/surfaces/card/selectable/selectable-card.tsx
var import_ButtonBase = __toESM(require("@mui/material/ButtonBase"), 1);

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
var import_jsx_runtime12 = require("react/jsx-runtime");
function SelectableCard({
  selected = false,
  disabled = false,
  children,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    import_ButtonBase.default,
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
var import_Box5 = __toESM(require("@mui/material/Box"), 1);
var import_Paper2 = __toESM(require("@mui/material/Paper"), 1);
var import_Stack = __toESM(require("@mui/material/Stack"), 1);
var import_Typography3 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime13 = require("react/jsx-runtime");
function QuoteCard({
  quote,
  author,
  source,
  color = "primary",
  elevation = 0,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    import_Paper2.default,
    {
      elevation,
      sx: [quoteCardPaperSx(color), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_Box5.default, { sx: { display: "flex", gap: 2 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Typography3.default, { "aria-hidden": true, sx: quoteMarkSx(color), children: "\u201C" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_Box5.default, { sx: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Typography3.default, { variant: "body1", sx: quoteTextSx, children: quote }),
          (author || source) && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
            import_Stack.default,
            {
              direction: "row",
              spacing: 0.75,
              sx: { mt: 2, color: "text.disabled", alignItems: "center" },
              children: [
                author && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Typography3.default, { variant: "caption", sx: { fontWeight: "fontWeightMedium" }, children: author }),
                author && source && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Typography3.default, { variant: "caption", "aria-hidden": true, sx: { opacity: 0.6 }, children: "\xB7" }),
                source && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Typography3.default, { variant: "caption", sx: { opacity: 0.72 }, children: source })
              ]
            }
          )
        ] })
      ] })
    }
  );
}

// src/components/material/surfaces/card/stat/stat-card.tsx
var import_Box6 = __toESM(require("@mui/material/Box"), 1);
var import_Card = __toESM(require("@mui/material/Card"), 1);
var import_Typography4 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime14 = require("react/jsx-runtime");
function StatCardShape() {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    "svg",
    {
      width: "120",
      height: "120",
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
var import_jsx_runtime15 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_Card.default, { sx: [statCardRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Box6.default, { "aria-hidden": "true", sx: decorationSx, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(StatCardShape, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Box6.default, { sx: iconBoxSx, children: icon }),
    trend !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_Box6.default, { sx: trendBoxSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(GiselleIcon, { width: 20, icon: isUp ? "eva:trending-up-fill" : "eva:trending-down-fill" }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_Typography4.default, { component: "span", variant: "subtitle2", children: [
        isUp && "+",
        trend,
        "%"
      ] }),
      trendLabel && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        import_Typography4.default,
        {
          component: "span",
          variant: "caption",
          sx: { opacity: 0.72, ml: 0.5, fontWeight: 400 },
          children: trendLabel
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_Box6.default, { sx: contentRowSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_Box6.default, { sx: labelsBoxSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Typography4.default, { variant: "subtitle2", sx: { mb: 0.5 }, children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Typography4.default, { variant: "h4", children: value })
      ] }),
      chart
    ] })
  ] });
}

// src/components/material/surfaces/card/stat-row/stat-card-row.tsx
var import_Grid = __toESM(require("@mui/material/Grid"), 1);
var import_jsx_runtime16 = require("react/jsx-runtime");
function StatCardRow({ items, renderChart, sx, ...other }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_Grid.default, { container: true, spacing: 3, sx: [...Array.isArray(sx) ? sx : [sx]], ...other, children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_Grid.default, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    StatCard,
    {
      label: item.label,
      value: item.value,
      trend: item.trend,
      trendLabel: item.trendLabel,
      color: item.color,
      icon: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(GiselleIcon, { icon: item.iconId, width: 28 }),
      chart: renderChart?.(item)
    }
  ) }, item.label)) });
}

// src/components/material/surfaces/card/profile-summary/profile-summary-card.tsx
var import_Paper3 = __toESM(require("@mui/material/Paper"), 1);
var import_Box7 = __toESM(require("@mui/material/Box"), 1);
var import_Avatar = __toESM(require("@mui/material/Avatar"), 1);
var import_Typography5 = __toESM(require("@mui/material/Typography"), 1);
var import_Divider = __toESM(require("@mui/material/Divider"), 1);

// src/components/material/surfaces/card/profile-summary/profile-summary-card.styles.ts
var avatarSx = {
  width: 64,
  height: 64,
  mx: "auto",
  mb: 2
};

// src/components/material/surfaces/card/profile-summary/profile-summary-card.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function ProfileSummaryCard({
  name,
  role,
  avatarSrc,
  stats,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_Paper3.default, { sx: [{ p: 3, textAlign: "center" }, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_Avatar.default, { src: avatarSrc, alt: name, sx: avatarSx, children: name[0] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_Typography5.default, { variant: "h6", children: name }),
    role && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_Typography5.default, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: role }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_Box7.default, { sx: { display: "flex", justifyContent: "center" }, children: stats.map((stat, index) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_Box7.default, { children: [
      index > 0 && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_Divider.default, { orientation: "vertical", flexItem: true }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_Box7.default, { sx: { px: 2 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_Typography5.default, { variant: "subtitle1", children: stat.value }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_Typography5.default, { variant: "caption", color: "text.secondary", children: stat.label })
      ] })
    ] }, stat.label)) })
  ] });
}

// src/utils/hooks/use-nested-checklist/use-nested-checklist.ts
var import_react13 = require("react");
function useNestedChecklist(initialParentDone, initialChildrenDone) {
  const [parentDone, setParentDone] = (0, import_react13.useState)(initialParentDone);
  const [childrenDone, setChildrenDone] = (0, import_react13.useState)(initialChildrenDone);
  const indeterminate = (0, import_react13.useMemo)(
    () => childrenDone.some(Boolean) && !childrenDone.every(Boolean),
    [childrenDone]
  );
  const toggleParent = (0, import_react13.useCallback)(() => {
    const next = !parentDone;
    setParentDone(next);
    setChildrenDone((prev) => prev.map(() => next));
  }, [parentDone]);
  const toggleChild = (0, import_react13.useCallback)((index) => {
    setChildrenDone((prev) => {
      const next = prev.map((v, i) => i === index ? !v : v);
      setParentDone(next.every(Boolean));
      return next;
    });
  }, []);
  return { parentDone, indeterminate, childrenDone, toggleParent, toggleChild };
}

// src/components/material/data-display/icon/action-bar/icon-action-bar.tsx
var import_Box8 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip = __toESM(require("@mui/material/Tooltip"), 1);
var import_IconButton2 = __toESM(require("@mui/material/IconButton"), 1);

// src/components/material/data-display/icon/action-bar/icon-action-bar.styles.ts
var iconActionBarRootSx = {
  gap: 1,
  width: 1,
  flexGrow: 1,
  display: "flex"
};

// src/components/material/data-display/icon/action-bar/icon-action-bar.defaults.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
var DEFAULT_ICON_ACTIONS = [
  { tooltip: "Edit", icon: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(GiselleIcon, { icon: "solar:pen-bold" }) },
  { tooltip: "View", icon: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(GiselleIcon, { icon: "solar:eye-bold" }) },
  {
    tooltip: "Print",
    icon: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(GiselleIcon, { icon: "solar:printer-minimalistic-bold" })
  },
  { tooltip: "Send", icon: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(GiselleIcon, { icon: "mdi:email" }) },
  { tooltip: "Share", icon: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(GiselleIcon, { icon: "solar:share-bold" }) }
];

// src/components/material/data-display/icon/action-bar/icon-action-bar.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function IconActionBar({
  actions = DEFAULT_ICON_ACTIONS,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_Box8.default, { sx: [iconActionBarRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: actions.map((item, index) => {
    const label = item["aria-label"] ?? item.tooltip;
    const buttonProps = {
      onClick: item.onClick,
      disabled: item.disabled,
      "aria-label": label,
      ...item.component !== void 0 && { component: item.component },
      ...item.href !== void 0 && { href: item.href }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      import_Tooltip.default,
      {
        title: item.tooltip,
        placement: item.tooltipPlacement ?? "bottom",
        children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_IconButton2.default, { ...buttonProps, children: item.icon }) })
      },
      `${item.tooltip}-${index}`
    );
  }) });
}

// src/components/material/layout/showcase-row/two-column-showcase-row.tsx
var import_Box9 = __toESM(require("@mui/material/Box"), 1);
var import_Grid2 = __toESM(require("@mui/material/Grid"), 1);
var import_Stack2 = __toESM(require("@mui/material/Stack"), 1);
var import_Typography6 = __toESM(require("@mui/material/Typography"), 1);
var import_jsx_runtime20 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    import_Grid2.default,
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
        text && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Grid2.default, { size: itemSize, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
          import_Stack2.default,
          {
            spacing: 2,
            sx: [{ maxWidth: 520 }, ...Array.isArray(textSx) ? textSx : [textSx]],
            children: [
              text.overline && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Typography6.default, { variant: "overline", sx: { color: "text.secondary" }, children: text.overline }),
              text.heading && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Typography6.default, { variant: "h4", children: text.heading }),
              text.description && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Typography6.default, { variant: "body1", color: "text.secondary", children: text.description })
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Grid2.default, { size: itemSize, sx: { minWidth: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          import_Stack2.default,
          {
            spacing: 2,
            sx: [
              { alignItems: controlsAlign, width: 1, minWidth: 0 },
              ...Array.isArray(controlsSx) ? controlsSx : [controlsSx]
            ],
            children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box9.default, { sx: { width: 1, minWidth: 0 }, children: controls })
          }
        ) })
      ]
    }
  );
}

// src/components/material/layout/section-title/section-title.tsx
var import_Box11 = __toESM(require("@mui/material/Box"), 1);
var import_Typography7 = __toESM(require("@mui/material/Typography"), 1);

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
var import_Box10 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime21 = require("react/jsx-runtime");
function SectionCaption({ title, sx, ...other }) {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    import_Box10.default,
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
var import_jsx_runtime22 = require("react/jsx-runtime");
function SectionTitle({
  sx,
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    import_Box11.default,
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
        caption && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_Typography7.default, { component: "h2", variant: "h2", sx: slotProps?.title?.sx, children: [
          title,
          " ",
          txtGradient && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_Box11.default, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
        ] }),
        description && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          import_Box11.default,
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
var import_Container = __toESM(require("@mui/material/Container"), 1);
var import_jsx_runtime23 = require("react/jsx-runtime");
function SectionContainer({
  children,
  maxWidth = "lg",
  py = { xs: 8, md: 12 },
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_Container.default, { maxWidth, sx: [{ py }, ...Array.isArray(sx) ? sx : [sx]], ...other, children });
}

// src/components/material/layout/basic-section/basic-section.tsx
var import_react14 = __toESM(require("react"), 1);
var import_Box12 = __toESM(require("@mui/material/Box"), 1);

// src/components/material/layout/basic-section/basic-section.styles.ts
var DECORATION_MIN_WIDTH = 1440;
var CORNER_MARK_INSET = 72;
var HORIZONTAL_LINE_INSET = 80;
var VERTICAL_LINE_INSET = 80;
var CANONICAL_FRAME = [
  { kind: "corner-plus", sx: { top: CORNER_MARK_INSET, left: CORNER_MARK_INSET } },
  { kind: "corner-plus", sx: { bottom: CORNER_MARK_INSET, left: CORNER_MARK_INSET } },
  { kind: "border-line", sx: { top: HORIZONTAL_LINE_INSET, left: 0 } },
  { kind: "border-line", sx: { bottom: HORIZONTAL_LINE_INSET, left: 0 } },
  { kind: "border-line", vertical: true, sx: { top: 0, left: VERTICAL_LINE_INSET } }
];
var basicSectionRootSx = {
  position: "relative",
  overflowX: "clip"
};
var decorationBaseSx = (theme) => ({
  position: "absolute",
  display: "none",
  color: "grey.500",
  pointerEvents: "none",
  [theme.breakpoints.up(DECORATION_MIN_WIDTH)]: { display: "block" }
});
var cornerPlusSx = (theme) => ({
  ...decorationBaseSx(theme),
  width: 16,
  height: 16
});
var cornerXSx = (theme) => ({
  ...decorationBaseSx(theme),
  width: 16,
  height: 16
});
var borderLineSx = (vertical = false) => (theme) => ({
  ...decorationBaseSx(theme),
  opacity: 0.24,
  borderColor: "currentColor",
  ...vertical ? { width: 0, height: 1, borderLeft: "1px dashed" } : { width: 1, height: 0, borderTop: "1px dashed" }
});
var triangleLeftSx = (theme) => ({
  ...decorationBaseSx(theme),
  width: 10,
  height: 20
});
var triangleDownSx = (theme) => ({
  ...decorationBaseSx(theme),
  width: 20,
  height: 10
});
var dotSx = (theme) => ({
  ...decorationBaseSx(theme),
  width: 12,
  height: 12,
  borderRadius: "50%",
  bgcolor: "currentColor"
});

// src/components/material/layout/basic-section/basic-section.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
function Decoration({ kind, vertical, sx }) {
  switch (kind) {
    case "corner-plus":
      return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        import_Box12.default,
        {
          "aria-hidden": "true",
          sx: [cornerPlusSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M8 0V16M16 8H0", stroke: "currentColor" })
        }
      );
    case "corner-x":
      return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        import_Box12.default,
        {
          "aria-hidden": "true",
          sx: [cornerXSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
            "path",
            {
              d: "M14 2L7.96685 8.03315M7.96685 8.03315L2.0663 13.9337M7.96685 8.03315L13.9337 14M7.96685 8.03315L2 2.0663",
              stroke: "currentColor"
            }
          )
        }
      );
    case "border-line":
      return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Box12.default, { "aria-hidden": "true", sx: [borderLineSx(vertical), ...Array.isArray(sx) ? sx : [sx]] });
    case "triangle-left":
      return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        import_Box12.default,
        {
          "aria-hidden": "true",
          sx: [triangleLeftSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 10 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M10 10L8.74228e-07 20L0 0L10 10Z", fill: "currentColor" })
        }
      );
    case "triangle-down":
      return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        import_Box12.default,
        {
          "aria-hidden": "true",
          sx: [triangleDownSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 20 10",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M10 10L0 0H20L10 10Z", fill: "currentColor" })
        }
      );
    case "dot":
      return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Box12.default, { "aria-hidden": "true", sx: [dotSx, ...Array.isArray(sx) ? sx : [sx]] });
  }
}
function resolveDecoration(decoration) {
  if (decoration === true) return CANONICAL_FRAME;
  if (decoration === false) return [];
  return decoration;
}
var BasicSection = import_react14.default.forwardRef(function BasicSection2({
  children,
  decoration = true,
  containerMaxWidth,
  containerPy,
  containerSx,
  unconstrainedChildren,
  sx,
  ...other
}, ref) {
  const elements = resolveDecoration(decoration);
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
    import_Box12.default,
    {
      ref,
      component: "section",
      sx: [basicSectionRootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        elements.map((element, index) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Decoration, { ...element }, index)),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(SectionContainer, { maxWidth: containerMaxWidth, py: containerPy, sx: containerSx, children }),
        unconstrainedChildren
      ]
    }
  );
});
BasicSection.displayName = "BasicSection";

// src/components/section/hero/section/hero-section.tsx
var import_Box13 = __toESM(require("@mui/material/Box"), 1);
var import_Container2 = __toESM(require("@mui/material/Container"), 1);

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
var import_jsx_runtime25 = require("react/jsx-runtime");
function HeroSection({
  heading,
  text,
  actions,
  icons,
  color = "primary",
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_Box13.default, { sx: [heroRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_Container2.default, { maxWidth: "lg", sx: heroInnerSx, children: [
    heading,
    text,
    actions && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_Box13.default, { sx: heroActionsRowSx, children: actions }),
    icons && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_Box13.default, { sx: heroIconsSlotSx, children: icons })
  ] }) });
}

// src/components/section/feature-flow/feature-flow-section.tsx
var import_react22 = __toESM(require("react"), 1);
var import_Grid4 = __toESM(require("@mui/material/Grid"), 1);
var import_LinearProgress = __toESM(require("@mui/material/LinearProgress"), 1);

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.tsx
var import_react16 = require("react");
var import_framer_motion2 = require("framer-motion");
var import_Box15 = __toESM(require("@mui/material/Box"), 1);

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.const.ts
var SUB_NAV_BUTTON_SIZE = {
  xs: 36,
  sm: 38,
  md: 42,
  lg: 44
};
var PILL_BUTTON_ROW_SPACING = 0.5;

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.styles.ts
var grey500Ch = (theme) => theme.vars.palette.grey["500Channel"];
var blackCh = (theme) => theme.vars.palette.common["blackChannel"];
var pillSx = (theme) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 0.5,
  borderRadius: 2,
  bgcolor: "background.paper",
  border: `1px solid ${channelAlpha(grey500Ch(theme), 0.14)}`,
  boxShadow: [
    `0 2px 8px 0 ${channelAlpha(grey500Ch(theme), 0.1)}`,
    `0 8px 32px -4px ${channelAlpha(grey500Ch(theme), 0.18)}`
  ].join(", "),
  ...theme.applyStyles("dark", {
    border: `1px solid ${channelAlpha(grey500Ch(theme), 0.08)}`,
    boxShadow: `0 1px 4px 0 ${channelAlpha(blackCh(theme), 0.12)}`
  })
});
var stickyWrapperSx = (theme) => ({
  position: "sticky",
  bottom: { xs: 32, sm: 32, md: 40 },
  height: 0,
  overflow: "visible",
  display: "flex",
  justifyContent: "center",
  zIndex: theme.zIndex.speedDial,
  pointerEvents: "none"
});
var stickyInnerSx = {
  transform: "translateY(-100%)",
  pointerEvents: "auto",
  pb: { xs: "23px", md: "31px" }
};
var fixedWrapperSx = (theme) => ({
  position: "fixed",
  bottom: { xs: 16, md: 24 },
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: theme.zIndex.speedDial
});
var subNavButtonSx = (isActive) => (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: SUB_NAV_BUTTON_SIZE,
  height: SUB_NAV_BUTTON_SIZE,
  p: 0,
  borderRadius: 1.5,
  border: `solid 1px transparent`,
  color: "text.disabled",
  outline: "none",
  transition: theme.transitions.create(
    ["background-color", "box-shadow", "border-color", "color", "opacity"],
    { duration: theme.transitions.duration.shorter }
  ),
  "&:focus-visible": {
    outline: `2px dashed ${theme.vars.palette.primary.main}`,
    outlineOffset: 2
  },
  "&:hover": {
    opacity: 0.72,
    color: "text.primary",
    bgcolor: channelAlpha(grey500Ch(theme), 0.08)
  },
  "&:active": {
    opacity: 0.56,
    bgcolor: channelAlpha(grey500Ch(theme), 0.12)
  },
  ...isActive && {
    color: "primary.main",
    bgcolor: channelAlpha(theme.vars.palette.primary.mainChannel, 0.08),
    borderColor: channelAlpha(theme.vars.palette.primary.mainChannel, 0.24),
    "&:hover": {
      opacity: 1,
      bgcolor: channelAlpha(theme.vars.palette.primary.mainChannel, 0.12)
    },
    "&:active": {
      opacity: 1,
      bgcolor: channelAlpha(theme.vars.palette.primary.mainChannel, 0.16)
    }
  }
});

// src/components/material/navigation/floating-sub-nav/nav-pill.tsx
var import_framer_motion = require("framer-motion");
var import_Box14 = __toESM(require("@mui/material/Box"), 1);
var import_Stack3 = __toESM(require("@mui/material/Stack"), 1);

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.animations.ts
var PILL_EASING = [0.4, 0, 0.2, 1];
var PILL_TRANSITION_DURATION = 0.28;
var pillTransition = {
  duration: PILL_TRANSITION_DURATION,
  ease: PILL_EASING
};
var pillVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 }
};

// src/components/material/navigation/floating-sub-nav/sub-nav-button.tsx
var import_react15 = require("react");
var import_Tooltip2 = __toESM(require("@mui/material/Tooltip"), 1);
var import_ButtonBase2 = __toESM(require("@mui/material/ButtonBase"), 1);
var import_jsx_runtime26 = require("react/jsx-runtime");
function SubNavButton({ item, isActive, onPress }) {
  const handleClick = (0, import_react15.useCallback)(() => onPress(item.id), [onPress, item.id]);
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Tooltip2.default, { title: item.label, placement: "top", arrow: true, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    import_ButtonBase2.default,
    {
      disableRipple: true,
      component: "button",
      type: "button",
      "aria-label": item.label,
      "aria-pressed": isActive,
      onClick: handleClick,
      sx: subNavButtonSx(isActive),
      children: item.icon
    }
  ) });
}

// src/components/material/navigation/floating-sub-nav/nav-pill.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
function NavPill({ items, activeId, onPress }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    import_framer_motion.m.div,
    {
      variants: pillVariants,
      initial: "initial",
      animate: "animate",
      exit: "exit",
      transition: pillTransition,
      children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_Box14.default, { component: "nav", "aria-label": "Section navigation", sx: pillSx, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_Stack3.default, { direction: "row", spacing: PILL_BUTTON_ROW_SPACING, children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        SubNavButton,
        {
          item,
          isActive: activeId === item.id,
          onPress
        },
        item.id
      )) }) })
    }
  );
}

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
function FloatingSubNav({ items, activeId, onSelect, sticky = false }) {
  const handlePress = (0, import_react16.useCallback)((id) => onSelect(id), [onSelect]);
  if (sticky) {
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Box15.default, { sx: stickyWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Box15.default, { sx: stickyInnerSx, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_framer_motion2.AnimatePresence, { children: activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(NavPill, { items, activeId, onPress: handlePress }) }) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_framer_motion2.AnimatePresence, { children: activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Box15.default, { sx: fixedWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(NavPill, { items, activeId, onPress: handlePress }) }) });
}

// src/components/motion/viewport/motion-viewport.tsx
var import_framer_motion3 = require("framer-motion");
var import_Box16 = __toESM(require("@mui/material/Box"), 1);
var import_useMediaQuery = __toESM(require("@mui/material/useMediaQuery"), 1);

// src/components/motion/variants/container/container.const.ts
var CONTAINER_STAGGER_CHILDREN = 0.05;
var CONTAINER_DELAY_CHILDREN = 0.05;
var CONTAINER_EXIT_STAGGER_DIRECTION = -1;

// src/components/motion/variants/container/container.ts
var container = (options) => ({
  animate: {
    transition: {
      staggerChildren: CONTAINER_STAGGER_CHILDREN,
      delayChildren: CONTAINER_DELAY_CHILDREN,
      ...options?.transitionIn
    }
  },
  exit: {
    transition: {
      staggerChildren: CONTAINER_STAGGER_CHILDREN,
      staggerDirection: CONTAINER_EXIT_STAGGER_DIRECTION,
      ...options?.transitionOut
    }
  }
});

// src/components/motion/viewport/motion-viewport.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
function MotionViewport({
  children,
  viewport,
  sx,
  disableAnimateOnMobile = true,
  ...other
}) {
  const smDown = (0, import_useMediaQuery.default)((theme) => theme.breakpoints.down("sm"));
  if (smDown && disableAnimateOnMobile) {
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Box16.default, { sx, ...other, children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
    import_Box16.default,
    {
      component: import_framer_motion3.m.div,
      initial: "initial",
      whileInView: "animate",
      variants: container(),
      viewport: { once: true, amount: 0.3, ...viewport },
      sx,
      ...other,
      children
    }
  );
}

// src/components/section/feature-flow/feature-flow-section.const.ts
var HOVER_STEP_DELAY_MS = 180;
var SCROLL_IDLE_TIMEOUT_MS = 1e3;
var IMAGE_REVEAL_SCROLL_OFFSET = ["start 90%", "start 40%"];
var IMAGE_REVEAL_OPACITY_FROM = 0;
var IMAGE_REVEAL_Y_FROM_PX = 32;
var IMAGE_REVEAL_SCALE_FROM = 0.94;
var IMAGE_REVEAL_BLUR_FROM_PX = 12;
var DETAIL_PANEL_LAYOUT_TRANSITION = {
  layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
};

// src/components/section/feature-flow/feature-flow-section.styles.ts
var GREY_500_CHANNEL2 = "var(--mui-palette-grey-500Channel)";
var COMMON_BLACK_CHANNEL2 = "var(--mui-palette-common-blackChannel)";
var COMMON_WHITE_CHANNEL2 = "var(--mui-palette-common-whiteChannel)";
var HIGHLIGHT_CAROUSEL_HEIGHT = 570;
var selectedHoverShadow = (channel, innerAlpha, outerAlpha) => `0 0 2px 0 ${channelAlpha(channel, innerAlpha)}, -8px 20px 40px -4px ${channelAlpha(channel, outerAlpha)}`;
var selectedActiveShadow = (channel, innerAlpha, outerAlpha) => `0 0 1px 0 ${channelAlpha(channel, innerAlpha)}, -1px 2px 4px -1px ${channelAlpha(channel, outerAlpha)}`;
var featureFlowRootSx = (isExpanded) => ({
  pt: { xs: 10, md: 20 },
  pb: isExpanded ? 10 : { xs: 10, md: 20 }
});
var imageColumnCardSx = (theme) => ({
  top: 0,
  left: "50%",
  width: 720,
  maxWidth: "100%",
  borderRadius: 2,
  overflow: "hidden",
  position: "absolute",
  transform: "translateX(-50%)",
  bgcolor: "background.default",
  boxShadow: `-40px 40px 80px 0px ${channelAlpha(GREY_500_CHANNEL2, 0.16)}`,
  ...theme.applyStyles("dark", {
    boxShadow: `-40px 40px 80px 0px ${channelAlpha(COMMON_BLACK_CHANNEL2, 0.16)}`
  })
});
var detailPanelSx = {
  py: { xs: 6, md: 10 },
  overflow: "hidden",
  position: "relative",
  bgcolor: channelAlpha("var(--mui-palette-primary-mainChannel)", 0.04),
  borderTop: `1px solid ${channelAlpha("var(--mui-palette-primary-mainChannel)", 0.12)}`
};
var featureFlowItemSx = ({ isSelected, isActive, isExpanded, expandable }) => (theme) => ({
  gap: 2,
  display: "flex",
  alignItems: "flex-start",
  textAlign: "left",
  width: "100%",
  cursor: expandable ? "pointer" : "default",
  borderRadius: 1.5,
  py: 3,
  px: 2.5,
  border: "solid 1px transparent",
  color: "text.disabled",
  outline: "none",
  transition: theme.transitions.create(
    ["background-color", "box-shadow", "border-color", "opacity"],
    { duration: theme.transitions.duration.shorter }
  ),
  "&:focus-visible": {
    outline: `2px dashed ${theme.vars.palette.primary.main}`,
    outlineOffset: 2
  },
  ...expandable && !isSelected && {
    // `!important` is required here: this row renders as `component={m.button}`
    // with `variants={fade('inUp', …)}` for its entrance animation, and once
    // that animation settles framer-motion leaves a permanent inline
    // `style="opacity: 1"` on the element. Inline styles beat any class-based
    // rule regardless of specificity — without `!important`, `:hover`/`:active`
    // can change the background but can never actually dim the row (see #185).
    "&:hover": {
      opacity: "0.72 !important",
      bgcolor: channelAlpha(GREY_500_CHANNEL2, 0.08)
    },
    "&:active": {
      opacity: "0.56 !important",
      bgcolor: channelAlpha(GREY_500_CHANNEL2, 0.12)
    }
  },
  ...expandable && !isSelected && isActive && {
    opacity: 1
  },
  ...expandable && isSelected && {
    color: "text.primary",
    bgcolor: "background.paper",
    boxShadow: `-8px 8px 20px -4px ${channelAlpha(GREY_500_CHANNEL2, 0.12)}`,
    "&:hover": {
      opacity: 1,
      boxShadow: selectedHoverShadow(GREY_500_CHANNEL2, 0.08, 0.24)
    },
    "&:active": {
      opacity: 1,
      boxShadow: selectedActiveShadow(GREY_500_CHANNEL2, 0.04, 0.06)
    },
    ...theme.applyStyles("dark", {
      boxShadow: `-8px 8px 20px -4px ${channelAlpha(COMMON_BLACK_CHANNEL2, 0.12)}`,
      "&:hover": {
        boxShadow: selectedHoverShadow(COMMON_BLACK_CHANNEL2, 0.12, 0.32)
      },
      "&:active": {
        boxShadow: selectedActiveShadow(COMMON_BLACK_CHANNEL2, 0.04, 0.08)
      }
    })
  },
  ...expandable && isExpanded && {
    borderColor: channelAlpha("var(--mui-palette-primary-mainChannel)", 0.24),
    boxShadow: isSelected ? `inset 3px 0 0 ${theme.vars.palette.primary.main}, -8px 8px 20px -4px ${channelAlpha(GREY_500_CHANNEL2, 0.12)}` : `inset 3px 0 0 ${theme.vars.palette.primary.main}`
  }
});
var imageColumnStickyStackSx = {
  position: { xs: "relative", md: "sticky" },
  top: { md: 80 },
  width: 1,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1
};
var imageColumnOuterGhostSx = {
  width: 720,
  maxWidth: "100%",
  display: "block",
  visibility: "hidden",
  pointerEvents: "none",
  userSelect: "none"
};
var imageColumnInnerGhostSx = {
  width: "100%",
  display: "block",
  visibility: "hidden",
  pointerEvents: "none",
  userSelect: "none"
};
var crossfadeOpacitySx = (isActive, durationSeconds) => ({
  opacity: isActive ? 1 : 0,
  transition: `opacity ${durationSeconds}s ease`
});
var imageColumnFrameSx = (isActive) => ({
  width: "100%",
  display: "block",
  pointerEvents: "none",
  userSelect: "none",
  position: "absolute",
  top: 0,
  left: 0,
  ...crossfadeOpacitySx(isActive, 0.4)
});
var highlightCarouselRootSx = {
  position: "relative",
  height: HIGHLIGHT_CAROUSEL_HEIGHT,
  borderRadius: 2,
  overflow: "hidden"
};
var highlightSlideImageSx = (isActive) => ({
  position: "absolute",
  inset: 0,
  width: 1,
  height: 1,
  objectFit: "cover",
  objectPosition: "center top",
  ...crossfadeOpacitySx(isActive, 0.5)
});
var highlightScrimSx = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background: `linear-gradient(to top, ${channelAlpha(COMMON_BLACK_CHANNEL2, 1)} 0%, ${channelAlpha(COMMON_BLACK_CHANNEL2, 0.5)} 40%, transparent 69%)`
};
var highlightTextSlotSx = {
  position: "relative",
  height: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  px: { xs: 3, md: 4 },
  pb: { xs: 3, md: 4 },
  color: "common.white"
};
var highlightControlsRowSx = {
  position: "absolute",
  top: 16,
  right: 16,
  display: "flex",
  alignItems: "center",
  gap: 1
};
var highlightDetailTextSx = {
  color: channelAlpha(COMMON_WHITE_CHANNEL2, 0.9),
  lineHeight: 1.7
};
var highlightIndexLabelSx = {
  color: "common.white",
  minWidth: 32,
  textAlign: "center"
};
var highlightArrowButtonSx = {
  color: "common.white",
  bgcolor: channelAlpha(COMMON_WHITE_CHANNEL2, 0.12)
};

// src/components/section/feature-flow/feature-flow-section.utils.ts
var import_react17 = require("react");
var import_react_dom = require("react-dom");
var import_framer_motion4 = require("framer-motion");
function hasExpansionData(item) {
  return !!(item.longDescription || item.technologies?.length || item.metrics?.length || item.highlightCards?.length);
}
function isRichLongDescription(item) {
  return typeof item.longDescription !== "string" && item.longDescription != null;
}
function useImagePreloader(srcs, highPrioritySrc) {
  srcs.forEach((src) => {
    if (src) {
      (0, import_react_dom.preload)(src, {
        as: "image",
        fetchPriority: src === highPrioritySrc ? "high" : "auto"
      });
    }
  });
}
var scheduleIdle = typeof requestIdleCallback !== "undefined" ? (cb) => requestIdleCallback(cb) : (cb) => globalThis.setTimeout(cb, 0);
var cancelIdle = typeof cancelIdleCallback !== "undefined" ? (id) => cancelIdleCallback(id) : (id) => globalThis.clearTimeout(id);
function useClientImagePrewarm(srcs) {
  (0, import_react17.useEffect)(() => {
    if (!srcs.length) return void 0;
    let cancelled = false;
    const handle = scheduleIdle(() => {
      if (cancelled) return;
      srcs.forEach((src) => {
        if (!src) return;
        const img = new Image();
        img.src = src;
      });
    });
    return () => {
      cancelled = true;
      cancelIdle(handle);
    };
  }, [srcs]);
}
function useScrollDirection() {
  const [state, setState] = (0, import_react17.useState)({
    direction: "down",
    isScrolling: false
  });
  const prevYRef = (0, import_react17.useRef)(0);
  const idleTimerRef = (0, import_react17.useRef)(null);
  (0, import_react17.useEffect)(() => {
    prevYRef.current = globalThis.scrollY ?? 0;
    const handleScroll = () => {
      const latest = globalThis.scrollY ?? 0;
      const direction = latest > prevYRef.current ? "down" : "up";
      prevYRef.current = latest;
      setState({ direction, isScrolling: true });
      if (idleTimerRef.current) globalThis.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = globalThis.setTimeout(() => {
        setState((prev) => ({ ...prev, isScrolling: false }));
        idleTimerRef.current = null;
      }, SCROLL_IDLE_TIMEOUT_MS);
    };
    globalThis.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      if (idleTimerRef.current) globalThis.clearTimeout(idleTimerRef.current);
    };
  }, []);
  return state;
}
function useImageRevealTransform() {
  const ref = (0, import_react17.useRef)(null);
  const reducedMotion = (0, import_framer_motion4.useReducedMotion)();
  const { scrollYProgress } = (0, import_framer_motion4.useScroll)({
    target: ref,
    offset: IMAGE_REVEAL_SCROLL_OFFSET
  });
  const opacity = (0, import_framer_motion4.useTransform)(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [IMAGE_REVEAL_OPACITY_FROM, 1]
  );
  const y = (0, import_framer_motion4.useTransform)(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [IMAGE_REVEAL_Y_FROM_PX, 0]
  );
  const scale = (0, import_framer_motion4.useTransform)(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [IMAGE_REVEAL_SCALE_FROM, 1]
  );
  const blurPx = (0, import_framer_motion4.useTransform)(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [IMAGE_REVEAL_BLUR_FROM_PX, 0]
  );
  const filter = import_framer_motion4.useMotionTemplate`blur(${blurPx}px)`;
  return { ref, style: { opacity, y, scale, filter } };
}

// src/components/section/feature-flow/description-column/feature-flow-description-column.tsx
var import_Stack5 = __toESM(require("@mui/material/Stack"), 1);

// src/components/section/feature-flow/item-row/feature-flow-item-row.tsx
var import_react18 = __toESM(require("react"), 1);
var import_framer_motion5 = require("framer-motion");
var import_Stack4 = __toESM(require("@mui/material/Stack"), 1);
var import_Typography8 = __toESM(require("@mui/material/Typography"), 1);
var import_ButtonBase3 = __toESM(require("@mui/material/ButtonBase"), 1);

// src/components/motion/variants/transition/transition.const.ts
var TRANSITION_ENTER_DURATION = 0.64;
var TRANSITION_EXIT_DURATION = 0.48;
var TRANSITION_EASE = [0.43, 0.13, 0.23, 0.96];

// src/components/motion/variants/transition/transition.ts
var transitionEnter = (opts) => ({
  duration: TRANSITION_ENTER_DURATION,
  ease: TRANSITION_EASE,
  ...opts
});
var transitionExit = (opts) => ({
  duration: TRANSITION_EXIT_DURATION,
  ease: TRANSITION_EASE,
  ...opts
});

// src/components/motion/variants/fade/fade.const.ts
var FADE_DEFAULT_DISTANCE = 120;

// src/components/motion/variants/fade/fade.ts
var fade = (direction, options) => {
  const distance = options?.distance ?? FADE_DEFAULT_DISTANCE;
  const tIn = options?.transitionIn;
  const tOut = options?.transitionOut;
  const map = {
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: transitionEnter(tIn) },
      exit: { opacity: 0, transition: transitionExit(tOut) }
    },
    inUp: {
      initial: { y: distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { y: distance, opacity: 0, transition: transitionExit(tOut) }
    },
    inDown: {
      initial: { y: -distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { y: -distance, opacity: 0, transition: transitionExit(tOut) }
    },
    inLeft: {
      initial: { x: -distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { x: -distance, opacity: 0, transition: transitionExit(tOut) }
    },
    inRight: {
      initial: { x: distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { x: distance, opacity: 0, transition: transitionExit(tOut) }
    },
    out: {
      initial: { opacity: 1 },
      animate: { opacity: 0, transition: transitionEnter(tIn) },
      exit: { opacity: 1, transition: transitionExit(tOut) }
    },
    outUp: {
      initial: { y: 0, opacity: 1 },
      animate: { y: -distance, opacity: 0, transition: transitionEnter(tIn) },
      exit: { y: 0, opacity: 1, transition: transitionExit(tOut) }
    },
    outDown: {
      initial: { y: 0, opacity: 1 },
      animate: { y: distance, opacity: 0, transition: transitionEnter(tIn) },
      exit: { y: 0, opacity: 1, transition: transitionExit(tOut) }
    },
    outLeft: {
      initial: { x: 0, opacity: 1 },
      animate: { x: -distance, opacity: 0, transition: transitionEnter(tIn) },
      exit: { x: 0, opacity: 1, transition: transitionExit(tOut) }
    },
    outRight: {
      initial: { x: 0, opacity: 1 },
      animate: { x: distance, opacity: 0, transition: transitionEnter(tIn) },
      exit: { x: 0, opacity: 1, transition: transitionExit(tOut) }
    }
  };
  return map[direction];
};

// src/components/section/feature-flow/item-row/feature-flow-item-row.styles.ts
var itemRowTextSlotSx = {
  flex: 1,
  minWidth: 0
};

// src/components/section/feature-flow/item-row/feature-flow-item-row.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var FeatureFlowItemRow = import_react18.default.forwardRef(
  function FeatureFlowItemRow2({
    icon,
    title,
    description,
    expandable,
    isSelected,
    isActive,
    isExpanded,
    onHover,
    onFocus,
    onSelect,
    sx,
    ...other
  }, ref) {
    const reducedMotion = (0, import_framer_motion5.useReducedMotion)();
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
      import_ButtonBase3.default,
      {
        ...other,
        ref,
        disableRipple: true,
        type: "button",
        "aria-pressed": expandable ? isSelected : void 0,
        component: import_framer_motion5.m.button,
        variants: fade("inUp", { distance: reducedMotion ? 0 : 24 }),
        onMouseEnter: onHover,
        onFocus,
        onClick: expandable ? onSelect : void 0,
        sx: [
          featureFlowItemSx({ isSelected, isActive, isExpanded, expandable }),
          ...Array.isArray(sx) ? sx : [sx]
        ],
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(GiselleIcon, { icon, width: 48, "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_Stack4.default, { spacing: 1, sx: itemRowTextSlotSx, children: [
            /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_Typography8.default, { variant: "h4", component: "h6", color: "inherit", children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_Typography8.default, { color: "inherit", children: description })
          ] })
        ]
      }
    );
  }
);
FeatureFlowItemRow.displayName = "FeatureFlowItemRow";

// src/components/section/feature-flow/description-column/feature-flow-description-column.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
function FeatureFlowDescriptionColumn({
  caption,
  title,
  txtGradient,
  description,
  items,
  selectedItemIndex,
  activeItemIndex,
  expandedItemId,
  onItemHover,
  onItemSelect,
  onLeave
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
    title && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      SectionTitle,
      {
        caption,
        title,
        txtGradient,
        description,
        sx: { mb: { xs: 5, md: 8 }, textAlign: { xs: "center", md: "left" } }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      import_Stack5.default,
      {
        spacing: 1.5,
        sx: { maxWidth: { sm: 560, md: 400 }, mx: { xs: "auto", md: "unset" } },
        onMouseLeave: onLeave,
        onBlur: (event) => {
          if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) {
            return;
          }
          onLeave();
        },
        children: items.map((item, index) => {
          const expandable = hasExpansionData(item);
          const isSelected = index === selectedItemIndex;
          const isActive = index === activeItemIndex;
          const isExpanded = item.id === expandedItemId;
          return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
            FeatureFlowItemRow,
            {
              icon: item.icon,
              title: item.title,
              description: item.description,
              expandable,
              isSelected,
              isActive,
              isExpanded,
              onHover: () => onItemHover(index),
              onFocus: () => onItemHover(index),
              onSelect: () => onItemSelect(item, index)
            },
            item.id
          );
        })
      }
    )
  ] });
}

// src/components/section/feature-flow/image-column/feature-flow-image-column.tsx
var import_react19 = __toESM(require("react"), 1);
var import_framer_motion6 = require("framer-motion");
var import_Box17 = __toESM(require("@mui/material/Box"), 1);
var import_Stack6 = __toESM(require("@mui/material/Stack"), 1);
var import_jsx_runtime32 = require("react/jsx-runtime");
var RESTING_REVEAL_STYLE = {
  opacity: 1,
  y: 0,
  scale: 1,
  filter: "none"
};
var FeatureFlowImageColumn = import_react19.default.forwardRef(
  function FeatureFlowImageColumn2({ activeSrc, ghostSrc, allSrcs, alt, revealStyle = RESTING_REVEAL_STYLE, sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_Stack6.default, { ref, sx: imageColumnStickyStackSx, ...other, children: [
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_Box17.default, { component: "img", alt: "", "aria-hidden": true, src: ghostSrc, sx: imageColumnOuterGhostSx }),
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_Box17.default, { sx: [imageColumnCardSx, ...Array.isArray(sx) ? sx : [sx]], children: /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_Box17.default, { component: import_framer_motion6.m.div, style: revealStyle, sx: { width: 1, position: "relative" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_Box17.default, { component: "img", alt: "", "aria-hidden": true, src: ghostSrc, sx: imageColumnInnerGhostSx }),
        allSrcs.map((src) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          import_Box17.default,
          {
            component: "img",
            alt: src === activeSrc ? alt : "",
            "aria-hidden": src === activeSrc ? void 0 : true,
            src,
            fetchPriority: src === ghostSrc ? "high" : "auto",
            sx: imageColumnFrameSx(src === activeSrc)
          },
          src
        ))
      ] }) })
    ] });
  }
);
FeatureFlowImageColumn.displayName = "FeatureFlowImageColumn";

// src/components/section/feature-flow/item-detail/feature-flow-item-detail.tsx
var import_react21 = __toESM(require("react"), 1);
var import_framer_motion8 = require("framer-motion");
var import_Box20 = __toESM(require("@mui/material/Box"), 1);
var import_Grid3 = __toESM(require("@mui/material/Grid"), 1);
var import_Stack7 = __toESM(require("@mui/material/Stack"), 1);
var import_Container3 = __toESM(require("@mui/material/Container"), 1);
var import_Typography11 = __toESM(require("@mui/material/Typography"), 1);

// src/components/material/data-display/icon/tech-strip/tech-icon-strip.tsx
var import_Box18 = __toESM(require("@mui/material/Box"), 1);
var import_Typography9 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime33 = require("react/jsx-runtime");
function TechIconStrip({
  items,
  heading,
  centeredWrap = false,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_Box18.default, { sx: [stripRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    heading && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_Typography9.default, { component: "span", sx: titleSx, variant: "overline", children: heading }),
    /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_Box18.default, { sx: stripWrapperSx(centeredWrap), children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_Box18.default, { sx: itemSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_Box18.default, { "aria-hidden": true, sx: iconSlotSx, children: item.icon }),
      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_Typography9.default, { sx: { fontSize: TECH_ICON_STRIP_LABEL_FONT_SIZE }, variant: "caption", children: item.label })
    ] }, item.label)) })
  ] });
}

// src/components/section/feature-flow/highlight-carousel/feature-flow-highlight-carousel.tsx
var import_react20 = __toESM(require("react"), 1);
var import_framer_motion7 = require("framer-motion");
var import_Box19 = __toESM(require("@mui/material/Box"), 1);
var import_Link = __toESM(require("@mui/material/Link"), 1);
var import_IconButton3 = __toESM(require("@mui/material/IconButton"), 1);
var import_Typography10 = __toESM(require("@mui/material/Typography"), 1);

// src/components/section/feature-flow/highlight-carousel/feature-flow-highlight-carousel.animations.ts
var HIGHLIGHT_TEXT_SLIDE_DISTANCE = 24;
var highlightTextVariants = (distance) => ({
  enter: (step) => ({
    opacity: 0,
    x: step >= 0 ? distance : -distance
  }),
  center: { opacity: 1, x: 0 },
  exit: (step) => ({
    opacity: 0,
    x: step >= 0 ? -distance : distance
  })
});

// src/components/section/feature-flow/highlight-carousel/feature-flow-highlight-carousel.tsx
var import_jsx_runtime34 = require("react/jsx-runtime");
var FeatureFlowHighlightCarousel = import_react20.default.forwardRef(function FeatureFlowHighlightCarousel2({ cards, sx, ...other }, ref) {
  const [selectedIndex, setSelectedIndex] = (0, import_react20.useState)(0);
  const [step, setStep] = (0, import_react20.useState)(1);
  const reducedMotion = (0, import_framer_motion7.useReducedMotion)();
  if (!cards.length) return null;
  const goTo = (index, direction) => {
    setStep(direction);
    setSelectedIndex((index + cards.length) % cards.length);
  };
  const selectedCard = cards[selectedIndex];
  const textVariants = highlightTextVariants(reducedMotion ? 0 : HIGHLIGHT_TEXT_SLIDE_DISTANCE);
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_Box19.default, { ref, sx: [highlightCarouselRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    cards.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
      import_Box19.default,
      {
        component: "img",
        alt: "",
        "aria-hidden": "true",
        src: card.media ?? "",
        loading: index === selectedIndex ? "eager" : "lazy",
        sx: highlightSlideImageSx(index === selectedIndex)
      },
      card.title
    )),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_Box19.default, { "aria-hidden": true, sx: highlightScrimSx }),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_Box19.default, { sx: highlightTextSlotSx, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_framer_motion7.AnimatePresence, { mode: "wait", custom: step, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
      import_framer_motion7.m.div,
      {
        custom: step,
        variants: textVariants,
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: { duration: 0.28, ease: "easeOut" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_Typography10.default, { variant: "h4", sx: { mb: 1 }, children: selectedCard?.title }),
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_Typography10.default, { variant: "body1", sx: highlightDetailTextSx, children: selectedCard?.description }),
          selectedCard?.href && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
            import_Link.default,
            {
              href: selectedCard.href,
              variant: "body2",
              sx: { mt: 1, display: "inline-block", color: "inherit" },
              children: "Learn more"
            }
          )
        ]
      },
      selectedIndex
    ) }) }),
    cards.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_Box19.default, { sx: highlightControlsRowSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_Typography10.default, { variant: "caption", sx: highlightIndexLabelSx, children: [
        selectedIndex + 1,
        "/",
        cards.length
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
        import_IconButton3.default,
        {
          "aria-label": "Previous highlight",
          size: "small",
          onClick: () => goTo(selectedIndex - 1, -1),
          sx: highlightArrowButtonSx,
          children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(GiselleIcon, { icon: "solar:alt-arrow-left-bold", width: 18, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
        import_IconButton3.default,
        {
          "aria-label": "Next highlight",
          size: "small",
          onClick: () => goTo(selectedIndex + 1, 1),
          sx: highlightArrowButtonSx,
          children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(GiselleIcon, { icon: "solar:alt-arrow-right-bold", width: 18, "aria-hidden": "true" })
        }
      )
    ] })
  ] });
});
FeatureFlowHighlightCarousel.displayName = "FeatureFlowHighlightCarousel";

// src/components/section/feature-flow/item-detail/feature-flow-item-detail.styles.ts
var itemDetailHeaderSlotSx = {
  alignItems: "center"
};
var itemDetailHeaderIconSx = {
  color: "primary.main"
};
var itemDetailMetricsGridSx = (metricsCount) => ({
  display: "grid",
  gap: 2,
  gridTemplateColumns: {
    xs: "repeat(1, 1fr)",
    sm: `repeat(${Math.min(metricsCount, 3)}, 1fr)`
  }
});
var itemDetailLongDescriptionSx = {
  color: "text.secondary",
  lineHeight: 1.8
};

// src/components/section/feature-flow/item-detail/feature-flow-item-detail.tsx
var import_jsx_runtime35 = require("react/jsx-runtime");
var FeatureFlowItemDetail = import_react21.default.forwardRef(
  function FeatureFlowItemDetail2({ item, onNodeRef, sx, ...other }, ref) {
    const reducedMotion = (0, import_framer_motion8.useReducedMotion)();
    const slideDistance = reducedMotion ? 0 : 8;
    return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_framer_motion8.m.div, { ref, layout: true, transition: DETAIL_PANEL_LAYOUT_TRANSITION, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_framer_motion8.AnimatePresence, { mode: "wait", children: item && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
      import_framer_motion8.m.div,
      {
        initial: { opacity: 0, y: slideDistance },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -slideDistance },
        transition: { duration: 0.22, ease: "easeOut" },
        children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
          import_Box20.default,
          {
            ref: (node) => onNodeRef?.(item.id, node),
            sx: [detailPanelSx, ...Array.isArray(sx) ? sx : [sx]],
            ...other,
            children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_Container3.default, { children: /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_Grid3.default, { container: true, spacing: { xs: 4, md: 8 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_Grid3.default, { size: { xs: 12, md: 6 }, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_Stack7.default, { spacing: 4, children: [
                /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_Stack7.default, { direction: "row", spacing: 2, sx: itemDetailHeaderSlotSx, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
                    GiselleIcon,
                    {
                      icon: item.icon,
                      width: 44,
                      sx: itemDetailHeaderIconSx,
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_Typography11.default, { variant: "h3", children: item.title })
                ] }),
                item.metrics?.length ? /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_Box20.default, { sx: itemDetailMetricsGridSx(item.metrics.length), children: item.metrics.map(({ value, label, sublabel, icon }) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
                  MetricCard,
                  {
                    value,
                    label,
                    sublabel,
                    icon: icon ? /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(GiselleIcon, { icon, width: 36, "aria-hidden": "true" }) : void 0,
                    color: "primary",
                    decoration: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(MetricCardDecoration, { color: "primary" })
                  },
                  label
                )) }) : null,
                isRichLongDescription(item) ? item.longDescription : /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_Typography11.default, { variant: "body1", sx: itemDetailLongDescriptionSx, children: item.longDescription ?? item.description }),
                item.technologies?.length ? /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
                  TechIconStrip,
                  {
                    heading: "Technologies",
                    centeredWrap: false,
                    items: item.technologies.map((tech) => ({
                      label: tech.name,
                      icon: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(GiselleIcon, { icon: tech.icon, width: 32, "aria-hidden": "true" })
                    }))
                  }
                ) : null
              ] }) }),
              (item.highlightCards ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_Grid3.default, { size: { xs: 12, md: 6 }, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(FeatureFlowHighlightCarousel, { cards: item.highlightCards ?? [] }) })
            ] }) })
          }
        )
      },
      item.id
    ) }) });
  }
);
FeatureFlowItemDetail.displayName = "FeatureFlowItemDetail";

// src/components/section/feature-flow/feature-flow-section.tsx
var import_jsx_runtime36 = require("react/jsx-runtime");
var FeatureFlowSection = import_react22.default.forwardRef(
  function FeatureFlowSection2({
    caption,
    title,
    txtGradient,
    description,
    items,
    image,
    layoutDirection = "left",
    columnSpacing = { xs: 0, md: 8 },
    descriptionGridSize,
    imageGridSize,
    decoration = true,
    renderRightPanel,
    sx,
    ...other
  }, ref) {
    const isLeft = layoutDirection === "left";
    const resolvedDescriptionGridSize = descriptionGridSize ?? {
      xs: 12,
      md: 6,
      lg: isLeft ? 7 : 5
    };
    const resolvedImageGridSize = imageGridSize ?? { xs: 12, md: 6, lg: isLeft ? 5 : 7 };
    const [activeItemIndex, setActiveItemIndex] = (0, import_react22.useState)(0);
    const [selectedItemIndex, setSelectedItemIndex] = (0, import_react22.useState)(0);
    const [userHasSelected, setUserHasSelected] = (0, import_react22.useState)(false);
    const [expandedItemId, setExpandedItemId] = (0, import_react22.useState)(null);
    const [hoverImageIndex, setHoverImageIndex] = (0, import_react22.useState)(0);
    const [pendingScrollItemId, setPendingScrollItemId] = (0, import_react22.useState)(null);
    const hoverImageIndexRef = (0, import_react22.useRef)(0);
    const detailPanelNodesRef = (0, import_react22.useRef)(/* @__PURE__ */ new Map());
    const { direction: scrollDirection, isScrolling } = useScrollDirection();
    const { ref: imageColumnRef, style: imageRevealStyle } = useImageRevealTransform();
    const activeItem = items[activeItemIndex] ?? items[0];
    const setHoverPhase = (0, import_react22.useCallback)((phase) => {
      hoverImageIndexRef.current = phase;
      setHoverImageIndex(phase);
    }, []);
    const scrollAwareSrc = (0, import_react22.useMemo)(() => {
      if (image.scrollImages?.length === 2) {
        return image.scrollImages[scrollDirection === "down" ? 0 : 1];
      }
      return image.src;
    }, [image.scrollImages, image.src, scrollDirection]);
    const hoverSequenceSources = (0, import_react22.useMemo)(() => {
      if (image.scrollImages?.length === 2 && isScrolling && !userHasSelected) {
        return [scrollAwareSrc];
      }
      if (activeItem?.imgUrl?.length) return [...activeItem.imgUrl];
      if (image.stackSources?.length) return [...image.stackSources];
      return image.src ? [image.src] : [];
    }, [
      activeItem,
      image.scrollImages,
      image.src,
      image.stackSources,
      isScrolling,
      scrollAwareSrc,
      userHasSelected
    ]);
    (0, import_react22.useEffect)(() => {
      setHoverPhase(0);
      if (hoverSequenceSources.length <= 1) return void 0;
      const interval = globalThis.setInterval(() => {
        const next = hoverImageIndexRef.current + 1;
        if (next >= hoverSequenceSources.length) {
          globalThis.clearInterval(interval);
          return;
        }
        setHoverPhase(next);
      }, HOVER_STEP_DELAY_MS);
      return () => globalThis.clearInterval(interval);
    }, [activeItemIndex, hoverSequenceSources, setHoverPhase]);
    (0, import_react22.useEffect)(() => {
      if (!isScrolling) {
        setActiveItemIndex(selectedItemIndex);
        setHoverPhase(0);
      }
    }, [isScrolling, selectedItemIndex, setHoverPhase]);
    const activeSrc = hoverSequenceSources[hoverImageIndex] ?? hoverSequenceSources[0] ?? "";
    const initiallyVisibleSrc = items[0]?.imgUrl?.[0] ?? image.scrollImages?.[0] ?? image.stackSources?.[0] ?? image.src;
    const allItemImageSrcs = (0, import_react22.useMemo)(
      () => Array.from(
        new Set(
          [
            image.src,
            ...image.scrollImages ?? [],
            ...image.stackSources ?? [],
            ...items.flatMap((item) => item.imgUrl ?? [])
          ].filter((src) => !!src)
        )
      ),
      [image.src, image.scrollImages, image.stackSources, items]
    );
    useImagePreloader(allItemImageSrcs, initiallyVisibleSrc);
    useClientImagePrewarm(allItemImageSrcs);
    const handleItemHover = (index) => {
      setActiveItemIndex(index);
      setHoverPhase(0);
    };
    const handleLeave = () => {
      setActiveItemIndex(selectedItemIndex);
      setHoverPhase(0);
    };
    const handleItemClick = (item, index) => {
      if (!hasExpansionData(item)) return;
      setActiveItemIndex(index);
      setSelectedItemIndex(index);
      setUserHasSelected(true);
      setExpandedItemId((current) => current === item.id ? null : item.id);
    };
    const subNavItems = (0, import_react22.useMemo)(
      () => items.filter(hasExpansionData).map((item) => ({
        id: item.id,
        label: item.title,
        icon: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(GiselleIcon, { icon: item.icon, width: 22, "aria-hidden": "true" })
      })),
      [items]
    );
    const handleSubNavSelect = (0, import_react22.useCallback)(
      (id) => {
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1) {
          setActiveItemIndex(index);
          setSelectedItemIndex(index);
          setUserHasSelected(true);
        }
        setExpandedItemId(id);
      },
      [items]
    );
    const expandedItem = items.find((item) => item.id === expandedItemId) ?? null;
    (0, import_react22.useEffect)(() => {
      if (!expandedItemId) {
        setPendingScrollItemId(null);
        return void 0;
      }
      let rafId;
      let cancelled = false;
      const attemptScroll = () => {
        if (cancelled) return;
        const node = detailPanelNodesRef.current.get(expandedItemId);
        if (node) {
          node.scrollIntoView?.({ behavior: "smooth", block: "start" });
          setPendingScrollItemId((current) => current === expandedItemId ? null : current);
          return;
        }
        rafId = globalThis.requestAnimationFrame(attemptScroll);
      };
      setPendingScrollItemId(expandedItemId);
      attemptScroll();
      return () => {
        cancelled = true;
        if (rafId !== void 0) globalThis.cancelAnimationFrame(rafId);
      };
    }, [expandedItemId]);
    let rightPanel;
    if (renderRightPanel) {
      rightPanel = activeItem ? renderRightPanel(activeItem, activeItem.id === expandedItemId) : null;
    } else {
      rightPanel = /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
        FeatureFlowImageColumn,
        {
          ref: imageColumnRef,
          activeSrc,
          ghostSrc: initiallyVisibleSrc ?? image.src,
          allSrcs: allItemImageSrcs,
          alt: image.alt,
          revealStyle: imageRevealStyle,
          sx: image.sx
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
      BasicSection,
      {
        ref,
        decoration,
        containerSx: { position: "relative" },
        containerPy: 0,
        unconstrainedChildren: /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(import_jsx_runtime36.Fragment, { children: [
          pendingScrollItemId && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
            import_LinearProgress.default,
            {
              "aria-label": "Loading item detail panel",
              "aria-live": "polite",
              "aria-busy": "true"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
            FeatureFlowItemDetail,
            {
              item: expandedItem,
              onNodeRef: (itemId, node) => {
                if (node) {
                  detailPanelNodesRef.current.set(itemId, node);
                } else {
                  detailPanelNodesRef.current.delete(itemId);
                }
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
            FloatingSubNav,
            {
              sticky: true,
              items: subNavItems,
              activeId: expandedItemId,
              onSelect: handleSubNavSelect
            }
          )
        ] }),
        sx: [featureFlowRootSx(Boolean(expandedItemId)), ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(MotionViewport, { children: /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
          import_Grid4.default,
          {
            container: true,
            columnSpacing,
            rowSpacing: { xs: 5, md: 0 },
            sx: (theme) => ({
              position: "relative",
              // Only when a detail panel is showing: without this, the last
              // row's card sits flush against the detail panel's border —
              // detailPanelSx's own py pushes its *content* down from that
              // border, not the border away from what's above it.
              pb: expandedItemId ? { xs: 5, md: 8 } : 0,
              transition: theme.transitions.create("padding-bottom", {
                duration: theme.transitions.duration.short
              })
            }),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
                import_Grid4.default,
                {
                  size: resolvedDescriptionGridSize,
                  sx: { order: { xs: 1, md: isLeft ? 1 : 2 }, pl: { md: isLeft ? 0 : 4 } },
                  children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
                    FeatureFlowDescriptionColumn,
                    {
                      caption,
                      title,
                      txtGradient,
                      description,
                      items,
                      selectedItemIndex,
                      activeItemIndex,
                      expandedItemId,
                      onItemHover: handleItemHover,
                      onItemSelect: handleItemClick,
                      onLeave: handleLeave
                    }
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(import_Grid4.default, { size: resolvedImageGridSize, sx: { order: { xs: 2, md: isLeft ? 2 : 1 } }, children: rightPanel })
            ]
          }
        ) })
      }
    );
  }
);
FeatureFlowSection.displayName = "FeatureFlowSection";

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
var import_Box21 = __toESM(require("@mui/material/Box"), 1);

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
var import_jsx_runtime37 = require("react/jsx-runtime");
function AnimatedGradientText({
  children,
  color1 = ANIMATED_GRADIENT_DEFAULT_COLOR1,
  color2 = ANIMATED_GRADIENT_DEFAULT_COLOR2,
  duration = ANIMATED_GRADIENT_DEFAULT_DURATION,
  component = "span",
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    import_Box21.default,
    {
      component,
      sx: [gradientTextSx(color1, color2, duration), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACCORDION_CHECK_ICON_SIZE,
  ACCORDION_DONE_MIN_TOUCH_TARGET,
  ACCORDION_ICON_BUTTON_MIN_SIZE,
  Accordion,
  AnimatedGradientText,
  BasicSection,
  DEFAULT_ICON_ACTIONS,
  FeatureFlowSection,
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
  SelectableLabel,
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
});
//# sourceMappingURL=index.cjs.map
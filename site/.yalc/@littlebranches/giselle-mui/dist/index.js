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
function channelAlpha(channel, alpha13) {
  return `rgba(${channel} / ${alpha13})`;
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

// src/theme-port-phase1/core/components/accordion.tsx
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import { accordionClasses } from "@mui/material/Accordion";
import { accordionSummaryClasses } from "@mui/material/AccordionSummary";
import { accordionDetailsClasses } from "@mui/material/AccordionDetails";
import { jsx, jsxs } from "react/jsx-runtime";
var PlusIcon = (props) => (
  // https://icon-sets.iconify.design/mingcute/add-line/
  /* @__PURE__ */ jsx(SvgIcon, { ...props, children: /* @__PURE__ */ jsxs("g", { fill: "none", children: [
    /* @__PURE__ */ jsx("path", { d: "m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "currentColor",
        d: "M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z"
      }
    )
  ] }) })
);
var MinusIcon = (props) => (
  // https://icon-sets.iconify.design/mingcute/minimize-line/
  /* @__PURE__ */ jsx(SvgIcon, { ...props, children: /* @__PURE__ */ jsxs("g", { fill: "none", fillRule: "evenodd", children: [
    /* @__PURE__ */ jsx("path", { d: "m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
    /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M3 12a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1" })
  ] }) })
);
var iconClasses = {
  container: "accordion__icon__container",
  plus: "accordion__icon__plus",
  minus: "accordion__icon__minus"
};
var getExpandIconStyles = (theme) => {
  const resetTransform = {
    default: {
      transition: "inherit",
      transform: "rotate(0deg)"
    },
    expanded: {
      transform: "rotate(-180deg)"
    }
  };
  const iconContainerStyles = {
    width: 24,
    height: 24,
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  };
  const iconStyles = {
    width: 18,
    height: 18,
    position: "absolute",
    transition: theme.transitions.create(["transform", "opacity"], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.shortest
    })
  };
  return {
    [`& .${iconClasses.container}`]: { ...resetTransform.default, ...iconContainerStyles },
    [`& .${iconClasses.plus}`]: { ...iconStyles, transform: "scale(1)", opacity: 1 },
    [`& .${iconClasses.minus}`]: { ...iconStyles, transform: "scale(0.4)", opacity: 0 },
    [`&.${accordionSummaryClasses.expanded}`]: {
      [`& .${iconClasses.container}`]: resetTransform.expanded,
      [`& .${iconClasses.plus}`]: { transform: "scale(0.4)", opacity: 0 },
      [`& .${iconClasses.minus}`]: { transform: "scale(1)", opacity: 1 }
    }
  };
};
var ExpandIcon = (props) => /* @__PURE__ */ jsxs(Box, { component: "span", className: iconClasses.container, ...props, children: [
  /* @__PURE__ */ jsx(PlusIcon, { className: iconClasses.plus }),
  /* @__PURE__ */ jsx(MinusIcon, { className: iconClasses.minus })
] });
var expandedVariants = [
  {
    props: (props) => !props.disableGutters && !!props.expanded,
    // `customShadows` isn't wired into giselle-mui-poc's theme yet (tracked
    // separately as wiki#829 — a retint to match the reference app, not
    // just wiring the existing neutral values in) — falls back to the
    // theme's own standard elevation-8 shadow, which every MUI theme always
    // has, rather than crashing on the missing token.
    style: ({ theme }) => ({
      boxShadow: theme.vars.customShadows?.z8 ?? theme.shadows[8],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.vars.palette.background.paper
    })
  }
];
var disableGuttersVariants = [
  {
    props: (props) => !!props.disableGutters,
    style: ({ theme }) => ({
      borderBottom: `solid 1px ${theme.vars.palette.divider}`,
      "&:last-of-type": { borderBottom: "none" },
      "&::before": { display: "none" },
      // Hide the border
      [`& .${accordionSummaryClasses.root}`]: {
        paddingLeft: 0,
        paddingRight: 0
      },
      [`& .${accordionDetailsClasses.root}`]: {
        paddingLeft: 0,
        paddingRight: 0
      }
    })
  }
];
var disableVariants = [
  {
    props: {},
    style: ({ theme }) => ({
      [`&.${accordionClasses.disabled}`]: {
        backgroundColor: "transparent",
        [`& .${accordionDetailsClasses.root}`]: {
          opacity: theme.vars.palette.action.disabledOpacity
        }
      }
    })
  }
];
var MuiAccordion = {
  // ▼▼▼▼▼▼▼▼ ⚙️ PROPS ▼▼▼▼▼▼▼▼
  defaultProps: {
    square: true
  },
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: {
      backgroundColor: "transparent",
      variants: [...expandedVariants, ...disableGuttersVariants, ...disableVariants]
    }
  }
};
var sizingReset = {
  root: {
    minHeight: "auto",
    [`&.${accordionSummaryClasses.expanded}`]: {
      minHeight: "inherit"
    }
  },
  content: {
    margin: 0,
    [`&.${accordionSummaryClasses.expanded}`]: {
      margin: "inherit"
    }
  }
};
var MuiAccordionSummary = {
  // ▼▼▼▼▼▼▼▼ ⚙️ PROPS ▼▼▼▼▼▼▼▼
  defaultProps: {
    expandIcon: /* @__PURE__ */ jsx(ExpandIcon, {})
  },
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: ({ theme }) => ({
      ...sizingReset.root,
      padding: theme.spacing(2, 1, 2, 2)
    }),
    content: {
      ...sizingReset.content
    },
    expandIconWrapper: ({ theme }) => ({
      ...getExpandIconStyles(theme),
      color: "inherit",
      alignSelf: "flex-start",
      marginLeft: theme.spacing(2)
    })
  }
};
var MuiAccordionDetails = {
  // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
  styleOverrides: {
    root: {
      paddingTop: 0
    }
  }
};
var accordion = {
  MuiAccordion,
  MuiAccordionSummary,
  MuiAccordionDetails
};

// src/theme-port-phase1/core/opacity.ts
var opacity = {
  // system
  switchTrack: 1,
  switchTrackDisabled: 0.48,
  inputPlaceholder: 1,
  inputUnderline: 0.32,
  // shape
  filled: {
    commonHoverBg: 0.72
  },
  outlined: {
    border: 0.48
  },
  soft: {
    bg: 0.16,
    hoverBg: 0.32,
    commonBg: 0.08,
    commonHoverBg: 0.16,
    border: 0.24
  }
};

// src/theme-port-phase1/theme-config.ts
var themeConfig = {
  /** **************************************
   * Base
   *************************************** */
  defaultMode: "light",
  modeStorageKey: "theme-mode",
  direction: "ltr",
  classesPrefix: "minimal",
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: "Public Sans Variable",
    secondary: "Barlow"
  },
  /** **************************************
   * Palette
   *************************************** */
  palette: {
    primary: {
      lighter: "#C8FAD6",
      light: "#5BE49B",
      main: "#00A76F",
      dark: "#007867",
      darker: "#004B50",
      contrastText: "#FFFFFF"
    },
    secondary: {
      lighter: "#EFD6FF",
      light: "#C684FF",
      main: "#8E33FF",
      dark: "#5119B7",
      darker: "#27097A",
      contrastText: "#FFFFFF"
    },
    info: {
      lighter: "#CAFDF5",
      light: "#61F3F3",
      main: "#00B8D9",
      dark: "#006C9C",
      darker: "#003768",
      contrastText: "#FFFFFF"
    },
    success: {
      lighter: "#D3FCD2",
      light: "#77ED8B",
      main: "#22C55E",
      dark: "#118D57",
      darker: "#065E49",
      contrastText: "#ffffff"
    },
    warning: {
      lighter: "#FFF5CC",
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#B76E00",
      darker: "#7A4100",
      contrastText: "#1C252E"
    },
    error: {
      lighter: "#FFE9D5",
      light: "#FFAC82",
      main: "#FF5630",
      dark: "#B71D18",
      darker: "#7A0916",
      contrastText: "#FFFFFF"
    },
    grey: {
      50: "#FCFDFD",
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#1C252E",
      900: "#141A21"
    },
    common: {
      black: "#000000",
      white: "#FFFFFF"
    }
  }
};

// src/theme-port-phase1/core/palette.ts
function createPaletteChannel(hexPalette) {
  const channels = Object.fromEntries(
    Object.entries(hexPalette).filter((entry) => typeof entry[1] === "string").map(([key, hex]) => [`${key}Channel`, hexToChannel(hex)])
  );
  return { ...hexPalette, ...channels };
}
var primary = createPaletteChannel(themeConfig.palette.primary);
var secondary = createPaletteChannel(themeConfig.palette.secondary);
var info = createPaletteChannel(themeConfig.palette.info);
var success = createPaletteChannel(themeConfig.palette.success);
var warning = createPaletteChannel(themeConfig.palette.warning);
var error = createPaletteChannel(themeConfig.palette.error);
var common = createPaletteChannel(themeConfig.palette.common);
var grey = createPaletteChannel(themeConfig.palette.grey);
var text = {
  light: createPaletteChannel({ primary: grey[800], secondary: grey[600], disabled: grey[500] }),
  dark: createPaletteChannel({ primary: "#FFFFFF", secondary: grey[500], disabled: grey[600] })
};
var background = {
  light: createPaletteChannel({ paper: "#FFFFFF", default: "#FFFFFF", neutral: grey[200] }),
  dark: createPaletteChannel({ paper: grey[800], default: grey[900], neutral: "#28323D" })
};
var action = (mode) => ({
  active: mode === "light" ? grey[600] : grey[500],
  hover: channelAlpha(grey["500Channel"], 0.08),
  selected: channelAlpha(grey["500Channel"], 0.16),
  focus: channelAlpha(grey["500Channel"], 0.24),
  disabled: channelAlpha(grey["500Channel"], 0.8),
  disabledBackground: channelAlpha(grey["500Channel"], 0.24),
  hoverOpacity: 0.08,
  selectedOpacity: 0.08,
  focusOpacity: 0.12,
  activatedOpacity: 0.12,
  disabledOpacity: 0.48
});
var extendPalette = {
  shared: {
    inputUnderline: channelAlpha(grey["500Channel"], opacity.inputUnderline),
    inputOutlined: channelAlpha(grey["500Channel"], 0.2),
    paperOutlined: channelAlpha(grey["500Channel"], 0.16),
    buttonOutlined: channelAlpha(grey["500Channel"], 0.32)
  }
};
var basePalette = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  common,
  grey,
  divider: channelAlpha(grey["500Channel"], 0.2),
  TableCell: { border: channelAlpha(grey["500Channel"], 0.2) },
  ...extendPalette
};
var palette = {
  light: {
    ...basePalette,
    text: text.light,
    background: background.light,
    action: action("light")
  },
  dark: {
    ...basePalette,
    text: text.dark,
    background: background.dark,
    action: action("dark")
  }
};

// src/utils/theme/preset/theme-preset.ts
var GISELLE_PRIMARY_MAIN = "#2E7D32";
var GISELLE_PRIMARY_DARK_MAIN = "#76C442";
var GISELLE_SECONDARY_MAIN = "#F5A623";
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
        // The reference app's own grey scale (wiki#825) — shared between
        // light and dark schemes, same as the reference app's own theme.
        // Accordion's hover/expanded tints (and every other grey-based tint
        // in this library) are computed from `grey['500Channel']`; MUI's
        // stock grey (previously used here by default) is a visibly
        // different, warmer tone (`#9e9e9e`) than this cooler, bluer one
        // (`#919EAB`) — confirmed via a live computed-style comparison
        // against the reference app's own rendered divider colour. Already
        // carries every `*Channel` sibling (`50Channel`..`900Channel`), so
        // no separate cast or partial-object hack is needed here anymore.
        grey
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
        grey
      }
    }
  },
  // Only the accordion piece of `theme-port-phase1`'s Phase 1 theme port
  // (wiki#716) — a complete, previously-ported set of 19 component overrides
  // that has never been wired into this theme at all (see
  // `theme-port-phase1/core/components/index.ts`'s own `components` export,
  // which combines all 19; importing that here instead would activate 18
  // unrelated overrides — button, card, chip, etc. — well beyond this
  // ticket's scope). wiki#825 tracks only the accordion; the rest stay dead
  // pending their own tickets.
  //
  // `MuiPaper`'s own `defaultProps.elevation: 0` is the one exception: MUI's
  // `Accordion` is built on `Paper` internally and inherits its stock
  // elevation-1 shadow unless the theme says otherwise — confirmed via a
  // live computed-style comparison (Storybook showed a real box-shadow, the
  // reference app's own rendered accordion showed `none`). This is a real
  // structural dependency of the accordion fix, not a separate feature —
  // `docs/theme-override-classification.md` classified `paper.tsx` overall
  // as "needed-as-is" (every *direct* `<Paper>` usage it checked already
  // self-styles), which is accurate for those call sites but didn't account
  // for `Accordion` also being built on `Paper` internally — invisible to
  // that audit's own methodology (grepping direct `@mui/material/Paper`
  // imports). Deliberately not wiring `paper.tsx`'s `styleOverrides` here
  // too: that would also need `palette.shared.paperOutlined` (a token this
  // theme doesn't have either, and `ChartCardBase` already renders a real
  // `<Paper variant="outlined">` that would hit it) for a variant this
  // specific fix doesn't need.
  components: {
    ...accordion,
    MuiPaper: { defaultProps: { elevation: 0 } }
  },
  // The reference app's own theme sets this (see its create-theme.ts) — never
  // ported here, so every relative `borderRadius: N` sx value in this library
  // (accordion's own included) has been rendering at half the intended
  // roundedness this whole time: MUI's `sx` multiplies a bare `borderRadius`
  // number by `theme.shape.borderRadius`, and with this left unset it silently
  // fell back to MUI's own default of 4. Confirmed directly against a live
  // render of the reference app's FAQ accordion (wiki#825): 16px there,
  // 8px here, same `borderRadius: 2` sx in both. This affects every component
  // using relative border-radius, not just the accordion — a real, if
  // broader, correctness fix rather than scope creep for this ticket.
  shape: { borderRadius: 8 }
};
var giselleTheme = extendTheme(giselleThemeOptions);

// src/components/theming/theme-provider/giselle/giselle.tsx
import { useMemo } from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider, extendTheme as extendTheme2 } from "@mui/material/styles";

// src/utils/theme/layout-vars/layout-vars.ts
var LAYOUT_HEADER_MOBILE_HEIGHT_VAR = "--layout-header-mobile-height";
var LAYOUT_HEADER_DESKTOP_HEIGHT_VAR = "--layout-header-desktop-height";
var layoutHeaderHeightDefaults = {
  [LAYOUT_HEADER_MOBILE_HEIGHT_VAR]: "64px",
  [LAYOUT_HEADER_DESKTOP_HEIGHT_VAR]: "72px"
};

// src/components/theming/theme-provider/giselle/giselle.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function GiselleThemeProvider({
  children,
  themeOverrides,
  theme,
  defaultMode = "system"
}) {
  const resolvedTheme = useMemo(
    () => theme ?? (themeOverrides ? extendTheme2(giselleThemeOptions, themeOverrides) : giselleTheme),
    [theme, themeOverrides]
  );
  return /* @__PURE__ */ jsxs2(ThemeProvider, { theme: resolvedTheme, defaultMode, children: [
    /* @__PURE__ */ jsx2(GlobalStyles, { styles: { ":root": layoutHeaderHeightDefaults } }),
    children
  ] });
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
import { jsx as jsx3 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx3(
    GiselleSettingsContext.Provider,
    {
      value,
      children
    }
  );
}

// src/components/theming/settings-provider/theme-and-settings-provider/theme-and-settings-provider.tsx
import { Fragment } from "react";

// src/components/theming/settings-provider/theme-and-settings-provider/settings-theme-bridge/settings-theme-bridge.tsx
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

// src/components/theming/settings-provider/theme-and-settings-provider/theme-and-settings-provider.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx4(GiselleThemeProvider, { themeOverrides, theme, defaultMode, children: /* @__PURE__ */ jsx4(
    GiselleSettingsProvider,
    {
      defaultSettings,
      initialState,
      storageKey,
      storage,
      children: /* @__PURE__ */ jsxs3(Fragment, { children: [
        /* @__PURE__ */ jsx4(SettingsThemeBridge, { getMode }),
        children
      ] })
    }
  ) });
}

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
import { Icon } from "@iconify/react";
import Box2 from "@mui/material/Box";

// src/components/material/data-display/icon/giselle/giselle-icon.styles.ts
var giselleIconRootSx = (width, height) => ({
  lineHeight: 0,
  display: "inline-flex",
  flexShrink: 0,
  width,
  height
});

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx5(
    Box2,
    {
      component: "span",
      sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ jsx5(
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
import { jsx as jsx6 } from "react/jsx-runtime";
var StatusLabel = React.forwardRef(function StatusLabel2({ status, label, size = "small", sx, ...other }, ref) {
  const { color, label: defaultLabel } = STATUS_CONFIG[status];
  return /* @__PURE__ */ jsx6(
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

// src/components/material/data-display/selectable-label/selectable-label.tsx
import { forwardRef, useCallback as useCallback3 } from "react";
import Chip2 from "@mui/material/Chip";
import SvgIcon2 from "@mui/material/SvgIcon";

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
import { jsx as jsx7 } from "react/jsx-runtime";
var CHECK_ICON = /* @__PURE__ */ jsx7(SvgIcon2, { sx: selectableLabelIconSx, viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx7("path", { d: "M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.4-1.4z" }) });
var SelectableLabel = forwardRef(
  function SelectableLabel2({ selected, onSelectedChange, disabled, sx, ...other }, ref) {
    const handleClick = useCallback3(
      (e) => {
        if (disabled) return;
        e.stopPropagation();
        onSelectedChange?.(!selected);
      },
      [selected, disabled, onSelectedChange]
    );
    return /* @__PURE__ */ jsx7(
      Chip2,
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

// src/components/material/data-display/label/label.tsx
import React2 from "react";
import Box3 from "@mui/material/Box";

// src/components/material/data-display/label/label.const.ts
var LABEL_HEIGHT = 24;
var LABEL_FONT_SIZE = "0.75rem";
var LABEL_ICON_SIZE = 16;
var LABEL_ICON_GAP = 0.75;
var LABEL_DISABLED_OPACITY = 0.48;
var LABEL_SOFT_BACKGROUND_ALPHA = 0.16;

// src/components/material/data-display/label/label.styles.ts
var BASE_SX2 = {
  height: LABEL_HEIGHT,
  minWidth: LABEL_HEIGHT,
  lineHeight: `${LABEL_HEIGHT}px`,
  borderRadius: 0.75,
  cursor: "default",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  fontSize: LABEL_FONT_SIZE,
  fontWeight: 700,
  px: 1
};
function labelRootSx(variant, color) {
  return (theme) => {
    const vars = theme.vars;
    if (color === "default") {
      const greyChannel = "var(--mui-palette-grey-500Channel)";
      switch (variant) {
        case "filled":
          return { ...BASE_SX2, bgcolor: "grey.600", color: "common.white" };
        case "outlined":
          return {
            ...BASE_SX2,
            bgcolor: "transparent",
            border: "1px solid",
            borderColor: "grey.500",
            color: "text.secondary"
          };
        case "inverted":
          return { ...BASE_SX2, bgcolor: "text.primary", color: vars.palette.background.paper };
        case "soft":
        default:
          return {
            ...BASE_SX2,
            backgroundColor: channelAlpha(greyChannel, LABEL_SOFT_BACKGROUND_ALPHA),
            color: "text.secondary"
          };
      }
    }
    const paletteColor = vars.palette[color];
    switch (variant) {
      case "filled":
        return { ...BASE_SX2, bgcolor: `${color}.main`, color: paletteColor.contrastText };
      case "outlined":
        return {
          ...BASE_SX2,
          bgcolor: "transparent",
          border: "1px solid",
          borderColor: `${color}.main`,
          color: `${color}.main`
        };
      case "inverted":
        return { ...BASE_SX2, bgcolor: `${color}.dark`, color: paletteColor.contrastText };
      case "soft":
      default:
        return {
          ...BASE_SX2,
          backgroundColor: channelAlpha(paletteColor.mainChannel, LABEL_SOFT_BACKGROUND_ALPHA),
          color: `${color}.dark`
        };
    }
  };
}
var labelDisabledSx = {
  opacity: LABEL_DISABLED_OPACITY,
  pointerEvents: "none"
};
var labelIconPaddingSx = (side) => side === "start" ? { pl: 0.75 } : { pr: 0.75 };
var ICON_SLOT_BASE_SX = {
  width: LABEL_ICON_SIZE,
  height: LABEL_ICON_SIZE,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg, & img": { width: 1, height: 1, objectFit: "cover" }
};
var labelIconSlotSx = (side) => ({
  ...ICON_SLOT_BASE_SX,
  ...side === "start" ? { mr: LABEL_ICON_GAP } : { ml: LABEL_ICON_GAP }
});

// src/components/material/data-display/label/label.utils.ts
function capitalizeFirstLetter(value) {
  if (value.length === 0) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// src/components/material/data-display/label/label.tsx
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
var Label = React2.forwardRef(function Label2({
  children,
  color = "default",
  variant = "soft",
  disabled = false,
  startIcon,
  endIcon,
  sx,
  ...other
}, ref) {
  return /* @__PURE__ */ jsxs4(
    Box3,
    {
      ref,
      component: "span",
      sx: [
        labelRootSx(variant, color),
        ...disabled ? [labelDisabledSx] : [],
        ...startIcon ? [labelIconPaddingSx("start")] : [],
        ...endIcon ? [labelIconPaddingSx("end")] : [],
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: [
        startIcon && /* @__PURE__ */ jsx8(Box3, { component: "span", sx: labelIconSlotSx("start"), children: startIcon }),
        typeof children === "string" ? capitalizeFirstLetter(children) : children,
        endIcon && /* @__PURE__ */ jsx8(Box3, { component: "span", sx: labelIconSlotSx("end"), children: endIcon })
      ]
    }
  );
});
Label.displayName = "Label";

// src/components/material/surfaces/card/accordion/accordion.tsx
import { useId } from "react";
import Box4 from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import MuiAccordion2 from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

// src/components/material/input/toggle-icon-button/icon.tsx
import { useCallback as useCallback4 } from "react";
import IconButton from "@mui/material/IconButton";

// src/components/material/input/toggle-icon-button/icon.defaults.tsx
import SvgIcon3 from "@mui/material/SvgIcon";

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
import { jsx as jsx9 } from "react/jsx-runtime";
var DEFAULT_PRESSED_ICON = /* @__PURE__ */ jsx9(SvgIcon3, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx9("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
var DEFAULT_HOVER_ICON = /* @__PURE__ */ jsx9(SvgIcon3, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx9("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });

// src/components/material/input/toggle-icon-button/icon.tsx
import { jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs5(
    IconButton,
    {
      onClick: handleClick,
      "aria-pressed": pressed,
      size: "small",
      sx: [rootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        /* @__PURE__ */ jsx10("span", { className: "ti-idle", children: idleIcon }),
        /* @__PURE__ */ jsx10("span", { className: "ti-pressed", children: pressedIcon }),
        /* @__PURE__ */ jsx10("span", { className: "ti-hover", children: hoverIcon })
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
import { jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
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
  let leadingElement;
  if (checklist) {
    leadingElement = checkIcon === void 0 ? /* @__PURE__ */ jsx11(
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
    ) : /* @__PURE__ */ jsx11(
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
    leadingElement = /* @__PURE__ */ jsx11(Box4, { "aria-hidden": "true", sx: leadingIconSx, children: leadingIcon });
  } else {
    leadingElement = leadingAction;
  }
  const summaryContent = typeof title === "string" ? /* @__PURE__ */ jsx11(Typography, { component: "span", variant: "subtitle1", children: title }) : title;
  const accordionSummary = /* @__PURE__ */ jsxs6(
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
  return /* @__PURE__ */ jsxs6(MuiAccordion2, { sx: [accordionRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    hasLeadingElement ? /* @__PURE__ */ jsxs6(Box4, { sx: summaryRowSx, children: [
      leadingElement,
      accordionSummary
    ] }) : accordionSummary,
    /* @__PURE__ */ jsx11(AccordionDetails, { id: detailsId, children })
  ] });
}

// src/components/material/surfaces/card/accordion/accordion.const.ts
var ACCORDION_DONE_MIN_TOUCH_TARGET = 24;

// src/components/material/input/option-list/option-list.tsx
import React3 from "react";
import Box5 from "@mui/material/Box";
import Typography2 from "@mui/material/Typography";

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
import { jsx as jsx12 } from "react/jsx-runtime";
function SelectableCard({
  selected = false,
  disabled = false,
  children,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx12(
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

// src/components/material/input/option-list/option-list.utils.ts
function isValidHexColor(value) {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
}
function toSxArray(sx) {
  if (Array.isArray(sx)) return sx;
  return sx ? [sx] : [];
}

// src/components/material/input/option-list/option-list.styles.ts
var optionListRootSx = (columns) => () => ({
  display: "grid",
  gap: 1.5,
  gridTemplateColumns: `repeat(${columns}, 1fr)`
});
var optionListIconCardSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1
};
var optionListSwatchIconSx = (color) => (theme) => ({
  color: isValidHexColor(color) ? color : theme.vars.palette.grey[500]
});

// src/components/material/input/option-list/option-list.tsx
import { jsx as jsx13, jsxs as jsxs7 } from "react/jsx-runtime";
var OptionList = React3.forwardRef(function OptionList2({ options, value, onChange, columns = 3, sx }, ref) {
  return /* @__PURE__ */ jsx13(Box5, { ref, sx: [optionListRootSx(columns), ...Array.isArray(sx) ? sx : [sx]], children: options.map((option) => {
    const selected = option.id === value;
    if (option.kind === "swatch") {
      return /* @__PURE__ */ jsx13(
        SelectableCard,
        {
          selected,
          "aria-label": option.label,
          onClick: () => onChange(option.id),
          children: /* @__PURE__ */ jsx13(Box5, { component: "span", "aria-hidden": "true", sx: optionListSwatchIconSx(option.color), children: option.icon })
        },
        option.id
      );
    }
    if (option.kind === "icon") {
      return /* @__PURE__ */ jsxs7(
        SelectableCard,
        {
          selected,
          "aria-label": option.label,
          onClick: () => onChange(option.id),
          sx: [optionListIconCardSx, ...toSxArray(option.sx)],
          children: [
            /* @__PURE__ */ jsx13("span", { "aria-hidden": "true", children: option.icon }),
            !option.hideCaption && /* @__PURE__ */ jsx13(Typography2, { variant: "caption", children: option.label })
          ]
        },
        option.id
      );
    }
    return /* @__PURE__ */ jsx13(SelectableCard, { selected, onClick: () => onChange(option.id), children: /* @__PURE__ */ jsx13(Typography2, { variant: "body2", children: option.label }) }, option.id);
  }) });
});
OptionList.displayName = "OptionList";

// src/components/material/input/control-with-blurb/control-with-blurb.tsx
import React4, { useId as useId2 } from "react";
import Box6 from "@mui/material/Box";
import Typography3 from "@mui/material/Typography";

// src/components/material/input/control-with-blurb/control-with-blurb.styles.ts
var controlWithBlurbRootSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 0.5
};
var controlWithBlurbTextSx = (theme) => ({
  color: theme.vars.palette.text.secondary
});

// src/components/material/input/control-with-blurb/control-with-blurb.tsx
import { jsx as jsx14, jsxs as jsxs8 } from "react/jsx-runtime";
var ControlWithBlurb = React4.forwardRef(
  function ControlWithBlurb2({ children, blurb, sx, ...other }, ref) {
    const blurbId = useId2();
    return /* @__PURE__ */ jsxs8(
      Box6,
      {
        ref,
        role: "group",
        "aria-describedby": blurbId,
        sx: [controlWithBlurbRootSx, ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: [
          children,
          /* @__PURE__ */ jsx14(Typography3, { id: blurbId, variant: "caption", sx: controlWithBlurbTextSx, children: blurb })
        ]
      }
    );
  }
);
ControlWithBlurb.displayName = "ControlWithBlurb";

// src/components/material/input/toggle-card/toggle-card.tsx
import React5, { useCallback as useCallback5 } from "react";
import Box7 from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import SvgIcon4 from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import Typography4 from "@mui/material/Typography";

// src/components/material/input/toggle-card/toggle-card.styles.ts
var toggleCardColumnSx = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
  width: "100%"
};
var toggleCardTopRowSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%"
};
var toggleCardIconSx = () => (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: theme.vars.palette.text.primary
});
var toggleCardLabelRowSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 0.5,
  width: "100%",
  minWidth: 0
};
var toggleCardLabelTextSx = {
  flexGrow: 1,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};
var toggleCardInfoIconSx = () => (theme) => ({
  flexShrink: 0,
  fontSize: "1rem",
  color: theme.vars.palette.text.disabled,
  cursor: "help"
});
var toggleCardActionSx = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0
};
var toggleCardDefaultSwitchSx = {
  pointerEvents: "none"
};

// src/components/material/input/toggle-card/toggle-card.tsx
import { jsx as jsx15, jsxs as jsxs9 } from "react/jsx-runtime";
function InfoAffordanceIcon() {
  return /* @__PURE__ */ jsx15(
    SvgIcon4,
    {
      sx: toggleCardInfoIconSx(),
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      "data-testid": "toggle-card-info-icon",
      children: /* @__PURE__ */ jsx15("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" })
    }
  );
}
var ToggleCard = React5.forwardRef(function ToggleCard2({
  icon,
  label,
  selected = false,
  disabled,
  tooltip,
  action: action2,
  onClick,
  sx,
  ...other
}, ref) {
  const handleClick = useCallback5(
    (event) => {
      if (disabled) return;
      onClick?.(event);
    },
    [disabled, onClick]
  );
  return /* @__PURE__ */ jsx15(
    SelectableCard,
    {
      ref,
      selected,
      disabled,
      onClick: handleClick,
      sx,
      ...other,
      children: /* @__PURE__ */ jsxs9(Box7, { sx: toggleCardColumnSx, children: [
        /* @__PURE__ */ jsxs9(Box7, { sx: toggleCardTopRowSx, children: [
          /* @__PURE__ */ jsx15(Box7, { sx: toggleCardIconSx(), "aria-hidden": "true", children: icon }),
          /* @__PURE__ */ jsx15(Box7, { sx: toggleCardActionSx, children: action2 ?? /* @__PURE__ */ jsx15(
            Switch,
            {
              checked: selected,
              disabled,
              size: "small",
              tabIndex: -1,
              slotProps: {
                input: { "aria-hidden": true }
              },
              sx: toggleCardDefaultSwitchSx
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs9(Box7, { sx: toggleCardLabelRowSx, children: [
          /* @__PURE__ */ jsx15(Typography4, { variant: "subtitle2", sx: toggleCardLabelTextSx, children: label }),
          tooltip ? /* @__PURE__ */ jsx15(Tooltip, { title: tooltip, arrow: true, children: /* @__PURE__ */ jsx15("span", { tabIndex: 0, "aria-label": tooltip, children: /* @__PURE__ */ jsx15(InfoAffordanceIcon, {}) }) }) : null
        ] })
      ] })
    }
  );
});
ToggleCard.displayName = "ToggleCard";

// src/components/material/input/font-size-slider/font-size-slider.tsx
import { forwardRef as forwardRef2, useCallback as useCallback6 } from "react";
import Slider from "@mui/material/Slider";

// src/components/material/input/font-size-slider/font-size-slider.styles.ts
var rootSx2 = (theme) => ({
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: theme.vars.palette.action.disabledBackground
  },
  "& .MuiSlider-track": {
    border: "none",
    backgroundImage: `linear-gradient(90deg, ${theme.vars.palette.primary.light}, ${theme.vars.palette.primary.main})`
  },
  "& .MuiSlider-thumb": {
    backgroundColor: theme.vars.palette.primary.main,
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0 0 0 8px rgba(${theme.vars.palette.primary.mainChannel} / 0.16)`
    }
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: theme.vars.palette.primary.main
  }
});

// src/components/material/input/font-size-slider/font-size-slider.const.ts
var FONT_SIZE_SLIDER_DEFAULT_MIN = 12;
var FONT_SIZE_SLIDER_DEFAULT_MAX = 24;

// src/components/material/input/font-size-slider/font-size-slider.utils.ts
function formatValueLabel(value) {
  return `${value}px`;
}

// src/components/material/input/font-size-slider/font-size-slider.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
var FontSizeSlider = forwardRef2(function FontSizeSlider2({
  value,
  onChange,
  min = FONT_SIZE_SLIDER_DEFAULT_MIN,
  max = FONT_SIZE_SLIDER_DEFAULT_MAX,
  sx,
  ...other
}, ref) {
  const handleChange = useCallback6(
    (_event, newValue) => {
      onChange(Array.isArray(newValue) ? newValue[0] : newValue);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsx16(
    Slider,
    {
      ref,
      value,
      onChange: handleChange,
      min,
      max,
      valueLabelDisplay: "on",
      valueLabelFormat: formatValueLabel,
      sx: [rootSx2, ...Array.isArray(sx) ? sx : [sx]],
      ...other
    }
  );
});
FontSizeSlider.displayName = "FontSizeSlider";

// src/components/material/input/font-family-options/font-family-options.tsx
import { forwardRef as forwardRef3 } from "react";

// src/components/material/input/font-family-options/font-family-options.const.ts
var FONT_FAMILY_OPTIONS_VARIABLE_SUFFIX = " Variable";
var FONT_FAMILY_OPTIONS_FALLBACK_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
var FONT_FAMILY_OPTIONS_COLUMNS = 2;

// src/components/material/input/font-family-options/font-family-options.utils.ts
function stripVariableSuffix(fontFamily) {
  return fontFamily.endsWith(FONT_FAMILY_OPTIONS_VARIABLE_SUFFIX) ? fontFamily.slice(0, -FONT_FAMILY_OPTIONS_VARIABLE_SUFFIX.length) : fontFamily;
}
function buildFontFamilyValue(fontFamily) {
  return fontFamily ? `"${fontFamily}", ${FONT_FAMILY_OPTIONS_FALLBACK_STACK}` : FONT_FAMILY_OPTIONS_FALLBACK_STACK;
}

// src/components/material/input/font-family-options/font-family-options.styles.ts
var optionFontFamilySx = (fontFamily) => (theme) => ({
  py: 2,
  gap: 0.75,
  flexDirection: "column",
  fontFamily: buildFontFamilyValue(fontFamily),
  fontSize: theme.typography.pxToRem(12)
});

// src/components/material/input/font-family-options/font-family-options.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var FontFamilyOptions = forwardRef3(function FontFamilyOptions2({ options, icon, value, onChangeOption, sx }, ref) {
  const items = options.map((option) => ({
    id: option,
    kind: "icon",
    icon,
    label: stripVariableSuffix(option),
    sx: optionFontFamilySx(option)
  }));
  return /* @__PURE__ */ jsx17(
    OptionList,
    {
      ref,
      options: items,
      value,
      onChange: onChangeOption,
      columns: FONT_FAMILY_OPTIONS_COLUMNS,
      sx
    }
  );
});
FontFamilyOptions.displayName = "FontFamilyOptions";

// src/components/material/input/rhf-text-field/rhf-text-field.tsx
import React6 from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

// src/components/material/input/rhf-text-field/rhf-text-field.utils.ts
function isUsableNumberValue(value) {
  if (value == null) return false;
  return !(typeof value === "number" && Number.isNaN(value));
}
function transformValue(value, defaultValue = "") {
  return isUsableNumberValue(value) ? String(value) : defaultValue;
}
function transformValueOnChange(value) {
  const digitsAndDot = transformValue(value).replace(/[^\d.]/g, "");
  const firstDotIndex = digitsAndDot.indexOf(".");
  if (firstDotIndex === -1) {
    return digitsAndDot;
  }
  const wholePart = digitsAndDot.slice(0, firstDotIndex);
  const fractionalPart = digitsAndDot.slice(firstDotIndex + 1).replace(/\./g, "");
  return `${wholePart}.${fractionalPart}`;
}
function transformValueOnBlur(value, defaultValue = "") {
  if (!isUsableNumberValue(value)) {
    return defaultValue;
  }
  const parsed = parseFloat(String(value));
  return Number.isNaN(parsed) ? defaultValue : parsed;
}
function mergeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    }
  };
}

// src/components/material/input/rhf-text-field/rhf-text-field.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
var RHFTextField = React6.forwardRef(
  function RHFTextField2({ name, helperText, slotProps, type = "text", ...other }, ref) {
    const { control } = useFormContext();
    const isNumberType = type === "number";
    return /* @__PURE__ */ jsx18(
      Controller,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const handleChange = (event) => {
            field.onChange(
              isNumberType ? transformValueOnChange(event.target.value) : event.target.value
            );
          };
          const handleBlur = (event) => {
            if (isNumberType) {
              field.onChange(transformValueOnBlur(event.target.value));
            }
            field.onBlur();
          };
          return /* @__PURE__ */ jsx18(
            TextField,
            {
              ...field,
              ref: mergeRefs(ref, field.ref),
              fullWidth: true,
              value: isNumberType ? transformValue(field.value) : field.value,
              onChange: handleChange,
              onBlur: handleBlur,
              type: isNumberType ? "text" : type,
              error: !!error2,
              helperText: error2?.message ?? helperText,
              slotProps: {
                ...slotProps,
                htmlInput: {
                  ...slotProps?.htmlInput,
                  ...isNumberType && { inputMode: "decimal", pattern: "[0-9]*\\.?[0-9]*" },
                  // Disables autocomplete/autofill — see JSDoc above.
                  autoComplete: "new-password"
                }
              },
              ...other
            }
          );
        }
      }
    );
  }
);
RHFTextField.displayName = "RHFTextField";

// src/components/material/input/rhf-text-field/field.ts
var Field = {
  Text: RHFTextField
};

// src/components/material/input/form/form.tsx
import { FormProvider as RHFFormProvider } from "react-hook-form";
import { jsx as jsx19 } from "react/jsx-runtime";
function Form({
  children,
  onSubmit,
  methods
}) {
  return /* @__PURE__ */ jsx19(RHFFormProvider, { ...methods, children: /* @__PURE__ */ jsx19("form", { onSubmit, noValidate: true, autoComplete: "off", children }) });
}
Form.displayName = "Form";

// src/components/material/surfaces/card/metric/metric-card.tsx
import Box9 from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography5 from "@mui/material/Typography";

// src/components/material/surfaces/card/metric/metric-card.const.ts
var METRIC_CARD_ICON_BOX_SIZE = 36;

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
var metricCardValueSx = {
  typography: "h3"
};
var metricCardLabelSx = {
  color: "text.secondary"
};
var metricCardSublabelSx = {
  color: "text.disabled",
  mt: 0.25
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

// src/components/material/surfaces/card/metric/metric-card-decoration/metric-card-decoration.tsx
import React7 from "react";
import Box8 from "@mui/material/Box";

// src/components/material/surfaces/card/metric/metric-card-decoration/metric-card-decoration.const.ts
var METRIC_CARD_DECORATION_SIZE = 140;

// src/components/material/surfaces/card/metric/metric-card-decoration/metric-card-decoration.styles.ts
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

// src/components/material/surfaces/card/metric/metric-card-decoration/metric-card-decoration.tsx
import { jsx as jsx20 } from "react/jsx-runtime";
var MetricCardDecoration = React7.forwardRef(
  function MetricCardDecoration2({ color = "primary", sx, ...other }, ref) {
    return /* @__PURE__ */ jsx20(
      Box8,
      {
        ref,
        sx: [metricCardDecorationSx(color), ...Array.isArray(sx) ? sx : [sx]],
        ...other
      }
    );
  }
);
MetricCardDecoration.displayName = "MetricCardDecoration";

// src/components/material/surfaces/card/metric/metric-card.tsx
import { jsx as jsx21, jsxs as jsxs10 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs10(
    Paper,
    {
      elevation,
      sx: [metricCardPaperSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        decoration && /* @__PURE__ */ jsx21(Box9, { "aria-hidden": "true", sx: decorationOverlaySx, children: decoration }),
        /* @__PURE__ */ jsxs10(Box9, { sx: metricCardContentSx, children: [
          /* @__PURE__ */ jsx21(Box9, { sx: metricCardValueSx, children: value }),
          /* @__PURE__ */ jsx21(Typography5, { noWrap: true, variant: "subtitle2", component: "div", sx: metricCardLabelSx, children: label }),
          sublabel && /* @__PURE__ */ jsx21(Typography5, { noWrap: true, variant: "caption", component: "div", sx: metricCardSublabelSx, children: sublabel })
        ] }),
        icon && /* @__PURE__ */ jsx21(Box9, { "aria-hidden": "true", sx: metricCardIconBoxSx(color), children: icon })
      ]
    }
  );
}

// src/components/material/surfaces/card/quote/quote-card.tsx
import Box10 from "@mui/material/Box";
import Paper2 from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography6 from "@mui/material/Typography";

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
var quoteCardRowSlotSx = {
  display: "flex",
  gap: 2
};
var quoteCardTextSlotSx = {
  flex: 1,
  minWidth: 0
};
var quoteAttributionRowSlotSx = {
  mt: 2,
  color: "text.disabled",
  alignItems: "center"
};
var quoteAuthorSx = {
  fontWeight: "fontWeightMedium"
};
var quoteSeparatorSx = {
  opacity: 0.6
};
var quoteSourceSx = {
  opacity: 0.72
};
var quoteCardPaperSx = (color) => (theme) => ({
  p: 3,
  borderRadius: 2,
  bgcolor: `rgba(${theme.vars.palette[color]?.mainChannel} / 0.06)`,
  border: `1px solid rgba(${theme.vars.palette[color]?.mainChannel} / 0.12)`
});

// src/components/material/surfaces/card/quote/quote-card.tsx
import { jsx as jsx22, jsxs as jsxs11 } from "react/jsx-runtime";
function QuoteCard({
  quote,
  author,
  source,
  color = "primary",
  elevation = 0,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx22(
    Paper2,
    {
      elevation,
      sx: [quoteCardPaperSx(color), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ jsxs11(Box10, { sx: quoteCardRowSlotSx, children: [
        /* @__PURE__ */ jsx22(Typography6, { "aria-hidden": true, sx: quoteMarkSx(color), children: "\u201C" }),
        /* @__PURE__ */ jsxs11(Box10, { sx: quoteCardTextSlotSx, children: [
          /* @__PURE__ */ jsx22(Typography6, { variant: "body1", sx: quoteTextSx, children: quote }),
          (author || source) && /* @__PURE__ */ jsxs11(Stack, { direction: "row", spacing: 0.75, sx: quoteAttributionRowSlotSx, children: [
            author && /* @__PURE__ */ jsx22(Typography6, { variant: "caption", sx: quoteAuthorSx, children: author }),
            author && source && /* @__PURE__ */ jsx22(Typography6, { variant: "caption", "aria-hidden": true, sx: quoteSeparatorSx, children: "\xB7" }),
            source && /* @__PURE__ */ jsx22(Typography6, { variant: "caption", sx: quoteSourceSx, children: source })
          ] })
        ] })
      ] })
    }
  );
}

// src/components/material/surfaces/card/stat/stat-card.tsx
import Box11 from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography7 from "@mui/material/Typography";

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
var statCardLabelSx = {
  mb: 0.5
};
var trendLabelSx = {
  opacity: 0.72,
  ml: 0.5,
  fontWeight: 400
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

// src/components/material/surfaces/card/stat/stat-card-shape/stat-card-shape.tsx
import React8 from "react";
import { jsx as jsx23, jsxs as jsxs12 } from "react/jsx-runtime";
var StatCardShape = React8.forwardRef(
  function StatCardShape2(props, ref) {
    return /* @__PURE__ */ jsxs12(
      "svg",
      {
        ref,
        width: "120",
        height: "120",
        viewBox: "0 0 120 120",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: [
          /* @__PURE__ */ jsx23(
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
          /* @__PURE__ */ jsx23(
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
);
StatCardShape.displayName = "StatCardShape";

// src/components/material/surfaces/card/stat/stat-card.tsx
import { jsx as jsx24, jsxs as jsxs13 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs13(Card, { sx: [statCardRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ jsx24(Box11, { "aria-hidden": "true", sx: decorationSx, children: /* @__PURE__ */ jsx24(StatCardShape, {}) }),
    /* @__PURE__ */ jsx24(Box11, { sx: iconBoxSx, children: icon }),
    trend !== void 0 && /* @__PURE__ */ jsxs13(Box11, { sx: trendBoxSx, children: [
      /* @__PURE__ */ jsx24(GiselleIcon, { width: 20, icon: isUp ? "eva:trending-up-fill" : "eva:trending-down-fill" }),
      /* @__PURE__ */ jsxs13(Typography7, { component: "span", variant: "subtitle2", children: [
        isUp && "+",
        trend,
        "%"
      ] }),
      trendLabel && /* @__PURE__ */ jsx24(Typography7, { component: "span", variant: "caption", sx: trendLabelSx, children: trendLabel })
    ] }),
    /* @__PURE__ */ jsxs13(Box11, { sx: contentRowSx, children: [
      /* @__PURE__ */ jsxs13(Box11, { sx: labelsBoxSx, children: [
        /* @__PURE__ */ jsx24(Typography7, { variant: "subtitle2", sx: statCardLabelSx, children: label }),
        /* @__PURE__ */ jsx24(Typography7, { variant: "h4", children: value })
      ] }),
      chart
    ] })
  ] });
}

// src/components/material/surfaces/card/stat-row/stat-card-row.tsx
import Grid from "@mui/material/Grid";
import { jsx as jsx25 } from "react/jsx-runtime";
function StatCardRow({ items, renderChart, sx, ...other }) {
  return /* @__PURE__ */ jsx25(Grid, { container: true, spacing: 3, sx: [...Array.isArray(sx) ? sx : [sx]], ...other, children: items.map((item) => /* @__PURE__ */ jsx25(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ jsx25(
    StatCard,
    {
      label: item.label,
      value: item.value,
      trend: item.trend,
      trendLabel: item.trendLabel,
      color: item.color,
      icon: /* @__PURE__ */ jsx25(GiselleIcon, { icon: item.iconId, width: 28 }),
      chart: renderChart?.(item)
    }
  ) }, item.label)) });
}

// src/components/material/surfaces/card/profile-summary/profile-summary-card.tsx
import Paper3 from "@mui/material/Paper";
import Box12 from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography8 from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// src/components/material/surfaces/card/profile-summary/profile-summary-card.styles.ts
var profileSummaryCardPaperSx = {
  p: 3,
  textAlign: "center"
};
var avatarSx = {
  width: 64,
  height: 64,
  mx: "auto",
  mb: 2
};
var roleSx = {
  mb: 2
};
var statsRowSlotSx = {
  display: "flex",
  justifyContent: "center"
};
var statCellSlotSx = {
  px: 2
};

// src/components/material/surfaces/card/profile-summary/profile-summary-card.tsx
import { jsx as jsx26, jsxs as jsxs14 } from "react/jsx-runtime";
function ProfileSummaryCard({
  name,
  role,
  avatarSrc,
  stats,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsxs14(Paper3, { sx: [profileSummaryCardPaperSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ jsx26(Avatar, { src: avatarSrc, alt: name, sx: avatarSx, children: name[0] }),
    /* @__PURE__ */ jsx26(Typography8, { variant: "h6", children: name }),
    role && /* @__PURE__ */ jsx26(Typography8, { variant: "body2", color: "text.secondary", sx: roleSx, children: role }),
    /* @__PURE__ */ jsx26(Box12, { sx: statsRowSlotSx, children: stats.map((stat, index) => /* @__PURE__ */ jsxs14(Box12, { children: [
      index > 0 && /* @__PURE__ */ jsx26(Divider, { orientation: "vertical", flexItem: true }),
      /* @__PURE__ */ jsxs14(Box12, { sx: statCellSlotSx, children: [
        /* @__PURE__ */ jsx26(Typography8, { variant: "subtitle1", children: stat.value }),
        /* @__PURE__ */ jsx26(Typography8, { variant: "caption", color: "text.secondary", children: stat.label })
      ] })
    ] }, stat.label)) })
  ] });
}

// src/utils/hooks/use-nested-checklist/use-nested-checklist.ts
import { useCallback as useCallback7, useMemo as useMemo3, useState as useState3 } from "react";
function useNestedChecklist(initialParentDone, initialChildrenDone) {
  const [parentDone, setParentDone] = useState3(initialParentDone);
  const [childrenDone, setChildrenDone] = useState3(initialChildrenDone);
  const indeterminate = useMemo3(
    () => childrenDone.some(Boolean) && !childrenDone.every(Boolean),
    [childrenDone]
  );
  const toggleParent = useCallback7(() => {
    const next = !parentDone;
    setParentDone(next);
    setChildrenDone((prev) => prev.map(() => next));
  }, [parentDone]);
  const toggleChild = useCallback7((index) => {
    setChildrenDone((prev) => {
      const next = prev.map((v, i) => i === index ? !v : v);
      setParentDone(next.every(Boolean));
      return next;
    });
  }, []);
  return { parentDone, indeterminate, childrenDone, toggleParent, toggleChild };
}

// src/components/material/data-display/icon/action-bar/icon-action-bar.tsx
import Box13 from "@mui/material/Box";
import Tooltip2 from "@mui/material/Tooltip";
import IconButton2 from "@mui/material/IconButton";

// src/components/material/data-display/icon/action-bar/icon-action-bar.styles.ts
var iconActionBarRootSx = {
  gap: 1,
  width: 1,
  flexGrow: 1,
  display: "flex"
};

// src/components/material/data-display/icon/action-bar/icon-action-bar.defaults.tsx
import { jsx as jsx27 } from "react/jsx-runtime";
var DEFAULT_ICON_ACTIONS = [
  { tooltip: "Edit", icon: /* @__PURE__ */ jsx27(GiselleIcon, { icon: "solar:pen-bold" }) },
  { tooltip: "View", icon: /* @__PURE__ */ jsx27(GiselleIcon, { icon: "solar:eye-bold" }) },
  {
    tooltip: "Print",
    icon: /* @__PURE__ */ jsx27(GiselleIcon, { icon: "solar:printer-minimalistic-bold" })
  },
  { tooltip: "Send", icon: /* @__PURE__ */ jsx27(GiselleIcon, { icon: "mdi:email" }) },
  { tooltip: "Share", icon: /* @__PURE__ */ jsx27(GiselleIcon, { icon: "solar:share-bold" }) }
];

// src/components/material/data-display/icon/action-bar/icon-action-bar.tsx
import { jsx as jsx28 } from "react/jsx-runtime";
function IconActionBar({
  actions = DEFAULT_ICON_ACTIONS,
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx28(Box13, { sx: [iconActionBarRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: actions.map((item, index) => {
    const label = item["aria-label"] ?? item.tooltip;
    const buttonProps = {
      onClick: item.onClick,
      disabled: item.disabled,
      "aria-label": label,
      ...item.component !== void 0 && { component: item.component },
      ...item.href !== void 0 && { href: item.href }
    };
    return /* @__PURE__ */ jsx28(
      Tooltip2,
      {
        title: item.tooltip,
        placement: item.tooltipPlacement ?? "bottom",
        children: /* @__PURE__ */ jsx28("span", { children: /* @__PURE__ */ jsx28(IconButton2, { ...buttonProps, children: item.icon }) })
      },
      `${item.tooltip}-${index}`
    );
  }) });
}

// src/components/material/layout/showcase-row/two-column-showcase-row.tsx
import Box14 from "@mui/material/Box";
import Grid2 from "@mui/material/Grid";
import Stack2 from "@mui/material/Stack";
import Typography9 from "@mui/material/Typography";

// src/components/material/layout/showcase-row/two-column-showcase-row.styles.ts
var showcaseRowRootSx = (orientation) => ({
  flexDirection: { xs: "column", md: orientation }
});
var textColumnSx = {
  maxWidth: 520
};
var overlineSx = {
  color: "text.secondary"
};
var controlsGridItemSx = {
  minWidth: 0
};
var controlsStackSx = (controlsAlign) => ({
  alignItems: controlsAlign,
  width: 1,
  minWidth: 0
});
var controlsSlotSx = {
  width: 1,
  minWidth: 0
};

// src/components/material/layout/showcase-row/two-column-showcase-row.tsx
import { jsx as jsx29, jsxs as jsxs15 } from "react/jsx-runtime";
function TwoColumnShowcaseRow({
  text: text2,
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
  return /* @__PURE__ */ jsxs15(
    Grid2,
    {
      container: true,
      columnSpacing: isVertical ? 0 : { xs: 0, md: 6 },
      rowSpacing: { xs: 4, md: isVertical ? 4 : 0 },
      sx: [showcaseRowRootSx(orientation), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        text2 && /* @__PURE__ */ jsx29(Grid2, { size: itemSize, children: /* @__PURE__ */ jsxs15(Stack2, { spacing: 2, sx: [textColumnSx, ...Array.isArray(textSx) ? textSx : [textSx]], children: [
          text2.overline && /* @__PURE__ */ jsx29(Typography9, { variant: "overline", sx: overlineSx, children: text2.overline }),
          text2.heading && /* @__PURE__ */ jsx29(Typography9, { variant: "h4", children: text2.heading }),
          text2.description && /* @__PURE__ */ jsx29(Typography9, { variant: "body1", color: "text.secondary", children: text2.description })
        ] }) }),
        /* @__PURE__ */ jsx29(Grid2, { size: itemSize, sx: controlsGridItemSx, children: /* @__PURE__ */ jsx29(
          Stack2,
          {
            spacing: 2,
            sx: [
              controlsStackSx(controlsAlign),
              ...Array.isArray(controlsSx) ? controlsSx : [controlsSx]
            ],
            children: /* @__PURE__ */ jsx29(Box14, { sx: controlsSlotSx, children: controls })
          }
        ) })
      ]
    }
  );
}

// src/components/material/layout/section-title/section-title.tsx
import Box16 from "@mui/material/Box";
import Typography10 from "@mui/material/Typography";

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
var sectionTitleRootSx = {
  gap: 3,
  display: "flex",
  flexDirection: "column"
};
var sectionTitleDescriptionSx = {
  color: "text.secondary",
  typography: "body1"
};

// src/components/material/layout/section-title/section-caption/section-caption.tsx
import React9 from "react";
import Box15 from "@mui/material/Box";

// src/components/material/layout/section-title/section-caption/section-caption.styles.ts
var sectionCaptionSx = {
  typography: "overline",
  color: "text.disabled"
};

// src/components/material/layout/section-title/section-caption/section-caption.tsx
import { jsx as jsx30 } from "react/jsx-runtime";
var SectionCaption = React9.forwardRef(
  function SectionCaption2({ title, sx, ...other }, ref) {
    return /* @__PURE__ */ jsx30(
      Box15,
      {
        ref,
        component: "span",
        sx: [sectionCaptionSx, ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: title
      }
    );
  }
);
SectionCaption.displayName = "SectionCaption";

// src/components/material/layout/section-title/section-title.tsx
import { jsx as jsx31, jsxs as jsxs16 } from "react/jsx-runtime";
function SectionTitle({
  sx,
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  titleComponent = "h2",
  titleVariant = "h2",
  ...other
}) {
  return /* @__PURE__ */ jsxs16(Box16, { sx: [sectionTitleRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    caption && /* @__PURE__ */ jsx31(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
    /* @__PURE__ */ jsxs16(Typography10, { component: titleComponent, variant: titleVariant, sx: slotProps?.title?.sx, children: [
      title,
      " ",
      txtGradient && /* @__PURE__ */ jsx31(Box16, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
    ] }),
    description && /* @__PURE__ */ jsx31(
      Box16,
      {
        sx: [
          sectionTitleDescriptionSx,
          ...Array.isArray(slotProps?.description?.sx) ? slotProps.description.sx : [slotProps?.description?.sx]
        ],
        children: description
      }
    )
  ] });
}

// src/components/material/layout/section-container/section-container.tsx
import Container from "@mui/material/Container";

// src/components/material/layout/section-container/section-container.styles.ts
var sectionContainerSx = (py) => ({
  py
});

// src/components/material/layout/section-container/section-container.tsx
import { jsx as jsx32 } from "react/jsx-runtime";
function SectionContainer({
  children,
  maxWidth = "lg",
  py = { xs: 8, md: 12 },
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx32(
    Container,
    {
      maxWidth,
      sx: [sectionContainerSx(py), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children
    }
  );
}

// src/components/material/layout/page-section/page-section.tsx
import React10 from "react";
import Box17 from "@mui/material/Box";

// src/components/material/layout/page-section/page-section.styles.ts
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
var pageSectionRootSx = {
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

// src/components/material/layout/page-section/page-section.tsx
import { jsx as jsx33, jsxs as jsxs17 } from "react/jsx-runtime";
function Decoration({ kind, vertical, sx }) {
  switch (kind) {
    case "corner-plus":
      return /* @__PURE__ */ jsx33(
        Box17,
        {
          "aria-hidden": "true",
          sx: [cornerPlusSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsx33("path", { d: "M8 0V16M16 8H0", stroke: "currentColor" })
        }
      );
    case "corner-x":
      return /* @__PURE__ */ jsx33(
        Box17,
        {
          "aria-hidden": "true",
          sx: [cornerXSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsx33(
            "path",
            {
              d: "M14 2L7.96685 8.03315M7.96685 8.03315L2.0663 13.9337M7.96685 8.03315L13.9337 14M7.96685 8.03315L2 2.0663",
              stroke: "currentColor"
            }
          )
        }
      );
    case "border-line":
      return /* @__PURE__ */ jsx33(Box17, { "aria-hidden": "true", sx: [borderLineSx(vertical), ...Array.isArray(sx) ? sx : [sx]] });
    case "triangle-left":
      return /* @__PURE__ */ jsx33(
        Box17,
        {
          "aria-hidden": "true",
          sx: [triangleLeftSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 10 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsx33("path", { d: "M10 10L8.74228e-07 20L0 0L10 10Z", fill: "currentColor" })
        }
      );
    case "triangle-down":
      return /* @__PURE__ */ jsx33(
        Box17,
        {
          "aria-hidden": "true",
          sx: [triangleDownSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 20 10",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsx33("path", { d: "M10 10L0 0H20L10 10Z", fill: "currentColor" })
        }
      );
    case "dot":
      return /* @__PURE__ */ jsx33(Box17, { "aria-hidden": "true", sx: [dotSx, ...Array.isArray(sx) ? sx : [sx]] });
  }
}
function resolveDecoration(decoration) {
  if (decoration === true) return CANONICAL_FRAME;
  if (decoration === false) return [];
  return decoration;
}
var PageSection = React10.forwardRef(function PageSection2({
  children,
  decoration = true,
  containerMaxWidth,
  containerPy,
  containerSx,
  containerComponent,
  unconstrainedChildren,
  sx,
  ...other
}, ref) {
  const elements = resolveDecoration(decoration);
  return /* @__PURE__ */ jsxs17(
    Box17,
    {
      ref,
      component: "section",
      sx: [pageSectionRootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        elements.map((element, index) => /* @__PURE__ */ jsx33(Decoration, { ...element }, index)),
        /* @__PURE__ */ jsx33(
          SectionContainer,
          {
            maxWidth: containerMaxWidth,
            py: containerPy,
            sx: containerSx,
            component: containerComponent,
            children
          }
        ),
        unconstrainedChildren
      ]
    }
  );
});
PageSection.displayName = "PageSection";

// src/components/material/layout/app-shell/app-shell.tsx
import React11 from "react";
import AppBar from "@mui/material/AppBar";
import Box18 from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography11 from "@mui/material/Typography";

// src/components/material/layout/app-shell/app-shell.styles.ts
var appShellRootSx = {
  minHeight: "100vh"
};
var appShellAppBarSx = {
  borderBottom: 1,
  borderColor: "divider"
};
var appShellToolbarSx = {
  justifyContent: "space-between"
};
var appShellActionsSx = {
  display: "flex",
  alignItems: "center",
  gap: 2
};

// src/components/material/layout/app-shell/app-shell.tsx
import { jsx as jsx34, jsxs as jsxs18 } from "react/jsx-runtime";
var AppShell = React11.forwardRef(function AppShell2({ title, actions, children, containerMaxWidth = "lg", sx, ...other }, ref) {
  return /* @__PURE__ */ jsxs18(Box18, { ref, sx: [appShellRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ jsx34(AppBar, { position: "static", color: "transparent", elevation: 0, sx: appShellAppBarSx, children: /* @__PURE__ */ jsxs18(Toolbar, { sx: appShellToolbarSx, children: [
      title && /* @__PURE__ */ jsx34(Typography11, { variant: "h6", component: "span", children: title }),
      actions && /* @__PURE__ */ jsx34(Box18, { sx: appShellActionsSx, children: actions })
    ] }) }),
    /* @__PURE__ */ jsx34(SectionContainer, { maxWidth: containerMaxWidth, children })
  ] });
});
AppShell.displayName = "AppShell";

// src/components/material/navigation/public-nav/public-nav.tsx
import React16 from "react";
import AppBar2 from "@mui/material/AppBar";
import Box19 from "@mui/material/Box";
import Toolbar2 from "@mui/material/Toolbar";
import { useColorScheme as useColorScheme2 } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";

// src/components/material/navigation/public-nav/public-nav.const.ts
var DEFAULT_NAV_BREAKPOINT = "md";
var SCROLLED_ELEVATION = 4;
var SCROLLED_BACKDROP_BLUR_PX = 8;
var DEFAULT_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

// src/components/material/navigation/public-nav/public-nav.styles.ts
import { alpha } from "@mui/material/styles";
var publicNavRootSx = {
  borderBottom: 1,
  borderColor: "divider"
};
var scrolledSurfaceSx = (theme) => ({
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  backdropFilter: `blur(${SCROLLED_BACKDROP_BLUR_PX}px)`,
  WebkitBackdropFilter: `blur(${SCROLLED_BACKDROP_BLUR_PX}px)`
});
var publicNavToolbarSx = (breakpoint) => (theme) => ({
  minHeight: `var(${LAYOUT_HEADER_MOBILE_HEIGHT_VAR})`,
  [theme.breakpoints.up(breakpoint)]: {
    minHeight: `var(${LAYOUT_HEADER_DESKTOP_HEIGHT_VAR})`
  }
});
var publicNavContainerSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  width: "100%"
};
var navStartSlotSx = {
  display: "flex",
  alignItems: "center",
  gap: 1
};
var mobileNavSlotSx = (breakpoint) => (theme) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up(breakpoint)]: { display: "none" }
});
var desktopNavSlotSx = (breakpoint) => (theme) => ({
  display: "none",
  [theme.breakpoints.up(breakpoint)]: { display: "flex" }
});
var actionsSlotSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5
};
var mobileDrawerBodySx = {
  display: "flex",
  flexDirection: "column",
  gap: 3
};

// src/components/material/navigation/public-nav/public-nav.utils.ts
function resolveColorMode(controlledMode, systemMode) {
  if (controlledMode) return controlledMode;
  return systemMode === "dark" ? "dark" : "light";
}

// src/components/material/navigation/public-nav/logo/logo.tsx
import React13 from "react";

// src/components/material/data-display/brand-logo/brand-logo.tsx
import React12, { useId as useId3 } from "react";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";

// src/components/material/data-display/brand-logo/brand-logo.styles.ts
var brandLogoRootSx = {
  flexShrink: 0,
  color: "transparent",
  display: "inline-flex",
  verticalAlign: "middle"
};
var brandLogoSizeSx = (disabled) => ({
  width: 40,
  height: 40,
  ...disabled && { pointerEvents: "none" }
});

// src/components/material/data-display/brand-logo/brand-logo.tsx
import { jsx as jsx35 } from "react/jsx-runtime";
var BrandLogo = React12.forwardRef(function BrandLogo2({ children, disabled, href = "/", sx, ...other }, ref) {
  const theme = useTheme();
  const uniqueId = useId3();
  const colors = {
    light: theme.vars.palette.primary.light,
    main: theme.vars.palette.primary.main,
    dark: theme.vars.palette.primary.dark
  };
  const getGradientId = (name) => `${uniqueId}-${name}`;
  return /* @__PURE__ */ jsx35(
    Link,
    {
      ref,
      href,
      "aria-label": "Logo",
      underline: "none",
      sx: [brandLogoRootSx, brandLogoSizeSx(disabled), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: children({ colors, getGradientId })
    }
  );
});
BrandLogo.displayName = "BrandLogo";

// src/components/material/data-display/brand-logo/brand-logo.defaults.tsx
import { jsx as jsx36, jsxs as jsxs19 } from "react/jsx-runtime";
function AlexRebulaBrandMark({ colors, getGradientId }) {
  const gradient1 = getGradientId("alex-rebula-1");
  const gradient2 = getGradientId("alex-rebula-2");
  return /* @__PURE__ */ jsxs19(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 294 384",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxs19("defs", { children: [
          /* @__PURE__ */ jsxs19(
            "linearGradient",
            {
              id: gradient1,
              x1: "-3.50005",
              y1: "372.769",
              x2: "202",
              y2: "166.769",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx36("stop", { stopColor: colors.dark }),
                /* @__PURE__ */ jsx36("stop", { offset: "1", stopColor: colors.light })
              ]
            }
          ),
          /* @__PURE__ */ jsxs19(
            "linearGradient",
            {
              id: gradient2,
              x1: "-3.50005",
              y1: "372.769",
              x2: "202",
              y2: "166.769",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx36("stop", { stopColor: colors.dark }),
                /* @__PURE__ */ jsx36("stop", { offset: "1", stopColor: colors.light })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx36(
          "path",
          {
            d: "M71.0504 182C107.159 109.5 198.206 112.5 198.206 112.5C194.956 101.718 191.534 91.1656 188.506 82.5848C178.228 53.9963 166.547 31.0269 148.5 1C147.822 1.24398 146.985 2.00682 146.009 3.2315C142.417 8.66295 134.446 22.8769 118.991 59.2426C96.1984 113.656 71.0504 182 71.0504 182Z",
            fill: `url(#${gradient1})`
          }
        ),
        /* @__PURE__ */ jsx36(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M146.009 3.2315C147.797 0.526977 148.5 0 148.5 0C149.844 2.31139 151.172 4.57636 152.486 6.81853L152.492 6.82759C164.727 27.7002 175.805 46.5994 188.506 82.5848C178.228 53.9963 166.547 31.0269 148.5 1C147.822 1.24398 146.985 2.00682 146.009 3.2315ZM146.009 3.2315C142.417 8.66295 134.446 22.8769 118.991 59.2426C130.179 32.5337 140.4 10.2652 146.009 3.2315ZM198.206 112.5C194.956 101.718 191.534 91.1656 188.506 82.5848C191.726 91.5417 195.109 102.05 198.206 112.5ZM200.71 121C171.5 121 154 130 154 130L187.5 227C187.5 227 220.5 222.5 228 206.5L200.71 121ZM59.7128 213C42.9788 259.153 23.2404 315.272 0 383.5C0 383.5 74 295.5 204.5 279.5L232 361L284 361.5L250.676 264.164C250.676 264.164 299.5 242 292.5 189.5C292.5 189.5 287 132 215.5 121L232 172C232 172 259.5 182 248 210C248 210 242 220 232.224 227C232.224 227 219 236.5 191.5 241C191.5 241 128.5 249.5 85.5 274.5L138.5 135C138.5 135 98.2128 148 59.7128 213Z",
            fill: `url(#${gradient2})`
          }
        )
      ]
    }
  );
}

// src/components/material/navigation/public-nav/logo/logo.tsx
import { jsx as jsx37 } from "react/jsx-runtime";
var Logo = React13.forwardRef(function Logo2({ href = "/", ...other }, ref) {
  return /* @__PURE__ */ jsx37(BrandLogo, { ref, href, ...other, children: AlexRebulaBrandMark });
});
Logo.displayName = "Logo";

// src/components/material/navigation/public-nav/nav-links/nav-links.tsx
import React14 from "react";
import Link2 from "@mui/material/Link";
import Stack3 from "@mui/material/Stack";

// src/components/material/navigation/public-nav/nav-links/nav-links.styles.ts
var navLinksRootSx = (orientation) => ({
  alignItems: orientation === "horizontal" ? "center" : "flex-start",
  flexWrap: orientation === "horizontal" ? "wrap" : "nowrap"
});
var navLinkSx = {
  color: "text.primary",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  "&:hover, &:focus-visible": {
    color: "primary.main"
  }
};

// src/components/material/navigation/public-nav/nav-links/nav-links.tsx
import { jsx as jsx38 } from "react/jsx-runtime";
var NavLinks = React14.forwardRef(function NavLinks2({ items, orientation = "horizontal", onNavigate, sx, ...other }, ref) {
  return /* @__PURE__ */ jsx38(
    Stack3,
    {
      ref,
      component: "nav",
      "aria-label": "Main",
      direction: orientation === "horizontal" ? "row" : "column",
      spacing: orientation === "horizontal" ? 3 : 2,
      sx: [navLinksRootSx(orientation), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: items.map((item) => /* @__PURE__ */ jsx38(
        Link2,
        {
          href: item.href,
          underline: "none",
          sx: navLinkSx,
          onClick: onNavigate ? () => onNavigate(item.href) : void 0,
          children: item.label
        },
        item.href
      ))
    }
  );
});
NavLinks.displayName = "NavLinks";

// src/components/material/navigation/public-nav/nav-mobile-menu/nav-mobile-menu.tsx
import { useCallback as useCallback8, useState as useState4 } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton3 from "@mui/material/IconButton";

// src/components/material/navigation/public-nav/nav-mobile-menu/nav-mobile-menu.const.ts
var MOBILE_DRAWER_WIDTH = 280;

// src/components/material/navigation/public-nav/nav-mobile-menu/nav-mobile-menu.styles.ts
var drawerPaperSx = {
  width: MOBILE_DRAWER_WIDTH,
  maxWidth: "100%",
  p: 3,
  display: "flex",
  flexDirection: "column",
  gap: 3
};

// src/components/material/navigation/public-nav/nav-mobile-menu/nav-mobile-menu.tsx
import { Fragment as Fragment2, jsx as jsx39, jsxs as jsxs20 } from "react/jsx-runtime";
function NavMobileMenu({
  children,
  menuButtonLabel = "Open menu",
  ...other
}) {
  const [open, setOpen] = useState4(false);
  const handleOpen = useCallback8(() => setOpen(true), []);
  const handleClose = useCallback8(() => setOpen(false), []);
  return /* @__PURE__ */ jsxs20(Fragment2, { children: [
    /* @__PURE__ */ jsx39(IconButton3, { onClick: handleOpen, "aria-label": menuButtonLabel, ...other, children: /* @__PURE__ */ jsx39(GiselleIcon, { icon: "solar:hamburger-menu-broken", width: 24 }) }),
    /* @__PURE__ */ jsx39(
      Drawer,
      {
        anchor: "right",
        open,
        onClose: handleClose,
        slotProps: { paper: { sx: drawerPaperSx } },
        children
      }
    )
  ] });
}
NavMobileMenu.displayName = "NavMobileMenu";

// src/components/material/navigation/public-nav/sign-in-button/sign-in-button.tsx
import React15 from "react";
import Button from "@mui/material/Button";
import { jsx as jsx40 } from "react/jsx-runtime";
var SignInButton = React15.forwardRef(
  function SignInButton2({ label = "Sign in", variant = "outlined", color = "inherit", size = "small", ...other }, ref) {
    return /* @__PURE__ */ jsx40(Button, { ref, variant, color, size, ...other, children: label });
  }
);
SignInButton.displayName = "SignInButton";

// src/components/material/navigation/public-nav/theme-toggle-button/theme-toggle-button.tsx
import { jsx as jsx41 } from "react/jsx-runtime";
function ThemeToggleButton({ mode, onModeChange, ...other }) {
  const isDark = mode === "dark";
  return /* @__PURE__ */ jsx41(
    ToggleIconButton,
    {
      pressed: isDark,
      idleIcon: /* @__PURE__ */ jsx41(GiselleIcon, { icon: "solar:sun-2-bold-duotone", width: 20 }),
      pressedIcon: /* @__PURE__ */ jsx41(GiselleIcon, { icon: "solar:moon-bold-duotone", width: 20 }),
      hoverIcon: /* @__PURE__ */ jsx41(
        GiselleIcon,
        {
          icon: isDark ? "solar:sun-2-bold-duotone" : "solar:moon-bold-duotone",
          width: 20
        }
      ),
      onPressedChange: (nextPressed) => onModeChange(nextPressed ? "dark" : "light"),
      "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
      ...other
    }
  );
}
ThemeToggleButton.displayName = "ThemeToggleButton";

// src/components/material/navigation/public-nav/public-nav.tsx
import { jsx as jsx42, jsxs as jsxs21 } from "react/jsx-runtime";
var PublicNav = React16.forwardRef(function PublicNav2({
  logo,
  navItems = DEFAULT_NAV_ITEMS,
  colorMode,
  onColorModeChange,
  signInLabel,
  onSignInClick,
  signInHref,
  navBreakpoint = DEFAULT_NAV_BREAKPOINT,
  sx,
  ...other
}, ref) {
  const { mode: systemMode, setMode: setSystemMode } = useColorScheme2();
  const resolvedMode = resolveColorMode(colorMode, systemMode);
  const resolvedLogo = logo ?? /* @__PURE__ */ jsx42(Logo, {});
  const isScrolled = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const handleModeChange = (nextMode) => {
    onColorModeChange?.(nextMode);
    if (!colorMode) setSystemMode(nextMode);
  };
  return /* @__PURE__ */ jsx42(
    AppBar2,
    {
      ref,
      position: "static",
      color: "transparent",
      elevation: isScrolled ? SCROLLED_ELEVATION : 0,
      sx: [publicNavRootSx, isScrolled && scrolledSurfaceSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ jsx42(Toolbar2, { disableGutters: true, sx: publicNavToolbarSx(navBreakpoint), children: /* @__PURE__ */ jsxs21(SectionContainer, { py: 0, sx: publicNavContainerSx, children: [
        /* @__PURE__ */ jsxs21(Box19, { sx: navStartSlotSx, children: [
          /* @__PURE__ */ jsx42(Box19, { sx: mobileNavSlotSx(navBreakpoint), children: /* @__PURE__ */ jsx42(NavMobileMenu, { children: /* @__PURE__ */ jsxs21(Box19, { sx: mobileDrawerBodySx, children: [
            resolvedLogo,
            /* @__PURE__ */ jsx42(NavLinks, { items: navItems, orientation: "vertical" })
          ] }) }) }),
          resolvedLogo
        ] }),
        /* @__PURE__ */ jsxs21(Box19, { sx: actionsSlotSx, children: [
          /* @__PURE__ */ jsx42(Box19, { sx: desktopNavSlotSx(navBreakpoint), children: /* @__PURE__ */ jsx42(NavLinks, { items: navItems, orientation: "horizontal" }) }),
          /* @__PURE__ */ jsx42(ThemeToggleButton, { mode: resolvedMode, onModeChange: handleModeChange }),
          /* @__PURE__ */ jsx42(SignInButton, { label: signInLabel, onClick: onSignInClick, href: signInHref })
        ] })
      ] }) })
    }
  );
});
PublicNav.displayName = "PublicNav";

// src/components/material/navigation/public-footer/public-footer.tsx
import React17 from "react";
import Box20 from "@mui/material/Box";
import Link3 from "@mui/material/Link";
import Typography12 from "@mui/material/Typography";

// src/components/material/navigation/public-footer/public-footer.const.ts
var DEFAULT_LAYOUT_QUERY = "md";
var DEFAULT_COPYRIGHT_HOLDER = "Giselle";
var DEFAULT_BIO = "Senior front-end engineer with 10+ years of experience building accessible, performant web applications. Available for freelance and contract work.";
var DEFAULT_LINK_GROUPS = [
  {
    headline: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Contact", href: "/contact" }
    ]
  },
  {
    headline: "Legal",
    links: [
      { name: "Terms of service", href: "/terms" },
      { name: "Privacy policy", href: "/privacy" }
    ]
  },
  {
    headline: "Contact",
    links: [
      { name: "Get in touch", href: "/contact" },
      { name: "LinkedIn", href: "#" }
    ]
  }
];

// src/components/material/navigation/public-footer/public-footer.defaults.tsx
import { jsx as jsx43 } from "react/jsx-runtime";
var DEFAULT_SOCIAL_LINKS = [
  { label: "Twitter", href: "#", icon: /* @__PURE__ */ jsx43(GiselleIcon, { icon: "mdi:twitter", width: 20 }) },
  { label: "Facebook", href: "#", icon: /* @__PURE__ */ jsx43(GiselleIcon, { icon: "mdi:facebook", width: 20 }) },
  { label: "Instagram", href: "#", icon: /* @__PURE__ */ jsx43(GiselleIcon, { icon: "mdi:instagram", width: 20 }) },
  { label: "LinkedIn", href: "#", icon: /* @__PURE__ */ jsx43(GiselleIcon, { icon: "mdi:linkedin", width: 20 }) }
];

// src/components/material/navigation/public-footer/public-footer.styles.ts
var publicFooterRootSx = {
  borderTop: 1,
  borderColor: "divider"
};
var publicFooterInnerSx = {
  py: { xs: 6, md: 8 }
};
var topRowSx = (breakpoint) => (theme) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 5,
  [theme.breakpoints.up(breakpoint)]: {
    flexDirection: "row",
    alignItems: "flex-start",
    textAlign: "left",
    justifyContent: "space-between"
  }
});
var bioColumnSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "inherit",
  gap: 2,
  maxWidth: 360
};
var bioTextSx = {
  color: "text.secondary"
};
var linkGroupsRowSx = (breakpoint) => (theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  [theme.breakpoints.up(breakpoint)]: {
    flexDirection: "row",
    gap: 8
  }
});
var linkGroupColumnSx = {
  display: "flex",
  flexDirection: "column",
  gap: 1.5
};
var linkGroupHeadlineSx = {
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "text.secondary"
};
var linkGroupLinkSx = {
  color: "text.primary"
};
var copyrightRowSx = {
  mt: { xs: 5, md: 6 },
  textAlign: "center",
  color: "text.secondary"
};
var defaultLogoSx = {
  fontWeight: 800,
  fontSize: "1.25rem"
};

// src/components/material/navigation/public-footer/public-footer.tsx
import { jsx as jsx44, jsxs as jsxs22 } from "react/jsx-runtime";
var PublicFooter = React17.forwardRef(function PublicFooter2({
  logo,
  bio = DEFAULT_BIO,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  linkGroups = DEFAULT_LINK_GROUPS,
  copyrightHolder = DEFAULT_COPYRIGHT_HOLDER,
  layoutQuery = DEFAULT_LAYOUT_QUERY,
  sx,
  ...other
}, ref) {
  const resolvedLogo = logo ?? /* @__PURE__ */ jsx44(Link3, { href: "/", underline: "none", sx: defaultLogoSx, children: copyrightHolder });
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const socialActions = socialLinks.map((social) => ({
    tooltip: social.label,
    icon: social.icon,
    href: social.href
  }));
  return /* @__PURE__ */ jsx44(
    Box20,
    {
      ref,
      component: "footer",
      sx: [publicFooterRootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ jsxs22(SectionContainer, { sx: publicFooterInnerSx, children: [
        /* @__PURE__ */ jsxs22(Box20, { sx: topRowSx(layoutQuery), children: [
          /* @__PURE__ */ jsxs22(Box20, { sx: bioColumnSx, children: [
            resolvedLogo,
            /* @__PURE__ */ jsx44(Typography12, { variant: "body2", sx: bioTextSx, children: bio }),
            /* @__PURE__ */ jsx44(IconActionBar, { actions: socialActions })
          ] }),
          /* @__PURE__ */ jsx44(Box20, { sx: linkGroupsRowSx(layoutQuery), children: linkGroups.map((group) => /* @__PURE__ */ jsxs22(Box20, { sx: linkGroupColumnSx, children: [
            /* @__PURE__ */ jsx44(Typography12, { variant: "caption", sx: linkGroupHeadlineSx, children: group.headline }),
            group.links.map((link) => /* @__PURE__ */ jsx44(Link3, { href: link.href, underline: "hover", sx: linkGroupLinkSx, children: link.name }, link.name))
          ] }, group.headline)) })
        ] }),
        /* @__PURE__ */ jsxs22(Typography12, { variant: "body2", sx: copyrightRowSx, children: [
          "\xA9 ",
          currentYear,
          " ",
          copyrightHolder,
          ". All rights reserved."
        ] })
      ] })
    }
  );
});
PublicFooter.displayName = "PublicFooter";

// src/components/material/navigation/back-to-top-button/back-to-top-button.tsx
import React18, { useCallback as useCallback9 } from "react";
import Fab from "@mui/material/Fab";

// src/components/material/navigation/back-to-top-button/use-scroll-visibility.ts
import { useEffect as useEffect4, useState as useState5 } from "react";
function useScrollVisibility(thresholdPx) {
  const [isVisible, setIsVisible] = useState5(false);
  useEffect4(() => {
    if (typeof window === "undefined") return void 0;
    const handleScroll = () => {
      setIsVisible(window.scrollY > thresholdPx);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [thresholdPx]);
  return isVisible;
}

// src/components/material/navigation/back-to-top-button/back-to-top-button.defaults.tsx
import SvgIcon5 from "@mui/material/SvgIcon";

// src/components/material/navigation/back-to-top-button/back-to-top-button.const.ts
var BACK_TO_TOP_BUTTON_SIZE = 48;
var BACK_TO_TOP_BUTTON_WCAG_MIN_SIZE = 24;
var BACK_TO_TOP_BUTTON_DEFAULT_SCROLL_THRESHOLD = 240;

// src/components/material/navigation/back-to-top-button/back-to-top-button.styles.ts
var backToTopButtonRootSx = (isVisible) => (theme) => ({
  width: BACK_TO_TOP_BUTTON_SIZE,
  height: BACK_TO_TOP_BUTTON_SIZE,
  position: "fixed",
  right: { xs: 24, md: 32 },
  bottom: { xs: 24, md: 32 },
  zIndex: theme.zIndex.speedDial,
  transform: "scale(0)",
  visibility: "hidden",
  pointerEvents: "none",
  transition: theme.transitions.create(["transform"]),
  ...isVisible && {
    transform: "scale(1)",
    visibility: "visible",
    pointerEvents: "auto"
  }
});
var backToTopButtonIconSx = {
  fontSize: 24
};

// src/components/material/navigation/back-to-top-button/back-to-top-button.defaults.tsx
import { jsx as jsx45 } from "react/jsx-runtime";
var DEFAULT_BACK_TO_TOP_ICON = /* @__PURE__ */ jsx45(SvgIcon5, { sx: backToTopButtonIconSx, viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx45("path", { d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" }) });

// src/components/material/navigation/back-to-top-button/back-to-top-button.tsx
import { jsx as jsx46 } from "react/jsx-runtime";
var BackToTopButton = React18.forwardRef(
  function BackToTopButton2({
    scrollThreshold = BACK_TO_TOP_BUTTON_DEFAULT_SCROLL_THRESHOLD,
    icon = DEFAULT_BACK_TO_TOP_ICON,
    sx,
    ...other
  }, ref) {
    const isVisible = useScrollVisibility(scrollThreshold);
    const handleClick = useCallback9(() => {
      if (typeof window === "undefined") return;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    return /* @__PURE__ */ jsx46(
      Fab,
      {
        ref,
        "aria-label": "Back to top",
        onClick: handleClick,
        sx: [backToTopButtonRootSx(isVisible), ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: icon
      }
    );
  }
);
BackToTopButton.displayName = "BackToTopButton";

// src/components/material/layout/titled-block/titled-block.tsx
import React19 from "react";
import Box21 from "@mui/material/Box";
import IconButton4 from "@mui/material/IconButton";
import Typography13 from "@mui/material/Typography";

// src/components/material/layout/titled-block/titled-block.const.ts
var TITLED_BLOCK_SPACING = {
  small: { blockGap: 1, headerGap: 1, padding: 1.5, titleVariant: "subtitle2" },
  large: { blockGap: 1.5, headerGap: 1.5, padding: 2.5, titleVariant: "subtitle1" }
};
var RESET_ICON_SIZE = 16;

// src/components/material/layout/titled-block/titled-block.defaults.tsx
import { jsx as jsx47 } from "react/jsx-runtime";
var DEFAULT_RESET_ICON = /* @__PURE__ */ jsx47(GiselleIcon, { icon: "solar:restart-bold", width: RESET_ICON_SIZE, "aria-hidden": "true" });

// src/components/material/layout/titled-block/titled-block.styles.ts
var rootSx3 = (size) => (theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(TITLED_BLOCK_SPACING[size].blockGap),
  padding: theme.spacing(TITLED_BLOCK_SPACING[size].padding),
  borderRadius: 1,
  border: "1px solid",
  borderColor: "divider"
});
var headerSx = (size) => (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(TITLED_BLOCK_SPACING[size].headerGap)
});
var resetButtonSx = {
  color: "text.secondary",
  "&:hover": { color: "text.primary" }
};

// src/components/material/layout/titled-block/titled-block.utils.ts
function computeCanReset(value, defaultValue, onReset) {
  return Boolean(onReset) && !isDeepEqual(value, defaultValue);
}

// src/components/material/layout/titled-block/titled-block.tsx
import { jsx as jsx48, jsxs as jsxs23 } from "react/jsx-runtime";
var TitledBlock = React19.forwardRef(function TitledBlock2({
  title,
  children,
  size = "small",
  value,
  defaultValue,
  onReset,
  resetIcon = DEFAULT_RESET_ICON,
  resetLabel = "Reset",
  sx,
  ...other
}, ref) {
  const canReset = computeCanReset(value, defaultValue, onReset);
  const { titleVariant } = TITLED_BLOCK_SPACING[size];
  return /* @__PURE__ */ jsxs23(Box21, { ref, sx: [rootSx3(size), ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ jsxs23(Box21, { sx: headerSx(size), children: [
      /* @__PURE__ */ jsx48(Typography13, { variant: titleVariant, component: "h3", children: title }),
      canReset && /* @__PURE__ */ jsx48(IconButton4, { size: "small", onClick: onReset, "aria-label": resetLabel, sx: resetButtonSx, children: resetIcon })
    ] }),
    children
  ] });
});
TitledBlock.displayName = "TitledBlock";

// src/components/section/hero/section/hero-section.tsx
import Box22 from "@mui/material/Box";
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
import { jsx as jsx49, jsxs as jsxs24 } from "react/jsx-runtime";
function HeroSection({
  heading,
  text: text2,
  actions,
  icons,
  color = "primary",
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx49(Box22, { sx: [heroRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: /* @__PURE__ */ jsxs24(Container2, { maxWidth: "lg", sx: heroInnerSx, children: [
    heading,
    text2,
    actions && /* @__PURE__ */ jsx49(Box22, { sx: heroActionsRowSx, children: actions }),
    icons && /* @__PURE__ */ jsx49(Box22, { sx: heroIconsSlotSx, children: icons })
  ] }) });
}

// src/components/section/feature-flow/feature-flow-section.tsx
import React27, { useCallback as useCallback12, useEffect as useEffect6, useMemo as useMemo4, useRef as useRef3, useState as useState8 } from "react";
import Grid4 from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.tsx
import { useCallback as useCallback11 } from "react";
import { AnimatePresence } from "framer-motion";
import Box24 from "@mui/material/Box";

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.styles.ts
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

// src/components/material/navigation/floating-sub-nav/nav-pill/nav-pill.tsx
import React21 from "react";
import { m } from "framer-motion";
import Box23 from "@mui/material/Box";
import Stack4 from "@mui/material/Stack";

// src/components/material/navigation/floating-sub-nav/nav-pill/nav-pill.animations.ts
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

// src/components/material/navigation/floating-sub-nav/nav-pill/nav-pill.const.ts
var PILL_BUTTON_ROW_SPACING = 0.5;

// src/components/material/navigation/floating-sub-nav/nav-pill/nav-pill.styles.ts
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

// src/components/material/navigation/floating-sub-nav/sub-nav-button/sub-nav-button.tsx
import React20, { useCallback as useCallback10 } from "react";
import Tooltip3 from "@mui/material/Tooltip";
import ButtonBase2 from "@mui/material/ButtonBase";

// src/components/material/navigation/floating-sub-nav/sub-nav-button/sub-nav-button.const.ts
var SUB_NAV_BUTTON_SIZE = {
  xs: 36,
  sm: 38,
  md: 42,
  lg: 44
};

// src/components/material/navigation/floating-sub-nav/sub-nav-button/sub-nav-button.styles.ts
var grey500Ch2 = (theme) => theme.vars.palette.grey["500Channel"];
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
    bgcolor: channelAlpha(grey500Ch2(theme), 0.08)
  },
  "&:active": {
    opacity: 0.56,
    bgcolor: channelAlpha(grey500Ch2(theme), 0.12)
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

// src/components/material/navigation/floating-sub-nav/sub-nav-button/sub-nav-button.tsx
import { jsx as jsx50 } from "react/jsx-runtime";
var SubNavButton = React20.forwardRef(
  function SubNavButton2({ item, isActive, onPress }, ref) {
    const handleClick = useCallback10(() => onPress(item.id), [onPress, item.id]);
    return /* @__PURE__ */ jsx50(Tooltip3, { title: item.label, placement: "top", arrow: true, children: /* @__PURE__ */ jsx50(
      ButtonBase2,
      {
        ref,
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
);
SubNavButton.displayName = "SubNavButton";

// src/components/material/navigation/floating-sub-nav/nav-pill/nav-pill.tsx
import { jsx as jsx51 } from "react/jsx-runtime";
var NavPill = React21.forwardRef(function NavPill2({ items, activeId, onPress }, ref) {
  return /* @__PURE__ */ jsx51(
    m.div,
    {
      ref,
      variants: pillVariants,
      initial: "initial",
      animate: "animate",
      exit: "exit",
      transition: pillTransition,
      children: /* @__PURE__ */ jsx51(Box23, { component: "nav", "aria-label": "Section navigation", sx: pillSx, children: /* @__PURE__ */ jsx51(Stack4, { direction: "row", spacing: PILL_BUTTON_ROW_SPACING, children: items.map((item) => /* @__PURE__ */ jsx51(
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
});
NavPill.displayName = "NavPill";

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.tsx
import { jsx as jsx52 } from "react/jsx-runtime";
function FloatingSubNav({ items, activeId, onSelect, sticky = false }) {
  const handlePress = useCallback11((id) => onSelect(id), [onSelect]);
  if (sticky) {
    return /* @__PURE__ */ jsx52(Box24, { sx: stickyWrapperSx, children: /* @__PURE__ */ jsx52(Box24, { sx: stickyInnerSx, children: /* @__PURE__ */ jsx52(AnimatePresence, { children: activeId !== null && /* @__PURE__ */ jsx52(NavPill, { items, activeId, onPress: handlePress }) }) }) });
  }
  return /* @__PURE__ */ jsx52(AnimatePresence, { children: activeId !== null && /* @__PURE__ */ jsx52(Box24, { sx: fixedWrapperSx, children: /* @__PURE__ */ jsx52(NavPill, { items, activeId, onPress: handlePress }) }) });
}

// src/components/motion/viewport/motion-viewport.tsx
import { m as m2 } from "framer-motion";
import Box25 from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

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
import { jsx as jsx53 } from "react/jsx-runtime";
function MotionViewport({
  children,
  viewport,
  sx,
  disableAnimateOnMobile = true,
  ...other
}) {
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  if (smDown && disableAnimateOnMobile) {
    return /* @__PURE__ */ jsx53(Box25, { sx, ...other, children });
  }
  return /* @__PURE__ */ jsx53(
    Box25,
    {
      component: m2.div,
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
var GREY_500_CHANNEL = "var(--mui-palette-grey-500Channel)";
var COMMON_BLACK_CHANNEL = "var(--mui-palette-common-blackChannel)";
var selectedHoverShadow = (channel, innerAlpha, outerAlpha) => `0 0 2px 0 ${channelAlpha(channel, innerAlpha)}, -8px 20px 40px -4px ${channelAlpha(channel, outerAlpha)}`;
var selectedActiveShadow = (channel, innerAlpha, outerAlpha) => `0 0 1px 0 ${channelAlpha(channel, innerAlpha)}, -1px 2px 4px -1px ${channelAlpha(channel, outerAlpha)}`;
var featureFlowRootSx = (isExpanded) => ({
  pt: { xs: 10, md: 20 },
  pb: isExpanded ? 10 : { xs: 10, md: 20 }
});
var featureFlowGridContainerSx = (isExpanded) => (theme) => ({
  position: "relative",
  pb: isExpanded ? { xs: 5, md: 8 } : 0,
  transition: theme.transitions.create("padding-bottom", {
    duration: theme.transitions.duration.short
  })
});
var featureFlowDescriptionGridSx = (isLeft) => ({
  order: { xs: 1, md: isLeft ? 1 : 2 },
  pl: { md: isLeft ? 0 : 4 }
});
var featureFlowImageGridSx = (isLeft) => ({
  order: { xs: 2, md: isLeft ? 2 : 1 }
});
var detailPanelChannel = (color) => color === "grey" ? GREY_500_CHANNEL : `var(--mui-palette-${color}-mainChannel)`;
var detailPanelSx = (color = "primary") => {
  const channel = detailPanelChannel(color);
  return {
    py: { xs: 6, md: 10 },
    overflow: "hidden",
    position: "relative",
    bgcolor: channelAlpha(channel, 0.04),
    borderTop: `1px solid ${channelAlpha(channel, 0.12)}`
  };
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
    // No `!important` needed (see #192): the entrance fade now lives on
    // an outer `m.div` wrapping this row (`FeatureFlowItemRow`), not on
    // this element itself, so framer-motion's persistent inline
    // `style="opacity: 1"` never lands here to out-specificity these
    // rules (previously required as a truce — see #185).
    "&:hover": {
      opacity: 0.72,
      bgcolor: channelAlpha(GREY_500_CHANNEL, 0.08)
    },
    "&:active": {
      opacity: 0.56,
      bgcolor: channelAlpha(GREY_500_CHANNEL, 0.12)
    }
  },
  ...expandable && !isSelected && isActive && {
    opacity: 1
  },
  ...expandable && isSelected && {
    color: "text.primary",
    bgcolor: "background.paper",
    boxShadow: `-8px 8px 20px -4px ${channelAlpha(GREY_500_CHANNEL, 0.12)}`,
    "&:hover": {
      opacity: 1,
      boxShadow: selectedHoverShadow(GREY_500_CHANNEL, 0.08, 0.24)
    },
    "&:active": {
      opacity: 1,
      boxShadow: selectedActiveShadow(GREY_500_CHANNEL, 0.04, 0.06)
    },
    ...theme.applyStyles("dark", {
      boxShadow: `-8px 8px 20px -4px ${channelAlpha(COMMON_BLACK_CHANNEL, 0.12)}`,
      "&:hover": {
        boxShadow: selectedHoverShadow(COMMON_BLACK_CHANNEL, 0.12, 0.32)
      },
      "&:active": {
        boxShadow: selectedActiveShadow(COMMON_BLACK_CHANNEL, 0.04, 0.08)
      }
    })
  },
  ...expandable && isExpanded && {
    borderColor: channelAlpha("var(--mui-palette-primary-mainChannel)", 0.24),
    boxShadow: isSelected ? `inset 3px 0 0 ${theme.vars.palette.primary.main}, -8px 8px 20px -4px ${channelAlpha(GREY_500_CHANNEL, 0.12)}` : `inset 3px 0 0 ${theme.vars.palette.primary.main}`
  }
});
var crossfadeOpacitySx = (isActive, durationSeconds) => ({
  opacity: isActive ? 1 : 0,
  transition: `opacity ${durationSeconds}s ease`
});

// src/components/section/feature-flow/feature-flow-section.utils.ts
import { useEffect as useEffect5, useRef as useRef2, useState as useState6 } from "react";
import { preload } from "react-dom";
import { useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
function hasExpansionData(item) {
  return !!(item.longDescription || item.technologies?.length || item.metrics?.length || item.highlightCards?.length);
}
function isRichLongDescription(item) {
  return typeof item.longDescription !== "string" && item.longDescription != null;
}
function useImagePreloader(srcs, highPrioritySrc) {
  srcs.forEach((src) => {
    if (src) {
      preload(src, {
        as: "image",
        fetchPriority: src === highPrioritySrc ? "high" : "auto"
      });
    }
  });
}
var scheduleIdle = typeof requestIdleCallback !== "undefined" ? (cb) => requestIdleCallback(cb) : (cb) => globalThis.setTimeout(cb, 0);
var cancelIdle = typeof cancelIdleCallback !== "undefined" ? (id) => cancelIdleCallback(id) : (id) => globalThis.clearTimeout(id);
function useClientImagePrewarm(srcs) {
  useEffect5(() => {
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
  const [state, setState] = useState6({
    direction: "down",
    isScrolling: false
  });
  const prevYRef = useRef2(0);
  const idleTimerRef = useRef2(null);
  useEffect5(() => {
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
  const ref = useRef2(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: IMAGE_REVEAL_SCROLL_OFFSET
  });
  const opacity2 = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [IMAGE_REVEAL_OPACITY_FROM, 1]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [IMAGE_REVEAL_Y_FROM_PX, 0]
  );
  const scale2 = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [IMAGE_REVEAL_SCALE_FROM, 1]
  );
  const blurPx = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [IMAGE_REVEAL_BLUR_FROM_PX, 0]
  );
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return { ref, style: { opacity: opacity2, y, scale: scale2, filter } };
}

// src/components/section/feature-flow/description-column/feature-flow-description-column.tsx
import Stack6 from "@mui/material/Stack";

// src/components/section/feature-flow/item-row/feature-flow-item-row.tsx
import React22 from "react";
import { m as m3, useReducedMotion as useReducedMotion2 } from "framer-motion";
import Stack5 from "@mui/material/Stack";
import Typography14 from "@mui/material/Typography";
import ButtonBase3 from "@mui/material/ButtonBase";

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
import { jsx as jsx54, jsxs as jsxs25 } from "react/jsx-runtime";
var FeatureFlowItemRow = React22.forwardRef(
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
    const reducedMotion = useReducedMotion2();
    return /* @__PURE__ */ jsx54(m3.div, { variants: fade("inUp", { distance: reducedMotion ? 0 : 24 }), children: /* @__PURE__ */ jsxs25(
      ButtonBase3,
      {
        ...other,
        ref,
        disableRipple: true,
        type: "button",
        "aria-pressed": expandable ? isSelected : void 0,
        onMouseEnter: onHover,
        onFocus,
        onClick: expandable ? onSelect : void 0,
        sx: [
          featureFlowItemSx({ isSelected, isActive, isExpanded, expandable }),
          ...Array.isArray(sx) ? sx : [sx]
        ],
        children: [
          /* @__PURE__ */ jsx54(GiselleIcon, { icon, width: 48, "aria-hidden": "true" }),
          /* @__PURE__ */ jsxs25(Stack5, { spacing: 1, sx: itemRowTextSlotSx, children: [
            /* @__PURE__ */ jsx54(Typography14, { variant: "h4", component: "h6", color: "inherit", children: title }),
            /* @__PURE__ */ jsx54(Typography14, { color: "inherit", children: description })
          ] })
        ]
      }
    ) });
  }
);
FeatureFlowItemRow.displayName = "FeatureFlowItemRow";

// src/components/section/feature-flow/description-column/feature-flow-description-column.styles.ts
var descriptionColumnTitleSx = {
  mb: { xs: 5, md: 8 },
  textAlign: { xs: "center", md: "left" }
};
var descriptionColumnRowListSx = {
  maxWidth: { sm: 560, md: 400 },
  mx: { xs: "auto", md: "unset" }
};

// src/components/section/feature-flow/description-column/feature-flow-description-column.tsx
import { Fragment as Fragment3, jsx as jsx55, jsxs as jsxs26 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs26(Fragment3, { children: [
    title && /* @__PURE__ */ jsx55(
      SectionTitle,
      {
        caption,
        title,
        txtGradient,
        description,
        sx: descriptionColumnTitleSx
      }
    ),
    /* @__PURE__ */ jsx55(
      Stack6,
      {
        spacing: 1.5,
        sx: descriptionColumnRowListSx,
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
          return /* @__PURE__ */ jsx55(
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
import React23 from "react";
import { m as m4 } from "framer-motion";
import Box26 from "@mui/material/Box";
import Stack7 from "@mui/material/Stack";

// src/components/section/feature-flow/image-column/feature-flow-image-column.styles.ts
var GREY_500_CHANNEL2 = "var(--mui-palette-grey-500Channel)";
var COMMON_BLACK_CHANNEL2 = "var(--mui-palette-common-blackChannel)";
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
var imageColumnRevealWrapperSx = {
  width: 1,
  position: "relative"
};

// src/components/section/feature-flow/image-column/feature-flow-image-column.tsx
import { jsx as jsx56, jsxs as jsxs27 } from "react/jsx-runtime";
var RESTING_REVEAL_STYLE = {
  opacity: 1,
  y: 0,
  scale: 1,
  filter: "none"
};
var FeatureFlowImageColumn = React23.forwardRef(
  function FeatureFlowImageColumn2({ activeSrc, ghostSrc, allSrcs, alt, revealStyle = RESTING_REVEAL_STYLE, sx, ...other }, ref) {
    return /* @__PURE__ */ jsxs27(Stack7, { ref, sx: imageColumnStickyStackSx, ...other, children: [
      /* @__PURE__ */ jsx56(Box26, { component: "img", alt: "", "aria-hidden": true, src: ghostSrc, sx: imageColumnOuterGhostSx }),
      /* @__PURE__ */ jsx56(Box26, { sx: [imageColumnCardSx, ...Array.isArray(sx) ? sx : [sx]], children: /* @__PURE__ */ jsxs27(Box26, { component: m4.div, style: revealStyle, sx: imageColumnRevealWrapperSx, children: [
        /* @__PURE__ */ jsx56(Box26, { component: "img", alt: "", "aria-hidden": true, src: ghostSrc, sx: imageColumnInnerGhostSx }),
        allSrcs.map((src) => /* @__PURE__ */ jsx56(
          Box26,
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
import React26 from "react";
import { m as m6, AnimatePresence as AnimatePresence3, useReducedMotion as useReducedMotion4 } from "framer-motion";
import Box29 from "@mui/material/Box";
import Grid3 from "@mui/material/Grid";
import Stack8 from "@mui/material/Stack";
import Container3 from "@mui/material/Container";
import Typography17 from "@mui/material/Typography";

// src/components/material/data-display/icon/icon-strip/icon-strip.tsx
import React24 from "react";
import Box27 from "@mui/material/Box";
import Tooltip4 from "@mui/material/Tooltip";
import Typography15 from "@mui/material/Typography";

// src/components/material/data-display/icon/icon-strip/icon-strip.const.ts
var ICON_STRIP_DEFAULT_GAP = 3;
var ICON_STRIP_LABEL_FONT_SIZE = "0.75rem";

// src/components/material/data-display/icon/icon-strip/icon-strip.styles.ts
var iconStripRootSx = {
  display: "flex",
  flexDirection: "column"
};
var iconStripHeadingSx = {
  display: "block",
  mb: 2,
  color: "text.secondary",
  letterSpacing: "0.08em",
  textTransform: "uppercase"
};
var iconStripListSx = (centeredWrap, gap) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap,
  justifyContent: centeredWrap ? "center" : "flex-start"
});
var iconStripLabeledItemSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0.5,
  minWidth: 56
};
var iconStripIconSlotSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
var iconStripItemLabelSx = {
  fontSize: ICON_STRIP_LABEL_FONT_SIZE
};
var iconStripTooltipWrapperSx = {
  display: "inline-flex"
};

// src/components/material/data-display/icon/icon-strip/icon-strip.tsx
import { jsx as jsx57, jsxs as jsxs28 } from "react/jsx-runtime";
function IconStrip({
  items,
  heading,
  centeredWrap = false,
  gap = ICON_STRIP_DEFAULT_GAP,
  sx,
  listSx,
  ...other
}) {
  return /* @__PURE__ */ jsxs28(Box27, { sx: [iconStripRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    heading && /* @__PURE__ */ jsx57(Typography15, { component: "span", variant: "overline", sx: iconStripHeadingSx, children: heading }),
    /* @__PURE__ */ jsx57(
      Box27,
      {
        sx: [iconStripListSx(centeredWrap, gap), ...Array.isArray(listSx) ? listSx : [listSx]],
        children: items.map((item) => {
          const content = item.label ? /* @__PURE__ */ jsxs28(Box27, { sx: iconStripLabeledItemSx, children: [
            /* @__PURE__ */ jsx57(Box27, { "aria-hidden": true, sx: iconStripIconSlotSx, children: item.icon }),
            /* @__PURE__ */ jsx57(Typography15, { sx: iconStripItemLabelSx, variant: "caption", children: item.label })
          ] }) : item.icon;
          return /* @__PURE__ */ jsx57(React24.Fragment, { children: item.tooltip ? /* @__PURE__ */ jsx57(Tooltip4, { title: item.tooltip, children: /* @__PURE__ */ jsx57(Box27, { component: "span", sx: iconStripTooltipWrapperSx, children: content }) }) : content }, item.key);
        })
      }
    )
  ] });
}

// src/components/material/data-display/icon/tech-strip/tech-icon-strip.tsx
import { jsx as jsx58 } from "react/jsx-runtime";
function TechIconStrip({
  items,
  heading,
  centeredWrap = false,
  sx,
  ...other
}) {
  const iconStripItems = items.map((item) => ({
    key: item.label,
    icon: item.icon,
    label: item.label
  }));
  return /* @__PURE__ */ jsx58(
    IconStrip,
    {
      items: iconStripItems,
      heading,
      centeredWrap,
      sx,
      ...other
    }
  );
}

// src/components/section/feature-flow/highlight-carousel/feature-flow-highlight-carousel.tsx
import React25, { useState as useState7 } from "react";
import { m as m5, AnimatePresence as AnimatePresence2, useReducedMotion as useReducedMotion3 } from "framer-motion";
import Box28 from "@mui/material/Box";
import Link4 from "@mui/material/Link";
import IconButton5 from "@mui/material/IconButton";
import Typography16 from "@mui/material/Typography";

// src/components/section/feature-flow/highlight-carousel/feature-flow-highlight-carousel.styles.ts
var COMMON_BLACK_CHANNEL3 = "var(--mui-palette-common-blackChannel)";
var COMMON_WHITE_CHANNEL = "var(--mui-palette-common-whiteChannel)";
var HIGHLIGHT_CAROUSEL_HEIGHT = 570;
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
  background: `linear-gradient(to top, ${channelAlpha(COMMON_BLACK_CHANNEL3, 1)} 0%, ${channelAlpha(COMMON_BLACK_CHANNEL3, 0.5)} 40%, transparent 69%)`
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
var highlightTitleSx = {
  mb: 1
};
var highlightLearnMoreLinkSx = {
  mt: 1,
  display: "inline-block",
  color: "inherit"
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
  color: channelAlpha(COMMON_WHITE_CHANNEL, 0.9),
  lineHeight: 1.7
};
var highlightIndexLabelSx = {
  color: "common.white",
  minWidth: 32,
  textAlign: "center"
};
var highlightArrowButtonSx = {
  color: "common.white",
  bgcolor: channelAlpha(COMMON_WHITE_CHANNEL, 0.12)
};

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
import { jsx as jsx59, jsxs as jsxs29 } from "react/jsx-runtime";
var FeatureFlowHighlightCarousel = React25.forwardRef(function FeatureFlowHighlightCarousel2({ cards, sx, ...other }, ref) {
  const [selectedIndex, setSelectedIndex] = useState7(0);
  const [step, setStep] = useState7(1);
  const reducedMotion = useReducedMotion3();
  if (!cards.length) return null;
  const goTo = (index, direction) => {
    setStep(direction);
    setSelectedIndex((index + cards.length) % cards.length);
  };
  const selectedCard = cards[selectedIndex];
  const textVariants = highlightTextVariants(reducedMotion ? 0 : HIGHLIGHT_TEXT_SLIDE_DISTANCE);
  return /* @__PURE__ */ jsxs29(Box28, { ref, sx: [highlightCarouselRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    cards.map((card, index) => /* @__PURE__ */ jsx59(
      Box28,
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
    /* @__PURE__ */ jsx59(Box28, { "aria-hidden": true, sx: highlightScrimSx }),
    /* @__PURE__ */ jsx59(Box28, { sx: highlightTextSlotSx, children: /* @__PURE__ */ jsx59(AnimatePresence2, { mode: "wait", custom: step, children: /* @__PURE__ */ jsxs29(
      m5.div,
      {
        custom: step,
        variants: textVariants,
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: { duration: 0.28, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsx59(Typography16, { variant: "h4", sx: highlightTitleSx, children: selectedCard?.title }),
          /* @__PURE__ */ jsx59(Typography16, { variant: "body1", sx: highlightDetailTextSx, children: selectedCard?.description }),
          selectedCard?.href && /* @__PURE__ */ jsx59(Link4, { href: selectedCard.href, variant: "body2", sx: highlightLearnMoreLinkSx, children: "Learn more" })
        ]
      },
      selectedIndex
    ) }) }),
    cards.length > 1 && /* @__PURE__ */ jsxs29(Box28, { sx: highlightControlsRowSx, children: [
      /* @__PURE__ */ jsxs29(Typography16, { variant: "caption", sx: highlightIndexLabelSx, children: [
        selectedIndex + 1,
        "/",
        cards.length
      ] }),
      /* @__PURE__ */ jsx59(
        IconButton5,
        {
          "aria-label": "Previous highlight",
          size: "small",
          onClick: () => goTo(selectedIndex - 1, -1),
          sx: highlightArrowButtonSx,
          children: /* @__PURE__ */ jsx59(GiselleIcon, { icon: "solar:alt-arrow-left-bold", width: 18, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsx59(
        IconButton5,
        {
          "aria-label": "Next highlight",
          size: "small",
          onClick: () => goTo(selectedIndex + 1, 1),
          sx: highlightArrowButtonSx,
          children: /* @__PURE__ */ jsx59(GiselleIcon, { icon: "solar:alt-arrow-right-bold", width: 18, "aria-hidden": "true" })
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
import { jsx as jsx60, jsxs as jsxs30 } from "react/jsx-runtime";
var FeatureFlowItemDetail = React26.forwardRef(
  function FeatureFlowItemDetail2({ item, onNodeRef, renderHighlightPanel, detailPanelColor = "primary", sx, ...other }, ref) {
    const reducedMotion = useReducedMotion4();
    const slideDistance = reducedMotion ? 0 : 8;
    return /* @__PURE__ */ jsx60(m6.div, { ref, layout: true, transition: DETAIL_PANEL_LAYOUT_TRANSITION, children: /* @__PURE__ */ jsx60(AnimatePresence3, { mode: "wait", children: item && /* @__PURE__ */ jsx60(
      m6.div,
      {
        initial: { opacity: 0, y: slideDistance },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -slideDistance },
        transition: { duration: 0.22, ease: "easeOut" },
        children: /* @__PURE__ */ jsx60(
          Box29,
          {
            ref: (node) => onNodeRef?.(item.id, node),
            sx: [detailPanelSx(detailPanelColor), ...Array.isArray(sx) ? sx : [sx]],
            ...other,
            children: /* @__PURE__ */ jsx60(Container3, { children: /* @__PURE__ */ jsxs30(Grid3, { container: true, spacing: { xs: 4, md: 8 }, children: [
              /* @__PURE__ */ jsx60(Grid3, { size: { xs: 12, md: 6 }, children: /* @__PURE__ */ jsxs30(Stack8, { spacing: 4, children: [
                /* @__PURE__ */ jsxs30(Stack8, { direction: "row", spacing: 2, sx: itemDetailHeaderSlotSx, children: [
                  /* @__PURE__ */ jsx60(
                    GiselleIcon,
                    {
                      icon: item.icon,
                      width: 44,
                      sx: itemDetailHeaderIconSx,
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsx60(Typography17, { variant: "h3", children: item.title })
                ] }),
                item.metrics?.length ? /* @__PURE__ */ jsx60(Box29, { sx: itemDetailMetricsGridSx(item.metrics.length), children: item.metrics.map(({ value, label, sublabel, icon }) => /* @__PURE__ */ jsx60(
                  MetricCard,
                  {
                    value,
                    label,
                    sublabel,
                    icon: icon ? /* @__PURE__ */ jsx60(GiselleIcon, { icon, width: 36, "aria-hidden": "true" }) : void 0,
                    color: "primary",
                    decoration: /* @__PURE__ */ jsx60(MetricCardDecoration, { color: "primary" })
                  },
                  label
                )) }) : null,
                isRichLongDescription(item) ? item.longDescription : /* @__PURE__ */ jsx60(Typography17, { variant: "body1", sx: itemDetailLongDescriptionSx, children: item.longDescription ?? item.description }),
                item.technologies?.length ? /* @__PURE__ */ jsx60(
                  TechIconStrip,
                  {
                    heading: "Technologies",
                    centeredWrap: false,
                    items: item.technologies.map((tech) => ({
                      label: tech.name,
                      icon: /* @__PURE__ */ jsx60(GiselleIcon, { icon: tech.icon, width: 32, "aria-hidden": "true" })
                    }))
                  }
                ) : null
              ] }) }),
              renderHighlightPanel ? /* @__PURE__ */ jsx60(Grid3, { size: { xs: 12, md: 6 }, children: renderHighlightPanel(item) }) : (item.highlightCards ?? []).length > 0 && /* @__PURE__ */ jsx60(Grid3, { size: { xs: 12, md: 6 }, children: /* @__PURE__ */ jsx60(FeatureFlowHighlightCarousel, { cards: item.highlightCards ?? [] }) })
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
import { Fragment as Fragment4, jsx as jsx61, jsxs as jsxs31 } from "react/jsx-runtime";
var FeatureFlowSection = React27.forwardRef(
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
    renderHighlightPanel,
    detailPanelColor,
    itemDetailSx,
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
    const [activeItemIndex, setActiveItemIndex] = useState8(0);
    const [selectedItemIndex, setSelectedItemIndex] = useState8(0);
    const [userHasSelected, setUserHasSelected] = useState8(false);
    const [expandedItemId, setExpandedItemId] = useState8(null);
    const [hoverImageIndex, setHoverImageIndex] = useState8(0);
    const [pendingScrollItemId, setPendingScrollItemId] = useState8(null);
    const hoverImageIndexRef = useRef3(0);
    const detailPanelNodesRef = useRef3(/* @__PURE__ */ new Map());
    const { direction: scrollDirection, isScrolling } = useScrollDirection();
    const { ref: imageColumnRef, style: imageRevealStyle } = useImageRevealTransform();
    const activeItem = items[activeItemIndex] ?? items[0];
    const setHoverPhase = useCallback12((phase) => {
      hoverImageIndexRef.current = phase;
      setHoverImageIndex(phase);
    }, []);
    const scrollAwareSrc = useMemo4(() => {
      if (image.scrollImages?.length === 2) {
        return image.scrollImages[scrollDirection === "down" ? 0 : 1];
      }
      return image.src;
    }, [image.scrollImages, image.src, scrollDirection]);
    const hoverSequenceSources = useMemo4(() => {
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
    useEffect6(() => {
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
    useEffect6(() => {
      if (!isScrolling) {
        setActiveItemIndex(selectedItemIndex);
        setHoverPhase(0);
      }
    }, [isScrolling, selectedItemIndex, setHoverPhase]);
    const activeSrc = hoverSequenceSources[hoverImageIndex] ?? hoverSequenceSources[0] ?? "";
    const initiallyVisibleSrc = items[0]?.imgUrl?.[0] ?? image.scrollImages?.[0] ?? image.stackSources?.[0] ?? image.src;
    const allItemImageSrcs = useMemo4(
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
    const subNavItems = useMemo4(
      () => items.filter(hasExpansionData).map((item) => ({
        id: item.id,
        label: item.title,
        icon: /* @__PURE__ */ jsx61(GiselleIcon, { icon: item.icon, width: 22, "aria-hidden": "true" })
      })),
      [items]
    );
    const handleSubNavSelect = useCallback12(
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
    useEffect6(() => {
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
      rightPanel = /* @__PURE__ */ jsx61(
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
    return /* @__PURE__ */ jsx61(
      PageSection,
      {
        ref,
        decoration,
        containerSx: { position: "relative" },
        containerPy: 0,
        unconstrainedChildren: /* @__PURE__ */ jsxs31(Fragment4, { children: [
          pendingScrollItemId && /* @__PURE__ */ jsx61(
            LinearProgress,
            {
              "aria-label": "Loading item detail panel",
              "aria-live": "polite",
              "aria-busy": "true"
            }
          ),
          /* @__PURE__ */ jsx61(
            FeatureFlowItemDetail,
            {
              item: expandedItem,
              onNodeRef: (itemId, node) => {
                if (node) {
                  detailPanelNodesRef.current.set(itemId, node);
                } else {
                  detailPanelNodesRef.current.delete(itemId);
                }
              },
              renderHighlightPanel,
              detailPanelColor,
              sx: itemDetailSx
            }
          ),
          /* @__PURE__ */ jsx61(
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
        children: /* @__PURE__ */ jsx61(MotionViewport, { children: /* @__PURE__ */ jsxs31(
          Grid4,
          {
            container: true,
            columnSpacing,
            rowSpacing: { xs: 5, md: 0 },
            sx: featureFlowGridContainerSx(Boolean(expandedItemId)),
            children: [
              /* @__PURE__ */ jsx61(Grid4, { size: resolvedDescriptionGridSize, sx: featureFlowDescriptionGridSx(isLeft), children: /* @__PURE__ */ jsx61(
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
              ) }),
              /* @__PURE__ */ jsx61(Grid4, { size: resolvedImageGridSize, sx: featureFlowImageGridSx(isLeft), children: rightPanel })
            ]
          }
        ) })
      }
    );
  }
);
FeatureFlowSection.displayName = "FeatureFlowSection";

// src/components/section/bio-hero/bio-hero-section.tsx
import React28 from "react";
import Box30 from "@mui/material/Box";
import Button2 from "@mui/material/Button";
import Stack9 from "@mui/material/Stack";

// src/components/section/bio-hero/bio-hero-section.styles.ts
import { alpha as alpha2 } from "@mui/material/styles";

// src/components/section/bio-hero/bio-hero-section.const.ts
var BIO_HERO_LOGO_HEIGHT = 32;
var BIO_HERO_LOGO_GAP = 4;
var BIO_HERO_LOGO_STRIP_MT = 2;

// src/components/section/bio-hero/bio-hero-section.styles.ts
var bioHeroRootSx = (align = "center") => ({
  width: "100%",
  py: { xs: 8, md: 12 },
  display: "flex",
  flexDirection: "column",
  alignItems: { xs: "center", md: align === "left" ? "flex-start" : "center" },
  textAlign: { xs: "center", md: align },
  gap: 3,
  position: "relative",
  // `position: relative` alone doesn't create a stacking context — without an
  // explicit z-index, the background layers' negative zIndex (below) could
  // escape behind unrelated sibling sections on the page instead of staying
  // contained here.
  zIndex: 0,
  overflow: "hidden"
});
var bioHeroBackgroundImageSx = (backgroundImageUrl) => ({
  position: "absolute",
  inset: 0,
  zIndex: -2,
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center"
});
var bioHeroBackgroundOverlaySx = (overlay) => ({
  position: "absolute",
  inset: 0,
  zIndex: -1,
  background: (theme) => {
    const grey900 = theme.palette.grey[900];
    return `linear-gradient(0deg, ${alpha2(grey900, overlay.startAlpha)}, ${alpha2(grey900, overlay.endAlpha)})`;
  }
});
var bioHeroOnBackgroundImageTextSx = {
  color: "common.white"
};
var bioHeroLogoStripSx = (align = "center") => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: { xs: "center", md: align === "left" ? "flex-start" : "center" },
  alignItems: "center",
  gap: BIO_HERO_LOGO_GAP,
  mt: BIO_HERO_LOGO_STRIP_MT
});
var bioHeroLogoImageSx = {
  height: BIO_HERO_LOGO_HEIGHT,
  width: "auto",
  objectFit: "contain"
};

// src/components/section/bio-hero/bio-hero-section.tsx
import { jsx as jsx62, jsxs as jsxs32 } from "react/jsx-runtime";
var BioHeroSection = React28.forwardRef(
  function BioHeroSection2({
    heading,
    intro,
    statement,
    experience,
    logos,
    cta,
    backgroundImageUrl,
    backgroundOverlay,
    align = "center",
    sx,
    ...other
  }, ref) {
    const hasBackgroundImage = Boolean(backgroundImageUrl);
    return /* @__PURE__ */ jsxs32(
      Box30,
      {
        ref,
        component: "section",
        sx: [bioHeroRootSx(align), ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: [
          backgroundImageUrl && /* @__PURE__ */ jsx62(Box30, { sx: bioHeroBackgroundImageSx(backgroundImageUrl) }),
          backgroundImageUrl && backgroundOverlay && /* @__PURE__ */ jsx62(Box30, { sx: bioHeroBackgroundOverlaySx(backgroundOverlay) }),
          hasBackgroundImage ? /* @__PURE__ */ jsx62(Box30, { sx: bioHeroOnBackgroundImageTextSx, children: heading }) : heading,
          (intro || statement || experience) && /* @__PURE__ */ jsxs32(Stack9, { spacing: 2, sx: hasBackgroundImage ? bioHeroOnBackgroundImageTextSx : void 0, children: [
            intro,
            statement,
            experience
          ] }),
          logos && logos.length > 0 && /* @__PURE__ */ jsx62(Box30, { sx: bioHeroLogoStripSx(align), children: logos.map((logo) => /* @__PURE__ */ jsx62(
            Box30,
            {
              component: "img",
              src: logo.src,
              alt: logo.alt,
              sx: bioHeroLogoImageSx
            },
            logo.src
          )) }),
          cta && (cta.href ? /* @__PURE__ */ jsx62(
            Button2,
            {
              variant: cta.variant ?? "contained",
              href: cta.href,
              target: cta.target,
              rel: cta.rel,
              onClick: cta.onClick,
              children: cta.label
            }
          ) : /* @__PURE__ */ jsx62(Button2, { variant: cta.variant ?? "contained", onClick: cta.onClick, children: cta.label }))
        ]
      }
    );
  }
);
BioHeroSection.displayName = "BioHeroSection";

// src/components/section/integrations-showcase/integrations-showcase-section.tsx
import React31 from "react";
import { motion } from "framer-motion";
import Box33 from "@mui/material/Box";
import Grid5 from "@mui/material/Grid";

// src/components/motion/variants/scale/scale.ts
var scale = (direction, options) => {
  const tIn = options?.transitionIn;
  const tOut = options?.transitionOut;
  const map = {
    in: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0, transition: transitionExit(tOut) }
    },
    inX: {
      initial: { scaleX: 0, opacity: 0 },
      animate: { scaleX: 1, opacity: 1, transition: transitionEnter(tIn) },
      exit: { scaleX: 0, opacity: 0, transition: transitionExit(tOut) }
    },
    inY: {
      initial: { scaleY: 0, opacity: 0 },
      animate: { scaleY: 1, opacity: 1, transition: transitionEnter(tIn) },
      exit: { scaleY: 0, opacity: 0, transition: transitionExit(tOut) }
    },
    out: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, transition: transitionEnter(tIn) },
      exit: { scale: 1, opacity: 1, transition: transitionExit(tOut) }
    },
    outX: {
      initial: { scaleX: 1, opacity: 1 },
      animate: { scaleX: 0, opacity: 0, transition: transitionEnter(tIn) },
      exit: { scaleX: 1, opacity: 1, transition: transitionExit(tOut) }
    },
    outY: {
      initial: { scaleY: 1, opacity: 1 },
      animate: { scaleY: 0, opacity: 0, transition: transitionEnter(tIn) },
      exit: { scaleY: 1, opacity: 1, transition: transitionExit(tOut) }
    }
  };
  return map[direction];
};

// src/components/section/integrations-showcase/decorative-line/decorative-line.tsx
import React29 from "react";
import Box31 from "@mui/material/Box";

// src/components/section/integrations-showcase/decorative-line/decorative-line.styles.ts
var decorativeLineSx = (theme) => ({
  position: "absolute",
  color: theme.vars.palette.divider,
  pointerEvents: "none"
});

// src/components/section/integrations-showcase/decorative-line/decorative-line.tsx
import { jsx as jsx63 } from "react/jsx-runtime";
var IntegrationsShowcaseLine = React29.forwardRef(
  function IntegrationsShowcaseLine2({ vertical, sx, ...other }, ref) {
    return /* @__PURE__ */ jsx63(
      Box31,
      {
        ref,
        component: "svg",
        "aria-hidden": "true",
        width: vertical ? "2" : "64",
        height: vertical ? "64" : "2",
        viewBox: vertical ? "0 0 2 64" : "0 0 64 2",
        sx: [decorativeLineSx, ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: vertical ? /* @__PURE__ */ jsx63(
          "line",
          {
            x1: "1",
            y1: "0",
            x2: "1",
            y2: "64",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeDasharray: "3 4"
          }
        ) : /* @__PURE__ */ jsx63(
          "line",
          {
            x1: "0",
            y1: "1",
            x2: "64",
            y2: "1",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeDasharray: "3 4"
          }
        )
      }
    );
  }
);
IntegrationsShowcaseLine.displayName = "IntegrationsShowcaseLine";

// src/components/section/integrations-showcase/decorative-dot/decorative-dot.tsx
import React30 from "react";
import Box32 from "@mui/material/Box";

// src/components/section/integrations-showcase/decorative-dot/decorative-dot.styles.ts
var decorativeDotSx = (theme) => ({
  position: "absolute",
  color: theme.vars.palette.divider,
  pointerEvents: "none"
});

// src/components/section/integrations-showcase/decorative-dot/decorative-dot.tsx
import { jsx as jsx64 } from "react/jsx-runtime";
var IntegrationsShowcaseDot = React30.forwardRef(
  function IntegrationsShowcaseDot2({ sx, ...other }, ref) {
    return /* @__PURE__ */ jsx64(
      Box32,
      {
        ref,
        component: "svg",
        "aria-hidden": "true",
        width: "8",
        height: "8",
        viewBox: "0 0 8 8",
        sx: [decorativeDotSx, ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: /* @__PURE__ */ jsx64("circle", { cx: "4", cy: "4", r: "4", fill: "currentColor" })
      }
    );
  }
);
IntegrationsShowcaseDot.displayName = "IntegrationsShowcaseDot";

// src/components/section/integrations-showcase/integrations-showcase-section.const.ts
var INTEGRATIONS_SHOWCASE_COLUMN_GAP_MD = 6;
var INTEGRATIONS_SHOWCASE_ROW_GAP_XS = 4;
var INTEGRATIONS_SHOWCASE_IMAGE_MAX_WIDTH = 480;
var INTEGRATIONS_SHOWCASE_ACCENTS_PADDING = 32;
var INTEGRATIONS_SHOWCASE_DOT_OUTER_OPACITY = 0.5;
var INTEGRATIONS_SHOWCASE_DOT_INNER_OPACITY = 1;
var INTEGRATIONS_SHOWCASE_DOT_INNER_SIZE = 6;

// src/components/section/integrations-showcase/integrations-showcase-section.styles.ts
var integrationsShowcaseRootSx = {
  width: "100%",
  py: { xs: 8, md: 12 }
};
var integrationsShowcaseContentSx = {
  position: "relative"
};
var integrationsShowcaseGridSx = {
  alignItems: "center"
};
var integrationsShowcaseTextColumnSx = {
  maxWidth: 480
};
var integrationsShowcaseImageWrapperSx = {
  display: "flex",
  justifyContent: "center"
};
var integrationsShowcaseImageSx = {
  width: "100%",
  maxWidth: INTEGRATIONS_SHOWCASE_IMAGE_MAX_WIDTH,
  height: "auto",
  borderRadius: 2
};
var integrationsShowcaseAccentsSx = {
  display: { xs: "none", md: "flex" },
  position: "absolute",
  top: 0,
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  py: `${INTEGRATIONS_SHOWCASE_ACCENTS_PADDING}px`
};
var integrationsShowcaseVerticalLineSx = {
  position: "absolute",
  top: 0,
  height: "100%"
};
var integrationsShowcaseDotOuterSx = {
  opacity: INTEGRATIONS_SHOWCASE_DOT_OUTER_OPACITY
};
var integrationsShowcaseDotInnerSx = {
  opacity: INTEGRATIONS_SHOWCASE_DOT_INNER_OPACITY,
  width: INTEGRATIONS_SHOWCASE_DOT_INNER_SIZE,
  height: INTEGRATIONS_SHOWCASE_DOT_INNER_SIZE
};
var integrationsShowcaseDotSpacerSx = {
  flexGrow: 1
};
var integrationsShowcaseGridSpacing = {
  columnSpacing: { xs: 0, md: INTEGRATIONS_SHOWCASE_COLUMN_GAP_MD },
  rowSpacing: { xs: INTEGRATIONS_SHOWCASE_ROW_GAP_XS, md: 0 }
};
var integrationsShowcaseTextColumnSize = { xs: 12, md: 6, lg: 5 };
var integrationsShowcaseImageColumnSize = { xs: 12, md: 6, lg: 7 };

// src/components/section/integrations-showcase/integrations-showcase-section.tsx
import { jsx as jsx65, jsxs as jsxs33 } from "react/jsx-runtime";
var IntegrationsShowcaseSection = React31.forwardRef(function IntegrationsShowcaseSection2({ caption, title, txtGradient, description, image, sx, ...other }, ref) {
  return /* @__PURE__ */ jsx65(
    Box33,
    {
      ref,
      component: "section",
      sx: [integrationsShowcaseRootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ jsxs33(
        Box33,
        {
          component: motion.div,
          initial: "initial",
          whileInView: "animate",
          viewport: { once: true, amount: 0.3 },
          variants: container(),
          sx: integrationsShowcaseContentSx,
          children: [
            /* @__PURE__ */ jsxs33(
              Box33,
              {
                component: motion.div,
                variants: fade("in"),
                "aria-hidden": "true",
                sx: integrationsShowcaseAccentsSx,
                children: [
                  /* @__PURE__ */ jsx65(IntegrationsShowcaseLine, { vertical: true, sx: integrationsShowcaseVerticalLineSx }),
                  /* @__PURE__ */ jsx65(IntegrationsShowcaseDot, { sx: integrationsShowcaseDotOuterSx }),
                  /* @__PURE__ */ jsx65(IntegrationsShowcaseDot, { sx: integrationsShowcaseDotInnerSx }),
                  /* @__PURE__ */ jsx65(Box33, { sx: integrationsShowcaseDotSpacerSx }),
                  /* @__PURE__ */ jsx65(IntegrationsShowcaseDot, { sx: integrationsShowcaseDotInnerSx }),
                  /* @__PURE__ */ jsx65(IntegrationsShowcaseDot, { sx: integrationsShowcaseDotOuterSx })
                ]
              }
            ),
            /* @__PURE__ */ jsxs33(Grid5, { container: true, sx: integrationsShowcaseGridSx, ...integrationsShowcaseGridSpacing, children: [
              /* @__PURE__ */ jsx65(Grid5, { size: integrationsShowcaseTextColumnSize, children: /* @__PURE__ */ jsx65(Box33, { sx: integrationsShowcaseTextColumnSx, children: /* @__PURE__ */ jsx65(
                SectionTitle,
                {
                  caption,
                  title,
                  txtGradient,
                  description
                }
              ) }) }),
              /* @__PURE__ */ jsx65(Grid5, { size: integrationsShowcaseImageColumnSize, children: /* @__PURE__ */ jsx65(Box33, { sx: integrationsShowcaseImageWrapperSx, children: /* @__PURE__ */ jsx65(
                Box33,
                {
                  component: motion.img,
                  variants: scale("in"),
                  src: image.src,
                  alt: image.alt,
                  sx: integrationsShowcaseImageSx
                }
              ) }) })
            ] })
          ]
        }
      )
    }
  );
});
IntegrationsShowcaseSection.displayName = "IntegrationsShowcaseSection";

// src/components/section/testimonials-wall/testimonials-wall-section.tsx
import React33 from "react";
import { motion as motion2 } from "framer-motion";
import Box35 from "@mui/material/Box";
import Grid6 from "@mui/material/Grid";
import Button3 from "@mui/material/Button";
import Masonry from "@mui/lab/Masonry";

// src/components/section/testimonials-wall/card/card.tsx
import React32 from "react";
import Box34 from "@mui/material/Box";
import Link5 from "@mui/material/Link";
import Avatar2 from "@mui/material/Avatar";
import Typography18 from "@mui/material/Typography";

// src/components/section/testimonials-wall/testimonials-wall-section.utils.ts
function formatTestimonialWallDate(date) {
  const parsed = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(parsed);
}

// src/components/section/testimonials-wall/card/card.const.ts
var TESTIMONIALS_WALL_DEFAULT_SOURCE_LABEL = "View source";
var TESTIMONIALS_WALL_CARD_OVERLAY_ALPHA = 0.08;
var TESTIMONIALS_WALL_QUOTE_MARK_SIZE = 36;

// src/components/section/testimonials-wall/card/card.styles.ts
import { alpha as alpha3 } from "@mui/material/styles";
var cardSx = (hasBackground) => (theme) => {
  const shared = {
    p: 3,
    gap: 2,
    display: "flex",
    flexDirection: "column",
    borderRadius: 2
  };
  if (!hasBackground) {
    return { ...shared, bgcolor: "background.paper", color: "text.primary" };
  }
  const whiteColor = typeof theme.palette.common?.white === "string" ? theme.palette.common.white : "#ffffff";
  return {
    ...shared,
    bgcolor: alpha3(whiteColor, TESTIMONIALS_WALL_CARD_OVERLAY_ALPHA),
    color: "common.white"
  };
};
var cardQuoteMarkSx = {
  opacity: 0.48,
  lineHeight: 1,
  fontSize: TESTIMONIALS_WALL_QUOTE_MARK_SIZE
};
var cardQuoteTextSx = {
  flexGrow: 1
};
var cardAttributionRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 2
};
var cardAuthorNameSx = {
  color: "inherit"
};
var cardAuthorMetaSx = {
  color: "inherit",
  opacity: 0.72,
  display: "block"
};
var cardSourceLinkSx = {
  display: "inline-flex",
  alignItems: "center",
  alignSelf: "flex-start",
  color: "inherit",
  typography: "caption",
  textDecorationColor: "currentcolor"
};

// src/components/section/testimonials-wall/card/card.tsx
import { jsx as jsx66, jsxs as jsxs34 } from "react/jsx-runtime";
var TestimonialsWallCard = React32.forwardRef(
  function TestimonialsWallCard2({ item, hasBackground = false, sx, ...other }, ref) {
    const formattedDate = formatTestimonialWallDate(item.date);
    const meta = [item.authorRole, formattedDate].filter(Boolean).join(" \u2022 ");
    return /* @__PURE__ */ jsxs34(
      Box34,
      {
        ref,
        component: "article",
        sx: [cardSx(hasBackground), ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: [
          /* @__PURE__ */ jsx66(Typography18, { "aria-hidden": "true", sx: cardQuoteMarkSx, children: "\u201C" }),
          /* @__PURE__ */ jsx66(Typography18, { variant: "body2", sx: cardQuoteTextSx, children: item.quote }),
          /* @__PURE__ */ jsxs34(Box34, { sx: cardAttributionRowSx, children: [
            /* @__PURE__ */ jsx66(Avatar2, { alt: item.authorName, src: item.avatarSrc, children: item.authorName.charAt(0) }),
            /* @__PURE__ */ jsxs34(Box34, { children: [
              /* @__PURE__ */ jsx66(Typography18, { variant: "subtitle2", sx: cardAuthorNameSx, children: item.authorName }),
              meta && /* @__PURE__ */ jsx66(Typography18, { variant: "caption", sx: cardAuthorMetaSx, children: meta })
            ] })
          ] }),
          item.sourceUrl && /* @__PURE__ */ jsx66(
            Link5,
            {
              href: item.sourceUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              sx: cardSourceLinkSx,
              children: item.sourceLabel ?? TESTIMONIALS_WALL_DEFAULT_SOURCE_LABEL
            }
          )
        ]
      }
    );
  }
);
TestimonialsWallCard.displayName = "TestimonialsWallCard";

// src/components/section/testimonials-wall/testimonials-wall-section.const.ts
var TESTIMONIALS_WALL_DEFAULT_COLUMNS = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 3
};
var TESTIMONIALS_WALL_DEFAULT_SPACING = 3;
var TESTIMONIALS_WALL_HEADING_MAX_WIDTH = 480;
var TESTIMONIALS_WALL_SCRIM_ALPHA = 0.82;
var TESTIMONIALS_WALL_STAGGER_CHILDREN = 0.08;
var TESTIMONIALS_WALL_SECTION_DEFAULT_SOURCE_LABEL = "View source";

// src/components/section/testimonials-wall/testimonials-wall-section.styles.ts
import { alpha as alpha4 } from "@mui/material/styles";
var testimonialsWallRootSx = (backgroundImageUrl) => (theme) => {
  const base = { width: "100%", py: { xs: 8, md: 12 } };
  if (!backgroundImageUrl) {
    return base;
  }
  const scrimColor = typeof theme.palette.common?.black === "string" ? theme.palette.common.black : "#000000";
  const scrim = alpha4(scrimColor, TESTIMONIALS_WALL_SCRIM_ALPHA);
  return {
    ...base,
    position: "relative",
    color: "common.white",
    backgroundImage: `linear-gradient(${scrim}, ${scrim}), url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };
};
var testimonialsWallContentSx = {
  position: "relative"
};
var testimonialsWallGridSx = {
  alignItems: "flex-start"
};
var testimonialsWallHeadingColumnSx = {
  maxWidth: { md: TESTIMONIALS_WALL_HEADING_MAX_WIDTH }
};
var testimonialsWallSourceButtonSx = {
  mt: 3
};
var testimonialsWallHeadingColumnSize = { xs: 12, md: 4 };
var testimonialsWallWithHeadingSize = { xs: 12, md: 8 };
var testimonialsWallFullWidthSize = { xs: 12 };
var testimonialsWallMasonrySx = {
  ml: 0
};

// src/components/section/testimonials-wall/testimonials-wall-section.tsx
import { jsx as jsx67, jsxs as jsxs35 } from "react/jsx-runtime";
var TestimonialsWallSection = React33.forwardRef(
  function TestimonialsWallSection2({
    caption,
    title,
    txtGradient,
    description,
    items,
    backgroundImageUrl,
    columns = TESTIMONIALS_WALL_DEFAULT_COLUMNS,
    spacing = TESTIMONIALS_WALL_DEFAULT_SPACING,
    sourceUrl,
    sourceLabel,
    sx,
    ...other
  }, ref) {
    const hasBackground = Boolean(backgroundImageUrl);
    const hasHeading = Boolean(title);
    const hasSource = Boolean(sourceUrl);
    const showHeadingColumn = hasHeading || hasSource;
    return /* @__PURE__ */ jsx67(
      Box35,
      {
        ref,
        component: "section",
        sx: [testimonialsWallRootSx(backgroundImageUrl), ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: /* @__PURE__ */ jsx67(
          Box35,
          {
            component: motion2.div,
            initial: "initial",
            whileInView: "animate",
            viewport: { once: true, amount: 0.2 },
            variants: container({
              transitionIn: { staggerChildren: TESTIMONIALS_WALL_STAGGER_CHILDREN }
            }),
            sx: testimonialsWallContentSx,
            children: /* @__PURE__ */ jsxs35(Grid6, { container: true, spacing: { xs: 4, md: 6 }, sx: testimonialsWallGridSx, children: [
              showHeadingColumn && /* @__PURE__ */ jsx67(Grid6, { size: testimonialsWallHeadingColumnSize, children: /* @__PURE__ */ jsxs35(Box35, { sx: testimonialsWallHeadingColumnSx, children: [
                hasHeading && /* @__PURE__ */ jsx67(
                  SectionTitle,
                  {
                    caption,
                    title,
                    txtGradient,
                    description,
                    slotProps: hasBackground ? {
                      caption: { sx: { color: "inherit", opacity: 0.6 } },
                      title: { sx: { color: "inherit" } },
                      description: { sx: { color: "inherit", opacity: 0.8 } }
                    } : void 0
                  }
                ),
                sourceUrl && /* @__PURE__ */ jsx67(
                  Button3,
                  {
                    href: sourceUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    variant: "outlined",
                    color: hasBackground ? "inherit" : void 0,
                    sx: testimonialsWallSourceButtonSx,
                    children: sourceLabel ?? TESTIMONIALS_WALL_SECTION_DEFAULT_SOURCE_LABEL
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx67(
                Grid6,
                {
                  size: showHeadingColumn ? testimonialsWallWithHeadingSize : testimonialsWallFullWidthSize,
                  children: /* @__PURE__ */ jsx67(
                    Masonry,
                    {
                      columns,
                      spacing,
                      sx: testimonialsWallMasonrySx,
                      children: items.map((item) => /* @__PURE__ */ jsx67(Box35, { component: motion2.div, variants: fade("inUp"), children: /* @__PURE__ */ jsx67(TestimonialsWallCard, { item, hasBackground }) }, item.id))
                    }
                  )
                }
              )
            ] })
          }
        )
      }
    );
  }
);
TestimonialsWallSection.displayName = "TestimonialsWallSection";

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
import Box36 from "@mui/material/Box";

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
import { jsx as jsx68 } from "react/jsx-runtime";
function AnimatedGradientText({
  children,
  color1 = ANIMATED_GRADIENT_DEFAULT_COLOR1,
  color2 = ANIMATED_GRADIENT_DEFAULT_COLOR2,
  duration = ANIMATED_GRADIENT_DEFAULT_DURATION,
  component = "span",
  sx,
  ...other
}) {
  return /* @__PURE__ */ jsx68(
    Box36,
    {
      component,
      sx: [gradientTextSx(color1, color2, duration), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children
    }
  );
}

// src/components/material/data-display/icon/client-logo-strip/client-logo-strip.tsx
import Box37 from "@mui/material/Box";

// src/components/material/data-display/icon/client-logo-strip/client-logo-strip.const.ts
var CLIENT_LOGO_STRIP_HEIGHT = 20;
var CLIENT_LOGO_STRIP_GAP = 1.5;

// src/components/material/data-display/icon/client-logo-strip/client-logo-strip.styles.ts
var clientLogoStripImageSx = {
  height: CLIENT_LOGO_STRIP_HEIGHT,
  width: "auto",
  objectFit: "contain",
  filter: "brightness(0) invert(1)"
};

// src/components/material/data-display/icon/client-logo-strip/client-logo-strip.tsx
import { jsx as jsx69 } from "react/jsx-runtime";
function ClientLogoStrip({ logos, sx, listSx, ...other }) {
  const items = logos.map((logo) => ({
    key: logo.src,
    icon: /* @__PURE__ */ jsx69(Box37, { component: "img", src: logo.src, alt: logo.alt, sx: clientLogoStripImageSx })
  }));
  return /* @__PURE__ */ jsx69(IconStrip, { items, gap: CLIENT_LOGO_STRIP_GAP, sx, listSx, ...other });
}

// src/components/material/data-display/icon/platform-icon-strip/platform-icon-strip.const.ts
var PLATFORM_ICON_STRIP_GAP = 2.5;

// src/components/material/data-display/icon/platform-icon-strip/platform-icon-strip.tsx
import { jsx as jsx70 } from "react/jsx-runtime";
function PlatformIconStrip({
  items,
  title,
  centeredWrap = false,
  sx,
  ...other
}) {
  const iconStripItems = items.map((item) => ({
    key: item.key,
    icon: item.icon,
    tooltip: item.tooltip
  }));
  return /* @__PURE__ */ jsx70(
    IconStrip,
    {
      items: iconStripItems,
      heading: title,
      centeredWrap,
      gap: PLATFORM_ICON_STRIP_GAP,
      sx,
      ...other
    }
  );
}

// src/components/material/input/rhf-select/rhf-select.tsx
import React34 from "react";
import { Controller as Controller2, useFormContext as useFormContext2 } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { jsx as jsx71, jsxs as jsxs36 } from "react/jsx-runtime";
var RHFSelect = React34.forwardRef(function RHFSelect2({ name, label, helperText, options, fullWidth = true, ...other }, ref) {
  const { control } = useFormContext2();
  return /* @__PURE__ */ jsx71(
    Controller2,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ jsxs36(FormControl, { fullWidth, error: !!error2, ref, children: [
        label && /* @__PURE__ */ jsx71(InputLabel, { id: `${name}-label`, children: label }),
        /* @__PURE__ */ jsx71(
          Select,
          {
            ...field,
            value: field.value ?? "",
            labelId: label ? `${name}-label` : void 0,
            label,
            ...other,
            children: options.map((option) => /* @__PURE__ */ jsx71(MenuItem, { value: option.value, children: option.label }, option.value))
          }
        ),
        (!!error2 || helperText) && /* @__PURE__ */ jsx71(FormHelperText, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFSelect.displayName = "RHFSelect";

// src/components/material/input/rhf-multi-select/rhf-multi-select.tsx
import React35 from "react";
import { Controller as Controller3, useFormContext as useFormContext3 } from "react-hook-form";
import Checkbox2 from "@mui/material/Checkbox";
import FormControl2 from "@mui/material/FormControl";
import FormHelperText2 from "@mui/material/FormHelperText";
import InputLabel2 from "@mui/material/InputLabel";
import MenuItem2 from "@mui/material/MenuItem";
import Select2 from "@mui/material/Select";
import { jsx as jsx72, jsxs as jsxs37 } from "react/jsx-runtime";
var RHFMultiSelect = React35.forwardRef(
  function RHFMultiSelect2({ name, label, helperText, options, fullWidth = true, ...other }, ref) {
    const { control } = useFormContext3();
    return /* @__PURE__ */ jsx72(
      Controller3,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const value = Array.isArray(field.value) ? field.value : [];
          const handleChange = (event) => {
            const { target } = event;
            field.onChange(
              typeof target.value === "string" ? target.value.split(",") : target.value
            );
          };
          const renderSelected = (selected) => selected.map(
            (selectedValue) => options.find((option) => option.value === selectedValue)?.label ?? selectedValue
          ).join(", ");
          return /* @__PURE__ */ jsxs37(FormControl2, { fullWidth, error: !!error2, ref, children: [
            label && /* @__PURE__ */ jsx72(InputLabel2, { id: `${name}-label`, children: label }),
            /* @__PURE__ */ jsx72(
              Select2,
              {
                ...other,
                multiple: true,
                name: field.name,
                value,
                onChange: handleChange,
                onBlur: field.onBlur,
                labelId: label ? `${name}-label` : void 0,
                label,
                renderValue: renderSelected,
                children: options.map((option) => /* @__PURE__ */ jsxs37(MenuItem2, { value: option.value, children: [
                  /* @__PURE__ */ jsx72(Checkbox2, { checked: value.includes(option.value) }),
                  option.label
                ] }, option.value))
              }
            ),
            (!!error2 || helperText) && /* @__PURE__ */ jsx72(FormHelperText2, { children: error2 ? error2.message : helperText })
          ] });
        }
      }
    );
  }
);
RHFMultiSelect.displayName = "RHFMultiSelect";

// src/components/material/input/rhf-checkbox/rhf-checkbox.tsx
import React36 from "react";
import { Controller as Controller4, useFormContext as useFormContext4 } from "react-hook-form";
import Checkbox3 from "@mui/material/Checkbox";
import FormControl3 from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText3 from "@mui/material/FormHelperText";
import { jsx as jsx73, jsxs as jsxs38 } from "react/jsx-runtime";
var RHFCheckbox = React36.forwardRef(function RHFCheckbox2({ name, label, helperText, ...other }, ref) {
  const { control } = useFormContext4();
  return /* @__PURE__ */ jsx73(
    Controller4,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ jsxs38(FormControl3, { error: !!error2, ref, children: [
        /* @__PURE__ */ jsx73(
          FormControlLabel,
          {
            control: /* @__PURE__ */ jsx73(
              Checkbox3,
              {
                ...field,
                checked: !!field.value,
                onChange: (event) => field.onChange(event.target.checked),
                ...other
              }
            ),
            label
          }
        ),
        (!!error2 || helperText) && /* @__PURE__ */ jsx73(FormHelperText3, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFCheckbox.displayName = "RHFCheckbox";

// src/components/material/input/rhf-multi-checkbox/rhf-multi-checkbox.tsx
import React37 from "react";
import { Controller as Controller5, useFormContext as useFormContext5 } from "react-hook-form";
import Checkbox4 from "@mui/material/Checkbox";
import FormControl4 from "@mui/material/FormControl";
import FormControlLabel2 from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText4 from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { jsx as jsx74, jsxs as jsxs39 } from "react/jsx-runtime";
var RHFMultiCheckbox = React37.forwardRef(
  function RHFMultiCheckbox2({ name, label, helperText, options, row, ...other }, ref) {
    const { control } = useFormContext5();
    return /* @__PURE__ */ jsx74(
      Controller5,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const selected = Array.isArray(field.value) ? field.value : [];
          const handleChange = (optionValue) => (event) => {
            field.onChange(
              event.target.checked ? [...selected, optionValue] : selected.filter((value) => value !== optionValue)
            );
          };
          return /* @__PURE__ */ jsxs39(FormControl4, { component: "fieldset", variant: "standard", error: !!error2, ref, children: [
            label && /* @__PURE__ */ jsx74(FormLabel, { component: "legend", children: label }),
            /* @__PURE__ */ jsx74(FormGroup, { row, children: options.map((option) => /* @__PURE__ */ jsx74(
              FormControlLabel2,
              {
                control: /* @__PURE__ */ jsx74(
                  Checkbox4,
                  {
                    checked: selected.includes(option.value),
                    onChange: handleChange(option.value),
                    onBlur: field.onBlur,
                    ...other
                  }
                ),
                label: option.label
              },
              option.value
            )) }),
            (!!error2 || helperText) && /* @__PURE__ */ jsx74(FormHelperText4, { children: error2 ? error2.message : helperText })
          ] });
        }
      }
    );
  }
);
RHFMultiCheckbox.displayName = "RHFMultiCheckbox";

// src/components/material/input/rhf-switch/rhf-switch.tsx
import React38 from "react";
import { Controller as Controller6, useFormContext as useFormContext6 } from "react-hook-form";
import Switch2 from "@mui/material/Switch";
import FormControl5 from "@mui/material/FormControl";
import FormControlLabel3 from "@mui/material/FormControlLabel";
import FormHelperText5 from "@mui/material/FormHelperText";
import { jsx as jsx75, jsxs as jsxs40 } from "react/jsx-runtime";
var RHFSwitch = React38.forwardRef(function RHFSwitch2({ name, label, helperText, ...other }, ref) {
  const { control } = useFormContext6();
  return /* @__PURE__ */ jsx75(
    Controller6,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ jsxs40(FormControl5, { error: !!error2, ref, children: [
        /* @__PURE__ */ jsx75(
          FormControlLabel3,
          {
            control: /* @__PURE__ */ jsx75(
              Switch2,
              {
                ...field,
                checked: !!field.value,
                onChange: (event) => field.onChange(event.target.checked),
                ...other
              }
            ),
            label
          }
        ),
        (!!error2 || helperText) && /* @__PURE__ */ jsx75(FormHelperText5, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFSwitch.displayName = "RHFSwitch";

// src/components/material/input/rhf-multi-switch/rhf-multi-switch.tsx
import React39 from "react";
import { Controller as Controller7, useFormContext as useFormContext7 } from "react-hook-form";
import Switch3 from "@mui/material/Switch";
import FormControl6 from "@mui/material/FormControl";
import FormControlLabel4 from "@mui/material/FormControlLabel";
import FormGroup2 from "@mui/material/FormGroup";
import FormHelperText6 from "@mui/material/FormHelperText";
import FormLabel2 from "@mui/material/FormLabel";
import { jsx as jsx76, jsxs as jsxs41 } from "react/jsx-runtime";
var RHFMultiSwitch = React39.forwardRef(
  function RHFMultiSwitch2({ name, label, helperText, options, row, ...other }, ref) {
    const { control } = useFormContext7();
    return /* @__PURE__ */ jsx76(
      Controller7,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const selected = Array.isArray(field.value) ? field.value : [];
          const handleChange = (optionValue) => (event) => {
            field.onChange(
              event.target.checked ? [...selected, optionValue] : selected.filter((value) => value !== optionValue)
            );
          };
          return /* @__PURE__ */ jsxs41(FormControl6, { component: "fieldset", variant: "standard", error: !!error2, ref, children: [
            label && /* @__PURE__ */ jsx76(FormLabel2, { component: "legend", children: label }),
            /* @__PURE__ */ jsx76(FormGroup2, { row, children: options.map((option) => /* @__PURE__ */ jsx76(
              FormControlLabel4,
              {
                control: /* @__PURE__ */ jsx76(
                  Switch3,
                  {
                    checked: selected.includes(option.value),
                    onChange: handleChange(option.value),
                    onBlur: field.onBlur,
                    ...other
                  }
                ),
                label: option.label
              },
              option.value
            )) }),
            (!!error2 || helperText) && /* @__PURE__ */ jsx76(FormHelperText6, { children: error2 ? error2.message : helperText })
          ] });
        }
      }
    );
  }
);
RHFMultiSwitch.displayName = "RHFMultiSwitch";

// src/components/material/input/rhf-upload/rhf-upload.tsx
import React40 from "react";
import { Controller as Controller8, useFormContext as useFormContext8 } from "react-hook-form";
import Box38 from "@mui/material/Box";
import IconButton6 from "@mui/material/IconButton";
import FormHelperText7 from "@mui/material/FormHelperText";
import Stack10 from "@mui/material/Stack";
import Typography19 from "@mui/material/Typography";

// src/components/material/input/rhf-upload/rhf-upload-icons.defaults.tsx
import SvgIcon6 from "@mui/material/SvgIcon";

// src/components/material/input/rhf-upload/rhf-upload-icons.styles.ts
var uploadIconSx = { width: 32, height: 32 };

// src/components/material/input/rhf-upload/rhf-upload-icons.defaults.tsx
import { jsx as jsx77 } from "react/jsx-runtime";
var CLOSE_ICON = /* @__PURE__ */ jsx77(SvgIcon6, { viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx77("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) });
var UPLOAD_ICON = /* @__PURE__ */ jsx77(SvgIcon6, { viewBox: "0 0 24 24", sx: uploadIconSx, children: /* @__PURE__ */ jsx77("path", { d: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" }) });

// src/components/material/input/rhf-upload/rhf-upload.utils.ts
function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;
  return `${exponent === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
}
function getFileName(file) {
  if (typeof file === "string") {
    const withoutQuery = file.split(/[?#]/)[0] ?? file;
    const segments = withoutQuery.split("/");
    return segments[segments.length - 1] || file;
  }
  return file.name;
}
function getFilePreviewUrl(file) {
  return typeof file === "string" ? file : URL.createObjectURL(file);
}
var IMAGE_EXTENSION_PATTERN = /\.(jpe?g|png|gif|webp|svg|avif|bmp)$/i;
function isImageFile(file) {
  if (typeof file === "string") return IMAGE_EXTENSION_PATTERN.test(file);
  return file.type.startsWith("image/");
}
function fileMatchesAccept(file, accept) {
  const patterns = accept.split(",").map((pattern) => pattern.trim()).filter(Boolean);
  if (patterns.length === 0) return true;
  return patterns.some((pattern) => {
    if (pattern.startsWith(".")) return file.name.toLowerCase().endsWith(pattern.toLowerCase());
    if (pattern.endsWith("/*")) return file.type.startsWith(pattern.slice(0, -1));
    return file.type === pattern;
  });
}
function partitionFilesByValidity(files, options = {}) {
  const accepted = [];
  const rejected = [];
  for (const file of files) {
    if (options.maxSize != null && file.size > options.maxSize) {
      rejected.push({
        file,
        reason: `"${file.name}" is larger than the ${formatFileSize(options.maxSize)} limit.`
      });
      continue;
    }
    if (options.accept && !fileMatchesAccept(file, options.accept)) {
      rejected.push({ file, reason: `"${file.name}" is not an accepted file type.` });
      continue;
    }
    accepted.push(file);
  }
  return { accepted, rejected };
}

// src/components/material/input/rhf-upload/rhf-upload.styles.ts
function getDropZoneBorderColor(hasError, isDragActive) {
  if (hasError) return "error.main";
  if (isDragActive) return "primary.main";
  return "divider";
}
var labelSx = { mb: 1 };
function getDropZoneSx(hasError, isDragActive, disabled) {
  return {
    p: 3,
    border: "1px dashed",
    borderColor: getDropZoneBorderColor(hasError, isDragActive),
    borderRadius: 1,
    textAlign: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    bgcolor: isDragActive ? "action.hover" : "transparent"
  };
}
var dropZoneHintSx = { mt: 1 };
var fileListSx = { mt: 2 };
var fileRowSx = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1.5,
  p: 1,
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 1
};
var fileThumbnailSx = {
  width: 40,
  height: 40,
  borderRadius: 0.5,
  objectFit: "cover"
};
var fileThumbnailPlaceholderSx = {
  width: 40,
  height: 40,
  borderRadius: 0.5,
  bgcolor: "action.hover"
};
var fileInfoSx = { flexGrow: 1, minWidth: 0 };

// src/components/material/input/rhf-upload/rhf-upload.tsx
import { jsx as jsx78, jsxs as jsxs42 } from "react/jsx-runtime";
function toFileArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null || value === "") return [];
  return [value];
}
var RHFUpload = React40.forwardRef(function RHFUpload2({ name, multiple = false, accept, maxSize, label, helperText, disabled = false, onRemove }, ref) {
  const { control } = useFormContext8();
  const inputRef = React40.useRef(null);
  const [isDragActive, setIsDragActive] = React40.useState(false);
  const [rejections, setRejections] = React40.useState([]);
  return /* @__PURE__ */ jsx78(
    Controller8,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => {
        const files = toFileArray(field.value);
        function commitFiles(incoming) {
          const { accepted, rejected } = partitionFilesByValidity(incoming, { accept, maxSize });
          setRejections(rejected.map((r) => r.reason));
          if (accepted.length === 0) return;
          if (multiple) {
            field.onChange([...files, ...accepted]);
          } else {
            field.onChange(accepted[0]);
          }
        }
        function handleDrop(event) {
          event.preventDefault();
          setIsDragActive(false);
          if (disabled) return;
          commitFiles(Array.from(event.dataTransfer.files));
        }
        function handleDragOver(event) {
          event.preventDefault();
        }
        function handleDragEnter(event) {
          event.preventDefault();
          if (!disabled) setIsDragActive(true);
        }
        function handleDragLeave(event) {
          event.preventDefault();
          setIsDragActive(false);
        }
        function handleInputChange(event) {
          const selected = event.target.files ? Array.from(event.target.files) : [];
          commitFiles(selected);
          event.target.value = "";
        }
        function handleRemove(fileToRemove) {
          if (multiple) {
            field.onChange(files.filter((file) => file !== fileToRemove));
          } else {
            field.onChange(null);
          }
          onRemove?.(fileToRemove);
        }
        return /* @__PURE__ */ jsxs42(Box38, { ref, children: [
          label && /* @__PURE__ */ jsx78(Typography19, { variant: "subtitle2", sx: labelSx, children: label }),
          /* @__PURE__ */ jsxs42(
            Box38,
            {
              onClick: () => !disabled && inputRef.current?.click(),
              onDrop: handleDrop,
              onDragOver: handleDragOver,
              onDragEnter: handleDragEnter,
              onDragLeave: handleDragLeave,
              onKeyDown: (event) => {
                if (disabled) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  inputRef.current?.click();
                }
              },
              role: "button",
              "aria-disabled": disabled,
              tabIndex: disabled ? -1 : 0,
              sx: getDropZoneSx(!!error2, isDragActive, disabled),
              children: [
                /* @__PURE__ */ jsx78(
                  "input",
                  {
                    ref: inputRef,
                    type: "file",
                    hidden: true,
                    multiple,
                    accept,
                    disabled,
                    onChange: handleInputChange,
                    "aria-label": typeof label === "string" ? label : "Upload file"
                  }
                ),
                UPLOAD_ICON,
                /* @__PURE__ */ jsxs42(Typography19, { variant: "body2", sx: dropZoneHintSx, children: [
                  "Drop ",
                  multiple ? "files" : "a file",
                  " here or click to browse"
                ] })
              ]
            }
          ),
          files.length > 0 && /* @__PURE__ */ jsx78(Stack10, { spacing: 1, sx: fileListSx, children: files.map((file, index) => /* @__PURE__ */ jsxs42(
            Box38,
            {
              sx: fileRowSx,
              children: [
                isImageFile(file) ? /* @__PURE__ */ jsx78(
                  Box38,
                  {
                    component: "img",
                    src: getFilePreviewUrl(file),
                    alt: getFileName(file),
                    sx: fileThumbnailSx
                  }
                ) : /* @__PURE__ */ jsx78(Box38, { sx: fileThumbnailPlaceholderSx }),
                /* @__PURE__ */ jsxs42(Box38, { sx: fileInfoSx, children: [
                  /* @__PURE__ */ jsx78(Typography19, { variant: "body2", noWrap: true, children: getFileName(file) }),
                  typeof file !== "string" && /* @__PURE__ */ jsx78(Typography19, { variant: "caption", color: "text.secondary", children: formatFileSize(file.size) })
                ] }),
                /* @__PURE__ */ jsx78(
                  IconButton6,
                  {
                    size: "small",
                    "aria-label": `Remove ${getFileName(file)}`,
                    onClick: (event) => {
                      event.stopPropagation();
                      handleRemove(file);
                    },
                    disabled,
                    children: CLOSE_ICON
                  }
                )
              ]
            },
            typeof file === "string" ? file : `${file.name}-${index}`
          )) }),
          rejections.map((reason) => /* @__PURE__ */ jsx78(FormHelperText7, { error: true, children: reason }, reason)),
          (!!error2 || helperText) && !rejections.length && /* @__PURE__ */ jsx78(FormHelperText7, { error: !!error2, children: error2 ? error2.message : helperText })
        ] });
      }
    }
  );
});
RHFUpload.displayName = "RHFUpload";

// src/components/material/input/rhf-upload-box/rhf-upload-box.tsx
import React41 from "react";
import { Controller as Controller9, useFormContext as useFormContext9 } from "react-hook-form";
import Box39 from "@mui/material/Box";
import FormHelperText8 from "@mui/material/FormHelperText";
import Typography20 from "@mui/material/Typography";

// src/components/material/input/rhf-upload-box/rhf-upload-box.styles.ts
function getDropZoneBorderColor2(hasError, isDragActive) {
  if (hasError) return "error.main";
  if (isDragActive) return "primary.main";
  return "divider";
}
function getDropZoneSx2(hasError, isDragActive, disabled) {
  return {
    width: 80,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed",
    borderColor: getDropZoneBorderColor2(hasError, isDragActive),
    borderRadius: 1,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    bgcolor: isDragActive ? "action.hover" : "transparent",
    overflow: "hidden"
  };
}
var thumbnailSx = { width: "100%", height: "100%", objectFit: "cover" };
var fileNameSx = { px: 0.5 };

// src/components/material/input/rhf-upload-box/rhf-upload-box.tsx
import { jsx as jsx79, jsxs as jsxs43 } from "react/jsx-runtime";
function renderBoxContent(value, placeholder) {
  if (!value) return placeholder ?? UPLOAD_ICON;
  if (isImageFile(value)) {
    const src = typeof value === "string" ? value : URL.createObjectURL(value);
    return /* @__PURE__ */ jsx79(Box39, { component: "img", src, alt: getFileName(value), sx: thumbnailSx });
  }
  return /* @__PURE__ */ jsx79(Typography20, { variant: "caption", noWrap: true, sx: fileNameSx, children: getFileName(value) });
}
var RHFUploadBox = React41.forwardRef(
  function RHFUploadBox2({ name, accept, maxSize, helperText, disabled = false, placeholder }, ref) {
    const { control } = useFormContext9();
    const inputRef = React41.useRef(null);
    const [isDragActive, setIsDragActive] = React41.useState(false);
    const [rejection, setRejection] = React41.useState(null);
    return /* @__PURE__ */ jsx79(
      Controller9,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          function commitFiles(incoming) {
            const { accepted, rejected } = partitionFilesByValidity(incoming, {
              accept,
              maxSize
            });
            setRejection(rejected[0]?.reason ?? null);
            if (accepted.length > 0) field.onChange(accepted[0]);
          }
          function handleDrop(event) {
            event.preventDefault();
            setIsDragActive(false);
            if (disabled) return;
            commitFiles(Array.from(event.dataTransfer.files));
          }
          function handleDragOver(event) {
            event.preventDefault();
          }
          function handleDragEnter(event) {
            event.preventDefault();
            if (!disabled) setIsDragActive(true);
          }
          function handleDragLeave(event) {
            event.preventDefault();
            setIsDragActive(false);
          }
          function handleInputChange(event) {
            const selected = event.target.files ? Array.from(event.target.files) : [];
            commitFiles(selected);
            event.target.value = "";
          }
          return /* @__PURE__ */ jsxs43(Box39, { ref, children: [
            /* @__PURE__ */ jsxs43(
              Box39,
              {
                onClick: () => !disabled && inputRef.current?.click(),
                onDrop: handleDrop,
                onDragOver: handleDragOver,
                onDragEnter: handleDragEnter,
                onDragLeave: handleDragLeave,
                onKeyDown: (event) => {
                  if (disabled) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    inputRef.current?.click();
                  }
                },
                role: "button",
                "aria-disabled": disabled,
                "aria-label": "Upload file",
                tabIndex: disabled ? -1 : 0,
                sx: getDropZoneSx2(!!error2, isDragActive, disabled),
                children: [
                  /* @__PURE__ */ jsx79(
                    "input",
                    {
                      ref: inputRef,
                      type: "file",
                      hidden: true,
                      accept,
                      disabled,
                      onChange: handleInputChange,
                      "aria-label": "Upload file"
                    }
                  ),
                  renderBoxContent(field.value, placeholder)
                ]
              }
            ),
            rejection && /* @__PURE__ */ jsx79(FormHelperText8, { error: true, children: rejection }),
            (!!error2 || helperText) && !rejection && /* @__PURE__ */ jsx79(FormHelperText8, { error: !!error2, children: error2 ? error2.message : helperText })
          ] });
        }
      }
    );
  }
);
RHFUploadBox.displayName = "RHFUploadBox";

// src/components/material/input/rhf-upload-avatar/rhf-upload-avatar.tsx
import React42 from "react";
import { Controller as Controller10, useFormContext as useFormContext10 } from "react-hook-form";
import Avatar3 from "@mui/material/Avatar";
import Box40 from "@mui/material/Box";
import FormHelperText9 from "@mui/material/FormHelperText";

// src/components/material/input/rhf-upload-avatar/rhf-upload-avatar.styles.ts
var rootSx4 = { display: "inline-block" };
function getDropZoneBorderColor3(hasError, isDragActive) {
  if (hasError) return "error.main";
  if (isDragActive) return "primary.main";
  return "divider";
}
function getDropZoneSx3(size, hasError, isDragActive, disabled) {
  return {
    width: size,
    height: size,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed",
    borderColor: getDropZoneBorderColor3(hasError, isDragActive),
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    bgcolor: isDragActive ? "action.hover" : "transparent"
  };
}
function getAvatarSx(size) {
  return { width: size, height: size };
}

// src/components/material/input/rhf-upload-avatar/rhf-upload-avatar.tsx
import { jsx as jsx80, jsxs as jsxs44 } from "react/jsx-runtime";
var IMAGE_ACCEPT = "image/*";
var RHFUploadAvatar = React42.forwardRef(
  function RHFUploadAvatar2({ name, maxSize, helperText, disabled = false, size = 96 }, ref) {
    const { control } = useFormContext10();
    const inputRef = React42.useRef(null);
    const [isDragActive, setIsDragActive] = React42.useState(false);
    const [rejection, setRejection] = React42.useState(null);
    return /* @__PURE__ */ jsx80(
      Controller10,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          function commitFiles(incoming) {
            const { accepted, rejected } = partitionFilesByValidity(incoming, {
              accept: IMAGE_ACCEPT,
              maxSize
            });
            setRejection(rejected[0]?.reason ?? null);
            if (accepted.length > 0) field.onChange(accepted[0]);
          }
          function handleDrop(event) {
            event.preventDefault();
            setIsDragActive(false);
            if (disabled) return;
            commitFiles(Array.from(event.dataTransfer.files));
          }
          function handleDragOver(event) {
            event.preventDefault();
          }
          function handleDragEnter(event) {
            event.preventDefault();
            if (!disabled) setIsDragActive(true);
          }
          function handleDragLeave(event) {
            event.preventDefault();
            setIsDragActive(false);
          }
          function handleInputChange(event) {
            const selected = event.target.files ? Array.from(event.target.files) : [];
            commitFiles(selected);
            event.target.value = "";
          }
          return /* @__PURE__ */ jsxs44(Box40, { ref, sx: rootSx4, children: [
            /* @__PURE__ */ jsxs44(
              Box40,
              {
                onClick: () => !disabled && inputRef.current?.click(),
                onDrop: handleDrop,
                onDragOver: handleDragOver,
                onDragEnter: handleDragEnter,
                onDragLeave: handleDragLeave,
                onKeyDown: (event) => {
                  if (disabled) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    inputRef.current?.click();
                  }
                },
                role: "button",
                "aria-disabled": disabled,
                "aria-label": "Upload avatar",
                tabIndex: disabled ? -1 : 0,
                sx: getDropZoneSx3(size, !!error2, isDragActive, disabled),
                children: [
                  /* @__PURE__ */ jsx80(
                    "input",
                    {
                      ref: inputRef,
                      type: "file",
                      hidden: true,
                      accept: IMAGE_ACCEPT,
                      disabled,
                      onChange: handleInputChange,
                      "aria-label": "Upload avatar"
                    }
                  ),
                  field.value ? /* @__PURE__ */ jsx80(Avatar3, { src: getFilePreviewUrl(field.value), sx: getAvatarSx(size) }) : UPLOAD_ICON
                ]
              }
            ),
            rejection && /* @__PURE__ */ jsx80(FormHelperText9, { error: true, children: rejection }),
            (!!error2 || helperText) && !rejection && /* @__PURE__ */ jsx80(FormHelperText9, { error: !!error2, children: error2 ? error2.message : helperText })
          ] });
        }
      }
    );
  }
);
RHFUploadAvatar.displayName = "RHFUploadAvatar";

// src/components/material/input/rhf-phone-input/rhf-phone-input.tsx
import React43 from "react";
import { Controller as Controller11, useFormContext as useFormContext11 } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import Box41 from "@mui/material/Box";
import TextField2 from "@mui/material/TextField";

// src/components/material/input/rhf-phone-input/rhf-phone-input.styles.ts
var rhfPhoneInputRootSx = {
  "& .PhoneInput": { display: "flex", alignItems: "center", gap: 1 },
  "& .PhoneInputCountry": {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    flexShrink: 0
  },
  "& .PhoneInputCountryIcon": { width: 20, height: 20, display: "flex" },
  "& .PhoneInputCountrySelect": {
    position: "absolute",
    inset: 0,
    width: "100%",
    opacity: 0,
    cursor: "pointer",
    border: 0
  },
  "& .PhoneInputCountrySelectArrow": { display: "none" },
  "& .PhoneInputInput": { flex: 1 }
};

// src/components/material/input/rhf-phone-input/rhf-phone-input.tsx
import { jsx as jsx81 } from "react/jsx-runtime";
var PhoneNumberTextField = React43.forwardRef(
  function PhoneNumberTextField2(props, ref) {
    return /* @__PURE__ */ jsx81(TextField2, { ...props, inputRef: ref, fullWidth: true });
  }
);
function CountryFlag({ country, countryName }) {
  if (!country) return /* @__PURE__ */ jsx81("span", {});
  return /* @__PURE__ */ jsx81(
    GiselleIcon,
    {
      icon: `circle-flags:${country.toLowerCase()}`,
      width: 20,
      height: 20,
      role: "img",
      "aria-label": countryName
    }
  );
}
var RHFPhoneInput = React43.forwardRef(
  function RHFPhoneInput2({ name, label, helperText, defaultCountry, international = true, disabled, ...other }, ref) {
    const { control } = useFormContext11();
    return /* @__PURE__ */ jsx81(
      Controller11,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ jsx81(Box41, { ref, sx: rhfPhoneInputRootSx, children: /* @__PURE__ */ jsx81(
          PhoneInput,
          {
            international,
            defaultCountry,
            disabled,
            value: field.value,
            onChange: (value) => field.onChange(value ?? ""),
            onBlur: field.onBlur,
            inputComponent: PhoneNumberTextField,
            flagComponent: CountryFlag,
            numberInputProps: {
              name,
              label,
              disabled,
              error: !!error2,
              helperText: error2 ? error2.message : helperText,
              ...other
            }
          }
        ) })
      }
    );
  }
);
RHFPhoneInput.displayName = "RHFPhoneInput";

// src/components/material/input/rhf-date-picker/rhf-date-picker.tsx
import React44 from "react";
import dayjs from "dayjs";
import { Controller as Controller12, useFormContext as useFormContext12 } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { jsx as jsx82 } from "react/jsx-runtime";
var RHFDatePicker = React44.forwardRef(
  function RHFDatePicker2({ name, label, helperText, slotProps, ...other }, ref) {
    const { control } = useFormContext12();
    return /* @__PURE__ */ jsx82(
      Controller12,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const value = field.value ? dayjs(field.value) : null;
          return /* @__PURE__ */ jsx82(
            DatePicker,
            {
              ...other,
              label,
              value,
              onChange: (newValue) => field.onChange(newValue),
              ref,
              slotProps: {
                ...slotProps,
                textField: {
                  ...slotProps?.textField,
                  fullWidth: true,
                  onBlur: field.onBlur,
                  error: !!error2,
                  helperText: error2 ? error2.message : helperText
                }
              }
            }
          );
        }
      }
    );
  }
);
RHFDatePicker.displayName = "RHFDatePicker";

// src/components/material/input/rhf-time-picker/rhf-time-picker.tsx
import React45 from "react";
import dayjs2 from "dayjs";
import { Controller as Controller13, useFormContext as useFormContext13 } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { jsx as jsx83 } from "react/jsx-runtime";
var RHFTimePicker = React45.forwardRef(
  function RHFTimePicker2({ name, label, helperText, slotProps, ...other }, ref) {
    const { control } = useFormContext13();
    return /* @__PURE__ */ jsx83(
      Controller13,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const value = field.value ? dayjs2(field.value) : null;
          return /* @__PURE__ */ jsx83(
            TimePicker,
            {
              ...other,
              label,
              value,
              onChange: (newValue) => field.onChange(newValue),
              ref,
              slotProps: {
                ...slotProps,
                textField: {
                  ...slotProps?.textField,
                  fullWidth: true,
                  onBlur: field.onBlur,
                  error: !!error2,
                  helperText: error2 ? error2.message : helperText
                }
              }
            }
          );
        }
      }
    );
  }
);
RHFTimePicker.displayName = "RHFTimePicker";

// src/components/material/input/rhf-date-time-picker/rhf-date-time-picker.tsx
import React46 from "react";
import dayjs3 from "dayjs";
import { Controller as Controller14, useFormContext as useFormContext14 } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { jsx as jsx84 } from "react/jsx-runtime";
var RHFDateTimePicker = React46.forwardRef(
  function RHFDateTimePicker2({ name, label, helperText, slotProps, ...other }, ref) {
    const { control } = useFormContext14();
    return /* @__PURE__ */ jsx84(
      Controller14,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const value = field.value ? dayjs3(field.value) : null;
          return /* @__PURE__ */ jsx84(
            DateTimePicker,
            {
              ...other,
              label,
              value,
              onChange: (newValue) => field.onChange(newValue),
              ref,
              slotProps: {
                ...slotProps,
                textField: {
                  ...slotProps?.textField,
                  fullWidth: true,
                  onBlur: field.onBlur,
                  error: !!error2,
                  helperText: error2 ? error2.message : helperText
                }
              }
            }
          );
        }
      }
    );
  }
);
RHFDateTimePicker.displayName = "RHFDateTimePicker";

// src/components/material/input/rhf-autocomplete/rhf-autocomplete.tsx
import React47 from "react";
import { Controller as Controller15, useFormContext as useFormContext15 } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField3 from "@mui/material/TextField";
import { jsx as jsx85 } from "react/jsx-runtime";
var RHFAutocomplete = React47.forwardRef(
  function RHFAutocomplete2({ name, label, helperText, options, textFieldProps, ...other }, ref) {
    const { control } = useFormContext15();
    return /* @__PURE__ */ jsx85(
      Controller15,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const selectedOption = options.find((option) => option.value === field.value) ?? null;
          const handleChange = (_event, newValue) => {
            field.onChange(newValue ? newValue.value : null);
          };
          return /* @__PURE__ */ jsx85(
            Autocomplete,
            {
              ...other,
              ref,
              options,
              value: selectedOption,
              onChange: handleChange,
              onBlur: field.onBlur,
              getOptionLabel: (option) => option.label,
              isOptionEqualToValue: (option, value) => option.value === value.value,
              renderInput: (params) => /* @__PURE__ */ jsx85(
                TextField3,
                {
                  ...params,
                  ...textFieldProps,
                  label,
                  error: !!error2,
                  helperText: error2 ? error2.message : helperText
                }
              )
            }
          );
        }
      }
    );
  }
);
RHFAutocomplete.displayName = "RHFAutocomplete";

// src/components/material/input/rhf-country-select/rhf-country-select.tsx
import React48 from "react";
import { Controller as Controller16, useFormContext as useFormContext16 } from "react-hook-form";
import Autocomplete2 from "@mui/material/Autocomplete";
import TextField4 from "@mui/material/TextField";

// src/utils/countries/countries.ts
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
var countryDisplayNames = new Intl.DisplayNames(["en"], { type: "region" });
var COUNTRIES = getCountries().map((code) => ({
  code,
  label: countryDisplayNames.of(code) ?? code,
  phone: `+${getCountryCallingCode(code)}`
})).filter((country) => country.label !== country.code).sort((a, b) => a.label.localeCompare(b.label));

// src/components/material/input/rhf-country-select/rhf-country-select.tsx
import { jsx as jsx86 } from "react/jsx-runtime";
var RHFCountrySelect = React48.forwardRef(
  function RHFCountrySelect2({ name, label, helperText, textFieldProps, ...other }, ref) {
    const { control } = useFormContext16();
    return /* @__PURE__ */ jsx86(
      Controller16,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const selectedCountry = COUNTRIES.find((country) => country.code === field.value) ?? null;
          const handleChange = (_event, newValue) => {
            field.onChange(newValue ? newValue.code : null);
          };
          return /* @__PURE__ */ jsx86(
            Autocomplete2,
            {
              ...other,
              ref,
              options: COUNTRIES,
              value: selectedCountry,
              onChange: handleChange,
              onBlur: field.onBlur,
              getOptionLabel: (country) => country.label,
              isOptionEqualToValue: (country, value) => country.code === value.code,
              renderInput: (params) => /* @__PURE__ */ jsx86(
                TextField4,
                {
                  ...params,
                  ...textFieldProps,
                  label,
                  error: !!error2,
                  helperText: error2 ? error2.message : helperText
                }
              )
            }
          );
        }
      }
    );
  }
);
RHFCountrySelect.displayName = "RHFCountrySelect";

// src/components/material/input/rhf-number-input/rhf-number-input.tsx
import React49 from "react";
import { jsx as jsx87 } from "react/jsx-runtime";
var RHFNumberInput = React49.forwardRef(
  function RHFNumberInput2(props, ref) {
    return /* @__PURE__ */ jsx87(RHFTextField, { ...props, ref, type: "number" });
  }
);
RHFNumberInput.displayName = "RHFNumberInput";

// src/components/material/input/rhf-slider/rhf-slider.tsx
import React50 from "react";
import { Controller as Controller17, useFormContext as useFormContext17 } from "react-hook-form";
import FormControl7 from "@mui/material/FormControl";
import FormHelperText10 from "@mui/material/FormHelperText";
import FormLabel3 from "@mui/material/FormLabel";
import Slider2 from "@mui/material/Slider";
import { jsx as jsx88, jsxs as jsxs45 } from "react/jsx-runtime";
var RHFSlider = React50.forwardRef(function RHFSlider2({ name, label, helperText, min = 0, max = 100, onChangeCommitted, ...other }, ref) {
  const { control } = useFormContext17();
  return /* @__PURE__ */ jsx88(
    Controller17,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ jsxs45(FormControl7, { fullWidth: true, error: !!error2, ref, children: [
        label && /* @__PURE__ */ jsx88(FormLabel3, { htmlFor: `${name}-slider`, children: label }),
        /* @__PURE__ */ jsx88(
          Slider2,
          {
            ...other,
            id: `${name}-slider`,
            name: field.name,
            min,
            max,
            value: typeof field.value === "number" || Array.isArray(field.value) ? field.value : min,
            onChange: (_event, value) => field.onChange(value),
            onChangeCommitted: (event, value) => {
              field.onBlur();
              onChangeCommitted?.(event, value);
            }
          }
        ),
        (!!error2 || helperText) && /* @__PURE__ */ jsx88(FormHelperText10, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFSlider.displayName = "RHFSlider";

// src/components/material/input/rhf-code/rhf-code.tsx
import React51 from "react";
import { Controller as Controller18, useFormContext as useFormContext18 } from "react-hook-form";
import { MuiOtpInput } from "mui-one-time-password-input";
import FormControl8 from "@mui/material/FormControl";
import FormHelperText11 from "@mui/material/FormHelperText";
import FormLabel4 from "@mui/material/FormLabel";
import { jsx as jsx89, jsxs as jsxs46 } from "react/jsx-runtime";
var RHFCode = React51.forwardRef(function RHFCode2({ name, label, helperText, length = 6, TextFieldsProps, ...other }, ref) {
  const { control } = useFormContext18();
  return /* @__PURE__ */ jsx89(
    Controller18,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ jsxs46(FormControl8, { error: !!error2, ref, children: [
        label && /* @__PURE__ */ jsx89(FormLabel4, { children: label }),
        /* @__PURE__ */ jsx89(
          MuiOtpInput,
          {
            ...other,
            length,
            value: field.value ?? "",
            onChange: field.onChange,
            onBlur: field.onBlur,
            TextFieldsProps: (index) => ({
              ...typeof TextFieldsProps === "function" ? TextFieldsProps(index) : TextFieldsProps,
              error: !!error2
            })
          }
        ),
        (!!error2 || helperText) && /* @__PURE__ */ jsx89(FormHelperText11, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFCode.displayName = "RHFCode";

// src/components/material/input/rhf-radio-group/rhf-radio-group.tsx
import React52 from "react";
import { Controller as Controller19, useFormContext as useFormContext19 } from "react-hook-form";
import FormControl9 from "@mui/material/FormControl";
import FormControlLabel5 from "@mui/material/FormControlLabel";
import FormHelperText12 from "@mui/material/FormHelperText";
import FormLabel5 from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { jsx as jsx90, jsxs as jsxs47 } from "react/jsx-runtime";
var RHFRadioGroup = React52.forwardRef(
  function RHFRadioGroup2({ name, label, helperText, options, disabled, ...other }, ref) {
    const { control } = useFormContext19();
    return /* @__PURE__ */ jsx90(
      Controller19,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ jsxs47(FormControl9, { error: !!error2, disabled, ref, children: [
          label && /* @__PURE__ */ jsx90(FormLabel5, { id: `${name}-label`, children: label }),
          /* @__PURE__ */ jsx90(
            RadioGroup,
            {
              ...field,
              value: field.value ?? "",
              "aria-labelledby": `${name}-label`,
              ...other,
              children: options.map((option) => /* @__PURE__ */ jsx90(
                FormControlLabel5,
                {
                  value: option.value,
                  label: option.label,
                  disabled: option.disabled,
                  control: /* @__PURE__ */ jsx90(Radio, {})
                },
                option.value
              ))
            }
          ),
          (!!error2 || helperText) && /* @__PURE__ */ jsx90(FormHelperText12, { children: error2 ? error2.message : helperText })
        ] })
      }
    );
  }
);
RHFRadioGroup.displayName = "RHFRadioGroup";

// src/components/material/input/rhf-rating/rhf-rating.tsx
import React53 from "react";
import { Controller as Controller20, useFormContext as useFormContext20 } from "react-hook-form";
import FormControl10 from "@mui/material/FormControl";
import FormHelperText13 from "@mui/material/FormHelperText";
import FormLabel6 from "@mui/material/FormLabel";
import Rating from "@mui/material/Rating";
import { jsx as jsx91, jsxs as jsxs48 } from "react/jsx-runtime";
var RHFRating = React53.forwardRef(function RHFRating2({ name, label, helperText, ...other }, ref) {
  const { control } = useFormContext20();
  return /* @__PURE__ */ jsx91(
    Controller20,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ jsxs48(FormControl10, { error: !!error2, ref, children: [
        label && /* @__PURE__ */ jsx91(FormLabel6, { component: "legend", children: label }),
        /* @__PURE__ */ jsx91(
          Rating,
          {
            ...other,
            name: field.name,
            value: field.value ?? null,
            onBlur: field.onBlur,
            onChange: (_event, newValue) => field.onChange(newValue),
            ref: field.ref
          }
        ),
        (!!error2 || helperText) && /* @__PURE__ */ jsx91(FormHelperText13, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFRating.displayName = "RHFRating";

// src/components/material/form/dynamic-field/dynamic-field.tsx
import { useFormContext as useFormContext21, useWatch } from "react-hook-form";

// src/components/material/form/dynamic-field/read-only-value/read-only-value.tsx
import Box42 from "@mui/material/Box";
import Typography21 from "@mui/material/Typography";
import { jsx as jsx92, jsxs as jsxs49 } from "react/jsx-runtime";
function isUploadValue(candidate) {
  return candidate instanceof File || typeof candidate === "string";
}
function formatValue(value) {
  if (value == null || value === "") return "\u2014";
  if (Array.isArray(value) && value.every(isUploadValue)) {
    return value.length === 0 ? "\u2014" : value.map(getFileName).join(", ");
  }
  if (isUploadValue(value) && value instanceof File) return getFileName(value);
  return String(value);
}
function ReadOnlyFieldValue({ label, value }) {
  const displayValue = formatValue(value);
  return /* @__PURE__ */ jsxs49(Box42, { children: [
    label && /* @__PURE__ */ jsx92(Typography21, { variant: "caption", color: "text.secondary", component: "div", children: label }),
    /* @__PURE__ */ jsx92(Typography21, { variant: "body1", children: displayValue })
  ] });
}

// src/components/material/form/dynamic-field/dynamic-field.tsx
import { jsx as jsx93 } from "react/jsx-runtime";
function DynamicField({ field }) {
  const { control } = useFormContext21();
  const value = useWatch({ control, name: field.name });
  if (field.disabled) {
    return /* @__PURE__ */ jsx93(ReadOnlyFieldValue, { label: field.label, value });
  }
  switch (field.type) {
    case "text":
      return /* @__PURE__ */ jsx93(RHFTextField, { name: field.name, label: field.label, helperText: field.helperText });
    case "number":
      return /* @__PURE__ */ jsx93(RHFNumberInput, { name: field.name, label: field.label, helperText: field.helperText });
    case "select":
      return /* @__PURE__ */ jsx93(
        RHFSelect,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "multiselect":
      return /* @__PURE__ */ jsx93(
        RHFMultiSelect,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "autocomplete":
      return /* @__PURE__ */ jsx93(
        RHFAutocomplete,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "country":
      return /* @__PURE__ */ jsx93(RHFCountrySelect, { name: field.name, label: field.label, helperText: field.helperText });
    case "checkbox":
      return /* @__PURE__ */ jsx93(RHFCheckbox, { name: field.name, label: field.label, helperText: field.helperText });
    case "multiCheckbox":
      return /* @__PURE__ */ jsx93(
        RHFMultiCheckbox,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "switch":
      return /* @__PURE__ */ jsx93(RHFSwitch, { name: field.name, label: field.label, helperText: field.helperText });
    case "multiSwitch":
      return /* @__PURE__ */ jsx93(
        RHFMultiSwitch,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "upload":
      return /* @__PURE__ */ jsx93(
        RHFUpload,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          multiple: field.multiple,
          accept: field.accept,
          maxSize: field.maxSize
        }
      );
    case "uploadBox":
      return /* @__PURE__ */ jsx93(
        RHFUploadBox,
        {
          name: field.name,
          helperText: field.helperText,
          accept: field.accept,
          maxSize: field.maxSize
        }
      );
    case "uploadAvatar":
      return /* @__PURE__ */ jsx93(RHFUploadAvatar, { name: field.name, helperText: field.helperText, maxSize: field.maxSize });
    case "phone":
      return /* @__PURE__ */ jsx93(
        RHFPhoneInput,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          defaultCountry: field.defaultCountry
        }
      );
    case "date":
      return /* @__PURE__ */ jsx93(RHFDatePicker, { name: field.name, label: field.label, helperText: field.helperText });
    case "time":
      return /* @__PURE__ */ jsx93(RHFTimePicker, { name: field.name, label: field.label, helperText: field.helperText });
    case "dateTime":
      return /* @__PURE__ */ jsx93(RHFDateTimePicker, { name: field.name, label: field.label, helperText: field.helperText });
    case "slider":
      return /* @__PURE__ */ jsx93(
        RHFSlider,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          min: field.min,
          max: field.max,
          step: field.step
        }
      );
    case "code":
      return /* @__PURE__ */ jsx93(RHFCode, { name: field.name, label: field.label, helperText: field.helperText });
    case "radio":
      return /* @__PURE__ */ jsx93(
        RHFRadioGroup,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "rating":
      return /* @__PURE__ */ jsx93(RHFRating, { name: field.name, label: field.label, helperText: field.helperText });
    default: {
      const exhaustiveCheck = field.type;
      throw new Error(`DynamicField: unhandled field type "${exhaustiveCheck}"`);
    }
  }
}
DynamicField.displayName = "DynamicField";

// src/components/material/form/dynamic-form/dynamic-form.tsx
import { useEffect as useEffect7, useMemo as useMemo5 } from "react";
import { useForm } from "react-hook-form";
import Accordion2 from "@mui/material/Accordion";
import AccordionDetails2 from "@mui/material/AccordionDetails";
import AccordionSummary2 from "@mui/material/AccordionSummary";
import Box43 from "@mui/material/Box";
import Button4 from "@mui/material/Button";
import Chip3 from "@mui/material/Chip";
import Grid7 from "@mui/material/Grid";
import Typography22 from "@mui/material/Typography";

// src/components/material/form/dynamic-form/dynamic-form.styles.ts
var dynamicFormGroupLabelSx = {
  flexGrow: 1
};
var dynamicFormSubmitWrapperSx = {
  mt: 2
};

// src/components/material/form/dynamic-form/dynamic-form.utils.ts
function getDefaultValuesFromFields(fields) {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue ?? (field.type === "multiselect" ? [] : "");
    return acc;
  }, {});
}
function groupFields(fields) {
  return fields.reduce((acc, field) => {
    const group = field.group ?? "Ungrouped";
    (acc[group] ?? (acc[group] = [])).push(field);
    return acc;
  }, {});
}
function hasAnyGroup(fields) {
  return fields.some((field) => field.group !== void 0);
}

// src/components/material/form/dynamic-form/dynamic-form.tsx
import { jsx as jsx94, jsxs as jsxs50 } from "react/jsx-runtime";
function FieldGrid({ fields }) {
  return /* @__PURE__ */ jsx94(Grid7, { container: true, spacing: 2, children: fields.map((field) => /* @__PURE__ */ jsx94(Grid7, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ jsx94(DynamicField, { field }) }, field.name)) });
}
function DynamicForm({
  fields,
  onSubmit,
  showSubmitButton = true,
  submitLabel = "Submit"
}) {
  const defaultValues = useMemo5(() => getDefaultValuesFromFields(fields), [fields]);
  const methods = useForm({ defaultValues, mode: "onChange" });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid }
  } = methods;
  useEffect7(() => {
    reset(defaultValues);
  }, [fields]);
  const grouped = useMemo5(() => groupFields(fields), [fields]);
  const isGrouped = useMemo5(() => hasAnyGroup(fields), [fields]);
  return /* @__PURE__ */ jsxs50(Form, { methods, onSubmit: handleSubmit(onSubmit), children: [
    isGrouped ? Object.entries(grouped).map(([group, groupFields2], index) => /* @__PURE__ */ jsxs50(Accordion2, { defaultExpanded: index === 0, children: [
      /* @__PURE__ */ jsxs50(
        AccordionSummary2,
        {
          expandIcon: /* @__PURE__ */ jsx94(GiselleIcon, { icon: "solar:alt-arrow-down-bold", width: 16 }),
          "aria-controls": `${group}-content`,
          id: `${group}-header`,
          children: [
            /* @__PURE__ */ jsx94(Typography22, { sx: dynamicFormGroupLabelSx, children: group }),
            /* @__PURE__ */ jsx94(Chip3, { label: groupFields2.length, size: "small" })
          ]
        }
      ),
      /* @__PURE__ */ jsx94(AccordionDetails2, { children: /* @__PURE__ */ jsx94(FieldGrid, { fields: groupFields2 }) })
    ] }, group)) : /* @__PURE__ */ jsx94(FieldGrid, { fields }),
    showSubmitButton && /* @__PURE__ */ jsx94(Box43, { sx: dynamicFormSubmitWrapperSx, children: /* @__PURE__ */ jsx94(Button4, { type: "submit", variant: "contained", fullWidth: true, disabled: !isDirty || !isValid, children: submitLabel }) })
  ] });
}
DynamicForm.displayName = "DynamicForm";

// src/utils/table/table-utils.ts
function rowInPage(data, page, rowsPerPage) {
  return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}
function getNestedProperty(obj, key) {
  return key.split(".").reduce((acc, part) => acc && acc[part], obj);
}
function descendingComparator(a, b, orderBy) {
  const aValue = getNestedProperty(a, orderBy);
  const bValue = getNestedProperty(b, orderBy);
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// src/utils/hooks/use-table/use-table.ts
import { useState as useState9, useCallback as useCallback13 } from "react";
function useTable(props) {
  const [dense, setDense] = useState9(!!props?.defaultDense);
  const [page, setPage] = useState9(props?.defaultCurrentPage ?? 0);
  const [orderBy, setOrderBy] = useState9(props?.defaultOrderBy ?? "name");
  const [rowsPerPage, setRowsPerPage] = useState9(props?.defaultRowsPerPage ?? 5);
  const [order, setOrder] = useState9(props?.defaultOrder ?? "asc");
  const [selected, setSelected] = useState9(props?.defaultSelected ?? []);
  const onSort = useCallback13(
    (id) => {
      const isAsc = orderBy === id && order === "asc";
      if (id !== "") {
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );
  const onSelectRow = useCallback13(
    (inputValue) => {
      const newSelected = selected.includes(inputValue) ? selected.filter((value) => value !== inputValue) : [...selected, inputValue];
      setSelected(newSelected);
    },
    [selected]
  );
  const onChangeRowsPerPage = useCallback13((event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);
  const onChangeDense = useCallback13((event) => {
    setDense(event.target.checked);
  }, []);
  const onSelectAllRows = useCallback13((checked, inputValue) => {
    if (checked) {
      setSelected(inputValue);
      return;
    }
    setSelected([]);
  }, []);
  const onChangePage = useCallback13((_event, newPage) => {
    setPage(newPage);
  }, []);
  const onResetPage = useCallback13(() => {
    setPage(0);
  }, []);
  const onUpdatePageDeleteRow = useCallback13(
    (totalRowsInPage) => {
      setSelected([]);
      if (page) {
        if (totalRowsInPage < 2) {
          setPage(page - 1);
        }
      }
    },
    [page]
  );
  const onUpdatePageDeleteRows = useCallback13(
    (totalRowsInPage, totalRowsFiltered) => {
      const totalSelected = selected.length;
      setSelected([]);
      if (page) {
        if (totalSelected === totalRowsInPage) {
          setPage(page - 1);
        } else if (totalSelected === totalRowsFiltered) {
          setPage(0);
        } else if (totalSelected > totalRowsInPage) {
          const newPage = Math.ceil((totalRowsFiltered - totalSelected) / rowsPerPage) - 1;
          setPage(newPage);
        }
      }
    },
    [page, rowsPerPage, selected.length]
  );
  return {
    dense,
    order,
    page,
    orderBy,
    rowsPerPage,
    /********/
    selected,
    onSelectRow,
    onSelectAllRows,
    /********/
    onSort,
    onChangePage,
    onChangeDense,
    onResetPage,
    onChangeRowsPerPage,
    onUpdatePageDeleteRow,
    onUpdatePageDeleteRows,
    /********/
    setPage,
    setDense,
    setOrder,
    setOrderBy,
    setSelected,
    setRowsPerPage
  };
}

// src/components/material/data-display/table/skeleton/table-skeleton.tsx
import Skeleton from "@mui/material/Skeleton";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { jsx as jsx95 } from "react/jsx-runtime";
function TableSkeleton({ rowCount = 0, cellCount = 0, ...other }) {
  return Array.from({ length: rowCount }, (_, rowIndex) => /* @__PURE__ */ jsx95(TableRow, { ...other, children: Array.from({ length: cellCount }, (__, cellIndex) => /* @__PURE__ */ jsx95(TableCell, { children: /* @__PURE__ */ jsx95(Skeleton, { variant: "text" }) }, cellIndex)) }, rowIndex));
}
TableSkeleton.displayName = "TableSkeleton";

// src/components/material/data-display/table/empty-rows/table-empty-rows.tsx
import React54 from "react";
import TableRow2 from "@mui/material/TableRow";
import TableCell2 from "@mui/material/TableCell";

// src/components/material/data-display/table/empty-rows/table-empty-rows.styles.ts
var tableEmptyRowsRootSx = (height, emptyRows2) => ({
  ...height && { height: height * emptyRows2 }
});

// src/components/material/data-display/table/empty-rows/table-empty-rows.tsx
import { jsx as jsx96 } from "react/jsx-runtime";
var TableEmptyRows = React54.forwardRef(
  function TableEmptyRows2({ emptyRows: emptyRows2, height, colSpan = 9, sx, ...other }, ref) {
    if (!emptyRows2) {
      return null;
    }
    return /* @__PURE__ */ jsx96(
      TableRow2,
      {
        ref,
        sx: [tableEmptyRowsRootSx(height, emptyRows2), ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: /* @__PURE__ */ jsx96(TableCell2, { colSpan })
      }
    );
  }
);
TableEmptyRows.displayName = "TableEmptyRows";

// src/components/material/data-display/table/head-custom/table-head-custom.tsx
import React55 from "react";
import Box44 from "@mui/material/Box";
import TableRow3 from "@mui/material/TableRow";
import Checkbox5 from "@mui/material/Checkbox";
import TableHead from "@mui/material/TableHead";
import TableCell3 from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

// src/components/material/data-display/table/head-custom/table-head-custom.styles.ts
var visuallyHiddenSx = {
  border: 0,
  padding: 0,
  width: "1px",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)"
};
var tableHeadCustomCellSx = (width) => ({ width });

// src/components/material/data-display/table/head-custom/table-head-custom.utils.ts
function isIndeterminateSelection(numSelected, rowCount) {
  return !!numSelected && numSelected < rowCount;
}
function isAllRowsSelected(numSelected, rowCount) {
  return !!rowCount && numSelected === rowCount;
}
function isSortedColumn(orderBy, columnId) {
  return orderBy === columnId;
}

// src/components/material/data-display/table/head-custom/table-head-custom.tsx
import { jsx as jsx97, jsxs as jsxs51 } from "react/jsx-runtime";
var TableHeadCustom = React55.forwardRef(
  function TableHeadCustom2({
    sx,
    order,
    onSort,
    orderBy,
    headCells,
    rowCount = 0,
    numSelected = 0,
    onSelectAllRows,
    ...other
  }, ref) {
    return /* @__PURE__ */ jsx97(TableHead, { ref, sx, ...other, children: /* @__PURE__ */ jsxs51(TableRow3, { children: [
      onSelectAllRows && /* @__PURE__ */ jsx97(TableCell3, { padding: "checkbox", children: /* @__PURE__ */ jsx97(
        Checkbox5,
        {
          indeterminate: isIndeterminateSelection(numSelected, rowCount),
          checked: isAllRowsSelected(numSelected, rowCount),
          onChange: (event) => onSelectAllRows(event.target.checked),
          slotProps: {
            input: {
              id: "all-row-checkbox",
              "aria-label": "All row Checkbox"
            }
          }
        }
      ) }),
      headCells.map((headCell) => /* @__PURE__ */ jsx97(
        TableCell3,
        {
          align: headCell.align || "left",
          sortDirection: isSortedColumn(orderBy, headCell.id) ? order : false,
          sx: [
            tableHeadCustomCellSx(headCell.width),
            ...Array.isArray(headCell.sx) ? headCell.sx : [headCell.sx]
          ],
          children: onSort ? /* @__PURE__ */ jsxs51(
            TableSortLabel,
            {
              hideSortIcon: true,
              active: isSortedColumn(orderBy, headCell.id),
              direction: isSortedColumn(orderBy, headCell.id) ? order : "asc",
              onClick: () => onSort(headCell.id),
              children: [
                headCell.label,
                isSortedColumn(orderBy, headCell.id) ? /* @__PURE__ */ jsx97(Box44, { component: "span", sx: visuallyHiddenSx, children: order === "desc" ? "sorted descending" : "sorted ascending" }) : null
              ]
            }
          ) : headCell.label
        },
        headCell.id
      ))
    ] }) });
  }
);
TableHeadCustom.displayName = "TableHeadCustom";

// src/components/material/data-display/table/pagination-custom/table-pagination-custom.tsx
import React56 from "react";
import Box45 from "@mui/material/Box";
import Switch4 from "@mui/material/Switch";
import TablePagination from "@mui/material/TablePagination";
import FormControlLabel6 from "@mui/material/FormControlLabel";

// src/components/material/data-display/table/pagination-custom/table-pagination-custom.styles.ts
var tablePaginationCustomRootSx = { position: "relative" };
var tablePaginationCustomDenseLabelSx = {
  pl: 2,
  py: 1.5,
  top: 0,
  position: { sm: "absolute" }
};
var tablePaginationCustomInnerSx = { borderTopColor: "transparent" };

// src/components/material/data-display/table/pagination-custom/table-pagination-custom.tsx
import { jsx as jsx98, jsxs as jsxs52 } from "react/jsx-runtime";
var TablePaginationCustom = React56.forwardRef(
  function TablePaginationCustom2({ sx, dense, onChangeDense, rowsPerPageOptions = [5, 10, 25], ...other }, ref) {
    return /* @__PURE__ */ jsxs52(Box45, { ref, sx: [tablePaginationCustomRootSx, ...Array.isArray(sx) ? sx : [sx]], children: [
      /* @__PURE__ */ jsx98(
        TablePagination,
        {
          rowsPerPageOptions,
          component: "div",
          ...other,
          sx: tablePaginationCustomInnerSx
        }
      ),
      onChangeDense && /* @__PURE__ */ jsx98(
        FormControlLabel6,
        {
          label: "Dense",
          control: /* @__PURE__ */ jsx98(
            Switch4,
            {
              checked: dense,
              onChange: onChangeDense,
              slotProps: { input: { id: "dense-switch" } }
            }
          ),
          sx: tablePaginationCustomDenseLabelSx
        }
      )
    ] });
  }
);
TablePaginationCustom.displayName = "TablePaginationCustom";

// src/components/material/feedback/preview-line/preview-line.tsx
import { forwardRef as forwardRef4 } from "react";
import Box46 from "@mui/material/Box";

// src/components/material/feedback/preview-line/preview-line.styles.ts
import { alpha as alpha5 } from "@mui/material/styles";

// src/components/material/feedback/preview-line/preview-line.const.ts
var PREVIEW_LINE_DEFAULT_HEIGHT = 10;
var PREVIEW_LINE_DEFAULT_OPACITY = 0.12;
var PREVIEW_LINE_ROUNDED_RADIUS = 99;
var PREVIEW_LINE_SQUARE_RADIUS = 2;

// src/components/material/feedback/preview-line/preview-line.styles.ts
var previewLineSx = (width, height, opacity2, rounded) => (theme) => ({
  width,
  height,
  borderRadius: rounded ? PREVIEW_LINE_ROUNDED_RADIUS : PREVIEW_LINE_SQUARE_RADIUS,
  bgcolor: alpha5(theme.palette.text.primary, opacity2)
});

// src/components/material/feedback/preview-line/preview-line.tsx
import { jsx as jsx99 } from "react/jsx-runtime";
var PreviewLine = forwardRef4(function PreviewLine2({
  width,
  height = PREVIEW_LINE_DEFAULT_HEIGHT,
  opacity: opacity2 = PREVIEW_LINE_DEFAULT_OPACITY,
  rounded = true,
  sx,
  ...other
}, ref) {
  return /* @__PURE__ */ jsx99(
    Box46,
    {
      ref,
      sx: [previewLineSx(width, height, opacity2, rounded), ...Array.isArray(sx) ? sx : [sx]],
      ...other
    }
  );
});
PreviewLine.displayName = "PreviewLine";

// src/components/material/feedback/preview-card/preview-card.tsx
import { forwardRef as forwardRef5 } from "react";
import Stack11 from "@mui/material/Stack";

// src/components/material/feedback/preview-card/preview-card.utils.ts
import { alpha as alpha6 } from "@mui/material/styles";
function getPreviewBorderColor(theme, visualConfig) {
  return theme.palette.mode === "dark" ? alpha6(theme.palette.common.white, visualConfig.darkBorderOpacity) : alpha6(theme.palette.text.primary, visualConfig.lightBorderOpacity);
}
function getPreviewCardBackground(theme, visualConfig) {
  return theme.palette.mode === "dark" ? alpha6(theme.palette.common.white, visualConfig.darkCardBgOpacity) : alpha6(theme.palette.background.paper, visualConfig.lightCardBgOpacity);
}
function getPreviewCardLineWidth(lineIndex, lineStep) {
  return `${100 - lineIndex * lineStep}%`;
}

// src/components/material/feedback/preview-card/preview-card.styles.ts
var previewCardSx = (padding, minHeight, visualConfig) => (theme) => ({
  p: padding,
  minHeight,
  borderRadius: 2,
  bgcolor: getPreviewCardBackground(theme, visualConfig),
  border: "1px solid",
  borderColor: getPreviewBorderColor(theme, visualConfig)
});

// src/components/material/feedback/preview-card/preview-card.tsx
import { jsx as jsx100, jsxs as jsxs53 } from "react/jsx-runtime";
function toSxArray2(sx) {
  if (Array.isArray(sx)) return sx;
  return sx ? [sx] : [];
}
var PreviewCard = forwardRef5(function PreviewCard2({ metrics, padding, minHeight, titleWidth, lineCount, lineStep, visualConfig, sx, ...other }, ref) {
  return /* @__PURE__ */ jsxs53(
    Stack11,
    {
      ref,
      spacing: metrics.gap,
      sx: [previewCardSx(padding, minHeight, visualConfig), ...toSxArray2(sx)],
      ...other,
      children: [
        /* @__PURE__ */ jsx100(PreviewLine, { width: titleWidth, height: 12 }),
        Array.from({ length: lineCount }).map((_, lineIndex) => /* @__PURE__ */ jsx100(
          PreviewLine,
          {
            width: getPreviewCardLineWidth(lineIndex, lineStep),
            height: 8,
            opacity: 0.08
          },
          lineIndex
        ))
      ]
    }
  );
});
PreviewCard.displayName = "PreviewCard";

// src/components/material/feedback/horizontal-preview/horizontal-preview.tsx
import Box48 from "@mui/material/Box";
import Stack13 from "@mui/material/Stack";

// src/components/material/feedback/horizontal-preview/preview-nav-surface/preview-nav-surface.tsx
import Box47 from "@mui/material/Box";
import Stack12 from "@mui/material/Stack";

// src/components/material/feedback/horizontal-preview/preview-nav-surface/preview-nav-surface.styles.ts
import { alpha as alpha8 } from "@mui/material/styles";

// src/components/material/feedback/horizontal-preview/preview-nav-surface/preview-nav-surface.utils.ts
import { alpha as alpha7 } from "@mui/material/styles";
function getPreviewNavBackground(theme, navColor, visualConfig) {
  if (navColor === "integrate") {
    return theme.palette.mode === "dark" ? alpha7(theme.palette.primary.main, visualConfig.darkIntegrateNavBgOpacity) : alpha7(theme.palette.primary.main, visualConfig.lightIntegrateNavBgOpacity);
  }
  return theme.palette.mode === "dark" ? alpha7(theme.palette.common.white, visualConfig.darkNavBgOpacity) : alpha7(theme.palette.background.paper, visualConfig.lightNavBgOpacity);
}
function getPreviewNavSurfaceTrailingWidth(compactLayout) {
  return compactLayout ? "22%" : "28%";
}

// src/components/material/feedback/horizontal-preview/preview-nav-surface/preview-nav-surface.styles.ts
var previewNavSurfaceSx = (navColor, metrics, recentlyChanged, visualConfig) => {
  const highlighted = recentlyChanged === "navLayout" || recentlyChanged === "navColor";
  return (theme) => ({
    height: metrics.headerHeight,
    px: 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 2,
    border: "1px solid",
    borderColor: highlighted ? theme.palette.primary.main : getPreviewBorderColor(theme, visualConfig),
    bgcolor: getPreviewNavBackground(theme, navColor, visualConfig),
    transition: "all 220ms ease",
    ...highlighted ? { boxShadow: `0 0 0 2px ${alpha8(theme.palette.primary.main, 0.24)}` } : {}
  });
};
var previewNavSurfaceLinesRowSx = { minWidth: 0, flex: 1 };
var previewNavSurfaceLineWrapperSx = { minWidth: 0, flex: 1 };
var previewNavSurfaceTrailingSx = (compactLayout) => ({
  ml: 1,
  minWidth: 0,
  width: getPreviewNavSurfaceTrailingWidth(compactLayout)
});

// src/components/material/feedback/horizontal-preview/preview-nav-surface/preview-nav-surface.tsx
import { jsx as jsx101, jsxs as jsxs54 } from "react/jsx-runtime";
var NAV_LINE_COUNT = 4;
function PreviewNavSurface({
  compactLayout,
  navColor,
  metrics,
  recentlyChanged,
  visualConfig
}) {
  return /* @__PURE__ */ jsxs54(Box47, { sx: previewNavSurfaceSx(navColor, metrics, recentlyChanged, visualConfig), children: [
    /* @__PURE__ */ jsx101(Stack12, { direction: "row", spacing: 1, sx: previewNavSurfaceLinesRowSx, children: Array.from({ length: NAV_LINE_COUNT }).map((_, index) => /* @__PURE__ */ jsx101(Box47, { sx: previewNavSurfaceLineWrapperSx, children: /* @__PURE__ */ jsx101(PreviewLine, { width: "100%", opacity: 0.14 }) }, index)) }),
    /* @__PURE__ */ jsx101(Box47, { sx: previewNavSurfaceTrailingSx(compactLayout), children: /* @__PURE__ */ jsx101(PreviewLine, { width: "100%", height: 12 }) })
  ] });
}

// src/components/material/feedback/horizontal-preview/horizontal-preview.styles.ts
import { alpha as alpha9 } from "@mui/material/styles";

// src/components/material/feedback/horizontal-preview/horizontal-preview.utils.ts
function getHorizontalPreviewCardCount(compactLayout) {
  return compactLayout ? 3 : 2;
}
function getHorizontalPreviewGridColumns(compactLayout) {
  return compactLayout ? "1.25fr 1fr 1fr" : "1.4fr 1fr";
}
function getHorizontalPreviewCardPadding(compactLayout) {
  return compactLayout ? 1.25 : 1.5;
}
function getHorizontalPreviewCardMinHeight(compactLayout) {
  return compactLayout ? 112 : 132;
}
function getHorizontalPreviewCardLineCount(compactLayout) {
  return compactLayout ? 4 : 3;
}
function getHorizontalPreviewCardTitleWidth(cardIndex) {
  return `${68 - cardIndex * 8}%`;
}

// src/components/material/feedback/horizontal-preview/horizontal-preview.styles.ts
var horizontalPreviewGridSx = (gap, compactLayout, recentlyChanged) => {
  const highlighted = recentlyChanged === "compactLayout";
  return (theme) => ({
    gap,
    display: "grid",
    gridTemplateColumns: getHorizontalPreviewGridColumns(compactLayout),
    transition: "all 220ms ease",
    ...highlighted ? {
      borderRadius: 1.5,
      boxShadow: `0 0 0 2px ${alpha9(theme.palette.primary.main, 0.18)}`
    } : {}
  });
};

// src/components/material/feedback/horizontal-preview/horizontal-preview.tsx
import { jsx as jsx102, jsxs as jsxs55 } from "react/jsx-runtime";
var CARD_LINE_STEP = 9;
function HorizontalPreview({
  compactLayout,
  navColor,
  metrics,
  recentlyChanged,
  visualConfig
}) {
  const cardCount = getHorizontalPreviewCardCount(compactLayout);
  return /* @__PURE__ */ jsxs55(Stack13, { spacing: metrics.gap, children: [
    /* @__PURE__ */ jsx102(
      PreviewNavSurface,
      {
        compactLayout,
        navColor,
        metrics,
        recentlyChanged,
        visualConfig
      }
    ),
    /* @__PURE__ */ jsx102(Box48, { sx: horizontalPreviewGridSx(metrics.gap, compactLayout, recentlyChanged), children: Array.from({ length: cardCount }).map((_, index) => /* @__PURE__ */ jsx102(
      PreviewCard,
      {
        metrics: { gap: metrics.gap },
        padding: getHorizontalPreviewCardPadding(compactLayout),
        minHeight: getHorizontalPreviewCardMinHeight(compactLayout),
        titleWidth: getHorizontalPreviewCardTitleWidth(index),
        lineCount: getHorizontalPreviewCardLineCount(compactLayout),
        lineStep: CARD_LINE_STEP,
        visualConfig
      },
      index
    )) })
  ] });
}

// src/components/material/feedback/side-nav-preview/side-nav-preview.tsx
import Box49 from "@mui/material/Box";
import Stack14 from "@mui/material/Stack";

// src/components/material/feedback/side-nav-preview/side-nav-preview.styles.ts
import { alpha as alpha11 } from "@mui/material/styles";

// src/components/material/feedback/side-nav-preview/side-nav-preview.utils.ts
import { alpha as alpha10 } from "@mui/material/styles";
function getPreviewNavBackground2(theme, navColor, visualConfig) {
  if (navColor === "integrate") {
    return theme.palette.mode === "dark" ? alpha10(theme.palette.primary.main, visualConfig.darkIntegrateNavBgOpacity) : alpha10(theme.palette.primary.main, visualConfig.lightIntegrateNavBgOpacity);
  }
  return theme.palette.mode === "dark" ? alpha10(theme.palette.common.white, visualConfig.darkNavBgOpacity) : alpha10(theme.palette.background.paper, visualConfig.lightNavBgOpacity);
}
function getSideNavPreviewRailWidth(navLayout, railWidth) {
  return navLayout === "mini" ? `clamp(56px, 20%, ${railWidth.mini}px)` : `clamp(96px, 32%, ${railWidth.vertical}px)`;
}
function getSideNavPreviewRailLineWidth(navLayout, fullWidthPercent) {
  return navLayout === "mini" ? 20 : `${fullWidthPercent}%`;
}
function getSideNavPreviewRailItemCount(compactLayout) {
  return compactLayout ? 5 : 4;
}
function getSideNavPreviewCardCount(compactLayout) {
  return compactLayout ? 6 : 4;
}
function getSideNavPreviewCardColumns(compactLayout) {
  return compactLayout ? "repeat(3, 1fr)" : "repeat(2, 1fr)";
}
function getSideNavPreviewCardPadding(compactLayout) {
  return compactLayout ? 1.1 : 1.5;
}
function getSideNavPreviewCardMinHeight(compactLayout) {
  return compactLayout ? 72 : 96;
}
function getSideNavPreviewCardTitleWidth(cardIndex) {
  return `${72 - cardIndex % 3 * 10}%`;
}
function getSideNavPreviewHeaderTitleWidth(compactLayout) {
  return compactLayout ? "52%" : "58%";
}
function getSideNavPreviewHeaderIconSize(compactLayout) {
  return compactLayout ? 18 : 22;
}

// src/components/material/feedback/side-nav-preview/side-nav-preview.styles.ts
var sideNavPreviewRootSx = {
  alignItems: "stretch",
  width: 1,
  minWidth: 0
};
var sideNavPreviewRailSx = (navLayout, navColor, compactLayout, railWidth, recentlyChanged, visualConfig) => {
  const highlighted = recentlyChanged === "navLayout" || recentlyChanged === "navColor";
  return (theme) => ({
    width: getSideNavPreviewRailWidth(navLayout, railWidth),
    flexShrink: 0,
    p: compactLayout ? 1 : 1.25,
    borderRadius: 2,
    border: "1px solid",
    borderColor: highlighted ? theme.palette.primary.main : getPreviewBorderColor(theme, visualConfig),
    bgcolor: getPreviewNavBackground2(theme, navColor, visualConfig),
    transition: "all 220ms ease",
    ...highlighted ? { boxShadow: `0 0 0 2px ${alpha11(theme.palette.primary.main, 0.24)}` } : {}
  });
};
var sideNavPreviewHeaderSx = (compactLayout, metrics, visualConfig) => {
  return (theme) => ({
    height: metrics.headerHeight,
    px: compactLayout ? 1.25 : 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 0,
    borderRadius: 2,
    bgcolor: getPreviewCardBackground(theme, visualConfig),
    border: "1px solid",
    borderColor: getPreviewBorderColor(theme, visualConfig)
  });
};
var sideNavPreviewCardGridSx = (gap, compactLayout, recentlyChanged) => {
  const highlighted = recentlyChanged === "compactLayout";
  return (theme) => ({
    gap,
    display: "grid",
    gridTemplateColumns: getSideNavPreviewCardColumns(compactLayout),
    transition: "all 220ms ease",
    ...highlighted ? {
      borderRadius: 1.5,
      boxShadow: `0 0 0 2px ${alpha11(theme.palette.primary.main, 0.18)}`
    } : {}
  });
};
var sideNavPreviewRailSpacerSx = { flexGrow: 1 };
var sideNavPreviewMainColumnSx = { minWidth: 0, flex: 1 };
var sideNavPreviewHeaderTitleSx = (compactLayout) => ({
  minWidth: 0,
  width: getSideNavPreviewHeaderTitleWidth(compactLayout)
});
var sideNavPreviewHeaderIconsSx = { flexShrink: 0 };

// src/components/material/feedback/side-nav-preview/side-nav-preview.tsx
import { jsx as jsx103, jsxs as jsxs56 } from "react/jsx-runtime";
var HEADER_ICON_COUNT = 3;
var CARD_LINE_STEP2 = 8;
function SideNavPreview({
  compactLayout,
  navColor,
  navLayout,
  metrics,
  recentlyChanged,
  visualConfig
}) {
  const railItemCount = getSideNavPreviewRailItemCount(compactLayout);
  const cardCount = getSideNavPreviewCardCount(compactLayout);
  return /* @__PURE__ */ jsxs56(Stack14, { direction: "row", spacing: metrics.gap, sx: sideNavPreviewRootSx, children: [
    /* @__PURE__ */ jsxs56(
      Stack14,
      {
        spacing: metrics.gap,
        sx: sideNavPreviewRailSx(
          navLayout,
          navColor,
          compactLayout,
          metrics.railWidth,
          recentlyChanged,
          visualConfig
        ),
        children: [
          /* @__PURE__ */ jsx103(
            PreviewLine,
            {
              width: getSideNavPreviewRailLineWidth(navLayout, 58),
              height: 12,
              opacity: 0.18
            }
          ),
          Array.from({ length: railItemCount }).map((_, index) => /* @__PURE__ */ jsx103(
            PreviewLine,
            {
              width: getSideNavPreviewRailLineWidth(navLayout, 84 - index * 6),
              opacity: 0.13
            },
            index
          )),
          /* @__PURE__ */ jsx103(Box49, { sx: sideNavPreviewRailSpacerSx }),
          /* @__PURE__ */ jsx103(PreviewLine, { width: getSideNavPreviewRailLineWidth(navLayout, 72), opacity: 0.11 })
        ]
      }
    ),
    /* @__PURE__ */ jsxs56(Stack14, { spacing: metrics.gap, sx: sideNavPreviewMainColumnSx, children: [
      /* @__PURE__ */ jsxs56(Box49, { sx: sideNavPreviewHeaderSx(compactLayout, metrics, visualConfig), children: [
        /* @__PURE__ */ jsx103(Box49, { sx: sideNavPreviewHeaderTitleSx(compactLayout), children: /* @__PURE__ */ jsx103(PreviewLine, { width: "100%", height: 12 }) }),
        /* @__PURE__ */ jsx103(Stack14, { direction: "row", spacing: 1, sx: sideNavPreviewHeaderIconsSx, children: Array.from({ length: HEADER_ICON_COUNT }).map((_, index) => /* @__PURE__ */ jsx103(
          PreviewLine,
          {
            width: getSideNavPreviewHeaderIconSize(compactLayout),
            height: getSideNavPreviewHeaderIconSize(compactLayout),
            opacity: 0.1
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsx103(Box49, { sx: sideNavPreviewCardGridSx(metrics.gap, compactLayout, recentlyChanged), children: Array.from({ length: cardCount }).map((_, index) => /* @__PURE__ */ jsx103(
        PreviewCard,
        {
          metrics: { gap: metrics.gap },
          padding: getSideNavPreviewCardPadding(compactLayout),
          minHeight: getSideNavPreviewCardMinHeight(compactLayout),
          titleWidth: getSideNavPreviewCardTitleWidth(index),
          lineCount: metrics.cardRows,
          lineStep: CARD_LINE_STEP2,
          visualConfig
        },
        index
      )) })
    ] })
  ] });
}

// src/components/material/feedback/dashboard-mockup-preview/dashboard-mockup-preview.tsx
import { useEffect as useEffect8, useRef as useRef4, useState as useState10 } from "react";
import Box50 from "@mui/material/Box";
import Chip4 from "@mui/material/Chip";
import Stack15 from "@mui/material/Stack";
import Typography23 from "@mui/material/Typography";

// src/components/material/feedback/dashboard-mockup-preview/dashboard-mockup-preview.utils.ts
import { alpha as alpha12 } from "@mui/material/styles";

// src/components/material/feedback/dashboard-mockup-preview/dashboard-mockup-preview.const.ts
var DEFAULT_DASHBOARD_MOCKUP_PREVIEW_CONTENT = {
  overline: "See the difference",
  heading: "Imagine you have a dashboard like this",
  description: "Your users interact with it differently based on their layout and density preferences. Watch how these choices transform the entire experience, keeping them engaged with controls that actually respond to their needs.",
  compactDensityLabel: "Compact density",
  comfortableDensityLabel: "Comfortable density",
  navLabelPrefix: "Nav",
  colorLabelPrefix: "Color",
  lastChangeCompactLabel: "Last change: compact density",
  lastChangeComfortableLabel: "Last change: comfortable density",
  lastChangeNavLayoutPrefix: "Last change: nav layout ->",
  lastChangeNavColorPrefix: "Last change: nav color ->",
  lastChangeFallbackLabel: "Toggle a control to see what changed"
};
var DEFAULT_DASHBOARD_MOCKUP_PREVIEW_VISUAL_CONFIG = {
  darkBorderOpacity: 0.16,
  lightBorderOpacity: 0.08,
  darkCardBgOpacity: 0.06,
  lightCardBgOpacity: 1,
  darkNavBgOpacity: 0.08,
  lightNavBgOpacity: 0.92,
  darkIntegrateNavBgOpacity: 0.26,
  lightIntegrateNavBgOpacity: 0.12,
  darkCanvasBgOpacity: 0.04,
  lightCanvasBgOpacity: 0.03
};
var DASHBOARD_MOCKUP_PREVIEW_METRICS = {
  compact: {
    gap: 1,
    headerHeight: 40,
    cardRows: 4,
    railWidth: { vertical: 120, mini: 68 }
  },
  relaxed: {
    gap: 1.5,
    headerHeight: 52,
    cardRows: 3,
    railWidth: { vertical: 144, mini: 76 }
  }
};

// src/components/material/feedback/dashboard-mockup-preview/dashboard-mockup-preview.utils.ts
function resolvePreviewContent(content) {
  return { ...DEFAULT_DASHBOARD_MOCKUP_PREVIEW_CONTENT, ...content };
}
function resolvePreviewVisualConfig(visualConfig) {
  return { ...DEFAULT_DASHBOARD_MOCKUP_PREVIEW_VISUAL_CONFIG, ...visualConfig };
}
function resolvePreviewMetrics(compactLayout) {
  return compactLayout ? DASHBOARD_MOCKUP_PREVIEW_METRICS.compact : DASHBOARD_MOCKUP_PREVIEW_METRICS.relaxed;
}
function getRecentChangeLabel({
  recentlyChanged,
  compactLayout,
  navLayout,
  navColor,
  content
}) {
  if (recentlyChanged === "compactLayout") {
    return compactLayout ? content.lastChangeCompactLabel : content.lastChangeComfortableLabel;
  }
  if (recentlyChanged === "navLayout") {
    return `${content.lastChangeNavLayoutPrefix} ${navLayout}`;
  }
  if (recentlyChanged === "navColor") {
    return `${content.lastChangeNavColorPrefix} ${navColor}`;
  }
  return content.lastChangeFallbackLabel;
}
function getPreviewCanvasBackground(theme, visualConfig) {
  return theme.palette.mode === "dark" ? alpha12(theme.palette.common.white, visualConfig.darkCanvasBgOpacity) : alpha12(theme.palette.text.primary, visualConfig.lightCanvasBgOpacity);
}

// src/components/material/feedback/dashboard-mockup-preview/dashboard-mockup-preview.styles.ts
var dashboardMockupPreviewRootSx = {
  p: 2,
  width: 1,
  minWidth: 0,
  borderRadius: 3,
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper"
};
var dashboardMockupPreviewChipRowSx = { flexWrap: "wrap" };
var dashboardMockupPreviewSecondaryTextSx = { color: "text.secondary" };
var dashboardMockupPreviewCanvasSx = (visualConfig) => {
  return (theme) => ({
    p: 1.25,
    width: 1,
    minWidth: 0,
    borderRadius: 2.5,
    bgcolor: getPreviewCanvasBackground(theme, visualConfig),
    border: "1px solid",
    borderColor: getPreviewBorderColor(theme, visualConfig)
  });
};

// src/components/material/feedback/dashboard-mockup-preview/dashboard-mockup-preview.tsx
import { jsx as jsx104, jsxs as jsxs57 } from "react/jsx-runtime";
function DashboardMockupPreview({
  compactLayout,
  navColor,
  navLayout,
  content,
  visualConfig
}) {
  const metrics = resolvePreviewMetrics(compactLayout);
  const [recentlyChanged, setRecentlyChanged] = useState10(null);
  const previousSettings = useRef4({ compactLayout, navColor, navLayout });
  const resolvedContent = resolvePreviewContent(content);
  const resolvedVisualConfig = resolvePreviewVisualConfig(visualConfig);
  useEffect8(() => {
    const prev = previousSettings.current;
    if (prev.compactLayout !== compactLayout) {
      setRecentlyChanged("compactLayout");
    } else if (prev.navLayout !== navLayout) {
      setRecentlyChanged("navLayout");
    } else if (prev.navColor !== navColor) {
      setRecentlyChanged("navColor");
    }
    previousSettings.current = { compactLayout, navColor, navLayout };
  }, [compactLayout, navColor, navLayout]);
  const recentChangeLabel = getRecentChangeLabel({
    recentlyChanged,
    compactLayout,
    navLayout,
    navColor,
    content: resolvedContent
  });
  return /* @__PURE__ */ jsxs57(Stack15, { spacing: 2, sx: dashboardMockupPreviewRootSx, children: [
    /* @__PURE__ */ jsxs57(Stack15, { spacing: 1, children: [
      /* @__PURE__ */ jsx104(Typography23, { variant: "overline", sx: dashboardMockupPreviewSecondaryTextSx, children: resolvedContent.overline }),
      /* @__PURE__ */ jsx104(Typography23, { variant: "subtitle1", children: resolvedContent.heading }),
      /* @__PURE__ */ jsx104(Typography23, { variant: "body2", sx: dashboardMockupPreviewSecondaryTextSx, children: resolvedContent.description })
    ] }),
    /* @__PURE__ */ jsxs57(Stack15, { direction: "row", spacing: 1, useFlexGap: true, sx: dashboardMockupPreviewChipRowSx, children: [
      /* @__PURE__ */ jsx104(
        Chip4,
        {
          label: compactLayout ? resolvedContent.compactDensityLabel : resolvedContent.comfortableDensityLabel,
          size: "small",
          color: recentlyChanged === "compactLayout" ? "primary" : "default",
          variant: recentlyChanged === "compactLayout" ? "filled" : "outlined"
        }
      ),
      /* @__PURE__ */ jsx104(
        Chip4,
        {
          label: `${resolvedContent.navLabelPrefix}: ${navLayout}`,
          size: "small",
          color: recentlyChanged === "navLayout" ? "primary" : "default",
          variant: recentlyChanged === "navLayout" ? "filled" : "outlined"
        }
      ),
      /* @__PURE__ */ jsx104(
        Chip4,
        {
          label: `${resolvedContent.colorLabelPrefix}: ${navColor}`,
          size: "small",
          color: recentlyChanged === "navColor" ? "primary" : "default",
          variant: recentlyChanged === "navColor" ? "filled" : "outlined"
        }
      )
    ] }),
    /* @__PURE__ */ jsx104(Typography23, { variant: "caption", sx: dashboardMockupPreviewSecondaryTextSx, children: recentChangeLabel }),
    /* @__PURE__ */ jsx104(Box50, { sx: dashboardMockupPreviewCanvasSx(resolvedVisualConfig), children: navLayout === "horizontal" ? /* @__PURE__ */ jsx104(
      HorizontalPreview,
      {
        compactLayout,
        navColor,
        metrics,
        recentlyChanged,
        visualConfig: resolvedVisualConfig
      }
    ) : /* @__PURE__ */ jsx104(
      SideNavPreview,
      {
        compactLayout,
        navColor,
        navLayout,
        metrics,
        recentlyChanged,
        visualConfig: resolvedVisualConfig
      }
    ) })
  ] });
}
export {
  TOGGLE_ICON_SIZE as ACCORDION_CHECK_ICON_SIZE,
  ACCORDION_DONE_MIN_TOUCH_TARGET,
  TOGGLE_MIN_TOUCH_TARGET as ACCORDION_ICON_BUTTON_MIN_SIZE,
  Accordion,
  AlexRebulaBrandMark,
  AnimatedGradientText,
  AppShell,
  BACK_TO_TOP_BUTTON_DEFAULT_SCROLL_THRESHOLD,
  BACK_TO_TOP_BUTTON_SIZE,
  BACK_TO_TOP_BUTTON_WCAG_MIN_SIZE,
  BackToTopButton,
  BioHeroSection,
  BrandLogo,
  ClientLogoStrip,
  ControlWithBlurb,
  DASHBOARD_MOCKUP_PREVIEW_METRICS,
  DEFAULT_DASHBOARD_MOCKUP_PREVIEW_CONTENT,
  DEFAULT_DASHBOARD_MOCKUP_PREVIEW_VISUAL_CONFIG,
  DEFAULT_ICON_ACTIONS,
  DashboardMockupPreview,
  DynamicField,
  DynamicForm,
  FONT_FAMILY_OPTIONS_COLUMNS,
  FONT_FAMILY_OPTIONS_FALLBACK_STACK,
  FONT_FAMILY_OPTIONS_VARIABLE_SUFFIX,
  FONT_SIZE_SLIDER_DEFAULT_MAX,
  FONT_SIZE_SLIDER_DEFAULT_MIN,
  FeatureFlowSection,
  Field,
  FontFamilyOptions,
  FontSizeSlider,
  Form,
  GISELLE_PRIMARY_DARK_MAIN,
  GISELLE_PRIMARY_MAIN,
  GISELLE_SECONDARY_MAIN,
  GiselleIcon,
  GiselleSettingsProvider,
  GiselleThemeAndSettingsProvider,
  GiselleThemeProvider,
  HeroSection,
  HorizontalPreview,
  IconActionBar,
  IconStrip,
  IntegrationsShowcaseSection,
  Label,
  MetricCard,
  MetricCardDecoration,
  OptionList,
  PREVIEW_LINE_DEFAULT_HEIGHT,
  PREVIEW_LINE_DEFAULT_OPACITY,
  PREVIEW_LINE_ROUNDED_RADIUS,
  PREVIEW_LINE_SQUARE_RADIUS,
  PageSection,
  PlatformIconStrip,
  PreviewCard,
  PreviewLine,
  PreviewNavSurface,
  ProfileSummaryCard,
  PublicFooter,
  PublicNav,
  QuoteCard,
  RHFAutocomplete,
  RHFCheckbox,
  RHFCode,
  RHFCountrySelect,
  RHFDatePicker,
  RHFDateTimePicker,
  RHFMultiCheckbox,
  RHFMultiSelect,
  RHFMultiSwitch,
  RHFNumberInput,
  RHFPhoneInput,
  RHFRadioGroup,
  RHFRating,
  RHFSelect,
  RHFSlider,
  RHFSwitch,
  RHFTextField,
  RHFTimePicker,
  RHFUpload,
  RHFUploadAvatar,
  RHFUploadBox,
  STAT_CARD_SPARKLINE_OPTIONS,
  SectionCaption,
  SectionContainer,
  SectionTitle,
  SelectableCard,
  SelectableLabel,
  SideNavPreview,
  StatCard,
  StatCardRow,
  StatusLabel,
  TOGGLE_ICON_SIZE,
  TOGGLE_MIN_TOUCH_TARGET,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableSkeleton,
  TechIconStrip,
  TestimonialsWallSection,
  TitledBlock,
  ToggleCard,
  ToggleIconButton,
  TwoColumnShowcaseRow,
  channelAlpha,
  createIconRegistrar,
  emptyRows,
  getComparator,
  getCookieValue,
  giselleTheme,
  giselleThemeOptions,
  hexToChannel,
  isDeepEqual,
  pxToRem,
  remToPx,
  resolveMaturityColor,
  resolveMaturityLabel,
  rowInPage,
  setCookieValue,
  useGiselleSettings,
  useLocalStorage,
  useNestedChecklist,
  useTable
};
//# sourceMappingURL=index.js.map
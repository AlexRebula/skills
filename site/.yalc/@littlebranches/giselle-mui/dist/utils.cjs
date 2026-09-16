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

// src/utils-index.ts
var utils_index_exports = {};
__export(utils_index_exports, {
  BREAKPOINTS: () => BREAKPOINTS,
  BREAKPOINTS_GRID: () => BREAKPOINTS_GRID,
  COUNTRIES: () => COUNTRIES,
  GISELLE_PRIMARY_DARK_MAIN: () => GISELLE_PRIMARY_DARK_MAIN,
  GISELLE_PRIMARY_MAIN: () => GISELLE_PRIMARY_MAIN,
  GISELLE_SECONDARY_MAIN: () => GISELLE_SECONDARY_MAIN,
  assignMilestoneSidesByDone: () => assignMilestoneSidesByDone,
  channelAlpha: () => channelAlpha,
  emptyRows: () => emptyRows,
  getComparator: () => getComparator,
  getCookieValue: () => getCookieValue,
  giselleTheme: () => giselleTheme,
  giselleThemeOptions: () => giselleThemeOptions,
  hexToChannel: () => hexToChannel,
  isDeepEqual: () => isDeepEqual,
  preloadImages: () => preloadImages,
  pxToRem: () => pxToRem,
  remToPx: () => remToPx,
  resolveMaturityColor: () => resolveMaturityColor,
  resolveMaturityLabel: () => resolveMaturityLabel,
  rowInPage: () => rowInPage,
  schemaUtils: () => schemaUtils,
  setCookieValue: () => setCookieValue
});
module.exports = __toCommonJS(utils_index_exports);

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

// src/utils/theme/preset/theme-preset.ts
var import_styles = require("@mui/material/styles");

// src/theme-port-phase1/core/components/accordion.tsx
var import_Box = __toESM(require("@mui/material/Box"), 1);
var import_SvgIcon = __toESM(require("@mui/material/SvgIcon"), 1);
var import_Accordion = require("@mui/material/Accordion");
var import_AccordionSummary = require("@mui/material/AccordionSummary");
var import_AccordionDetails = require("@mui/material/AccordionDetails");
var import_jsx_runtime = require("react/jsx-runtime");
var PlusIcon = (props) => (
  // https://icon-sets.iconify.design/mingcute/add-line/
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_SvgIcon.default, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { fill: "none", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_SvgIcon.default, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { fill: "none", fillRule: "evenodd", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M3 12a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1" })
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
    [`&.${import_AccordionSummary.accordionSummaryClasses.expanded}`]: {
      [`& .${iconClasses.container}`]: resetTransform.expanded,
      [`& .${iconClasses.plus}`]: { transform: "scale(0.4)", opacity: 0 },
      [`& .${iconClasses.minus}`]: { transform: "scale(1)", opacity: 1 }
    }
  };
};
var ExpandIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_Box.default, { component: "span", className: iconClasses.container, ...props, children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlusIcon, { className: iconClasses.plus }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinusIcon, { className: iconClasses.minus })
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
      [`& .${import_AccordionSummary.accordionSummaryClasses.root}`]: {
        paddingLeft: 0,
        paddingRight: 0
      },
      [`& .${import_AccordionDetails.accordionDetailsClasses.root}`]: {
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
      [`&.${import_Accordion.accordionClasses.disabled}`]: {
        backgroundColor: "transparent",
        [`& .${import_AccordionDetails.accordionDetailsClasses.root}`]: {
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
    [`&.${import_AccordionSummary.accordionSummaryClasses.expanded}`]: {
      minHeight: "inherit"
    }
  },
  content: {
    margin: 0,
    [`&.${import_AccordionSummary.accordionSummaryClasses.expanded}`]: {
      margin: "inherit"
    }
  }
};
var MuiAccordionSummary = {
  // ▼▼▼▼▼▼▼▼ ⚙️ PROPS ▼▼▼▼▼▼▼▼
  defaultProps: {
    expandIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandIcon, {})
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
var giselleTheme = (0, import_styles.extendTheme)(giselleThemeOptions);

// src/utils/breakpoints/breakpoints.ts
var BREAKPOINTS = [
  { label: "xs \u2014 360px", width: 360 },
  { label: "sm \u2014 600px", width: 600 },
  { label: "md \u2014 900px", width: 900 },
  { label: "lg \u2014 1200px", width: 1200 }
];
var BREAKPOINTS_GRID = [
  { label: "xs \u2014 360px", width: 360, cols: 1 },
  { label: "sm \u2014 600px", width: 600, cols: 2 },
  { label: "md \u2014 900px", width: 900, cols: 3 },
  { label: "lg \u2014 1200px", width: 1200, cols: 4 }
];

// src/utils/hooks/use-image-preloader/use-image-preloader.ts
function preloadImages(srcs) {
  srcs.forEach((src) => {
    if (src) {
      const img = new Image();
      img.src = src;
    }
  });
}

// src/utils/form/schema-utils/schema-utils.ts
var z = __toESM(require("zod"), 1);
var schemaUtils = {
  /**
   * A zod schema for a required, valid email address — the validator
   * react-hook-form's `Controller`/`useForm` resolver calls on every
   * change/blur/submit for an email input.
   *
   * zod's own `error` callback is how a schema tells "empty" apart from
   * "present but malformed": an empty/missing input reports a `zod_invalid_type`
   * (or similar "nothing there") issue, while a non-empty value that fails
   * the email format check reports one whose code starts with `invalid` —
   * that's what the branch below keys on.
   *
   * @param props.error - Override the default required/invalid messages.
   *
   * @example
   * const schema = z.object({ email: schemaUtils.email() });
   */
  email: (props) => z.email({
    error: ({ input, code }) => {
      const isPresentButMalformed = Boolean(input) && code.startsWith("invalid");
      return isPresentButMalformed ? props?.error?.invalid ?? "That email address doesn\u2019t look right." : props?.error?.required ?? "An email address is required.";
    }
  })
};

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

// src/utils/countries/countries.ts
var import_react_phone_number_input = require("react-phone-number-input");
var countryDisplayNames = new Intl.DisplayNames(["en"], { type: "region" });
var COUNTRIES = (0, import_react_phone_number_input.getCountries)().map((code) => ({
  code,
  label: countryDisplayNames.of(code) ?? code,
  phone: `+${(0, import_react_phone_number_input.getCountryCallingCode)(code)}`
})).filter((country) => country.label !== country.code).sort((a, b) => a.label.localeCompare(b.label));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BREAKPOINTS,
  BREAKPOINTS_GRID,
  COUNTRIES,
  GISELLE_PRIMARY_DARK_MAIN,
  GISELLE_PRIMARY_MAIN,
  GISELLE_SECONDARY_MAIN,
  assignMilestoneSidesByDone,
  channelAlpha,
  emptyRows,
  getComparator,
  getCookieValue,
  giselleTheme,
  giselleThemeOptions,
  hexToChannel,
  isDeepEqual,
  preloadImages,
  pxToRem,
  remToPx,
  resolveMaturityColor,
  resolveMaturityLabel,
  rowInPage,
  schemaUtils,
  setCookieValue
});
//# sourceMappingURL=utils.cjs.map
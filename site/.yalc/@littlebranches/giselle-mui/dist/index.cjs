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
  AlexRebulaBrandMark: () => AlexRebulaBrandMark,
  AnimatedGradientText: () => AnimatedGradientText,
  AppShell: () => AppShell,
  BACK_TO_TOP_BUTTON_DEFAULT_SCROLL_THRESHOLD: () => BACK_TO_TOP_BUTTON_DEFAULT_SCROLL_THRESHOLD,
  BACK_TO_TOP_BUTTON_SIZE: () => BACK_TO_TOP_BUTTON_SIZE,
  BACK_TO_TOP_BUTTON_WCAG_MIN_SIZE: () => BACK_TO_TOP_BUTTON_WCAG_MIN_SIZE,
  BackToTopButton: () => BackToTopButton,
  BioHeroSection: () => BioHeroSection,
  BrandLogo: () => BrandLogo,
  ClientLogoStrip: () => ClientLogoStrip,
  ControlWithBlurb: () => ControlWithBlurb,
  DASHBOARD_MOCKUP_PREVIEW_METRICS: () => DASHBOARD_MOCKUP_PREVIEW_METRICS,
  DEFAULT_DASHBOARD_MOCKUP_PREVIEW_CONTENT: () => DEFAULT_DASHBOARD_MOCKUP_PREVIEW_CONTENT,
  DEFAULT_DASHBOARD_MOCKUP_PREVIEW_VISUAL_CONFIG: () => DEFAULT_DASHBOARD_MOCKUP_PREVIEW_VISUAL_CONFIG,
  DEFAULT_ICON_ACTIONS: () => DEFAULT_ICON_ACTIONS,
  DashboardMockupPreview: () => DashboardMockupPreview,
  DynamicField: () => DynamicField,
  DynamicForm: () => DynamicForm,
  FONT_FAMILY_OPTIONS_COLUMNS: () => FONT_FAMILY_OPTIONS_COLUMNS,
  FONT_FAMILY_OPTIONS_FALLBACK_STACK: () => FONT_FAMILY_OPTIONS_FALLBACK_STACK,
  FONT_FAMILY_OPTIONS_VARIABLE_SUFFIX: () => FONT_FAMILY_OPTIONS_VARIABLE_SUFFIX,
  FONT_SIZE_SLIDER_DEFAULT_MAX: () => FONT_SIZE_SLIDER_DEFAULT_MAX,
  FONT_SIZE_SLIDER_DEFAULT_MIN: () => FONT_SIZE_SLIDER_DEFAULT_MIN,
  FeatureFlowSection: () => FeatureFlowSection,
  Field: () => Field,
  FontFamilyOptions: () => FontFamilyOptions,
  FontSizeSlider: () => FontSizeSlider,
  Form: () => Form,
  GISELLE_PRIMARY_DARK_MAIN: () => GISELLE_PRIMARY_DARK_MAIN,
  GISELLE_PRIMARY_MAIN: () => GISELLE_PRIMARY_MAIN,
  GISELLE_SECONDARY_MAIN: () => GISELLE_SECONDARY_MAIN,
  GiselleIcon: () => GiselleIcon,
  GiselleSettingsProvider: () => GiselleSettingsProvider,
  GiselleThemeAndSettingsProvider: () => GiselleThemeAndSettingsProvider,
  GiselleThemeProvider: () => GiselleThemeProvider,
  HeroSection: () => HeroSection,
  HorizontalPreview: () => HorizontalPreview,
  IconActionBar: () => IconActionBar,
  IconStrip: () => IconStrip,
  IntegrationsShowcaseSection: () => IntegrationsShowcaseSection,
  Label: () => Label,
  MetricCard: () => MetricCard,
  MetricCardDecoration: () => MetricCardDecoration,
  OptionList: () => OptionList,
  PREVIEW_LINE_DEFAULT_HEIGHT: () => PREVIEW_LINE_DEFAULT_HEIGHT,
  PREVIEW_LINE_DEFAULT_OPACITY: () => PREVIEW_LINE_DEFAULT_OPACITY,
  PREVIEW_LINE_ROUNDED_RADIUS: () => PREVIEW_LINE_ROUNDED_RADIUS,
  PREVIEW_LINE_SQUARE_RADIUS: () => PREVIEW_LINE_SQUARE_RADIUS,
  PageSection: () => PageSection,
  PlatformIconStrip: () => PlatformIconStrip,
  PreviewCard: () => PreviewCard,
  PreviewLine: () => PreviewLine,
  PreviewNavSurface: () => PreviewNavSurface,
  ProfileSummaryCard: () => ProfileSummaryCard,
  PublicFooter: () => PublicFooter,
  PublicNav: () => PublicNav,
  QuoteCard: () => QuoteCard,
  RHFAutocomplete: () => RHFAutocomplete,
  RHFCheckbox: () => RHFCheckbox,
  RHFCode: () => RHFCode,
  RHFCountrySelect: () => RHFCountrySelect,
  RHFDatePicker: () => RHFDatePicker,
  RHFDateTimePicker: () => RHFDateTimePicker,
  RHFMultiCheckbox: () => RHFMultiCheckbox,
  RHFMultiSelect: () => RHFMultiSelect,
  RHFMultiSwitch: () => RHFMultiSwitch,
  RHFNumberInput: () => RHFNumberInput,
  RHFPhoneInput: () => RHFPhoneInput,
  RHFRadioGroup: () => RHFRadioGroup,
  RHFRating: () => RHFRating,
  RHFSelect: () => RHFSelect,
  RHFSlider: () => RHFSlider,
  RHFSwitch: () => RHFSwitch,
  RHFTextField: () => RHFTextField,
  RHFTimePicker: () => RHFTimePicker,
  RHFUpload: () => RHFUpload,
  RHFUploadAvatar: () => RHFUploadAvatar,
  RHFUploadBox: () => RHFUploadBox,
  STAT_CARD_SPARKLINE_OPTIONS: () => STAT_CARD_SPARKLINE_OPTIONS,
  SectionCaption: () => SectionCaption,
  SectionContainer: () => SectionContainer,
  SectionTitle: () => SectionTitle,
  SelectableCard: () => SelectableCard,
  SelectableLabel: () => SelectableLabel,
  SideNavPreview: () => SideNavPreview,
  StatCard: () => StatCard,
  StatCardRow: () => StatCardRow,
  StatusLabel: () => StatusLabel,
  TOGGLE_ICON_SIZE: () => TOGGLE_ICON_SIZE,
  TOGGLE_MIN_TOUCH_TARGET: () => TOGGLE_MIN_TOUCH_TARGET,
  TableEmptyRows: () => TableEmptyRows,
  TableHeadCustom: () => TableHeadCustom,
  TablePaginationCustom: () => TablePaginationCustom,
  TableSkeleton: () => TableSkeleton,
  TechIconStrip: () => TechIconStrip,
  TestimonialsWallSection: () => TestimonialsWallSection,
  TitledBlock: () => TitledBlock,
  ToggleCard: () => ToggleCard,
  ToggleIconButton: () => ToggleIconButton,
  TwoColumnShowcaseRow: () => TwoColumnShowcaseRow,
  channelAlpha: () => channelAlpha,
  createIconRegistrar: () => createIconRegistrar,
  emptyRows: () => emptyRows,
  getComparator: () => getComparator,
  getCookieValue: () => getCookieValue,
  giselleTheme: () => giselleTheme,
  giselleThemeOptions: () => giselleThemeOptions,
  hexToChannel: () => hexToChannel,
  isDeepEqual: () => isDeepEqual,
  pxToRem: () => pxToRem,
  remToPx: () => remToPx,
  resolveMaturityColor: () => resolveMaturityColor,
  resolveMaturityLabel: () => resolveMaturityLabel,
  rowInPage: () => rowInPage,
  setCookieValue: () => setCookieValue,
  useGiselleSettings: () => useGiselleSettings,
  useLocalStorage: () => useLocalStorage,
  useNestedChecklist: () => useNestedChecklist,
  useTable: () => useTable
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

// src/components/theming/theme-provider/giselle/giselle.tsx
var import_react3 = require("react");
var import_GlobalStyles = __toESM(require("@mui/material/GlobalStyles"), 1);
var import_styles2 = require("@mui/material/styles");

// src/utils/theme/layout-vars/layout-vars.ts
var LAYOUT_HEADER_MOBILE_HEIGHT_VAR = "--layout-header-mobile-height";
var LAYOUT_HEADER_DESKTOP_HEIGHT_VAR = "--layout-header-desktop-height";
var layoutHeaderHeightDefaults = {
  [LAYOUT_HEADER_MOBILE_HEIGHT_VAR]: "64px",
  [LAYOUT_HEADER_DESKTOP_HEIGHT_VAR]: "72px"
};

// src/components/theming/theme-provider/giselle/giselle.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function GiselleThemeProvider({
  children,
  themeOverrides,
  theme,
  defaultMode = "system"
}) {
  const resolvedTheme = (0, import_react3.useMemo)(
    () => theme ?? (themeOverrides ? (0, import_styles2.extendTheme)(giselleThemeOptions, themeOverrides) : giselleTheme),
    [theme, themeOverrides]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_styles2.ThemeProvider, { theme: resolvedTheme, defaultMode, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_GlobalStyles.default, { styles: { ":root": layoutHeaderHeightDefaults } }),
    children
  ] });
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
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    GiselleSettingsContext.Provider,
    {
      value,
      children
    }
  );
}

// src/components/theming/settings-provider/theme-and-settings-provider/theme-and-settings-provider.tsx
var import_react7 = require("react");

// src/components/theming/settings-provider/theme-and-settings-provider/settings-theme-bridge/settings-theme-bridge.tsx
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

// src/components/theming/settings-provider/theme-and-settings-provider/theme-and-settings-provider.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GiselleThemeProvider, { themeOverrides, theme, defaultMode, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    GiselleSettingsProvider,
    {
      defaultSettings,
      initialState,
      storageKey,
      storage,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react7.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SettingsThemeBridge, { getMode }),
        children
      ] })
    }
  ) });
}

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
var import_react8 = require("@iconify/react");
var import_Box2 = __toESM(require("@mui/material/Box"), 1);

// src/components/material/data-display/icon/giselle/giselle-icon.styles.ts
var giselleIconRootSx = (width, height) => ({
  lineHeight: 0,
  display: "inline-flex",
  flexShrink: 0,
  width,
  height
});

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    import_Box2.default,
    {
      component: "span",
      sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
var import_jsx_runtime6 = require("react/jsx-runtime");
var StatusLabel = import_react9.default.forwardRef(function StatusLabel2({ status, label, size = "small", sx, ...other }, ref) {
  const { color, label: defaultLabel } = STATUS_CONFIG[status];
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var import_SvgIcon2 = __toESM(require("@mui/material/SvgIcon"), 1);

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
var import_jsx_runtime7 = require("react/jsx-runtime");
var CHECK_ICON = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_SvgIcon2.default, { sx: selectableLabelIconSx, viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.4-1.4z" }) });
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
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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

// src/components/material/data-display/label/label.tsx
var import_react11 = __toESM(require("react"), 1);
var import_Box3 = __toESM(require("@mui/material/Box"), 1);

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
var import_jsx_runtime8 = require("react/jsx-runtime");
var Label = import_react11.default.forwardRef(function Label2({
  children,
  color = "default",
  variant = "soft",
  disabled = false,
  startIcon,
  endIcon,
  sx,
  ...other
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    import_Box3.default,
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
        startIcon && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_Box3.default, { component: "span", sx: labelIconSlotSx("start"), children: startIcon }),
        typeof children === "string" ? capitalizeFirstLetter(children) : children,
        endIcon && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_Box3.default, { component: "span", sx: labelIconSlotSx("end"), children: endIcon })
      ]
    }
  );
});
Label.displayName = "Label";

// src/components/material/surfaces/card/accordion/accordion.tsx
var import_react13 = require("react");
var import_Box4 = __toESM(require("@mui/material/Box"), 1);
var import_Checkbox = __toESM(require("@mui/material/Checkbox"), 1);
var import_Accordion2 = __toESM(require("@mui/material/Accordion"), 1);
var import_AccordionDetails2 = __toESM(require("@mui/material/AccordionDetails"), 1);
var import_AccordionSummary2 = __toESM(require("@mui/material/AccordionSummary"), 1);
var import_Typography = __toESM(require("@mui/material/Typography"), 1);

// src/components/material/input/toggle-icon-button/icon.tsx
var import_react12 = require("react");
var import_IconButton = __toESM(require("@mui/material/IconButton"), 1);

// src/components/material/input/toggle-icon-button/icon.defaults.tsx
var import_SvgIcon3 = __toESM(require("@mui/material/SvgIcon"), 1);

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
var import_jsx_runtime9 = require("react/jsx-runtime");
var DEFAULT_PRESSED_ICON = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_SvgIcon3.default, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
var DEFAULT_HOVER_ICON = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_SvgIcon3.default, { sx: defaultIconSvgSx, viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" }) });

// src/components/material/input/toggle-icon-button/icon.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function ToggleIconButton({
  pressed,
  idleIcon,
  pressedIcon = DEFAULT_PRESSED_ICON,
  hoverIcon = DEFAULT_HOVER_ICON,
  onPressedChange,
  sx,
  ...other
}) {
  const handleClick = (0, import_react12.useCallback)(
    (e) => {
      e.stopPropagation();
      onPressedChange?.(!pressed);
    },
    [pressed, onPressedChange]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    import_IconButton.default,
    {
      onClick: handleClick,
      "aria-pressed": pressed,
      size: "small",
      sx: [rootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "ti-idle", children: idleIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "ti-pressed", children: pressedIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "ti-hover", children: hoverIcon })
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
var import_jsx_runtime11 = require("react/jsx-runtime");
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
  const id = (0, import_react13.useId)();
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
    leadingElement = checkIcon === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
    ) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
    leadingElement = /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Box4.default, { "aria-hidden": "true", sx: leadingIconSx, children: leadingIcon });
  } else {
    leadingElement = leadingAction;
  }
  const summaryContent = typeof title === "string" ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Typography.default, { component: "span", variant: "subtitle1", children: title }) : title;
  const accordionSummary = /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    import_AccordionSummary2.default,
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Accordion2.default, { sx: [accordionRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    hasLeadingElement ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Box4.default, { sx: summaryRowSx, children: [
      leadingElement,
      accordionSummary
    ] }) : accordionSummary,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_AccordionDetails2.default, { id: detailsId, children })
  ] });
}

// src/components/material/surfaces/card/accordion/accordion.const.ts
var ACCORDION_DONE_MIN_TOUCH_TARGET = 24;

// src/components/material/input/option-list/option-list.tsx
var import_react14 = __toESM(require("react"), 1);
var import_Box5 = __toESM(require("@mui/material/Box"), 1);
var import_Typography2 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime13 = require("react/jsx-runtime");
var OptionList = import_react14.default.forwardRef(function OptionList2({ options, value, onChange, columns = 3, sx }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box5.default, { ref, sx: [optionListRootSx(columns), ...Array.isArray(sx) ? sx : [sx]], children: options.map((option) => {
    const selected = option.id === value;
    if (option.kind === "swatch") {
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        SelectableCard,
        {
          selected,
          "aria-label": option.label,
          onClick: () => onChange(option.id),
          children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box5.default, { component: "span", "aria-hidden": "true", sx: optionListSwatchIconSx(option.color), children: option.icon })
        },
        option.id
      );
    }
    if (option.kind === "icon") {
      return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
        SelectableCard,
        {
          selected,
          "aria-label": option.label,
          onClick: () => onChange(option.id),
          sx: [optionListIconCardSx, ...toSxArray(option.sx)],
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { "aria-hidden": "true", children: option.icon }),
            !option.hideCaption && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Typography2.default, { variant: "caption", children: option.label })
          ]
        },
        option.id
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(SelectableCard, { selected, onClick: () => onChange(option.id), children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Typography2.default, { variant: "body2", children: option.label }) }, option.id);
  }) });
});
OptionList.displayName = "OptionList";

// src/components/material/input/control-with-blurb/control-with-blurb.tsx
var import_react15 = __toESM(require("react"), 1);
var import_Box6 = __toESM(require("@mui/material/Box"), 1);
var import_Typography3 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime14 = require("react/jsx-runtime");
var ControlWithBlurb = import_react15.default.forwardRef(
  function ControlWithBlurb2({ children, blurb, sx, ...other }, ref) {
    const blurbId = (0, import_react15.useId)();
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      import_Box6.default,
      {
        ref,
        role: "group",
        "aria-describedby": blurbId,
        sx: [controlWithBlurbRootSx, ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: [
          children,
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Typography3.default, { id: blurbId, variant: "caption", sx: controlWithBlurbTextSx, children: blurb })
        ]
      }
    );
  }
);
ControlWithBlurb.displayName = "ControlWithBlurb";

// src/components/material/input/toggle-card/toggle-card.tsx
var import_react16 = __toESM(require("react"), 1);
var import_Box7 = __toESM(require("@mui/material/Box"), 1);
var import_Switch = __toESM(require("@mui/material/Switch"), 1);
var import_SvgIcon4 = __toESM(require("@mui/material/SvgIcon"), 1);
var import_Tooltip = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography4 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime15 = require("react/jsx-runtime");
function InfoAffordanceIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_SvgIcon4.default,
    {
      sx: toggleCardInfoIconSx(),
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      "data-testid": "toggle-card-info-icon",
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" })
    }
  );
}
var ToggleCard = import_react16.default.forwardRef(function ToggleCard2({
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
  const handleClick = (0, import_react16.useCallback)(
    (event) => {
      if (disabled) return;
      onClick?.(event);
    },
    [disabled, onClick]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    SelectableCard,
    {
      ref,
      selected,
      disabled,
      onClick: handleClick,
      sx,
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_Box7.default, { sx: toggleCardColumnSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_Box7.default, { sx: toggleCardTopRowSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Box7.default, { sx: toggleCardIconSx(), "aria-hidden": "true", children: icon }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Box7.default, { sx: toggleCardActionSx, children: action2 ?? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            import_Switch.default,
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
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_Box7.default, { sx: toggleCardLabelRowSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Typography4.default, { variant: "subtitle2", sx: toggleCardLabelTextSx, children: label }),
          tooltip ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Tooltip.default, { title: tooltip, arrow: true, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { tabIndex: 0, "aria-label": tooltip, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(InfoAffordanceIcon, {}) }) }) : null
        ] })
      ] })
    }
  );
});
ToggleCard.displayName = "ToggleCard";

// src/components/material/input/font-size-slider/font-size-slider.tsx
var import_react17 = require("react");
var import_Slider = __toESM(require("@mui/material/Slider"), 1);

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
var import_jsx_runtime16 = require("react/jsx-runtime");
var FontSizeSlider = (0, import_react17.forwardRef)(function FontSizeSlider2({
  value,
  onChange,
  min = FONT_SIZE_SLIDER_DEFAULT_MIN,
  max = FONT_SIZE_SLIDER_DEFAULT_MAX,
  sx,
  ...other
}, ref) {
  const handleChange = (0, import_react17.useCallback)(
    (_event, newValue) => {
      onChange(Array.isArray(newValue) ? newValue[0] : newValue);
    },
    [onChange]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_Slider.default,
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
var import_react18 = require("react");

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
var import_jsx_runtime17 = require("react/jsx-runtime");
var FontFamilyOptions = (0, import_react18.forwardRef)(function FontFamilyOptions2({ options, icon, value, onChangeOption, sx }, ref) {
  const items = options.map((option) => ({
    id: option,
    kind: "icon",
    icon,
    label: stripVariableSuffix(option),
    sx: optionFontFamilySx(option)
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
var import_react19 = __toESM(require("react"), 1);
var import_react_hook_form = require("react-hook-form");
var import_TextField = __toESM(require("@mui/material/TextField"), 1);

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
var import_jsx_runtime18 = require("react/jsx-runtime");
var RHFTextField = import_react19.default.forwardRef(
  function RHFTextField2({ name, helperText, slotProps, type = "text", ...other }, ref) {
    const { control } = (0, import_react_hook_form.useFormContext)();
    const isNumberType = type === "number";
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      import_react_hook_form.Controller,
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
          return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            import_TextField.default,
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
var import_react_hook_form2 = require("react-hook-form");
var import_jsx_runtime19 = require("react/jsx-runtime");
function Form({
  children,
  onSubmit,
  methods
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_hook_form2.FormProvider, { ...methods, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("form", { onSubmit, noValidate: true, autoComplete: "off", children }) });
}
Form.displayName = "Form";

// src/components/material/surfaces/card/metric/metric-card.tsx
var import_Box9 = __toESM(require("@mui/material/Box"), 1);
var import_Paper = __toESM(require("@mui/material/Paper"), 1);
var import_Typography5 = __toESM(require("@mui/material/Typography"), 1);

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
var import_react20 = __toESM(require("react"), 1);
var import_Box8 = __toESM(require("@mui/material/Box"), 1);

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
var import_jsx_runtime20 = require("react/jsx-runtime");
var MetricCardDecoration = import_react20.default.forwardRef(
  function MetricCardDecoration2({ color = "primary", sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      import_Box8.default,
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
var import_jsx_runtime21 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
    import_Paper.default,
    {
      elevation,
      sx: [metricCardPaperSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        decoration && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_Box9.default, { "aria-hidden": "true", sx: decorationOverlaySx, children: decoration }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_Box9.default, { sx: metricCardContentSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_Box9.default, { sx: metricCardValueSx, children: value }),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_Typography5.default, { noWrap: true, variant: "subtitle2", component: "div", sx: metricCardLabelSx, children: label }),
          sublabel && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_Typography5.default, { noWrap: true, variant: "caption", component: "div", sx: metricCardSublabelSx, children: sublabel })
        ] }),
        icon && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_Box9.default, { "aria-hidden": "true", sx: metricCardIconBoxSx(color), children: icon })
      ]
    }
  );
}

// src/components/material/surfaces/card/quote/quote-card.tsx
var import_Box10 = __toESM(require("@mui/material/Box"), 1);
var import_Paper2 = __toESM(require("@mui/material/Paper"), 1);
var import_Stack = __toESM(require("@mui/material/Stack"), 1);
var import_Typography6 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime22 = require("react/jsx-runtime");
function QuoteCard({
  quote,
  author,
  source,
  color = "primary",
  elevation = 0,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    import_Paper2.default,
    {
      elevation,
      sx: [quoteCardPaperSx(color), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_Box10.default, { sx: quoteCardRowSlotSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_Typography6.default, { "aria-hidden": true, sx: quoteMarkSx(color), children: "\u201C" }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_Box10.default, { sx: quoteCardTextSlotSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_Typography6.default, { variant: "body1", sx: quoteTextSx, children: quote }),
          (author || source) && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_Stack.default, { direction: "row", spacing: 0.75, sx: quoteAttributionRowSlotSx, children: [
            author && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_Typography6.default, { variant: "caption", sx: quoteAuthorSx, children: author }),
            author && source && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_Typography6.default, { variant: "caption", "aria-hidden": true, sx: quoteSeparatorSx, children: "\xB7" }),
            source && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_Typography6.default, { variant: "caption", sx: quoteSourceSx, children: source })
          ] })
        ] })
      ] })
    }
  );
}

// src/components/material/surfaces/card/stat/stat-card.tsx
var import_Box11 = __toESM(require("@mui/material/Box"), 1);
var import_Card = __toESM(require("@mui/material/Card"), 1);
var import_Typography7 = __toESM(require("@mui/material/Typography"), 1);

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
var import_react21 = __toESM(require("react"), 1);
var import_jsx_runtime23 = require("react/jsx-runtime");
var StatCardShape = import_react21.default.forwardRef(
  function StatCardShape2(props, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
var import_jsx_runtime24 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_Card.default, { sx: [statCardRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Box11.default, { "aria-hidden": "true", sx: decorationSx, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(StatCardShape, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Box11.default, { sx: iconBoxSx, children: icon }),
    trend !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_Box11.default, { sx: trendBoxSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(GiselleIcon, { width: 20, icon: isUp ? "eva:trending-up-fill" : "eva:trending-down-fill" }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_Typography7.default, { component: "span", variant: "subtitle2", children: [
        isUp && "+",
        trend,
        "%"
      ] }),
      trendLabel && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Typography7.default, { component: "span", variant: "caption", sx: trendLabelSx, children: trendLabel })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_Box11.default, { sx: contentRowSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_Box11.default, { sx: labelsBoxSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Typography7.default, { variant: "subtitle2", sx: statCardLabelSx, children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Typography7.default, { variant: "h4", children: value })
      ] }),
      chart
    ] })
  ] });
}

// src/components/material/surfaces/card/stat-row/stat-card-row.tsx
var import_Grid = __toESM(require("@mui/material/Grid"), 1);
var import_jsx_runtime25 = require("react/jsx-runtime");
function StatCardRow({ items, renderChart, sx, ...other }) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_Grid.default, { container: true, spacing: 3, sx: [...Array.isArray(sx) ? sx : [sx]], ...other, children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_Grid.default, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    StatCard,
    {
      label: item.label,
      value: item.value,
      trend: item.trend,
      trendLabel: item.trendLabel,
      color: item.color,
      icon: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(GiselleIcon, { icon: item.iconId, width: 28 }),
      chart: renderChart?.(item)
    }
  ) }, item.label)) });
}

// src/components/material/surfaces/card/profile-summary/profile-summary-card.tsx
var import_Paper3 = __toESM(require("@mui/material/Paper"), 1);
var import_Box12 = __toESM(require("@mui/material/Box"), 1);
var import_Avatar = __toESM(require("@mui/material/Avatar"), 1);
var import_Typography8 = __toESM(require("@mui/material/Typography"), 1);
var import_Divider = __toESM(require("@mui/material/Divider"), 1);

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
var import_jsx_runtime26 = require("react/jsx-runtime");
function ProfileSummaryCard({
  name,
  role,
  avatarSrc,
  stats,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_Paper3.default, { sx: [profileSummaryCardPaperSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Avatar.default, { src: avatarSrc, alt: name, sx: avatarSx, children: name[0] }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Typography8.default, { variant: "h6", children: name }),
    role && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Typography8.default, { variant: "body2", color: "text.secondary", sx: roleSx, children: role }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Box12.default, { sx: statsRowSlotSx, children: stats.map((stat, index) => /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_Box12.default, { children: [
      index > 0 && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Divider.default, { orientation: "vertical", flexItem: true }),
      /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_Box12.default, { sx: statCellSlotSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Typography8.default, { variant: "subtitle1", children: stat.value }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Typography8.default, { variant: "caption", color: "text.secondary", children: stat.label })
      ] })
    ] }, stat.label)) })
  ] });
}

// src/utils/hooks/use-nested-checklist/use-nested-checklist.ts
var import_react22 = require("react");
function useNestedChecklist(initialParentDone, initialChildrenDone) {
  const [parentDone, setParentDone] = (0, import_react22.useState)(initialParentDone);
  const [childrenDone, setChildrenDone] = (0, import_react22.useState)(initialChildrenDone);
  const indeterminate = (0, import_react22.useMemo)(
    () => childrenDone.some(Boolean) && !childrenDone.every(Boolean),
    [childrenDone]
  );
  const toggleParent = (0, import_react22.useCallback)(() => {
    const next = !parentDone;
    setParentDone(next);
    setChildrenDone((prev) => prev.map(() => next));
  }, [parentDone]);
  const toggleChild = (0, import_react22.useCallback)((index) => {
    setChildrenDone((prev) => {
      const next = prev.map((v, i) => i === index ? !v : v);
      setParentDone(next.every(Boolean));
      return next;
    });
  }, []);
  return { parentDone, indeterminate, childrenDone, toggleParent, toggleChild };
}

// src/components/material/data-display/icon/action-bar/icon-action-bar.tsx
var import_Box13 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip2 = __toESM(require("@mui/material/Tooltip"), 1);
var import_IconButton2 = __toESM(require("@mui/material/IconButton"), 1);

// src/components/material/data-display/icon/action-bar/icon-action-bar.styles.ts
var iconActionBarRootSx = {
  gap: 1,
  width: 1,
  flexGrow: 1,
  display: "flex"
};

// src/components/material/data-display/icon/action-bar/icon-action-bar.defaults.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
var DEFAULT_ICON_ACTIONS = [
  { tooltip: "Edit", icon: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(GiselleIcon, { icon: "solar:pen-bold" }) },
  { tooltip: "View", icon: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(GiselleIcon, { icon: "solar:eye-bold" }) },
  {
    tooltip: "Print",
    icon: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(GiselleIcon, { icon: "solar:printer-minimalistic-bold" })
  },
  { tooltip: "Send", icon: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(GiselleIcon, { icon: "mdi:email" }) },
  { tooltip: "Share", icon: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(GiselleIcon, { icon: "solar:share-bold" }) }
];

// src/components/material/data-display/icon/action-bar/icon-action-bar.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
function IconActionBar({
  actions = DEFAULT_ICON_ACTIONS,
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Box13.default, { sx: [iconActionBarRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: actions.map((item, index) => {
    const label = item["aria-label"] ?? item.tooltip;
    const buttonProps = {
      onClick: item.onClick,
      disabled: item.disabled,
      "aria-label": label,
      ...item.component !== void 0 && { component: item.component },
      ...item.href !== void 0 && { href: item.href }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      import_Tooltip2.default,
      {
        title: item.tooltip,
        placement: item.tooltipPlacement ?? "bottom",
        children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_IconButton2.default, { ...buttonProps, children: item.icon }) })
      },
      `${item.tooltip}-${index}`
    );
  }) });
}

// src/components/material/layout/showcase-row/two-column-showcase-row.tsx
var import_Box14 = __toESM(require("@mui/material/Box"), 1);
var import_Grid2 = __toESM(require("@mui/material/Grid"), 1);
var import_Stack2 = __toESM(require("@mui/material/Stack"), 1);
var import_Typography9 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime29 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
    import_Grid2.default,
    {
      container: true,
      columnSpacing: isVertical ? 0 : { xs: 0, md: 6 },
      rowSpacing: { xs: 4, md: isVertical ? 4 : 0 },
      sx: [showcaseRowRootSx(orientation), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        text2 && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Grid2.default, { size: itemSize, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_Stack2.default, { spacing: 2, sx: [textColumnSx, ...Array.isArray(textSx) ? textSx : [textSx]], children: [
          text2.overline && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Typography9.default, { variant: "overline", sx: overlineSx, children: text2.overline }),
          text2.heading && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Typography9.default, { variant: "h4", children: text2.heading }),
          text2.description && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Typography9.default, { variant: "body1", color: "text.secondary", children: text2.description })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Grid2.default, { size: itemSize, sx: controlsGridItemSx, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          import_Stack2.default,
          {
            spacing: 2,
            sx: [
              controlsStackSx(controlsAlign),
              ...Array.isArray(controlsSx) ? controlsSx : [controlsSx]
            ],
            children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Box14.default, { sx: controlsSlotSx, children: controls })
          }
        ) })
      ]
    }
  );
}

// src/components/material/layout/section-title/section-title.tsx
var import_Box16 = __toESM(require("@mui/material/Box"), 1);
var import_Typography10 = __toESM(require("@mui/material/Typography"), 1);

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
var import_react23 = __toESM(require("react"), 1);
var import_Box15 = __toESM(require("@mui/material/Box"), 1);

// src/components/material/layout/section-title/section-caption/section-caption.styles.ts
var sectionCaptionSx = {
  typography: "overline",
  color: "text.disabled"
};

// src/components/material/layout/section-title/section-caption/section-caption.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var SectionCaption = import_react23.default.forwardRef(
  function SectionCaption2({ title, sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      import_Box15.default,
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
var import_jsx_runtime31 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_Box16.default, { sx: [sectionTitleRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    caption && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_Typography10.default, { component: titleComponent, variant: titleVariant, sx: slotProps?.title?.sx, children: [
      title,
      " ",
      txtGradient && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_Box16.default, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
    ] }),
    description && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      import_Box16.default,
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
var import_Container = __toESM(require("@mui/material/Container"), 1);

// src/components/material/layout/section-container/section-container.styles.ts
var sectionContainerSx = (py) => ({
  py
});

// src/components/material/layout/section-container/section-container.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
function SectionContainer({
  children,
  maxWidth = "lg",
  py = { xs: 8, md: 12 },
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    import_Container.default,
    {
      maxWidth,
      sx: [sectionContainerSx(py), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children
    }
  );
}

// src/components/material/layout/page-section/page-section.tsx
var import_react24 = __toESM(require("react"), 1);
var import_Box17 = __toESM(require("@mui/material/Box"), 1);

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
var import_jsx_runtime33 = require("react/jsx-runtime");
function Decoration({ kind, vertical, sx }) {
  switch (kind) {
    case "corner-plus":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
        import_Box17.default,
        {
          "aria-hidden": "true",
          sx: [cornerPlusSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("path", { d: "M8 0V16M16 8H0", stroke: "currentColor" })
        }
      );
    case "corner-x":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
        import_Box17.default,
        {
          "aria-hidden": "true",
          sx: [cornerXSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            "path",
            {
              d: "M14 2L7.96685 8.03315M7.96685 8.03315L2.0663 13.9337M7.96685 8.03315L13.9337 14M7.96685 8.03315L2 2.0663",
              stroke: "currentColor"
            }
          )
        }
      );
    case "border-line":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_Box17.default, { "aria-hidden": "true", sx: [borderLineSx(vertical), ...Array.isArray(sx) ? sx : [sx]] });
    case "triangle-left":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
        import_Box17.default,
        {
          "aria-hidden": "true",
          sx: [triangleLeftSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 10 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("path", { d: "M10 10L8.74228e-07 20L0 0L10 10Z", fill: "currentColor" })
        }
      );
    case "triangle-down":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
        import_Box17.default,
        {
          "aria-hidden": "true",
          sx: [triangleDownSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 20 10",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("path", { d: "M10 10L0 0H20L10 10Z", fill: "currentColor" })
        }
      );
    case "dot":
      return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_Box17.default, { "aria-hidden": "true", sx: [dotSx, ...Array.isArray(sx) ? sx : [sx]] });
  }
}
function resolveDecoration(decoration) {
  if (decoration === true) return CANONICAL_FRAME;
  if (decoration === false) return [];
  return decoration;
}
var PageSection = import_react24.default.forwardRef(function PageSection2({
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
    import_Box17.default,
    {
      ref,
      component: "section",
      sx: [pageSectionRootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        elements.map((element, index) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Decoration, { ...element }, index)),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
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
var import_react25 = __toESM(require("react"), 1);
var import_AppBar = __toESM(require("@mui/material/AppBar"), 1);
var import_Box18 = __toESM(require("@mui/material/Box"), 1);
var import_Toolbar = __toESM(require("@mui/material/Toolbar"), 1);
var import_Typography11 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime34 = require("react/jsx-runtime");
var AppShell = import_react25.default.forwardRef(function AppShell2({ title, actions, children, containerMaxWidth = "lg", sx, ...other }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_Box18.default, { ref, sx: [appShellRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_AppBar.default, { position: "static", color: "transparent", elevation: 0, sx: appShellAppBarSx, children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_Toolbar.default, { sx: appShellToolbarSx, children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_Typography11.default, { variant: "h6", component: "span", children: title }),
      actions && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_Box18.default, { sx: appShellActionsSx, children: actions })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(SectionContainer, { maxWidth: containerMaxWidth, children })
  ] });
});
AppShell.displayName = "AppShell";

// src/components/material/navigation/public-nav/public-nav.tsx
var import_react31 = __toESM(require("react"), 1);
var import_AppBar2 = __toESM(require("@mui/material/AppBar"), 1);
var import_Box19 = __toESM(require("@mui/material/Box"), 1);
var import_Toolbar2 = __toESM(require("@mui/material/Toolbar"), 1);
var import_styles6 = require("@mui/material/styles");
var import_useScrollTrigger = __toESM(require("@mui/material/useScrollTrigger"), 1);

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
var import_styles4 = require("@mui/material/styles");
var publicNavRootSx = {
  borderBottom: 1,
  borderColor: "divider"
};
var scrolledSurfaceSx = (theme) => ({
  backgroundColor: (0, import_styles4.alpha)(theme.palette.background.default, 0.8),
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
var import_react27 = __toESM(require("react"), 1);

// src/components/material/data-display/brand-logo/brand-logo.tsx
var import_react26 = __toESM(require("react"), 1);
var import_Link = __toESM(require("@mui/material/Link"), 1);
var import_styles5 = require("@mui/material/styles");

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
var import_jsx_runtime35 = require("react/jsx-runtime");
var BrandLogo = import_react26.default.forwardRef(function BrandLogo2({ children, disabled, href = "/", sx, ...other }, ref) {
  const theme = (0, import_styles5.useTheme)();
  const uniqueId = (0, import_react26.useId)();
  const colors = {
    light: theme.vars.palette.primary.light,
    main: theme.vars.palette.primary.main,
    dark: theme.vars.palette.primary.dark
  };
  const getGradientId = (name) => `${uniqueId}-${name}`;
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    import_Link.default,
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
var import_jsx_runtime36 = require("react/jsx-runtime");
function AlexRebulaBrandMark({ colors, getGradientId }) {
  const gradient1 = getGradientId("alex-rebula-1");
  const gradient2 = getGradientId("alex-rebula-2");
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 294 384",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("defs", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
            "linearGradient",
            {
              id: gradient1,
              x1: "-3.50005",
              y1: "372.769",
              x2: "202",
              y2: "166.769",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("stop", { stopColor: colors.dark }),
                /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("stop", { offset: "1", stopColor: colors.light })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
            "linearGradient",
            {
              id: gradient2,
              x1: "-3.50005",
              y1: "372.769",
              x2: "202",
              y2: "166.769",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("stop", { stopColor: colors.dark }),
                /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("stop", { offset: "1", stopColor: colors.light })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
          "path",
          {
            d: "M71.0504 182C107.159 109.5 198.206 112.5 198.206 112.5C194.956 101.718 191.534 91.1656 188.506 82.5848C178.228 53.9963 166.547 31.0269 148.5 1C147.822 1.24398 146.985 2.00682 146.009 3.2315C142.417 8.66295 134.446 22.8769 118.991 59.2426C96.1984 113.656 71.0504 182 71.0504 182Z",
            fill: `url(#${gradient1})`
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
var import_jsx_runtime37 = require("react/jsx-runtime");
var Logo = import_react27.default.forwardRef(function Logo2({ href = "/", ...other }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(BrandLogo, { ref, href, ...other, children: AlexRebulaBrandMark });
});
Logo.displayName = "Logo";

// src/components/material/navigation/public-nav/nav-links/nav-links.tsx
var import_react28 = __toESM(require("react"), 1);
var import_Link2 = __toESM(require("@mui/material/Link"), 1);
var import_Stack3 = __toESM(require("@mui/material/Stack"), 1);

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
var import_jsx_runtime38 = require("react/jsx-runtime");
var NavLinks = import_react28.default.forwardRef(function NavLinks2({ items, orientation = "horizontal", onNavigate, sx, ...other }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
    import_Stack3.default,
    {
      ref,
      component: "nav",
      "aria-label": "Main",
      direction: orientation === "horizontal" ? "row" : "column",
      spacing: orientation === "horizontal" ? 3 : 2,
      sx: [navLinksRootSx(orientation), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
        import_Link2.default,
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
var import_react29 = require("react");
var import_Drawer = __toESM(require("@mui/material/Drawer"), 1);
var import_IconButton3 = __toESM(require("@mui/material/IconButton"), 1);

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
var import_jsx_runtime39 = require("react/jsx-runtime");
function NavMobileMenu({
  children,
  menuButtonLabel = "Open menu",
  ...other
}) {
  const [open, setOpen] = (0, import_react29.useState)(false);
  const handleOpen = (0, import_react29.useCallback)(() => setOpen(true), []);
  const handleClose = (0, import_react29.useCallback)(() => setOpen(false), []);
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_jsx_runtime39.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_IconButton3.default, { onClick: handleOpen, "aria-label": menuButtonLabel, ...other, children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(GiselleIcon, { icon: "solar:hamburger-menu-broken", width: 24 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
      import_Drawer.default,
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
var import_react30 = __toESM(require("react"), 1);
var import_Button = __toESM(require("@mui/material/Button"), 1);
var import_jsx_runtime40 = require("react/jsx-runtime");
var SignInButton = import_react30.default.forwardRef(
  function SignInButton2({ label = "Sign in", variant = "outlined", color = "inherit", size = "small", ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_Button.default, { ref, variant, color, size, ...other, children: label });
  }
);
SignInButton.displayName = "SignInButton";

// src/components/material/navigation/public-nav/theme-toggle-button/theme-toggle-button.tsx
var import_jsx_runtime41 = require("react/jsx-runtime");
function ThemeToggleButton({ mode, onModeChange, ...other }) {
  const isDark = mode === "dark";
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
    ToggleIconButton,
    {
      pressed: isDark,
      idleIcon: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(GiselleIcon, { icon: "solar:sun-2-bold-duotone", width: 20 }),
      pressedIcon: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(GiselleIcon, { icon: "solar:moon-bold-duotone", width: 20 }),
      hoverIcon: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
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
var import_jsx_runtime42 = require("react/jsx-runtime");
var PublicNav = import_react31.default.forwardRef(function PublicNav2({
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
  const { mode: systemMode, setMode: setSystemMode } = (0, import_styles6.useColorScheme)();
  const resolvedMode = resolveColorMode(colorMode, systemMode);
  const resolvedLogo = logo ?? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(Logo, {});
  const isScrolled = (0, import_useScrollTrigger.default)({ disableHysteresis: true, threshold: 0 });
  const handleModeChange = (nextMode) => {
    onColorModeChange?.(nextMode);
    if (!colorMode) setSystemMode(nextMode);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
    import_AppBar2.default,
    {
      ref,
      position: "static",
      color: "transparent",
      elevation: isScrolled ? SCROLLED_ELEVATION : 0,
      sx: [publicNavRootSx, isScrolled && scrolledSurfaceSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_Toolbar2.default, { disableGutters: true, sx: publicNavToolbarSx(navBreakpoint), children: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(SectionContainer, { py: 0, sx: publicNavContainerSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(import_Box19.default, { sx: navStartSlotSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_Box19.default, { sx: mobileNavSlotSx(navBreakpoint), children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(NavMobileMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(import_Box19.default, { sx: mobileDrawerBodySx, children: [
            resolvedLogo,
            /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(NavLinks, { items: navItems, orientation: "vertical" })
          ] }) }) }),
          resolvedLogo
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(import_Box19.default, { sx: actionsSlotSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(import_Box19.default, { sx: desktopNavSlotSx(navBreakpoint), children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(NavLinks, { items: navItems, orientation: "horizontal" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(ThemeToggleButton, { mode: resolvedMode, onModeChange: handleModeChange }),
          /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SignInButton, { label: signInLabel, onClick: onSignInClick, href: signInHref })
        ] })
      ] }) })
    }
  );
});
PublicNav.displayName = "PublicNav";

// src/components/material/navigation/public-footer/public-footer.tsx
var import_react32 = __toESM(require("react"), 1);
var import_Box20 = __toESM(require("@mui/material/Box"), 1);
var import_Link3 = __toESM(require("@mui/material/Link"), 1);
var import_Typography12 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime43 = require("react/jsx-runtime");
var DEFAULT_SOCIAL_LINKS = [
  { label: "Twitter", href: "#", icon: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(GiselleIcon, { icon: "mdi:twitter", width: 20 }) },
  { label: "Facebook", href: "#", icon: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(GiselleIcon, { icon: "mdi:facebook", width: 20 }) },
  { label: "Instagram", href: "#", icon: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(GiselleIcon, { icon: "mdi:instagram", width: 20 }) },
  { label: "LinkedIn", href: "#", icon: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(GiselleIcon, { icon: "mdi:linkedin", width: 20 }) }
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
var import_jsx_runtime44 = require("react/jsx-runtime");
var PublicFooter = import_react32.default.forwardRef(function PublicFooter2({
  logo,
  bio = DEFAULT_BIO,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  linkGroups = DEFAULT_LINK_GROUPS,
  copyrightHolder = DEFAULT_COPYRIGHT_HOLDER,
  layoutQuery = DEFAULT_LAYOUT_QUERY,
  sx,
  ...other
}, ref) {
  const resolvedLogo = logo ?? /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_Link3.default, { href: "/", underline: "none", sx: defaultLogoSx, children: copyrightHolder });
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const socialActions = socialLinks.map((social) => ({
    tooltip: social.label,
    icon: social.icon,
    href: social.href
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
    import_Box20.default,
    {
      ref,
      component: "footer",
      sx: [publicFooterRootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(SectionContainer, { sx: publicFooterInnerSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(import_Box20.default, { sx: topRowSx(layoutQuery), children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(import_Box20.default, { sx: bioColumnSx, children: [
            resolvedLogo,
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_Typography12.default, { variant: "body2", sx: bioTextSx, children: bio }),
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(IconActionBar, { actions: socialActions })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_Box20.default, { sx: linkGroupsRowSx(layoutQuery), children: linkGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(import_Box20.default, { sx: linkGroupColumnSx, children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_Typography12.default, { variant: "caption", sx: linkGroupHeadlineSx, children: group.headline }),
            group.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_Link3.default, { href: link.href, underline: "hover", sx: linkGroupLinkSx, children: link.name }, link.name))
          ] }, group.headline)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(import_Typography12.default, { variant: "body2", sx: copyrightRowSx, children: [
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
var import_react34 = __toESM(require("react"), 1);
var import_Fab = __toESM(require("@mui/material/Fab"), 1);

// src/components/material/navigation/back-to-top-button/use-scroll-visibility.ts
var import_react33 = require("react");
function useScrollVisibility(thresholdPx) {
  const [isVisible, setIsVisible] = (0, import_react33.useState)(false);
  (0, import_react33.useEffect)(() => {
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
var import_SvgIcon5 = __toESM(require("@mui/material/SvgIcon"), 1);

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
var import_jsx_runtime45 = require("react/jsx-runtime");
var DEFAULT_BACK_TO_TOP_ICON = /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_SvgIcon5.default, { sx: backToTopButtonIconSx, viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("path", { d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" }) });

// src/components/material/navigation/back-to-top-button/back-to-top-button.tsx
var import_jsx_runtime46 = require("react/jsx-runtime");
var BackToTopButton = import_react34.default.forwardRef(
  function BackToTopButton2({
    scrollThreshold = BACK_TO_TOP_BUTTON_DEFAULT_SCROLL_THRESHOLD,
    icon = DEFAULT_BACK_TO_TOP_ICON,
    sx,
    ...other
  }, ref) {
    const isVisible = useScrollVisibility(scrollThreshold);
    const handleClick = (0, import_react34.useCallback)(() => {
      if (typeof window === "undefined") return;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
      import_Fab.default,
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
var import_react35 = __toESM(require("react"), 1);
var import_Box21 = __toESM(require("@mui/material/Box"), 1);
var import_IconButton4 = __toESM(require("@mui/material/IconButton"), 1);
var import_Typography13 = __toESM(require("@mui/material/Typography"), 1);

// src/components/material/layout/titled-block/titled-block.const.ts
var TITLED_BLOCK_SPACING = {
  small: { blockGap: 1, headerGap: 1, padding: 1.5, titleVariant: "subtitle2" },
  large: { blockGap: 1.5, headerGap: 1.5, padding: 2.5, titleVariant: "subtitle1" }
};
var RESET_ICON_SIZE = 16;

// src/components/material/layout/titled-block/titled-block.defaults.tsx
var import_jsx_runtime47 = require("react/jsx-runtime");
var DEFAULT_RESET_ICON = /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(GiselleIcon, { icon: "solar:restart-bold", width: RESET_ICON_SIZE, "aria-hidden": "true" });

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
var import_jsx_runtime48 = require("react/jsx-runtime");
var TitledBlock = import_react35.default.forwardRef(function TitledBlock2({
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
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(import_Box21.default, { ref, sx: [rootSx3(size), ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(import_Box21.default, { sx: headerSx(size), children: [
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_Typography13.default, { variant: titleVariant, component: "h3", children: title }),
      canReset && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(import_IconButton4.default, { size: "small", onClick: onReset, "aria-label": resetLabel, sx: resetButtonSx, children: resetIcon })
    ] }),
    children
  ] });
});
TitledBlock.displayName = "TitledBlock";

// src/components/section/hero/section/hero-section.tsx
var import_Box22 = __toESM(require("@mui/material/Box"), 1);
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
var import_jsx_runtime49 = require("react/jsx-runtime");
function HeroSection({
  heading,
  text: text2,
  actions,
  icons,
  color = "primary",
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_Box22.default, { sx: [heroRootSx(color), ...Array.isArray(sx) ? sx : [sx]], ...other, children: /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(import_Container2.default, { maxWidth: "lg", sx: heroInnerSx, children: [
    heading,
    text2,
    actions && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_Box22.default, { sx: heroActionsRowSx, children: actions }),
    icons && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_Box22.default, { sx: heroIconsSlotSx, children: icons })
  ] }) });
}

// src/components/section/feature-flow/feature-flow-section.tsx
var import_react45 = __toESM(require("react"), 1);
var import_Grid4 = __toESM(require("@mui/material/Grid"), 1);
var import_LinearProgress = __toESM(require("@mui/material/LinearProgress"), 1);

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.tsx
var import_react38 = require("react");
var import_framer_motion2 = require("framer-motion");
var import_Box24 = __toESM(require("@mui/material/Box"), 1);

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
var import_react37 = __toESM(require("react"), 1);
var import_framer_motion = require("framer-motion");
var import_Box23 = __toESM(require("@mui/material/Box"), 1);
var import_Stack4 = __toESM(require("@mui/material/Stack"), 1);

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
var import_react36 = __toESM(require("react"), 1);
var import_Tooltip3 = __toESM(require("@mui/material/Tooltip"), 1);
var import_ButtonBase2 = __toESM(require("@mui/material/ButtonBase"), 1);

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
var import_jsx_runtime50 = require("react/jsx-runtime");
var SubNavButton = import_react36.default.forwardRef(
  function SubNavButton2({ item, isActive, onPress }, ref) {
    const handleClick = (0, import_react36.useCallback)(() => onPress(item.id), [onPress, item.id]);
    return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(import_Tooltip3.default, { title: item.label, placement: "top", arrow: true, children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
      import_ButtonBase2.default,
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
var import_jsx_runtime51 = require("react/jsx-runtime");
var NavPill = import_react37.default.forwardRef(function NavPill2({ items, activeId, onPress }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
    import_framer_motion.m.div,
    {
      ref,
      variants: pillVariants,
      initial: "initial",
      animate: "animate",
      exit: "exit",
      transition: pillTransition,
      children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(import_Box23.default, { component: "nav", "aria-label": "Section navigation", sx: pillSx, children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(import_Stack4.default, { direction: "row", spacing: PILL_BUTTON_ROW_SPACING, children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
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
var import_jsx_runtime52 = require("react/jsx-runtime");
function FloatingSubNav({ items, activeId, onSelect, sticky = false }) {
  const handlePress = (0, import_react38.useCallback)((id) => onSelect(id), [onSelect]);
  if (sticky) {
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_Box24.default, { sx: stickyWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_Box24.default, { sx: stickyInnerSx, children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_framer_motion2.AnimatePresence, { children: activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(NavPill, { items, activeId, onPress: handlePress }) }) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_framer_motion2.AnimatePresence, { children: activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_Box24.default, { sx: fixedWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(NavPill, { items, activeId, onPress: handlePress }) }) });
}

// src/components/motion/viewport/motion-viewport.tsx
var import_framer_motion3 = require("framer-motion");
var import_Box25 = __toESM(require("@mui/material/Box"), 1);
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
var import_jsx_runtime53 = require("react/jsx-runtime");
function MotionViewport({
  children,
  viewport,
  sx,
  disableAnimateOnMobile = true,
  ...other
}) {
  const smDown = (0, import_useMediaQuery.default)((theme) => theme.breakpoints.down("sm"));
  if (smDown && disableAnimateOnMobile) {
    return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(import_Box25.default, { sx, ...other, children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
    import_Box25.default,
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
var import_react39 = require("react");
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
  (0, import_react39.useEffect)(() => {
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
  const [state, setState] = (0, import_react39.useState)({
    direction: "down",
    isScrolling: false
  });
  const prevYRef = (0, import_react39.useRef)(0);
  const idleTimerRef = (0, import_react39.useRef)(null);
  (0, import_react39.useEffect)(() => {
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
  const ref = (0, import_react39.useRef)(null);
  const reducedMotion = (0, import_framer_motion4.useReducedMotion)();
  const { scrollYProgress } = (0, import_framer_motion4.useScroll)({
    target: ref,
    offset: IMAGE_REVEAL_SCROLL_OFFSET
  });
  const opacity2 = (0, import_framer_motion4.useTransform)(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : [IMAGE_REVEAL_OPACITY_FROM, 1]
  );
  const y = (0, import_framer_motion4.useTransform)(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [IMAGE_REVEAL_Y_FROM_PX, 0]
  );
  const scale2 = (0, import_framer_motion4.useTransform)(
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
  return { ref, style: { opacity: opacity2, y, scale: scale2, filter } };
}

// src/components/section/feature-flow/description-column/feature-flow-description-column.tsx
var import_Stack6 = __toESM(require("@mui/material/Stack"), 1);

// src/components/section/feature-flow/item-row/feature-flow-item-row.tsx
var import_react40 = __toESM(require("react"), 1);
var import_framer_motion5 = require("framer-motion");
var import_Stack5 = __toESM(require("@mui/material/Stack"), 1);
var import_Typography14 = __toESM(require("@mui/material/Typography"), 1);
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
var import_jsx_runtime54 = require("react/jsx-runtime");
var FeatureFlowItemRow = import_react40.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_framer_motion5.m.div, { variants: fade("inUp", { distance: reducedMotion ? 0 : 24 }), children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(
      import_ButtonBase3.default,
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
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(GiselleIcon, { icon, width: 48, "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(import_Stack5.default, { spacing: 1, sx: itemRowTextSlotSx, children: [
            /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_Typography14.default, { variant: "h4", component: "h6", color: "inherit", children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_Typography14.default, { color: "inherit", children: description })
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
var import_jsx_runtime55 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(import_jsx_runtime55.Fragment, { children: [
    title && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
      SectionTitle,
      {
        caption,
        title,
        txtGradient,
        description,
        sx: descriptionColumnTitleSx
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
      import_Stack6.default,
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
          return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
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
var import_react41 = __toESM(require("react"), 1);
var import_framer_motion6 = require("framer-motion");
var import_Box26 = __toESM(require("@mui/material/Box"), 1);
var import_Stack7 = __toESM(require("@mui/material/Stack"), 1);

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
var import_jsx_runtime56 = require("react/jsx-runtime");
var RESTING_REVEAL_STYLE = {
  opacity: 1,
  y: 0,
  scale: 1,
  filter: "none"
};
var FeatureFlowImageColumn = import_react41.default.forwardRef(
  function FeatureFlowImageColumn2({ activeSrc, ghostSrc, allSrcs, alt, revealStyle = RESTING_REVEAL_STYLE, sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_Stack7.default, { ref, sx: imageColumnStickyStackSx, ...other, children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_Box26.default, { component: "img", alt: "", "aria-hidden": true, src: ghostSrc, sx: imageColumnOuterGhostSx }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_Box26.default, { sx: [imageColumnCardSx, ...Array.isArray(sx) ? sx : [sx]], children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(import_Box26.default, { component: import_framer_motion6.m.div, style: revealStyle, sx: imageColumnRevealWrapperSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_Box26.default, { component: "img", alt: "", "aria-hidden": true, src: ghostSrc, sx: imageColumnInnerGhostSx }),
        allSrcs.map((src) => /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
          import_Box26.default,
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
var import_react44 = __toESM(require("react"), 1);
var import_framer_motion8 = require("framer-motion");
var import_Box29 = __toESM(require("@mui/material/Box"), 1);
var import_Grid3 = __toESM(require("@mui/material/Grid"), 1);
var import_Stack8 = __toESM(require("@mui/material/Stack"), 1);
var import_Container3 = __toESM(require("@mui/material/Container"), 1);
var import_Typography17 = __toESM(require("@mui/material/Typography"), 1);

// src/components/material/data-display/icon/icon-strip/icon-strip.tsx
var import_react42 = __toESM(require("react"), 1);
var import_Box27 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip4 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography15 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime57 = require("react/jsx-runtime");
function IconStrip({
  items,
  heading,
  centeredWrap = false,
  gap = ICON_STRIP_DEFAULT_GAP,
  sx,
  listSx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(import_Box27.default, { sx: [iconStripRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    heading && /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_Typography15.default, { component: "span", variant: "overline", sx: iconStripHeadingSx, children: heading }),
    /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
      import_Box27.default,
      {
        sx: [iconStripListSx(centeredWrap, gap), ...Array.isArray(listSx) ? listSx : [listSx]],
        children: items.map((item) => {
          const content = item.label ? /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(import_Box27.default, { sx: iconStripLabeledItemSx, children: [
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_Box27.default, { "aria-hidden": true, sx: iconStripIconSlotSx, children: item.icon }),
            /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_Typography15.default, { sx: iconStripItemLabelSx, variant: "caption", children: item.label })
          ] }) : item.icon;
          return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react42.default.Fragment, { children: item.tooltip ? /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_Tooltip4.default, { title: item.tooltip, children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_Box27.default, { component: "span", sx: iconStripTooltipWrapperSx, children: content }) }) : content }, item.key);
        })
      }
    )
  ] });
}

// src/components/material/data-display/icon/tech-strip/tech-icon-strip.tsx
var import_jsx_runtime58 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(
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
var import_react43 = __toESM(require("react"), 1);
var import_framer_motion7 = require("framer-motion");
var import_Box28 = __toESM(require("@mui/material/Box"), 1);
var import_Link4 = __toESM(require("@mui/material/Link"), 1);
var import_IconButton5 = __toESM(require("@mui/material/IconButton"), 1);
var import_Typography16 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime59 = require("react/jsx-runtime");
var FeatureFlowHighlightCarousel = import_react43.default.forwardRef(function FeatureFlowHighlightCarousel2({ cards, sx, ...other }, ref) {
  const [selectedIndex, setSelectedIndex] = (0, import_react43.useState)(0);
  const [step, setStep] = (0, import_react43.useState)(1);
  const reducedMotion = (0, import_framer_motion7.useReducedMotion)();
  if (!cards.length) return null;
  const goTo = (index, direction) => {
    setStep(direction);
    setSelectedIndex((index + cards.length) % cards.length);
  };
  const selectedCard = cards[selectedIndex];
  const textVariants = highlightTextVariants(reducedMotion ? 0 : HIGHLIGHT_TEXT_SLIDE_DISTANCE);
  return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(import_Box28.default, { ref, sx: [highlightCarouselRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    cards.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
      import_Box28.default,
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
    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_Box28.default, { "aria-hidden": true, sx: highlightScrimSx }),
    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_Box28.default, { sx: highlightTextSlotSx, children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_framer_motion7.AnimatePresence, { mode: "wait", custom: step, children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
      import_framer_motion7.m.div,
      {
        custom: step,
        variants: textVariants,
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: { duration: 0.28, ease: "easeOut" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_Typography16.default, { variant: "h4", sx: highlightTitleSx, children: selectedCard?.title }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_Typography16.default, { variant: "body1", sx: highlightDetailTextSx, children: selectedCard?.description }),
          selectedCard?.href && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_Link4.default, { href: selectedCard.href, variant: "body2", sx: highlightLearnMoreLinkSx, children: "Learn more" })
        ]
      },
      selectedIndex
    ) }) }),
    cards.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(import_Box28.default, { sx: highlightControlsRowSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(import_Typography16.default, { variant: "caption", sx: highlightIndexLabelSx, children: [
        selectedIndex + 1,
        "/",
        cards.length
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        import_IconButton5.default,
        {
          "aria-label": "Previous highlight",
          size: "small",
          onClick: () => goTo(selectedIndex - 1, -1),
          sx: highlightArrowButtonSx,
          children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(GiselleIcon, { icon: "solar:alt-arrow-left-bold", width: 18, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        import_IconButton5.default,
        {
          "aria-label": "Next highlight",
          size: "small",
          onClick: () => goTo(selectedIndex + 1, 1),
          sx: highlightArrowButtonSx,
          children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(GiselleIcon, { icon: "solar:alt-arrow-right-bold", width: 18, "aria-hidden": "true" })
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
var import_jsx_runtime60 = require("react/jsx-runtime");
var FeatureFlowItemDetail = import_react44.default.forwardRef(
  function FeatureFlowItemDetail2({ item, onNodeRef, renderHighlightPanel, detailPanelColor = "primary", sx, ...other }, ref) {
    const reducedMotion = (0, import_framer_motion8.useReducedMotion)();
    const slideDistance = reducedMotion ? 0 : 8;
    return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_framer_motion8.m.div, { ref, layout: true, transition: DETAIL_PANEL_LAYOUT_TRANSITION, children: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_framer_motion8.AnimatePresence, { mode: "wait", children: item && /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(
      import_framer_motion8.m.div,
      {
        initial: { opacity: 0, y: slideDistance },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -slideDistance },
        transition: { duration: 0.22, ease: "easeOut" },
        children: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(
          import_Box29.default,
          {
            ref: (node) => onNodeRef?.(item.id, node),
            sx: [detailPanelSx(detailPanelColor), ...Array.isArray(sx) ? sx : [sx]],
            ...other,
            children: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_Container3.default, { children: /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(import_Grid3.default, { container: true, spacing: { xs: 4, md: 8 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_Grid3.default, { size: { xs: 12, md: 6 }, children: /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(import_Stack8.default, { spacing: 4, children: [
                /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(import_Stack8.default, { direction: "row", spacing: 2, sx: itemDetailHeaderSlotSx, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(
                    GiselleIcon,
                    {
                      icon: item.icon,
                      width: 44,
                      sx: itemDetailHeaderIconSx,
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_Typography17.default, { variant: "h3", children: item.title })
                ] }),
                item.metrics?.length ? /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_Box29.default, { sx: itemDetailMetricsGridSx(item.metrics.length), children: item.metrics.map(({ value, label, sublabel, icon }) => /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(
                  MetricCard,
                  {
                    value,
                    label,
                    sublabel,
                    icon: icon ? /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(GiselleIcon, { icon, width: 36, "aria-hidden": "true" }) : void 0,
                    color: "primary",
                    decoration: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(MetricCardDecoration, { color: "primary" })
                  },
                  label
                )) }) : null,
                isRichLongDescription(item) ? item.longDescription : /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_Typography17.default, { variant: "body1", sx: itemDetailLongDescriptionSx, children: item.longDescription ?? item.description }),
                item.technologies?.length ? /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(
                  TechIconStrip,
                  {
                    heading: "Technologies",
                    centeredWrap: false,
                    items: item.technologies.map((tech) => ({
                      label: tech.name,
                      icon: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(GiselleIcon, { icon: tech.icon, width: 32, "aria-hidden": "true" })
                    }))
                  }
                ) : null
              ] }) }),
              renderHighlightPanel ? /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_Grid3.default, { size: { xs: 12, md: 6 }, children: renderHighlightPanel(item) }) : (item.highlightCards ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_Grid3.default, { size: { xs: 12, md: 6 }, children: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(FeatureFlowHighlightCarousel, { cards: item.highlightCards ?? [] }) })
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
var import_jsx_runtime61 = require("react/jsx-runtime");
var FeatureFlowSection = import_react45.default.forwardRef(
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
    const [activeItemIndex, setActiveItemIndex] = (0, import_react45.useState)(0);
    const [selectedItemIndex, setSelectedItemIndex] = (0, import_react45.useState)(0);
    const [userHasSelected, setUserHasSelected] = (0, import_react45.useState)(false);
    const [expandedItemId, setExpandedItemId] = (0, import_react45.useState)(null);
    const [hoverImageIndex, setHoverImageIndex] = (0, import_react45.useState)(0);
    const [pendingScrollItemId, setPendingScrollItemId] = (0, import_react45.useState)(null);
    const hoverImageIndexRef = (0, import_react45.useRef)(0);
    const detailPanelNodesRef = (0, import_react45.useRef)(/* @__PURE__ */ new Map());
    const { direction: scrollDirection, isScrolling } = useScrollDirection();
    const { ref: imageColumnRef, style: imageRevealStyle } = useImageRevealTransform();
    const activeItem = items[activeItemIndex] ?? items[0];
    const setHoverPhase = (0, import_react45.useCallback)((phase) => {
      hoverImageIndexRef.current = phase;
      setHoverImageIndex(phase);
    }, []);
    const scrollAwareSrc = (0, import_react45.useMemo)(() => {
      if (image.scrollImages?.length === 2) {
        return image.scrollImages[scrollDirection === "down" ? 0 : 1];
      }
      return image.src;
    }, [image.scrollImages, image.src, scrollDirection]);
    const hoverSequenceSources = (0, import_react45.useMemo)(() => {
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
    (0, import_react45.useEffect)(() => {
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
    (0, import_react45.useEffect)(() => {
      if (!isScrolling) {
        setActiveItemIndex(selectedItemIndex);
        setHoverPhase(0);
      }
    }, [isScrolling, selectedItemIndex, setHoverPhase]);
    const activeSrc = hoverSequenceSources[hoverImageIndex] ?? hoverSequenceSources[0] ?? "";
    const initiallyVisibleSrc = items[0]?.imgUrl?.[0] ?? image.scrollImages?.[0] ?? image.stackSources?.[0] ?? image.src;
    const allItemImageSrcs = (0, import_react45.useMemo)(
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
    const subNavItems = (0, import_react45.useMemo)(
      () => items.filter(hasExpansionData).map((item) => ({
        id: item.id,
        label: item.title,
        icon: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(GiselleIcon, { icon: item.icon, width: 22, "aria-hidden": "true" })
      })),
      [items]
    );
    const handleSubNavSelect = (0, import_react45.useCallback)(
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
    (0, import_react45.useEffect)(() => {
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
      rightPanel = /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
      PageSection,
      {
        ref,
        decoration,
        containerSx: { position: "relative" },
        containerPy: 0,
        unconstrainedChildren: /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(import_jsx_runtime61.Fragment, { children: [
          pendingScrollItemId && /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
            import_LinearProgress.default,
            {
              "aria-label": "Loading item detail panel",
              "aria-live": "polite",
              "aria-busy": "true"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(MotionViewport, { children: /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(
          import_Grid4.default,
          {
            container: true,
            columnSpacing,
            rowSpacing: { xs: 5, md: 0 },
            sx: featureFlowGridContainerSx(Boolean(expandedItemId)),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(import_Grid4.default, { size: resolvedDescriptionGridSize, sx: featureFlowDescriptionGridSx(isLeft), children: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(import_Grid4.default, { size: resolvedImageGridSize, sx: featureFlowImageGridSx(isLeft), children: rightPanel })
            ]
          }
        ) })
      }
    );
  }
);
FeatureFlowSection.displayName = "FeatureFlowSection";

// src/components/section/bio-hero/bio-hero-section.tsx
var import_react46 = __toESM(require("react"), 1);
var import_Box30 = __toESM(require("@mui/material/Box"), 1);
var import_Button2 = __toESM(require("@mui/material/Button"), 1);
var import_Stack9 = __toESM(require("@mui/material/Stack"), 1);

// src/components/section/bio-hero/bio-hero-section.styles.ts
var import_styles7 = require("@mui/material/styles");

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
    return `linear-gradient(0deg, ${(0, import_styles7.alpha)(grey900, overlay.startAlpha)}, ${(0, import_styles7.alpha)(grey900, overlay.endAlpha)})`;
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
var import_jsx_runtime62 = require("react/jsx-runtime");
var BioHeroSection = import_react46.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
      import_Box30.default,
      {
        ref,
        component: "section",
        sx: [bioHeroRootSx(align), ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: [
          backgroundImageUrl && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_Box30.default, { sx: bioHeroBackgroundImageSx(backgroundImageUrl) }),
          backgroundImageUrl && backgroundOverlay && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_Box30.default, { sx: bioHeroBackgroundOverlaySx(backgroundOverlay) }),
          hasBackgroundImage ? /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_Box30.default, { sx: bioHeroOnBackgroundImageTextSx, children: heading }) : heading,
          (intro || statement || experience) && /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(import_Stack9.default, { spacing: 2, sx: hasBackgroundImage ? bioHeroOnBackgroundImageTextSx : void 0, children: [
            intro,
            statement,
            experience
          ] }),
          logos && logos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_Box30.default, { sx: bioHeroLogoStripSx(align), children: logos.map((logo) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
            import_Box30.default,
            {
              component: "img",
              src: logo.src,
              alt: logo.alt,
              sx: bioHeroLogoImageSx
            },
            logo.src
          )) }),
          cta && (cta.href ? /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
            import_Button2.default,
            {
              variant: cta.variant ?? "contained",
              href: cta.href,
              target: cta.target,
              rel: cta.rel,
              onClick: cta.onClick,
              children: cta.label
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_Button2.default, { variant: cta.variant ?? "contained", onClick: cta.onClick, children: cta.label }))
        ]
      }
    );
  }
);
BioHeroSection.displayName = "BioHeroSection";

// src/components/section/integrations-showcase/integrations-showcase-section.tsx
var import_react49 = __toESM(require("react"), 1);
var import_framer_motion9 = require("framer-motion");
var import_Box33 = __toESM(require("@mui/material/Box"), 1);
var import_Grid5 = __toESM(require("@mui/material/Grid"), 1);

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
var import_react47 = __toESM(require("react"), 1);
var import_Box31 = __toESM(require("@mui/material/Box"), 1);

// src/components/section/integrations-showcase/decorative-line/decorative-line.styles.ts
var decorativeLineSx = (theme) => ({
  position: "absolute",
  color: theme.vars.palette.divider,
  pointerEvents: "none"
});

// src/components/section/integrations-showcase/decorative-line/decorative-line.tsx
var import_jsx_runtime63 = require("react/jsx-runtime");
var IntegrationsShowcaseLine = import_react47.default.forwardRef(
  function IntegrationsShowcaseLine2({ vertical, sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
      import_Box31.default,
      {
        ref,
        component: "svg",
        "aria-hidden": "true",
        width: vertical ? "2" : "64",
        height: vertical ? "64" : "2",
        viewBox: vertical ? "0 0 2 64" : "0 0 64 2",
        sx: [decorativeLineSx, ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: vertical ? /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
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
        ) : /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
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
var import_react48 = __toESM(require("react"), 1);
var import_Box32 = __toESM(require("@mui/material/Box"), 1);

// src/components/section/integrations-showcase/decorative-dot/decorative-dot.styles.ts
var decorativeDotSx = (theme) => ({
  position: "absolute",
  color: theme.vars.palette.divider,
  pointerEvents: "none"
});

// src/components/section/integrations-showcase/decorative-dot/decorative-dot.tsx
var import_jsx_runtime64 = require("react/jsx-runtime");
var IntegrationsShowcaseDot = import_react48.default.forwardRef(
  function IntegrationsShowcaseDot2({ sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
      import_Box32.default,
      {
        ref,
        component: "svg",
        "aria-hidden": "true",
        width: "8",
        height: "8",
        viewBox: "0 0 8 8",
        sx: [decorativeDotSx, ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("circle", { cx: "4", cy: "4", r: "4", fill: "currentColor" })
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
var import_jsx_runtime65 = require("react/jsx-runtime");
var IntegrationsShowcaseSection = import_react49.default.forwardRef(function IntegrationsShowcaseSection2({ caption, title, txtGradient, description, image, sx, ...other }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
    import_Box33.default,
    {
      ref,
      component: "section",
      sx: [integrationsShowcaseRootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)(
        import_Box33.default,
        {
          component: import_framer_motion9.motion.div,
          initial: "initial",
          whileInView: "animate",
          viewport: { once: true, amount: 0.3 },
          variants: container(),
          sx: integrationsShowcaseContentSx,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)(
              import_Box33.default,
              {
                component: import_framer_motion9.motion.div,
                variants: fade("in"),
                "aria-hidden": "true",
                sx: integrationsShowcaseAccentsSx,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(IntegrationsShowcaseLine, { vertical: true, sx: integrationsShowcaseVerticalLineSx }),
                  /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(IntegrationsShowcaseDot, { sx: integrationsShowcaseDotOuterSx }),
                  /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(IntegrationsShowcaseDot, { sx: integrationsShowcaseDotInnerSx }),
                  /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(import_Box33.default, { sx: integrationsShowcaseDotSpacerSx }),
                  /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(IntegrationsShowcaseDot, { sx: integrationsShowcaseDotInnerSx }),
                  /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(IntegrationsShowcaseDot, { sx: integrationsShowcaseDotOuterSx })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)(import_Grid5.default, { container: true, sx: integrationsShowcaseGridSx, ...integrationsShowcaseGridSpacing, children: [
              /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(import_Grid5.default, { size: integrationsShowcaseTextColumnSize, children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(import_Box33.default, { sx: integrationsShowcaseTextColumnSx, children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
                SectionTitle,
                {
                  caption,
                  title,
                  txtGradient,
                  description
                }
              ) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(import_Grid5.default, { size: integrationsShowcaseImageColumnSize, children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(import_Box33.default, { sx: integrationsShowcaseImageWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
                import_Box33.default,
                {
                  component: import_framer_motion9.motion.img,
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
var import_react51 = __toESM(require("react"), 1);
var import_framer_motion10 = require("framer-motion");
var import_Box35 = __toESM(require("@mui/material/Box"), 1);
var import_Grid6 = __toESM(require("@mui/material/Grid"), 1);
var import_Button3 = __toESM(require("@mui/material/Button"), 1);
var import_Masonry = __toESM(require("@mui/lab/Masonry"), 1);

// src/components/section/testimonials-wall/card/card.tsx
var import_react50 = __toESM(require("react"), 1);
var import_Box34 = __toESM(require("@mui/material/Box"), 1);
var import_Link5 = __toESM(require("@mui/material/Link"), 1);
var import_Avatar2 = __toESM(require("@mui/material/Avatar"), 1);
var import_Typography18 = __toESM(require("@mui/material/Typography"), 1);

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
var import_styles8 = require("@mui/material/styles");
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
    bgcolor: (0, import_styles8.alpha)(whiteColor, TESTIMONIALS_WALL_CARD_OVERLAY_ALPHA),
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
var import_jsx_runtime66 = require("react/jsx-runtime");
var TestimonialsWallCard = import_react50.default.forwardRef(
  function TestimonialsWallCard2({ item, hasBackground = false, sx, ...other }, ref) {
    const formattedDate = formatTestimonialWallDate(item.date);
    const meta = [item.authorRole, formattedDate].filter(Boolean).join(" \u2022 ");
    return /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)(
      import_Box34.default,
      {
        ref,
        component: "article",
        sx: [cardSx(hasBackground), ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_Typography18.default, { "aria-hidden": "true", sx: cardQuoteMarkSx, children: "\u201C" }),
          /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_Typography18.default, { variant: "body2", sx: cardQuoteTextSx, children: item.quote }),
          /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)(import_Box34.default, { sx: cardAttributionRowSx, children: [
            /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_Avatar2.default, { alt: item.authorName, src: item.avatarSrc, children: item.authorName.charAt(0) }),
            /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)(import_Box34.default, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_Typography18.default, { variant: "subtitle2", sx: cardAuthorNameSx, children: item.authorName }),
              meta && /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_Typography18.default, { variant: "caption", sx: cardAuthorMetaSx, children: meta })
            ] })
          ] }),
          item.sourceUrl && /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
            import_Link5.default,
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
var import_styles9 = require("@mui/material/styles");
var testimonialsWallRootSx = (backgroundImageUrl) => (theme) => {
  const base = { width: "100%", py: { xs: 8, md: 12 } };
  if (!backgroundImageUrl) {
    return base;
  }
  const scrimColor = typeof theme.palette.common?.black === "string" ? theme.palette.common.black : "#000000";
  const scrim = (0, import_styles9.alpha)(scrimColor, TESTIMONIALS_WALL_SCRIM_ALPHA);
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
var import_jsx_runtime67 = require("react/jsx-runtime");
var TestimonialsWallSection = import_react51.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
      import_Box35.default,
      {
        ref,
        component: "section",
        sx: [testimonialsWallRootSx(backgroundImageUrl), ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
          import_Box35.default,
          {
            component: import_framer_motion10.motion.div,
            initial: "initial",
            whileInView: "animate",
            viewport: { once: true, amount: 0.2 },
            variants: container({
              transitionIn: { staggerChildren: TESTIMONIALS_WALL_STAGGER_CHILDREN }
            }),
            sx: testimonialsWallContentSx,
            children: /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(import_Grid6.default, { container: true, spacing: { xs: 4, md: 6 }, sx: testimonialsWallGridSx, children: [
              showHeadingColumn && /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_Grid6.default, { size: testimonialsWallHeadingColumnSize, children: /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(import_Box35.default, { sx: testimonialsWallHeadingColumnSx, children: [
                hasHeading && /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
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
                sourceUrl && /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
                  import_Button3.default,
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
              /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
                import_Grid6.default,
                {
                  size: showHeadingColumn ? testimonialsWallWithHeadingSize : testimonialsWallFullWidthSize,
                  children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
                    import_Masonry.default,
                    {
                      columns,
                      spacing,
                      sx: testimonialsWallMasonrySx,
                      children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_Box35.default, { component: import_framer_motion10.motion.div, variants: fade("inUp"), children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(TestimonialsWallCard, { item, hasBackground }) }, item.id))
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
var import_Box36 = __toESM(require("@mui/material/Box"), 1);

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
var import_jsx_runtime68 = require("react/jsx-runtime");
function AnimatedGradientText({
  children,
  color1 = ANIMATED_GRADIENT_DEFAULT_COLOR1,
  color2 = ANIMATED_GRADIENT_DEFAULT_COLOR2,
  duration = ANIMATED_GRADIENT_DEFAULT_DURATION,
  component = "span",
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
    import_Box36.default,
    {
      component,
      sx: [gradientTextSx(color1, color2, duration), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children
    }
  );
}

// src/components/material/data-display/icon/client-logo-strip/client-logo-strip.tsx
var import_Box37 = __toESM(require("@mui/material/Box"), 1);

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
var import_jsx_runtime69 = require("react/jsx-runtime");
function ClientLogoStrip({ logos, sx, listSx, ...other }) {
  const items = logos.map((logo) => ({
    key: logo.src,
    icon: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_Box37.default, { component: "img", src: logo.src, alt: logo.alt, sx: clientLogoStripImageSx })
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(IconStrip, { items, gap: CLIENT_LOGO_STRIP_GAP, sx, listSx, ...other });
}

// src/components/material/data-display/icon/platform-icon-strip/platform-icon-strip.const.ts
var PLATFORM_ICON_STRIP_GAP = 2.5;

// src/components/material/data-display/icon/platform-icon-strip/platform-icon-strip.tsx
var import_jsx_runtime70 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(
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
var import_react52 = __toESM(require("react"), 1);
var import_react_hook_form3 = require("react-hook-form");
var import_FormControl = __toESM(require("@mui/material/FormControl"), 1);
var import_FormHelperText = __toESM(require("@mui/material/FormHelperText"), 1);
var import_InputLabel = __toESM(require("@mui/material/InputLabel"), 1);
var import_MenuItem = __toESM(require("@mui/material/MenuItem"), 1);
var import_Select = __toESM(require("@mui/material/Select"), 1);
var import_jsx_runtime71 = require("react/jsx-runtime");
var RHFSelect = import_react52.default.forwardRef(function RHFSelect2({ name, label, helperText, options, fullWidth = true, ...other }, ref) {
  const { control } = (0, import_react_hook_form3.useFormContext)();
  return /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(
    import_react_hook_form3.Controller,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)(import_FormControl.default, { fullWidth, error: !!error2, ref, children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_InputLabel.default, { id: `${name}-label`, children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(
          import_Select.default,
          {
            ...field,
            value: field.value ?? "",
            labelId: label ? `${name}-label` : void 0,
            label,
            ...other,
            children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_MenuItem.default, { value: option.value, children: option.label }, option.value))
          }
        ),
        (!!error2 || helperText) && /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_FormHelperText.default, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFSelect.displayName = "RHFSelect";

// src/components/material/input/rhf-multi-select/rhf-multi-select.tsx
var import_react53 = __toESM(require("react"), 1);
var import_react_hook_form4 = require("react-hook-form");
var import_Checkbox2 = __toESM(require("@mui/material/Checkbox"), 1);
var import_FormControl2 = __toESM(require("@mui/material/FormControl"), 1);
var import_FormHelperText2 = __toESM(require("@mui/material/FormHelperText"), 1);
var import_InputLabel2 = __toESM(require("@mui/material/InputLabel"), 1);
var import_MenuItem2 = __toESM(require("@mui/material/MenuItem"), 1);
var import_Select2 = __toESM(require("@mui/material/Select"), 1);
var import_jsx_runtime72 = require("react/jsx-runtime");
var RHFMultiSelect = import_react53.default.forwardRef(
  function RHFMultiSelect2({ name, label, helperText, options, fullWidth = true, ...other }, ref) {
    const { control } = (0, import_react_hook_form4.useFormContext)();
    return /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
      import_react_hook_form4.Controller,
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
          return /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(import_FormControl2.default, { fullWidth, error: !!error2, ref, children: [
            label && /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_InputLabel2.default, { id: `${name}-label`, children: label }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
              import_Select2.default,
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
                children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(import_MenuItem2.default, { value: option.value, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_Checkbox2.default, { checked: value.includes(option.value) }),
                  option.label
                ] }, option.value))
              }
            ),
            (!!error2 || helperText) && /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_FormHelperText2.default, { children: error2 ? error2.message : helperText })
          ] });
        }
      }
    );
  }
);
RHFMultiSelect.displayName = "RHFMultiSelect";

// src/components/material/input/rhf-checkbox/rhf-checkbox.tsx
var import_react54 = __toESM(require("react"), 1);
var import_react_hook_form5 = require("react-hook-form");
var import_Checkbox3 = __toESM(require("@mui/material/Checkbox"), 1);
var import_FormControl3 = __toESM(require("@mui/material/FormControl"), 1);
var import_FormControlLabel = __toESM(require("@mui/material/FormControlLabel"), 1);
var import_FormHelperText3 = __toESM(require("@mui/material/FormHelperText"), 1);
var import_jsx_runtime73 = require("react/jsx-runtime");
var RHFCheckbox = import_react54.default.forwardRef(function RHFCheckbox2({ name, label, helperText, ...other }, ref) {
  const { control } = (0, import_react_hook_form5.useFormContext)();
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    import_react_hook_form5.Controller,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(import_FormControl3.default, { error: !!error2, ref, children: [
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
          import_FormControlLabel.default,
          {
            control: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
              import_Checkbox3.default,
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
        (!!error2 || helperText) && /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(import_FormHelperText3.default, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFCheckbox.displayName = "RHFCheckbox";

// src/components/material/input/rhf-multi-checkbox/rhf-multi-checkbox.tsx
var import_react55 = __toESM(require("react"), 1);
var import_react_hook_form6 = require("react-hook-form");
var import_Checkbox4 = __toESM(require("@mui/material/Checkbox"), 1);
var import_FormControl4 = __toESM(require("@mui/material/FormControl"), 1);
var import_FormControlLabel2 = __toESM(require("@mui/material/FormControlLabel"), 1);
var import_FormGroup = __toESM(require("@mui/material/FormGroup"), 1);
var import_FormHelperText4 = __toESM(require("@mui/material/FormHelperText"), 1);
var import_FormLabel = __toESM(require("@mui/material/FormLabel"), 1);
var import_jsx_runtime74 = require("react/jsx-runtime");
var RHFMultiCheckbox = import_react55.default.forwardRef(
  function RHFMultiCheckbox2({ name, label, helperText, options, row, ...other }, ref) {
    const { control } = (0, import_react_hook_form6.useFormContext)();
    return /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
      import_react_hook_form6.Controller,
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
          return /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)(import_FormControl4.default, { component: "fieldset", variant: "standard", error: !!error2, ref, children: [
            label && /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_FormLabel.default, { component: "legend", children: label }),
            /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_FormGroup.default, { row, children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
              import_FormControlLabel2.default,
              {
                control: /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
                  import_Checkbox4.default,
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
            (!!error2 || helperText) && /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_FormHelperText4.default, { children: error2 ? error2.message : helperText })
          ] });
        }
      }
    );
  }
);
RHFMultiCheckbox.displayName = "RHFMultiCheckbox";

// src/components/material/input/rhf-switch/rhf-switch.tsx
var import_react56 = __toESM(require("react"), 1);
var import_react_hook_form7 = require("react-hook-form");
var import_Switch2 = __toESM(require("@mui/material/Switch"), 1);
var import_FormControl5 = __toESM(require("@mui/material/FormControl"), 1);
var import_FormControlLabel3 = __toESM(require("@mui/material/FormControlLabel"), 1);
var import_FormHelperText5 = __toESM(require("@mui/material/FormHelperText"), 1);
var import_jsx_runtime75 = require("react/jsx-runtime");
var RHFSwitch = import_react56.default.forwardRef(function RHFSwitch2({ name, label, helperText, ...other }, ref) {
  const { control } = (0, import_react_hook_form7.useFormContext)();
  return /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(
    import_react_hook_form7.Controller,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ (0, import_jsx_runtime75.jsxs)(import_FormControl5.default, { error: !!error2, ref, children: [
        /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(
          import_FormControlLabel3.default,
          {
            control: /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(
              import_Switch2.default,
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
        (!!error2 || helperText) && /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(import_FormHelperText5.default, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFSwitch.displayName = "RHFSwitch";

// src/components/material/input/rhf-multi-switch/rhf-multi-switch.tsx
var import_react57 = __toESM(require("react"), 1);
var import_react_hook_form8 = require("react-hook-form");
var import_Switch3 = __toESM(require("@mui/material/Switch"), 1);
var import_FormControl6 = __toESM(require("@mui/material/FormControl"), 1);
var import_FormControlLabel4 = __toESM(require("@mui/material/FormControlLabel"), 1);
var import_FormGroup2 = __toESM(require("@mui/material/FormGroup"), 1);
var import_FormHelperText6 = __toESM(require("@mui/material/FormHelperText"), 1);
var import_FormLabel2 = __toESM(require("@mui/material/FormLabel"), 1);
var import_jsx_runtime76 = require("react/jsx-runtime");
var RHFMultiSwitch = import_react57.default.forwardRef(
  function RHFMultiSwitch2({ name, label, helperText, options, row, ...other }, ref) {
    const { control } = (0, import_react_hook_form8.useFormContext)();
    return /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
      import_react_hook_form8.Controller,
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
          return /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)(import_FormControl6.default, { component: "fieldset", variant: "standard", error: !!error2, ref, children: [
            label && /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(import_FormLabel2.default, { component: "legend", children: label }),
            /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(import_FormGroup2.default, { row, children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
              import_FormControlLabel4.default,
              {
                control: /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
                  import_Switch3.default,
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
            (!!error2 || helperText) && /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(import_FormHelperText6.default, { children: error2 ? error2.message : helperText })
          ] });
        }
      }
    );
  }
);
RHFMultiSwitch.displayName = "RHFMultiSwitch";

// src/components/material/input/rhf-upload/rhf-upload.tsx
var import_react58 = __toESM(require("react"), 1);
var import_react_hook_form9 = require("react-hook-form");
var import_Box38 = __toESM(require("@mui/material/Box"), 1);
var import_IconButton6 = __toESM(require("@mui/material/IconButton"), 1);
var import_FormHelperText7 = __toESM(require("@mui/material/FormHelperText"), 1);
var import_Stack10 = __toESM(require("@mui/material/Stack"), 1);
var import_Typography19 = __toESM(require("@mui/material/Typography"), 1);

// src/components/material/input/rhf-upload/rhf-upload-icons.defaults.tsx
var import_SvgIcon6 = __toESM(require("@mui/material/SvgIcon"), 1);

// src/components/material/input/rhf-upload/rhf-upload-icons.styles.ts
var uploadIconSx = { width: 32, height: 32 };

// src/components/material/input/rhf-upload/rhf-upload-icons.defaults.tsx
var import_jsx_runtime77 = require("react/jsx-runtime");
var CLOSE_ICON = /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(import_SvgIcon6.default, { viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) });
var UPLOAD_ICON = /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(import_SvgIcon6.default, { viewBox: "0 0 24 24", sx: uploadIconSx, children: /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("path", { d: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" }) });

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
var import_jsx_runtime78 = require("react/jsx-runtime");
function toFileArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null || value === "") return [];
  return [value];
}
var RHFUpload = import_react58.default.forwardRef(function RHFUpload2({ name, multiple = false, accept, maxSize, label, helperText, disabled = false, onRemove }, ref) {
  const { control } = (0, import_react_hook_form9.useFormContext)();
  const inputRef = import_react58.default.useRef(null);
  const [isDragActive, setIsDragActive] = import_react58.default.useState(false);
  const [rejections, setRejections] = import_react58.default.useState([]);
  return /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
    import_react_hook_form9.Controller,
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
        return /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(import_Box38.default, { ref, children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_Typography19.default, { variant: "subtitle2", sx: labelSx, children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(
            import_Box38.default,
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
                /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(import_Typography19.default, { variant: "body2", sx: dropZoneHintSx, children: [
                  "Drop ",
                  multiple ? "files" : "a file",
                  " here or click to browse"
                ] })
              ]
            }
          ),
          files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_Stack10.default, { spacing: 1, sx: fileListSx, children: files.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(
            import_Box38.default,
            {
              sx: fileRowSx,
              children: [
                isImageFile(file) ? /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
                  import_Box38.default,
                  {
                    component: "img",
                    src: getFilePreviewUrl(file),
                    alt: getFileName(file),
                    sx: fileThumbnailSx
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_Box38.default, { sx: fileThumbnailPlaceholderSx }),
                /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(import_Box38.default, { sx: fileInfoSx, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_Typography19.default, { variant: "body2", noWrap: true, children: getFileName(file) }),
                  typeof file !== "string" && /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_Typography19.default, { variant: "caption", color: "text.secondary", children: formatFileSize(file.size) })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
                  import_IconButton6.default,
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
          rejections.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_FormHelperText7.default, { error: true, children: reason }, reason)),
          (!!error2 || helperText) && !rejections.length && /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_FormHelperText7.default, { error: !!error2, children: error2 ? error2.message : helperText })
        ] });
      }
    }
  );
});
RHFUpload.displayName = "RHFUpload";

// src/components/material/input/rhf-upload-box/rhf-upload-box.tsx
var import_react59 = __toESM(require("react"), 1);
var import_react_hook_form10 = require("react-hook-form");
var import_Box39 = __toESM(require("@mui/material/Box"), 1);
var import_FormHelperText8 = __toESM(require("@mui/material/FormHelperText"), 1);
var import_Typography20 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime79 = require("react/jsx-runtime");
function renderBoxContent(value, placeholder) {
  if (!value) return placeholder ?? UPLOAD_ICON;
  if (isImageFile(value)) {
    const src = typeof value === "string" ? value : URL.createObjectURL(value);
    return /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(import_Box39.default, { component: "img", src, alt: getFileName(value), sx: thumbnailSx });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(import_Typography20.default, { variant: "caption", noWrap: true, sx: fileNameSx, children: getFileName(value) });
}
var RHFUploadBox = import_react59.default.forwardRef(
  function RHFUploadBox2({ name, accept, maxSize, helperText, disabled = false, placeholder }, ref) {
    const { control } = (0, import_react_hook_form10.useFormContext)();
    const inputRef = import_react59.default.useRef(null);
    const [isDragActive, setIsDragActive] = import_react59.default.useState(false);
    const [rejection, setRejection] = import_react59.default.useState(null);
    return /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
      import_react_hook_form10.Controller,
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
          return /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)(import_Box39.default, { ref, children: [
            /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)(
              import_Box39.default,
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
                  /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
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
            rejection && /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(import_FormHelperText8.default, { error: true, children: rejection }),
            (!!error2 || helperText) && !rejection && /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(import_FormHelperText8.default, { error: !!error2, children: error2 ? error2.message : helperText })
          ] });
        }
      }
    );
  }
);
RHFUploadBox.displayName = "RHFUploadBox";

// src/components/material/input/rhf-upload-avatar/rhf-upload-avatar.tsx
var import_react60 = __toESM(require("react"), 1);
var import_react_hook_form11 = require("react-hook-form");
var import_Avatar3 = __toESM(require("@mui/material/Avatar"), 1);
var import_Box40 = __toESM(require("@mui/material/Box"), 1);
var import_FormHelperText9 = __toESM(require("@mui/material/FormHelperText"), 1);

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
var import_jsx_runtime80 = require("react/jsx-runtime");
var IMAGE_ACCEPT = "image/*";
var RHFUploadAvatar = import_react60.default.forwardRef(
  function RHFUploadAvatar2({ name, maxSize, helperText, disabled = false, size = 96 }, ref) {
    const { control } = (0, import_react_hook_form11.useFormContext)();
    const inputRef = import_react60.default.useRef(null);
    const [isDragActive, setIsDragActive] = import_react60.default.useState(false);
    const [rejection, setRejection] = import_react60.default.useState(null);
    return /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
      import_react_hook_form11.Controller,
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
          return /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(import_Box40.default, { ref, sx: rootSx4, children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(
              import_Box40.default,
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
                  /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
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
                  field.value ? /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_Avatar3.default, { src: getFilePreviewUrl(field.value), sx: getAvatarSx(size) }) : UPLOAD_ICON
                ]
              }
            ),
            rejection && /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_FormHelperText9.default, { error: true, children: rejection }),
            (!!error2 || helperText) && !rejection && /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_FormHelperText9.default, { error: !!error2, children: error2 ? error2.message : helperText })
          ] });
        }
      }
    );
  }
);
RHFUploadAvatar.displayName = "RHFUploadAvatar";

// src/components/material/input/rhf-phone-input/rhf-phone-input.tsx
var import_react61 = __toESM(require("react"), 1);
var import_react_hook_form12 = require("react-hook-form");
var import_react_phone_number_input = __toESM(require("react-phone-number-input"), 1);
var import_Box41 = __toESM(require("@mui/material/Box"), 1);
var import_TextField2 = __toESM(require("@mui/material/TextField"), 1);

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
var import_jsx_runtime81 = require("react/jsx-runtime");
var PhoneNumberTextField = import_react61.default.forwardRef(
  function PhoneNumberTextField2(props, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(import_TextField2.default, { ...props, inputRef: ref, fullWidth: true });
  }
);
function CountryFlag({ country, countryName }) {
  if (!country) return /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("span", {});
  return /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
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
var RHFPhoneInput = import_react61.default.forwardRef(
  function RHFPhoneInput2({ name, label, helperText, defaultCountry, international = true, disabled, ...other }, ref) {
    const { control } = (0, import_react_hook_form12.useFormContext)();
    return /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
      import_react_hook_form12.Controller,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(import_Box41.default, { ref, sx: rhfPhoneInputRootSx, children: /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
          import_react_phone_number_input.default,
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
var import_react62 = __toESM(require("react"), 1);
var import_dayjs = __toESM(require("dayjs"), 1);
var import_react_hook_form13 = require("react-hook-form");
var import_DatePicker = require("@mui/x-date-pickers/DatePicker");
var import_jsx_runtime82 = require("react/jsx-runtime");
var RHFDatePicker = import_react62.default.forwardRef(
  function RHFDatePicker2({ name, label, helperText, slotProps, ...other }, ref) {
    const { control } = (0, import_react_hook_form13.useFormContext)();
    return /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
      import_react_hook_form13.Controller,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const value = field.value ? (0, import_dayjs.default)(field.value) : null;
          return /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
            import_DatePicker.DatePicker,
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
var import_react63 = __toESM(require("react"), 1);
var import_dayjs2 = __toESM(require("dayjs"), 1);
var import_react_hook_form14 = require("react-hook-form");
var import_TimePicker = require("@mui/x-date-pickers/TimePicker");
var import_jsx_runtime83 = require("react/jsx-runtime");
var RHFTimePicker = import_react63.default.forwardRef(
  function RHFTimePicker2({ name, label, helperText, slotProps, ...other }, ref) {
    const { control } = (0, import_react_hook_form14.useFormContext)();
    return /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
      import_react_hook_form14.Controller,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const value = field.value ? (0, import_dayjs2.default)(field.value) : null;
          return /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
            import_TimePicker.TimePicker,
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
var import_react64 = __toESM(require("react"), 1);
var import_dayjs3 = __toESM(require("dayjs"), 1);
var import_react_hook_form15 = require("react-hook-form");
var import_DateTimePicker = require("@mui/x-date-pickers/DateTimePicker");
var import_jsx_runtime84 = require("react/jsx-runtime");
var RHFDateTimePicker = import_react64.default.forwardRef(
  function RHFDateTimePicker2({ name, label, helperText, slotProps, ...other }, ref) {
    const { control } = (0, import_react_hook_form15.useFormContext)();
    return /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
      import_react_hook_form15.Controller,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const value = field.value ? (0, import_dayjs3.default)(field.value) : null;
          return /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
            import_DateTimePicker.DateTimePicker,
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
var import_react65 = __toESM(require("react"), 1);
var import_react_hook_form16 = require("react-hook-form");
var import_Autocomplete = __toESM(require("@mui/material/Autocomplete"), 1);
var import_TextField3 = __toESM(require("@mui/material/TextField"), 1);
var import_jsx_runtime85 = require("react/jsx-runtime");
var RHFAutocomplete = import_react65.default.forwardRef(
  function RHFAutocomplete2({ name, label, helperText, options, textFieldProps, ...other }, ref) {
    const { control } = (0, import_react_hook_form16.useFormContext)();
    return /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(
      import_react_hook_form16.Controller,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const selectedOption = options.find((option) => option.value === field.value) ?? null;
          const handleChange = (_event, newValue) => {
            field.onChange(newValue ? newValue.value : null);
          };
          return /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(
            import_Autocomplete.default,
            {
              ...other,
              ref,
              options,
              value: selectedOption,
              onChange: handleChange,
              onBlur: field.onBlur,
              getOptionLabel: (option) => option.label,
              isOptionEqualToValue: (option, value) => option.value === value.value,
              renderInput: (params) => /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(
                import_TextField3.default,
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
var import_react66 = __toESM(require("react"), 1);
var import_react_hook_form17 = require("react-hook-form");
var import_Autocomplete2 = __toESM(require("@mui/material/Autocomplete"), 1);
var import_TextField4 = __toESM(require("@mui/material/TextField"), 1);

// src/utils/countries/countries.ts
var import_react_phone_number_input2 = require("react-phone-number-input");
var countryDisplayNames = new Intl.DisplayNames(["en"], { type: "region" });
var COUNTRIES = (0, import_react_phone_number_input2.getCountries)().map((code) => ({
  code,
  label: countryDisplayNames.of(code) ?? code,
  phone: `+${(0, import_react_phone_number_input2.getCountryCallingCode)(code)}`
})).filter((country) => country.label !== country.code).sort((a, b) => a.label.localeCompare(b.label));

// src/components/material/input/rhf-country-select/rhf-country-select.tsx
var import_jsx_runtime86 = require("react/jsx-runtime");
var RHFCountrySelect = import_react66.default.forwardRef(
  function RHFCountrySelect2({ name, label, helperText, textFieldProps, ...other }, ref) {
    const { control } = (0, import_react_hook_form17.useFormContext)();
    return /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
      import_react_hook_form17.Controller,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => {
          const selectedCountry = COUNTRIES.find((country) => country.code === field.value) ?? null;
          const handleChange = (_event, newValue) => {
            field.onChange(newValue ? newValue.code : null);
          };
          return /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
            import_Autocomplete2.default,
            {
              ...other,
              ref,
              options: COUNTRIES,
              value: selectedCountry,
              onChange: handleChange,
              onBlur: field.onBlur,
              getOptionLabel: (country) => country.label,
              isOptionEqualToValue: (country, value) => country.code === value.code,
              renderInput: (params) => /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
                import_TextField4.default,
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
var import_react67 = __toESM(require("react"), 1);
var import_jsx_runtime87 = require("react/jsx-runtime");
var RHFNumberInput = import_react67.default.forwardRef(
  function RHFNumberInput2(props, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(RHFTextField, { ...props, ref, type: "number" });
  }
);
RHFNumberInput.displayName = "RHFNumberInput";

// src/components/material/input/rhf-slider/rhf-slider.tsx
var import_react68 = __toESM(require("react"), 1);
var import_react_hook_form18 = require("react-hook-form");
var import_FormControl7 = __toESM(require("@mui/material/FormControl"), 1);
var import_FormHelperText10 = __toESM(require("@mui/material/FormHelperText"), 1);
var import_FormLabel3 = __toESM(require("@mui/material/FormLabel"), 1);
var import_Slider2 = __toESM(require("@mui/material/Slider"), 1);
var import_jsx_runtime88 = require("react/jsx-runtime");
var RHFSlider = import_react68.default.forwardRef(function RHFSlider2({ name, label, helperText, min = 0, max = 100, onChangeCommitted, ...other }, ref) {
  const { control } = (0, import_react_hook_form18.useFormContext)();
  return /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
    import_react_hook_form18.Controller,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(import_FormControl7.default, { fullWidth: true, error: !!error2, ref, children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_FormLabel3.default, { htmlFor: `${name}-slider`, children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
          import_Slider2.default,
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
        (!!error2 || helperText) && /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_FormHelperText10.default, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFSlider.displayName = "RHFSlider";

// src/components/material/input/rhf-code/rhf-code.tsx
var import_react69 = __toESM(require("react"), 1);
var import_react_hook_form19 = require("react-hook-form");
var import_mui_one_time_password_input = require("mui-one-time-password-input");
var import_FormControl8 = __toESM(require("@mui/material/FormControl"), 1);
var import_FormHelperText11 = __toESM(require("@mui/material/FormHelperText"), 1);
var import_FormLabel4 = __toESM(require("@mui/material/FormLabel"), 1);
var import_jsx_runtime89 = require("react/jsx-runtime");
var RHFCode = import_react69.default.forwardRef(function RHFCode2({ name, label, helperText, length = 6, TextFieldsProps, ...other }, ref) {
  const { control } = (0, import_react_hook_form19.useFormContext)();
  return /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
    import_react_hook_form19.Controller,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)(import_FormControl8.default, { error: !!error2, ref, children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(import_FormLabel4.default, { children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
          import_mui_one_time_password_input.MuiOtpInput,
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
        (!!error2 || helperText) && /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(import_FormHelperText11.default, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFCode.displayName = "RHFCode";

// src/components/material/input/rhf-radio-group/rhf-radio-group.tsx
var import_react70 = __toESM(require("react"), 1);
var import_react_hook_form20 = require("react-hook-form");
var import_FormControl9 = __toESM(require("@mui/material/FormControl"), 1);
var import_FormControlLabel5 = __toESM(require("@mui/material/FormControlLabel"), 1);
var import_FormHelperText12 = __toESM(require("@mui/material/FormHelperText"), 1);
var import_FormLabel5 = __toESM(require("@mui/material/FormLabel"), 1);
var import_Radio = __toESM(require("@mui/material/Radio"), 1);
var import_RadioGroup = __toESM(require("@mui/material/RadioGroup"), 1);
var import_jsx_runtime90 = require("react/jsx-runtime");
var RHFRadioGroup = import_react70.default.forwardRef(
  function RHFRadioGroup2({ name, label, helperText, options, disabled, ...other }, ref) {
    const { control } = (0, import_react_hook_form20.useFormContext)();
    return /* @__PURE__ */ (0, import_jsx_runtime90.jsx)(
      import_react_hook_form20.Controller,
      {
        name,
        control,
        render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ (0, import_jsx_runtime90.jsxs)(import_FormControl9.default, { error: !!error2, disabled, ref, children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime90.jsx)(import_FormLabel5.default, { id: `${name}-label`, children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime90.jsx)(
            import_RadioGroup.default,
            {
              ...field,
              value: field.value ?? "",
              "aria-labelledby": `${name}-label`,
              ...other,
              children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime90.jsx)(
                import_FormControlLabel5.default,
                {
                  value: option.value,
                  label: option.label,
                  disabled: option.disabled,
                  control: /* @__PURE__ */ (0, import_jsx_runtime90.jsx)(import_Radio.default, {})
                },
                option.value
              ))
            }
          ),
          (!!error2 || helperText) && /* @__PURE__ */ (0, import_jsx_runtime90.jsx)(import_FormHelperText12.default, { children: error2 ? error2.message : helperText })
        ] })
      }
    );
  }
);
RHFRadioGroup.displayName = "RHFRadioGroup";

// src/components/material/input/rhf-rating/rhf-rating.tsx
var import_react71 = __toESM(require("react"), 1);
var import_react_hook_form21 = require("react-hook-form");
var import_FormControl10 = __toESM(require("@mui/material/FormControl"), 1);
var import_FormHelperText13 = __toESM(require("@mui/material/FormHelperText"), 1);
var import_FormLabel6 = __toESM(require("@mui/material/FormLabel"), 1);
var import_Rating = __toESM(require("@mui/material/Rating"), 1);
var import_jsx_runtime91 = require("react/jsx-runtime");
var RHFRating = import_react71.default.forwardRef(function RHFRating2({ name, label, helperText, ...other }, ref) {
  const { control } = (0, import_react_hook_form21.useFormContext)();
  return /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(
    import_react_hook_form21.Controller,
    {
      name,
      control,
      render: ({ field, fieldState: { error: error2 } }) => /* @__PURE__ */ (0, import_jsx_runtime91.jsxs)(import_FormControl10.default, { error: !!error2, ref, children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(import_FormLabel6.default, { component: "legend", children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(
          import_Rating.default,
          {
            ...other,
            name: field.name,
            value: field.value ?? null,
            onBlur: field.onBlur,
            onChange: (_event, newValue) => field.onChange(newValue),
            ref: field.ref
          }
        ),
        (!!error2 || helperText) && /* @__PURE__ */ (0, import_jsx_runtime91.jsx)(import_FormHelperText13.default, { children: error2 ? error2.message : helperText })
      ] })
    }
  );
});
RHFRating.displayName = "RHFRating";

// src/components/material/form/dynamic-field/dynamic-field.tsx
var import_react_hook_form22 = require("react-hook-form");

// src/components/material/form/dynamic-field/read-only-value/read-only-value.tsx
var import_Box42 = __toESM(require("@mui/material/Box"), 1);
var import_Typography21 = __toESM(require("@mui/material/Typography"), 1);
var import_jsx_runtime92 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime92.jsxs)(import_Box42.default, { children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(import_Typography21.default, { variant: "caption", color: "text.secondary", component: "div", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(import_Typography21.default, { variant: "body1", children: displayValue })
  ] });
}

// src/components/material/form/dynamic-field/dynamic-field.tsx
var import_jsx_runtime93 = require("react/jsx-runtime");
function DynamicField({ field }) {
  const { control } = (0, import_react_hook_form22.useFormContext)();
  const value = (0, import_react_hook_form22.useWatch)({ control, name: field.name });
  if (field.disabled) {
    return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(ReadOnlyFieldValue, { label: field.label, value });
  }
  switch (field.type) {
    case "text":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(RHFTextField, { name: field.name, label: field.label, helperText: field.helperText });
    case "number":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(RHFNumberInput, { name: field.name, label: field.label, helperText: field.helperText });
    case "select":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
        RHFSelect,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "multiselect":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
        RHFMultiSelect,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "autocomplete":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
        RHFAutocomplete,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "country":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(RHFCountrySelect, { name: field.name, label: field.label, helperText: field.helperText });
    case "checkbox":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(RHFCheckbox, { name: field.name, label: field.label, helperText: field.helperText });
    case "multiCheckbox":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
        RHFMultiCheckbox,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "switch":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(RHFSwitch, { name: field.name, label: field.label, helperText: field.helperText });
    case "multiSwitch":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
        RHFMultiSwitch,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "upload":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
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
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
        RHFUploadBox,
        {
          name: field.name,
          helperText: field.helperText,
          accept: field.accept,
          maxSize: field.maxSize
        }
      );
    case "uploadAvatar":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(RHFUploadAvatar, { name: field.name, helperText: field.helperText, maxSize: field.maxSize });
    case "phone":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
        RHFPhoneInput,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          defaultCountry: field.defaultCountry
        }
      );
    case "date":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(RHFDatePicker, { name: field.name, label: field.label, helperText: field.helperText });
    case "time":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(RHFTimePicker, { name: field.name, label: field.label, helperText: field.helperText });
    case "dateTime":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(RHFDateTimePicker, { name: field.name, label: field.label, helperText: field.helperText });
    case "slider":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
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
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(RHFCode, { name: field.name, label: field.label, helperText: field.helperText });
    case "radio":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
        RHFRadioGroup,
        {
          name: field.name,
          label: field.label,
          helperText: field.helperText,
          options: field.options ?? []
        }
      );
    case "rating":
      return /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(RHFRating, { name: field.name, label: field.label, helperText: field.helperText });
    default: {
      const exhaustiveCheck = field.type;
      throw new Error(`DynamicField: unhandled field type "${exhaustiveCheck}"`);
    }
  }
}
DynamicField.displayName = "DynamicField";

// src/components/material/form/dynamic-form/dynamic-form.tsx
var import_react72 = require("react");
var import_react_hook_form23 = require("react-hook-form");
var import_Accordion3 = __toESM(require("@mui/material/Accordion"), 1);
var import_AccordionDetails3 = __toESM(require("@mui/material/AccordionDetails"), 1);
var import_AccordionSummary3 = __toESM(require("@mui/material/AccordionSummary"), 1);
var import_Box43 = __toESM(require("@mui/material/Box"), 1);
var import_Button4 = __toESM(require("@mui/material/Button"), 1);
var import_Chip3 = __toESM(require("@mui/material/Chip"), 1);
var import_Grid7 = __toESM(require("@mui/material/Grid"), 1);
var import_Typography22 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime94 = require("react/jsx-runtime");
function FieldGrid({ fields }) {
  return /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(import_Grid7.default, { container: true, spacing: 2, children: fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(import_Grid7.default, { size: { xs: 12, sm: 6 }, children: /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(DynamicField, { field }) }, field.name)) });
}
function DynamicForm({
  fields,
  onSubmit,
  showSubmitButton = true,
  submitLabel = "Submit"
}) {
  const defaultValues = (0, import_react72.useMemo)(() => getDefaultValuesFromFields(fields), [fields]);
  const methods = (0, import_react_hook_form23.useForm)({ defaultValues, mode: "onChange" });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid }
  } = methods;
  (0, import_react72.useEffect)(() => {
    reset(defaultValues);
  }, [fields]);
  const grouped = (0, import_react72.useMemo)(() => groupFields(fields), [fields]);
  const isGrouped = (0, import_react72.useMemo)(() => hasAnyGroup(fields), [fields]);
  return /* @__PURE__ */ (0, import_jsx_runtime94.jsxs)(Form, { methods, onSubmit: handleSubmit(onSubmit), children: [
    isGrouped ? Object.entries(grouped).map(([group, groupFields2], index) => /* @__PURE__ */ (0, import_jsx_runtime94.jsxs)(import_Accordion3.default, { defaultExpanded: index === 0, children: [
      /* @__PURE__ */ (0, import_jsx_runtime94.jsxs)(
        import_AccordionSummary3.default,
        {
          expandIcon: /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(GiselleIcon, { icon: "solar:alt-arrow-down-bold", width: 16 }),
          "aria-controls": `${group}-content`,
          id: `${group}-header`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(import_Typography22.default, { sx: dynamicFormGroupLabelSx, children: group }),
            /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(import_Chip3.default, { label: groupFields2.length, size: "small" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(import_AccordionDetails3.default, { children: /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(FieldGrid, { fields: groupFields2 }) })
    ] }, group)) : /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(FieldGrid, { fields }),
    showSubmitButton && /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(import_Box43.default, { sx: dynamicFormSubmitWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime94.jsx)(import_Button4.default, { type: "submit", variant: "contained", fullWidth: true, disabled: !isDirty || !isValid, children: submitLabel }) })
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
var import_react73 = require("react");
function useTable(props) {
  const [dense, setDense] = (0, import_react73.useState)(!!props?.defaultDense);
  const [page, setPage] = (0, import_react73.useState)(props?.defaultCurrentPage ?? 0);
  const [orderBy, setOrderBy] = (0, import_react73.useState)(props?.defaultOrderBy ?? "name");
  const [rowsPerPage, setRowsPerPage] = (0, import_react73.useState)(props?.defaultRowsPerPage ?? 5);
  const [order, setOrder] = (0, import_react73.useState)(props?.defaultOrder ?? "asc");
  const [selected, setSelected] = (0, import_react73.useState)(props?.defaultSelected ?? []);
  const onSort = (0, import_react73.useCallback)(
    (id) => {
      const isAsc = orderBy === id && order === "asc";
      if (id !== "") {
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );
  const onSelectRow = (0, import_react73.useCallback)(
    (inputValue) => {
      const newSelected = selected.includes(inputValue) ? selected.filter((value) => value !== inputValue) : [...selected, inputValue];
      setSelected(newSelected);
    },
    [selected]
  );
  const onChangeRowsPerPage = (0, import_react73.useCallback)((event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);
  const onChangeDense = (0, import_react73.useCallback)((event) => {
    setDense(event.target.checked);
  }, []);
  const onSelectAllRows = (0, import_react73.useCallback)((checked, inputValue) => {
    if (checked) {
      setSelected(inputValue);
      return;
    }
    setSelected([]);
  }, []);
  const onChangePage = (0, import_react73.useCallback)((_event, newPage) => {
    setPage(newPage);
  }, []);
  const onResetPage = (0, import_react73.useCallback)(() => {
    setPage(0);
  }, []);
  const onUpdatePageDeleteRow = (0, import_react73.useCallback)(
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
  const onUpdatePageDeleteRows = (0, import_react73.useCallback)(
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
var import_Skeleton = __toESM(require("@mui/material/Skeleton"), 1);
var import_TableRow = __toESM(require("@mui/material/TableRow"), 1);
var import_TableCell = __toESM(require("@mui/material/TableCell"), 1);
var import_jsx_runtime95 = require("react/jsx-runtime");
function TableSkeleton({ rowCount = 0, cellCount = 0, ...other }) {
  return Array.from({ length: rowCount }, (_, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(import_TableRow.default, { ...other, children: Array.from({ length: cellCount }, (__, cellIndex) => /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(import_TableCell.default, { children: /* @__PURE__ */ (0, import_jsx_runtime95.jsx)(import_Skeleton.default, { variant: "text" }) }, cellIndex)) }, rowIndex));
}
TableSkeleton.displayName = "TableSkeleton";

// src/components/material/data-display/table/empty-rows/table-empty-rows.tsx
var import_react74 = __toESM(require("react"), 1);
var import_TableRow2 = __toESM(require("@mui/material/TableRow"), 1);
var import_TableCell2 = __toESM(require("@mui/material/TableCell"), 1);

// src/components/material/data-display/table/empty-rows/table-empty-rows.styles.ts
var tableEmptyRowsRootSx = (height, emptyRows2) => ({
  ...height && { height: height * emptyRows2 }
});

// src/components/material/data-display/table/empty-rows/table-empty-rows.tsx
var import_jsx_runtime96 = require("react/jsx-runtime");
var TableEmptyRows = import_react74.default.forwardRef(
  function TableEmptyRows2({ emptyRows: emptyRows2, height, colSpan = 9, sx, ...other }, ref) {
    if (!emptyRows2) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(
      import_TableRow2.default,
      {
        ref,
        sx: [tableEmptyRowsRootSx(height, emptyRows2), ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(import_TableCell2.default, { colSpan })
      }
    );
  }
);
TableEmptyRows.displayName = "TableEmptyRows";

// src/components/material/data-display/table/head-custom/table-head-custom.tsx
var import_react75 = __toESM(require("react"), 1);
var import_Box44 = __toESM(require("@mui/material/Box"), 1);
var import_TableRow3 = __toESM(require("@mui/material/TableRow"), 1);
var import_Checkbox5 = __toESM(require("@mui/material/Checkbox"), 1);
var import_TableHead = __toESM(require("@mui/material/TableHead"), 1);
var import_TableCell3 = __toESM(require("@mui/material/TableCell"), 1);
var import_TableSortLabel = __toESM(require("@mui/material/TableSortLabel"), 1);

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
var import_jsx_runtime97 = require("react/jsx-runtime");
var TableHeadCustom = import_react75.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(import_TableHead.default, { ref, sx, ...other, children: /* @__PURE__ */ (0, import_jsx_runtime97.jsxs)(import_TableRow3.default, { children: [
      onSelectAllRows && /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(import_TableCell3.default, { padding: "checkbox", children: /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
        import_Checkbox5.default,
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
      headCells.map((headCell) => /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
        import_TableCell3.default,
        {
          align: headCell.align || "left",
          sortDirection: isSortedColumn(orderBy, headCell.id) ? order : false,
          sx: [
            tableHeadCustomCellSx(headCell.width),
            ...Array.isArray(headCell.sx) ? headCell.sx : [headCell.sx]
          ],
          children: onSort ? /* @__PURE__ */ (0, import_jsx_runtime97.jsxs)(
            import_TableSortLabel.default,
            {
              hideSortIcon: true,
              active: isSortedColumn(orderBy, headCell.id),
              direction: isSortedColumn(orderBy, headCell.id) ? order : "asc",
              onClick: () => onSort(headCell.id),
              children: [
                headCell.label,
                isSortedColumn(orderBy, headCell.id) ? /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(import_Box44.default, { component: "span", sx: visuallyHiddenSx, children: order === "desc" ? "sorted descending" : "sorted ascending" }) : null
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
var import_react76 = __toESM(require("react"), 1);
var import_Box45 = __toESM(require("@mui/material/Box"), 1);
var import_Switch4 = __toESM(require("@mui/material/Switch"), 1);
var import_TablePagination = __toESM(require("@mui/material/TablePagination"), 1);
var import_FormControlLabel6 = __toESM(require("@mui/material/FormControlLabel"), 1);

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
var import_jsx_runtime98 = require("react/jsx-runtime");
var TablePaginationCustom = import_react76.default.forwardRef(
  function TablePaginationCustom2({ sx, dense, onChangeDense, rowsPerPageOptions = [5, 10, 25], ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime98.jsxs)(import_Box45.default, { ref, sx: [tablePaginationCustomRootSx, ...Array.isArray(sx) ? sx : [sx]], children: [
      /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(
        import_TablePagination.default,
        {
          rowsPerPageOptions,
          component: "div",
          ...other,
          sx: tablePaginationCustomInnerSx
        }
      ),
      onChangeDense && /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(
        import_FormControlLabel6.default,
        {
          label: "Dense",
          control: /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(
            import_Switch4.default,
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
var import_react77 = require("react");
var import_Box46 = __toESM(require("@mui/material/Box"), 1);

// src/components/material/feedback/preview-line/preview-line.styles.ts
var import_styles10 = require("@mui/material/styles");

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
  bgcolor: (0, import_styles10.alpha)(theme.palette.text.primary, opacity2)
});

// src/components/material/feedback/preview-line/preview-line.tsx
var import_jsx_runtime99 = require("react/jsx-runtime");
var PreviewLine = (0, import_react77.forwardRef)(function PreviewLine2({
  width,
  height = PREVIEW_LINE_DEFAULT_HEIGHT,
  opacity: opacity2 = PREVIEW_LINE_DEFAULT_OPACITY,
  rounded = true,
  sx,
  ...other
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
    import_Box46.default,
    {
      ref,
      sx: [previewLineSx(width, height, opacity2, rounded), ...Array.isArray(sx) ? sx : [sx]],
      ...other
    }
  );
});
PreviewLine.displayName = "PreviewLine";

// src/components/material/feedback/preview-card/preview-card.tsx
var import_react78 = require("react");
var import_Stack11 = __toESM(require("@mui/material/Stack"), 1);

// src/components/material/feedback/preview-card/preview-card.utils.ts
var import_styles11 = require("@mui/material/styles");
function getPreviewBorderColor(theme, visualConfig) {
  return theme.palette.mode === "dark" ? (0, import_styles11.alpha)(theme.palette.common.white, visualConfig.darkBorderOpacity) : (0, import_styles11.alpha)(theme.palette.text.primary, visualConfig.lightBorderOpacity);
}
function getPreviewCardBackground(theme, visualConfig) {
  return theme.palette.mode === "dark" ? (0, import_styles11.alpha)(theme.palette.common.white, visualConfig.darkCardBgOpacity) : (0, import_styles11.alpha)(theme.palette.background.paper, visualConfig.lightCardBgOpacity);
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
var import_jsx_runtime100 = require("react/jsx-runtime");
function toSxArray2(sx) {
  if (Array.isArray(sx)) return sx;
  return sx ? [sx] : [];
}
var PreviewCard = (0, import_react78.forwardRef)(function PreviewCard2({ metrics, padding, minHeight, titleWidth, lineCount, lineStep, visualConfig, sx, ...other }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime100.jsxs)(
    import_Stack11.default,
    {
      ref,
      spacing: metrics.gap,
      sx: [previewCardSx(padding, minHeight, visualConfig), ...toSxArray2(sx)],
      ...other,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(PreviewLine, { width: titleWidth, height: 12 }),
        Array.from({ length: lineCount }).map((_, lineIndex) => /* @__PURE__ */ (0, import_jsx_runtime100.jsx)(
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
var import_Box48 = __toESM(require("@mui/material/Box"), 1);
var import_Stack13 = __toESM(require("@mui/material/Stack"), 1);

// src/components/material/feedback/horizontal-preview/preview-nav-surface/preview-nav-surface.tsx
var import_Box47 = __toESM(require("@mui/material/Box"), 1);
var import_Stack12 = __toESM(require("@mui/material/Stack"), 1);

// src/components/material/feedback/horizontal-preview/preview-nav-surface/preview-nav-surface.styles.ts
var import_styles13 = require("@mui/material/styles");

// src/components/material/feedback/horizontal-preview/preview-nav-surface/preview-nav-surface.utils.ts
var import_styles12 = require("@mui/material/styles");
function getPreviewNavBackground(theme, navColor, visualConfig) {
  if (navColor === "integrate") {
    return theme.palette.mode === "dark" ? (0, import_styles12.alpha)(theme.palette.primary.main, visualConfig.darkIntegrateNavBgOpacity) : (0, import_styles12.alpha)(theme.palette.primary.main, visualConfig.lightIntegrateNavBgOpacity);
  }
  return theme.palette.mode === "dark" ? (0, import_styles12.alpha)(theme.palette.common.white, visualConfig.darkNavBgOpacity) : (0, import_styles12.alpha)(theme.palette.background.paper, visualConfig.lightNavBgOpacity);
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
    ...highlighted ? { boxShadow: `0 0 0 2px ${(0, import_styles13.alpha)(theme.palette.primary.main, 0.24)}` } : {}
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
var import_jsx_runtime101 = require("react/jsx-runtime");
var NAV_LINE_COUNT = 4;
function PreviewNavSurface({
  compactLayout,
  navColor,
  metrics,
  recentlyChanged,
  visualConfig
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime101.jsxs)(import_Box47.default, { sx: previewNavSurfaceSx(navColor, metrics, recentlyChanged, visualConfig), children: [
    /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(import_Stack12.default, { direction: "row", spacing: 1, sx: previewNavSurfaceLinesRowSx, children: Array.from({ length: NAV_LINE_COUNT }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(import_Box47.default, { sx: previewNavSurfaceLineWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(PreviewLine, { width: "100%", opacity: 0.14 }) }, index)) }),
    /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(import_Box47.default, { sx: previewNavSurfaceTrailingSx(compactLayout), children: /* @__PURE__ */ (0, import_jsx_runtime101.jsx)(PreviewLine, { width: "100%", height: 12 }) })
  ] });
}

// src/components/material/feedback/horizontal-preview/horizontal-preview.styles.ts
var import_styles14 = require("@mui/material/styles");

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
      boxShadow: `0 0 0 2px ${(0, import_styles14.alpha)(theme.palette.primary.main, 0.18)}`
    } : {}
  });
};

// src/components/material/feedback/horizontal-preview/horizontal-preview.tsx
var import_jsx_runtime102 = require("react/jsx-runtime");
var CARD_LINE_STEP = 9;
function HorizontalPreview({
  compactLayout,
  navColor,
  metrics,
  recentlyChanged,
  visualConfig
}) {
  const cardCount = getHorizontalPreviewCardCount(compactLayout);
  return /* @__PURE__ */ (0, import_jsx_runtime102.jsxs)(import_Stack13.default, { spacing: metrics.gap, children: [
    /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
      PreviewNavSurface,
      {
        compactLayout,
        navColor,
        metrics,
        recentlyChanged,
        visualConfig
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(import_Box48.default, { sx: horizontalPreviewGridSx(metrics.gap, compactLayout, recentlyChanged), children: Array.from({ length: cardCount }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime102.jsx)(
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
var import_Box49 = __toESM(require("@mui/material/Box"), 1);
var import_Stack14 = __toESM(require("@mui/material/Stack"), 1);

// src/components/material/feedback/side-nav-preview/side-nav-preview.styles.ts
var import_styles16 = require("@mui/material/styles");

// src/components/material/feedback/side-nav-preview/side-nav-preview.utils.ts
var import_styles15 = require("@mui/material/styles");
function getPreviewNavBackground2(theme, navColor, visualConfig) {
  if (navColor === "integrate") {
    return theme.palette.mode === "dark" ? (0, import_styles15.alpha)(theme.palette.primary.main, visualConfig.darkIntegrateNavBgOpacity) : (0, import_styles15.alpha)(theme.palette.primary.main, visualConfig.lightIntegrateNavBgOpacity);
  }
  return theme.palette.mode === "dark" ? (0, import_styles15.alpha)(theme.palette.common.white, visualConfig.darkNavBgOpacity) : (0, import_styles15.alpha)(theme.palette.background.paper, visualConfig.lightNavBgOpacity);
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
    ...highlighted ? { boxShadow: `0 0 0 2px ${(0, import_styles16.alpha)(theme.palette.primary.main, 0.24)}` } : {}
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
      boxShadow: `0 0 0 2px ${(0, import_styles16.alpha)(theme.palette.primary.main, 0.18)}`
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
var import_jsx_runtime103 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime103.jsxs)(import_Stack14.default, { direction: "row", spacing: metrics.gap, sx: sideNavPreviewRootSx, children: [
    /* @__PURE__ */ (0, import_jsx_runtime103.jsxs)(
      import_Stack14.default,
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
          /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
            PreviewLine,
            {
              width: getSideNavPreviewRailLineWidth(navLayout, 58),
              height: 12,
              opacity: 0.18
            }
          ),
          Array.from({ length: railItemCount }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
            PreviewLine,
            {
              width: getSideNavPreviewRailLineWidth(navLayout, 84 - index * 6),
              opacity: 0.13
            },
            index
          )),
          /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(import_Box49.default, { sx: sideNavPreviewRailSpacerSx }),
          /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(PreviewLine, { width: getSideNavPreviewRailLineWidth(navLayout, 72), opacity: 0.11 })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime103.jsxs)(import_Stack14.default, { spacing: metrics.gap, sx: sideNavPreviewMainColumnSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime103.jsxs)(import_Box49.default, { sx: sideNavPreviewHeaderSx(compactLayout, metrics, visualConfig), children: [
        /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(import_Box49.default, { sx: sideNavPreviewHeaderTitleSx(compactLayout), children: /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(PreviewLine, { width: "100%", height: 12 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(import_Stack14.default, { direction: "row", spacing: 1, sx: sideNavPreviewHeaderIconsSx, children: Array.from({ length: HEADER_ICON_COUNT }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
          PreviewLine,
          {
            width: getSideNavPreviewHeaderIconSize(compactLayout),
            height: getSideNavPreviewHeaderIconSize(compactLayout),
            opacity: 0.1
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(import_Box49.default, { sx: sideNavPreviewCardGridSx(metrics.gap, compactLayout, recentlyChanged), children: Array.from({ length: cardCount }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime103.jsx)(
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
var import_react79 = require("react");
var import_Box50 = __toESM(require("@mui/material/Box"), 1);
var import_Chip4 = __toESM(require("@mui/material/Chip"), 1);
var import_Stack15 = __toESM(require("@mui/material/Stack"), 1);
var import_Typography23 = __toESM(require("@mui/material/Typography"), 1);

// src/components/material/feedback/dashboard-mockup-preview/dashboard-mockup-preview.utils.ts
var import_styles17 = require("@mui/material/styles");

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
  return theme.palette.mode === "dark" ? (0, import_styles17.alpha)(theme.palette.common.white, visualConfig.darkCanvasBgOpacity) : (0, import_styles17.alpha)(theme.palette.text.primary, visualConfig.lightCanvasBgOpacity);
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
var import_jsx_runtime104 = require("react/jsx-runtime");
function DashboardMockupPreview({
  compactLayout,
  navColor,
  navLayout,
  content,
  visualConfig
}) {
  const metrics = resolvePreviewMetrics(compactLayout);
  const [recentlyChanged, setRecentlyChanged] = (0, import_react79.useState)(null);
  const previousSettings = (0, import_react79.useRef)({ compactLayout, navColor, navLayout });
  const resolvedContent = resolvePreviewContent(content);
  const resolvedVisualConfig = resolvePreviewVisualConfig(visualConfig);
  (0, import_react79.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)(import_Stack15.default, { spacing: 2, sx: dashboardMockupPreviewRootSx, children: [
    /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)(import_Stack15.default, { spacing: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(import_Typography23.default, { variant: "overline", sx: dashboardMockupPreviewSecondaryTextSx, children: resolvedContent.overline }),
      /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(import_Typography23.default, { variant: "subtitle1", children: resolvedContent.heading }),
      /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(import_Typography23.default, { variant: "body2", sx: dashboardMockupPreviewSecondaryTextSx, children: resolvedContent.description })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime104.jsxs)(import_Stack15.default, { direction: "row", spacing: 1, useFlexGap: true, sx: dashboardMockupPreviewChipRowSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
        import_Chip4.default,
        {
          label: compactLayout ? resolvedContent.compactDensityLabel : resolvedContent.comfortableDensityLabel,
          size: "small",
          color: recentlyChanged === "compactLayout" ? "primary" : "default",
          variant: recentlyChanged === "compactLayout" ? "filled" : "outlined"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
        import_Chip4.default,
        {
          label: `${resolvedContent.navLabelPrefix}: ${navLayout}`,
          size: "small",
          color: recentlyChanged === "navLayout" ? "primary" : "default",
          variant: recentlyChanged === "navLayout" ? "filled" : "outlined"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
        import_Chip4.default,
        {
          label: `${resolvedContent.colorLabelPrefix}: ${navColor}`,
          size: "small",
          color: recentlyChanged === "navColor" ? "primary" : "default",
          variant: recentlyChanged === "navColor" ? "filled" : "outlined"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(import_Typography23.default, { variant: "caption", sx: dashboardMockupPreviewSecondaryTextSx, children: recentChangeLabel }),
    /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(import_Box50.default, { sx: dashboardMockupPreviewCanvasSx(resolvedVisualConfig), children: navLayout === "horizontal" ? /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
      HorizontalPreview,
      {
        compactLayout,
        navColor,
        metrics,
        recentlyChanged,
        visualConfig: resolvedVisualConfig
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime104.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACCORDION_CHECK_ICON_SIZE,
  ACCORDION_DONE_MIN_TOUCH_TARGET,
  ACCORDION_ICON_BUTTON_MIN_SIZE,
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
});
//# sourceMappingURL=index.cjs.map
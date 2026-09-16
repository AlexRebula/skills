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
import { extendTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
var GISELLE_PRIMARY_MAIN = "#2E7D32";
var GISELLE_PRIMARY_DARK_MAIN = "#76C442";
var GISELLE_SECONDARY_MAIN = "#F5A623";
var GREY_500_CHANNEL = hexToChannel(grey[500]);
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
var giselleTheme = extendTheme(giselleThemeOptions);

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
export {
  BREAKPOINTS,
  BREAKPOINTS_GRID,
  GISELLE_PRIMARY_DARK_MAIN,
  GISELLE_PRIMARY_MAIN,
  GISELLE_SECONDARY_MAIN,
  assignMilestoneSidesByDone,
  channelAlpha,
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
  setCookieValue
};
//# sourceMappingURL=utils.js.map
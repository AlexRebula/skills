import * as _mui_material_styles from '@mui/material/styles';
import { CssVarsThemeOptions, CssVarsTheme, SxProps, Theme, Breakpoint, CSSObject } from '@mui/material/styles';
import * as React$1 from 'react';
import React__default, { ReactNode, ReactElement } from 'react';
import { IconProps } from '@iconify/react';
import { ChipProps } from '@mui/material/Chip';
import { BoxProps } from '@mui/material/Box';
import { AccordionProps as AccordionProps$1 } from '@mui/material/Accordion';
import { ButtonBaseProps } from '@mui/material/ButtonBase';
import { SliderProps } from '@mui/material/Slider';
import { IconButtonProps } from '@mui/material/IconButton';
import { TextFieldProps } from '@mui/material/TextField';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { PaperProps } from '@mui/material/Paper';
import { CardProps } from '@mui/material/Card';
import { GridProps } from '@mui/material/Grid';
import { TooltipProps } from '@mui/material/Tooltip';
import { ContainerProps } from '@mui/material/Container';
import { AppBarProps } from '@mui/material/AppBar';
import { LinkProps } from '@mui/material/Link';
import { FabProps } from '@mui/material/Fab';
import * as _mui_material_Select from '@mui/material/Select';
import { SelectProps } from '@mui/material/Select';
import { CheckboxProps } from '@mui/material/Checkbox';
import { SwitchProps } from '@mui/material/Switch';
import { Country as Country$1 } from 'react-phone-number-input';
export { Country as PhoneCountry } from 'react-phone-number-input';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { MuiOtpInputProps } from 'mui-one-time-password-input';
import { RadioGroupProps } from '@mui/material/RadioGroup';
import { RatingProps } from '@mui/material/Rating';
import { TableRowProps } from '@mui/material/TableRow';
import { TableHeadProps } from '@mui/material/TableHead';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { StackProps } from '@mui/material/Stack';
import { ApexOptions } from 'apexcharts';

/**
 * A single icon entry in the flat icon map.
 *
 * `body` — The raw SVG path content — everything that would go _inside_ the
 *   `<svg>` wrapper tag, not including the wrapper itself.
 *
 *   HOW TO GET THE BODY STRING FOR ANY ICON:
 *   1. Browse https://icon-sets.iconify.design/ and find your icon.
 *   2. Click the icon → "Download" → switch to "JSON" tab. You will see the
 *      raw `body` string. Alternatively:
 *   3. Install the icon set package: `npm install --save-dev @iconify-json/solar`
 *   4. Open `node_modules/@iconify-json/solar/icons.json`
 *   5. Find your icon by name (e.g. "rocket-bold-duotone") and copy the `body` value.
 *   6. Paste it as-is — do NOT wrap it in `<svg>...</svg>` tags.
 *
 *   COMMON MISTAKES WHEN COPYING SVG BODIES:
 *   ❌ Copying the full SVG file: `<svg viewBox="..." xmlns="..."><path .../></svg>`
 *      → The `<svg>` wrapper is added by @iconify/react. Including it yourself
 *        produces nested `<svg>` elements and breaks the icon.
 *   ❌ Keeping the `xmlns` attribute: `<path xmlns="http://www.w3.org/2000/svg" .../>`
 *      → The `xmlns` is already on the outer `<svg>`. Repeating it on inner
 *        elements is harmless in browsers but clutters the body string.
 *   ❌ Using `fill="black"` or `fill="#000000"` for monochrome icons
 *      → Use `fill="currentColor"` instead. This makes the icon inherit the CSS
 *        `color` property, so `sx={{ color: 'primary.main' }}` works.
 *   ✅ Correct body (Solar icon): `'<path fill="currentColor" d="M12 2c..." />'`
 *   ✅ Correct body (logo, multi-path): `'<path fill="#3178c6" d="..." /><path fill="#fff" d="..." />'`
 *
 * `width` — viewBox width. **Omit** for icons with a 24×24 viewBox (Solar,
 *   simple-icons, mdi, ph, lucide, etc.). **Required** for icons with a
 *   non-24 viewBox — the `logos:` collection commonly uses 256px or larger.
 *   To find the correct value: check the `width` field in the icon's source
 *   `icons.json`, or inspect the `viewBox` attribute of the raw SVG file.
 *
 * `height` — viewBox height. Same rule as `width`.
 */
interface GiselleIconData {
    body: string;
    width?: number;
    height?: number;
}
/**
 * A flat map of icon entries keyed by `"prefix:name"` strings.
 *
 * @example
 * const icons: GiselleIconMap = {
 *   'solar:rocket-bold-duotone': { body: '...' },
 *   'logos:react': { body: '...' },
 *   'logos:angular-icon': { width: 256, height: 271, body: '...' },
 * };
 */
type GiselleIconMap = Record<string, GiselleIconData>;
/**
 * Creates an idempotent icon registrar from a flat icon map.
 *
 * **Idempotent** means: safe to call multiple times, but only does work once.
 * The first call registers all icons with `@iconify/react`. Every subsequent
 * call is a no-op (it returns immediately without re-registering). This means
 * you can call `registerIcons()` at module level in multiple files without
 * worrying about duplicate registrations or performance penalties.
 *
 * Groups the flat `"prefix:name"` entries into per-prefix Iconify collections
 * and registers them with `@iconify/react`'s `addCollection` on the first call.
 *
 * Call the returned function at module level in your consuming/client app —
 * not inside a React component, not in a `useEffect` hook — so the store is
 * populated before any `GiselleIcon` attempts to render.
 *
 * @param icons - Flat map of `"prefix:name"` → icon data entries.
 * @returns An idempotent `registerIcons()` function.
 *
 * @example
 * // src/icon-sets.ts  (in your consuming/client app)
 * import { createIconRegistrar } from '@littlebranches/giselle-mui';
 *
 * export const registerIcons = createIconRegistrar({
 *   'solar:rocket-bold-duotone': { body: '...' },
 *   'logos:react': { body: '...' },
 *   'logos:typescript-icon': { width: 256, height: 256, body: '...' },
 * });
 */
declare function createIconRegistrar(icons: GiselleIconMap): () => void;

/**
 * Theme utility helpers for MUI v7 CSS Variables mode.
 *
 * These are commonly needed when building themes with `extendTheme()` and
 * `theme.vars.palette.*`. They are intentionally tiny, dependency-free, and
 * safe to use in any consumer project alongside `@mui/material` v7.
 */
/**
 * Produces an `rgba(channel / alpha)` string from a MUI v7 CSS-variable channel value.
 *
 * MUI v7 CSS Variables mode exposes palette colours as space-separated RGB
 * channels (e.g. `theme.vars.palette.primary.mainChannel → "99 102 241"`).
 * This helper converts that channel string + an alpha value to a valid CSS Color 4
 * expression using slash syntax.
 *
 * **Why slash syntax, not comma syntax:**
 * The channel value can be either a literal string (`"99 102 241"`) or a
 * CSS `var(--mui-palette-primary-mainChannel)` reference. Slash syntax
 * (`rgba(var(...) / 0.08)`) is valid CSS and works in all cases. The older
 * comma syntax (`rgba(var(...), 0.08)`) does not work with CSS var references
 * because a single var cannot substitute multiple comma-separated arguments.
 *
 * @param channel - Space-separated RGB string or CSS `var()` reference.
 *   Matches the format of `theme.vars.palette[color].mainChannel` in MUI v7.
 * @param alpha - Opacity value between `0` (fully transparent) and `1` (fully opaque).
 * @returns A valid CSS Color 4 `rgba(channel / alpha)` string.
 *
 * @example
 * ```tsx
 * sx={(theme) => ({
 *   backgroundColor: channelAlpha(theme.vars.palette.primary.mainChannel, 0.08),
 * })}
 * ```
 */
declare function channelAlpha(channel: string, alpha: number): string;
/**
 * Converts a hex colour string to a space-separated RGB channel string
 * compatible with MUI v7 CSS Variables palette channels.
 *
 * Use this when you need to define a custom colour in a theme that uses
 * `channelAlpha` for tinting. The output can be stored as a custom channel and
 * passed to `channelAlpha`.
 *
 * @param hex - A 6-digit hex colour string with or without the `#` prefix,
 *   e.g. `"#6366f1"` or `"6366f1"`.
 * @returns A space-separated RGB channel string, e.g. `"99 102 241"`.
 * @throws {Error} If the hex value cannot be parsed (invalid format).
 *
 * @example
 * ```ts
 * const channel = hexToChannel('#6366f1'); // "99 102 241"
 * channelAlpha(channel, 0.08);             // "rgba(99 102 241 / 0.08)"
 * ```
 */
declare function hexToChannel(hex: string): string;
/**
 * Converts a pixel value to a `rem` string using a 16px root font size baseline.
 *
 * Useful for defining typography scales in `extendTheme()` where rem units are
 * preferred for accessibility (user font-size overrides apply).
 *
 * @param px - The pixel value to convert (e.g. `14`).
 * @returns A `rem` string (e.g. `"0.875rem"`).
 *
 * @example
 * ```ts
 * pxToRem(14)  // "0.875rem"
 * pxToRem(16)  // "1rem"
 * pxToRem(24)  // "1.5rem"
 * ```
 */
declare function pxToRem(px: number): string;
/**
 * Converts a `rem` value to its pixel equivalent using a 16px root font size baseline.
 *
 * Useful when consuming a typography scale defined in `rem` and needing a numeric
 * pixel value for canvas calculations, fixed-size containers, or Storybook annotations.
 *
 * @param rem - The rem value to convert (e.g. `0.875`).
 * @returns The pixel value as a number (e.g. `14`).
 *
 * @example
 * ```ts
 * remToPx(0.875)  // 14
 * remToPx(1)      // 16
 * remToPx(1.5)    // 24
 * ```
 */
declare function remToPx(rem: number): number;

/**
 * Recursive deep equality check for plain values.
 *
 * Covers the full set of value types produced by `GiselleSettingsProvider` state:
 * - Primitives: `string`, `number`, `boolean`, `null`, `undefined`
 * - Plain arrays (element-by-element comparison)
 * - Plain objects (own enumerable key comparison, recursive)
 *
 * Out of scope (not needed for settings state): `Date`, `Map`, `Set`, `RegExp`,
 * `Symbol`, class instances. If passed, these are compared by reference only.
 */
declare function isDeepEqual(a: unknown, b: unknown): boolean;

type SetCookieOptions = {
    /** Max age in seconds. */
    maxAge?: number;
    /** Cookie path. @default '/' */
    path?: string;
    /** SameSite policy. @default 'Lax' */
    sameSite?: 'Strict' | 'Lax' | 'None';
};
/**
 * Reads a cookie value by name.
 *
 * SSR-safe: returns `null` when called outside a browser context
 * (`typeof document === 'undefined'`).
 */
declare function getCookieValue(name: string): string | null;
/**
 * Writes a cookie value.
 *
 * SSR-safe: no-op when called outside a browser context.
 */
declare function setCookieValue(name: string, value: string, options?: SetCookieOptions): void;

type UseLocalStorageReturn<T> = {
    state: T;
    setState: (partial: Partial<T>) => void;
    setField: <K extends keyof T>(key: K, value: T[K]) => void;
    resetState: (defaults: T) => void;
};
/**
 * SSR-safe React hook for persisting state in `localStorage`.
 *
 * - Reads from storage on mount; falls back to `initialValue` when nothing is stored.
 * - Writes to storage on every state change.
 * - Provides `setState` (partial merge), `setField` (single typed key), and `resetState`.
 * - Safe to call in a Next.js RSC tree — `window` access is guarded server-side.
 */
declare function useLocalStorage<T extends object>(key: string, initialValue: T): UseLocalStorageReturn<T>;

/**
 * Giselle brand primary colour — Deep grove green `#2E7D32`.
 *
 * Used as the light-mode primary. Achieves 4.76:1 contrast against white —
 * passes WCAG 2.1 AA for normal text.
 */
declare const GISELLE_PRIMARY_MAIN = "#2E7D32";
/**
 * Giselle brand primary colour in dark mode — Lime green `#76C442`.
 *
 * Lighter variant applied as `primary.main` in the dark colour scheme so
 * primary-tinted surfaces and text remain readable on dark backgrounds.
 */
declare const GISELLE_PRIMARY_DARK_MAIN = "#76C442";
/**
 * Giselle brand secondary colour — Mango gold `#F5A623`.
 *
 * The Carabao mango accent. Identical in both light and dark colour schemes.
 */
declare const GISELLE_SECONDARY_MAIN = "#F5A623";
/**
 * The Giselle brand theme options — the raw input to `extendTheme()`.
 *
 * Use this constant when you need to deep-merge Giselle palette defaults
 * with consumer overrides before resolving the final theme. Prefer
 * `giselleTheme` when you only need the already-resolved theme object.
 */
declare const giselleThemeOptions: CssVarsThemeOptions;
/**
 * The Giselle brand theme preset.
 *
 * A ready-to-use result of `extendTheme()` carrying the full Giselle palette
 * for both light and dark colour schemes.
 *
 * **Usage — with `ThemeProvider` directly:**
 * ```tsx
 * import { ThemeProvider } from '@mui/material/styles';
 * import { giselleTheme } from '@littlebranches/giselle-mui';
 *
 * <ThemeProvider theme={giselleTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * **Usage — via `GiselleThemeProvider` (zero-config):**
 * ```tsx
 * import { GiselleThemeProvider } from '@littlebranches/giselle-mui';
 *
 * <GiselleThemeProvider>
 *   <App />
 * </GiselleThemeProvider>
 * ```
 *
 * **Palette decisions:**
 * - `primary`   — Deep grove green / Lime (dark mode): the tree foundation
 * - `secondary` — Mango gold: the fruit accent, unchanged between modes
 * - `info`      — Accessible blue (standard MUI default family)
 * - `success`   — Leaf green `#388E3C` — distinct from primary to avoid ambiguity
 * - `warning`   — Amber orange `#ED6C02` — warm, complements the mango gold family
 * - `error`     — Standard red `#D32F2F`
 */
declare const giselleTheme: Omit<_mui_material_styles.Theme, "applyStyles"> & _mui_material_styles.CssVarsTheme;

interface GiselleThemeProviderProps {
    /** Child components that will receive the Giselle theme. */
    children: ReactNode;
    /**
     * Partial theme options deep-merged on top of the Giselle brand defaults.
     *
     * Use for targeted adjustments — swapping the primary colour, adjusting typography
     * scale — while keeping the rest of the Giselle palette intact.
     *
     * Ignored when `theme` is provided.
     *
     * **Example — override primary to blue:**
     * ```tsx
     * <GiselleThemeProvider
     *   themeOverrides={{ colorSchemes: { light: { palette: { primary: { main: '#1976d2' } } } } }}
     * >
     *   <App />
     * </GiselleThemeProvider>
     * ```
     */
    themeOverrides?: CssVarsThemeOptions;
    /**
     * A fully custom theme created with `extendTheme()`. When provided,
     * `themeOverrides` is ignored and this theme is used as-is.
     *
     * **Example:**
     * ```tsx
     * import { extendTheme } from '@mui/material/styles';
     *
     * const myTheme = extendTheme({ colorSchemes: { light: { palette: { primary: { main: '#e91e63' } } } } });
     *
     * <GiselleThemeProvider theme={myTheme}>
     *   <App />
     * </GiselleThemeProvider>
     * ```
     */
    theme?: CssVarsTheme;
    /**
     * Initial color scheme applied before the user or system preference is read.
     *
     * @default 'system'
     */
    defaultMode?: 'light' | 'dark' | 'system';
}

/**
 * Zero-config theme provider for `@littlebranches/giselle-mui`.
 *
 * Ships with the Giselle brand palette (Deep grove green + Mango gold) as
 * the default — wrap your application and every MUI component gets the
 * correct theme with no extra setup.
 *
 * ## Usage — zero config
 * ```tsx
 * import { GiselleThemeProvider } from '@littlebranches/giselle-mui';
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html lang="en" suppressHydrationWarning>
 *       <body>
 *         <GiselleThemeProvider>{children}</GiselleThemeProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * ## Usage — partial overrides
 * ```tsx
 * <GiselleThemeProvider
 *   themeOverrides={{ colorSchemes: { light: { palette: { primary: { main: '#1976d2' } } } } }}
 * >
 *   <App />
 * </GiselleThemeProvider>
 * ```
 *
 * ## Usage — fully custom theme
 * ```tsx
 * import { extendTheme } from '@mui/material/styles';
 *
 * const myTheme = extendTheme({ colorSchemes: { light: { palette: { primary: { main: '#e91e63' } } } } });
 *
 * <GiselleThemeProvider theme={myTheme}><App /></GiselleThemeProvider>
 * ```
 *
 * Also emits default values for the shared `--layout-header-mobile-height` /
 * `--layout-header-desktop-height` CSS custom properties at `:root`, so any
 * component that reads them (e.g. in Storybook, with no consuming app's own
 * layout wrapper present) resolves a real value. A consuming app's own
 * declaration of the same variable names — even on `body`, as
 * `alexrebula-portfolio-poc`'s layout shell already does — still wins; no
 * override prop is needed for this, it's ordinary CSS cascade behaviour.
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices not re-audited — SonarQube not verified · no Responsive story
 */
declare function GiselleThemeProvider({ children, themeOverrides, theme, defaultMode, }: GiselleThemeProviderProps): React$1.JSX.Element;

/**
 * Minimum contract for all settings state shapes managed by `GiselleSettingsProvider`.
 * Every consumer's settings type must include `version` for storage migration support.
 */
type BaseSettingsState = {
    version: string;
};
/**
 * Context value exposed by `GiselleSettingsProvider`.
 * Access via `useGiselleSettings<TState>()`.
 */
type GiselleSettingsContextValue<TState> = {
    /** Current persisted settings state. */
    state: TState;
    /**
     * Partially update the settings state.
     * The supplied object is shallow-merged with the current state.
     *
     * **Example:**
     * ```ts
     * setState({ mode: 'dark' }); // only overrides `mode`
     * ```
     */
    setState: (partial: Partial<TState>) => void;
    /**
     * Update a single typed field.
     * Key and value are correlated at the type level — no stringly-typed APIs.
     *
     * **Example:**
     * ```ts
     * setField('mode', 'dark');
     * setField('fontSize', 16);
     * ```
     */
    setField: <K extends keyof TState>(key: K, value: TState[K]) => void;
    /** `true` when the current state differs from `defaultSettings` (deep comparison). */
    canReset: boolean;
    /** Reset state to `defaultSettings` and clear persisted storage. */
    onReset: () => void;
    /** Whether the settings panel drawer is open. */
    openDrawer: boolean;
    /** Close the settings panel drawer. */
    onCloseDrawer: () => void;
    /** Toggle the settings panel drawer open/closed. */
    onToggleDrawer: () => void;
};
/**
 * Custom storage adapter for `GiselleSettingsProvider`.
 *
 * Implement this interface to use a custom storage backend (e.g. IndexedDB,
 * server-synced state, or a cookie library with custom serialisation options).
 *
 * **Example (IndexedDB via a simple wrapper):**
 * ```ts
 * const myAdapter: StorageAdapter<MySettings> = {
 *   get: () => indexedDBStore.get('settings'),
 *   set: (value) => indexedDBStore.set('settings', value),
 *   clear: () => indexedDBStore.delete('settings'),
 * };
 *
 * <GiselleSettingsProvider storage={myAdapter} defaultSettings={defaults}>
 *   <App />
 * </GiselleSettingsProvider>
 * ```
 */
type StorageAdapter<TState> = {
    /** Read the stored settings. Returns `null` when nothing is stored. */
    get: () => TState | null;
    /** Write the full settings object to storage. */
    set: (value: TState) => void;
    /** Remove the stored settings (called on `onReset`). */
    clear: () => void;
};
/**
 * Props for `GiselleSettingsProvider<TState>`.
 */
type GiselleSettingsProviderProps<TState extends BaseSettingsState> = {
    /** Child components that receive settings via context. */
    children?: ReactNode;
    /**
     * Default settings — used when nothing is persisted, and as the reset target.
     *
     * Must include a `version` field. Increment the version whenever the settings
     * schema changes to trigger an automatic reset on clients that have stale storage.
     *
     * **Example:**
     * ```ts
     * const defaultSettings = { version: '2', mode: 'light', fontSize: 14 };
     * ```
     */
    defaultSettings: TState;
    /**
     * Pre-resolved initial state from a server layer (e.g. Next.js RSC reading cookies).
     *
     * Pass this to avoid a hydration mismatch when the stored value differs from the
     * server-rendered default. When omitted, the provider reads from storage in a
     * mount-only `useEffect` (after the first render).
     */
    initialState?: TState;
    /**
     * Storage key used when `storage` is `'localStorage'` or `'cookie'`.
     *
     * @default 'giselle-settings'
     */
    storageKey?: string;
    /**
     * Storage backend.
     *
     * - `'localStorage'` — default; SSR-safe, reads/writes `window.localStorage`
     * - `'cookie'` — reads/writes `document.cookie`; pair with `initialState` from an
     *   RSC layer for SSR hydration without a flash
     * - `StorageAdapter<TState>` — fully custom adapter for any storage backend
     *
     * @default 'localStorage'
     */
    storage?: 'localStorage' | 'cookie' | StorageAdapter<TState>;
};

/**
 * Generic settings state provider for MUI applications.
 *
 * Persists UI settings (color mode, font size, direction, etc.) to `localStorage`
 * and exposes them via `useGiselleSettings<TState>()`. Includes built-in drawer
 * open/close state for a settings panel.
 *
 * ## Zero-config usage
 * ```tsx
 * type MySettings = { version: string; mode: 'light' | 'dark' };
 * const defaultSettings: MySettings = { version: '1', mode: 'light' };
 *
 * <GiselleSettingsProvider defaultSettings={defaultSettings}>
 *   <App />
 * </GiselleSettingsProvider>
 * ```
 *
 * ## Reading settings
 * ```ts
 * const { state, setField, canReset, onReset } = useGiselleSettings<MySettings>();
 * ```
 *
 * ## Storage backends
 * ```tsx
 * // Default — localStorage
 * <GiselleSettingsProvider defaultSettings={defaults}><App /></GiselleSettingsProvider>
 *
 * // Cookie-based (pair with initialState from RSC for SSR hydration)
 * <GiselleSettingsProvider storage="cookie" defaultSettings={defaults}><App /></GiselleSettingsProvider>
 *
 * // Custom adapter
 * <GiselleSettingsProvider storage={myAdapter} defaultSettings={defaults}><App /></GiselleSettingsProvider>
 * ```
 *
 * ## Schema migration
 * Increment `version` in `defaultSettings` whenever the settings shape changes.
 * The provider resets all stored state automatically when a version mismatch is detected.
 *
 * **Quality status (02 Sep 2026):** DoD 18/22 · Best practices not re-audited — SonarQube not verified · companion files incomplete · named size constant still inline · no Responsive story
 */
declare function GiselleSettingsProvider<TState extends BaseSettingsState>({ children, defaultSettings, initialState, storageKey, storage, }: GiselleSettingsProviderProps<TState>): React$1.JSX.Element;

/**
 * Props for `GiselleThemeAndSettingsProvider` — a convenience wrapper that
 * composes `GiselleThemeProvider` and `GiselleSettingsProvider` in one component
 * and optionally bridges settings state to the MUI color scheme.
 */
type GiselleThemeAndSettingsProviderProps<TState extends BaseSettingsState> = GiselleSettingsProviderProps<TState> & {
    /**
     * Partial theme options deep-merged on top of the Giselle brand defaults.
     * Ignored when `theme` is provided. Same as `GiselleThemeProviderProps.themeOverrides`.
     */
    themeOverrides?: CssVarsThemeOptions;
    /**
     * A fully custom theme created with `extendTheme()`. When provided, `themeOverrides`
     * is ignored. Same as `GiselleThemeProviderProps.theme`.
     */
    theme?: CssVarsTheme;
    /**
     * Initial color scheme applied before settings are read.
     * Same as `GiselleThemeProviderProps.defaultMode`.
     *
     * @default 'system'
     */
    defaultMode?: 'light' | 'dark' | 'system';
    /**
     * Map settings state to an MUI color scheme mode.
     *
     * When provided, the MUI color scheme is synced to the returned value
     * whenever settings change. Use this to drive `light`/`dark`/`system` mode
     * from your settings state.
     *
     * **Example:**
     * ```ts
     * getMode={(s) => s.mode}
     * ```
     */
    getMode?: (state: TState) => 'light' | 'dark' | 'system' | undefined;
};

/**
 * Convenience wrapper that composes `GiselleThemeProvider` and
 * `GiselleSettingsProvider` in a single component, with an optional bridge
 * that syncs settings state to the MUI color scheme.
 *
 * ## Zero-config usage
 * ```tsx
 * const defaultSettings = { version: '1', mode: 'light' as const };
 *
 * <GiselleThemeAndSettingsProvider defaultSettings={defaultSettings}>
 *   <App />
 * </GiselleThemeAndSettingsProvider>
 * ```
 *
 * ## With color scheme sync
 * ```tsx
 * <GiselleThemeAndSettingsProvider
 *   defaultSettings={defaultSettings}
 *   getMode={(s) => s.mode}
 * >
 *   <App />
 * </GiselleThemeAndSettingsProvider>
 * ```
 *
 * ## With cookie storage + SSR hydration
 *
 * Read the stored settings server-side (e.g. via Next.js `cookies()`), parse them,
 * and pass as `initialState` to avoid a flash of default settings on first render.
 * ```tsx
 * // In a Next.js RSC (app/layout.tsx) — read + parse the stored cookie
 * const raw = (await cookies()).get('giselle-settings')?.value ?? null;
 * const initialState = raw ? (JSON.parse(raw) as typeof defaultSettings) : undefined;
 *
 * <GiselleThemeAndSettingsProvider
 *   defaultSettings={defaultSettings}
 *   initialState={initialState}
 *   storage="cookie"
 *   getMode={(s) => s.mode}
 * >
 *   <App />
 * </GiselleThemeAndSettingsProvider>
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices not re-audited — SonarQube not verified · no Responsive story
 */
declare function GiselleThemeAndSettingsProvider<TState extends BaseSettingsState>({ children, defaultSettings, initialState, storageKey, storage, themeOverrides, theme, defaultMode, getMode, }: GiselleThemeAndSettingsProviderProps<TState>): React$1.JSX.Element;

/**
 * Access the Giselle settings context.
 *
 * Must be called within a `<GiselleSettingsProvider>` tree.
 * Pass the same `TState` type that was used on the provider for full type safety.
 *
 * **Example:**
 * ```ts
 * const { state, setField, canReset, onReset } = useGiselleSettings<MySettings>();
 * ```
 *
 * @throws {Error} When called outside a `GiselleSettingsProvider`.
 */
declare function useGiselleSettings<TState extends BaseSettingsState>(): GiselleSettingsContextValue<TState>;

/**
 * Props for {@link GiselleIcon}.
 *
 * Extends `Omit<React.HTMLAttributes<HTMLSpanElement>, 'style' | 'className' | 'children'>`
 * to support `id`, `aria-*`, `data-*`, and other standard HTML attributes forwarded
 * to the outer `Box component="span"` wrapper.
 *
 * Not extending `BoxProps` or `IconProps` directly — `@iconify/react` types `display` as
 * `string | number`, which conflicts with MUI Box's `ResponsiveStyleValue<Display>`.
 * `className` and `style` are intentionally kept as explicit props because they are
 * forwarded to the inner `Icon` SVG element, not the outer wrapper.
 */
interface GiselleIconProps extends Omit<React__default.HTMLAttributes<HTMLSpanElement>, 'style' | 'className' | 'children'> {
    /**
     * Iconify icon identifier in the format `"prefix:name"`,
     * e.g. `"solar:rocket-bold-duotone"` or `"logos:react"`.
     */
    icon: string;
    /**
     * MUI `sx` prop for theming, spacing, color, and responsive styles.
     * Applied to the outer `Box component="span"` wrapper.
     */
    sx?: SxProps<Theme>;
    /**
     * Icon width in pixels (or any valid CSS length string).
     * @default 20
     */
    width?: number | string;
    /**
     * Icon height in pixels (or any valid CSS length string).
     * Defaults to `width` when omitted, keeping icons square by default.
     */
    height?: number | string;
    /** HTML `class` attribute forwarded to the inner `Icon` SVG element. */
    className?: string;
    /** Inline style forwarded to the inner `Icon` SVG element. */
    style?: React__default.CSSProperties;
    /**
     * Flip the icon horizontally, vertically, or both.
     * @example `"horizontal"` | `"vertical"` | `"horizontal,vertical"`
     */
    flip?: IconProps['flip'];
    /**
     * Rotate the icon.
     * Accepts 0–3 (quarter-turn increments) or a CSS angle string like `"90deg"`.
     */
    rotate?: IconProps['rotate'];
}

/**
 * GiselleIcon — zero-dependency icon component with MUI `sx` support.
 *
 * A thin wrapper around `@iconify/react`'s `Icon` that adds the full MUI `sx`
 * API for theming, spacing, and responsive styles.
 *
 * @example
 * // Default size (20px square)
 * import { GiselleIcon } from '@littlebranches/giselle-mui';
 * <GiselleIcon icon="solar:rocket-bold-duotone" />
 *
 * @example
 * // Custom size with sx theming
 * <GiselleIcon icon="logos:typescript-icon" width={36} sx={{ color: 'primary.main' }} />
 *
 * @example
 * // As a ReactNode slot inside MetricCard
 * import { MetricCard, MetricCardDecoration, GiselleIcon } from '@littlebranches/giselle-mui';
 * <MetricCard
 *   value="20+"
 *   label="Years"
 *   icon={<GiselleIcon icon="solar:clock-circle-bold-duotone" width={36} />}
 *   decoration={<MetricCardDecoration color="primary" />}
 * />
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices 13/13 — SonarQube not verified
 */
declare function GiselleIcon({ icon, width, height, sx, className, style, flip, rotate, ...other }: GiselleIconProps): React$1.JSX.Element;

type StatusLabelStatus = 'active' | 'inactive' | 'pending' | 'review' | 'done' | 'cancelled' | 'overdue';
type StatusColorKey = 'success' | 'warning' | 'info' | 'error' | 'default';
interface StatusLabelProps extends Omit<ChipProps, 'label' | 'color' | 'icon'> {
    status: StatusLabelStatus;
    /** Override the default label derived from status. */
    label?: string;
}

/**
 * StatusLabel — soft-variant chip that maps a workflow status to an MUI
 * palette key and renders the canonical label for that status.
 *
 * The chip background is a 16% tint of the palette colour's main channel,
 * matching the soft variant pattern used across the design system.
 *
 * @example
 * ```tsx
 * <StatusLabel status="active" />
 * <StatusLabel status="pending" label="Awaiting approval" />
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 19/22 · Best practices 13/13 — SonarQube not verified · size-constant regression tests missing · not all six palette keys in stories
 */
declare const StatusLabel: React__default.ForwardRefExoticComponent<Omit<StatusLabelProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for the {@link SelectableLabel} component.
 *
 * Extends MUI `ChipProps` — `size`, `disabled`, `sx`, and all other MUI
 * `Chip` props are forwarded to the root element unchanged. `onClick` and
 * `icon` are omitted because `SelectableLabel` owns them internally (the
 * click handler drives `onSelectedChange`; the icon slot shows the
 * selected-state checkmark).
 */
interface SelectableLabelProps extends Omit<ChipProps, 'onClick' | 'icon'> {
    /** Whether this label is currently selected — maps to `aria-pressed`. */
    selected: boolean;
    /** Called with the next selected value when the label is activated. */
    onSelectedChange?: (nextSelected: boolean) => void;
}

/**
 * A toggleable chip for multi-select filter groups, built on MUI `Chip` with `SelectableCard`'s selected-state styling.
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices not re-audited — SonarQube not verified · no Responsive story
 */
declare const SelectableLabel: React$1.ForwardRefExoticComponent<Omit<SelectableLabelProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

/**
 * Palette key accepted by {@link LabelProps.color}. `'default'` is not a real
 * MUI palette key — it is a special case handled directly in `label.styles.ts`
 * (grey channel / `text.secondary`, mirroring `StatusLabel`'s own `'default'`
 * branch), since `theme.vars.palette.default` does not exist.
 */
type LabelColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
/** Visual treatment for {@link LabelProps.variant}. */
type LabelVariant = 'filled' | 'outlined' | 'soft' | 'inverted';
interface LabelProps extends Omit<BoxProps, 'color'> {
    /** Palette key used for both background and text tinting. @default 'default' */
    color?: LabelColor;
    /** Visual treatment. @default 'soft' */
    variant?: LabelVariant;
    /** Dims the label and removes pointer affordance. Purely visual — Label has no interactive semantics. @default false */
    disabled?: boolean;
    /** Icon rendered before the label content, in its own spaced slot. */
    startIcon?: ReactElement | null;
    /** Icon rendered after the label content, in its own spaced slot. */
    endIcon?: ReactElement | null;
}

/**
 * A small, static badge-shaped label for tags, categories, and short pieces of
 * status text — four visual treatments (`filled`, `outlined`, `soft`,
 * `inverted`) across the six MUI palette colors plus `default`.
 *
 * String children are auto-capitalized (first letter only) so callers can
 * pass raw values (e.g. `"active"`) without pre-formatting them; non-string
 * children pass through untouched.
 *
 * Unlike `StatusLabel` (fixed workflow-status vocabulary) and
 * `SelectableLabel` (an interactive toggle), `Label` is a general-purpose,
 * non-interactive text badge with no built-in meaning — the caller supplies
 * both the content and, via `color`, the semantic intent.
 *
 * **Quality status (09 Sep 2026):** DoD 27/27 · Best practices not yet audited
 */
declare const Label: React__default.ForwardRefExoticComponent<Omit<LabelProps, "ref"> & React__default.RefAttributes<HTMLSpanElement>>;

/**
 * Props for the {@link Accordion} component.
 *
 * Extends MUI `AccordionProps` — all expand/collapse controls (`expanded`,
 * `onChange`, `defaultExpanded`, `TransitionComponent`, etc.) are forwarded
 * to the underlying MUI Accordion unchanged.
 */
type AccordionProps = Omit<AccordionProps$1, 'children' | 'title'> & {
    /** Content displayed in the accordion summary row (the always-visible part). */
    title: ReactNode;
    /** Content revealed inside the accordion when it is expanded. */
    children?: ReactNode;
    /**
     * Enables checklist mode.
     *
     * When `true`, a done-toggle control appears before the title. The control is
     * **independent** from the expand/collapse trigger — activating it toggles the
     * `done` state without opening or closing the accordion.
     *
     * - Without `checkIcon`: renders a MUI `Checkbox` (default).
     * - With `checkIcon`: renders an `IconButton` with 3-state icon feedback
     *   (idle / hover+focus / done). See `checkIcon` prop for details.
     *
     * @default false
     */
    checklist?: boolean;
    /**
     * Controlled done state for the checklist toggle.
     *
     * - `true` → done
     * - `false` → pending
     *
     * Has no effect when `checklist` is `false`.
     *
     * @default false
     */
    done?: boolean;
    /**
     * Called when the done-toggle is activated.
     *
     * Receives the **next** done state — the value the control will transition
     * **to** after the interaction (the opposite of the current `done` prop).
     *
     * Has no effect when `checklist` is `false`.
     *
     * ```tsx
     * <Accordion
     *   checklist
     *   done={task.done}
     *   onDoneButtonClick={(isDone) => updateTask(task.id, { done: isDone })}
     *   title={task.title}
     * >
     *   <Typography>{task.description}</Typography>
     * </Accordion>
     * ```
     */
    onDoneButtonClick?: (nextDone: boolean) => void;
    /**
     * Custom icon for the **idle undone** state of the checklist toggle.
     *
     * When provided, the MUI `Checkbox` is replaced by an `IconButton` that
     * displays three different icons depending on interaction state:
     *
     * | State                       | Icon shown                  |
     * | --------------------------- | --------------------------- |
     * | Undone + idle               | `checkIcon` (this prop)     |
     * | Hover **or** keyboard focus | `checkHoverIcon` (outlined green check) |
     * | Done + idle                 | `checkDoneIcon` (filled green check)    |
     * | Done + hover/focus          | `checkHoverIcon` (outlined check → signals "click to undo") |
     *
     * Keyboard behaviour: Tab focuses the button (showing the outlined check),
     * Space / Enter toggles the done state.
     *
     * Both hover and focus icons can be overridden via `checkHoverIcon`.
     * The done icon can be overridden via `checkDoneIcon`.
     *
     * Ignored when `checklist` is `false`.
     *
     * ```tsx
     * // Circle icon as the "not done yet" state
     * <Accordion
     *   checklist
     *   checkIcon={<svg width={20} height={20}><circle cx={12} cy={12} r={9} /></svg>}
     *   done={task.done}
     *   onDoneButtonClick={(isDone) => updateTask(task.id, { done: isDone })}
     *   title={task.title}
     * >
     *   ...
     * </Accordion>
     * ```
     */
    checkIcon?: ReactNode;
    /**
     * Icon shown when the item is done and the button is **not** hovered/focused.
     *
     * Default: built-in filled green check circle SVG.
     * Override with your own `ReactNode` to use a different done indicator.
     *
     * Only used in icon-button mode (when `checkIcon` is provided).
     */
    checkDoneIcon?: ReactNode;
    /**
     * Icon shown when the button is **hovered or keyboard-focused**, regardless of
     * done state.
     *
     * Default: built-in outlined green check circle SVG.
     * Provides visual feedback that the button is interactive and hints at the
     * "toggle" action. When the item is done, this icon also signals "click to undo".
     *
     * Only used in icon-button mode (when `checkIcon` is provided).
     */
    checkHoverIcon?: ReactNode;
    /**
     * When `true`, the `Checkbox` renders in indeterminate state — used when some
     * but not all child items are done. Has no effect in icon-button mode
     * (`checkIcon` provided) or when `checklist` is `false`.
     *
     * Wire this from a `useNestedChecklist` result: `indeterminate={indeterminate}`.
     *
     * @default false
     */
    indeterminate?: boolean;
    /**
     * Interactive element rendered before the title — replaces `leadingIcon` when
     * the leading slot must be clickable (e.g. a phase dot in checklist mode).
     *
     * Unlike `leadingIcon` (which is wrapped in `aria-hidden`), `leadingAction`
     * is rendered as-is. The consumer is responsible for accessibility
     * (`role`, `aria-label`, `onClick`, etc.).
     *
     * Cannot be used together with `checklist` — checklist owns the leading slot.
     * If both are provided, `checklist` takes precedence.
     *
     * ```tsx
     * <Accordion
     *   leadingAction={
     *     <PhaseDot color={color} onClick={handleToggle} aria-label="Toggle phase done" />
     *   }
     *   trailingContent={<Typography variant="caption">{phase.date}</Typography>}
     *   title={phase.title}
     * >
     *   ...
     * </Accordion>
     * ```
     */
    leadingAction?: ReactNode;
    /**
     * Optional content rendered **after** the title inside the summary row
     * (e.g. a date label, a status badge).
     *
     * Rendered inside the same flex row as the title — consumers are responsible
     * for alignment (`ml: 'auto'`, `flexShrink: 0`, etc.) if needed.
     *
     * ```tsx
     * trailingContent={
     *   <Typography variant="caption" sx={{ ml: 'auto', flexShrink: 0 }}>
     *     {phase.date}
     *   </Typography>
     * }
     * ```
     */
    trailingContent?: ReactNode;
    /**
     * Optional icon rendered before the title when `checklist` is `false`.
     *
     * Pass a `ReactNode` — typically a `<GiselleIcon icon="solar:..." />`.
     * The wrapper is `aria-hidden` because the icon is decorative.
     *
     * Ignored when `checklist` is `true` (the done-toggle control replaces it).
     */
    leadingIcon?: ReactNode;
    /**
     * The expand/collapse indicator icon on the right side of the summary row.
     *
     * Passed directly to MUI `AccordionSummary`'s `expandIcon` prop.
     * Typical usage:
     * ```tsx
     * expandIcon={<GiselleIcon icon="solar:alt-arrow-down-bold" width={16} />}
     * ```
     */
    expandIcon?: ReactNode;
};

/**
 * A generic, accessible accordion component that can represent any
 * collapsible content — FAQ entries, tasks, settings sections, etc.
 *
 * ## Checklist mode
 *
 * When `checklist` is `true`, a done-toggle `Checkbox` appears before the
 * title. The checkbox is **independent** from the expand/collapse trigger:
 *
 * - Clicking the **checkbox** calls `onDoneButtonClick(nextDone)` without
 *   opening or closing the accordion.
 * - Clicking the **title / summary area** expands or collapses the accordion
 *   without toggling the done state.
 *
 * This is WCAG 2.2 AA compliant — the checkbox and the summary are sibling
 * `<button>` / `<input>` elements, never nested inside each other.
 *
 * ## Usage
 *
 * ```tsx
 * // Basic
 * <Accordion title="What is this?" expandIcon={<GiselleIcon icon="solar:alt-arrow-down-bold" width={16} />}>
 *   <Typography>It is a generic accordion.</Typography>
 * </Accordion>
 *
 * // Task (checklist mode)
 * <Accordion
 *   title={task.title}
 *   checklist
 *   done={task.done}
 *   onDoneButtonClick={(isDone) => updateTask(task.id, { done: isDone })}
 *   expandIcon={<GiselleIcon icon="solar:alt-arrow-down-bold" width={16} />}
 * >
 *   <Typography>{task.description}</Typography>
 * </Accordion>
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices 13/13 — SonarQube not verified
 */
declare function Accordion({ title, children, checklist, done, indeterminate, onDoneButtonClick, leadingIcon, leadingAction, trailingContent, expandIcon, checkIcon, checkDoneIcon, checkHoverIcon, sx, ...other }: AccordionProps): React$1.JSX.Element;

/**
 * Minimum touch target size (px) for the done-toggle checkbox.
 *
 * WCAG 2.5.8 (Level AA) requires interactive targets to be at least 24 × 24 px.
 * MUI Checkbox in `size="small"` mode renders a 38 × 38 px touch target by
 * default, which exceeds this minimum. This constant documents the floor so
 * regression tests can enforce it even if the checkbox padding is ever changed.
 */
declare const ACCORDION_DONE_MIN_TOUCH_TARGET = 24;

/**
 * A color-swatch option: an icon tinted with `color`, inside a selectable
 * surface — not a bare color circle (the reference app's own preset picker
 * tints a single shared icon per option, it never renders plain color dots).
 * `label` is required and used as the accessible name only — swatches show
 * no visible caption, matching the reference's icon-only convention for
 * this specific kind.
 */
interface OptionListSwatchItem {
    id: string;
    kind: 'swatch';
    /** A 3- or 6-digit hex color (e.g. `#0288D1`) the icon is tinted with. Validated before use. */
    color: string;
    icon: ReactNode;
    label: string;
}
/**
 * An icon option. `label` is required — the icon is `aria-hidden`, so `label`
 * is the option's only accessible name, whether or not it's also shown as text.
 */
interface OptionListIconItem {
    id: string;
    kind: 'icon';
    icon: ReactNode;
    label: string;
    /**
     * Optional per-option `sx`, merged onto this option's own `SelectableCard`
     * (after the shared icon-card layout styles). For consumers whose options
     * carry their own inline styling — e.g. a font-family picker previewing
     * each choice in its own typeface — rather than a list-wide style that
     * would apply identically to every option.
     */
    sx?: SxProps<Theme>;
    /** Hides the visible caption text below the icon. @default false */
    hideCaption?: boolean;
}
/** A text-label-only option. */
interface OptionListLabelItem {
    id: string;
    kind: 'label';
    label: string;
}
type OptionListItem = OptionListSwatchItem | OptionListIconItem | OptionListLabelItem;
/**
 * Props for `<OptionList>`. A Tier 3 composition component — the item shape
 * is the real API surface; container props stay minimal (docs/components/api-design-rules.md).
 */
interface OptionListProps {
    /** The options to render, each declaring its own render-kind. */
    options: OptionListItem[];
    /** The currently selected option's `id`. */
    value: string;
    /** Called with the clicked option's `id`. */
    onChange: (id: string) => void;
    /** Grid column count. @default 3 */
    columns?: number;
    /** MUI sx prop — forwarded to root element. */
    sx?: SxProps<Theme>;
}

/**
 * OptionList — a single-select grid of color-swatch, icon, or text-label options.
 *
 * Each option declares its own render-kind (`swatch` | `icon` | `label`), so a
 * single list can mix kinds if needed. Selection is fully controlled via
 * `value`/`onChange` — the component owns no internal state.
 *
 * All three kinds render inside `SelectableCard`, this library's existing
 * accessible selection-card primitive — a swatch option shows a shared icon
 * tinted with its own color, rather than a plain filled color circle.
 *
 * @example
 * <OptionList
 *   value={preset}
 *   onChange={setPreset}
 *   options={[
 *     { id: 'green', kind: 'swatch', color: '#2E7D32', icon: <PaletteIcon />, label: 'Green' },
 *     { id: 'blue', kind: 'swatch', color: '#1565C0', icon: <PaletteIcon />, label: 'Blue' },
 *   ]}
 * />
 */
declare const OptionList: React__default.ForwardRefExoticComponent<OptionListProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<ControlWithBlurb>` — a layout primitive that pairs an
 * arbitrary control with a short description beneath it. See README.md
 * for the design rationale.
 *
 * Extends `BoxProps` (minus `children`, redeclared below as required) so
 * that arbitrary passthrough — `id`, `data-*`, `aria-*`, `className`, etc. —
 * forwarded via `{...other}` in the component is actually reachable through
 * the public type, not silently swallowed by the type checker.
 */
interface ControlWithBlurbProps extends Omit<BoxProps, 'children'> {
    /** The control being described (a switch, radio, checkbox, button, etc). */
    children: ReactNode;
    /** Description text rendered below the control. */
    blurb: string;
}

/**
 * ControlWithBlurb — pairs an arbitrary control (`children`) with a short
 * description (`blurb`) rendered beneath it.
 *
 * The component has no opinion about what the control is — a switch, radio,
 * checkbox, button, or anything else — it only owns the layout and
 * typography of the pairing, so it slots into any form regardless of which
 * control it wraps.
 *
 * The root is `role="group"` with `aria-describedby` pointing at the blurb,
 * so assistive tech announces the description when entering the group —
 * deliberately not injected onto `children` directly, since MUI's own
 * `Switch`/`Checkbox`/`Radio` forward passthrough props to a non-focusable
 * wrapper `<span>`, not the underlying `<input>`, which would make a
 * cloned `aria-describedby` silently inert for the exact controls this
 * component's own stories demonstrate.
 *
 * @example
 * <ControlWithBlurb blurb="Send a weekly summary email.">
 *   <Switch checked={enabled} onChange={handleChange} />
 * </ControlWithBlurb>
 *
 * **Quality status (07 Sep 2026):** DoD 26/27 · Best practices not re-audited
 */
declare const ControlWithBlurb: React__default.ForwardRefExoticComponent<Omit<ControlWithBlurbProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for {@link ToggleCard}.
 *
 * Extends MUI `ButtonBaseProps` (minus `children`, which `ToggleCard` owns internally) —
 * `disabled`, `onClick`, `sx`, and all other `ButtonBase` props are forwarded to the root
 * element unchanged. `disabled` also suppresses `onClick` natively, since the root element
 * is a real `<button>`.
 */
type ToggleCardProps = Omit<ButtonBaseProps, 'children' | 'action'> & {
    /** Leading icon slot. Decorative — hidden from assistive tech via `aria-hidden`. */
    icon: ReactNode;
    /** Primary label text. The card's only accessible name. */
    label: string;
    /**
     * Selected/checked state. Reflected by the default `Switch` and by the card's
     * selection ring. Fully controlled — `ToggleCard` holds no internal state.
     * @default false
     */
    selected?: boolean;
    /**
     * When provided, renders an info affordance next to the label that shows this text
     * in a tooltip on hover/focus.
     */
    tooltip?: string;
    /**
     * Custom trailing action slot — replaces the default `Switch`. Use for actions that
     * aren't a simple on/off toggle (e.g. a chevron, a menu button).
     *
     * Shadows `ButtonBaseProps['action']` (an imperative ref for triggering ripple
     * effects) — omitted above since `ToggleCard` has no use for it and the name is a
     * better fit for this slot.
     */
    action?: ReactNode;
};

/**
 * ToggleCard — an icon + label control with a switch (or a custom action slot)
 * and an optional tooltip, supporting selected/disabled states.
 *
 * Built on `SelectableCard` — the whole row is a single `ButtonBase`, so there
 * is exactly one interactive/focusable element per card. The default `Switch`
 * action is rendered with `pointerEvents: 'none'`: it visually reflects
 * `selected` but never intercepts the click itself, avoiding a nested
 * interactive control inside the card's own button.
 *
 * Fully controlled — `ToggleCard` holds no internal state. `disabled` also
 * suppresses `onClick` natively, since the root element is a real `<button>`.
 *
 * Library-ready: only `@mui/material` dependencies — no `minimal-shared/utils`,
 * no `Iconify`.
 *
 * @example
 * // Default — icon, label, switch
 * <ToggleCard icon={<BellIcon />} label="Email notifications" selected={enabled} onClick={toggle} />
 *
 * @example
 * // With a tooltip info affordance
 * <ToggleCard
 *   icon={<ShieldIcon />}
 *   label="Two-factor authentication"
 *   tooltip="Requires a verification code at every sign-in."
 *   selected={mfaEnabled}
 *   onClick={toggleMfa}
 * />
 *
 * @example
 * // Custom action slot instead of the default Switch
 * <ToggleCard icon={<PlanIcon />} label="Pro plan" action={<Chip label="Active" size="small" />} />
 *
 * **Quality status (07 Sep 2026):** DoD 24/27 · Best practices not re-audited
 */
declare const ToggleCard: React__default.ForwardRefExoticComponent<Omit<ToggleCardProps, "ref"> & React__default.RefAttributes<HTMLButtonElement>>;

/**
 * Props for `<FontSizeSlider>`. A Tier 2 selective extension of MUI
 * `SliderProps` (docs/components/api-design-rules.md) — narrows `value` and
 * `onChange` to the single-thumb numeric contract this component actually
 * supports, and drops `defaultValue` since the component is always
 * controlled and owns no internal state.
 */
interface FontSizeSliderProps extends Omit<SliderProps, 'value' | 'onChange' | 'defaultValue'> {
    /** Current font size, in px. Fully controlled — the component owns no internal state. */
    value: number;
    /** Called with the new font size, in px, as the thumb moves. */
    onChange: (value: number) => void;
}

/**
 * Continuous font-size slider — a controlled, single-thumb numeric range
 * with the current value always shown on the thumb (formatted as `<value>px`).
 *
 * Unlike `OptionList`, this is not a "pick one of N options" control: the
 * value is any number between `min` and `max`, not a fixed preset from a
 * data array. Use `FontSizeSlider` wherever a reader adjusts body text size
 * on a continuous scale; use `OptionList` for a small, fixed set of named
 * choices (e.g. font family).
 *
 * Fully controlled — the component owns no internal state. `defaultValue`
 * is intentionally omitted from the props (see `types.ts`); pass `value`
 * and update it from `onChange`.
 *
 * **Quality status (07 Sep 2026):** DoD n/27 = 26/27 · Best practices not re-audited —
 * see roadmap.md for open improvements.
 */
declare const FontSizeSlider: React$1.ForwardRefExoticComponent<Omit<FontSizeSliderProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;

/**
 * Default minimum selectable font size, in px, when `min` is not supplied.
 */
declare const FONT_SIZE_SLIDER_DEFAULT_MIN = 12;
/**
 * Default maximum selectable font size, in px, when `max` is not supplied.
 */
declare const FONT_SIZE_SLIDER_DEFAULT_MAX = 24;

/**
 * Props for `<FontFamilyOptions>`. A Tier 3 composition component
 * (docs/components/api-design-rules.md) — `options` is the real API surface,
 * not a wrapped MUI primitive.
 */
interface FontFamilyOptionsProps {
    /** The available font-family names, e.g. `['Inter Variable', 'Public Sans Variable']`. */
    options: string[];
    /** Shared decorative icon rendered above every option's name. */
    icon: ReactNode;
    /**
     * The currently selected font-family name. Fully controlled — the
     * component owns no internal state. Typed `string` rather than a
     * project-specific settings-state union, so any consumer can supply it.
     */
    value: string;
    /** Called with the clicked option's font-family name. */
    onChangeOption: (newOption: string) => void;
    /** MUI sx prop — forwarded to the root element (`OptionList`'s grid). */
    sx?: SxProps<Theme>;
}

/**
 * A 2-column grid of font-family choices, each previewed in its own
 * typeface — composes the existing `OptionList` primitive (`icon`-kind
 * items) rather than rebuilding button-grid styling from scratch.
 *
 * Fully controlled — the component owns no internal state. Pass `value`
 * and update it from `onChangeOption`.
 *
 * A `" Variable"` suffix is stripped from each option's displayed name
 * (e.g. `"Inter Variable"` → `"Inter"`) — variable-font packages commonly
 * ship under that family name, but the suffix is an implementation detail
 * the reader doesn't need to see. The option's `value`/id keeps the
 * original, unstripped name, so it still matches the font-family name a
 * consumer's data actually uses.
 *
 * **Quality status (09 Sep 2026):** DoD n/27 = 26/27 · Best practices not re-audited —
 * see roadmap.md for open improvements.
 */
declare const FontFamilyOptions: React$1.ForwardRefExoticComponent<FontFamilyOptionsProps & React$1.RefAttributes<HTMLDivElement>>;

/**
 * Suffix stripped from a font-family name before it is displayed, e.g.
 * `"Inter Variable"` → `"Inter"`. Variable-font packages commonly ship under
 * a `"<Name> Variable"` family name; the suffix is an implementation detail
 * the reader doesn't need to see.
 */
declare const FONT_FAMILY_OPTIONS_VARIABLE_SUFFIX = " Variable";
/**
 * Generic system-font fallback stack appended after a specific font-family
 * name, so a preview never falls back to the browser's serif default while
 * a requested font is loading or unavailable.
 */
declare const FONT_FAMILY_OPTIONS_FALLBACK_STACK = "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif";
/** Grid column count for the option list. */
declare const FONT_FAMILY_OPTIONS_COLUMNS = 2;

/**
 * Props for the {@link ToggleIconButton} component.
 *
 * Extends MUI `IconButtonProps` — `size`, `disabled`, `color`, `sx`, `aria-label`,
 * and all other MUI `IconButton` props are forwarded to the root element unchanged.
 * `children` and `onClick` are omitted because `ToggleIconButton` owns them internally.
 * `aria-pressed` is omitted because it is always set from the `pressed` prop.
 *
 * **WCAG note:** Always provide a descriptive `aria-label` that communicates the
 * current state and what will happen on activation, e.g.:
 * - `aria-label={pressed ? 'Remove from favourites' : 'Add to favourites'}`
 * - `aria-label={pressed ? 'Mark as not done' : 'Mark as done'}`
 */
type ToggleIconButtonProps = Omit<IconButtonProps, 'children' | 'onClick' | 'aria-pressed'> & {
    /**
     * Whether the button is currently in the pressed (active) state.
     * Controls which icon is displayed at idle and sets `aria-pressed`.
     */
    pressed: boolean;
    /**
     * Icon displayed when the button is idle and not pressed.
     * Required — this is the primary visual indicator of the button's purpose.
     */
    idleIcon: ReactNode;
    /**
     * Icon displayed when `pressed` is `true` and the button is not hovered or focused.
     * Default: built-in filled green check circle SVG.
     */
    pressedIcon?: ReactNode;
    /**
     * Icon displayed on hover or keyboard focus, regardless of `pressed` state.
     * Signals "this button is interactive — click/press to toggle."
     * Default: built-in outlined green check circle SVG.
     */
    hoverIcon?: ReactNode;
    /**
     * Called when the button is activated (click, Space, Enter).
     * Receives the **next** pressed state — the value the button will transition to.
     *
     * Named `onPressedChange` to avoid conflict with React's native HTML `onToggle`
     * event (`ToggleEventHandler`) which has an incompatible signature.
     */
    onPressedChange?: (nextPressed: boolean) => void;
};

/**
 * Icon button with three CSS-driven icon states and `aria-pressed` semantics.
 *
 * A generic binary toggle that makes no assumptions about what "pressed" means —
 * the consumer supplies the icons and the label. `Accordion` uses it for its
 * done-toggle; a calendar might use it for a favourite-day marker; a list item
 * might use it for a bookmark.
 *
 * ## Icon states
 *
 * | Interaction state            | Icon shown       |
 * | ---------------------------- | ---------------- |
 * | Idle + not pressed           | `idleIcon`       |
 * | Idle + pressed               | `pressedIcon`    |
 * | Hover **or** keyboard focus  | `hoverIcon`      |
 *
 * Switching is **CSS-only** — no JS hover state — which eliminates the
 * "stuck hover" bug that occurs on rapid pointer movement.
 *
 * ## Keyboard
 *
 * Tab to focus (shows `hoverIcon`), Space / Enter to toggle.
 * MUI `IconButton` natively handles Space / Enter as click events.
 *
 * ## WCAG 2.2 AA
 *
 * - `aria-pressed` communicates the binary pressed / not-pressed state.
 * - Always pass a descriptive `aria-label` that reflects the **current** state
 *   and what will happen on the next activation, e.g.:
 *   `aria-label={pressed ? 'Remove from favourites' : 'Add to favourites'}`
 * - `size="small"` on the underlying `IconButton` produces a ≥ 30 px touch
 *   target (exceeds the 24 px WCAG 2.5.8 minimum).
 *
 * ## Usage
 *
 * ```tsx
 * <ToggleIconButton
 *   pressed={isFavourite}
 *   idleIcon={<GiselleIcon icon="solar:star-outline" width={20} />}
 *   pressedIcon={<GiselleIcon icon="solar:star-bold" width={20} />}
 *   hoverIcon={<GiselleIcon icon="solar:star-bold" width={20} />}
 *   onPressedChange={setIsFavourite}
 *   aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
 * />
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices 13/13 — SonarQube not verified
 */
declare function ToggleIconButton({ pressed, idleIcon, pressedIcon, hoverIcon, onPressedChange, sx, ...other }: ToggleIconButtonProps): React$1.JSX.Element;

/**
 * Width and height (px) of the default built-in SVG icons inside `ToggleIconButton`.
 *
 * Set to 20 px — the WCAG 1.4.11 minimum for interactive icons.
 * Never reduce below 20.
 */
declare const TOGGLE_ICON_SIZE = 20;
/**
 * Minimum touch target size (px) for `ToggleIconButton`.
 *
 * WCAG 2.5.8 (Level AA) requires interactive targets to be at least 24 × 24 px.
 * MUI `IconButton` in `size="small"` mode renders a ≥ 30 px touch target by
 * default, which exceeds this minimum. This constant documents the floor so
 * regression tests can enforce it if the button padding is ever changed.
 */
declare const TOGGLE_MIN_TOUCH_TARGET = 28;

/**
 * Props for `<RHFTextField>` — a controlled `TextField` wired to a
 * react-hook-form field via `Controller`/`useFormContext`. See README.md
 * for the design rationale.
 *
 * Extends `TextFieldProps` (minus `name`, `value`, `onChange`, `onBlur`,
 * `error` — all owned by the react-hook-form `Controller` render prop, not
 * settable by the caller) so the rest of MUI `TextField`'s public API
 * (`label`, `placeholder`, `variant`, `size`, `multiline`, `disabled`, ...)
 * passes straight through via `{...other}`.
 */
interface RHFTextFieldProps extends Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'error'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
}

/**
 * RHFTextField — a `TextField` controlled by a react-hook-form field via
 * `Controller`/`useFormContext`. Must be rendered inside a `<Form>` (or any
 * other react-hook-form `FormProvider`) so `useFormContext()` can find the
 * form's `control`.
 *
 * `type="number"` is special-cased: the rendered `<input>` stays
 * `type="text"` (with a numeric `inputMode`/`pattern`) so an in-progress
 * value like `"12."` can render at all, while react-hook-form's own stored
 * value is sanitized on every keystroke and converted to a real `number` on
 * blur — see `rhf-text-field.utils.ts`.
 *
 * Autocomplete on every instance is deliberately disabled
 * (`autoComplete="new-password"` — the value browsers actually respect,
 * `"off"` is ignored by most of them) so browser autofill can't inject
 * unrelated saved data into an arbitrary named form field.
 *
 * @example
 * <RHFTextField name="email" label="Email address" />
 *
 * **Quality status (08 Sep 2026):** DoD 22/27 · Best practices not re-audited
 */
declare const RHFTextField: React__default.ForwardRefExoticComponent<Omit<RHFTextFieldProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * A single lookup point for every react-hook-form-wrapped input this
 * library ships, so a consumer can write `<Field.Text name="email" />`
 * instead of importing `RHFTextField` (and, as more entries are added,
 * `RHFSelect`, `RHFAutocomplete`, ...) by name individually.
 */
declare const Field: {
    Text: React$1.ForwardRefExoticComponent<Omit<RHFTextFieldProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
};

/**
 * Props for `<Form>` — react-hook-form's `FormProvider` plus a plain
 * `<form>` element. See README.md for the design rationale.
 */
type FormProps<T extends FieldValues = FieldValues> = {
    /** Submit handler — typically `methods.handleSubmit(onValid)`. */
    onSubmit?: () => void;
    /** Form fields — usually `RHFTextField`/`Field.Text` and friends. */
    children: ReactNode;
    /** The return value of `useForm<T>()` — supplies `control`, `handleSubmit`, etc. to every descendant field via context. */
    methods: UseFormReturn<T>;
};

/**
 * Form — pairs react-hook-form's own `FormProvider` (makes `methods`
 * available to every descendant field via `useFormContext()`, which
 * `RHFTextField`/`Field.Text` and friends call internally) with a plain
 * `<form>` element, so a consumer only needs one wrapper around its fields.
 *
 * `noValidate` is always set — this library's fields report validation
 * errors through react-hook-form/zod, not the browser's own HTML5
 * validation UI, so the two are never allowed to disagree.
 *
 * `autoComplete="off"` on the `<form>` root is a browser-compatibility
 * belt-and-braces alongside each field's own `autoComplete="new-password"`
 * (see `RHFTextField`) — most browsers ignore `autoComplete="off"` on the
 * form itself but a few still honour it, and setting both costs nothing.
 *
 * No `ref` forwarding: the generic type parameter `T` makes `forwardRef`
 * substantially more awkward (it needs an `as`-cast the type checker can't
 * verify on its own), and no known consumer needs a ref to the `<form>`
 * itself — `methods` (react-hook-form's own `UseFormReturn`) already
 * exposes everything a caller would reach for one to do. Ported as-is
 * from an internal reference app's `form-provider.tsx`, which also had no
 * ref forwarding.
 *
 * @example
 * const methods = useForm({ resolver: zodResolver(schema) });
 * <Form methods={methods} onSubmit={methods.handleSubmit(onValid)}>
 *   <RHFTextField name="email" label="Email" />
 * </Form>
 *
 * **Quality status (07 Sep 2026):** DoD 20/27 · Best practices not re-audited
 */
declare function Form<T extends FieldValues = FieldValues>({ children, onSubmit, methods, }: FormProps<T>): React$1.JSX.Element;
declare namespace Form {
    var displayName: string;
}

type MetricCardColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
interface MetricCardProps extends PaperProps {
    /** Pre-formatted display value, e.g. `"20+"` or `"<600ms"`. */
    value: string | number;
    /** Primary label rendered below the value. */
    label: string;
    /** Optional second-line detail rendered below the label. */
    sublabel?: string;
    /**
     * Icon slot rendered at the top-right of the card.
     * Accepts any `ReactNode` — the component has no icon-library dependency.
     *
     * @example
     * import { GiselleIcon, MetricCard } from '@littlebranches/giselle-mui';
     * <MetricCard icon={<GiselleIcon icon="solar:clock-circle-bold-duotone" width={36} />} ... />
     */
    icon?: ReactNode;
    /**
     * Palette color key used for the icon tint.
     * @default 'primary'
     */
    color?: MetricCardColor;
    /**
     * Optional decoration rendered in a zero-interaction layer behind the card content.
     * The decoration positions itself; the card clips it via `overflow: hidden`.
     *
     * @example
     * import { MetricCard, MetricCardDecoration } from '@littlebranches/giselle-mui';
     * <MetricCard decoration={<MetricCardDecoration color="primary" />} ... />
     */
    decoration?: ReactNode;
}

interface MetricCardDecorationProps extends BoxProps {
    /**
     * Palette color used for the gradient fill.
     * @default 'primary'
     */
    color?: MetricCardColor;
}

/**
 * MetricCardDecoration — the rotated gradient rectangle that sits behind MetricCard content.
 *
 * Pass as the `decoration` prop of `MetricCard`. The card clips it via `overflow: hidden`.
 *
 * @example
 * import { MetricCard, MetricCardDecoration } from '@littlebranches/giselle-mui';
 * <MetricCard decoration={<MetricCardDecoration color="primary" />} ... />
 *
 * **Quality status (02 Sep 2026):** DoD 19/22 · Best practices not re-audited — SonarQube not verified · size-constant regression tests missing · no Responsive story
 */
declare const MetricCardDecoration: React__default.ForwardRefExoticComponent<Omit<MetricCardDecorationProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * MetricCard — compact stat card with a large value, label, icon slot, and decoration slot.
 *
 * Library-ready: zero icon-library dependency. Pass any `ReactNode` into `icon` and `decoration`.
 *
 * @example
 * import { MetricCard, MetricCardDecoration, GiselleIcon } from '@littlebranches/giselle-mui';
 *
 * <MetricCard
 *   value="20+"
 *   label="Years"
 *   sublabel="of experience"
 *   color="primary"
 *   icon={<GiselleIcon icon="solar:clock-circle-bold-duotone" width={36} />}
 *   decoration={<MetricCardDecoration color="primary" />}
 *   sx={(theme) => ({ boxShadow: theme.shadows[2] })}
 * />
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices 13/13 — SonarQube not verified · JSDoc prop coverage incomplete
 */
declare function MetricCard({ value, label, sublabel, icon, color, decoration, elevation, sx, ...other }: MetricCardProps): React$1.JSX.Element;

interface SelectableCardProps extends ButtonBaseProps {
    /**
     * Whether this card is in the selected/pressed state.
     * Maps to `aria-pressed` and applies a 2px ring shadow using `text.primary`.
     * @default false
     */
    selected?: boolean;
}

/**
 * SelectableCard — an accessible, clickable card surface.
 *
 * Built on `ButtonBase` so it is:
 * - A native `<button>` element (keyboard-activatable via Enter/Space)
 * - Focusable (tabIndex=0 by default, -1 when disabled)
 * - Screen-reader friendly (aria-pressed reflects selection state)
 * - Hover and focus-visible states styled explicitly
 * - Disabled state handled natively (aria-disabled, no pointer events)
 *
 * Library-ready: only `@mui/material` dependencies.
 *
 * @example
 * // Basic selectable option card
 * <SelectableCard selected={plan === 'starter'} onClick={() => setPlan('starter')}>
 *   <Typography>Starter — $9/mo</Typography>
 * </SelectableCard>
 *
 * @example
 * // Disabled state
 * <SelectableCard selected disabled>
 *   <Typography>Current plan</Typography>
 * </SelectableCard>
 *
 * @example
 * // Custom padding via sx
 * <SelectableCard selected={isSelected} sx={{ p: 3, borderRadius: 2 }} onClick={...}>
 *   ...children...
 * </SelectableCard>
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices 13/13 — SonarQube not verified
 */
declare function SelectableCard({ selected, disabled, children, sx, ...other }: SelectableCardProps): React$1.JSX.Element;

type QuoteColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
interface QuoteCardProps extends PaperProps {
    /** The full text of the quote. Rendered in italics inside the card body. */
    quote: string;
    /**
     * Attribution name displayed below the quote, e.g. `"Jane Smith"`.
     * Omit to hide the attribution row entirely.
     */
    author?: string;
    /**
     * Source or context label displayed next to the author, e.g. `"Platform Team"`.
     * A separator dot is only rendered when both `author` and `source` are present.
     */
    source?: string;
    /**
     * Accent color key applied to the background tint, border, and decorative quote mark.
     * Accepts any MUI palette color key.
     * @default 'primary'
     */
    color?: QuoteColor;
}

/**
 * A warm, readable block-quote card built on MUI Paper.
 *
 * Extends `PaperProps` — callers can pass `elevation` for shadow depth and
 * `variant="outlined"` to switch to a border-only surface.
 * Colors are driven by MUI CSS variables so it adapts to light/dark mode and
 * any custom theme without additional configuration.
 *
 * **Theming via sx:**
 * ```tsx
 * <QuoteCard sx={{ borderRadius: 4, p: 4 }} ... />
 * ```
 *
 * **Theming via elevation:**
 * ```tsx
 * <QuoteCard elevation={4} ... />
 * ```
 *
 * **Theming via color:**
 * ```tsx
 * <QuoteCard color="info" ... />
 * ```
 *
 * @example
 * <QuoteCard
 *   quote="Leave every file a little better than you found it."
 *   author="Jane Smith"
 *   source="Platform Team"
 *   elevation={0}
 * />
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices 13/13 — SonarQube not verified · styles test misses a factory
 */
declare function QuoteCard({ quote, author, source, color, elevation, sx, ...other }: QuoteCardProps): React$1.JSX.Element;

type StatCardColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
/**
 * Data-layer representation of a single `StatCard` entry.
 *
 * Use this type in data factory files instead of defining a local equivalent.
 * The view layer maps `iconId` to `<GiselleIcon icon={iconId} />` — no `ReactNode`
 * is stored in the data layer.
 *
 * ```ts
 * const stats: StatCardItem[] = [
 *   { label: 'Components', value: '10 of ~20', color: 'primary', iconId: 'solar:widget-bold-duotone', sparkline: [3,4,5,6,7,8,9,10] },
 * ];
 * ```
 */
interface StatCardItem {
    label: string;
    value: string | number;
    trend?: number;
    trendLabel?: string;
    color: StatCardColor;
    /** Iconify icon ID — rendered as `<GiselleIcon icon={iconId} />` in the view layer. */
    iconId: string;
    sparkline?: number[];
}
interface StatCardProps extends Omit<CardProps, 'title' | 'color'> {
    /** Card label, e.g. `"Weekly sales"`. */
    label: string;
    /** Pre-formatted display value, e.g. `"714k"` or `"551"`. */
    value: string | number;
    /**
     * Trend percentage. Positive = upward trend (green arrow), negative = downward (red arrow).
     *
     * @example 2.6 → `+2.6%`
     */
    trend?: number;
    /** Supplementary label next to the trend, e.g. `"last week"`. */
    trendLabel?: string;
    /**
     * Icon slot — accepts any `ReactNode`. No icon-library dependency inside this component.
     *
     * ```tsx
     * icon={<GiselleIcon icon="solar:widget-bold-duotone" width={28} />}
     * ```
     */
    icon?: ReactNode;
    /**
     * Palette key controlling background tint, trend colour, and sparkline colour.
     * @default 'primary'
     */
    color?: StatCardColor;
    /**
     * Chart slot — accepts any `ReactNode`. Renders bottom-right inside the card.
     *
     * No chart-library dependency inside this component. Pass a pre-configured
     * chart element from the consumer. Use `STAT_CARD_SPARKLINE_OPTIONS` from
     * `stat-card.styles.ts` as the base options for the canonical 84×56 slot.
     *
     * ```tsx
     * chart={
     *   <ReactApexChart
     *     type="line"
     *     series={[{ data: sparkline }]}
     *     options={{ ...STAT_CARD_SPARKLINE_OPTIONS, colors: [theme.palette.primary.dark] }}
     *     width={84}
     *     height={56}
     *   />
     * }
     * ```
     */
    chart?: ReactNode;
    /** MUI `sx` override on the root `Card`. */
    sx?: SxProps<Theme>;
}

/**
 * Base ApexCharts options for the `StatCard` sparkline slot (84×56 px).
 *
 * Spread this and add `colors` to match the card's palette:
 *
 * ```ts
 * options={{ ...STAT_CARD_SPARKLINE_OPTIONS, colors: [theme.palette[color].dark] }}
 * ```
 */
declare const STAT_CARD_SPARKLINE_OPTIONS: ApexOptions;

/**
 * StatCard — KPI summary card with icon, trend indicator, and optional chart slot.
 *
 * The gradient background is built from the palette's `lightChannel` via `channelAlpha`.
 *
 * The `chart` slot accepts any `ReactNode` — no chart-library dependency inside this
 * component. Use `STAT_CARD_SPARKLINE_OPTIONS` as the base options for the canonical
 * 84×56 slot and override `colors` with the palette key's dark token.
 *
 * @example
 * ```tsx
 * <StatCard
 *   label="Components"
 *   value="9"
 *   trend={12.5}
 *   trendLabel="this month"
 *   color="primary"
 *   icon={<GiselleIcon icon="solar:widget-bold-duotone" width={28} />}
 *   chart={
 *     <ReactApexChart
 *       type="line"
 *       series={[{ data: [4, 5, 6, 7, 8, 9] }]}
 *       options={{ ...STAT_CARD_SPARKLINE_OPTIONS, colors: [theme.palette.primary.dark] }}
 *       width={84}
 *       height={56}
 *     />
 *   }
 * />
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices 13/13 — SonarQube not verified · size-constant regression tests missing
 */
declare function StatCard({ label, value, trend, trendLabel, icon, color, chart, sx, ...other }: StatCardProps): React$1.JSX.Element;

interface StatCardRowProps extends Omit<GridProps, 'children' | 'container'> {
    /** Items to render as `StatCard` tiles in the responsive grid row. */
    items: StatCardItem[];
    /**
     * Optional factory to render the `chart` slot for each item.
     *
     * Use this to wire sparklines from `@littlebranches/giselle-mui/charts` in the consuming app.
     * When omitted, cards render without a chart — the main bundle stays chart-free.
     *
     * @example
     * ```tsx
     * renderChart={(item) =>
     *   item.sparkline ? (
     *     <ReactApexChart
     *       type="line"
     *       series={[{ data: item.sparkline }]}
     *       options={{ ...STAT_CARD_SPARKLINE_OPTIONS, colors: [theme.palette[item.color].dark] }}
     *       width={84}
     *       height={56}
     *     />
     *   ) : null
     * }
     * ```
     */
    renderChart?: (item: StatCardItem) => ReactNode;
}

/**
 * `StatCardRow` — responsive grid of `StatCard` tiles.
 *
 * Accepts a `StatCardItem[]` and maps each entry to a `StatCard`, laid out in a
 * responsive grid row: full-width on xs, two columns on sm, four columns on md+.
 *
 * The `renderChart` prop is intentionally optional so the component stays in the
 * **main bundle** without pulling in ApexCharts. Pass a factory function when you
 * want sparklines — wire `ReactApexChart` inside the factory, imported from the
 * `/charts` subpath.
 *
 * @example
 * ```tsx
 * // Minimal — no sparklines
 * <StatCardRow items={stats} />
 *
 * // With sparklines (consuming app imports from /charts subpath)
 * <StatCardRow
 *   items={stats}
 *   renderChart={(item) =>
 *     item.sparkline ? (
 *       <ReactApexChart
 *         type="line"
 *         series={[{ data: item.sparkline }]}
 *         options={{ ...STAT_CARD_SPARKLINE_OPTIONS, colors: [theme.palette[item.color].dark] }}
 *         width={84}
 *         height={56}
 *       />
 *     ) : null
 *   }
 * />
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices not re-audited — SonarQube not verified
 */
declare function StatCardRow({ items, renderChart, sx, ...other }: StatCardRowProps): React$1.JSX.Element;

interface ProfileStat {
    label: string;
    value: string | number;
}
interface ProfileSummaryCardProps extends Omit<PaperProps, 'children'> {
    name: string;
    role?: string;
    avatarSrc?: string;
    stats: ProfileStat[];
}

/**
 * **Quality status (02 Sep 2026):** DoD 19/22 · Best practices not re-audited — SonarQube not verified · JSDoc prop coverage incomplete · no Responsive story
 */
declare function ProfileSummaryCard({ name, role, avatarSrc, stats, sx, ...other }: ProfileSummaryCardProps): React$1.JSX.Element;

interface NestedChecklistState {
    /** Whether the parent item is done (all children done). */
    parentDone: boolean;
    /**
     * Whether the parent checkbox should display indeterminate state.
     * `true` when at least one but not all children are done.
     */
    indeterminate: boolean;
    /** Current done state for each child, indexed by position. */
    childrenDone: boolean[];
    /**
     * Toggle the parent.
     * - Transitioning to `true`: marks ALL children done.
     * - Transitioning to `false`: marks ALL children undone.
     */
    toggleParent: () => void;
    /**
     * Toggle one child by index.
     * - If all children are now done → parent becomes done.
     * - If any child is now undone → parent becomes undone.
     */
    toggleChild: (index: number) => void;
}
/**
 * Manages the cascade done-state relationship between a parent item
 * (an accordion / phase) and its child items (milestones / tasks).
 *
 * ## Cascade rules
 *
 * | Action | Effect |
 * |---|---|
 * | Toggle parent → done | All children → done |
 * | Toggle parent → undone | All children → undone |
 * | Toggle child → all done | Parent → done |
 * | Toggle child → any undone | Parent → undone |
 *
 * ## Usage in TimelineCompact
 *
 * ```tsx
 * const { parentDone, indeterminate, childrenDone, toggleParent, toggleChild } =
 *   useNestedChecklist(phase.done ?? false, milestones.map(ms => ms.done ?? false));
 *
 * <Accordion
 *   checklist
 *   done={parentDone}
 *   indeterminate={indeterminate}
 *   onDoneButtonClick={toggleParent}
 *   title={phase.title}
 * >
 *   {milestones.map((ms, i) => (
 *     <MilestoneRow key={i} done={childrenDone[i]} onToggle={() => toggleChild(i)} />
 *   ))}
 * </Accordion>
 * ```
 *
 * @param initialParentDone - Initial done state for the parent.
 * @param initialChildrenDone - Initial done state for each child, positionally indexed.
 */
declare function useNestedChecklist(initialParentDone: boolean, initialChildrenDone: boolean[]): NestedChecklistState;

/**
 * A single action item rendered as a `Tooltip` + `IconButton`.
 *
 * The `icon` slot accepts any `ReactNode` — use `<GiselleIcon ... />` to fill it.
 */
interface IconActionItem {
    /**
     * Tooltip label shown on hover.
     */
    tooltip: string;
    /**
     * Icon rendered inside the button.
     *
     * @example
     * import { GiselleIcon } from '@littlebranches/giselle-mui';
     * { tooltip: 'Edit', icon: <GiselleIcon icon="solar:pen-bold" /> }
     */
    icon: ReactNode;
    /**
     * Click handler for the button.
     */
    onClick?: IconButtonProps['onClick'];
    /**
     * `href` for link behaviour. Requires `component` to be set to a link element
     * (e.g. `RouterLink`) that handles the `href` prop.
     */
    href?: string;
    /**
     * Overrides the root element of `IconButton` — e.g. pass `RouterLink` together
     * with `href` to make the button navigate.
     */
    component?: React__default.ElementType;
    /**
     * Disables the button and prevents interaction.
     * @default false
     */
    disabled?: boolean;
    /**
     * `aria-label` for the button. Defaults to the `tooltip` value.
     */
    'aria-label'?: string;
    /**
     * Extra placement for the Tooltip.
     * @default 'bottom'
     */
    tooltipPlacement?: TooltipProps['placement'];
}
interface IconActionBarProps extends BoxProps {
    /**
     * Array of action items rendered as `Tooltip` + `IconButton` pairs.
     *
     * Each item configures the tooltip label, icon, click behaviour, and optional
     * link target (`href` + `component`).
     *
     * When omitted the bar renders the default Edit / View / Print / Send / Share set.
     *
     * @example
     * ```tsx
     * import { GiselleIcon, IconActionBar } from '@littlebranches/giselle-mui';
     *
     * <IconActionBar
     *   actions={[
     *     { tooltip: 'Edit', icon: <GiselleIcon icon="solar:pen-bold" />, onClick: onEdit },
     *     { tooltip: 'Delete', icon: <GiselleIcon icon="solar:trash-bin-trash-bold" />, onClick: onDelete },
     *   ]}
     * />
     * ```
     *
     * @example
     * ```tsx
     * // Link action using a router component
     * import { GiselleIcon, IconActionBar } from '@littlebranches/giselle-mui';
     *
     * <IconActionBar
     *   actions={[
     *     {
     *       tooltip: 'Edit',
     *       icon: <GiselleIcon icon="solar:pen-bold" />,
     *       component: RouterLink,
     *       href: `/invoices/${id}/edit`,
     *     },
     *   ]}
     * />
     * ```
     */
    actions?: IconActionItem[];
}

/**
 * Default actions rendered when no `actions` prop is supplied.
 *
 * Uses the same Solar icon set as the source reference (invoice toolbar):
 * Edit, View, Print, Send, Share.
 */
declare const DEFAULT_ICON_ACTIONS: IconActionItem[];

/**
 * IconActionBar — a horizontal row of icon buttons, each paired with a tooltip.
 *
 * Renders a `Box` containing `Tooltip` + `IconButton` pairs. Each item is
 * fully configurable: icon slot, tooltip label, click handler, link target,
 * disabled state, and tooltip placement.
 *
 * When `actions` is omitted the bar defaults to the standard document toolbar
 * set: **Edit, View, Print, Send, Share**.
 *
 * ```tsx
 * import { GiselleIcon, IconActionBar } from '@littlebranches/giselle-mui';
 *
 * // Minimal — default actions
 * <IconActionBar />
 *
 * // Custom actions
 * <IconActionBar
 *   actions={[
 *     { tooltip: 'Edit', icon: <GiselleIcon icon="solar:pen-bold" />, onClick: handleEdit },
 *     { tooltip: 'Delete', icon: <GiselleIcon icon="solar:trash-bin-trash-bold" />, onClick: handleDelete },
 *   ]}
 * />
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices 13/13 — SonarQube not verified
 */
declare function IconActionBar({ actions, sx, ...other }: IconActionBarProps): React$1.JSX.Element;

/** Controls the visual order and flow direction of the two columns. */
type ShowcaseRowOrientation = 'row' | 'row-reverse' | 'column' | 'column-reverse';
/** Optional text block rendered in the left/top column. */
type TwoColumnShowcaseRowText = {
    /** Short uppercase label rendered above the heading. */
    overline?: string;
    /** Main heading text. */
    heading?: string;
    /** Supporting description paragraph. */
    description?: string;
};
type TwoColumnShowcaseRowProps = Omit<GridProps, 'direction' | 'container' | 'columnSpacing' | 'rowSpacing' | 'sx' | 'children'> & {
    /**
     * Optional text block rendered in the first column.
     * When omitted the layout is single-column (controls only).
     */
    text?: TwoColumnShowcaseRowText;
    /**
     * Content rendered in the controls column.
     * Accepts any `ReactNode` — form controls, cards, previews, etc.
     */
    controls: React__default.ReactNode;
    /**
     * Controls the visual order and flow direction of the two columns.
     * - `'row'`            → text left,    controls right  (default)
     * - `'row-reverse'`    → controls left, text right
     * - `'column'`         → text top,     controls bottom
     * - `'column-reverse'` → controls top, text bottom
     *
     * At `xs` the orientation is always `'column'` regardless of this value.
     *
     * @default 'row'
     */
    orientation?: ShowcaseRowOrientation;
    /**
     * `alignItems` applied to the controls `Stack`.
     *
     * @default 'flex-start'
     */
    controlsAlign?: React__default.CSSProperties['alignItems'];
    /** `sx` applied to the text column `Stack`. */
    textSx?: SxProps<Theme>;
    /** `sx` applied to the controls column `Stack`. */
    controlsSx?: SxProps<Theme>;
    /** `sx` applied to the root `Grid` container. */
    sx?: SxProps<Theme>;
};

/**
 * `TwoColumnShowcaseRow` lays out a text description alongside an interactive
 * controls area in a responsive two-column grid.
 *
 * ## Layout behaviour
 * - At `md+` the columns sit side by side, each taking half the container width.
 * - At `xs` the layout always stacks vertically regardless of `orientation`.
 * - When `text` is omitted the entire width is given to the `controls` slot.
 *
 * ## Orientation
 * Use `orientation` to swap which column comes first, or to force a stacked
 * layout at all breakpoints:
 *
 * ```tsx
 * // Text left, controls right (default)
 * <TwoColumnShowcaseRow text={{ heading: 'Theme' }} controls={<PresetPicker />} />
 *
 * // Controls only — full width column layout
 * <TwoColumnShowcaseRow controls={<DashboardPreview />} orientation="column" />
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices 13/13 — SonarQube not verified
 */
declare function TwoColumnShowcaseRow({ text, controls, orientation, controlsAlign, textSx, controlsSx, sx, ...other }: TwoColumnShowcaseRowProps): React$1.JSX.Element;

type TextSlotProps = {
    sx?: SxProps<Theme>;
};
/** Heading levels `SectionTitle`'s `titleComponent`/`titleVariant` accept. */
type SectionTitleHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type SectionTitleProps = Omit<BoxProps, 'title'> & {
    /**
     * Optional gradient accent word appended to `title`.
     * Rendered with reduced opacity and a horizontal gradient that fades from
     * `text.primary` to a 20% alpha of the same channel.
     */
    txtGradient?: string;
    /** Main heading text. */
    title: ReactNode;
    /**
     * Rendered tag for the heading - independent of `titleVariant` (its visual
     * size), matching how MUI's own `Typography` separates `component` from
     * `variant`. Set this alone to change only the semantic tag while keeping
     * this component's default `h2` sizing (e.g. a page's one real `<h1>`
     * that should still look identical to every other `SectionTitle` on the
     * page). Combine with `titleVariant` when nesting a real heading hierarchy
     * (a section's own subsection using `titleComponent="h3"` at a visually
     * smaller `titleVariant="h3"`, for instance).
     * @default 'h2'
     */
    titleComponent?: SectionTitleHeadingLevel;
    /**
     * Visual size/weight for the heading - independent of `titleComponent`
     * (its semantic tag). Defaults to `'h2'` sizing regardless of
     * `titleComponent`, so a `titleComponent="h1"` heading still looks
     * identical to every other `SectionTitle` unless a different
     * `titleVariant` is explicitly requested.
     * @default 'h2'
     */
    titleVariant?: SectionTitleHeadingLevel;
    /**
     * Short overline label rendered above the heading.
     * Styled as `overline` typography in `text.disabled` colour.
     */
    caption?: ReactNode;
    /**
     * Supporting description text rendered below the heading.
     * Styled as `body1` in `text.secondary` colour.
     */
    description?: ReactNode;
    /**
     * `sx` overrides for individual text slots.
     */
    slotProps?: {
        title?: TextSlotProps;
        caption?: TextSlotProps;
        description?: TextSlotProps;
    };
};

type SectionCaptionProps = Omit<BoxProps, 'title'> & {
    /** Overline label text. */
    title: ReactNode;
};

/**
 * `SectionCaption` renders the overline label above the section heading.
 * Exported so consumers can use it standalone when they need just the overline.
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices 13/13 — SonarQube not verified · no Responsive story
 */
declare const SectionCaption: React__default.ForwardRefExoticComponent<Omit<SectionCaptionProps, "ref"> & React__default.RefAttributes<HTMLSpanElement>>;

/**
 * `SectionTitle` renders a stacked heading group: optional overline caption,
 * a heading (`h2` by default, an `h1`-tagged option for a page's one real
 * H1) with an optional gradient accent word, and an optional description
 * paragraph.
 *
 * ## Usage
 *
 * ```tsx
 * <SectionTitle
 *   caption="What we offer"
 *   title="Build better"
 *   txtGradient="faster"
 *   description="A set of tools that removes boilerplate and encodes best practices."
 * />
 * ```
 *
 * ## Gradient accent
 * The `txtGradient` word is appended after `title` and rendered with a
 * `text.primary → text.primary @20%` left-to-right gradient. In dark mode
 * `text.primary` resolves to near-white, giving a natural fade-out.
 *
 * ## Page H1
 * Pass `titleComponent="h1"` for the one section that should carry the
 * page's actual `<h1>` (e.g. a homepage's hero) - the rendered tag changes,
 * `titleVariant` sizing does not (still `h2` by default), so it still looks
 * identical to every other `SectionTitle` on the page.
 *
 * ## Nested heading hierarchy
 * `titleComponent` and `titleVariant` are independent, the same way MUI's
 * own `Typography` separates `component` from `variant` - set both together
 * for a genuine nested hierarchy (a subsection's `SectionTitle` at
 * `titleComponent="h3"`, `titleVariant="h3"`, visibly smaller than its
 * parent's `h2`).
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices 13/13 — SonarQube not verified
 */
declare function SectionTitle({ sx, title, caption, slotProps, txtGradient, description, titleComponent, titleVariant, ...other }: SectionTitleProps): React$1.JSX.Element;

interface SectionContainerProps extends Omit<ContainerProps, 'maxWidth'> {
    /**
     * MUI `Container` maxWidth. Controls the max-width breakpoint of the section content.
     * @default 'lg'
     */
    maxWidth?: ContainerProps['maxWidth'];
    /**
     * Vertical padding applied to the section via `py` shorthand.
     * Accepts a single value or a responsive object keyed by MUI breakpoints.
     * @default { xs: 8, md: 12 }
     */
    py?: number | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>>;
    /** MUI `sx` override on the root `Container`. */
    sx?: SxProps<Theme>;
}

/**
 * `SectionContainer` — standard full-width section wrapper.
 *
 * Wraps `Container maxWidth="lg"` with consistent vertical padding so every
 * section page has the same horizontal constraints and spacing without
 * repeating `sx={{ py: { xs: 8, md: 12 } }}` inline.
 *
 * **Usage:**
 * ```tsx
 * <SectionContainer>
 *   <Typography variant="h2">Section heading</Typography>
 * </SectionContainer>
 *
 * // Custom padding / max-width:
 * <SectionContainer maxWidth="md" py={{ xs: 6, md: 10 }}>
 *   ...
 * </SectionContainer>
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices 13/13 — SonarQube not verified
 */
declare function SectionContainer({ children, maxWidth, py, sx, ...other }: SectionContainerProps): React$1.JSX.Element;

/** Every decorative piece `PageSection` knows how to render. */
type DecorationKind = 'corner-plus' | 'corner-x' | 'border-line' | 'triangle-left' | 'triangle-down' | 'dot';
/**
 * One decorative element, positioned entirely via `sx` — real usage across
 * the sections that inspired this component never shares fixed offsets (an
 * inset corner mark here, a flush-to-the-edge one there), so a closed enum
 * of preset positions can't cover it. `border-line` additionally takes
 * `vertical` to pick its orientation, mirroring the original `FloatLine`'s
 * own prop shape.
 */
type DecorationElement = {
    kind: DecorationKind;
    /** Only meaningful for `kind: 'border-line'`. @default false */
    vertical?: boolean;
    /** Positions and sizes this element. Required for anything beyond the default placement. */
    sx?: SxProps<Theme>;
};
/**
 * Props for `<PageSection>`.
 */
interface PageSectionProps extends Omit<BoxProps<'section'>, 'component'> {
    /** Section content. */
    children: React.ReactNode;
    /**
     * `true` renders the canonical frame (2 corner plus-marks, 3 border
     * lines — the treatment every section used before this component
     * existed). `false` renders none. Pass an array to render a fully custom
     * set of decorative elements instead.
     * @default true
     */
    decoration?: boolean | DecorationElement[];
    /**
     * `children` is always wrapped in a `SectionContainer` — that's the whole
     * point: every section built on `PageSection` gets the same content
     * width and vertical rhythm for free, instead of each one hand-rolling
     * its own `Container` (as every section did before this existed; see
     * `SectionContainer`'s own README). These four props forward to it.
     */
    containerMaxWidth?: ContainerProps['maxWidth'];
    /** @default SectionContainer's own default, `{ xs: 8, md: 12 }` */
    containerPy?: SectionContainerProps['py'];
    containerSx?: SxProps<Theme>;
    /**
     * Swaps the inner `SectionContainer`'s rendered element — e.g.
     * `containerComponent={MotionContainer}` so the container itself also
     * drives a `framer-motion` stagger context, matching what a section with
     * per-block entrance animation needs. `SectionContainer` already forwards
     * `component` to MUI's own `Container`; this just exposes that.
     */
    containerComponent?: ContainerProps['component'];
    /**
     * Rendered as an additional sibling of the `SectionContainer`, inside
     * `<section>` but outside the width-constrained container — for content
     * that must not be nested inside another container (like a detail panel
     * with its own internal `Container`, which would otherwise double up on
     * horizontal padding) or that intentionally needs the full section width
     * (like a sticky sub-nav).
     */
    unconstrainedChildren?: React.ReactNode;
    /** MUI sx prop: forwarded to the root `<section>` element. */
    sx?: SxProps<Theme>;
}

/**
 * `PageSection` — the canonical section wrapper: a consistent decorative
 * frame (corner marks, border lines, and other subtle accents, configurable
 * via `decoration`) around a `SectionContainer`, giving every section built
 * on it the same content width and vertical rhythm for free. `decoration`:
 * `true` (the default) renders the canonical frame every section used
 * before this component existed; `false` renders none; an array of
 * `DecorationElement`s renders a fully custom set — real usage across the
 * sections this was extracted from never shares fixed offsets, so each
 * element positions itself via its own `sx`.
 *
 * `SectionContainer` is not optional here — every section previously
 * hand-rolled its own `Container` + padding (see `SectionContainer`'s own
 * README), which is precisely the inconsistency this component exists to
 * remove. Use `containerMaxWidth`/`containerPy`/`containerSx` for the rare
 * section that needs different container behaviour, rather than reaching
 * around `PageSection` to add a second `Container` inside it. `containerComponent`
 * covers the one case those three can't: swapping the inner `Container`'s
 * rendered element (e.g. `component={MotionContainer}`, for a section that
 * needs the container itself to also drive a `framer-motion` stagger context)
 * — `SectionContainer` already forwards `component` to MUI's own `Container`,
 * this just exposes that same forwarding through `PageSection`.
 *
 * @example
 * ```tsx
 * <PageSection>
 *   <Typography variant="h2">Section heading</Typography>
 * </PageSection>
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 19/22 · Best practices not re-audited — SonarQube not verified · helper component defined inline · no Responsive story
 */
declare const PageSection: React__default.ForwardRefExoticComponent<Omit<PageSectionProps, "ref"> & React__default.RefAttributes<HTMLElement>>;

interface AppShellProps extends Omit<BoxProps, 'children' | 'title'> {
    /** Brand/page title rendered at the start of the top bar. */
    title?: ReactNode;
    /** End-aligned toolbar content — e.g. a signed-in user's name and sign-out button. */
    actions?: ReactNode;
    /** Main page content, rendered inside the inner `SectionContainer`. */
    children?: ReactNode;
    /**
     * `maxWidth` forwarded to the inner `SectionContainer` wrapping `children`.
     * @default 'lg'
     */
    containerMaxWidth?: ContainerProps['maxWidth'];
}

/**
 * `AppShell` — the top-bar-plus-content page frame for authenticated
 * routes: a full-height root, a static `AppBar`/`Toolbar` pinned to the
 * top, and the page body wrapped in `SectionContainer` so its width and
 * vertical rhythm match every other section-based page.
 *
 * The top bar itself is deliberately plain MUI (`AppBar`/`Toolbar`), not a
 * dedicated nav component — this layer has no shipped top-bar component to
 * reach for yet (`AppTopBar` is still an unimplemented stub). `title` and
 * `actions` are the only two slots: `actions` in particular is where a
 * caller supplies anything that carries its own state or context (a
 * signed-in user's name, a sign-out button, and so on) — `AppShell` never
 * imports auth, routing, or any other project-specific concern, which is
 * what keeps it reusable here.
 *
 * @example
 * ```tsx
 * <AppShell title="Portfolio" actions={<SignOutButton />}>
 *   <DashboardContent />
 * </AppShell>
 * ```
 *
 * **Quality status (07 Sep 2026):** DoD 26/27 · Best practices not re-audited
 */
declare const AppShell: React__default.ForwardRefExoticComponent<Omit<AppShellProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/** One link rendered by `PublicNav`'s nav-links list. */
interface PublicNavItem {
    /** Link label. */
    label: string;
    /** Link destination. */
    href: string;
}
/**
 * Props for {@link PublicNav}.
 *
 * Extends `Omit<AppBarProps, 'children'>` — `PublicNav` owns `children`
 * internally (it composes logo, nav links, theme control, and sign-in from
 * its own dedicated props instead of a generic slot), so every other MUI
 * `AppBar` prop (`position`, `color`, `elevation`, `sx`, etc.) is forwarded
 * to the root element unchanged.
 */
interface PublicNavProps extends Omit<AppBarProps, 'children'> {
    /**
     * Logo/brand element rendered at the start of the bar.
     * @default a built-in `Logo` reading "Giselle"
     */
    logo?: ReactNode;
    /**
     * Ordered nav links — rendered inline on the desktop presentation and
     * inside the mobile drawer on the mobile presentation.
     * @default a small built-in sample set
     */
    navItems?: PublicNavItem[];
    /**
     * Current color-scheme mode for the settings/theme control.
     * Uncontrolled by default: when omitted, `PublicNav` reads and drives MUI's
     * own `useColorScheme` directly, so it works with zero extra wiring inside
     * any app already wrapped in a CSS-vars-enabled `ThemeProvider`
     * (e.g. `GiselleThemeProvider`).
     */
    colorMode?: 'light' | 'dark';
    /**
     * Called with the next mode whenever the theme control is activated.
     * Required to actually change the mode when `colorMode` is controlled —
     * `PublicNav` never assumes how a controlling parent stores the mode.
     */
    onColorModeChange?: (nextMode: 'light' | 'dark') => void;
    /**
     * Sign-in affordance label.
     * @default 'Sign in'
     */
    signInLabel?: string;
    /**
     * Called when the sign-in affordance is activated.
     * `PublicNav` never imports auth or routing — the caller owns what
     * "sign in" does.
     */
    onSignInClick?: () => void;
    /** Href for the sign-in affordance — renders it as a link when provided. */
    signInHref?: string;
    /**
     * The MUI breakpoint at which the desktop presentation (inline nav links,
     * no hamburger) takes over from the mobile presentation (hamburger +
     * drawer).
     * @default 'md'
     */
    navBreakpoint?: Breakpoint;
}

/**
 * `PublicNav` — a public marketing-site header/nav: logo, nav links, a
 * settings/theme control, and a sign-in affordance, with structurally
 * distinct desktop and mobile presentations.
 *
 * ## Desktop (at and above `navBreakpoint`, default `'md'`)
 * Logo on the left, inline nav links, theme control, and sign-in affordance
 * on the right — no hamburger trigger.
 *
 * ## Mobile (below `navBreakpoint`)
 * Logo plus a hamburger trigger on the left, which opens a `Drawer`
 * containing the logo and a vertically-stacked nav-links list. The theme
 * control and sign-in affordance stay visible on the bar itself at every
 * width — they never move into the drawer.
 *
 * Both presentations are always mounted; MUI breakpoint `sx` toggles which
 * one is visible, matching the pattern MUI's own responsive nav examples use
 * (render both, hide one via CSS) rather than branching in JS on a media
 * query hook.
 *
 * ## Theme control
 * `colorMode`/`onColorModeChange` make the theme control controlled. Left
 * uncontrolled, `PublicNav` reads and drives MUI's own `useColorScheme`
 * directly — no extra wiring needed inside an app already wrapped in a
 * CSS-vars-enabled `ThemeProvider` (e.g. `GiselleThemeProvider`).
 *
 * ## Sign-in
 * `PublicNav` never imports auth or routing. `onSignInClick`/`signInHref`
 * are plain callbacks/hrefs — the caller owns what "sign in" actually does.
 *
 * ## Scroll surface
 * The bar is fully transparent at rest (`color="transparent"`, no
 * background) so it can sit over a hero without its own visible chrome.
 * Once the page scrolls past the top (via MUI's own `useScrollTrigger`, no
 * custom scroll listener), it gains both `elevation={4}` and a translucent,
 * blurred background — otherwise page content would show straight through
 * the transparent bar instead of tucking underneath it. Pass an explicit
 * `elevation` prop to keep elevation fixed regardless of scroll position;
 * the background swap isn't independently overridable (it exists only to
 * keep the transparent-at-rest bar legible once content scrolls behind it).
 *
 * @example Zero config
 * ```tsx
 * <PublicNav />
 * ```
 *
 * @example Custom links and a routed sign-in page
 * ```tsx
 * <PublicNav
 *   navItems={[{ label: 'Work', href: '/work' }, { label: 'Blog', href: '/blog' }]}
 *   signInHref="/login"
 * />
 * ```
 *
 * **Quality status (10 Sep 2026):** DoD 25/27 · Best practices not re-audited — SonarQube not verified · `yalc push` validation not run (no consuming app available in this environment)
 */
declare const PublicNav: React__default.ForwardRefExoticComponent<Omit<PublicNavProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Theme-derived inputs handed to a `BrandLogo` consumer's `children` render
 * function. Resolved from the active Giselle MUI theme — themed by default,
 * overridable by the consuming app the same way any other theme token is
 * (via the theme passed into `GiselleThemeProvider`), with no separate
 * override API of its own.
 */
interface BrandLogoThemeInputs {
    /** The theme's resolved primary palette shades. */
    colors: {
        light: string;
        main: string;
        dark: string;
    };
    /**
     * Returns a DOM id for the given gradient name, unique to this `BrandLogo`
     * instance. Use it for every SVG `<linearGradient id>` your artwork
     * defines, so multiple `BrandLogo` instances rendered on one page never
     * collide over shared gradient ids.
     */
    getGradientId: (name: string) => string;
}
interface BrandLogoProps extends Omit<LinkProps, 'children'> {
    /**
     * Renders the brand mark's own SVG artwork (the full `<svg>...</svg>`,
     * including its own `viewBox`). The mark's geometry is the consuming
     * app's concern, not this library's — `BrandLogo` only resolves themed
     * colors and generates collision-safe gradient ids for it to use.
     */
    children: (inputs: BrandLogoThemeInputs) => React.ReactNode;
    /**
     * Disables pointer events on the root link.
     * @default false
     */
    disabled?: boolean;
}

/**
 * `BrandLogo` — a themed link shell for a brand mark, colored entirely
 * from theme palette tokens.
 *
 * `BrandLogo` owns no artwork of its own. The mark's actual SVG geometry is
 * the consuming app's concern — `BrandLogo` only resolves themed colors
 * (Giselle-themed by default, overridable by the consumer like any other
 * theme token, with no separate override API) and generates collision-safe
 * gradient ids, handing both to `children` to render the artwork with.
 *
 * `BrandLogo` never imports a routing library — it renders a plain MUI
 * `Link` with an `href` prop, matching this library's standing rule that
 * components stay routing-agnostic.
 *
 * @example
 * ```tsx
 * <BrandLogo href="/">
 *   {({ colors, getGradientId }) => (
 *     <svg viewBox="0 0 100 100" width="100%" height="100%">
 *       <defs>
 *         <linearGradient id={getGradientId('mark')} x1="0" y1="0" x2="1" y2="1">
 *           <stop stopColor={colors.dark} />
 *           <stop offset="1" stopColor={colors.light} />
 *         </linearGradient>
 *       </defs>
 *       <path d="..." fill={`url(#${getGradientId('mark')})`} />
 *     </svg>
 *   )}
 * </BrandLogo>
 * ```
 */
declare const BrandLogo: React__default.ForwardRefExoticComponent<Omit<BrandLogoProps, "ref"> & React__default.RefAttributes<HTMLAnchorElement>>;

/**
 * The real Alex Rebula brand mark — ported from the reference app's own
 * `Logo` component (`components/logo/logo.tsx`'s `singleLogo`, viewBox
 * `0 0 294 384`). `BrandLogo` itself still owns no artwork (see
 * `brand-logo.tsx`'s doc comment) — this is a separate, concrete asset for
 * consumers that specifically want the Alex Rebula mark rather than
 * supplying their own, e.g. `PublicNav`'s built-in `Logo` sub-component
 * (wiki#817). Kept out of `BrandLogo` itself so no particular consumer's
 * mark is ever assumed by default.
 */
declare function AlexRebulaBrandMark({ colors, getGradientId }: BrandLogoThemeInputs): React$1.JSX.Element;

/** One text link rendered inside a {@link PublicFooterLinkGroup}. */
interface PublicFooterLink {
    /** Link label. */
    name: string;
    /** Link destination. */
    href: string;
}
/** One headline + link-list column rendered in `PublicFooter`'s link-groups row. */
interface PublicFooterLinkGroup {
    /** Column headline, e.g. "Company" or "Legal". */
    headline: string;
    /** Ordered links rendered under the headline. */
    links: PublicFooterLink[];
}
/** One icon-only social link rendered in `PublicFooter`'s social row. */
interface PublicFooterSocialLink {
    /** Accessible label and tooltip text, e.g. "Twitter" or "LinkedIn". */
    label: string;
    /** Profile/page URL. */
    href: string;
    /** Icon rendered inside the button — use `<GiselleIcon ... />` to fill it. */
    icon: ReactNode;
}
/**
 * Props for {@link PublicFooter}.
 *
 * A Tier 3 composition component (per `docs/components/api-design-rules.md`): the
 * link-group and social-link arrays are the real API surface, not a specific MUI
 * base — `PublicFooter` extends `Omit<BoxProps, 'children'>` only for pass-through
 * root-element props (`sx`, `component`, etc.), since it owns `children` internally.
 */
interface PublicFooterProps extends Omit<BoxProps, 'children'> {
    /**
     * Logo/brand element rendered above the bio text.
     * @default a built-in wordmark link reading "Giselle"
     */
    logo?: ReactNode;
    /**
     * Short bio/tagline paragraph rendered under the logo.
     * @default a built-in sample tagline
     */
    bio?: ReactNode;
    /**
     * Icon-only social links rendered under the bio.
     * @default a built-in sample set (Twitter, Facebook, Instagram, LinkedIn)
     */
    socialLinks?: PublicFooterSocialLink[];
    /**
     * Headline + link-list columns rendered alongside the bio/social column.
     * @default a built-in sample set (site nav, legal, contact)
     */
    linkGroups?: PublicFooterLinkGroup[];
    /**
     * Name shown in the copyright line. The year is always computed at render
     * time — never hardcoded.
     * @default 'Giselle'
     */
    copyrightHolder?: string;
    /**
     * The MUI breakpoint at which the layout switches from a single centered
     * stacked column to a two-part row (bio/socials on the left, link-group
     * columns on the right).
     * @default 'md'
     */
    layoutQuery?: Breakpoint;
}

/**
 * `PublicFooter` — the standard site-wide footer for a public marketing site:
 * a logo, a short bio/tagline, a row of social icon buttons, multiple columns
 * of headline + link groups, and a copyright line with a dynamically computed
 * year.
 *
 * A Tier 3 composition component (per `docs/components/api-design-rules.md`):
 * `socialLinks` and `linkGroups` are data arrays, so the component is a thin
 * shell rendering them rather than a wrapper around one specific MUI base.
 *
 * ## Layout
 * Below `layoutQuery` (default `md`), the bio/socials block and the link-group
 * columns stack into one centered column. At and above it, they split into a
 * two-part row — bio/socials on the left, link-group columns on the right —
 * matching the structurally distinct desktop/mobile split `PublicNav` uses for
 * the header.
 *
 * ## Social icons
 * Reuses the existing `IconActionBar` primitive (icon + tooltip + optional
 * link) instead of a second icon-row component — the same reuse pattern
 * `ThemeToggleButton` follows for `ToggleIconButton` in `PublicNav`.
 *
 * ## Copyright year
 * Always computed via `new Date().getFullYear()` at render time — never a
 * hardcoded year.
 *
 * @example Zero config
 * ```tsx
 * <PublicFooter />
 * ```
 *
 * @example Custom brand and link groups
 * ```tsx
 * <PublicFooter
 *   logo={<Typography sx={{ fontWeight: 800 }}>Acme Co.</Typography>}
 *   copyrightHolder="Acme Co."
 *   linkGroups={[
 *     { headline: 'Product', links: [{ name: 'Pricing', href: '/pricing' }] },
 *   ]}
 * />
 * ```
 *
 * **Quality status (10 Sep 2026):** DoD 25/27 · Best practices not re-audited — SonarQube not verified · `yalc push` validation not run (no consuming app available in this environment)
 */
declare const PublicFooter: React__default.ForwardRefExoticComponent<Omit<PublicFooterProps, "ref"> & React__default.RefAttributes<HTMLElement>>;

/**
 * Props for the {@link BackToTopButton} component.
 *
 * Extends MUI `FabProps` — `color`, `size`, `disabled`, `sx`, and all other
 * `Fab` props are forwarded to the root element unchanged. `children` and
 * `onClick` are omitted because `BackToTopButton` owns them internally: it
 * always renders `icon` and always scrolls to the top on click.
 */
type BackToTopButtonProps = Omit<FabProps, 'children' | 'onClick'> & {
    /**
     * Scroll distance in px past which the button becomes visible.
     * @default 240
     */
    scrollThreshold?: number;
    /**
     * Icon rendered inside the button.
     * @default a built-in up-arrow icon
     */
    icon?: ReactNode;
};

/**
 * `BackToTopButton` — a floating button that appears once the page has been
 * scrolled past `scrollThreshold` and smooth-scrolls back to the top on click.
 *
 * Owns its own scroll tracking via {@link useScrollVisibility} — drop it in
 * with no props and it works. No framer-motion dependency: the show/hide
 * transition is a plain CSS `transform` transition, not a spring animation,
 * so this component ships in the main bundle rather than the `/motion`
 * subpath.
 *
 * @example
 * ```tsx
 * <BackToTopButton />
 *
 * // Custom icon and a lower reveal threshold
 * <BackToTopButton icon={<ArrowUpwardIcon />} scrollThreshold={120} />
 * ```
 *
 * **Quality status (13 Sep 2026):** DoD 26/27 · Best practices not audited — ported for wiki#791, `yalc` validation not run
 */
declare const BackToTopButton: React__default.ForwardRefExoticComponent<Omit<BackToTopButtonProps, "ref"> & React__default.RefAttributes<HTMLButtonElement>>;

/** Button size (width and height), in px. */
declare const BACK_TO_TOP_BUTTON_SIZE = 48;
/** WCAG 2.2 AA minimum touch target size, in px. */
declare const BACK_TO_TOP_BUTTON_WCAG_MIN_SIZE = 24;
/** Default scroll distance in px past which the button becomes visible. */
declare const BACK_TO_TOP_BUTTON_DEFAULT_SCROLL_THRESHOLD = 240;

/** Size scale for `TitledBlock` — controls spacing and title typography. */
type TitledBlockSize = 'small' | 'large';
/**
 * Props for `<TitledBlock>`.
 *
 * Not extending a single MUI component's props directly — `TitledBlock` composes
 * `Box` + `Typography` + `IconButton` internally, so `BoxProps` (its root element)
 * is extended only for style/passthrough props, with `title` and `children`
 * redeclared for this component's own contract.
 */
interface TitledBlockProps extends Omit<BoxProps, 'title' | 'children' | 'defaultValue'> {
    /** Block title, rendered above `children`. */
    title: ReactNode;
    /** Block content. */
    children: ReactNode;
    /** Controls spacing and title typography scale. @default 'small' */
    size?: TitledBlockSize;
    /**
     * Current value this block represents. Compared against `defaultValue`
     * (deep equality) to decide whether the reset action renders.
     */
    value?: unknown;
    /** Default value `value` is compared against. */
    defaultValue?: unknown;
    /**
     * Reset handler. The reset action only renders when this is provided
     * **and** `value` differs from `defaultValue` — matching the reference's
     * `canReset` behaviour.
     */
    onReset?: () => void;
    /** Icon slot for the reset action. @default a built-in "restart" icon */
    resetIcon?: ReactNode;
    /** Accessible label for the reset action button. @default 'Reset' */
    resetLabel?: string;
    /** MUI sx prop: forwarded to the root element. */
    sx?: SxProps<Theme>;
}

/**
 * `TitledBlock` — a titled group of related content, in a small/large size
 * scale, with an optional "reset to default" action.
 *
 * The reset action only renders when both `onReset` is provided **and**
 * `value` differs from `defaultValue` (deep comparison via `isDeepEqual`) —
 * matching the reference app's `canReset` behaviour. `value`/`defaultValue`
 * are plain data: `TitledBlock` does not depend on any particular state
 * source (it composes with `GiselleSettingsProvider`'s `state`/`defaultSettings`,
 * but works with any "current vs. default" value pair).
 *
 * @example
 * ```tsx
 * <TitledBlock
 *   title="Font size"
 *   size="small"
 *   value={fontSize}
 *   defaultValue={defaultFontSize}
 *   onReset={() => setFontSize(defaultFontSize)}
 * >
 *   <Slider value={fontSize} onChange={(_, v) => setFontSize(v as number)} />
 * </TitledBlock>
 * ```
 *
 * **Quality status (07 Sep 2026):** DoD n/27 = 26/27 · Best practices not re-audited
 */
declare const TitledBlock: React__default.ForwardRefExoticComponent<Omit<TitledBlockProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

type HeroSlotProps = {
    heading?: ReactNode;
    text?: ReactNode;
    actions?: ReactNode;
    icons?: ReactNode;
};

/**
 * Palette color key for the `HeroSection` background tint.
 */
type HeroColorKey = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
interface HeroSectionProps extends Omit<BoxProps, 'color'>, HeroSlotProps {
    /**
     * Primary headline slot. Required — a hero without a heading is not a hero.
     *
     * Render a `<Typography variant="h1">`, a `<SectionTitle>`, or any heading element.
     * `AnimatedGradientText` can be embedded here for an animated accent word.
     */
    heading: ReactNode;
    /**
     * MUI palette colour key used to derive the background tint.
     * The tint is `channelAlpha(mainChannel, 0.08)` — subtle, works in light and dark mode.
     * @default 'primary'
     */
    color?: HeroColorKey;
    /** MUI `sx` override on the root `Box`. */
    sx?: SxProps<Theme>;
}

/**
 * `HeroSection` — full-width, palette-tinted hero with heading, text, actions, and icon strip slots.
 *
 * Background is tinted using `channelAlpha(mainChannel, 0.08)` — works in light and
 * dark mode with zero hardcoded hex values. Content is constrained to `maxWidth="lg"`
 * and centred.
 *
 * Slot vocabulary is shared with `ScrollParallaxHero` — swap between them without
 * renaming props.
 *
 * **Usage:**
 * ```tsx
 * <HeroSection
 *   heading={<Typography variant="h1">Build something great</Typography>}
 *   text={<Typography variant="h5" color="text.secondary">A clean, accessible component library for MUI v7.</Typography>}
 *   actions={
 *     <>
 *       <Button variant="contained">Get started</Button>
 *       <Button variant="outlined">View docs</Button>
 *     </>
 *   }
 *   icons={<TechIconStrip title="Built with" centeredWrap items={stackItems} />}
 * />
 * ```
 *
 * **Tint colour:**
 * ```tsx
 * <HeroSection heading="Success hero" color="success" />
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices 13/13 — SonarQube not verified
 */
declare function HeroSection({ heading, text, actions, icons, color, sx, ...other }: HeroSectionProps): React$1.JSX.Element;

/** One high-impact stat block shown above an item's long description. */
interface FeatureFlowMetric {
    /** Large headline value, e.g. `'20+'`. */
    value: string;
    label: string;
    sublabel?: string;
    /** Iconify icon name, rendered via `GiselleIcon`. */
    icon?: string;
}
/**
 * One technology/tool entry for an item's tech chip list.
 * The consumer owns icon resolution entirely: no app-specific lookup map or
 * asset directory is involved. `icon` is an Iconify icon name, rendered via
 * `GiselleIcon`.
 */
interface FeatureFlowTechnology {
    name: string;
    icon: string;
}
/**
 * One slide in an item's highlight-card carousel. Deliberately generic
 * (`title`/`description`, not e.g. `headline`/`detail`) — this shape is
 * reused for any kind of documentation content, not just marketing
 * highlights (see #200): a skill-flow's individual skills, for instance,
 * are exactly a list of these.
 */
interface FeatureFlowHighlightCard {
    title: string;
    description: string;
    /** Slide background image. Falls back to a neutral placeholder when omitted. */
    media?: string;
    /** Optional link — e.g. to a full docs page for this card's subject. */
    href?: string;
}
/** A single feature/expertise item rendered in the description column. */
interface FeatureFlowItem {
    id: string;
    /** Iconify icon name, rendered via `GiselleIcon`. */
    icon: string;
    title: string;
    description: string;
    subtitle?: string;
    /** Per-item image sequence shown in the sticky image column on hover. */
    imgUrl?: readonly string[];
    /** Rich prose shown in the expanded detail panel. Falls back to `description`. */
    longDescription?: ReactNode;
    technologies?: readonly FeatureFlowTechnology[];
    highlightCards?: readonly FeatureFlowHighlightCard[];
    /** 1–3 high-impact stat blocks shown above the long description. */
    metrics?: readonly FeatureFlowMetric[];
}
/** The sticky image column's source(s). */
interface FeatureFlowImage {
    src: string;
    alt: string;
    sx?: SxProps<Theme>;
    /** Fallback hover-stack image sequence, used when an item has no `imgUrl`. */
    stackSources?: readonly string[];
    /**
     * Two image sources swapped based on page scroll direction.
     * Index 0 = scrolling down, index 1 = scrolling up. Takes priority over
     * `stackSources` while the page is actively scrolling.
     */
    scrollImages?: readonly [string, string];
}
type FeatureFlowGridSize = Readonly<{
    xs?: number;
    md?: number;
    lg?: number;
}>;
/**
 * Palette colour key for the expanded detail panel's background tint
 * (`detailPanelSx`) — same vocabulary as `HeroSectionProps['color']`, plus
 * `'grey'` for a neutral tint that matches a page's own background instead
 * of a brand colour (`grey` isn't a standard MUI `PaletteColor` with its own
 * `.main`/`.mainChannel`, so it's handled as its own case rather than being
 * part of the templated `--mui-palette-<key>-mainChannel` the other six share).
 */
type FeatureFlowDetailColorKey = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'grey';
interface FeatureFlowSectionProps extends Omit<BoxProps, 'children'> {
    caption?: string;
    title?: string;
    /** Gradient-accent word appended after `title`, rendered on its own span. */
    txtGradient?: string;
    description?: ReactNode;
    items: readonly FeatureFlowItem[];
    image: FeatureFlowImage;
    /** Which side the description column renders on. @default 'left' */
    layoutDirection?: 'left' | 'right';
    /** @default { xs: 0, md: 8 } */
    columnSpacing?: Readonly<{
        xs?: number;
        md?: number;
    }>;
    /** @default derived from `layoutDirection` */
    descriptionGridSize?: FeatureFlowGridSize;
    /** @default derived from `layoutDirection` */
    imageGridSize?: FeatureFlowGridSize;
    /**
     * Renders the standard `PageSection` decorative frame (corner marks,
     * border lines) around the whole section.
     * @default true
     */
    decoration?: boolean;
    /**
     * Overrides what renders in the image column: called with the currently
     * previewed item (hover, focus, or last-selected) and whether that
     * item's own detail panel is expanded. Defaults to the built-in
     * `FeatureFlowImageColumn` (driven by `image`) when omitted — for
     * example, a skills-documentation consumer could render a heading and
     * short description here instead of an image, swapping to a fuller
     * carousel-style view once expanded.
     */
    renderRightPanel?: (activeItem: FeatureFlowItem, isActiveExpanded: boolean) => ReactNode;
    /**
     * Overrides what renders in the expanded detail panel's right column:
     * called with the currently expanded item. Defaults to the built-in
     * `FeatureFlowHighlightCarousel` (gated on `item.highlightCards` being
     * non-empty) when omitted — e.g. a documentation consumer could render an
     * `Accordion` per highlight card instead of a one-at-a-time carousel.
     * Always called when provided, regardless of `item.highlightCards` — the
     * consumer decides what "no data" looks like, same as `renderRightPanel`.
     */
    renderHighlightPanel?: (item: FeatureFlowItem) => ReactNode;
    /**
     * Palette colour the expanded detail panel's background/border-top are
     * tinted with (`detailPanelSx`) — the same `channelAlpha(mainChannel, …)`
     * technique `HeroSectionProps['color']` uses, so it looks correct in both
     * light and dark mode with no hardcoded hex values. Pass `'grey'` for a
     * neutral tint that reads as part of the page rather than the brand
     * colour — useful when a consumer's own detail-panel content (e.g. an
     * `Accordion` via `renderHighlightPanel`) needs a plain backdrop to show
     * its own hover/expanded state against.
     * @default 'primary'
     */
    detailPanelColor?: FeatureFlowDetailColorKey;
    /**
     * `sx` merged onto the expanded detail panel's own root (after
     * `detailPanelSx`, so it can override anything `detailPanelColor` sets,
     * or any other built-in style) — distinct from this component's own root
     * `sx`, which targets the outer `<section>`, not the detail panel
     * specifically.
     */
    itemDetailSx?: SxProps<Theme>;
}

/**
 * `FeatureFlowSection` — a scrollable list of expandable feature items paired
 * with a sticky image column that reacts to hover and scroll direction.
 * Clicking an item with expansion data (metrics, technologies, highlight
 * cards, or a long description) opens a detail panel below the grid; a
 * floating sub-nav appears once any item is expanded and tracks which one
 * is active.
 *
 * @example
 * ```tsx
 * <FeatureFlowSection
 *   title="What I work on"
 *   items={[
 *     {
 *       id: 'design-systems',
 *       icon: 'solar:widget-bold-duotone',
 *       title: 'Design systems',
 *       description: 'Consistent, accessible UI at scale.',
 *       technologies: [{ name: 'React', icon: 'logos:react' }],
 *       metrics: [{ value: '20+', label: 'Components shipped' }],
 *     },
 *   ]}
 *   image={{ src: '/images/design-systems.png', alt: 'Design systems preview' }}
 * />
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 18/22 · Best practices 10/13 — SonarQube not verified · size-constant regression tests missing · not all six palette keys in stories · no Responsive story
 */
declare const FeatureFlowSection: React__default.ForwardRefExoticComponent<Omit<FeatureFlowSectionProps, "ref"> & React__default.RefAttributes<HTMLElement>>;

interface BioHeroLogo {
    src: string;
    alt: string;
}
interface BioHeroCta {
    label: string;
    href?: string;
    onClick?: () => void;
    /** @default 'contained' */
    variant?: 'contained' | 'outlined' | 'text';
    /** Anchor `target`, e.g. `'_blank'` for an external CTA. */
    target?: string;
    /** Anchor `rel`, e.g. `'noopener'` — pair with `target="_blank"`. */
    rel?: string;
}
/** Two-stop dark gradient overlay drawn over `backgroundImageUrl`. */
interface BioHeroBackgroundOverlay {
    /** Opacity at the bottom of the section (0–1). */
    startAlpha: number;
    /** Opacity at the top of the section (0–1). */
    endAlpha: number;
}
interface BioHeroSectionProps extends Omit<BoxProps, 'children'> {
    heading: ReactNode;
    /** Opening paragraph — rendered first among the structured body blocks. */
    intro?: ReactNode;
    /** A short, emphasized statement — rendered between `intro` and `experience`. */
    statement?: ReactNode;
    /** Closing/experience paragraph — rendered last among the structured body blocks. */
    experience?: ReactNode;
    /** Client/partner logo strip rendered below the body copy. */
    logos?: BioHeroLogo[];
    cta?: BioHeroCta;
    /**
     * Full-bleed background image, rendered behind the section content.
     * Ignored unless set — the section has no background by default.
     */
    backgroundImageUrl?: string;
    /** Dark gradient drawn over `backgroundImageUrl`. Ignored if `backgroundImageUrl` isn't set. */
    backgroundOverlay?: BioHeroBackgroundOverlay;
    /**
     * Content alignment on `md` and up. Always centered below `md`, regardless of this
     * setting — matching the reference app's own responsive behavior.
     * @default 'center'
     */
    align?: 'center' | 'left';
}

/**
 * `BioHeroSection` — about/bio-style hero: heading, structured body copy
 * (`intro`/`statement`/`experience`), an optional full-bleed background image
 * with a dark gradient overlay, an optional client/partner logo strip, and a
 * single primary call-to-action.
 *
 * The `cta` renders as a plain MUI `Button` driven by structured props —
 * this component has no `framer-motion` dependency, so it does not use the
 * `/motion`-subpath `HeroButtonsRow` for its CTA slot, which would force
 * that peer dependency onto every consumer.
 *
 * When `backgroundImageUrl` is set, body-copy text switches to white for
 * contrast against the image + overlay; without it, text uses the theme's
 * normal foreground colors.
 *
 * @example
 * ```tsx
 * <BioHeroSection
 *   heading={<Typography variant="h1">Jane Doe</Typography>}
 *   intro={<Typography variant="h5">Product designer & engineer.</Typography>}
 *   statement={<Typography>What I enjoy most is...</Typography>}
 *   experience={<Typography>I've worked across...</Typography>}
 *   backgroundImageUrl="/images/about-hero.jpg"
 *   backgroundOverlay={{ startAlpha: 0.9, endAlpha: 0.35 }}
 *   logos={[{ src: '/logos/acme.svg', alt: 'Acme' }]}
 *   cta={{ label: 'Get in touch', href: '/contact', target: '_blank', rel: 'noopener' }}
 *   align="left"
 * />
 * ```
 *
 * **Quality status (12 Sep 2026):** DoD 21/22 · Best practices not re-audited — SonarQube not verified
 */
declare const BioHeroSection: React__default.ForwardRefExoticComponent<Omit<BioHeroSectionProps, "ref"> & React__default.RefAttributes<HTMLElement>>;

interface IntegrationsShowcaseImage {
    src: string;
    alt: string;
}
interface IntegrationsShowcaseSectionProps extends Omit<BoxProps, 'title'> {
    /** Short overline label rendered above the heading — proxied to `SectionTitle`. */
    caption?: ReactNode;
    /** Main heading text — proxied to `SectionTitle`. */
    title: ReactNode;
    /** Gradient-accent word appended to `title` — proxied to `SectionTitle`. */
    txtGradient?: string;
    /** Supporting description text below the heading — proxied to `SectionTitle`. */
    description?: ReactNode;
    /** The single large illustration/screenshot rendered in the right column. */
    image: IntegrationsShowcaseImage;
}

/**
 * `IntegrationsShowcaseSection` — a two-column marketing block: a
 * `SectionTitle` (caption/title/gradient/description) on one side, a single
 * large illustration or screenshot on the other, framed with a decorative
 * dot-bracket + vertical line accent at the column boundary. The accent
 * group and the illustration animate in once on scroll into view; the
 * heading/description do not.
 *
 * Distinct from `FeatureFlowSection` (scrollable item list + sticky
 * crossfading image + expand panel) — this component has no interactive
 * state; its only use of `framer-motion` is a one-time entrance reveal.
 *
 * @example
 * ```tsx
 * <IntegrationsShowcaseSection
 *   caption="Integrations"
 *   title="Connect your stack"
 *   description="Works with the tools your team already uses."
 *   image={{ src: '/screenshots/dashboard.png', alt: 'Product dashboard' }}
 * />
 * ```
 *
 * **Quality status (06 Sep 2026):** DoD 21/22 · Best practices not re-audited — SonarQube not verified
 */
declare const IntegrationsShowcaseSection: React__default.ForwardRefExoticComponent<Omit<IntegrationsShowcaseSectionProps, "ref"> & React__default.RefAttributes<HTMLElement>>;

/** Responsive masonry column counts, one per MUI breakpoint. All keys optional. */
interface TestimonialsWallColumns {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}
/** A single card in the wall — fully prop-driven, no hardcoded content. */
interface TestimonialWallItem {
    /** Stable identity for the React list key. */
    id: string;
    /** The quoted testimonial/recommendation text. */
    quote: ReactNode;
    /** The person being quoted. */
    authorName: string;
    /** Short supporting line under the name (role, company, relationship — caller's choice). */
    authorRole?: ReactNode;
    /** Avatar image URL. When absent, the avatar falls back to the author's initial. */
    avatarSrc?: string;
    /** When the testimonial was given. Accepts a `Date` or an ISO-parsable string. */
    date: Date | string;
    /** External URL to the original testimonial (e.g. a LinkedIn recommendation, a review site). */
    sourceUrl?: string;
    /** Accessible label/text for the source link. @default 'View source' */
    sourceLabel?: string;
}
interface TestimonialsWallSectionProps extends Omit<BoxProps, 'title'> {
    /** Short overline label rendered above the heading. Only rendered when `title` is also supplied. */
    caption?: ReactNode;
    /** Main heading text. The whole heading column (caption/title/description) is omitted when this is absent. */
    title?: ReactNode;
    /** Gradient-accent word appended to `title` — proxied to `SectionTitle`. */
    txtGradient?: string;
    /** Supporting description text below the heading. Only rendered when `title` is also supplied. */
    description?: ReactNode;
    /** The testimonial cards to render. An empty array renders the section with no cards. */
    items: TestimonialWallItem[];
    /**
     * Optional background image URL. When supplied, the root gets a tinted-dark
     * background treatment and cards switch to a frosted-glass surface with
     * light text, matching a common "wall over hero imagery" marketing pattern.
     */
    backgroundImageUrl?: string;
    /**
     * Responsive masonry column counts.
     * @default { xs: 1, sm: 2, md: 3 }
     */
    columns?: TestimonialsWallColumns;
    /**
     * Masonry gutter, in theme spacing units.
     * @default 3
     */
    spacing?: number;
    /** One section-level "view source" button below the heading — distinct from each item's own per-card `sourceUrl`. Omitted when not supplied. */
    sourceUrl?: string;
    /** Label for the section-level source button. @default 'View source' */
    sourceLabel?: string;
}

/**
 * `TestimonialsWallSection` — a masonry (responsive multi-column) wall of
 * testimonial/recommendation cards, each showing an avatar, author name,
 * date, quoted text, and an optional "view source" link. Fully prop-driven:
 * no hardcoded testimonial content.
 *
 * An optional `caption`/`title`/`description` heading renders in its own
 * column next to the wall (hidden entirely when none are supplied), and an
 * optional `backgroundImageUrl` switches the whole section to a dark,
 * tinted-image treatment with frosted-glass cards.
 *
 * Distinct from `QuoteCard`, which is a single block-quote primitive, not a
 * multi-card wall layout.
 *
 * **Checked against the reference** (a private consuming app's own testimonials
 * page section): this reproduces its masonry-over-background-image
 * treatment, its per-card anatomy (quote mark, quote, avatar, name,
 * role/date line), and its scroll-triggered staggered entrance animation —
 * none of which the ticket's own acceptance criteria spelled out. The
 * reference's single "view source" CTA under the heading is now supported
 * too, via the generic `sourceUrl`/`sourceLabel` props (added once a real
 * ticket asked for it — see README.md "Design decisions" for why it wasn't
 * added speculatively when this component was first built, and the two-column
 * layout's default column count, which stayed deliberately different).
 *
 * @example
 * ```tsx
 * <TestimonialsWallSection
 *   caption="Testimonials"
 *   title="What people say"
 *   items={[
 *     {
 *       id: '1',
 *       quote: 'A genuinely great collaborator.',
 *       authorName: 'Jordan Rivera',
 *       authorRole: 'Engineering Lead',
 *       date: '2026-01-12',
 *     },
 *   ]}
 * />
 * ```
 *
 * **Quality status (12 Sep 2026):** DoD 21/22 · Best practices not re-audited — SonarQube not verified. Re-checked after adding the section-level `sourceUrl`/`sourceLabel` CTA; score unchanged (new prop follows the same structural criteria already met).
 */
declare const TestimonialsWallSection: React__default.ForwardRefExoticComponent<Omit<TestimonialsWallSectionProps, "ref"> & React__default.RefAttributes<HTMLElement>>;

/**
 * Maps a maturity/readiness percentage to a MUI palette key.
 *
 * Colours follow **MUI semantic conventions** — not the mango visual palette.
 * The mango metaphor (green = unripe, golden = ripe) is brand language used
 * in release stage labels (`resolveMaturityLabel`) and docs. The colour
 * mapping here defers to MUI standards so components read correctly to any
 * MUI-fluent developer regardless of the brand story.
 *
 * | Range    | Palette key  | Semantic meaning      |
 * |----------|--------------|-----------------------|
 * | 0–19 %   | `'error'`    | Blocked / not started |
 * | 20–39 %  | `'warning'`  | Early / at risk       |
 * | 40–59 %  | `'info'`     | In progress           |
 * | 60–79 %  | `'primary'`  | On track              |
 * | 80–100 % | `'success'`  | Stable / shipped      |
 *
 * The function clamps the input to `[0, 100]` before mapping.
 *
 * **Typical usage — derive `color` from readiness data:**
 * ```tsx
 * <StatCard
 *   label="Store Readiness"
 *   value="35%"
 *   color={resolveMaturityColor(35)}
 * />
 * ```
 */
declare function resolveMaturityColor(percent: number): StatCardColor;
/**
 * Returns a human-readable ripeness label for a maturity percentage.
 * Useful for `aria-label` text and tooltip descriptions.
 *
 * @example resolveMaturityLabel(35) → 'Early stage'
 */
declare function resolveMaturityLabel(percent: number): string;

/** Palette color keys accepted by AnimatedGradientText. */
type PaletteColorKey = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
interface AnimatedGradientTextProps extends Omit<BoxProps, 'color'> {
    /**
     * Palette color key for the gradient start and loop-back color.
     * @default 'primary'
     */
    color1?: PaletteColorKey;
    /**
     * Palette color key for the gradient midpoint color.
     * @default 'secondary'
     */
    color2?: PaletteColorKey;
    /**
     * Animation cycle duration in seconds. Must be positive.
     * @default 3
     */
    duration?: number;
}

/**
 * Displays children as continuously animated gradient text.
 *
 * The gradient cycles between `color1` and `color2` using CSS
 * `backgroundPosition` animation — no JavaScript animation loop.
 * Uses `var(--mui-palette-*)` CSS custom properties, so it adapts to
 * light/dark mode automatically.
 *
 * Renders as `<span>` by default; override with the `component` prop.
 *
 * @example
 * ```tsx
 * <Typography variant="h2">
 *   <AnimatedGradientText color1="primary" color2="secondary">
 *     Open Source
 *   </AnimatedGradientText>
 * </Typography>
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices not re-audited — SonarQube not verified · size-constant regression tests missing
 */
declare function AnimatedGradientText({ children, color1, color2, duration, component, sx, ...other }: AnimatedGradientTextProps): React$1.JSX.Element;

/** One icon + label pair in a TechIconStrip. */
interface TechIconItem {
    /** Icon node — any `ReactNode` (GiselleIcon, SVG, `<img>`, etc.). */
    icon: ReactNode;
    /**
     * Display label shown below the icon.
     * Must be unique within the `items` array — used as the React list key.
     */
    label: string;
}
interface TechIconStripProps extends Omit<BoxProps, 'children' | 'title'> {
    /** Array of icon + label pairs to display. */
    items: TechIconItem[];
    /** Optional section heading rendered above the strip as `overline` text. */
    heading?: string;
    /**
     * When `true`, items wrap around the horizontal centre rather than
     * left-aligning to the container edge.
     * @default false
     */
    centeredWrap?: boolean;
}

/**
 * Horizontal strip of icon + label pairs.
 *
 * Use for "Technologies used", "Built with", or any icon-labelled collection.
 * The strip wraps automatically when the container is too narrow.
 *
 * A thin preset over the shared `IconStrip` base (`material/data-display/icon/icon-strip`,
 * wiki#805) — this component owns no icon size or color of its own. Both come
 * entirely from whatever `ReactNode` each item's `icon` is, e.g.
 * `<GiselleIcon icon="..." width={32} />`. Previously this component forced every
 * icon to 32px via CSS regardless of what the consumer passed — that enforcement
 * is gone; pass the size you actually want per icon.
 *
 * @example
 * ```tsx
 * <TechIconStrip
 *   heading="Technologies"
 *   items={[
 *     { icon: <GiselleIcon icon="solar:code-bold" width={32} />, label: 'TypeScript' },
 *     { icon: <GiselleIcon icon="solar:database-bold" width={32} />, label: 'PostgreSQL' },
 *   ]}
 * />
 * ```
 *
 * **Quality status (13 Sep 2026):** DoD not yet re-audited — refactored onto shared `IconStrip` base (wiki#805)
 */
declare function TechIconStrip({ items, heading, centeredWrap, sx, ...other }: TechIconStripProps): React$1.JSX.Element;

/** One client/partner logo in a ClientLogoStrip. */
interface ClientLogoStripItem {
    /** Logo image source. */
    src: string;
    /** Alt text — should identify the client/partner by name. */
    alt: string;
}
interface ClientLogoStripProps extends Omit<BoxProps, 'children'> {
    /** Array of client/partner logos to display. */
    logos: ClientLogoStripItem[];
    /**
     * MUI `sx` applied to the flex row that actually holds the logos — use this
     * for alignment/spacing that must reach the row itself (e.g. `justifyContent`,
     * `mt`). The component's own `sx` prop applies to the outer wrapper instead.
     */
    listSx?: BoxProps['sx'];
}

/**
 * `ClientLogoStrip` — a row of client/partner brand logos, each forced to a
 * flat white silhouette (`brightness(0) invert(1)`) so any source logo
 * colors read cleanly over a dark background. Matches the reference app's
 * own `ClientLogoStrip` (`icon-strip/client-logo-strip.tsx`) pixel-for-pixel:
 * 20px logo height, 12px gap, same filter.
 *
 * A thin preset over the shared `IconStrip` base (`material/data-display/icon/icon-strip`,
 * wiki#805) — this component's own concern is exactly the logo image styling
 * (`clientLogoStripImageSx`); layout (flex row, wrap, gap) is `IconStrip`'s.
 *
 * @example
 * ```tsx
 * <ClientLogoStrip
 *   logos={[
 *     { src: '/logos/acme.svg', alt: 'Acme logo' },
 *     { src: '/logos/globex.svg', alt: 'Globex logo' },
 *   ]}
 * />
 * ```
 *
 * **Quality status (13 Sep 2026):** new component, not yet audited
 */
declare function ClientLogoStrip({ logos, sx, listSx, ...other }: ClientLogoStripProps): React$1.JSX.Element;

/** One item in an `IconStrip`. */
interface IconStripItem {
    /** Unique key for this item within the strip. */
    key: string;
    /**
     * The icon or logo to render — fully caller-composed (e.g.
     * `<GiselleIcon icon="solar:code-bold" width={32} sx={{ color: 'primary.main' }} />`
     * or `<Box component="img" src="/logo.svg" sx={{ height: 20 }} />`). `IconStrip`
     * applies no size or color of its own — both come entirely from whatever the
     * caller passes here.
     */
    icon: ReactNode;
    /**
     * Optional caption rendered below the icon. When present, `icon` is wrapped in
     * an `aria-hidden` slot (the label carries the accessible meaning). When
     * omitted, `icon` renders directly with no wrapper — it must then carry its
     * own accessible name (e.g. an `<img alt="...">`, or an icon with its own
     * `aria-label`).
     */
    label?: ReactNode;
    /**
     * Optional tooltip shown on hover/focus, wrapping whichever content this item
     * renders (a bare icon, or an icon + `label` pair). Independent of `label` —
     * an item can have a visible `label`, a hover-only `tooltip`, both, or neither.
     */
    tooltip?: ReactNode;
}
interface IconStripProps extends Omit<BoxProps, 'children' | 'title'> {
    /** Items to render — icon + label pairs, or bare icons/logos. */
    items: IconStripItem[];
    /** Optional overline heading rendered above the strip. */
    heading?: ReactNode;
    /**
     * When `true`, items wrap around the horizontal centre rather than
     * left-aligning to the container edge.
     * @default false
     */
    centeredWrap?: boolean;
    /**
     * Gap (theme spacing units) between items.
     * @default 3
     */
    gap?: number;
    /**
     * MUI `sx` applied to the flex row that actually holds the items. Use this
     * for alignment/spacing that must reach the row itself (e.g. `justifyContent`,
     * `mt`) — the strip's own `sx` prop (via `BoxProps`) applies to the outer
     * wrapper instead, which also contains `heading` when set.
     */
    listSx?: BoxProps['sx'];
}

/**
 * `IconStrip` — generic base for every icon/logo row in this library
 * (`TechIconStrip`, `ClientLogoStrip`, `PlatformIconStrip`, and any future
 * preset): an optional overline heading, a wrapping flex row of items, and
 * one consistent item shape (`{ icon, label?, tooltip? }`).
 *
 * Deliberately owns **no** icon size or color. `icon` is a fully
 * caller-composed `ReactNode` — a `GiselleIcon` with its own `width`/`sx`, a
 * `Box component="img"` with its own `sx`, anything. This strip only lays
 * items out; each named preset supplies its own default sizing/coloring by
 * constructing that `ReactNode` itself rather than asking this component to
 * enforce it.
 *
 * `label` and `tooltip` are independent: an item can have a visible caption,
 * a hover-only tooltip, both, or neither.
 *
 * @example
 * ```tsx
 * <IconStrip
 *   heading="Technologies"
 *   items={[
 *     { key: 'ts', icon: <GiselleIcon icon="logos:typescript-icon" width={32} />, label: 'TypeScript' },
 *     { key: 'logo', icon: <Box component="img" src="/logo.svg" alt="Acme" sx={{ height: 20 }} /> },
 *     { key: 'react', icon: <GiselleIcon icon="logos:react" width={24} />, tooltip: 'React' },
 *   ]}
 * />
 * ```
 *
 * **Quality status (13 Sep 2026):** new component, not yet audited
 */
declare function IconStrip({ items, heading, centeredWrap, gap, sx, listSx, ...other }: IconStripProps): React__default.JSX.Element;

/** One item in a `PlatformIconStrip` — a bare icon, optionally tooltipped. */
interface PlatformIconStripItem {
    /** Unique key for this item within the strip. */
    key: string;
    /**
     * The icon to render — fully caller-composed (e.g.
     * `<GiselleIcon icon="logos:react" width={24} />`). No size or color is
     * applied by this component; the `icon` node governs both.
     */
    icon: ReactNode;
    /**
     * Hover/focus tooltip naming this icon. Since items render with no visible
     * caption, either this or the `icon` node's own accessible name (e.g. an
     * `aria-label`) should identify it.
     */
    tooltip?: ReactNode;
}
interface PlatformIconStripProps extends Omit<BoxProps, 'children' | 'title'> {
    /** Icons to display — bare, tooltip-identified, no visible per-item caption. */
    items: PlatformIconStripItem[];
    /** Optional overline heading rendered above the strip. */
    title?: ReactNode;
    /**
     * When `true`, items wrap around the horizontal centre rather than
     * left-aligning to the container edge.
     * @default false
     */
    centeredWrap?: boolean;
}

/**
 * `PlatformIconStrip` — a row of bare, tooltip-identified icons (technologies,
 * platforms, tools) with no visible per-item caption — matching the reference
 * app's own compact "tools I use" treatment, distinct from `TechIconStrip`'s
 * icon-plus-visible-caption pattern.
 *
 * A thin preset over the shared `IconStrip` base (`material/data-display/icon/icon-strip`,
 * wiki#806) — this component owns no icon size or color; both come entirely
 * from whatever `ReactNode` each item's `icon` is.
 *
 * @example
 * ```tsx
 * <PlatformIconStrip
 *   title="Tools I Use"
 *   centeredWrap
 *   items={[
 *     { key: 'react', icon: <GiselleIcon icon="logos:react" width={24} />, tooltip: 'React' },
 *     { key: 'ts', icon: <GiselleIcon icon="logos:typescript-icon" width={24} />, tooltip: 'TypeScript' },
 *   ]}
 * />
 * ```
 *
 * **Quality status (13 Sep 2026):** new component, not yet audited
 */
declare function PlatformIconStrip({ items, title, centeredWrap, sx, ...other }: PlatformIconStripProps): React$1.JSX.Element;

/** One selectable option — the visible `label` can differ from the stored `value`. */
type RHFSelectOption = {
    label: string;
    value: string | number;
};
/**
 * Props for `<RHFSelect>` — a controlled MUI `Select` wired to a
 * react-hook-form field via `Controller`/`useFormContext`. See README.md
 * for the design rationale.
 *
 * Extends `SelectProps` (minus `name`/`value`/`onChange`/`onBlur`/`error`
 * — all owned by the react-hook-form `Controller` render prop, not
 * settable by the caller) so the rest of MUI `Select`'s public API
 * (`multiple`, `size`, `variant`, `disabled`, ...) passes straight through
 * via `{...other}`.
 */
interface RHFSelectProps extends Omit<SelectProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'error' | 'children'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /** The options rendered as `MenuItem`s, in order. */
    options: RHFSelectOption[];
    label?: ReactNode;
    helperText?: ReactNode;
}

/**
 * RHFSelect — a MUI `Select` controlled by a react-hook-form field via
 * `Controller`/`useFormContext`. Must be rendered inside a `<Form>` (or any
 * other react-hook-form `FormProvider`) so `useFormContext()` can find the
 * form's `control`.
 *
 * Unlike `TextField`, MUI's bare `Select` has no built-in label/helper-text
 * slot, so this wraps it in its own `FormControl`/`InputLabel`/`FormHelperText`
 * — giving callers the same all-in-one ergonomics `RHFTextField` already
 * provides.
 *
 * Built fresh against the official react-hook-form `Controller` API and
 * MUI's own `Select` docs — not ported from any vendor source.
 *
 * @example
 * <RHFSelect name="country" label="Country" options={[{ label: 'USA', value: 'us' }]} />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFSelect: React__default.ForwardRefExoticComponent<Omit<RHFSelectProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;
/**
 * Props for `<RHFMultiSelect>` — a controlled MUI `Select` (`multiple`)
 * wired to a react-hook-form field via `Controller`/`useFormContext`. See
 * README.md for the design rationale.
 *
 * Reuses `RHFSelectOption` from the sibling `rhf-select/` folder rather than
 * duplicating the same `{ label; value }` shape.
 *
 * Extends `SelectProps` (minus `name`/`value`/`onChange`/`onBlur`/`error`/
 * `multiple` — all owned by this component or the react-hook-form
 * `Controller` render prop, not settable by the caller) so the rest of MUI
 * `Select`'s public API (`size`, `variant`, `disabled`, ...) passes straight
 * through via `{...other}`.
 */
type RHFMultiSelectProps = DistributiveOmit<SelectProps<(string | number)[]>, 'name' | 'value' | 'onChange' | 'onBlur' | 'error' | 'children' | 'multiple'> & {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /** The options rendered as `MenuItem`s, in order. */
    options: RHFSelectOption[];
    label?: ReactNode;
    helperText?: ReactNode;
};

/**
 * RHFMultiSelect — a MUI `Select` (`multiple`) controlled by an
 * array-valued react-hook-form field via `Controller`/`useFormContext`.
 * Must be rendered inside a `<Form>` (or any other react-hook-form
 * `FormProvider`) so `useFormContext()` can find the form's `control`.
 *
 * Sibling to `RHFSelect` (single-select) rather than a variant of it — MUI's
 * `Select` needs an array value and a checkbox-per-option render for
 * `multiple`, so the two components diverge enough in their `Controller`
 * wiring to stay separate rather than share one file behind a `multiple`
 * prop switch. Reuses `RHFSelect`'s `RHFSelectOption` type and
 * `MenuItem`-per-option pattern instead of duplicating them.
 *
 * Built fresh against the official react-hook-form `Controller` API and
 * MUI's own `Select` (multi-select) docs — not ported from any vendor
 * source.
 *
 * @example
 * <RHFMultiSelect name="tags" label="Tags" options={[{ label: 'Urgent', value: 'urgent' }]} />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFMultiSelect: React__default.ForwardRefExoticComponent<(Omit<Omit<_mui_material_Select.FilledSelectProps & _mui_material_Select.BaseSelectProps<(string | number)[]>, "children" | "name" | "onBlur" | "onChange" | "error" | "multiple" | "value"> & {
    name: string;
    options: RHFSelectOption[];
    label?: React__default.ReactNode;
    helperText?: React__default.ReactNode;
}, "ref"> | Omit<Omit<_mui_material_Select.StandardSelectProps & _mui_material_Select.BaseSelectProps<(string | number)[]>, "children" | "name" | "onBlur" | "onChange" | "error" | "multiple" | "value"> & {
    name: string;
    options: RHFSelectOption[];
    label?: React__default.ReactNode;
    helperText?: React__default.ReactNode;
}, "ref"> | Omit<Omit<_mui_material_Select.OutlinedSelectProps & _mui_material_Select.BaseSelectProps<(string | number)[]>, "children" | "name" | "onBlur" | "onChange" | "error" | "multiple" | "value"> & {
    name: string;
    options: RHFSelectOption[];
    label?: React__default.ReactNode;
    helperText?: React__default.ReactNode;
}, "ref">) & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<RHFCheckbox>` — a single controlled MUI `Checkbox` wired to a
 * react-hook-form field via `Controller`/`useFormContext`. See README.md for
 * the design rationale.
 *
 * Extends `CheckboxProps` (minus `name`/`checked`/`onChange`/`onBlur`/`value`
 * — all owned by the react-hook-form `Controller` render prop, not settable
 * by the caller) so the rest of MUI `Checkbox`'s public API (`size`,
 * `color`, `disabled`, ...) passes straight through via `{...other}`.
 */
interface RHFCheckboxProps extends Omit<CheckboxProps, 'name' | 'checked' | 'onChange' | 'onBlur' | 'value'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /** Rendered next to the checkbox via `FormControlLabel`. */
    label?: ReactNode;
    helperText?: ReactNode;
}

/**
 * RHFCheckbox — a single MUI `Checkbox` controlled by a react-hook-form
 * boolean field via `Controller`/`useFormContext`. Must be rendered inside a
 * `<Form>` (or any other react-hook-form `FormProvider`) so
 * `useFormContext()` can find the form's `control`.
 *
 * Bare `Checkbox` has no label/helper-text slot of its own, so this wraps it
 * in `FormControl`/`FormControlLabel`/`FormHelperText` — the same
 * all-in-one ergonomics `RHFTextField`/`RHFSelect` already provide.
 *
 * Built fresh against the official react-hook-form `Controller` API and
 * MUI's own `Checkbox` docs — not ported from any vendor source.
 *
 * @example
 * <RHFCheckbox name="acceptTerms" label="I accept the terms" />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFCheckbox: React__default.ForwardRefExoticComponent<Omit<RHFCheckboxProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/** One checkbox in an `<RHFMultiCheckbox>` group — the visible `label` can differ from the stored `value`. */
type RHFMultiCheckboxOption = {
    label: string;
    value: string | number;
};
/**
 * Props for `<RHFMultiCheckbox>` — a group of MUI `Checkbox`es bound to a
 * single react-hook-form field whose value is an array, wired via
 * `Controller`/`useFormContext`. See README.md for the design rationale.
 *
 * Extends `CheckboxProps` (minus `name`/`checked`/`onChange`/`onBlur`/`value`
 * — all owned internally, not settable by the caller) so per-checkbox MUI
 * props (`size`, `color`, `disabled`, ...) pass through to every option via
 * `{...other}`.
 */
interface RHFMultiCheckboxProps extends Omit<CheckboxProps, 'name' | 'checked' | 'onChange' | 'onBlur' | 'value'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults, and hold an array value. */
    name: string;
    /** The checkboxes rendered, in order. */
    options: RHFMultiCheckboxOption[];
    /** Rendered above the group via `FormLabel`. */
    label?: ReactNode;
    helperText?: ReactNode;
    /** Lays the group out horizontally instead of the default vertical stack. */
    row?: boolean;
}

/**
 * RHFMultiCheckbox — a group of MUI `Checkbox`es bound to a single
 * react-hook-form field whose value is an array, wired via
 * `Controller`/`useFormContext`. Must be rendered inside a `<Form>` (or any
 * other react-hook-form `FormProvider`) so `useFormContext()` can find the
 * form's `control`.
 *
 * Checking an option's checkbox appends its `value` to the field's array;
 * unchecking it removes that `value` — the field never holds anything but
 * an array of the currently-checked option values.
 *
 * Built fresh against the official react-hook-form `Controller` API and
 * MUI's own `Checkbox`/`FormGroup` docs — not ported from any vendor source.
 *
 * @example
 * <RHFMultiCheckbox
 *   name="channels"
 *   label="Notify me via"
 *   options={[{ label: 'Email', value: 'email' }, { label: 'SMS', value: 'sms' }]}
 * />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFMultiCheckbox: React__default.ForwardRefExoticComponent<Omit<RHFMultiCheckboxProps, "ref"> & React__default.RefAttributes<HTMLFieldSetElement>>;

/**
 * Props for `<RHFSwitch>` — a single controlled MUI `Switch` wired to a
 * react-hook-form field via `Controller`/`useFormContext`. See README.md for
 * the design rationale.
 *
 * Extends `SwitchProps` (minus `name`/`checked`/`onChange`/`onBlur`/`value`
 * — all owned by the react-hook-form `Controller` render prop, not settable
 * by the caller) so the rest of MUI `Switch`'s public API (`size`, `color`,
 * `disabled`, ...) passes straight through via `{...other}`.
 */
interface RHFSwitchProps extends Omit<SwitchProps, 'name' | 'checked' | 'onChange' | 'onBlur' | 'value'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /** Rendered next to the switch via `FormControlLabel`. */
    label?: ReactNode;
    helperText?: ReactNode;
}

/**
 * RHFSwitch — a single MUI `Switch` controlled by a boolean react-hook-form
 * field via `Controller`/`useFormContext`. Must be rendered inside a
 * `<Form>` (or any other react-hook-form `FormProvider`) so
 * `useFormContext()` can find the form's `control`.
 *
 * Bare `Switch` has no label/helper-text slot of its own, so this wraps it
 * in `FormControl`/`FormControlLabel`/`FormHelperText` — the same
 * all-in-one ergonomics `RHFTextField`/`RHFSelect`/`RHFCheckbox` already
 * provide.
 *
 * Built fresh against the official react-hook-form `Controller` API and
 * MUI's own `Switch` docs — not ported from any vendor source.
 *
 * @example
 * <RHFSwitch name="notifications" label="Enable notifications" />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFSwitch: React__default.ForwardRefExoticComponent<Omit<RHFSwitchProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/** One switch in an `<RHFMultiSwitch>` group — the visible `label` can differ from the stored `value`. */
type RHFMultiSwitchOption = {
    label: string;
    value: string | number;
};
/**
 * Props for `<RHFMultiSwitch>` — a group of MUI `Switch`es bound to a single
 * react-hook-form field whose value is an array, wired via
 * `Controller`/`useFormContext`. See README.md for the design rationale.
 *
 * Extends `SwitchProps` (minus `name`/`checked`/`onChange`/`onBlur`/`value`
 * — all owned internally, not settable by the caller) so per-switch MUI
 * props (`size`, `color`, `disabled`, ...) pass through to every option via
 * `{...other}`.
 */
interface RHFMultiSwitchProps extends Omit<SwitchProps, 'name' | 'checked' | 'onChange' | 'onBlur' | 'value'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults, and hold an array value. */
    name: string;
    /** The switches rendered, in order. */
    options: RHFMultiSwitchOption[];
    /** Rendered above the group via `FormLabel`. */
    label?: ReactNode;
    helperText?: ReactNode;
    /** Lays the group out horizontally instead of the default vertical stack. */
    row?: boolean;
}

/**
 * RHFMultiSwitch — a group of MUI `Switch`es bound to a single
 * react-hook-form field whose value is an array, wired via
 * `Controller`/`useFormContext`. Must be rendered inside a `<Form>` (or any
 * other react-hook-form `FormProvider`) so `useFormContext()` can find the
 * form's `control`.
 *
 * Turning an option's switch on appends its `value` to the field's array;
 * turning it off removes that `value` — the field never holds anything but
 * an array of the currently-on option values.
 *
 * Built fresh against the official react-hook-form `Controller` API and
 * MUI's own `Switch`/`FormGroup` docs — not ported from any vendor source.
 *
 * @example
 * <RHFMultiSwitch
 *   name="radios"
 *   label="Enabled radios"
 *   options={[{ label: 'Wi-Fi', value: 'wifi' }, { label: 'Bluetooth', value: 'bluetooth' }]}
 * />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFMultiSwitch: React__default.ForwardRefExoticComponent<Omit<RHFMultiSwitchProps, "ref"> & React__default.RefAttributes<HTMLFieldSetElement>>;

/** What an RHF field for one of these components stores: a real `File` the
 * user just picked, or a `string` URL for a file already uploaded
 * elsewhere (e.g. an existing avatar loaded from the server). */
type UploadFileValue = File | string;

/**
 * Props for `<RHFUpload>` — a react-hook-form-controlled file picker with a
 * native drag-and-drop zone. See README.md for the design rationale.
 *
 * Unlike `RHFTextField`/`RHFSelect`, this doesn't extend a MUI input's own
 * props type: there is no single MUI component this wraps (the drop zone,
 * preview list, and hidden `<input type="file">` are all hand-built), so
 * the public API is this purpose-built prop set instead of an `Omit<...>`.
 */
interface RHFUploadProps {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /**
     * When true, the field stores an array of files and the drop zone/input
     * accept multiple at once; when false (default), it stores at most one
     * `UploadFileValue`.
     */
    multiple?: boolean;
    /** Native `<input accept>` syntax: `"image/*"`, `".pdf"`, `"image/png,.jpg"`. */
    accept?: string;
    /** Maximum size in bytes; files over this are rejected with a helper-text error. */
    maxSize?: number;
    label?: ReactNode;
    helperText?: ReactNode;
    disabled?: boolean;
    /** Called after a file is removed from the field's value via its own remove button. */
    onRemove?: (file: UploadFileValue) => void;
}

/**
 * RHFUpload — a react-hook-form-controlled file picker with a drag-and-drop
 * zone, built on native `onDragEnter`/`onDragOver`/`onDrop` handlers and a
 * hidden `<input type="file">` — deliberately no `react-dropzone` or other
 * drag-and-drop dependency (see README.md "Design decisions"). Must be
 * rendered inside a `<Form>` (or any other react-hook-form `FormProvider`)
 * so `useFormContext()` can find the form's `control`.
 *
 * Stores a single `UploadFileValue` by default, or an array when
 * `multiple` is set. Built fresh against react-hook-form's own
 * `Controller` API and the native File/DataTransfer APIs — never ported
 * from the vendor's `Upload` component.
 *
 * @example
 * <RHFUpload name="attachments" label="Attachments" multiple accept="image/*,.pdf" maxSize={5 * 1024 * 1024} />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFUpload: React__default.ForwardRefExoticComponent<RHFUploadProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<RHFUploadBox>` — a compact, single-file react-hook-form
 * drop zone. See README.md for the design rationale.
 */
interface RHFUploadBoxProps {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /** Native `<input accept>` syntax: `"image/*"`, `".pdf"`, `"image/png,.jpg"`. */
    accept?: string;
    /** Maximum size in bytes; a file over this is rejected with a helper-text error. */
    maxSize?: number;
    helperText?: ReactNode;
    disabled?: boolean;
    /** Content shown inside the box when it holds no file. Defaults to an upload icon. */
    placeholder?: ReactNode;
}

/**
 * RHFUploadBox — a compact, single-file react-hook-form drop zone: a small
 * square that shows a placeholder (or an image thumbnail once a file is
 * picked) rather than `RHFUpload`'s full-width zone and file list. Built
 * on the same native `onDragEnter`/`onDragOver`/`onDrop` handlers and
 * hidden `<input type="file">` as `RHFUpload` — see that folder's
 * `rhf-upload.utils.ts`/`rhf-upload-icons.defaults.tsx`, which this component
 * imports rather than duplicating. Must be rendered inside a `<Form>` (or
 * any other react-hook-form `FormProvider`).
 *
 * Intended for inline "add one small file/image here" spots — a gallery
 * tile's own upload trigger, a compact attachment slot — where
 * `RHFUpload`'s full drop zone and file list would be oversized.
 *
 * @example
 * <RHFUploadBox name="thumbnail" accept="image/*" maxSize={2 * 1024 * 1024} />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFUploadBox: React__default.ForwardRefExoticComponent<RHFUploadBoxProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<RHFUploadAvatar>` — a circular, image-only react-hook-form
 * drop zone. See README.md for the design rationale.
 */
interface RHFUploadAvatarProps {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /** Maximum size in bytes; an over-size image is rejected with a helper-text error. */
    maxSize?: number;
    helperText?: ReactNode;
    disabled?: boolean;
    /** Diameter in pixels. */
    size?: number;
}

/**
 * RHFUploadAvatar — a circular, image-only react-hook-form drop zone for
 * profile-picture-style fields: a round preview that also acts as its own
 * drop target/click-to-browse trigger. `accept` is fixed to `"image/*"`
 * (not a prop) since that is this component's entire reason to exist
 * alongside `RHFUpload`/`RHFUploadBox`. Built on the same native
 * `onDragEnter`/`onDragOver`/`onDrop` handlers and hidden
 * `<input type="file">` as its siblings — see `../rhf-upload/README.md`
 * "Design decisions" for why no drag-and-drop dependency was added. Must
 * be rendered inside a `<Form>` (or any other react-hook-form
 * `FormProvider`).
 *
 * @example
 * <RHFUploadAvatar name="avatar" maxSize={2 * 1024 * 1024} />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFUploadAvatar: React__default.ForwardRefExoticComponent<RHFUploadAvatarProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<RHFPhoneInput>` — an international phone-number `TextField`
 * wired to a react-hook-form field via `Controller`/`useFormContext`. See
 * README.md for the design rationale.
 *
 * Extends `TextFieldProps` (minus `name`/`value`/`onChange`/`onBlur`/`error`/
 * `type`/`select` — all owned by the `Controller` render prop and the phone
 * widget itself, not settable by the caller) so the rest of MUI `TextField`'s
 * public API (`size`, `variant`, `margin`, `disabled`, ...) passes straight
 * through to the rendered input.
 */
interface RHFPhoneInputProps extends Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'error' | 'type' | 'select'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    label?: ReactNode;
    helperText?: ReactNode;
    /**
     * ISO 3166-1 alpha-2 code (e.g. `'US'`) the country dropdown starts on
     * when the field has no value yet. Passed straight through to
     * `react-phone-number-input`.
     */
    defaultCountry?: Country$1;
    /**
     * When `true` (the default), numbers are formatted/stored in E.164
     * international form (`+1 213 373 4253`) regardless of the selected
     * country. Set `false` to store/format in the selected country's national
     * form instead.
     */
    international?: boolean;
}

/**
 * RHFPhoneInput — an international phone-number input controlled by a
 * react-hook-form field via `Controller`/`useFormContext`. Must be rendered
 * inside a `<Form>` (or any other react-hook-form `FormProvider`) so
 * `useFormContext()` can find the form's `control`.
 *
 * Wraps `react-phone-number-input`'s `PhoneInput`, pointing its
 * `inputComponent` at a MUI `TextField` (so the field itself matches every
 * other input in this library) and its `flagComponent` at this library's
 * own `GiselleIcon` (so country flags reuse the existing `@iconify/react`
 * wiring — see `CountryFlag` above — instead of a second flag-image
 * dependency). Built fresh against `react-hook-form`'s own `Controller` API
 * and `react-phone-number-input`'s own docs — not ported from any vendor
 * source (see wiki#722/#732 for why).
 *
 * The stored/validated value is always a single E.164-ish string (e.g.
 * `"+12133734253"`), the same shape `react-phone-number-input` itself
 * produces — validate it with its own `isValidPhoneNumber`/
 * `isPossiblePhoneNumber` helpers in the form's schema.
 *
 * @example
 * <RHFPhoneInput name="phone" label="Phone number" defaultCountry="US" />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFPhoneInput: React__default.ForwardRefExoticComponent<Omit<RHFPhoneInputProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<RHFDatePicker>` — a controlled MUI X `DatePicker` wired to a
 * react-hook-form field via `Controller`/`useFormContext`. See README.md
 * for the design rationale.
 *
 * Extends `DatePickerProps` (minus `name`/`value`/`onChange` — all owned by
 * the react-hook-form `Controller` render prop, not settable by the caller)
 * so the rest of MUI X `DatePicker`'s public API (`label`, `disablePast`,
 * `minDate`, `maxDate`, `views`, ...) passes straight through via
 * `{...other}`. The stored react-hook-form value is a `Dayjs | null`.
 */
interface RHFDatePickerProps extends Omit<DatePickerProps, 'name' | 'value' | 'onChange'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /** Shown below the field when there's no validation error. */
    helperText?: ReactNode;
}

/**
 * RHFDatePicker — a `@mui/x-date-pickers` `DatePicker` controlled by a
 * react-hook-form field via `Controller`/`useFormContext`. Must be rendered
 * inside a `<Form>` (or any other react-hook-form `FormProvider`) so
 * `useFormContext()` can find the form's `control`, **and** inside a
 * `LocalizationProvider` (`dateAdapter={AdapterDayjs}`) so the underlying
 * `DatePicker` has a date adapter to render against — this library does not
 * supply that provider itself, the same way it does not supply
 * react-hook-form's own `FormProvider`. `LocalizationProvider` is meant to
 * wrap a whole app/tree once, not be re-created per field.
 *
 * Built fresh against react-hook-form's own `Controller` API and
 * `@mui/x-date-pickers`' own `DatePicker` docs — not ported from any vendor
 * source.
 *
 * The react-hook-form field value can be a `Dayjs`, a `Date`, an ISO
 * string, `null`, or `undefined` — this component normalizes whatever is
 * there to a `Dayjs` (or `null`) before handing it to `DatePicker`, and
 * always writes a `Dayjs | null` back on change, so the form's stored value
 * is consistent regardless of how it was seeded (a schema default, a saved
 * record from an API, `DynamicFieldConfig.defaultValue`, ...).
 *
 * @example
 * <RHFDatePicker name="birthday" label="Birthday" />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFDatePicker: React__default.ForwardRefExoticComponent<RHFDatePickerProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<RHFTimePicker>` — a controlled MUI X `TimePicker` wired to a
 * react-hook-form field via `Controller`/`useFormContext`. See README.md
 * for the design rationale.
 *
 * Extends `TimePickerProps` (minus `name`/`value`/`onChange` — all owned by
 * the react-hook-form `Controller` render prop, not settable by the caller)
 * so the rest of MUI X `TimePicker`'s public API (`label`, `minTime`,
 * `maxTime`, `views`, `ampm`, ...) passes straight through via `{...other}`.
 * The stored react-hook-form value is a `Dayjs | null`.
 */
interface RHFTimePickerProps extends Omit<TimePickerProps, 'name' | 'value' | 'onChange'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /** Shown below the field when there's no validation error. */
    helperText?: ReactNode;
}

/**
 * RHFTimePicker — a `@mui/x-date-pickers` `TimePicker` controlled by a
 * react-hook-form field via `Controller`/`useFormContext`. Must be rendered
 * inside a `<Form>` (or any other react-hook-form `FormProvider`) so
 * `useFormContext()` can find the form's `control`, **and** inside a
 * `LocalizationProvider` (`dateAdapter={AdapterDayjs}`) so the underlying
 * `TimePicker` has a date adapter to render against — this library does
 * not supply that provider itself, the same way it does not supply
 * react-hook-form's own `FormProvider`. `LocalizationProvider` is meant to
 * wrap a whole app/tree once, not be re-created per field.
 *
 * Built fresh against react-hook-form's own `Controller` API and
 * `@mui/x-date-pickers`' own `TimePicker` docs — not ported from any
 * vendor source.
 *
 * The react-hook-form field value can be a `Dayjs`, a `Date`, an ISO
 * string, `null`, or `undefined` — this component normalizes whatever is
 * there to a `Dayjs` (or `null`) before handing it to `TimePicker`, and
 * always writes a `Dayjs | null` back on change.
 *
 * @example
 * <RHFTimePicker name="alarm" label="Alarm" />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFTimePicker: React__default.ForwardRefExoticComponent<RHFTimePickerProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<RHFDateTimePicker>` — a controlled MUI X `DateTimePicker`
 * wired to a react-hook-form field via `Controller`/`useFormContext`. See
 * README.md for the design rationale.
 *
 * Extends `DateTimePickerProps` (minus `name`/`value`/`onChange` — all
 * owned by the react-hook-form `Controller` render prop, not settable by
 * the caller) so the rest of MUI X `DateTimePicker`'s public API (`label`,
 * `minDateTime`, `maxDateTime`, `views`, `ampm`, ...) passes straight
 * through via `{...other}`. The stored react-hook-form value is a
 * `Dayjs | null`.
 */
interface RHFDateTimePickerProps extends Omit<DateTimePickerProps, 'name' | 'value' | 'onChange'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /** Shown below the field when there's no validation error. */
    helperText?: ReactNode;
}

/**
 * RHFDateTimePicker — a `@mui/x-date-pickers` `DateTimePicker` controlled by
 * a react-hook-form field via `Controller`/`useFormContext`. Must be
 * rendered inside a `<Form>` (or any other react-hook-form `FormProvider`)
 * so `useFormContext()` can find the form's `control`, **and** inside a
 * `LocalizationProvider` (`dateAdapter={AdapterDayjs}`) so the underlying
 * `DateTimePicker` has a date adapter to render against — this library does
 * not supply that provider itself, the same way it does not supply
 * react-hook-form's own `FormProvider`. `LocalizationProvider` is meant to
 * wrap a whole app/tree once, not be re-created per field — the same
 * contract `RHFDatePicker`/`RHFTimePicker` require, so a form mixing all
 * three only needs one `LocalizationProvider` at its root.
 *
 * Built fresh against react-hook-form's own `Controller` API and
 * `@mui/x-date-pickers`' own `DateTimePicker` docs — not ported from any
 * vendor source.
 *
 * The react-hook-form field value can be a `Dayjs`, a `Date`, an ISO
 * string, `null`, or `undefined` — this component normalizes whatever is
 * there to a `Dayjs` (or `null`) before handing it to `DateTimePicker`, and
 * always writes a `Dayjs | null` back on change, so the form's stored value
 * is consistent regardless of how it was seeded (a schema default, a saved
 * record from an API, `DynamicFieldConfig.defaultValue`, ...).
 *
 * @example
 * <RHFDateTimePicker name="meetsAt" label="Meeting starts" />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFDateTimePicker: React__default.ForwardRefExoticComponent<RHFDateTimePickerProps & React__default.RefAttributes<HTMLDivElement>>;

/** One selectable option — the visible `label` can differ from the stored `value`. */
type RHFAutocompleteOption = {
    label: string;
    value: string | number;
};
/**
 * Props for `<RHFAutocomplete>` — a controlled MUI `Autocomplete` (single-select)
 * wired to a react-hook-form field via `Controller`/`useFormContext`. See
 * README.md for the design rationale.
 *
 * Extends MUI's `AutocompleteProps` (minus the props this component owns
 * itself — `options`/`value`/`onChange`/`renderInput`, plus the multi-select
 * type parameters this component pins to single-select) so the rest of
 * `Autocomplete`'s public API (`disabled`, `size`, `fullWidth`, ...) passes
 * straight through via `{...other}`.
 */
interface RHFAutocompleteProps extends Omit<AutocompleteProps<RHFAutocompleteOption, false, false, false>, 'options' | 'value' | 'onChange' | 'renderInput' | 'getOptionLabel' | 'isOptionEqualToValue'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /** The options rendered in the dropdown, in order. */
    options: RHFAutocompleteOption[];
    label?: ReactNode;
    helperText?: ReactNode;
    /** Passed through to the underlying `TextField` that renders the input. */
    textFieldProps?: Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'error'>;
}

/**
 * RHFAutocomplete — a searchable, single-select MUI `Autocomplete`
 * controlled by a react-hook-form field via `Controller`/`useFormContext`.
 * Must be rendered inside a `<Form>` (or any other react-hook-form
 * `FormProvider`) so `useFormContext()` can find the form's `control`.
 *
 * `Autocomplete`'s own `value` is always an `RHFAutocompleteOption` (or
 * `null`), while the form field itself stores the option's raw `value`
 * (a `string | number`) — the same shape every other field in this
 * library uses. This component translates between the two at the edges:
 * looking the current option up from `field.value` on render, and
 * unwrapping the selected option back down to its `value` (or `null`, on
 * clear) in `onChange`.
 *
 * Built fresh against the official react-hook-form `Controller` API and
 * MUI's own `Autocomplete` docs — not ported from any vendor source.
 *
 * @example
 * <RHFAutocomplete name="country" label="Country" options={[{ label: 'USA', value: 'us' }]} />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFAutocomplete: React__default.ForwardRefExoticComponent<Omit<RHFAutocompleteProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * One ISO 3166-1 alpha-2 country entry — name, dial code, and ISO code.
 *
 * Shared across every phone/country picker in this library — `RHFPhoneInput`
 * today (see `../../components/material/input/rhf-phone-input/`), and the
 * planned `RHFCountrySelect` next — so they never drift into two
 * differently-sorted or differently-labelled country lists.
 */
type Country = {
    /** ISO 3166-1 alpha-2 code, e.g. `'US'`. Matches `react-phone-number-input`'s own `CountryCode` type. */
    code: string;
    /** English display name, e.g. `'United States'`. */
    label: string;
    /** E.164 calling code including the leading `+`, e.g. `'+1'`. */
    phone: string;
};

/** Props for `<RHFCountrySelect>` — a controlled, single-select MUI `Autocomplete` over the shared `COUNTRIES` dataset, wired to a react-hook-form field. Extends `AutocompleteProps` minus the props this component owns itself. See README.md for the design rationale. */
interface RHFCountrySelectProps extends Omit<AutocompleteProps<Country, false, false, false>, 'options' | 'value' | 'onChange' | 'renderInput' | 'getOptionLabel' | 'isOptionEqualToValue'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    label?: ReactNode;
    helperText?: ReactNode;
    /** Passed through to the underlying `TextField` that renders the input. */
    textFieldProps?: Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'error'>;
}

/**
 * RHFCountrySelect — a searchable, single-select MUI `Autocomplete` over the shared `COUNTRIES` dataset, controlled by a react-hook-form field. See README.md for the design rationale (why there's no `options` prop, and what the form value is).
 *
 * @example
 * <RHFCountrySelect name="country" label="Country" />
 *
 * **Quality status (09 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFCountrySelect: React__default.ForwardRefExoticComponent<Omit<RHFCountrySelectProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<RHFNumberInput>` — a thin `RHFTextField` preset that forces
 * `type="number"`. See README.md for the design rationale.
 *
 * Extends `RHFTextFieldProps` minus `type` (fixed to `'number'` by this
 * component, not settable by the caller) so the rest of `RHFTextField`'s
 * public API (`name`, `label`, `helperText`, `slotProps`, ...) passes
 * straight through via `{...other}`.
 */
type RHFNumberInputProps = Omit<RHFTextFieldProps, 'type'>;

/**
 * RHFNumberInput — a thin `RHFTextField` preset that forces `type="number"`.
 * Must be rendered inside a `<Form>` (or any other react-hook-form
 * `FormProvider`) so `useFormContext()` (called inside `RHFTextField`) can
 * find the form's `control`.
 *
 * `RHFTextField` already special-cases `type="number"`: the rendered
 * `<input>` stays `type="text"` (with a numeric `inputMode`/`pattern`) so an
 * in-progress value like `"12."` can render at all, while react-hook-form's
 * own stored value is sanitized on every keystroke and converted to a real
 * `number` on blur (`rhf-text-field.utils.ts`). `RHFNumberInput` exists
 * purely so a caller reaching for a numeric field doesn't need to remember
 * `type="number"` is the right prop on `RHFTextField` — it reuses that
 * component (and its value transforms) outright rather than reimplementing
 * any of it.
 *
 * @example
 * <RHFNumberInput name="amount" label="Amount" />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFNumberInput: React__default.ForwardRefExoticComponent<Omit<RHFNumberInputProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<RHFSlider>` — a controlled MUI `Slider` wired to a
 * react-hook-form field via `Controller`/`useFormContext`. See README.md
 * for the design rationale.
 *
 * Extends `SliderProps` (minus `name`/`value`/`onChange`/`defaultValue` —
 * all owned by the react-hook-form `Controller` render prop, not settable
 * by the caller) so the rest of MUI `Slider`'s public API (`min`, `max`,
 * `step`, `marks`, `valueLabelDisplay`, `disabled`, ...) passes straight
 * through via `{...other}`.
 */
interface RHFSliderProps extends Omit<SliderProps, 'name' | 'value' | 'onChange' | 'defaultValue'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    label?: ReactNode;
    helperText?: ReactNode;
}

/**
 * RHFSlider — a MUI `Slider` controlled by a react-hook-form field via
 * `Controller`/`useFormContext`. Must be rendered inside a `<Form>` (or any
 * other react-hook-form `FormProvider`) so `useFormContext()` can find the
 * form's `control`.
 *
 * Like `RHFSelect`, MUI's bare `Slider` has no built-in label/helper-text
 * slot, so this wraps it in its own `FormControl`/`FormLabel`/`FormHelperText`
 * — giving callers the same all-in-one ergonomics `RHFTextField` already
 * provides.
 *
 * Built fresh against the official react-hook-form `Controller` API and
 * MUI's own `Slider` docs — not ported from any vendor source.
 *
 * @example
 * <RHFSlider name="volume" label="Volume" min={0} max={100} />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFSlider: React__default.ForwardRefExoticComponent<Omit<RHFSliderProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<RHFCode>` — a controlled `MuiOtpInput` (one-time-password /
 * OTP box row, despite the "Code" name) wired to a react-hook-form field
 * via `Controller`/`useFormContext`. See README.md for the design
 * rationale.
 *
 * Extends `MuiOtpInputProps` (minus `value`/`onChange`/`onBlur` — all owned
 * by the react-hook-form `Controller` render prop, not settable by the
 * caller) so the rest of `mui-one-time-password-input`'s public API
 * (`length`, `autoFocus`, `validateChar`, `onComplete`, `TextFieldsProps`,
 * `gap`, ...) passes straight through via `{...other}`.
 */
interface RHFCodeProps extends Omit<MuiOtpInputProps, 'value' | 'onChange' | 'onBlur'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    label?: ReactNode;
    helperText?: ReactNode;
}

/**
 * RHFCode — despite the name, a one-time-password (OTP) input (a row of
 * single-digit boxes), not a code editor — bound to a react-hook-form field
 * via `Controller`/`useFormContext`. Must be rendered inside a `<Form>` (or
 * any other react-hook-form `FormProvider`) so `useFormContext()` can find
 * the form's `control`.
 *
 * Wraps `mui-one-time-password-input`'s `MuiOtpInput` — which has no
 * built-in label/helper-text slot of its own — in the same
 * `FormControl`/`FormHelperText` shell `RHFSelect` uses, so callers get the
 * same all-in-one ergonomics regardless of which field type they reach for.
 *
 * Built fresh against the official react-hook-form `Controller` API and
 * `mui-one-time-password-input`'s own docs/type definitions — not ported
 * from any vendor source.
 *
 * @example
 * <RHFCode name="otp" label="Verification code" length={6} />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFCode: React__default.ForwardRefExoticComponent<Omit<RHFCodeProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/** One radio option — the visible `label` can differ from the stored `value`. */
type RHFRadioGroupOption = {
    label: string;
    value: string | number;
    /** Disables just this one option, independent of the group's own `disabled`. */
    disabled?: boolean;
};
/**
 * Props for `<RHFRadioGroup>` — a controlled MUI `RadioGroup` wired to a
 * react-hook-form field via `Controller`/`useFormContext`. See README.md
 * for the design rationale.
 *
 * Extends `RadioGroupProps` (minus `name`/`value`/`onChange` — all owned by
 * the react-hook-form `Controller` render prop, not settable by the
 * caller) so the rest of MUI `RadioGroup`'s public API (`row`, ...) passes
 * straight through via `{...other}`.
 */
interface RHFRadioGroupProps extends Omit<RadioGroupProps, 'name' | 'value' | 'onChange'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    /** The options rendered as `FormControlLabel`+`Radio` pairs, in order. */
    options: RHFRadioGroupOption[];
    label?: ReactNode;
    helperText?: ReactNode;
    /** Disables every option in the group. Set `disabled` on an individual option to disable only that one. */
    disabled?: boolean;
}

/**
 * RHFRadioGroup — a MUI `RadioGroup` controlled by a react-hook-form field
 * via `Controller`/`useFormContext`. Must be rendered inside a `<Form>`
 * (or any other react-hook-form `FormProvider`) so `useFormContext()` can
 * find the form's `control`.
 *
 * Like `RHFSelect`, MUI's bare `RadioGroup` has no built-in label/helper-text
 * slot, so this wraps it in its own `FormControl`/`FormLabel`/`FormHelperText`
 * — giving callers the same all-in-one ergonomics `RHFTextField`/`RHFSelect`
 * already provide.
 *
 * Built fresh against the official react-hook-form `Controller` API and
 * MUI's own `RadioGroup`/`FormControlLabel` docs — not ported from any
 * vendor source.
 *
 * @example
 * <RHFRadioGroup name="size" label="Size" options={[{ label: 'Small', value: 'sm' }]} />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFRadioGroup: React__default.ForwardRefExoticComponent<Omit<RHFRadioGroupProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<RHFRating>` — a controlled MUI `Rating` wired to a
 * react-hook-form field via `Controller`/`useFormContext`. See README.md
 * for the design rationale.
 *
 * Extends `RatingProps` (minus `name`/`value`/`onChange`/`onBlur` — all
 * owned by the react-hook-form `Controller` render prop, not settable by
 * the caller) so the rest of MUI `Rating`'s public API (`max`, `precision`,
 * `size`, `readOnly`, `icon`, `emptyIcon`, ...) passes straight through via
 * `{...other}`.
 */
interface RHFRatingProps extends Omit<RatingProps, 'name' | 'value' | 'onChange' | 'onBlur'> {
    /** react-hook-form field name — must match a key registered in the form's schema/defaults. */
    name: string;
    label?: ReactNode;
    helperText?: ReactNode;
}

/**
 * RHFRating — a MUI `Rating` controlled by a react-hook-form field via
 * `Controller`/`useFormContext`. Must be rendered inside a `<Form>` (or any
 * other react-hook-form `FormProvider`) so `useFormContext()` can find the
 * form's `control`.
 *
 * Like `Select`, MUI's bare `Rating` has no built-in label/helper-text
 * slot, so this wraps it in its own `FormControl`/`FormLabel`/
 * `FormHelperText` — giving callers the same all-in-one ergonomics
 * `RHFTextField`/`RHFSelect` already provide.
 *
 * Built fresh against the official react-hook-form `Controller` API and
 * MUI's own `Rating` docs — not ported from any vendor source.
 *
 * @example
 * <RHFRating name="satisfaction" label="How was it?" />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare const RHFRating: React__default.ForwardRefExoticComponent<Omit<RHFRatingProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/** Which underlying react-hook-form-controlled input a `DynamicFieldConfig` renders. */
type DynamicFieldType = 'text' | 'select' | 'multiselect' | 'autocomplete' | 'country' | 'number' | 'slider' | 'code' | 'radio' | 'rating' | 'checkbox' | 'multiCheckbox' | 'switch' | 'multiSwitch' | 'upload' | 'uploadBox' | 'uploadAvatar' | 'phone' | 'date' | 'time' | 'dateTime';
/** One selectable option for a `type: 'select'` or `type: 'multiselect'` field. */
type DynamicFieldOption = {
    label: string;
    value: string | number;
};
/**
 * Declarative description of one form field — what `DynamicForm`'s `fields`
 * prop is an array of, and what `DynamicField` renders one of.
 */
type DynamicFieldConfig = {
    /** react-hook-form field name — must match a key in the form's schema/defaults. */
    name: string;
    /**
     * Which control renders this field. Can change at runtime: switching
     * `type` on an already-rendered field swaps to a different underlying
     * component type, so React unmounts the old control and mounts the new
     * one cleanly (no shared state carries over between them).
     */
    type: DynamicFieldType;
    label?: string;
    helperText?: string;
    /** Required when `type` is `'select'`, `'multiselect'`, `'autocomplete'`, `'radio'`, `'multiCheckbox'`, or `'multiSwitch'`; ignored otherwise. */
    options?: DynamicFieldOption[];
    /**
     * Initial value `DynamicForm` derives its `useForm` defaults from — a
     * `string | number` for `'text'`/`'select'`/`'phone'`/`'slider'`/
     * `'country'` (an ISO 3166-1 alpha-2 code, e.g. `'US'`), a `boolean` for
     * `'checkbox'`/`'switch'`, or an array of option values for
     * `'multiselect'`/`'multiCheckbox'`/`'multiSwitch'`.
     */
    defaultValue?: string | number | boolean | Array<string | number>;
    /** Minimum value; only used when `type` is `'slider'` (defaults to `RHFSlider`'s own default). */
    min?: number;
    /** Maximum value; only used when `type` is `'slider'` (defaults to `RHFSlider`'s own default). */
    max?: number;
    /** Step size; only used when `type` is `'slider'` (defaults to `RHFSlider`'s own default). */
    step?: number;
    /** Used when `type` is `'upload'`: store an array of files instead of a single one. Ignored otherwise. */
    multiple?: boolean;
    /** Used when `type` is `'upload'` or `'uploadBox'`: native `<input accept>` syntax. Ignored otherwise (`'uploadAvatar'` is always image-only). */
    accept?: string;
    /** Used when `type` is `'upload'`, `'uploadBox'`, or `'uploadAvatar'`: maximum file size in bytes. Ignored otherwise. */
    maxSize?: number;
    /** Used when `type` is `'phone'`; ignored otherwise. See `RHFPhoneInput`'s `defaultCountry`. */
    defaultCountry?: Country$1;
    /**
     * When true, this field renders as a plain read-only label showing its
     * current value instead of an editable control — the same behaviour for
     * every `DynamicFieldType`, handled once by `DynamicField` rather than
     * duplicated per field type.
     */
    disabled?: boolean;
    /** Optional accordion group this field belongs to — see `DynamicForm`. */
    group?: string;
};
interface DynamicFieldProps {
    field: DynamicFieldConfig;
}

/**
 * DynamicField — dispatches one `DynamicFieldConfig` to the react-hook-form
 * -controlled input that renders it (`RHFTextField` for `'text'`,
 * `RHFSelect` for `'select'`, `RHFMultiSelect` for `'multiselect'`,
 * `RHFAutocomplete` for `'autocomplete'`, `RHFCountrySelect` for
 * `'country'`, `RHFNumberInput` for `'number'`, `RHFSlider` for `'slider'`,
 * `RHFCode` for `'code'`, `RHFRadioGroup` for `'radio'`, `RHFRating` for
 * `'rating'`, `RHFCheckbox`/`RHFSwitch` for `'checkbox'`/`'switch'`,
 * `RHFMultiCheckbox`/`RHFMultiSwitch` for `'multiCheckbox'`/`'multiSwitch'`,
 * `RHFUpload`/`RHFUploadBox`/`RHFUploadAvatar` for
 * `'upload'`/`'uploadBox'`/`'uploadAvatar'`, `RHFPhoneInput` for `'phone'`,
 * `RHFDatePicker`/`RHFTimePicker`/`RHFDateTimePicker` for `'date'`/`'time'`/
 * `'dateTime'`), or to a shared
 * read-only display when `field.disabled` is set. Must be rendered inside a
 * `<Form>` (or any other react-hook-form `FormProvider`) **and**, when any
 * field renders one of the three date/time types, a `@mui/x-date-pickers`
 * `LocalizationProvider` — the same contract those components require
 * directly (see `../../input/rhf-date-picker/README.md`).
 *
 * `field.type` and `field.disabled` can change at runtime — the branch
 * below returns a different component type per case, and React already
 * unmounts/remounts cleanly whenever the element type at a given position
 * changes between renders, so switching either one never leaves stale
 * state (a half-registered `Controller`, a stray subscription) behind from
 * the previous case.
 *
 * The disabled/read-only behaviour is handled once, here, rather than
 * duplicated inside every individual field type — every
 * `DynamicFieldType` gets the exact same label-only display when
 * `disabled` is set, via `ReadOnlyFieldValue`.
 */
declare function DynamicField({ field }: DynamicFieldProps): React$1.JSX.Element;
declare namespace DynamicField {
    var displayName: string;
}

interface DynamicFormProps {
    /** Declarative description of every field to render, in order. */
    fields: DynamicFieldConfig[];
    /** Called with the form's values on a valid submit — typically persists or forwards them. */
    onSubmit: (data: FieldValues) => void;
    /** Shows the built-in submit button. Default `true`. */
    showSubmitButton?: boolean;
    submitLabel?: string;
}

/**
 * DynamicForm — renders a whole form from a `fields` config: derives
 * `useForm` default values, lays fields out in a responsive grid, groups
 * them into collapsible accordion sections (first one expanded) whenever
 * any field names a `group`, and wires a submit button. Built entirely on
 * top of this library's own `Form`/`DynamicField` — it does not
 * reimplement react-hook-form wiring itself.
 *
 * @example
 * <DynamicForm
 *   fields={[
 *     { name: 'firstName', type: 'text', label: 'First name', group: 'Profile' },
 *     { name: 'country', type: 'select', label: 'Country', options: [...], group: 'Profile' },
 *   ]}
 *   onSubmit={(data) => console.log(data)}
 * />
 *
 * **Quality status (08 Sep 2026):** DoD not yet audited against the 27-item scale.
 */
declare function DynamicForm({ fields, onSubmit, showSubmitButton, submitLabel, }: DynamicFormProps): React$1.JSX.Element;
declare namespace DynamicForm {
    var displayName: string;
}

/** Slices `data` to the rows that belong on `page` at `rowsPerPage` rows per page. */
declare function rowInPage<T>(data: T[], page: number, rowsPerPage: number): T[];
/** Number of trailing empty rows needed to keep every page the same height. */
declare function emptyRows(page: number, rowsPerPage: number, arrayLength: number): number;
/** Returns a `[].sort()` comparator for `order` direction over `orderBy` (dot-path supported). */
declare function getComparator<Key extends PropertyKey>(order: 'asc' | 'desc', orderBy: Key): (a: {
    [key in Key]: number | string;
}, b: {
    [key in Key]: number | string;
}) => number;

interface UseTableReturn {
    dense: boolean;
    page: number;
    rowsPerPage: number;
    order: 'asc' | 'desc';
    orderBy: string;
    /********/
    selected: string[];
    onSelectRow: (id: string) => void;
    onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void;
    /********/
    onResetPage: () => void;
    onSort: (id: string) => void;
    onChangePage: (event: unknown, newPage: number) => void;
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onUpdatePageDeleteRow: (totalRowsInPage: number) => void;
    onUpdatePageDeleteRows: (totalRowsInPage: number, totalRowsFiltered: number) => void;
    /********/
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setDense: React.Dispatch<React.SetStateAction<boolean>>;
    setOrderBy: React.Dispatch<React.SetStateAction<string>>;
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setOrder: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>;
}
interface UseTableProps {
    defaultDense?: boolean;
    defaultOrderBy?: string;
    defaultSelected?: string[];
    defaultRowsPerPage?: number;
    defaultCurrentPage?: number;
    defaultOrder?: 'asc' | 'desc';
}
/**
 * Manages the sort/select/paginate/dense state a hand-rolled MUI data table needs —
 * pair with `TableHeadCustom`, `TablePaginationCustom`, `TableSkeleton`, and
 * `TableEmptyRows` to assemble a full custom table.
 *
 * @example
 * ```tsx
 * const table = useTable({ defaultOrderBy: 'name' });
 * const dataFiltered = applyFilter({ inputData: rows, comparator: getComparator(table.order, table.orderBy) });
 * ```
 */
declare function useTable(props?: UseTableProps): UseTableReturn;

interface TableSkeletonProps extends TableRowProps {
    /** Number of skeleton rows to render. @default 0 */
    rowCount?: number;
    /** Number of skeleton cells per row. @default 0 */
    cellCount?: number;
}

/**
 * TableSkeleton — a `rowCount` x `cellCount` grid of placeholder `TableRow`s, shown in a
 * `TableBody` while real data is loading.
 *
 * @example
 * ```tsx
 * <TableBody>
 *   {loading ? (
 *     <TableSkeleton rowCount={table.rowsPerPage} cellCount={headCells.length} />
 *   ) : (
 *     dataFiltered.map((row) => <Row key={row.id} row={row} />)
 *   )}
 * </TableBody>
 * ```
 */
declare function TableSkeleton({ rowCount, cellCount, ...other }: TableSkeletonProps): React$1.JSX.Element[];
declare namespace TableSkeleton {
    var displayName: string;
}

interface TableEmptyRowsProps extends TableRowProps {
    /** Number of blank rows to render — usually `emptyRows(page, rowsPerPage, data.length)`. */
    emptyRows: number;
    /** Row height in px, used to size the blank filler row. */
    height?: number;
    /**
     * Column span for the filler cell — must match the number of columns in the table.
     * @default 9
     */
    colSpan?: number;
}

/**
 * TableEmptyRows — trailing filler row that keeps every page of a paginated
 * table the same height, even on a short last page.
 *
 * @example
 * ```tsx
 * <TableEmptyRows
 *   colSpan={headCells.length + 1}
 *   emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
 * />
 * ```
 */
declare const TableEmptyRows: React__default.ForwardRefExoticComponent<Omit<TableEmptyRowsProps, "ref"> & React__default.RefAttributes<HTMLTableRowElement>>;

interface TableHeadCellProps {
    /** Column id — also the value passed to `onSort`. */
    id: string;
    /** Column header label. */
    label?: string;
    /** Column width — passed straight through to the cell's `sx.width`. */
    width?: CSSObject['width'];
    /** Header cell text alignment. @default 'left' */
    align?: 'left' | 'center' | 'right';
    /** Per-cell sx override. */
    sx?: SxProps<Theme>;
}
interface TableHeadCustomProps extends TableHeadProps {
    /** Column id currently sorted by. */
    orderBy?: string;
    /** Total row count — used to derive the "select all" checkbox's indeterminate state. */
    rowCount?: number;
    /** Number of currently selected rows. */
    numSelected?: number;
    /** Current sort direction. */
    order?: 'asc' | 'desc';
    /** Column definitions rendered as header cells. */
    headCells: TableHeadCellProps[];
    /** Called with the column `id` when a sortable header is clicked. Omit to render plain (non-sortable) labels. */
    onSort?: (id: string) => void;
    /** Called with the checkbox's next checked state — omit to hide the "select all" column entirely. */
    onSelectAllRows?: (checked: boolean) => void;
}

/**
 * TableHeadCustom — sortable, optionally-selectable header row for a hand-rolled
 * MUI data table.
 *
 * @example
 * ```tsx
 * <TableHeadCustom
 *   order={table.order}
 *   orderBy={table.orderBy}
 *   onSort={table.onSort}
 *   headCells={HEAD_CELLS}
 *   rowCount={dataFiltered.length}
 *   numSelected={table.selected.length}
 *   onSelectAllRows={(checked) =>
 *     table.onSelectAllRows(checked, dataFiltered.map((row) => row.id))
 *   }
 * />
 * ```
 */
declare const TableHeadCustom: React__default.ForwardRefExoticComponent<Omit<TableHeadCustomProps, "ref"> & React__default.RefAttributes<HTMLTableSectionElement>>;

interface TablePaginationCustomProps extends TablePaginationProps {
    /** Shows the "Dense" density-toggle switch when true. */
    dense?: boolean;
    /** Called when the density switch is toggled — omit to hide the switch entirely. */
    onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /** MUI sx forwarded to the root `Box` (not the inner `TablePagination`). */
    sx?: SxProps<Theme>;
}

/**
 * TablePaginationCustom — a `TablePagination` with an optional "Dense" density-toggle
 * switch, for a hand-rolled MUI data table.
 *
 * @example
 * ```tsx
 * <TablePaginationCustom
 *   page={table.page}
 *   dense={table.dense}
 *   count={dataFiltered.length}
 *   rowsPerPage={table.rowsPerPage}
 *   onPageChange={table.onChangePage}
 *   onChangeDense={table.onChangeDense}
 *   onRowsPerPageChange={table.onChangeRowsPerPage}
 * />
 * ```
 */
declare const TablePaginationCustom: React__default.ForwardRefExoticComponent<Omit<TablePaginationCustomProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Props for `<PreviewLine>`.
 *
 * @todo Fill in props when implementation begins.
 * See README.md for the planned API.
 */
interface PreviewLineProps extends Omit<BoxProps, 'children'> {
    /** Width of the skeleton bar — a fixed pixel number or any CSS width string. */
    width: number | string;
    /** Height of the skeleton bar in pixels. Defaults to 10. */
    height?: number;
    /** Opacity of the bar's fill color, 0–1. Defaults to 0.12. */
    opacity?: number;
    /** Whether the bar has fully-rounded (pill) corners. Defaults to true. */
    rounded?: boolean;
}

/**
 * A single skeleton-style bar — a generic loading/placeholder primitive for
 * mocked-up dashboards, previews, and wireframe surfaces. Ported from
 * alexrebula-portfolio-poc's `preview-line.tsx` (LittleBranches/wiki#744).
 *
 * **Quality status (09 Sep 2026):** DoD 27/27 · Best practices not yet audited
 */
declare const PreviewLine: React$1.ForwardRefExoticComponent<Omit<PreviewLineProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

/** Default bar height in pixels when `height` is omitted. */
declare const PREVIEW_LINE_DEFAULT_HEIGHT = 10;
/** Default fill opacity (0–1) when `opacity` is omitted. */
declare const PREVIEW_LINE_DEFAULT_OPACITY = 0.12;
/** `borderRadius` applied when `rounded` is true (or omitted) — a full pill shape. */
declare const PREVIEW_LINE_ROUNDED_RADIUS = 99;
/** `borderRadius` applied when `rounded` is explicitly false — a small square corner. */
declare const PREVIEW_LINE_SQUARE_RADIUS = 2;

/**
 * The subset of the reference app's `PreviewMetrics` this component actually
 * reads. Structurally compatible with a larger metrics object (e.g. the
 * reference's own `compact`/`relaxed` presets) — only `gap` is required.
 */
interface PreviewCardMetrics {
    /** Spacing (MUI spacing units) between the title line and each body line. */
    gap: number;
}
/**
 * The subset of the reference app's `ServicesDashboardPreviewVisualConfig`
 * this component actually reads — a local, vendor-free stand-in (per
 * wiki#680's precedent) rather than an app-owned type.
 */
interface PreviewCardVisualConfig {
    darkBorderOpacity: number;
    lightBorderOpacity: number;
    darkCardBgOpacity: number;
    lightCardBgOpacity: number;
}
/**
 * Props for `<PreviewCard>`.
 */
interface PreviewCardProps extends Omit<StackProps, 'children'> {
    /** Spacing between the title line and the body lines. */
    metrics: PreviewCardMetrics;
    /** Card padding (MUI spacing units). */
    padding: number;
    /** Minimum card height in pixels. */
    minHeight: number;
    /** Width of the title `PreviewLine` (fixed pixel number or any CSS width string). */
    titleWidth: string;
    /** Number of body `PreviewLine`s to render below the title. */
    lineCount: number;
    /** Percentage each successive body line shrinks by, relative to the previous row. */
    lineStep: number;
    /** Drives the computed background/border colors. */
    visualConfig: PreviewCardVisualConfig;
}

/**
 * A "card" skeleton — one title line followed by a shrinking stack of body
 * lines, composed from `PreviewLine`. Ported from alexrebula-portfolio-poc's
 * `preview-card.tsx` (LittleBranches/wiki#745).
 *
 * **Quality status (09 Sep 2026):** DoD not yet audited
 */
declare const PreviewCard: React$1.ForwardRefExoticComponent<Omit<PreviewCardProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

/** Which control last changed, for the transient highlight ring. */
type RecentlyChangedControl$2 = 'compactLayout' | 'navColor' | 'navLayout' | null;
/** The subset of the reference app's `PreviewMetrics` this sub-component reads. */
interface PreviewNavSurfaceMetrics {
    /** Height of the nav bar in pixels. */
    headerHeight: number;
}
/**
 * The subset of the reference app's `ServicesDashboardPreviewVisualConfig`
 * this sub-component reads — extends `PreviewCardVisualConfig` with the
 * nav-background fields, following the same local-type de-vendoring
 * precedent as `PreviewCard` (`wiki#680`).
 */
interface PreviewNavSurfaceVisualConfig extends PreviewCardVisualConfig {
    darkNavBgOpacity: number;
    lightNavBgOpacity: number;
    darkIntegrateNavBgOpacity: number;
    lightIntegrateNavBgOpacity: number;
}
/** Props for `<PreviewNavSurface>`. */
interface PreviewNavSurfaceProps {
    /** Narrows the trailing title-line width when true. */
    compactLayout: boolean;
    /** Which background tint the nav bar uses. */
    navColor: 'integrate' | 'apparent';
    metrics: PreviewNavSurfaceMetrics;
    /** Highlights the nav bar when this equals `'navLayout'` or `'navColor'`. */
    recentlyChanged: RecentlyChangedControl$2;
    visualConfig: PreviewNavSurfaceVisualConfig;
}

/**
 * A mocked-up horizontal nav bar — four skeleton "menu item" lines plus a
 * trailing title line, inside a themed surface that highlights when its
 * driving control was the last one changed.
 *
 * Extracted from `HorizontalPreview`'s own file as its own Scenario A
 * sub-component (`wiki#746`) — the reference source defined it as an
 * inline, unexported helper in the same file, which violates this repo's
 * `no-inline-helper-components` DoD rule.
 */
declare function PreviewNavSurface({ compactLayout, navColor, metrics, recentlyChanged, visualConfig, }: PreviewNavSurfaceProps): React$1.JSX.Element;

/** Which control last changed, for the transient highlight ring. */
type RecentlyChangedControl$1 = 'compactLayout' | 'navColor' | 'navLayout' | null;
/** The subset of the reference app's `PreviewMetrics` this component reads. */
interface HorizontalPreviewMetrics {
    /** Spacing (MUI spacing units) between the nav surface and the card grid. */
    gap: number;
    /** Height of the nav bar in pixels. */
    headerHeight: number;
}
/**
 * The subset of the reference app's `ServicesDashboardPreviewVisualConfig`
 * this component (and its `PreviewNavSurface` sub-component) reads.
 */
type HorizontalPreviewVisualConfig = PreviewNavSurfaceVisualConfig;
/** Props for `<HorizontalPreview>`. */
interface HorizontalPreviewProps {
    /** Narrows the nav bar's trailing line and switches the card grid to 3 columns. */
    compactLayout: boolean;
    /** Which background tint the nav bar uses. */
    navColor: 'integrate' | 'apparent';
    metrics: HorizontalPreviewMetrics;
    /** Highlights the nav bar (navLayout/navColor) or the card grid (compactLayout). */
    recentlyChanged: RecentlyChangedControl$1;
    visualConfig: HorizontalPreviewVisualConfig;
}

/**
 * A mocked-up horizontal-nav dashboard: a nav bar (`PreviewNavSurface`)
 * above a CSS-grid of `PreviewCard`s. Grid layout and card count both vary
 * by `compactLayout`. Ported from alexrebula-portfolio-poc's
 * `horizontal-preview.tsx` (LittleBranches/wiki#746).
 *
 * **Quality status (09 Sep 2026):** DoD not yet audited
 */
declare function HorizontalPreview({ compactLayout, navColor, metrics, recentlyChanged, visualConfig, }: HorizontalPreviewProps): React$1.JSX.Element;

/** Which control last changed, for the transient highlight ring. */
type RecentlyChangedControl = 'compactLayout' | 'navColor' | 'navLayout' | null;
/** The subset of the reference app's `PreviewMetrics` this component reads. */
interface SideNavPreviewMetrics {
    /** Spacing (MUI spacing units) used throughout the rail and main column. */
    gap: number;
    /** Height of the header bar in pixels. */
    headerHeight: number;
    /** Number of body lines per `PreviewCard` in the grid. */
    cardRows: number;
    /** Max rail width in pixels, per `navLayout`. */
    railWidth: {
        vertical: number;
        mini: number;
    };
}
/**
 * The subset of the reference app's `ServicesDashboardPreviewVisualConfig`
 * this component reads — extends `PreviewCardVisualConfig` with the
 * nav-background fields, following the same local-type de-vendoring
 * precedent as `PreviewCard` (`wiki#680`).
 */
interface SideNavPreviewVisualConfig extends PreviewCardVisualConfig {
    darkNavBgOpacity: number;
    lightNavBgOpacity: number;
    darkIntegrateNavBgOpacity: number;
    lightIntegrateNavBgOpacity: number;
}
/** Props for `<SideNavPreview>`. */
interface SideNavPreviewProps {
    /** Denser rail/header padding and a 3-column card grid when true. */
    compactLayout: boolean;
    /** Which background tint the rail and header use. */
    navColor: 'integrate' | 'apparent';
    /** Vertical (full labels) or mini (icon-only) rail. */
    navLayout: 'vertical' | 'mini';
    metrics: SideNavPreviewMetrics;
    /** Highlights the rail (navLayout/navColor) or the card grid (compactLayout). */
    recentlyChanged: RecentlyChangedControl;
    visualConfig: SideNavPreviewVisualConfig;
}

/**
 * A mocked-up side-rail dashboard: a vertical or mini icon-only rail next
 * to a main column with a header bar and a CSS-grid of `PreviewCard`s.
 * Ported from alexrebula-portfolio-poc's `side-nav-preview.tsx`
 * (LittleBranches/wiki#747).
 *
 * **Quality status (09 Sep 2026):** DoD not yet audited
 */
declare function SideNavPreview({ compactLayout, navColor, navLayout, metrics, recentlyChanged, visualConfig, }: SideNavPreviewProps): React$1.JSX.Element;

/** The nav-related settings this component reads and reports changes to. */
interface DashboardMockupPreviewNavSettings {
    compactLayout: boolean;
    navColor: 'integrate' | 'apparent';
    /** `'horizontal'` renders `HorizontalPreview`; `'vertical'`/`'mini'` render `SideNavPreview`. */
    navLayout: 'vertical' | 'horizontal' | 'mini';
}
/** All user-facing copy — fully overridable so no text is hardcoded for one call site. */
interface DashboardMockupPreviewContent {
    overline: string;
    heading: string;
    description: string;
    compactDensityLabel: string;
    comfortableDensityLabel: string;
    navLabelPrefix: string;
    colorLabelPrefix: string;
    lastChangeCompactLabel: string;
    lastChangeComfortableLabel: string;
    lastChangeNavLayoutPrefix: string;
    lastChangeNavColorPrefix: string;
    lastChangeFallbackLabel: string;
}
/**
 * Every computed-color input across this component and the sub-primitives
 * it composes (`HorizontalPreview`/`SideNavPreview`), plus the two
 * canvas-background fields only this top-level component reads.
 */
interface DashboardMockupPreviewVisualConfig extends HorizontalPreviewVisualConfig {
    darkCanvasBgOpacity: number;
    lightCanvasBgOpacity: number;
}
/** The `compact`/`relaxed` metrics presets, keyed by `compactLayout`. */
interface DashboardMockupPreviewMetricsPresets {
    compact: SideNavPreviewMetrics;
    relaxed: SideNavPreviewMetrics;
}
/** Props for `<DashboardMockupPreview>`. */
interface DashboardMockupPreviewProps extends DashboardMockupPreviewNavSettings {
    /** Overrides merged onto the default copy — only the fields you pass change. */
    content?: Partial<DashboardMockupPreviewContent>;
    /** Overrides merged onto the default visual config — only the fields you pass change. */
    visualConfig?: Partial<DashboardMockupPreviewVisualConfig>;
}

/**
 * A self-contained, interactive dashboard mockup — a themed frame around a
 * live-updating preview surface (`HorizontalPreview` or `SideNavPreview`,
 * chosen by `navLayout`) plus a row of control chips and a "what just
 * changed" caption. Composes the whole `preview` primitive family
 * (`PreviewLine`/`PreviewCard`/`HorizontalPreview`/`SideNavPreview`).
 * Ported from alexrebula-portfolio-poc's `ServicesDashboardPreview`
 * (LittleBranches/wiki#707) — renamed to shed the portfolio-specific
 * "Services" prefix, since nothing about it is app-bound: `content` and
 * `visualConfig` are both fully overridable, and the four sub-primitives
 * take no portfolio data at all.
 *
 * **Quality status (09 Sep 2026):** DoD not yet audited
 */
declare function DashboardMockupPreview({ compactLayout, navColor, navLayout, content, visualConfig, }: DashboardMockupPreviewProps): React$1.JSX.Element;

declare const DEFAULT_DASHBOARD_MOCKUP_PREVIEW_CONTENT: DashboardMockupPreviewContent;
declare const DEFAULT_DASHBOARD_MOCKUP_PREVIEW_VISUAL_CONFIG: DashboardMockupPreviewVisualConfig;
/** `compact`/`relaxed` metrics presets, selected by `compactLayout`. */
declare const DASHBOARD_MOCKUP_PREVIEW_METRICS: DashboardMockupPreviewMetricsPresets;

export { TOGGLE_ICON_SIZE as ACCORDION_CHECK_ICON_SIZE, ACCORDION_DONE_MIN_TOUCH_TARGET, TOGGLE_MIN_TOUCH_TARGET as ACCORDION_ICON_BUTTON_MIN_SIZE, Accordion, type AccordionProps, AlexRebulaBrandMark, AnimatedGradientText, type AnimatedGradientTextProps, AppShell, type AppShellProps, BACK_TO_TOP_BUTTON_DEFAULT_SCROLL_THRESHOLD, BACK_TO_TOP_BUTTON_SIZE, BACK_TO_TOP_BUTTON_WCAG_MIN_SIZE, BackToTopButton, type BackToTopButtonProps, type BaseSettingsState, type BioHeroBackgroundOverlay, type BioHeroCta, type BioHeroLogo, BioHeroSection, type BioHeroSectionProps, BrandLogo, type BrandLogoProps, type BrandLogoThemeInputs, ClientLogoStrip, type ClientLogoStripItem, type ClientLogoStripProps, ControlWithBlurb, type ControlWithBlurbProps, DASHBOARD_MOCKUP_PREVIEW_METRICS, DEFAULT_DASHBOARD_MOCKUP_PREVIEW_CONTENT, DEFAULT_DASHBOARD_MOCKUP_PREVIEW_VISUAL_CONFIG, DEFAULT_ICON_ACTIONS, DashboardMockupPreview, type DashboardMockupPreviewContent, type DashboardMockupPreviewMetricsPresets, type DashboardMockupPreviewNavSettings, type DashboardMockupPreviewProps, type DashboardMockupPreviewVisualConfig, type DecorationElement, type DecorationKind, DynamicField, type DynamicFieldConfig, type DynamicFieldOption, type DynamicFieldProps, type DynamicFieldType, DynamicForm, type DynamicFormProps, FONT_FAMILY_OPTIONS_COLUMNS, FONT_FAMILY_OPTIONS_FALLBACK_STACK, FONT_FAMILY_OPTIONS_VARIABLE_SUFFIX, FONT_SIZE_SLIDER_DEFAULT_MAX, FONT_SIZE_SLIDER_DEFAULT_MIN, type FeatureFlowGridSize, type FeatureFlowHighlightCard, type FeatureFlowImage, type FeatureFlowItem, type FeatureFlowMetric, FeatureFlowSection, type FeatureFlowSectionProps, type FeatureFlowTechnology, Field, FontFamilyOptions, type FontFamilyOptionsProps, FontSizeSlider, type FontSizeSliderProps, Form, type FormProps, GISELLE_PRIMARY_DARK_MAIN, GISELLE_PRIMARY_MAIN, GISELLE_SECONDARY_MAIN, GiselleIcon, type GiselleIconData, type GiselleIconMap, type GiselleIconProps, type GiselleSettingsContextValue, GiselleSettingsProvider, type GiselleSettingsProviderProps, GiselleThemeAndSettingsProvider, type GiselleThemeAndSettingsProviderProps, GiselleThemeProvider, type GiselleThemeProviderProps, type HeroColorKey, HeroSection, type HeroSectionProps, type HeroSlotProps, HorizontalPreview, type HorizontalPreviewMetrics, type HorizontalPreviewProps, type HorizontalPreviewVisualConfig, IconActionBar, type IconActionBarProps, type IconActionItem, IconStrip, type IconStripItem, type IconStripProps, type IntegrationsShowcaseImage, IntegrationsShowcaseSection, type IntegrationsShowcaseSectionProps, Label, type LabelColor, type LabelProps, type LabelVariant, MetricCard, type MetricCardColor, MetricCardDecoration, type MetricCardDecorationProps, type MetricCardProps, type NestedChecklistState, OptionList, type OptionListItem, type OptionListProps, PREVIEW_LINE_DEFAULT_HEIGHT, PREVIEW_LINE_DEFAULT_OPACITY, PREVIEW_LINE_ROUNDED_RADIUS, PREVIEW_LINE_SQUARE_RADIUS, PageSection, type PageSectionProps, type PaletteColorKey, PlatformIconStrip, type PlatformIconStripItem, type PlatformIconStripProps, PreviewCard, type PreviewCardMetrics, type PreviewCardProps, type PreviewCardVisualConfig, PreviewLine, type PreviewLineProps, PreviewNavSurface, type PreviewNavSurfaceMetrics, type PreviewNavSurfaceProps, type PreviewNavSurfaceVisualConfig, type ProfileStat, ProfileSummaryCard, type ProfileSummaryCardProps, PublicFooter, type PublicFooterLink, type PublicFooterLinkGroup, type PublicFooterProps, type PublicFooterSocialLink, PublicNav, type PublicNavItem, type PublicNavProps, QuoteCard, type QuoteCardProps, RHFAutocomplete, type RHFAutocompleteOption, type RHFAutocompleteProps, RHFCheckbox, type RHFCheckboxProps, RHFCode, type RHFCodeProps, RHFCountrySelect, type RHFCountrySelectProps, RHFDatePicker, type RHFDatePickerProps, RHFDateTimePicker, type RHFDateTimePickerProps, RHFMultiCheckbox, type RHFMultiCheckboxOption, type RHFMultiCheckboxProps, RHFMultiSelect, type RHFMultiSelectProps, RHFMultiSwitch, type RHFMultiSwitchOption, type RHFMultiSwitchProps, RHFNumberInput, type RHFNumberInputProps, RHFPhoneInput, type RHFPhoneInputProps, RHFRadioGroup, type RHFRadioGroupOption, type RHFRadioGroupProps, RHFRating, type RHFRatingProps, RHFSelect, type RHFSelectOption, type RHFSelectProps, RHFSlider, type RHFSliderProps, RHFSwitch, type RHFSwitchProps, RHFTextField, type RHFTextFieldProps, RHFTimePicker, type RHFTimePickerProps, RHFUpload, RHFUploadAvatar, type RHFUploadAvatarProps, RHFUploadBox, type RHFUploadBoxProps, type RHFUploadProps, STAT_CARD_SPARKLINE_OPTIONS, SectionCaption, type SectionCaptionProps, SectionContainer, type SectionContainerProps, SectionTitle, type SectionTitleProps, SelectableCard, type SelectableCardProps, SelectableLabel, type SelectableLabelProps, type SetCookieOptions, type ShowcaseRowOrientation, SideNavPreview, type SideNavPreviewMetrics, type SideNavPreviewProps, type SideNavPreviewVisualConfig, StatCard, type StatCardColor, type StatCardItem, type StatCardProps, StatCardRow, type StatCardRowProps, type StatusColorKey, StatusLabel, type StatusLabelProps, type StatusLabelStatus, type StorageAdapter, TOGGLE_ICON_SIZE, TOGGLE_MIN_TOUCH_TARGET, TableEmptyRows, type TableEmptyRowsProps, type TableHeadCellProps, TableHeadCustom, type TableHeadCustomProps, TablePaginationCustom, type TablePaginationCustomProps, TableSkeleton, type TableSkeletonProps, type TechIconItem, TechIconStrip, type TechIconStripProps, type TestimonialWallItem, type TestimonialsWallColumns, TestimonialsWallSection, type TestimonialsWallSectionProps, TitledBlock, type TitledBlockProps, type TitledBlockSize, ToggleCard, type ToggleCardProps, ToggleIconButton, type ToggleIconButtonProps, TwoColumnShowcaseRow, type TwoColumnShowcaseRowProps, type TwoColumnShowcaseRowText, type UseLocalStorageReturn, type UseTableProps, type UseTableReturn, channelAlpha, createIconRegistrar, emptyRows, getComparator, getCookieValue, giselleTheme, giselleThemeOptions, hexToChannel, isDeepEqual, pxToRem, remToPx, resolveMaturityColor, resolveMaturityLabel, rowInPage, setCookieValue, useGiselleSettings, useLocalStorage, useNestedChecklist, useTable };

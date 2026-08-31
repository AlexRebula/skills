import * as _mui_material_styles from '@mui/material/styles';
import { CssVarsThemeOptions, CssVarsTheme, SxProps, Theme } from '@mui/material/styles';
import * as react from 'react';
import react__default, { ReactNode } from 'react';
import { IconProps } from '@iconify/react';
import { ChipProps } from '@mui/material/Chip';
import { AccordionProps as AccordionProps$1 } from '@mui/material/Accordion';
import { IconButtonProps } from '@mui/material/IconButton';
import { BoxProps } from '@mui/material/Box';
import { PaperProps } from '@mui/material/Paper';
import { ButtonBaseProps } from '@mui/material/ButtonBase';
import { CardProps } from '@mui/material/Card';
import { GridProps } from '@mui/material/Grid';
import { TooltipProps } from '@mui/material/Tooltip';
import { ContainerProps } from '@mui/material/Container';
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
 */
declare function GiselleThemeProvider({ children, themeOverrides, theme, defaultMode, }: GiselleThemeProviderProps): react.JSX.Element;

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
 */
declare function GiselleSettingsProvider<TState extends BaseSettingsState>({ children, defaultSettings, initialState, storageKey, storage, }: GiselleSettingsProviderProps<TState>): react.JSX.Element;

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
 */
declare function GiselleThemeAndSettingsProvider<TState extends BaseSettingsState>({ children, defaultSettings, initialState, storageKey, storage, themeOverrides, theme, defaultMode, getMode, }: GiselleThemeAndSettingsProviderProps<TState>): react.JSX.Element;

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
interface GiselleIconProps extends Omit<react__default.HTMLAttributes<HTMLSpanElement>, 'style' | 'className' | 'children'> {
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
    style?: react__default.CSSProperties;
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
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function GiselleIcon({ icon, width, height, sx, className, style, flip, rotate, ...other }: GiselleIconProps): react.JSX.Element;

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
 * **Quality status (23 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare const StatusLabel: react__default.ForwardRefExoticComponent<Omit<StatusLabelProps, "ref"> & react__default.RefAttributes<HTMLDivElement>>;

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

/** A toggleable chip for multi-select filter groups, built on MUI `Chip` with `SelectableCard`'s selected-state styling. */
declare const SelectableLabel: react.ForwardRefExoticComponent<Omit<SelectableLabelProps, "ref"> & react.RefAttributes<HTMLDivElement>>;

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
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13 · Coverage 100% · Cleanup complete
 */
declare function Accordion({ title, children, checklist, done, indeterminate, onDoneButtonClick, leadingIcon, leadingAction, trailingContent, expandIcon, checkIcon, checkDoneIcon, checkHoverIcon, sx, ...other }: AccordionProps): react.JSX.Element;

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
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function ToggleIconButton({ pressed, idleIcon, pressedIcon, hoverIcon, onPressedChange, sx, ...other }: ToggleIconButtonProps): react.JSX.Element;

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
 */
declare function MetricCardDecoration({ color, sx, ...other }: MetricCardDecorationProps): react.JSX.Element;

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
 * **Quality status (8 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function MetricCard({ value, label, sublabel, icon, color, decoration, elevation, sx, ...other }: MetricCardProps): react.JSX.Element;

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
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function SelectableCard({ selected, disabled, children, sx, ...other }: SelectableCardProps): react.JSX.Element;

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
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function QuoteCard({ quote, author, source, color, elevation, sx, ...other }: QuoteCardProps): react.JSX.Element;

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
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function StatCard({ label, value, trend, trendLabel, icon, color, chart, sx, ...other }: StatCardProps): react.JSX.Element;

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
 * **Quality status (July 2026):** DoD — complete
 */
declare function StatCardRow({ items, renderChart, sx, ...other }: StatCardRowProps): react.JSX.Element;

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

declare function ProfileSummaryCard({ name, role, avatarSrc, stats, sx, ...other }: ProfileSummaryCardProps): react.JSX.Element;

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
    component?: react__default.ElementType;
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
 * **Quality status (8 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function IconActionBar({ actions, sx, ...other }: IconActionBarProps): react.JSX.Element;

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
    controls: react__default.ReactNode;
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
    controlsAlign?: react__default.CSSProperties['alignItems'];
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
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function TwoColumnShowcaseRow({ text, controls, orientation, controlsAlign, textSx, controlsSx, sx, ...other }: TwoColumnShowcaseRowProps): react.JSX.Element;

type TextSlotProps = {
    sx?: SxProps<Theme>;
};
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
     * Rendered tag for the heading. `h1` keeps this component's own `h2`
     * visual sizing/weight - only the semantic tag changes, so a page's one
     * real `<h1>` (e.g. its own hero) can still look identical to every other
     * `SectionTitle` on the page.
     * @default 'h2'
     */
    titleComponent?: 'h1' | 'h2';
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
type SectionCaptionProps = {
    title: ReactNode;
    sx?: SxProps<Theme>;
};

/**
 * `SectionCaption` renders the overline label above the section heading.
 * Exported so consumers can use it standalone when they need just the overline.
 *
 * **Quality status (13 May 2026):** DoD 9/9 · Best practices 13/13
 */
declare function SectionCaption({ title, sx, ...other }: SectionCaptionProps): react.JSX.Element;

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
 * `variant="h2"` sizing does not, so it still looks identical to every
 * other `SectionTitle` on the page.
 *
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function SectionTitle({ sx, title, caption, slotProps, txtGradient, description, titleComponent, ...other }: SectionTitleProps): react.JSX.Element;

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
 * **Quality status (14 May 2026):** DoD 21/21 · Best practices 13/13
 */
declare function SectionContainer({ children, maxWidth, py, sx, ...other }: SectionContainerProps): react.JSX.Element;

/** Every decorative piece `BasicSection` knows how to render. */
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
 * Props for `<BasicSection>`.
 */
interface BasicSectionProps extends Omit<BoxProps<'section'>, 'component'> {
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
     * point: every section built on `BasicSection` gets the same content
     * width and vertical rhythm for free, instead of each one hand-rolling
     * its own `Container` (as every section did before this existed; see
     * `SectionContainer`'s own README). These three props forward to it.
     */
    containerMaxWidth?: ContainerProps['maxWidth'];
    /** @default SectionContainer's own default, `{ xs: 8, md: 12 }` */
    containerPy?: SectionContainerProps['py'];
    containerSx?: SxProps<Theme>;
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
 * `BasicSection` — the canonical section wrapper: a consistent decorative
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
 * around `BasicSection` to add a second `Container` inside it.
 *
 * @example
 * ```tsx
 * <BasicSection>
 *   <Typography variant="h2">Section heading</Typography>
 * </BasicSection>
 * ```
 */
declare const BasicSection: react__default.ForwardRefExoticComponent<Omit<BasicSectionProps, "ref"> & react__default.RefAttributes<HTMLElement>>;

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
 * **Quality status (14 May 2026):** DoD 21/21 · Best practices 13/13
 */
declare function HeroSection({ heading, text, actions, icons, color, sx, ...other }: HeroSectionProps): react.JSX.Element;

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
     * Renders the standard `BasicSection` decorative frame (corner marks,
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
 * **Quality status (28 Aug 2026):** DoD 19/20 · Best practices 10/13
 */
declare const FeatureFlowSection: react__default.ForwardRefExoticComponent<Omit<FeatureFlowSectionProps, "ref"> & react__default.RefAttributes<HTMLElement>>;

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
 */
declare function AnimatedGradientText({ children, color1, color2, duration, component, sx, ...other }: AnimatedGradientTextProps): react.JSX.Element;

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
 */
declare function TechIconStrip({ items, heading, centeredWrap, sx, ...other }: TechIconStripProps): react.JSX.Element;

export { TOGGLE_ICON_SIZE as ACCORDION_CHECK_ICON_SIZE, ACCORDION_DONE_MIN_TOUCH_TARGET, TOGGLE_MIN_TOUCH_TARGET as ACCORDION_ICON_BUTTON_MIN_SIZE, Accordion, type AccordionProps, AnimatedGradientText, type AnimatedGradientTextProps, type BaseSettingsState, BasicSection, type BasicSectionProps, DEFAULT_ICON_ACTIONS, type DecorationElement, type DecorationKind, type FeatureFlowGridSize, type FeatureFlowHighlightCard, type FeatureFlowImage, type FeatureFlowItem, type FeatureFlowMetric, FeatureFlowSection, type FeatureFlowSectionProps, type FeatureFlowTechnology, GISELLE_PRIMARY_DARK_MAIN, GISELLE_PRIMARY_MAIN, GISELLE_SECONDARY_MAIN, GiselleIcon, type GiselleIconData, type GiselleIconMap, type GiselleIconProps, type GiselleSettingsContextValue, GiselleSettingsProvider, type GiselleSettingsProviderProps, GiselleThemeAndSettingsProvider, type GiselleThemeAndSettingsProviderProps, GiselleThemeProvider, type GiselleThemeProviderProps, type HeroColorKey, HeroSection, type HeroSectionProps, type HeroSlotProps, IconActionBar, type IconActionBarProps, type IconActionItem, MetricCard, type MetricCardColor, MetricCardDecoration, type MetricCardDecorationProps, type MetricCardProps, type NestedChecklistState, type PaletteColorKey, type ProfileStat, ProfileSummaryCard, type ProfileSummaryCardProps, QuoteCard, type QuoteCardProps, STAT_CARD_SPARKLINE_OPTIONS, SectionCaption, SectionContainer, type SectionContainerProps, SectionTitle, type SectionTitleProps, SelectableCard, type SelectableCardProps, SelectableLabel, type SelectableLabelProps, type SetCookieOptions, type ShowcaseRowOrientation, StatCard, type StatCardColor, type StatCardItem, type StatCardProps, StatCardRow, type StatCardRowProps, type StatusColorKey, StatusLabel, type StatusLabelProps, type StatusLabelStatus, type StorageAdapter, TOGGLE_ICON_SIZE, TOGGLE_MIN_TOUCH_TARGET, type TechIconItem, TechIconStrip, type TechIconStripProps, ToggleIconButton, type ToggleIconButtonProps, TwoColumnShowcaseRow, type TwoColumnShowcaseRowProps, type TwoColumnShowcaseRowText, type UseLocalStorageReturn, channelAlpha, createIconRegistrar, getCookieValue, giselleTheme, giselleThemeOptions, hexToChannel, isDeepEqual, pxToRem, remToPx, resolveMaturityColor, resolveMaturityLabel, setCookieValue, useGiselleSettings, useLocalStorage, useNestedChecklist };

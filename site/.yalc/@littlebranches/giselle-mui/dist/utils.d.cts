import * as React from 'react';
import { TimelineDotProps } from '@mui/lab/TimelineDot';
import * as _mui_material_styles from '@mui/material/styles';
import { CssVarsThemeOptions } from '@mui/material/styles';

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

type StatCardColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

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

type ReactNode = React.ReactNode;

/** Structured rich content rendered inside a task details modal or drawer. */
interface TaskDetails {
    /** Optional short summary rendered above the main content. */
    summary?: ReactNode;
    /** Arbitrary rich content for modal/drawer presentation. */
    content?: ReactNode;
    /** Optional nested tasks shown inside the details surface. */
    tasks?: Task[];
}
/**
 * Base unit for any trackable work item in the timeline.
 *
 * `TimelinePhase`, `TimelineMilestone`, and every nested sub-task all share this shape.
 * The shared base keeps phase/milestone/task shapes consistent for done-state propagation.
 *
 * - All `children` done → parent can be auto-marked done.
 * - Any `children` un-done → parent reverts to not-done.
 * - Current timeline UI/callback plumbing is position-based and supports one visible
 *   nested `children` level for interactive toggling.
 */
type Task = {
    /** Stable identifier for this work item. */
    key: number | string;
    /** Display text for this work item. */
    title: string;
    /** Short label for collapsed display. Falls back to `title` when omitted. */
    shortTitle?: string;
    /** Optional summary shown inline when the parent accordion row expands. */
    description?: string;
    /** Human-readable date label. */
    date?: string;
    /** Whether this task is complete. */
    done?: boolean;
    /** Optional icon slot rendered in the leading dot. */
    icon?: ReactNode;
    /** Optional palette key for the leading dot. */
    color?: TimelineDotProps['color'];
    /** Optional rich details rendered in a modal or drawer. */
    details?: TaskDetails;
    /**
     * Nested sub-tasks.
     *
     * Data may include deeper nesting, but current timeline rendering/toggle callbacks
     * operate on one visible nested level.
     *
     * Replaces the legacy flat `details: string[]` field. Migrate data files by converting
     * each string to `{ title: string }`.
     */
    children?: Task[];
};
/**
 * A single platform / tech-stack entry for `TimelinePhase.platforms`.
 *
 * - **Preferred form:** `{ icon: ReactNode; label: string }` — renders a tooltip-wrapped icon slot.
 *   Use `<GiselleIcon icon={...} width={24} />` or any icon element.
 * - **String form:** backward-compatibility shim only. The string is rendered as a plain text
 *   label chip with no icon slot. Strings are **not** interpreted as icon IDs.
 *   Prefer the object form for all new entries.
 */
type TimelinePlatformItem = {
    icon: ReactNode;
    label: string;
} | string;
/**
 * A milestone on the timeline spine — a tracked point-in-time event between two phases.
 *
 * Extends `Task` — every milestone has its own `done` state and can carry nested sub-tasks
 * via `children`. The legacy `details: string[]` flat array is preserved for backward
 * compatibility but superseded by `children`.
 */
type TimelineMilestone = Task & {
    /** Human-readable date shown on the milestone badge (e.g. `'Mar 2022'`). */
    date: string;
    /** Display title of the milestone. */
    title: string;
    /**
     * Glanceable 2–4 word label shown in the collapsed milestone card at rest.
     * Falls back to `title` when omitted.
     */
    shortTitle?: string;
    /**
     * Short description shown when the milestone card is hovered or expanded.
     * Provides context about what this milestone is and why it matters.
     */
    description?: string;
    /** Icon rendered inside the milestone dot. Pass any ReactNode icon slot. */
    icon: ReactNode;
    /** MUI TimelineDot color. */
    color?: TimelineDotProps['color'];
    /**
     * @deprecated Use `children` (inherited from `Task`) instead.
     *
     * Kept for backward compatibility. The component renders `children` first; when
     * absent it falls back to mapping these strings to `{ title: string }` Task objects.
     * Migrate data files by converting `details: ['text']` to `children: [{ title: 'text' }]`.
     */
    details?: string[];
    /** Dims the milestone badge and card — mirrors the phase-level `done` flag. */
    done?: boolean;
    /** Renders the milestone badge in error (red) colour when not done. */
    overdue?: boolean;
    /** Marks this milestone as newly added — renders a "NEW" dot near the title. Clear once seen. */
    new?: boolean;
    /**
     * Overrides the spine dot circle background colour.
     * Accepts any CSS colour string (e.g. `'#111'`).
     * Useful when a brand icon has a specific colour that clashes with the palette-derived background.
     */
    dotBg?: string;
    /**
     * Custom tooltip shown on the milestone dot in the centre spine.
     *
     * When omitted the tooltip is computed automatically:
     * - **Read-only mode:** first sentence of `description` (capped at 72 characters) →
     *   falls back to `shortTitle ?? title` + `date` when `description` is absent.
     * - **Checklist mode:** status label (`Done`, `Blocking`, etc.) + `date`.
     *
     * Set this explicitly to override the computed value with a custom metric or note.
     */
    dotTooltip?: string;
    /**
     * Which column this milestone renders in.
     *
     * Inherits the parent `phase.side` when omitted — the milestone appears in the
     * same column as its phase card. Set explicitly to place the milestone in the
     * **opposite** column (e.g. a tech-context event on a professional phase that
     * should appear in the "Education & Open Source" column).
     */
    side?: 'left' | 'right';
};
type TimelinePhase = Task & {
    /** Numeric sort key. Fractional keys (e.g. 4.5) interleave life events between roles. */
    key: number;
    /** Display title of the phase — shown as the card heading. */
    title: string;
    /**
     * Glanceable 2–4 word label shown in the collapsed card at rest.
     * Falls back to `title` when omitted.
     *
     * **Three-level disclosure model:**
     * - REST (collapsed): `shortTitle` (or `title` if omitted)
     * - HOVER (before click): full `title` + `description`
     * - EXPANDED (after click): full `title` + `description` + `details[]`
     */
    shortTitle?: string;
    /** Short summary paragraph shown below the title on the default card view.
     * Optional for `variant: 'marker'` entries, which have no card. */
    description?: string;
    /** Human-readable date range (e.g. `'Jan 2020 – Mar 2022'`). Also used for automatic overdue detection in checklist mode. */
    date: string;
    /** Icon rendered inside the TimelineDot. Size is controlled via CSS (wrapping Box sets `& svg: { width, height }`) — pass any ReactNode icon slot. */
    icon: ReactNode;
    /** MUI TimelineDot color. */
    color?: TimelineDotProps['color'];
    /** Which column this item appears in. */
    side: 'left' | 'right';
    /**
     * @deprecated Use `children` (inherited from `Task`) instead.
     *
     * Kept for backward compatibility. The component renders `children` first; when
     * absent it falls back to mapping these strings to `{ title: string }` Task objects.
     * Migrate data files by converting `details: ['text']` to `children: [{ title: 'text' }]`.
     */
    details?: string[];
    /**
     * Custom tooltip shown on the phase dot in the centre spine.
     *
     * When omitted the tooltip is computed automatically:
     * - **Read-only mode:** first sentence of `description` (capped at 72 characters) →
     *   falls back to `shortTitle ?? title` + `date` when `description` is absent.
     * - **Checklist mode:** status label (`Done`, `Blocking`, etc.) + `date`.
     *
     * Set this explicitly to override the computed value with a custom metric, status
     * note, or any text not derived from `description`.
     */
    dotTooltip?: string;
    /**
     * Tech stack icons for this entry. Each item provides a `ReactNode` icon and an accessible label.
     * Renders as a horizontal strip of icon slots with a tooltip per item.
     * Use `<GiselleIcon icon={...} width={24} />` or any icon element.
     *
     * Also accepts a plain `string[]` for backward compatibility — strings are rendered as labels
     * with no icon slot. Prefer the `{ icon, label }` form for full icon rendering.
     *
     * See {@link TimelinePlatformItem} for the full union type.
     */
    platforms?: TimelinePlatformItem[];
    /**
     * Label displayed above the tech stack strip.
     * @default 'Tech Stack'
     */
    platformsLabel?: string;
    /**
     * 'scenario' — coloured left border + badge label (used for scheduling scenarios with multiple options).
     * 'life-event' — coloured left border + tinted background (used in career timeline).
     * 'marker' — spine-only: dot + floating label, no card. For single point-in-time events
     *             that don't warrant a full phase card (e.g. a certification date, a visa grant).
     */
    variant?: 'scenario' | 'life-event' | 'marker';
    /** Label shown as a badge above the card when variant='scenario'. */
    scenarioLabel?: string;
    /** Marks this phase as past-due without being done.
     * Renders the dot and connector in error (red) colour as a visual warning.
     */
    overdue?: boolean;
    /** Marks this phase as currently in progress — renders a pulsing badge above the card. */
    active?: boolean;
    /**
     * Nested milestone keypoints on the connector spine between this phase and the next.
     * Each milestone renders as a coloured badge dot on the spine.
     */
    milestones?: TimelineMilestone[];
    /**
     * Client logos shown as a horizontal strip directly in the card (always visible).
     * Each entry is a public path (e.g. '/assets/icons/clients/nbn.svg') plus an accessible name.
     */
    clients?: Array<{
        name: string;
        logo: string;
    }>;
    /** Label displayed above the client logo strip. Set this to something meaningful, e.g. 'Delivered for' or 'Trusted by'. */
    clientsLabel?: string;
    /**
     * Project/product logos shown as a horizontal strip — for showcasing your own work, side-projects, or open-source.
     * Each entry is a public path plus an accessible name.
     */
    projects?: Array<{
        name: string;
        logo: string;
    }>;
    /** Label displayed above the projects logo strip. E.g. 'Building in public' or 'Current projects'. */
    projectsLabel?: string;
    /** Marks this phase as newly added — renders a pulsing "NEW" badge on the card. Clear this flag once the audience has seen the update. */
    new?: boolean;
    /**
     * Label for the pulsing active badge above the card.
     * @default 'Now'
     */
    activeLabel?: string;
    /** Suppress the date label inside the card. Useful when the date is obvious from context (e.g. active/"Now" entries). */
    hideDate?: boolean;
    /**
     * Suppress the `MetricCardDecoration` and corner icon for this specific step.
     * By default both are shown on all non-highlighted cards regardless of `side`.
     */
    hideDecoration?: boolean;
    /**
     * Optional personal photo displayed as a block image at `maxWidth: 200px` below the description.
     * Use for historic snapshots, childhood photos, or other memorable moments on the timeline.
     * For a single photo. Use `photos` when you have more than one.
     */
    photo?: {
        src: string;
        alt: string;
    };
    /**
     * Multiple personal photos rendered as stacked thumbnails below the description.
     * Each photo is displayed as a rounded block image at `maxWidth: 200px`.
     * Use when you have two or more photos for the same moment. Takes precedence over `photo`
     * when both are provided.
     */
    photos?: Array<{
        src: string;
        alt: string;
    }>;
    /**
     * Text alignment for card content. Defaults to `'left'` regardless of which column the card
     * sits in. Set to `'right'` from the data layer when right-aligned content is intentional.
     * @default 'left'
     */
    textAlign?: 'left' | 'right';
    /**
     * Optional footer slot rendered at the bottom of the card's always-visible content area,
     * below all icon strips and above the expandable detail bullets.
     *
     * Use for interactive elements (play buttons, links, counters) that belong contextually
     * to the card but aren't part of the expandable detail section.
     *
     * ```tsx
     * footer={<PlayButton />}
     * ```
     */
    footer?: ReactNode;
};

/**
 * Transforms a `TimelinePhase[]` array so that each milestone's column placement
 * is derived automatically from its `done` state:
 *
 * - `done: true`  → `side: 'left'`  (Complete column)
 * - `done: false` → `side: 'right'` (Remaining column)
 *
 * **When to use:**
 * For checklist-style timelines where the two columns represent "Complete" and
 * "Remaining" — and the column a milestone belongs to is a function of its progress
 * state, not of a manual data entry.
 *
 * **Explicit overrides are preserved:**
 * If a milestone already has an explicit `side` property set in the data, that value
 * is kept unchanged. The auto-assignment only fills in milestones where `ms.side` is
 * `undefined`.
 *
 * **Where this logic lives (architectural rationale):**
 * The library's `TimelineTwoColumn` component does not automatically re-route milestones
 * based on `done` because it has no knowledge of the columns' semantic meaning — a
 * consumer could use "Past / Future", "Professional / Personal", or any other axis.
 * This transform lives in the consuming app's data layer (`sections-api/`), which is
 * where business semantics belong. The library exports the function so consumers don't
 * have to rediscover the correct `side` mapping pattern.
 *
 * @example
 * ```ts
 * // In sections-api/store-readiness/data.tsx
 * import { assignMilestoneSidesByDone } from '@littlebranches/giselle-mui';
 *
 * export const storeReadinessPhases = assignMilestoneSidesByDone(rawPhases);
 * ```
 */
declare function assignMilestoneSidesByDone(phases: TimelinePhase[]): TimelinePhase[];

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

/**
 * Storybook/demo breakpoint widths for visual tests and responsive stories.
 *
 * **These are NOT MUI's default breakpoint values.** MUI's xs starts at 0px.
 * These arrays start xs at 360px — the smallest practical device width — which
 * is the correct lower bound for visual demos. xl is intentionally omitted
 * (no common device cap exists at a single fixed width above 1200px).
 *
 * **Why not `theme.breakpoints.values`?**
 * `theme.breakpoints.values` is not available at module scope without a theme
 * instance. These constants are resolvable at import time, making them safe to
 * use in test files, story scaffold, and any non-component context.
 */
/** One entry in a breakpoint list — a human-readable label + pixel width. */
interface BreakpointEntry {
    /** Display label, e.g. `'xs — 360px'`. */
    label: string;
    /** Container width in pixels. */
    width: number;
}
/** One entry in a breakpoint grid list — adds a column count for grid layouts. */
interface BreakpointGridEntry extends BreakpointEntry {
    /**
     * Number of columns to show at this breakpoint in a grid layout.
     * Typical values: xs=1, sm=2, md=3, lg=4.
     */
    cols: number;
}
/**
 * Storybook/demo breakpoints for single-column responsive stories.
 *
 * Provides the four Storybook breakpoints (xs/sm/md/lg) in two shapes:
 * - `BREAKPOINTS` — for single-component responsive containers (no `cols`)
 * - `BREAKPOINTS_GRID` — for card/grid responsive containers (with `cols`)
 *
 * Import from `src/stories-defaults.ts` — not from here directly.
 *
 * Usage in Storybook `Responsive` stories:
 * ```tsx
 * {BREAKPOINTS.map(({ label, width }) => (
 *   <Box key={label} sx={[breakpointContainerSx, { width }]}>
 *     <Typography sx={breakpointLabelSx}>{label}</Typography>
 *     <MyComponent />
 *   </Box>
 * ))}
 * ```
 */
/**
 * Storybook demo breakpoints for single-component Responsive stories.
 * xs (360px), sm (600px), md (900px), lg (1200px).
 */
declare const BREAKPOINTS: BreakpointEntry[];
/**
 * Standard MUI breakpoints with responsive column counts for grid layouts.
 *
 * Use in Storybook `Responsive` stories for card grids:
 * ```tsx
 * {BREAKPOINTS_GRID.map(({ label, width, cols }) => (
 *   <Box key={label} sx={[breakpointContainerSx, { width }]}>
 *     <Typography sx={breakpointLabelSx}>{label}</Typography>
 *     <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 2 }}>
 *       {items.map((item) => <MyCard key={item.id} {...item} />)}
 *     </Box>
 *   </Box>
 * ))}
 * ```
 * MUI standard breakpoints for grid-based Responsive stories.
 * Column count scales from 1 (xs) to 4 (lg).
 */
declare const BREAKPOINTS_GRID: BreakpointGridEntry[];

/**
 * Preloads a list of image URLs by creating hidden `Image` instances.
 *
 * Compatible with React 18 and React 19. Call inside `useEffect` so images
 * are preloaded after mount without creating objects on every render.
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   preloadImages(allPortraitSrcs);
 * }, [allPortraitSrcs]);
 * ```
 */
declare function preloadImages(srcs: readonly string[]): void;

export { BREAKPOINTS, BREAKPOINTS_GRID, type BreakpointEntry, type BreakpointGridEntry, GISELLE_PRIMARY_DARK_MAIN, GISELLE_PRIMARY_MAIN, GISELLE_SECONDARY_MAIN, type SetCookieOptions, assignMilestoneSidesByDone, channelAlpha, getCookieValue, giselleTheme, giselleThemeOptions, hexToChannel, isDeepEqual, preloadImages, pxToRem, remToPx, resolveMaturityColor, resolveMaturityLabel, setCookieValue };

import * as react from 'react';
import { ReactNode as ReactNode$1 } from 'react';
import { BoxProps } from '@mui/material/Box';
import { TimelineDotProps } from '@mui/lab/TimelineDot';
import { PaperProps } from '@mui/material/Paper';

type ReactNode = react.ReactNode;

/** MUI palette keys that carry mainChannel — derived from TimelineDot's own color prop. */
type HighlightedPaletteKey = Exclude<NonNullable<TimelineDotProps['color']>, 'inherit' | 'grey'>;
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
type TimelineTwoColumnProps = Omit<BoxProps, 'children'> & {
    /** The ordered list of phases to render. Sorted internally by date (active first, then newest → oldest). */
    phases: TimelinePhase[];
    /**
     * Enables interactive checklist behaviour:
     * - Phase and milestone dots become clickable to toggle done state.
     * - Done items are dimmed with a grayscale filter and a checkmark icon.
     * - Past-due items (date in the past, not done, not active) are highlighted in red.
     * - Manual `overdue: true` on a phase forces the red state regardless of date.
     *
     * When omitted (default), the timeline is read-only: no click-to-done, no overdue
     * detection. Hover effects on cards are limited to items with expandable details.
     */
    checklist?: boolean;
    /**
     * Called when the user clicks a phase dot to toggle its done state.
     * Only fires when `checklist` is true.
     * Receives the phase `key` and the new `done` value.
     */
    onTogglePhaseDone?: (key: number, done: boolean) => void;
    /**
     * Called when the user clicks a milestone dot to toggle its done state.
     * Only fires when `checklist` is true.
     * Receives the parent phase `key`, the milestone `index`, and the new `done` value.
     */
    onToggleMilestoneDone?: (phaseKey: number, milestoneIndex: number, done: boolean) => void;
    /**
     * Called when the user toggles a task (sub-item) within a milestone or phase.
     * Fires unconditionally — task toggles are always interactive regardless of `checklist`.
     *
     * Receives the parent phase `key`, the milestone `index` (or `null` for phase-level tasks),
     * the task `index`, and the new `done` value.
     */
    onToggleTaskDone?: (phaseKey: number, milestoneIndex: number | null, taskIndex: number, done: boolean) => void;
    /**
     * Controlled selection — the key of the currently selected phase.
     * When set, the matching phase dot is shown in its active (enlarged) state.
     * Intended for hero navigation use: the parent controls which phase is focused.
     */
    selectedPhaseKey?: number;
    /**
     * Called when the user clicks a phase dot while `checklist` is false.
     * Receives the phase `key`. Use together with `selectedPhaseKey` for
     * controlled hero navigation.
     */
    onPhaseSelect?: (key: number) => void;
    /**
     * Sort direction for non-active, non-done phases.
     * - `'desc'` (default) — newest end-date first. Use for career/past timelines.
     * - `'asc'` — oldest end-date first. Use for roadmap/future timelines so the
     *   soonest upcoming phase appears directly below the active phases.
     * - `'key'` — sort by `phase.key` ascending. Use when the key encodes the
     *   intended sequence (e.g. a roadmap where phase number is the ordering
     *   criterion, not the end date). Deterministic regardless of array insertion order.
     * @default 'desc'
     */
    sortOrder?: 'asc' | 'desc' | 'key';
    /**
     * Minimum vertical space (px) allocated per milestone slot on the spine.
     * Controls the breathing room between collapsed milestone cards.
     * Increase when cards are too close; decrease when the timeline feels too tall.
     * @default 60
     */
    milestoneSlotHeight?: number;
    /**
     * Gap (px) added below each phase card — appended as `paddingBottom` on the card column.
     * Because it is measured from the bottom edge of every card (not the top of the li),
     * the visual gap between consecutive phase cards is always exactly
     * `phaseCardGap + column top padding (~6px)`, regardless of individual card height.
     * @default 90
     */
    phaseCardGap?: number;
    /**
     * Bottom offset (px) of the year-boundary label chip from the end of the spine connector.
     * Controls the breathing room between the year label and the next phase dot below it.
     * @default 30
     */
    yearLabelMarginBottom?: number;
    /**
     * Set of item keys that the current viewer has already marked as seen.
     * Key format: `"phase-${phase.key}"` for phases, `"ms-${phaseKey}-${milestoneIndex}"` for milestones.
     * Controlled externally — pair with `onMarkViewed` and a persistence hook (e.g. localStorage).
     * When a key is present in this set, the corresponding card shows a filled "viewed" eye indicator.
     */
    viewedKeys?: Set<string>;
    /**
     * Called when the user clicks the "mark as viewed" eye button on a phase card or milestone badge.
     * Receives the item key in `"phase-${key}"` or `"ms-${phaseKey}-${mi}"` format.
     * The parent is responsible for persisting this (localStorage, server, etc.).
     */
    onMarkViewed?: (key: string) => void;
    /**
     * Icon rendered inside the expandable-details count badge on phase cards and milestone badges.
     * Accepts any `ReactNode` — typically a small icon at 14–16px.
     *
     * Defaults to an inline SVG subtask icon (parent rect → L-line → child rect) that is
     * bundled with the component, so it renders immediately with zero flicker.
     *
     * Pass `null` to suppress the icon and show only the count number.
     *
     * @example
     * ```tsx
     * import { Icon } from '@iconify/react';
     * <TimelineTwoColumn expandableIcon={<Icon icon="tabler:subtask" width={14} />} phases={phases} />
     * ```
     */
    expandableIcon?: ReactNode;
    /**
     * Called when the user applies a date-repair action (e.g. "Make sequential") from
     * the `PhaseWarningPopover`. Receives the full updated `phases` array with corrected dates.
     *
     * **When provided:** the corner overlap-warning badge on each conflicting `PhaseCard`
     * opens a rich `PhaseWarningPopover` with range sliders, a mini Gantt ruler, and
     * Make sequential + Apply/Cancel controls.
     *
     * **When omitted (default):** the badge shows only a plain string tooltip — no interactive
     * popover, no date editing. This is the read-only mode.
     *
     * Pair with a state setter to keep `phases` in sync:
     *
     * ```tsx
     * const [phases, setPhases] = useState(initialPhases);
     * <TimelineTwoColumn phases={phases} onPhasesChange={setPhases} />
     * ```
     */
    onPhasesChange?: (updated: TimelinePhase[]) => void;
};
/**
 * Sidebar content for a timeline section page.
 *
 * Contains the heading, description paragraphs, and optional status chip shown
 * alongside `TimelineTwoColumn` in a two-column section layout.
 */
interface TimelineSidebar {
    overline: string;
    heading: string;
    body: string[];
    statusChip?: string;
}
/**
 * Column header labels for the two columns of a `TimelineTwoColumn` layout.
 *
 * Both `leftSubtitle` and `rightSubtitle` are optional short-description lines
 * rendered below the column label.
 */
interface TimelineColumnLabels {
    left: string;
    leftSubtitle?: string;
    right: string;
    rightSubtitle?: string;
}
/**
 * Aggregated props for a complete timeline section — sidebar, column labels, and phases.
 *
 * Pass the result of a data factory directly to a timeline section view component:
 * ```tsx
 * const data: TimelineSectionData = createCareerTimelineSectionData();
 * <CareerTimelineSection {...data} />
 * ```
 */
interface TimelineSectionData {
    sidebar: TimelineSidebar;
    columnLabels: TimelineColumnLabels;
    phases: TimelinePhase[];
}

type PhaseCardProps = Omit<BoxProps, 'children'> & {
    /** The timeline phase data to render. */
    phase: TimelinePhase;
    /** Runtime done override from the parent timeline (local toggle state). Defaults to phase.done. */
    done?: boolean;
    /** Runtime overdue override from the parent timeline. Adds a red warning border to the card. */
    overdue?: boolean;
    /** Set by the parent when this phase's date range overlaps another phase. Shows a ⚠ Date overlap badge. */
    dateConflict?: boolean;
    /** Human-readable explanation of the overlap rendered in a Tooltip on the badge. */
    dateConflictLabel?: string;
    /**
     * Controlled expansion state. When provided together with `onRequestExpand`,
     * the card operates in controlled mode and the parent owns the open/close state.
     */
    isExpanded?: boolean;
    /** Called when the user clicks or keys the card to toggle details. Controlled mode only. */
    onRequestExpand?: () => void;
    /** When true, suppresses box-shadow so the card appears flat (used when another card is expanded). */
    suppressElevation?: boolean;
    /**
     * When true, the viewed eye indicator shows as filled (success colour).
     * Only renders the indicator when `onMarkViewed` is also provided.
     */
    isViewed?: boolean;
    /**
     * Called when the user clicks the viewed eye button. Provide this to enable the indicator.
     * The parent is responsible for persisting the viewed state.
     */
    onMarkViewed?: () => void;
    /**
     * Icon rendered in the expandable-details count badge. Defaults to the bundled inline SVG subtask icon.
     * Pass `null` to suppress the icon and show only the count number.
     */
    expandableIcon?: ReactNode$1;
    /**
     * Which column the card sits in — controls where the corner alert badge is anchored.
     * - `'right'` (default): badge floats on the right top corner (outer edge, away from spine).
     * - `'left'`: badge floats on the left top corner (mirrored outer edge, away from spine).
     */
    columnSide?: 'left' | 'right';
    /**
     * Forwarded from `TimelineTwoColumn.onPhasesChange`.
     *
     * When provided, the corner overlap-warning badge opens a rich `PhaseWarningPopover`
     * (range sliders + mini Gantt ruler + Apply/Cancel) instead of a plain string tooltip.
     * The popover calls this with the full updated phases array on "Apply".
     *
     * When omitted, the badge is read-only — plain tooltip only.
     */
    onPhasesChange?: (updated: TimelinePhase[]) => void;
    /**
     * The full `phases` array from `TimelineTwoColumn` — passed down only when
     * `onPhasesChange` is also provided. Used by `PhaseWarningPopover` to compute
     * the conflict group and to merge updated dates on Apply.
     */
    allPhases?: TimelinePhase[];
    /**
     * Done state for each task (sub-item) in this phase, keyed by `String(task.key)`.
     * `idx-${n}` fallback keys are accepted for compatibility with legacy index-based wiring.
     * Falls back to `task.done` from the data when absent.
     */
    taskDoneStates?: Record<string, boolean>;
    /**
     * Called when the user clicks a task toggle icon.
     * When provided, task rows are interactive; when absent they are decorative.
     */
    onToggleTask?: (taskIndex: number, done: boolean) => void;
};

/**
 * Expandable card for a single timeline phase.
 *
 * Renders the phase title, description, date, optional icon strips (platforms,
 * clients, projects), and a collapsible bullet-point detail section.
 * Operates in controlled mode when `onRequestExpand` is provided; falls back to
 * internal toggle state otherwise.
 *
 * Status badge (overdue / active / scenario) is resolved automatically from props.
 */
declare function PhaseCard({ phase, done, overdue, dateConflict, dateConflictLabel, isExpanded, onRequestExpand, suppressElevation, expandableIcon, isViewed, onMarkViewed, columnSide, onPhasesChange, allPhases, taskDoneStates, onToggleTask, sx, ...other }: PhaseCardProps): react.JSX.Element;

type MilestoneBadgeProps = Omit<PaperProps, 'children'> & {
    /** The milestone data object from the parent phase's `milestones` array. */
    milestone: TimelineMilestone;
    /** Dims and desaturates the card. Mirrors the checklist done state from the parent timeline. */
    done?: boolean;
    /** Whether this card's details section is currently expanded. Controlled by the parent accordion. */
    isExpanded: boolean;
    /** Called when the user clicks or keys Enter/Space to toggle this card open or closed. */
    onRequestExpand: () => void;
    /** When true, suppresses box-shadow so the card appears flat (used when another card is expanded). */
    suppressElevation?: boolean;
    /**
     * Icon rendered in the expandable-details count badge. Defaults to the bundled inline SVG subtask icon.
     * Pass `null` to suppress the icon and show only the count number.
     */
    expandableIcon?: ReactNode$1;
    /**
     * Stable unique id prefix used to construct the `aria-controls` / `id` pair for the
     * expandable details region. Should be unique across all milestones on the page
     * (e.g. `"${phaseKey}-${milestoneIndex}"`). Falls back to a sanitised title slug
     * when omitted, which can collide if two milestones share the same title.
     */
    stableId?: string;
    /**
     * When true, the viewed eye indicator shows as filled (success colour).
     * Only renders when `onMarkViewed` is also provided.
     */
    isViewed?: boolean;
    /** Called when the user clicks the viewed eye button. Parent handles persistence. */
    onMarkViewed?: () => void;
    /**
     * Which column this milestone sits in. Left-column milestones right-align their
     * collapsed title and inline elements so text sits flush against the centre spine.
     * Alignment resets to left when the card is expanded.
     * @default 'right'
     */
    columnSide?: 'left' | 'right';
    /**
     * Done state for each task (sub-item) in this milestone, keyed by `String(task.key)`.
     * `idx-${n}` fallback keys are accepted for compatibility with legacy index-based wiring.
     * Falls back to `task.done` from the data when absent.
     */
    taskDoneStates?: Record<string, boolean>;
    /**
     * Called when the user clicks a task toggle icon.
     * When provided, task rows are interactive; when absent they are decorative.
     */
    onToggleTask?: (taskIndex: number, done: boolean) => void;
};

/**
 * Milestone card — spine-adjacent badge that expands/collapses on click.
 * Expansion is controlled externally (accordion: at most one open per phase).
 * The parent wrapper in TimelineTwoColumn owns z-index and blur animations.
 */
declare function MilestoneBadge({ milestone: m, done, isExpanded, onRequestExpand, suppressElevation, expandableIcon, stableId, isViewed, onMarkViewed, columnSide, taskDoneStates, onToggleTask, sx, ...other }: MilestoneBadgeProps): react.JSX.Element;

type TimelineDotComponentProps = Omit<BoxProps, 'color' | 'onClick'> & {
    /** Icon to render inside the dot. Accepts a `width` prop for sizing. */
    icon?: ReactNode$1;
    /** MUI palette key — controls background colour and shadow tint. @default 'primary' */
    color?: HighlightedPaletteKey;
    /**
     * Size variant.
     * - `'phase'`: 42px (all states). Active state adds a pulsing ring halo — no size change.
     * - `'milestone'`: 34px fixed.
     * @default 'phase'
     */
    size?: 'phase' | 'milestone';
    /** Shows pulsing ring halo around the dot (phase size only). Does not change dot size. */
    active?: boolean;
    /**
     * Done state — replaces icon with animated checkmark and dims milestone badges.
     * In checklist mode this is driven by the toggle state; in read-only mode it
     * reflects `phase.milestones[].done` from the data model.
     */
    done?: boolean;
    /**
     * Increment on each done/undone toggle to remount the icon wrapper
     * and restart the spring-pop animation cleanly.
     */
    animationKey?: number;
    /**
     * Overrides the dot circle background colour. Accepts any CSS colour string (e.g. `'#111'`).
     * Useful when a brand icon has a specific colour that clashes with the palette-derived background.
     * Ignored when `done=true` — done dots always render success-green.
     */
    dotBg?: string;
    /** Makes the dot clickable. Omit for decorative (read-only) dots. */
    onClick?: () => void;
};

/**
 * Unified dot circle for the timeline component.
 *
 * Replaces both the inner content of MUI `<TimelineDot>` in `timeline-two-column.tsx`
 * and the badge circle in `MilestoneBadge`. The outer separator / positioning wrapper
 * remains in the parent.
 *
 * Two mutually exclusive inner states:
 * 1. `done` → animated checkmark SVG (always success/green — see `resolveEffectiveColor`)
 * 2. default → `icon` prop
 *
 * Active dots show a pulsing ring halo via `::after`.
 * In checklist mode pass `onClick`, `role`, `aria-checked`, `aria-label`, `tabIndex`.
 *
 * ## Overflow strategy
 *
 * The outer Box has `overflow: visible` so the `::after` ring (which extends 5 px
 * outside via `inset: -5`) is not clipped. An inner clip Box with `overflow: hidden`
 * and `border-radius: 50%` keeps the icon inside the circle shape.
 */
declare function TimelineDot({ icon, color, size, active, done, animationKey, dotBg, onClick, onKeyDown, role, 'aria-checked': ariaChecked, 'aria-label': ariaLabel, tabIndex, className, sx, ...other }: TimelineDotComponentProps): react.JSX.Element;

/**
 * Two-column alternating timeline.
 *
 * Phases are sorted automatically (active pinned first, then newest → oldest).
 * Each phase renders a dot on the central spine and a card in the left or right
 * column depending on `phase.side`. Milestone dots appear at equal intervals
 * along the spine between consecutive phases.
 *
 * Two modes:
 * - **Default (read-only):** cards are expandable on click; no done/overdue state.
 * - **Checklist:** pass `checklist` to enable dot-click toggling, done dimming,
 *   and automatic overdue detection (past date + not done + not active → red).
 *
 * For hero navigation use, pass `selectedPhaseKey` + `onPhaseSelect` to control
 * which phase dot appears active from the outside.
 *
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function TimelineTwoColumn({ phases, checklist, onTogglePhaseDone, onToggleMilestoneDone, onToggleTaskDone, selectedPhaseKey, onPhaseSelect, expandableIcon, viewedKeys, onMarkViewed, onPhasesChange, sortOrder, milestoneSlotHeight, phaseCardGap, yearLabelMarginBottom, sx, ...other }: TimelineTwoColumnProps): react.JSX.Element;

/**
 * Props for `TimelineCompact`.
 *
 * Accepts the same `phases` array as `TimelineTwoColumn` — no separate data model.
 * Swap at a breakpoint without changing the data layer:
 *
 * ```tsx
 * {isMobile
 *   ? <TimelineCompact phases={phases} />
 *   : <TimelineTwoColumn phases={phases} columnLabels={...} sidebar={...} />
 * }
 * ```
 *
 * The props below mirror the equivalent `TimelineTwoColumnProps` — they are passed
 * through automatically when `TimelineTwoColumn` switches to compact on mobile.
 */
interface TimelineCompactProps extends BoxProps {
    /**
     * Timeline phases to render as accordion rows.
     *
     * Each phase maps to one accordion item:
     * - Summary: coloured dot + title + date
     * - Details: description text + task children list + milestone list
     */
    phases: TimelinePhase[];
    /**
     * Enables interactive checklist behaviour:
     * - Phase and milestone dots become clickable to toggle done state.
     * - Done items render with a green dot and reduced opacity.
     * - Task children render as checkboxes.
     * @see TimelineTwoColumnProps.checklist
     */
    checklist?: boolean;
    /**
     * Sort direction for phases and milestones — mirrors `TimelineTwoColumnProps.sortOrder`.
     * @default 'desc'
     * @see TimelineTwoColumnProps.sortOrder
     */
    sortOrder?: 'asc' | 'desc' | 'key';
    /**
     * Set of viewed phase keys. `phase-${phase.key}` is added when a phase accordion is opened.
     * @see TimelineTwoColumnProps.viewedKeys
     */
    viewedKeys?: Set<string>;
    /**
     * Called when a phase accordion is opened for the first time — key format `phase-${phase.key}`.
     * @see TimelineTwoColumnProps.onMarkViewed
     */
    onMarkViewed?: (key: string) => void;
    /**
     * Called when the user clicks a phase dot in checklist mode.
     * @see TimelineTwoColumnProps.onTogglePhaseDone
     */
    onTogglePhaseDone?: (key: number, done: boolean) => void;
    /**
     * Called when the user clicks a milestone dot in checklist mode.
     * @see TimelineTwoColumnProps.onToggleMilestoneDone
     */
    onToggleMilestoneDone?: (phaseKey: number, milestoneIndex: number, done: boolean) => void;
    /**
     * Called when the user toggles a task checkbox.
     * @see TimelineTwoColumnProps.onToggleTaskDone
     */
    onToggleTaskDone?: (phaseKey: number, milestoneIndex: number | null, taskIndex: number, done: boolean) => void;
}
interface TaskDetailsRendererProps extends BoxProps {
    task: Task;
    checklist?: boolean;
    /** Index-based done state array — position `i` maps to the task at index `i`. Use `Record<string, boolean>` shape for keyed components like `MilestoneBadge`. */
    taskDoneState?: boolean[];
    onTaskToggle?: (taskIdx: number) => void;
    emptyState?: ReactNode$1;
}

/**
 * Collapsible accordion view of timeline phases and milestones,
 * optimised for mobile and narrow-viewport contexts.
 *
 * One phase = one accordion row. Expanding a row reveals its milestones in
 * the order controlled by `sortOrder`. In checklist mode each phase and
 * milestone row shows a completion toggle.
 *
 * Shares the same `TimelinePhase` data model as `TimelineTwoColumn` — the
 * same dataset can render both views from a single source.
 *
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function TimelineCompact({ phases, checklist, sortOrder, viewedKeys: _viewedKeys, onMarkViewed, onTogglePhaseDone, onToggleMilestoneDone, onToggleTaskDone, sx, ...other }: TimelineCompactProps): react.JSX.Element;

/**
 * Renders the detailed content for a single timeline task or milestone.
 *
 * Handles all content variants in priority order:
 * - Inline `description` string → rendered as `body2` text.
 * - `details.summary` → ReactNode summary paragraph.
 * - `details.content` → ReactNode free-form content block.
 * - Nested `tasks` array → rendered via `TaskList` (optionally in checklist mode).
 *
 * Falls back to `emptyState` text when no content is present.
 *
 * **Quality status (13 May 2026):** DoD 9/9 · Best practices 13/13
 * @internal — used by `TaskDetailsModal` and `PhaseAccordionRow`.
 */
declare function TaskDetailsRenderer({ task, checklist, taskDoneState, onTaskToggle, emptyState, sx, ...other }: TaskDetailsRendererProps): react.JSX.Element;

/**
 * Resolves a `TimelineDotProps['color']` value to a `HighlightedPaletteKey` safe
 * for indexing into `theme.vars.palette[color]`.
 *
 * - `done=true` always returns `'success'` (green checkmark — same convention as
 *   `TimelineTwoColumn`'s done-dot colour enforcement rule).
 * - `'inherit'` and `'grey'` fall back to `'primary'` — neither maps to a
 *   `mainChannel`-capable palette slot.
 * - `undefined` falls back to `'primary'`.
 */
declare function resolveCompactColor(color: TimelineDotProps['color'] | undefined, done?: boolean): HighlightedPaletteKey;

/** Diameter (px) of the coloured dot in the accordion phase summary row. */
declare const COMPACT_PHASE_DOT_SIZE = 32;
/** Diameter (px) of the coloured dot in each milestone row.
 * Smaller than the phase dot to establish visual hierarchy (phase = 32 px, milestone = 24 px).
 * Matches the proportional ratio used by `TimelineTwoColumn` (42 px phase, 34 px milestone). */
declare const COMPACT_MILESTONE_DOT_SIZE = 24;
/**
 * Size (px) of the icon rendered inside the phase summary dot.
 * Must be smaller than `COMPACT_PHASE_DOT_SIZE` to fit inside the circle.
 */
declare const COMPACT_PHASE_ICON_SIZE = 18;
/**
 * Minimum acceptable diameter for the phase dot.
 * Must stay at or above this to remain glanceable at mobile font scales.
 */
declare const COMPACT_MIN_PHASE_DOT_SIZE = 18;
/**
 * Minimum acceptable diameter for the milestone dot.
 * Must stay at or above this to remain visible as a distinct element.
 */
declare const COMPACT_MIN_MILESTONE_DOT_SIZE = 18;

interface TaskListProps extends BoxProps {
    /** The task items to render. */
    tasks: Task[];
    /**
     * When `true`, renders a `Checkbox` before each task title so users can
     * toggle individual tasks done.
     * @default false
     */
    checklist?: boolean;
    /**
     * Resolved done-state per task (0-indexed, matches `tasks` array order).
     * When provided, overrides `task.done` for display and accessibility.
     * Must have the same length as `tasks`.
     */
    taskDoneState?: boolean[];
    /**
     * Called when the user toggles a task checkbox.
     * Receives the 0-based index of the toggled task.
     * Has no effect when `checklist={false}`.
     */
    onTaskToggle?: (taskIndex: number) => void;
    /**
     * Controls left-padding level.
     * - `'phase'` — top-level task list, `pl: 2` (default)
     * - `'milestone'` — nested under a milestone card, `pl: 3`
     * @default 'phase'
     */
    indent?: 'phase' | 'milestone';
}

/**
 * Renders a flat list of `Task` items for use inside timeline cards,
 * detail drawers, and modals.
 *
 * In **checklist mode** (`checklist={true}`) each row shows a `Checkbox`
 * that the consumer controls via `taskDoneState` + `onToggle`. In read-only
 * mode the list is purely presentational and tasks marked `done` in the
 * data receive a line-through style.
 *
 * Use `indent="milestone"` when the list sits inside a milestone card to
 * add an extra level of left padding relative to the phase-level baseline.
 *
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function TaskList({ tasks, checklist, taskDoneState, onTaskToggle, indent, sx, ...other }: TaskListProps): react.JSX.Element;

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

export { COMPACT_MILESTONE_DOT_SIZE, COMPACT_MIN_MILESTONE_DOT_SIZE, COMPACT_MIN_PHASE_DOT_SIZE, COMPACT_PHASE_DOT_SIZE, COMPACT_PHASE_ICON_SIZE, type HighlightedPaletteKey, MilestoneBadge, type MilestoneBadgeProps, PhaseCard, type PhaseCardProps, type Task, type TaskDetails, TaskDetailsRenderer, TaskList, type TaskListProps, type TimelineColumnLabels, TimelineCompact, type TimelineCompactProps, TimelineDot, type TimelineDotComponentProps, type TimelineMilestone, type TimelinePhase, type TimelinePlatformItem, type TimelineSectionData, type TimelineSidebar, TimelineTwoColumn, type TimelineTwoColumnProps, assignMilestoneSidesByDone, resolveCompactColor };

import { Transition, Variants, MotionProps, ViewportOptions, MotionValue } from 'framer-motion';
import * as React from 'react';
import React__default, { ReactNode, RefObject } from 'react';
import { BoxProps } from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

/**
 * Default enter transition.
 *
 * Duration: **0.64 s**. Easing: `cubic-bezier(0.43, 0.13, 0.23, 0.96)` — smooth ease-in-out.
 * Override any property via `opts`.
 */
declare const transitionEnter: (opts?: Transition) => Transition;
/**
 * Default exit transition.
 *
 * Duration: **0.48 s**. Same easing as enter. Override any property via `opts`.
 */
declare const transitionExit: (opts?: Transition) => Transition;

type FadeDirection = 'in' | 'inUp' | 'inDown' | 'inLeft' | 'inRight' | 'out' | 'outUp' | 'outDown' | 'outLeft' | 'outRight';
type FadeOptions = {
    /** Distance in px for directional fade. @default 120 */
    distance?: number;
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Fade motion `Variants` factory.
 *
 * Supports 10 directions: `'in'`, `'inUp'`, `'inDown'`, `'inLeft'`, `'inRight'`,
 * `'out'`, `'outUp'`, `'outDown'`, `'outLeft'`, `'outRight'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={fade('inUp')} initial="initial" animate="animate" exit="exit" />
 * <motion.div variants={fade('inUp', { distance: 24 })} initial="initial" animate="animate" />
 * ```
 */
declare const fade: (direction: FadeDirection, options?: FadeOptions) => Variants;

type ContainerOptions = {
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Stagger container `Variants` factory.
 *
 * Children animate with a 50 ms stagger (`staggerChildren: 0.05`, `delayChildren: 0.05`).
 * On exit, children reverse-stagger (`staggerDirection: -1`).
 *
 * @example
 * ```tsx
 * <motion.div variants={container()} initial="initial" animate="animate" exit="exit">
 *   <motion.div variants={fade('inUp')}>Item 1</motion.div>
 *   <motion.div variants={fade('inUp')}>Item 2</motion.div>
 * </motion.div>
 * ```
 */
declare const container: (options?: ContainerOptions) => Variants;

type SlideDirection = 'inUp' | 'inDown' | 'inLeft' | 'inRight' | 'outUp' | 'outDown' | 'outLeft' | 'outRight';
type SlideOptions = {
    /** Distance in px. @default 160 */
    distance?: number;
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Slide motion `Variants` factory (no opacity — pure positional slide).
 *
 * Supports 8 directions: `'inUp'`, `'inDown'`, `'inLeft'`, `'inRight'`,
 * `'outUp'`, `'outDown'`, `'outLeft'`, `'outRight'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={slide('inLeft')} initial="initial" animate="animate" exit="exit" />
 * ```
 */
declare const slide: (direction: SlideDirection, options?: SlideOptions) => Variants;

type ScaleDirection = 'in' | 'inX' | 'inY' | 'out' | 'outX' | 'outY';
type ScaleOptions = {
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Scale motion `Variants` factory.
 *
 * Supports 6 directions: `'in'`, `'inX'`, `'inY'`, `'out'`, `'outX'`, `'outY'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={scale('in')} initial="initial" animate="animate" exit="exit" />
 * ```
 */
declare const scale: (direction: ScaleDirection, options?: ScaleOptions) => Variants;

type BounceDirection = 'in' | 'inUp' | 'inDown' | 'inLeft' | 'inRight' | 'out' | 'outUp' | 'outDown' | 'outLeft' | 'outRight';
type BounceOptions = {
    /** Distance in px for directional bounce. @default 720 */
    distance?: number;
    transition?: Transition;
};

/**
 * Bounce motion `Variants` factory.
 *
 * Supports 10 directions: `'in'`, `'inUp'`, `'inDown'`, `'inLeft'`, `'inRight'`,
 * `'out'`, `'outUp'`, `'outDown'`, `'outLeft'`, `'outRight'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={bounce('inUp')} initial="initial" animate="animate" />
 * ```
 */
declare const bounce: (direction: BounceDirection, options?: BounceOptions) => Variants;

type RotateDirection = 'in' | 'out';
type RotateOptions = {
    /** Rotation in degrees. @default 360 */
    deg?: number;
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Rotate motion `Variants` factory.
 *
 * Supports 2 directions: `'in'` (rotate in from negative angle) and `'out'` (rotate out).
 *
 * @example
 * ```tsx
 * <motion.div variants={rotate('in')} initial="initial" animate="animate" exit="exit" />
 * ```
 */
declare const rotate: (direction: RotateDirection, options?: RotateOptions) => Variants;

type FlipDirection = 'inX' | 'inY' | 'outX' | 'outY';
type FlipOptions = {
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Flip motion `Variants` factory (3-D rotation on the X or Y axis).
 *
 * Supports 4 directions: `'inX'`, `'inY'`, `'outX'`, `'outY'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={flip('inY')} initial="initial" animate="animate" exit="exit" />
 * ```
 */
declare const flip: (direction: FlipDirection, options?: FlipOptions) => Variants;

type ZoomDirection = 'in' | 'inUp' | 'inDown' | 'inLeft' | 'inRight' | 'out' | 'outUp' | 'outDown' | 'outLeft' | 'outRight';
type ZoomOptions = {
    /** Distance in px for directional zoom. @default 720 */
    distance?: number;
    transitionIn?: Transition;
    transitionOut?: Transition;
};

/**
 * Zoom motion `Variants` factory (scale + translate).
 *
 * Supports 10 directions: `'in'`, `'inUp'`, `'inDown'`, `'inLeft'`, `'inRight'`,
 * `'out'`, `'outUp'`, `'outDown'`, `'outLeft'`, `'outRight'`.
 *
 * @example
 * ```tsx
 * <motion.div variants={zoom('inUp')} initial="initial" animate="animate" exit="exit" />
 * ```
 */
declare const zoom: (direction: ZoomDirection, options?: ZoomOptions) => Variants;

/**
 * Returns a `whileHover` scale target for a `motion.*` element.
 *
 * @param value - Scale on hover. @default 1.09
 *
 * @example
 * ```tsx
 * <motion.div whileHover={hover()}>Hover me</motion.div>
 * <motion.button whileHover={hover(1.05)} whileTap={tap()}>Click</motion.button>
 * ```
 */
declare const hover: (value?: number) => {
    scale: number;
};
/**
 * Returns a `whileTap` scale target for a `motion.*` element.
 *
 * @param value - Scale on press. @default 0.9
 */
declare const tap: (value?: number) => {
    scale: number;
};
/**
 * Spring transition for tap interactions.
 * Feels snappy: `stiffness: 400, damping: 18`.
 */
declare const transitionTap: (props?: Transition) => Transition;
/**
 * Ease transition for hover interactions.
 */
declare const transitionHover: (props?: Transition) => Transition;

type MotionContainerProps = Omit<BoxProps, 'animate' | 'children'> & Omit<MotionProps, 'children' | 'animate'> & {
    /**
     * When `action` is `false` (default), the container always animates in.
     * When `action` is `true`, use the `animate` prop to toggle between
     * the `'animate'` and `'exit'` states.
     * @default false
     */
    action?: boolean;
    /** Controls playback when `action` is `true`. @default false */
    animate?: boolean;
    children?: React__default.ReactNode;
};

/**
 * A stagger wrapper for framer-motion animations.
 *
 * Wraps children in a `motion.div` with `container()` variants.
 * Children should use `fade`, `slide`, or other variant factories
 * that respond to the `initial`/`animate`/`exit` keys.
 *
 * **Important:** uses `motion.div`, not `m.div`. The `m.*` API requires
 * `LazyMotion` in the consumer's tree — `motion.*` works without a provider.
 *
 * @example
 * ```tsx
 * <MotionContainer>
 *   <motion.div variants={fade('inUp')}>Item 1</motion.div>
 *   <motion.div variants={fade('inUp')}>Item 2</motion.div>
 * </MotionContainer>
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices not re-audited — SonarQube not verified · no Responsive story
 */
declare function MotionContainer({ animate, children, action, ...other }: MotionContainerProps): React.JSX.Element;

/**
 * Props for `MotionViewport`.
 *
 * Extends `BoxProps` only — framer-motion props are managed internally.
 * The animation is fully encapsulated: `initial`, `whileInView`, `variants`,
 * and `exit` are not forwarded by consumers.
 */
type MotionViewportProps = Omit<BoxProps, 'animate' | 'children'> & {
    /**
     * Framer-motion viewport intersection options.
     * Merged with defaults `{ once: true, amount: 0.3 }`.
     */
    viewport?: ViewportOptions;
    /**
     * Disable the scroll-triggered animation on `sm` and below.
     * On small screens the section is often already fully visible on mount,
     * making the stagger animation jarring rather than pleasant.
     * @default true
     */
    disableAnimateOnMobile?: boolean;
    children?: React__default.ReactNode;
};

/**
 * Scroll-triggered stagger container.
 *
 * Wraps children in a `motion.div` with `container()` variants that fire
 * once when the element enters the viewport. Children should use `fade`,
 * `slide`, or another variant factory that responds to the `initial`/`animate` keys.
 *
 * Animation is automatically disabled on `sm` and below when
 * `disableAnimateOnMobile` is `true` (default) — short mobile viewports
 * skip the stagger to avoid content appearing off-screen on first render.
 *
 * **Important:** uses `m.div`, not `motion.div`. This requires a `LazyMotion`
 * ancestor in the consumer's tree providing the loaded features (e.g.
 * `domAnimation`/`domMax`, sync or async) — required so this component (and
 * anything composing it, like `FeatureFlowSection`) can render inside a
 * consumer's `LazyMotion strict` tree, which forbids raw `motion.*`.
 *
 * @example
 * ```tsx
 * <MotionViewport>
 *   <m.div variants={fade('inUp')}>Title</m.div>
 *   <m.div variants={fade('inUp')}>Body</m.div>
 * </MotionViewport>
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices not re-audited — SonarQube not verified · root sx not array-spread
 */
declare function MotionViewport({ children, viewport, sx, disableAnimateOnMobile, ...other }: MotionViewportProps): React.JSX.Element;

type HeroBackgroundProps = BoxProps & {
    /**
     * Optional background image layered beneath the SVG decoration, above the
     * gradient. Renders correctly with or without it — no default image is
     * bundled, so consumers supply their own asset path.
     */
    backgroundImageSrc?: string;
    /**
     * Dark-mode variant of `backgroundImageSrc`. When supplied, `backgroundImageSrc`
     * renders in light mode and this image renders in dark mode instead — swapped
     * via CSS (`theme.applyStyles('dark', ...)`), not a JS color-scheme read, so
     * there's no hydration-mismatch flash on first paint.
     *
     * Ignored if `backgroundImageSrc` is omitted. If omitted itself, `backgroundImageSrc`
     * (or no image at all) renders in both modes — fully backward compatible.
     */
    backgroundImageSrcDark?: string;
};

/**
 * `HeroBackground` is a full-width animated hero backdrop: a radial-gradient
 * layer plus an animated SVG/dot decoration layer (a 10-line grid, a
 * triangle, two ring/dot accents, a 5-colour dot constellation each floating
 * on its own continuous loop, and two plus-marks), masked to fade toward the
 * canvas edges. Driven entirely by theme tokens. An original implementation
 * — no legacy MUI gradient mixin, no app-specific asset-path config; an
 * optional `backgroundImageSrc` prop takes its place. A `backgroundImageSrcDark`
 * variant swaps in for dark mode via a plain CSS toggle (`theme.applyStyles`),
 * not a JS color-scheme read, so there's no hydration-mismatch flash.
 *
 * Sits behind page content (`pointer-events: none`, negative `z-index`) and
 * never causes overflow — position it inside a positioned ancestor
 * (`position: relative`) that defines the area it should fill.
 *
 * Reveals immediately on mount (`initial`/`animate`, no `whileInView`) rather
 * than waiting for scroll — this component is a page's very first,
 * above-the-fold content in every real usage, so gating its own entrance on
 * scrolling into view would be backwards.
 *
 * Built from this package's own existing `container`/`fade` motion-variant
 * factories for the decoration layer's entrance stagger — no ad-hoc
 * animation logic (each dot's own continuous float loop is a separate,
 * always-running animation layered underneath that entrance). Uses
 * `motion.div`, not `m.div`, so no `LazyMotion` ancestor is required.
 *
 * @example
 * ```tsx
 * <Box sx={{ position: 'relative' }}>
 *   <HeroBackground backgroundImageSrc="/images/hero.webp" />
 *   <Box sx={{ position: 'relative' }}>Hero content</Box>
 * </Box>
 * ```
 *
 * **Quality status (11 Sep 2026):** DoD 21/22 · Best practices not re-audited — SonarQube not verified
 */
declare const HeroBackground: React__default.ForwardRefExoticComponent<Omit<HeroBackgroundProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

type FloatingIconCloudItem = {
    /** Accessible label, used as the image's `alt` text. */
    label: string;
    /** Icon/logo image source — any URL the consumer's own asset supplies. */
    src: string;
};
type FloatingIconCloudProps = {
    /** Icon/logo items to scatter. Fully generic — no preset item list is bundled. */
    items: FloatingIconCloudItem[];
    /**
     * Seed for the deterministic pseudo-random layout. The same `items` +
     * `seed` always lays out identically; change it to reshuffle the cloud.
     * @default 1
     */
    seed?: number;
    /** MUI sx prop — forwarded to root element. */
    sx?: SxProps<Theme>;
};

/**
 * `FloatingIconCloud` scatters a fully generic set of icon/logo images
 * around a central focal point, each bobbing independently on an infinite
 * loop. Positioning is deterministic — the same `items` + `seed` always lay
 * out identically — driven entirely by `computeFloatingIconCloudPositions`,
 * a pure, independently-tested utility with no JSX.
 *
 * No preset item list is bundled; any consumer supplies its own icon set via
 * `items: { label, src }[]`. Each icon is wrapped in a `Tooltip` showing
 * `label` on hover/focus.
 *
 * @example
 * ```tsx
 * <FloatingIconCloud
 *   items={[
 *     { label: 'React', src: '/icons/react.svg' },
 *     { label: 'TypeScript', src: '/icons/typescript.svg' },
 *   ]}
 * />
 * ```
 *
 * **Quality status (06 Sep 2026):** DoD 21/22 · Best practices not re-audited — SonarQube not verified
 */
declare const FloatingIconCloud: React__default.ForwardRefExoticComponent<FloatingIconCloudProps & React__default.RefAttributes<HTMLDivElement>>;

type TextSlotProps = {
    sx?: SxProps<Theme>;
};
/** Heading levels `SectionTitleAnimated`'s `titleComponent`/`titleVariant` accept. */
type SectionTitleAnimatedHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
/** Which motion-variant factory drives the entrance animation. */
type SectionTitleAnimatedVariant = 'fade' | 'scale' | 'zoom';
/**
 * Direction accepted by `animationDirection`. `fade` and `zoom` accept the
 * 10-direction union (`FadeDirection`/`ZoomDirection`); `scale` accepts its
 * own 6-direction union. Pick a direction that matches `animationVariant`.
 */
type SectionTitleAnimatedDirection = FadeDirection | ScaleDirection | ZoomDirection;
type SectionTitleAnimatedProps = Omit<BoxProps, 'title'> & {
    /** Main heading text. */
    title: ReactNode;
    /** Short overline label rendered above the heading. */
    caption?: ReactNode;
    /** Supporting description text rendered below the heading. */
    description?: ReactNode;
    /**
     * Optional gradient accent word appended to `title`, matching the static
     * `SectionTitle`'s `txtGradient` behaviour.
     */
    txtGradient?: string;
    /** @default 'h2' */
    titleComponent?: SectionTitleAnimatedHeadingLevel;
    /** @default 'h2' */
    titleVariant?: SectionTitleAnimatedHeadingLevel;
    /** `sx` overrides for individual text slots. */
    slotProps?: {
        title?: TextSlotProps;
        caption?: TextSlotProps;
        description?: TextSlotProps;
    };
    /**
     * Motion-variant factory used for each slot's entrance animation.
     * @default 'fade'
     */
    animationVariant?: SectionTitleAnimatedVariant;
    /**
     * Direction passed to the chosen variant factory. Defaults per
     * `animationVariant` when omitted: `'inUp'` for `fade`/`zoom`, `'in'` for
     * `scale` (which doesn't accept the 10-direction union the other two share).
     */
    animationDirection?: SectionTitleAnimatedDirection;
    /** Distance in px for directional `fade`/`zoom` animations. Ignored by `scale`. */
    animationDistance?: number;
    /** Overrides the enter transition (duration/ease/delay) for every slot. */
    transitionIn?: Transition;
    /**
     * Framer-motion viewport intersection options for the scroll trigger.
     * Merged with defaults `{ once: true, amount: 0.3 }`.
     */
    viewport?: ViewportOptions;
};

/**
 * `SectionTitleAnimated` is the `/motion`-subpath animated counterpart to the
 * default (static) `SectionTitle`/`SectionCaption` pair: the same stacked
 * heading group, but each slot fades (or scales/zooms) into place once, the
 * first time it scrolls into the viewport.
 *
 * Built entirely from this package's existing motion-variant factories
 * (`fade`/`scale`/`zoom` for the per-slot entrance, `container` for the
 * stagger) — no ad-hoc animation logic. Uses `motion.div`, not `m.div`, so
 * no `LazyMotion` ancestor is required — consistent with every other
 * `/motion`-subpath export.
 *
 * ## Usage
 *
 * ```tsx
 * <SectionTitleAnimated
 *   caption="What we offer"
 *   title="Build better"
 *   txtGradient="faster"
 *   description="A set of tools that removes boilerplate and encodes best practices."
 * />
 * ```
 *
 * @see SectionTitle — the static (non-animated) default export.
 *
 * **Quality status (05 Sep 2026):** DoD 21/22 · Best practices not re-audited — SonarQube not verified
 */
declare const SectionTitleAnimated: React__default.ForwardRefExoticComponent<Omit<SectionTitleAnimatedProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

interface UseScrollParallaxResult {
    /** Attach to the element whose scroll position drives the parallax. */
    ref: React__default.RefObject<HTMLDivElement | null>;
    /**
     * Five spring-smoothed `y` motion values, slowest → fastest
     * (`layers[0]` ±40px … `layers[4]` ±200px).
     *
     * Use only the layers you need — unused layers have no runtime cost.
     */
    layers: [
        MotionValue<number>,
        MotionValue<number>,
        MotionValue<number>,
        MotionValue<number>,
        MotionValue<number>
    ];
}

/**
 * Returns 5 spring-smoothed parallax `y` motion values driven by element scroll.
 *
 * Spring physics: `mass: 0.1, damping: 20, stiffness: 300`.
 * Each layer travels a different distance (±40 → ±200 px) as the element
 * scrolls through the viewport.
 *
 * @example
 * ```tsx
 * const { ref, layers } = useScrollParallax();
 * return (
 *   <div ref={ref}>
 *     <motion.div style={{ y: layers[0] }}>Back layer (slowest)</motion.div>
 *     <motion.div style={{ y: layers[2] }}>Mid layer</motion.div>
 *     <motion.div style={{ y: layers[4] }}>Front layer (fastest)</motion.div>
 *   </div>
 * );
 * ```
 */
declare function useScrollParallax(): UseScrollParallaxResult;

type HoverPhase = 'idle' | 'artistic' | 'portrait';
type PortraitDirection = 'forward' | 'left' | 'right' | 'up' | 'down' | 'up-left' | 'up-right' | 'down-left' | 'down-right';
type PortraitSource = {
    direction: PortraitDirection;
    src: string | readonly string[];
};
/** Shared transition descriptor used by all animated layers. */
type FadeTransition = {
    duration: number;
    ease?: readonly [number, number, number, number];
};
type FramerMotionConflictingEvents = 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragOver' | 'onDragEnter' | 'onDragLeave' | 'onDragExit' | 'onDrop';
type InteractiveHeroLogoProps = Omit<BoxProps, 'sx' | 'children' | 'ref' | FramerMotionConflictingEvents> & {
    /** sx applied to the inner content container (not the 3D-perspective root). */
    sx?: BoxProps['sx'];
    /** sx applied to the outermost perspective root Box. */
    rootSx?: BoxProps['sx'];
    frameSources?: readonly string[];
    artisticLogoSrc?: string;
    /**
     * Alt text shared by the original logo and artistic logo layers.
     * @default 'Logo'
     */
    logoAlt?: string;
    portraitSrc?: string;
    portraitSources?: readonly PortraitSource[];
    /** @default 'Portrait' */
    portraitAlt?: string;
    children?: ReactNode;
};

/**
 * An interactive logo component with three hover phases:
 *
 * - **idle** — logo at rest; artistic overlay is visible
 * - **artistic** — on first hover; original logo animation plays
 * - **portrait** — after the activation delay, a directional portrait fills
 *   the space and tracks pointer position around the logo
 *
 * Supports frame-scrub animation via `frameSources`, directional portraits via
 * `portraitSources`, and respects `prefers-reduced-motion` throughout.
 *
 * **Quality status (02 Sep 2026):** DoD 19/22 · Best practices not re-audited — SonarQube not verified · size-constant regression tests missing · JSDoc prop coverage incomplete
 */
declare function InteractiveHeroLogo({ sx, rootSx, frameSources, artisticLogoSrc, logoAlt, portraitSrc, portraitSources, portraitAlt, children, ...other }: InteractiveHeroLogoProps): React.JSX.Element;

type HeroButtonItem = {
    /** Button label text. */
    label: string;
    /** Navigation target passed to MUI `Button` as `href`. */
    href: string;
    /**
     * MUI Button variant.
     * @default 'contained'
     */
    variant?: 'contained' | 'outlined' | 'text';
    /** Anchor `target`, e.g. `'_blank'` for an external link. Forwarded as-is. */
    target?: string;
    /**
     * Anchor `rel`, e.g. `'noopener'` — pair with `target="_blank"` per standard
     * security practice for links opening in a new tab. Forwarded as-is.
     */
    rel?: string;
};
type HeroButtonsRowProps = Omit<BoxProps, 'children'> & {
    /** Ordered list of button items to render. */
    items: HeroButtonItem[];
    /**
     * framer-motion props forwarded to the `motion.div` wrapper around each button.
     * Use variant-based animation (`variants`, `initial`, `animate`) or explicit
     * spring values here.
     */
    motionProps?: MotionProps;
};

/**
 * An animated row of CTA buttons for hero sections.
 *
 * Each button is wrapped in a `motion.div` so entrance animations can be
 * applied via `motionProps`. Pass variant-based animation values via
 * `motionProps` to stagger or fade in each button independently.
 *
 * ```tsx
 * import { fade } from '@littlebranches/giselle-mui/motion';
 *
 * <HeroButtonsRow
 *   items={[
 *     { label: 'View work', href: '#work' },
 *     { label: 'Contact', href: '#contact', variant: 'outlined' },
 *     { label: 'GitHub', href: 'https://github.com/…', target: '_blank', rel: 'noopener' },
 *   ]}
 *   motionProps={{ variants: fade('inUp', { distance: 24 }) }}
 * />
 * ```
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices not re-audited — SonarQube not verified
 */
declare function HeroButtonsRow({ items, motionProps, sx, ...other }: HeroButtonsRowProps): React.JSX.Element;

type FloatingSubNavItem = {
    id: string;
    label: string;
    /** Icon to display inside the button. Pass a `<GiselleIcon />` or any `ReactNode`. */
    icon: ReactNode;
};
type FloatingSubNavProps = {
    /** Ordered list of items to display as icon buttons. */
    items: FloatingSubNavItem[];
    /**
     * The id of the currently active item.
     * When `null` the nav is hidden (slides out via `AnimatePresence` exit).
     */
    activeId: string | null;
    /** Called whenever the user presses a button. Always switches — never toggles. */
    onSelect: (id: string) => void;
    /**
     * When `true` the nav uses `position: sticky` within its parent container
     * instead of `position: fixed` relative to the viewport.
     *
     * @default false
     */
    sticky?: boolean;
};

/**
 * `FloatingSubNav` renders a compact pill of icon-only navigation buttons
 * that floats above the page content. Supports a **fixed** (viewport) variant
 * and a **sticky** (parent-contained) variant.
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices not re-audited — SonarQube not verified · no ...other spread on root
 */
declare function FloatingSubNav({ items, activeId, onSelect, sticky }: FloatingSubNavProps): React.JSX.Element;

type FloatingSideNavItem = {
    id: string;
    label: string;
    /** Icon to display above the label. Pass a `<GiselleIcon />` or any `ReactNode`. */
    icon: ReactNode;
};
type FloatingSideNavProps = {
    /** Ordered list of items to display as icon+label buttons. */
    items: FloatingSideNavItem[];
    /** Whether the nav is mounted; consumer-supplied, animates via `AnimatePresence`. */
    isVisible: boolean;
    /** Id of the currently active item, or `null`; independent of `isVisible`. */
    activeId: string | null;
    /** Called with `item.id` when the user presses an item. Always switches — never toggles. */
    onSelect: (id: string) => void;
    /** MUI sx prop — forwarded to root element. */
    sx?: SxProps<Theme>;
};

/**
 * `FloatingSideNav` renders a vertically-stacked, left-anchored floating
 * navigation pill of icon+label items — distinct from `FloatingSubNav`'s
 * bottom-anchored, icon-only pill.
 *
 * Props-only, no internal scroll tracking: the consumer supplies `isVisible`
 * and `activeId` from its own scroll-position logic, matching how
 * `FloatingSubNav` is built. The two are independent axes — the nav can be
 * mounted (`isVisible`) with no item active (`activeId={null}`).
 *
 * Three nested layers, not one — matching `FloatingSubNav`/`NavPill`'s own
 * split: an outer plain `Box` (`floatingSideNavWrapperSx`) owns the static
 * `position:fixed`/`top:50%`/`transform:translateY(-50%)` centering; a
 * `motion.div` owns the enter/exit animation; the innermost `Box` (the real
 * `<nav>`, `floatingSideNavPillSx`) owns only visual styling. Framer-motion
 * manages `transform` directly for whatever it animates, so a static
 * centering transform on the *same* element as an animated one gets silently
 * discarded — this split is required, not stylistic (13 Sep 2026 fix).
 *
 * @example
 * ```tsx
 * <FloatingSideNav
 *   items={items}
 *   isVisible={scrolledPastHero}
 *   activeId={activeSectionId}
 *   onSelect={scrollToSection}
 * />
 * ```
 *
 * **Quality status (13 Sep 2026):** DoD 21/22 · Best practices not re-audited — SonarQube not verified
 */
declare const FloatingSideNav: React__default.ForwardRefExoticComponent<FloatingSideNavProps & React__default.RefAttributes<HTMLElement>>;

/** Palette colour key for the progress bar fill. */
type ScrollProgressColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
type ScrollProgressProps = Omit<BoxProps, 'children' | 'style'> & {
    /** Bar thickness in px. @default 4 */
    thickness?: number;
    /** Palette colour key. @default 'primary' */
    color?: ScrollProgressColor;
    /**
     * Scroll progress source (a 0–1 framer-motion `MotionValue`). When omitted,
     * the bar tracks the page's own vertical scroll position internally via
     * {@link useScrollProgress} — no wiring required to drop this in as-is.
     * Pass one explicitly (e.g. from `useScrollProgress('container')`) to track
     * a scrollable container instead of the whole page.
     */
    progress?: MotionValue<number>;
    sx?: SxProps<Theme>;
};
/** Scroll target for {@link useScrollProgress} — the whole document, or a scrollable container. */
type UseScrollProgressTarget = 'document' | 'container';
type UseScrollProgressReturn = {
    /** 0–1 scroll progress `MotionValue` for the chosen target. */
    scrollYProgress: MotionValue<number>;
    /** Attach to the scrollable container element when `target` is `'container'`. Unused for `'document'`. */
    elementRef: RefObject<HTMLDivElement | null>;
};

/**
 * `ScrollProgress` — a thin, fixed bar that fills left-to-right as the user
 * scrolls down the page.
 *
 * Owns its own scroll tracking: drop it in with no props and it tracks the
 * page's vertical scroll position via {@link useScrollProgress} internally.
 * Pass `progress` explicitly (e.g. from `useScrollProgress('container')`) to
 * drive it from a scrollable container instead of the whole document.
 *
 * @example
 * ```tsx
 * // Page-level — no wiring required
 * <ScrollProgress />
 *
 * // Container-scoped
 * const { scrollYProgress, elementRef } = useScrollProgress('container');
 * <Box ref={elementRef} sx={{ overflowY: 'auto', height: 400 }}>
 *   <ScrollProgress progress={scrollYProgress} sx={{ position: 'absolute' }} />
 *   {content}
 * </Box>
 * ```
 *
 * **Quality status (13 Sep 2026):** DoD 26/27 · Best practices not audited — ported for wiki#791, `yalc` validation not run
 */
declare const ScrollProgress: React__default.ForwardRefExoticComponent<Omit<ScrollProgressProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Tracks scroll position as a 0–1 `MotionValue`, via framer-motion's own
 * `useScroll()` — no manual `scroll` event listener, no `window.scrollY` math.
 *
 * `target: 'document'` (the default) tracks the whole page — attach nothing,
 * just call the hook. `target: 'container'` tracks a single scrollable
 * element instead — attach the returned `elementRef` to it.
 *
 * @example
 * ```tsx
 * // Page-level (default) — this is what `ScrollProgress` does internally
 * // when no `progress` prop is supplied.
 * const { scrollYProgress } = useScrollProgress();
 *
 * // Container-scoped
 * const { scrollYProgress, elementRef } = useScrollProgress('container');
 * return <Box ref={elementRef} sx={{ overflowY: 'auto' }}>{children}</Box>;
 * ```
 */
declare function useScrollProgress(target?: UseScrollProgressTarget): UseScrollProgressReturn;

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

interface AboutHeroSectionProps extends Omit<BoxProps, 'children' | 'title'> {
    /**
     * Main heading text, rendered via `SectionTitle` (`titleComponent="h1"`) — same
     * heading composition as this library's other section components. No
     * `txtGradient` accent-word prop: `SectionTitle`'s gradient is a fixed
     * `theme.palette.text.primary`-based fade that doesn't adapt to a white-text
     * context, so it renders illegibly over this component's mandatory photo
     * background (see `about-hero-section.tsx`'s own doc comment). Compose a
     * colored accent word directly within `title` instead, e.g.
     * `<>Who Am <Box component="span" sx={{ color: 'primary.main' }}>I?</Box></>`.
     */
    title: ReactNode;
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
     * Full-bleed background photo, rendered behind the section content. Required —
     * unlike `BioHeroSection`, this component's entire layout (fixed height, content
     * pinned near the bottom, narrow text column) exists specifically to sit over a
     * photo. For a background-less "about" section, use `BioHeroSection` instead.
     */
    backgroundImageUrl: string;
    /** Dark gradient drawn over `backgroundImageUrl`. */
    backgroundOverlay?: BioHeroBackgroundOverlay;
}

/**
 * `AboutHeroSection` — full-bleed, fixed-height "about" hero: a photo background
 * with a dark gradient overlay, a narrow white-text column pinned near the
 * bottom on desktop (auto-height and centered on mobile), a staggered
 * scroll-entrance animation per content block, an optional client/partner logo
 * strip, and a single primary CTA.
 *
 * A verbatim-parity sibling of `BioHeroSection` for one specific case:
 * reproducing the reference app's own `AboutHero` exactly, including its fixed
 * height, bottom-pinned narrow text column, and staggered `framer-motion`
 * entrance — none of which `BioHeroSection` does (that component is
 * deliberately framer-motion-free and uses a simple auto-height centered
 * column). Use `BioHeroSection` for a lighter-weight "about" section with no
 * `framer-motion` peer dependency; use this component when the fixed-hero,
 * pinned-column, animated layout itself is the point.
 *
 * The heading composes with this library's own `SectionTitle`
 * (`title`, `titleComponent="h1"`) — the same heading pattern
 * `FaqSection`/`TestimonialsWallSection`/`FeatureFlowSection` already use,
 * rather than a bespoke `ReactNode` slot. No `txtGradient`: `SectionTitle`'s
 * gradient accent is a fixed `theme.palette.text.primary`-based fade that
 * doesn't adapt to a white-text context, so it renders illegibly over this
 * component's mandatory photo background (confirmed visually — verified the
 * same gap exists in `TestimonialsWallSection`'s own background-image mode,
 * not something new here). Compose a colored accent word directly within
 * `title` instead, matching the reference's own solid-color treatment. Its
 * entrance animation is a single fade-in for the whole heading block — this
 * does not reproduce the reference's own `AnimateText` (a per-word/line
 * reveal).
 *
 * The logo strip composes `ClientLogoStrip` (wiki#803) rather than rendering
 * its own inline `<img>` markup — this section only supplies alignment/
 * spacing (`aboutHeroLogoStripSx`), while size, gap, and the flat-white
 * silhouette filter are `ClientLogoStrip`'s own concern.
 *
 * The section shell composes `PageSection` (wiki#808) rather than its own
 * `Box component="section"` + `Container` — `decoration={false}` (this hero
 * has never had the canonical corner/border frame), `containerComponent={MotionContainer}`
 * (so the container itself drives the staggered entrance below), and
 * `containerPy={0}` (this component's own vertical padding lives on the root
 * `sx`, not the container). Every hero-specific behavior — the fixed height,
 * the composited background+gradient, the bottom-pinned content column —
 * needed no new capability on `PageSection`; all of it already worked through
 * its existing `sx`/`containerSx` escape hatches.
 *
 * @example
 * ```tsx
 * <AboutHeroSection
 *   title={<>Who Am <Box component="span" sx={{ color: 'primary.main' }}>I?</Box></>}
 *   intro={<Typography variant="h6">Product designer & engineer.</Typography>}
 *   statement={<Typography>What I enjoy most is...</Typography>}
 *   experience={<Typography>I've worked across...</Typography>}
 *   backgroundImageUrl="/images/about-hero.jpg"
 *   backgroundOverlay={{ startAlpha: 0.9, endAlpha: 0.35 }}
 *   logos={[{ src: '/logos/acme.svg', alt: 'Acme' }]}
 *   cta={{ label: 'Contact me', href: '/contact', target: '_blank', rel: 'noopener' }}
 * />
 * ```
 *
 * **Quality status (13 Sep 2026):** DoD not yet audited — now composes `PageSection` (wiki#808)
 */
declare const AboutHeroSection: React__default.ForwardRefExoticComponent<Omit<AboutHeroSectionProps, "ref"> & React__default.RefAttributes<HTMLElement>>;

type HeroSlotProps = {
    heading?: ReactNode;
    text?: ReactNode;
    actions?: ReactNode;
    icons?: ReactNode;
};

/** Parallax depth multipliers for each slot layer. Negative values move the layer upward on scroll. */
type ParallaxMultipliers = {
    /** Logo layer multiplier. Default: `-7` (moves furthest — creates deepest depth). */
    logo?: number;
    /** Heading layer multiplier. Default: `-6`. */
    heading?: number;
    /** Text/description layer multiplier. Default: `-5`. */
    text?: number;
    /** Actions layer multiplier. Default: `-4` (moves least — shallowest depth). */
    actions?: number;
    /** Icons strip layer multiplier. Default: `-4` (same plane as actions). */
    icons?: number;
};
/** Props for `ScrollParallaxHero`. */
type ScrollParallaxHeroProps = Omit<BoxProps, 'children'> & HeroSlotProps & {
    /**
     * Logo slot — wrapped in the deepest parallax layer (y1).
     *
     * Recommended: `<InteractiveHeroLogo>` with an `<img>` or SVG logo as the child.
     */
    logo?: ReactNode;
    /**
     * Background slot — renders below the content layer, not parallaxed.
     *
     * Fills the entire hero area. Use for gradient panels, blurred images, or animated shapes.
     */
    background?: ReactNode;
    /**
     * Parallax depth multipliers for each slot layer.
     *
     * Defaults: `{ logo: -7, heading: -6, text: -5, actions: -4 }`.
     * Negative values move the layer upward as the user scrolls down.
     */
    parallax?: ParallaxMultipliers;
};
/** Return value of `useScrollPercent`. */
type UseScrollPercentResult = {
    /** Ref to attach to the hero section root element (measures height for percent calculation). */
    elementRef: RefObject<HTMLDivElement | null>;
    /**
     * Scroll progress through the hero as a clamped integer in [0, 100].
     * Updated on every scroll event via `useMotionValueEvent`.
     */
    percent: number;
    /** Raw window `scrollY` `MotionValue<number>` from framer-motion's `useScroll`. */
    scrollY: MotionValue<number>;
};

/**
 * `ScrollParallaxHero` — full-viewport hero section with depth-layered scroll parallax.
 *
 * The section fixes itself to the viewport while the user scrolls through it and fades out
 * as it leaves view. Each slot (`logo`, `heading`, `text`, `actions`, `icons`) is wrapped
 * in its own spring-physics parallax layer with a configurable depth multiplier, creating
 * a three-dimensional depth illusion.
 *
 * All visible content is provided as slot props — the component owns the scroll frame
 * and the parallax physics, not the content.
 *
 * **Usage:**
 * ```tsx
 * <ScrollParallaxHero
 *   logo={<InteractiveHeroLogo><YourLogo /></InteractiveHeroLogo>}
 *   heading={<AnimatedHeroHeading subheading="Welcome to" highlight="Platform Name" />}
 *   text={<Typography variant="body2">A short description of what you build.</Typography>}
 *   actions={<HeroButtonsRow items={buttons} />}
 *   background={<YourBackground />}
 * />
 * ```
 *
 * **Custom layout offset:** to push the hero beneath a sticky header, use the `sx` prop:
 * ```tsx
 * <ScrollParallaxHero
 *   sx={{ mt: 'calc(var(--your-header-height) * -1)' }}
 *   ...
 * />
 * ```
 *
 * **Quality status (06 Sep 2026):** DoD 21/22 · Best practices not re-audited — SonarQube not verified
 */
declare function ScrollParallaxHero({ logo, heading, text, actions, icons, background, parallax, sx, ...other }: ScrollParallaxHeroProps): React.JSX.Element;

/** Props for `AnimatedHeroHeading`. */
type AnimatedHeroHeadingProps = Omit<BoxProps, 'sx' | 'children'> & {
    /**
     * The plain-text portion before the animated highlight span.
     * Rendered as a text node inside the `<h1>`.
     */
    subheading: string;
    /**
     * The highlighted word(s). Rendered with an infinitely cycling linear gradient
     * animation using `theme.vars.palette.primary.main` and `theme.vars.palette.warning.main`.
     */
    highlight: string;
    /**
     * Motion props for the fade-in wrapper `motion.div`.
     * Defaults to `fade('inUp', { distance: 24 })`.
     */
    motionProps?: MotionProps;
    /**
     * Additional sx overrides applied to the `<h1>` Box element.
     *
     * Use to override `fontFamily`, `maxWidth`, `textAlign`, etc.
     */
    sx?: BoxProps['sx'];
};

/**
 * `AnimatedHeroHeading` — an animated `<h1>` with a cycling gradient highlight span.
 *
 * The heading fades in on mount via `motionProps` (defaults to `fade('inUp', { distance: 24 })`).
 * The `highlight` word animates its gradient `backgroundPosition` infinitely, creating a
 * colour-wash effect using `theme.vars.palette.primary.main` and `theme.vars.palette.warning.main`.
 *
 * **Usage:**
 * ```tsx
 * <AnimatedHeroHeading
 *   subheading="The work of"
 *   highlight="Platform Team"
 * />
 * ```
 *
 * **Custom font family:**
 * ```tsx
 * <AnimatedHeroHeading
 *   subheading="The work of"
 *   highlight="Platform Team"
 *   sx={(theme) => ({ fontFamily: theme.typography.fontSecondaryFamily })}
 * />
 * ```
 *
 * **Note:** `fontFamily` is not baked in — it is intentionally left to the consumer.
 * Override via `sx` to apply any custom typeface from the active theme.
 *
 * **Ref and passthrough target:** the outer `motion.div` only exists to carry the
 * fade-in `motionProps` — it has no other props and nothing a consumer would want a
 * handle on. `ref` and `...other` are forwarded to the inner `<h1>` Box instead, since
 * that is the semantically meaningful DOM node (and the one every other `Box`-wrapping
 * component in this library exposes a ref to).
 *
 * **Quality status (02 Sep 2026):** DoD 21/22 · Best practices not re-audited — SonarQube not verified
 */
declare const AnimatedHeroHeading: React__default.ForwardRefExoticComponent<Omit<AnimatedHeroHeadingProps, "ref"> & React__default.RefAttributes<HTMLHeadingElement>>;

/**
 * Tracks how far the user has scrolled through the hero section as a percentage (0–100).
 *
 * Attach `elementRef` to the hero section's root element. `percent` updates on every
 * scroll event and is clamped to [0, 100]. `scrollY` is the raw framer-motion window
 * scroll MotionValue — pass it to `useTransformY` to drive parallax layers.
 *
 * @example
 * ```tsx
 * const { elementRef, percent, scrollY } = useScrollPercent();
 * const y = useTransformY(scrollY, percent * -7);
 * return <Box ref={elementRef}><motion.div style={{ y }}>{children}</motion.div></Box>;
 * ```
 */
declare function useScrollPercent(): UseScrollPercentResult;

/**
 * Spring-physics parallax y-offset.
 *
 * Transforms a framer-motion `MotionValue<number>` (window `scrollY` in pixels) into a
 * spring-animated y-translation proportional to how far the hero has been scrolled.
 * Pass a negative `distance` to move the layer upward as the user scrolls down.
 *
 * `distance` is a depth multiplier applied to the scroll-through percentage (0–100), not
 * to the raw 0–1 fraction — a `distance` of `-7` therefore produces up to roughly `-700px`
 * of movement over the full height of the hero, matching the reference app's own
 * `ArHomeHero` (which scales the same way via its own `scrollProgress.percent`). Scaling
 * by the 0–1 fraction directly instead of the 0–100 percentage was a porting bug that
 * shrank every layer's movement to a few pixels — imperceptible against the opacity fade,
 * which reads as "no parallax, just fades."
 *
 * Reads `elementRef.current.offsetHeight` on each scroll event so the output range
 * scales correctly regardless of the hero's rendered height.
 *
 * Spring constants: `mass=0.1, damping=20, stiffness=300` — snappy, low-latency feel.
 *
 * @example
 * ```tsx
 * const { elementRef, scrollY } = useScrollPercent();
 * const y = useTransformY(scrollY, elementRef, -7);
 * return <motion.div style={{ y }}>{children}</motion.div>;
 * ```
 */
declare function useTransformY(value: MotionValue<number>, elementRef: RefObject<HTMLDivElement | null>, distance: number): MotionValue<number>;

/**
 * Props for `<ServicesShell>`.
 *
 * See README.md for the planned API.
 */
interface ServicesShellProps extends Omit<BoxProps<'section'>, 'component' | 'children'> {
    /** Section content. Wrapped in `MotionViewport` + `SectionContainer` — see README. */
    children: ReactNode;
    /** MUI sx prop — forwarded to the root `<section>` element. */
    sx?: SxProps<Theme>;
}

/**
 * `ServicesShell` — the canonical animated section wrapper: a
 * `<section>` root whose content scroll-animates in via `MotionViewport`,
 * width-constrained by `SectionContainer`.
 *
 * Recomposes existing primitives rather than hand-rolling either layer:
 * `SectionContainer` already defaults to `maxWidth="lg"` /
 * `py: { xs: 8, md: 12 }` and is DoD-complete, so it is used directly
 * instead of a bespoke `Container`; `MotionViewport` already implements the
 * scroll-triggered stagger entrance, so it is used directly instead of a
 * bespoke `framer-motion` wrapper.
 *
 * See `PageSection` (`../../material/layout/page-section/`) for the
 * decorated, non-animated sibling of this shape — the two are deliberately
 * separate components, not variants of one another; see this component's
 * own README "Relationship to `PageSection`".
 *
 * @example
 * ```tsx
 * <ServicesShell>
 *   <Typography variant="h2">Section heading</Typography>
 * </ServicesShell>
 * ```
 *
 * **Quality status (09 Sep 2026):** DoD not yet formally re-audited against the
 * 27-item Scenario B scale — SonarQube not verified, no `Responsive` story
 * (no colour variants to show), no `yalc push` consuming-app validation run.
 */
declare const ServicesShell: React__default.ForwardRefExoticComponent<Omit<ServicesShellProps, "ref"> & React__default.RefAttributes<HTMLElement>>;

/** A single FAQ entry. */
type FaqItem = {
    /** The question text, also used as the accordion panel key. */
    question: string;
    /** The answer content — any valid React node. */
    answer: ReactNode;
};
/** Props for the {@link FaqSection} component. */
type FaqSectionProps = Omit<BoxProps, 'children' | 'ref'> & {
    /** Overline caption above the heading. @default 'FAQs' */
    caption?: string;
    /** Main `h2` heading. @default 'Frequently Asked' */
    title?: string;
    /** Gradient-accent word appended after `title`. @default 'Questions' */
    txtGradient?: string;
    /** FAQ items rendered as animated accordions. */
    faqs: FaqItem[];
    /** Heading in the contact footer. @default 'Still have questions?' */
    contactTitle?: string;
    /** Body text below the contact heading. */
    contactDescription?: string;
    /**
     * `href` for the contact button.
     * When omitted, the entire contact footer section is hidden.
     */
    contactHref?: string;
    /** Label for the contact button. @default 'Contact us' */
    contactLabel?: string;
    /**
     * Icon for the contact button.
     * - `string` → rendered via `GiselleIcon` (e.g. `'solar:letter-bold'`).
     * - `ReactNode` → rendered as-is.
     */
    contactIcon?: ReactNode | string;
};

/**
 * `FaqSection` renders a full FAQ section with scroll-triggered animated
 * accordions, decorative SVG elements (visible at ≥1440 px), and an optional
 * contact footer.
 *
 * Powered by `framer-motion` — import from `@littlebranches/giselle-mui/motion`.
 *
 * ## Usage
 *
 * ```tsx
 * import { FaqSection } from '@littlebranches/giselle-mui/motion';
 *
 * <FaqSection
 *   caption="Support"
 *   title="Frequently Asked"
 *   txtGradient="Questions"
 *   faqs={[
 *     { question: 'How do I get started?', answer: <p>Create an account…</p> },
 *   ]}
 *   contactHref="/contact"
 *   contactLabel="Send a message"
 *   contactIcon="solar:letter-bold"
 * />
 * ```
 *
 * ## Contact footer
 * The footer is hidden unless `contactHref` is provided.
 *
 * ## Icon
 * Pass a Giselle icon string (e.g. `'solar:letter-bold'`) to `contactIcon`
 * and `GiselleIcon` renders it automatically. Pass a `ReactNode` to supply
 * any custom icon element instead.
 *
 * **Quality status (02 Sep 2026):** DoD 20/22 · Best practices 13/13 — SonarQube not verified · size-constant regression tests missing
 */
declare function FaqSection({ caption, title, txtGradient, faqs, contactTitle, contactDescription, contactHref, contactLabel, contactIcon, sx, ...other }: FaqSectionProps): React.JSX.Element;

export { type BioHeroBackgroundOverlay as AboutHeroBackgroundOverlay, type BioHeroCta as AboutHeroCta, type BioHeroLogo as AboutHeroLogo, AboutHeroSection, type AboutHeroSectionProps, AnimatedHeroHeading, type AnimatedHeroHeadingProps, type FadeTransition, FaqSection as FaqAccordion, type FaqSectionProps as FaqAccordionProps, type FaqItem, FaqSection, type FaqSectionProps, FloatingIconCloud, type FloatingIconCloudItem, type FloatingIconCloudProps, FloatingSideNav, type FloatingSideNavItem, type FloatingSideNavProps, FloatingSubNav, type FloatingSubNavItem, type FloatingSubNavProps, HeroBackground, type HeroBackgroundProps, type HeroButtonItem, HeroButtonsRow, type HeroButtonsRowProps, type HoverPhase, InteractiveHeroLogo, type InteractiveHeroLogoProps, MotionContainer, type MotionContainerProps, MotionViewport, type MotionViewportProps, type ParallaxMultipliers, type PortraitDirection, type PortraitSource, ScrollParallaxHero, type ScrollParallaxHeroProps, ScrollProgress, type ScrollProgressColor, type ScrollProgressProps, SectionTitleAnimated, type SectionTitleAnimatedDirection, type SectionTitleAnimatedHeadingLevel, type SectionTitleAnimatedProps, type SectionTitleAnimatedVariant, ServicesShell, type ServicesShellProps, type UseScrollParallaxResult, type UseScrollPercentResult, type UseScrollProgressReturn, type UseScrollProgressTarget, bounce, container, fade, flip, hover, rotate, scale, slide, tap, transitionEnter, transitionExit, transitionHover, transitionTap, useScrollParallax, useScrollPercent, useScrollProgress, useTransformY, zoom };

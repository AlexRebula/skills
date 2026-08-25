import { Transition, Variants, MotionProps, ViewportOptions, MotionValue } from 'framer-motion';
import * as react from 'react';
import react__default, { ReactNode, RefObject } from 'react';
import { BoxProps } from '@mui/material/Box';

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
    children?: react__default.ReactNode;
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
 */
declare function MotionContainer({ animate, children, action, ...other }: MotionContainerProps): react.JSX.Element;

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
    children?: react__default.ReactNode;
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
 * **Important:** uses `motion.div`, not `m.div`. The `m.*` API requires
 * `LazyMotion` in the consumer's tree — `motion.*` works without a provider.
 *
 * @example
 * ```tsx
 * <MotionViewport>
 *   <motion.div variants={fade('inUp')}>Title</motion.div>
 *   <motion.div variants={fade('inUp')}>Body</motion.div>
 * </MotionViewport>
 * ```
 */
declare function MotionViewport({ children, viewport, sx, disableAnimateOnMobile, ...other }: MotionViewportProps): react.JSX.Element;

interface UseScrollParallaxResult {
    /** Attach to the element whose scroll position drives the parallax. */
    ref: react__default.RefObject<HTMLDivElement | null>;
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
 */
declare function InteractiveHeroLogo({ sx, rootSx, frameSources, artisticLogoSrc, logoAlt, portraitSrc, portraitSources, portraitAlt, children, ...other }: InteractiveHeroLogoProps): react.JSX.Element;

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
 *   ]}
 *   motionProps={{ variants: fade('inUp', { distance: 24 }) }}
 * />
 * ```
 */
declare function HeroButtonsRow({ items, motionProps, sx, ...other }: HeroButtonsRowProps): react.JSX.Element;

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
 */
declare function FloatingSubNav({ items, activeId, onSelect, sticky }: FloatingSubNavProps): react.JSX.Element;

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
/** Props for `AnimatedHeroHeading`. */
type AnimatedHeroHeadingProps = {
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
 * **Quality status (May 2026):** implementation complete, tests passing.
 */
declare function ScrollParallaxHero({ logo, heading, text, actions, icons, background, parallax, sx, ...other }: ScrollParallaxHeroProps): react.JSX.Element;

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
 * **Quality status (May 2026):** implementation complete, styles tested.
 */
declare function AnimatedHeroHeading({ subheading, highlight, motionProps, sx, }: AnimatedHeroHeadingProps): react.JSX.Element;

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

/** A single FAQ entry. */
type FaqItem = {
    /** The question text, also used as the accordion panel key. */
    question: string;
    /** The answer content — any valid React node. */
    answer: ReactNode;
};
/** Props for the {@link FaqSection} component. */
type FaqSectionProps = Omit<BoxProps, 'children'> & {
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
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function FaqSection({ caption, title, txtGradient, faqs, contactTitle, contactDescription, contactHref, contactLabel, contactIcon, sx, ...other }: FaqSectionProps): react.JSX.Element;

export { AnimatedHeroHeading, type AnimatedHeroHeadingProps, type FadeTransition, FaqSection as FaqAccordion, type FaqSectionProps as FaqAccordionProps, type FaqItem, FaqSection, type FaqSectionProps, FloatingSubNav, type FloatingSubNavItem, type FloatingSubNavProps, type HeroButtonItem, HeroButtonsRow, type HeroButtonsRowProps, type HoverPhase, InteractiveHeroLogo, type InteractiveHeroLogoProps, MotionContainer, type MotionContainerProps, MotionViewport, type MotionViewportProps, type ParallaxMultipliers, type PortraitDirection, type PortraitSource, ScrollParallaxHero, type ScrollParallaxHeroProps, type UseScrollParallaxResult, type UseScrollPercentResult, bounce, container, fade, flip, hover, rotate, scale, slide, tap, transitionEnter, transitionExit, transitionHover, transitionTap, useScrollParallax, useScrollPercent, useTransformY, zoom };

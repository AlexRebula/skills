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

// src/motion-index.ts
var motion_index_exports = {};
__export(motion_index_exports, {
  AboutHeroSection: () => AboutHeroSection,
  AnimatedHeroHeading: () => AnimatedHeroHeading,
  FaqAccordion: () => FaqSection,
  FaqSection: () => FaqSection,
  FloatingIconCloud: () => FloatingIconCloud,
  FloatingSideNav: () => FloatingSideNav,
  FloatingSubNav: () => FloatingSubNav,
  HeroBackground: () => HeroBackground,
  HeroButtonsRow: () => HeroButtonsRow,
  InteractiveHeroLogo: () => InteractiveHeroLogo,
  MotionContainer: () => MotionContainer,
  MotionViewport: () => MotionViewport,
  ScrollParallaxHero: () => ScrollParallaxHero,
  ScrollProgress: () => ScrollProgress,
  SectionTitleAnimated: () => SectionTitleAnimated,
  ServicesShell: () => ServicesShell,
  bounce: () => bounce,
  container: () => container,
  fade: () => fade,
  flip: () => flip,
  hover: () => hover,
  rotate: () => rotate,
  scale: () => scale,
  slide: () => slide,
  tap: () => tap,
  transitionEnter: () => transitionEnter,
  transitionExit: () => transitionExit,
  transitionHover: () => transitionHover,
  transitionTap: () => transitionTap,
  useScrollParallax: () => useScrollParallax,
  useScrollPercent: () => useScrollPercent,
  useScrollProgress: () => useScrollProgress,
  useTransformY: () => useTransformY,
  zoom: () => zoom
});
module.exports = __toCommonJS(motion_index_exports);

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

// src/components/motion/variants/slide/slide.const.ts
var SLIDE_DEFAULT_DISTANCE = 160;

// src/components/motion/variants/slide/slide.ts
var slide = (direction, options) => {
  const distance = options?.distance ?? SLIDE_DEFAULT_DISTANCE;
  const tIn = options?.transitionIn;
  const tOut = options?.transitionOut;
  const map = {
    inUp: {
      initial: { y: distance },
      animate: { y: 0, transition: transitionEnter(tIn) },
      exit: { y: distance, transition: transitionExit(tOut) }
    },
    inDown: {
      initial: { y: -distance },
      animate: { y: 0, transition: transitionEnter(tIn) },
      exit: { y: -distance, transition: transitionExit(tOut) }
    },
    inLeft: {
      initial: { x: -distance },
      animate: { x: 0, transition: transitionEnter(tIn) },
      exit: { x: -distance, transition: transitionExit(tOut) }
    },
    inRight: {
      initial: { x: distance },
      animate: { x: 0, transition: transitionEnter(tIn) },
      exit: { x: distance, transition: transitionExit(tOut) }
    },
    outUp: {
      initial: { y: 0 },
      animate: { y: -distance, transition: transitionEnter(tIn) },
      exit: { y: 0, transition: transitionExit(tOut) }
    },
    outDown: {
      initial: { y: 0 },
      animate: { y: distance, transition: transitionEnter(tIn) },
      exit: { y: 0, transition: transitionExit(tOut) }
    },
    outLeft: {
      initial: { x: 0 },
      animate: { x: -distance, transition: transitionEnter(tIn) },
      exit: { x: 0, transition: transitionExit(tOut) }
    },
    outRight: {
      initial: { x: 0 },
      animate: { x: distance, transition: transitionEnter(tIn) },
      exit: { x: 0, transition: transitionExit(tOut) }
    }
  };
  return map[direction];
};

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

// src/components/motion/variants/bounce/bounce.const.ts
var BOUNCE_DEFAULT_DISTANCE = 720;
var BOUNCE_IN_SCALE_KEYFRAMES = [0.3, 1.1, 0.9, 1.03, 0.97, 1];
var BOUNCE_IN_OPACITY_KEYFRAMES = [0, 1, 1, 1, 1, 1];
var BOUNCE_IN_SCALE_Y_KEYFRAMES = [4, 0.9, 0.95, 0.985, 1];
var BOUNCE_IN_SCALE_X_KEYFRAMES = [3, 1, 0.98, 0.995, 1];
var BOUNCE_IN_DIRECTIONAL_OPACITY_KEYFRAMES = [0, 1, 1, 1, 1];
var BOUNCE_IN_UP_Y_KEYFRAMES = (distance) => [distance, -24, 12, -4, 0];
var BOUNCE_IN_DOWN_Y_KEYFRAMES = (distance) => [-distance, 24, -12, 4, 0];
var BOUNCE_IN_LEFT_X_KEYFRAMES = (distance) => [-distance, 24, -12, 4, 0];
var BOUNCE_IN_RIGHT_X_KEYFRAMES = (distance) => [distance, -24, 12, -4, 0];
var BOUNCE_OUT_SCALE_KEYFRAMES = [0.9, 1.1, 0.3];
var BOUNCE_OUT_OPACITY_KEYFRAMES = [1, 1, 0];
var BOUNCE_OUT_SCALE_Y_KEYFRAMES = [0.985, 0.9, 3];
var BOUNCE_OUT_SCALE_X_KEYFRAMES = [1, 0.9, 2];
var BOUNCE_OUT_UP_Y_KEYFRAMES = (distance) => [-12, 24, -distance];
var BOUNCE_OUT_DOWN_Y_KEYFRAMES = (distance) => [12, -24, distance];
var BOUNCE_OUT_LEFT_X_KEYFRAMES = (distance) => [0, 24, -distance];
var BOUNCE_OUT_RIGHT_X_KEYFRAMES = (distance) => [0, -24, distance];

// src/components/motion/variants/bounce/bounce.ts
var bounce = (direction, options) => {
  const distance = options?.distance ?? BOUNCE_DEFAULT_DISTANCE;
  const t = options?.transition;
  const map = {
    in: {
      initial: {},
      animate: {
        scale: [...BOUNCE_IN_SCALE_KEYFRAMES],
        opacity: [...BOUNCE_IN_OPACITY_KEYFRAMES],
        transition: transitionEnter(t)
      }
    },
    inUp: {
      initial: {},
      animate: {
        y: BOUNCE_IN_UP_Y_KEYFRAMES(distance),
        scaleY: [...BOUNCE_IN_SCALE_Y_KEYFRAMES],
        opacity: [...BOUNCE_IN_DIRECTIONAL_OPACITY_KEYFRAMES],
        transition: transitionEnter(t)
      }
    },
    inDown: {
      initial: {},
      animate: {
        y: BOUNCE_IN_DOWN_Y_KEYFRAMES(distance),
        scaleY: [...BOUNCE_IN_SCALE_Y_KEYFRAMES],
        opacity: [...BOUNCE_IN_DIRECTIONAL_OPACITY_KEYFRAMES],
        transition: transitionEnter(t)
      }
    },
    inLeft: {
      initial: {},
      animate: {
        x: BOUNCE_IN_LEFT_X_KEYFRAMES(distance),
        scaleX: [...BOUNCE_IN_SCALE_X_KEYFRAMES],
        opacity: [...BOUNCE_IN_DIRECTIONAL_OPACITY_KEYFRAMES],
        transition: transitionEnter(t)
      }
    },
    inRight: {
      initial: {},
      animate: {
        x: BOUNCE_IN_RIGHT_X_KEYFRAMES(distance),
        scaleX: [...BOUNCE_IN_SCALE_X_KEYFRAMES],
        opacity: [...BOUNCE_IN_DIRECTIONAL_OPACITY_KEYFRAMES],
        transition: transitionEnter(t)
      }
    },
    out: {
      animate: {
        scale: [...BOUNCE_OUT_SCALE_KEYFRAMES],
        opacity: [...BOUNCE_OUT_OPACITY_KEYFRAMES],
        transition: transitionExit(t)
      }
    },
    outUp: {
      animate: {
        y: BOUNCE_OUT_UP_Y_KEYFRAMES(distance),
        scaleY: [...BOUNCE_OUT_SCALE_Y_KEYFRAMES],
        opacity: [...BOUNCE_OUT_OPACITY_KEYFRAMES],
        transition: transitionExit(t)
      }
    },
    outDown: {
      animate: {
        y: BOUNCE_OUT_DOWN_Y_KEYFRAMES(distance),
        scaleY: [...BOUNCE_OUT_SCALE_Y_KEYFRAMES],
        opacity: [...BOUNCE_OUT_OPACITY_KEYFRAMES],
        transition: transitionExit(t)
      }
    },
    outLeft: {
      animate: {
        x: BOUNCE_OUT_LEFT_X_KEYFRAMES(distance),
        scaleX: [...BOUNCE_OUT_SCALE_X_KEYFRAMES],
        opacity: [...BOUNCE_OUT_OPACITY_KEYFRAMES],
        transition: transitionExit(t)
      }
    },
    outRight: {
      animate: {
        x: BOUNCE_OUT_RIGHT_X_KEYFRAMES(distance),
        scaleX: [...BOUNCE_OUT_SCALE_X_KEYFRAMES],
        opacity: [...BOUNCE_OUT_OPACITY_KEYFRAMES],
        transition: transitionExit(t)
      }
    }
  };
  return map[direction];
};

// src/components/motion/variants/rotate/rotate.const.ts
var ROTATE_DEFAULT_DEGREES = 360;

// src/components/motion/variants/rotate/rotate.ts
var rotate = (direction, options) => {
  const deg = options?.deg ?? ROTATE_DEFAULT_DEGREES;
  const tIn = options?.transitionIn;
  const tOut = options?.transitionOut;
  const map = {
    in: {
      initial: { opacity: 0, rotate: -deg },
      animate: { opacity: 1, rotate: 0, transition: transitionEnter(tIn) },
      exit: { opacity: 0, rotate: -deg, transition: transitionExit(tOut) }
    },
    out: {
      initial: { opacity: 1, rotate: 0 },
      animate: { opacity: 0, rotate: -deg, transition: transitionExit(tOut) }
    }
  };
  return map[direction];
};

// src/components/motion/variants/flip/flip.const.ts
var FLIP_IN_ROTATION = -180;
var FLIP_OUT_ROTATION = 70;

// src/components/motion/variants/flip/flip.ts
var flip = (direction, options) => {
  const tIn = options?.transitionIn;
  const tOut = options?.transitionOut;
  const map = {
    inX: {
      initial: { rotateX: FLIP_IN_ROTATION, opacity: 0 },
      animate: { rotateX: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { rotateX: FLIP_IN_ROTATION, opacity: 0, transition: transitionExit(tOut) }
    },
    inY: {
      initial: { rotateY: FLIP_IN_ROTATION, opacity: 0 },
      animate: { rotateY: 0, opacity: 1, transition: transitionEnter(tIn) },
      exit: { rotateY: FLIP_IN_ROTATION, opacity: 0, transition: transitionExit(tOut) }
    },
    outX: {
      initial: { rotateX: 0, opacity: 1 },
      animate: { rotateX: FLIP_OUT_ROTATION, opacity: 0, transition: transitionExit(tOut) }
    },
    outY: {
      initial: { rotateY: 0, opacity: 1 },
      animate: { rotateY: FLIP_OUT_ROTATION, opacity: 0, transition: transitionExit(tOut) }
    }
  };
  return map[direction];
};

// src/components/motion/variants/zoom/zoom.const.ts
var ZOOM_DEFAULT_DISTANCE = 720;

// src/components/motion/variants/zoom/zoom.ts
var zoom = (direction, options) => {
  const distance = options?.distance ?? ZOOM_DEFAULT_DISTANCE;
  const tIn = options?.transitionIn;
  const map = {
    in: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0 }
    },
    inUp: {
      initial: { scale: 0, opacity: 0, translateY: distance },
      animate: { scale: 1, opacity: 1, translateY: 0, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0, translateY: distance }
    },
    inDown: {
      initial: { scale: 0, opacity: 0, translateY: -distance },
      animate: { scale: 1, opacity: 1, translateY: 0, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0, translateY: -distance }
    },
    inLeft: {
      initial: { scale: 0, opacity: 0, translateX: -distance },
      animate: { scale: 1, opacity: 1, translateX: 0, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0, translateX: -distance }
    },
    inRight: {
      initial: { scale: 0, opacity: 0, translateX: distance },
      animate: { scale: 1, opacity: 1, translateX: 0, transition: transitionEnter(tIn) },
      exit: { scale: 0, opacity: 0, translateX: distance }
    },
    out: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, transition: transitionEnter(tIn) }
    },
    outUp: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateY: -distance, transition: transitionEnter(tIn) }
    },
    outDown: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateY: distance, transition: transitionEnter(tIn) }
    },
    outLeft: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateX: -distance, transition: transitionEnter(tIn) }
    },
    outRight: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, translateX: distance, transition: transitionEnter(tIn) }
    }
  };
  return map[direction];
};

// src/components/motion/variants/actions/actions.const.ts
var DEFAULT_HOVER_SCALE = 1.09;
var DEFAULT_TAP_SCALE = 0.9;
var TRANSITION_HOVER_DURATION = 0.32;
var TRANSITION_TAP_STIFFNESS = 400;
var TRANSITION_TAP_DAMPING = 18;
var TRANSITION_TAP_TYPE = "spring";

// src/components/motion/variants/actions/actions.ts
var hover = (value = DEFAULT_HOVER_SCALE) => ({ scale: value });
var tap = (value = DEFAULT_TAP_SCALE) => ({ scale: value });
var transitionTap = (props) => ({
  type: TRANSITION_TAP_TYPE,
  stiffness: TRANSITION_TAP_STIFFNESS,
  damping: TRANSITION_TAP_DAMPING,
  ...props
});
var transitionHover = (props) => ({
  duration: TRANSITION_HOVER_DURATION,
  ease: TRANSITION_EASE,
  ...props
});

// src/components/motion/container/motion-container.tsx
var import_framer_motion = require("framer-motion");
var import_Box = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime = require("react/jsx-runtime");
function MotionContainer({
  animate,
  children,
  action = false,
  ...other
}) {
  const animateValue = action && !animate ? "exit" : "animate";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_Box.default,
    {
      component: import_framer_motion.motion.div,
      variants: container(),
      initial: action ? false : "initial",
      animate: animateValue,
      exit: action ? void 0 : "exit",
      ...other,
      children
    }
  );
}

// src/components/motion/viewport/motion-viewport.tsx
var import_framer_motion2 = require("framer-motion");
var import_Box2 = __toESM(require("@mui/material/Box"), 1);
var import_useMediaQuery = __toESM(require("@mui/material/useMediaQuery"), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
function MotionViewport({
  children,
  viewport,
  sx,
  disableAnimateOnMobile = true,
  ...other
}) {
  const smDown = (0, import_useMediaQuery.default)((theme) => theme.breakpoints.down("sm"));
  if (smDown && disableAnimateOnMobile) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_Box2.default, { sx, ...other, children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_Box2.default,
    {
      component: import_framer_motion2.m.div,
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

// src/components/motion/hero-background/hero-background.tsx
var import_react3 = __toESM(require("react"), 1);
var import_framer_motion5 = require("framer-motion");
var import_Box4 = __toESM(require("@mui/material/Box"), 1);

// src/components/motion/hero-background/svg-primitives/hero-background-svg.tsx
var import_react = __toESM(require("react"), 1);
var import_framer_motion3 = require("framer-motion");
var import_styles = require("@mui/material/styles");

// src/components/motion/hero-background/svg-primitives/hero-background-svg.styles.ts
var heroSvgDecorationBase = (_theme) => ({
  position: "absolute",
  color: "text.disabled",
  pointerEvents: "none",
  "& line, & circle, & path": { stroke: "currentColor" }
});

// src/components/motion/hero-background/svg-primitives/hero-background-svg.utils.ts
var heroSvgTransition = {
  duration: 1.2,
  ease: [0.43, 0.13, 0.23, 0.96]
};
var heroSvgPulseTransition = {
  duration: 3,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse"
};

// src/components/motion/hero-background/svg-primitives/hero-background-svg.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var MotionSvg = (0, import_styles.styled)(import_framer_motion3.motion.svg)``;
var HeroFloatLine = import_react.default.forwardRef(
  function HeroFloatLine2({ sx, vertical, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      MotionSvg,
      {
        ref,
        width: vertical ? "1" : "64",
        height: vertical ? "64" : "1",
        sx: [
          (theme) => ({
            ...heroSvgDecorationBase(theme),
            "& line": { strokeDasharray: 3 }
          }),
          ...Array.isArray(sx) ? sx : [sx]
        ],
        ...other,
        children: vertical ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_framer_motion3.motion.line,
          {
            x1: "0.5",
            x2: "0.5",
            y1: "0",
            y2: "0%",
            variants: {
              initial: { y2: "0%", opacity: 0 },
              animate: { y2: "100%", opacity: 1, transition: heroSvgTransition }
            }
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_framer_motion3.motion.line,
          {
            x1: "0",
            x2: "0%",
            y1: "0.5",
            y2: "0.5",
            variants: {
              initial: { x2: "0%", opacity: 0 },
              animate: { x2: "100%", opacity: 1, transition: heroSvgTransition }
            }
          }
        )
      }
    );
  }
);
HeroFloatLine.displayName = "HeroFloatLine";
var HeroFloatTriangle = import_react.default.forwardRef(
  function HeroFloatTriangle2({ sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      MotionSvg,
      {
        ref,
        width: "20",
        height: "10",
        viewBox: "0 0 20 10",
        fill: "none",
        variants: {
          initial: { scaleX: 0, opacity: 0 },
          animate: { scaleX: 1, opacity: 1, transition: heroSvgTransition }
        },
        sx: [heroSvgDecorationBase, ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M10 10L0 0H20L10 10Z" })
      }
    );
  }
);
HeroFloatTriangle.displayName = "HeroFloatTriangle";
var HeroFloatDot = import_react.default.forwardRef(function HeroFloatDot2({ sx, ...other }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    MotionSvg,
    {
      ref,
      width: "8",
      height: "8",
      viewBox: "0 0 8 8",
      variants: {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: heroSvgTransition }
      },
      sx: [heroSvgDecorationBase, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_framer_motion3.motion.circle,
        {
          cx: "4",
          cy: "4",
          r: "4",
          fill: "currentColor",
          stroke: "none",
          animate: { scale: [0.6, 1] },
          transition: heroSvgPulseTransition
        }
      )
    }
  );
});
HeroFloatDot.displayName = "HeroFloatDot";
var HeroCircleDot = import_react.default.forwardRef(function HeroCircleDot2({ sx, ...other }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    MotionSvg,
    {
      ref,
      width: "40",
      height: "40",
      viewBox: "0 0 40 40",
      fill: "none",
      sx: [heroSvgDecorationBase, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_framer_motion3.motion.circle,
        {
          cx: "20",
          cy: "20",
          r: "19",
          variants: {
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 1, transition: heroSvgTransition }
          }
        }
      )
    }
  );
});
HeroCircleDot.displayName = "HeroCircleDot";
var HeroPlusSign = import_react.default.forwardRef(function HeroPlusSign2({ sx, ...other }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    MotionSvg,
    {
      ref,
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      sx: [heroSvgDecorationBase, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_framer_motion3.motion.path,
        {
          d: "M8 0V16M16 8.08889H0",
          variants: {
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 1, transition: heroSvgTransition }
          }
        }
      )
    }
  );
});
HeroPlusSign.displayName = "HeroPlusSign";

// src/components/motion/hero-background/floating-dot/floating-dot.tsx
var import_react2 = __toESM(require("react"), 1);
var import_framer_motion4 = require("framer-motion");
var import_Box3 = __toESM(require("@mui/material/Box"), 1);

// src/components/motion/hero-background/floating-dot/floating-dot.const.ts
var HERO_FLOATING_DOT_SIZE = 14;
var HERO_FLOATING_DOT_FLOAT_DISTANCE = 24;
var HERO_FLOATING_DOT_FLOAT_DURATION = 6;

// src/components/motion/hero-background/floating-dot/floating-dot.styles.ts
var heroFloatingDotOuterSx = {
  position: "absolute",
  width: HERO_FLOATING_DOT_SIZE,
  height: HERO_FLOATING_DOT_SIZE,
  pointerEvents: "none"
};
var heroFloatingDotInnerSx = (theme, color) => ({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  backgroundColor: theme.vars.palette[color].main
});

// src/components/motion/hero-background/floating-dot/floating-dot.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var HeroFloatingDot = import_react2.default.forwardRef(
  function HeroFloatingDot2({ color, floatAxis, sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_Box3.default,
      {
        ref,
        component: import_framer_motion4.motion.div,
        variants: fade("in"),
        "aria-hidden": "true",
        sx: [heroFloatingDotOuterSx, ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          import_Box3.default,
          {
            component: import_framer_motion4.motion.div,
            animate: { [floatAxis]: [0, HERO_FLOATING_DOT_FLOAT_DISTANCE, 0] },
            transition: {
              duration: HERO_FLOATING_DOT_FLOAT_DURATION,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            },
            sx: (theme) => heroFloatingDotInnerSx(theme, color)
          }
        )
      }
    );
  }
);
HeroFloatingDot.displayName = "HeroFloatingDot";

// src/utils/theme/theme-utils/theme-utils.ts
function channelAlpha(channel, alpha2) {
  return `rgba(${channel} / ${alpha2})`;
}

// src/components/motion/hero-background/hero-background.styles.ts
var heroBackgroundRootSx = (theme) => ({
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  zIndex: -1,
  pointerEvents: "none",
  "--hero-background-tint": channelAlpha(theme.vars.palette.primary.mainChannel, 0.16)
});
var heroBackgroundGradientSx = (theme) => ({
  position: "absolute",
  inset: 0,
  background: `radial-gradient(circle at 50% 40%, var(--hero-background-tint) 0%, ${theme.vars.palette.background.default} 70%)`
});
var heroBackgroundImageBaseSx = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.24
};
var heroBackgroundImageSx = heroBackgroundImageBaseSx;
var heroBackgroundImageLightWithDarkVariantSx = (theme) => ({
  ...heroBackgroundImageBaseSx,
  ...theme.applyStyles("dark", { display: "none" })
});
var heroBackgroundImageDarkSx = (theme) => ({
  ...heroBackgroundImageBaseSx,
  display: "none",
  ...theme.applyStyles("dark", { display: "block" })
});
var heroBackgroundSvgLayerSx = {
  position: "absolute",
  inset: 0,
  maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 85%)",
  WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 85%)"
};
var heroBackgroundPrimitivePlacementSx = {
  lineHorizontal1: { top: "10%", left: "4%" },
  lineHorizontal2: { top: "18%", left: "8%" },
  lineHorizontal3: { top: "34%", left: "2%" },
  lineHorizontal4: { top: "58%", right: "4%" },
  lineHorizontal5: { top: "78%", left: "10%" },
  lineVertical1: { top: "4%", left: "20%" },
  lineVertical2: { top: "22%", right: "14%" },
  lineVertical3: { top: "40%", left: "62%" },
  lineVertical4: { bottom: "6%", left: "30%" },
  lineVertical5: { top: "10%", right: "30%" },
  triangle: { bottom: "22%", left: "18%" },
  circleDot: { top: "14%", right: "24%" },
  floatDotAccent: { bottom: "30%", left: "46%" },
  dotError: { top: "20%", left: "12%" },
  dotWarning: { bottom: "28%", left: "22%" },
  dotInfo: { top: "32%", right: "18%" },
  dotSecondary: { top: "12%", right: "8%" },
  dotSuccess: { bottom: "16%", right: "30%" },
  plusSignA: { bottom: "16%", right: "10%" },
  plusSignB: { top: "40%", left: "34%" }
};

// src/components/motion/hero-background/hero-background.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var HeroBackground = import_react3.default.forwardRef(
  function HeroBackground2({ backgroundImageSrc, backgroundImageSrcDark, sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_Box4.default, { ref, sx: [heroBackgroundRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_Box4.default, { sx: heroBackgroundGradientSx }),
      backgroundImageSrc && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        import_Box4.default,
        {
          component: "img",
          src: backgroundImageSrc,
          alt: "",
          "aria-hidden": "true",
          sx: backgroundImageSrcDark ? heroBackgroundImageLightWithDarkVariantSx : heroBackgroundImageSx
        }
      ),
      backgroundImageSrc && backgroundImageSrcDark && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        import_Box4.default,
        {
          component: "img",
          src: backgroundImageSrcDark,
          alt: "",
          "aria-hidden": "true",
          sx: heroBackgroundImageDarkSx
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        import_Box4.default,
        {
          component: import_framer_motion5.motion.div,
          initial: "initial",
          animate: "animate",
          variants: container(),
          "aria-hidden": "true",
          sx: heroBackgroundSvgLayerSx,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatLine, { sx: heroBackgroundPrimitivePlacementSx.lineHorizontal1 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatLine, { sx: heroBackgroundPrimitivePlacementSx.lineHorizontal2 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatLine, { sx: heroBackgroundPrimitivePlacementSx.lineHorizontal3 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatLine, { sx: heroBackgroundPrimitivePlacementSx.lineHorizontal4 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatLine, { sx: heroBackgroundPrimitivePlacementSx.lineHorizontal5 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatLine, { vertical: true, sx: heroBackgroundPrimitivePlacementSx.lineVertical1 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatLine, { vertical: true, sx: heroBackgroundPrimitivePlacementSx.lineVertical2 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatLine, { vertical: true, sx: heroBackgroundPrimitivePlacementSx.lineVertical3 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatLine, { vertical: true, sx: heroBackgroundPrimitivePlacementSx.lineVertical4 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatLine, { vertical: true, sx: heroBackgroundPrimitivePlacementSx.lineVertical5 }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatTriangle, { sx: heroBackgroundPrimitivePlacementSx.triangle }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroCircleDot, { sx: heroBackgroundPrimitivePlacementSx.circleDot }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroFloatDot, { sx: heroBackgroundPrimitivePlacementSx.floatDotAccent }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              HeroFloatingDot,
              {
                color: "error",
                floatAxis: "x",
                sx: heroBackgroundPrimitivePlacementSx.dotError
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              HeroFloatingDot,
              {
                color: "warning",
                floatAxis: "y",
                sx: heroBackgroundPrimitivePlacementSx.dotWarning
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              HeroFloatingDot,
              {
                color: "info",
                floatAxis: "x",
                sx: heroBackgroundPrimitivePlacementSx.dotInfo
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              HeroFloatingDot,
              {
                color: "secondary",
                floatAxis: "x",
                sx: heroBackgroundPrimitivePlacementSx.dotSecondary
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              HeroFloatingDot,
              {
                color: "success",
                floatAxis: "y",
                sx: heroBackgroundPrimitivePlacementSx.dotSuccess
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroPlusSign, { sx: heroBackgroundPrimitivePlacementSx.plusSignA }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(HeroPlusSign, { sx: heroBackgroundPrimitivePlacementSx.plusSignB })
          ]
        }
      )
    ] });
  }
);
HeroBackground.displayName = "HeroBackground";

// src/components/motion/floating-icon-cloud/floating-icon-cloud.tsx
var import_react4 = __toESM(require("react"), 1);
var import_framer_motion6 = require("framer-motion");
var import_Box5 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip = __toESM(require("@mui/material/Tooltip"), 1);

// src/components/motion/floating-icon-cloud/floating-icon-cloud.const.ts
var ICON_CLOUD_ICON_SIZE = 40;
var ICON_CLOUD_ICON_SIZE_COMPACT = 28;
var ICON_CLOUD_MIN_RADIUS_PERCENT = 20;
var ICON_CLOUD_MAX_RADIUS_PERCENT = 46;
var ICON_CLOUD_VERTICAL_SQUASH = 0.55;
var ICON_CLOUD_ANGLE_JITTER_FACTOR = 0.6;
var ICON_CLOUD_MAX_DELAY = 1.2;
var ICON_CLOUD_FLOAT_DURATION = 5;
var ICON_CLOUD_FLOAT_RANGE = 14;

// src/components/motion/floating-icon-cloud/floating-icon-cloud.utils.ts
var TWO_PI = Math.PI * 2;
function seededFraction(seed) {
  const value = Math.sin(seed) * 43758.5453;
  return value - Math.floor(value);
}
function computeFloatingIconCloudPositions(count, seed = 1) {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, index) => {
    const baseAngle = index / count * TWO_PI;
    const slotHalfWidth = Math.PI / count;
    const angleJitter = (seededFraction(seed + index * 12.9898) - 0.5) * 2 * ICON_CLOUD_ANGLE_JITTER_FACTOR * slotHalfWidth;
    const angle = baseAngle + angleJitter;
    const radiusFraction = seededFraction(seed + index * 78.233 + 4.1414);
    const radius = ICON_CLOUD_MIN_RADIUS_PERCENT + radiusFraction * (ICON_CLOUD_MAX_RADIUS_PERCENT - ICON_CLOUD_MIN_RADIUS_PERCENT);
    const delayFraction = seededFraction(seed + index * 39.346);
    return {
      xPercent: Math.cos(angle) * radius,
      yPercent: Math.sin(angle) * radius * ICON_CLOUD_VERTICAL_SQUASH,
      delay: delayFraction * ICON_CLOUD_MAX_DELAY
    };
  });
}

// src/components/motion/floating-icon-cloud/floating-icon-cloud.animations.ts
function buildFloatTransition(delay) {
  return {
    duration: ICON_CLOUD_FLOAT_DURATION,
    ease: "easeInOut",
    repeat: Infinity,
    delay
  };
}

// src/components/motion/floating-icon-cloud/floating-icon-cloud.styles.ts
var COMMON_BLACK_CHANNEL = "var(--mui-palette-common-blackChannel)";
var floatingIconCloudRootSx = {
  position: "relative",
  width: "100%",
  height: { xs: 200, sm: 260, md: 320 }
};
var floatingIconCloudItemSx = (xPercent, yPercent) => ({
  position: "absolute",
  top: `calc(50% + ${yPercent}%)`,
  left: `calc(50% + ${xPercent}%)`,
  transform: "translate(-50%, -50%)"
});
var floatingIconCloudImageSx = {
  display: "block",
  width: {
    xs: ICON_CLOUD_ICON_SIZE_COMPACT,
    sm: ICON_CLOUD_ICON_SIZE_COMPACT,
    md: ICON_CLOUD_ICON_SIZE
  },
  height: {
    xs: ICON_CLOUD_ICON_SIZE_COMPACT,
    sm: ICON_CLOUD_ICON_SIZE_COMPACT,
    md: ICON_CLOUD_ICON_SIZE
  },
  objectFit: "contain",
  filter: `drop-shadow(0 2px 4px ${channelAlpha(COMMON_BLACK_CHANNEL, 0.18)})`
};

// src/components/motion/floating-icon-cloud/floating-icon-cloud.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var FloatingIconCloud = import_react4.default.forwardRef(
  function FloatingIconCloud2({ items, seed = 1, sx, ...other }, ref) {
    const positions = (0, import_react4.useMemo)(
      () => computeFloatingIconCloudPositions(items.length, seed),
      [items.length, seed]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_Box5.default, { ref, sx: [floatingIconCloudRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: items.map((item, index) => {
      const { xPercent, yPercent, delay } = positions[index];
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_Box5.default, { sx: floatingIconCloudItemSx(xPercent, yPercent), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        import_Box5.default,
        {
          component: import_framer_motion6.motion.div,
          animate: { y: [0, -ICON_CLOUD_FLOAT_RANGE, 0] },
          transition: buildFloatTransition(delay),
          children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_Tooltip.default, { title: item.label, arrow: true, placement: "top", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            import_Box5.default,
            {
              component: "img",
              src: item.src,
              alt: item.label,
              sx: floatingIconCloudImageSx
            }
          ) })
        }
      ) }, `${item.label}-${index}`);
    }) });
  }
);
FloatingIconCloud.displayName = "FloatingIconCloud";

// src/components/motion/section-title-animated/section-title-animated.tsx
var import_react6 = __toESM(require("react"), 1);
var import_framer_motion7 = require("framer-motion");
var import_Box7 = __toESM(require("@mui/material/Box"), 1);
var import_Typography = __toESM(require("@mui/material/Typography"), 1);

// src/components/material/layout/section-title/section-caption/section-caption.tsx
var import_react5 = __toESM(require("react"), 1);
var import_Box6 = __toESM(require("@mui/material/Box"), 1);

// src/components/material/layout/section-title/section-caption/section-caption.styles.ts
var sectionCaptionSx = {
  typography: "overline",
  color: "text.disabled"
};

// src/components/material/layout/section-title/section-caption/section-caption.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var SectionCaption = import_react5.default.forwardRef(
  function SectionCaption2({ title, sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      import_Box6.default,
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

// src/components/motion/section-title-animated/section-title-animated.utils.ts
var DEFAULT_ANIMATION_DIRECTION = {
  fade: "inUp",
  zoom: "inUp",
  scale: "in"
};
function buildItemVariants(animationVariant, animationDirection, animationDistance, transitionIn) {
  const direction = animationDirection ?? DEFAULT_ANIMATION_DIRECTION[animationVariant];
  switch (animationVariant) {
    case "scale":
      return scale(direction, { transitionIn });
    case "zoom":
      return zoom(direction, {
        distance: animationDistance,
        transitionIn
      });
    case "fade":
    default:
      return fade(direction, {
        distance: animationDistance,
        transitionIn
      });
  }
}

// src/components/motion/section-title-animated/section-title-animated.styles.ts
var sectionTitleAnimatedRootSx = {
  gap: 3,
  display: "flex",
  flexDirection: "column"
};
var sectionTitleAnimatedDescriptionSx = {
  color: "text.secondary",
  typography: "body1"
};
var txtGradientAnimatedSpanSx = (theme) => ({
  opacity: 0.4,
  display: "inline-block",
  background: `linear-gradient(to right, ${theme.vars.palette.text.primary}, ${channelAlpha(theme.vars.palette.text.primaryChannel, 0.2)})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent"
});

// src/components/motion/section-title-animated/section-title-animated.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var SectionTitleAnimated = import_react6.default.forwardRef(
  function SectionTitleAnimated2({
    sx,
    title,
    caption,
    slotProps,
    txtGradient,
    description,
    titleComponent = "h2",
    titleVariant = "h2",
    animationVariant = "fade",
    animationDirection,
    animationDistance,
    transitionIn,
    viewport,
    ...other
  }, ref) {
    const itemVariants = buildItemVariants(
      animationVariant,
      animationDirection,
      animationDistance,
      transitionIn
    );
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      import_Box7.default,
      {
        ref,
        component: import_framer_motion7.motion.div,
        initial: "initial",
        whileInView: "animate",
        viewport: { once: true, amount: 0.3, ...viewport },
        variants: container(),
        sx: [sectionTitleAnimatedRootSx, ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: [
          caption && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_Box7.default, { component: import_framer_motion7.motion.div, variants: itemVariants, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_Box7.default, { component: import_framer_motion7.motion.div, variants: itemVariants, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_Typography.default, { component: titleComponent, variant: titleVariant, sx: slotProps?.title?.sx, children: [
            title,
            " ",
            txtGradient && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_Box7.default, { component: "span", sx: txtGradientAnimatedSpanSx, children: txtGradient })
          ] }) }),
          description && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_Box7.default, { component: import_framer_motion7.motion.div, variants: itemVariants, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            import_Box7.default,
            {
              sx: [
                sectionTitleAnimatedDescriptionSx,
                ...Array.isArray(slotProps?.description?.sx) ? slotProps.description.sx : [slotProps?.description?.sx]
              ],
              children: description
            }
          ) })
        ]
      }
    );
  }
);
SectionTitleAnimated.displayName = "SectionTitleAnimated";

// src/components/motion/use-scroll-parallax/use-scroll-parallax.ts
var import_react7 = require("react");
var import_framer_motion8 = require("framer-motion");

// src/components/motion/use-scroll-parallax/use-scroll-parallax.const.ts
var LAYER_MULTIPLIERS = [40, 80, 120, 160, 200];
var USE_SCROLL_PARALLAX_SPRING_MASS = 0.1;
var USE_SCROLL_PARALLAX_SPRING_DAMPING = 20;
var USE_SCROLL_PARALLAX_SPRING_STIFFNESS = 300;

// src/components/motion/use-scroll-parallax/use-scroll-parallax.ts
function useScrollParallax() {
  const ref = (0, import_react7.useRef)(null);
  const { scrollYProgress } = (0, import_framer_motion8.useScroll)({
    target: ref,
    offset: ["start end", "end start"]
  });
  const springConfig = {
    mass: USE_SCROLL_PARALLAX_SPRING_MASS,
    damping: USE_SCROLL_PARALLAX_SPRING_DAMPING,
    stiffness: USE_SCROLL_PARALLAX_SPRING_STIFFNESS
  };
  const t0 = (0, import_framer_motion8.useTransform)(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[0], LAYER_MULTIPLIERS[0]]);
  const t1 = (0, import_framer_motion8.useTransform)(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[1], LAYER_MULTIPLIERS[1]]);
  const t2 = (0, import_framer_motion8.useTransform)(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[2], LAYER_MULTIPLIERS[2]]);
  const t3 = (0, import_framer_motion8.useTransform)(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[3], LAYER_MULTIPLIERS[3]]);
  const t4 = (0, import_framer_motion8.useTransform)(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[4], LAYER_MULTIPLIERS[4]]);
  const l0 = (0, import_framer_motion8.useSpring)(t0, springConfig);
  const l1 = (0, import_framer_motion8.useSpring)(t1, springConfig);
  const l2 = (0, import_framer_motion8.useSpring)(t2, springConfig);
  const l3 = (0, import_framer_motion8.useSpring)(t3, springConfig);
  const l4 = (0, import_framer_motion8.useSpring)(t4, springConfig);
  return { ref, layers: [l0, l1, l2, l3, l4] };
}

// src/components/section/hero/interactive-logo/interactive-logo.tsx
var import_react12 = require("react");
var import_framer_motion12 = require("framer-motion");
var import_Box11 = __toESM(require("@mui/material/Box"), 1);

// src/utils/hooks/use-image-preloader/use-image-preloader.ts
function preloadImages(srcs) {
  srcs.forEach((src) => {
    if (src) {
      const img = new Image();
      img.src = src;
    }
  });
}

// src/components/section/hero/interactive-logo/portrait-layer/portrait-layer.tsx
var import_react8 = __toESM(require("react"), 1);
var import_framer_motion9 = require("framer-motion");
var import_Box8 = __toESM(require("@mui/material/Box"), 1);

// src/components/section/hero/interactive-logo/portrait-layer/portrait-layer.styles.ts
var portraitWrapperSx = {
  top: "50%",
  left: "50%",
  zIndex: 3,
  width: "100%",
  height: "100%",
  overflow: "visible",
  objectFit: "contain",
  objectPosition: "center center",
  position: "absolute",
  pointerEvents: "none",
  transform: "translate(-50%, -50%) scale(3.8)"
};
var portraitImageSx = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  objectPosition: "center center",
  display: "block"
};

// src/components/section/hero/interactive-logo/portrait-layer/portrait-layer.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var PortraitLayer = import_react8.default.forwardRef(
  function PortraitLayer2({ portraitSrc, portraitAlt, showPortrait, portraitFadeTransition }, ref) {
    if (!portraitSrc) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_Box8.default, { ref, sx: portraitWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      import_Box8.default,
      {
        component: import_framer_motion9.motion.img,
        alt: portraitAlt,
        src: portraitSrc,
        initial: {
          opacity: 0,
          scale: 1.035,
          filter: "blur(10px)"
        },
        animate: {
          opacity: showPortrait ? 1 : 0,
          scale: showPortrait ? 1 : 1.035,
          filter: showPortrait ? "blur(0px)" : "blur(10px)"
        },
        transition: portraitFadeTransition,
        sx: portraitImageSx
      }
    ) });
  }
);
PortraitLayer.displayName = "PortraitLayer";

// src/components/section/hero/interactive-logo/original-logo-layer/original-logo-layer.tsx
var import_react9 = __toESM(require("react"), 1);
var import_framer_motion10 = require("framer-motion");
var import_Box9 = __toESM(require("@mui/material/Box"), 1);

// src/components/section/hero/interactive-logo/original-logo-layer/original-logo-layer.styles.ts
var originalLayerSx = {
  position: "relative",
  zIndex: 1,
  width: 1,
  height: 1,
  willChange: "transform"
};
var activeFrameImageSx = {
  width: 1,
  height: 1
};

// src/components/section/hero/interactive-logo/original-logo-layer/original-logo-layer.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var OriginalLogoLayer = import_react9.default.forwardRef(
  function OriginalLogoLayer2({ hoverPhase, logoFadeTransition, activeFrame, logoAlt, hasArtisticContent = false, children }, ref) {
    const isArtistic = hoverPhase === "artistic";
    const animateOpacity = isArtistic || !hasArtisticContent ? 1 : 0;
    const animateScale = isArtistic || !hasArtisticContent ? 1 : 0.985;
    const animateFilter = isArtistic || !hasArtisticContent ? "blur(0px)" : "blur(4px)";
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      import_Box9.default,
      {
        ref,
        component: import_framer_motion10.motion.div,
        initial: {
          opacity: 0,
          scale: 1,
          filter: "blur(0px)"
        },
        animate: {
          opacity: animateOpacity,
          scale: animateScale,
          filter: animateFilter
        },
        transition: logoFadeTransition,
        sx: originalLayerSx,
        children: activeFrame ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_Box9.default, { component: "img", alt: logoAlt ?? "Logo", src: activeFrame, sx: activeFrameImageSx }) : children
      }
    );
  }
);
OriginalLogoLayer.displayName = "OriginalLogoLayer";

// src/components/section/hero/interactive-logo/artistic-logo-layer/artistic-logo-layer.tsx
var import_react10 = __toESM(require("react"), 1);
var import_framer_motion11 = require("framer-motion");
var import_Box10 = __toESM(require("@mui/material/Box"), 1);

// src/components/section/hero/interactive-logo/artistic-logo-layer/artistic-logo-layer.styles.ts
var artisticLogoSx = {
  inset: 0,
  zIndex: 2,
  width: 1,
  height: 1,
  objectFit: "contain",
  objectPosition: "center center",
  position: "absolute",
  pointerEvents: "none"
};

// src/components/section/hero/interactive-logo/artistic-logo-layer/artistic-logo-layer.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var ArtisticLogoLayer = import_react10.default.forwardRef(
  function ArtisticLogoLayer2({ artisticLogoSrc, showArtisticLogo, logoFadeTransition, logoAlt }, ref) {
    if (!artisticLogoSrc) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      import_Box10.default,
      {
        ref,
        component: import_framer_motion11.motion.img,
        alt: logoAlt ?? "Logo",
        src: artisticLogoSrc,
        initial: {
          opacity: 1,
          scale: 1.03,
          filter: "blur(8px)"
        },
        animate: {
          opacity: showArtisticLogo ? 1 : 0,
          scale: showArtisticLogo ? 1 : 1.03,
          filter: showArtisticLogo ? "blur(0px)" : "blur(8px)"
        },
        transition: logoFadeTransition,
        sx: artisticLogoSx
      }
    );
  }
);
ArtisticLogoLayer.displayName = "ArtisticLogoLayer";

// src/components/section/hero/interactive-logo/use-hover-phase-transition.ts
var import_react11 = require("react");

// src/components/section/hero/interactive-logo/interactive-logo.const.ts
var DEFAULT_PORTRAIT_DIRECTION = "forward";
var PORTRAIT_ACTIVATION_DELAY_MS = 500;

// src/components/section/hero/interactive-logo/use-hover-phase-transition.ts
function useHoverPhaseTransition({
  isHovered,
  hasPortrait,
  reducedMotion
}) {
  const [hoverPhase, setHoverPhase] = (0, import_react11.useState)("idle");
  const [hasActivatedPortrait, setHasActivatedPortrait] = (0, import_react11.useState)(false);
  const [activePortraitDirection, setActivePortraitDirection] = (0, import_react11.useState)(DEFAULT_PORTRAIT_DIRECTION);
  const portraitTimeoutRef = (0, import_react11.useRef)(null);
  (0, import_react11.useEffect)(() => {
    if (portraitTimeoutRef.current) {
      globalThis.clearTimeout(portraitTimeoutRef.current);
      portraitTimeoutRef.current = null;
    }
    if (!isHovered) {
      setActivePortraitDirection(DEFAULT_PORTRAIT_DIRECTION);
      setHoverPhase("idle");
      return void 0;
    }
    if (hasActivatedPortrait && hasPortrait) {
      setHoverPhase("portrait");
      return void 0;
    }
    setHoverPhase("artistic");
    if (!hasPortrait) {
      return void 0;
    }
    portraitTimeoutRef.current = globalThis.setTimeout(
      () => {
        setHasActivatedPortrait(true);
        setActivePortraitDirection(DEFAULT_PORTRAIT_DIRECTION);
        setHoverPhase("portrait");
      },
      reducedMotion ? 0 : PORTRAIT_ACTIVATION_DELAY_MS
    );
    return () => {
      if (portraitTimeoutRef.current) {
        globalThis.clearTimeout(portraitTimeoutRef.current);
        portraitTimeoutRef.current = null;
      }
    };
  }, [hasActivatedPortrait, hasPortrait, isHovered, reducedMotion]);
  return { hoverPhase, hasActivatedPortrait, activePortraitDirection, setActivePortraitDirection };
}

// src/components/section/hero/interactive-logo/interactive-logo.styles.ts
var innerContainerSx = {
  position: "relative",
  display: "inline-flex",
  width: 1,
  height: 1,
  overflow: "visible",
  transformStyle: "preserve-3d",
  transition: "filter 240ms ease",
  mb: { xs: 0 }
};
var rootBoxSx = (cursor) => () => ({
  perspective: 1200,
  cursor,
  overflow: "visible"
});
var logoStack3dWrapperSx = {
  position: "relative",
  width: 1,
  height: 1
};

// src/components/section/hero/interactive-logo/interactive-logo.utils.ts
function getRandomPortraitSrc(src) {
  if (typeof src === "string") return src;
  if (src.length === 0) return "";
  return src[Math.floor(Math.random() * src.length)] ?? "";
}
function getPortraitDirectionFromAngle(angle) {
  const abs = Math.abs(angle);
  if (abs >= 157.5) return "left";
  if (angle >= 112.5) return "down-left";
  if (angle >= 67.5) return "down";
  if (angle >= 22.5) return "down-right";
  if (angle >= -22.5) return "right";
  if (angle >= -67.5) return "up-right";
  if (angle >= -112.5) return "up";
  if (angle >= -157.5) return "up-left";
  return "left";
}
function buildPortraitSourceMap(portraitSrc, portraitSources) {
  const map = {};
  if (portraitSrc) {
    map["forward"] = portraitSrc;
  }
  portraitSources?.forEach(({ direction, src }) => {
    const isEmpty = typeof src === "string" ? src === "" : src.length === 0;
    if (!isEmpty) {
      map[direction] = src;
    }
  });
  return map;
}
function getCursorStyle(reducedMotion, isPointerDown) {
  if (reducedMotion === true) return "default";
  return isPointerDown ? "grabbing" : "grab";
}

// src/components/section/hero/interactive-logo/interactive-logo.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function InteractiveHeroLogo({
  sx,
  rootSx,
  frameSources,
  artisticLogoSrc,
  logoAlt,
  portraitSrc,
  portraitSources,
  portraitAlt = "Portrait",
  children,
  ...other
}) {
  const reducedMotion = (0, import_framer_motion12.useReducedMotion)();
  const rootRef = (0, import_react12.useRef)(null);
  const scrub = (0, import_framer_motion12.useMotionValue)(0);
  const scrubSpring = (0, import_framer_motion12.useSpring)(scrub, { stiffness: 240, damping: 28, mass: 0.25 });
  const tiltX = (0, import_framer_motion12.useMotionValue)(0);
  const tiltY = (0, import_framer_motion12.useMotionValue)(0);
  const panX = (0, import_framer_motion12.useMotionValue)(0);
  const panY = (0, import_framer_motion12.useMotionValue)(0);
  const rotateX = (0, import_framer_motion12.useSpring)(tiltX, { stiffness: 220, damping: 13, mass: 0.24 });
  const rotateY = (0, import_framer_motion12.useSpring)(tiltY, { stiffness: 220, damping: 13, mass: 0.24 });
  const x = (0, import_framer_motion12.useSpring)(panX, { stiffness: 230, damping: 13, mass: 0.2 });
  const y = (0, import_framer_motion12.useSpring)(panY, { stiffness: 230, damping: 13, mass: 0.2 });
  const validFrames = (0, import_react12.useMemo)(() => (frameSources ?? []).filter(Boolean), [frameSources]);
  const portraitSourceMap = (0, import_react12.useMemo)(
    () => buildPortraitSourceMap(portraitSrc, portraitSources),
    [portraitSrc, portraitSources]
  );
  const hasPortrait = (0, import_react12.useMemo)(
    () => Object.values(portraitSourceMap).some(Boolean),
    [portraitSourceMap]
  );
  const allPortraitSrcs = (0, import_react12.useMemo)(
    () => Object.values(portraitSourceMap).flatMap(
      (src) => typeof src === "string" ? [src] : [...src ?? []]
    ),
    [portraitSourceMap]
  );
  (0, import_react12.useEffect)(() => {
    preloadImages(allPortraitSrcs);
  }, [allPortraitSrcs]);
  const [activePortraitSrcResolved, setActivePortraitSrcResolved] = (0, import_react12.useState)("");
  const frameCount = validFrames.length;
  const [frameIndex, setFrameIndex] = (0, import_react12.useState)(0);
  const [isPointerDown, setIsPointerDown] = (0, import_react12.useState)(false);
  const [isHovered, setIsHovered] = (0, import_react12.useState)(false);
  const { hoverPhase, hasActivatedPortrait, activePortraitDirection, setActivePortraitDirection } = useHoverPhaseTransition({ isHovered, hasPortrait, reducedMotion });
  (0, import_react12.useEffect)(() => {
    if (hoverPhase !== "portrait") {
      return;
    }
    tiltX.set(0);
    tiltY.set(0);
    panX.set(0);
    panY.set(0);
  }, [hoverPhase, panX, panY, tiltX, tiltY]);
  (0, import_react12.useEffect)(() => {
    if (frameCount <= 1 || reducedMotion) {
      setFrameIndex(0);
      return;
    }
    const unsubscribe = scrubSpring.on("change", (value) => {
      const normalized = Math.min(1, Math.max(0, value));
      const nextIndex = Math.round(normalized * (frameCount - 1));
      setFrameIndex(nextIndex);
    });
    return unsubscribe;
  }, [frameCount, reducedMotion, scrubSpring]);
  const handlePointerDown = (0, import_react12.useCallback)(() => setIsPointerDown(true), []);
  const handlePointerUp = (0, import_react12.useCallback)(() => setIsPointerDown(false), []);
  const handlePointerEnter = (0, import_react12.useCallback)(() => setIsHovered(true), []);
  const handleInnerPointerLeave = (0, import_react12.useCallback)(() => setIsHovered(false), []);
  const handlePointerMove = (0, import_react12.useCallback)(
    (event) => {
      if (reducedMotion) return;
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pointerX = (event.clientX - rect.left) / rect.width;
      const pointerY = (event.clientY - rect.top) / rect.height;
      const normalizedX = Math.min(1, Math.max(0, pointerX));
      const normalizedY = Math.min(1, Math.max(0, pointerY));
      if (hasActivatedPortrait) {
        const deltaX = event.clientX - (rect.left + rect.width / 2);
        const deltaY = event.clientY - (rect.top + rect.height / 2);
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        const nextDirection = getPortraitDirectionFromAngle(angle);
        setActivePortraitDirection(nextDirection);
        tiltX.set(0);
        tiltY.set(0);
        panX.set(0);
        panY.set(0);
        return;
      }
      scrub.set(normalizedX);
      tiltX.set((0.5 - normalizedY) * 40);
      tiltY.set((normalizedX - 0.5) * 48);
      panX.set((normalizedX - 0.5) * 44);
      panY.set((normalizedY - 0.5) * 32);
    },
    [
      hasActivatedPortrait,
      panX,
      panY,
      reducedMotion,
      scrub,
      setActivePortraitDirection,
      tiltX,
      tiltY
    ]
  );
  const handlePointerLeave = (0, import_react12.useCallback)(() => {
    setIsHovered(false);
    setIsPointerDown(false);
    setActivePortraitDirection(DEFAULT_PORTRAIT_DIRECTION);
    scrub.set(0.5);
    tiltX.set(0);
    tiltY.set(0);
    panX.set(0);
    panY.set(0);
  }, [panX, panY, scrub, setActivePortraitDirection, tiltX, tiltY]);
  (0, import_react12.useEffect)(() => {
    const rawSrc = portraitSourceMap[activePortraitDirection] ?? portraitSourceMap[DEFAULT_PORTRAIT_DIRECTION];
    if (rawSrc) {
      setActivePortraitSrcResolved(getRandomPortraitSrc(rawSrc));
    }
  }, [activePortraitDirection, portraitSourceMap]);
  const activeFrame = validFrames[Math.min(frameIndex, Math.max(0, frameCount - 1))];
  const showArtisticLogo = artisticLogoSrc && hoverPhase === "idle";
  const showPortrait = activePortraitSrcResolved && hoverPhase === "portrait";
  const shadowX = (0, import_framer_motion12.useTransform)(panX, (value) => value * -0.3);
  const shadowY = (0, import_framer_motion12.useTransform)(panY, (value) => 10 + value * 0.45);
  const shadowBlur = isHovered ? 24 : 16;
  const shadowAlpha = isHovered ? 0.34 : 0.22;
  const logoStackFilter = import_framer_motion12.useMotionTemplate`brightness(0.9) drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgb(var(--mui-palette-grey-900Channel) / ${shadowAlpha}))`;
  const logoFadeTransition = reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
  const portraitFadeTransition = reducedMotion ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] };
  const cursorStyle = getCursorStyle(reducedMotion, isPointerDown);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    import_Box11.default,
    {
      ...other,
      ref: rootRef,
      component: import_framer_motion12.motion.div,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
      sx: [rootBoxSx(cursorStyle), ...Array.isArray(rootSx) ? rootSx : [rootSx]],
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
        import_Box11.default,
        {
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handleInnerPointerLeave,
          sx: [innerContainerSx, ...Array.isArray(sx) ? sx : [sx]],
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
              import_Box11.default,
              {
                component: import_framer_motion12.motion.div,
                style: reducedMotion ? void 0 : {
                  rotateX,
                  rotateY,
                  x,
                  y,
                  filter: logoStackFilter
                },
                sx: logoStack3dWrapperSx,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                    OriginalLogoLayer,
                    {
                      hoverPhase,
                      logoFadeTransition,
                      activeFrame,
                      logoAlt,
                      hasArtisticContent: Boolean(artisticLogoSrc),
                      children
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                    ArtisticLogoLayer,
                    {
                      artisticLogoSrc,
                      showArtisticLogo: Boolean(showArtisticLogo),
                      logoFadeTransition,
                      logoAlt
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              PortraitLayer,
              {
                portraitSrc: activePortraitSrcResolved,
                portraitAlt,
                showPortrait: Boolean(showPortrait),
                portraitFadeTransition
              }
            )
          ]
        }
      )
    }
  );
}

// src/components/section/hero/buttons-row/hero-buttons-row.tsx
var import_framer_motion13 = require("framer-motion");
var import_Box12 = __toESM(require("@mui/material/Box"), 1);
var import_Button = __toESM(require("@mui/material/Button"), 1);

// src/components/section/hero/buttons-row/hero-buttons-row.styles.ts
var rowSx = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: { xs: 1.25, sm: 1.5 }
};
var buttonSx = {
  minWidth: 156,
  height: 48,
  borderColor: "currentColor"
};

// src/components/section/hero/buttons-row/hero-buttons-row.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function HeroButtonsRow({ items, motionProps, sx, ...other }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_Box12.default, { sx: [rowSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_framer_motion13.motion.div, { ...motionProps, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    import_Button.default,
    {
      href: item.href,
      target: item.target,
      rel: item.rel,
      color: "inherit",
      size: "large",
      variant: item.variant ?? "contained",
      sx: buttonSx,
      children: item.label
    }
  ) }, item.label)) });
}

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.tsx
var import_react15 = require("react");
var import_framer_motion15 = require("framer-motion");
var import_Box14 = __toESM(require("@mui/material/Box"), 1);

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
var import_react14 = __toESM(require("react"), 1);
var import_framer_motion14 = require("framer-motion");
var import_Box13 = __toESM(require("@mui/material/Box"), 1);
var import_Stack = __toESM(require("@mui/material/Stack"), 1);

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
var import_react13 = __toESM(require("react"), 1);
var import_Tooltip2 = __toESM(require("@mui/material/Tooltip"), 1);
var import_ButtonBase = __toESM(require("@mui/material/ButtonBase"), 1);

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
var import_jsx_runtime14 = require("react/jsx-runtime");
var SubNavButton = import_react13.default.forwardRef(
  function SubNavButton2({ item, isActive, onPress }, ref) {
    const handleClick = (0, import_react13.useCallback)(() => onPress(item.id), [onPress, item.id]);
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_Tooltip2.default, { title: item.label, placement: "top", arrow: true, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      import_ButtonBase.default,
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
var import_jsx_runtime15 = require("react/jsx-runtime");
var NavPill = import_react14.default.forwardRef(function NavPill2({ items, activeId, onPress }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_framer_motion14.m.div,
    {
      ref,
      variants: pillVariants,
      initial: "initial",
      animate: "animate",
      exit: "exit",
      transition: pillTransition,
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Box13.default, { component: "nav", "aria-label": "Section navigation", sx: pillSx, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Stack.default, { direction: "row", spacing: PILL_BUTTON_ROW_SPACING, children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
var import_jsx_runtime16 = require("react/jsx-runtime");
function FloatingSubNav({ items, activeId, onSelect, sticky = false }) {
  const handlePress = (0, import_react15.useCallback)((id) => onSelect(id), [onSelect]);
  if (sticky) {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_Box14.default, { sx: stickyWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_Box14.default, { sx: stickyInnerSx, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_framer_motion15.AnimatePresence, { children: activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(NavPill, { items, activeId, onPress: handlePress }) }) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_framer_motion15.AnimatePresence, { children: activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_Box14.default, { sx: fixedWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(NavPill, { items, activeId, onPress: handlePress }) }) });
}

// src/components/motion/floating-side-nav/floating-side-nav.tsx
var import_react16 = __toESM(require("react"), 1);
var import_framer_motion16 = require("framer-motion");
var import_Box15 = __toESM(require("@mui/material/Box"), 1);
var import_ButtonBase2 = __toESM(require("@mui/material/ButtonBase"), 1);
var import_Typography2 = __toESM(require("@mui/material/Typography"), 1);

// src/components/motion/floating-side-nav/floating-side-nav.animations.ts
var SIDE_NAV_EASING = [0.4, 0, 0.2, 1];
var SIDE_NAV_TRANSITION_DURATION = 0.28;
var sideNavTransition = {
  duration: SIDE_NAV_TRANSITION_DURATION,
  ease: SIDE_NAV_EASING
};
var sideNavVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 }
};

// src/components/motion/floating-side-nav/floating-side-nav.const.ts
var SIDE_NAV_ITEM_MIN_HEIGHT = 44;

// src/components/motion/floating-side-nav/floating-side-nav.styles.ts
var grey500Ch3 = (theme) => theme.vars.palette.grey["500Channel"];
var primaryAlpha = (theme, alpha2) => channelAlpha(theme.vars.palette.primary.mainChannel, alpha2);
var floatingSideNavWrapperSx = (theme) => ({
  position: "fixed",
  left: { xs: 16, md: 24 },
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: theme.zIndex.speedDial
});
var floatingSideNavPillSx = (theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: 1,
  p: 1,
  borderRadius: 2,
  bgcolor: "background.paper",
  boxShadow: theme.shadows[8]
});
var floatingSideNavItemSx = (isActive) => (theme) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 0.5,
  minHeight: SIDE_NAV_ITEM_MIN_HEIGHT,
  px: 1.5,
  py: 1,
  borderRadius: 1.5,
  color: "text.disabled",
  outline: "none",
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.shorter
  }),
  "&:focus-visible": {
    outline: `2px dashed ${theme.vars.palette.primary.main}`,
    outlineOffset: 2
  },
  "&:hover": {
    color: "text.primary",
    bgcolor: channelAlpha(grey500Ch3(theme), 0.08)
  },
  ...isActive && {
    color: "primary.main",
    bgcolor: primaryAlpha(theme, 0.08),
    "&:hover": {
      bgcolor: primaryAlpha(theme, 0.12)
    }
  }
});
var floatingSideNavIconSx = {
  display: "flex",
  fontSize: 20
};
var floatingSideNavLabelSx = {
  fontSize: 10,
  lineHeight: 1.2,
  textAlign: "center"
};

// src/components/motion/floating-side-nav/floating-side-nav.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
var FloatingSideNav = import_react16.default.forwardRef(
  function FloatingSideNav2({ items, isVisible, activeId, onSelect, sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_framer_motion16.AnimatePresence, { children: isVisible && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_Box15.default, { sx: floatingSideNavWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      import_framer_motion16.motion.div,
      {
        variants: sideNavVariants,
        initial: "initial",
        animate: "animate",
        exit: "exit",
        transition: sideNavTransition,
        children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          import_Box15.default,
          {
            ref,
            component: "nav",
            "aria-label": "Section navigation",
            sx: [floatingSideNavPillSx, ...Array.isArray(sx) ? sx : [sx]],
            ...other,
            children: items.map((item) => {
              const isActive = activeId === item.id;
              return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
                import_ButtonBase2.default,
                {
                  component: "button",
                  type: "button",
                  "aria-pressed": isActive,
                  onClick: () => onSelect(item.id),
                  sx: floatingSideNavItemSx(isActive),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_Box15.default, { "aria-hidden": "true", sx: floatingSideNavIconSx, children: item.icon }),
                    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_Typography2.default, { variant: "caption", component: "span", sx: floatingSideNavLabelSx, children: item.label })
                  ]
                },
                item.id
              );
            })
          }
        )
      }
    ) }) });
  }
);
FloatingSideNav.displayName = "FloatingSideNav";

// src/components/motion/scroll-progress/scroll-progress.tsx
var import_react18 = __toESM(require("react"), 1);
var import_framer_motion18 = require("framer-motion");
var import_Box16 = __toESM(require("@mui/material/Box"), 1);

// src/components/motion/scroll-progress/use-scroll-progress.ts
var import_react17 = require("react");
var import_framer_motion17 = require("framer-motion");
function useScrollProgress(target = "document") {
  const elementRef = (0, import_react17.useRef)(null);
  const { scrollYProgress } = (0, import_framer_motion17.useScroll)(
    target === "container" ? { container: elementRef } : void 0
  );
  return { scrollYProgress, elementRef };
}

// src/components/motion/scroll-progress/scroll-progress.styles.ts
var scrollProgressRootSx = (thickness, color) => (theme) => ({
  top: 0,
  left: 0,
  right: 0,
  position: "fixed",
  height: thickness,
  transformOrigin: "0%",
  zIndex: theme.zIndex.appBar + 1,
  background: `linear-gradient(135deg, ${theme.vars.palette[color].light}, ${theme.vars.palette[color].main})`
});
var scrollProgressBarStyle = (scaleX) => ({ scaleX });

// src/components/motion/scroll-progress/scroll-progress.const.ts
var SCROLL_PROGRESS_DEFAULT_THICKNESS = 4;
var SCROLL_PROGRESS_SPRING_STIFFNESS = 100;
var SCROLL_PROGRESS_SPRING_DAMPING = 30;
var SCROLL_PROGRESS_SPRING_REST_DELTA = 1e-3;

// src/components/motion/scroll-progress/scroll-progress.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
var ScrollProgress = import_react18.default.forwardRef(
  function ScrollProgress2({ thickness = SCROLL_PROGRESS_DEFAULT_THICKNESS, color = "primary", progress, sx, ...other }, ref) {
    const { scrollYProgress: internalProgress } = useScrollProgress();
    const scrollYProgress = progress ?? internalProgress;
    const scaleX = (0, import_framer_motion18.useSpring)(scrollYProgress, {
      stiffness: SCROLL_PROGRESS_SPRING_STIFFNESS,
      damping: SCROLL_PROGRESS_SPRING_DAMPING,
      restDelta: SCROLL_PROGRESS_SPRING_REST_DELTA
    });
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      import_Box16.default,
      {
        ref,
        component: import_framer_motion18.motion.div,
        style: scrollProgressBarStyle(scaleX),
        sx: [scrollProgressRootSx(thickness, color), ...Array.isArray(sx) ? sx : [sx]],
        ...other
      }
    );
  }
);
ScrollProgress.displayName = "ScrollProgress";

// src/components/section/about-hero/about-hero-section.tsx
var import_react22 = __toESM(require("react"), 1);
var import_framer_motion19 = require("framer-motion");
var import_Box22 = __toESM(require("@mui/material/Box"), 1);
var import_Stack2 = __toESM(require("@mui/material/Stack"), 1);
var import_Button2 = __toESM(require("@mui/material/Button"), 1);

// src/components/material/data-display/icon/client-logo-strip/client-logo-strip.tsx
var import_Box18 = __toESM(require("@mui/material/Box"), 1);

// src/components/material/data-display/icon/icon-strip/icon-strip.tsx
var import_react19 = __toESM(require("react"), 1);
var import_Box17 = __toESM(require("@mui/material/Box"), 1);
var import_Tooltip3 = __toESM(require("@mui/material/Tooltip"), 1);
var import_Typography3 = __toESM(require("@mui/material/Typography"), 1);

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
var import_jsx_runtime19 = require("react/jsx-runtime");
function IconStrip({
  items,
  heading,
  centeredWrap = false,
  gap = ICON_STRIP_DEFAULT_GAP,
  sx,
  listSx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_Box17.default, { sx: [iconStripRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    heading && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_Typography3.default, { component: "span", variant: "overline", sx: iconStripHeadingSx, children: heading }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      import_Box17.default,
      {
        sx: [iconStripListSx(centeredWrap, gap), ...Array.isArray(listSx) ? listSx : [listSx]],
        children: items.map((item) => {
          const content = item.label ? /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_Box17.default, { sx: iconStripLabeledItemSx, children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_Box17.default, { "aria-hidden": true, sx: iconStripIconSlotSx, children: item.icon }),
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_Typography3.default, { sx: iconStripItemLabelSx, variant: "caption", children: item.label })
          ] }) : item.icon;
          return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react19.default.Fragment, { children: item.tooltip ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_Tooltip3.default, { title: item.tooltip, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_Box17.default, { component: "span", sx: iconStripTooltipWrapperSx, children: content }) }) : content }, item.key);
        })
      }
    )
  ] });
}

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
var import_jsx_runtime20 = require("react/jsx-runtime");
function ClientLogoStrip({ logos, sx, listSx, ...other }) {
  const items = logos.map((logo) => ({
    key: logo.src,
    icon: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box18.default, { component: "img", src: logo.src, alt: logo.alt, sx: clientLogoStripImageSx })
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(IconStrip, { items, gap: CLIENT_LOGO_STRIP_GAP, sx, listSx, ...other });
}

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
var import_react20 = require("@iconify/react");
var import_Box19 = __toESM(require("@mui/material/Box"), 1);

// src/components/material/data-display/icon/giselle/giselle-icon.styles.ts
var giselleIconRootSx = (width, height) => ({
  lineHeight: 0,
  display: "inline-flex",
  flexShrink: 0,
  width,
  height
});

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
function GiselleIcon({
  icon,
  width = 20,
  height,
  sx,
  className,
  style,
  flip: flip2,
  rotate: rotate2,
  ...other
}) {
  const h = height ?? width;
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    import_Box19.default,
    {
      component: "span",
      sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
        import_react20.Icon,
        {
          icon,
          width: "100%",
          height: "100%",
          flip: flip2,
          rotate: rotate2,
          className,
          style
        }
      )
    }
  );
}

// src/components/material/layout/page-section/page-section.tsx
var import_react21 = __toESM(require("react"), 1);
var import_Box20 = __toESM(require("@mui/material/Box"), 1);

// src/components/material/layout/section-container/section-container.tsx
var import_Container = __toESM(require("@mui/material/Container"), 1);

// src/components/material/layout/section-container/section-container.styles.ts
var sectionContainerSx = (py) => ({
  py
});

// src/components/material/layout/section-container/section-container.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
function SectionContainer({
  children,
  maxWidth = "lg",
  py = { xs: 8, md: 12 },
  sx,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    import_Container.default,
    {
      maxWidth,
      sx: [sectionContainerSx(py), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children
    }
  );
}

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
var import_jsx_runtime23 = require("react/jsx-runtime");
function Decoration({ kind, vertical, sx }) {
  switch (kind) {
    case "corner-plus":
      return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        import_Box20.default,
        {
          "aria-hidden": "true",
          sx: [cornerPlusSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M8 0V16M16 8H0", stroke: "currentColor" })
        }
      );
    case "corner-x":
      return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        import_Box20.default,
        {
          "aria-hidden": "true",
          sx: [cornerXSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            "path",
            {
              d: "M14 2L7.96685 8.03315M7.96685 8.03315L2.0663 13.9337M7.96685 8.03315L13.9337 14M7.96685 8.03315L2 2.0663",
              stroke: "currentColor"
            }
          )
        }
      );
    case "border-line":
      return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_Box20.default, { "aria-hidden": "true", sx: [borderLineSx(vertical), ...Array.isArray(sx) ? sx : [sx]] });
    case "triangle-left":
      return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        import_Box20.default,
        {
          "aria-hidden": "true",
          sx: [triangleLeftSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 10 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M10 10L8.74228e-07 20L0 0L10 10Z", fill: "currentColor" })
        }
      );
    case "triangle-down":
      return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        import_Box20.default,
        {
          "aria-hidden": "true",
          sx: [triangleDownSx, ...Array.isArray(sx) ? sx : [sx]],
          component: "svg",
          viewBox: "0 0 20 10",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M10 10L0 0H20L10 10Z", fill: "currentColor" })
        }
      );
    case "dot":
      return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_Box20.default, { "aria-hidden": "true", sx: [dotSx, ...Array.isArray(sx) ? sx : [sx]] });
  }
}
function resolveDecoration(decoration) {
  if (decoration === true) return CANONICAL_FRAME;
  if (decoration === false) return [];
  return decoration;
}
var PageSection = import_react21.default.forwardRef(function PageSection2({
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
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
    import_Box20.default,
    {
      ref,
      component: "section",
      sx: [pageSectionRootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        elements.map((element, index) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Decoration, { ...element }, index)),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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

// src/components/material/layout/section-title/section-title.tsx
var import_Box21 = __toESM(require("@mui/material/Box"), 1);
var import_Typography4 = __toESM(require("@mui/material/Typography"), 1);

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

// src/components/material/layout/section-title/section-title.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_Box21.default, { sx: [sectionTitleRootSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    caption && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_Typography4.default, { component: titleComponent, variant: titleVariant, sx: slotProps?.title?.sx, children: [
      title,
      " ",
      txtGradient && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_Box21.default, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
    ] }),
    description && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      import_Box21.default,
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

// src/components/section/about-hero/about-hero-section.const.ts
var ABOUT_HERO_HEIGHT = 660;
var ABOUT_HERO_MAX_HEIGHT = 1440;
var ABOUT_HERO_CONTENT_BOTTOM_OFFSET = 80;
var ABOUT_HERO_MOTION_DISTANCE = 24;
var ABOUT_HERO_LOGO_STRIP_MT = 2;
var ABOUT_HERO_CTA_SHADOW_ALPHA = 0.24;

// src/components/section/about-hero/about-hero-section.styles.ts
var import_styles2 = require("@mui/material/styles");
var DEFAULT_OVERLAY = { startAlpha: 0.9, endAlpha: 0.35 };
var aboutHeroSectionRootSx = (backgroundImageUrl, overlay = DEFAULT_OVERLAY) => {
  return (theme) => {
    const grey900 = theme.palette.grey[900];
    const gradient = `linear-gradient(0deg, ${(0, import_styles2.alpha)(grey900, overlay.startAlpha)}, ${(0, import_styles2.alpha)(grey900, overlay.endAlpha)})`;
    return {
      position: "relative",
      overflow: "hidden",
      py: { xs: 10, md: 0 },
      height: { md: ABOUT_HERO_HEIGHT },
      maxHeight: { md: ABOUT_HERO_MAX_HEIGHT },
      backgroundImage: `${gradient}, url(${backgroundImageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: {
        xs: "center, center",
        md: "center, center top",
        xl: "center, center 10%"
      }
    };
  };
};
var aboutHeroContainerSx = {
  position: "relative",
  height: { md: 1 }
};
var aboutHeroContentSx = {
  color: "common.white",
  textAlign: { xs: "center", md: "left" },
  width: { xs: "100%", md: "50%", lg: "45%", xl: "35%" },
  mx: { xs: "auto", md: 0 },
  display: "flex",
  flexDirection: "column",
  gap: 3,
  position: { md: "absolute" },
  bottom: { md: ABOUT_HERO_CONTENT_BOTTOM_OFFSET },
  left: { md: 0 }
};
var aboutHeroLogoStripSx = {
  justifyContent: { xs: "center", md: "flex-start" },
  mt: ABOUT_HERO_LOGO_STRIP_MT
};
var aboutHeroCtaSx = (theme) => {
  const shadow = `0 8px 16px 0 ${(0, import_styles2.alpha)(theme.palette.primary.main, ABOUT_HERO_CTA_SHADOW_ALPHA)}`;
  return {
    boxShadow: shadow,
    "&:hover": { boxShadow: shadow }
  };
};
var aboutHeroCtaIconSx = { mr: 1 };

// src/components/section/about-hero/about-hero-section.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var fadeUp = fade("inUp", { distance: ABOUT_HERO_MOTION_DISTANCE });
var fadeRight = fade("inRight", { distance: ABOUT_HERO_MOTION_DISTANCE });
var AboutHeroSection = import_react22.default.forwardRef(
  function AboutHeroSection2({
    title,
    intro,
    statement,
    experience,
    logos,
    cta,
    backgroundImageUrl,
    backgroundOverlay,
    sx,
    ...other
  }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      PageSection,
      {
        ref,
        decoration: false,
        containerComponent: MotionContainer,
        containerPy: 0,
        containerSx: aboutHeroContainerSx,
        sx: [
          aboutHeroSectionRootSx(backgroundImageUrl, backgroundOverlay),
          ...Array.isArray(sx) ? sx : [sx]
        ],
        ...other,
        children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_Box22.default, { sx: aboutHeroContentSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_framer_motion19.motion.div, { variants: fadeRight, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(SectionTitle, { title, titleComponent: "h1" }) }),
          intro && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_framer_motion19.motion.div, { variants: fadeUp, children: intro }),
          statement && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_framer_motion19.motion.div, { variants: fadeUp, children: statement }),
          (experience || logos && logos.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_framer_motion19.motion.div, { variants: fadeUp, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_Stack2.default, { spacing: 2.5, children: [
            experience,
            logos && logos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ClientLogoStrip, { logos, listSx: aboutHeroLogoStripSx })
          ] }) }),
          cta && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_framer_motion19.motion.div, { variants: fadeUp, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
            import_Button2.default,
            {
              ...cta.href ? { href: cta.href, target: cta.target, rel: cta.rel } : {},
              variant: cta.variant ?? "contained",
              color: "primary",
              size: "medium",
              onClick: cta.onClick,
              sx: aboutHeroCtaSx,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(GiselleIcon, { icon: "solar:letter-outline", sx: aboutHeroCtaIconSx }),
                cta.label
              ]
            }
          ) })
        ] })
      }
    );
  }
);
AboutHeroSection.displayName = "AboutHeroSection";

// src/components/section/hero/scroll-parallax/scroll-parallax-hero.tsx
var import_react24 = require("react");
var import_framer_motion22 = require("framer-motion");
var import_Box23 = __toESM(require("@mui/material/Box"), 1);
var import_Container2 = __toESM(require("@mui/material/Container"), 1);
var import_Stack3 = __toESM(require("@mui/material/Stack"), 1);
var import_useMediaQuery2 = __toESM(require("@mui/material/useMediaQuery"), 1);

// src/components/section/hero/scroll-parallax/scroll-parallax-hero.styles.ts
var heroRootSx = (theme) => ({
  overflow: "hidden",
  position: "relative",
  [theme.breakpoints.up("md")]: {
    minHeight: 760,
    height: "100vh",
    maxHeight: 1440,
    display: "block",
    willChange: "opacity"
  }
});
var heroInnerWrapSx = (theme) => ({
  width: 1,
  display: "flex",
  position: "relative",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    height: 1,
    position: "fixed",
    maxHeight: "inherit",
    minHeight: "300px"
  }
});
var heroContainerSx = (theme) => ({
  gap: 2,
  zIndex: 9,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  pb: 0,
  minHeight: { xs: "300px" },
  [theme.breakpoints.up("md")]: {
    flex: "1 1 auto",
    justifyContent: "center"
  }
});
var heroLogoBoxSx = {
  position: "relative",
  display: "inline-flex"
};
var heroStackSx = {
  textAlign: "center"
};
var parallaxYStyle = (y) => ({ y });
var parallaxOpacityStyle = (opacity) => ({ opacity });

// src/components/section/hero/scroll-parallax/scroll-parallax-hero.const.ts
var DEFAULT_PARALLAX_MULTIPLIERS = {
  logo: -7,
  heading: -6,
  text: -5,
  actions: -4,
  icons: -4
};

// src/components/section/hero/scroll-parallax/use-scroll-percent.ts
var import_react23 = require("react");
var import_framer_motion20 = require("framer-motion");
function useScrollPercent() {
  const elementRef = (0, import_react23.useRef)(null);
  const { scrollY } = (0, import_framer_motion20.useScroll)();
  const [percent, setPercent] = (0, import_react23.useState)(0);
  (0, import_framer_motion20.useMotionValueEvent)(scrollY, "change", (scrollHeight) => {
    if (!elementRef.current || elementRef.current.offsetHeight === 0) return;
    const heroHeight = elementRef.current.offsetHeight;
    const scrollPercent = Math.floor(scrollHeight / heroHeight * 100);
    setPercent(Math.min(scrollPercent, 100));
  });
  return { elementRef, percent, scrollY };
}

// src/components/section/hero/scroll-parallax/use-transform-y.ts
var import_framer_motion21 = require("framer-motion");
function useTransformY(value, elementRef, distance) {
  return (0, import_framer_motion21.useSpring)(
    (0, import_framer_motion21.useTransform)(value, (scrollY) => {
      const heroHeight = elementRef.current?.offsetHeight;
      if (!heroHeight) return 0;
      return scrollY / heroHeight * 100 * distance;
    }),
    {
      mass: 0.1,
      damping: 20,
      stiffness: 300,
      restDelta: 1e-3
    }
  );
}

// src/components/section/hero/scroll-parallax/scroll-parallax-hero.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
function ScrollParallaxHero({
  logo,
  heading,
  text,
  actions,
  icons,
  background,
  parallax,
  sx,
  ...other
}) {
  const scrollProgress = useScrollPercent();
  const mdUp = (0, import_useMediaQuery2.default)((theme) => theme.breakpoints.up("md"));
  const [mounted, setMounted] = (0, import_react24.useState)(false);
  (0, import_react24.useEffect)(() => {
    setMounted(true);
  }, []);
  const pm = { ...DEFAULT_PARALLAX_MULTIPLIERS, ...parallax };
  const multiplier = mounted && mdUp ? 1 : 0;
  const y1 = useTransformY(scrollProgress.scrollY, scrollProgress.elementRef, multiplier * pm.logo);
  const y2 = useTransformY(
    // eslint-disable-next-line react-hooks/refs
    scrollProgress.scrollY,
    // eslint-disable-next-line react-hooks/refs
    scrollProgress.elementRef,
    multiplier * pm.heading
  );
  const y3 = useTransformY(scrollProgress.scrollY, scrollProgress.elementRef, multiplier * pm.text);
  const y4 = useTransformY(
    // eslint-disable-next-line react-hooks/refs
    scrollProgress.scrollY,
    // eslint-disable-next-line react-hooks/refs
    scrollProgress.elementRef,
    multiplier * pm.actions
  );
  const y5 = useTransformY(
    // eslint-disable-next-line react-hooks/refs
    scrollProgress.scrollY,
    // eslint-disable-next-line react-hooks/refs
    scrollProgress.elementRef,
    multiplier * pm.icons
  );
  const opacity = (0, import_framer_motion22.useTransform)(scrollProgress.scrollY, (scrollY) => {
    if (!mdUp) return 1;
    const heroHeight = scrollProgress.elementRef.current?.offsetHeight;
    if (!heroHeight) return 1;
    return Math.max(0, 1 - scrollY / heroHeight);
  });
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    import_Box23.default,
    {
      ref: scrollProgress.elementRef,
      component: "section",
      sx: [heroRootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_Box23.default, { component: import_framer_motion22.motion.div, style: parallaxOpacityStyle(opacity), sx: heroInnerWrapSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_Container2.default, { component: import_framer_motion22.motion.div, initial: "initial", animate: "animate", sx: heroContainerSx, children: [
          logo && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_framer_motion22.motion.div, { style: parallaxYStyle(y1), children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_Box23.default, { sx: heroLogoBoxSx, children: logo }) }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_Stack3.default, { spacing: 1, sx: heroStackSx, children: [
            heading && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_framer_motion22.motion.div, { style: parallaxYStyle(y2), children: heading }),
            text && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_framer_motion22.motion.div, { style: parallaxYStyle(y3), children: text })
          ] }),
          actions && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_framer_motion22.motion.div, { style: parallaxYStyle(y4), children: actions }),
          icons && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_framer_motion22.motion.div, { style: parallaxYStyle(y5), children: icons })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react24.Fragment, { children: background }, "scroll-parallax-hero-background")
      ] })
    }
  );
}

// src/components/section/hero/scroll-parallax/animated-hero-heading/animated-hero-heading.tsx
var import_react25 = __toESM(require("react"), 1);
var import_framer_motion23 = require("framer-motion");
var import_Box24 = __toESM(require("@mui/material/Box"), 1);

// src/components/section/hero/scroll-parallax/animated-hero-heading/animated-hero-heading.animations.ts
var headingMotionProps = {
  variants: fade("inUp", { distance: 24 })
};
var gradientHighlightAnimate = { backgroundPosition: "200% center" };
var gradientHighlightTransition = {
  duration: 20,
  ease: "linear",
  repeat: Infinity,
  repeatType: "reverse"
};

// src/components/section/hero/scroll-parallax/animated-hero-heading/animated-hero-heading.styles.ts
var headingH1Sx = (theme) => ({
  my: 0,
  mx: "auto",
  maxWidth: 680,
  display: "flex",
  flexWrap: "wrap",
  typography: "h2",
  justifyContent: "center",
  [theme.breakpoints.up("lg")]: {
    fontSize: theme.typography.pxToRem(72),
    lineHeight: "90px"
  }
});
var headingHighlightSx = (theme) => ({
  backgroundImage: `linear-gradient(300deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 25%, ${theme.vars.palette.primary.main} 50%, ${theme.vars.palette.warning.main} 75%, ${theme.vars.palette.primary.main} 100%)`,
  backgroundSize: "400%",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  ml: { xs: 0.75, md: 1, xl: 1.5 }
});

// src/components/section/hero/scroll-parallax/animated-hero-heading/animated-hero-heading.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
var AnimatedHeroHeading = import_react25.default.forwardRef(
  function AnimatedHeroHeading2({ subheading, highlight, motionProps, sx, ...other }, ref) {
    const resolvedMotionProps = motionProps ?? headingMotionProps;
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_framer_motion23.motion.div, { ...resolvedMotionProps, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
      import_Box24.default,
      {
        ref,
        component: "h1",
        sx: [headingH1Sx, ...Array.isArray(sx) ? sx : [sx]],
        ...other,
        children: [
          subheading,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
            import_Box24.default,
            {
              component: import_framer_motion23.motion.span,
              animate: gradientHighlightAnimate,
              transition: gradientHighlightTransition,
              sx: headingHighlightSx,
              children: highlight
            }
          )
        ]
      }
    ) });
  }
);
AnimatedHeroHeading.displayName = "AnimatedHeroHeading";

// src/components/section/services-shell/services-shell.tsx
var import_react26 = __toESM(require("react"), 1);
var import_Box25 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime28 = require("react/jsx-runtime");
var ServicesShell = import_react26.default.forwardRef(
  function ServicesShell2({ children, sx, ...other }, ref) {
    const sxArray = Array.isArray(sx) ? sx : [sx];
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_Box25.default, { ref, component: "section", sx: sxArray, ...other, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(MotionViewport, { children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(SectionContainer, { children }) }) });
  }
);
ServicesShell.displayName = "ServicesShell";

// src/components/section/faq/accordion/faq-accordion.tsx
var import_react29 = require("react");
var import_framer_motion26 = require("framer-motion");
var import_Box27 = __toESM(require("@mui/material/Box"), 1);
var import_Stack5 = __toESM(require("@mui/material/Stack"), 1);
var import_Button3 = __toESM(require("@mui/material/Button"), 1);
var import_Typography5 = __toESM(require("@mui/material/Typography"), 1);
var import_Accordion2 = __toESM(require("@mui/material/Accordion"), 1);
var import_AccordionDetails = __toESM(require("@mui/material/AccordionDetails"), 1);
var import_AccordionSummary = __toESM(require("@mui/material/AccordionSummary"), 1);

// src/components/section/faq/accordion/faq-accordion.styles.ts
var import_Accordion = require("@mui/material/Accordion");

// src/components/section/faq/accordion/faq-accordion.const.ts
var FAQ_CONTENT_MAX_WIDTH = 720;

// src/components/section/faq/accordion/faq-accordion.styles.ts
var contentBoxSx = {
  mt: 8,
  gap: 1,
  mx: "auto",
  maxWidth: FAQ_CONTENT_MAX_WIDTH,
  display: "flex",
  mb: { xs: 5, md: 8 },
  flexDirection: "column"
};
var accordionItemSx = (theme) => ({
  transition: theme.transitions.create(["background-color"], {
    duration: theme.transitions.duration.shorter
  }),
  py: 1,
  px: 2.5,
  border: "none",
  borderRadius: 2,
  "&:hover": {
    bgcolor: channelAlpha("var(--mui-palette-grey-500Channel)", 0.08)
  },
  [`&.${import_Accordion.accordionClasses.expanded}`]: {
    bgcolor: channelAlpha("var(--mui-palette-grey-500Channel)", 0.08)
  }
});
var contactSectionSx = {
  px: 3,
  py: 8,
  textAlign: "center",
  background: `linear-gradient(to left, ${channelAlpha("var(--mui-palette-grey-500Channel)", 0.08)}, transparent)`
};
var motionViewportSx = {
  pt: 10,
  position: "relative"
};
var sectionTitleSx = {
  textAlign: "center"
};
var footerWrapperSx = {
  position: "relative"
};
var contactDescriptionSx = {
  mt: 2,
  mb: 3,
  color: "text.secondary"
};

// src/components/section/faq/accordion/motion-viewport/faq-motion-viewport.tsx
var import_react27 = __toESM(require("react"), 1);
var import_framer_motion24 = require("framer-motion");
var import_Box26 = __toESM(require("@mui/material/Box"), 1);
var import_useMediaQuery3 = __toESM(require("@mui/material/useMediaQuery"), 1);
var import_jsx_runtime29 = require("react/jsx-runtime");
var MotionBox = (0, import_framer_motion24.motion)(import_Box26.default);
var FaqMotionViewport = import_react27.default.forwardRef(
  function FaqMotionViewport2({ children, sx }, ref) {
    const smDown = (0, import_useMediaQuery3.default)((theme) => theme.breakpoints.down("sm"));
    if (smDown) {
      return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_Box26.default, { ref, sx, children });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      MotionBox,
      {
        ref,
        initial: "initial",
        whileInView: "animate",
        variants: container(),
        viewport: { once: true, amount: 0.3 },
        sx,
        children
      }
    );
  }
);
FaqMotionViewport.displayName = "FaqMotionViewport";

// src/components/section/faq/accordion/top-lines/faq-top-lines.tsx
var import_Stack4 = __toESM(require("@mui/material/Stack"), 1);

// src/components/section/faq/accordion/accordion-svg/faq-accordion-svg.tsx
var import_react28 = __toESM(require("react"), 1);
var import_framer_motion25 = require("framer-motion");
var import_styles3 = require("@mui/material/styles");

// src/components/section/faq/accordion/accordion-svg/faq-accordion-svg.styles.ts
var floatDecorationBase = (theme) => ({
  zIndex: 2,
  display: "none",
  color: "grey.500",
  position: "absolute",
  "& line": { strokeDasharray: 3, stroke: "currentColor" },
  "& path": { fill: "currentColor", stroke: "currentColor" },
  [theme.breakpoints.up(1440)]: { display: "block" }
});

// src/components/section/faq/accordion/accordion-svg/faq-accordion-svg.utils.ts
var svgLineTransition = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96]
};

// src/components/section/faq/accordion/accordion-svg/faq-accordion-svg.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var MotionSvg2 = (0, import_styles3.styled)(import_framer_motion25.motion.svg, {
  shouldForwardProp: (prop) => prop !== "vertical"
})``;
var FaqFloatLine = import_react28.default.forwardRef(
  function FaqFloatLine2({ sx, vertical, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      MotionSvg2,
      {
        ref,
        sx: [
          (theme) => ({
            ...floatDecorationBase(theme),
            width: 1,
            zIndex: 1,
            height: "1px",
            opacity: 0.24
          }),
          vertical && { width: "1px", height: 1 },
          ...Array.isArray(sx) ? sx : [sx]
        ],
        ...other,
        children: vertical ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          import_framer_motion25.motion.line,
          {
            x1: "0.5",
            x2: "0.5",
            y1: "0",
            y2: "100%",
            variants: {
              initial: { y2: "0%" },
              animate: { y2: "100%", transition: svgLineTransition }
            }
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          import_framer_motion25.motion.line,
          {
            x1: "0",
            x2: "100%",
            y1: "0.5",
            y2: "0.5",
            variants: {
              initial: { x2: "0%" },
              animate: { x2: "100%", transition: svgLineTransition }
            }
          }
        )
      }
    );
  }
);
FaqFloatLine.displayName = "FaqFloatLine";
var FaqFloatPlusIcon = import_react28.default.forwardRef(function FaqFloatPlusIcon2({ sx, ...other }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    MotionSvg2,
    {
      ref,
      variants: {
        initial: { scale: 0 },
        animate: { scale: 1, transition: svgLineTransition }
      },
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      sx: [
        (theme) => ({
          ...floatDecorationBase(theme),
          width: 16,
          height: 16
        }),
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("path", { d: "M8 0V16M16 8.08889H0" })
    }
  );
});
FaqFloatPlusIcon.displayName = "FaqFloatPlusIcon";
var FaqFloatTriangleDownIcon = import_react28.default.forwardRef(
  function FaqFloatTriangleDownIcon2({ sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      MotionSvg2,
      {
        ref,
        variants: {
          initial: { scaleX: 0 },
          animate: { scaleX: 1, transition: svgLineTransition }
        },
        width: "20",
        height: "10",
        viewBox: "0 0 20 10",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        sx: [
          (theme) => ({
            ...floatDecorationBase(theme),
            width: 20,
            height: 10
          }),
          ...Array.isArray(sx) ? sx : [sx]
        ],
        ...other,
        children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("path", { d: "M10 10L0 0H20L10 10Z" })
      }
    );
  }
);
FaqFloatTriangleDownIcon.displayName = "FaqFloatTriangleDownIcon";

// src/components/section/faq/accordion/top-lines/faq-top-lines.const.ts
var FAQ_FLOAT_LINE_LEFT = 80;

// src/components/section/faq/accordion/top-lines/faq-top-lines.styles.ts
var topTriangleStackSx = {
  alignItems: "center",
  top: 64,
  left: FAQ_FLOAT_LINE_LEFT,
  position: "absolute",
  transform: "translateX(-50%)"
};
var smallTriangleSx = {
  width: 30,
  height: 15,
  opacity: 0.24,
  position: "static"
};
var primaryTriangleSx = {
  position: "static",
  opacity: 0.12
};
var verticalFloatLineSx = {
  top: 0,
  left: FAQ_FLOAT_LINE_LEFT
};

// src/components/section/faq/accordion/top-lines/faq-top-lines.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
function FaqTopLines() {
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_jsx_runtime31.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(import_Stack4.default, { spacing: 8, sx: topTriangleStackSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(FaqFloatTriangleDownIcon, { sx: primaryTriangleSx }),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(FaqFloatTriangleDownIcon, { sx: smallTriangleSx })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(FaqFloatLine, { vertical: true, sx: verticalFloatLineSx })
  ] });
}
FaqTopLines.displayName = "FaqTopLines";

// src/components/section/faq/accordion/bottom-lines/faq-bottom-lines.const.ts
var FAQ_PLUS_ICON_LEFT = 72;

// src/components/section/faq/accordion/bottom-lines/faq-bottom-lines.styles.ts
var floatLineEdgeSx = (edge) => ({
  ...edge === "top" ? { top: 0 } : { bottom: 0 },
  left: 0
});
var floatPlusIconEdgeSx = (edge) => ({
  ...edge === "top" ? { top: -8 } : { bottom: -8 },
  left: FAQ_PLUS_ICON_LEFT
});

// src/components/section/faq/accordion/bottom-lines/faq-bottom-lines.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
function FaqBottomLines() {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(import_jsx_runtime32.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(FaqFloatLine, { sx: floatLineEdgeSx("top") }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(FaqFloatLine, { sx: floatLineEdgeSx("bottom") }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(FaqFloatPlusIcon, { sx: floatPlusIconEdgeSx("top") }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(FaqFloatPlusIcon, { sx: floatPlusIconEdgeSx("bottom") })
  ] });
}
FaqBottomLines.displayName = "FaqBottomLines";

// src/components/section/faq/accordion/faq-accordion.tsx
var import_jsx_runtime33 = require("react/jsx-runtime");
var MotionAccordion = (0, import_framer_motion26.motion)(import_Accordion2.default);
function FaqSection({
  caption = "FAQs",
  title = "Frequently Asked",
  txtGradient = "Questions",
  faqs,
  contactTitle = "Still have questions?",
  contactDescription = "Reach out directly \u2014 we respond within one business day.",
  contactHref,
  contactLabel = "Contact us",
  contactIcon,
  sx,
  ...other
}) {
  const [expanded, setExpanded] = (0, import_react29.useState)(faqs[0]?.question ?? false);
  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const resolvedIcon = typeof contactIcon === "string" ? /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(GiselleIcon, { icon: contactIcon }) : contactIcon;
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(FaqMotionViewport, { sx: motionViewportSx, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
    PageSection,
    {
      decoration: false,
      containerPy: 0,
      unconstrainedChildren: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_jsx_runtime33.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(FaqTopLines, {}),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_Stack5.default, { sx: footerWrapperSx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(FaqBottomLines, {}),
          contactHref && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(import_Box27.default, { sx: contactSectionSx, children: [
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_framer_motion26.motion.div, { variants: fade("in"), children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_Typography5.default, { variant: "h4", children: contactTitle }) }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_framer_motion26.motion.div, { variants: fade("in"), children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_Typography5.default, { sx: contactDescriptionSx, children: contactDescription }) }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_framer_motion26.motion.div, { variants: fade("in"), children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
              import_Button3.default,
              {
                color: "inherit",
                variant: "contained",
                href: contactHref,
                startIcon: resolvedIcon,
                children: contactLabel
              }
            ) })
          ] })
        ] })
      ] }),
      sx: [...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
          SectionTitle,
          {
            caption,
            title,
            txtGradient,
            sx: sectionTitleSx
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_Box27.default, { sx: contentBoxSx, children: faqs.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
          MotionAccordion,
          {
            disableGutters: true,
            variants: fade("inUp", { distance: 24 }),
            expanded: expanded === item.question,
            onChange: handleChange(item.question),
            sx: accordionItemSx,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
                import_AccordionSummary.default,
                {
                  id: `faq-panel${index}-header`,
                  "aria-controls": `faq-panel${index}-content`,
                  children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_Typography5.default, { component: "span", variant: "h6", children: item.question })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_AccordionDetails.default, { children: item.answer })
            ]
          },
          item.question
        )) })
      ]
    }
  ) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AboutHeroSection,
  AnimatedHeroHeading,
  FaqAccordion,
  FaqSection,
  FloatingIconCloud,
  FloatingSideNav,
  FloatingSubNav,
  HeroBackground,
  HeroButtonsRow,
  InteractiveHeroLogo,
  MotionContainer,
  MotionViewport,
  ScrollParallaxHero,
  ScrollProgress,
  SectionTitleAnimated,
  ServicesShell,
  bounce,
  container,
  fade,
  flip,
  hover,
  rotate,
  scale,
  slide,
  tap,
  transitionEnter,
  transitionExit,
  transitionHover,
  transitionTap,
  useScrollParallax,
  useScrollPercent,
  useScrollProgress,
  useTransformY,
  zoom
});
//# sourceMappingURL=motion.cjs.map
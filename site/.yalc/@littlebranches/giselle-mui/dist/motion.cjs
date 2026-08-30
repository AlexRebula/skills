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
  AnimatedHeroHeading: () => AnimatedHeroHeading,
  FaqAccordion: () => FaqSection,
  FaqSection: () => FaqSection,
  FloatingSubNav: () => FloatingSubNav,
  HeroButtonsRow: () => HeroButtonsRow,
  InteractiveHeroLogo: () => InteractiveHeroLogo,
  MotionContainer: () => MotionContainer,
  MotionViewport: () => MotionViewport,
  ScrollParallaxHero: () => ScrollParallaxHero,
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

// src/components/motion/use-scroll-parallax/use-scroll-parallax.ts
var import_react = require("react");
var import_framer_motion3 = require("framer-motion");

// src/components/motion/use-scroll-parallax/use-scroll-parallax.const.ts
var LAYER_MULTIPLIERS = [40, 80, 120, 160, 200];
var USE_SCROLL_PARALLAX_SPRING_MASS = 0.1;
var USE_SCROLL_PARALLAX_SPRING_DAMPING = 20;
var USE_SCROLL_PARALLAX_SPRING_STIFFNESS = 300;

// src/components/motion/use-scroll-parallax/use-scroll-parallax.ts
function useScrollParallax() {
  const ref = (0, import_react.useRef)(null);
  const { scrollYProgress } = (0, import_framer_motion3.useScroll)({
    target: ref,
    offset: ["start end", "end start"]
  });
  const springConfig = {
    mass: USE_SCROLL_PARALLAX_SPRING_MASS,
    damping: USE_SCROLL_PARALLAX_SPRING_DAMPING,
    stiffness: USE_SCROLL_PARALLAX_SPRING_STIFFNESS
  };
  const t0 = (0, import_framer_motion3.useTransform)(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[0], LAYER_MULTIPLIERS[0]]);
  const t1 = (0, import_framer_motion3.useTransform)(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[1], LAYER_MULTIPLIERS[1]]);
  const t2 = (0, import_framer_motion3.useTransform)(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[2], LAYER_MULTIPLIERS[2]]);
  const t3 = (0, import_framer_motion3.useTransform)(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[3], LAYER_MULTIPLIERS[3]]);
  const t4 = (0, import_framer_motion3.useTransform)(scrollYProgress, [0, 1], [-LAYER_MULTIPLIERS[4], LAYER_MULTIPLIERS[4]]);
  const l0 = (0, import_framer_motion3.useSpring)(t0, springConfig);
  const l1 = (0, import_framer_motion3.useSpring)(t1, springConfig);
  const l2 = (0, import_framer_motion3.useSpring)(t2, springConfig);
  const l3 = (0, import_framer_motion3.useSpring)(t3, springConfig);
  const l4 = (0, import_framer_motion3.useSpring)(t4, springConfig);
  return { ref, layers: [l0, l1, l2, l3, l4] };
}

// src/components/section/hero/interactive-logo/interactive-logo.tsx
var import_react3 = require("react");
var import_framer_motion7 = require("framer-motion");
var import_Box6 = __toESM(require("@mui/material/Box"), 1);

// src/utils/hooks/use-image-preloader/use-image-preloader.ts
function preloadImages(srcs) {
  srcs.forEach((src) => {
    if (src) {
      const img = new Image();
      img.src = src;
    }
  });
}

// src/components/section/hero/interactive-logo/portrait-layer.tsx
var import_framer_motion4 = require("framer-motion");
var import_Box3 = __toESM(require("@mui/material/Box"), 1);

// src/components/section/hero/interactive-logo/interactive-logo.styles.ts
var originalLayerSx = {
  position: "relative",
  zIndex: 1,
  width: 1,
  height: 1,
  willChange: "transform"
};
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

// src/components/section/hero/interactive-logo/portrait-layer.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function PortraitLayer({
  portraitSrc,
  portraitAlt,
  showPortrait,
  portraitFadeTransition
}) {
  if (!portraitSrc) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_Box3.default, { sx: portraitWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_Box3.default,
    {
      component: import_framer_motion4.motion.img,
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

// src/components/section/hero/interactive-logo/original-logo-layer.tsx
var import_framer_motion5 = require("framer-motion");
var import_Box4 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime4 = require("react/jsx-runtime");
function OriginalLogoLayer({
  hoverPhase,
  logoFadeTransition,
  activeFrame,
  logoAlt,
  hasArtisticContent = false,
  children
}) {
  const isArtistic = hoverPhase === "artistic";
  const animateOpacity = isArtistic || !hasArtisticContent ? 1 : 0;
  const animateScale = isArtistic || !hasArtisticContent ? 1 : 0.985;
  const animateFilter = isArtistic || !hasArtisticContent ? "blur(0px)" : "blur(4px)";
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_Box4.default,
    {
      component: import_framer_motion5.motion.div,
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
      children: activeFrame ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_Box4.default,
        {
          component: "img",
          alt: logoAlt ?? "Logo",
          src: activeFrame,
          sx: { width: 1, height: 1 }
        }
      ) : children
    }
  );
}

// src/components/section/hero/interactive-logo/artistic-logo-layer.tsx
var import_framer_motion6 = require("framer-motion");
var import_Box5 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime5 = require("react/jsx-runtime");
function ArtisticLogoLayer({
  artisticLogoSrc,
  showArtisticLogo,
  logoFadeTransition,
  logoAlt
}) {
  if (!artisticLogoSrc) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    import_Box5.default,
    {
      component: import_framer_motion6.motion.img,
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

// src/components/section/hero/interactive-logo/use-hover-phase-transition.ts
var import_react2 = require("react");

// src/components/section/hero/interactive-logo/interactive-logo.const.ts
var DEFAULT_PORTRAIT_DIRECTION = "forward";
var PORTRAIT_ACTIVATION_DELAY_MS = 500;

// src/components/section/hero/interactive-logo/use-hover-phase-transition.ts
function useHoverPhaseTransition({
  isHovered,
  hasPortrait,
  reducedMotion
}) {
  const [hoverPhase, setHoverPhase] = (0, import_react2.useState)("idle");
  const [hasActivatedPortrait, setHasActivatedPortrait] = (0, import_react2.useState)(false);
  const [activePortraitDirection, setActivePortraitDirection] = (0, import_react2.useState)(DEFAULT_PORTRAIT_DIRECTION);
  const portraitTimeoutRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
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
var import_jsx_runtime6 = require("react/jsx-runtime");
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
  const reducedMotion = (0, import_framer_motion7.useReducedMotion)();
  const rootRef = (0, import_react3.useRef)(null);
  const scrub = (0, import_framer_motion7.useMotionValue)(0);
  const scrubSpring = (0, import_framer_motion7.useSpring)(scrub, { stiffness: 240, damping: 28, mass: 0.25 });
  const tiltX = (0, import_framer_motion7.useMotionValue)(0);
  const tiltY = (0, import_framer_motion7.useMotionValue)(0);
  const panX = (0, import_framer_motion7.useMotionValue)(0);
  const panY = (0, import_framer_motion7.useMotionValue)(0);
  const rotateX = (0, import_framer_motion7.useSpring)(tiltX, { stiffness: 220, damping: 13, mass: 0.24 });
  const rotateY = (0, import_framer_motion7.useSpring)(tiltY, { stiffness: 220, damping: 13, mass: 0.24 });
  const x = (0, import_framer_motion7.useSpring)(panX, { stiffness: 230, damping: 13, mass: 0.2 });
  const y = (0, import_framer_motion7.useSpring)(panY, { stiffness: 230, damping: 13, mass: 0.2 });
  const validFrames = (0, import_react3.useMemo)(() => (frameSources ?? []).filter(Boolean), [frameSources]);
  const portraitSourceMap = (0, import_react3.useMemo)(
    () => buildPortraitSourceMap(portraitSrc, portraitSources),
    [portraitSrc, portraitSources]
  );
  const hasPortrait = (0, import_react3.useMemo)(
    () => Object.values(portraitSourceMap).some(Boolean),
    [portraitSourceMap]
  );
  const allPortraitSrcs = (0, import_react3.useMemo)(
    () => Object.values(portraitSourceMap).flatMap(
      (src) => typeof src === "string" ? [src] : [...src ?? []]
    ),
    [portraitSourceMap]
  );
  (0, import_react3.useEffect)(() => {
    preloadImages(allPortraitSrcs);
  }, [allPortraitSrcs]);
  const [activePortraitSrcResolved, setActivePortraitSrcResolved] = (0, import_react3.useState)("");
  const frameCount = validFrames.length;
  const [frameIndex, setFrameIndex] = (0, import_react3.useState)(0);
  const [isPointerDown, setIsPointerDown] = (0, import_react3.useState)(false);
  const [isHovered, setIsHovered] = (0, import_react3.useState)(false);
  const { hoverPhase, hasActivatedPortrait, activePortraitDirection, setActivePortraitDirection } = useHoverPhaseTransition({ isHovered, hasPortrait, reducedMotion });
  (0, import_react3.useEffect)(() => {
    if (hoverPhase !== "portrait") {
      return;
    }
    tiltX.set(0);
    tiltY.set(0);
    panX.set(0);
    panY.set(0);
  }, [hoverPhase, panX, panY, tiltX, tiltY]);
  (0, import_react3.useEffect)(() => {
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
  const handlePointerDown = (0, import_react3.useCallback)(() => setIsPointerDown(true), []);
  const handlePointerUp = (0, import_react3.useCallback)(() => setIsPointerDown(false), []);
  const handlePointerEnter = (0, import_react3.useCallback)(() => setIsHovered(true), []);
  const handleInnerPointerLeave = (0, import_react3.useCallback)(() => setIsHovered(false), []);
  const handlePointerMove = (0, import_react3.useCallback)(
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
  const handlePointerLeave = (0, import_react3.useCallback)(() => {
    setIsHovered(false);
    setIsPointerDown(false);
    setActivePortraitDirection(DEFAULT_PORTRAIT_DIRECTION);
    scrub.set(0.5);
    tiltX.set(0);
    tiltY.set(0);
    panX.set(0);
    panY.set(0);
  }, [panX, panY, scrub, setActivePortraitDirection, tiltX, tiltY]);
  (0, import_react3.useEffect)(() => {
    const rawSrc = portraitSourceMap[activePortraitDirection] ?? portraitSourceMap[DEFAULT_PORTRAIT_DIRECTION];
    if (rawSrc) {
      setActivePortraitSrcResolved(getRandomPortraitSrc(rawSrc));
    }
  }, [activePortraitDirection, portraitSourceMap]);
  const activeFrame = validFrames[Math.min(frameIndex, Math.max(0, frameCount - 1))];
  const showArtisticLogo = artisticLogoSrc && hoverPhase === "idle";
  const showPortrait = activePortraitSrcResolved && hoverPhase === "portrait";
  const shadowX = (0, import_framer_motion7.useTransform)(panX, (value) => value * -0.3);
  const shadowY = (0, import_framer_motion7.useTransform)(panY, (value) => 10 + value * 0.45);
  const shadowBlur = isHovered ? 24 : 16;
  const shadowAlpha = isHovered ? 0.34 : 0.22;
  const logoStackFilter = import_framer_motion7.useMotionTemplate`brightness(0.9) drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgb(var(--mui-palette-grey-900Channel) / ${shadowAlpha}))`;
  const logoFadeTransition = reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
  const portraitFadeTransition = reducedMotion ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] };
  const cursorStyle = getCursorStyle(reducedMotion, isPointerDown);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    import_Box6.default,
    {
      ...other,
      ref: rootRef,
      component: import_framer_motion7.motion.div,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
      sx: [rootBoxSx(cursorStyle), ...Array.isArray(rootSx) ? rootSx : [rootSx]],
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        import_Box6.default,
        {
          onPointerEnter: handlePointerEnter,
          onPointerLeave: handleInnerPointerLeave,
          sx: [innerContainerSx, ...Array.isArray(sx) ? sx : [sx]],
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
              import_Box6.default,
              {
                component: import_framer_motion7.motion.div,
                style: reducedMotion ? void 0 : {
                  rotateX,
                  rotateY,
                  x,
                  y,
                  filter: logoStackFilter
                },
                sx: logoStack3dWrapperSx,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var import_framer_motion8 = require("framer-motion");
var import_Box7 = __toESM(require("@mui/material/Box"), 1);
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
var import_jsx_runtime7 = require("react/jsx-runtime");
function HeroButtonsRow({ items, motionProps, sx, ...other }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_Box7.default, { sx: [rowSx, ...Array.isArray(sx) ? sx : [sx]], ...other, children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_framer_motion8.motion.div, { ...motionProps, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    import_Button.default,
    {
      href: item.href,
      color: "inherit",
      size: "large",
      variant: item.variant ?? "contained",
      sx: buttonSx,
      children: item.label
    }
  ) }, item.label)) });
}

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.tsx
var import_react5 = require("react");
var import_framer_motion10 = require("framer-motion");
var import_Box9 = __toESM(require("@mui/material/Box"), 1);

// src/utils/theme/theme-utils/theme-utils.ts
function channelAlpha(channel, alpha) {
  return `rgba(${channel} / ${alpha})`;
}

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.const.ts
var SUB_NAV_BUTTON_SIZE = {
  xs: 36,
  sm: 38,
  md: 42,
  lg: 44
};
var PILL_BUTTON_ROW_SPACING = 0.5;

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.styles.ts
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
    bgcolor: channelAlpha(grey500Ch(theme), 0.08)
  },
  "&:active": {
    opacity: 0.56,
    bgcolor: channelAlpha(grey500Ch(theme), 0.12)
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

// src/components/material/navigation/floating-sub-nav/nav-pill.tsx
var import_framer_motion9 = require("framer-motion");
var import_Box8 = __toESM(require("@mui/material/Box"), 1);
var import_Stack = __toESM(require("@mui/material/Stack"), 1);

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.animations.ts
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

// src/components/material/navigation/floating-sub-nav/sub-nav-button.tsx
var import_react4 = require("react");
var import_Tooltip = __toESM(require("@mui/material/Tooltip"), 1);
var import_ButtonBase = __toESM(require("@mui/material/ButtonBase"), 1);
var import_jsx_runtime8 = require("react/jsx-runtime");
function SubNavButton({ item, isActive, onPress }) {
  const handleClick = (0, import_react4.useCallback)(() => onPress(item.id), [onPress, item.id]);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_Tooltip.default, { title: item.label, placement: "top", arrow: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    import_ButtonBase.default,
    {
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

// src/components/material/navigation/floating-sub-nav/nav-pill.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function NavPill({ items, activeId, onPress }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    import_framer_motion9.m.div,
    {
      variants: pillVariants,
      initial: "initial",
      animate: "animate",
      exit: "exit",
      transition: pillTransition,
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_Box8.default, { component: "nav", "aria-label": "Section navigation", sx: pillSx, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_Stack.default, { direction: "row", spacing: PILL_BUTTON_ROW_SPACING, children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
}

// src/components/material/navigation/floating-sub-nav/floating-sub-nav.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function FloatingSubNav({ items, activeId, onSelect, sticky = false }) {
  const handlePress = (0, import_react5.useCallback)((id) => onSelect(id), [onSelect]);
  if (sticky) {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_Box9.default, { sx: stickyWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_Box9.default, { sx: stickyInnerSx, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_framer_motion10.AnimatePresence, { children: activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(NavPill, { items, activeId, onPress: handlePress }) }) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_framer_motion10.AnimatePresence, { children: activeId !== null && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_Box9.default, { sx: fixedWrapperSx, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(NavPill, { items, activeId, onPress: handlePress }) }) });
}

// src/components/section/hero/scroll-parallax/scroll-parallax-hero.tsx
var import_react7 = require("react");
var import_framer_motion13 = require("framer-motion");
var import_Box10 = __toESM(require("@mui/material/Box"), 1);
var import_Container = __toESM(require("@mui/material/Container"), 1);
var import_Stack2 = __toESM(require("@mui/material/Stack"), 1);
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

// src/components/section/hero/scroll-parallax/scroll-parallax-hero.const.ts
var DEFAULT_PARALLAX_MULTIPLIERS = {
  logo: -7,
  heading: -6,
  text: -5,
  actions: -4,
  icons: -4
};

// src/components/section/hero/scroll-parallax/use-scroll-percent.ts
var import_react6 = require("react");
var import_framer_motion11 = require("framer-motion");
function useScrollPercent() {
  const elementRef = (0, import_react6.useRef)(null);
  const { scrollY } = (0, import_framer_motion11.useScroll)();
  const [percent, setPercent] = (0, import_react6.useState)(0);
  (0, import_framer_motion11.useMotionValueEvent)(scrollY, "change", (scrollHeight) => {
    if (!elementRef.current || elementRef.current.offsetHeight === 0) return;
    const heroHeight = elementRef.current.offsetHeight;
    const scrollPercent = Math.floor(scrollHeight / heroHeight * 100);
    setPercent(Math.min(scrollPercent, 100));
  });
  return { elementRef, percent, scrollY };
}

// src/components/section/hero/scroll-parallax/use-transform-y.ts
var import_framer_motion12 = require("framer-motion");
function useTransformY(value, elementRef, distance) {
  return (0, import_framer_motion12.useSpring)(
    (0, import_framer_motion12.useTransform)(value, (scrollY) => {
      const heroHeight = elementRef.current?.offsetHeight;
      if (!heroHeight) return 0;
      return scrollY / heroHeight * distance;
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
var import_jsx_runtime11 = require("react/jsx-runtime");
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
  const [mounted, setMounted] = (0, import_react7.useState)(false);
  (0, import_react7.useEffect)(() => {
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
  const opacity = (0, import_framer_motion13.useTransform)(scrollProgress.scrollY, (scrollY) => {
    if (!mdUp) return 1;
    const heroHeight = scrollProgress.elementRef.current?.offsetHeight;
    if (!heroHeight) return 1;
    return Math.max(0, 1 - scrollY / heroHeight);
  });
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    import_Box10.default,
    {
      ref: scrollProgress.elementRef,
      component: "section",
      sx: [heroRootSx, ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_framer_motion13.motion.div, { style: parallaxOpacityStyle(opacity), children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Box10.default, { sx: heroInnerWrapSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_framer_motion13.motion.div, { initial: "initial", animate: "animate", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Container.default, { sx: heroContainerSx, children: [
          logo && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_framer_motion13.motion.div, { style: parallaxYStyle(y1), children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_Box10.default, { sx: heroLogoBoxSx, children: logo }) }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_Stack2.default, { spacing: 1, sx: heroStackSx, children: [
            heading && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_framer_motion13.motion.div, { style: parallaxYStyle(y2), children: heading }),
            text && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_framer_motion13.motion.div, { style: parallaxYStyle(y3), children: text })
          ] }),
          actions && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_framer_motion13.motion.div, { style: parallaxYStyle(y4), children: actions }),
          icons && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_framer_motion13.motion.div, { style: parallaxYStyle(y5), children: icons })
        ] }) }),
        background
      ] }) })
    }
  );
}

// src/components/section/hero/scroll-parallax/animated-hero-heading.tsx
var import_framer_motion14 = require("framer-motion");
var import_Box11 = __toESM(require("@mui/material/Box"), 1);

// src/components/section/hero/scroll-parallax/scroll-parallax-hero.animations.ts
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

// src/components/section/hero/scroll-parallax/animated-hero-heading.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function AnimatedHeroHeading({
  subheading,
  highlight,
  motionProps,
  sx
}) {
  const resolvedMotionProps = motionProps ?? headingMotionProps;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_framer_motion14.motion.div, { ...resolvedMotionProps, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_Box11.default, { component: "h1", sx: [headingH1Sx, ...Array.isArray(sx) ? sx : [sx]], children: [
    subheading,
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      import_Box11.default,
      {
        component: import_framer_motion14.motion.span,
        animate: gradientHighlightAnimate,
        transition: gradientHighlightTransition,
        sx: headingHighlightSx,
        children: highlight
      }
    )
  ] }) });
}

// src/components/section/faq/accordion/faq-accordion.tsx
var import_react11 = require("react");
var import_framer_motion17 = require("framer-motion");
var import_Box16 = __toESM(require("@mui/material/Box"), 1);
var import_Stack4 = __toESM(require("@mui/material/Stack"), 1);
var import_Button2 = __toESM(require("@mui/material/Button"), 1);
var import_Container2 = __toESM(require("@mui/material/Container"), 1);
var import_Typography2 = __toESM(require("@mui/material/Typography"), 1);
var import_Accordion = __toESM(require("@mui/material/Accordion"), 1);
var import_AccordionDetails = __toESM(require("@mui/material/AccordionDetails"), 1);
var import_AccordionSummary = __toESM(require("@mui/material/AccordionSummary"), 1);

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
var import_react8 = require("@iconify/react");
var import_Box12 = __toESM(require("@mui/material/Box"), 1);

// src/components/material/data-display/icon/giselle/giselle-icon.styles.ts
var giselleIconRootSx = (width, height) => ({
  lineHeight: 0,
  display: "inline-flex",
  flexShrink: 0,
  width,
  height
});

// src/components/material/data-display/icon/giselle/giselle-icon.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    import_Box12.default,
    {
      component: "span",
      sx: [giselleIconRootSx(width, h), ...Array.isArray(sx) ? sx : [sx]],
      ...other,
      children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        import_react8.Icon,
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

// src/components/material/layout/section-title/section-title.tsx
var import_Box14 = __toESM(require("@mui/material/Box"), 1);
var import_Typography = __toESM(require("@mui/material/Typography"), 1);

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

// src/components/material/layout/section-title/section-caption.tsx
var import_Box13 = __toESM(require("@mui/material/Box"), 1);
var import_jsx_runtime14 = require("react/jsx-runtime");
function SectionCaption({ title, sx, ...other }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    import_Box13.default,
    {
      component: "span",
      sx: [
        {
          typography: "overline",
          color: "text.disabled"
        },
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: title
    }
  );
}

// src/components/material/layout/section-title/section-title.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function SectionTitle({
  sx,
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  ...other
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    import_Box14.default,
    {
      sx: [
        {
          gap: 3,
          display: "flex",
          flexDirection: "column"
        },
        ...Array.isArray(sx) ? sx : [sx]
      ],
      ...other,
      children: [
        caption && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SectionCaption, { title: caption, sx: slotProps?.caption?.sx }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(import_Typography.default, { component: "h2", variant: "h2", sx: slotProps?.title?.sx, children: [
          title,
          " ",
          txtGradient && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_Box14.default, { component: "span", sx: txtGradientSpanSx, children: txtGradient })
        ] }),
        description && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          import_Box14.default,
          {
            sx: [
              { color: "text.secondary", typography: "body1" },
              ...Array.isArray(slotProps?.description?.sx) ? slotProps.description.sx : [slotProps?.description?.sx]
            ],
            children: description
          }
        )
      ]
    }
  );
}

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
  "&.MuiAccordion-expanded": {
    bgcolor: channelAlpha("var(--mui-palette-grey-500Channel)", 0.08)
  }
});
var contactSectionSx = {
  px: 3,
  py: 8,
  textAlign: "center",
  background: `linear-gradient(to left, ${channelAlpha("var(--mui-palette-grey-500Channel)", 0.08)}, transparent)`
};

// src/components/section/faq/accordion/motion-viewport/faq-motion-viewport.tsx
var import_react9 = __toESM(require("react"), 1);
var import_framer_motion15 = require("framer-motion");
var import_Box15 = __toESM(require("@mui/material/Box"), 1);
var import_useMediaQuery3 = __toESM(require("@mui/material/useMediaQuery"), 1);
var import_jsx_runtime16 = require("react/jsx-runtime");
var MotionBox = (0, import_framer_motion15.motion)(import_Box15.default);
var FaqMotionViewport = import_react9.default.forwardRef(
  function FaqMotionViewport2({ children, sx }, ref) {
    const smDown = (0, import_useMediaQuery3.default)((theme) => theme.breakpoints.down("sm"));
    if (smDown) {
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_Box15.default, { ref, sx, children });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
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
var import_Stack3 = __toESM(require("@mui/material/Stack"), 1);

// src/components/section/faq/accordion/accordion-svg/faq-accordion-svg.tsx
var import_react10 = __toESM(require("react"), 1);
var import_framer_motion16 = require("framer-motion");
var import_styles = require("@mui/material/styles");

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
var import_jsx_runtime17 = require("react/jsx-runtime");
var MotionSvg = (0, import_styles.styled)(import_framer_motion16.motion.svg, {
  shouldForwardProp: (prop) => prop !== "vertical"
})``;
var FaqFloatLine = import_react10.default.forwardRef(
  function FaqFloatLine2({ sx, vertical, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      MotionSvg,
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
        children: vertical ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          import_framer_motion16.motion.line,
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
        ) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          import_framer_motion16.motion.line,
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
var FaqFloatPlusIcon = import_react10.default.forwardRef(function FaqFloatPlusIcon2({ sx, ...other }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    MotionSvg,
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
      children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M8 0V16M16 8.08889H0" })
    }
  );
});
FaqFloatPlusIcon.displayName = "FaqFloatPlusIcon";
var FaqFloatTriangleDownIcon = import_react10.default.forwardRef(
  function FaqFloatTriangleDownIcon2({ sx, ...other }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      MotionSvg,
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
        children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M10 10L0 0H20L10 10Z" })
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

// src/components/section/faq/accordion/top-lines/faq-top-lines.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function FaqTopLines() {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_jsx_runtime18.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(import_Stack3.default, { spacing: 8, sx: topTriangleStackSx, children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(FaqFloatTriangleDownIcon, { sx: { position: "static", opacity: 0.12 } }),
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(FaqFloatTriangleDownIcon, { sx: smallTriangleSx })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(FaqFloatLine, { vertical: true, sx: { top: 0, left: FAQ_FLOAT_LINE_LEFT } })
  ] });
}
FaqTopLines.displayName = "FaqTopLines";

// src/components/section/faq/accordion/bottom-lines/faq-bottom-lines.const.ts
var FAQ_PLUS_ICON_LEFT = 72;

// src/components/section/faq/accordion/bottom-lines/faq-bottom-lines.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function FaqBottomLines() {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_jsx_runtime19.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(FaqFloatLine, { sx: { top: 0, left: 0 } }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(FaqFloatLine, { sx: { bottom: 0, left: 0 } }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(FaqFloatPlusIcon, { sx: { top: -8, left: FAQ_PLUS_ICON_LEFT } }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(FaqFloatPlusIcon, { sx: { bottom: -8, left: FAQ_PLUS_ICON_LEFT } })
  ] });
}
FaqBottomLines.displayName = "FaqBottomLines";

// src/components/section/faq/accordion/faq-accordion.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var MotionAccordion = (0, import_framer_motion17.motion)(import_Accordion.default);
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
  const [expanded, setExpanded] = (0, import_react11.useState)(faqs[0]?.question ?? false);
  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const resolvedIcon = typeof contactIcon === "string" ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(GiselleIcon, { icon: contactIcon }) : contactIcon;
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box16.default, { component: "section", sx: [...Array.isArray(sx) ? sx : [sx]], ...other, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(FaqMotionViewport, { sx: { pt: 10, position: "relative" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(FaqTopLines, {}),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_Container2.default, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        SectionTitle,
        {
          caption,
          title,
          txtGradient,
          sx: { textAlign: "center" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Box16.default, { sx: contentBoxSx, children: faqs.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
        MotionAccordion,
        {
          disableGutters: true,
          variants: fade("inUp", { distance: 24 }),
          expanded: expanded === item.question,
          onChange: handleChange(item.question),
          sx: accordionItemSx,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              import_AccordionSummary.default,
              {
                id: `faq-panel${index}-header`,
                "aria-controls": `faq-panel${index}-content`,
                children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Typography2.default, { component: "span", variant: "h6", children: item.question })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_AccordionDetails.default, { children: item.answer })
          ]
        },
        item.question
      )) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_Stack4.default, { sx: { position: "relative" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(FaqBottomLines, {}),
      contactHref && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_Box16.default, { sx: contactSectionSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_framer_motion17.motion.div, { variants: fade("in"), children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Typography2.default, { variant: "h4", children: contactTitle }) }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_framer_motion17.motion.div, { variants: fade("in"), children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_Typography2.default, { sx: { mt: 2, mb: 3, color: "text.secondary" }, children: contactDescription }) }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_framer_motion17.motion.div, { variants: fade("in"), children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          import_Button2.default,
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
  ] }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnimatedHeroHeading,
  FaqAccordion,
  FaqSection,
  FloatingSubNav,
  HeroButtonsRow,
  InteractiveHeroLogo,
  MotionContainer,
  MotionViewport,
  ScrollParallaxHero,
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
  useTransformY,
  zoom
});
//# sourceMappingURL=motion.cjs.map
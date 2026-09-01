import React, { type ReactNode } from 'react';
import { LazyMotion } from 'framer-motion';
import type { MotionLazyProps } from './types';

const loadFeaturesAsync = async () => import('framer-motion').then((res) => res.domMax);

/**
 * Without a `LazyMotion` ancestor, `m.*` elements (giselle-mui's
 * `FeatureFlowSection` uses `m.button` for its row entrance/hover variants)
 * never get their animation features loaded and stay frozen at their
 * `initial` variant - `opacity: 0` for a fade-in, permanently invisible.
 * `strict` is safe here: nothing else in this site imports `framer-motion`
 * directly (verified by grep before adding this), so nothing else could hit
 * strict mode's "only `m.*`, never raw `motion.*`" rule.
 */
export function MotionLazy({ children }: MotionLazyProps): ReactNode {
  return (
    <LazyMotion strict features={loadFeaturesAsync}>
      {children}
    </LazyMotion>
  );
}

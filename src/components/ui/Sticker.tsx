"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";

/** Autocolante do manifesto. Motion só para hover/clique; respeita prefers-reduced-motion. */
export default function Sticker({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <m.div
          initial={{ rotate: -10 }}
          whileHover={{ rotate: 4, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
          className="flex h-32 w-32 select-none items-center justify-center rounded-full bg-cream p-4 text-center font-mono text-xs font-medium uppercase leading-snug tracking-wider text-brick sm:h-40 sm:w-40 sm:text-sm"
        >
          {children}
        </m.div>
      </LazyMotion>
    </MotionConfig>
  );
}

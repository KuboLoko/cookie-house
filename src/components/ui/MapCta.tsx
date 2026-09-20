"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";

/** CTA do mapa. Motion só para hover/tap (sem GSAP neste elemento); respeita prefers-reduced-motion. */
export default function MapCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <m.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-wider text-choc outline-offset-4 focus-visible:outline-2 focus-visible:outline-cream"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          {children}
          <m.svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{ rest: { x: 0, y: 0 }, hover: { x: 3, y: -3 } }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </m.svg>
        </m.a>
      </LazyMotion>
    </MotionConfig>
  );
}

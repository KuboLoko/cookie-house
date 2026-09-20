"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";

// Contorno de lacre: círculo com bordo ondulado, calculado uma vez.
function sealEdge(R = 92, steps = 360) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = R + 2.6 * Math.sin(28 * a) + 1.4 * Math.sin(7 * a + 1);
    const x = (100 + r * Math.cos(a)).toFixed(2);
    const y = (100 + r * Math.sin(a)).toFixed(2);
    d += `${i === 0 ? "M" : "L"}${x},${y}`;
  }
  return `${d}Z`;
}
const EDGE = sealEdge();

type Line = { text: string; y: number; size: number; weight?: number };

/**
 * Selo/carimbo em SVG, com link. Motion só em hover/clique (o GSAP anima o wrapper
 * `data-stamp` em Proof, nunca este elemento). Cor: tijolo. Números em DM Mono.
 */
export default function Seal({
  id,
  href,
  ariaLabel,
  ring,
  lines,
  rotate,
  seed,
}: {
  id: string;
  href: string;
  ariaLabel: string;
  ring: string;
  lines: Line[];
  rotate: number;
  seed: number;
}) {
  const mono = { fontFamily: "var(--font-dm-mono), ui-monospace, monospace" };

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <m.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          initial={{ rotate }}
          whileHover={{ scale: 1.05, rotate: rotate + 4 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 320, damping: 16 }}
          className="block w-48 rounded-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-brick sm:w-60"
        >
          <svg viewBox="0 0 200 200" aria-hidden className="block h-auto w-full">
            <defs>
              {/* Rugosidade de tinta/lacre */}
              <filter id={`${id}-rough`} x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.85"
                  numOctaves="2"
                  seed={seed}
                  result="noise"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" />
              </filter>
              <path
                id={`${id}-ring`}
                d="M30,100 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"
              />
            </defs>

            <g filter={`url(#${id}-rough)`}>
              <path d={EDGE} fill="var(--brick)" />
              <circle cx="100" cy="100" r="86" fill="none" stroke="var(--cream)" strokeOpacity="0.25" strokeWidth="1.2" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="var(--cream)" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="1.5 4" />
              <text
                style={mono}
                fontSize="11"
                fontWeight="500"
                fill="var(--cream)"
                letterSpacing="1"
              >
                <textPath
                  href={`#${id}-ring`}
                  textLength="436"
                  lengthAdjust="spacing"
                >
                  {ring}
                </textPath>
              </text>
              {lines.map((l) => (
                <text
                  key={l.text}
                  x="100"
                  y={l.y}
                  textAnchor="middle"
                  style={mono}
                  fontSize={l.size}
                  fontWeight={l.weight ?? 500}
                  fill="var(--cream)"
                >
                  {l.text}
                </text>
              ))}
            </g>
          </svg>
        </m.a>
      </LazyMotion>
    </MotionConfig>
  );
}

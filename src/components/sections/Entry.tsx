"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { entryLogo } from "@/content/brand";
import { getGsap } from "@/lib/gsap";

/**
 * Entrada: o logo "cozinha" e o ecrã sobe para revelar o hero.
 * Só na primeira visita da sessão. A decisão é tomada por um script inline em
 * RootShell (html[data-entry="pending"]), antes da pintura, para não haver flash.
 * Sem prefers-reduced-motion e < 1.2s (0.5 entrada + 0.15 pausa + 0.4 saída).
 * O logo vem de content/brand.ts (TEMP, trocar quando houver o vetorial).
 */
export default function Entry({ labels }: { labels: { skip: string } }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    const logo = logoRef.current;
    const glow = glowRef.current;
    if (html.dataset.entry !== "pending" || !root || !logo || !glow) return;

    const { gsap } = getGsap();
    const finish = () => {
      html.dataset.entry = "done";
    };

    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(
      logo,
      { scale: 0.6, rotate: -10, y: 24, opacity: 0 },
      { scale: 1, rotate: 0, y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.8)" },
      0,
    )
      .fromTo(
        glow,
        { scale: 0.4, opacity: 0 },
        { scale: 1.3, opacity: 0.8, duration: 0.5, ease: "power2.out" },
        0,
      )
      .to(root, { yPercent: -100, duration: 0.4, ease: "power3.inOut" }, 0.65);

    const skip = () => {
      if (html.dataset.entry !== "pending") return;
      tl.kill();
      gsap.to(root, { opacity: 0, duration: 0.15, onComplete: finish });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    root.addEventListener("click", skip);
    window.addEventListener("keydown", onKey);

    return () => {
      tl.kill();
      root.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="entry" role="presentation">
      <div ref={glowRef} className="entry-glow" />
      <div ref={logoRef} className="relative">
        <Image
          src={entryLogo.src}
          alt={entryLogo.alt}
          width={entryLogo.width}
          height={entryLogo.height}
          className="h-40 w-40 sm:h-52 sm:w-52"
          priority
        />
      </div>
      <button
        type="button"
        className="absolute bottom-6 right-6 font-mono text-xs uppercase tracking-widest text-cream/80 underline-offset-4 hover:text-cream hover:underline focus-visible:text-cream focus-visible:underline"
      >
        {labels.skip}
      </button>
    </div>
  );
}

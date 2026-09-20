"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

/**
 * Reveals de scroll com GSAP (Lenis já está sincronizado em SmoothScroll).
 * Marcar filhos com:
 *  - data-reveal            sobe e aparece (data-reveal-delay="0.2" opcional)
 *  - data-reveal-clip       abre de baixo para cima (molduras de imagem)
 *  - data-lines + data-line linhas de título a subir de dentro de uma máscara
 *  - data-stamp             carimbo que cai e bate (selos)
 *  - data-parallax          desliza suavemente com o scroll (dentro de um pai com overflow hidden)
 * Sem prefers-reduced-motion. Sem JS o conteúdo fica simplesmente visível.
 */
export default function ScrollReveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal-clip]").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Carimbo: cai de cima (grande) e "bate" no papel.
      root.querySelectorAll<HTMLElement>("[data-stamp]").forEach((el) => {
        gsap.from(el, {
          scale: 1.7,
          rotate: 14,
          opacity: 0,
          duration: 0.45,
          ease: "power4.in",
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-lines]").forEach((group) => {
        const lines = group.querySelectorAll("[data-line]");
        gsap.from(lines, {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    // As fontes mudam a altura do texto: recalcular posições quando carregarem.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

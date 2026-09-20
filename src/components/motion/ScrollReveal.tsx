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
/** Posição do elemento na página, ignorando transforms (offsetTop encadeado). */
function pageTop(el: HTMLElement) {
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
    y += n.offsetTop;
  }
  return y;
}

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

    /**
     * Início do gatilho: "topo do elemento a `ratio` da altura do ecrã" (como "top 88%"), mas nunca
     * para além do scroll máximo. Sem isto, elementos nos últimos ~10% da página (o rodapé) exigiam
     * mais scroll do que a página permite e ficavam invisíveis para sempre.
     */
    const revealStart = (el: HTMLElement, ratio: number) => () => {
      const max = ScrollTrigger.maxScroll(window);
      const top = pageTop(el);
      const natural = top - window.innerHeight * ratio;
      if (natural <= max - 2) return natural;
      // Inalcançável: revelar assim que espreita (95%), sempre antes do fim do scroll.
      return Math.min(max - 2, top - window.innerHeight * 0.95);
    };

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, start: revealStart(el, 0.88), once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal-clip]").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: revealStart(el, 0.85), once: true },
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
          scrollTrigger: { trigger: el, start: revealStart(el, 0.85), once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-lines]").forEach((group) => {
        const lines = group.querySelectorAll("[data-line]");
        gsap.from(lines, {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: revealStart(group, 0.82), once: true },
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

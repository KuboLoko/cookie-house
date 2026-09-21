"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
} from "motion/react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { flavors, type FlavorId } from "@/content/flavors";

type Item = { name: string; tag: string; line: string; alt: string };
export type DropsLabels = {
  label: string;
  title: string;
  hint: string;
  listLabel: string;
  items: Record<FlavorId, Item>;
  chourico: { name: string; line: string; cta: string };
};

const num = (i: number) => `Nº${String(i + 1).padStart(2, "0")}`;

/**
 * Ato III: os "drops". O sabor ativo (hover, clique, toque ou teclado) troca o data-flavour da
 * secção e a paleta transita por CSS (tokens.css). GSAP só nas entradas (ScrollReveal);
 * Motion só na troca da moeda/texto por estado hover/clique. Nunca nos mesmos elementos.
 */
export default function Drops({ labels: t }: { labels: DropsLabels }) {
  const [active, setActive] = useState<FlavorId>("classic");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = flavors.findIndex((f) => f.id === active);
  const item = t.items[active];

  const move = (delta: number) => {
    const next = (activeIndex + delta + flavors.length) % flavors.length;
    setActive(flavors[next].id);
    refs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      move(-1);
    }
  };

  return (
    <section
      id="drops"
      data-flavour={active}
      aria-labelledby="drops-title"
      className="bg-theme-bg text-theme-fg transition-colors duration-500"
    >
      <ScrollReveal className="mx-auto max-w-7xl px-5 py-24 sm:px-10 md:py-40">
        <p
          data-reveal
          className="font-mono text-xs uppercase tracking-widest"
        >
          {t.label}
        </p>

        <h2
          id="drops-title"
          data-lines
          className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.03em] [font-variation-settings:'SOFT'_100,'WONK'_1,'opsz'_144]"
        >
          <span className="block overflow-hidden pb-[0.1em]">
            <span data-line className="block">
              {t.title}
            </span>
          </span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
          <div data-reveal className="min-w-0 md:col-span-5">
            <p
              id="drops-list-label"
              className="mb-4 font-mono text-xs uppercase tracking-widest"
            >
              {t.hint}
            </p>

            <div
              role="radiogroup"
              aria-label={t.listLabel}
              onKeyDown={onKeyDown}
              className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:block md:overflow-visible md:px-0 md:pb-0"
            >
              {flavors.map((f, i) => {
                const on = f.id === active;
                return (
                  <button
                    key={f.id}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(f.id)}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setActive(f.id);
                    }}
                    className={`flex shrink-0 snap-start items-baseline gap-3 rounded-full border px-4 py-2 text-left outline-offset-4 transition-[opacity,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-current md:w-full md:rounded-none md:border-0 md:border-b md:px-0 md:py-5 ${
                      on
                        ? "border-current bg-theme-fg text-theme-bg md:border-theme-accent md:bg-transparent md:text-theme-fg"
                        : "border-current/40 hover:bg-current/10 md:border-current/25"
                    }`}
                  >
                    <span className="font-mono text-xs tracking-widest md:text-sm">
                      {num(i)}
                    </span>
                    <span className="font-display text-base font-extrabold leading-tight [font-variation-settings:'SOFT'_100,'WONK'_1] md:text-3xl lg:text-4xl">
                      {t.items[f.id].name}
                    </span>
                    <span
                      aria-hidden
                      className={`ml-auto hidden font-mono text-lg text-theme-accent transition-opacity md:inline ${on ? "opacity-100" : "opacity-0"}`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            <a
              href="#chourico"
              className="mt-2 flex items-baseline gap-3 py-4 outline-offset-4 focus-visible:outline-2 focus-visible:outline-current md:border-b md:border-current/25 md:py-5"
            >
              <span className="font-mono text-xs tracking-widest md:text-sm">
                {num(flavors.length)}
              </span>
              <span className="font-display text-base font-extrabold leading-tight [font-variation-settings:'SOFT'_100,'WONK'_1] md:text-3xl lg:text-4xl">
                {t.chourico.name}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest">
                {t.chourico.line}{" "}
                <span className="underline underline-offset-4">
                  {t.chourico.cta} ↓
                </span>
              </span>
            </a>
          </div>

          <div data-reveal data-reveal-delay="0.1" className="min-w-0 md:col-span-7">
            <MotionConfig reducedMotion="user">
              <LazyMotion features={domAnimation} strict>
                <div className="relative mx-auto aspect-square w-full max-w-[24rem] md:max-w-[32rem]">
                  {flavors.map((f, i) => {
                    const on = f.id === active;
                    return (
                      <m.div
                        key={f.id}
                        aria-hidden={!on}
                        initial={false}
                        animate={
                          on
                            ? { opacity: 1, scale: 1, rotate: 0 }
                            : { opacity: 0, scale: 0.86, rotate: -10 }
                        }
                        transition={{ type: "spring", stiffness: 180, damping: 20 }}
                        className="absolute inset-0 overflow-hidden rounded-full ring-8 ring-theme-accent transition-[box-shadow] duration-500"
                      >
                        <Image
                          src={f.image}
                          alt={on ? t.items[f.id].alt : ""}
                          fill
                          priority={i === 0}
                          sizes="(min-width: 768px) 32rem, 90vw"
                          className="scale-[1.12] object-cover"
                        />
                      </m.div>
                    );
                  })}
                </div>

                <div className="mx-auto mt-10 min-h-[9.5rem] max-w-[32rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <m.div
                      key={active}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="font-mono text-xs uppercase tracking-widest">
                        {num(activeIndex)} · {item.tag}
                      </p>
                      <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight [font-variation-settings:'SOFT'_100,'WONK'_1,'opsz'_72] sm:text-5xl">
                        {item.name}
                      </h3>
                      <p className="mt-3 max-w-md text-lg leading-relaxed">
                        {item.line}
                      </p>
                    </m.div>
                  </AnimatePresence>
                </div>
              </LazyMotion>
            </MotionConfig>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

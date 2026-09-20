import Image from "next/image";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getDictionary, type Locale } from "@/i18n";

// Recorte (só o chouriço, com o nome e a seta) do mapa de sabores do Instagram oficial do cliente.
// Original intacto em public/media/instagram/2026-06-11_DZdFenQIS39.jpg.
const CHOURICO_IMAGE = "/media/instagram/derived/chourico-crop.jpg";

export default function Chourico({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).chourico;

  return (
    <section
      id="chourico"
      data-theme="chourico"
      aria-labelledby="chourico-title"
      className="relative overflow-hidden bg-theme-bg text-theme-fg"
    >
      {/* Moldura fina, como um rótulo de aviso */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 border border-cream/30 sm:inset-5"
      />

      <ScrollReveal className="relative mx-auto flex min-h-[85svh] max-w-7xl flex-col justify-center px-5 py-24 sm:px-10 md:py-32">
        <p
          data-reveal
          className="font-mono text-xs uppercase tracking-widest"
        >
          {t.label}
        </p>

        <h2
          id="chourico-title"
          data-lines
          className="mt-4 font-display text-[clamp(3.4rem,16vw,16rem)] font-extrabold leading-[0.86] tracking-[-0.035em] [font-variation-settings:'SOFT'_100,'WONK'_1,'opsz'_144]"
        >
          <span className="block overflow-hidden pb-[0.1em]">
            <span data-line className="block">
              {t.title}
            </span>
          </span>
        </h2>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-6">
            <p
              data-reveal
              className="font-display text-3xl font-light leading-snug sm:text-4xl [font-variation-settings:'SOFT'_100,'WONK'_1,'opsz'_72]"
            >
              {t.lines[0].split(/(?<=[.!?])\s+/).map((sentence) => (
                <span key={sentence} className="block">
                  {sentence}
                </span>
              ))}
            </p>
            <p
              data-reveal
              data-reveal-delay="0.1"
              className="mt-4 max-w-md text-lg leading-relaxed"
            >
              {t.lines[1]}
            </p>
            {/* Piada à margem, de propósito sem formato de rótulo/aviso (mono, maiúsculas, negrito) */}
            <p
              data-reveal
              data-reveal-delay="0.2"
              className="mt-6 font-display text-xl font-light [font-variation-settings:'SOFT'_100,'WONK'_1,'opsz'_36]"
            >
              <span className="inline-block -rotate-2 opacity-80">
                {t.lines[2]}
              </span>
            </p>
            <p
              data-reveal
              data-reveal-delay="0.3"
              className="mt-8 inline-block border-b-2 border-cream pb-1 font-mono text-sm font-medium uppercase tracking-wider"
            >
              {t.dare}&nbsp;→
            </p>
          </div>

          <figure data-reveal className="md:col-span-6">
            <div className="rotate-2 bg-cream p-2 sm:p-3">
              <div
                data-reveal-clip
                className="relative aspect-[860/470] overflow-hidden"
              >
                <div
                  data-parallax
                  className="absolute inset-x-0 -top-[8%] h-[116%]"
                >
                  <Image
                    src={CHOURICO_IMAGE}
                    alt={t.imageAlt}
                    fill
                    sizes="(min-width: 768px) 46vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </figure>
        </div>
      </ScrollReveal>
    </section>
  );
}

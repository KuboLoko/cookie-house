import Image from "next/image";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getDictionary, type Locale } from "@/i18n";

// Chá gelado no balcão. Foto do Instagram oficial do cliente.
const CAFE_IMAGE = "/media/instagram/2026-04-27_DXogAVDCIeV.jpg";

export default function Cafetaria({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).cafetaria;

  return (
    <section
      id="cafetaria"
      data-theme="cafe"
      aria-labelledby="cafetaria-title"
      className="bg-theme-bg text-theme-fg"
    >
      <ScrollReveal className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-10 md:grid-cols-12 md:gap-10 md:py-20">
        <div className="md:col-span-7">
          <p
            data-reveal
            className="font-mono text-xs uppercase tracking-widest text-theme-accent"
          >
            {t.label}
          </p>

          <h2
            id="cafetaria-title"
            data-lines
            className="mt-5 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1] tracking-[-0.02em] [font-variation-settings:'SOFT'_0,'WONK'_0,'opsz'_144]"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-line className="block text-balance">
                {t.title}
              </span>
            </span>
          </h2>

          <ul className="mt-10 border-t border-choc/25">
            {t.drinks.map((d, i) => (
              <li
                key={d.name}
                data-reveal
                data-reveal-delay={i * 0.12}
                className="border-b border-choc/25 py-5"
              >
                <p className="font-display text-3xl font-extrabold leading-tight [font-variation-settings:'SOFT'_100,'WONK'_1] sm:text-4xl">
                  {d.name}
                </p>
                <p className="mt-2 max-w-md text-base leading-relaxed">
                  {d.note}
                </p>
              </li>
            ))}
          </ul>

          <p
            data-reveal
            className="mt-6 font-mono text-xs uppercase tracking-widest"
          >
            {t.foot}
          </p>
        </div>

        <figure className="md:col-span-5">
          <div
            data-reveal-clip
            className="relative aspect-[4/5] overflow-hidden bg-choc/10"
          >
            <div data-parallax className="absolute inset-x-0 -top-[8%] h-[116%]">
              <Image
                src={CAFE_IMAGE}
                alt={t.imageAlt}
                fill
                quality={75}
                sizes="(min-width: 768px) 36vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </figure>
      </ScrollReveal>
    </section>
  );
}

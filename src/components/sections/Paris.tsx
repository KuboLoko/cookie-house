import Image from "next/image";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Accent from "@/components/ui/Accent";
import { getDictionary, type Locale } from "@/i18n";

// FACTO: o crookie é um croissant recheado com massa de bolacha (fonte: artigo da NiT sobre a Cookie House,
// nit.pt/comida/cafes-e-bares/pistacio-ou-chourico-a-nova-loja-de-lisboa-tem-cookies-com-sabores-bizarros).
// Não descrever como "croissant + cookie" em par vago.
// Vitrine de crookies (camadas folhadas com açúcar em pó). Foto do Instagram oficial do cliente.
const PARIS_IMAGE = "/media/instagram/2026-05-08_DYFfH54iAdm.jpg";

export default function Paris({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).paris;

  return (
    <section
      id="paris"
      data-theme="paris"
      aria-labelledby="paris-title"
      className="bg-theme-bg text-theme-fg"
    >
      <ScrollReveal className="mx-auto grid max-w-7xl gap-y-16 px-5 py-28 sm:px-10 md:grid-cols-12 md:gap-x-10 md:py-44">
        <div className="md:col-span-7 md:pt-20">
          <p
            data-reveal
            className="font-mono text-xs uppercase tracking-widest text-theme-accent"
          >
            {t.label}
          </p>

          <h2
            id="paris-title"
            data-lines
            className="mt-6 font-display text-[clamp(2.75rem,7.2vw,7rem)] font-light leading-[0.98] tracking-[-0.02em] [font-variation-settings:'SOFT'_0,'WONK'_0,'opsz'_144]"
          >
            {t.titleLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span data-line className="block">
                  <Accent text={line} className="text-theme-accent" />
                </span>
              </span>
            ))}
          </h2>

          <p
            data-reveal
            className="mt-12 max-w-md text-lg leading-relaxed md:mt-16"
          >
            {t.body}
          </p>

          <p
            data-reveal
            data-reveal-delay="0.1"
            className="mt-10 font-mono text-xs uppercase tracking-widest opacity-60"
          >
            {t.route}
          </p>
        </div>

        <figure className="md:col-span-5 md:mt-40">
          <div
            data-reveal-clip
            className="relative aspect-[3/4] overflow-hidden bg-choc/10"
          >
            <div data-parallax className="absolute inset-x-0 -top-[8%] h-[116%]">
              <Image
                src={PARIS_IMAGE}
                alt={t.imageAlt}
                fill
                quality={75}
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-widest opacity-60">
            {t.caption}
          </figcaption>
        </figure>
      </ScrollReveal>
    </section>
  );
}

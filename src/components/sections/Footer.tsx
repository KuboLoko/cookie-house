import Image from "next/image";
import FooterCrumbs from "@/components/motion/FooterCrumbs";
import ScrollReveal from "@/components/motion/ScrollReveal";
import MapCta from "@/components/ui/MapCta";
import { footerLogo } from "@/content/brand";
import { WHATSAPP_NUMBER_PLACEHOLDER, business } from "@/content/business";
import { getDictionary, type Locale } from "@/i18n";
import { whatsappLink } from "@/lib/whatsapp";

const link =
  "pointer-events-auto inline-block py-2 underline underline-offset-4 decoration-cream/40 transition-colors hover:decoration-cream";

/**
 * Camadas (z): logo (0) < canvas das migalhas (10) < texto e botões (20).
 * O texto tem pointer-events:none e só os links/botões os reativam, para o rato chegar às migalhas.
 */
export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).footer;
  // TODO(cliente): número real em business.ts (WHATSAPP_NUMBER_PLACEHOLDER).
  // Sem ligação a /api/preorder de propósito: por agora é só o link wa.me com mensagem pré-preenchida.
  const waHref = whatsappLink(WHATSAPP_NUMBER_PLACEHOLDER, t.preorder.message);

  return (
    <footer
      id="footer"
      data-theme="lisboa"
      className="relative isolate overflow-hidden bg-theme-bg text-theme-fg"
    >
      <FooterCrumbs />

      <ScrollReveal className="mx-auto max-w-7xl px-5 pb-28 pt-20 sm:px-10 md:pt-28 md:pb-32">
        <div className="grid items-center gap-14 md:grid-cols-12 md:gap-10">
          <div
            data-reveal
            className="pointer-events-none relative z-20 md:col-span-5"
          >
            <div
              data-theme="corte"
              className="bg-theme-bg p-7 text-theme-fg sm:p-10 md:p-6 lg:p-10"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-theme-accent">
                {t.preorder.label}
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight [font-variation-settings:'SOFT'_100,'WONK'_1,'opsz'_72] sm:text-5xl md:text-3xl lg:text-5xl">
                {t.preorder.title}
              </h2>
              <p className="mt-4 max-w-sm text-lg leading-relaxed">
                {t.preorder.body}
              </p>
              <div className="pointer-events-auto mt-8 inline-block">
                <MapCta href={waHref}>{t.preorder.cta}</MapCta>
              </div>
              <p className="mt-5 font-mono text-xs uppercase tracking-widest opacity-70">
                {t.preorder.note}
              </p>
            </div>
          </div>

          {/* TEMP: logo provisório em maior resolução (ver content/brand.ts) */}
          <div
            data-reveal
            data-reveal-delay="0.15"
            className="relative z-0 md:col-span-7"
          >
            <Image
              src={footerLogo.src}
              alt={footerLogo.alt}
              width={footerLogo.width}
              height={footerLogo.height}
              sizes="(min-width: 768px) 58vw, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div
          data-reveal
          className="pointer-events-none relative z-20 mt-16 flex flex-col gap-3 border-t border-cream/30 pt-6 font-mono text-xs uppercase tracking-widest sm:flex-row sm:items-center sm:justify-between md:mt-24"
        >
          <p>{t.rights.replace("{year}", String(new Date().getFullYear()))}</p>
          <p className="flex flex-wrap gap-x-6">
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              {t.instagram} {business.instagram.handle} ↗
            </a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              {t.maps} ↗
            </a>
          </p>
        </div>
      </ScrollReveal>
    </footer>
  );
}

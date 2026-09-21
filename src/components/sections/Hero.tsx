import Image from "next/image";
import Link from "next/link";
import MapCta from "@/components/ui/MapCta";
import OpenNow from "@/components/ui/OpenNow";
import { business } from "@/content/business";
import { getDictionary, type Locale } from "@/i18n";

// Fachada da loja, foto do Instagram oficial do cliente.
const HERO_IMAGE = "/media/instagram/2026-04-21_DXZsHh0CDr0.jpg";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden text-cream"
    >
      <Image
        src={HERO_IMAGE}
        alt={t.hero.imageAlt}
        fill
        priority
        quality={75}
        sizes="100vw"
        className="-z-20 object-cover object-[50%_30%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-choc/70 via-choc/55 to-choc/90"
      />

      <header className="flex items-start justify-between px-5 pt-5 sm:px-10 sm:pt-8">
        <div>
          <p className="font-display text-xl font-semibold [font-variation-settings:'SOFT'_100,'WONK'_1]">
            {t.hero.brand}
          </p>
          <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-widest text-cream/90">
            {t.hero.eyebrow}
          </p>
        </div>
        <nav
          aria-label={t.hero.langLabel}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
        >
          <span aria-current="true" className="text-cream">
            {t.hero.current}
          </span>
          <span aria-hidden className="text-cream/40">
            /
          </span>
          <Link
            href={t.hero.switchTo.href}
            lang={locale === "pt" ? "en" : "pt-PT"}
            aria-label={t.hero.switchTo.label}
            className="text-cream/90 underline-offset-4 hover:text-cream hover:underline focus-visible:underline"
          >
            {t.hero.switchTo.code}
          </Link>
        </nav>
      </header>

      <div className="mt-auto px-5 pb-10 sm:px-10 sm:pb-14">
        <h1
          id="hero-title"
          className="font-display text-[clamp(4.5rem,25vw,22rem)] font-extrabold leading-[0.82] tracking-[-0.03em] [font-variation-settings:'SOFT'_100,'WONK'_1,'opsz'_144]"
        >
          {t.hero.title}
        </h1>

        <p className="mt-5 max-w-xl text-balance font-display text-2xl leading-snug sm:text-3xl [font-variation-settings:'SOFT'_100,'WONK'_1]">
          {t.hero.tagline}
        </p>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-cream/90">
          {t.hero.note}
        </p>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <MapCta href={business.mapsUrl}>{t.hero.cta}</MapCta>
          <OpenNow labels={t.status} />
        </div>
      </div>
    </section>
  );
}

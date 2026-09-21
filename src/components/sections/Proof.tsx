import ScrollReveal from "@/components/motion/ScrollReveal";
import Accent from "@/components/ui/Accent";
import Seal from "@/components/ui/Seal";
import { business } from "@/content/business";
import { formatAsOf, proof } from "@/content/proof";
import { getDictionary, type Locale } from "@/i18n";

export default function Proof({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).proof;
  const asOf = formatAsOf(proof.google.asOf, locale);

  return (
    <section
      id="proof"
      data-theme="paris"
      aria-labelledby="proof-title"
      // overflow-x-clip: os selos começam com scale 1.7 (carimbo) e esticariam a página na horizontal antes de disparar
      className="overflow-x-clip bg-theme-bg text-theme-fg"
    >
      <ScrollReveal className="mx-auto max-w-7xl px-5 py-28 sm:px-10 md:py-40">
        <p
          data-reveal
          className="font-mono text-xs uppercase tracking-widest text-theme-accent"
        >
          {t.label}
        </p>

        <h2
          id="proof-title"
          data-lines
          className="mt-6 font-display text-[clamp(2.5rem,6.4vw,6rem)] font-light leading-[1] tracking-[-0.02em] [font-variation-settings:'SOFT'_0,'WONK'_0,'opsz'_144]"
        >
          {t.titleLines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-line className="block text-balance">
                <Accent text={line} className="text-theme-accent" />
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-16 grid items-center gap-16 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col items-center gap-14 sm:flex-row sm:items-start sm:justify-center lg:col-span-7 lg:justify-start">
            <figure className="flex flex-col items-center gap-5 text-center">
              <div data-stamp>
                <Seal
                  id="seal-google"
                  href={business.mapsUrl}
                  ariaLabel={t.google.aria}
                  ring={t.google.ring}
                  rotate={-8}
                  seed={3}
                  lines={[
                    { text: proof.google.score, y: 116, size: 50 },
                    { text: "★★★★★", y: 140, size: 13 },
                  ]}
                />
              </div>
              <figcaption
                data-reveal
                data-reveal-delay="0.25"
                className="max-w-[15rem] font-mono text-[0.7rem] uppercase leading-relaxed tracking-widest"
              >
                {t.google.caption.replace("{date}", asOf)}
              </figcaption>
            </figure>

            <figure className="flex flex-col items-center gap-5 text-center">
              <div data-stamp data-reveal-delay="0.2">
                <Seal
                  id="seal-timeout"
                  href={proof.timeOut.url}
                  ariaLabel={t.timeOut.aria}
                  ring={t.timeOut.ring}
                  rotate={6}
                  seed={9}
                  lines={[
                    { text: "TIME", y: 96, size: 30, weight: 700 },
                    { text: "OUT", y: 126, size: 30, weight: 700 },
                    { text: "LISBOA", y: 146, size: 11 },
                  ]}
                />
              </div>
              <figcaption
                data-reveal
                data-reveal-delay="0.45"
                className="max-w-[15rem] font-mono text-[0.7rem] uppercase leading-relaxed tracking-widest"
              >
                {t.timeOut.caption}
                <br />
                <a
                  href={proof.timeOut.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block underline underline-offset-4 hover:text-theme-accent"
                >
                  {t.timeOut.link} ↗
                </a>
              </figcaption>
            </figure>
          </div>

          <div data-reveal className="lg:col-span-5">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest opacity-60">
              {t.paraphraseLabel}
            </p>
            <p className="mt-4 max-w-md font-display text-2xl font-light leading-snug sm:text-3xl [font-variation-settings:'SOFT'_0,'WONK'_0,'opsz'_72]">
              {t.paraphrase}
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

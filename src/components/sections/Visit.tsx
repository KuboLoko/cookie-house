import ScrollReveal from "@/components/motion/ScrollReveal";
import OpenNow from "@/components/ui/OpenNow";
import SuggestFlavor from "@/components/ui/SuggestFlavor";
import { business } from "@/content/business";
import { getDictionary, type Locale } from "@/i18n";

const link =
  "inline-block py-2 underline underline-offset-4 decoration-theme-fg/40 transition-colors hover:text-theme-accent hover:decoration-theme-accent";

export default function Visit({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.visit;
  const { address, hours } = business;

  return (
    <section
      id="visit"
      data-theme="corte"
      aria-labelledby="visit-title"
      className="bg-theme-bg text-theme-fg"
    >
      <ScrollReveal className="mx-auto max-w-7xl px-5 py-28 sm:px-10 md:py-40">
        <p
          data-reveal
          className="font-mono text-xs uppercase tracking-widest text-theme-accent"
        >
          {t.label}
        </p>

        <h2
          id="visit-title"
          data-lines
          className="mt-6 font-display text-[clamp(2.75rem,7.2vw,7rem)] font-light leading-[0.98] tracking-[-0.02em] [font-variation-settings:'SOFT'_0,'WONK'_0,'opsz'_144]"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-line className="block text-balance">
              {t.title}
            </span>
          </span>
        </h2>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <dl className="grid gap-10 font-mono text-sm uppercase leading-relaxed tracking-widest">
              <div data-reveal>
                <dt className="text-xs text-theme-accent">{t.addressLabel}</dt>
                <dd className="mt-2">
                  <address className="not-italic">
                    {address.street}
                    <br />
                    {address.postalCode} {address.city}
                    <br />
                    <span className="opacity-70">{t.area}</span>
                  </address>
                </dd>
              </div>

              <div data-reveal>
                <dt className="text-xs text-theme-accent">{t.hoursLabel}</dt>
                <dd className="mt-2">
                  {t.daily}
                  <br />
                  {hours.open} {t.hoursJoin} {hours.close}
                </dd>
                <dd className="mt-4 normal-case">
                  <OpenNow labels={dict.status} />
                </dd>
              </div>

              <div data-reveal className="flex flex-col items-start gap-3">
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  {t.mapsLink} ↗
                </a>
                <a
                  href={business.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  {t.instagramLabel} {business.instagram.handle} ↗
                </a>
              </div>
            </dl>
          </div>

          <div className="md:col-span-7">
            <div
              data-reveal-clip
              className="relative aspect-[4/3] w-full overflow-hidden border border-cream/20 bg-cream/5 md:aspect-auto md:h-full md:min-h-[26rem]"
            >
              <iframe
                title={t.mapTitle}
                src={business.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(1.05)]"
              />
            </div>
          </div>
        </div>

        <div
          data-theme="paris"
          data-reveal
          className="mt-24 grid gap-10 bg-theme-bg p-6 text-theme-fg sm:p-10 md:mt-32 md:grid-cols-12 md:gap-10 md:p-14"
        >
          <div className="md:col-span-5">
            <h3 className="font-display text-4xl font-light leading-tight [font-variation-settings:'SOFT'_100,'WONK'_1,'opsz'_72] sm:text-5xl">
              {t.form.title}
            </h3>
            <p className="mt-4 max-w-sm text-lg leading-relaxed">{t.form.intro}</p>
          </div>
          <div className="relative md:col-span-7">
            <SuggestFlavor
              labels={t.form}
              locale={locale}
              instagram={business.instagram}
            />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

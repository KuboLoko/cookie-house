import ScrollReveal from "@/components/motion/ScrollReveal";
import Sticker from "@/components/ui/Sticker";
import { business } from "@/content/business";
import { getDictionary, type Locale } from "@/i18n";

// Deslocamentos por linha (só em md+), para dar ritmo de cartaz.
const lineOffset = ["", "md:ml-[10%]", "md:ml-[3%]", "md:ml-[18%]"];

export default function Manifesto({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).manifesto;
  const lines = t.lines.map((l) => l.replace("{close}", business.hours.close));
  // Cada grupo repetido 2x para o loop contínuo (translateX -50%).
  const strip = [...t.marquee, ...t.marquee];

  return (
    <section
      id="manifesto"
      data-theme="lisboa"
      aria-labelledby="manifesto-title"
      className="overflow-hidden bg-theme-bg text-theme-fg"
    >
      <div
        aria-hidden
        className="marquee border-b border-cream/30 py-3 font-mono text-xs uppercase tracking-widest"
      >
        <div className="marquee-track">
          {[0, 1].map((g) => (
            <div key={g} className="flex flex-none items-center">
              {strip.map((item, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-6">{item}</span>
                  <span>✺</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ScrollReveal className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-10 md:pb-24 md:pt-32">
        <p data-reveal className="font-mono text-xs uppercase tracking-widest">
          {t.label}
        </p>

        <h2
          id="manifesto-title"
          data-lines
          className="mt-8 font-display text-[clamp(2.6rem,8.4vw,8rem)] font-extrabold leading-[0.95] tracking-[-0.025em] [font-variation-settings:'SOFT'_100,'WONK'_1,'opsz'_144]"
        >
          {lines.map((line, i) => (
            <span
              key={line}
              className={`block overflow-hidden pb-[0.1em] ${lineOffset[i] ?? ""}`}
            >
              <span
                data-line
                className={`block text-balance ${i === lines.length - 1 ? "font-light" : ""}`}
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-16 flex flex-col items-start gap-10 md:mt-24 md:flex-row md:items-end md:justify-between">
          <div data-reveal className="max-w-xs">
            <p className="font-mono text-sm uppercase leading-relaxed tracking-widest">
              {t.aside}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest">
              {business.address.street} · {business.address.area}
            </p>
          </div>
          <div data-reveal data-reveal-delay="0.15">
            <Sticker>{t.sticker}</Sticker>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

import ScrollReveal from "@/components/motion/ScrollReveal";
import { business } from "@/content/business";
import { getDictionary, type Locale } from "@/i18n";

// Sem foto de propósito: nenhuma das fotos recolhidas mostra os fundadores com clareza,
// e não identificamos pessoas por palpite. Layout só com tipografia, em estilo de créditos.
// GAP: quando o cliente fornecer retratos reais, entram aqui.
export default function Makers({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).makers;

  return (
    <section
      id="makers"
      data-theme="makers"
      aria-labelledby="makers-title"
      className="bg-theme-bg text-theme-fg"
    >
      <ScrollReveal className="mx-auto max-w-7xl px-5 py-20 sm:px-10 md:py-28">
        <h2
          id="makers-title"
          data-reveal
          className="font-mono text-xs font-normal uppercase tracking-widest text-theme-accent"
        >
          {t.label}
        </h2>

        <ul className="mt-8 border-t border-choc/30">
          {business.makers.map((name, i) => (
            <li
              key={name}
              data-reveal
              data-reveal-delay={i * 0.12}
              className="flex flex-col gap-2 border-b border-choc/30 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 md:py-8"
            >
              <p className="font-display text-[clamp(2.1rem,6.4vw,5.75rem)] font-extrabold leading-none tracking-[-0.025em] [font-variation-settings:'SOFT'_100,'WONK'_1,'opsz'_144]">
                {name}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-theme-accent sm:text-sm">
                {t.roles[i]}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 md:mt-14 md:grid md:grid-cols-12">
          <p
            data-reveal
            className="max-w-xl text-lg leading-relaxed md:col-span-6 md:col-start-6"
          >
            {t.body}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

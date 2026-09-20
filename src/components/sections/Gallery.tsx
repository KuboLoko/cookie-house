import Image from "next/image";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { business } from "@/content/business";
import { getDictionary, type Locale } from "@/i18n";

// As 4 fotos do Instagram oficial do cliente que ainda não tinham sido usadas noutra secção.
// Grelha irregular (editorial): tamanhos, recortes e desfasamentos diferentes, sem legendas.
const PHOTOS = [
  {
    src: "/media/instagram/2026-04-17_DXPYwlzCHUF.jpg",
    frame: "col-span-2 aspect-[4/5] md:col-span-5 md:col-start-1",
  },
  {
    src: "/media/instagram/2026-05-02_DX1csa6CJka.jpg",
    frame: "col-span-1 aspect-square md:col-span-4 md:col-start-7 md:mt-32",
  },
  {
    src: "/media/instagram/2026-05-12_DYPwkumosIg.jpg",
    frame: "col-span-1 mt-10 aspect-[3/4] md:col-span-4 md:col-start-2 md:mt-0",
  },
  {
    src: "/media/instagram/2026-07-29_DbYYNfdoA32.jpg",
    frame: "col-span-2 aspect-[4/5] md:col-span-5 md:col-start-8 md:mt-24",
  },
] as const;

const sizes = "(min-width: 768px) 40vw, 92vw";

export default function Gallery({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).gallery;

  return (
    <section
      id="gallery"
      data-theme="paris"
      aria-labelledby="gallery-title"
      className="bg-theme-bg text-theme-fg"
    >
      <ScrollReveal className="mx-auto max-w-7xl px-5 py-20 sm:px-10 md:py-32">
        <h2 id="gallery-title" className="sr-only">
          {t.title}
        </h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-x-6 md:gap-y-10">
          {PHOTOS.map((p, i) => (
            <div
              key={p.src}
              data-reveal-clip
              className={`relative overflow-hidden bg-choc/10 ${p.frame}`}
            >
              <div data-parallax className="absolute inset-x-0 -top-[8%] h-[116%]">
                <Image
                  src={p.src}
                  alt={t.alts[i]}
                  fill
                  sizes={sizes}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <p
          data-reveal
          className="mt-12 font-mono text-xs uppercase tracking-widest md:mt-16"
        >
          <a
            href={business.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-2 underline underline-offset-4 decoration-theme-fg/40 transition-colors hover:text-theme-accent hover:decoration-theme-accent"
          >
            {t.more} {business.instagram.handle} ↗
          </a>
        </p>
      </ScrollReveal>
    </section>
  );
}

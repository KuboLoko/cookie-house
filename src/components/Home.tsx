import Cafetaria from "@/components/sections/Cafetaria";
import Chourico from "@/components/sections/Chourico";
import Drops from "@/components/sections/Drops";
import Entry from "@/components/sections/Entry";
import Footer from "@/components/sections/Footer";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Makers from "@/components/sections/Makers";
import Manifesto from "@/components/sections/Manifesto";
import Paris from "@/components/sections/Paris";
import Proof from "@/components/sections/Proof";
import Visit from "@/components/sections/Visit";
import { getDictionary, type Locale } from "@/i18n";

export default function Home({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-choc"
      >
        {t.skip}
      </a>
      <Entry labels={t.entry} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero locale={locale} />
        <Paris locale={locale} />
        <Manifesto locale={locale} />
        <Drops labels={t.drops} />
        <Chourico locale={locale} />
        <Cafetaria locale={locale} />
        <Proof locale={locale} />
        <Makers locale={locale} />
        <Visit locale={locale} />
        <Gallery locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

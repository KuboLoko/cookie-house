import Cafetaria from "@/components/sections/Cafetaria";
import Chourico from "@/components/sections/Chourico";
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
      <Entry labels={t.entry} />
      <main>
        <Hero locale={locale} />
        <Paris locale={locale} />
        <Manifesto locale={locale} />
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

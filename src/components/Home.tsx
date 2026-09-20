import Entry from "@/components/sections/Entry";
import Hero from "@/components/sections/Hero";
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
        <Proof locale={locale} />
        <Visit locale={locale} />
      </main>
    </>
  );
}

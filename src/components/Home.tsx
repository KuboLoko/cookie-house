import Entry from "@/components/sections/Entry";
import Hero from "@/components/sections/Hero";
import { getDictionary, type Locale } from "@/i18n";

export default function Home({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <Entry labels={t.entry} />
      <main>
        <Hero locale={locale} />
      </main>
    </>
  );
}

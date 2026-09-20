import Image from "next/image";
import { getDictionary, type Locale } from "@/i18n";

// Placeholder do scaffold. As secções entram uma a uma em components/sections.
export default function Home({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <Image
        src="/brand/logo-principal.png"
        alt="Cookie House"
        width={225}
        height={225}
        priority
        className="rounded-3xl"
      />
      <h1 className="font-display text-5xl">Crookie</h1>
      <p className="font-mono text-sm uppercase tracking-widest">
        {t.scaffold.status}
      </p>
    </main>
  );
}

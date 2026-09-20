import { dmMono, fraunces, geist } from "@/app/fonts";
import SmoothScroll from "@/components/motion/SmoothScroll";
import type { Locale } from "@/i18n";

const htmlLang: Record<Locale, string> = { pt: "pt-PT", en: "en" };

export default function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={htmlLang[locale]}
      data-theme="paris"
      className={`${fraunces.variable} ${geist.variable} ${dmMono.variable} antialiased`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

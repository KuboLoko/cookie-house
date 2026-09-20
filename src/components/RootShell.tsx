import Script from "next/script";
import { dmMono, fraunces, geist } from "@/app/fonts";
import SmoothScroll from "@/components/motion/SmoothScroll";
import type { Locale } from "@/i18n";

const htmlLang: Record<Locale, string> = { pt: "pt-PT", en: "en" };

// Corre antes da primeira pintura. Marca a entrada como "pending" só na 1.ª visita da sessão
// e nunca com prefers-reduced-motion. Se o sessionStorage falhar, não há entrada.
const entryGate = `(function(){try{var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("ch-entry"))return;sessionStorage.setItem("ch-entry","1");d.dataset.entry="pending"}catch(e){}})()`;

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
      // O script de entrada altera data-entry antes da hidratação.
      suppressHydrationWarning
      className={`${fraunces.variable} ${geist.variable} ${dmMono.variable} antialiased`}
    >
      <body>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- regra do Pages Router; no App Router o beforeInteractive é suportado no root layout */}
        <Script id="entry-gate" strategy="beforeInteractive">
          {entryGate}
        </Script>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

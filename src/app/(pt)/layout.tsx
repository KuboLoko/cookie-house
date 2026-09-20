import type { Metadata } from "next";
import "../globals.css";
import RootShell from "@/components/RootShell";
import { getDictionary } from "@/i18n";

const t = getDictionary("pt");

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  // Preview da Vercel: sem indexação até haver domínio e aprovação do cliente.
  robots: { index: false, follow: false },
  alternates: { languages: { "pt-PT": "/", en: "/en" } },
};

export default function PtLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="pt">{children}</RootShell>;
}

import type { Metadata } from "next";
import "../../globals.css";
import RootShell from "@/components/RootShell";
import { getDictionary } from "@/i18n";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  robots: { index: false, follow: false },
  alternates: { languages: { "pt-PT": "/", en: "/en" } },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}

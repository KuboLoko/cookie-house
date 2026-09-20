import en from "./en.json";
import pt from "./pt.json";

export type Locale = "pt" | "en";

export const dictionaries = { pt, en } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

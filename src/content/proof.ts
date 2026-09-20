// Prova social. Só o que é verificável e com data; nada de números que envelheçam.
export const proof = {
  google: {
    score: "5.0",
    // TODO: valor dado pelo cliente/brief. Reconfirmar na ficha do Google antes do lançamento
    // e atualizar `asOf` (AAAA-MM). O nº de avaliações fica de fora de propósito.
    asOf: "2026-09",
  },
  timeOut: {
    url: "https://www.timeout.pt/lisboa/pt/noticias/na-cookie-house-ha-as-classicas-e-as-arrojadas-da-avela-ao-chourico-080726",
  },
} as const;

/** "2026-09" -> "setembro de 2026" / "September 2026" */
export function formatAsOf(asOf: string, locale: "pt" | "en") {
  const [y, m] = asOf.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, 1)));
}

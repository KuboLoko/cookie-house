// Factos do negócio. Sem preços em lado nenhum do site (regra do projeto).
export const business = {
  name: "Cookie House",
  address: {
    street: "Rua de S. Paulo 65",
    postalCode: "1200-372",
    city: "Lisboa",
    area: "Cais do Sodré",
  },
  instagram: {
    handle: "@cookiehouse.pt",
    url: "https://www.instagram.com/cookiehouse.pt/",
  },
  // Link de localização usado pelo próprio cliente na bio do Instagram.
  mapsUrl: "https://maps.app.goo.gl/PGbB4tauLGFAhf6y8",
  // O link curto acima não pode ser embebido (o Google bloqueia iframes dele). Este aponta para o mesmo
  // sítio: a ficha "Cookie House - Lisboa" (38.7076739, -9.1442549), a que o link curto resolve.
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Cookie+House+Rua+de+S.+Paulo+65+Lisboa&z=17&output=embed",
  // Ordem = ordem dos papéis em i18n (makers.roles). Só o que o cliente confirmou: fundador e pasteleiro.
  makers: ["João Vaz Antunes", "Maksym Fishchunk"],
  timezone: "Europe/Lisbon",
  // Todos os dias, 10:00 às 19:00 (fonte: bio oficial do Instagram, confirmado pelo cliente).
  // Não cobre feriados nem encerramentos pontuais.
  hours: { open: "10:00", close: "19:00" },
} as const;

/**
 * TODO(cliente): substituir pelo número real do WhatsApp Business, só dígitos com indicativo
 * (ex.: "351912345678"). Enquanto for este valor, o botão de pré-encomenda abre o WhatsApp
 * com um número inválido. Não usar números pessoais aqui.
 */
export const WHATSAPP_NUMBER_PLACEHOLDER = "351000000000";

/** true enquanto o número acima for o falso: o rodapé mostra uma nota de demonstração (some sozinha com o número real). */
export const WHATSAPP_IS_PLACEHOLDER = WHATSAPP_NUMBER_PLACEHOLDER === "351000000000";

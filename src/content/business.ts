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
  timezone: "Europe/Lisbon",
  // Todos os dias, 10:00 às 19:00 (fonte: bio oficial do Instagram, confirmado pelo cliente).
  // Não cobre feriados nem encerramentos pontuais.
  hours: { open: "10:00", close: "19:00" },
} as const;

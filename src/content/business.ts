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
  timezone: "Europe/Lisbon",
  // TODO: confirmar horário completo com o cliente. Só sabemos "aberto até às 19:00".
  closesAt: "19:00",
} as const;

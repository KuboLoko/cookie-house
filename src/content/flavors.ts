// Sabores confirmados (ordem = número do drop). Sem preços. O chouriço tem secção própria (#chourico).
// Fotos: recortes do mapa de sabores do Instagram oficial do cliente (2026-06-11), em derived/.
export const flavors = [
  { id: "classic", image: "/media/instagram/derived/flavor-classic.jpg" },
  { id: "crookie", image: "/media/instagram/derived/flavor-crookie.jpg" },
  { id: "pistachio", image: "/media/instagram/derived/flavor-pistachio.jpg" },
  { id: "hazelnut", image: "/media/instagram/derived/flavor-hazelnut.jpg" },
  { id: "chocolate", image: "/media/instagram/derived/flavor-chocolate.jpg" },
] as const;

export type FlavorId = (typeof flavors)[number]["id"];

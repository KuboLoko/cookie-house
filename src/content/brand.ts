// TEMP: logo provisório (PNG 225px, fundo tijolo). NÃO É a versão final.
// Quando o cliente entregar o logo vetorial, trocar só o `src` aqui (ideal: SVG com fundo transparente)
// e ajustar `background` se o novo ficheiro já não trouxer o quadrado vermelho.
export const entryLogo = {
  src: "/brand/logo-principal.png",
  width: 225,
  height: 225,
  alt: "Cookie House",
} as const;

// TEMP: o mesmo logo provisório em maior resolução, só as letras brancas, fundo transparente, recortadas (WebP extraído do raster embebido no SVG
// do cliente, que NÃO é vetorial). Trocar quando houver o logo vetorial final.
export const footerLogo = {
  src: "/brand/derived/logo-temp-wordmark.webp",
  width: 932,
  height: 462,
  alt: "Cookie House",
} as const;

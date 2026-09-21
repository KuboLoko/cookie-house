@AGENTS.md

# Cookie House (contexto do projeto)

Site premium one-page para a Cookie House (Rua de S. Paulo 65, Cais do Sodré, Lisboa). PT-PT por defeito em `/`, EN em `/en`. Sem outras línguas.

## Direção criativa (aprovada)
Fusão "Drop Culture" (esqueleto) + "Laboratório Crookie" (capítulo central). Três atos de scroll: Paris (creme) → O corte / Anatomia (chocolate) → Lisboa / Drops (tijolo). Tokens em `src/styles/tokens.css` (tijolo #AF403A amostrado do logo). Fontes: Fraunces (títulos), Geist (texto), DM Mono (labels).

## Regras duras
- **Sem preços em lado nenhum do site.**
- Imagens só da conta oficial de Instagram do cliente (`public/media/instagram/`). Nada de Google Maps/reviews/Time Out/NIT como imagem; essas fontes só como texto e links.
- Sem stock nem imagens geradas por IA.
- GSAP trata do scroll (sempre via `src/lib/gsap.ts`), Motion trata da UI. Nunca os dois no mesmo elemento.
- `/api/preorder` e `/api/suggest-flavor` são placeholders (501). A lógica liga-se depois à automação de WhatsApp.
- Deploy: preview da Vercel, sem domínio. `robots: noindex` até haver aprovação.

## Estado
Scaffold + Entrada + Hero + Ato I (Paris) + Manifesto + Chouriço + Cafetaria + Prova social + Makers + Visit + Galeria + Footer (WhatsApp, migalhas) + Drops (Ato III) (mapa, horário, "Sugere um sabor") prontos. Restantes secções por construir uma a uma em `src/components/sections/`.
Pendentes do cliente: logo vetorial (o de `content/brand.ts` é TEMP) e vídeos originais (bloqueiam a Anatomia).

## Convenções de scroll reveals
`ScrollReveal` (components/motion) envolve uma secção e anima filhos marcados com `data-reveal`, `data-reveal-clip`, `data-lines`/`data-line` e `data-parallax`. Só GSAP, só com prefers-reduced-motion: no-preference. Evitar `data-reveal` em elementos nos últimos ~10% da página (o gatilho é "top 88%"). Motion só em hover/clique (Sticker, MapCta), nunca no mesmo elemento que o GSAP.

## Prova social e Visit
- `content/proof.ts`: nota Google 5.0 SEM nº de avaliações, com `asOf` (AAAA-MM) mostrado como "em setembro de 2026". Reconfirmar a nota e atualizar `asOf` antes do lançamento. Time Out: só link de texto e selo, sem imagem nem texto do artigo.
- Mapa: `business.mapsEmbedUrl` (o link curto do Instagram não pode ser embebido). O botão "Abrir no Google Maps" usa o link curto.
- Formulário "Sugere um sabor" (`ui/SuggestFlavor.tsx`): validação no cliente, honeypot, POST para `/api/suggest-flavor` (501 por agora => estado de erro). Quando o backend existir, basta devolver 2xx.

## Makers
Depois da Prova social e antes do Visit (tom: creme -> areia -> chocolate). Só tipografia, estilo créditos, sem foto: nenhuma foto recolhida mostra os fundadores. Quando o cliente enviar retratos reais, acrescentá-los em `Makers.tsx`. Nomes em `business.makers`, papéis em `i18n.makers.roles` (mesma ordem).

## Footer, WhatsApp e migalhas
- `WHATSAPP_NUMBER_PLACEHOLDER` (business.ts) é um número FALSO: o botão de pré-encomenda gera `wa.me/<número>?text=<mensagem>` mas só funciona com o número real do WhatsApp Business do cliente. Não ligado a `/api/preorder` (por definição).
- `FooterCrumbs`: matter-js carregado sob demanda; loop para quando tudo adormece; toque nunca é interceptado (sem listeners matter em touch/wheel); reduced-motion => monte estático em SVG.
- ScrollReveal: gatilhos limitados ao scroll máximo (conteúdo no fim da página já dispara).
- Logo do rodapé: `public/brand/derived/logo-temp-wordmark.webp` (TEMP, branco sobre transparente, extraído do raster do SVG do cliente).
- Mensagem do WhatsApp SEM emoji, de propósito: testado em 2026-09, a página do WhatsApp (wa.me e api.whatsapp.com/send) estraga o emoji 🍪 e mostra "�". Se quiserem emoji, testar primeiro com o número real e num telemóvel.

## Drops (Ato III)
Entre o Manifesto e o Chouriço. Sabor ativo => `data-flavour` na secção => paleta por tokens (`[data-flavour=...]` em tokens.css) com transição CSS. Estado por hover/clique/teclado (radiogroup com setas). GSAP só nas entradas, Motion só na moeda/texto. Fotos: recortes do mapa de sabores (não há mais fotos por usar).

## Vocabulário (confirmado)
- Marca: **Cookie House** (nunca "Crookie House"). Produto: **crookie** = "um croissant recheado com massa de bolacha" / "a croissant filled with cookie dough" (fonte: NiT, nit.pt/comida/cafes-e-bares/pistacio-ou-chourico-a-nova-loja-de-lisboa-tem-cookies-com-sabores-bizarros; só este facto, sem citar o texto).
- O H1 do Hero diz "Cookie" (a marca), corrigido a pedido do cliente. "Crookie" só aparece como nome do produto.
- Não chamar "crookie" a uma cookie redonda (ex.: foto 2026-04-17 é uma cookie).

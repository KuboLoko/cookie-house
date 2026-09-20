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
Scaffold + Entrada + Hero + Ato I (Paris) + Manifesto prontos. Restantes secções por construir uma a uma em `src/components/sections/`.
Pendentes do cliente: logo vetorial (o de `content/brand.ts` é TEMP) e vídeos originais (bloqueiam a Anatomia).

## Convenções de scroll reveals
`ScrollReveal` (components/motion) envolve uma secção e anima filhos marcados com `data-reveal`, `data-reveal-clip`, `data-lines`/`data-line` e `data-parallax`. Só GSAP, só com prefers-reduced-motion: no-preference. Evitar `data-reveal` em elementos nos últimos ~10% da página (o gatilho é "top 88%"). Motion só em hover/clique (Sticker, MapCta), nunca no mesmo elemento que o GSAP.

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // O site ainda não está aprovado para indexação (só partilha por link direto).
  // Camada extra além do <meta name="robots"> nas páginas. REMOVER ao lançar (junto com robots.index=false nos layouts).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;

import { NextResponse } from "next/server";

// PLACEHOLDER: destino da caixa "Sugere um sabor". Sem persistência por agora.
export async function POST() {
  return NextResponse.json(
    { ok: false, error: "not_implemented" },
    { status: 501 },
  );
}

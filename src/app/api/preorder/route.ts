import { NextResponse } from "next/server";

// PLACEHOLDER: será ligado à automação de WhatsApp (n8n/WAHA) mais tarde.
// Sem lógica de backend por agora, de propósito.
export async function POST() {
  return NextResponse.json(
    { ok: false, error: "not_implemented" },
    { status: 501 },
  );
}

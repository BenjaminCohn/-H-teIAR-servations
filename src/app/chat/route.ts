import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, conversationId, tenantId } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    // ⚠️ IMPORTANT : tu mets ton endpoint Relevance / agent ici
    const r = await fetch(process.env.AGENT_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AGENT_API_KEY}`,
      },
      body: JSON.stringify({
        tenantId: tenantId ?? "demo",
        conversationId: conversationId ?? null,
        message,
      }),
    });

    if (!r.ok) {
      const text = await r.text();
      return NextResponse.json(
        { error: "Agent call failed", details: text },
        { status: 500 }
      );
    }

    const data = await r.json();

    // adapte selon le format de réponse de ton provider
    return NextResponse.json({
      reply: data.reply ?? data.output ?? data.message ?? "OK",
      conversationId: data.conversationId ?? conversationId ?? null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Server error", details: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}

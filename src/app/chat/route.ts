import { NextResponse } from "next/server";

function extractReply(data: any): string {
  return (
    data?.reply ??
    data?.output ??
    data?.output_text ??
    data?.message?.content ??
    data?.message ??
    data?.result?.message ??
    data?.result?.output ??
    data?.data?.reply ??
    ""
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const incoming = body?.message;

    const content =
      typeof incoming === "string"
        ? incoming
        : typeof incoming?.content === "string"
        ? incoming.content
        : null;

    if (!content) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const endpoint = process.env.AGENT_ENDPOINT;
    const apiKey = process.env.AGENT_API_KEY;
    const agentId = process.env.AGENT_ID;

    if (!endpoint || !apiKey || !agentId) {
      return NextResponse.json(
        {
          error: "Missing env vars",
          details: {
            hasEndpoint: Boolean(endpoint),
            hasApiKey: Boolean(apiKey),
            hasAgentId: Boolean(agentId),
          },
        },
        { status: 500 }
      );
    }

    const payload: any = {
      agent_id: agentId,
      message: { role: "user", content },
    };

    // optionnel si ton workspace Relevance gère un id conversation
    if (body?.conversationId) payload.conversation_id = body.conversationId;

    const r = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // IMPORTANT: pas Bearer
        Authorization: apiKey,
      },
      body: JSON.stringify(payload),
    });

    const raw = await r.text();

    if (!r.ok) {
      return NextResponse.json(
        { error: "Agent call failed", status: r.status, details: raw },
        { status: r.status }
      );
    }

    let data: any = {};
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      data = { raw };
    }

    const reply = extractReply(data) || data?.raw || "Réponse vide";

    return NextResponse.json({
      reply,
      conversationId: data?.conversation_id ?? body?.conversationId ?? null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Server error", details: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}

"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatWidget({ tenantId = "demo" }: { tenantId?: string }) {
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Bonjour 👋 Je peux prendre votre réservation (date, heure, nb de personnes, nom, téléphone).",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log, loading]);

  async function send() {
    const text = msg.trim();
    if (!text || loading) return;

    setLog((l) => [...l, { role: "user", text }]);
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId, message: text, conversationId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLog((l) => [
          ...l,
          { role: "assistant", text: "Oups, petite erreur technique. Réessaie." },
        ]);
        return;
      }

      setConversationId(data.conversationId ?? conversationId);

      setLog((l) => [
        ...l,
        { role: "assistant", text: data.reply ?? "OK" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* bouton flottant */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-black text-white px-4 py-3 shadow-lg"
        >
          Réserver une table
        </button>
      )}

      {/* fenêtre chat */}
      {open && (
        <div className="w-[360px] max-w-[90vw] rounded-2xl border bg-white shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="font-semibold">Hôte Restaurant</div>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-gray-500 hover:text-black"
            >
              Fermer
            </button>
          </div>

          <div className="h-[380px] overflow-auto px-4 py-3 space-y-2">
            {log.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <span
                  className={
                    "inline-block max-w-[85%] rounded-2xl px-3 py-2 text-sm " +
                    (m.role === "user"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-900")
                  }
                >
                  {m.text}
                </span>
              </div>
            ))}
            {loading && (
              <div>
                <span className="inline-block rounded-2xl px-3 py-2 text-sm bg-gray-100">
                  ...
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t p-3 flex gap-2">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
              placeholder="Ex: demain 19h30 pour 4, Dupont, 0662626262"
            />
            <button
              onClick={send}
              disabled={loading}
              className="rounded-xl bg-black text-white px-4 py-2 text-sm disabled:opacity-50"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

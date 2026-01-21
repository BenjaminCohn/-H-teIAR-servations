// src/app/page.tsx
const AGENT_URL =
  "https://app.relevanceai.com/agents/d7b62b/a3b5a990-0128-454e-994b-ffe5083772a2/ba5337db-a9dc-4550-9ea3-e4296fb7d479/embed-chat?hide_tool_steps=true&hide_file_uploads=true&hide_logo=true&hide_description=true&primary_color=%23685fff";

const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "#";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-20%] top-[-30%] h-130 w-130 rounded-full bg-violet-500/25 blur-[120px]" />
        <div className="absolute right-[-10%] top-[0%] h-130 w-130 rounded-full bg-emerald-400/15 blur-[120px]" />
        <div className="absolute left-[30%] bottom-[-35%] h-170 w-170 rounded-full bg-sky-400/10 blur-[140px]" />
      </div>

      {/* navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex w-[min(1120px,92vw)] items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-violet-500 to-emerald-400 font-black text-slate-950">
              IA
            </div>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight">
                Hôte IA Réservations
              </div>
              <div className="text-xs font-semibold text-slate-300">
                Démo live
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#demo"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-extrabold hover:bg-white/10"
            >
              Tester
            </a>

            <a
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-extrabold hover:bg-white/10"
            >
              Acheter ↗
            </a>

            <a
              href={AGENT_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-linear-to-r from-violet-500 to-emerald-400 px-4 py-2 text-sm font-extrabold text-slate-950 hover:opacity-95"
            >
              Ouvrir la démo ↗
            </a>
          </div>
        </div>
      </header>

      {/* hero + demo */}
      <section className="mx-auto w-[min(1120px,92vw)] py-10">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          {/* hero card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,.55)]">
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl sm:leading-[1.05]">
              Un agent IA qui prend vos réservations 24/7 et les note dans votre
              planning.
            </h1>
            <p className="mt-4 max-w-[62ch] text-base text-slate-300">
              Il collecte les infos (personnes, date, heure, nom, téléphone),
              confirme, puis enregistre automatiquement dans Google
              Calendar/Agenda. Idéal pour réduire les appels et éviter les
              erreurs.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="#demo"
                className="rounded-full bg-linear-to-r from-violet-500 to-emerald-400 px-5 py-2.5 text-sm font-extrabold text-slate-950 hover:opacity-95"
              >
                Voir l’agent en action
              </a>

              <a
                href={STRIPE_PAYMENT_LINK}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-extrabold hover:bg-white/10"
              >
                Acheter l’installation ↗
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-extrabold text-slate-300">
              {["✅ Réservations", "✅ Planning connecté", "✅ Escalade humain", "✅ Installation rapide"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          {/* demo card */}
          <div
            id="demo"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,.55)]"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Démo intégrée
                </div>
                <div className="font-extrabold">Parlez à l’agent</div>
              </div>
              <a
                href={AGENT_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-extrabold hover:bg-white/10"
              >
                Ouvrir ↗
              </a>
            </div>

            <div className="h-140 overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,.25)]">
              <iframe
                src={AGENT_URL}
                title="Démo agent IA RelevanceAI"
                className="h-full w-full border-0 bg-white"
                style={{ backgroundColor: "#fff" }}
                referrerPolicy="no-referrer"
                allow="microphone; clipboard-write"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
              />
            </div>

            <p className="mt-3 text-xs font-semibold text-slate-300">
              Si l’iframe ne s’affiche pas, clique sur “Ouvrir ↗”.
            </p>
          </div>
        </div>
      </section>

      {/* features */}
      <section id="fonctionnalites" className="mx-auto w-[min(1120px,92vw)] py-8">
        <h2 className="text-2xl font-black tracking-tight">Fonctionnalités</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            {
              title: "Prise de réservation",
              desc: "Questions rapides, confirmation, notes (allergies, terrasse, etc.).",
            },
            {
              title: "Écriture planning",
              desc: "Enregistre automatiquement dans Google Calendar avec un statut.",
            },
            {
              title: "Cas compliqués",
              desc: "Groupes/demandes spéciales : escalade vers un humain selon vos règles.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-extrabold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* pricing */}
      <section id="prix" className="mx-auto w-[min(1120px,92vw)] py-8">
        <h2 className="text-2xl font-black tracking-tight">Offre</h2>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-extrabold text-slate-300">
              Pack Installation
            </span>
            <div className="mt-3 text-4xl font-black tracking-tight">2 000€</div>
            <p className="mt-2 text-sm text-slate-300">
              Configuration + mise en place + tests + formation.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Agent configuré (scripts + règles + ton)</li>
              <li>• Connexion Google Calendar</li>
              <li>• Tests + ajustements</li>
              <li>• Guide + formation 30 min</li>
              <li>• Support 30 jours</li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={STRIPE_PAYMENT_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-linear-to-r from-violet-500 to-emerald-400 px-5 py-2.5 text-sm font-extrabold text-slate-950 hover:opacity-95"
              >
                Acheter maintenant ↗
              </a>

              <a
                href={AGENT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-extrabold hover:bg-white/10"
              >
                Tester la démo ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="mt-10 border-t border-white/10 py-8">
        <div className="mx-auto flex w-[min(1120px,92vw)] flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
          <div>© {new Date().getFullYear()} — Hôte IA Réservations</div>
          <div className="flex gap-4 font-semibold">
            <a href="#demo" className="hover:text-white">
              Démo
            </a>
            <a href="#prix" className="hover:text-white">
              Prix
            </a>
            <a href="#fonctionnalites" className="hover:text-white">
              Fonctionnalités
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

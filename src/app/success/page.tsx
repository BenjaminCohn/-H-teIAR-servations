// src/app/success/page.tsx
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const sessionIdRaw = searchParams?.session_id ?? searchParams?.sessionId;
  const sessionId = Array.isArray(sessionIdRaw) ? sessionIdRaw[0] : sessionIdRaw;

  if (!sessionId) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 text-white">
        <div className="max-w-xl w-full rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-bold">Paiement</h1>
          <p className="mt-2 text-white/70">Session manquante dans l’URL.</p>
          <a
            href="/"
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-black"
          >
            Retour à l’accueil
          </a>
        </div>
      </main>
    );
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 text-white">
        <div className="max-w-xl w-full rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-bold">Erreur</h1>
          <p className="mt-2 text-white/70">STRIPE_SECRET_KEY manquante côté serveur.</p>
        </div>
      </main>
    );
  }

  const stripe = new Stripe(stripeKey);

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const paid = session.payment_status === "paid";
  const email = session.customer_details?.email ?? session.customer_email ?? "—";

  return (
    <main className="min-h-screen flex items-center justify-center p-8 text-white">
      <div className="max-w-xl w-full rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-2xl font-bold">
          {paid ? "Paiement confirmé ✅" : "Paiement en attente ⏳"}
        </h1>

        <p className="mt-2 text-white/70">
          Email client : <span className="text-white">{email}</span>
        </p>

        <a
          href="/"
          className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-black"
        >
          Retour à l’accueil
        </a>

        <p className="mt-4 text-xs text-white/50 break-all">session_id: {sessionId}</p>
      </div>
    </main>
  );
}

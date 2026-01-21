// src/app/success/page.tsx
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  
});

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 text-white">
        <div className="max-w-xl w-full rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-bold">Paiement</h1>
          <p className="mt-2 text-white/70">Session manquante dans l’URL.</p>
          <a href="/" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-black">
            Retour à l’accueil
          </a>
        </div>
      </main>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const paid = session.payment_status === "paid";
  const email = session.customer_details?.email ?? "—";

  return (
    <main className="min-h-screen flex items-center justify-center p-8 text-white">
      <div className="max-w-xl w-full rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-2xl font-bold">
          {paid ? "Paiement confirmé ✅" : "Paiement en attente ⏳"}
        </h1>

        <p className="mt-2 text-white/70">
          Email client : <span className="text-white">{email}</span>
        </p>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
          <p className="font-semibold text-white">Prochaine étape :</p>
          <ol className="mt-2 list-decimal list-inside space-y-1">
            <li>On vous envoie le lien d’onboarding par email</li>
            <li>Vous connectez Google (Gmail + Calendar)</li>
            <li>On installe + test ensemble</li>
          </ol>
        </div>

        <a
          href="/"
          className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-black"
        >
          Retour à l’accueil
        </a>

        <p className="mt-4 text-xs text-white/50 break-all">
          session_id: {sessionId}
        </p>
      </div>
    </main>
  );
}

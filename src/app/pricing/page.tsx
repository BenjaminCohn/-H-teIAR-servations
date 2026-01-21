export default function PricingPage() {
  const payUrl = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl w-full rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold">Pack Installation</h1>
        <p className="mt-2 text-white/70">
          Installation + configuration + tests + formation.
        </p>

        <div className="mt-6 text-2xl font-semibold">2 000€</div>

        <a
          href={payUrl || undefined}
          target={payUrl ? "_blank" : undefined}
          rel={payUrl ? "noreferrer" : undefined}
          aria-disabled={!payUrl}
          className={`mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white text-black px-5 py-3 font-semibold ${
            !payUrl ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Payer maintenant
        </a>
            <p className="mt-2 text-xs text-white/60 break-all">
                payUrl = {payUrl ?? "VIDE"}
            </p>
        {!payUrl && (
          <p className="mt-3 text-sm text-red-300">
            Variable manquante : NEXT_PUBLIC_STRIPE_PAYMENT_LINK
          </p>
        )}
      </div>
    </main>
  );
}

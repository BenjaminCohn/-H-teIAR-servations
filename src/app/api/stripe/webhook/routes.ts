// src/app/api/stripe/webhook/route.ts
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs"; // IMPORTANT (pas edge)

// Stripe SDK
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Resend SDK
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing stripe-signature", { status: 400 });

  // ⚠️ Stripe exige le RAW body pour vérifier la signature
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new Response(`Webhook signature verification failed: ${err.message}`, {
      status: 400,
    });
  }

  // Paiement réussi (Payment Link / Checkout)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const buyerEmail = session.customer_details?.email ?? "email inconnu";
    const buyerName = session.customer_details?.name ?? "nom inconnu";
    const amountTotal = session.amount_total
      ? (session.amount_total / 100).toFixed(2)
      : "??";
    const currency = (session.currency ?? "eur").toUpperCase();

    const subject = "✅ Paiement reçu — Installation Agent Réservation";

    const text = [
      "✅ Nouveau paiement reçu",
      `Nom: ${buyerName}`,
      `Email: ${buyerEmail}`,
      `Montant: ${amountTotal} ${currency}`,
      `Session ID: ${session.id}`,
      "",
      "➡️ À faire : envoyer le lien d’onboarding + planifier la formation.",
    ].join("\n");

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM ?? "Agent Réservations <onboarding@resend.dev>",
        to: [process.env.ADMIN_EMAIL!],
        subject,
        text,
      });
    } catch (e: any) {
      // On répond quand même 200 à Stripe, sinon Stripe réessaie en boucle
      console.error("Resend email failed:", e?.message || e);
    }
  }

  return new Response("ok", { status: 200 });
}

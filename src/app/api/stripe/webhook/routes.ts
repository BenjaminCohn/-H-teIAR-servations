// src/app/api/stripe/webhook/route.ts
import Stripe from "stripe";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // important (pas edge)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function mailer() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing stripe-signature", { status: 400 });

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

  // Event principal : paiement réussi via Payment Link / Checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const buyerEmail = session.customer_details?.email ?? "email inconnu";
    const buyerName = session.customer_details?.name ?? "nom inconnu";
    const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : "??";
    const currency = (session.currency ?? "eur").toUpperCase();

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
      await mailer().sendMail({
        from: process.env.SMTP_FROM!,
        to: process.env.ADMIN_EMAIL!,
        subject: "✅ Paiement reçu — Installation Agent Réservation",
        text,
      });
    } catch (e: any) {
      // Même si l’email rate, on répond 200 à Stripe (sinon Stripe réessaie)
      console.error("Email send failed:", e?.message || e);
    }
  }

  return new Response("ok", { status: 200 });
}

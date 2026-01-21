import Stripe from "stripe";

export const runtime = "nodejs"; // important (pas edge)

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");

  if (!stripeKey) {
    return new Response("Missing STRIPE_SECRET_KEY", { status: 500 });
  }
  if (!sig || !webhookSecret) {
    return new Response("Missing stripe-signature or STRIPE_WEBHOOK_SECRET", {
      status: 400,
    });
  }

  const stripe = new Stripe(stripeKey); // 👈 créé ici, jamais au top-level

  const body = await req.text(); // texte brut indispensable
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email =
      session.customer_details?.email || session.customer_email || "unknown";

    console.log("✅ Paid session:", session.id, "email:", email);
  }

  return new Response("ok", { status: 200 });
}

import Stripe from "stripe";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");

  if (!stripeKey) return new Response("Missing STRIPE_SECRET_KEY", { status: 500 });
  if (!sig || !webhookSecret) return new Response("Missing signature or webhook secret", { status: 400 });

  const stripe = new Stripe(stripeKey);
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  return new Response("ok", { status: 200 });
}

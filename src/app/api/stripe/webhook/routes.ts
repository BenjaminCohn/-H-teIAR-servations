import Stripe from "stripe";

export const runtime = "nodejs"; // important (pas edge)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // si ça râle, enlève la ligne apiVersion
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return new Response("Missing stripe-signature or webhook secret", { status: 400 });
  }

  const body = await req.text(); // IMPORTANT: texte brut pour vérifier la signature

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ✅ Paiement OK (Payment Links => checkout.session)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email =
      session.customer_details?.email ||
      session.customer_email ||
      "unknown";

    // TODO: ici tu peux déclencher :
    // - envoi email onboarding
    // - stockage DB "paid"
    // - création d'un lien d'installation
    console.log("✅ Paid session:", session.id, "email:", email);
  }

  return new Response("ok", { status: 200 });
}

import db from "@/src/server/db";
import { stripe } from "@/src/server/lib/stripe";
import { OrderModel } from "@/src/server/model/Order";
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const buf = await buffer(req);

  let event = req.body;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as {
        metadata: { order_id: string };
      };
      const oid = paymentIntent.metadata.order_id;
      await db.connect();
      await OrderModel.findByIdAndUpdate(oid, {
        isPaid: true,
        paidAt: new Date().toISOString(),
      });
      await db.disconnect();
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.status(200).end();
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

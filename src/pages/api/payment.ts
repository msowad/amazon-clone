import db from "@/src/server/db";
import { stripe } from "@/src/server/lib/stripe";
import { isAuth } from "@/src/server/middleware/isAuth";
import { OrderModel } from "@/src/server/model/Order";
import { Order } from "@/src/types/Order";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(isAuth);

handler.post(async (req, res) => {
  const { orderId } = req.body;
  await db.connect();
  const order = (await OrderModel.findById(orderId)) as Order;
  await db.disconnect();

  if (!order) {
    res.status(404).json({
      error: "Order not found",
    });
    return;
  }

  if (order.paymentMethod !== "stripe") {
    res.status(400).json({ error: "Invalid payment method" });
    return;
  }
  // TODO: complete payment
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: order.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [item.image],
          },
        },
        tax_rates: [process.env.STRIPE_TAX_RATE_ID as string],
      })),
      shipping_rates: [process.env.STRIPE_SHIPPING_RATE_ID as string],
      mode: "payment",
      success_url: `${process.env.FRONT_END_URL}/orders/${order._id}?success=true`,
      cancel_url: `${process.env.FRONT_END_URL}/orders/${order._id}?success=false`,
      payment_intent_data: {
        metadata: {
          order_id: order._id.toString(),
        },
      },
    });
    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message);
    return;
  }
});

export default handler;

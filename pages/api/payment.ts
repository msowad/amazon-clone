import db from '@/src/server/db';
import { stripe } from '@/src/server/lib/stripe';
import { OrderModel } from '@/src/server/model/Order';
import { Order } from '@/src/types/Order';
import { STRIPE_CANCEL_URL, STRIPE_SUCCESS_URL } from '@/src/utils/constants';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { orderId } = req.body;
  await db.connect();
  const order = (await OrderModel.findById(orderId)) as Order;
  await db.disconnect();

  if (!order) {
    res.status(404).json({
      error: 'Order not found',
    });
    return;
  }

  if (order.paymentMethod !== 'stripe') {
    res.status(400).json({ error: 'Invalid payment method' });
    return;
  }
  // TODO: complete payment

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.items.map(item => ({
        price: String(item.price),
        quantity: item.quantity,
        images: [item.image],
        name: item.name,
      })),
      payment_intent_data: {
        metadata: {
          order_id: order._id,
        },
      },
      mode: 'payment',
      success_url: STRIPE_SUCCESS_URL(order._id),
      cancel_url: STRIPE_CANCEL_URL(order._id),
    });
    res.redirect(303, session.url!);
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message);
    return;
  }
});

export default handler;

import db from "@/src/server/db";
import { isAuth } from "@/src/server/middleware/isAuth";
import { OrderModel } from "@/src/server/model/Order";
import { SHIPPING_PRICE, TAX_RATE } from "@/src/utils/constants";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import nc from "next-connect";

interface ExtendedReq {
  user: Session["user"];
}

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (error, req, res) => {
    res.status(500).json({ error: error.message });
  },
});

handler.use<ExtendedReq>(isAuth);

handler.post<ExtendedReq>(async (req, res) => {
  const { cartItems, shippingDetails, paymentMethod } = req.body;
  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a: any, c: any) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = SHIPPING_PRICE;
  const taxPrice = round2(itemsPrice * TAX_RATE);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  await db.connect();
  const data = await OrderModel.create({
    user: req.user.id,
    items: cartItems,
    shippingDetails,
    price: {
      items: itemsPrice,
      shipping: shippingPrice,
      tax: taxPrice,
      total: totalPrice,
    },
    paymentMethod,
  });
  await db.disconnect();

  res.status(200).send(data);
});

export default handler;

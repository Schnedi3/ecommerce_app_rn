import { Request, Response } from "express";
import Stripe from "stripe";
import { getAuth } from "@clerk/express";

import { STRIPE_SECRET_KEY } from "../config/config";

const stripe = new Stripe(STRIPE_SECRET_KEY as string);

export const paymentSheet = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const { totalCart } = req.body;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-09-30.acacia" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCart * 100,
    currency: "eur",
    customer: customer.id,
    automatic_payment_methods: { enabled: true },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
};

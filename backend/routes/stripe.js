import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_KEY);

async function stripeRoute(fastify, options) {

  // PAYEMENT
  fastify.post("/payement", (req, res) => {
    stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "eur"
    }, (stripeErr, stripeRes) => {
      if (stripeErr) return res.status(500).send(stripeErr);
      res.status(200).send(stripeRes)
    });
  });
}

export default stripeRoute;
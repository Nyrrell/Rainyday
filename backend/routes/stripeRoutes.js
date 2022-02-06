import { stripePayement } from "../controllers/stripe.js";

export default async function stripeRoutes(fastify) {
  fastify.post("/payment", stripePayement);
};
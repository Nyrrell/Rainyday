import { createOrder, captureOrder } from "../controllers/checkout.js";

export default async function orderRoutes(fastify) {
  const { authenticate } = fastify;
  fastify.post('/create', { preValidation: [authenticate] }, createOrder);
  fastify.post('/capture', { preValidation: [authenticate] }, captureOrder);
};
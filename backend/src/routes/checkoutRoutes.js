import { createOrder, captureOrder, cancelOrder } from "../controllers/checkout.js";

export default async function orderRoutes(fastify) {
  const { authenticate } = fastify;
  fastify.post('/create', { preValidation: [authenticate] }, createOrder);
  fastify.post('/:id/capture', { preValidation: [authenticate] }, captureOrder);
  fastify.delete('/:id/cancel', { preValidation: [authenticate] }, cancelOrder);
};
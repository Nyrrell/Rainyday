import { allOrder, getOrder, getStat, monthlyIncome, updateOrder, userOrder } from "../controllers/order.js";

export default async function orderRoutes(fastify) {
  const { authenticate, isAdmin } = fastify;
  fastify.post('/', { preValidation: [authenticate, isAdmin] }, allOrder);
  fastify.post('/:id/find', { preValidation: [authenticate, isAdmin] }, getOrder);
  fastify.put('/:id', { preValidation: [authenticate, isAdmin] }, updateOrder);
  fastify.get('/find/', { preValidation: [authenticate] }, userOrder);
  fastify.get('/stats', { preValidation: [authenticate, isAdmin] }, getStat);
  fastify.get('/income', { preValidation: [authenticate, isAdmin] }, monthlyIncome);
};
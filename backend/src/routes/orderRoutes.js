import { allOrder, createOrder, getStat, monthlyIncome, updateOrder, userOrder } from "../controllers/order.js";

export default async function orderRoutes(fastify) {
  const { authenticate, isAdmin } = fastify;
  fastify.post('/checkout', { preValidation: [authenticate] }, createOrder);
  fastify.get('/', { preValidation: [authenticate, isAdmin] }, allOrder);
  fastify.put('/:id', { preValidation: [authenticate, isAdmin] }, updateOrder);
  fastify.get('/find/:id', { preValidation: [authenticate] }, userOrder);
  fastify.get('/stats', { preValidation: [authenticate, isAdmin] }, getStat);
  fastify.get('/income', { preValidation: [authenticate, isAdmin] }, monthlyIncome);
};
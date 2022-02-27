import {
  allOrder,
  createOrder,
  deleteOrder,
  getStat,
  monthlyIncome,
  updateOrder,
  userOrder
} from "../controllers/order.js";

export default async function orderRoutes(fastify) {
  const { authenticate, isAdmin } = fastify;
  fastify.post('/', { preValidation: [authenticate] }, createOrder);
  fastify.get('/', { preValidation: [authenticate, isAdmin] }, allOrder);
  fastify.put('/:id', { preValidation: [authenticate, isAdmin] }, updateOrder);
  fastify.delete('/:id', { preValidation: [authenticate, isAdmin] }, deleteOrder);
  fastify.get('/find/:id', { preValidation: [authenticate] }, userOrder);
  fastify.get('/stats', { preValidation: [authenticate, isAdmin] }, getStat);
  fastify.get('/income', { preValidation: [authenticate, isAdmin] }, monthlyIncome);
};
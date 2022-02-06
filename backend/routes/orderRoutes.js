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
  fastify.post('/', { preValidation: [fastify.authenticate] }, createOrder);
  fastify.put('/:id', { preValidation: [fastify.authenticate] }, updateOrder);
  fastify.delete('/:id', { preValidation: [fastify.authenticate] }, deleteOrder);
  fastify.get('/find/:id', { preValidation: [fastify.authenticate] }, userOrder);
  fastify.get('/', { preValidation: [fastify.authenticate] }, allOrder);
  fastify.get('/income', { preValidation: [fastify.authenticate] }, monthlyIncome);
  fastify.get('/stats', { preValidation: [fastify.authenticate] }, getStat);
};
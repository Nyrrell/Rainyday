import { createDiscount, deleteDiscount, getAllDiscounts, getDiscount, updateDiscount } from "../controllers/discount.js";

export default async function discountRoutes(fastify) {
  const { authenticate, isAdmin } = fastify;
  fastify.post('/', { preValidation: [authenticate, isAdmin] }, createDiscount);
  fastify.put('/:id', { preValidation: [authenticate, isAdmin] }, updateDiscount);
  fastify.delete('/:id', { preValidation: [authenticate, isAdmin] }, deleteDiscount);
  fastify.get('/find/:id', getDiscount);
  fastify.get('/', getAllDiscounts);
};
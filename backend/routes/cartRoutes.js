import { allUserCart, createCart, deleteCart, updateCart, userCart } from "../controllers/cart.js";

export default async function cartRoutes(fastify) {
  const { authenticate, isAdmin } = fastify;
  fastify.post('/', { preValidation: [authenticate] }, createCart);
  fastify.put('/:id', { preValidation: [authenticate] }, updateCart);
  fastify.delete('/:id', { preValidation: [authenticate] }, deleteCart);
  fastify.get('/find/:id', { preValidation: [authenticate] }, userCart);
  fastify.get('/', { preValidation: [authenticate, isAdmin] }, allUserCart);
};
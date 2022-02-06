import { allUserCart, createCart, deleteCart, updateCart, userCart } from "../controllers/cart.js";

export default async function cartRoutes(fastify) {
  fastify.post('/', { preValidation: [fastify.authenticate] }, createCart);
  fastify.put('/:id', { preValidation: [fastify.authenticate] }, updateCart);
  fastify.delete('/:id', { preValidation: [fastify.authenticate] }, deleteCart);
  fastify.get('/find/:id', { preValidation: [fastify.authenticate] }, userCart);
  fastify.get('/', { preValidation: [fastify.authenticate] }, allUserCart);
};
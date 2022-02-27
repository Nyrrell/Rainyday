import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.js";

export default async function productRoutes(fastify) {
  const { authenticate, isAdmin } = fastify;
  fastify.post('/', { preValidation: [authenticate, isAdmin] }, createProduct);
  fastify.put('/:id', { preValidation: [authenticate, isAdmin] }, updateProduct);
  fastify.delete('/:id', { preValidation: [authenticate, isAdmin] }, deleteProduct);
  fastify.get('/find/:id', getProduct);
  fastify.get('/', getAllProducts);
};
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.js";

export default async function productRoutes(fastify) {
  fastify.post('/', { preValidation: [fastify.authenticate] }, createProduct);
  fastify.put('/:id', { preValidation: [fastify.authenticate] }, updateProduct);
  fastify.delete('/:id', { preValidation: [fastify.authenticate] }, deleteProduct);
  fastify.get('/find/:id', getProduct);
  fastify.get('/', getAllProducts);
};
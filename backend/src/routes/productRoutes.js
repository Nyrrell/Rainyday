import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.js";

export default async function productRoutes(fastify) {
  const { authenticate, isAdmin, upload } = fastify;
  fastify.post('/', { preValidation: [authenticate, isAdmin], preHandler: upload }, createProduct);
  fastify.post('/all', { preValidation: [authenticate, isAdmin] }, getAllProducts); // TODO ALL PRODUCT ADMIN PAGE
  fastify.put('/:id', { preValidation: [authenticate, isAdmin], preHandler: upload }, updateProduct);
  fastify.delete('/:id', { preValidation: [authenticate, isAdmin] }, deleteProduct);
  fastify.get('/find/:id', getProduct);
  fastify.get('/', getAllProducts);
};
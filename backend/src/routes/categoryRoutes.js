import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.js";

export default async function categoryRoutes(fastify) {
  const { authenticate, isAdmin, upload } = fastify;
  fastify.post('/new', { preValidation: [authenticate, isAdmin], preHandler: upload }, createCategory);
  fastify.put('/:id', { preValidation: [authenticate, isAdmin], preHandler: upload }, updateCategory);
  fastify.delete('/:id', { preValidation: [authenticate, isAdmin] }, deleteCategory);
  fastify.post('/', { preValidation: [authenticate, isAdmin] }, getAllCategories);
  fastify.get('/:visible', getAllCategories);
  fastify.get('/find/:id', getCategory);
};
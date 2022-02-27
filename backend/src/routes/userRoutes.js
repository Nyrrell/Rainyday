import { deleteUser, getAllUsers, getUser, getUsersStats, updateUser } from "../controllers/user.js";

export default async function userRoutes(fastify) {
  const { authenticate, isAdmin } = fastify;
  fastify.put('/:id', { preValidation: [authenticate] }, updateUser);
  fastify.delete('/:id', { preValidation: [authenticate] }, deleteUser);
  fastify.get('/find/:id', { preValidation: [authenticate] }, getUser);
  fastify.get('/', { preValidation: [authenticate, isAdmin] }, getAllUsers);
  fastify.get('/stats', { preValidation: [authenticate, isAdmin] }, getUsersStats);
};
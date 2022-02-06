import { deleteUser, getAllUsers, getUser, getUsersStats, updateUser } from "../controllers/user.js";

export default async function userRoutes(fastify) {
  fastify.put('/:id', { preValidation: [fastify.authenticate] }, updateUser);
  fastify.delete('/:id', { preValidation: [fastify.authenticate] }, deleteUser);
  fastify.get('/find/:id', { preValidation: [fastify.authenticate] }, getUser);
  fastify.get('/', { preValidation: [fastify.authenticate] }, getAllUsers);
  fastify.get('/stats', { preValidation: [fastify.authenticate] }, getUsersStats);
};
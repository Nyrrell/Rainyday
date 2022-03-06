import { login, register, authorize } from "../controllers/auth.js";

export default async function authRoutes(fastify) {
  const { authenticate, isAdmin } = fastify;
  fastify.post("/login", login);
  fastify.post("/register", register);
  fastify.post("/authorize", { preValidation: [authenticate, isAdmin] }, authorize);
};
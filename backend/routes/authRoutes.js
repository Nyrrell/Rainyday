import { login, register } from "../controllers/auth.js";

export default async function authRoutes(fastify) {
  fastify.post("/register", register);
  fastify.post("/login", login);
};
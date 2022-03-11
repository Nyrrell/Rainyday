import fastifyStatic from 'fastify-static';
import multer from 'fastify-multer';
import mongoose from 'mongoose';
import fastify from 'fastify';
import jwt from 'fastify-jwt';
import path from "path";
import 'dotenv/config';

import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

import { authenticate, isAdmin, upload } from './helpers/decorate.js';

const server = fastify({ logger: false });

mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log('Mongo connect success'))
  .catch(reason => console.error(reason));

server.register(fastifyStatic, { root: path.join(path.resolve(), 'media'), prefix: '/media/' });
server.register(jwt, { secret: process.env.JWT_SEC });
server.register(multer.contentParser);

server.decorate('authenticate', authenticate);
server.decorate('isAdmin', isAdmin);
server.decorate('upload', upload);

server.register(productRoutes, { prefix: '/api/products' });
server.register(orderRoutes, { prefix: '/api/orders' });
server.register(userRoutes, { prefix: '/api/users' });
server.register(cartRoutes, { prefix: '/api/carts' });
server.register(authRoutes, { prefix: '/api/auth' });

server.listen(process.env.PORT || 5000, (err, address) => {
  if (err) {
    console.error(err);
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
})
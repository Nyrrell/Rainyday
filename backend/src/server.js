import fastifyStatic from 'fastify-static';
import multer from 'fastify-multer';
import mongoose from 'mongoose';
import fastify from 'fastify';
import jwt from 'fastify-jwt';
import path from "path";
import 'dotenv/config';

import {
  categoryRoutes,
  discountRoutes,
  checkoutRoutes,
  productRoutes,
  orderRoutes,
  userRoutes,
  authRoutes
} from './routes/routes.js';

import { authenticate, isAdmin, upload } from './decorate/index.js';

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

server.register(categoryRoutes, { prefix: '/api/categories' });
server.register(discountRoutes, { prefix: '/api/discounts' });
server.register(checkoutRoutes, { prefix: '/api/checkout' });
server.register(productRoutes, { prefix: '/api/products' });
server.register(orderRoutes, { prefix: '/api/orders' });
server.register(userRoutes, { prefix: '/api/users' });
server.register(authRoutes, { prefix: '/api/auth' });

server.listen(process.env.PORT || 5000, (err, address) => {
  if (err) {
    console.error(err);
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
})
import mongoose from "mongoose";
import fastify from "fastify";
import jwt from 'fastify-jwt';
import "dotenv/config";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = fastify({
  logger: false
});

mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log("Mongo connect success"))
  .catch(reason => console.error(reason));

app.register(jwt, { secret: process.env.JWT_SEC });

app.decorate("authenticate", async (req, res) => {
  await req.jwtVerify().catch((err) => res.send(err))
});

app.decorate("isAdmin", async (req, res) => {
  if (!req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'))
});

app.register(productRoutes, { prefix: '/api/products' });
app.register(orderRoutes, { prefix: '/api/orders' });
app.register(userRoutes, { prefix: '/api/users' });
app.register(cartRoutes, { prefix: '/api/carts' });
app.register(authRoutes, { prefix: '/api/auth' });

app.listen(process.env.PORT || 5000, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})
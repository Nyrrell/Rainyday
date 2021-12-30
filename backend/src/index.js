import mongoose from "mongoose";
import fastify from "fastify";
import jwt from 'fastify-jwt';
import "dotenv/config";

import productRoute from '../routes/product.js';
import orderRoute from '../routes/order.js';
import usersRoute from '../routes/user.js';
import authRoute from '../routes/auth.js';
import cartRoute from '../routes/cart.js';

const app = fastify({
  logger: false
});

mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log("Mongo connect success"))
  .catch(reason => console.error(reason));

app.register(jwt, { secret: process.env.JWT_SEC });

app.decorate("authenticate", async function(req, res) {
  try {
    await req.jwtVerify();
  } catch (err) {
    if (err.code === 'FAST_JWT_MALFORMED') res.status('403').send('Invalid Token');
    res.send(err);
  }
});

app.register(productRoute, { prefix: '/api/products' });
app.register(orderRoute, { prefix: '/api/orders' });
app.register(usersRoute, { prefix: '/api/users' });
app.register(cartRoute, { prefix: '/api/carts' });
app.register(authRoute, { prefix: '/api/auth' });

app.listen(process.env.PORT || 5000, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})
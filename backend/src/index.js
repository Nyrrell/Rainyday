import fastify from "fastify";
import mongoose from "mongoose";
import "dotenv/config";

import usersRoute from '../routes/user.js'
import authRoute from '../routes/auth.js'

const app = fastify({
  logger: true
});

mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log("Mongo connect success"))
  .catch(reason => console.error(reason));

app.register(usersRoute, { prefix: '/api/users' })
app.register(authRoute, { prefix: '/api/auth' })

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running")
});
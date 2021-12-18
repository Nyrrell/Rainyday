import fastify from "fastify";
import mongoose from "mongoose"

const app = fastify();

app.listen(5000, () => {
  console.log("Server is running")
});
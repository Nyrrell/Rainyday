import CryptoJS from "crypto-js";
import mongoose from "mongoose";
import 'dotenv/config';

import Category from "./src/models/Category.js";
import Product from "./src/models/Product.js";
import Order from "./src/models/Order.js";
import User from "./src/models/User.js";

mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log("Mongo connect success"))
  .catch(reason => console.error(reason));

import { users } from "./data.mjs";

for await (const user of users) {
  await new User({
    username: user['username'],
    email: user['email'],
    password: CryptoJS.AES.encrypt(user['password'], process.env.PASS_SEC),
    credit: user['credit'],
    isAdmin: user['isAdmin'] || false,
  }).save().catch(e => console.log(e))
}

import { categories } from "./data.mjs";

for await (const category of categories) {
  await new Category({
    title: category['cat'],
    desc: category['desc'],
    img: category['img'],
  }).save().catch(e => console.log(e))
}

import { products } from "./data.mjs";
for await (const product of products) {
  await new Product({
    title: product['title'],
    desc: product['desc'],
    img: product['img'],
    price: product['price'],
    quantity: product['stock'],
    category: await Category.findOne({ title: product['category'] }).then(c => c['title'])
  }).save().catch(e => console.log(e))
}

process.exit(1);


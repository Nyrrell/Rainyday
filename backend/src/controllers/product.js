import { existsSync, rmdirSync } from "fs";

import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  const { path } = req.files[0];
  newProduct['img'] = path;
  try {
    const product = await newProduct.save();
    res.send(product)
  } catch (e) {
    res.send(e);
  }
};

export const updateProduct = async (req, res) => {
  const data = req.body;
  if (req.files) data['img'] = req.files[0].path;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, {
        $set: data
      }, { new: true });

    res.send(product);
  } catch (e) {
    if (e.path === '_id') e['message'] = 'Invalid product ID';
    res.send(e);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    const path = `media/products/${req.params.id}`;
    if (existsSync(path)) rmdirSync(path, { recursive: true });
    res.send(product);
  } catch (e) {
    res.send(e);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (e) {
    res.send(e);
  }
};

export const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5)
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory]
        }
      });
    } else {
      products = await Product.find();
    }

    res.send(products);
  } catch (e) {
    res.send(e);
  }
};
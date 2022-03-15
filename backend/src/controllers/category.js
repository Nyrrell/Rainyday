import { existsSync, rmdirSync } from "fs";

import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  const { path } = req.files[0];
  newCategory['img'] = path;
  try {
    const category = await newCategory.save();
    res.send(category)
  } catch (e) {
    res.send(e);
  }
};

export const updateCategory = async (req, res) => {
  const data = req.body;
  if (req.files) data['img'] = req.files[0].path;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id, {
        $set: data
      }, { new: true });

    res.send(category);
  } catch (e) {
    if (e.path === '_id') e['message'] = 'Invalid category ID';
    res.send(e);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    const path = `media/categories/${req.params.id}`;
    if (existsSync(path)) rmdirSync(path, { recursive: true });
    res.send(category);
  } catch (e) {
    res.send(e);
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.send(category);
  } catch (e) {
    res.send(e);
  }
};

export const getAllCategories = async (req, res) => {
  const visible = req.params.visible === 'public';

  try {
    let categories;
    if (visible) categories = await Category.find().where({ visible: true });
    else categories = await Category.find();
    res.send(categories);
  } catch (e) {
    res.send(e);
  }
};
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  if (!req.user.isAdmin) return res.code(403).send('Unauthorized');

  const newProduct = new Product(req.body);

  try {
    const product = await newProduct.save();
    res.status(200).send(product)
  } catch (e) {
    res.status(500).send(e);
  }
};

export const updateProduct = async (req, res) => {
  if (!req.user.isAdmin) return res.code(403).send('Unauthorized');

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, {
        $set: req.body
      }, { new: true });

    res.status(200).send(product);
  } catch (e) {
    if (e.path === '_id') return res.status(500).send('Invalid product ID');
    res.status(500).send(e);
  }
};

export const deleteProduct = async (req, res) => {
  if (!req.user.isAdmin) return res.code(403).send('Unauthorized');

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).send(product) //TODO 'Product delete'
  } catch (e) {
    res.status(500).send(e);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e);
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

    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e);
  }
};
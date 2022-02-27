import Cart from "../models/Cart.js";

export const createCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const cart = await newCart.save();
    res.send(cart)
  } catch (e) {
    res.send(e);
  }
};

export const updateCart = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'));

  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id, {
        $set: req.body
      }, { new: true });

    res.send(cart);
  } catch (e) {
    res.send(e);
  }
};

export const deleteCart = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'));

  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    res.send(cart) //TODO 'Cart delete'
  } catch (e) {
    res.send(e);
  }
};

export const userCart = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'));

  try {
    const cart = await Cart.findOne({ userId: req.params.id }); //TODO VERIF FONCTIONNEMENT
    res.send(cart);
  } catch (e) {
    res.send(e);
  }
};

export const allUserCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.send(carts);
  } catch (e) {
    res.send(e);
  }
};
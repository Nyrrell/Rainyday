import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, {
        $set: req.body
      }, { new: true });

    res.send(order);
  } catch (e) {
    res.send(e);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order)
  } catch (e) {
    res.send(e);
  }
};

export const userOrder = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'));

  try {
    const order = await Order.find({ userId: req.params.id });
    res.send(order);
  } catch (e) {
    res.send(e);
  }
};

export const allOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (e) {
    res.send(e);
  }
};

export const getOrder = async (req, res) => {
  try {
    const { products: productsOrder } = await Order.findById(req.params.id);
    const products = await Product.find({ _id: { $in: productsOrder.map(p => p['productId']) } }).populate('cat');
    res.send(products)
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'))
  }
}

export const monthlyIncome = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.send(income);
  } catch (e) {
    res.send(e);
  }
};

export const getStat = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" }
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }
        }
      }
    ]);

    res.send(data);
  } catch (e) {
    res.send(e);
  }
};
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, {
        $set: req.body
      }, { new: true });

    res.send(order);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order)
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const userOrder = async (req, res) => {
  console.log(req.user.id)
  try {
    const orders = await Order.find({ customer: req.user.id }).populate({
      path: "products.productId",
      select: 'title img',
      populate: { path: 'category', select: 'title' }
    });

    const listOrders = orders.map(order => {
      const { paypalId, productsTotal, total, discount, state, createdAt, products } = order;
      return {
        id: paypalId, productsTotal, total, discount, state, createdAt,
        products: products.map(({ productId, quantity }) => ({
          article: productId['title'],
          category: productId['category']['title'],
          img: productId['img'],
          quantity
        }))
      };
    })
    res.send(listOrders);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const allOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate({ path: "customer", select: 'username email' });
    res.send(orders);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const getOrder = async (req, res) => {
  try {
    const { products: productsOrder } = await Order.findById(req.params.id);
    const products = await Product.find({ _id: { $in: productsOrder.map(p => p['productId']) } }).populate('category');
    res.send(products)
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
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
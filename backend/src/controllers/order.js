import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  const productsInCart = req.body;
  const checkout = { id: null, items: [], total: 0 };
  const notAvailable = [];

  try {
    const products = await Product.find({ _id: { $in: productsInCart.map(p => p['_id']) } });

    for await (const product of products) {
      const { _id, quantity } = product.toJSON();
      const inCart = productsInCart.find(pCart => pCart['_id'] === _id.toString());

      if (quantity < inCart['quantity']) {
        notAvailable.push({ _id: _id.toString(), quantity });
      } else {
        checkout['items'].push({
          name: product['title'],
          unit_amount: {
            value: product['price'],
            currency_code: 'EUR'
          },
          quantity: inCart['quantity'],
        });
        checkout['total'] += product['price'] * inCart['quantity'];
      }
    }
    if (notAvailable.length > 0) return res.code(403).send({ message: "Invalid available quantity", notAvailable });

    const newOrder = new Order({
      customer: req['user']['id'],
      products: checkout['items'],
      productsTotal: checkout['items'].reduce((prevValue, currentValue) => prevValue['quantity'] + currentValue['quantity']),
      total: checkout['total'],
      discount: '',
      discountAmount: 0,
    });

    console.log(newOrder)
    checkout['id'] = newOrder['_id'];
    res.send({ ...checkout });
  } catch (e) {
    res.send(e);
  }
};

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
    res.send(order) //TODO 'Order delete'
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
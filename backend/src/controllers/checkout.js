import Product from "../models/Product.js";
import Order from "../models/Order.js";

import { paypalCreateOrder } from "../services/paypalApi.js";

export const createOrder = async (req, res) => {
  const productsInCart = req.body;
  const checkout = { items: [], total: 0 };
  const notAvailable = [];
  try {
    const products = await Product.find({ _id: { $in: productsInCart.map(p => p['_id']) } });

    for await (const product of products) {
      const { _id, quantity } = product.toJSON();
      const inCart = productsInCart.find(pCart => pCart['_id'] === _id.toString());

      if (quantity < inCart['quantity']) {
        notAvailable.push({ _id: _id.toString(), quantity })
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

    if (notAvailable.length > 0)
      return res.code(403).send({ "product_in_stock": false, "message": "Invalid available quantity", notAvailable });

    const newOrder = new Order({
      customer: req['user']['id'],
      products: checkout['items'],
      productsTotal: checkout['items'].reduce((prevValue, currentValue) => prevValue['quantity'] + currentValue['quantity']),
      total: checkout['total'],
      discount: '',
      discountAmount: 0,
    });

    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: newOrder['_id'],
          amount: {
            value: checkout['total'],
            breakdown: {
              item_total: {
                value: checkout['total'],
                currency_code: 'EUR'
              }
            },
          },
          items: checkout['items']
        },
      ],
    }

    const { id } = await paypalCreateOrder(order)

    res.send();
  } catch
    (e) {
    res.send(e);
  }
};

export const captureOrder = (req, res) => {
  res.send()
}
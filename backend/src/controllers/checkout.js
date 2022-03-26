import Product from "../models/Product.js";
import Order from "../models/Order.js";

import { paypalCaptureOrder, paypalCreateOrder } from "../services/paypalApi.js";

export const createOrder = async (req, res) => {
  const productsInCart = req.body;
  const productsInCartID = productsInCart.map(p => p['_id']);

  const checkout = { items: [], total: 0 };
  const notAvailable = [];
  try {
    const products = await Product.find({ _id: { $in: productsInCartID } });

    for await (const product of products) {
      const { _id, quantity } = product.toJSON();
      const inCart = productsInCart.find(pCart => pCart['_id'] === _id.toString());

      if (quantity < inCart['quantity']) {
        notAvailable.push({ _id: _id.toString(), quantity })
      } else {
        checkout['items'].push({
          name: product['title'],
          sku: product['_id'].toString(),
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
      products: checkout['items'].map(i => {
        return { productId: i['sku'], quantity: i['quantity'] }
      }),
      productsTotal: checkout['items'].reduce((prevValue, currentValue) => prevValue + currentValue['quantity'], 0),
      total: checkout['total'],
      discount: '',
      discountAmount: 0,
    });

    const { id } = await paypalCreateOrder(checkout, newOrder['_id'].toString());
    newOrder['paypalId'] = id;

    await Product.bulkWrite(
      productsInCart.map(product => ({
        updateOne: {
          filter: { _id: product['_id'] },
          update: { $inc: { quantity: Number(-product['quantity']) } }
        }
      })));

    await newOrder.save();
    res.send(id);
  } catch (e) {
    if (e['message'] === "PAYPAL_ERROR") return res.code(502).send(e);
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const captureOrder = async (req, res) => {
  const paypalOrderID = req.params.id;

  try {
    const paypalOrder = await paypalCaptureOrder(paypalOrderID);

    if (paypalOrder['status'] !== "COMPLETED") return res.code(404).send("NOT_FOUND")// TODO

    const { shipping, reference_id } = paypalOrder['purchase_units'][0];
    await Order.findByIdAndUpdate(reference_id, {
      shipping: shipping,
      state: 'new'
    });

    res.send(paypalOrder['status'])
  } catch (e) {
    if (["PAYPAL_ERROR", "INSTRUMENT_DECLINED"].includes(e['message'])) return res.code(502).send(e);
    res.send(new Error('ERROR_OCCURRED'))
  }
}

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ paypalId: req.params.id });
    if (!order) return res.code(404).send(new Error('Invalid ID'));

    await Product.bulkWrite(
      order['products'].map(product => ({
        updateOne: {
          filter: { _id: product['productId'] },
          update: { $inc: { quantity: product['quantity'] } }
        }
      })));

    res.send();
  } catch (e) {
    console.log(e)
    res.send(new Error('ERROR_OCCURRED'));
  }
}
import Product from "../models/Product.js";

export const validateCart = async (req, res) => {
  const productsCart = req.body;
  const notAvailable = [];
  console.log(productsCart)

  try {
    const products = await Product.find({ _id: { $in: productsCart.map(p => p['_id']) } });

    for await (const product of products) {
      const { _id, quantity } = product.toJSON();
      quantity < productsCart.find(pCart => pCart['_id'] === _id.toString())['quantity']
      && notAvailable.push({ _id: _id.toString(), quantity })
    }

    console.log(notAvailable)

    if (notAvailable.length > 0) return res.code(403).send(notAvailable);
    const orderItems = products.map(p => ({
      name: p['title'],
      unit_amount: {
        value: p['price'],
        currency_code: 'EUR'
      },
      quantity: p['quantity'],
    }))

    console.log(orderItems)

  } catch (e) {
    console.log(e)
  }
};
import Product from "../models/Product.js";

export const validateCart = async (req, res) => {
  const productsInCart = req.body;
  const paypalCheckout = [];
  const notAvailable = [];

  try {
    const products = await Product.find({ _id: { $in: productsInCart.map(p => p['_id']) } });

    for await (const product of products) {
      const { _id, quantity } = product.toJSON();
      const inCart = productsInCart.find(pCart => pCart['_id'] === _id.toString());

      quantity < inCart['quantity']
        ? notAvailable.push({ _id: _id.toString(), quantity })
        : paypalCheckout.push({
          name: product['title'],
          unit_amount: {
            value: product['price'],
            currency_code: 'EUR'
          },
          quantity: inCart['quantity'],
        });
    }

    if (notAvailable.length > 0) return res.code(403).send({ message: "Invalid available quantity", notAvailable });
    console.log(paypalCheckout)
    res.send(paypalCheckout);
  } catch (e) {
    console.log(e)
  }
};
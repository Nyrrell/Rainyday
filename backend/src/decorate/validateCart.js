import Product from "../models/Product.js";

export const validateCart = async (req, res) => {
  const data = req.body;
  console.log(data)
  try {
    const products = await Product.find({
      _id: {
        $in: [data]
      }
    });
  } catch (e) {
    console.log(e)
  }
};
import Discount from "../models/Discount.js";

export const createDiscount = async (req, res) => {
  const newDiscount = new Discount(req.body);
  try {
    const discount = await newDiscount.save();
    res.send(discount)
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const updateDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(
      req.params.id, {
        $set: req.body
      }, { new: true });

    res.send(discount);
  } catch (e) {
    if (e.path === '_id') e['message'] = 'Invalid Discount ID';
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    res.send(discount);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const getDiscount = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    res.send(discount);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.send(discounts);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};
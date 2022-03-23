import mongoose from "mongoose";

const { model, Schema } = mongoose;

const OrderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        _id: false,
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
      }
    ],
    productsTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    discount: { type: String },
    discountAmount: { type: Number },
    paypalId: { type: String },
    shipping: { type: Object },
    state: {
      type: String,
      enum: {
        values: ['pending', 'new', 'delay', 'cancelled', 'fulfilled', 'error'],
        message: '{VALUE} is not supported'
      }, default: "pending"
    },
  },
  { timestamps: true }
);

export default model("Order", OrderSchema)
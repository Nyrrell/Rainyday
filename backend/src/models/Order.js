import mongoose from "mongoose";

const { model, Schema } = mongoose;

const OrderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
      }
    ],
    productsTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    discount: { type: String },
    discountTotal: { type: Number },
    address: { type: Object },
    state: {
      type: String,
      enum: {
        values: ['Pending', 'New', 'Delay', 'Cancel', 'Fulfilled'],
        message: '{VALUE} is not supported'
      }, default: "Pending"
    },
  },
  { timestamps: true }
);

export default model("Order", OrderSchema)
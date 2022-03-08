import mongoose from "mongoose";

const { model, Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
      }
    ],
    address: { type: Object, required: true },
    amount: { type: Number, required: true },
    discount: { type: String },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default model("Order", OrderSchema)
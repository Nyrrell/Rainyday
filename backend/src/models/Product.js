import mongoose from "mongoose";
import { slug } from "../helpers/slugify.js";

const { model, Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, require: true },
    discount: { type: Number, default: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

ProductSchema.virtual('slug').get(function () {
    return slug(this.title)
});

ProductSchema.virtual('cat', {
    ref: 'Category',
    localField: 'category',
    foreignField: '_id',
    justOne: true,
    get: (cat) => cat?.['title']
})

export default model("Product", ProductSchema)
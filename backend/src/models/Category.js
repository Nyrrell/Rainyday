import mongoose from "mongoose";

import { slug } from "../helpers/slugify.js";

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    visible: { type: Boolean, default: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
CategorySchema.virtual('slug').get(function () {
  return slug(this.title)
});

export default mongoose.model("Category", CategorySchema)
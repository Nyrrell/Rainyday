import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema)
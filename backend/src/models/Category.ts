import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ICategory extends Document {
  title: string;
  category: string;
  image: string;
  description: string;
  region?: string;
  iconName?: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true, unique: true, index: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    region: { type: String },
    iconName: { type: String },
  },
  { timestamps: true }
);

export const Category = models.Category || model<ICategory>("Category", CategorySchema);

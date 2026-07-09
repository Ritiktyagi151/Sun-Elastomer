import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IProduct extends Document {
  slug: string;
  brand: string;
  generic: string;
  form: string;
  strength?: string;
  pack?: string;
  category: string;
  composition: { ingredient: string; quantity: string; standard: string }[];
  compositionNote?: string;
  description?: string;
  image?: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    brand: { type: String, required: true },
    generic: { type: String, required: true },
    form: { type: String, required: true },
    strength: { type: String },
    pack: { type: String },
    category: { type: String, required: true, index: true },
    composition: [
      {
        ingredient: { type: String, required: true },
        quantity: { type: String, default: "" },
        standard: { type: String, default: "" },
      },
    ],
    compositionNote: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const Product = models.Product || model<IProduct>("Product", ProductSchema);

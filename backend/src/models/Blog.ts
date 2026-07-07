import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IBlog extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  category: string;
  featured: boolean;
}

const BlogSchema = new Schema<IBlog>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, required: true },
    readTime: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);

import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IInquiry extends Document {
  type: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  country?: string;
  product?: string;
  quantity?: string;
  message: string;
  date: string;
  status: "unread" | "read" | "resolved";
}

const InquirySchema = new Schema<IInquiry>(
  {
    type: { type: String, default: "Contact Form" },
    name: { type: String, required: true },
    company: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String },
    product: { type: String },
    quantity: { type: String },
    message: { type: String, required: true },
    date: { type: String, required: true },
    status: {
      type: String,
      enum: ["unread", "read", "resolved"],
      default: "unread",
      index: true,
    },
  },
  { timestamps: true }
);

export const Inquiry = models.Inquiry || model<IInquiry>("Inquiry", InquirySchema);

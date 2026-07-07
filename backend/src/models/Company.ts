import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ICompany extends Document {
  name: string;
  shortName: string;
  gstin: string;
  registrationDate: string;
  registrationType: string;
  constitution: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  footerDescription?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  whatsappUrl?: string;
  floatingWhatsapp?: string;
  floatingPhone?: string;
  floatingEmail?: string;
}

const CompanySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    gstin: { type: String, required: true },
    registrationDate: { type: String, required: true },
    registrationType: { type: String, required: true },
    constitution: { type: String, required: true },
    address: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    footerDescription: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    twitterUrl: { type: String, default: "" },
    whatsappUrl: { type: String, default: "" },
    floatingWhatsapp: { type: String, default: "" },
    floatingPhone: { type: String, default: "" },
    floatingEmail: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Company = models.Company || model<ICompany>("Company", CompanySchema);

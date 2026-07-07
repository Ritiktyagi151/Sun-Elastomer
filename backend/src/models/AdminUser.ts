import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IAdminUser extends Document {
  username: string;
  password?: string;
  name: string;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
  },
  { timestamps: true }
);

export const AdminUser = models.AdminUser || model<IAdminUser>("AdminUser", AdminUserSchema);
export default AdminUser;

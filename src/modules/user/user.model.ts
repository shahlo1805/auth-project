import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.interface";

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUserDocument>("User", UserSchema);

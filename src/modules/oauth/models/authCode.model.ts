import { Schema, model, Document } from "mongoose";

export interface IAuthCode extends Document {
  code: string;
  client_id: string;
  user_id: string;
  redirect_uri: string;
  scope: string[];
  expiresAt: Date;
  createdAt: Date;
}

const authCodeSchema = new Schema<IAuthCode>({
  code: { type: String, required: true, unique: true },
  client_id: { type: String, required: true },
  user_id: { type: String, required: true },
  redirect_uri: { type: String, required: true },
  scope: { type: [String], required: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

authCodeSchema.index({ code: 1 }, { unique: true, expireAfterSeconds: 0 }); 

export const AuthCode = model<IAuthCode>("AuthCode", authCodeSchema);
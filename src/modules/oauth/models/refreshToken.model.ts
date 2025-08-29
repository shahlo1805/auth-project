import { Schema, model, Document } from "mongoose";

export interface IRefreshToken extends Document {
  token_hash: string;
  client_id: string;
  user_id: string;
  scope: string[];
  expiresAt: Date;
  revokedAt?: Date | null;
  createdAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>({
  token_hash: { type: String, required: true, unique: true },
  client_id: { type: String, required: true },
  user_id: { type: String, required: true },
  scope: { type: [String], required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

refreshTokenSchema.index({ token_hash: 1 }, { unique: true });

export const RefreshToken = model<IRefreshToken>("RefreshToken", refreshTokenSchema);
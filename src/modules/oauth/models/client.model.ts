import { Schema, model, Document } from "mongoose";

export interface IOAuthClient extends Document {
  name: string;
  client_id: string;
  client_secret_hash: string;
  redirect_uris: string[];
  scopes: string[];
  is_confidential: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const clientSchema = new Schema<IOAuthClient>({
  name: { type: String, required: true },
  client_id: { type: String, required: true, unique: true },
  client_secret_hash: { type: String, required: true },
  redirect_uris: { type: [String], required: true },
  scopes: { type: [String], default: [] },
  is_confidential: { type: Boolean, default: true }
}, { timestamps: true });

export const OAuthClient = model<IOAuthClient>("OAuthClient", clientSchema);
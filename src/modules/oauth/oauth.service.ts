import crypto from "crypto";
import bcrypt from "bcrypt";
import { OAuthClient } from "./models/client.model";
import { AuthCode } from "./models/authCode.model";
import { RefreshToken } from "./models/refreshToken.model";
import { signAccessToken } from "../../config/jwt";

const AUTH_CODE_TTL_MS = Number(process.env.AUTH_CODE_TTL_MS || 5 * 60 * 1000);
const REFRESH_TOKEN_TTL_MS = Number(
  process.env.REFRESH_TOKEN_TTL_MS || 30 * 24 * 60 * 60 * 1000
);

export class OAuthService {
  static async createClient(
    name: string,
    redirect_uris: string[],
    scopes: string[] = [],
    isConfidential = true
  ) {
    const clientId = crypto.randomBytes(16).toString("hex");
    const clientSecretPlain = crypto.randomBytes(32).toString("hex");
    const client_secret_hash = await bcrypt.hash(clientSecretPlain, 10);

    const client = await OAuthClient.create({
      name,
      client_id: clientId,
      client_secret_hash,
      redirect_uris,
      scopes,
      is_confidential: isConfidential,
    });

    
    return {
      clientId,
      secret: clientSecretPlain,
      redirectUris: redirect_uris,
      scopes,
      name,
    };
  }

  static async findClientById(clientId: string) {
    return OAuthClient.findOne({ client_id: clientId });
  }

  static async generateAuthCode(
    clientId: string,
    userId: string,
    redirectUri: string,
    scope: string[]
  ) {
    const code = crypto.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + AUTH_CODE_TTL_MS);
    await AuthCode.create({
      code,
      client_id: clientId,
      user_id: userId,
      redirect_uri: redirectUri,
      scope,
      expiresAt,
    });
    return code;
  }

  static async consumeAuthCode(code: string) {
    const authCode = await AuthCode.findOne({ code });
    if (!authCode) throw new Error("invalid_code");
    if (authCode.expiresAt < new Date()) {
      await AuthCode.deleteOne({ _id: authCode._id });
      throw new Error("expired_code");
    }
    await AuthCode.deleteOne({ _id: authCode._id });
    return authCode;
  }

  static async exchangeCodeForTokens(authCodeDoc: any) {
    const accessToken = signAccessToken({
      sub: authCodeDoc.user_id,
      aud: authCodeDoc.client_id,
      scope: authCodeDoc.scope,
    });

    const refreshTokenPlain = crypto.randomBytes(48).toString("hex");
    const token_hash = await bcrypt.hash(refreshTokenPlain, 10);
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

    await RefreshToken.create({
      token_hash,
      client_id: authCodeDoc.client_id,
      user_id: authCodeDoc.user_id,
      scope: authCodeDoc.scope,
      expiresAt,
    });

    return {
      accessToken,
      refreshTokenPlain,
      expiresIn: 900,
      scope: authCodeDoc.scope.join(" "),
    };
  }

  static async verifyClientSecret(clientId: string, clientSecret: string) {
    const client = await OAuthClient.findOne({ client_id: clientId });
    if (!client) return false;
    return bcrypt.compare(clientSecret, client.client_secret_hash);
  }

  static async refreshWithRefreshToken(
    refreshTokenPlain: string,
    clientId: string
  ) {

    const tokens = await RefreshToken.find({ client_id: clientId });
    for (const t of tokens) {
      const match = await bcrypt.compare(refreshTokenPlain, t.token_hash);
      if (match) {
        if (t.expiresAt < new Date()) throw new Error("expired_refresh_token");
        await t.save();

        const accessToken = signAccessToken({
          sub: t.user_id,
          aud: t.client_id,
          scope: t.scope,
        });
        const newRefreshPlain = crypto.randomBytes(48).toString("hex");
        const newHash = await bcrypt.hash(newRefreshPlain, 10);
        const newExpiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);
        await RefreshToken.create({
          token_hash: newHash,
          client_id: t.client_id,
          user_id: t.user_id,
          scope: t.scope,
          expiresAt: newExpiresAt,
        });
        return {
          accessToken,
          refreshTokenPlain: newRefreshPlain,
          expiresIn: 900,
          scope: t.scope.join(" "),
        };
      }
    }
    throw new Error("invalid_refresh_token");
  }

  static async revokeRefreshToken(refreshTokenPlain: string, clientId: string) {
    const tokens = await RefreshToken.find({ client_id: clientId });
    for (const t of tokens) {
      if (await bcrypt.compare(refreshTokenPlain, t.token_hash)) {
        await t.save();
        return true;
      }
    }
    return false;
  }
}

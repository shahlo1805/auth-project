import { Request, Response } from "express";
import { OAuthService } from "./oauth.service";
import { verifyAccessToken } from "../../config/jwt";
import User from "../user/user.model";

export class OAuthController {
  static async createClient(req: Request, res: Response) {
    const { name, redirect_uris, scopes } = req.body;
    try {
      const result = await OAuthService.createClient(
        name,
        redirect_uris,
        scopes
      );
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
  
  static async authorize(req: Request, res: Response) {
    try {
      const { client_id, redirect_uri, scope } = req.query;

      const user = (req as any).user;
      if (!user) {
        return res.status(401).json({ error: "unauthorized" });
      }

      const client = await OAuthService.findClientById(client_id as string);
      if (!client) {
        return res.status(400).json({ error: "invalid_client" });
      }

      if (!client.redirect_uris.includes(redirect_uri as string)) {
        return res.status(400).json({ error: "invalid_redirect_uri" });
      }

      const code = await OAuthService.generateAuthCode(
        client.client_id,
        user.id,
        redirect_uri as string,
        (scope as string)?.split(" ") || []
      );

      const redirectUrl = `${redirect_uri}?code=${code}`;
      console.log(code);
      return res.redirect(302, redirectUrl);
    } catch (e: any) {
      return res
        .status(500)
        .json({ error: "server_error", message: e.message });
    }
  }
  
  static async token(req: Request, res: Response) {
    try {
      const { grant_type } = req.body;

      if (grant_type === "authorization_code") {
        const { client_id, client_secret, code, redirect_uri } = req.body;

        if (!client_id || !client_secret || !code || !redirect_uri) {
          return res.status(400).json({ error: "invalid_request" });
        }

        const isValid = await OAuthService.verifyClientSecret(
          client_id,
          client_secret
        );
        if (!isValid) return res.status(400).json({ error: "invalid_client" });

        const authCodeDoc = await OAuthService.consumeAuthCode(code);
        if (authCodeDoc.redirect_uri !== redirect_uri) {
          return res.status(400).json({ error: "invalid_redirect_uri" });
        }

        const tokens = await OAuthService.exchangeCodeForTokens(authCodeDoc);
        return res.json({
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshTokenPlain,
          token_type: "Bearer",
          expires_in: tokens.expiresIn,
          scope: tokens.scope,
        });
      }

      if (grant_type === "refresh_token") {
        const { client_id, client_secret, refresh_token } = req.body;

        if (!client_id || !client_secret || !refresh_token) {
          return res.status(400).json({ error: "invalid_request" });
        }

        const isValid = await OAuthService.verifyClientSecret(
          client_id,
          client_secret
        );
        if (!isValid) return res.status(400).json({ error: "invalid_client" });

        const tokens = await OAuthService.refreshWithRefreshToken(
          refresh_token,
          client_id
        );
        return res.json({
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshTokenPlain,
          token_type: "Bearer",
          expires_in: tokens.expiresIn,
          scope: tokens.scope,
        });
      }

      return res.status(400).json({ error: "unsupported_grant_type" });
    } catch (e: any) {
      return res.status(400).json({ error: e.message });
    }
  }

  
  static async userInfo(req: Request, res: Response) {
    try {
      const auth = req.headers.authorization;
      if (!auth) return res.status(401).json({ error: "missing_token" });

      const token = auth.split(" ")[1];
      const decoded: any = verifyAccessToken(token);

      const user = await User.findById(decoded.sub);
      if (!user) return res.status(404).json({ error: "user_not_found" });

      const result: { sub: string; email?: string; name?: string } = {
        sub: user._id as string,
      };
      decoded.scope.forEach((scope: string) => {
        if (scope === "email") result.email = user.email;
        if (scope === "name") result.name = user.name;
      });

      return res.json(result);
    } catch (e: any) {
      return res
        .status(401)
        .json({ error: "invalid_token", message: e.message });
    }
  }
}

import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: { userId: string; email?: string };
}

export const validateAuthorizeQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { client_id, redirect_uri, response_type } = req.query;

  if (!client_id || !redirect_uri || response_type !== "code") {
    return res.status(400).json({ error: "invalid_request" });
  }

  next();
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export interface AuthRequest extends Request {
  user?: { userId: string; email?: string };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  if (!header)
    return res.status(401).json({ message: "Authorization header missing" });

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid Authorization format" });
  }

  try {
    const decoded = jwt.verify(parts[1], ENV.JWT_SECRET) as {
      userId: string;
      email?: string;
    };
    req.user = decoded as any;
    next();
  } catch (err: any) {
    return res.status(401).json({ message: err.message || "Invalid token" });
  }
};

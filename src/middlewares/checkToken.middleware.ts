import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { AuthRequest } from "./validateQuery.middleware";

export const checkAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if (!header) {
      return res.status(401).json({ error: "unauthorized", message: "Token missing" });
    }
  
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "unauthorized", message: "Invalid format" });
    }
  
    try {
      const decoded = jwt.verify(parts[1], ENV.JWT_SECRET) as {
        userId: string;
        email?: string;
      };
  
      req.user = decoded;
      next();
    } catch (err: any) {
      return res.status(401).json({ error: "unauthorized", message: err.message });
    }
  };
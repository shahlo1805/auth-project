import jwt, { Secret, SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";
import { ENV } from "../config/env"; 

const ACCESS_TOKEN_TTL: StringValue = (ENV.JWT_EXPIRES_IN as StringValue) || "15m";

export function signAccessToken(payload: object, expiresIn: StringValue = ACCESS_TOKEN_TTL) {
  return jwt.sign(payload, ENV.JWT_SECRET as Secret, {
    algorithm: "HS256",
    expiresIn,
  } as SignOptions);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ENV.JWT_SECRET as Secret);
}


export function signRefreshToken(payload: object, expiresIn: StringValue = "30d") {
  return jwt.sign(payload, ENV.JWT_SECRET as Secret, {
    algorithm: "HS256",
    expiresIn,
  } as SignOptions);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, ENV.JWT_SECRET as Secret);
}
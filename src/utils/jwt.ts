import jwt from "jsonwebtoken";
import {ENV} from "../config/env";
import {StringValue} from "ms";

export const signJwt = (payload: object) =>
    jwt.sign(payload, ENV.JWT_SECRET as string, {expiresIn: ENV.JWT_EXPIRES_IN as StringValue});
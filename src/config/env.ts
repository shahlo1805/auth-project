import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1H",
};

if (!ENV.MONGO_URI) throw new Error("MONGO_URI is required in .env");
if (!ENV.JWT_SECRET) throw new Error("JWT_SECRET is required in .env");
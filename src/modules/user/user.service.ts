import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "./user.model";
import { ENV } from "../../config/env";
import type { StringValue } from "ms";

export class UserService {
  static async register(name: string, email: string, password: string) {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
  }

  static async login(email: string, password: string) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN as StringValue }
    );

    return { token };
  }

  static async getById(id: string) {
    return userModel.findById(id).select("name email -_id");
  }

  static async getAll() {
    return userModel.find(); 
  }
}

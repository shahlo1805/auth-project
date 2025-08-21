import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.register(name, email, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }


  static async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
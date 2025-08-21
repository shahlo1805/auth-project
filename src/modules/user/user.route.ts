import { Router } from "express";
import { UserController } from "./user.controller";
import { CreateUserDto, LoginUserDto } from "./dto";
import { validateDto } from "../../middlewares/validate";
import { auth } from "../../middlewares";

const userRoutes = Router();

userRoutes.post(
  "/register",
  validateDto(CreateUserDto),
  UserController.register
);
userRoutes.post("/login", validateDto(LoginUserDto), UserController.login);

userRoutes.get("/me", auth, UserController.profile);

export default userRoutes;

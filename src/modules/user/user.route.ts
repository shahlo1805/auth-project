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
)
.post("/login", validateDto(LoginUserDto), UserController.login)
.get("/me", auth, UserController.profile)
.get("/",auth, UserController.getAll)

export default userRoutes;

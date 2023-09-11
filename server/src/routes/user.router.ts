import { Router } from "express";
import { prisma } from "../utils/prisma";
import UserController from "../api/User/User.controller";
import AuthUserController from "../api/auth/AuthUser.Controller";
import { ensureAuthenticated } from "../middlewares/ensure.authenticated";
import RefreshTokenUserController from "../api/refreshTokenUser/RefreshTokenUser.Controller";

const userRoutes = Router();

userRoutes.post("/auth/login", AuthUserController.handle);
userRoutes.post("/auth/register", UserController.handle);
userRoutes.post("/refresh-token", RefreshTokenUserController.handle);

userRoutes.get("/users", ensureAuthenticated, async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

export { userRoutes };

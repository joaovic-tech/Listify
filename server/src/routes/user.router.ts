import "express-async-errors";
import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../utils/prisma";
import UserController from "../api/User/User.controller";
import AuthUserController from "../api/auth/AuthUser.Controller";
import { ensureAuthenticated } from "../middlewares/ensure.authenticated";
import RefreshTokenUserController from "../api/refreshTokenUser/RefreshTokenUser.Controller";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

const userRoutes = Router();

userRoutes.post("/auth/login", AuthUserController.handle);
userRoutes.post("/auth/register", UserController.handle);
userRoutes.post("/refresh-token", RefreshTokenUserController.handle);

userRoutes.get("/users", ensureAuthenticated, async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

userRoutes.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    return res.json({ status: "error", message: error.issues });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "Error",
    message: error.message,
  });

  next();
});

export { userRoutes };

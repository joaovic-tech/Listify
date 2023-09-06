import { Router } from "express";
import { prisma } from "../prisma";
import userController from "../entities/user/controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/user", userController.handle);
userRoutes.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

export { userRoutes };

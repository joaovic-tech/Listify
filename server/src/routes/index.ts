import { Router } from "express";
import { userRoutes } from "./user.router";

const routes = Router();

routes.use("/", userRoutes);

export { routes };

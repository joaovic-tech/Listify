import "express-async-errors";
import { Router } from "express";
import { userRoutes } from "./user.router";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏"
  });
});

routes.use("/", userRoutes);

export { routes };

import "express-async-errors";
import express from "express";
import { routes } from "./routes";
import ErrorsController from "./middlewares/Errors.Controller";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api", routes);
app.use("/", ErrorsController.execute);

app.listen(process.env.PORT || 8080, () => {
  console.log("🌐 listify API running!");
});

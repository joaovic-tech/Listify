import "express-async-errors";
import express from "express";
import { routes } from "./routes";
import ErrorsController from "./middlewares/Errors.Controller";

const app = express();

app.use(express.json());
app.use("/api", routes);
app.use("/", ErrorsController.execute);

app.listen(process.env.PORT || 8080, () => {
  console.log("HTTP server running!");
});

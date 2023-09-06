import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use("/api", routes);

app.listen(process.env.PORT || 8080, () => {
  console.log("HTTP server running!");
});

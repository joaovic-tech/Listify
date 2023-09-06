"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express3 = __toESM(require("express"));

// src/routes/index.ts
var import_express2 = require("express");

// src/routes/user.router.ts
var import_express = require("express");

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query", "error"]
});

// src/entities/user/interface/user.interface.ts
var import_zod = require("zod");
var userSchemas = import_zod.z.object({
  name: import_zod.z.string().min(3, { message: "O nome precisa de 3 caracteres." }).max(50, { message: "O nome precisar ter menos de 50 caracteres" }),
  username: import_zod.z.string().min(3, { message: "O nome precisa de 3 caracteres." }).max(50, { message: "O nome precisar ter menos de 50 caracteres" }),
  email: import_zod.z.string().email({ message: "E-mail inv\xE1lido" }),
  password: import_zod.z.string(),
  createAt: import_zod.z.date().optional(),
  updateAt: import_zod.z.date().optional()
});

// src/entities/user/useCases/user.create.ts
var CreateUserUseCase = class {
  async execute(userData) {
    const user = userSchemas.parse(userData);
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    });
    if (userAlreadyExists) {
      throw new Error("User Already Exist");
    }
    const userCreated = await prisma.user.create({
      data: user
    });
    return userCreated;
  }
};
var user_create_default = new CreateUserUseCase();

// src/entities/user/controllers/user.controller.ts
var import_zod2 = require("zod");
var UserController = class {
  async handle(req, res) {
    try {
      const result = await user_create_default.execute(req.body);
      return res.status(200).json(result);
    } catch (err) {
      if (err instanceof import_zod2.z.ZodError) {
        return res.json({ status: "error", message: err.issues });
      }
    }
  }
};
var user_controller_default = new UserController();

// src/routes/user.router.ts
var userRoutes = (0, import_express.Router)();
userRoutes.post("/user", user_controller_default.handle);
userRoutes.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

// src/routes/index.ts
var routes = (0, import_express2.Router)();
routes.use("/", userRoutes);

// src/server.ts
var app = (0, import_express3.default)();
app.use(import_express3.default.json());
app.use("/api", routes);
app.listen(process.env.PORT || 8080, () => {
  console.log("HTTP server running!");
});

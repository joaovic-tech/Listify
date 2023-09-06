"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/entities/user/interface/user.interface.ts
var user_interface_exports = {};
__export(user_interface_exports, {
  userSchemas: () => userSchemas
});
module.exports = __toCommonJS(user_interface_exports);
var import_zod = require("zod");
var userSchemas = import_zod.z.object({
  name: import_zod.z.string().min(3, { message: "O nome precisa de 3 caracteres." }).max(50, { message: "O nome precisar ter menos de 50 caracteres" }),
  username: import_zod.z.string().min(3, { message: "O nome precisa de 3 caracteres." }).max(50, { message: "O nome precisar ter menos de 50 caracteres" }),
  email: import_zod.z.string().email({ message: "E-mail inv\xE1lido" }),
  password: import_zod.z.string(),
  createAt: import_zod.z.date().optional(),
  updateAt: import_zod.z.date().optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userSchemas
});

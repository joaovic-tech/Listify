import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { generatedUUID } from "../config/generateUUID";
// import {v4 as uuidv4} from "uuid";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      status: "Error",
      message: "Token is missing",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, generatedUUID);
    next();
  } catch (error) {
    return res.status(401).json({
      status: "Error",
      message: "Token invalid",
    });
  }
}

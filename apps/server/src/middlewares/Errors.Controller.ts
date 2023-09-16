import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

class ErrorController {
  execute(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof z.ZodError) {
      return res.json({ status: "error", message: error.issues });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: error.message,
    });

    next();
  }
}

export default new ErrorController();

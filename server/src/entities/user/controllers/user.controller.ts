import { Request, Response } from "express";
import userCreate from "../useCases/user.create";
import { z } from "zod";

class UserController {
  async handle(req: Request, res: Response) {
    try {
      const result = await userCreate.execute(req.body);
      return res.status(200).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.json({ status: "error", message: err.issues });
      }
    }
  }
}

export default new UserController();

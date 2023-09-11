import { Request, Response } from "express";
import userCreate from "./UseCases/User.create";

class UserController {
  async handle(req: Request, res: Response) {
    const user = await userCreate.execute(req.body);

    return res.json(user);
  }
}

export default new UserController();

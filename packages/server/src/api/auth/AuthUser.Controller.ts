import { Request, Response } from "express";
import AuthUserUseCase from "./AuthUser.UseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const token = await AuthUserUseCase.execute(req.body);

    return res.json(token);
  }
}

export default new AuthenticateUserController();

import { Request, Response } from "express";
import RefreshTokenUserUseCase from "./RefreshTokenUser.UseCase";

class RefreshTokenUserController {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body;
    const token = await RefreshTokenUserUseCase.execute(refresh_token);

    return res.json(token);
  }
}

export default new RefreshTokenUserController();

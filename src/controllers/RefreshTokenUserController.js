const RefreshTokenUserUseCase = require("../useCases/RefreshTokenUserUseCase");

class RefreshTokenUserController {
  async handle(req = new Request(), res = new Response()) {
    const { refresh_token } = req.body;

    const refreshTokenUserUseCase = new RefreshTokenUserUseCase();
    const token = await refreshTokenUserUseCase.execute(refresh_token);

    return res.json(token);
  }
}

module.exports = new RefreshTokenUserController();

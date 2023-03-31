const dayjs = require('dayjs');
const TokenModel = require('../models/TokenModel');
const GenerateTokenProvider = require('../provider/GenerateTokenProvider');
const GenerateRefreshToken = require('../provider/GenerateRefreshToken');

module.exports = class RefreshTokenUserUseCase {
  constructor() {
    this.RefreshToken = new TokenModel().taskModel;
  }

  async execute(refresh_token = String) {
    console.log(refresh_token);

    const refreshToken = await this.RefreshToken.findOne({ _id: refresh_token });

    if (!refreshToken) {
      throw new Error('Refresh token invalid!');
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    if (refreshTokenExpired) {
      await this.RefreshToken.deleteMany({ userId: refreshToken.userId });


      const generateRefreshTokenProvider = new GenerateRefreshToken();
      const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId);
    
      return { token, refreshToken: newRefreshToken };
    }
    
    return { token };
    
  }
}

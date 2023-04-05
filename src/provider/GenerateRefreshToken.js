const dayjs = require('dayjs');
const TokenModel = require('../models/TokenModel');

class GenerateRefreshToken {
  constructor() {
    this.RefreshToken = new TokenModel().tokenModel;
  }

  async execute(userId = String) {
    const expiresIn = dayjs().add(1, 'hour').unix();

    const generateRefreshToken = await this.RefreshToken.create({
      userId,
      expiresIn,
    });
  
    return generateRefreshToken;
  }
}

module.exports = GenerateRefreshToken;
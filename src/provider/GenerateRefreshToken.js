const dayjs = require('dayjs');
const TokenModel = require('../models/TokenModel');

class GenerateRefreshToken {
  constructor() {
    this.RefreshToken = new TokenModel().taskModel;
  }

  async execute(userId = String) {
    const expiresIn = dayjs().add(15, 'second').unix();

    const generateRefreshToken = await this.RefreshToken.create({
      userId,
      expiresIn,
    });
  
    return generateRefreshToken;
  }
}

module.exports = GenerateRefreshToken;
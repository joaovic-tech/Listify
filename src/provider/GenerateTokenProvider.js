const { sign } = require('jsonwebtoken');
const TokenModel = require('../models/TokenModel');

class GenerateTokenProvider {
  constructor() {
    this.RefreshToken = new TokenModel().taskModel;
  }

  async execute(userId = String) {
    const token = sign({}, process.env.TOKEN_SECRET, {
      subject: userId,
      expiresIn: '5s',
    });

    return token;
  }
}

module.exports = GenerateTokenProvider;
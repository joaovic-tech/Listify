const mongoose = require('mongoose');

module.exports = class TokenModel {
  constructor() {
    this.tokenModel = mongoose.models.refresh_tokens || mongoose.model('refresh_tokens', this.tokenSchema);
    this.errors = [];
  }

  get tokenSchema() {
    return new mongoose.Schema({
      expiresIn: {
        type: Number,
        required: true,
      },
      user: {
        type: String,
        required: false,
        ref: 'users'
      },
      userId: {
        type: String,
        required: true,
        ref: 'users'
      },
    });
  }
}

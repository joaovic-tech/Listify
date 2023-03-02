require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class UserModel {
  constructor() {
    this.userModel = mongoose.models.TodoList || mongoose.model('User', this.userSchema);
    this.errors = [];
    this.userData = {};
  }

  get userSchema() {
    return new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      created_at: { 
        type: Date,
        default: Date.now
      },
      updated_at: { 
        type: Date,
        default: ''
      }
    });
  }

  async validateUsername(username) {
    if (!username) {
      this.errors.push('Nome de usuário é obrigatório');
    }
    if (username.length <= 2 || username.length >= 22) {
      this.errors.push('Nome de usuário precisa ter entre 2 até 22 carácteres');
    }
  }

  async emailExists(email) {
    return await this.userModel.findOne({ email: email });
  }

  async validateEmail(email) {
    const userExists = await this.emailExists(email);

    if (userExists) {
      this.errors.push('E-mail já existente!');
    }

    if (!email || !validator.isEmail(email)) {
      this.errors.push('E-mail inválido!');
    }
  }

  async validatePassword(password, confirmPassword) {
    const salt = await bcrypt.genSalt(12); // adiciona caracteres à mais na senha do usuário
    const passwordHash = await bcrypt.hash(password, salt);

    if (!password) {
      this.errors.push('Senha é obrigatório!');
    } 
    if (!confirmPassword) {
      this.errors.push('Senha de confirmação vazia!');
    }
    if (password !== confirmPassword) {
      this.errors.push('A senha de confirmação incorreta');
    }

    this.userData.password = passwordHash;
  }

  async validate({ username, email, password, confirmPassword }) {
    this.errors = [];
    await this.validateUsername(username);
    await this.validateEmail(email);
    await this.validatePassword(password, confirmPassword);
  }

  async create(userData) {
    this.userData = userData;
    await this.validate(this.userData);

    if (this.errors.length > 0) {
      return this.errors.join(', ');
    }
    
    try {
      const task = new this.userModel(this.userData);
      await task.save();
    } catch (error) {
      console.error(error);
    }
  }

  async validateLogin(email, password) {
    this.errors = [];
    const user = await this.emailExists(email);
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!email || !validator.isEmail(email)) {
      this.errors.push('E-mail inválido!');
    }
    if (!user) {
      this.errors.push('Conta não encontrada');
    }
    if (!password) {
      this.errors.push('Senha é obrigatório!');
    }
    if (!checkPassword) {
      this.errors.push('Senha inválida!');
    }

  }

  async login({ email, password }) {
    const user = await this.emailExists(email);
    await this.validateLogin(email, password);

    if (this.errors.length > 0) {
      return this.errors.join(', ');
    }

    try {
      const secret = process.env.SECRET;
      
      const token = jwt.sign({
        id: user._id,
      }, secret);

      return token;
    } catch (error) {
      console.error(error);
    }
  }
}

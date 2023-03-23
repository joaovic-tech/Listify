require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserModel {
  constructor() {
    this.userModel = mongoose.models.TodoList || mongoose.model('User', this.userSchema);;
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
      return
    }
    if (username.length <= 2 || username.length >= 22) {
      this.errors.push('Nome de usuário precisa ter entre 2 até 22 carácteres');
    }
  }

  async emailExists(value) {
    return await this.userModel.findOne({
      email: value
    });
  }

  async validateEmail(email) {
    const userExists = await this.emailExists(email);

    if (userExists) {
      this.errors.push('E-mail já existente!');
      return
    }

    if (!email || !validator.isEmail(email)) {
      this.errors.push('E-mail inválido!');
      return
    }
  }

  async validatePassword(password, confirmPassword) {
    const salt = await bcrypt.genSalt(12); // adiciona caracteres à mais na senha do usuário
    const passwordHash = await bcrypt.hash(password, salt);

    if (!password) return this.errors.push('Senha é obrigatório!');

    if (!confirmPassword) {
      this.errors.push('Senha de confirmação vazia!');
      return
    }

    if (password !== confirmPassword) {
      this.errors.push('As senhas não conferem');
      return
    }

    this.userData.password = passwordHash;
  }

  async validate({
    username,
    email,
    password,
    confirmPassword
  }) {
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


    if (!email) {
      this.errors.push('E-mail vazio!');
      return
    }

    if (!validator.isEmail(email)) {
      this.errors.push('E-mail vazio!');
      return
    }

    if (!user) {
      this.errors.push('Conta não encontrada');
      return
    }
    
    if (!password) {
      this.errors.push('Senha é obrigatório!');
      return
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      this.errors.push('Senha inválida!');
    }

  }

  async login({
    email,
    password
  }) {
    const user = await this.emailExists(email);
    await this.validateLogin(email, password);

    if (this.errors.length > 0) {
      return this.errors.join(', ');
    }

    try {
      const token = jwt.sign({
        id: user._id,
      }, process.env.TOKEN_SECRET);

      return {
        token,
        id: user._id,
        username: user.username,
        email: user.email
      }
    } catch (e) {
      this.errors.push('Token expirado ou inválido');
      return res.status(404).res.send('Falta criar a pág 404.');
    }
  }

  async getAllUsers() {
    const users = await this.userModel.find().select(['email', '-_id']);
    return users;
  }
}

module.exports = UserModel;
require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const GenerateRefreshToken = require('../provider/GenerateRefreshToken');
const GenerateTokenProvider = require('../provider/GenerateTokenProvider');

class UserModel {
  constructor() {
    this.userModel = mongoose.models.users || mongoose.model('users', this.userSchema);;
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
      profile_picture: {
        type: Buffer
      },
      created_at: {
        type: Date,
        default: Date.now
      },
      updated_at: {
        type: Date,
        default: ''
      },
      refresh_token: {
        type: String,
        required: false,
      },
    });
  }

  async validateUsername(username) {
    if (!username) {
      this.errors.push('Nome de usuário é obrigatório');
      return
    }

    const usernameExist = await this.usernameExists(username);

    if (usernameExist) {
      this.errors.push('Esse nome de usuário já existente!');
      return;
    }

    if (username.length <= 2 || username.length >= 22) {
      this.errors.push('Nome de usuário precisa ter entre 2 até 22 carácteres');
      return;
    }
  }

  async emailExists(email) {
    return await this.userModel.findOne({
      email: email
    });
  }

  async usernameExists(username) {
    return await this.userModel.findOne({
      username: username
    });
  }

  async validateEmail(email) {
    const emailExists = await this.emailExists(email);

    if (emailExists) {
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
      const user = new this.userModel(this.userData);
      await user.save();
    } catch (error) {
      console.error(error);
    }
  }

  async validateUpdate({
    username,
    email,
    password,
    confirmPassword
  }) {
    this.errors = [];

    if (!username) {
      this.errors.push('Nome de usuário é obrigatório');
      return;
    }

    if (username.length <= 2 || username.length >= 22) {
      this.errors.push('Nome de usuário precisa ter entre 2 até 22 carácteres');
      return;
    }

    if (!email || !validator.isEmail(email)) {
      this.errors.push('E-mail inválido!');
      return;
    }

    if (!password) return {
      username,
      email
    };

    await this.validatePassword(password, confirmPassword);
    return {
      username,
      email,
      password,
      confirmPassword
    };
  }

  async update(id, userData) {
    const newUserData = await this.validateUpdate(userData);

    if (this.errors.length > 0) {
      return this.errors.join(', ');
    }

    try {
      const user = await this.userModel.findOneAndUpdate({
        _id: id
      }, newUserData, {
        new: true
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
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
      const generateTokenProvider = new GenerateTokenProvider(); 
      const token = await generateTokenProvider.execute(user._id.toString());

      await mongoose.models.refresh_tokens.deleteMany({
        userId: user._id
      });
      
      const generateRefreshToken = new GenerateRefreshToken();
      const refreshToken = await generateRefreshToken.execute(user.username, user._id.toString());


      const userParams = {
        token,
        refreshToken,
        id: user._id,
        username: user.username,
        email: user.email,
      }

      console.log(userParams);

      return userParams;
    } catch (e) {
      this.errors.push('Token expirado ou inválido');
      console.log(e)
    }
  }
}

module.exports = UserModel;
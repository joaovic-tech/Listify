const UserModel = require('../models/UserModel');
const userModel = new UserModel();
const { sign } = require('jsonwebtoken');

class UserController {
  async create(req, res) {
    try {
      await userModel.create(req.body);

      if (userModel.errors.length > 0) {
        req.flash("errors", userModel.errors);
        req.session.save(() => {
          return res.redirect('/register');
        });
        return;
      }
      
      req.flash("success", 'Usuário criado com sucesso! - Faça login para continuar');
      req.session.save(() => {
        return res.redirect('/login');
      });
      return;
    } catch (e) {
      console.error(e);
    }
  }

  async update(req, res) {
    try {
  
      if (userModel.errors.length > 0) {
        console.log({
          success: false,
          Errors: userModel.errors
        });
        return res.json({
          success: false,
          Errors: userModel.errors
        });
      }
  
      const updatedUser = await userModel.update(req.params.id, req.body);
      req.session.user = {
        ...req.session.user,
        username: updatedUser.username,
        email: updatedUser.email
      };
  
      // gera novo token
      const token = sign({ id: updatedUser._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  
      // atualiza token na sessão do usuário
      req.session.user.token = token;
      req.session.save(() => {
        return res.redirect('/profile');
      });
    } catch (e) {
      console.error(e);
    }
  }

  async login(req, res) {
    try {
      const user = await userModel.login(req.body);

      if (userModel.errors.length > 0) {
        req.flash("errors", userModel.errors);
        req.session.save(() => {
          return res.redirect('/login');
        });
        return;
      }
      
      req.session.user = user;
      req.flash("success", `Seja bem-vindo(a) - ${req.session.user.username}`);
      req.session.save(() => {
        return res.redirect('/dashboard');
      });
      return;
    } catch (e) {
      console.error(e);
    }
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }
}

module.exports = new UserController();

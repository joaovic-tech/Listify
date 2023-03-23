const UserModel = require('../models/UserModel');
const userModel = new UserModel();

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
        return res.redirect('/tasks');
      });
      return;
    } catch (e) {
      console.error(e);
    }
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
}

module.exports = new UserController();

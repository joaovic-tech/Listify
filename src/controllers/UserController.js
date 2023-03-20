const UserModel = require('../models/UserModel');
const userModel = new UserModel();

class RegisterController {
  async create(req, res) {
    try {
      await userModel.create(req.body);

      if (userModel.errors.length > 0) {
        return res.status(422).json({ Errors: userModel.errors });
      }

      return res.json('usuário criado com sucesso!');
    } catch (e) {
      console.error(e);
    }
  }

  async login(req, res) {
    try {
      const user = await userModel.login(req.body);

      if (userModel.errors.length > 0) {
        return res.status(404).json({ Errors: userModel.errors });
      }

      console.log('usuário logado!', user);
      req.session.user = user;
      req.session.save(() => {
        return res.redirect(`/tasks`);
      });
    } catch (e) {
      console.error(e);
    }
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
}

module.exports = new RegisterController();

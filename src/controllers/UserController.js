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
      const token = await userModel.login(req.body);

      if (userModel.errors.length > 0) {
        return res.status(404).json({ Errors: userModel.errors });
      }

      return res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new RegisterController();

const UserModel = require('../models/UserModel');
const userModel = new UserModel();
const { sign } = require('jsonwebtoken');
const fs = require('fs');

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
    const { id } = req.params;

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
  
      const updatedUser = await userModel.update(id, req.body);
      req.session.user = {
        ...req.session.user,
        username: updatedUser.username,
        email: updatedUser.email
      };
  
      // gera novo token
      const token = sign({ id: updatedUser._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  
      // atualiza token na sessão do usuário
      req.session.user.token = token;
      req.flash("success", `Perfil atualizado!`);
      req.session.save(() => {
        return res.redirect('/profile');
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateImage(req, res) {
    const { id } = req.params;
    const { username, email } = req.body;
  
    if (!req.file) {
      return res.status(500).json({ error: 'Imagem não atualizada!' });
    }
  
    const userData = {
      username,
      email,
      profile_picture: req.file.path,
    };
  
    try {
      const updatedUserImage = await userModel.updateImage(id, userData);

      req.session.user = {
        ...req.session.user,
        username: updatedUserImage.username,
        email: updatedUserImage.email,
        profile_picture: userData.profile_picture,
      };
  
      // gera novo token
      const token = sign({ id: updatedUserImage._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  
      // atualiza token na sessão do usuário
      req.session.user.token = token;
      req.flash("success", `Foto de perfil atualizada!`);
      req.session.save(() => {
        return res.redirect('/profile');
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return req.flash("errors", 'ID do usuário Inválido!');
    }

    try {
      const userDeleted = await userModel.delete(id);
      if (!userDeleted) {
        return req.flash("errors", 'Usuário não deletado!');
      }
      
      req.session.destroy();
      return res.redirect('/login');
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        Error: 'Internal server error'
      });
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

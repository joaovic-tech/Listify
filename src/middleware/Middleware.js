const { verify } = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

class Middleware {
  async loginRequired(req, res, next) {
    if (!req.session.user) {
      req.flash("errors", `Você precisar está logado para acessar a página`);
      return req.session.save(() => res.redirect('/login'));
    }

    const { token } = req.session.user;

    try {
      verify(token, process.env.TOKEN_SECRET);
      
      return next();
    } catch (err) {
      const { id } = req.session.user;
      await new UserModel().deleteSessionUser(id);
      return req.session.save(() => res.redirect('/login/logout'));
    }
  }
}

module.exports = new Middleware();

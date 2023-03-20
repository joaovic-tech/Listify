class Middleware {
  loginRequired(req, res, next) {
    if (!req.session.user) {
      return req.session.save(() => res.redirect('/'));
    }
    next();
  }
}

module.exports = new Middleware();

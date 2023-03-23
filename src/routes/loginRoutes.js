const Route = require('express').Router;
const router = new Route();
const UserController = require('../controllers/UserController');

router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');

  return res.render('login', {
    errors: req.flash('errors'),
    success: req.flash('success'),
  });
});

router.post('/auth/login', UserController.login);
router.get('/login/logout', UserController.logout);

module.exports = router;
const Route = require('express').Router;
const router = new Route();
const { loginRequired } = require('../middleware/Middleware');
const UserController = require('../controllers/UserController');

router.get('/profile', loginRequired, (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  return res.render('profile', {
    errors: req.flash('errors'),
    success: req.flash('success'),
    user: req.session.user
  });
});
router.post('/edit/user/:id', loginRequired, UserController.update);

module.exports = router;
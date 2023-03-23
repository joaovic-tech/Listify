const UserController = require('../controllers/UserController');
const Route = require('express').Router;
const router = new Route();

router.get('/register', (req, res) => {
  return res.render('register', {
    errors: req.flash('errors'),
    success: req.flash('success'),
  });
});

router.post('/auth/register', UserController.create);

module.exports = router;

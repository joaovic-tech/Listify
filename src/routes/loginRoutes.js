const Route = require('express').Router;
const router = new Route();
const UserController = require('../controllers/UserController');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/auth/login', UserController.login);

module.exports = router;

const UserController = require('../controllers/UserController');
const Route = require('express').Router;
const router = new Route();

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/auth/register', UserController.create);

module.exports = router;

const UserController = require('../controllers/UserController');
const Route = require('express').Router;
const router = new Route();

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/auth/register', UserController.create);
router.get('/api/users', UserController.getAllUsers);

module.exports = router;

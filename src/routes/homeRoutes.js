const UserController = require('../controllers/UserController');

const Route = require('express').Router;
const router = new Route();

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/dashboard', (req, res) => {
  return res.render('home');
});

module.exports = router;

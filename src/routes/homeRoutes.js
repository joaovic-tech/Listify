const Route = require('express').Router;
const router = new Route();

router.get('/', (req, res) => {
  res.redirect('/dashboard');
});

router.get('/dashboard', (req, res) => {
  res.render('home');
});

module.exports = router;

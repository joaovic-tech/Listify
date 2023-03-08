const Route = require('express').Router;
const router = new Route();

router.get('/', (req, res) => {
  res.send('Falta criar a apresentação <a href="/login">Login</a>');
});

router.get('/', (req, res) => {
  res.send('Falta criar a apresentação <a href="/login">Login</a>');
});

module.exports = router;
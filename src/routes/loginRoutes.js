const Route = require('express').Router;
const router = new Route();

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;

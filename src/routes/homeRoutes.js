const Route = require('express').Router;
const router = new Route();

router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router;

const Route = require('express').Router;
const router = new Route();

router.get('/about', (req, res) => {
  return res.render('about');
});

module.exports = router;
const Route = require('express').Router;
const router = new Route();

router.get('/', (req, res) => {
  return res.render('home', {
    errors: req.flash('errors'),
    success: req.flash('success'),
  });
});

module.exports = router;
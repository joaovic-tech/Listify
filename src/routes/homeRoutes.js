const Route = require('express').Router;
const router = new Route();

router.get('/', function(req, res){
  res.render('home');
});

module.exports = router;
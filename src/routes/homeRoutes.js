const Route = require('express').Router;
const router = new Route();

router.get('/', function(req, res){
  return res.render('home');
});

module.exports = router;
const Route = require('express').Router;
const router = new Route();
const HomeController = require('../controllers/HomeController');

router.post('/task', HomeController.create);

module.exports = router;

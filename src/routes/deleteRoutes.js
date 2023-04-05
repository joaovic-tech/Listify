const Route = require('express').Router;
const router = new Route();
const UserController = require('../controllers/UserController');
const { loginRequired } = require('../middleware/Middleware');

router.post('/delete/user/:id', loginRequired, UserController.delete);

module.exports = router;
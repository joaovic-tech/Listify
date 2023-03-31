const Route = require('express').Router;
const router = new Route();
const RefreshTokenUserController = require('../controllers/RefreshTokenUserController');

router.post('/refresh-token', RefreshTokenUserController.handle);

module.exports = router;
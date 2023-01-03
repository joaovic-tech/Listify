const Route = require('express').Router;
const router = new Route();
const TaskController = require('../controllers/TaskController');

// router.post('/task', TaskController.create);
router.post('/task', (req, res) => {
  res.json(req.body);
});
router.delete('/task/:id', TaskController.delete);
router.get('/tasks', TaskController.index);

module.exports = router;

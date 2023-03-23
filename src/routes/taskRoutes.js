const Route = require('express').Router;
const router = new Route();
const TaskController = require('../controllers/TaskController');
const { loginRequired } = require('../middleware/Middleware');

router.post('/task', TaskController.create);
router.post('/task/edit/:id', TaskController.update);
router.delete('/task/:id', TaskController.delete);
router.get('/todoList', TaskController.index);
router.get('/tasks', loginRequired, async (req, res, next) => {
  return res.render('tasks', {
    errors: req.flash('errors'),
    success: req.flash('success'),
  });
});

module.exports = router;

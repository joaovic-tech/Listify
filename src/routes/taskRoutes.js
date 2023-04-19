const Route = require('express').Router;
const router = new Route();
const TaskController = require('../controllers/TaskController');
const { loginRequired } = require('../middleware/Middleware');

router.get('/dashboard', loginRequired, async (req, res, next) => {
  TaskController.createNotifications(req, res);
  return res.render('dashboard', {
    errors: req.flash('errors'),
    success: req.flash('success'),
    user: req.session.user
  });
});
router.post('/task', TaskController.create);
router.post('/task/edit/:id', TaskController.update);
router.post('/task/update_checked_task/:id', TaskController.updateTaskComplete);
router.delete('/task/:id', TaskController.delete);
router.get('/tasks', loginRequired, TaskController.index);

module.exports = router;

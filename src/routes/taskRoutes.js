const Route = require('express').Router;
const router = new Route();
const TaskController = require('../controllers/TaskController');

router.post('/task', TaskController.create);
router.post('/task/edit/:id', TaskController.update);
router.delete('/task/:id', TaskController.delete);
router.get('/todoList', TaskController.index);
router.get('/tasks', async (req, res) => {
  const user = req.session.user;

  if (!user) return res.redirect('/login');

  res.render('tasks');
});

module.exports = router;

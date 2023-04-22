const TaskModel = require('../models/TaskModel');
const task = new TaskModel();
const notifier = require('node-notifier');
const path = require('path');

class TaskController {
  async index(req, res) {
    const user = req.session.user;

    try {
      const tasks = await task.userTasks(user.username);
      return res.json(tasks);
    } catch (e) {
      console.error(e);
      return res.json({
        Error: e
      });
    }
  }

  async create(req, res) {
    try {
      await task.create(req.body);

      if (task.errors.length > 0) {
        console.log({
          success: false,
          Errors: task.errors
        });
        return res.json({
          success: false,
          Errors: task.errors
        });
      }

      return res.json('Criado com sucesso!');
    } catch (e) {
      console.error(e);
    }
  }

  async update(req, res) {
    try {
      await task.update(req.params.id, req.body);

      if (task.errors.length > 0) {
        console.log({
          success: false,
          Errors: task.errors
        });
        return res.json({
          success: false,
          Errors: task.errors
        });
      }

      return res.json('Tarefa editada com sucesso!');
    } catch (e) {
      console.error(e);
    }
  }

  async updateTaskComplete(req, res) {
    const {
      checked_task
    } = req.body;

    try {
      await task.updateTaskComplete(req.params.id, checked_task);

      if (task.errors.length > 0) {
        console.log({
          success: false,
          Errors: task.errors
        });
        return res.json({
          success: false,
          Errors: task.errors
        });
      }

      return res.json('Tarefa editada com sucesso!');
    } catch (e) {
      console.error(e);
    }
  }

  async delete(req, res) {
    const {
      id
    } = req.params;

    if (!id) {
      return res.status(400).json({
        error: 'ID Inválido'
      });
    }

    try {
      const taskDeleted = await task.delete(id);
      if (!taskDeleted) {
        return res.status(404).json({
          Error: 'Tarefa não encontrada'
        });
      }

      return res.json({
        Message: 'Tarefa deletada com sucesso!'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        Error: 'Internal server error'
      });
    }
  }

  async createNotifications(req, res) {
    const {
      username
    } = req.session.user;
    const tasks = await task.taskModel.find({
      username: username
    }).sort({
      checked_task: 1,
      important: -1,
      created_at: -1
    });
    const pendingTasks = [];

    tasks.forEach(task => {
      const today = new Date();
      const targetDate = new Date(task.conclusion);
      const daysAhead = 1;
      const difference = targetDate.getTime() - today.getTime();

      const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

      if (task.checked_task === 'off' && daysDifference <= daysAhead) {
        pendingTasks.push(task.task);
      }
    });

    if (!pendingTasks.length) return;
    
    if (pendingTasks.length === 1) {
      notifier.notify({
        title: 'Tarefa pendente',
        message: `Existem uma tarefa próxima do prazo de conclusão!`,
        sound: true,
        wait: true,
        timeout: 10000,
        icon: path.join(__dirname, '..', '..', '/frontend/assets/img/Logo.png'),
      });
    } else {
      notifier.notify({
        title: 'Tarefa pendente',
        message: `Existem ${pendingTasks.length} tarefas próximas do prazo de conclusão!`,
        sound: true,
        wait: true,
        timeout: 10000,
        icon: path.join(__dirname, '..', '..', '/frontend/assets/img/Logo.png'),
      });
    }
  }
}

module.exports = new TaskController();
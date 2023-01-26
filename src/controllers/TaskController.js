const TaskModel = require('../models/TaskModel');
const task = new TaskModel();

class TaskController {
  async index(req, res) {
    try {
      const tasks = await task.index();
      return res.json(tasks);
    } catch (e) {
      console.error(e);
      return res.json({
        Error: e
      });
    }
  }

  async create(req, res) {
    console.log(req.body);
    try {
      await task.create(req.body);

      if (task.errors.length > 0) {
        console.log({
          Errors: task.errors
        });
        return res.json({
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
          Errors: task.errors
        });
        return res.json({
          Errors: task.errors
        });
      }

      return res.json('Tarefa editada com sucesso!');
    } catch (e) {
      console.error(e);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

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
}

module.exports = new TaskController();

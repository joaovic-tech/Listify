const TaskModel = require('../model/TaskModel');

exports.create = async (req, res) => {
  try {
    const task = new TaskModel();
    await task.create(req.body);

    if (task.errors.length > 0) {
      return res.json({
        Errors: task.errors
      });
    }

    return res.json('Criado com sucesso!');
  } catch (e) {
    return console.log(e);
  }
}
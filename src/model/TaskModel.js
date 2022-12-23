const mongoose = require('mongoose');

class TaskModel {
  constructor() {
    this.taskModel = mongoose.models.TodoList || mongoose.model('TodoList', this.taskSchema);
    this.errors = [];
  }


  get taskSchema() {
    return new mongoose.Schema({
      task: {
        type: String,
        required: true,
      },
      important: {
        type: Boolean,
        required: false,
        default: false,
      },
      hours: {
        type: String,
        required: false,
        default: '',
      },
      repeat: {
        type: String,
        required: false,
        default: '',
      },
      reminder: {
        type: String,
        required: false,
        default: '',
      },
      conclusion: {
        type: String,
        required: false,
        default: '',
      },
    });
  }

  validate(taskData) {
    const { task } = taskData;

    if (!task) {
      this.errors.push('A tarefas é obrigatório!', String.prototype.trim(task));
    } else if (task.length <= 1) {
      this.errors.push('A tarefa deve ter mais de um carácter.');
    }
  }

  async create(taskData) {
    this.validate(taskData);

    if (this.errors.length > 0) {
      return this.errors.join(', ');
    }

    try {
      const task = new this.taskModel(taskData);
      await task.save();
    } catch (error) {
      console.error(error);
    } finally {
      mongoose.connection.close();
    }
  }

  async delete(id) {
    if (typeof id !== 'string') return;

    const task = await this.taskModel.findOneAndDelete({ _id: id });
    return task;
  }
}

module.exports = TaskModel;

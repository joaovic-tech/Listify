const mongoose = require('mongoose');

module.exports = class TaskModel {
  constructor() {
    this.taskModel = mongoose.models.TodoList || mongoose.model('Tasks', this.taskSchema);
    this.errors = [];
  }

  get taskSchema() {
    return new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      task: {
        type: String,
        required: true,
      },
      important: {
        type: String,
        default: '',
      },
      repeat: {
        type: Array,
        default: [],
      },
      notify: {
        type: String,
        default: '',
      },
      checked_task: {
        type: String,
        default: '',
      },
      conclusion: {
        type: String,
        default: '',
      },
      created_at: { 
        type: Date,
        default: Date.now
      },
      updated_at: { 
        type: Date,
        default: ''
      }
    });
  }

  validate(taskData) {
    const { task } = taskData;
    this.errors = [];

    if (!task) {
      this.errors.push('Tarefa não encontrada!');
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
    }
  }

  async update(id, taskData) {
    this.validate(taskData);

    if (this.errors.length > 0) {
      return this.errors.join(', ');
    }

    try {
      const task = await this.taskModel.findOneAndUpdate({ _id: id }, taskData, { new: true });
      return task;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateTaskComplete(id, value) {
    try {
      const task = await this.taskModel.updateOne({ _id: id }, { checked_task: value });
      return task;
    } catch (error) {
      this.errors.push('Não foi possível marca essa tarefa.');
      throw error;
    }
  }

  async delete(id) {
    if (typeof id !== 'string') return;

    const task = await this.taskModel.findOneAndDelete({ _id: id });
    return task;
  }

  async userTasks(username) {
    try {
      const tasks = await this.taskModel.find({ username: username }).sort({ checked_task: 1, important: -1, created_at: -1 });
      return tasks;
    } catch (error) {
      console.error(error);
    }
  }

}

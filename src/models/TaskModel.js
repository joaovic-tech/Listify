const mongoose = require('mongoose');

module.exports = class TaskModel {
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
        type: String,
        default: '',
      },
      repeat: {
        type: Array,
        default: [],
      },
      reminder: {
        type: Date,
        default: '',
      },
      conclusion: {
        type: Date,
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

  async delete(id) {
    if (typeof id !== 'string') return;

    const task = await this.taskModel.findOneAndDelete({ _id: id });
    return task;
  }

  async index() {
    try {
      const tasks = await this.taskModel.find().sort({ createdAt: -1 });
      return tasks;
    } catch (error) {
      console.error(error);
    }
  }

}

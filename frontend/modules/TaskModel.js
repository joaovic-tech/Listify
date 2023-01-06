import Message from '../utils/Message.js';
import Tasks from '../components/Tasks.js';

export default class TaskModel {
  constructor() {
    this.task = document.getElementById('task');
    this.ulTasks = document.getElementById('tasks');
    this.tasks = new Tasks();
  }

  validate() {
    if (!this.task.value) {
      Message.create('Este campo é obrigatório!');
      return false;
    }

    if (this.task.value.length <= 1) {
      Message.create('A tarefa deve ter mais de um carácter.');
      return false;
    }

    return true;
  }

  async getAllTasks() {
    try {
      const response = await fetch('/tasks');
      const data = await response.json();
      return data;
    } catch (e) { console.error(e) }
  }

  async showTasks() {
    const data = await this.getAllTasks();
    this.ulTasks.innerHTML = '';

    data.forEach((obj) => {
      this.tasks.createTask(obj);
    });
  }

  adjustFormValues(data) {
    const repeat = [];
    
    Object.keys(data).forEach(key => {
      if (key.startsWith('day-') || key === 'time-repeat') {
        repeat.push(key === 'time-repeat' ? `time-repeat: ${data[key]}` : key);
      }
    });

    delete data['day-sun'];
    delete data['day-mon'];
    delete data['day-tue'];
    delete data['day-wed'];
    delete data['day-thu'];
    delete data['day-fri'];
    delete data['day-sat'];
    delete data['time-repeat'];
    data.repeat = repeat;
    return data;
  }

  async create(form) {
    if (!this.validate()) return;

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const newData = this.adjustFormValues(data);
    
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch('/task', requestOptions);
      if (!response.ok) {
        throw new Error('Ocorreu um erro ao enviar o formulário');
      }
      const text = await response.text();
      if (text.includes('Errors')) {
        Message.create('Formulário não enviado!');
      } else {
        Message.create('Tarefa criada com sucesso!');
        this.showTasks();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id) {
    try {
      const response = await fetch(`/task/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Ocorreu um erro ao deletar a tarefa!');
      }
      const text = await response.text();
      if (text.includes('Errors')) {
        Message.create('Tarefa não deletada ou não encontrada!');
      } else {
        Message.create('Tarefa deletada!');
        this.showTasks();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

const taskModel = new TaskModel();
taskModel.showTasks();

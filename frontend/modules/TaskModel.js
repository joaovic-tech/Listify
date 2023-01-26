import Message from '../utils/Message.js';
import Tasks from '../components/Tasks.js';

export default class TaskModel {
  constructor() {
    this.ulTasks = document.getElementById('tasks');
    this.tasks = new Tasks();
  }

  validate(inputTask) {
    if (!inputTask.value) {
      Message.create('Descreva a sua tarefa!', 'amber');
      return false;
    }

    if (inputTask.value.length <= 1) {
      Message.create('A tarefa deve ter mais de um carácter.', 'amber');
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

  clearInputs() {
    const checkboxes = document.querySelectorAll('checkbox');
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => input.value = '');
    checkboxes.forEach(checkbox => checkbox.checked = false);
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
    data.conclusion ? data.conclusion = this.formatDates(data.conclusion) : null;
    data.reminder ? data.reminder = this.formatDates(data.reminder) : null;
    
    return data;
  }

  formatDates(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    return formattedDate;
  }

  async create(form) {
    const inputTask = form.querySelector('#task');
    if (!this.validate(inputTask)) return;

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
        Message.create('Formulário não enviado!', 'red');
      } else {
        Message.create('Tarefa criada com sucesso!', 'green');
        
        this.clearInputs();
        this.showTasks();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async update(form) {
    const inputTask = form.querySelector('#task');
    if (!this.validate(inputTask)) return;

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    data.task = inputTask.value
    
    const taskId = form.querySelector('#task-id').innerText.replace('id: ', '');
    
    const newData = this.adjustFormValues(data);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    try {
      const response = await fetch(`/task/edit/${taskId}`, requestOptions);
      
      if (!response.ok) {
        throw new Error('Ocorreu um erro ao enviar o formulário');
      }

      const text = await response.text();
      if (text.includes('Errors')) {
        Message.create('Formulário não enviado!', 'red');
      } else {
        Message.create('Tarefa atualizada!', 'green');
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
        Message.create('Tarefa não deletada ou não encontrada!', 'red');
      } else {
        Message.create('Tarefa deletada!', 'green');
        this.showTasks();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

const taskModel = new TaskModel();
taskModel.showTasks();

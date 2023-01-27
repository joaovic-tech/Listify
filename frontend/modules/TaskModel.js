import Message from '../utils/Message.js';
import Tasks from '../components/Tasks.js';
import ToggleStyles from '../utils/ToggleStyles.js';

export default class TaskModel {
  constructor() {
    this.ulTasks = document.getElementById('tasks');
    this.tasks = new Tasks();
    this.toggleStyles = new ToggleStyles();
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
    const inputs = document.querySelectorAll('input');
    const labels = document.querySelectorAll('#task-form label');
    const labelStyles = [
      'text-white',
      'text-blue-500',
      'bg-gray-900',
      'bg-gray-800',
      'border-gray-700',
      'border-blue-500'
    ];

    for (const label of labels) {
      if (label.classList.contains('border-blue-500')) {
        this.toggleStyles.toggle(label, labelStyles);
      }
    }

    inputs.forEach((input) => {
      if (input.type === 'checkbox') return input.checked = false;
      input.value = '';
    });
  }

  adjustFormValues(data) {
    const repeat = [];
    
    Object.keys(data).forEach(key => {
      if (key.startsWith('day-') || key === 'time-repeat') {
        delete data[key];
        key = key.replace('-edit', '');
        repeat.push(key === 'time-repeat' ? `time-repeat: ${data[key]}` : key);
      }
    });

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

    console.log(newData);

    this.clearInputs();
    console.log('Formulário limpo!');

    const formData2 = new FormData(form);
    const data2 = {};

    formData2.forEach((value, key) => {
      data2[key] = value;
    });

    console.log(`dados limpos:`);
    console.log(data2);

    return;

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

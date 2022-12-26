import Message from '../utils/Message.js';

export default class TaskModel {
  constructor() {
    this.form = document.getElementById('task-form');
    this.task = document.getElementById('task');
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

  async create() {
    const formData = new FormData(this.form);
    const data = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
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
        console.log(text);
        Message.create('Formulário não enviado!');
      } else {
        Message.create('Tarefa criada com sucesso!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  events() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validate() ? this.create() : null;
    });
  }


  init() {
    this.events();
  }
}

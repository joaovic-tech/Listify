import Message from '../utils/Message.js';
import CreateTasks from '../components/Tasks.js';

export default class TaskModel {
  constructor() {
    this.task = document.getElementById('task');
    this.tasks = document.getElementById('tasks');
    this.createTasks = new CreateTasks();
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
      this.tasks.innerHTML = '';
      
      data.forEach((obj) => {
        this.createTasks.init(obj);
      });

    } catch (e) { console.error(e) }
  }

  async create(form) {
    if (!this.validate()) return;
    if (!form) return;
    form.submit();
    return
    
    const formData = new FormData(form);
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
        Message.create('Formulário não enviado!');
      } else {
        Message.create('Tarefa criada com sucesso!');
        this.getAllTasks();
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
        this.getAllTasks();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

const taskModel = new TaskModel();
taskModel.getAllTasks();

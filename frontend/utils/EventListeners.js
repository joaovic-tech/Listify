import TaskModel from '../modules/TaskModel.js';
import ToggleStyles from './ToggleStyles.js';

export default class EventListeners {
  constructor() {
    this.taskModel = new TaskModel();
    this.toggleStyles = new ToggleStyles();
  }

  async taskDelete(button) {
    await this.taskModel.delete(button.id);
    this.closeTaskEditForm();
  }

  closeTaskEditForm() {
    const modal = document.querySelector('aside');
    modal.remove();
  }

  textHeader(id) {
    const header = document.createElement('header');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    
    header.classList.add(
      'grid',
      'gap-2',
      'mb-4',
    );

    h2.classList.add(
      'text-3xl',
      'text-white',
    );
    h2.textContent = 'Editar Tarefa';

    p.classList.add(
      'text-base',
      'text-zinc-400',
    );
    p.textContent = `id:${id}`;

    header.appendChild(h2)
    header.appendChild(p);
    return header;
  }

  clickEvents() {
    document.addEventListener('click', (e) => {
      const el = e.target;
      if (el.classList.contains('btn-delete')) return this.taskDelete(el);
      if (el.classList.contains('btn-close')) return this.closeTaskEditForm();
      if (el.classList.contains('input-task-create')) {
        const taskModal = document.getElementById('task-options');
        taskModal.classList.add('show');
      }
    });
  }

  submitEvents() {
    document.addEventListener('submit', (e) => {
      e.preventDefault();
      const el = e.target;
      if (el.id === 'task-form') this.taskModel.create(el);
      if (el.id === 'form-edit-task') this.taskModel.update(el);
    });
  }

  init() {
    this.clickEvents();
    this.submitEvents();
  }
}

const eventListeners = new EventListeners();
eventListeners.init();

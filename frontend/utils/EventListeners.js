import TaskModel from '../modules/TaskModel.js';
import TaskEditForm from '../components/TaskEditForm.js';
import Modal from '../components/Modal.js';
import IconClose from '../components/IconClose.js';
import ToggleStyles from './ToggleStyles.js';

export default class EventListeners {
  constructor() {
    this.taskModel = new TaskModel();
    this.taskEditForm = new TaskEditForm();
    this.modal = new Modal();
    this.toggleStyles = new ToggleStyles();
    this.stylesIconCheck = [
      'text-white',
      'text-blue-500',
      'bg-gray-900',
      'bg-gray-800',
      'border-gray-700',
      'border-blue-500'
    ];
  }

  taskDelete(button) {
    this.taskModel.delete(button.id);
  }

  closeModalForm() {
    const header = document.getElementById('header');
    const modal = document.getElementById('modal');
    const form = this.taskEditForm.resetForm();

    header.insertAdjacentElement('afterend', form);
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
      if (el.classList.contains('fa-xmark')) return this.closeModalForm();
      
      if (el.closest('#tasks li')) {
        const obj = { task: 'testes', id: 'asd54a6s5asd56' };
        const form = this.taskEditForm.create(obj);
        const modal = this.modal.create();
        const body = document.body;
        const iconClose = new IconClose().create();
        const textHeader = this.textHeader(obj.id);

        modal.appendChild(textHeader);
        modal.appendChild(iconClose);
        modal.appendChild(form);
        body.appendChild(modal);
      }
      
      if (el.id === 'task') {
        const taskModal = document.getElementById('task-modal');
        taskModal.classList.toggle('show');
      }

      if (el.classList.contains('label-important')) {
        this.toggleStyles.init(el, this.stylesIconCheck);
      }

      if (el.classList.contains('label-reminder')) {
        this.toggleStyles.init(el, this.stylesIconCheck);
      }
      
      if (el.classList.contains('label-repeat')) {
        this.toggleStyles.init(el, this.stylesIconCheck);
      }
    });
  }

  submitEvents() {
    document.addEventListener('submit', (e) => {
      e.preventDefault();
      const el = e.target;
      if (el.id === 'task-form' || el.id === 'task-form-edit') {
        this.taskModel.create(el);
      }
    });
  }

  init() {
    this.clickEvents();
    this.submitEvents();
  }
}

const eventListeners = new EventListeners();
eventListeners.init();

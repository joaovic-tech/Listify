import TaskModel from '../modules/TaskModel.js';
import ToggleStyles from '../utils/ToggleStyles.js';

class TaskEditFormModal {
  constructor() {
    this.taskModel = new TaskModel();
    this.stylesIconCheck = ['text-white', 'text-blue-500', 'bg-gray-900', 'bg-gray-800', 'border-gray-700', 'border-blue-500'];
    this.toggleStyles = new ToggleStyles();
  }

  createInput(text) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add(
      'w-full',
      'h-full',
      'p-2',
      'rounded-md',
      'bg-gray-700',
      'border-2',
      'border-solid',
      'border-gray-700',
      'focus:border-blue-500',
      'outline-0',
      'text-white'
    );
    input.value = text;
    return input
  }

  createForm() {
    const form = document.createElement('form');
    form.setAttribute('id', 'form-edit-task');
    form.classList.add('grid', 'gap-2');
    return form;
  }

  createP(text) {
    const p = document.createElement('p');
    p.classList.add('text-sm', 'text-zinc-400', 'text-bold');
    p.innerText = text;
    return p;
  }

  createHr() {
    const hr = document.createElement('hr');
    hr.classList.add('border-blue-500');
    return hr
  }

  createUl() {
    const ul = document.createElement('ul');
    ul.classList.add('grid', 'gap-2');
    return ul;
  }

  createLiImportant() {
    const li = document.createElement('li');
    li.classList.add('relative', 'flex', 'items-center', 'justify-center');
    return li;
  }

  createLi() {
    const li = document.createElement('li');
    li.classList.add('grid', 'gap-2');
    return li;
  }

  createInputImportant() {
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'important');
    input.setAttribute('id', 'important');
    input.setAttribute('hidden', true);
    return input;
  }

  createLabelImportant() {
    const label = document.createElement('label');
    label.setAttribute('for', 'important');
    label.setAttribute('id', 'label-important');
    label.classList.add(
      'label-important-edit',
      'show-span',
      'text-white',
      'rounded',
      'flex',
      'items-center',
      'justify-center',
      'w-6',
      'h-6',
      'p-4',
      'my-2',
      'hover:text-blue-500',
      'cursor-pointer',
      'bg-gray-800',
      'border-2',
      'border-gray-700'
    );
    return label;
  } 

  createIconImportant() {
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-star', 'pointer-events-none');
    return icon;
  }

  createSpanImportant() {
    const span = document.createElement('span');
    span.classList.add(
      'opacity-0', 'pointer-events-none', 'transition', 'duration-500', 'ease', 'absolute', '-top-6', 'left-auto', 'w-28', 'h-8', 'p-2', 'flex', 'items-center', 'justify-center', 'text-center', 'text-blue-500', 'bg-gray-800', 'rounded-lg', 'shadow-md'
    );
    span.textContent = 'Importante';
    return span;
  }

  createLabel(id, content) {
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.classList.add('text-base', 'text-white');
    label.innerText = content;
    return label;
  }

  createInputDateLocal(id, value) {
    const input = document.createElement('input');
    input.setAttribute('type', 'datetime-local');
    input.setAttribute('name', id);
    input.setAttribute('id', id);
    input.setAttribute('value', value);
    input.classList.add(
      'outline-0',
      'rounded',
      'flex',
      'items-center',
      'justify-center',
      'hover:text-blue-500',
      'cursor-pointer',
      'bg-gray-700',
      'text-white',
      'w-full',
      'h-8',
      'text-center'
    );
    return input;
  }

  createElementsModal(obj) {
    const { _id, task, important, conclusion, reminder, repeat, created_at } = obj;
    const form = this.createForm();
    const textId = this.createP(`id: ${_id}`);
    const textCreateAt = this.createP(`Tarefa criada em: ${created_at}`);
    const inputTask = this.createInput(task);
    const hr = this.createHr();
    const ul = this.createUl();
    const liImportant = this.createLiImportant();
    const inputImportant = this.createInputImportant();
    const labelImportant = this.createLabelImportant();
    const iconImportant = this.createIconImportant();
    const spanImportant = this.createSpanImportant();
    const liConclusion = this.createLi();
    const labelConclusion = this.createLabel('conclusion', conclusion);
    const inputConclusion = this.createInputDateLocal('conclusion', 'Data e hora da conclusão');
    const inputReminder = this.createInputDateLocal('reminder', 'Lembrete');
    const labelReminder = this.createLabel('reminder', reminder);
    const liReminder = this.createLi();
    const liRepeat = this.createLi();

    form.appendChild(textId);
    form.appendChild(textCreateAt);
    form.appendChild(inputTask);

    form.appendChild(hr);

    liImportant.appendChild(inputImportant);
    labelImportant.appendChild(iconImportant);
    labelImportant.appendChild(spanImportant);
    liImportant.appendChild(labelImportant);

    liConclusion.appendChild(labelConclusion);
    liConclusion.appendChild(inputConclusion);

    liReminder.appendChild(labelReminder)
    liReminder.appendChild(inputReminder)

    ul.appendChild(liImportant);
    ul.appendChild(liConclusion);
    ul.appendChild(liReminder);

    form.appendChild(ul);
    return form;
  }

  async createModal(taskId) {
    const main = document.querySelector('main');
    const tasksArray = await this.taskModel.getAllTasks();
    const obj = tasksArray.find(task => task._id === taskId);
    const content = this.createElementsModal(obj);
    const modalFormExist = document.getElementById('modal-edit');
    modalFormExist ? modalFormExist.remove() : null;
    const modalForm = document.createElement('aside');
    modalForm.setAttribute('id', 'modal-edit');
    modalForm.classList.add(
      'w-96',
      'backdrop-blur-md',
      'bg-gray-800/50',
      'p-4',
      'rounded',
      'shadow-xl',
      'shadow-gray-900',
      'transition',
      'ease'
    );
    modalForm.appendChild(content);
    main.appendChild(modalForm);
  }

  clickEvent() {
    document.addEventListener('click', (e) => {
      const el = e.target;
      el.classList.contains('li-task') ? this.createModal(el.id) : null
      const elIsLabelImportant = el.classList.contains('label-important-edit');
      elIsLabelImportant ? this.toggleStyles.toggle(el, this.stylesIconCheck) : null;
    });
  }

  init() {
    this.clickEvent();
  }
}

const taskEditFormModal = new TaskEditFormModal();
taskEditFormModal.init();

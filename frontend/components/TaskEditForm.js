import TaskModel from '../modules/TaskModel.js';
import ToggleStyles from '../utils/ToggleStyles.js';

class TaskEditForm {
  constructor() {
    this.taskModel = new TaskModel();
    this.stylesIconCheck = ['text-white', 'text-blue-500', 'bg-gray-900', 'bg-gray-800', 'border-gray-700', 'border-blue-500'];
    this.toggleStyles = new ToggleStyles();
    this.inputStyles = [
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
    ];
  }

  createInputTaskId(id) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'input-edit-task-id');
    input.value = id;
    return input;
  }

  createInput(text) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'task');
    input.setAttribute('id', 'task');
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
    return input;
  }

  createForm() {
    const form = document.createElement('form');
    form.setAttribute('id', 'form-edit-task');
    form.classList.add('grid', 'gap-2');
    return form;
  }

  createP(id, text) {
    const p = document.createElement('p');
    p.classList.add('text-sm', 'text-zinc-400', 'text-bold');
    p.id = id;
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

  createLiImportantAndNotify() {
    const li = document.createElement('li');
    li.classList.add('relative', 'flex', 'items-center', 'justify-center');
    return li;
  }

  createLi() {
    const li = document.createElement('li');
    li.classList.add('grid', 'gap-2');
    return li;
  }

  createInputImportantAndNotify(text) {
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('hidden', true);
    text === 'on' ? input.setAttribute('checked', true) : null;
    return input;
  }

  createLabelImportantAndNotify(text) {
    const label = document.createElement('label');
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
    text === 'on' ? this.toggleStyles.toggle(label, this.stylesIconCheck) : null;
    return label;
  }

  createIcon(faClass, nameIcon) {
    const i = document.createElement('i');
    i.classList.add(faClass, nameIcon, 'pointer-events-none');
    return i;
  }

  createButton(id, className, color, icon, text) {
    const button = document.createElement('button');
    className === 'btn-save' ? button.type = 'submit' : button.type = 'button';
    button.id = id;
    button.classList.add(
      className,
      'flex',
      'justify-center',
      'items-center',
      'text-center',
      'gap-2',
      'py-2',
      'px-3',
      'rounded',
      `bg-${color}-600`,
      'text-white',
      `hover:bg-${color}-700`,
      `focus:bg-${color}-700`
    );
    button.appendChild(icon);
    button.innerHTML += text;
    return button;
  }

  createSpanImportantAndNotify() {
    const span = document.createElement('span');
    span.classList.add(
      'opacity-0', 'pointer-events-none', 'transition', 'duration-500', 'ease', 'absolute', '-top-6', 'left-auto', 'w-28', 'h-8', 'p-2', 'flex', 'items-center', 'justify-center', 'text-center', 'text-blue-500', 'bg-gray-800', 'rounded-lg', 'shadow-md'
    );
    return span;
  }

  createLabel(content) {
    const label = document.createElement('label');
    label.classList.add('text-base', 'text-white');
    label.innerText = content;
    return label;
  }

  createInputDateLocal(id, dateString) {
    const input = document.createElement('input');
    input.setAttribute('type', 'datetime-local');
    input.setAttribute('name', id);
    input.setAttribute('id', id);
    this.toggleStyles.add(input, this.inputStyles)

    dateString = dateString.replace(' ', 'T');
    dateString = dateString.replace(/\//g, "-");
    dateString = dateString.split('T');
    const date = dateString[0];
    const time = dateString[1];
    const dateElements = date.split("-");
    const formattedDate = dateElements.reverse().join("-");
    input.value = `${formattedDate}T${time}`;
    return input;
  }

  createImportantContent(important) {
    const li = this.createLiImportantAndNotify();
    const inputImportant = this.createInputImportantAndNotify(important);


    inputImportant.setAttribute('name', 'important');
    inputImportant.setAttribute('id', 'important-edit');

    const labelImportant = this.createLabelImportantAndNotify(important);

    labelImportant.setAttribute('for', 'important-edit');
    labelImportant.setAttribute('id', 'label-important');

    const iconImportant = this.createIcon('fa-solid', 'fa-star');

    const spanImportant = this.createSpanImportantAndNotify();
    spanImportant.textContent = 'Importante';

    li.appendChild(inputImportant);
    labelImportant.appendChild(iconImportant);
    labelImportant.appendChild(spanImportant);
    li.appendChild(labelImportant);
    return li;
  }

  createNotifyContent(notify) {
    const li = this.createLiImportantAndNotify();
    const inputNotify = this.createInputImportantAndNotify(notify);


    inputNotify.setAttribute('name', 'notify');
    inputNotify.setAttribute('id', 'notify-edit');

    const labelNotify = this.createLabelImportantAndNotify(notify);


    labelNotify.setAttribute('for', 'notify-edit');
    labelNotify.setAttribute('id', 'label-notify');

    const iconNotify = this.createIcon('fa-solid', 'fa-bell');

    const spanNotify = this.createSpanImportantAndNotify();
    spanNotify.textContent = 'Notificar';

    li.appendChild(inputNotify);
    labelNotify.appendChild(iconNotify);
    labelNotify.appendChild(spanNotify);
    li.appendChild(labelNotify);
    return li;
  }

  createConclusionContent(conclusion) {
    const labelConclusion = this.createLabel('Data e hora da conclusão');
    const inputConclusion = this.createInputDateLocal('conclusion', conclusion);

    const li = this.createLi();
    li.appendChild(labelConclusion);
    li.appendChild(inputConclusion);
    return li;
  }

  createDaysRepeat(repeat) {
    const ol = document.createElement('ol');
    ol.setAttribute('id', 'repeat-days');
    ol.classList.add('grid', 'grid-cols-3', 'justify-center', 'items-center', 'text-center', 'gap-4');

    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    for (const day of days) {
      const li = document.createElement('li');

      const label = document.createElement('label');      
      label.classList.add(
        'label-day',
        'p-2',
        'cursor-pointer',
        'bg-gray-800',
        'rounded-md',
        'border-2',
        'text-white',
        'border-gray-700',
        'transition',
        'ease',
        'hover:border-blue-500',
        'hover:bg-gray-900',
        'focus:border-blue-500',
        'focus:bg-gray-900',
        'hover:text-blue-500',
        'focus:text-blue-500'
      );      
      label.innerText = day;

      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('hidden', true);
      input.classList.add('checkbox-day');
      
      if (day === 'Dom') {
        label.setAttribute('for', `day-sun-edit`);
        input.setAttribute('id', `day-sun-edit`);
        input.setAttribute('name', `day-sun-edit`);
      }
      if (day === 'Seg') {
        label.setAttribute('for', `day-mon-edit`);
        input.setAttribute('id', `day-mon-edit`);
        input.setAttribute('name', `day-mon-edit`);
      }
      if (day === 'Ter') {
        label.setAttribute('for', `day-tue-edit`);
        input.setAttribute('id', `day-tue-edit`);
        input.setAttribute('name', `day-tue-edit`);
      }
      if (day === 'Qua') {
        label.setAttribute('for', `day-wed-edit`);
        input.setAttribute('id', `day-wed-edit`);
        input.setAttribute('name', `day-wed-edit`);
      }
      if (day === 'Qui') {
        label.setAttribute('for', `day-thu-edit`);
        input.setAttribute('id', `day-thu-edit`);
        input.setAttribute('name', `day-thu-edit`);
      }
      if (day === 'Sex') {
        label.setAttribute('for', `day-fri-edit`);
        input.setAttribute('id', `day-fri-edit`);
        input.setAttribute('name', `day-fri-edit`);
      }
      if (day === 'Sáb') {
        label.setAttribute('for', `day-sat-edit`);
        input.setAttribute('id', `day-sat-edit`);
        input.setAttribute('name', `day-sat-edit`);
      }

      const getAttributeFor = label.getAttribute('for');
      for (let val of repeat) {
        if (val.startsWith('day-')) val = `${val}-edit`;
        if (val === getAttributeFor) {
          input.checked = true;
          this.toggleStyles.toggle(label, this.stylesIconCheck);
        }
      }

      label.appendChild(input);
      li.appendChild(label);
      ol.appendChild(li);
    }

    return ol;
  }

  createInputRepeat(repeat) {
    const input = document.createElement('input');
    input.type = 'time';
    input.id = 'time-repeat';
    input.name = 'time-repeat';
    this.toggleStyles.add(input, this.inputStyles);
    for (let val of repeat) {
      if (String(repeat).includes('time-repeat:')) {
        const getHours = val.replace('time-repeat: ', '');
        input.value = getHours;
      }
    }
    return input;
  }

  createRepeatContent(repeat) {
    const li = this.createLi();
    const labelRepeat = this.createLabel('Repetir');
    const ol = this.createDaysRepeat(repeat);
    const input = this.createInputRepeat(repeat);
    
    li.classList.remove('gap-2');
    li.classList.add('gap-4');
    
    li.appendChild(labelRepeat);
    li.appendChild(ol);
    li.appendChild(input);
    
    return li;
  }

  createElementsModal(obj) {
    const { _id, task, important, conclusion, notify, repeat, created_at } = obj;
    const form = this.createForm();
    const textId = this.createP('task-id', `id: ${_id}`);
    const textCreateAt = this.createP('created_at', `Tarefa criada em: ${created_at}`);
    const inputTask = this.createInput(task);
    const hr = this.createHr();
    const ul = this.createUl();
    const liImportant = this.createImportantContent(important);
    const liNotify = this.createNotifyContent(notify);
    const liConclusion = this.createConclusionContent(conclusion);
    const liRepeat = this.createRepeatContent(repeat);

    const iconClose = this.createIcon('fa-solid', 'fa-right-from-bracket');
    const btnClose = this.createButton('btn-close', 'btn-close', 'gray', iconClose, 'Fechar');
    const iconDelete = this.createIcon('fa-solid', 'fa-trash');
    const btnDelete = this.createButton(_id, 'btn-delete', 'rose', iconDelete, 'Deletar');
    const iconSave = this.createIcon('fa-solid', 'fa-floppy-disk');
    const btnSave = this.createButton(_id, 'btn-save', 'blue', iconSave, 'Salvar');

    form.appendChild(textId);
    form.appendChild(textCreateAt);
    form.appendChild(inputTask);

    form.appendChild(hr);

    ul.appendChild(liImportant);
    ul.appendChild(liNotify);
    ul.appendChild(liConclusion);
    ul.appendChild(liRepeat);

    form.appendChild(ul);
    form.appendChild(btnSave);
    form.appendChild(btnDelete);
    form.appendChild(btnClose);
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
      'h-full',
      'backdrop-blur-md',
      'bg-gray-800/50',
      'p-4',
      'rounded',
      'shadow-2xl',
      'shadow-blue-500/50',
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

const taskEditForm = new TaskEditForm();
taskEditForm.init();

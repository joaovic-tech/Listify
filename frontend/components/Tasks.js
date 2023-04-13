import ToggleStyles from "../utils/ToggleStyles.js";

export default class Tasks {
  constructor() {
    this.toggleStyles = new ToggleStyles();
  }

  getConclusionText(conclusion) {
    if (conclusion) {
      const parts = conclusion.split('-');
      const day = parts[2];
      const month = parts[1];
      const year = parts[0];
      const formattedDate = `${day}/${month}/${year}`;
  
      return `
        <span class="flex justify-center items-center text-center gap-2">
          <i class="fa-solid fa-calendar-days text-blue-500"></i>
          ${formattedDate}
        </span>
      `;
    } else {
      return '';
    }
  }  

  getRepeatIcon(repeat) {
    return repeat[0] !== 'time-repeat: ' ? `<i class="fa-solid fa-repeat text-blue-500"></i>` : '';
  }

  getTextOptions(checked_task, conclusion, repeat) {
    const textOptions = [];

    this.getConclusionText(conclusion) ? textOptions.push(this.getConclusionText(conclusion)) : null;
    this.getRepeatIcon(repeat) ? textOptions.push(this.getRepeatIcon(repeat)) : null;

    if (checked_task === 'off') {
      return textOptions.length > 0 ?
        `<p class="pointer-events-none flex justify-start items-center text-center gap-4 text-sm text-zinc-400">${textOptions.join('')}</p>` :
        ''
    }

    return textOptions.length > 0 ?
      `<p class="pointer-events-none flex justify-start items-center text-center gap-4 text-sm text-green-600">Completo: ${textOptions.join('')}</p>` :
      ''
  }

  createLi(checked_task, taskId) {
    const li = document.createElement('li');
    li.setAttribute('id', taskId);
    li.classList.add(
      'li-task',
      'p-2',
      'grid',
      'rounded',
      'gap-2',
      'transition',
      'ease',
      'cursor-pointer',
      'backdrop-blur-sm',
      'bg-gray-700/50',
      'hover:bg-gray-800',
      'focus:bg-gray-800',
    );

    if (checked_task === 'off') return li;
    li.classList.add(
      'bg-gray-700/50',
      'hover:bg-gray-600/80',
      'focus:bg-gray-600/80',
    );

    return li;
  }

  createTitle(checked_task, text) {
    const h2 = document.createElement('h2');
    h2.classList.add('text-base', 'text-white', 'text-bold');
    h2.textContent = text;

    if (checked_task === 'off') return h2;
    h2.classList.add('line-through', 'text-green-600')

    return h2;
  }

  createIcon(faClass, nameIcon) {
    const i = document.createElement('i');
    i.classList.add(faClass, nameIcon, 'pointer-events-none');
    return i;
  }

  getImportantIcon(important) {
    const icon = this.createIcon('fa-solid', 'fa-star');
    icon.classList.add(
      'flex',
      'justify-center',
      'items-center',
      'text-center',
      'py-2',
      'px-3',
      'rounded',
      'bg-gray-900',
      'text-blue-500'
    );
    return important === 'on' ? icon : '';
  }

  getNotifyIcon(notify) {
    const icon = this.createIcon('fa-solid', 'fa-bell');
    icon.classList.add(
      'flex',
      'justify-center',
      'items-center',
      'text-center',
      'py-2',
      'px-3',
      'rounded',
      'bg-gray-900',
      'text-blue-500'
    );
    return notify === 'on' ? icon : '';
  }

  createCheckboxTask(checked_task, id) {
    let icon;

    if (checked_task === 'on') {
      icon = this.createIcon('fa-regular', 'fa-square-check');
      icon.classList.add('checked_true', 'text-blue-700');
    } else {
      icon = this.createIcon('fa-regular', 'fa-square');
      icon.classList.add('checked_false');
    }

    icon.id = id;
    icon.classList.add(
      'checkbox-task',
      'flex',
      'justify-center',
      'items-center',
      'text-center',
      'text-3xl',
      'pointer-events-auto',
      'text-blue-500',
      'transition',
      'ease',
      'hover:text-blue-800',
      'focus:text-blue-800',
    );

    return icon;
  }

  createTask(obj) {
    const {
      _id,
      task,
      conclusion,
      important,
      notify,
      repeat,
      checked_task
    } = obj;
    const ul = document.getElementById('tasks');
    const li = this.createLi(checked_task, _id);
    const div = document.createElement('div');
    const divRight = document.createElement('div');
    const divLeft = document.createElement('div');
    const taskContent = this.createTitle(checked_task, task);
    const iconImportant = this.getImportantIcon(important);
    const iconNotify = this.getNotifyIcon(notify);
    const checkboxTask = this.createCheckboxTask(checked_task, _id);
    const classDiv = ['flex', 'justify-between', 'items-center', 'text-center', 'gap-2', 'pointer-events-none'];

    this.toggleStyles.add(div, classDiv);
    this.toggleStyles.add(divLeft, classDiv);
    this.toggleStyles.add(divRight, classDiv);

    divLeft.appendChild(checkboxTask);
    divLeft.appendChild(taskContent);
    iconImportant ? divRight.appendChild(iconImportant) : null;
    iconNotify ? divRight.appendChild(iconNotify) : null;
    div.appendChild(divLeft);
    div.appendChild(divRight);
    li.appendChild(div);

    const textOptions = this.getTextOptions(checked_task, conclusion, repeat);
    textOptions ? li.innerHTML += textOptions : null;

    ul.appendChild(li);
    return ul;
  }
}

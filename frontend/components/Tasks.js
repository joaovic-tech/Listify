export default class Tasks {

  getConclusionText(conclusion) {
    return conclusion ? `
      <span class="flex justify-center items-center text-center gap-2">
        <i class="fa-solid fa-calendar-days text-blue-500"></i>
        ${conclusion}
      </span>
    ` : '';
  }

  getReminderText(reminder) {
    return reminder ? `
      <span class="flex justify-center items-center text-center gap-2">
        <i class="fa-solid fa-bell text-blue-500"></i>
        ${reminder}
      </span>
    ` : '';
  }

  getRepeatIcon(repeat) {
    return repeat[0] !== 'time-repeat: ' ? `<i class="fa-solid fa-repeat text-blue-500"></i>` : '';
  }

  getTextOptions(conclusion, reminder, repeat) {
    const textOptions = [];

    this.getConclusionText(conclusion) ? textOptions.push(this.getConclusionText(conclusion)) : null;
    this.getReminderText(reminder) ? textOptions.push(this.getReminderText(reminder)) : null;
    this.getRepeatIcon(repeat) ? textOptions.push(this.getRepeatIcon(repeat)) : null;

    return textOptions.length > 0
      ? `<p class="pointer-events-none flex justify-start items-center text-center gap-4 text-sm text-zinc-400">${textOptions.join('')}</p>`
      : ''
  }

  createLi(taskId) {
    const li = document.createElement('li');
    li.setAttribute('id', taskId);
    li.classList.add(
      'li-task',
      'bg-gray-700',
      'p-2',
      'grid',
      'rounded',
      'gap-2',
      'transition',
      'ease',
      'cursor-pointer',
      'hover:bg-gray-800',
      'focus:bg-gray-800'
    );
    return li;
  }

  createTitle(text) {
    const h2 = document.createElement('h2');
    h2.classList.add('text-base', 'text-white', 'text-bold');
    h2.textContent = text;
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
    return important ? icon : '';
  }

  createTask(obj) {
    const { _id, task, conclusion, important, reminder, repeat } = obj;
    const ul = document.getElementById('tasks');
    const li = this.createLi(_id);

    const div = document.createElement('div');
    div.classList.add('flex', 'justify-between', 'gap-2', 'pointer-events-none');

    const taskContent = this.createTitle(task);
    div.appendChild(taskContent);
    
    const iconImportant = this.getImportantIcon(important);
    iconImportant ? div.appendChild(iconImportant) : null;

    li.appendChild(div);

    const textOptions = this.getTextOptions(conclusion, reminder, repeat);
    textOptions ? li.innerHTML += textOptions : null;

    ul.appendChild(li);
    return ul;
  }
}

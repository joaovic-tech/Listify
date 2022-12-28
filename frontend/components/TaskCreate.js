export default class CreateTasks {
  constructor() {
    this.tasks = document.getElementById('tasks');
  }

  createLi() {
    const li = document.createElement('li');
    li.classList.add(
      'flex',
      'justify-between',
      'w-full',
      'h-full',
      'p-3',
      'rounded-md',
      'bg-gray-700',
      'transition',
      'duration-500',
      'ease-in-out',
      'transition',
      'ease-in',
      'cursor-pointer',
      'hover:bg-gray-800'
    );
    return li;
  }

  createP(text) {
    const p = document.createElement('p');
    p.innerText = text;
    p.classList.add('text-white');
    return p;
  }

  createIconStar(important) {
    if (important !== 'on') return null;
    const i = document.createElement('i');
    i.classList.add(
      'fa-solid',
      'fa-star',
      'text-blue-500',
      'rounded',
      'flex',
      'items-center',
      'justify-center',
      'w-6',
      'h-6',
      'p-4',
      'm-2',
      'bg-gray-900'
    );
    return i;
  }

  createButtonDelete(id) {
    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.setAttribute('id', id);
    button.classList.add('text-white', 'rounded', 'flex', 'items-center', 'justify-center', 'w-6', 'h-6', 'p-4', 'm-2', 'transition', 'ease', 'hover:bg-red-900', 'cursor-pointer', 'bg-red-500');
    button.appendChild(this.createIconDelete());
    return button;
  }


  createIconDelete() {
    const i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-trash');
    return i;
  }

  createDiv(star, trash) {
    const div = document.createElement('div');
    div.classList.add('flex', 'items-center', 'justify-center', 'gap-2');
    star ? div.appendChild(star) : null;
    div.appendChild(trash);

    return div;
  }

  createFormDelete(btn) {
    const form = document.createElement('form');
    form.setAttribute('class', 'task-delete-form');
    form.appendChild(btn);
    return form;
  }

  init(obj) {
    const { task, important, _id } = obj;
    const li = this.createLi();
    const p = this.createP(task);
    const iconStar = this.createIconStar(important);
    const buttonDelete = this.createButtonDelete(_id);
    const formDelete = this.createFormDelete(buttonDelete);
    const div = this.createDiv(iconStar, formDelete);

    li.appendChild(p);
    li.appendChild(div);
    this.tasks.appendChild(li);
  }
}

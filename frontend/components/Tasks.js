export default class Tasks {
  getImportantIcon(important) {
    return important ? `<i class="fa-solid fa-star flex justify-center items-center text-center py-2 px-3 rounded bg-gray-900 text-blue-500"></i>` : '';
  }

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

  init(obj) {
    const { _id, task, conclusion, important, reminder, repeat } = obj;
    const ul = document.getElementById('tasks');
    const li = document.createElement('li');

    li.classList.add('bg-gray-700', 'p-2', 'grid', 'rounded', 'gap-2', 'transition', 'ease', 'cursor-pointer', 'hover:bg-gray-800', 'focus:bg-gray-800');
    li.innerHTML = `
      <div class="flex justify-between gap-2">
        <h2 class="text-base text-white text-bold">${task}</h2>
        <div class="flex gap-2">
        ${this.getImportantIcon(important)}
          <button type="button" id="${_id}" class="btn-delete flex justify-center items-center text-center py-2 px-3 rounded bg-rose-600 text-white hover:bg-rose-700 focus:bg-rose-700">
            <i class="fa-solid fa-trash pointer-events-none"></i>
          </button>
        </div>
      </div>
      <p class="flex justify-start items-center text-center gap-4 text-sm text-zinc-400">
        ${this.getConclusionText(conclusion)}
        ${this.getReminderText(reminder)}
        ${this.getRepeatIcon(repeat)}
      </p>
    `;
    ul.appendChild(li);
    return ul;
  }
}

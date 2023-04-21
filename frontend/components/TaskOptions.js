import ToggleStyles from "../utils/ToggleStyles.js";

class TaskOptions {
  constructor() {
    this.toggleStyles = new ToggleStyles();
    this.stylesIconCheck = ['text-gray-950', 'text-blue-500', 'dark:text-blue-500', 'bg-gray-900', 'bg-gray-800', 'dark:bg-gray-800', 'border-slate-200', 'border-blue-500', 'dark:border-gray-800', 'dark:border-blue-500'];
  }

  changePositionRepeatModal(modalTime) {
    modalTime.classList.toggle('-bottom-48');
    modalTime.classList.toggle('-bottom-40');
  }

  showTimeModal() {
    document.getElementById('time-modal').classList.add('show-time-modal');
  }

  showDaysModal() {
    document.getElementById('repeat-days').classList.toggle('show');
  }

  verifyDate(el) {
    return el.value.length <= 0;
  }

  importantEvents() {
    const labelImportant = document.getElementById('label-important');
    labelImportant.addEventListener('click', () => this.toggleStyles.toggle(labelImportant, this.stylesIconCheck));
  }

  showModalOptions(modalOption) {
    const modals = document.querySelectorAll('.modal-option');
    for (const modal of modals) {
      if (modal !== modalOption) {
        modal.classList.remove('show');
      }
    }
    modalOption.classList.toggle('show');
  }

  repeatEvents() {
    const labelRepeat = document.getElementById('label-repeat');
    const inputTime = document.getElementById('time-repeat');
    const modalRepeat = document.getElementById('modal-repeat');
    const checkboxes = document.querySelectorAll('.checkbox-day');
    const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
    labelRepeat.addEventListener('click', () => this.showModalOptions(modalRepeat));

    inputTime.addEventListener('change', () => {
      if (!inputTime.value || atLeastOneChecked) {
        this.toggleStyles.toggle(labelRepeat, this.stylesIconCheck);
        return;
      }

      this.toggleStyles.toggle(labelRepeat, this.stylesIconCheck);
    });

    document.addEventListener('click', (e) => {
      const el = e.target;
      if (el.classList.contains('label-day')) {
        this.toggleStyles.toggle(el, this.stylesIconCheck);
      }
    });
  }

  conclusionEvents() {
    const modalConclusion = document.getElementById('modal-conclusion');
    const conclusion = document.querySelector('#task-form #conclusion');
    const labelConclusion = document.getElementById('label-conclusion');

    labelConclusion.addEventListener('click', () => { this.showModalOptions(modalConclusion) });

    conclusion.addEventListener('change', () => {
      if (!conclusion.value) {
        this.toggleStyles.toggle(labelConclusion, this.stylesIconCheck);
        return;
      }
      this.toggleStyles.toggle(labelConclusion, this.stylesIconCheck);
    });
  }

  checkboxTaskEvents() {
    document.addEventListener('click', (e) => {
      const el = e.target;
      if (!el.classList.contains('checkbox-task')) return;

      if (el.classList.contains('fa-square')) {
        this.toggleStyles.remove(el, ['fa-square'])
        this.toggleStyles.add(el, ['fa-square-check']);
      } else {
        this.toggleStyles.add(el, ['fa-square'])
        this.toggleStyles.remove(el, ['fa-square-check']);
      }
    });
  }

  init() {
    this.conclusionEvents();
    this.importantEvents();
    this.repeatEvents();
    this.checkboxTaskEvents();
  }
}

const taskOptions = new TaskOptions();
taskOptions.init();

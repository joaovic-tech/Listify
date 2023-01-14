import ToggleStyles from "../utils/ToggleStyles.js";
import Message from '../utils/Message.js';

class TaskOptions {
  constructor() {
    this.toggleStyles = new ToggleStyles();
    this.stylesIconCheck = ['text-white', 'text-blue-500', 'bg-gray-900', 'bg-gray-800', 'border-gray-700', 'border-blue-500'];
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
    const btnRepeat = document.getElementById('btn-repeat');
    const checkboxes = document.querySelectorAll('.checkbox-day');
    const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
    labelRepeat.addEventListener('click', () => this.showModalOptions(modalRepeat));

    btnRepeat.addEventListener('click', () => {
      if (!inputTime.value || atLeastOneChecked) return Message.create('Defina uma data e hora da repetição');
      this.toggleStyles.toggle(labelRepeat, this.stylesIconCheck);
    });

    document.addEventListener('click', (e) => {
      const el = e.target;
      if (el.classList.contains('label-day')) {
        this.toggleStyles.toggle(el, this.stylesIconCheck);
      }
    });
  }

  reminderEvents() {
    const modalReminder = document.getElementById('modal-reminder');
    const reminder = document.querySelector('#task-form #reminder');
    const labelReminder = document.getElementById('label-reminder');
    const btnReminder = document.getElementById('btn-reminder');

    labelReminder.addEventListener('click', () => { this.showModalOptions(modalReminder) });

    btnReminder.addEventListener('click', () => {
      if (!reminder.value) return Message.create('Defina uma data e hora do lembrete');
      this.toggleStyles.toggle(labelReminder, this.stylesIconCheck);
    });
  }

  conclusionEvents() {
    const modalConclusion = document.getElementById('modal-conclusion');
    const conclusion = document.querySelector('#task-form #conclusion');
    const labelConclusion = document.getElementById('label-conclusion');
    const btnConclusion = document.getElementById('btn-conclusion');

    labelConclusion.addEventListener('click', () => { this.showModalOptions(modalConclusion) });

    btnConclusion.addEventListener('click', () => {
      if (!conclusion.value) return Message.create('Defina uma data e hora da conclusão');
      this.toggleStyles.toggle(conclusion, this.stylesIconCheck);
    });
  }

  init() {
    this.conclusionEvents();
    this.importantEvents();
    this.repeatEvents();
    this.reminderEvents();
  }
}

const taskOptions = new TaskOptions();
taskOptions.init();

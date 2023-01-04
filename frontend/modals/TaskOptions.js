import ToggleStyles from "../utils/ToggleStyles.js";

class TaskOptions {
  constructor() {
    this.toggleStyles = new ToggleStyles();
    this.stylesIconCheck = ['text-white', 'text-blue-500', 'bg-gray-900', 'bg-gray-800', 'border-gray-700', 'border-blue-500'];
    this.stylesIconCheckRemoved = ['text-white', 'bg-gray-800', 'border-gray-700'];
    this.stylesIconCheckAdded = ['text-blue-500', 'bg-gray-900', 'border-blue-500'];
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

  verifyDate(elId) {
    return document.getElementById(elId).value.length <= 0;
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
    
    labelRepeat.addEventListener('click', () => this.showModalOptions(modalRepeat));

    inputTime.addEventListener('change', () => {
      const checkboxes = document.querySelectorAll('.checkbox-day');
      const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

      if (inputTime.value !== '' && atLeastOneChecked) {
        this.toggleStyles.add(labelRepeat, this.stylesIconCheckAdded);
        this.toggleStyles.remove(labelRepeat, this.stylesIconCheckRemoved);
      } else {
        this.toggleStyles.remove(labelRepeat, this.stylesIconCheckAdded);
        this.toggleStyles.add(labelRepeat, this.stylesIconCheckRemoved);
      }
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
    const reminder = document.getElementById('reminder');
    const labelReminder = document.getElementById('label-reminder');

    labelReminder.addEventListener('click', () => { this.showModalOptions(modalReminder) });

    reminder.addEventListener('change', () => {
      if (this.verifyDate('reminder')) {
      this.toggleStyles.add(labelReminder, this.stylesIconCheckAdded);
      this.toggleStyles.remove(labelReminder, this.stylesIconCheckRemoved);
    } else {
      this.toggleStyles.remove(labelReminder, this.stylesIconCheckAdded);
      this.toggleStyles.add(labelReminder, this.stylesIconCheckRemoved);
    }
    });
  }

  conclusionEvents() {
    const modalConclusion = document.getElementById('modal-conclusion');
    const conclusion = document.getElementById('conclusion');
    const labelConclusion = document.getElementById('label-conclusion');

    labelConclusion.addEventListener('click', () => { this.showModalOptions(modalConclusion) });

    conclusion.addEventListener('change', () => {
      if (this.verifyDate('conclusion')) {
      this.toggleStyles.add(labelConclusion, this.stylesIconCheckAdded);
      this.toggleStyles.remove(labelConclusion, this.stylesIconCheckRemoved);
    } else {
      this.toggleStyles.remove(labelConclusion, this.stylesIconCheckAdded);
      this.toggleStyles.add(labelConclusion, this.stylesIconCheckRemoved);
    }
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

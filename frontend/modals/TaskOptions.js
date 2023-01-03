import Message from "../utils/Message.js";
import ToggleStyles from "../utils/ToggleStyles.js";

class TaskOptions {
  constructor() {
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

  changePositionRepeatModal(modalTime) {
    modalTime.classList.toggle('-bottom-48');
    modalTime.classList.toggle('-bottom-40');
  }

  showTimeModal() {
    const modalTime = document.getElementById('time-modal');
    modalTime.classList.add('show-time-modal');
  }

  showDaysModal() {
    const modalTime = document.getElementById('repeat-days');
    modalTime.classList.toggle('show');
  }

  verifyDate(elId) {
    const date = document.getElementById(elId);

    if (date.value.length <= 0) {
      Message.create('A data precisar ser preenchida!');
      return false;
    } else return true;
  }

  verifyTime(elId) {
    const time = document.getElementById(elId);

    if (time.value.length <= 0) {
      Message.create('O horário precisar ser preenchido!');
      return false;
    } else return true;
  }

  importantEvents() {
    const labelImportant = document.getElementById('label-important');
    
    labelImportant.addEventListener('click', () => {
      this.toggleStyles.init(labelImportant, this.stylesIconCheck);
    });
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
    const labelDaily = document.getElementById('label-daily');
    const labelPersonality = document.getElementById('label-personality');
    const inputTime = document.getElementById('time-repeat');
    const modalRepeat = document.getElementById('modal-repeat');
    
    labelRepeat.addEventListener('click', () => this.showModalOptions(modalRepeat));

    labelDaily.addEventListener('click', () => {
      labelDaily.classList.toggle('text-white');
      labelDaily.classList.toggle('text-blue-500');

      labelPersonality.classList.toggle('hidden');

      this.showTimeModal();
      this.changePositionRepeatModal(modalRepeat);
    });

    labelPersonality.addEventListener('click', () => {
      labelPersonality.classList.toggle('text-white');
      labelPersonality.classList.toggle('text-blue-500');

      labelDaily.classList.toggle('hidden');

      this.showTimeModal();
      this.showDaysModal();
      this.changePositionRepeatModal(modalRepeat);
    });

    inputTime.addEventListener('change', () => {
      inputTime.value !== ''
        ? this.toggleStyles.init(labelRepeat, this.stylesIconCheck)
        : null;
    });

    document.addEventListener('click', (e) => {
      const el = e.target;
      if (el.classList.contains('checkbox-day')) {
        this.toggleStyles.init(el, this.stylesIconCheck);
      }
    });
  }

  reminderEvents() {
    const modalReminder = document.getElementById('modal-reminder');
    const btnReminder = document.getElementById('btn-reminder');
    const labelReminder = document.getElementById('label-reminder');

    labelReminder.addEventListener('click', () => { this.showModalOptions(modalReminder) });

    btnReminder.addEventListener('click', () => {
      if (!this.verifyDate('date-reminder') || !this.verifyTime('time-reminder')) return;
      modalReminder.classList.remove('show');
      this.toggleStyles.init(labelReminder, this.stylesIconCheck);
    });
  }

  conclusionEvents() {
    const modalConclusion = document.getElementById('modal-conclusion');
    const btnConclusion = document.getElementById('btn-conclusion');
    const labelConclusion = document.getElementById('label-conclusion');

    labelConclusion.addEventListener('click', () => { this.showModalOptions(modalConclusion) });

    btnConclusion.addEventListener('click', () => {
      if (!this.verifyDate('date-conclusion') || !this.verifyTime('time-conclusion')) return;
      modalConclusion.classList.remove('show');
      this.toggleStyles.init(labelConclusion, this.stylesIconCheck);
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

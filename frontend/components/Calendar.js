import ToggleStyles from "../utils/ToggleStyles.js";

export default class Calendar {
  constructor(element, calendarValue) {
    const today = new Date();
    this.date = calendarValue ? new Date(`${calendarValue}T00:00`) : today;
    this.currentMonth = this.date.getMonth();
    this.monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    this.monthMapping = {
      'Janeiro': '01',
      'Fevereiro': '02',
      'Março': '03',
      'Abril': '04',
      'Maio': '05',
      'Junho': '06',
      'Julho': '07',
      'Agosto': '08',
      'Setembro': '09',
      'Outubro': '10',
      'Novembro': '11',
      'Dezembro': '12'
    };
    this.toggleStyles = new ToggleStyles();
    this.calendar = element;
    this.stylesIconCheck = ['active', 'text-gray-950', 'text-blue-500', 'dark:text-blue-500', 'bg-gray-900', 'bg-gray-800', 'dark:bg-gray-800', 'border-slate-200', 'border-blue-500', 'dark:border-gray-800', 'dark:border-blue-500'];
  }

  selectDay(el) {
    const selectedNumbers = document.getElementById('conclusion-day');

    if (el.classList.contains('empty')) return;

    if (selectedNumbers) {
      selectedNumbers.id = '';
      selectedNumbers.classList.remove(
        'text-blue-600',
        'dark:text-blue-600',
        'text-white',
        'bg-gray-950',
      );
    }

    el.id = 'conclusion-day';
    el.classList.add(
      'text-blue-600',
      'text-white',
      'bg-gray-950',
      'dark:text-blue-600',
    );
  }

  createCalendar() {
    const year = this.date.getFullYear();
    const firstDay = new Date(year, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(year, this.currentMonth + 1, 0).getDate();

    const calendarContainer = this.calendar;
    calendarContainer.innerHTML = '';
    calendarContainer.classList.add(
      'backdrop-blur-md',
      'bg-white/30',
      'dark:bg-gray-900/30',
      'p-2',
      'rounded'
    );

    const monthHeader = document.createElement('caption');
    monthHeader.innerHTML = `<p class="flex gap-2 text-gray-950 dark:text-white" id="conclusion-month">${this.monthNames[this.currentMonth]} ${year}</p>`;

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i class="fa-solid fa-caret-left text-xl text-gray-950 dark:text-white"></i>';
    prevBtn.addEventListener('click', () => this.previousMonth());

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i class="fa-solid fa-caret-right text-xl text-gray-950 dark:text-white"></i>';
    nextBtn.addEventListener('click', () => this.nextMonth());

    const arrowAndCurrentMonth = document.createElement('div');
    arrowAndCurrentMonth.classList.add('flex', 'justify-between', 'gap-2', 'text-gray-950', 'dark:text-white');

    const divCurrentMonth = document.createElement('div');

    divCurrentMonth.classList.add('flex', 'gap-2', 'text-gray-950', 'dark:text-white');

    divCurrentMonth.append(monthHeader);
    arrowAndCurrentMonth.append(prevBtn, divCurrentMonth, nextBtn);

    const weekdaysRow = document.createElement('tr');
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    weekdays.forEach(day => {
      const weekday = document.createElement('th');
      weekday.classList.add('text-gray-950', 'dark:text-white', 'p-2');
      weekday.textContent = day;
      weekdaysRow.appendChild(weekday);
    });

    const daysContainer = document.createElement('tbody');

    let day = 1;
    for (let i = 0; i < 6; i++) {
      const weekRow = document.createElement('tr');
      for (let j = 0; j < 7; j++) {
        const dayCell = document.createElement('td');
        dayCell.classList.add(
          'dark:text-white',
          'text-center',
          'p-2',
          'rounded',
          'cursor-pointer',
          'transition',
          'hover:bg-gray-950',
          'hover:text-blue-600',
          'focus:text-blue-600',
          'focus:bg-gray-950'
        );

        dayCell.addEventListener('click', (event) => {
          const clickedDayCell = event.target;
          this.selectDay(clickedDayCell);
        });

        if (i === 0 && j < firstDay || day > daysInMonth) {
          dayCell.classList.remove(
            'hover:bg-gray-950',
            'hover:text-blue-600',
            'focus:text-blue-600',
            'focus:bg-gray-950'
          );
        } else {
          if (this.date.getFullYear() === new Date(this.calendarValue).getFullYear() &&
            this.currentMonth === new Date(this.calendarValue).getMonth() &&
            day === new Date(this.calendarValue).getDate()) {
            dayCell.classList.add('selected');
          }
          dayCell.textContent = day;
          if (day === this.date.getDate() && this.currentMonth === this.date.getMonth()) {
            dayCell.classList.add('today');
            this.selectDay(dayCell);
          }
          day++;
        }

        weekRow.appendChild(dayCell);
      }
      daysContainer.appendChild(weekRow);
      if (day > daysInMonth) {
        break;
      }
    }

    const calendarTable = document.createElement('table');
    calendarContainer.append(arrowAndCurrentMonth, weekdaysRow, daysContainer);
    calendarContainer.appendChild(calendarTable);
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.date.setFullYear(this.date.getFullYear() + 1);
    } else {
      this.currentMonth++;
    }
    this.createCalendar();
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.date.setFullYear(this.date.getFullYear() - 1);
    } else {
      this.currentMonth--;
    }
    this.createCalendar();
  }

  activeIcon() {
    const labelConclusion = document.getElementById('label-conclusion');
    
    this.toggleStyles.toggle(labelConclusion, this.stylesIconCheck);
  }

  confirmCalendar(selector) {
    const inputConclusion = document.querySelector(`${selector} #conclusion`);
    let monthAndYear = document.querySelector(`${selector} #conclusion-month`).innerText;

    monthAndYear = monthAndYear.split(' ');

    const monthName = monthAndYear[0];
    const year = monthAndYear[1];
    const month = this.monthMapping[monthName];

    let day = document.getElementById('conclusion-day').innerText;
    if (day <= 9) day = `0${day}`;

    const dateFormatted = `${year}-${month}-${day}`;

    inputConclusion.value = dateFormatted;

    if (selector === '#task-form') {
      const model = document.getElementById('modal-conclusion');
      const labelConclusion = document.getElementById('label-conclusion');
      model.classList.remove('show');
      
      if (!labelConclusion.classList.contains('active')) this.activeIcon(selector);
    }
  }

  clickConfirm() {
    const btnConclusion = document.getElementById('btn-conclusion');

    btnConclusion.addEventListener('click', () => this.confirmCalendar('#task-form'));
  }

  clickCancel(selector = '#task-form') {
    const btnConclusion = document.getElementById('btn-conclusion-cancel');

    btnConclusion.addEventListener('click', () => {
      const conclusion = document.querySelector(`${selector} #conclusion`);
      const model = document.getElementById('modal-conclusion');
      const labelConclusion = document.querySelector(`${selector} #label-conclusion`);
      
      if (conclusion.value) this.toggleStyles.toggle(labelConclusion, this.stylesIconCheck);

      conclusion.value = '';
      model.classList.remove('show');
    });
  }

  init() {
    this.clickConfirm();
    this.clickCancel();
    this.createCalendar();
  }
}

const calendarEl = document.getElementById('calendar');

const calendar = new Calendar(calendarEl);
calendar.init();
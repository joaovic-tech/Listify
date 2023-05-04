class DateInfo {
  constructor(selector) {
    this.dateElement = document.querySelector(selector);
    this.updateDate();
    setInterval(() => this.updateDate(), 1000);
  }

  updateDate() {
    if (!this.dateElement) return;

    const now = new Date();
    const hours = now.getHours();
    const iconElement = document.querySelector('.icon-info');

    if (hours >= 6 && hours < 18) {
      iconElement.classList.remove('fa-moon');
      iconElement.classList.add('fa-sun');
    } else {
      iconElement.classList.remove('fa-sun');
      iconElement.classList.add('fa-moon');
    }

    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateText = now.toLocaleDateString('pt-BR', options);
    this.dateElement.textContent = dateText;
  }
}

const dateInfo = new DateInfo("p.date-info");

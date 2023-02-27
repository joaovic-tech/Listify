class DateInfo {
    constructor(selector) {
      this.element = document.querySelector(selector);
      this.update();
    }
  
    update() {
      const now = new Date();
      const daysOfWeek = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ];
      const monthsOfYear = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      const dayOfWeek = daysOfWeek[now.getDay()];
      const dayOfMonth = now.getDate();
      const monthOfYear = monthsOfYear[now.getMonth()];
      const text = `${dayOfWeek}, ${dayOfMonth} ${monthOfYear}`;
      this.element.textContent = text;
    }
  }
  
  const dateInfo = new DateInfo("p.date-info");
  setInterval(() => dateInfo.update(), 1000);
  
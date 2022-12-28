export default class ModalEvents {
  constructor(elHover, elModal, event) {
    this.elHover = document.querySelector(`.${elHover}`);
    this.elModal = document.querySelector(`.${elModal}`);
    this.event = event;
  }

  init() {
    this.elHover.addEventListener(this.event, () => {
      this.elModal.classList.toggle('show');
    });
  }
}

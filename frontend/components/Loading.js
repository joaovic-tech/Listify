export default class Loading {
  createDiv() {
    const div = document.createElement('div');
    div.classList.add('w-full', 'h-full', 'flex', 'justify-center', 'items-center');
    return div;
  }

  createI() {
    const i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-circle-notch', 'spinner-border', 'animate-spin', 'text-blue-500', 'text-5xl');
    return i;
  }

  createIconLoading() {
    const div = this.createDiv();
    const icon = this.createI();
    div.appendChild(icon);
    return div;
  }

  create() {
    return this.createIconLoading();
  }
}

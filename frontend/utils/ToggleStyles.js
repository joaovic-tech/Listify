export default class ToggleStyles {
  toggle(el, classNames) {
    classNames.forEach(classChange => {
      el.classList.toggle(classChange);
    });
  }
  remove(el, classNames) {
    classNames.forEach(classChange => {
      el.classList.remove(classChange);
    });
  }
  add(el, classNames) {
    classNames.forEach(classChange => {
      el.classList.add(classChange);
    });
  }
}

export default class ToggleStyles {
  init(el, classNames) {
    classNames.forEach(classChange => {
      el.classList.toggle(classChange);
    });
  }
}

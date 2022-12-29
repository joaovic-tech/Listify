export default class IconClose {
  create() {
    const icon = document.createElement('i');
    icon.classList.add(
      'fa-solid',
      'fa-xmark',
      'absolute',
      'right-4',
      'top-4',
      'text-3xl',
      'p-2',
      'text-white',
      'cursor-pointer',
      'transition',
      'ease',
      'hover:text-red-500',
      'focus:text-red-500',
    );
    return icon;
  }
};

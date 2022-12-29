export default class Modal {
  create() {
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    modal.classList.add(
      'bg-gray-900/50',
      'backdrop-blur-md',
      'absolute',
      'left-0',
      'top-0',
      'w-full',
      'h-full',
      'p-16',
    );
    return modal;
  }
}
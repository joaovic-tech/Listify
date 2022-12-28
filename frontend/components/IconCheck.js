export default class IconCheck {
  importantIcon = document.querySelector('.label-important');
  reminderIcon = document.querySelector('.label-reminder');
  repeatIcon = document.querySelector('.label-repeat');

  toggleStyles(el) {
    el.classList.toggle('text-white');
    el.classList.toggle('text-blue-500');
    el.classList.toggle('bg-gray-900');
    el.classList.toggle('bg-gray-800');
    el.classList.toggle('border-gray-700');
    el.classList.toggle('border-blue-500');
  }

  init() {
    const toggleImportantStyles = () => this.toggleStyles(this.importantIcon);
    const toggleReminderStyles = () => this.toggleStyles(this.reminderIcon);
    const toggleRepeatStyles = () => this.toggleStyles(this.repeatIcon);

    this.importantIcon.addEventListener('click', toggleImportantStyles);
    this.reminderIcon.addEventListener('click', toggleReminderStyles);
    this.repeatIcon.addEventListener('click', toggleRepeatStyles);
  }
}

export default class EventListeners {
  constructor(taskModel) {
    this.taskModel = taskModel;
  }

  taskDelete(button) {
    this.taskModel.delete(button.id);
  }

  init() {
    document.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const deleteTask = () => this.taskDelete(form.firstElementChild);
      if (form.className === 'task-delete-form') deleteTask();
    });
  }
}

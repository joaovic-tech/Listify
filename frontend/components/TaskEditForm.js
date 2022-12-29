import clearFormTask from "../utils/clearFormTask.js";

export default class TaskEditForm {
  formAdjust(form, obj) {
    const { task, conclusion, hours, important, reminder, repeat } = obj;

    form.id = 'task-form-edit';

    const importantLabel = document.getElementById('label-important');
    const reminderLabel = document.getElementById('label-reminder');
    const repeatLabel = document.getElementById('label-repeat');
    const taskInput = document.getElementById('task');
    const conclusionInput = document.getElementById('conclusion');
    const hoursInput = document.getElementById('hours');
    
    task ? taskInput.value = task : null;
    conclusion ? conclusionInput.value = task : null;
    hours ? hoursInput.value = task : null;
    important === 'on' ? importantLabel.click() : null;
    reminder === 'on' ? reminderLabel.click() : null;
    repeat === 'on' ? repeatLabel.click() : null;

    return form;
  }

  resetForm() {
    clearFormTask('task-form-edit');
    const form = document.getElementById('task-form-edit');
    const newForm = this.cloneForm(form);
    newForm.id = 'task-form';
    form.remove();
    return newForm;
  }
  
  cloneForm(form) {
    const clone = form.cloneNode(true);
    return clone;
  }

  create(obj) {
    const form = document.getElementById('task-form');
    const newForm = this.cloneForm(form);
    const newFormAdjust = this.formAdjust(newForm, obj);
    form.remove();
    return newFormAdjust;
  }
}

export default class Tasks {
  async getUser() {
    const response = await fetch('/tasks');
    const data = await response.json();
    console.log(data);
  }

  init() {
    this.getUser();
  }
}

const tasks = new Tasks();
tasks.init();

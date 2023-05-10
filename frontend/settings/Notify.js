// Pedir permissão para notificar

class Notify {
  async permissionNotification() {
    const permission = await Notification.requestPermission();

    if (permission === "denied") {
      throw new Error(
        "Notificação: negada, usuário não irar receber notificações"
      );
    }
  }

  async init() {
    try {
      const permission = await this.permissionNotification();
      const tasks = await this.getTasks();
      const pendingTasks = [];

      tasks.forEach((task) => {
        const today = new Date();
        const targetDate = new Date(task.conclusion);
        const daysAhead = 1;
        const difference = targetDate.getTime() - today.getTime();

        const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

        if (task.checked_task === "off" && daysDifference <= daysAhead) {
          pendingTasks.push(task.task);
        }
      });

      if (!pendingTasks.length) return;

      if (pendingTasks.length === 1) {
        console.log(``);

        new Notification("Tarefa pedente!", {
          body: "Existem uma tarefa próxima do prazo de conclusão!",
          icon: "assets/img/Logo.png",
        });
      } else {
        new Notification("Tarefa pedente!", {
          body: `Existem ${pendingTasks.length} tarefas próximas do prazo de conclusão!`,
          icon: "assets/img/Logo.png",
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async getTasks() {
    const data = await fetch("/tasks");

    return await data.json();
  }
}

const notify = new Notify();
notify.init();

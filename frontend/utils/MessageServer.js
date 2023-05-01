class MessageServer {
  init() {
    window.addEventListener("load", () => {
      const msg = document.getElementById('msg-server');

      if (!msg) return;

      setInterval(() => {
        msg.remove();
      }, 3000);
    });
  }
}

const messageServer = new MessageServer();
messageServer.init();

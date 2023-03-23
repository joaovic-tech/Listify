class MessageServer {
  init() {
    window.addEventListener("load", () => {
      const msg = document.getElementById('msg-server');

      if (!msg) return;

      setInterval(() => {
        msg.remove();
      }, 5000);
    });
  }
}

const messageServer = new MessageServer();
messageServer.init();

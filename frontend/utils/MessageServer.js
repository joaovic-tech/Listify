class MessageServer {
  constructor() {
    this.msg = document.getElementById('msg-server');
    if (!this.msg) return;
    setTimeout(() => {
      this.msg.remove();
    }, 3000);
  }
}

new MessageServer();

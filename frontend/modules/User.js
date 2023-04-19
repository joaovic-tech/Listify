import Message from "../utils/Message.js";

class User {
  constructor() {
    this.formEdit = document.getElementById('form-edit');
    this.username = this.formEdit.querySelector('#username');
    this.email = this.formEdit.querySelector('#email');
    this.password = this.formEdit.querySelector('#password');
    this.confirmPassword = this.formEdit.querySelector('#confirm-password');
    this.saveUsernameValue = this.username.value;
    this.saveEmailValue = this.email.value;
  }

  init() {
    this.updateUser();
  }

  verifyUpdateUser() {
    const usernameValue = this.username.value.trim();
    const emailValue = this.email.value.trim();
    const passwordValue = this.password.value.trim();
    const confirmPasswordValue = this.confirmPassword.value.trim();

    // Validar o username
    if (validator.isEmpty(usernameValue)) {
      Message.create('Username é obrigatório', 'red');
      return false;
    }

    // Validar o email
    if (validator.isEmpty(emailValue)) {
      Message.create('Email é obrigatória', 'red');
      return false;
    }
    if (!validator.isEmail(emailValue)) {
      Message.create('Email inválido', 'red');
      return false;
    }

    // validar se as senhas são iguais
    if (passwordValue && passwordValue !== confirmPasswordValue) {
      Message.create('As senhas não conferem', 'red');
      return false;
    }

    const usernameChanged = this.saveUsernameValue === this.username.value;
    const emailChanged = this.saveEmailValue === this.email.value;

      if (usernameChanged && emailChanged && !passwordValue) {
        Message.create('Nenhuma alteração detectada', 'red');
        return false;
      }

    return true;
  }

  updateUser() {
    this.formEdit.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this.verifyUpdateUser()) {
        this.formEdit.submit();
      }
    });
  }
}

const user = new User();
user.init();

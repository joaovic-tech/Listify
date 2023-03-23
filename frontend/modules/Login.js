import Message from "../utils/Message.js";

class Login {
  constructor() {
    this.form = document.getElementById('form-login');
    this.email = document.getElementById('email');
    this.password = document.getElementById('password');
    this.form.addEventListener('submit', this.submitHandler.bind(this));
  }

  validate() {
    const emailValue = this.email.value.trim();
    const passwordValue = this.password.value.trim();

    // Validar o email
    if (validator.isEmpty(emailValue)) {
      Message.create('Email é obrigatória', 'red');
      return false;
    }
    if (!validator.isEmail(emailValue)) {
      Message.create('Email inválido', 'red');
      return false;
    }

    // Validar a senha
    if (validator.isEmpty(passwordValue)) {
      Message.create('Senha é obrigatória', 'red');
      return false;
    }

    return true;
  }

  submitHandler(event) {
    event.preventDefault();
    if (!this.validate()) return;

    // Se tudo estiver válido, enviar o formulário
    this.form.submit();
  }
}

const login = new Login();

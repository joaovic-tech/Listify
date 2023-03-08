import Message from "../utils/Message.js";

class Register {
  constructor() {
    this.form = document.getElementById('form-register');
    this.username = document.getElementById('username');
    this.email = document.getElementById('email');
    this.password = document.getElementById('password');
    this.confirmPassword = document.getElementById('confirm-password');

    this.form.addEventListener('submit', this.submitHandler.bind(this));
  }

  validate() {
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

    // Validar a senha
    if (validator.isEmpty(passwordValue)) {
      Message.create('Senha é obrigatória', 'red');
      return false;
    }

    // Validar a confirmação da senha
    if (validator.isEmpty(confirmPasswordValue)) {
      Message.create('Confirme a sua senha', 'amber');
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

const register = new Register();

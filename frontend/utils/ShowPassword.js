class ShowPassword {
  constructor(selector){
    this.input = document.querySelector(selector);
    this.button = document.querySelector('#show-password');
  
    this.init();
  }

  changeVisibility(){
    this.input.type === 'password' ? this.input.type = 'text' : this.input.type = 'password';
    this.input.type === 'password' ? this.button.innerHTML = '<i class="fa-solid fa-eye-slash"></i>' : this.button.innerHTML = '<i class="fa-solid fa-eye"></i>';
  }
  
  init(){
    this.button.addEventListener('click', this.changeVisibility.bind(this));
  }
}

const showPassword = new ShowPassword('#password');
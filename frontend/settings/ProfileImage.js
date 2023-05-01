import Message from "../utils/Message.js";

class ProfileImage {
  constructor(){
    this.imgElement = document.getElementById('image');
    this.uploadInput = document.getElementById('profile_picture');
    this.form = document.getElementById('form-user-image');
    this.initialize();
  }

  initialize() {
    // Adiciona o evento "dragover" para o input file
    this.uploadInput.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    // Adiciona o evento "drop" para o input file
    this.uploadInput.addEventListener('drop', (event) => {
      event.preventDefault();

      // Obtém o arquivo solto
      const file = event.dataTransfer.files[0];

      // Define o valor do input file para o nome do arquivo
      this.uploadInput.value = file.name;

      // Valida o tipo de imagem e envia o formulário se for válido
      this.validateImageType(file);
    });

    // Adiciona o evento "change" para o input file
    this.uploadInput.addEventListener('change', () => {
      this.validateImageType(this.uploadInput.files[0]);
    });
  }

  validateImageType(imageFile){
    const types = ['svg', 'png', 'jpg', 'jpeg', 'gif'];
    const fileNameSplit = imageFile.name.split('.');
    const correctType = types.includes(fileNameSplit[fileNameSplit.length - 1]);
    const image = new Image();
    image.src = URL.createObjectURL(imageFile);
    const form = this.form;

    image.onload = function() {
      const verifyLengthImage = this.naturalWidth <= 1080;

      !verifyLengthImage ? Message.create('Imagem muito grande', 'red') : null;

      if (verifyLengthImage) form.submit();
    };

    !correctType ? Message.create('Arquivo inválida, por favor envie uma imagem!', 'red') : null;
  }
}

const profileImage = new ProfileImage();

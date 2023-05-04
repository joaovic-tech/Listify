import Message from '../utils/Message.js';

class ProfileImage {
  constructor() {
    this.imgElement = document.getElementById('image');
    this.uploadInput = document.getElementById('profile_picture');
    this.form = document.getElementById('form-user-image');
    this.initialize();
  }

  initialize() {
    ['dragover', 'drop'].forEach((event) => {
      this.uploadInput.addEventListener(event, (e) => {
        e.preventDefault();
        if (event === 'drop') {
          const file = e.dataTransfer.files[0];
          this.uploadInput.value = file.name;
          this.validateImageType(file);
        }
      });
    });

    this.uploadInput.addEventListener('change', () => {
      const file = this.uploadInput.files[0];
      this.validateImageType(file);
    });
  }

  validateImageType(file) {
    const types = ['svg', 'png', 'jpg', 'jpeg', 'gif'];
    const ext = file.name.split('.').pop();
    const isImage = types.includes(ext.toLowerCase());

    if (!isImage) {
      return Message.create('Arquivo inválido, por favor envie uma imagem!', 'red');
    }

    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > 1080) {
        return Message.create('Imagem muito grande', 'red');
      }
      this.form.submit();
    };
    img.src = URL.createObjectURL(file);
  }
}

const profileImage = new ProfileImage();

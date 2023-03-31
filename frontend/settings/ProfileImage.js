import Message from "../utils/Message.js";

class ProfileImage {
  constructor(){
    this.imgElement = document.getElementById('image');
    this.uploadInput = document.getElementById('user_image');
  }

  uploadImage(){
    this.uploadInput.addEventListener('change', () => {
      this.validateImageType() && this.changeImage()
    });
  }

  validateImageType(){
    const imageURL = this.uploadInput.files[0];
    const types = ['svg', 'png', 'jpg', 'jpeg', 'gif'];
    const fileNameSplit = imageURL.name.split('.');
    const correctType = types.includes(fileNameSplit[fileNameSplit.length - 1]);
    
    !correctType ? Message.create('Por favor insira apenas <span class="font-bold">SVG, PNG, JPG ou GIF</span>', 'red') : null;
    return correctType;
  }

  changeImage(){
    //recebe a imagem do usuário e coloca no imgElement
    const imageURL = this.uploadInput.files[0];
    this.imgElement.src = URL.createObjectURL(imageURL);
    Message.create('Imagem inserida com sucesso!', 'green');
  }
}
const profileImage = new ProfileImage();
profileImage.uploadImage();
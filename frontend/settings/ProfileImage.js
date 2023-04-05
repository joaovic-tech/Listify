import Message from "../utils/Message.js";

class ProfileImage {
  constructor(){
    this.imgElement = document.getElementById('image');
    this.uploadInput = document.getElementById('profile_picture');
    this.form = document.getElementById('form-user-image');
  }

  uploadImage(){
    this.uploadInput.addEventListener('change', () => {
      this.validateImageType() && this.form.submit();
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
  
}
const profileImage = new ProfileImage();
profileImage.uploadImage();
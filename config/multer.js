const multer = require('multer');
const path = require('path');

// configurar o destino e o nome do arquivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const { username } = req.session.user;

    cb(null, `${username}Image${path.extname(file.originalname)}`)
  }
});

// verificar o tipo de arquivo
const fileFilter = function (req, file, cb) {
  const allowedExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif'];
  const fileExtension = path.extname(file.originalname);

  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Somente arquivos SVG, PNG, JPG/JPEG ou GIF são permitidos!'), false);
  }
}

// criar o middleware multer
const upload = multer({ storage, fileFilter });

module.exports = upload;

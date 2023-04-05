const Route = require('express').Router;
const router = new Route();
const { loginRequired } = require('../middleware/Middleware');
const UserController = require('../controllers/UserController');
const multer = require('multer');

router.get('/profile', loginRequired, (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  return res.render('profile', {
    errors: req.flash('errors'),
    success: req.flash('success'),
    user: req.session.user
  });
});

router.post('/update/user/:id', loginRequired, UserController.update);

// configurar o destino e o nome do arquivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

// verificar o tipo de arquivo
const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Somente arquivos de imagem são permitidos!'), false);
  }
}

// criar o middleware multer
const upload = multer({ storage, fileFilter });

// usar o método .single() do multer para fazer upload de um único arquivo
router.post('/update/user/image/:id', loginRequired, upload.single('profile_picture'), UserController.updateImage);

module.exports = router;

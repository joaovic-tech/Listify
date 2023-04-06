const Route = require('express').Router;
const router = new Route();
const { loginRequired } = require('../middleware/Middleware');
const UserController = require('../controllers/UserController');
const upload = require('../../config/multer');
const removePreviousImage = require('../../config/removePreviousImage');

router.get('/profile', loginRequired, (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  return res.render('profile', {
    errors: req.flash('errors'),
    success: req.flash('success'),
    user: req.session.user
  });
});

router.post('/update/user/:id', loginRequired, UserController.update);


// usar o método .single() do multer para fazer upload de um único arquivo
router.post('/update/user/image/:id', loginRequired, removePreviousImage, upload.single('profile_picture'), UserController.updateImage);

module.exports = router;

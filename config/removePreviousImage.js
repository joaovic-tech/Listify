const fs = require('fs');

const removePreviousImage = async (req, res, next) => {
  try {
    const { username } = req.session.user;

    // Exclui todos os arquivos com o nome do usuário
    const files = fs.readdirSync('uploads');
    files.forEach(file => {
      if (file.includes(username)) {
        fs.unlinkSync(`uploads/${file}`);
      }
    });

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro ao remover imagem anterior');
  }
}

module.exports = removePreviousImage;
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/src/assets'));
app.set('views', path.join(__dirname, '/src/views'));

app.use(routes);

app.use(function (req, res) {
  res.status(404).send("<p>Página não existe <a href='/'>Home</a></p>")
});

app.listen(PORT, () => {
  console.log(`server running, ${PORT}`);
});
const express = require('express');
const homeRoutes = require('./src/routes/homeRoutes');

class App {
  constructor() {
    this.app = express();
    this.path = require('path');
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.engine('html', require('ejs').renderFile);
    this.app.set('view engine', 'html');
    this.app.use(express.static(__dirname + '/src/assets'));
    this.app.set('views', this.path.join(__dirname, '/src/views'));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
  }
}

module.exports = new App().app;

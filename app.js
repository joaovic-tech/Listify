const express = require('express');
const bodyParser = require('body-parser');
const homeRoutes = require('./src/routes/homeRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

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
    this.app.use(express.static(__dirname + '/frontend'));
    this.app.set('views', this.path.join(__dirname, '/src/views'));
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/', taskRoutes);
  }
}

module.exports = new App().app;

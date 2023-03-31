const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const homeRoutes = require('./src/routes/homeRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const registerRoutes = require('./src/routes/registerRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const editUserRoutes = require('./src/routes/editUserRoutes');
const tokenRoutes = require('./src/routes/tokenRoutes');
const readmeMD = require('./src/routes/readmeMD');

class App {
  constructor() {
    this.app = express();
    this.path = require('path');
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.static(__dirname + '/frontend'));
    this.app.set('views', this.path.join(__dirname, '/src/views'));
    this.app.set('view engine', 'ejs');
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    
    this.app.use(bodyParser.json());
      this.sessionOptions = session({
      secret: process.env.SECRETSESSION,
      store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      }
    });

    this.app.use(this.sessionOptions);
    this.app.use(flash());
  }

  routes() {
    this.app.use('/', loginRoutes);
    this.app.use('/', registerRoutes);
    this.app.use('/', homeRoutes);
    this.app.use('/', taskRoutes);
    this.app.use('/', editUserRoutes);
    this.app.use('/', tokenRoutes);
    this.app.use('/', readmeMD);
  }
}

module.exports = new App().app;

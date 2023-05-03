const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const homeRoutes = require("./src/routes/homeRoutes");
const loginRoutes = require("./src/routes/loginRoutes");
const registerRoutes = require("./src/routes/registerRoutes");
const deleteRoutes = require("./src/routes/deleteRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const updateUserRoutes = require("./src/routes/updateUserRoutes");
const tokenRoutes = require("./src/routes/tokenRoutes");
const aboutRoutes = require("./src/routes/aboutRoutes");
const readmeMD = require("./src/routes/readmeMD");
const serveStatic = require("serve-static");

class App {
  constructor() {
    this.app = express();
    this.path = require("path");
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use("/uploads", serveStatic("uploads"));
    this.app.use(express.static(__dirname + "/frontend"));
    this.app.set("views", this.path.join(__dirname, "/src/views"));
    this.app.set("view engine", "ejs");
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
        httpOnly: true,
      },
    });

    this.app.use(this.sessionOptions);
    this.app.use(flash());
  }

  routes() {
    this.app.use("/", loginRoutes);
    this.app.use("/", registerRoutes);
    this.app.use("/", homeRoutes);
    this.app.use("/", taskRoutes);
    this.app.use("/", updateUserRoutes);
    this.app.use("/", deleteRoutes);
    this.app.use("/", tokenRoutes);
    this.app.use("/", aboutRoutes);
    this.app.use("/", readmeMD);
    this.app.use(function (req, res) {
      return res.render("404", { user: req.session.user });
    });
  }
}

module.exports = new App().app;

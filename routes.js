const express = require('express');
const route = express.Router();

// home page routes
route.get('/', (req, res) => {
  res.render('home');
});

module.exports = route;

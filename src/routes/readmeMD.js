const Route = require('express').Router;
const router = new Route();
const { marked } = require('marked');
const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../../README.md');
const fileContent = fs.readFileSync(filePath, 'utf8');
const html = marked(fileContent);

router.get('/readme', (req, res) => {
  return res.send(html);
});

module.exports = router;

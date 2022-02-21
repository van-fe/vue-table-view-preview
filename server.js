const express = require('express');
const app = express();
const compression = require('compression');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

app.use(compression());
app.use(express.static(path.resolve(__dirname, './dist')));

app.get('/', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8');
  res.send(html);
});

app.listen(8899, res => {
  console.log(chalk.yellow('Start Service On 8899'));
})

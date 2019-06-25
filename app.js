const express = require('express');//załadowanie expressa
const path = require('path')
const bodyParser = require("body-parser");
const routes = require('./routes/index');

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.use('/public',express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', routes);

module.exports = app;

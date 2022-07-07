var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');
var expressValidator = require('express-validator');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

// configurar como middleware o xpress.static
app.use(express.static('./app/public'));

// configurar como middleware o body parser
app.use(bodyParser.urlencoded({ extended: true}));

// configurar como middleware o express validator
app.use(expressValidator());

load({cwd:'app'})
    .then('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;
const express = require('express');
const app = express;

const bookRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/user');

const bodyParser = require('body-pareser')
const mogan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyparser.json());

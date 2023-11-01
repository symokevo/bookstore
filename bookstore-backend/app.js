const express = require('express');
const app = express();

const bookRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/user');

const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(DB-URI);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

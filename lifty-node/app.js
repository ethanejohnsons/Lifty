const express = require('express');

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/about', aboutRouter);

module.exports = app;

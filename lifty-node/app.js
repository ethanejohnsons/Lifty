const express = require('express');

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const dataRouter = require('./routes/data');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/data', dataRouter);

module.exports = app;

const express = require('express');
const parser = require('body-parser');
const app = express();

const personRoutes = require('./routes/person.js');

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 
  'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/person/', personRoutes);

module.exports = app;
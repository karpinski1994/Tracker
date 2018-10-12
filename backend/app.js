const express = require('express');
const parser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

app.use( '/api/person/list', (req, res, next) => {
  const persons = [
    {
      id: 1,
      name: 'Patryk Karpiński',
      location: {
        lat: 10,
        lng: 10
      },
      direction: 45
    },
    {
      id: 2,
      name: 'Dawid Wietrzyński',
      location: {
        lat: 20,
        lng: 20
      },
      direction: 90
    },
    {
      id: 3,
      name: 'Olimpia Żurek',
      location: {
        lat: 30,
        lng: 30
      },
      direction: 135
    },
  ]
  res.status(200).json({
    message: 'Persons fetched sucessfully',
    persons: persons
  });
});

app.use('/api/person/add', (req, res, next) => {
  const person = req.body;
  console.log(person);
  res.status(201).json({
    message: 'Person added successfully'
  });
});

app.use('/api/person/get/:id', (req, res, next) => {
  res.send('GET');
});

app.use('/api/person/delete/:id', (req, res, next) => {
  res.send('DEL');
});

module.exports = app;
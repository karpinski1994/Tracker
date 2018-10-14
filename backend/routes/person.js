const express = require('express');
const router = express.Router();
const fs = require('fs');

const areObjEqual = require('../utils/areObjEqual');

const filePath = '/tracker-data/persons.json';

router.post('/add', (req, res, next) => {
  const person = req.body;
  let curPersons = [];
  let prevPersons = [];
  // mozna try catcha wrabac
  if (fs.existsSync(filePath)) {
    const rawPrevPersons = fs.readFileSync(filePath);
    prevPersons = [...JSON.parse(rawPrevPersons)];
    const existingPersonIndex = prevPersons.findIndex(p => areObjEqual(p, person));
    if (existingPersonIndex === -1) {
      prevPersons.push(person);
    }
  } else {
    prevPersons.push(person);
  }
  curPersons = prevPersons;
  fs.writeFile(filePath, JSON.stringify(curPersons), (err) => {
    res.status(201).json({
      message: 'Person added successfully.',
      persons: curPersons
    });
  });
});

router.get('/list', (req, res, next) => {
  let personsData = {};
  // mozna try catcha wrabac
  if (fs.existsSync(filePath)) {
    const rawPrevPersons = fs.readFileSync(filePath);
    const persons = [...JSON.parse(rawPrevPersons)];
    personsData = {
      message: 'Persons fetched successfully.',
      persons: persons
    };
    res.status(201).json(personsData);
  } else {
    personsData = {
      message: 'File with persons doesn\'t exist.',
    }
    res.status(404).json(personsData);
  }
});

router.get('/get/:id', (req, res, next) => {
  let personData = {};
  const personId = parseInt(req.params.id);
  // mozna try catcha wrabac
  if (fs.existsSync(filePath)) {
    const rawPersons = fs.readFileSync(filePath);
    const persons = [...JSON.parse(rawPersons)];
    const person = persons.find(p => p.id === personId);
    personData = {
      message: 'Person fetched successfully.',
      person: person
    };
    res.status(201).json(personData);
  } else {
    personData = {
      message: 'File with persons doesn\'t exist.',
    }
    res.status(404).json(personData);
  }
});

router.get('/delete/:id', (req, res, next) => {
  console.log('BLABLABLABLABLA');
  let personsData = {};
  const personId = parseInt(req.params.id);
  // mozna try catcha wrabac
  if (fs.existsSync(filePath)) {
    const rawPersons = fs.readFileSync(filePath);
    const persons = [...JSON.parse(rawPersons)];
    const removedPersonIndex = persons.findIndex(p => p.id === personId);
    persons.splice(removedPersonIndex, 1);
    personsData = {
      message: 'Person deleted successfully.',
      persons: persons,
    };
    fs.writeFile(filePath, JSON.stringify(persons), (err) => {
      res.status(201).json(personsData);
    });
  } 
  else {
    personsData = {
      message: 'File with persons doesn\'t exist.',
    }
    res.status(404).json(personsData);
  }
  
});

module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require('fs');

const areObjEqual = require('../utils/areObjEqual');

const filePath = '/tracker-data/persons.json';

const WalkingManager = require('../managers/WalkingManager');
const walkingManager = new WalkingManager();

getRandomInt = (min, max) => {
  return Math.random() * (max - min) + min;
}

interval = (func, wait, times) => {
  let localTimer;
  let interv = function(w, t){
      return function(){
          if(typeof t === "undefined" || t-- > 0){
            localTimer = setTimeout(interv, w);
              try{
                  func.call(null);
              }
              catch(e){
                  t = 0;
                  throw e.toString();
              }
          }
      };
  }(wait, times);

  setTimeout(interv, wait);
  return {
    clear: () => {
      clearTimeout(localTimer);
    }
  };
};

module.exports = (io) => {

  let timer;

  router.post('/add', (req, res) => {
    const person = req.body;
    let curPersons = [];
    let prevPersons = [];
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
    fs.writeFileSync(filePath, JSON.stringify(curPersons));
    res.status(201).json({
      message: 'Person added successfully.',
      persons: curPersons
    });
    io.sockets.emit('persons', curPersons);
  });

  router.get('/list', (req, res) => {
    let personsData = {};
    if (fs.existsSync(filePath)) {
      const rawPrevPersons = fs.readFileSync(filePath);
      const persons = [...JSON.parse(rawPrevPersons)];
      personsData = {
        message: 'Persons fetched successfully.',
        persons: persons
      };
      res.status(201).json(personsData);
      io.sockets.emit('persons', personsData.persons);
    } else {
      personsData = {
        message: 'File with persons doesn\'t exist.',
      }
      res.status(404).json(personsData);
    }
  });

  router.get('/get/:id', (req, res) => {
    let personData = {};
    const personId = req.params.id;
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

  router.delete('/delete/:id', (req, res) => {
    let personsData = {};
    const personId = req.params.id;
    if (fs.existsSync(filePath)) {
      const rawPersons = fs.readFileSync(filePath);
      const persons = [...JSON.parse(rawPersons)];
      const removedPersonIndex = persons.findIndex(p => p.id === personId);
      persons.splice(removedPersonIndex, 1);
      personsData = {
        message: 'Person deleted successfully.',
        persons: persons,
      };
      fs.writeFileSync(filePath, JSON.stringify(persons));
      res.status(201).json(personsData);
      io.sockets.emit('persons', personsData.persons);
    }
    else {
      personsData = {
        message: 'File with persons doesn\'t exist.',
      }
      res.status(404).json(personsData);
    }
  });

  router.put('/mode/walking', () => {
    let isTimerSet = false;
    if(!isTimerSet) {
      timer = interval(() => {
        const rawPrevPersons = fs.readFileSync(filePath);
        const persons = [...JSON.parse(rawPrevPersons)];
        let newPersons = persons;
        newPersons = persons;
        personsData = {
          message: 'Persons fetched successfully.',
          persons: newPersons
        };
        newPersons = walkingManager.moveAll(persons);
        personsData = {
          message: 'Persons fetched successfully.',
          persons: newPersons
        };
        fs.writeFileSync(filePath, JSON.stringify(newPersons));
        io.sockets.emit('persons', newPersons);
      }, 1000);
      isTimerSet = true;
    }
  });

  router.put('/mode/stationary', () => {
    console.log('STOP')
    isTimerSet = false;
    if (timer) timer.clear();
  });
  return router;
};

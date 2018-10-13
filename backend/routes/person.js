const express = require('express');
const router = express.Router();
const fs = require('fs');

const areObjEqual = require('../utils/areObjEqual');

router.post('/add', (req, res, next) => {
  // firstly check if file exists
  const person = req.body;
  let curPersons;
  const rawPrevPersons = fs.readFileSync('/tracker-data/persons.json');
  const prevPersons = [...JSON.parse(rawPrevPersons)];
  const existingPersonIndex = prevPersons.findIndex(p => areObjEqual(p, person));
  if (existingPersonIndex === -1) {
    prevPersons.push(person);
  } 
  curPersons = prevPersons;
  fs.writeFile('/tracker-data/persons.json', JSON.stringify(curPersons), (err) => {
    res.status(201).json({
      message: 'Person added successfully.',
      persons: curPersons
    });
  });
});

module.exports = router;
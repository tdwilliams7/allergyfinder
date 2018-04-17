const express = require('express');
const Allergy = require('./allergySchema');

const allergyRouter = express.Router();

allergyRouter.get('/', (req, res) => {
  Allergy.find({})
    .then(allergies => {
      res.status(200).json(allergies);
    })
    .catch(err => {
      console.log(err);
    });
});

allergyRouter.post('/new', (req, res) => {
  const allergy = new Allergy(req.body);
  allergy
    .save()
    .then(als => {
      res.send(als);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = allergyRouter;

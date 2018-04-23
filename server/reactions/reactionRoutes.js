const express = require('express');
const Reaction = require('./reactionSchema');

const reactionRouter = express.Router();

reactionRouter.get('/', (req, res) => {
  Reaction.find({})
    .then(reacts => {
      res.status(200).json(reacts);
    })
    .catch(err => {
      res.send(err);
    });
});

reactionRouter.post('/new', (req, res) => {
  const { name } = req.body;
  if (name) {
    const reaction = new Reaction({ name });
    reaction
      .save()
      .then(reactions => {
        res.status(200).json(reactions);
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    res.status(422).json({ err: 'Include a name of the reaction' });
  }
});

module.exports = reactionRouter;

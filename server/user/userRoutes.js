const express = require('express');
const userRouter = express.Router();
const User = require('./userSchema');

userRouter.post('/signUp', (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    res.status(422).json({ err: 'Please include a Name' });
  } else if (!email) {
    res.status(422).json({ err: 'please include an email' });
  } else if (!password) {
    res.status(422).json({ err: 'please include a password' });
  } else {
    const user = new User({ name, email, password });
    user
      .save()
      .then(signedUp => {
        res.status(200).json({ newUser: signedUp });
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  }
});

module.exports = userRouter;

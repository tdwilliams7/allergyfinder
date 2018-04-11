const express = require('express');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const User = require('./userSchema');
const config = require('../newconfig');

userRouter.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    res.status(422).json({ err: 'Please include a Name' });
  } else if (!email) {
    res.status(422).json({ err: 'please include an email' });
  } else if (!password) {
    res.status(422).json({ err: 'please include a password' });
  } else {
    const user = new User(req.body);
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

userRouter.post('/login', (req, res) => {
  const { email, password, token } = req.body;
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      User.findOne({ email: decoded.email })
        .then(user => {
          if (user) {
            res.send({
              token,
              id: user._id,
              name: user.name,
              pictureUrl: user.profileUrl
            });
          } else {
            res
              .status(422)
              .json({ error: `Cannot find user with email: ${email}` });
          }
        })
        .catch(err => {
          res.send(err);
        });
    });
  } else {
    User.findOne({ email })
      .then(user => {
        if (user) {
          user.checkPassword(password, (err, isMatch) => {
            if (err) {
              res.send(err);
            }
            if (isMatch) {
              const payload = {
                email: user.email,
                id: user._id
              };
              const token = jwt.sign(payload, config.secret, {
                expiresIn: '24h'
              });
              res.send({
                token,
                id: user._id,
                name: user.name,
                pictureUrl: user.profileUrl
              });
            } else {
              res.send(isMatch);
            }
          });
        } else {
          res
            .status(422)
            .json({ error: `Cannot find user with email: ${email}` });
        }
      })
      .catch(err => {
        res.send(err);
      });
  }
});

userRouter.patch('/profile', (req, res) => {
  console.log(req.body);
});

module.exports = userRouter;

const express = require('express');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const User = require('./userSchema');
const Allergy = require('../allergy/allergySchema');
const Contact = require('../contact/contactSchema');
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
              pictureUrl: user.profileUrl,
              dob: user.dob,
              allergies: user.allergies,
              contacts: user.contacts,
              doctors: user.doctors
            });
          } else {
            res
              .status(422)
              .json({ error: `Cannot find user with email: ${email}` });
          }
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        });
    });
  } else {
    User.findOne({ email })
      .then(user => {
        if (user) {
          user.checkPassword(password, (err, isMatch) => {
            if (err) res.send(err);
            if (isMatch) {
              const payload = {
                email: user.email,
                id: user._id
              };
              const token = jwt.sign(payload, config.secret);
              res.send({
                token,
                id: user._id,
                name: user.name,
                pictureUrl: user.profileUrl,
                dob: user.dob,
                allergies: user.allergies,
                contacts: user.contacts,
                doctors: user.doctors
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
        console.log(err);
        res.send(err);
      });
  }
});

userRouter.patch('/profile/update', (req, res) => {
  const { name, dob } = req.body.updatedInfo;
  jwt.verify(req.body.token, config.secret, (err, decoded) => {
    if (err) res.send({ err });
    const _id = decoded.id;
    User.findOneAndUpdate(_id, { name, dob }, { new: true })
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        console.log({ err });
      });
  });
});

userRouter.patch('/profile/allergy', (req, res) => {
  const { allergy } = req.body;
  jwt.verify(req.body.token, config.secret, (err, decoded) => {
    // console.log(new Allergy(allergy));
    User.findOneAndUpdate(
      { _id: decoded.id },
      { $push: { allergies: new Allergy(allergy) } },
      { new: true }
    )
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

userRouter.patch('/profile/contact', (req, res) => {
  const { contact } = req.body;
  jwt.verify(req.body.token, config.secret, (err, decoded) => {
    User.findOneAndUpdate(
      { _id: decoded.id },
      { $push: { contacts: new Contact(contact) } },
      { new: true }
    )
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

userRouter.patch('/profile/doctor', (req, res) => {
  const { doctor } = req.body;
  jwt.verify(req.body.token, config.secret, (err, decoded) => {
    User.findOneAndUpdate(
      { _id: decoded.id },
      { $push: { doctors: doctor } },
      { new: true }
    )
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

module.exports = userRouter;

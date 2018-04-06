const express = require('express');

const userRouter = express.Router();

userRouter.post('/', (req, res) => {
  const { name, email, password } = req.body;
  res.send({ name, email, password });
});

module.exports = userRouter;

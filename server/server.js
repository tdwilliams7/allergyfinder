const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./user/userRoutes');

const server = express();
const PORT = process.env.PORT || 8080;

server.use(express.json());
server.use('/user', userRouter);

mongoose
  .connect('mongodb://localhost/allergyfinder')
  .then(succ => {
    server.listen(PORT, () => console.log(`Up and running on port: ${PORT}`));
  })
  .catch(err => {
    console.log('error connecting to mongodb');
  });

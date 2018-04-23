const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./user/userRoutes');
const allergyRouter = require('./allergy/allergyRoutes');
const reactionRouter = require('./reactions/reactionRoutes');
const cors = require('cors');
const path = require('path');

const server = express();
const PORT = process.env.PORT || 8080;

server.use(express.static(path.join(__dirname, '/../client/build')));

server.use(express.json());
server.use(cors());
server.use('/users', userRouter);
server.use('/allergy', allergyRouter);
server.use('/reaction', reactionRouter);

server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

mongoose
  .connect('mongodb://localhost/allergyfinder')
  .then(succ => {
    server.listen(PORT, () => console.log(`Up and running on port: ${PORT}`));
  })
  .catch(err => {
    console.log('error connecting to mongodb');
  });

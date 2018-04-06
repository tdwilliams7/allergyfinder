const express = require('express');

const server = express();

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Up and running on port: ${PORT}`));

'use strict';
const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
require('dotenv').config();
// const axios = require('axios');
const PORT = process.env.PORT;

const weatherHandler = require('./Weather');
const movieHandler = require('./Movies');


server.listen(PORT, () => {
  console.log(PORT);
});

server.get('/weather', weatherHandler);
server.get('/movie', movieHandler);



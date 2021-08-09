'use strict';

const express = require('express'); // require the express package
const cors = require('cors');
const server = express();
server.use(cors());
require('dotenv').config();
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(PORT, 'The  server is working');
});

class ForeCast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}
server.get('/data/weather.json', (req, res) => {
  let city = req.query.searchQuery;
  let lat = req.query.lat;
  let long = req.query.long;
  let found = weatherData.find((element) => {
    if (city.toLowerCase() === element.city_name.toLowerCase() && lat === element.lat && long === element.lon) {
      return element;
    }
  });
  try {
    let forecastArray = [];
    let date;
    let description;
    let forecastData;
    for (let i = 0; i < found.data.length; i++) {
      date = found.data[i].valid_date;
      description = `low of ${found.data[i].min_temp}, hight of ${found.data[i].max_temp} with ${found.data[i].weather.description}`;
      forecastData = new ForeCast(date, description);
      forecastArray.push(forecastData);
    }

    res.send(forecastArray);
  } catch (error) {
    res.status(500).send(' the data does not exit ');
  }
});

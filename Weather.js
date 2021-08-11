'use strict';


const axios = require('axios');

const weatherkey = process.env.WEATHER_API_KEY;


class ForeCast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = `low of ${item.min_temp}, hight of ${item.max_temp} with ${item.weather.description}`;
  }
}


function weatherHandler(req, res) {
  let city = req.query.searchQuery;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${weatherkey}`;
  axios.get(url).then(result => {
    let forcastArr = result.data.data.map(element => {
      return new ForeCast(element);
    });
    res.send(forcastArr);
  })
    .catch(error => {
      res.status(500).send('data not found');
    });
}

module.exports = weatherHandler;

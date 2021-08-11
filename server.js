'use strict';
const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
require('dotenv').config();
const axios = require('axios');
const PORT = process.env.PORT;
const weatherkey = process.env.WEATHER_API_KEY;
const moviekey = process.env.MOVIE_API_KEY;



server.listen(PORT, () => {
  console.log(PORT);
});


class ForeCast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = `low of ${item.min_temp}, hight of ${item.max_temp} with ${item.weather.description}`;
  }
}
class Movie {
  constructor(item) {
    this.title = item.original_title;
    this.overview = item.overview;
    this.avgVotes = item.vote_average;
    this.totalVotes = item.vote_count;
    this.imagePath = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    this.popularity = item.popularity;
    this.releaseDate = item.release_date;

  }
}
server.get('/weather', weatherHandler);
server.get('/movie', movieHandler);

function weatherHandler(req, res) {
  let city = req.query.searchQuery;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${weatherkey}`;

  axios.get(url).then(result => {
    let forecastArray = result.data.data.map(element => {
      return new ForeCast(element);
    });
    res.send(forecastArray);
  })
    .catch(error => {
      res.status(500).send('data not found');
    });
}
function movieHandler(req, res) {
  let city = req.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${moviekey}&query=${city}`;


  axios.get(url).then(result => {
    let movieArr = result.data.results.map(element => {
      return new Movie(element);
    });
    res.send(movieArr);
    console.log(movieArr);
  })
    .catch(error => {
      res.status(500).send(`data not found.${error}`);
    });
}

'use strict';

const axios = require('axios');

const movieKey = process.env.MOVIE_API_KEY;

class Movies {
  constructor(item) {
    this.title = item.original_title;
    this.overview = item.overview;
    this.avgVotes = item.vote_average;
    this.totalVotes= item.vote_count;
    this.imagePath =`https://image.tmdb.org/t/p/w500${item.poster_path}`;
    this.popularity = item.popularity;
    this.releaseDate = item.release_date;

  }
}

function movieHandler(req, res) {
  let city = req.query.searchQuery;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${city}`;
  axios.get(url).then(result => {
    let movieArray = result.data.results.map(element => {
      return new Movies(element);
    });
    res.send(movieArray);
  })
    .catch(error => {
      console.log(error.response.status);
      let e=error.response.status;
      res.status(e).send(`data not found.${error}`);
    });
}

module.exports = movieHandler;

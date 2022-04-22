'use strict';

const axios = require('axios');



async function getMovies(req,res) {
  
  let movieQueryCity = req.query.movieQueryCity;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieQueryCity}`
  let cityMovie = await axios.get(url);
  
  let selectedMovie = cityMovie.data.results.map(dailyMovie => {
    return new Movie(dailyMovie);
  });

  res.send(selectedMovie);
}



class Movie {
  constructor(cityMovie) {
    this.title = cityMovie.original_title;
    this.description = cityMovie.overview;
    this.avgVotes = cityMovie.vote_average;
    this.totalVotes = cityMovie.vote_count;
    this.popularity = cityMovie.popularity;
    this.releasedOn = cityMovie.released_date;
    this.img = cityMovie.poster_path;
  }
}
module.exports = getMovies;
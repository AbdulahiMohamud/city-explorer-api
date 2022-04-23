"use strict";

const axios = require("axios");

let cache = require("./cache.js");

module.exports = getMovies;
async function getMovies(movieCity) {
  // console.log(movieCity);
  const key = "movie-" + movieCity;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieCity}`;
console.log(url);

  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log("Cache hit");
  } else {
    console.log("Cache miss");
    cache[key] = {};
    cache[key].timestamp = Date.now();
    let serverData = await axios.get(url);
    cache[key].data = parseMovie(serverData.data);
  }
    console.log(cache[key]);
  return cache[key].data;
}
function parseMovie(movieData) {
  
  try {
    const movieSummaries = movieData.results.map((cityMovie) => {
      
      return new Movie(cityMovie);
    });

    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}
class Movie {
  constructor(cityMovie) {
    this.title = cityMovie.original_title;
    this.description = cityMovie.overview;
    this.avgVotes = cityMovie.vote_average;
    this.totalVotes = cityMovie.vote_count;
    this.popularity = cityMovie.popularity;
    this.releasedOn = cityMovie.release_date;
    this.img = cityMovie.poster_path;
  }
}

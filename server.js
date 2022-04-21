'use strict';

console.log('test');
// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for server

require('dotenv').config();
const weatherData = require('./data/weather.json');
const express = require('express');
const app = express();
const axios = require('axios');

// ALLOWS SHARING BETWEEN MULTIPLE COMPUTERS
const cors = require('cors');
const { response } = require('express');
const res = require('express/lib/response');

app.use(cors());


// USE
// Once we have required something, we have to use it. This is where we assign the required field a variable. React does this in one step with "import." express takes 2 steps: 'require" and 'use.'
// TELLING APP TO USE CORS
// define PORT and validate that my .env file is working
const PORT = process.env.PORT || 3002;
// if my server is running on 3002, I know something is wrong with my .env file or how I'm importing the values from it.
app.get('/' , (req,res) => {
  res.send('Work in progress');
})

app.get('/weather' , async (request,response) => {
  
  let searchQueryCity = request.query.searchQueryCity;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQueryCity}&key=${process.env.WEATHER_API_KEY}&days=3&lat=23&lon=155`;
  let cityWeather = await axios.get(url);
  let selectedCity = cityWeather.data.data.map(dailyWeather => {
    return new Forecast(dailyWeather);
  });

  response.send(selectedCity);

})

app.get('/movies' ,async (req,res) => {
  
  let movieQueryCity = req.query.movieQueryCity;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieQueryCity}`
 
  let cityMovie = await axios.get(url);
  
  
  let selectedMovie = cityMovie.data.results.map(dailyMovie => {
    return new Movie(dailyMovie);
  });


  res.send(selectedMovie);
})


// errors
app.get('*', (request, response) => {
  response.send('Page not found here : error');
})
// CLASSESs
class Forecast {
  constructor(cityWeather) {
    this.date = cityWeather.datetime;
    this.description = cityWeather.weather.description;
  }
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

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

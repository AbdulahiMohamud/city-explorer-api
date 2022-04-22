'use strict';

console.log('test');
// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for server

require('dotenv').config();
const weatherData = require('./data/weather.json');
const express = require('express');
const app = express();
const axios = require('axios');
const getWeather = require('./weather.js');
const getMovies = require('./movie.js');

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

// gets weather data 
app.get('/weather' , getWeather);

// gets movies data 
app.get('/movies' , getMovies);




// errors
app.get('*', (request, response) => {
  response.send('Page not found here : error');
})
// CLASSESs



app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

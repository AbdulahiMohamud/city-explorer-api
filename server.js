'use strict';

console.log('test');
// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for server

require('dotenv').config();
const weatherData = require('./data/weather.json');
const express = require('express');
const app = express();

// ALLOWS SHARING BETWEEN MULTIPLE COMPUTERS
const cors = require('cors');
const { response } = require('express');

app.use(cors());


// USE
// Once we have required something, we have to use it. This is where we assign the required field a variable. React does this in one step with "import." express takes 2 steps: 'require" and 'use.'
// TELLING APP TO USE CORS
// define PORT and validate that my .env file is working
const PORT = process.env.PORT || 3002;
// if my server is running on 3002, I know something is wrong with my .env file or how I'm importing the values from it.

app.get('/weather' ,(request,response) => {
  
  let searchQueryCity = request.query.searchQueryCity;
  let cityWeather = weatherData.find((e) => e.city_name.toLowerCase() === searchQueryCity.toLowerCase());
  let selectedCity = cityWeather.data.map(dailyWeather => {
    return new Forecast(dailyWeather);
  });

  response.send(selectedCity);

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

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

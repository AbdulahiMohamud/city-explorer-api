'use strict';

const axios = require('axios');

async function getWeather (request,response) {
  
  let searchQueryCity = request.query.searchQueryCity;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQueryCity}&key=${process.env.WEATHER_API_KEY}&days=3&lat=23&lon=155`;
  let cityWeather = await axios.get(url);
  let selectedCity = cityWeather.data.data.map(dailyWeather => {
    return new Forecast(dailyWeather);
  });

  response.send(selectedCity);

}

class Forecast {
  constructor(cityWeather) {
    this.date = cityWeather.datetime;
    this.description = cityWeather.weather.description;
  }
}





module.exports = getWeather;

'use strict';

const axios = require('axios');

let cache = require('./cache.js');

module.exports = getWeather;
async function getWeather(city) {
  // console.log(city.query.searchQueryCity);
  const key = 'weather-' + city;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`;
  
  console.log('URL HERE',url);
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
    .then(response => parseWeather(response.data));
  }
  
  return cache[key].data;
}
function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}


class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

module.exports = getWeather;
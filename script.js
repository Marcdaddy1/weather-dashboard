
var apiKey = 'f05ae6a9d22f48e3ae3225444232803';
var searchFormEl = document.querySelector('#search-form');
var searchInputEl = document.querySelector('#search-input');
var historyEl = document.querySelector('#history');
var todayEl = document.querySelector('#today');
var forecastEl = document.querySelector('#forecast');
var cities = [];

// Function to fetch weather data from API
function getWeatherData(city) {
  // API URL with city name and API key
  var apiUrl = 'http://api.weatherapi.com/v1' + city + '&units=metric&appid=' + apiKey;
  
  // Fetch current weather info
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Unable to retrieve current weather data.');
      }
    })
    .then(function (data) {

      // Display current weather info
      todayEl.innerHTML = '<h2>' + data.name + '</h2>' +
                          '<p>' + moment().format('MMMM Do YYYY') + '</p>' +
                          '<img src="http://api.weatherapi.com/v1' + data.weather[0].icon + '.png" alt="' + data.weather[0].description + '">' +
                          '<p>Temperature: ' + data.main.temp + ' °C</p>' +
                          '<p>Humidity: ' + data.main.humidity + '%</p>' +
                          '<p>Wind Speed: ' + data.wind.speed + ' m/s</p>';
      
      // Fetch 5-day forecast info

      apiUrl = 'http://api.weatherapi.com/v1' + city + '&units=metric&appid=' + apiKey;
      return fetch(apiUrl);
    })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Unable to retrieve forecast weather data.');
      }
    })
    .then(function (data) {

      // Display 5-day forecast info

      var forecastHtml = '';
      for (var i = 0; i < data.list.length; i += 8) {
        forecastHtml += '<div class="col-md-2">' +
                        '<p>' + moment(data.list[i].dt_txt).format('MMMM Do YYYY') + '</p>' +
                        '<img src="http://api.weatherapi.com/v1' + data.list[i].weather[0].icon + '.png" alt="' + data.list[i].weather[0].description + '">' +
                        '<p>Temperature: ' + data.list[i].main.temp + ' °C</p>' +
                        '<p>Humidity: ' + data.list[i].main.humidity + '%</p>' +
                        '</div>';
      }
      forecastEl.innerHTML = forecastHtml;
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Function to display search history

function SearchHistory() {

  // Clear existing search history
  historyEl.innerHTML = '';
  
  // Create new search history list

  for (var i = 0; i < cities.length; i++) {
    historyEl.innerHTML += '<button type="button" class="list-group-item list-group-item-action">' + cities[i] + '</button>';
  }
}

// Function to handle search form submission

function SearchFormSubmit(event) 
  event.preventDefault();
  
  // Get search input value and clear input field

  var city = searchInputEl.value.trim();
  searchInputEl.value = '';







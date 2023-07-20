const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");
const weatherIconEl = document.getElementById("weather-icon");
const temperatureEl = document.getElementById("temperature");
const weatherDescriptionEl = document.getElementById("weather-description");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");
const apiKey = "42039962d373fcc51d2f9970b8175f4c";
const weatherDataEl = document.getElementById("weather-data");
let cityName = "";

formEl.addEventListener("submit", renderCityWeatherData);

function renderCityWeatherData(event) {
  event.preventDefault();

  getCityName();

  getCityWeatherData(cityName);
}

function getCityName() {
  cityName = cityInputEl.value;
}

async function getCityWeatherData(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Please ensure that you have entered a correct city name. 🤦‍♀️"
      );
    }

    const data = await response.json();
    console.log(data);
    displayCityWeatherData(data);
  } catch (error) {
    displayErrorMessage(error.message);
  }
}

function displayCityWeatherData(data) {
  const weatherIcon = data.weather[0].icon;
  const temperature = Math.round(data.main.temp);
  const weatherDescription = data.weather[0].description;
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  weatherDataEl.innerHTML = `<div class="weather-icon" id="weather-icon">
    <img
      src="http://openweathermap.org/img/wn/${weatherIcon}.png"
      alt="Weather-Icon"
    />
  </div>
  <div class="temperature" id="temperature">${temperature}°C</div>
  <div class="weather-description" id="weather-description">
    ${weatherDescription}
  </div>
  <div class="weather-details" id="weather-details">
    <div id="feels-like">Feels like: ${feelsLike}°C</div>
    <div id="humidity">Humidity: ${humidity}%</div>
    <div id="wind-speed">Wind speed: ${windSpeed}m/s</div>
  </div>`;
}

function displayErrorMessage(message) {
  weatherDataEl.innerHTML = `<div class="error-message">${message}</div>`;
}

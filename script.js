/* -------------------------------- API KEY ------------------------------- */

let APIKEY = "21d2cad1715d85751c0dddc41d01b75c";
let cityName = document.getElementById("cityName");
let weatherTime = document.getElementById("weatherTime");
let weatherDay = document.getElementById("weatherDay");
let tempValue = document.getElementById("tempValue");
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");

// let weatherIcon = document.getElementById("weatherIcon");
var weatherIcon;

let weatherPressure = document.getElementById("weatherPressure");
let weatherHumidity = document.getElementById("weatherHumidity");
let weatherWind = document.getElementById("weatherWind");

navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  // Show a map centered at latitude / longitude.
  console.log(latitude, longitude);

  getWeather(latitude, longitude);
});

function getWeather(latitude, longitude) {
  let APIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;

  fetch(APIUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      showWeather(data);
    });
}

function showWeather(data) {
    console.log(data);

    // getting the time for the weather
    let time = new Date(data.dt * 1000);
    let day = time.toDateString().split(" ")[0];
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let formattedTime = `${hours}:${minutes}`;
    weatherTime.innerHTML = formattedTime;
    weatherDay.innerHTML = day;
    cityName.innerHTML = data.name;
    tempValue.innerHTML = (data.main.temp - 273).toFixed(0);

    // showing the weather icon based on weather information
    if (data.weather[0].main == "Clear") {
       weatherIcon = "./icons/sun.svg";
    } else if (data.weather[0].main == "Clouds") {
        weatherIcon = "./icons/clouds.svg";
    } else if (data.weather[0].main == "Cloud") {
        weatherIcon = "./icons/cloud.svg";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon = "./icons/rain.svg";
    } else if (data.weather[0].main == "Snow") {
        weatherIcon = "./icons/snow.svg";
    } else if (data.weather[0].main == "Thunderstorm") {
        weatherIcon= "./icons/thunderstorm.svg";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon= "./icons/clouds-and-sun.svg";
    }

    weatherPressure.innerHTML = data.main.pressure;
    weatherHumidity.innerHTML = data.main.humidity;
    weatherWind.innerHTML = data.wind.speed;

    let cityNameForFiveDayForecast = data.name;

    getFiveDayForecast(cityNameForFiveDayForecast)
}

function getFiveDayForecast(cityName) {
    let APIURLforFiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}`;

    fetch(APIURLforFiveDayForecast).then(
        response => response.json()).then(
        data => showFiveDayForecast(data)
    )


}

function showFiveDayForecast(data) {
    console.log(data)
    for (let i = 0; i < data.list.length; i = i + 8) {
      console.log(data.list[i]);

      // getting the day name for the weather forecast
      let time = new Date(data.list[i].dt * 1000);
      let day = time.toDateString().split(" ")[0];
      console.log(day);

      
      let weatherForecast = document.querySelector(".weather-forecast");
      console.log(weatherForecast)
      let div = document.createElement("div");
      div.classList.add("weather-forecast-day-" + (i / 8 + 1));
      div.innerHTML = `
        <h3>${day}</h3>
        <img src="./icons/${data.list[i].weather[0].main.toLowerCase()}.svg" alt=${data.list[i].weather[0].main}">
        <p>${(data.list[i].main.temp_max - 273).toFixed(0)}°/${(data.list[i].main.temp_min - 273).toFixed(0)}°</p>
      `
      weatherForecast.appendChild(div);
    }
}

/* ------------------------------ Searching for a city----------------------------- */

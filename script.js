/* -------------------------------- API KEY ------------------------------- */

let APIKEY = "21d2cad1715d85751c0dddc41d01b75c";
let cityName = document.getElementById("cityName");
let weatherTime = document.getElementById("weatherTime");
let weatherDay = document.getElementById("weatherDay");
let tempValue = document.getElementById("tempValue");

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
    .then((data) => 
    {
        showWeather(data);
    })
}

function showWeather(data){
    console.log(data);

    //getting the time for the weather
    let time = new Date(data.dt*1000)
    let hours = time.getHours();
    let minutes = "0" + time.getMinutes();
    let formattedTime = `${hours}:${minutes}`;
    let day = time.toDateString().split(" ")[0];
    weatherTime.innerHTML = formattedTime;
    weatherDay.innerHTML = day;
    cityName.innerHTML = data.name;
    tempValue.innerHTML = (data.main.temp - 292).toFixed(0);

    //showing the weather icon based on current weather information 
    if(data.weather[0].main == "Clear") {
      weatherIcon.src = "./icons/sun.svg";
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./icons/clouds.svg";
    } else if (data.weather[0].main == "Cloud") {
      weatherIcon.src = "./icons/cloud.svg";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./icons/rain.svg";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "./icons/snow.svg";
    } else if (data.weather[0].main == "Thunderstorm") {
      weatherIcon.src = "./icons/thunderstorm.svg";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./icons/clouds-and-sun.svg";
    }

}






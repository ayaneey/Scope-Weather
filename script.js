/* -------------------------------- API KEY ------------------------------- */

let APIKEY = "21d2cad1715d85751c0dddc41d01b75c";
let cityName = document.getElementById("cityName");
let weatherTime = document.getElementById("weatherTime");
let weatherDay = document.getElementById("weatherDay");
console.log(cityName);

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
    let seconds = "0" + time.getSeconds();
    let formattedTime = hours + ':' + minutes.substring(-2) + ':' + seconds.substring(-2);
    let day = time.toDateString();
    console.log(day);
    
    weatherTime.innerHTML = formattedTime;
}






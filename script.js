/* -------------------------------- API KEY ------------------------------- */

let APIKEY = '21d2cad1715d85751c0dddc41d01b75c';

navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  // Show a map centered at latitude / longitude.
  console.log(latitude, longitude)

  getWeather(latitude, longitude);
});

function getWeather(latitude, longitude){
   let APIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;

   fetch(APIUrl).then
   ((response) => {
    console.log(response)
   })
}



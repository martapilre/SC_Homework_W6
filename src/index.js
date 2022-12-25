let apiKey = "b40b135798f82a05aed08769f9275f50";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
let units = "metric";

//Hours and Date
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();

  currentMinutes = currentMinutes > 9 ? currentMinutes : "0" + currentMinutes;
  currentHour = currentHour > 9 ? currentHour : "0" + currentHour;

  let formattedDate = `${currentDay}, ${currentHour}:${currentMinutes}`;

  return formattedDate;
}

let dataTime = document.querySelector("#datatime");
dataTime.innerHTML = formatDate(new Date());

// name and the current temperature of the city
function showWeather(response) {
  let city = document.querySelector("#city");
  let countries = document.querySelector("#country");
  let degrees = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);

  city.innerHTML = response.data.name;
  countries.innerHTML = response.data.sys.country;
  degrees.innerHTML = temperature;
}

function seeSearchedCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let url = `${apiUrl}q=${inputCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

let signUpForm = document.querySelector("#city-form");
signUpForm.addEventListener("submit", seeSearchedCity);

//current location
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let X = `${apiUrl}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(X).then(showWeather);
}

let currentBtn = document.querySelector("#currentBtn");
currentBtn.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(currentPosition)
);

//Change Celsius for F
function changeForC(event) {
  event.preventDefault();
  document.querySelector("#celsius").classList.add("selected");
  document.querySelector("#fahrenheit").classList.remove("selected");

  document.querySelector("#temperature").innerHTML = 12;
}

function changeForF(event) {
  document.querySelector("#fahrenheit").classList.add("selected");
  document.querySelector("#celsius").classList.remove("selected");

  document.querySelector("#temperature").innerHTML = 53.6;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeForC);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeForF);

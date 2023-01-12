function formatDate(timestamp) {
    // calculate the date
    let date = new Date(timestamp);
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hour}:${minutes}`
}

function formatDay(timstamp) {
    let date = new Date(timstamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="${forecastDay.condition.icon_url}"
          alt="${forecastDay.condition.icon}"
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temperature.maximum)}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temperature.minimum)}° </span>
        </div>
      </div>
  `;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "f9328ad30706aefa211bt4fddce8obf6";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let countryElement = document.querySelector('#country');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind')
    let dateElement = document.querySelector('#date');
    let iconElement = document.querySelector('#icon');

    try {
        celsiusTemperature = response.data.temperature.current;


        let country = response.data.country.charAt(0).toLowerCase() + response.data.country.slice(1);

        temperatureElement.innerHTML = Math.round(celsiusTemperature);
        cityElement.innerHTML = response.data.city;
        countryElement.setAttribute("src", `https://countryflagsapi.com/png/${country}`);
        countryElement.setAttribute("alt", response.data.country);
        countryElement.setAttribute("title", response.data.country);
        descriptionElement.innerHTML = response.data.condition.description;
        humidityElement.innerHTML = response.data.temperature.humidity;
        windElement.innerHTML = response.data.wind.speed;
        dateElement.innerHTML = formatDate(response.data.time * 1000);
        iconElement.setAttribute("src", response.data.condition.icon_url);
        iconElement.setAttribute("alt", response.data.condition.icon);


        getForecast(response.data.coordinates);
    } catch (err) {
        alert("Please, enter a valid city!")
    }

}


function search(city) {
    let apiKey = "f9328ad30706aefa211bt4fddce8obf6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city-input");
    search(cityElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", navigator.geolocation.getCurrentPosition(currentPosition));

//current location
function currentPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let latlongUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=f9328ad30706aefa211bt4fddce8obf6&units=metric`;
    axios.get(latlongUrl).then(displayTemperature);
}

function getCurrentCity() {
    navigator.geolocation.getCurrentPosition(currentPosition);
}

search("Lisbon");

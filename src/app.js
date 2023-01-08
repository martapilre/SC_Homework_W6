
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

function displayTemperature(response) {
    let temperatureElement = document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let countryElement = document.querySelector('#country');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind')
    let dateElement = document.querySelector('#date');
    let iconElement = document.querySelector('#icon');

    celsiusTemperature = response.data.temperature.current;


    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.city;
    countryElement.innerHTML = response.data.country;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = response.data.wind.speed;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src", response.data.condition.icon_url);
    iconElement.setAttribute("alt", response.data.condition.icon);
}

function search(city) {
    let apiKey = "f9328ad30706aefa211bt4fddce8obf6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city-input");
    search(cityElement.value)
}

function displayFahrenheitTemperature(event) {
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

search("Lisbon");


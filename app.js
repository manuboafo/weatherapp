const apikey = "27be2df26d9688f5f9ce654926068665";
const url = "http://api.openweathermap.org/data/2.5/";

const searchbox = document.getElementById("search-box");

searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  const searchboxValue = searchbox.value;
  if (evt.keyCode == 13) {
    getResults(searchboxValue);
  }
}

function getResults(query) {
  fetch(`${url}forecast?q=${query}&units=metric&appid=${apikey}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
}

function displayResult(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.city.name}, ${weather.city.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerText = `${Math.floor(weather.list[0].main.temp)}°C`;

  let weathervalue = document.querySelector(".current .weather");
  weathervalue.innerText = `${weather.list[0].weather[0].main}`;

  let minmax = document.querySelector(".current .hi-low");
  minmax.innerText = `${Math.floor(
    weather.list[0].main.temp_min
  )}°C / ${Math.floor(weather.list[0].main.temp_max)}°C`;
}

function dateBuilder(value) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  let day = days[value.getDay()];
  let date = value.getDate();
  let month = months[value.getMonth()];
  let year = value.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

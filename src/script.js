import "./styles.css";
const unitToggle = document.getElementById("unit-toggle-container")
const DOMTime = document.getElementById("time");
const DOMDay = document.getElementById("day");
const DOMTemperature = document.getElementById("temperature");
const DOMFeelslikeTemperature = document.getElementById("feelslike");
const DOMDescription = document.getElementById('description')
const DOMWeatherCondition = document.getElementById('weather-condition')
const DOMDetailLocation = document.getElementById('detail-location')
const DOMDetailDate = document.getElementById('detail-date')
const DOMDetailHumidity = document.getElementById('detail-humidity')
const DOMDetailUVIndex = document.getElementById('detail-uvindex')
const DOMDetailPrecipitation = document.getElementById('detail-precipitation')
const DOMDetailPressure = document.getElementById('detail-pressure')
const DOMDetailWind = document.getElementById('detail-wind')
const DOMDetailWindGust = document.getElementById('detail-windgust')
const DOMDetailSunrise = document.getElementById('detail-sunrise')
const DOMDetailSunset = document.getElementById('detail-sunset')
const daysHoursToggle = document.getElementById('days-hours-toggle-container')

function formatData(json) {
  const keys = ["resolvedAddress", "description", "days", "currentConditions"];
  let formattedData = {};
  keys.forEach((key) => {
    if (json.hasOwnProperty(key)) {
      formattedData[key] = json[key];
    }
  });
  return formattedData;
}
async function getWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=68VQNA672BC6B3AQ56V4JGL7J&contentType=json&iconSet=icons2`
  );
  const json = await response.json();
  return json;
}
function refreshDOM(data) {
  const currentConditions = data.currentConditions
  const days = data.days
  const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  console.log(data)
  // Time
  let isPM = false;
  let [hours, minutes] = currentConditions.datetime.slice(0, 5).split(":");
  if (Number(hours) > 12) {
    hours = Number(hours) - 12;
    isPM = true;
  }
  DOMTime.textContent = `${hours}:${minutes} ${isPM ? "PM" : "AM"}`;

  // Day
  DOMDay.textContent = weekdayNames[new Date(days[0].datetime).getDay()]

  // Temperature
  DOMTemperature.textContent = `${currentConditions.temp}°C`

  // Feelslike Temperature
  DOMFeelslikeTemperature.textContent = `Feels like ${currentConditions.feelslike}°C`

  // Today's Description
  DOMDescription.textContent = days[0].description

  // Condition
  DOMWeatherCondition.textContent = currentConditions.conditions

  // Location
  DOMDetailLocation.textContent = data.resolvedAddress

  // Date
  DOMDetailDate.textContent = days[0].datetime.replaceAll('-','/')

  // Humidity
  DOMDetailHumidity.textContent = `${currentConditions.humidity}%`

  // UVIndex
  DOMDetailUVIndex.textContent = currentConditions.uvindex

  // Precipitation
  DOMDetailPrecipitation.textContent = `${currentConditions.precipprob}%`

  // Pressure
  DOMDetailPressure.textContent = `${currentConditions.pressure}%`

  // Wind
  DOMDetailWind.textContent = `${currentConditions.windspeed} km/h`

  // Wind Gust
  DOMDetailWindGust.textContent = `${currentConditions.windgust?currentConditions.windgust:"--"} km/h`

  // Sunset
  DOMDetailSunrise.textContent = `${currentConditions.sunrise.slice(0,5).replace("0","")} AM`

  // Sunset
  let [sunsetHours, sunsetMinutes] = currentConditions.sunset.slice(0,5).split(":")
  DOMDetailSunset.textContent = `${Number(sunsetHours)-12}:${sunsetMinutes} PM`
}
refreshDOM(tempResponse);

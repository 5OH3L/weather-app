import "./styles.css";

const websiteIcon = document.getElementById("website-icon");
const search = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const eraseButton = document.getElementById("erase-button");
const unitToggleContainer = document.getElementById("unit-toggle-container");
const toggleMenu = document.getElementById("toggle-menu");
const celciusToggle = document.getElementById("toggle-temperature-celcius");
const fahrenheitToggle = document.getElementById("toggle-temperature-fahrenheit");
const kmphToggle = document.getElementById("toggle-speed-kmph");
const mphToggle = document.getElementById("toggle-speed-mph");
const twelveHour = document.getElementById("toggle-time-twelve");
const twentyFourHour = document.getElementById("toggle-time-twenty-four");
const DOMTime = document.getElementById("time");
const DOMDay = document.getElementById("day");
const DOMTemperature = document.getElementById("temperature");
const DOMFeelslikeTemperature = document.getElementById("feelslike");
const DOMDescription = document.getElementById("description");
const DOMWeatherConditionIcon = document.getElementById("weather-icon");
const DOMWeatherCondition = document.getElementById("weather-condition");
const DOMDetailLocation = document.getElementById("detail-location");
const DOMDetailIconDate = document.getElementById("detail-icon-date");
const DOMDetailDate = document.getElementById("detail-date");
const DOMDetailHumidity = document.getElementById("detail-humidity");
const DOMDetailUVIndex = document.getElementById("detail-uvindex");
const DOMDetailPrecipitation = document.getElementById("detail-precipitation");
const DOMDetailPressure = document.getElementById("detail-pressure");
const DOMDetailWind = document.getElementById("detail-wind");
const DOMDetailWindGust = document.getElementById("detail-windgust");
const DOMDetailSunrise = document.getElementById("detail-sunrise");
const DOMDetailSunset = document.getElementById("detail-sunset");
const daysHoursToggle = document.getElementById("days-hours-toggle-container");
const daysToggle = document.getElementById("days-toggle");
const hoursToggle = document.getElementById("hours-toggle");
const daysHoursContainer = document.getElementById("days-hours");
let APIResponse = null;

celciusToggle.addEventListener("click", () => {
  if (!celciusToggle.classList.contains("selected")) {
    celciusToggle.classList.add("selected");
    fahrenheitToggle.classList.remove("selected");
    displayCelcius();
  }
});
fahrenheitToggle.addEventListener("click", () => {
  if (!fahrenheitToggle.classList.contains("selected")) {
    fahrenheitToggle.classList.add("selected");
    celciusToggle.classList.remove("selected");
    displayFahrenheit();
  }
});
function displayCelcius() {
  unitToggleContainer.dataset.temperature = "celcius";
  if (DOMTemperature.dataset.celcius) {
    DOMTemperature.textContent = `${DOMTemperature.dataset.celcius}°C`;
  }
  if (DOMFeelslikeTemperature.dataset.celcius) {
    DOMFeelslikeTemperature.textContent = `Feels like ${DOMFeelslikeTemperature.dataset.celcius}°C`;
  }
  const daysHours = [...daysHoursContainer.children];
  daysHours.forEach((dayHour) => {
    if (!dayHour.dataset.celcius) return;
    const dayHourTemperature = dayHour.getElementsByClassName("weekday-daytime-temperature")[0];
    dayHourTemperature.textContent = `${dayHour.dataset.celcius}°C`;
  });
}
function displayFahrenheit() {
  unitToggleContainer.dataset.temperature = "fahrenheit";
  if (DOMTemperature.dataset.fahrenheit) {
    DOMTemperature.textContent = `${DOMTemperature.dataset.fahrenheit}°F`;
  }
  if (DOMFeelslikeTemperature.dataset.fahrenheit) {
    DOMFeelslikeTemperature.textContent = `Feels like ${DOMFeelslikeTemperature.dataset.fahrenheit}°F`;
  }
  const daysHours = [...daysHoursContainer.children];
  daysHours.forEach((dayHour) => {
    if (!dayHour.dataset.fahrenheit) return;
    const dayHourTemperature = dayHour.getElementsByClassName("weekday-daytime-temperature")[0];
    dayHourTemperature.textContent = `${dayHour.dataset.fahrenheit}°F`;
  });
}
kmphToggle.addEventListener("click", () => {
  if (!kmphToggle.classList.contains("selected")) {
    kmphToggle.classList.add("selected");
    mphToggle.classList.remove("selected");
    displayKmph();
  }
});
mphToggle.addEventListener("click", () => {
  if (!mphToggle.classList.contains("selected")) {
    mphToggle.classList.add("selected");
    kmphToggle.classList.remove("selected");
    displayMph();
  }
});
function displayKmph() {
  unitToggleContainer.dataset.speed = "kmph";
  if (DOMDetailWind.dataset.kmph && DOMDetailWind.dataset.kmph != "null") {
    DOMDetailWind.textContent = `${DOMDetailWind.dataset.kmph} km/h`;
  }
  if (DOMDetailWindGust.dataset.kmph && DOMDetailWindGust.dataset.kmph != "null") {
    DOMDetailWindGust.textContent = `${DOMDetailWindGust.dataset.kmph} km/h`;
  }
}
function displayMph() {
  unitToggleContainer.dataset.speed = "mph";
  if (DOMDetailWind.dataset.mph && DOMDetailWind.dataset.mph != "null") {
    DOMDetailWind.textContent = `${DOMDetailWind.dataset.mph} mph`;
  }
  if (DOMDetailWindGust.dataset.mph && DOMDetailWindGust.dataset.mph != "null") {
    DOMDetailWindGust.textContent = `${DOMDetailWindGust.dataset.mph} mph`;
  }
}
twelveHour.addEventListener("click", () => {
  if (!twelveHour.classList.contains("selected")) {
    unitToggleContainer.dataset.time = "twelve-hour";
    twelveHour.classList.add("selected");
    twentyFourHour.classList.remove("selected");
    displayTwelveHour();
  }
});
twentyFourHour.addEventListener("click", () => {
  if (!twentyFourHour.classList.contains("selected")) {
    unitToggleContainer.dataset.time = "twenty-four-hour";
    twentyFourHour.classList.add("selected");
    twelveHour.classList.remove("selected");
    displayTwentyFourHour();
  }
});
function displayTwelveHour() {
  // Change main displaying weather time format to 12-hour format
  if (DOMTime.dataset.timeTwelveHour) {
    DOMTime.textContent = DOMTime.dataset.timeTwelveHour;
  }
  // Change all of hours' section's time to 12-hour format
  if (daysHoursToggle.dataset.selected == "hours") {
    const hours = [...daysHoursContainer.children];
    hours.forEach((hour) => {
      if (hour.dataset.timeTwelveHour) {
        hour.getElementsByClassName("weekday-daytime")[0].textContent = hour.dataset.timeTwelveHour;
      }
    });
  }
  // Change sunrise & sunset time format to 12-hour
  if (DOMDetailSunrise.dataset.timeTwelveHour) {
    DOMDetailSunrise.textContent = DOMDetailSunrise.dataset.timeTwelveHour;
  }
  if (DOMDetailSunset.dataset.timeTwelveHour) {
    DOMDetailSunset.textContent = DOMDetailSunset.dataset.timeTwelveHour;
  }
}
function displayTwentyFourHour() {
  // Change main displaying weather time format to 24-hour format
  if (DOMTime.dataset.timeTwentyFourHour) {
    DOMTime.textContent = DOMTime.dataset.timeTwentyFourHour;
  }
  // Change all of hours' section's time to 24-hour format
  if (daysHoursToggle.dataset.selected == "hours") {
    const hours = [...daysHoursContainer.children];
    hours.forEach((hour) => {
      if (hour.dataset.timeTwentyFourHour) {
        hour.getElementsByClassName("weekday-daytime")[0].textContent = hour.dataset.timeTwentyFourHour;
      }
    });
  }
  // Change sunrise & sunset time format to 24-hour
  if (DOMDetailSunrise.dataset.timeTwentyFourHour) {
    DOMDetailSunrise.textContent = DOMDetailSunrise.dataset.timeTwentyFourHour;
  }
  if (DOMDetailSunset.dataset.timeTwentyFourHour) {
    DOMDetailSunset.textContent = DOMDetailSunset.dataset.timeTwentyFourHour;
  }
}
toggleMenu.addEventListener("click", () => {
  unitToggleContainer.classList.toggle("visible");
});
websiteIcon.addEventListener("click", () => {
  if (document.body.classList.contains("day")) {
    document.body.removeAttribute("class");
  } else {
    document.body.setAttribute("class", "day");
  }
});
websiteIcon.ondragstart = (e) => false;
search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchWeather();
    search.value = "";
  }
});

searchButton.addEventListener("click", searchWeather);
eraseButton.addEventListener("click", () => {
  search.value = "";
});

function displayDaysHours(response, currentConditions = null) {
  if (daysHoursToggle.dataset.selected === "days") {
    displayForecastDays(processDays(response.days));
  } else if (daysHoursToggle.dataset.selected === "hours") {
    displayForecastHours(processHours(response.days[daysHoursContainer.dataset.selectedDayIndex].hours, currentConditions));
  }
}

function searchWeather() {
  if (search.value.trim() !== "" || search.value.trim() !== null) {
    getWeather(search.value).then((response) => {
      daysHoursContainer.dataset.selectedDayIndex = 0;
      daysHoursContainer.dataset.selectedHourIndex = -1;
      displayForecast(processData(response));
      displayDaysHours(response, response.currentConditions);
      APIResponse = response;
    });
    search.value = "";
  }
}
daysToggle.addEventListener("click", () => {
  if (daysHoursToggle.dataset.selected === "days") return;
  daysHoursToggle.dataset.selected = "days";
  daysHoursToggle.className = "days";
  if (APIResponse !== null) {
    displayDaysHours(APIResponse, APIResponse.currentConditions);
  }
});
hoursToggle.addEventListener("click", () => {
  if (daysHoursToggle.dataset.selected === "hours") return;
  daysHoursToggle.dataset.selected = "hours";
  daysHoursToggle.className = "hours";
  if (APIResponse !== null) {
    displayDaysHours(APIResponse, APIResponse.currentConditions);
  }
});

function convertToFahrenheit(celcius) {
  return limitDecimal((celcius * 9) / 5 + 32);
}
function convertToMph(kmph) {
  return limitDecimal(kmph / 1.609);
}
function limitDecimal(number) {
  let newNumber = number;
  let [wholeNum, decimal] = number.toString().split(".");
  if (decimal && decimal.length > 1) {
    newNumber = wholeNum.concat(".", decimal.slice(0, 1));
  }
  return newNumber;
}
function processTime(time) {
  let isPM = false;
  const slicedTime = time.slice(0, 5);
  const slicedSplitTime = slicedTime.split(":");
  let hours = Number(slicedSplitTime[0]);
  const minutes = slicedSplitTime[1];
  if (hours > 12) {
    hours = hours - 12;
    isPM = true;
  } else if (hours === 0) {
    hours = 12;
  }
  return `${hours}:${minutes} ${isPM ? "PM" : "AM"}`;
}
function processWeekday(date) {
  return new Date(date).toLocaleDateString("en-US", { weekday: "long" });
}
function processData(data, dayIndex = null) {
  const days = data.days;
  const hourIndex = daysHoursContainer.dataset.selectedHourIndex;
  let time,
    weekday,
    temperatureCelcius,
    temperatureFahrenheit,
    feelslikeCelcius,
    feelslikeFahrenheit,
    description,
    icon,
    condition,
    location,
    date,
    humidity,
    uvindex,
    precipitation,
    pressure,
    windkmph,
    windmph,
    windgustkmph,
    windgustmph,
    sunrise,
    sunset;
  if (dayIndex != null && dayIndex >= 0 && dayIndex < data.days.length) {
    // Get requested day's and/or hour's weather information
    const day = days[dayIndex];
    let hour;
    if (hourIndex == -1) {
      hour = data.currentConditions;
    } else {
      hour = day.hours[Number(hourIndex)];
    }
    time = hour.datetime;
    weekday = processWeekday(day.datetime);
    temperatureCelcius = hour.temp;
    temperatureFahrenheit = convertToFahrenheit(hour.temp);
    feelslikeCelcius = hour.feelslike;
    feelslikeFahrenheit = convertToFahrenheit(hour.feelslike);
    description = day.description;
    icon = hour.icon;
    condition = hour.conditions;
    location = data.resolvedAddress;
    date = day.datetime.replaceAll("-", "/");
    humidity = `${hour.humidity}%`;
    uvindex = hour.uvindex;
    precipitation = `${hour.precipprob}%`;
    pressure = `${hour.pressure} mb`;
    windkmph = hour.windspeed;
    windmph = convertToMph(hour.windspeed);
    if (hour.windgust) {
      windgustkmph = hour.windgust;
      windgustmph = convertToMph(hour.windgust);
    } else {
      windgustkmph = null;
      windgustmph = null;
    }
    sunrise = day.sunrise;
    sunset = day.sunset;
  } else {
    // Get current weather information
    let currentConditions = data.currentConditions;
    let currentConditionsHoursMinutes = currentConditions.datetime.slice(0, 5).split(":");
    if (currentConditions && Number(currentConditionsHoursMinutes[1]) == 0 && daysHoursContainer.dataset.selectedDayIndex == 0) {
      currentConditions = data.days[0].hours.find(
        (hour) => Number(hour.datetime.slice(0, 5).split(":")[0]) == Number(currentConditionsHoursMinutes[0])
      );
    }
    time = currentConditions.datetime;
    weekday = processWeekday(days[0].datetime);
    temperatureCelcius = currentConditions.temp;
    temperatureFahrenheit = convertToFahrenheit(currentConditions.temp);
    feelslikeCelcius = currentConditions.feelslike;
    feelslikeFahrenheit = convertToFahrenheit(currentConditions.feelslike);
    description = days[0].description;
    icon = currentConditions.icon;
    condition = currentConditions.conditions;
    location = data.resolvedAddress;
    date = days[0].datetime.replaceAll("-", "/");
    humidity = `${currentConditions.humidity}%`;
    uvindex = currentConditions.uvindex;
    precipitation = `${currentConditions.precipprob}%`;
    pressure = `${currentConditions.pressure} mb`;
    windkmph = currentConditions.windspeed;
    windmph = convertToMph(currentConditions.windspeed);
    if (currentConditions.windgust) {
      windgustkmph = currentConditions.windgust;
      windgustmph = convertToMph(currentConditions.windgust);
    } else {
      windgustkmph = null;
      windgustmph = null;
    }
    sunrise = data.currentConditions.sunrise;
    sunset = data.currentConditions.sunset;
  }
  const processedData = {
    time,
    weekday,
    temperatureCelcius,
    temperatureFahrenheit,
    feelslikeCelcius,
    feelslikeFahrenheit,
    description,
    icon,
    condition,
    location,
    date,
    humidity,
    uvindex,
    precipitation,
    pressure,
    windkmph,
    windmph,
    windgustkmph,
    windgustmph,
    sunrise,
    sunset,
  };
  return processedData;
}
async function getWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=68VQNA672BC6B3AQ56V4JGL7J&contentType=json&iconSet=icons2`
  );
  const json = await response.json();
  return json;
}
function displayForecast(data) {
  DOMTime.dataset.timeTwelveHour = processTime(data.time);
  DOMTime.dataset.timeTwentyFourHour = data.time.slice(0, 5);
  if (unitToggleContainer.dataset.time == "twenty-four-hour") {
    DOMTime.textContent = data.time.slice(0, 5);
  } else {
    DOMTime.textContent = processTime(data.time);
  }
  DOMDay.textContent = data.weekday;
  import("./weather-icons.js").then((module) => {
    DOMDetailIconDate.src = module[`icon0weekday0${data.weekday.toLowerCase()}`];
  });
  DOMTemperature.dataset.celcius = data.temperatureCelcius;
  DOMTemperature.dataset.fahrenheit = data.temperatureFahrenheit;
  if (unitToggleContainer.dataset.temperature == "fahrenheit") {
    DOMTemperature.textContent = `${data.temperatureFahrenheit}°F`;
    DOMFeelslikeTemperature.textContent = `Feels like ${data.feelslikeFahrenheit}°F`;
  } else {
    DOMTemperature.textContent = `${data.temperatureCelcius}°C`;
    DOMFeelslikeTemperature.textContent = `Feels like ${data.feelslikeCelcius}°C`;
  }
  DOMFeelslikeTemperature.dataset.celcius = data.feelslikeCelcius;
  DOMFeelslikeTemperature.dataset.fahrenheit = data.feelslikeFahrenheit;
  DOMDescription.textContent = data.description;
  import("./weather-icons.js").then((module) => {
    const icon = module[`icon0${data.icon.split("-").join("0")}`];
    DOMWeatherConditionIcon.src = icon;
  });
  DOMWeatherCondition.textContent = data.condition;
  DOMDetailLocation.textContent = data.location;
  DOMDetailDate.textContent = data.date;
  DOMDetailHumidity.textContent = data.humidity;
  DOMDetailUVIndex.textContent = data.uvindex;
  DOMDetailPrecipitation.textContent = data.precipitation;
  DOMDetailPressure.textContent = data.pressure;
  DOMDetailWind.dataset.kmph = data.windkmph;
  DOMDetailWind.dataset.mph = data.windmph;
  DOMDetailWindGust.dataset.kmph = data.windgustkmph;
  DOMDetailWindGust.dataset.mph = data.windgustmph;
  if (unitToggleContainer.dataset.speed == "mph") {
    DOMDetailWind.textContent = `${data.windmph} mph`;
    DOMDetailWindGust.textContent = `${data.windgustmph ? `${data.windgustmph} mph` : "--"}`;
  } else {
    DOMDetailWind.textContent = `${data.windkmph} km/h`;
    DOMDetailWindGust.textContent = `${data.windgustkmph ? `${data.windgustkmph} km/h` : "--"}`;
  }
  DOMDetailSunrise.dataset.timeTwelveHour = processTime(data.sunrise);
  DOMDetailSunrise.dataset.timeTwentyFourHour = data.sunrise.slice(0, 5);
  DOMDetailSunset.dataset.timeTwelveHour = processTime(data.sunset);
  DOMDetailSunset.dataset.timeTwentyFourHour = data.sunset.slice(0, 5);
  if (unitToggleContainer.dataset.time == "twenty-four-hour") {
    DOMDetailSunrise.textContent = data.sunrise.slice(0, 5);
    DOMDetailSunset.textContent = data.sunset.slice(0, 5);
  } else {
    DOMDetailSunrise.textContent = processTime(data.sunrise);
    DOMDetailSunset.textContent = processTime(data.sunset);
  }
}
function processDays(days) {
  const processedDays = [];
  days.forEach((day) => {
    const processedDay = {};
    let weekday = processWeekday(day.datetime);
    processedDay.weekday = new Date(day.datetime).getDate() === new Date(days[0].datetime).getDate() ? "Today" : weekday;
    processedDay.icon = day.icon;
    processedDay.temperatureCelcius = day.temp;
    processedDay.temperatureFahrenheit = convertToFahrenheit(day.temp);
    processedDay.conditions = day.conditions;
    processedDays.push(processedDay);
  });
  return processedDays;
}
function loadSelectedDay(elementIndex) {
  if (daysHoursContainer.dataset.selectedDayIndex === elementIndex) return;
  daysHoursContainer.dataset.selectedDayIndex = elementIndex;
  const children = [...daysHoursContainer.children];
  children.forEach((child) => {
    if (child.dataset.index == elementIndex) {
      child.className = "day-hour selected";
    } else {
      child.className = "day-hour";
    }
  });
  let hourIndex = null;
  if (daysHoursContainer.dataset.selectedDayIndex != 0 && daysHoursContainer.dataset.selectedHourIndex == -1) {
    hourIndex = new Date().getHours();
    daysHoursContainer.dataset.selectedHourIndex = hourIndex;
  }
  displayForecast(processData(APIResponse, elementIndex));
}
function displayForecastDays(days) {
  daysHoursContainer.innerHTML = "";
  days.forEach((day, dayIndex) => {
    const DOMDayContainer = document.createElement("div");
    DOMDayContainer.dataset.index = dayIndex;
    DOMDayContainer.dataset.conditions = day.conditions;
    DOMDayContainer.dataset.celcius = day.temperatureCelcius;
    DOMDayContainer.dataset.fahrenheit = day.temperatureFahrenheit;
    DOMDayContainer.title = day.conditions;
    DOMDayContainer.className = "day-hour";
    DOMDayContainer.addEventListener("click", (event) => {
      loadSelectedDay(event.currentTarget.dataset.index);
    });

    const DOMWeekday = document.createElement("div");
    DOMWeekday.textContent = day.weekday;
    DOMWeekday.className = "weekday-daytime";
    DOMDayContainer.appendChild(DOMWeekday);

    const DOMIcon = document.createElement("img");
    import("./weather-icons.js").then((module) => {
      DOMIcon.src = module[`icon0${day.icon.split("-").join("0")}`];
    });
    DOMIcon.alt = `${day.icon.split("-").join(" ")} icon`;
    DOMIcon.className = "weather-condition-icon";
    DOMIcon.dataset.icon = day.icon;
    DOMDayContainer.appendChild(DOMIcon);

    const DOMDayTemperature = document.createElement("p");
    if (unitToggleContainer.dataset.temperature == "fahrenheit") {
      DOMDayTemperature.textContent = `${day.temperatureFahrenheit}°F`;
    } else {
      DOMDayTemperature.textContent = `${day.temperatureCelcius}°C`;
    }
    DOMDayTemperature.className = "weekday-daytime-temperature";
    DOMDayContainer.appendChild(DOMDayTemperature);

    daysHoursContainer.appendChild(DOMDayContainer);
  });
  const DOMDays = [...daysHoursContainer.getElementsByClassName("day-hour")];
  const selectedDOMDay = DOMDays.find((DOMDay) => DOMDay.dataset.index == daysHoursContainer.dataset.selectedDayIndex);
  selectedDOMDay.className = "day-hour selected";
  selectedDOMDay.scrollIntoView({
    behavior: "smooth",
    inline: "center",
  });
}
function processHours(hours, currentHour) {
  const processedHours = [];
  hours.forEach((hour) => {
    const processedHour = {};
    processedHour.time = hour.datetime;
    processedHour.icon = hour.icon;
    processedHour.temperatureCelcius = hour.temp;
    processedHour.temperatureFahrenheit = convertToFahrenheit(hour.temp);
    processedHour.conditions = hour.conditions;
    processedHours.push(processedHour);
  });
  // If current time's minutes isn't 0 then add it to the hours list
  if (currentHour && Number(currentHour.datetime.slice(0, 5).split(":")[1]) != 0 && daysHoursContainer.dataset.selectedDayIndex == 0) {
    const processedCurrentHour = {};
    processedCurrentHour.time = currentHour.datetime;
    processedCurrentHour.icon = currentHour.icon;
    processedCurrentHour.temperatureCelcius = currentHour.temp;
    processedCurrentHour.temperatureFahrenheit = convertToFahrenheit(currentHour.temp);
    processedCurrentHour.conditions = currentHour.conditions;
    processedCurrentHour.currentForecast = true;
    const insertingIndex = processedHours.findIndex(
      (hour) => hour.time.slice(0, 5).split(":")[0] == processedCurrentHour.time.slice(0, 5).split(":")[0]
    );
    processedHours.splice(insertingIndex + 1, 0, processedCurrentHour);
  } else {
    const currentForecastIndex = processedHours.findIndex(
      (hour) => hour.time.slice(0, 5).split(":")[0] == currentHour.datetime.slice(0, 5).split(":")[0]
    );
    processedHours[currentForecastIndex].currentForecast = true;
  }
  return processedHours;
}
function loadSelectedHour(elementIndex) {
  if (daysHoursContainer.dataset.selectedHourIndex == elementIndex) return;
  daysHoursContainer.dataset.selectedHourIndex = elementIndex;
  const children = [...daysHoursContainer.children];
  children.forEach((child) => {
    if (child.dataset.index == elementIndex) {
      child.className = "day-hour selected";
    } else {
      child.className = "day-hour";
    }
  });
  displayForecast(processData(APIResponse, daysHoursContainer.dataset.selectedDayIndex, elementIndex));
}
function displayForecastHours(hours) {
  daysHoursContainer.innerHTML = "";
  hours.forEach((hour, hourIndex) => {
    const DOMHourContainer = document.createElement("div");
    if (hour.currentForecast) {
      DOMHourContainer.dataset.index = -1;
    } else {
      DOMHourContainer.dataset.index = hourIndex;
    }
    DOMHourContainer.dataset.celcius = hour.temperatureCelcius;
    DOMHourContainer.dataset.fahrenheit = hour.temperatureFahrenheit;
    DOMHourContainer.dataset.conditions = hour.conditions;
    DOMHourContainer.dataset.timeTwelveHour = processTime(hour.time);
    DOMHourContainer.dataset.timeTwentyFourHour = hour.time.slice(0, 5);
    DOMHourContainer.title = hour.conditions;
    DOMHourContainer.className = "day-hour";

    const DOMTime = document.createElement("div");
    if (unitToggleContainer.dataset.time == "twenty-four-hour") {
      DOMTime.textContent = hour.time.slice(0, 5);
    } else {
      DOMTime.textContent = processTime(hour.time);
    }
    DOMTime.className = "weekday-daytime";
    DOMHourContainer.appendChild(DOMTime);

    const DOMIcon = document.createElement("img");
    import("./weather-icons.js").then((module) => {
      DOMIcon.src = module[`icon0${hour.icon.split("-").join("0")}`];
    });
    DOMIcon.alt = `${hour.icon.split("-").join(" ")} icon`;
    DOMIcon.className = "weather-condition-icon";
    DOMIcon.dataset.icon = hour.icon;
    DOMHourContainer.appendChild(DOMIcon);

    const DOMHourTemperature = document.createElement("p");
    if (unitToggleContainer.dataset.temperature == "fahrenheit") {
      DOMHourTemperature.textContent = `${hour.temperatureFahrenheit}°F`;
    } else {
      DOMHourTemperature.textContent = `${hour.temperatureCelcius}°C`;
    }
    DOMHourTemperature.className = "weekday-daytime-temperature";
    DOMHourContainer.appendChild(DOMHourTemperature);

    daysHoursContainer.appendChild(DOMHourContainer);
  });
  const DOMHours = [...daysHoursContainer.getElementsByClassName("day-hour")];
  const currentDOMHour = DOMHours.find((DOMHour) => DOMHour.dataset.index == daysHoursContainer.dataset.selectedHourIndex);
  if (currentDOMHour) {
    currentDOMHour.className = "day-hour selected";
    currentDOMHour.scrollIntoView({ behavior: "smooth", inline: "center" });
  }
  DOMHours.forEach((DOMHour) => {
    DOMHour.addEventListener("click", (event) => {
      loadSelectedHour(event.currentTarget.dataset.index);
    });
  });
}
function loadInitialPage() {
  const days = [...daysHoursContainer.children];
  days.forEach((day) => {
    day.addEventListener("click", () => {
      days.map((day) => (day.className = "day-hour"));
      day.className = "day-hour selected";
    });
  });
}
window.addEventListener("DOMContentLoaded", loadInitialPage);
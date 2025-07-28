import "./styles.css";

const websiteIcon = document.getElementById("website-icon");
const search = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const eraseButton = document.getElementById("erase-button");
const unitToggle = document.getElementById("unit-toggle-container");
const celciusToggle = document.getElementById("celcius-toggle");
const fahrenheitToggle = document.getElementById("fahrenheit-toggle");
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
websiteIcon.addEventListener("click", () => {
  if (document.body.classList.contains("day")) {
    document.body.removeAttribute("class");
  } else {
    document.body.setAttribute("class", "day");
  }
});
websiteIcon.ondragstart = (e) => false;

let APIResponse = null;

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

function displayDaysHours(response) {
  if (daysHoursToggle.dataset.selected === "days") {
    displayForecastDays(processDays(response.days));
  } else if (daysHoursToggle.dataset.selected === "hours") {
    displayForecastHours(
      processHours(
        response.days[daysHoursContainer.dataset.selectedDayIndex].hours
      )
    );
  }
}

function searchWeather() {
  if (search.value.trim() !== "" || search.value.trim() !== null) {
    getWeather(search.value).then((response) => {
      daysHoursContainer.dataset.selectedDayIndex = "0";
      displayForecast(processData(response));
      displayDaysHours(response);
      APIResponse = response;
    });
    search.value = "";
  }
}

celciusToggle.addEventListener("click", () => {
  if (!(unitToggle.dataset.selected === "celcius")) {
    unitToggle.dataset.selected = "celcius";
    unitToggle.className = "celcius";
    toggleCelcius();
  }
});
fahrenheitToggle.addEventListener("click", () => {
  if (!(unitToggle.dataset.selected === "fahrenheit")) {
    unitToggle.dataset.selected = "fahrenheit";
    unitToggle.className = "fahrenheit";
    toggleFahrenheit();
  }
});
daysToggle.addEventListener("click", () => {
  if (daysHoursToggle.dataset.selected === "days") return;
  daysHoursToggle.dataset.selected = "days";
  daysHoursToggle.className = "days";
  if (APIResponse !== null) {
    displayDaysHours(APIResponse);
  }
});
hoursToggle.addEventListener("click", () => {
  if (daysHoursToggle.dataset.selected === "hours") return;
  daysHoursToggle.dataset.selected = "hours";
  daysHoursToggle.className = "hours";
  if (APIResponse !== null) {
    displayDaysHours(APIResponse);
  }
});
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
function processData(data, dayIndex = null, hourIndex = new Date().getHours()) {
  const days = data.days;
  let time,
    weekday,
    temperature,
    feelslike,
    description,
    icon,
    condition,
    location,
    date,
    humidity,
    uvindex,
    precipitation,
    pressure,
    wind,
    windgust,
    sunrise,
    sunset;
  if (dayIndex != null && dayIndex >= 0 && dayIndex < data.days.length) {
    // Get requested day's and/or hour's weather information
    const day = days[dayIndex];
    const hour = day.hours[hourIndex];
    time = processTime(hour.datetime);
    weekday = processWeekday(day.datetime);
    temperature = `${hour.temp.toFixed(0)}°C`;
    feelslike = `Feels like ${hour.feelslike.toFixed(0)}°C`;
    description = day.description;
    icon = hour.icon;
    condition = hour.conditions;
    location = data.resolvedAddress;
    date = day.datetime.replaceAll("-", "/");
    humidity = `${hour.humidity}%`;
    uvindex = hour.uvindex;
    precipitation = `${hour.precipprob}%`;
    pressure = `${hour.pressure} mb`;
    wind = `${hour.windspeed} km/h`;
    windgust = `${hour.windgust ? `${hour.windgust} km/h` : "--"}`;
    sunrise = processTime(day.sunrise);
    sunset = processTime(day.sunset);
  } else {
    // Get current weather information
    const currentConditions = data.currentConditions;
    time = processTime(currentConditions.datetime);
    weekday = processWeekday(days[0].datetime);
    temperature = `${currentConditions.temp.toFixed(0)}°C`;
    feelslike = `Feels like ${currentConditions.feelslike.toFixed(0)}°C`;
    description = days[0].description;
    icon = currentConditions.icon;
    condition = currentConditions.conditions;
    location = data.resolvedAddress;
    date = days[0].datetime.replaceAll("-", "/");
    humidity = `${currentConditions.humidity}%`;
    uvindex = currentConditions.uvindex;
    precipitation = `${currentConditions.precipprob}%`;
    pressure = `${currentConditions.pressure} mb`;
    wind = `${currentConditions.windspeed} km/h`;
    windgust = `${
      currentConditions.windgust ? `${currentConditions.windgust} km/h` : "--"
    }`;
    sunrise = processTime(currentConditions.sunrise);
    sunset = processTime(currentConditions.sunset);
  }
  const processedData = {
    time,
    weekday,
    temperature,
    feelslike,
    description,
    icon,
    condition,
    location,
    date,
    humidity,
    uvindex,
    precipitation,
    pressure,
    wind,
    windgust,
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
  DOMTime.textContent = data.time;
  DOMDay.textContent = data.weekday;
  import("./weather-icons.js").then((module) => {
    DOMDetailIconDate.src =
      module[`icon0weekday0${data.weekday.toLowerCase()}`];
  });
  DOMTemperature.textContent = data.temperature;
  DOMFeelslikeTemperature.textContent = data.feelslike;
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
  DOMDetailWind.textContent = data.wind;
  DOMDetailWindGust.textContent = data.windgust;
  DOMDetailSunrise.textContent = data.sunrise;
  DOMDetailSunset.textContent = data.sunset;
}

function processDays(days) {
  const processedDays = [];
  days.forEach((day) => {
    const processedDay = {};
    let weekday = processWeekday(day.datetime);
    processedDay.weekday =
      new Date(day.datetime).getDate() === new Date().getDate()
        ? "Today"
        : weekday;
    processedDay.icon = day.icon;
    processedDay.temperature = `${day.temp.toFixed(0)}°C`;
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
  displayForecast(
    processData(
      APIResponse,
      elementIndex,
      daysHoursContainer.dataset.selectedHourIndex
    )
  );
}
function displayForecastDays(days) {
  daysHoursContainer.innerHTML = "";
  days.forEach((day, dayIndex) => {
    const DOMDayContainer = document.createElement("div");
    DOMDayContainer.dataset.index = dayIndex;
    DOMDayContainer.dataset.conditions = day.conditions;
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
    DOMDayTemperature.textContent = day.temperature;
    DOMDayTemperature.className = "weekday-daytime-temperature";
    DOMDayContainer.appendChild(DOMDayTemperature);

    daysHoursContainer.appendChild(DOMDayContainer);
  });
  const DOMDays = [...daysHoursContainer.getElementsByClassName("day-hour")];
  const selectedDOMDay = DOMDays.find(
    (DOMDay) =>
      DOMDay.dataset.index == daysHoursContainer.dataset.selectedDayIndex
  );
  selectedDOMDay.className = "day-hour selected";
  selectedDOMDay.scrollIntoView({
    behavior: "smooth",
    inline: "center",
  });
}
function processHours(hours) {
  const processedHours = [];
  hours.forEach((hour) => {
    const processedHour = {};
    processedHour.time = processTime(hour.datetime);
    processedHour.icon = hour.icon;
    processedHour.temperature = `${hour.temp.toFixed(0)}°C`;
    processedHour.conditions = hour.conditions;
    processedHours.push(processedHour);
  });
  return processedHours;
}
function loadSelectedHour(elementIndex) {
  if (daysHoursContainer.dataset.selectedHourIndex === elementIndex) return;
  daysHoursContainer.dataset.selectedHourIndex = elementIndex;
  const children = [...daysHoursContainer.children];
  children.forEach((child) => {
    if (child.dataset.index == elementIndex) {
      child.className = "day-hour selected";
    } else {
      child.className = "day-hour";
    }
  });
  displayForecast(
    processData(
      APIResponse,
      daysHoursContainer.dataset.selectedDayIndex,
      elementIndex
    )
  );
}
function displayForecastHours(hours) {
  daysHoursContainer.innerHTML = "";
  hours.forEach((hour, hourIndex) => {
    const DOMHourContainer = document.createElement("div");
    DOMHourContainer.dataset.index = hourIndex;
    DOMHourContainer.dataset.conditions = hour.conditions;
    DOMHourContainer.title = hour.conditions;
    DOMHourContainer.className = "day-hour";

    const DOMTime = document.createElement("div");
    DOMTime.textContent = hour.time;
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
    DOMHourTemperature.textContent = hour.temperature;
    DOMHourTemperature.className = "weekday-daytime-temperature";
    DOMHourContainer.appendChild(DOMHourTemperature);

    daysHoursContainer.appendChild(DOMHourContainer);
  });
  const DOMHours = [...daysHoursContainer.getElementsByClassName("day-hour")];
  const currentDOMHour = DOMHours.find(
    (DOMHour) =>
      DOMHour.dataset.index == daysHoursContainer.dataset.selectedHourIndex
  );
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

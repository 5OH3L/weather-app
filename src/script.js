import { get } from "jquery";
import "./styles.css";

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
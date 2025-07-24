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
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=KEY&contentType=json`
  );
  const json = await response.json();
  return json;
}
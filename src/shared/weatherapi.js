import fetch from "isomorphic-fetch";

export function fetchWeather(req) {
  const city = req != undefined ? req : "copenhagen";
  const apiKey = "166d00e26d3ff2c6149e89feccc5c59a";
  const encodedURI = encodeURI(
    `http://api.openweathermap.org/data/2.5/weather?q=${city},dk&appid=${apiKey}&units=metric`
  );

  return fetch(encodedURI)
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.warn(error);
      return null;
    });
}

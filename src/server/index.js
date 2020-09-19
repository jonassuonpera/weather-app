import express from "express";
import cors from "cors";
import { renderToString } from "react-dom/server";
import App from "../shared/App";
import React from "react";
import serialize from "serialize-javascript";
import { fetchPopularRepos } from "../shared/api";
import { fetchWeather } from "../shared/weatherapi.js";

const app = express();

app.use(cors());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  fetchWeather().then((data) => {
    const markup = renderToString(<App data={data} />);

    res.send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>SSR with RR</title>
              <script src="/bundle.js" defer></script>
              <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            </head>
  
            <body>
              <div id="app">${markup}</div>
            </body>
          </html>
        `);
  });
});

app.get("/weather", (req, res) => {
  fetchWeather(req.query.city).then((data) => {
    res.send(data);
  });
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // const city = req.query.city;
  // const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},dk&appid=${weatherAPIKey}&units=metric&lang=dk`;
  // fetch(url)
  //   .then((res) => res.json())
  //   .then((response) => {
  //     res.send(response);
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});

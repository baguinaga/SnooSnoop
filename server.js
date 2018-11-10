// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// Express and db
const PORT = process.env.PORT|| 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
const app = express();
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/r/:subreddit", (req, res) => {
  axios
    .get(`https://old.reddit.com/r/${req.params.subreddit}/`)
    .then(response => {
      const $ = cheerio.load(response.data);
      const results = [];

      $("p.title").each((i, element) => {
        const title = $(element).text();
        const link = $(element)
          .children()
          .attr("href");

        results.push({
          title: title,
          link: link
        });
      });
      console.log(results);
      res.json(results);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.listen(PORT, () => {
  mongoose.connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  );
  console.log("App is running on : http://localhost:3000");
});

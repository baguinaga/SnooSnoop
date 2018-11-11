// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const axios = require("axios");
const cheerio = require("cheerio");

// Express and db
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:/SnooSnoop";
const app = express();
const db = require("./models");

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/r/:subreddit", (req, res) => {
  axios
    .get(`https://old.reddit.com/r/${req.params.subreddit}/`)
    .then(response => {
      const $ = cheerio.load(response.data);

      $("p.title").each(function(i, element) {
        const title = $(element).text();
        const link = $(element)
          .children()
          .attr("href");

        const post_elements = {
          title: title,
          link: link
        };

        db.Post.findOrCreate({ title: title }, post_elements, (err, result) => {
          if (err) throw err;
        });
      });
    })
    .then(() => {
      db.Post.find()
        .limit(25)
        .then(dbPost => {
          return res.json(dbPost);
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send(err);
        });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(err);
    });
});

app.get("/api/posts/:id", (req, res) => {
  db.Post.findOne({ _id: req.params.id })
    .populate("note")
    .then(dbPost => {
      return res.json(dbPost);
    })
    .catch(err => {
      console.log(err);
      return res.statusCode(500).send(err);
    });
});

app.post("/api/posts/:id", (req, res) => {
  db.Note.create(req.body)
    .then(dbNote => {
      return db.Post.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true }
      );
    })
    .then(dbPost => {
      return res.json(dbPost);
    })
    .catch(err => {
      console.log(err);
      return res.statusCode(500).send(err);
    });
});

app.listen(PORT, () => {
  mongoose.connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  );
  console.log(`App is running on : http://localhost:${PORT}`);
});

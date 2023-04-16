
/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const scraper = require("./pageScraper");
const linksGrabber = require("./linksGrabber");
require("dotenv").config();

//app.use(cors());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("test");
})

app.post("/scrape", (req, res) => {
  const baseUrl = req.body.url;
  try {
    linksGrabber(baseUrl)
    .then(responses => {
      let homePageLinks = [...responses];
      scraper(homePageLinks).then(() => 
        res.send(
          "The result file is being generated, please find it in the server folder..."
        )
      );
    })
  } catch (e) {
    res.send(e);
  }
});

app.listen(process.env.PORT || 5000);

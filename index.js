
/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const scraper = require("./pageScraper");
const linksGrabber = require("./linksGrabber");
require("dotenv").config();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("test");
})

app.post("/scrape", (req, res) => {
  res.header("Access-Control-Allow-Origin", "true");
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

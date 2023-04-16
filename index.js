/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const scraper = require("./pageScraper");
const linksGrabber = require("./linksGrabber");
require("dotenv").config();

const corsConf = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use(cors(corsConf));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("test");
})

app.post("/scrape", async (req, res) => {
  const baseUrl = req.body.url;
  try {
    let homePageLinks = [...(await linksGrabber(baseUrl))];
    scraper(homePageLinks).then(() => {
      const file = `test.txt`;
      res.download(file);
      res.send(
        "The result file is being generated, please find it in the server folder..."
      )
      });
  } catch (e) {
    res.send(e);
  }
});

app.listen(process.env.PORT || 5000);

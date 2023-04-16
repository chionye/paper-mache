
/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const scraper = require("./pageScraper");
const linksGrabber = require("./linksGrabber");
const fs = require("fs");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.send("test")
})

app.post("/scrape", (req, res) => {
  const baseUrl = req.body.url;
   res.send(baseUrl)
//   try {
//     linksGrabber(baseUrl).then((responses) => {
//       let homePageLinks = [...responses];
//       console.log(responses);
//       scraper(homePageLinks).then(() => {
//         var content = fs.readFileSync("test.txt", "utf8");
//         res.send(content);
//       });
//     });
  } catch (e) {
    res.send(e);
  }
});

app.listen(process.env.PORT || 5000);

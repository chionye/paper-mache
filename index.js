/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const scraper = require("./pageScraper1");
const { linksGrabber } = require("./linksGrabber");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/scrape", async (req, res) => {
  const baseUrl = req.body.url;
  let domain = new URL(baseUrl);
  let name = `${domain.hostname}`;
  try {
    linksGrabber(50, baseUrl)
      .then(async (e) => {
        const re = await scraper(e, { baseUrl, name });
        if (re) {
          res.send(
            "File has been generated successfully, please find it in the project directory."
          );
        }
      })
      .catch(console.error);
  } catch (e) {
    res.send(e);
  }
});

app.listen(9000);

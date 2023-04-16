/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const scraper = require("./pageScraper");
const linksGrabber = require("./linksGrabber");


const corsOptions = {
    origin: 'https://legendary-spork-azure.vercel.app/',
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());

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

app.listen(9000);

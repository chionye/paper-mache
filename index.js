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

app.post("/scrape", async (req, res) => {
 res.send("test")
});

app.listen(process.env.PORT || 5000);

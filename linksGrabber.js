/** @format */
const axios = require("axios");
var cheerio = require("cheerio");

async function linksGrabber(url) {
  try {
    let links = new Set();
    let httpResponse = await axios.get(url);
    let $ = cheerio.load(httpResponse.data);
    let linkObjects = $("a"); // get all hyperlinks
    let domain = new URL(url);
    let name = `${domain.protocol}://${domain.hostname}`;
    let fullLink;
    linkObjects.each((index, element) => {
      // get the href attribute
      let lnk = $(element).attr("href");
      if (lnk.indexOf(name) == -1 && lnk.indexOf("http") == -1) {
        fullLink = lnk.startsWith("/")
          ? `${name}${lnk}`.replace("::", ":")
          : `${name}/${lnk}`.replace("::", ":");
      } else {
        fullLink = `${lnk}`;
      }
      links.add(fullLink);
    });
    return links;
  } catch (e) {
    console.log(e);
  }
}

module.exports = linksGrabber;
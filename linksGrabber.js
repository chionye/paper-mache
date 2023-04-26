/** @format */

const puppeteer = require("puppeteer");

function run(pagesToScrape, url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!pagesToScrape) {
        pagesToScrape = 1;
      }
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      let currentPage = 1;
      let urls = [];
      while (currentPage <= pagesToScrape) {
        let newUrls = await page.evaluate(() => {
          let results = [];
          let items = document.querySelectorAll("a");
          items.forEach((item) => {
            results.push(item.getAttribute("href"));
          });
          return results;
        });
        urls = urls.concat(newUrls);
        if (currentPage < pagesToScrape) {
          await Promise.all([
            await page.click("a"),
            await page.waitForSelector("a"),
          ]);
        }
        currentPage++;
      }
      browser.close();
      return resolve([...new Set(urls)]);
    } catch (e) {
      return reject(e);
    }
  });
}

exports.linksGrabber = run;

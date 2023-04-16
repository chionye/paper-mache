/** @format */

const { Cluster } = require("puppeteer-cluster");
const writeToFile = require("./writeToFile");

const pageScraper = async (url) => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 5,
    monitor: true,
    timeout: 500000,
  });

  // Print errors to console
  cluster.on("taskerror", (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
    const extractedText = await page.$eval("*", (el) => el.innerText);
    const extractedEmails = extractedText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    if (extractedEmails) {
      writeToFile(extractedEmails);
    }
  });

  for (let index = 0; index < url.length; index++) {
    cluster.queue(url[index]);
  }

  await cluster.idle();
  await cluster.close();
}

module.exports = pageScraper;
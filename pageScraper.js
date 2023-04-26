/** @format */

const { Cluster } = require("puppeteer-cluster");
const writeToFile = require("./writeToFile");

const pageScraper = async (url, link) => {
  const { baseUrl, name } = link;
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
    const lnk = url.startsWith("http") ? url : `${baseUrl}/${url}`;
    await page.goto(lnk);
    const extractedText = await page.$eval("*", (el) => el.innerText);
    const extractedEmails = extractedText.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    );
    if (extractedEmails) {
      writeToFile(extractedEmails, name);
    }
  });

  for (let index = 0; index < url.length; index++) {
    cluster.queue(url[index]);
  }
  await cluster.idle();
  await cluster.close();
  return true;
};

module.exports = pageScraper;

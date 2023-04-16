/** @format */

const fs = require("fs");

const writeToFile = (content) => {
  try {
    let arr = content.join("\n");
    if (arr == "") {
      arr = "sorry boss, no mails found";
    }
    fs.writeFileSync("test.txt", arr);
    return true;
  } catch (err) {
    console.error(err);
  }
};
module.exports = writeToFile;

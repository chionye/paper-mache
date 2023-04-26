/** @format */

const { readFileSync, writeFile, existsSync } = require("fs");

function checkIfContainsSync(filename, str) {
  const contents = readFileSync(filename, "utf-8");
  const result = contents.toLowerCase().includes(str.toLowerCase());
  return result;
}

const writeToFile = (content, filename) => {
  try {
    let arr = content.join("\n");
    if (arr == "") {
      arr = "sorry boss, no mails found";
    }
    if (existsSync(`${filename}.txt`)) {
      if (!checkIfContainsSync(`${filename}.txt`, arr)) {
        writeFile(`${filename}.txt`, { flag: "a" }, arr);
      }
    }else{
      writeFile(`${filename}.txt`, { flag: "a" }, arr);
    }
    return true;
  } catch (err) {
    console.error(err);
  }
};
module.exports = writeToFile;

const { appendFile } = require("fs");

const writeToFile = (content, filename) => {
  try {
    let arr = "";
    arr = content.join("\n");
    appendFile(`${filename}.txt`, `${arr}\n`, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
    return true;
  } catch (err) {
    console.error(err);
  }
};

module.exports = writeToFile;

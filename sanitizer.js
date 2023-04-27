const fsPromises = require("fs/promises");
const { writeFileSync } = require("fs");

const sanitizeFile = async (filename) => {
  try {
    const texts = await fsPromises.readFile(filename, "utf-8");
    const arr = [...new Set(texts.split("\n"))];
    const content = arr.join("\n");
    writeFileSync(filename, content, { encoding: "utf8", flag: "w" });
    return true;
  } catch (err) {
    console.error(err);
  }
  return false;
};

module.exports = sanitizeFile;

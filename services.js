const fs = require("fs");
const puppeteer = require("puppeteer");
let counter = 0;

/**
 * A helper function to create csv file
 * @function createFile
 * @param {string} path - file path with filename
 * @returns {undefined}
 */
function createFile(path) {
  fs.writeFileSync(
    path,
    "NO, URL, DOMAIN"
  );
}

/**
 * A helper function to append lines to the csv file.
 * @function appendToFile
 * @param {string} filepath - relative filepath
 * @param {object} data - data to be written.
 * @returns {undefined}
 */
function appendToFile(filePath, data) {
  if (!data) {
    return fs.appendFileSync(filePath, "\n N.A,,,,,,,,,,,,,,,");
  }
  let fileText = `\n ${++counter},`;
    const values = Object.values(data);
    values.forEach((value) => {
      fileText += `"${value}",`;
    });

  fs.appendFileSync(filePath, fileText, { encoding: "utf8" });
}

/**
 * A helper function to get the html file of curresponding url
 * @function getHtml
 * @param {string} - url
 * @returns {string} - html as string.
 */
async function getHtml(url) {
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  try { await page.goto(url, { waitUntil: "networkidle0" }); } catch { }

  const html = await page.content();
  // await browser.close();
  return [html,page, browser];
}

/**
 * A helper function to validate urls
 * @function validateUrl
 * @param {string} url -  input url
 * @returns {boolean} - true/false
 */


/**
 * A helper function to get date in yyyymmdd format
 * @function getDate
 * @returns {string}
 */

function getDate() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("");
}

module.exports = {
  appendToFile,
  getHtml,
  createFile,
  getDate
};
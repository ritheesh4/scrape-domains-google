const cheerio = require("cheerio");
const services = require("./services");

const currentAffairs = (html, filename) => {
  const $ = cheerio.load(html);

  /**
   * A fuction which returns datadetails
   * @function getProduct
   * @returns {object} - returns a JSON object
   * 
   */

  const count = $('div.yuRUbf')
    .find('>a').length

  const getData = (domainNumber) => {
    const data = {};

    data["Url"] = $('div.yuRUbf')
      .find('>a').eq(domainNumber).attr('href')
    const url = $('div.yuRUbf')
      .find('>a').eq(domainNumber).attr('href')
    const newURl = new URL(url)
    data["Domain"] = newURl.hostname
    
    return data;
  };

  for (let domainNumber = 0; domainNumber < count; domainNumber++) {
    const output = getData(domainNumber);
    services.appendToFile(filename, output);
  }
  return true;
};

module.exports = currentAffairs;

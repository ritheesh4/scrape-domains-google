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

    // data["domainNumber"] = $("td[class=bix-td-qtxt]").eq(domainNumber).text()

    data["Url"] = $('div.yuRUbf')
      .find('>a').eq(domainNumber).attr('href')
    const url = $('div.yuRUbf')
      .find('>a').eq(domainNumber).attr('href')
    const newURl = new URL(url)
    data["Domain"] = newURl.hostname
    // data["B"] = $("td[class=bix-td-miscell]").eq(domainNumber).find('td').eq(3).text()
    // data["C"] = $("td[class=bix-td-miscell]").eq(domainNumber).find('td').eq(5).text()
    // data["D"] = $("td[class=bix-td-miscell]").eq(domainNumber).find('td').eq(7).text()

    // data["Answer"] = $("input[class=jq-hdnakq]").eq(domainNumber).val()

    // data["Solution"] = $("div[class=bix-ans-description]").eq(domainNumber).text()

    return data;
  };

  for (let domainNumber = 0; domainNumber < count; domainNumber++) {
    const output = getData(domainNumber);
    services.appendToFile(filename, output);
  }
  return true;
};

module.exports = currentAffairs;

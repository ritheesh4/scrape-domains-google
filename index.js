const services = require("./services");
const scrapeDomains = require("./scrapeDomains");
const { getDate } = require("./services");
const cheerio = require("cheerio");

(async () => {

  let searchString = 'modern languages';// Replace the string with search keyword
  searchString = searchString.replace(/\s+/g, '+');
  
  const url = `https://www.google.com/search?q=${searchString}`
  const filename = `./output/scrape-domains-${getDate()}.csv`;
  services.createFile(filename);
  
  let result = await services.getHtml(url);
  let html = result[0];
  let page = result[1];
  const browser = result[2];
  let pageNumbers = await page.$$('table tr td');

  // Initial page load
  scrapeDomains(html, filename);

  // Next page
  const fetchNew = async (i) => {
    try {

      const currentPageNUmber = () => {

        const $ = cheerio.load(html);
        let childCount = 1;
        while (i >= childCount) {
          let pageNumber = $('td').eq(childCount).text()
          if (i != pageNumber) {
            childCount++
          } else { break }
        }
        return childCount
      }

      await pageNumbers[currentPageNUmber()].click()
      var page = await browser.targets()[browser.targets().length - 1].page();
      const delay = 3 * 1000; // 3seconds
      await new Promise((resolve) => setTimeout(resolve, delay));
      let currentHtml = await page.content();
      html = currentHtml;
      let result = await scrapeDomains(currentHtml, filename);
      pageNumbers = await page.$$('table tr td');
      return result
    }
    catch (e) {
      return false
    }
  }

  for (let i = 2; i < 100; i++) {
    let status = await fetchNew(i);
    if(status === false){
      break;
    }
  }
  console.log('scrape completed')
})();

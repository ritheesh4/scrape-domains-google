const services = require("./services");
const scrapeDomains = require("./scrapeDomains");
const { getDate } = require("./services");

(async () => {

  const url = 'https://www.google.com/search?q=india+news'
  const filename = `./output/scrape-domains-${getDate()}.csv`;
  services.createFile(filename);
  let result = await services.getHtml(url);
  let html = result[0];
  let page = result[1];
  const browser = result[2];
  let pageNumbers = await page.$$('table tr td');

  scrapeDomains(html, filename);

  const fetchNew = async (i) => {
    try {
      await pageNumbers[i].click()
      var page = await browser.targets()[browser.targets().length - 1].page();
      const delay = 3 * 1000; // 1 minutes
      await new Promise((resolve) => setTimeout(resolve, delay));
      let currentHtml = await page.content();
      let result = await scrapeDomains(currentHtml, filename);
      pageNumbers = await page.$$('table tr td');
      return result
    }
    catch (e) {
      return false
    }
  }
  
  for (let i = 2; i < 20; i++) {
    await fetchNew(i)
  }
  console.log('scrape completed')
})();

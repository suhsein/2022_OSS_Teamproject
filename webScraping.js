const axios = require('axios');
const cheerio = require('cheerio');
/* eslint no-restricted-syntax:0 */ // for문 해당
async function webScraping(url, dayNum, selector) {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  const lunch = $(selector).first();
  const curDay = $(lunch).find('td > ul').get(dayNum - 1);

  const foods = [];
  for (const x of $(curDay).find('li')) {
    curText = $(x).text().trim().replace('\n', '');
    if (curText !== '') {
      foods.push(curText);
    }
  }
  return foods;
}

module.exports = webScraping;

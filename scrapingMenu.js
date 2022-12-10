const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://sobi.jbnu.ac.kr/menu/week_menu.php';
const selector = 'table.tblType03 > tbody > tr';
/* eslint no-restricted-syntax:0 */ // for문 해당
const scrapingMenu = async function (dayNum) {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  const lunch = $(selector).first();
  const curDay = $(lunch).find('td > ul').get(dayNum - 1);
  let curText;

  const foods = [];
  for (const x of $(curDay).find('li')) {
    curText = $(x).text().trim().replace('\n', '');
    if (curText !== '') {
      foods.push(curText);
    }
  }
  return foods;
};
module.exports = scrapingMenu;

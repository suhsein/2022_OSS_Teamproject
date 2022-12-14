const axios = require('axios');
const cheerio = require('cheerio');

const meat = ['육', '고기', '돈', '닭', '도리', '너비아니', '갈비'];
const hate = ['무침', '느타리', '버섯'];
const url = 'https://sobi.jbnu.ac.kr/menu/week_menu.php';
const selector = 'table.tblType03 > tbody > tr';
/* eslint no-restricted-syntax:0 */ // for문 해당
async function ScrapingMenu() {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  const lunch = $(selector).first();
  const days = $(lunch).find('td > ul').slice(0, 5);
  let star;
  let curText;

  for (const curDay of days) {
    const foods = [];
    for (const x of $(curDay).find('li')) {
      curText = $(x).text().trim().replace('\n', '');
      if (curText !== '') {
        foods.push(curText);
      }
    }
    let good = 0;
    let bad = 0;

    foods.forEach((food) => { // 오늘의 메뉴 배열 -> 보낼 메세지 만들기
      meat.some((m) => {
        if (food.includes(m)) {
          good += 1;
          return true;
        }
        return false;
      });
      hate.some((h) => {
        if (food.includes(h)) {
          bad += 1;
          return true;
        }
        return false;
      });
    });

    if (good > bad) star = 3;
    else if (good === bad) star = 2;
    else star = 1;

    global.menuDict[foods] = star;
  }
}
ScrapingMenu();

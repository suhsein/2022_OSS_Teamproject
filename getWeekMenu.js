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

const url = 'https://sobi.jbnu.ac.kr/menu/week_menu.php';
const selector = 'table.tblType03 > tbody > tr';
const meat = ['육', '고기', '돈', '닭', '도리', '너비아니', '갈비'];
const hate = ['무침', '느타리', '버섯'];
const days = ['월', '화', '수', '목', '금'];
const stars = ['★☆☆', '★★☆', '★★★'];

const getWeekMenu = async function (rtm, channel) {
  console.log('이번주 메뉴를 안내합니다.');
  let text = '';

  /* eslint-disable no-await-in-loop */
  for (const [index, value] of days.entries()) { //  월~금 이면
    star = 1;
    let good = 0;
    let bad = 0;
    const curMenu = await webScraping(url, index, selector);
    console.log(curMenu);

    curMenu.forEach((food) => { // 오늘의 메뉴 배열 -> 보낼 메세지 만들기
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

    text += `${value} ${stars[star - 1]}\n`;
  }

  rtm.sendMessage(`${text}`, channel);
  return '이번주 메뉴 평가 성공';
};
module.exports = getWeekMenu;

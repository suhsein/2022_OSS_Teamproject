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
    if ($(x).text() !== '') {
      foods.push($(x).text());
    }
  }
  return foods;
}

const url = 'https://sobi.jbnu.ac.kr/menu/week_menu.php';
const selector = 'table.tblType03 > tbody > tr';

const getTodayMenu = async function (rtm, dayNum, channel) {
  console.log('오늘의 메뉴를 안내합니다.');

  if (dayNum >= 1 && dayNum <= 5) { //  월~금 이면
    const curMenu = await webScraping(url, dayNum, selector);
    console.log(curMenu);
    let text = '';

    curMenu.forEach((food) => { // 오늘의 메뉴 배열 -> 보낼 메세지 만들기
      if (text === '') {
        text += food;
      } else {
        text += `, ${food}`;
      }
    });
    rtm.sendMessage(`${text} 입니다`, channel);
    return '오늘의 식단메뉴 안내와 평가 성공';
  }
  rtm.sendMessage('토요일, 일요일은 식단이 없습니다.', channel); // 토요일, 일요일은 예외처리
  return '주말 예외처리';
};
module.exports = getTodayMenu;

const axios = require('axios');
const cheerio = require('cheerio');

const days = ['월', '화', '수', '목', '금'];

async function webScraping(url, selector) {
  const res = {};
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);

  let i = 0;
  for (const v of $(selector)) {
    const lst = [];
    for (const x of $(v).find('li > span')) {
      lst.push($(x).text());
    }
    for (const x of $(v).find('li > font')) {
      lst.push($(x).text());
    }
    res[days[i]] = lst;

    i += 1;
    if (i >= days.length) {
      break;
    }
  }
  return res;
}

const url = 'https://sobi.jbnu.ac.kr/menu/week_menu.php';
const selector = 'table.tblType03 > tbody > tr > td > ul';
const dayArr = {
  1: '월', 2: '화', 3: '수', 4: '목', 5: '금',
};
const scoreArr = [2, 1, 2, 3, 1];

const todayMenu = function (rtm, dayNum, channel) {
  console.log('오늘의 메뉴를 안내합니다.');
  let success = false;

  webScraping(url, selector).then((res) => {
    const menuDict = res;

    if (dayNum >= 1 && dayNum <= 5) { //  월~금 이면
      const curMenu = menuDict[dayArr[dayNum]]; // 오늘의 메뉴 가져오기
      let text = '';

      curMenu.forEach((food) => { // 오늘의 메뉴 배열 -> 보낼 메세지 만들기
        if (text === '') {
          text += food;
        } else {
          text += `, ${food}`;
        }
      });

      const score = scoreArr[dayNum - 1]; // 오늘의 메뉴의 점수
      let star = '';
      for (let i = 0; i < score; i++) {
        star += '★';
      }
      for (let i = 0; i < 3 - score; i++) {
        star += '☆';
      }
      rtm.sendMessage(text, channel);
      rtm.sendMessage(star, channel);
      success = true;
      //return '오늘의 식단메뉴 안내와 평가 성공';
      // rtm.sendMessage(`${starArr[dayNum]}점`, channel);
    }
    rtm.message('토요일, 일요일은 식단이 없습니다.', channel); // 토요일, 일요일은 예외처리
    //return '주말 예외처리';
  });
  if(success){
    return '오늘의 식단메뉴 안내와 평가 성공';
  }
  return '주말 예외처리';
};

module.exports = todayMenu;
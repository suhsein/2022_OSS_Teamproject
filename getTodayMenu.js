const webScraping = require('./webScraping');
/* eslint no-restricted-syntax:0 */ // for문 해당

const url = 'https://sobi.jbnu.ac.kr/menu/week_menu.php';
const selector = 'table.tblType03 > tbody > tr';
const meat = ['육', '고기', '돈', '닭', '도리', '너비아니', '갈비'];
const hate = ['무침', '느타리', '버섯'];
const stars = ['★☆☆', '★★☆', '★★★'];

const getTodayMenu = async function (rtm, dayNum, channel) {
  console.log('오늘의 메뉴를 안내합니다.');
  star = 1;
  let good = 0;
  let bad = 0;

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

    rtm.sendMessage(`${text} 입니다. 별점 : ${stars[star - 1]}`, channel);
    return '오늘의 식단메뉴 안내와 평가 성공';
  }
  rtm.sendMessage('토요일, 일요일은 식단이 없습니다.', channel); // 토요일, 일요일은 예외처리
  return '주말 예외처리';
};
module.exports = getTodayMenu;

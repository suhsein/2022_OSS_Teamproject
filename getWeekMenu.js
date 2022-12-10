const webScraping = require('./webScraping');
/* eslint no-restricted-syntax:0 */ // for문 해당

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
  // 반복문 내에서 비동기 처리를 할 수 있도록 no-await-in-loop 해제

  for (const [index, value] of days.entries()) { //  월~금 이면
    // for of 문으로 비동기 처리 가능하게 함
    star = 1;
    let good = 0;
    let bad = 0;
    const curMenu = await webScraping(url, index, selector);
    console.log(curMenu);

    curMenu.forEach((food) => { // 오늘의 메뉴 배열 -> 보낼 메세지 만들기
      meat.some((m) => { // 반복문에서 조건 만족 시 break 할 수 있도록 some 사용
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

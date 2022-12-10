/* eslint no-restricted-syntax:0 */ // for문 해당

const stars = ['★☆☆', '★★☆', '★★★'];

const getTodayMenu = async function (rtm, dayNum, menuDict, channel) {
  console.log('오늘의 메뉴 및 평가를 안내합니다.');

  if (dayNum >= 1 && dayNum <= 5) { //  월~금 이면
    const curMenu = Object.keys(menuDict)[dayNum - 1];
    const foodList = curMenu.split(',');
    let text = '';

    foodList.forEach((food) => { // 오늘의 메뉴 배열 -> 보낼 메세지 만들기
      if (text === '') {
        text += food;
      } else {
        text += `, ${food}`;
      }
    });
    const star = menuDict[curMenu];

    rtm.sendMessage(`${text} 입니다. \n 별점 : ${stars[star - 1]}`, channel);
    return '오늘의 식단메뉴 안내와 평가 성공';
  }
  rtm.sendMessage('토요일, 일요일은 식단이 없습니다.', channel); // 토요일, 일요일은 예외처리
  return '주말 예외처리';
};
module.exports = getTodayMenu;

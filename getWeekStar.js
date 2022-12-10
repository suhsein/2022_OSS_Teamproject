/* eslint no-restricted-syntax:0 */ // for문 해당
const days = ['월', '화', '수', '목', '금'];
const stars = ['★☆☆', '★★☆', '★★★'];

const getWeekStar = async function (rtm, menuDict, channel) {
  console.log('주간 식단 평가 결과를 안내합니다.');
  let text = '';
  /* eslint-disable no-await-in-loop */
  // 반복문 내에서 비동기 처리를 할 수 있도록 no-await-in-loop 해제
  for (const [index, value] of days.entries()) { //  월~금 이면
    // for of 문으로 비동기 처리 가능하게 함
    const curMenu = Object.keys(menuDict)[index];
    const star = menuDict[curMenu];
    text += `${value} - ${stars[star - 1]}\n`;
  }

  rtm.sendMessage(`${text}`, channel);
  return '이번주 메뉴 평가 성공';
};
module.exports = getWeekStar;

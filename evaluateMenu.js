const meat = ['육', '고기', '돈', '닭', '도리', '너비아니', '갈비'];
const hate = ['무침', '느타리', '버섯'];

const evaluateMenu = function (menu) {
  let star;
  let good = 0;
  let bad = 0;

  menu.forEach((food) => { // 오늘의 메뉴 배열 -> 보낼 메세지 만들기
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

  return star;
};
module.exports = evaluateMenu;

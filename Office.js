const Comparestring = require('./Comparestring');

const Office = function (rtm, text, channel, dict) {
  const spaceRegex = / /gi;

  if (text in dict) { // 알맞는 전공 입력
    rtm.sendMessage(dict[text], channel);
    console.log('학과 안내 성공');
    return dict[text];
  }
  // 대소문자, 띄어쓰기 허용
  const majorList = Object.keys(dict);
  const modifiedText = text.replace(spaceRegex, '').toLowerCase();
  for (let i = 0; i < majorList.length; i += 1) {
    const modifiedMajor = majorList[i].replace(spaceRegex, '').toLowerCase();
    if (modifiedMajor === modifiedText) {
      rtm.sendMessage(dict[majorList[i]], channel);
      console.log('대소문자, 띄어쓰기 허용');
      return dict[majorList[i]];
    }
  }
  // 유사한 학과 찾기
  const similarMajor = Comparestring(text, dict);
  rtm.sendMessage(`${similarMajor} 학과를 찾으시나요?\n${similarMajor} 의 학과사무실 위치는 ${dict[similarMajor]} 입니다`, channel);
  console.log('유사한 학과 안내 성공');
  return '유사학 학과 찾아서 안내 성공';
};

module.exports = Office;

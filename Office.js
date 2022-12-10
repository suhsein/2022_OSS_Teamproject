const Comparestring = require('./Comparestring');

const Office = function (rtm, text, channel) {
  if (text === '학과 안내') {
    console.log('안내받고 싶은 학과를 영문으로 입력하세요');
    rtm.sendMessage('안내받고 싶은 학과를 영문으로 입력하세요', channel);
    return Promise.resolve('안내 메세지 출력');
  }

  console.log('학과 사무실을 안내합니다.');
  const feat4str = Comparestring(rtm, text, channel);

  return feat4str;
};

module.exports = Office;

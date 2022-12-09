const Office = function (rtm, text, channel, dict) {
  if (text === '학과 안내') {
    return '학과 안내';
  }
  console.log('학과 사무실을 안내합니다.');

  rtm.sendMessage(dict[text], channel);
  return dict[text];
};

module.exports = Office;

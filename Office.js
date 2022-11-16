const Office = function (rtm, text, channel) {
  console.log('학과를 입력해주세요 ');
  console.log(text);

  if (text === '컴퓨터공학부') {
    rtm.sendMessage(`해당 학과의 학과 사무실은 ${text}입니다`, channel);
  }
};

module.exports = Office;

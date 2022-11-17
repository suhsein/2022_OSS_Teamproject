const Schedule = function (rtm, text, channel) {
  console.log('날짜를 입력해주세요');
  console.log(text);
  rtm.sendMessage(`${text}일은 ${text}입니다`, channel);
};

module.exports = Schedule;

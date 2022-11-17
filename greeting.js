const greeting = function (rtm, channel) {
  console.log('인사를 합니다.');
  // 인사를 합시다가 아니라 인사를 합니다라고 변경해야 실 사용자들이 불편하지 않을 거 같다
  const randomnum = Math.floor(Math.random() * 3);
  // 변수 randomnum에 난수를 받는다 Math.floor는 소수점 절삭 *3을 통해 0~1까지의 범위를 3까지로 늘린다
  if (randomnum === 1) {
    rtm.sendMessage('Hello!', channel);
  } else if (randomnum === 2) {
    rtm.sendMessage('Hi!', channel);
  } else if (randomnum === 3) {
    rtm.sendMessage('Nice to meet you!', channel);
  }
  /*
    임의의 난수 생성을 통해서 3개의 난수를 받고 소수점 절삭을 통해서 정수만 받은 다음,
    3개의 인사를 할 수 있도록 설정
  */
};

module.exports = greeting;

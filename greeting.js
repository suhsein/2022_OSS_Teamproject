const greeting = function (rtm, channel) {
  console.log('인사를 합시다.');
  const rand = Math.floor(Math.random() * 3);

  try {
    if (rand == 0) {
      rtm.sendMessage('Hello!', channel);
      return Promise.resolve('1번 패턴 인사 성공');
    } if (rand == 1) {
      rtm.sendMessage('nice to meet you', channel);
      return Promise.resolve('2번 패턴 인사 성공');
    }
    rtm.sendMessage('안녕하세요', channel);
    return Promise.resolve('3번 패턴 인사 성공');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = greeting;

const greeting = function (rtm, channel) {
  console.log('인사를 합시다.');

  const rand = Math.floor(Math.random() * 3); // 난수 생성
  const greetings = ['Hello!', 'Nice to meet you.', 'Have a good day!']; // 랜덤으로 나오는 인사말

  try {
    rtm.sendMessage(greetings[rand], channel);
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = greeting;

const greeting = function (rtm, channel, rand) {
  console.log('인사를 합시다.');
  const greetings = ['Hello!', 'Nice to meet you.', 'Have a good day!']; // 랜덤으로 나오는 인사말

  try {
    rtm.sendMessage(greetings[rand], channel);
    return `${rand + 1}번 패턴 인사 성공`;
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};
module.exports = greeting;
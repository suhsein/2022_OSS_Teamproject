const greeting = function (rtm, channel) {
  console.log('인사를 합시다.');
  rtm.sendMessage('Hello!', channel);
};
module.exports = greeting;

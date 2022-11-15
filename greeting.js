const greeting = function (rtm, channel) {
  console.log('인사를 합시다.');

  try {
    rtm.sendMessage('Hello!', channel);
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};
module.exports = greeting;

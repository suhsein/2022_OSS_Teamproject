const square = function (rtm, text, channel) {
  console.log('제곱을 실시합니다.');
  console.log(text);
<<<<<<< HEAD
  rtm.sendMessage(`The result is${text * text}`, channel);
=======
  rtm.sendMessage(`The result is ${text * text}`, channel);
>>>>>>> e0710f825222ab21a5531c26965f7bc9d0479ca7
};

module.exports = square;

const square = function (rtm, text, channel) {
  console.log('제곱을 해봅시다');
  console.log(text);

  rtm.sendMessage(`The result is ${text * text}`, channel);
};

module.exports = square;

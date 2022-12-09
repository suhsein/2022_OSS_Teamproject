const Office = function (rtm, text, channel, dict) {
  if (text === '학과 안내') {
    return '학과 안내';
  }

  rtm.sendMessage(dict[text], channel);
  return dict[text];
};

module.exports = Office;

const Office = function (rtm, text, channel, dict) {
  rtm.sendMessage(dict[text], channel);
  return dict[text];
};

module.exports = Office;

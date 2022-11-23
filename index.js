require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let token;

// 이 위가 웹 스크래핑 하는 코드이다.
try {
  token = fs.readFileSync('./token').toString('utf-8');
} catch (err) {
  console.error(err);
}
/* 토큰 분리 */

console.log(token);

const rtm = new RTMClient(token);
rtm.start();

const greeting = require('./greeting');
const square = require('./square');
const Office = require('./Office');
const getOfficeDict = require('./getOfficeDict');

const officeDict = getOfficeDict();
/*
  Office 추가
  */

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (!isNaN(text)) {
    square(rtm, text, channel);
  } else if (text in officeDict) {
    Office(rtm, text, channel, officeDict);
  } else {
    switch (text) {
      case 'hi': // # feature 1번 기능이다. 이 부분의 구현은 greeting.js에 구현을 한다.
        greeting(rtm, channel);
        break;
      default:
        rtm.sendMessage('I`m alive', channel);
    }
  }
});

require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let token;

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
const Schedule = require('./Schedule');
/*
  Office 추가
  */

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (text === null) {
    square(rtm, text, channel);
  } else {
    switch (text) {
      case 'hi': // # feature 1번 기능이다. 이 부분의 구현은 greeting.js에 구현을 한다.
        greeting(rtm, channel);
        break;
      case '학사일정': // # feature 3번의 기능이다. 이 부분의 구현은 Schedule.js에 구현을 한다.
        Schedule(rtm, text, channel);
        break;
      case `${text}부` || `${text}과`:
      // # feature 4번의 기능이다. 이 부분의 구현은 Office.js에 구현을 한다.
      // # 마지막에 부로 끝나는 학과나 과로 끝나는 학과 두 가지가 있으므로 주의한다.
        Office(rtm, text, channel);
        break;
      default:
        rtm.sendMessage('I`m alive', channel);
    }
  }
});

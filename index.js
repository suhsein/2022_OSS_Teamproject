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
      // Feature 4번의 Case이다. 일렬로 정의했다.
      case 'Architectural Engineering':
      case 'Mechanical Engineering':
      case 'Urban Engineering':
      case 'Electronic Engineering':
      case 'Computer Science and Engineering':
      case 'Chemical Engineering':
      case 'Accounting':
      case 'International Trade':
      case 'Library and Information Science':
      case 'Korean Language and Literature':
        Office(rtm, text, channel);
        break;
        // # feature 4번의 기능이다. 이 부분의 구현은 Office.js에 구현을 한다.
        // # 마지막에 부로 끝나는 학과나 과로 끝나는 학과 두 가지가 있으므로 주의한다.
      default:
        rtm.sendMessage('I`m alive', channel);
    }
  }
});

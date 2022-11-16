require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');

let token;
const fs = require('fs');

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
      case 'hi':
        greeting(rtm, channel);
        break;
      case '컴퓨터공학부':
        Office(rtm, channel);
        break;
      default:
        rtm.sendMessage('I`m alive', channel);
    }
  }
});

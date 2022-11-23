require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let token;

try {
  token = fs.readFileSync('./token').toString('utf-8');
} catch (err) {
  console.error(err);
}

console.log(token);

const rtm = new RTMClient(token);
rtm.start();

const greeting = require('./greeting');
const square = require('./square');

/* eslint no-restricted-globals: ["off"] */
// isNaN 오류 예외처리

let rand;

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (!isNaN(text)) {
    square(rtm, text, channel);
  } else {
    switch (text) {
      // feature 1
      case 'hi':
      case 'Hi':
        rand = Math.floor(Math.random() * 3); // 난수 생성
        greeting(rtm, channel, rand);
        break;
      default:
        rtm.sendMessage('I`m alive', channel);
    }
  }
});

require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');

const fs = require('fs');
const Comparestring = require('./Comparestring');
const greeting = require('./greeting');

let status = 0;

let token;

try {
  token = fs.readFileSync('./token').toString('utf-8');
} catch (err) {
  console.error(err);
}

token = token.trim();
const test_channel = // 잠깐 공란

rtm.start();

rtm.on('ready', async () => {
  const rdy1 = await rtm.sendMesssage('테스트를 시작한다.', test_channel);
  console.log('테스트 루틴 시작합니다');
  status += 1;
  const rdy2 = await rtm.sendMesssage('hi', test_channel);
});

rtm.on('message', (message) => {
  const { text } = message;

  console.log('받은 메시지 : ', text);

  if (status === 1) {
    if (text === 'Hi') {
      greeting(rtm, channel, 0);
      greeting(rtm, channel, 1);
      greeting(rtm, channel, 2);
    } else if (text === 'hi') {
      greeting(rtm, channel, 0);
      greeting(rtm, channel, 1);
      greeting(rtm, channel, 2);
    }
  } // Feature/1
  status += 1; // Feature/2
  status += 1;
  if (status === 3) {

  }
  status += 1;
  if (status === 4) {
    if (text === 'Computer Science and Engineering') {
      Comparestring(rtm, channel, text);
      console.log('오탈자 없이 들어왔을 경우');
    } else if (text === 'computer science and') {
      Comparestring(rtm, channel, text);
      console.log('오탈자가 있을 경우');
    }
  } // feature/4
});

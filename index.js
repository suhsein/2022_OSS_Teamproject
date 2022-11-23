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
const schedule = require('./schedule'); // 학사일정 안내 모듈
const getschedule = require('./getschedule'); // 학사일정 딕셔너리 생성 모듈. 학사일정 안내 시 매번 for문을 돌지 않도록 함.

function dateExist(text) {
  const m1 = [1, 3, 5, 7, 8, 10, 12];
  const m2 = [4, 6, 9, 11];

  const month = Number(text.split('/')[0]);
  const day = Number(text.split('/')[1]);

  if (m1.includes(month) && day >= 1 && day <= 31) {
    return true;
  } if (m2.includes(month) && day >= 1 && day <= 30) {
    return true;
  } if (month === 2 && day >= 1 && day <= 29) {
    return true;
  }
  return false;
}
/* eslint no-restricted-globals: 0 */
const dateRegex = /\d{1,2}\/\d{1,2}/; // 월/일
let state = 0;
const scheduledict = getschedule(); // 학사일정 딕셔너리 가져오기

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (!isNaN(text)) {
    square(rtm, text, channel);
    state = 0;
  } else if (state === 0 && dateRegex.test(text) && dateExist(text)) {
    // 날짜 양식과 부합하나 학사일정을 먼저 입력하지 않은 경우
    schedule(rtm, state, text, channel, scheduledict);
  } else if (state === 1) {
    if (!dateRegex.test(text) || !dateExist(text)) { // 날짜 양식이 틀렸거나 존재하지 않는 날짜의 경우
      state = 2;
    }
    schedule(rtm, state, text, channel, scheduledict);
    state = 0;
  } else {
    state = 0; // 학사일정 입력 후 날짜양식을 바로 입력하지 않으면 초기화

    switch (text) {
      case '테스트를 시작한다.':
        break;
      case 'hi':
        greeting(rtm, channel);
        break;
      case '학사일정':
        schedule(rtm, state, text, channel);
        state = 1; // 학사일정을 먼저 입력한 경우
        break;
      default:
        rtm.sendMessage('I`m alive', channel);
    }
  }
});

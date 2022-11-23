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
const getScheduleDict = require('./getScheduleDict'); // 학사일정 딕셔너리 생성 모듈. 학사일정 안내 시 매번 for문을 돌지 않도록 함.

/* eslint no-restricted-globals: 0 */
let state = 0;
const scheduledict = getScheduleDict(); // 학사일정 딕셔너리 가져오기

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (state === 1) { // 학사일정을 입력한 상태면 학사일정 안내 모듈 실행
    schedule(rtm, text, channel, scheduledict);
    state = 0; // 상태 초기화
  } else if (!isNaN(text)) {
    square(rtm, text, channel);
  } else {
    switch (text) {
      case '테스트를 시작한다.':
        break;
      case 'hi':
        greeting(rtm, channel);
        break;
      case '학사일정':
        schedule(rtm, text, channel, scheduledict);
        state = 1; // 학사일정을 입력하면 날짜를 입력받을 수 있는 state 바뀜
        break;
      default:
        rtm.sendMessage('"hi" "학사일정" "오늘 밥 뭐야" 를 입력하거나 "학과이름을 영어로" 입력하시오', channel);
    }
  }
});

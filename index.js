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
const levenshtein = require('./js-levenshtein');
const greeting = require('./feature-1/greeting');
const square = require('./square');
const Office = require('./feature-4/Office');
const schedule = require('./feature-2/schedule'); // 학사일정 안내 모듈
const getScheduleDict = require('./feature-2/getScheduleDict'); // 학사일정 딕셔너리 생성 모듈. 학사일정 안내 시 매번 for문을 돌지 않도록 함.

const scheduledict = getScheduleDict(); // 학사일정 딕셔너리 가져오기

let state = 0;

/* eslint no-restricted-globals: ["off"] */
// isNaN 오류 예외처리

let rand;

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (state === 1) { // 학사일정을 입력한 상태면 학사일정 안내 모듈 실행
    schedule(rtm, text, channel, scheduledict);
    state = 0;
  } else if (state === 4) {
    Office(rtm, text, channel);
    state = 0;
  } else if (!isNaN(text)) {
    square(rtm, text, channel);
  } else {
    switch (text) {
      case '테스트를 시작한다.':
        break;
      case 'hi':
      case 'Hi':
        rand = Math.floor(Math.random() * 3); // 난수 생성
        greeting(rtm, channel, rand);
        break;
      case '학사일정':
        state = 1; // 학사일정을 입력하면 날짜를 입력받을 수 있는 state 바뀜
        break;
      case '학과 안내':
        Office(rtm, text, channel);
        state = 4;
        break;
      default:
        rtm.sendMessage('"hi" / "학사일정" / "오늘 밥 뭐야" 혹은 "학과 안내"를 입력하세요!', channel);
    }
  }
});

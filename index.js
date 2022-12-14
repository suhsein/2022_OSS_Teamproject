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

global.menuDict = {};
const greeting = require('./greeting');
const square = require('./square');
const Office = require('./Office');
const schedule = require('./schedule'); // 학사일정 안내 모듈
const getTodayMenu = require('./getTodayMenu');
const getOfficeDict = require('./getOfficeDict');
const getScheduleDict = require('./getScheduleDict'); // 학사일정 딕셔너리 생성 모듈. 학사일정 안내 시 매번 for문을 돌지 않도록 함.
const getWeekStar = require('./getWeekStar');
const ScrapingMenu = require('./ScrapingMenu');

const officeDict = getOfficeDict();
const scheduledict = getScheduleDict(); // 학사일정 딕셔너리 가져오기

let state = 0;

/* eslint no-restricted-globals: ["off"] */
// isNaN 오류 예외처리

const rtm = new RTMClient(token);
rtm.start();

const now = new Date();
let dayNum;
let rand;

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (state === 1) { // 학사일정을 입력한 상태면 학사일정 안내 모듈 실행
    schedule(rtm, text, channel, scheduledict);
    state = 0;
  } else if (state === 2) {
    Office(rtm, text, channel, officeDict);
    state = 0;
  } else if (!isNaN(text)) {
    square(rtm, text, channel);
  } else {
    switch (text) {
      case '테스트를 시작한다.':
      case '테스트를 종료한다.':
        break;
      case 'hi':
      case 'Hi':
        rand = Math.floor(Math.random() * 3); // 난수 생성
        greeting(rtm, channel, rand);
        break;
      case '학사일정':
        schedule(rtm, text, channel, scheduledict);
        state = 1; // 학사일정을 입력하면 날짜를 입력받을 수 있는 state 바뀜
        break;
      case '학과 안내':
        console.log('학과 사무실을 안내합니다.');
        rtm.sendMessage('안내받고 싶은 학과를 영문으로 입력하세요', channel);
        state = 2;
        break;
      case '오늘 밥 뭐야':
        dayNum = now.getDay();
        getTodayMenu(rtm, dayNum, menuDict, channel);
        break;
      case '이번주 뭐 나와':
        getWeekStar(rtm, menuDict, channel);
        break;
      default:
        rtm.sendMessage('"hi" / "학사일정" / "오늘 밥 뭐야" / "이번주 뭐 나와" 혹은 "학과 안내"를 입력하세요!', channel);
    }
  }
});

require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');

const fs = require('fs');

const channel = 'C046PKBTVTR';

let token;

try {
  token = fs.readFileSync('./token').toString('utf-8');
} catch (err) {
  console.error(err);
}

console.log(token);

const rtm = new RTMClient(token);
rtm.start();

const assert = require('assert');
const todayMenu = require('./todayMenu');

const now = new Date();
let dayNum = now.getDay();
let res;

describe('오늘의 메뉴 안내 및 평가 모듈 테스트', () => {
  for (let i = 0; i < 2; i += 1) {
    before(async () => res = await todayMenu(rtm, dayNum, channel));
    if (dayNum === 0 || dayNum === 6) {
      it('Test - 토요일, 일요일은 예외 처리 후 안내메세지', (done) => {
        assert.equal(res, '주말 예외처리');
        done();
      });
      dayNum = Math.floor(Math.random() * 5) + 1;
    } else {
      it('Test - 오늘의 식단 안내 및 평가 메세지', (done) => {
        assert.equal(res, '오늘의 식단메뉴 안내와 평가 성공');
        done();
      });
      dayNum = 6;
    }
  }
});

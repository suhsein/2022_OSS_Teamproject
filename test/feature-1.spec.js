/* eslint-disable */s

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

const greeting = require('./greeting');

let res;

/* eslint no-loop-func: 0 */
describe('인사 모듈 테스트', () => {
  beforeEach(async () => res = await greeting(rtm, channel));

  describe('랜덤으로 인사를 합니다.', () => {
    for (let i = 0; i < 5; i += 1) {
      it('Test - greeting() should return 3 random greeting pattern', (done) => {
        if (res === '1번 패턴 인사 성공' || res === '2번 패턴 인사 성공' || res === '3번 패턴 인사 성공') {
          console.log(res);
          done();
        }
      });
    }
  });
});

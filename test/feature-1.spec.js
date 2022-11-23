/* eslint-disable */

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
const greeting = require('../greeting');

/* eslint no-loop-func: 0 */
describe('랜덤 인사 모듈 테스트', () => {
  function randomTest(x) {
    it(`Test - 난수 생성 시 ${x}이 나왔을 때 ${x+1}번 인사 패턴 출력`, function() {
      assert.equal(greeting(rtm, channel, x), `${x+1}번 패턴 인사 성공`);
    });
  }

  for (let x = 0; x <= 2; x++) {
    randomTest(x);
  }
});

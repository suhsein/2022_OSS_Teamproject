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
/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
const assert = require('assert');
const schedule = require('../schedule');

const testDict = {
  '9/1': [ '2학기 개강', '2학기 수강신청 변경 기간' ],
  '10/20': [ '(대학원) 석사학위 논문 심사 신청' ]
}
let res1;
let res2;

describe('전북대 학사일정 안내 모듈 테스트', () => {
  describe('학사일정 안내 성공 테스트', () => {
    before(async () => res1 = await schedule(rtm, '학사일정', channel, testDict));
    it('Test - 학사일정 입력 시 날짜를 고르라는 안내 메세지 반환', (done) => {
      assert.equal(res1, '안내 메세지 출력');
      done();
    });
  });


  for (var date in testDict) {
    before(async () => res2 = await schedule(rtm, date, channel, testDict));
    it('Test - 날짜 입력 시 해당 날짜의 학사일정 반환', (done) => {
      assert.equal(res2, testDict[date]);
      done();
    });
  }

  describe('해당 날의 학사일정이 없는 경우 예외처리 테스트', () => {
    before(async () => res1 = await schedule(rtm, '11/2', channel, testDict));
    it('Test - 해당 날짜에 학사일정이 없을 시 예외 처리', (done) => {
      assert.equal(res1, '학사일정 없음');
      done();
    });
  });

  describe('입력 양식이 잘못된 경우 예외처리 테스트', () => {
    before(async () => res1 = await schedule(rtm, '9월1일', channel, testDict));
    it('Test - 날짜 입력 시 잘못된 입력을 했을 때 예외 처리', (done) => {
      assert.equal(res1, '잘못된 날짜 양식');
      done();
    });
  });
});
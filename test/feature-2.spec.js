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

let res1;
let res2;

describe('전북대 학사일정 안내 모듈 테스트', () => {
  describe('학사일정 안내 성공 테스트', () => {
    before(async () => res1 = await schedule(rtm, 0, '학사일정', channel));
    it('Test - 학사일정 입력 시 날짜를 고르라는 안내 메세지 반환', (done) => {
      assert.equal(res1, '안내 메세지 출력');
      done();
    });

    before(async () => res2 = await schedule(rtm, 1, '9/1', channel));
    it('Test - 날짜 입력 시 해당 날짜의 학사일정 반환', (done) => {
      assert.equal(res2, '2학기 개강, 2학기 수강신청 변경 기간');
      done();
    });
  });

  describe('해당 날의 학사일정이 없는 경우 예외처리 테스트', () => {
    before(async () => res1 = await schedule(rtm, 1, '11/2', channel));
    it('Test - 해당 날짜에 학사일정이 없을 시 예외 처리', (done) => {
      assert.equal(res1, '학사일정 없음');
      done();
    });
  });

  describe('학사일정을 입력하지 않았을 때 안내 실패 테스트', () => {
    before(async () => res1 = await schedule(rtm, 0, '10/15', channel));
    it('Test - 학사일정을 먼저 입력하지 않고 날짜를 입력하였을 때 안내 실패', (done) => {
      assert.equal(res1, '학사일정 안내 실패');
      done();
    });
  });
});
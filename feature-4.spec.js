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
const office = require('./office');

let res;

describe('전북대 학과 사무실 안내 모듈 테스트', () => {
  describe('학과 입력 시 학과 사무실 안내 테스트', () => {
    it('Test - 학과 입력시 해당 사무실 위치 반환', (done) => {
      assert.equal(office(rtm, '컴퓨터공학과', channel), '학과 사무실 위치 안내 성공');
      done();
    });
  });

  describe('없는 학과를 입력 시 안내 실패 테스트', () => {
    it('Test - 예외 처리', (done) => {
      assert.equal(office(rtm, '생명공학과', channel), '학과 사무실 위치 안내 실패');
      done();
    });
  });
});
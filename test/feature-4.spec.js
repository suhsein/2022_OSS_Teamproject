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
const office = require('../Office');
const Comparestring = require('../Comparestring');

const testDict = {
  'Computer Science and Engineering' : 'College of Engineering Building 7, 224',
  'computerscienceandengineering' : 'College of Engineering Building 7, 224',
  'Korean Language and Literature' : 'College of Humanities, 320',
  'korea languange and liternature' : 'College of Humanities, 320'
}

describe('전북대 학과 사무실 안내 모듈 테스트', () => {
  describe('학과 안내 성공 테스트', () => {
    before(async () => res1 = await office(rtm, '학과 안내', channel));
    it('Test - 학과 안내 입력 시 안내받고 싶은 학과를 영문으로 입력하라는 안내 메세지 반환', (done) => {
      assert.equal(res1, '안내 메세지 출력');
      done();
    });
  });

  for (major in testDict) {
    it('Test - 학과 입력시 해당 사무실 위치 반환', (done) => {
      assert.equal(Comparestring(rtm, major, channel), testDict[major]);
      done();
    });
  }
});

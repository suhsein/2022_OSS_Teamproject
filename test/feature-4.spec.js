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
const spaceRegex = / /gi;

const testDict = {
  'computerscienceandengineering' : 'College of Engineering Building 7, 224',
  'koreanlanguageandliterature' : 'College of Humanities, 320'
}

describe('전북대 학과 사무실 안내 모듈 테스트', () => {
  var major = major.replace(spaceRegex, '').toLowerCase();
  for (major in testDict) {
    it('Test - 학과 입력시 해당 사무실 위치 반환', (done) => {
      assert.equal(office(rtm, major, channel, testDict), testDict[major]);
      done();
    });
  }
});

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
const Comparestring = require('../feature-4/Comparestring');
const spaceRegex = / /gi;

const lowertestDict = {
  'computerscienceandengineering' : 'College of Engineering Building 7, 224',
  'koreanlanguageandliterature' : 'College of Humanities, 320'
}

const testDict = {
  'Computer Science and Engineering' : 'College of Engineering Building 7, 224',
  'Korean Language and Literature' : 'College of Humanities, 320'
}

const wrongtestDict = {
  'Computer Science and' : 'College of Engineering Building 7, 224',
  'Korean Language and' : 'College of Humanities, 320'
}

describe('전북대 학과 사무실 안내 모듈 테스트', () => {
  for (major in testDict) {
    it('Test - 학과 입력시 해당 사무실 위치 반환', (done) => {
      assert.equal(Comparestring(rtm, channel, major, lowertestDict, testDict), testDict[major]);
      done();
    });
  }

  for(wrong in wrongtestDict) {
    it('오탈자가 있는 경우', (done) => {
      assert.equal(Comparestring(rtm, channel, wrong, lowertestDict, testDict), wrongtestDict[wrong]);
      done();
    })
  }
});

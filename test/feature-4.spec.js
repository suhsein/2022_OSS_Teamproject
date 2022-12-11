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
const Office = require('../Office');

let i = 0;

const testDict = {
  'Computer Science and Engineering': 'College of Engineering Building 7, 224',
  'Korean Language and Literature': 'College of Humanities, 320',
  'Chemical Engineering': 'College of Engineering Building 6, 999',
}

describe('전북대 학과 사무실 안내 모듈 테스트', () => {
  it('Test - 학과 입력시 해당 사무실 위치 반환', (done) => {
    assert.equal(Office(rtm, 'Computer Science and Engineering', channel, testDict), testDict['Computer Science and Engineering']);
    i += 1;
    done();
  });

  it('Test - 대소문자, 띄어쓰기 허용', (done) => {
    assert.equal(Office(rtm, 'Koreanlanguage and LITErature', channel, testDict), testDict['Korean Language and Literature']);
    i += 1;
    done();
  });

  it('Test - 오탈자가 있는 경우', (done) => {
    assert.equal(Office(rtm, 'Chemi Enginering', channel, testDict), '유사학 학과 찾아서 안내 성공');
    done();
  });

});

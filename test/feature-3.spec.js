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
const getTodayMenu = require('../getTodayMenu');
const getWeekStar = require('../getWeekStar');

const testDict = {
  고기: 3,
  나물: 2,
  채소: 1,
  국: 2,
  도토리: 3,
};

let res1;
let res2;
let res;

describe('오늘의 메뉴 안내 및 평가 모듈 테스트', () => {
  before(async () => res1 = await getTodayMenu(rtm, 3, testDict, channel));
  it('Test - 수요일에 해당하는 식단 안내', (done) => {
    assert.equal(res1, '오늘의 식단메뉴 안내와 평가 성공');
    done();
  });

  before(async () => res2 = await getTodayMenu(rtm, 6, testDict, channel));
  it('Test - 주말 예외', (done) => {
    assert.equal(res2, '주말 예외처리');
    done();
  });

  before(async () => res = await getWeekStar(rtm, testDict, channel));
  it('Test - 주간 메뉴 평가 함수', (done) => {
    assert.equal(res, '이번주 메뉴 평가 성공');
    done();
  });
});

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
const { sayHello } = require('./hello');
const greeting = require('./greeting');

describe('App test!', () => {
  it('Test - sayHello should return hello', (done) => {
    assert.equal(sayHello(), 'hello');
    done();
  });
});

let res;

describe('greeting test', () => {
  before(async () => res = await greeting(rtm, channel));

  it('Test - greeting should return random hello pattern', (done) => {
    assert.equal(res, 'success');
    done();
  });
});

require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let status = 0;

let token;

try {
  token = fs.readFileSync('./test_token').toString('utf-8');
} catch (err) {
  console.error(err);
}
token = token.trim();

const test_uID = 'U04BB067T7Y';
const test_channel = 'C04B30ETYMV';

console.log(token);

const rtm = new RTMClient(token);
rtm.start();

rtm.on('ready', async () => {
  const rdy1 = await rtm.sendMessage('테스트를 시작한다.', test_channel);
  console.log('테스트 루틴 시작이다.');
  status++;

  const rdy2 = await rtm.sendMessage('hi', test_channel);
});

rtm.on('message', (message) => {
  const { text } = message;

  console.log('받은 메시지:', text);

  if (message.user == test_uID) {
    switch (status) {
      case 1:
        if (text == 'Hello!') {
          console.log('테스트 #1 성공');
        } else {
          console.log('테스트 #1 실패');
          process.exit(1);
        }
        rtm.sendMessage('4', test_channel);
        status++;
        console.log('테스트 #2 시작');
        break;
      case 2:
        if (text == 'The result is 16') {
          console.log('테스트 #2 성공');
        } else {
          console.log('테스트 #2 실패');
          process.exit(1);
        }
    }
  } else {
    rtm.sendMessage('테스트 채널에서 떠들지 마세요.', test_channel);
  }
});

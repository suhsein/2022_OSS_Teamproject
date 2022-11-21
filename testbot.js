require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let status = 0;

let token;

try {
  token = fs.readFileSync('./testbot_token').toString('utf-8');
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
  console.log('랜덤 인사 테스트 시작');
});

rtm.on('message', (message) => {
  const { text } = message;

  console.log('받은 메시지:', text);

  if (message.user == test_uID) {
    switch (status) {
      case 1:
        if (text == 'Hello!') {
          console.log('랜덤 인사 테스트 성공');
        } else {
          console.log('랜덤 인사 테스트 실패');
          process.exit(1);
        }
        rtm.sendMessage('학사일정', test_channel);
        status++;
        console.log('학사일정 안내 테스트 시작');
        break;
      case 2:
        if (text == '안내 받을 날짜를 이야기해주세요. (예, 12/21)') {
          console.log('날짜 입력하라는 메세지 보내기 테스트 성공');
        } else {
          console.log('날짜 입력하라는 메세지 보내기 테스트 실패');
          process.exit(1);
        }
        rtm.sendMessage('9/1', test_channel);
        if(text == '9/1은 2학기 개강, 2학기 수강신청 변경 기간 입니다.'){
          console.log('해당 날짜의 학사일정 안내 테스트 성공');
        }else{
          console.log('해당 날짜의 학사일정 안내 테스트 실패');
          process.exit(1);
        }
    }
  } else {
    rtm.sendMessage('테스트 채널에서 떠들지 마세요.', test_channel);
  }
});
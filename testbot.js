require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let status = 0;
let subStatus = 0;
let input;
let output;
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

const test1 = ['Hello!', 'Nice to meet you.', 'Have a good day!']; // 인사 패턴
const test2 = {
  '9/1': '9/1는 2학기 개강, 2학기 수강신청 변경 기간 입니다.',
  '11/2': '해당 날짜의 학사일정이 없습니다.',
  '9월1일': '날짜 양식이 틀리거나 존재하지 않는 날짜입니다.',
};
const test4 = {
  'Mechanical Engineering': 'College of Engineering Building 4, 212',
  'ComPuterscience and ENGIneering': 'College of Engineering Building 7, 224',
  'Electric Engineering': 'Electronic Engineering 학과를 찾으시나요?\nElectronic Engineering 의 학과사무실 위치는 College of Engineering Building 7, 224 입니다',
};

rtm.on('ready', async () => {
  await rtm.sendMessage('테스트를 시작한다.', test_channel);
  console.log('테스트 루틴 시작이다.');
  status = 1;

  await rtm.sendMessage('hi', test_channel);
  console.log('#1 랜덤 인사 테스트 시작');
});

rtm.on('message', (message) => {
  const { text } = message;

  console.log('jbnu_bot:', text);

  if (message.user === test_uID) {
    switch (status) {
      case 1: //  랜덤 인사 테스트
        if (test1.includes(text)) {
          console.log('#1 랜덤 인사 테스트 성공');
        } else {
          console.log('#1 랜덤 인사 테스트 실패');
          process.exit(1);
        }
        rtm.sendMessage('학사일정', test_channel);
        console.log('#2 학사일정 안내 테스트 시작');
        status = 2;
        subStatus = 1;
        break;
      case 2: // 학사일정 안내 테스트
        if (text === '안내 받을 날짜를 이야기해주세요. (예, 12/21)') {
          console.log('#2 학사일정 입력시 날짜 입력받기');
          input = Object.keys(test2)[subStatus - 1];
          rtm.sendMessage(input, test_channel); // 현재 테스트의 input 보내기
          break;
        }

        output = test2[input]; // 현재 input 에 알맞는 output 값
        if (text === output) { // 받은 메세지와 output이 일치하는지 확인
          console.log(`#2-${subStatus} 학사일정 안내 테스트 성공`);

          if (subStatus === Object.keys(test2).length) { // 마지막 서브테스트까지 완료하였으면
            rtm.sendMessage('오늘 밥 뭐야', test_channel);
            console.log('#3-1 식단 안내 테스트 시작');
            status = 3.1;
          } else {
            subStatus += 1;
            rtm.sendMessage('학사일정', test_channel); // #2 의 다음 서브테스트 진행
          }
        } else {
          console.log(`#2-${subStatus} 학사일정 안내 테스트 실패`);
          process.exit(1);
        }
        break;
      case 3.1: // 식단 안내 테스트
        if (text.includes('입니다')) {
          console.log('#3-1 식단 안내 테스트 성공');
        } else {
          console.log('#3-1 식단 안내 테스트 실패');
          process.exit(1);
        }
        rtm.sendMessage('이번주 뭐 나와', test_channel);
        console.log('#3-2 주간 메뉴 평가 결과 안내 테스트 시작');
        status = 3.2;
        break;
      case 3.2: // 주간 메뉴 평가 테스트
        if (text !== '') {
          console.log('#3-2 주간 메뉴 평가 안내 테스트 성공');
        } else {
          console.log('#3-2 주간 메뉴 평가 안내 테스트 실패');
          process.exit(1);
        }
        rtm.sendMessage('학과 사무실', test_channel);
        console.log('#4 학과 사무실 안내 테스트 시작');
        status = 4;
        subStatus = 1;
        break;
      case 4: // 학과사무실 안내 테스트
        if (text === '학과 이름을 입력해주세요.') {
          console.log('#4 학과 사무실 입력시 학과 이름 입력 받기');
          input = Object.keys(test4)[subStatus - 1];
          rtm.sendMessage(input, test_channel); // 현재 테스트의 input 보내기
          break;
        }

        output = test4[input];
        if (text === output) {
          console.log(`#4-${subStatus} 학과 사무실 안내 테스트 성공`);

          if (subStatus === Object.keys(test4).length) { // 마지막 서브테스트까지 완료하였으면
            rtm.sendMessage('테스트를 종료한다.', test_channel);
            console.log('테스트 종료');
            status = -1;
          } else {
            subStatus += 1;
            rtm.sendMessage('학과 사무실', test_channel); // #2 의 다음 서브테스트 진행
          }
        } else {
          console.log(`#4-${subStatus} 학과 사무실 안내 테스트 실패`);
          process.exit(1);
        }
        break;
      default:
        console.log('테스트 종료');
    }
  } else {
    rtm.sendMessage('테스트 채널에서 떠들지 마세요.', test_channel);
  }
});

/* eslint no-unused-vars: off */
const dateRegex = /\d{1,2}\/\d{1,2}/; // 월/일

const checkDate = require('./checkDate');

const schedule = function (rtm, text, channel, scheduledict) {
  if (text === '학사일정') {
    console.log('학사일정을 안내합니다.');
    rtm.sendMessage('안내 받을 날짜를 이야기해주세요. (예, 12/21)', channel);
    return '안내 메세지 출력';
  }

  if (dateRegex.test(text) && checkDate(text)) { //  날짜양식과 존재하는 날짜인지 체크
    if (text in scheduledict) { // 딕셔너리에 있는 날짜라면 해당 날의 학사일정 안내
      let schedules = '';
      [].forEach.call(scheduledict[text], (sche) => {
        if (schedules === '') {
          schedules += sche;
        } else {
          schedules += `, ${sche}`;
        }
      });
      console.log('학사일정 안내 성공');
      rtm.sendMessage(`${text}는 ${schedules} 입니다.`, channel); // 슬랫봇으로 학사일정 안내
      return Promise.resolve(scheduledict[text]);
    } // 해당 날의 학사일정이 없을 때
    console.log('학사일정 없음');
    rtm.sendMessage('해당 날짜의 학사일정이 없습니다.', channel);
    return Promise.resolve('학사일정 없음');
  } // 날짜양식이나 날짜가 맞지 않을 때
  console.log('잘못된 날짜 양식입니다.');
  rtm.sendMessage('날짜 양식이 틀리거나 존재하지 않는 날짜입니다.', channel);
  return Promise.resolve('잘못된 날짜 양식');
};
module.exports = schedule;
